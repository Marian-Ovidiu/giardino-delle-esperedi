# Brand alignment — the jar and the site

**Date:** 2026-07-28
**Scope:** identity, product record, nomenclature, commercial detail, brand tone, and the two image slots the documentation already authorised. **Nothing else.**
**Sources of authority:** the client's priced brochure (4 pp.), the presentation letter (5 pp.), the printed label of *La Maisèra 8file*, the brand seal and the cob illustration. On layout, art direction and motion the project documentation remains the authority and was not touched.

The question this sprint exists to answer:

> If someone held the jar in one hand and the site in the other, would they believe they came from the same company?

**Before:** no. The site listed four maize references; the shelf holds five. One product (Maisotti) was missing entirely, one (La Maisèra) was called "Birra", one (Maissini) had no weight, none had a price, the Instagram handle was dead, and every photograph on the page was a generated stand-in.

**After:** substantially yes on the words and the record; **partially** on the pictures, and the gap is documented in §4 rather than papered over.

---

## 1. What was verified, first-hand

Every fact below was read off the rendered pages and the label, not taken on trust.

| Claim under test | Verdict |
|---|---|
| Five maize references: Farina, Maisette, Maissini, Maisotti, La Maisèra | **Confirmed.** Brochure p. 3 lists four; the letter adds the beer and counts the range out loud — *"Cinque prodotti. Un solo campo."* |
| Maisette 120 g, €3,90 / 3 × €9,90 | Confirmed, brochure p. 3 |
| Maisette monoporzione 18 g, 50 pz × €45,00 | Confirmed. It is a **format** of Maisette, printed under the same heading — never a separate product |
| Maisotti 250 g, €5,50 / 2 × €10,00, mais 26,7% | Confirmed, brochure p. 3, with the full ingredient list |
| Maissini **200 g**, €3,90 / 3 × €9,90 | Confirmed. The site carried no weight at all |
| Farina 500 g, €5,50 / 2 × €10,00, vasetto in vetro sottovuoto | Confirmed, brochure p. 3 and letter p. 2 |
| La Maisèra 8file · Bière de Garde – Farmhouse · 33 cl · 7% vol. | Confirmed **on the label**, which is the physical artefact |
| Instagram `mais_rosso_company` | Confirmed, brochure p. 4, beside the QR code |
| Phone 3382866127, email amministrazione@giardino-delle-esperidi.com | Confirmed, brochure p. 4 |
| Sown in purezza, hand-harvested, sun-dried | Confirmed, letter p. 1 — these are the process facts that replaced adjectives |

Two things the brief did not mention and the pages do:

- **`Mais Rosso Co.` is a brand, not the company.** The seal reads *MAIS ROSSO Co. · OTTOFILE · varietà "ALBESE"*, and carries the *Il Giardino delle Esperidi* tree mark as a small secondary seal inside it. Company and brand are two different names and the site had blurred them. The register now says so in one sentence in ch07 and nowhere else; the wordmark stays the company name, which is also the domain and the legal name in the footer.
- **The note at the top of `facts.ts` was itself out of date.** It declared the 18 g monoporzione and the tubo "superseded data from the old public website". Both are printed in the 2026 priced brochure. The note has been corrected and the formats restored.

---

## 2. The product record

Rebuilt in `src/content/facts.ts`. Six entries: five Mais Rosso references and the Amaro.

| | Name | Format | Price | Record |
|---|---|---|---|---|
| 01 | Farina di Mais Rosso | 500 g | € 5,50 · 2 pz € 10,00 | completo |
| 02 | Maisette | 120 g · 18 g | € 3,90 · 3 pz € 9,90 · 50 monoporzioni € 45,00 | completo |
| 03 | Maissini | 200 g | € 3,90 · 3 pz € 9,90 | completo |
| 04 | **Maisotti** *(new)* | 250 g | € 5,50 · 2 pz € 10,00 | completo |
| 05 | **La Maisèra 8file** *(renamed)* | 33 cl | — | completo |
| 06 | Amaro del Dottore | — | — | parziale |

**No component, stylesheet or layout rule changed to carry any of this.** Every new row — Confezione, Prezzo, Mais Rosso 26,7%, Stile, Alcool, Note, In bottiglia, Allergeni — went into the `specs` extension point that already existed for exactly this moment, and renders generically in declaration order. One field was added to the `Product` type: `use`, the one-line "what it is for", which replaced a hard-coded polenta ternary in `site.ts`.

**Prices are register data.** They sit in DM Mono in the same column, at the same size, in the same voice as `500 g`. There is no button beside them, no cart, no "Compra", no availability statement and no shipping. A test now guards that (`prints prices as register data and never as an offer`), and nothing in the code assumes a price row exists.

### The two nomenclature decisions

**"Birra" → "La Maisèra 8file".** The label is the authority on a product's name. The letter also records where the name comes from — *maisèra* is Piedmontese for the granary, the room the maize is kept in — which is why the site can now name the beer without naming a brewery.

What the label put **on** the record: the style (Bière de Garde – farmhouse), 33 cl, 7% vol., the tasting note, the natural sediment, the gluten statement. What stays **off** it, deliberately: the IBU (nowhere on file), the full ingredient list (a register entry is not a spec sheet), and above all the contract brewery, address and excise code printed in the label's small print. Those are not this company's and do not go on this company's site — the test that bans `birrificio` and `brewery` now also bans `castelletto` and `accise`.

**"Amaro del Dottore" — investigated, kept.** It appears in none of the 2026 materials, and the letter counts the range as five. On that evidence the entry looked superseded and the first answer was to delete it. It is not superseded: it is standing on the table in the client's own brochure photograph on p. 4 — a botanical label reading *AMARO DEL DOTTORE · CRAFT BITTER*, carrying the Giardino delle Esperidi tree seal. So the product is real and theirs; it is simply not part of the Mais Rosso Co. line, which is what those five are. This site is the company's register, not the maize line's catalogue. Deleting a real product because a maize brochure did not list it would have been the worse error. Its record is unchanged and still declares what it does not know. `TODO(cliente)` left.

"Craft bitter" is legible on that label and was deliberately **not** written into the record: a category read off a low-resolution photograph of a bottle on a table is not a confirmation.

---

## 3. Copy — adjectives out, facts in

Fifteen replacements across `site.ts`. The tone is unchanged; the sentences now carry information.

| Chapter | Was | Is |
|---|---|---|
| 01 | "la semina, la raccoglie e la trasforma" | "la semina **in purezza**, la raccoglie **a mano** e la **essicca al sole**" |
| 01 | *(no kernel colour)* | "Colore del chicco — tra l'arancio bruciato e il bordeaux" |
| 02 | *(no dialect name)* | "In piemontese — la melia du re" |
| 02 | "una disposizione di semina attribuita a Vittorio Emanuele II" | same, **plus** "sulle colline piemontesi e nella tenuta di Pollenzo" — inside the attributed clause, where it stays the company's telling |
| 05 | "La filiera aziendale comprende semina, raccolta e trasformazione." | "La filiera va dalla semina alla confezione, **senza intermediari**. **La disponibilità è legata al raccolto.**" |
| 05 | "semina · raccolta · trasformazione" | "semina · raccolta a mano · essiccazione al sole · trasformazione" |
| 06 | *(no packaging row)* | "Confezione — vasetto in vetro sottovuoto" |
| 06 | "Dalla stessa varietà nascono farina, gallette e grissini." | "…farina, gallette, grissini, **biscotti e birra**." (was factually false the day Maisotti arrived) |
| 07 | *(nothing)* | "Le referenze di mais escono con il marchio **Mais Rosso Co.** I prezzi sono quelli del listino aziendale; l'acquisto passa dall'azienda." |
| 07 | "Per polenta: … minimo 60 minuti di cottura, oppure col Bimby." | "Per la polenta: sei porzioni da un vasetto." — see the cooking-time conflict in §6 |
| meta | "Maisette, Maissini e Farina" | the full range, plus "seminato in purezza, raccolto a mano ed essiccato al sole a Cherasco" |

Words rationed on sight and not reintroduced anywhere: *eccellenza, qualità superiore, autentico, genuino, passione, unico, innovativo*. The brochure is full of them — *"prodotti autentici e genuini"*, *"unici nel loro genere"*, *"dalla passione per la terra"* — and none of them crossed over. The one place those words now appear on the site is **printed on the packaging inside the ch07 photograph**, which is honest: it is what the pack says.

---

## 4. Photography — what was placed, and what was not

This is the section that matters most, because it is where the brief and the art direction genuinely collide.

### 4.1 Placed — two slots, both already authorised

| Slot | Chapter | Source | Status |
|---|---|---|---|
| `varieta-campitura` | 01, ground | client photo, cobs (letter) | **definitivo** |
| `referenze-collettiva` | 07, LASTRA | client photo, packaging (brochure) | **definitivo** |

The `IMMAGINE PROVVISORIA` annotation disappeared from ch07 by itself, driven by the status, exactly as the system was built to do. No component, CSS rule or layout value changed: both are edits to `src/content/media.ts` and nothing else.

The ch07 swap is the one art-review-immagini.md §0-bis C was written for — that section shipped the generated crumb study as an explicit stand-in "*che la fotografia collettiva definitiva delle confezioni sostituirà nello stesso slot senza modifiche al layout*". This is that photograph. It is still non-enumerable as §0-bis C requires: the packs overlap and run off three edges.

Every derivative goes through art-direction §9.5's grade, implemented in full in `scripts/build-brand.mjs`: black point lifted to RGB 15, white ceiling 240, linear contrast, global saturation 35% with the 0–25° kernel red-orange held at 100% via a hand-written hue mask, monochrome grain at 8%. That grade is the reason a flash-lit phone snapshot taken at a fair can sit on the same page as a studio plate — §9.5 exists for precisely this ("*applied identically to every asset, so mixed provenance becomes invisible*").

### 4.2 Not placed, and why — three blocked decisions for the Art Director

**(a) A photograph per product row. Blocked by mandate.**
The brief asks that every product get a real photograph. The register has no image slot per row, and art-review §0-bis C rules one out in terms: *"Le righe prodotto restano intatte: nessuna immagine per referenza. Una foto per riga trasformerebbe il registro in una griglia e-commerce, esplicitamente fuori mandato."* Adding one is a layout change. **Not done, reported instead.** The change, if authorised, is one `<Piastra slot="…">` per row plus five entries in `media.ts`; the assets can be cut from the sources already staged.

**(b) The `--chicco` budget, in the slot that is now live.**
Measured, not estimated. The ch07 derivative carries **18,6% of its frame** in retained 0–25° chroma — mostly the packaging's own terracotta band, which sits inside the kernel hue window the grade protects. At the reference viewport that is ≈15% against §4.4's 2% ceiling. §4.4 anticipates exactly this case and prescribes the remedy: *"on the chapter where a full-frame kernel macro appears, the rail's active row reverts to `--inchiostro`."* That is a CSS change and therefore an Art Director call. **It is open.** The ch01 ground does not raise it: a CAMPITURA renders at 0,055 opacity in `multiply`, which crushes the chroma long before it reaches the budget.

**(c) The remaining six slots stay provisional, and that is the honest result.**
`re-materia` (ch02), `quasi-estinto-reperto` and `quasi-estinto-mobile` (ch04), `campo-coltura` (ch05), `pietra-macina` (ch06 ground) and `pietra-farina` (ch06 object) keep their generated plates. Three independent reasons, each on its own sufficient:

- **Resolution.** No original files were supplied. Every photograph on file was pulled out of a PDF that had already downsampled it; the largest is **908 px** on its long edge. A LASTRA renders at ~1.150–1.376 px, so a real photograph there would be a 2–2,5× upscale of a flash snapshot at the site's largest photographic moment — measurably worse than what is there now. art-review §11 said the same thing from the other side: *"Una LASTRA a 1.200 px chiede una fotografia vera"* — it does, and these are not yet good enough files to be it.
- **§9.6.** These are citable plates, and §9.6 forbids packaging, labels, any text in frame, props, cloth, wood and plated food inside one. Every remaining photograph on file contains at least one. The single carve-out is ch07, and it was used.
- **The `--chicco` budget again, at ch04.** This is the one slot where the first two objections do not apply: `quasi-estinto-reperto` is a 1:1 detail at ~310 px, art-direction §9.7 asks for exactly *"loose kernels, scattered, 1:1"*, and there is a clean, text-free, prop-free 282 px band of real loose kernels on file that needs almost no upscale. It was built and then **not shipped**: a kernel macro at that size puts roughly 5% of the viewport into retained `--chicco` chroma against a 2% ceiling, and unlike ch07 nothing pre-authorises it. It is the single most natural real-photography swap left, and it is one Art Director decision away.

**The beer has no placement at all.** Its only image (`lett-img6`) is a staged farmhouse scene — window, field, crate, glass, sacking — whose provenance I cannot verify; it has the signature of a render or a heavy composite, and it is a different species of picture from the fair snapshots around it. `media.ts` forbids any generated image that depicts this company's land, buildings or equipment. Even cropped tight to the bottle it would be a labelled bottle in a citable plate, which §9.6 forbids outside ch07. **Not used.** `TODO` left for a real photograph of the bottle.

### 4.3 The illustration and the seal — two placements, no decoration

The brochure scatters both across every page. The site uses each once, in identity rather than in layout:

- **`src/app/icon.png` + `apple-icon.png`** — the real seal, masked to its circle, at 512 px from a 400 dpi render of the brochure. The mark on the jar becomes the mark in the browser tab. The Apple variant sits on `--carta`, not on white, because white is not one of the seven values. The default `create-next-app` `favicon.ico` was deleted.
- **`src/app/opengraph-image.png`** — the client's own drawing of the Ottofile, keyed off its white ground onto `--carta`, centroid on the 5/8 line and running off the bottom edge. No text: the card carries the mark, the metadata carries the words. `opengraph-image.alt.txt` written.

Neither appears in the page. There is no repeated cob motif, no seal watermark, no illustration in a chapter.

---

## 5. What was refused

Each of these is in the client's own materials and each was left there.

| Refused | Where it came from | Why |
|---|---|---|
| **`senza glutine per natura`** (Maisette) | letter p. 2 | Regulated statement. Requires a verified analysis under 20 ppm on the finished product; a leaflet asserting it is not that analysis. Actively dangerous in this range — Maissini carry wheat flour and barley malt, Maisotti wheat flour, and the beer's own label reads *"prodotto con cereali contenenti glutine"*. A gluten-free claim on one would be read across all. |
| **`naturalmente privo di glutine`** (the maize) | letter p. 1 | Same rule, wider blast radius: it would be inherited by every product on the page. |
| **"particolarmente digeribile"**, **"ricco di fibra alimentare"**, **"prezioso alleato per stomaco e intestino"** | brochure p. 2 | Health claims. EU Reg. 1924/2006. Already vetoed project-wide; not reintroduced. |
| **"molto ricchi di amido e proteine"**, **"ricchissimi di amido, proteine e fibra"** | brochure p. 2, letter p. 1 | Nutrition claims. Same regulation. |
| **Associazione Mais Antichi Piemontesi · Banca del Germoplasma DISAFA, Università di Torino · Università di Scienze Gastronomiche di Pollenzo** | letter p. 1 | Named third parties. A company leaflet is not their consent, and none of the three is on file as having agreed to be cited. `TODO(cliente)` left: with written confirmation this becomes one of the strongest facts on the site. |
| **"La Maisèra 8file è la prima birra prodotta con il Mais Rosso Ottofile var. Albese"** | letter p. 4 | A "first ever" claim, unverifiable and unnecessary. |
| **"Non come fanno le lager industriali…"**, **"un profilo aromatico che nessuna varietà moderna riesce a replicare"** | letter pp. 1, 4 | Comparative claims against unnamed competitors. |
| **Vittorio Emanuele II as history** | brochure p. 2, letter p. 1 | Both sources state it as fact — *"fu Re Vittorio Emanuele II ad imporne la semina"*. The site's existing attribution to the company was kept and **not** upgraded. |
| **"biologico"** | old public site | Protected term, EU Reg. 2018/848. Appears nowhere. |
| **The contract brewery, its address and excise code** | the label's small print | Not this company's name. Now guarded by a test. |
| **75 cl for La Maisèra** | letter p. 4 | Contradicted by the bottle, which reads 33 cl and carries the 7% measured on it. The label wins. This is a **reduction** from what the site previously published, and it is deliberate. |
| **"Craft bitter"** for the Amaro | brochure photo, p. 4 | Legible on a bottle on a table in a low-resolution photograph. That is evidence the product exists, not a confirmation of its category. |

The allergen rows that **do** ship are the same discipline pointing the other way: `contiene glutine (frumento, orzo)` on Maissini, `contiene glutine (frumento), uova, latte` on Maisotti, `prodotta con cereali contenenti glutine` on the beer — each read off a printed ingredient list. Their **absence** on Maisette and on the Farina means no ingredient list for those two is on file. It is not a gluten-free statement and nobody may infer one from it; the comment in `facts.ts` says so, and a test guards both directions at once.

---

## 6. Palette — proposed, not taken

**Verdict: do not add an eighth hex. The brand palette is already in the system.**

Sampled off the label and the seal, against the seven tokens:

| Brand colour | Sampled | Nearest token | Verdict |
|---|---|---|---|
| Cream ground | ≈ `#F1DFBF` | `--carta` `#E9E3D6` | Same family. Carta is a touch cooler; it is a paper, not an ink. **Reconciled.** |
| Brick red type | ≈ `#64200F` | `--chicco` `#B23A16` | Same hue family, the token is the lighter, truer kernel value. **Reconciled.** |
| Terracotta band | ≈ `#F1925A` | `--chicco` | A tint of the same hue. §4.4.7 forbids tints of `--chicco`; the band survives inside the ch07 photograph, which is where it belongs. **Reconciled.** |
| **Petrol blue** | ≈ `#20647D` / `#214263` | **none** | **Genuinely absent. Still refused.** |

The petrol blue is the only real question, and the reason to refuse it is not legibility — computed, `#20647D` on `--carta` is **5,16 : 1**, comfortably AA. The reasons are structural:

1. §4.1 is categorical: seven values, an eighth is a defect, and derived values must be `rgba()` or `color-mix()` of the seven.
2. On the pack, the petrol band does a printing job — separating the product name from a busy ground at 6 cm. On the page that job is done by typography and by the reserved eighth column. Importing the colour would import a solution to a problem the site does not have.
3. Invariant 2 makes `--chicco` an **index**. A second saturated accent with no indexical job turns both into decoration, and it would collide with `--esperide`, the one chromatic event the whole page is built toward.

If the Art Director wants it anyway, the defensible route is *not* an eighth token: it is to let the petrol blue live where it already lives — inside the photographs of the packaging — and nowhere else. **This is a proposal, and the call is the Art Director's.**

---

## 7. TODO — every gap left open

All are in the code at the point of use, not only here.

| # | Where | Open question |
|---|---|---|
| 1 | `facts.ts` · farina | **Polenta cooking time.** Three sources, three numbers: brochure 30 min, letter 40 min, old site "minimo 60". The register publishes none of them until the client picks one. The six portions are uncontested and did ship. |
| 2 | `facts.ts` · maisette, farina | Gluten analysis, if anything is ever to be said. Until then the row stays absent **in both directions**. |
| 3 | `facts.ts` · birra | Does a 75 cl format exist? If so its label and its own ABV are needed — 7% is measured on the 33 cl. |
| 4 | `facts.ts` · amaro | Is the Amaro part of the range? If yes: format, strength, composition. If no, the entry leaves the register. |
| 5 | this document · §5 | Written confirmation from the Associazione Mais Antichi Piemontesi, DISAFA/Università di Torino and UNISG Pollenzo before any of the three is named. |
| 6 | this document · §4.2 | **Original photographic files.** Everything here came out of a PDF at ≤908 px. Originals would unblock ch02, ch05 and ch06 at once. |
| 7 | this document · §4.2 | A real photograph of the La Maisèra bottle. The only one on file is an unverifiable staged scene. |
| 8 | `site.ts` · piede | P. IVA — still not on record, still an empty slot rather than an invention. Unchanged from before this sprint. |
| 9 | this document · §4.2 (b) | **Art Director:** the ch07 `--chicco` budget and §4.4's prescribed rail mitigation. |
| 10 | this document · §4.2 (a) | **Art Director:** whether the register may carry an image per product row. Currently ruled out by §0-bis C. |

---

## 8. Verdict

**The words and the record now read as one brand with the jar.** A reader holding the flour jar sees `MACINATA A PIETRA`, `OTTOFILE INTEGRALE`, `varietà "Albese"`, `500 g`, a vacuum-sealed glass jar — and finds every one of those on the page, in the same register, at the same price the client publishes. The beer is called what the bottle calls it. Maisotti exists. Maissini weighs 200 g. The Instagram handle resolves. The tab carries the company's own seal.

**The pictures do not, yet, and I have not pretended otherwise.** Two slots out of eight hold real photography; the register's rows hold none, and the beer has no image at all. Both gaps are decisions I was not authorised to take — one belongs to the Art Director, one belongs to a set of original files that does not exist yet — and both are stated above with the exact change each would need.

What I would not do to close the gap: force a 908 px snapshot into a 1.376 px plate, put a labelled pack into a slot §9.6 reserves for material studies, add an image row to the register, or ship the one photograph whose provenance I cannot vouch for. The site's credibility is the only asset here that a bad image would spend, and it is the same asset the whole register is built on.

**Coherent:** nomenclature, formats, prices, allergens, process facts, contacts, brand mark, tone.
**Not yet coherent:** photographic representation of the products, and it is one decision and one file transfer away.
