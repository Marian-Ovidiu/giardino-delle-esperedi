import type { ReactNode } from "react";
import type { Chapter } from "@/content/site";
import { RegistroDati } from "./RegistroDati";
import { Piastra } from "./Piastra";
import { StaticProloguePlate } from "./StaticProloguePlate";

/**
 * One scheda — a chapter of the register.
 *
 * Composition per art-direction §5.3: text axis at column 2 (column 1 on
 * mobile), body spanning cols 2–5, facts at cols 6–7, and column 8 held empty
 * as the reserved void. The void is load-bearing: it is what makes the page
 * read as a plate rather than a page of content.
 */
export function Scheda({ chapter, children }: { chapter: Chapter; children?: ReactNode }) {
  return (
    <section
      id={chapter.id}
      className="scheda field"
      data-scheda={chapter.n}
      aria-labelledby={`t-${chapter.id}`}
    >
      {chapter.n === "01" && (
        <>
          <Piastra slot="varieta-campitura" variant="campitura" />
          <StaticProloguePlate state="plant" />
        </>
      )}
      <div className="scheda__testo">
        <p className="t-data scheda__etichetta">Scheda {chapter.n}/08</p>

        <h2 id={`t-${chapter.id}`} className="t-d2 scheda__titolo">
          {chapter.title}
        </h2>

        <p className="t-lead scheda__occhiello">{chapter.standfirst}</p>

        {chapter.body.map((p) => (
          <p key={p.slice(0, 32)} className="t-body scheda__corpo">
            {p}
          </p>
        ))}

        {children}
      </div>

      {chapter.data.length > 0 && (
        <div className="scheda__dati">
          <RegistroDati rows={chapter.data} />
        </div>
      )}
    </section>
  );
}
