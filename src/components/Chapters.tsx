import { RegistroDati } from "@/components/RegistroDati";
import { Piastra } from "@/components/Piastra";
import { StaticProloguePlate } from "@/components/StaticProloguePlate";
import { catalogo, chapters, cta, custodia, referenze } from "@/content/site";

function ChapterHead({ index }: { index: number }) {
  const chapter = chapters[index];
  return (
    <>
      <p className="chapter__label t-data">Scheda {chapter.n}/08</p>
      <h2 id={`t-${chapter.id}`} className="chapter__title t-d2">
        {chapter.title}
      </h2>
      <p className="chapter__standfirst t-lead">{chapter.standfirst}</p>
    </>
  );
}

export function RoyalChapter() {
  const chapter = chapters[1];
  return (
    <section
      id={chapter.id}
      className="chapter chapter--royal field"
      data-scheda={chapter.n}
      aria-labelledby={`t-${chapter.id}`}
    >
      <StaticProloguePlate state="incisions" />
      <div className="chapter--royal__head">
        <ChapterHead index={1} />
      </div>
      <p className="chapter--royal__mark t-d0" aria-hidden="true">
        II
      </p>
      <div className="chapter--royal__body">
        {chapter.body.map((paragraph) => (
          <p className="t-body" key={paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
      <div className="chapter--royal__data">
        <RegistroDati rows={chapter.data} />
      </div>
      <Piastra
        slot="re-materia"
        className="chapter--royal__piastra"
        sizes="(max-width: 767px) 100vw, 40vw"
      />
    </section>
  );
}

export function EightRowsChapter() {
  const chapter = chapters[2];
  return (
    <section
      id={chapter.id}
      className="chapter chapter--rows field"
      data-scheda={chapter.n}
      data-prologue-end
      aria-labelledby={`t-${chapter.id}`}
    >
      <StaticProloguePlate state="incisions" release />
      <div className="chapter--rows__head">
        <ChapterHead index={2} />
      </div>
      <div className="chapter--rows__proof" aria-label="Otto file">
        {Array.from({ length: 8 }, (_, index) => (
          <span key={index}>
            <b className="t-data">{String(index + 1).padStart(2, "0")}</b>
          </span>
        ))}
      </div>
      <p className="chapter--rows__eight t-d0" aria-hidden="true">
        8
      </p>
      <div className="chapter--rows__body">
        {chapter.body.map((paragraph) => (
          <p className="t-body" key={paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
      <div className="chapter--rows__data">
        <RegistroDati rows={chapter.data} />
      </div>
    </section>
  );
}

export function ConservationChapter() {
  const chapter = chapters[3];
  return (
    <section
      id={chapter.id}
      className="chapter chapter--conservation field"
      data-scheda={chapter.n}
      aria-labelledby={`t-${chapter.id}`}
    >
      <div className="chapter--conservation__head">
        <ChapterHead index={3} />
      </div>
      <p className="chapter--conservation__year t-num-lg">2007</p>
      <div className="chapter--conservation__body">
        {chapter.body.map((paragraph) => (
          <p className="t-body" key={paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
      <div className="chapter--conservation__data">
        <RegistroDati rows={chapter.data} />
      </div>
      <Piastra
        slot="atmosfera-luce"
        className="chapter--conservation__piastra"
        sizes="(max-width: 767px) 100vw, 30vw"
      />
    </section>
  );
}

export function FieldChapter() {
  const chapter = chapters[4];
  return (
    <section
      id={chapter.id}
      className="chapter chapter--field field"
      data-scheda={chapter.n}
      aria-labelledby={`t-${chapter.id}`}
    >
      <div className="chapter--field__head">
        <ChapterHead index={4} />
      </div>
      <div className="chapter--field__data">
        <RegistroDati rows={chapter.data} />
      </div>
      <div className="chapter--field__body">
        {chapter.body.map((paragraph) => (
          <p className="t-body" key={paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
      <div className="chapter--field__piastre">
        <Piastra slot="campo-terra" sizes="(max-width: 767px) 100vw, 36vw" />
        <Piastra slot="campo-coltura" sizes="(max-width: 767px) 100vw, 36vw" />
      </div>
      <p className="chapter--field__chain t-data" aria-label="Filiera aziendale">
        Semina <span aria-hidden="true">→</span> raccolta <span aria-hidden="true">→</span>{" "}
        trasformazione
      </p>
    </section>
  );
}

export function StoneChapter() {
  const chapter = chapters[5];
  return (
    <section
      id={chapter.id}
      className="chapter chapter--stone field"
      data-scheda={chapter.n}
      aria-labelledby={`t-${chapter.id}`}
    >
      <div className="chapter--stone__head">
        <ChapterHead index={5} />
      </div>
      <div className="chapter--stone__states" aria-label="Trasformazione dal chicco alla farina">
        <p>
          <span className="t-label">Stato 01</span>
          <strong className="t-d2">Chicco</strong>
        </p>
        <span className="chapter--stone__cut t-num-lg" aria-hidden="true">
          /
        </span>
        <p>
          <span className="t-label">Stato 02</span>
          <strong className="t-d2">Farina</strong>
        </p>
      </div>
      <div className="chapter--stone__body">
        {chapter.body.map((paragraph) => (
          <p className="t-body" key={paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
      <div className="chapter--stone__data">
        <RegistroDati rows={chapter.data} />
      </div>
      <div className="chapter--stone__piastre">
        <Piastra slot="pietra-macina" sizes="(max-width: 767px) 100vw, 36vw" />
        <Piastra slot="pietra-farina" sizes="(max-width: 767px) 100vw, 36vw" />
      </div>
    </section>
  );
}

export function ProductsChapter() {
  const chapter = chapters[6];
  return (
    <section
      id={chapter.id}
      className="chapter chapter--products field"
      data-scheda={chapter.n}
      aria-labelledby={`t-${chapter.id}`}
    >
      <div className="chapter--products__head">
        <ChapterHead index={6} />
      </div>
      <div className="chapter--products__matrix" aria-label="Matrice varietale: otto file">
        {Array.from({ length: 8 }, (_, index) => (
          <span className="t-data" key={index}>
            {String(index + 1).padStart(2, "0")}
          </span>
        ))}
      </div>
      {/*
        One row per entry, driven entirely by `referenze`. Rows are uniform and
        comparable — the previous diagonal stagger made three products
        impossible to scan side by side and could not absorb a fourth.
        Adding a product to facts.ts is the only step needed to extend this.
      */}
      <ol className="products">
        {referenze.map((product) => (
          <li
            className="product"
            key={product.id}
            data-product={product.id}
            data-status={product.status}
          >
            <p className="product__index">
              <span className="t-label">{catalogo.entryLabel}</span>
              {/* Ordinal only — no total. The count is not part of the concept. */}
              <span className="t-num">{product.index}</span>
            </p>

            <div className="product__identity">
              <h3 className="product__name t-d3">{product.name}</h3>
              {product.definition ? (
                <p className="product__definition t-body">{product.definition}</p>
              ) : (
                /* No verified description exists. We say so rather than
                   inventing one or hiding the product. */
                <p className="product__definition product__definition--vuota t-body">
                  {catalogo.inPreparazione}
                </p>
              )}
              {product.extra && <p className="product__extra t-small">{product.extra}</p>}
            </div>

            <dl className="product__data">
              <div className="product__row">
                <dt className="t-label">{catalogo.originLabel}</dt>
                <dd className="t-data-lg">{product.originLabel}</dd>
              </div>

              {/* One row however many sizes exist, joined by the register's
                  middot. Two formats do not earn two rows. */}
              {product.formats.length > 0 && (
                <div className="product__row">
                  <dt className="t-label">{catalogo.formatLabel}</dt>
                  <dd className="t-data-lg">{product.formats.join(" · ")}</dd>
                </div>
              )}

              {/* The extension point: style, strength, IBU, ingredients — each
                  renders here in declaration order the moment it is confirmed,
                  with no change to this component or the layout. */}
              {product.specs?.map((spec) => (
                <div className="product__row" key={spec.label}>
                  <dt className="t-label">{spec.label}</dt>
                  <dd className="t-data-lg">{spec.value}</dd>
                </div>
              ))}
            </dl>

            <div className="product__foot">
              {catalogo.status[product.status] && (
                <p className="product__status t-label">{catalogo.status[product.status]}</p>
              )}
              <a className="product__cta t-label-lg" href={product.href}>
                {cta.label}
                <span className="sr-only"> — {product.name}</span>
              </a>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function CustodyChapter() {
  const chapter = chapters[7];
  return (
    <section
      id={chapter.id}
      className="chapter chapter--custody"
      data-scheda={chapter.n}
      data-field="notte"
      data-field-section="notte"
      aria-labelledby={`t-${chapter.id}`}
    >
      <div className="chapter--custody__scene field" data-custody-pin>
        <span className="chapter--custody__mark chapter--custody__mark--tl" aria-hidden="true" />
        <span className="chapter--custody__mark chapter--custody__mark--tr" aria-hidden="true" />
        <span className="chapter--custody__mark chapter--custody__mark--bl" aria-hidden="true" />
        <span className="chapter--custody__mark chapter--custody__mark--br" aria-hidden="true" />
        <p className="chapter--custody__label t-data">{custodia.label}</p>
        <h2 id={`t-${chapter.id}`} className="chapter--custody__title t-d1">
          {custodia.display.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
      </div>
      <div className="chapter--custody__body field">
        <div className="chapter--custody__myth">
          {custodia.body.map((paragraph) => (
            <p className="t-d3 t-italic" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
        <p className="chapter--custody__close t-d3">{custodia.close}</p>
        <p className="chapter--custody__final t-label-lg">{custodia.final}</p>
      </div>
    </section>
  );
}
