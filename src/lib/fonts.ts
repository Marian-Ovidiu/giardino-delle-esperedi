import localFont from "next/font/local";

/**
 * OTTO typeface system. Files are committed locally so production builds and
 * browser QA never depend on a network request.
 */
export const bodoni = localFont({
  src: "../assets/fonts/BodoniModa-Latin-Variable.woff2",
  display: "swap",
  variable: "--font-display",
  style: "normal",
  weight: "400 900",
  preload: true,
  fallback: ["Times New Roman", "serif"],
});

export const bodoniItalic = localFont({
  src: "../assets/fonts/BodoniModa-Italic-Latin-Variable.woff2",
  display: "swap",
  variable: "--font-display-italic",
  style: "italic",
  weight: "400 900",
  preload: false,
  fallback: ["Times New Roman", "serif"],
});

export const archivo = localFont({
  src: "../assets/fonts/Archivo-Latin-Variable.woff2",
  display: "swap",
  variable: "--font-text",
  weight: "100 900",
  style: "normal",
  preload: true,
  fallback: ["Arial", "sans-serif"],
});

export const dmMono = localFont({
  src: [
    {
      path: "../assets/fonts/DMMono-Light-Latin.woff2",
      style: "normal",
      weight: "300",
    },
    {
      path: "../assets/fonts/DMMono-Regular-Latin.woff2",
      style: "normal",
      weight: "400",
    },
  ],
  display: "swap",
  variable: "--font-mono",
  preload: false,
  fallback: ["Courier New", "monospace"],
});

/** Applied once on <html>. */
export const fontVariables = `${bodoni.variable} ${bodoniItalic.variable} ${archivo.variable} ${dmMono.variable}`;
