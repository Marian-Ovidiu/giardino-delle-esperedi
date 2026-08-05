import localFont from "next/font/local";

export const leagueSpartan = localFont({
  src: "../assets/fonts/LeagueSpartan-Variable.ttf",
  display: "swap",
  variable: "--font-brand",
  style: "normal",
  weight: "100 900",
  preload: true,
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

/** Applicata una volta sull'elemento html radice. */
export const fontVariables = leagueSpartan.variable;
