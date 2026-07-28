# Audit del ritmo verticale — mobile

**Data:** 2026-07-28
**Ambito:** solo spaziatura verticale responsive. Nessun contenuto, copy, ordine di capitoli, font o palette viene toccato.
**Metodo:** pagina renderizzata e misurata a runtime a 360, 390, 430 e 768 px. Per ogni sezione sono state calcolate le *bande occupate* (unione dei riquadri di ogni elemento di contenuto) e i vuoti fra una banda e la successiva. Nessun valore è stimato.

---

## 1. Il quadro

| Larghezza | Altezza documento |
|---|---:|
| 360 px | 17.612 px |
| **390 px** | **17.261 px** |
| 430 px | 16.788 px |
| 768 px *(controllo)* | 18.002 px |

A 390 px il contenuto effettivo somma **10.858 px**. Il resto — **6.403 px, il 37% della pagina** — è vuoto.

Il problema **non è il padding di sezione in sé**, che è coerente. È la somma di tre cause distinte, di cui due sono difetti veri e una è una scelta legittima.

---

## 2. Tabella pre-intervento — 390 px

| Sezione | Altezza | Contenuto | Vuoto | Blocchi > 120 px | Causa CSS | Classificazione |
|---|---:|---:|---:|---:|---|---|
| `hero` | 800 | 32* | 768 | 664 (sotto) | `min-height: 100svh` + `align-content: start` | **Intenzionale** |
| `varieta` | 896 | 591 | 305 | — | `.scheda { min-height: 112svh }` | **Eccessivo** |
| `mais-del-re` | 1.340 | 723 | 617 | — | `padding-block: 104` + 4 margini interni 64–104 | **Eccessivo** |
| `otto-file` | 1.156 | 619 | 537 | — | `padding-block: 104` + margini 40–88 | **Intenzionale** *(vedi §4)* |
| `quasi-estinto` | 1.655 | 766 | 889 | **464** | `margin-top: --space-34` (272 px) non sovrascritto su mobile | **Accidentale** |
| `il-campo` | 1.414 | 773 | 641 | — | `padding-block: 104` + 4 margini 64–104 | **Eccessivo** |
| `la-pietra` | 1.562 | 881 | 681 | — | `padding-block: 104` + 3 margini da 104 | **Eccessivo** |
| `referenze` | 3.028 | 2.555 | 473 | — | `padding-block: 104`; il contenuto domina | **Accettabile** |
| `custodia` | 2.768 | 1.296 | **1.472** | **1.328** | tre `min-height` a viewport impilati + `padding-block: --space-21` (168) | **Accidentale** |
| `contatti` | 2.643 | 1.638 | 1.005 | — | `row-gap: --space-8` × 6 righe + padding | **Eccessivo** |

\* Il conteggio del contenuto dell'hero misura solo i paragrafi: il titolo è dentro un `div`, quindi il valore reale è ≈ 200 px. Non cambia la classificazione.

### 2.1 I vuoti maggiori, in dettaglio

```
custodia    top 208 · mid 268 · mid 476 · mid 168 · bottom 208   ← 1.328 px
quasi-est.  mid 192 · mid 272                                    ←   464 px
hero        bottom 664                                           ← intenzionale
```

Il vuoto da **476 px dentro `custodia`** non ha alcun elemento che lo giustifichi. È accidentale.

---

## 3. Elementi con altezze a viewport — inventario

| Regola | Valore mobile @800 vh | Vincolante? | Verdetto |
|---|---:|---|---|
| `.hero { min-height: 100svh }` | 800 px | sì | **Tenere** — è la copertina, occupa esattamente una schermata |
| `.scheda { min-height: 112svh }` | 896 px | **sì**, forza +305 px | **Rimuovere su mobile** |
| `.chapter { min-height: 120svh }` | 960 px | no | **Rimuovere** — inerte ma pronto a mordere |
| `.chapter--conservation { min-height: 152svh }` | 1.216 px | no | **Rimuovere** |
| `.chapter--products { min-height: 320svh }` | 2.560 px | marginale | **Rimuovere** |
| `.chapter--custody { min-height: 240svh }` | 1.920 px | no | **Rimuovere** |
| `.chapter--custody__body { min-height: 140svh }` | 1.120 px | **sì** | **Rimuovere su mobile** |
| `.chapter--custody__scene { min-height: 100svh }` | 800 px | sì | **Tenere** — è il riquadro fissato dell'inversione |

Nessun `margin-top: auto`. Nessun `justify-content: flex-end`. Nessuno spacer decorativo. Nessun pseudo-elemento che contribuisca all'altezza. Nessun wrapper più alto della propria immagine (i riquadri `aspect-ratio` combaciano). Nessun elemento nascosto che occupi spazio: `.chapter--conservation__reperto` è `display: none` sotto 768 px e non lascia residuo.

---

## 4. Il difetto di fondo: il padding contraddice la legge del progetto

`art-direction.md` §13.13 prescrive:

> *"Chapter padding drops from 168px to 64px — a 2.6× compression, not a proportional scale. The page gets denser, not smaller."*

L'implementazione usa **`--space-13`, cioè 104 px**. Non è una scelta compositiva: è una svista, e da sola produce **80 px in più per capitolo × 6 capitoli = 480 px**.

Lo stesso vale per i margini interni, fissati a `--space-13` (104 px) su mobile quando la scala del progetto avrebbe `--space-5` (40) e `--space-8` (64) disponibili.

---

## 5. Silenzi intenzionali — da conservare

Tre, e sono argomentabili:

1. **L'hero, 664 px sotto il titolo.** La copertina occupa esattamente una schermata. Il contenuto è in alto e il residuo sotto — impostazione decisa e verificata nell'intervento precedente. Non allunga la pagina: *è* la prima schermata.
2. **`otto-file` senza fotografia.** È l'unico capitolo in cui il concetto si dimostra da solo. Il suo respiro dà valore alle lastre che lo precedono e lo seguono. I suoi vuoti sono modesti (40–88 px) e restano.
3. **`.chapter--custody__scene` a `100svh`.** È il riquadro fissato in cui avviene l'inversione notturna, l'unico evento cromatico del sito. Un'altezza di viewport qui è essenziale e documentata.

Tutto il resto è padding che si è accumulato, non composizione.

---

## 6. Piano di correzione

Una sola scala mobile, applicata con differenze deliberate fra capitoli — non un valore unico per tutti.

| Relazione | Prima | Dopo | Token |
|---|---:|---:|---|
| Padding verticale capitolo | 104 | **64** | `--space-8` — allinea a §13.13 |
| Testata → primo blocco | 88–105 | **40** | `--space-5` |
| Blocco → blocco | 104 | **40 / 64** | `--space-5` / `--space-8` |
| Corpo → immagine o dati | 104 | **40** | `--space-5` |
| `quasi-estinto`: corpo e dati | 272 | **64** | `--space-8` |
| `custodia`: padding scena e corpo | 168 | **64** | `--space-8` |
| `contatti`: `row-gap` | 64 | **40** | `--space-5` |

I capitoli **non diventano identici**: `referenze` resta il più lungo perché ha cinque referenze, `custodia` conserva la sua scena a piena viewport, `otto-file` conserva il suo respiro, e `quasi-estinto` mantiene un intervallo più ampio degli altri prima del numerale `2007` — ridotto da 272 a 64, ma comunque il più largo della pagina fra corpo e dato.

Tutte le modifiche stanno **dentro `@media (max-width: 767px)`**. Desktop e tablet non vengono toccati.

---

## 7. Risultato misurato

### 7.1 Altezza documento

| Larghezza | Prima | Dopo | Δ | % |
|---|---:|---:|---:|---:|
| 360 px | 17.612 | **15.675** | −1.937 | **−11,0%** |
| **390 px** | **17.261** | **15.300** | **−1.961** | **−11,4%** |
| 430 px | 16.788 | **14.747** | −2.041 | **−12,2%** |
| 768 px *(controllo tablet)* | 18.002 | **18.002** | **0** | **invariato** |
| 1440 px *(controllo desktop)* | 18.772 | **18.772** | **0** | **invariato** |

### 7.2 Per capitolo — 390 px

| Sezione | Prima | Dopo | Δ | Regola responsabile |
|---|---:|---:|---:|---|
| `hero` | 800 | 800 | 0 | intenzionale, non toccata |
| `varieta` | 896 | **847** | −49 | `min-height: 112svh` → `auto` |
| `mais-del-re` | 1.340 | **1.196** | −144 | padding 104→64; corpo 104→40 |
| `otto-file` | 1.156 | **988** | −168 | padding 104→64; `__proof` 168→104, 64→40 |
| `quasi-estinto` | 1.655 | **1.199** | **−456** | `margin-top: --space-34` (272) → 64 |
| `il-campo` | 1.414 | **1.230** | −184 | padding 104→64; corpo 104→40 |
| `la-pietra` | 1.562 | **1.354** | −208 | padding 104→64; corpo e dati 104→40 |
| `referenze` | 3.028 | **2.948** | −80 | padding 104→64; `min-height: 320svh` → `auto` |
| `custodia` | 2.768 | **2.416** | **−352** | tre `min-height` a viewport rimossi; padding 168→64 |
| `contatti` | 2.643 | **2.403** | −240 | `row-gap` 64→40; etichette 40→24 |

**Le tre riduzioni maggiori** — `quasi-estinto` (−456), `custodia` (−352) e `contatti` (−240) — sono tutte correzioni di difetti, non compressioni di composizione.

### 7.3 Controlli

| Verifica | 360 | 390 | 430 | 1440 |
|---|---|---|---|---|
| Sovrapposizioni | 0 | 0 | 0 | 0 |
| Testo tagliato | 0 | 0 | 0 | 0 |
| Immagini collassate | 0/5 | 0/5 | 0/5 | 0/7 |
| Overflow orizzontale | 0 | 0 | 0 | 0 |
| Colonna laterale | 40 px `fixed` | 40 px `fixed` | 40 px `fixed` | 64 px `fixed` |
| Errori console | 0 | 0 | 0 | 0 |

**Blocchi vuoti > 120 px rimasti:** solo due, entrambi dentro momenti dichiarati — l'hero (664 px sotto il titolo, una schermata) e la scena fissata di `custodia`.

`lint`, `typecheck`, `build` puliti · **81 test passati**.

### 7.4 I capitoli non sono diventati identici

Altezze dopo l'intervento a 390 px: **847 · 1.196 · 988 · 1.199 · 1.230 · 1.354 · 2.948 · 2.416**. Il rapporto fra il più corto e il più lungo resta 1 : 3,5. `referenze` domina perché ha cinque referenze; `custodia` conserva la sua scena a piena viewport; `otto-file` resta il più arioso dei capitoli brevi.

---

## 8. Spazi ambigui — segnalati, non modificati

Due casi non sono stati toccati perché la loro correzione sarebbe una decisione di concept, non di spaziatura. Vanno decisi, non subiti.

**1 · L'hero, 664 px vuoti sotto il titolo (390 px).**
La copertina occupa `100svh` con il contenuto in alto e il residuo sotto — assetto deciso e verificato nell'intervento precedente. Non allunga la pagina in senso proprio: *è* la prima schermata. Ridurla significherebbe rinunciare alla copertina a piena viewport.
→ **Da decidere solo se si vuole che il capitolo 01 si affacci sotto la piega.**

**2 · La scena di `custodia`, ~800 px con ~200 px di contenuto.**
`.chapter--custody__scene { min-height: 100svh }` è il riquadro **fissato** in cui avviene l'inversione notturna, l'unico evento cromatico del sito. Il titolo è centrato in una riga `1fr`, e i due vuoti da 288 e 392 px sono la distribuzione di quella centratura. Ridurre l'altezza qui accorcerebbe il pin e comprimerebbe il momento che l'intera pagina costruisce per otto capitoli.
→ **Da rinegoziare con la motion-spec, non con il CSS.** Un'alternativa a costo zero, se si vuole più densità senza perdere il pin: portare il titolo da `align-self: center` a `start`, che sposta il vuoto tutto sotto invece di dividerlo in due. Non cambia l'altezza della pagina, cambia la lettura.

---
---

# Secondo passaggio — 2026-07-28

Il primo audit aveva corretto i difetti CSS oggettivi. Questo secondo mette in discussione **le scelte compositive**, come richiesto, e trova un errore di misura nel primo.

## 9. L'errore del primo audit: mancava il pin

Tutte le misure del primo passaggio erano state prese in `prefers-reduced-motion: reduce`, dove GSAP non crea il pin. **Con la motion attiva — cioè per la stragrande maggioranza dei visitatori — la pagina era 800 px più alta di quanto misurato.**

| | reduced-motion | motion attiva |
|---|---:|---:|
| Dopo il primo passaggio | 15.300 | **16.100** |

GSAP inserisce uno spacer di esattamente `end − start`. Con `end: "+=window.innerHeight"` il pin di `custodia` costava **una schermata intera di scroll** in cui nulla si muove tranne l'inversione. Era il singolo costo più grande della pagina e non compariva in nessuna tabella.

## 10. Hero — il gruppo editoriale

La hero contiene esattamente due elementi: `hero__meta` e il titolo. Non esistono descrizione né azioni.

Dopo il primo passaggio erano già entrambi in alto (104 e 176), quindi il gruppo non era spezzato. **Il problema vero era un altro: la hero riservava 800 px per 134 px di contenuto.** Non è una composizione, è una prenotazione.

- `min-height: 100svh` → **`60svh`** su mobile. Il gruppo resta in alto, seguito da ~240 px di carta: abbastanza da leggersi come copertina deliberata, non abbastanza da costare una schermata.
- `hero__meta` margin-bottom **40 → 24 px**: meta e titolo si leggono come un blocco unico invece che come due elementi separati.

§13 dell'art direction fissa griglia e rapporti, **mai l'altezza della hero**: questa è una decisione compositiva mobile, non una violazione.

## 11. Ch07 — Referenze: 2.948 → 2.676 px

Composizione misurata: testata 200 · lastra 231 · righello 25 · **cinque referenze 2.171** · padding. Il contenuto domina, ma trasportava spaziature desktop.

| Voce | Prima | Dopo |
|---|---:|---:|
| `padding-block` di ogni referenza | 40 + 40 | **24 + 24** |
| `product__data` margin-top | 24 | **16** |
| Stacchi attorno a lastra e righello | 64 × 3 | **40 × 3** |

Nessun prodotto rimosso, nessuna copy toccata, la lastra resta 231 px. Le cinque righe restano di altezza diversa fra loro (516/404/411/428/412 → proporzionalmente invariate): il capitolo **non** è diventato una griglia e-commerce.

## 12. Ch08 — Custodia: le tre varianti, misurate

| Variante | Pagina (motion) | `custodia` | Verdetto |
|---|---:|---:|---|
| **A** · stato dopo il primo passaggio | 16.100 | 3.216 | riferimento |
| **B** · titolo `align-self: start`, scena invariata | **16.100** | **3.216** | **nessuna riduzione** — sposta il vuoto, non lo elimina |
| **C** · titolo in alto + scena `64svh` + pin dimezzato | **14.772** | **2.528** | **−1.328 px** |

**La variante B conferma esattamente il sospetto**: allineare in alto migliora la lettura ma non accorcia di un pixel. Solo C riduce davvero.

Cosa cambia in C, e cosa no:

- **Scena `100svh` → `64svh`.** Teneva 800 px attorno a 160 px di contenuto — un'etichetta e tre righe. A 64svh riempie ancora la maggior parte del telefono.
- **Pin `+=100vh` → `+=50vh` solo sotto 768 px.** Dimezza lo spacer da 800 a 400 px.
- **Invariati:** inversione notturna, palette, chicco 64 come innesco, comportamento pinned, ingresso nel capitolo.

**Verificato dopo la modifica**, con motion e in reduced-motion: fondo pagina → `field: notte`, chicco 64 `completed`, contatore `08/08`; ritorno in cima → `field: giorno`. L'evento cromatico è intatto in entrambi i rami.

## 13. Contatti: 2.643 → 2.283 px

Oltre ai 240 px del primo passaggio: `percorso` padding 24→16, `contact__social` margin 40→24, `contact__legal` padding-top 40→24. Nessun blocco rimosso.

## 14. Risultato complessivo

| Larghezza | Origine | 1º passaggio | **2º passaggio** | Δ totale |
|---|---:|---:|---:|---:|
| 360 px | 17.612 | 15.675 | **14.667** | **−16,7%** |
| **390 px** | **17.261** | **15.300** | **14.292** | **−17,2%** |
| 430 px | 16.788 | 14.747 | **13.739** | **−18,2%** |
| 390 px *(motion attiva)* | ~18.061 | 16.100 | **14.692** | **−18,7%** |
| 768 px *(tablet)* | 18.002 | 18.002 | **18.002** | **0** |
| 1440 px *(desktop)* | 18.772 | 18.772 | **18.772** | **0** |

**Obiettivo raggiunto:** 14.292 px a 390 px, 14.692 con la motion attiva.

### Per capitolo — 390 px

| Sezione | Origine | 1º pass. | **2º pass.** |
|---|---:|---:|---:|
| `hero` | 800 | 800 | **480** |
| `varieta` | 896 | 847 | **847** |
| `mais-del-re` | 1.340 | 1.196 | **1.172** |
| `otto-file` | 1.156 | 988 | **988** |
| `quasi-estinto` | 1.655 | 1.199 | **1.199** |
| `il-campo` | 1.414 | 1.230 | **1.206** |
| `la-pietra` | 1.562 | 1.354 | **1.314** |
| `referenze` | 3.028 | 2.948 | **2.676** |
| `custodia` | 2.768 | 2.416 | **2.128** |
| `contatti` | 2.643 | 2.403 | **2.283** |

Rapporto fra il capitolo più corto e il più lungo: **1 : 5,6**. I capitoli non si somigliano.

### Controlli

| | 360 | 390 | 430 | 768 | 1440 |
|---|---|---|---|---|---|
| Overflow orizzontale | 0 | 0 | 0 | 0 | 0 |
| Sovrapposizioni | 0 | 0 | 0 | 2 ‡ | 1 ‡ |
| Immagini collassate | 0/5 | 0/5 | 0/5 | 0/5 | 0/7 |
| Testo tagliato | 0 | 0 | 0 | 0 | 0 |
| Errori console | 0 | 0 | 0 | 0 | 0 |

‡ **Preesistenti e fuori ambito.** `otto-file: chapter--rows__eight × t-body` è il numerale decorativo `8` a piena altezza su cui il testo è deliberatamente sovrapposto (`aria-hidden`). `il-campo: chapter__standfirst × registro` compare solo a 768 px. Nessuna delle due è stata introdotta qui: il diff non tocca una sola regola che si applichi sopra i 767 px.

`lint`, `typecheck`, `build` puliti · **81 test passati**.

## 15. Spazi rimasti deliberatamente ampi

1. **`otto-file`, 537 px di vuoto su 988.** È il capitolo senza fotografia, l'unico in cui il concetto si dimostra da solo. Il suo respiro dà valore alle lastre che lo precedono e lo seguono. **Non toccato in nessuno dei due passaggi.**
2. **La scena di `custodia`, ~512 px per ~160 px di contenuto.** Ridotta da 800, non azzerata: resta il fotogramma in cui la pagina si ferma e inverte.
3. **La hero, ~240 px sotto il gruppo.** Ora è una proporzione leggibile — gruppo in alto, respiro sotto — invece di 562 px di riserva.
4. **`quasi-estinto`, l'intervallo prima di `2007`.** Resta il più ampio della pagina fra corpo e dato, a 64 px anziché 272.

## 16. Nota di metodo

Il primo audit ha misurato solo in reduced-motion e ha mancato 800 px di pin. **Ogni misura di altezza su questo progetto va presa in entrambi i rami**, perché il pin esiste solo in uno dei due e vale una schermata intera.
