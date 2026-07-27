# Phase 5 — Content Plan

**Project:** Il Giardino delle Esperidi — sito vetrina
**Author:** Brand & Content Strategist
**Direction:** OTTO — *Registro di una varietà superstite* (selected, `docs/creative-directions.md`)
**Sources of truth:** `docs/discovery.md` · `src/content/facts.ts` · Regione Piemonte, Anagrafe dell'agrobiodiversità (cited in §9)
**Language:** Italian only. No English version is in scope.
**Date:** 2026-07-26
**Status:** final copy, synchronised with the Phase 8 implementation

---

## 0. Rules this document obeys

1. **Nothing is asserted that is not in `facts.ts`, `discovery.md` or the cited Regione Piemonte record.** Everything else is either editorial voice (clearly marked in the ledger, §9) or excluded from shipping copy.
2. **The superseded range does not exist.** No 18 g monoporzione, no tubo, no multipack, no 6×/12×/30× counts. Three products only.
3. **Maissini are grissini.** Never described as gallette, never given a weight.
4. **Forbidden vocabulary.** *eccellenza, passione, autentico, genuino, unico, magia, viaggio, esperienza* do not appear anywhere in the copy below, in any inflection. Neither does *artigianale* used as an adjective of virtue — the company's own mission line is broken into facts rather than quoted whole, precisely because quoting it reimports the filler we are removing.
5. **Nutrition and health claims are handled as a regulatory matter, not a copy matter.** See §8. The default build ships *without* nutrition claims.
6. **No invented commerce.** There is no shop, no cart, no price, no newsletter, no PDF download, no stockist list. The conversion is an enquiry.

---

## 1. Narrative arc

The site is a record being read from the top. Eight chapters, each answering one question and handing the next a problem it cannot solve on its own. The register stays flat and factual for seven chapters and breaks exactly once, at the eighth.

| # | Chapter | The question it answers | What it hands to the next chapter |
|---|---|---|---|
| 01 | **La varietà** | What is being recorded here? | An identified organism — and a nickname nobody has explained yet. |
| 02 | **Il mais del Re** | Why does it have that name? | A company tradition, explicitly presented as such, which raises the question of what the variety actually *is*. |
| 03 | **Otto file** | What is it, physically? | A hard number, eight, and the first hint that the number is rare because the plant is. |
| 04 | **Quasi estinto** | What happened to it? | The stake. Something almost ended. Someone had to decide otherwise. |
| 05 | **Il campo** | Who decided otherwise, and how? | The cultivation method and internal supply chain declared by the company. |
| 06 | **La pietra** | How does a seed become food? | The one irreversible act, and therefore the point at which products can exist. |
| 07 | **Tre referenze** | What can I actually have? | Three objects — and no explanation yet of why any of this was worth doing. |
| 08 | **Custodia** | Why does this company exist? | The answer, the name, the myth, and the only reason to write to them. |

**The emotional throughline.** Curiosity → history → precision → loss → resolve → transformation → possession → meaning.

Chapters 01–03 build credibility on facts alone, with no emotional appeal whatsoever; this is deliberate, because it is what makes chapter 04 land as evidence rather than as sentiment. Chapter 04 is the pivot — the first sentence in the whole document that is about a consequence rather than a specification. Chapters 05–07 are the *answer* to 04: this is what keeping it alive costs, this is what it becomes, this is what you can have. Chapter 08 is the only place the site raises its voice, and it does so by naming itself: a golden thing, nearly lost, and someone whose job is to guard it. The commercial ask sits immediately below that sentence and nowhere else.

The single closing line of chapter 08 — **"Il registro resta aperto."** — is the whole concept compressed: this is not heritage, it is an ongoing entry.

---

## 2. Section order

Eight chapters plus three framing sections. Framing sections carry no chapter number and no rail mark.

| Order | Ref | Title (IT) | Purpose in one line |
|---|---|---|---|
| — | `nav` | *(nessun titolo)* | Persistent identification and the one way out to contact. |
| — | `hero` | *(nessun titolo)* | Declare that this is a record, not an advertisement, in under three seconds. |
| 1 | `ch01` | **La varietà** | Identify the subject and establish the registry format. |
| 2 | `ch02` | **Il mais del Re** | Give the variety a provenance a competitor cannot copy. |
| 3 | `ch03` | **Otto file** | Deliver the ownable structural fact and reveal that the page is built from it. |
| 4 | `ch04` | **Quasi estinto** | Convert a specification into a stake. The emotional pivot. |
| 5 | `ch05` | **Il campo** | Show the practice that answers the stake, and the cost it accepts. |
| 6 | `ch06` | **La pietra** | The irreversible act: seed becomes food. |
| 7 | `ch07` | **Tre referenze** | Present the three current maize products as consequences of the variety. |
| 8 | `ch08` | **Custodia** | The single chromatic event: the myth, the name, and the reason. |
| — | `contatti` | **Contatti** | The only conversion on the site. Stays in night. |
| — | `piede` | *(nessun titolo)* | Legal, social, privacy. |

**Note on numbering vs. the rail.** The rail holds exactly eight marks (`01`–`08`). Hero, contatti and piede are deliberately unmarked — the rail counts *record*, not *page*. This keeps the arithmetic clean: eight marks, eight chapters, no exceptions.

---

## 3. Products outside the approved scope

**No product outside the three current maize references is rendered in the approved build.** Reintroducing any additional range requires a new content gate and current client documentation; it must never become a ninth chapter or compete with the maize narrative.

The two polenta recipes are reduced to **one usage line inside the Farina entry**. Discovery §5.6 records that recipes currently outrank products; subordinating them to the product is the direct correction.

---

## 4. CTA hierarchy

There is **no e-commerce, no basket, no price, no stockist list and no newsletter.** Inventing any of them is out of scope and out of bounds. The real conversion is an enquiry by email or phone.

| Rank | CTA (IT) | Action | Where it appears | Honest about |
|---|---|---|---|---|
| **1** | `Richiedi disponibilità` | anchor → `#contatti` | ch07, below the three products | Asking, not buying. It does not promise stock, shipping or a price. |
| **2** | `amministrazione@giardino-delle-esperidi.com` | `mailto:` | `contatti`, `piede` | The address is shown in full as the label — a registry shows its data, it does not hide it behind a verb. |
| **3** | `338 286 6127` | `tel:+393382866127` | `contatti`, `piede` | Same principle. Displayed as the number, not as "Chiamaci". |
| **4** | `Instagram` · `Facebook` | external | `contatti`, `piede` | Handles shown, not follower counts or promises. |
| **5** | `Contatti` | anchor → `#contatti` | `nav`, persistent | The only nav item other than the wordmark. |

**Rules.**
- The primary CTA appears **once on the whole site**. A registry does not nag.
- No CTA appears in chapters 01–06. The hero has no button, no scroll hint and no tagline (locked by `creative-directions.md`, OTTO Hero).
- The word *ordina* is not used anywhere. `[DA VERIFICARE]` — whether the company fulfils direct orders from the public is not recorded in discovery; the Facebook handle `GiardinodelleEsperidiShop` implies it but implication is not confirmation. Until the client confirms, all copy says *disponibilità*, never *ordini* or *spedizioni*.
- No form is specified. `mailto:` and `tel:` are sufficient and require no backend, no privacy consent flow and no data storage. If the client later wants a form, that is a new decision with GDPR consequences.

---

## 5. Final Italian copy

> Everything below is production copy. Capitalisation is significant: `ALL CAPS` items are Archivo Expanded registry labels or DM Mono meta, and must be authored lowercase/normal-case in the content layer with capitalisation applied by CSS `text-transform` so that screen readers do not spell them out.

---

### `nav` — Testata

```
Wordmark:      Il Giardino delle Esperidi
Meta (destra): CHERASCO (CN)
Link:          Contatti
Skip link:     Vai al contenuto
```

---

### `hero` — Copertina

```
Display (Bodoni, in basso a sinistra, ultima parola tagliata dal bordo):
MAIS ROSSO OTTOFILE INTEGRALE

Meta (DM Mono, in alto a destra):
VARIETÀ ALBESE · CHERASCO (CN) · REGISTRO · 8 SCHEDE

Rail marks:
01 02 03 04 05 06 07 08
```

**No button. No tagline. No scroll hint.**

*Deviation, declared.* `creative-directions.md` specifies the hero meta as `… · SCHEDA 08/08`. I have changed it to `REGISTRO · 8 SCHEDE` and reserved `SCHEDA 0N/08` for the individual chapters. Reason: on the cover, before the reader knows what a scheda is, `08/08` reads as "the last page" and quietly says the record is closed — the exact opposite of the site's closing line. The alternate remains available if the Art Director overrules; it is a one-string change.

The unverified town coordinates were removed from production copy on 2026-07-26.

---

### `ch01` — La varietà

```
Etichetta:   SCHEDA 01/08
Titolo:      La varietà
Occhiello:   Mais Rosso Ottofile, varietà Albese.

Corpo:
Una varietà dell'Albese tra quelle a maggior rischio di estinzione in Piemonte.

Il Giardino delle Esperidi la semina, la raccoglie e la trasforma a Cherasco,
in un'oasi protetta tra Langhe e Cuneese.

Colonna dati:
SPECIE          Mais
VARIETÀ         Ottofile · Albese
APPELLATIVO     il mais del Re
LOCALITÀ        Cherasco (CN), Piemonte
FILE DI CHICCHI 8
STATO           a rischio di estinzione

```

---

### `ch02` — Il mais del Re

```
Etichetta:   SCHEDA 02/08
Titolo:      Il mais del Re
Occhiello:   Una tradizione aziendale lo lega a Vittorio Emanuele II.

Corpo:
Il soprannome «mais del Re» accompagna ancora oggi la varietà. Il Giardino delle
Esperidi ne racconta l'origine come una disposizione di semina attribuita a
Vittorio Emanuele II.

Colonna dati:
FONTE           tradizione aziendale
APPELLATIVO     il mais del Re
COLTIVATO IN    Piemonte
FINO A          metà del secolo scorso

Didascalia immagine:
Brattee secche.
```

The royal origin is deliberately attributed to company tradition. It is not presented as a verified decree and carries no invented date.

---

### `ch03` — Otto file

```
Etichetta:   SCHEDA 03/08
Titolo:      Otto file
Occhiello:   Esattamente otto. Non sette, non dieci.

Corpo:
La pannocchia dell'Ottofile porta otto file di chicchi dalla forma arrotondata.

Il numero dà il nome alla varietà e dà la struttura a questa pagina: otto
colonne, otto schede. La riga a sinistra conta — otto segni per scheda,
sessantaquattro in tutto.

Colonna dati:
FILE DI CHICCHI 8
CHICCO          tondo
SEZIONE         trasversale

Didascalia immagine:
Sezione trasversale. Otto file.
```

**Hard note for QA:** the 64 count is a property of the *interface*, not of the plant. The copy says "sessantaquattro segni", never "sessantaquattro chicchi per pannocchia". No line anywhere on the site may state that a pannocchia contains 64 kernels — that is not in the record and is not true of maize. The rail's "one complete pannocchia" idea from `creative-directions.md` stays a visual conceit and is never written down.

---

### `ch04` — Quasi estinto

```
Etichetta:   SCHEDA 04/08
Titolo:      Quasi estinto
Occhiello:   Tra le varietà a maggior rischio di estinzione in Piemonte.

Corpo:
Coltivata in Piemonte fino alla metà del secolo scorso, è iscritta nel Registro
delle Varietà da Conservazione dal 2007.

Una varietà a rischio non resta viva in un archivio: resta viva se viene
seminata.

Colonna dati:
STATO           a rischio di estinzione
ULTIMA DIFFUSIONE   metà del XX secolo
REGISTRO        Varietà da Conservazione · 2007

Didascalia immagine:
Un chicco.
```

The 2007 register date and current risk status come from Regione Piemonte's Ottofile rosso o dell'Albese record. The second sentence is editorial framing, not a claim about recovery timing or the number of growers.

---

### `ch05` — Il campo

```
Etichetta:   SCHEDA 05/08
Titolo:      Il campo
Occhiello:   Agricoltura simbiotica.

Corpo:
Il Giardino delle Esperidi dichiara di adottare il metodo dell'agricoltura
simbiotica.

La filiera aziendale comprende semina, raccolta e trasformazione.

Colonna dati:
METODO DICHIARATO   agricoltura simbiotica
FILIERA         semina · raccolta · trasformazione
AMBIENTE        oasi protetta tra Langhe e Cuneese

Didascalia immagine:
Semente.
```

**Regulatory note.** *Agricoltura simbiotica* is explicitly attributed to the company. The build makes no claim about absence of fertilisers or pesticides and does not use *biologico*.

---

### `ch06` — La pietra

```
Etichetta:   SCHEDA 06/08
Titolo:      La pietra
Occhiello:   Macinata a pietra. Integrale.

Corpo:
La Farina di Mais Rosso è integrale e macinata a pietra.

Dalla stessa varietà nascono tre referenze: farina, gallette e grissini.

Colonna dati:
MOLITURA        a pietra
TIPO            integrale
VARIETÀ         Ottofile · Albese
FORMATO         500 g

Didascalia immagine:
Farina macinata a pietra.
```

---

### `ch07` — Tre referenze

```
Etichetta:   SCHEDA 07/08
Titolo:      Tre referenze
Occhiello:   Tre referenze dal Mais Rosso Ottofile.

Corpo:
Non una gamma. Tre.

— — —

01
Maisette
Gallette di Mais Rosso Ottofile Integrale
PESO NETTO   120 g

— — —

02
Maissini
Grissini di mais, prodotti con farina di Mais Rosso Ottofile

— — —

03
Farina di Mais Rosso
Ottofile Integrale varietà Albese, macinata a pietra
PESO NETTO   500 g

Per polenta: tradizionale, minimo 60 minuti di cottura, oppure col Bimby.

— — —

CTA:  Richiedi disponibilità
```

**Maissini carries no `PESO NETTO` row at all.** The field is omitted, not filled with a placeholder or a dash — a dash in a weight field reads as "no weight", which is worse than silence. This omission is approved and does not block publication. A weight may be added only in a future packaging-confirmed update.

---

### `ch08` — Custodia *(notte e oro — l'unico evento cromatico)*

```
Etichetta:   SCHEDA 08/08

Display (Bodoni, oro su notte):
Custodire
qualcosa
di dorato

Corpo (grande):
Il Giardino delle Esperidi è il frutteto di Hera. Vi cresce un boschetto di
meli che producono mele d'oro, e alle Esperidi è affidato il compito di
curarlo e di custodirlo.

Le Esperidi sono le ninfe della sera e della luce dorata dei tramonti,
chiamate così per la loro posizione immaginata nel lontano ovest dove tramonta
il Sole.

Chiusa:
Il nome dell'azienda è la descrizione del lavoro. Un frutto d'oro quasi
perduto, e qualcuno che lo tiene in vita seminandolo ogni anno.

Riga finale (DM Mono, oro):
IL REGISTRO RESTA APERTO

```

The myth paragraphs are a light compression of the company's own verbatim text (discovery §2) — nothing is added, only the connective tissue is tightened. Discovery §5.1 records that the myth is currently "stated, then wasted"; this is the correction, and it is the only place on the site where the type is allowed to be large, warm and slow.

---

### `contatti` — Contatti *(resta in notte)*

```
Etichetta:   CONTATTI
Titolo:      Scrivere al Giardino
Occhiello:   Per disponibilità e informazioni sulle tre referenze.

Email:       amministrazione@giardino-delle-esperidi.com
Telefono:    338 286 6127

Indirizzo:
Il Giardino delle Esperidi
Azienda agricola
12062 Cherasco (CN), Piemonte

Social:
Instagram    il_giardino_delle_esperidi
Facebook     GiardinodelleEsperidiShop
```

---

### `piede` — Piede

```
© 2026 Il Giardino delle Esperidi · Azienda agricola · Cherasco (CN)
Privacy Policy
```

**External pre-publication blockers — not implementation defects.** The available material does not contain the complete legal business name, P. IVA/codice fiscale or a confirmed postal address. These values must come from the client and must not be inferred. The current Privacy Policy exists at `/privacy-policy/`, but the client must confirm that it remains accurate for the new static site before public launch. The approved preview may ship internally with the existing public contact details; production publication may not be declared legally complete until these items are resolved.

---

### Rail microcopy — `La Riga Ottava`

Each of the eight marks expands on hover into a registry line: number · name · the one fact that chapter carries.

```
01 · LA VARIETÀ      · Mais Rosso Ottofile, varietà Albese
02 · IL MAIS DEL RE  · tradizione aziendale: il mais del Re
03 · OTTO FILE       · esattamente otto file di chicchi tondi
04 · QUASI ESTINTO   · Registro delle Varietà da Conservazione · 2007
05 · IL CAMPO        · metodo e filiera dichiarati dall'azienda
06 · LA PIETRA       · macinata a pietra, integrale
07 · TRE REFERENZE   · Maisette · Maissini · Farina di Mais Rosso
08 · CUSTODIA        · ninfe della sera e della luce dorata dei tramonti
```

Accessible name for the rail: `Indice del registro`.
Accessible name per mark: `Scheda 03 — Otto file`.

### Other microcopy

```
Skip link:            Vai al contenuto
Rail (aria-label):    Indice del registro
Email (aria-label):   Scrivi a Il Giardino delle Esperidi
Tel (aria-label):     Telefona a Il Giardino delle Esperidi
Link esterno (sr):    si apre in una nuova scheda
Riduzione moto:       (nessuna copy — comportamento, non testo)
```

**Alt text** is written per asset in §6 rather than generically. Decorative texture plates carry `alt=""`.

**Meta / SEO**

```
<title>       Il Giardino delle Esperidi — Mais Rosso Ottofile, varietà Albese
<description> Registro del Mais Rosso Ottofile Integrale, varietà Albese: otto
              file di chicchi e una varietà a rischio di estinzione. Maisette,
              Maissini e Farina di Mais Rosso.
```

---

## 6. Visual role, assets and interaction, per section

Format per section: **visual role** (what the imagery is *doing*) · **asset** (from the Art Director's required set, `creative-directions.md` → Higgsfield asset strategy) · **interaction** (descriptive only — the Motion Designer owns timing) · **layout** at three breakpoints.

Breakpoint shorthand: **D** = desktop (8 columns + 64px fixed rail) · **T** = tablet · **M** = mobile.

---

### `nav`
- **Visual role.** None. Type only. It must not look like a header bar — no background fill, no border, no shadow.
- **Assets.** None.
- **Interaction.** Static. Does not hide on scroll, does not shrink. In the night sections (08, contatti, piede) it inverts with the page.
- **D** Wordmark hangs on the text axis at column 2; `CHERASCO (CN)` and `Contatti` sit right, column 7. Column 8 stays empty.
  **T** Same, `CHERASCO (CN)` drops.
  **M** Wordmark only, left; `Contatti` right, 10px caps. Meta drops entirely.

### `hero`
- **Visual role.** One specimen plate establishes the treatment contract for the whole site: object small in frame, one hard shadow, paper substrate. It is evidence placed beside a title, not a background.
- **Assets.** `cross-section showing eight rows` — the definitive plate, and the only image that proves the claim the brand is built on. Substrate plate (`z_image`) for the page ground.
  `alt`: *Sezione trasversale di una pannocchia di Mais Rosso Ottofile: otto file di chicchi.*
- **Interaction.** Nothing animates on load except the mask reveal of the display line and the seating of the first rail mark. No parallax, no scroll hint, no autoplay.
- **D** Display bottom-left, hanging into column 1, `INTEGRALE` clipped by the viewport edge. Meta top-right. Specimen centre-right, columns 5–7.
  **T** Display drops to two lines; clipping conceit retained on the second line. Specimen moves below the meta, columns 5–8 → 4–7.
  **M** Display two or three lines at ~clamp cap; **the clip is retained** — this is the one mobile compromise not permitted, because "it does not fit" is the idea. Specimen sits above the display, full-bleed-minus-rail, 8:5. Meta becomes a single 10px line under the specimen.

### `ch01 — La varietà`
- **Visual role.** Establishes the object whole, once, so every later fragment is legible as a part of something. This is the only full-object image in the record.
- **Assets.** `whole pannocchia`.
  `alt`: *Pannocchia intera di Mais Rosso Ottofile, varietà Albese, su fondo di carta.*
- **Interaction.** Registry rows reveal by baseline mask, sequentially, as the chapter seats. Rail mark 01 fills across the chapter's scroll length.
- **D** Body columns 2–4, data columns 6–7, image columns 5–7 above the data. Column 8 void.
  **T** Body columns 2–5, data full-width beneath as a two-column definition list.
  **M** Image → body → data, stacked. Data becomes a `dl` with label above value, 1px `--pietra` rule between rows.

### `ch02 — Il mais del Re`
- **Visual role.** Age and archive, without nostalgia props. A dried, brittle fragment reads as "old record" far better than sepia would.
- **Assets.** `dried husk`.
  `alt`: *Brattee secche di pannocchia.*
- **Interaction.** As ch01. The `FONTE · tradizione aziendale` row keeps the provenance qualified rather than presenting a decree as independently verified.
- **D/T/M** As ch01. On M the husk plate runs full-bleed-minus-rail at 8:5.

### `ch03 — Otto file`
- **Visual role.** Proof. This chapter has to *show* eight, not assert it. The image is the argument; the type is the caption.
- **Assets.** `cross-section` at large scale (reprised from the hero, different crop) + `loose kernels scattered` as a secondary macro.
  `alt` (1): *Sezione trasversale che mostra le otto file di chicchi.*
  `alt` (2): *Chicchi sciolti, tondi e arancio.*
- **Interaction.** The chapter where the rail is explained by the layout rather than by copy: the eight rail marks and the eight columns align optically here for the only time. Reduced-motion users lose nothing — the alignment is static.
- **D** Cross-section spans columns 3–7 at large scale. The word `Otto` in Bodoni hangs into column 1. Data column drops to four rows only.
  **T** Cross-section columns 2–7, type above.
  **M** Cross-section is the widest image on the site — full-bleed-minus-rail, square crop. Type above it, data below.

### `ch04 — Quasi estinto`
- **Visual role.** Scale of loss expressed as scale in frame. One kernel, very small, in a very large void. This is the emptiest composition on the site and it should be uncomfortable.
- **Assets.** `corn silk` **or** a single kernel isolated — one plate, whichever renders with less AI smoothing. Recommend the single kernel.
  `alt`: *Un solo chicco di Mais Rosso Ottofile su fondo di carta.*
- **Interaction.** The chapter deliberately reveals *slower* than the others — a longer scroll length for less content. No new mechanic; the pacing is the effect. The `STATO` row is the one place `--chicco` is permitted as a rule mark inside a data column.
- **D** Body columns 2–4. Image tiny, columns 6–7, with three-quarters of the block left empty. Column 8 void, as everywhere.
  **T** Same proportions, image smaller still.
  **M** Do **not** scale the image up to fill the phone. It stays small and centred in a tall empty block — the void is the content.

### `ch05 — Il campo`
- **Visual role.** Practice, not landscape. No fields, no skies, no tractors, no hands. The chapter is carried by typography and the data column; the image is a quiet substrate note.
- **Assets.** **Asset gap flagged to the Art Director.** The required set in `creative-directions.md` contains no cultivation asset. Requested addition: **one plate of loose sowing seed in a small pile on the paper ground** (`nano_banana_pro`, 2cr). It carries no people, no packaging, no dish and no landscape, so it introduces none of the discovery §8 failure modes. If the Art Director declines, this chapter runs typographic-only against the bare substrate plate, which is acceptable and arguably more on-concept.
  `alt`: *Semente di Mais Rosso Ottofile.*
- **Interaction.** The declared method and supply-chain rows carry the chapter. No chemical-input absence is asserted.
- **D** Data column is the hero here — promote it to columns 5–7 at larger scale, body reduced to columns 2–3.
  **T** Body above, data full-width below.
  **M** Data first, body second. This is the only chapter where data outranks prose on mobile.

### `ch06 — La pietra`
- **Visual role.** Transformation shown as two states in one chapter: the hard mineral that does it, and the powder that results.
- **Assets.** `millstone fragment` + `stone-ground flour in a low pile`. **The single `seedance_2_0` loop (flour falling) lives here and nowhere else** — it is the only moving image on the site and it must depict the only irreversible act.
  `alt` (stone): *Frammento di macina in pietra.*
  `alt` (flour): *Farina di Mais Rosso macinata a pietra, in un cumulo basso.*
  Loop: decorative, `alt=""`, `muted`, `playsinline`, poster frame required.
- **Interaction.** The loop plays on entering the viewport, once or gently looped; it **does not play on mobile** (discovery §8, motion cost) and is replaced by the flour still. `prefers-reduced-motion` shows the poster frame only. No scrubbing, no scroll-binding — it is a fact, not a toy.
- **D** Stone left (columns 2–4), flour right (columns 5–7), the loop occupying the flour slot. Body beneath, columns 2–4.
  **T** Two images side by side at half scale, body below.
  **M** Flour still only, 8:5, full-bleed-minus-rail. Stone plate dropped. Video not loaded at all — not merely hidden.

### `ch07 — Tre referenze`
- **Visual role.** Objects, not packs. Discovery §8 records that photography of real packaging is unavailable, and no branded pack may be generated. Each product is represented by the *thing itself*, broken or fragmentary, on the same paper ground as every other plate — which is exactly how a registry presents an object.
- **Assets.** `a broken gallette` → Maisette · `grissini fragments` → Maissini · `flour in a low pile` (second crop) → Farina.
  `alt`: *Galletta di Mais Rosso Ottofile spezzata.* / *Frammenti di grissini di mais.* / *Farina di Mais Rosso Ottofile integrale.*
- **Interaction.** Three entries seat sequentially with the indexing motion. Numbers `01 / 02 / 03` are DM Mono and are the local counter, distinct from the chapter numbers. The `Richiedi disponibilità` CTA is the first interactive element on the site other than the rail; it should be conspicuously plain — a text link with a `--chicco` rule beneath, never a filled button (`--chicco` never fills anything).
- **D** Three columns of unequal width across columns 1–7 — Maisette widest, Farina narrowest — so the row reads as a record, not a product grid.
  **T** Three equal columns, images square.
  **M** Vertical stack, one product per screen-height block, image → name → definition → confirmed weight where available → line. Maissini has no weight row.

### `ch08 — Custodia`
- **Visual role.** **None, and this is the decision.** The one section with the most emotional licence gets no photograph. The image is the typography and the 64 gold marks of the rail against black. Introducing a photograph here would make it a mood section; withholding it makes it a statement.
- **Assets.** Optional single re-grade of the `loose kernels` plate to night/gold, used at very small scale, **only if the Art Director judges the section underweight without it.** Default: no asset.
- **Interaction.** The inversion. Reaching the end of the rail count triggers the page's only palette change; the rail turns gold and is briefly the only lit thing. `prefers-reduced-motion` receives the inverted state as an instant switch, not a crossfade — the destination is identical, only the transition is removed. **The inversion must never be reversible mid-chapter by scrolling up a few pixels** — flicker at the boundary would destroy the one chromatic event.
- **D** Display type occupies columns 1–6, breaking left out of the grid. Myth body columns 2–5 at a size larger than any body text elsewhere. `IL REGISTRO RESTA APERTO` sits alone, columns 6–7. Column 8 void — even here.
  **T** Display three lines, body full measure at columns 2–6.
  **M** Display stacks to four or five lines and is allowed to be the largest type on mobile. Body at comfortable measure. The rail's 64 gold marks compress but remain visible — on mobile they are the payoff for the whole scroll and must not be hidden.

### `contatti`
- **Visual role.** None. Data on night. The contact block is the last registry field.
- **Assets.** None.
- **Interaction.** Email and phone are links, styled as data with a `--esperide` underline on hover. No copy-to-clipboard toast, no form, no map embed (a map embed loads third-party trackers and would require a consent layer for one line of information already given as text).
- **D** Three columns: contact, address, social. Columns 2–7.
  **T** Two columns; social wraps beneath.
  **M** Single column, contact first (it is the conversion), address second, social third.

### `piede`
- **Visual role.** None.
- **Assets.** None.
- **Interaction.** Static.
- **D/T/M** One line, left-hanging on the text axis, Privacy Policy right. On M it wraps to two lines.

---

## 7. Global layout notes

- **The rail is present at every breakpoint.** Desktop 64px, tablet 48px, mobile 40px. On mobile it does not become a hamburger and it does not become a bottom bar — it stays a left rail, because it is the record's index and the count is the concept. The hover expansion becomes tap-to-expand on touch.
- **Column 8 stays empty on every section at every breakpoint that has eight columns.** On mobile the equivalent is a permanent right margin that no element ever crosses.
- **Nothing centres,** including on mobile. Left-hanging text on a phone is unusual and correct.
- **Type never fades in.** Baseline-mask reveal only (`creative-directions.md`, Motion language).
- **The night sections are 08, contatti and piede — and only those.** If a fourth dark block appears anywhere, the concept is dead (locked in `creative-directions.md`).

---

## 8. Regulatory and factual flags — read before build

### 8.1 Nutrition claims — the biggest issue on this project

Discovery §3 records, from the company's own site, that the variety is *"source of folic acid and vitamin B1; contains iron and other minerals; particularly digestible; rich in dietary fibre"*. **None of that appears in the copy in §5.** That is a deliberate veto, and here is why.

Under **EU Reg. 1924/2006** on nutrition and health claims:

| Wording | Status | Requirement |
|---|---|---|
| *fonte di acido folico* / *fonte di vitamina B1* | Regulated **nutrition claim** | The food must contain ≥15% of the NRV per 100 g. Requires compositional analysis. |
| *contiene ferro* / *ricco di minerali* | Regulated nutrition claim in substance — rewording does not exempt it | Same thresholds ("source of" = 15% NRV, "high in" = 30%). |
| *ricco di fibre* | Regulated nutrition claim | Requires ≥6 g fibre per 100 g. |
| *particolarmente digeribile* | **Health (function) claim** | There is no authorised claim for digestibility of maize on the EU Register. **This one should be cut outright, not substantiated.** |
| *ricco di amido e proteine* | *ricco di proteine* is a regulated claim (≥20% of energy from protein) | Entirely absent from production copy. |

**Recommendation, in order of preference.**

1. **Ship without nutrition claims.** This is the default in §5 and it costs the site nothing — the record is stronger on morphology, provenance and jeopardy than it would ever be on micronutrients.
2. If the client wants them, obtain a **compositional analysis of the finished products** (not of the variety in the literature — claims attach to the food as sold) and then use the exact Annex wordings: `Fonte di acido folico. Fonte di vitamina B1. Fonte di fibre.` Nothing else.
3. **Do not** attempt the halfway house of "the variety is known for…" attributed to a third party. Attribution does not exempt a claim made in commercial communication.

`[DA VERIFICARE]` — all nutrition data. Held out of build.

### 8.2 *Biologico* and products outside the approved scope

No biological-certification claim and no description of products outside the three approved maize references ships. Reintroducing either requires current client documentation and a new content review.

### 8.3 *Senza glutine* — explicitly forbidden

Maize is naturally gluten-free and someone will suggest saying so. **No.** *Senza glutine* is regulated by **EU Reg. 828/2014** and requires verified <20 ppm, which for a milled cereal product means controlled processing and testing. Nothing in the record supports it. It appears nowhere in this document and must not be added.

### 8.4 *100% italiana*

This claim does not ship. The public site describes the company as entirely Italian, but that does not establish the origin of every ingredient in every finished reference.

### 8.5 Withheld content vs. external launch blockers

**Withheld from production copy by design:**

| Item | Shipping treatment |
|---|---|
| Maissini net weight | Field intentionally omitted; this does not block publication. Add only after a future packaging-confirmed update. |
| Nutrition and health claims | Entirely absent. |
| Biological certification and claims for products outside the three approved references | Entirely absent. |
| Direct ordering, shipping, prices or stock | Not promised; CTA asks only for availability. |
| Geographic coordinates | Removed rather than approximated. |
| Royal decree and recovery timing | No categorical decree or recovery date is asserted. The royal story is qualified as company tradition; conservation uses the official 2007 register date. |

**External pre-publication blockers requiring client input:**

| Item | Required action |
|---|---|
| Complete legal business name and P. IVA/codice fiscale | Client must supply the exact values for the footer. |
| Postal/legal address | Client must confirm whether a complete address must be displayed. |
| Privacy Policy currency | Client must approve or replace the existing policy for the new site and its actual data flows. |

---

## 9. Factual claim ledger

Every factual assertion in the shipping copy, with its source. `FACTS` = `src/content/facts.ts`. `DISC §n` = `docs/discovery.md`. `REGIONE` = [Regione Piemonte, Ottofile rosso o dell'Albese](https://www.biodiversita-agricola.piemonte.it/ottofile-rosso-o-dellalbese). `EDITORIAL` = voice, not a factual claim — carries no verification burden but must still be defensible.

| # | Claim as written | Where | Source |
|---|---|---|---|
| 1 | Il Giardino delle Esperidi | nav, ch01, contatti, piede | `FACTS.company.name` |
| 2 | Azienda agricola | contatti, piede | `FACTS.company.kind` |
| 3 | 12062 Cherasco (CN), Piemonte | nav, hero, ch01, contatti, piede | `FACTS.company` |
| 4 | oasi protetta tra Langhe e Cuneese | ch01, ch05 | `FACTS.company.setting` · DISC §2 |
| 5 | amministrazione@giardino-delle-esperidi.com | contatti, piede | `FACTS.company.email` |
| 6 | 338 286 6127 / `tel:+393382866127` | contatti, piede | `FACTS.company.phone`, `.phoneHref` |
| 7 | Instagram `il_giardino_delle_esperidi` | contatti, piede | `FACTS.company.social.instagram` |
| 8 | Facebook `GiardinodelleEsperidiShop` | contatti, piede | `FACTS.company.social.facebook` |
| 9 | Mais Rosso Ottofile Integrale | hero, ch01, ch03, ch06, ch07 | `FACTS.grain.fullName` |
| 10 | varietà Albese | hero, ch01, ch06, ch07 | `FACTS.grain.variety` |
| 11 | il mais del Re | ch01, ch02 | `FACTS.grain.nickname` |
| 12 | l'azienda attribuisce la tradizione del “mais del Re” a Vittorio Emanuele II | ch02 | DISC §3 — explicitly attributed, not presented as an independently verified decree |
| 13 | otto file di chicchi | ch01, ch03, rail | `FACTS.grain.rows` = 8 · DISC §3 |
| 14 | chicco tondo | ch01, ch03 | `FACTS.grain.kernel.shape` "arrotondata" |
| 17 | coltivata in Piemonte fino alla metà del secolo scorso | ch02, ch04 | DISC §3 |
| 18 | a rischio di estinzione | ch01, ch04, rail | DISC §3 |
| 19 | iscritta nel Registro delle Varietà da Conservazione dal 2007 | ch04, rail | REGIONE |
| 21 | l'azienda dichiara di adottare l'agricoltura simbiotica | ch05, rail | DISC §2 — explicitly attributed |
| 25 | filiera: semina · raccolta · trasformazione | ch05 | DISC §2 |
| 27 | macinata a pietra | ch06, ch07, rail | `FACTS.products[2].definition` |
| 28 | integrale | ch06, ch07 | `FACTS.products[0].definition`, `[2].definition` |
| 29 | Maisette — Gallette di Mais Rosso Ottofile Integrale | ch07 | `FACTS.products[0]` |
| 30 | Maisette 120 g | ch07 | `FACTS.products[0].format` |
| 31 | Maissini — Grissini di mais, prodotti con farina di Mais Rosso Ottofile | ch07 | `FACTS.products[1]` |
| 32 | Maissini: no weight stated | ch07 | `FACTS.products[1].format` = `null` — **absence is the fact** |
| 33 | Farina di Mais Rosso — Ottofile Integrale varietà Albese, macinata a pietra | ch07 | `FACTS.products[2]` |
| 34 | Farina 500 g | ch06, ch07 | `FACTS.products[2].format` |
| 35 | polenta tradizionale, minimo 60 minuti | ch07 | DISC §3 |
| 36 | polenta col Bimby | ch07 | DISC §3 |
| 40 | il frutteto di Hera | ch08 | `FACTS.myth.garden` · DISC §2 |
| 41 | boschetto di meli che producono mele d'oro | ch08 | DISC §2 (verbatim) |
| 42 | alle Esperidi è affidato il compito di curarlo e di custodirlo | ch08 | DISC §2 (verbatim) |
| 43 | ninfe della sera e della luce dorata dei tramonti | ch08, rail | `FACTS.myth.nymphs` (verbatim) |
| 44 | nel lontano ovest dove tramonta il Sole | ch08 | `FACTS.myth.place` (verbatim) |
| 45 | Privacy Policy exists | piede | DISC §1 (sitemap: `/` and `/privacy-policy/`) |
| 48 | “Una tradizione aziendale lo lega a Vittorio Emanuele II” | ch02 | EDITORIAL qualification of claim 12 |
| 49 | "Esattamente otto. Non sette, non dieci." | ch03 | EDITORIAL framing of claim 13 |
| 50 | "otto colonne, otto schede … sessantaquattro segni in tutto" | ch03 | EDITORIAL — describes the **interface**, not the plant. See the hard note in §5/ch03 |
| 52 | “Una varietà a rischio non resta viva in un archivio: resta viva se viene seminata.” | ch04 | EDITORIAL |
| 56 | "Non una gamma. Tre." | ch07 | EDITORIAL framing of claims 29–34 |
| 61 | "Il nome dell'azienda è la descrizione del lavoro." | ch08 | EDITORIAL |
| 62 | "Il registro resta aperto." | ch08 | EDITORIAL |
| 63 | "Per disponibilità e informazioni sulle tre referenze." | contatti | EDITORIAL — deliberately promises no order fulfilment, see §4 |

**Claims deliberately absent, and which QA should confirm are still absent:**
folic acid · vitamin B1 · iron · minerals · dietary fibre · digestibility · *senza glutine* · any price · any certification or award · any stockist · any 18 g / tubo / multipack format · any kernel count per pannocchia · any date for the decree or the recovery · any claim that Maissini weigh anything · any use of *eccellenza, passione, autentico, genuino, unico, magia, viaggio, esperienza*.
