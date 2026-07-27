import Image from "next/image";

type StaticProloguePlateProps = {
  state: "dispersion" | "plant" | "incisions";
  release?: boolean;
};

export function StaticProloguePlate({ state, release = false }: StaticProloguePlateProps) {
  return (
    <span
      className={[
        "prologue-static",
        `prologue-static--${state}`,
        release ? "prologue-static--release" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <Image
        src={`/images/generated/prologue/${state}.avif`}
        alt=""
        fill
        sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1279px) calc(100vw - 48px), min(calc(100vw - 64px), 1600px)"
      />
    </span>
  );
}
