import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProloguePreview } from "@/components/ProloguePreview";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

type PreviewPageProps = {
  searchParams: Promise<{ progress?: string }>;
};

export default async function ProloguePreviewPage({ searchParams }: PreviewPageProps) {
  if (process.env.NODE_ENV === "production") notFound();

  const parameters = await searchParams;
  const value = Number.parseFloat(parameters.progress ?? "0.38");
  const progress = Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0.38;

  return <ProloguePreview progress={progress} />;
}
