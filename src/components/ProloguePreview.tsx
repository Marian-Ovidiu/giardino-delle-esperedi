import { KernelPrologue } from "@/components/KernelPrologue.client";

export function ProloguePreview({ progress }: { progress: number }) {
  return (
    <section
      className="prologue prologue--preview"
      data-kernel-prologue
      data-preview-progress={progress}
      aria-hidden="true"
    >
      <div className="prologue__frame field">
        <div className="prologue__viewport">
          <KernelPrologue previewProgress={progress} />
        </div>
      </div>
    </section>
  );
}
