import { a11y, chapters } from "@/content/site";

export function RigaOttava() {
  return (
    <nav className="rail" aria-label={a11y.railLabel}>
      <p className="rail__cover t-data" aria-hidden="true">
        00/08
      </p>
      <p className="rail__touch-label t-label" aria-hidden="true" />
      <ol className="rail__list">
        {chapters.map((chapter, chapterIndex) => (
          <li className="rail__item" key={chapter.id}>
            <a
              className="rail__link"
              href={`#${chapter.id}`}
              aria-label={a11y.railMark(chapter.n, chapter.title)}
            >
              <RailRow chapterIndex={chapterIndex} chapter={chapter} />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function RailRow({
  chapterIndex,
  chapter,
}: {
  chapterIndex: number;
  chapter: (typeof chapters)[number];
}) {
  return (
    <>
      <span className="rail__kernels" aria-hidden="true">
        {Array.from({ length: 8 }, (_, kernelIndex) => (
          <span
            className="rail__kernel"
            data-kernel-index={chapterIndex * 8 + kernelIndex}
            data-state="pending"
            key={kernelIndex}
          />
        ))}
      </span>
      <span className="rail__panel" aria-hidden="true">
        <span className="rail__panel-number t-data">{chapter.n}</span>
        <span className="rail__panel-title t-label">{chapter.title}</span>
        <span className="rail__panel-fact t-small">{chapter.railFact}</span>
      </span>
    </>
  );
}
