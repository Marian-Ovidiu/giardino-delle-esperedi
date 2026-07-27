import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { company } from "@/content/facts";
import { meta } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  metadataBase: new URL("https://www.giardino-delle-esperidi.com"),
  openGraph: {
    title: meta.title,
    description: meta.description,
    locale: "it_IT",
    type: "website",
    siteName: company.name,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  // The field colour, so the browser chrome does not flash white before paint.
  themeColor: "#E9E3D6",
  colorScheme: "light" as const,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" data-field="giorno" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
