import { KernelPrologue } from "@/components/KernelPrologue.client";

/** Decorative fixed layer; intentionally outside the document content. */
export function ImprontaTransition() {
  return (
    <div className="prologue" data-kernel-prologue aria-hidden="true">
      <div className="prologue__frame field">
        <div className="prologue__viewport">
          <KernelPrologue />
        </div>
      </div>
    </div>
  );
}
