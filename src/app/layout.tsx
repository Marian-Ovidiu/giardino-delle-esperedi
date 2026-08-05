import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { publicBrand } from "@/content/selectors";
import { metaContent } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  title: metaContent.title,
  description: metaContent.description,
  applicationName: publicBrand.name,
  openGraph: {
    title: metaContent.openGraph.title,
    description: metaContent.openGraph.description,
    locale: "it_IT",
    type: "website",
    siteName: publicBrand.name,
  },
  twitter: {
    card: "summary_large_image",
    title: metaContent.openGraph.title,
    description: metaContent.openGraph.description,
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#F5915E",
  colorScheme: "light" as const,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" data-field="giorno" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
