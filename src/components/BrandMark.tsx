export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={["brand-mark", className].filter(Boolean).join(" ")}>Mais Rosso Co.</span>
  );
}
