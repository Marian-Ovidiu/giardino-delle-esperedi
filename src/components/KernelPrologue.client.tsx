"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrologueRenderer, type PrologueSnapshot } from "@/lib/prologue/renderer";

declare global {
  interface Window {
    __OTTO_SIGNATURE__?: {
      setProgress: (progress: number) => void;
      snapshot: () => PrologueSnapshot | null;
    };
  }
}

type KernelPrologueProps = {
  previewProgress?: number;
};

type StoryStops = {
  hero: number;
  variety: number;
  royal: number;
  rowsReveal: number;
  rowsTop: number;
};

const POINTER_YAW_DEGREES = 0.35;
const POINTER_PITCH_DEGREES = 0.2;

function clamp(value: number, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value));
}

function between(value: number, start: number, end: number) {
  return clamp((value - start) / Math.max(1, end - start));
}

function mix(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function pointerIsAllowed() {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches
  );
}

function staticModeIsRequired() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches || connection?.saveData === true
  );
}

function stageOpacity(progress: number) {
  const viewport = window.innerWidth;
  const dispersion = viewport < 768 ? 0.18 : viewport < 1280 ? 0.22 : 0.28;
  const specimen = viewport < 768 ? 0.12 : viewport < 1280 ? 0.14 : 0.18;
  const field = viewport < 768 ? 0.22 : viewport < 1280 ? 0.26 : 0.3;

  if (progress < 0.3) return dispersion;
  if (progress < 0.34) return mix(dispersion, specimen, between(progress, 0.3, 0.34));
  if (progress < 0.56) return specimen;
  if (progress < 0.6) return mix(specimen, field, between(progress, 0.56, 0.6));
  return field;
}

function documentTop(element: Element) {
  return element.getBoundingClientRect().top + window.scrollY;
}

export function KernelPrologue({ previewProgress }: KernelPrologueProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.closest<HTMLElement>("[data-kernel-prologue]");
    const viewport = canvas?.parentElement;
    if (!canvas || !section || !viewport) return;

    const html = document.documentElement;
    if (staticModeIsRequired()) {
      section.dataset.renderer = "static";
      html.dataset.prologueRenderer = "static";
      return () => {
        delete section.dataset.renderer;
        if (html.dataset.prologueRenderer === "static") delete html.dataset.prologueRenderer;
      };
    }

    const story = document.querySelector<HTMLElement>("[data-prologue-story]");
    const variety = document.querySelector<HTMLElement>("#varieta");
    const royal = document.querySelector<HTMLElement>("#mais-del-re");
    const rows = document.querySelector<HTMLElement>("[data-prologue-end]");
    if (previewProgress === undefined && (!story || !variety || !royal || !rows)) return;

    let renderer: PrologueRenderer | null = null;
    let scrollTrigger: ScrollTrigger | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let visibilityObserver: IntersectionObserver | null = null;
    let pointerFrame = 0;
    let currentPointer = { x: 0, y: 0 };
    let targetPointer = { x: 0, y: 0 };
    let contextRestoreCount = 0;
    let pointerAttached = false;
    let sceneVisible = previewProgress !== undefined;
    let disposed = false;
    let stops: StoryStops | null = null;
    const listeners = new AbortController();

    const stopPointer = () => {
      if (pointerFrame) cancelAnimationFrame(pointerFrame);
      pointerFrame = 0;
    };

    const setSceneVisible = (visible: boolean) => {
      const next = visible && document.visibilityState === "visible";
      if (sceneVisible === next) return;
      sceneVisible = next;
      if (sceneVisible) return;
      stopPointer();
      targetPointer = { x: 0, y: 0 };
      if (currentPointer.x !== 0 || currentPointer.y !== 0) {
        currentPointer = { x: 0, y: 0 };
        renderer?.setPointer(0, 0);
      }
    };

    const updateSize = () => {
      if (!renderer) return;
      const bounds = viewport.getBoundingClientRect();
      renderer.resize(bounds.width, bounds.height);
    };

    const setProgress = (progress: number, releaseVisibility = 1) => {
      if (!renderer) return;
      const bounded = clamp(progress);
      renderer.setProgress(bounded);
      const snapshot = renderer.snapshot();
      section.dataset.stage = snapshot.stage;
      section.style.setProperty("--prologue-progress", snapshot.progress.toFixed(4));

      /*
       * Snap a fully-released layer to exactly 0.
       *
       * Sub-pixel scroll positions leave the release factor a fraction short of
       * 1, which lands the layer on 0.0001 — invisible, but non-zero, so the
       * compositor keeps the WebGL surface alive after the prologue has
       * finished. "Released" has to mean released.
       */
      const opacity = stageOpacity(snapshot.progress) * clamp(releaseVisibility);
      section.style.setProperty("--prologue-opacity", opacity < 0.001 ? "0" : opacity.toFixed(4));
      const pointerIsGated =
        (snapshot.progress >= 0.34 && snapshot.progress <= 0.44) || snapshot.progress >= 0.76;
      if (pointerIsGated) {
        targetPointer = { x: 0, y: 0 };
        currentPointer = { x: 0, y: 0 };
        stopPointer();
      }
    };

    const measureStory = () => {
      if (!story || !variety || !royal || !rows) return null;
      const rowsTop = documentTop(rows);
      stops = {
        hero: documentTop(story),
        variety: documentTop(variety),
        royal: documentTop(royal),
        rowsReveal: rowsTop - window.innerHeight * 0.76,
        rowsTop,
      };
      return stops;
    };

    const updateFromScroll = () => {
      const measured = stops ?? measureStory();
      if (!measured) return;
      const scroll = window.scrollY;
      let progress = 0;
      if (scroll <= measured.variety) {
        progress = mix(0, 0.34, between(scroll, measured.hero, measured.variety));
      } else if (scroll <= measured.royal) {
        progress = mix(0.34, 0.6, between(scroll, measured.variety, measured.royal));
      } else {
        progress = mix(0.6, 1, between(scroll, measured.royal, measured.rowsReveal));
      }
      const release = 1 - between(scroll, measured.rowsReveal, measured.rowsTop);
      setProgress(progress, release);
      setSceneVisible(scroll >= measured.hero && scroll < measured.rowsTop && release > 0);
    };

    const animatePointer = () => {
      if (!renderer || !sceneVisible) {
        stopPointer();
        return;
      }
      const progress = renderer.snapshot().progress;
      const gated = (progress >= 0.34 && progress <= 0.44) || progress >= 0.76;
      const targetX = gated ? 0 : targetPointer.x;
      const targetY = gated ? 0 : targetPointer.y;
      currentPointer.x += (targetX - currentPointer.x) * 0.16;
      currentPointer.y += (targetY - currentPointer.y) * 0.16;
      renderer.setPointer(currentPointer.x, currentPointer.y);

      if (
        Math.abs(targetX - currentPointer.x) > 0.001 ||
        Math.abs(targetY - currentPointer.y) > 0.001
      ) {
        pointerFrame = requestAnimationFrame(animatePointer);
      } else {
        currentPointer = { x: targetX, y: targetY };
        pointerFrame = 0;
      }
    };

    const requestPointerFrame = () => {
      if (sceneVisible && !pointerFrame) pointerFrame = requestAnimationFrame(animatePointer);
    };

    const attachPointer = () => {
      if (!pointerIsAllowed() || pointerAttached) return;
      pointerAttached = true;
      window.addEventListener(
        "pointermove",
        (event) => {
          if (!sceneVisible) return;
          const bounds = viewport.getBoundingClientRect();
          targetPointer = {
            x: ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
            y: -(((event.clientY - bounds.top) / bounds.height) * 2 - 1),
          };
          requestPointerFrame();
        },
        { signal: listeners.signal, passive: true },
      );
      window.addEventListener(
        "pointerleave",
        () => {
          if (!sceneVisible) return;
          targetPointer = { x: 0, y: 0 };
          requestPointerFrame();
        },
        { signal: listeners.signal, passive: true },
      );
    };

    const initialise = () => {
      try {
        renderer = new PrologueRenderer(canvas);
        updateSize();
        section.dataset.enhanced = "true";
        section.dataset.renderer = "webgl2";
        html.dataset.prologueRenderer = "webgl2";

        window.__OTTO_SIGNATURE__ = {
          setProgress: (progress) => setProgress(progress, 1),
          snapshot: () => renderer?.snapshot() ?? null,
        };

        if (previewProgress === undefined) {
          gsap.registerPlugin(ScrollTrigger);
          scrollTrigger = ScrollTrigger.create({
            trigger: story,
            start: "top top",
            endTrigger: rows,
            end: "top top",
            invalidateOnRefresh: true,
            onRefresh: () => {
              measureStory();
              updateFromScroll();
            },
            onUpdate: updateFromScroll,
            onToggle: updateFromScroll,
          });
          measureStory();
          updateFromScroll();
          void document.fonts.ready.then(() => {
            if (!disposed) ScrollTrigger.refresh();
          });
        } else {
          setProgress(previewProgress, 1);
          visibilityObserver = new IntersectionObserver(([entry]) => {
            setSceneVisible(entry.isIntersecting);
          });
          visibilityObserver.observe(section);
        }

        resizeObserver = new ResizeObserver(() => {
          updateSize();
          stops = null;
          if (previewProgress === undefined) updateFromScroll();
        });
        resizeObserver.observe(viewport);
        attachPointer();
      } catch (error) {
        console.warn("Signature prologue is using its static fallback.", error);
        section.dataset.enhanced = "false";
        section.dataset.renderer = "fallback";
        html.dataset.prologueRenderer = "fallback";
        setSceneVisible(false);
        resizeObserver?.disconnect();
        resizeObserver = null;
        visibilityObserver?.disconnect();
        visibilityObserver = null;
        scrollTrigger?.kill();
        scrollTrigger = null;
        renderer?.destroy();
        renderer = null;
      }
    };

    const onContextLost = (event: Event) => {
      event.preventDefault();
      section.dataset.enhanced = "false";
      section.dataset.renderer = "fallback";
      html.dataset.prologueRenderer = "fallback";
      setSceneVisible(false);
      resizeObserver?.disconnect();
      resizeObserver = null;
      visibilityObserver?.disconnect();
      visibilityObserver = null;
      scrollTrigger?.kill();
      scrollTrigger = null;
    };

    const onContextRestored = () => {
      contextRestoreCount += 1;
      if (contextRestoreCount > 1 || disposed) return;
      renderer?.destroy();
      renderer = null;
      initialise();
    };

    const onVisibilityChange = () => {
      if (previewProgress === undefined) updateFromScroll();
      else setSceneVisible(document.visibilityState === "visible");
    };

    canvas.addEventListener("webglcontextlost", onContextLost, {
      signal: listeners.signal,
      passive: false,
    });
    canvas.addEventListener("webglcontextrestored", onContextRestored, {
      signal: listeners.signal,
    });
    document.addEventListener("visibilitychange", onVisibilityChange, {
      signal: listeners.signal,
    });
    initialise();

    return () => {
      disposed = true;
      setSceneVisible(false);
      listeners.abort();
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      scrollTrigger?.kill();
      renderer?.destroy();
      delete window.__OTTO_SIGNATURE__;
      delete section.dataset.enhanced;
      delete section.dataset.renderer;
      delete section.dataset.stage;
      section.style.removeProperty("--prologue-progress");
      section.style.removeProperty("--prologue-opacity");
      delete html.dataset.prologueRenderer;
    };
  }, [previewProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="prologue__canvas"
      aria-hidden="true"
      data-pointer-yaw={POINTER_YAW_DEGREES}
      data-pointer-pitch={POINTER_PITCH_DEGREES}
    />
  );
}
