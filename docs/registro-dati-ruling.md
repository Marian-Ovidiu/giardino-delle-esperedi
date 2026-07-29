# Ruling — `RegistroDati`, schede 01–06

**2026-07-29 · Art Director · final**
Supersedes the disposition described in `art-direction.md` §7.1, §11.2 and §13.5.
Verified in the browser at 1440 / 768 / 390 against schede 01, 05 and 06, not from screenshots.

---

## 0. The finding that decides it

The client wrote *"scheda tecnica di un prodotto amazon"*. He named the disposition because that
is the vocabulary he has. The actual defect is one level down, and it is this:

**The block treats a narrative as a table.**

A table has a *second axis* — an invisible vertical line on the right that every value is pulled
to. That axis exists for one purpose: to let a reader compare row *n* with row *n+1*. Nobody
compares `Mais` with `8`. The axis is doing no work, it costs the values two thirds of their
width, and its only remaining effect is to make the block read as commerce, because the only
place a civilian sees a right-aligned value column is a price list or a spec sheet.

Everything below follows from killing that axis.

The eight tested treatments all failed for the same underlying reason and it is not the one in
the brief: A, C, D, F keep the key first in reading order — *chiavi a sinistra* survives a
rearrangement, and the client rejected them consistently, not arbitrarily. B and E put the key
first vertically instead of horizontally, which is the same sentence with a line break in it.
G and H are illegal for reasons given in §5.

---

## 1. The ruling — Treatment **I · la determinazione**

**The value comes first, on the page's one left axis, at full column width. The label sits
beneath it, quiet, as a caption.**

```
Mais
SPECIE

Ottofile · Albese
VARIETÀ

il mais del Re
APPELLATIVO

Cherasco (CN), Piemonte
LOCALITÀ

8
FILE DI CHICCHI
```

This is not a rearrangement of the list. It is an inversion of what the block is *for*.

Scan the left edge of the current build and you read: `SPECIE · VARIETÀ · APPELLATIVO ·
LOCALITÀ · FILE DI CHICCHI · COLORE DEL CHICCO · STATO`. That is a **form**.

Scan the left edge of treatment I and you read: `Mais · Ottofile · Albese · il mais del Re ·
Cherasco (CN), Piemonte · 8 · tra l'arancio bruciato e il bordeaux · a rischio di estinzione`.
That is a **portrait of the variety**, and it is very nearly a poem. It is the record itself
rather than the form the record was typed into.

It is also the correct reference. §10.5 already names seed-bank record cards, Kew herbarium
sheets, Fondazione Prada catalogues and Muji product cards. **Every one of those puts the thing
first and the category underneath in small type.** A museum cartellino reads *object, then
medium and date*. It never reads *medium: object*. We had the reference in the bible for months
and implemented the opposite of it.

### 1.1 The CSS — exact, final

Replace `components.css:572–608` in full.

```css
/* — registro — the determination stack ————————————————————————————
   Ruling 2026-07-29 (docs/registro-dati-ruling.md).
   ONE axis. The value leads and owns the full column; the label captions it
   from below. There is no value column: a value column is a price column, and
   it is the single thing that made this block read as a product spec sheet. */

.registro {
  display: grid;
  row-gap: var(--space-2); /* 16px between records */
  border-top: 1px solid var(--rigo); /* §11.2 — head of the registry column */
  padding-top: var(--space-2);
}

.registro__riga {
  display: grid;
  grid-template-columns: minmax(0, 1fr); /* one column. There is no second one. */
  grid-template-rows: auto auto;
  row-gap: 0; /* the pair is one object, not two lines */
}

.registro__valore {
  grid-row: 1;
  margin: 0;
  color: var(--testo);
}

.registro__etichetta {
  grid-row: 2;
  color: var(--testo-2);
}

/* Hairline resolves to half a device pixel on retina — §6.1 exemption 2. */
@media (min-resolution: 2dppx) {
  .registro {
    border-top-width: 0.5px;
  }
}
```

**Deleted, each one deliberately:** `grid-template-columns: 1fr 1fr`; `gap: var(--space-2)`;
`min-height: var(--space-5)`; `padding-block: var(--space-1)`; `align-items: start`;
`border-top` on every `.registro__riga`; the `:last-child` `border-bottom`;
`text-align: right`; and the per-row retina hairline block.

**Zero media queries.** See §3.

### 1.2 Why each number

| Value | Reason |
|---|---|
| `row-gap: 0` inside the pair | The label and its value are **one object**. Any gap at all re-opens them into two elements and reinstates the two-voices problem the client felt. The value's 24px line-height already provides the optical separation; adding space on top of it is what made B ambiguous. |
| `row-gap: var(--space-2)` between pairs | Measured: label ink-bottom to next value ink-top ≈ 22px; value ink-bottom to its own label ink-top ≈ 4px. **A 5:1 ratio.** That ratio is what makes the grouping unambiguous without a rule. At `--space-3` the ratio improves marginally and the block grows 48px per scheda for nothing — rejected. |
| single column | Recovers the full 310px (desktop) / 291px (mobile) / 518px (tablet) for the value. **This is the whole quantitative win** — see §2. |
| head rule `--rigo`, not `--rigo-forte` | §11.2 currently assigns "the head of the registry column" to `--rigo-forte`. **That is amended.** `--rigo-forte` is emphatic *chapter-level* division; the registro is a subordinate column beside the body, and a strong rule over it over-claims — it announces a new section where the truth is "here begins the record". `--rigo` is also the weight that previously drew all seven row separators: the rule is not removed from the vocabulary, it is demoted from seven instances to one. That is the constraint-over-accumulation move, in one line of CSS. **Practical consequence:** `--rigo-forte` is already used twice in scheda 06 (`.chapter--stone__states`, `components.css:814`, `border-block`). A head rule there would be the third and would break §11.2's max-2-per-chapter budget. |
| head rule, **no foot rule** | Head + foot = a frame = a box = the table again. One rule at the head is a register mark: *the record begins here*. The block closes by diminuendo — it ends on a 10px `--testo-2` label, the quietest thing in it. That is a proper typographic cadence and a foot rule would kill it. |

---

## 2. Measured results

Rendered at `deviceScaleFactor: 2`, `reducedMotion: reduce`, real fonts, real tokens, live page.

**Rows whose value wraps (the parent's defect #1):**

| Viewport · scheda | current | treatment I |
|---|---|---|
| 1440 · 01 `#varieta` | **4 of 7** (Varietà 2, Località 2, Colore 3, Stato 2) | **1 of 7** (Colore 2) |
| 1440 · 05 `#il-campo` | 3 of 4 | 1 of 4 |
| 1440 · 06 `#la-pietra` | 1 of 5 | **0** |
| 768 · 01 | 1 of 7 | **0** |
| 390 · 01 | 4 of 7 | 1 of 7 |
| 390 · 05 | 4 of 4 (Filiera at **5 lines**) | 3 of 4 (Filiera 3) |
| 390 · 06 | 2 of 5 | **0** |

Defect #2 (ragged left shoulder on right-aligned wrapped values) is gone by construction —
nothing is right-aligned. Defect #3 (hairlines with no rhythm) is gone — there are no
per-row hairlines.

**Height — the mobile rhythm constraint:**

| | current | treatment I |
|---|---|---|
| 390 · scheda 01 registro | 408px | **400px** |
| 390 · scheda 05 registro | 381px | **304px** |
| 390 · scheda 06 registro | 278px | **264px** |
| **390 · full document** | **16 305px** | **16 278px** |

The page gets **27px shorter** on mobile. The two-audit vertical rhythm is not disturbed; it is
very slightly relieved. Desktop grows 19 471 → 19 630px (+0.8%), absorbed by
`min-height: 120svh` on the chapters.

**Audits run with the ruling applied:** §19.1 spacing divisibility over the `.registro` subtree
returns `[]` at both 1440 and 390. §19.18 horizontal overflow = 0 at both. §19.9 card census
unchanged — no element changes `background-color`.

**Motion:** untouched and improved for free. `ExperienceMotion.tsx:255` already wipes
`.registro__riga` with `clip-path: inset(0 0 100% 0)`, 640ms, 40ms stagger, `ease-registro`,
inside `gsap.matchMedia()`. `.registro__riga` survives as the animated unit, so nothing changes
— except that the top-down wipe now reveals **the datum first and the label second**, which is
the correct order for the first time.

---

## 3. The responsive answer — one treatment, no media queries

**One treatment at every breakpoint. `.registro` ships zero media queries.**

The premise that tablet and mobile are "much wider" is false, and I measured it:

| | 1440 | 768 | 390 |
|---|---|---|---|
| schede 01–04 (`.scheda__dati`) | 310px | 518px | 291px |
| schede 05–06 (`.chapter--*`) | 477px | **251px** | 291px |

Mobile is **19px narrower** than desktop, not wider. And chapters 05–06 are *narrower* at tablet
than at desktop. A width-conditional treatment would have to branch four ways and would produce
a component that reassembles itself as you resize — which is precisely what a specimen card does
not do.

**H (two columns of stacked pairs) is rejected** for this reason and two others: it re-introduces
a second axis, its 145px columns re-create the wrapping the ruling exists to remove, and a grid
of cells is a table by another name. It is not the responsive answer. There is no responsive
answer, because there is nothing to make responsive.

### 3.1 §13.5 — replacement text

> **5. The registry column becomes full-width**, spanning columns 1–7, below the body. It is a
> determination stack, identical to desktop and tablet: value first on the text axis in DM Mono
> `--type-data-lg`, tabular, left-aligned, at the full width of the column; label beneath it in
> Archivo `wdth 125`, 10px, `0.16em`, `--testo-2`; `--space-2` between records; a single 1px
> `--rigo` rule at the head and none at the foot. **It does not become cards. It does not become
> a two-column table. It does not become an accordion. It does not re-order for the viewport.**
> The disposition is the same object at 390px and at 1920px, for the same reason its type sizes
> are (§13.14).

---

## 4. §1038 settled — the paragraph to quote back into the bible

> **§13.14 governs scaling, not assignment, and it did not settle this.** The rule is that a
> given role's physical size does not change with viewport — `--type-data-lg` is 14px on a phone
> and 14px on a 1920px display, because a specimen card's label does not resize. It says nothing
> about which token a role is assigned; that is §3.6's job, and §3.6 assigns registry values to
> `--type-data-lg`. So raising the value to 18px would not have violated §13.14.
>
> **It is refused on a different and harder ground: it invents an eighth type size.** The site
> ships a declared scale of fourteen tokens across three faces. DM Mono holds exactly four —
> 11 / 14 / 32 / 64. An 18px DM Mono value is not `--type-body` (that is Archivo) and not
> `--type-data-lg`; it is a new size introduced to solve a hierarchy problem that hierarchy
> should have solved. **Scale inflation is the cheapest possible answer to "these two things
> compete" and it is always available, which is exactly why it is refused.** Every one of E, F,
> G and H is illegal as rendered, and none of them needed to be: at full column width the value
> already dominates the label by size (14 vs 10), colour (`--testo` vs `--testo-2`), case
> (mixed vs upper), tracking (0.02em vs 0.16em) and **position** — and position was the lever
> nobody pulled. **`--type-data-lg` remains the registry value. There is no new token.**

---

## 5. Rejected outright

**G · the campitura ground — rejected, and this overturns the recommendation put to me.**
Three independent defects, any one of them fatal:

1. **It is a card.** §18.8 forbids any element whose `background-color` differs from its parent's,
   with exactly two exemptions: the rail hover panel and the chapter-08 field. §19.9 makes it
   mechanical — more than two differing backgrounds in the document and cards have crept in.
   An `inchiostro` 5.5% panel behind the data block is the third. It is a defect at the Phase 6
   gate and it is also, precisely, the Amazon spec box with a beige fill in it — the same
   structure, re-upholstered.
2. **Scheda 01 already has a ground.** `components.css:1851` puts a photographic `CAMPITURA` at
   0.055 opacity behind the whole section. G would lay a tinted panel on top of a photographic
   one and give the chapter two grounds. `CAMPITURA` is a *section* surface, `aria-hidden`,
   uncaptioned (`art-review-immagini.md` §C). It is not a container for a component, and the
   word must not be borrowed for one.
3. **It does not survive `--notte`.** Schede 01–06 are day-only under §4.5, so the question is
   moot today — but the aliases are the whole inversion mechanism, and a component that only
   works on one field is a latent bug. `inchiostro` at 5.5% on `--notte` is invisible; a `carta`
   tint on night is a lit panel inside the one chapter that is allowed to be lit, which reads as
   a second chromatic event.

The observation underneath G was correct — **the block wanted to be an object rather than a
list.** The ruling grants that, and it does it with one hairline instead of a fill.

**Right-alignment — confirmed dead, everywhere, in every variant.** The parent's claim is
correct and I am upgrading it from a preference to a rule. A right-aligned value column is a
price column; it is the second axis; and a *ragged-left wrapped value* is a typographic defect
in its own right regardless of what it means. §7.1 is amended: **`text-align: right` now appears
in exactly one place on the site — the top-right meta strip in chapter 01.**

**Rules per pair — confirmed dead.** A rule between every row *is* the table; it is the only
graphic device that does nothing except assert "these things are comparable rows". §11.2's legal
uses of 1px `--rigo` are amended: **"registry row separators" is struck.** D, which added a rule
per pair, was the tallest of the eight (456px) and the most Amazon of the eight. That is not a
coincidence.

**A frame around the block — rejected.** Head rule only. See §1.2.

**Promoting `8` to `--type-num` — rejected, and it was my own idea.** It is tempting: eight rows
is the concept, `8` is the fact the whole site turns on, and it currently sits in the stack
indistinguishable from `Mais`. I am refusing it because (a) it needs a rank flag on `DataRow`,
which is component architecture and out of scope; (b) it makes the registro a place where rows
have ranks, which then requires a per-scheda editorial decision six times over; and (c) chapter
03 exists to say *Otto file* and says it at `--type-d2`. Saying it twice does not double it, it
halves it. **Eight is a characteristic of one ear, and it already has its chapter.**

**Flagged, not ruled — `Specie: Mais` in scheda 01.** On a page headlined
`MAIS ROSSO / OTTOFILE INTEGRALE`, the row `SPECIE — Mais` is a tautology, and it is the most
spec-sheet-shaped row in the set. Cutting it takes scheda 01 from 400px to 344px and removes the
one row that reads as a taxonomic category rather than a fact about this maize. The brief states
the information is not in question, so this is **not** part of the ruling — it goes to the
Content Strategist as a recommendation, and the ruling stands with or without it.

---

## 6. Marquee — ruling

**No. Not here, and not anywhere on this site.** The four grounds advanced were correct; I am
confirming them and adding the two that actually settle it.

1. **A marquee is a broadcast device; this is a record.** A register's authority comes from
   being fixed. Data that is moving is data you are being *shown*; data that is still is data
   you are *consulting*. Put the eight-row fact in perpetual motion and it stops being a
   determination and becomes a claim.
2. **It fails §19.16, the swap test, immediately and by itself.** A horizontal strip of Italian
   food words scrolling forever is on a hundred sites right now. It is the gesture that replaced
   the gradient blob. Remove the wordmark from a page containing one and you cannot tell whose
   page it is — which is the definition of the check that outranks all the others.
3. Motion vocabulary: §12.1 declares three durations, 160 / 320 / 640ms. A marquee has no
   duration; it has a rate. It is not expressible in this system's terms, and §18.19 makes any
   other duration a defect.
4. §18.32: an animation that cannot state the sentence it is speaking is decoration and is cut.
5. **It would be the second perpetual mechanism on the page.** The kernels→cob→field sequence
   and the 64-kernel count are the site's one continuous motion. There is exactly one, the same
   way there is exactly one chromatic event and exactly one video. A second infinite loop does
   not add motion; it costs the first one its meaning.
6. WCAG 2.2.2 — pause/stop/hide for anything auto-moving past 5s. Correct, and on a site with a
   deliberately designed reduced-motion path (§14) rather than an "animations off" shortcut, a
   control we would have to invent — with no icons permitted (§11.4, §18.6) — is a very loud
   consequence for a decorative gain.

**The transition band and the fiere strip are also refused**, for grounds 2, 3 and 5, which are
site-wide and not data-specific. The fiere strip is a list of real events with real dates; a
ticker makes a factual record unreadable and turns it into signage.

**And the note underneath the question is already answered in the build.** If the real complaint
was *"this block is inert"*, look at `ExperienceMotion.tsx:250–270`: the registro rows already
wipe in on scroll, `clip-path`, 640ms, 40ms stagger, `ease-registro`, once, reduced-motion safe.
The record already fills in line by line as you arrive. **Under this ruling it will do it in the
right order for the first time** — the datum, then its label — which is the typewriter gesture
the client is reaching for, executed inside the vocabulary instead of against it. No new motion
is authorised and none is needed.

---

## 7. Bible amendments this ruling carries

| § | Change |
|---|---|
| **§7.1** | `text-align: right` appears in **exactly one** place, not two: the chapter-01 meta strip. The registry values are left-aligned on the primary text axis. |
| **§11.2** | Strike "registry row separators" from the legal uses of 1px `--rigo`. Add: *one* 1px `--rigo` rule at the head of each registry block, six on the site, no foot rule. Reassign "the head of the registry column" from `--rigo-forte` to `--rigo` (reason in §1.2). |
| **§13.5** | Replaced in full — text in §3.1 above. |
| **§13.14** | Unchanged. Clarified by §4 above: it governs scaling, not assignment. |
| **§3.6** | Unchanged. Registry values remain DM Mono `--type-data-lg`. No new token. |

---

## 8. Verdict

**APPROVED WITH CHANGES** — treatment **I** ships as specified in §1.1, with zero media queries
and the head rule at `--rigo`; **G is REJECTED** as a card under §18.8/§19.9 and as a second
ground in a chapter that already has one; **H, D, right-alignment, per-row rules and every 18px
variant are REJECTED**; the marquee is **REJECTED** site-wide.

The client was right, the diagnosis in the brief was one level too shallow, and the fix costs
one deleted column and twenty-seven fewer pixels of page.
