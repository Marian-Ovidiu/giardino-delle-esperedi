# Art Direction Review — uso delle immagini

**Data:** 2026-07-27
**Ambito:** esclusivamente il trattamento delle immagini. Copy, palette, tipografia, contenuti, ordine delle sezioni e UX non si toccano.
**Metodo:** pagina renderizzata a 1440×1000, misurazione a runtime di posizione e dimensione di ogni immagine, più lettura del ritmo verticale sull'intera altezza (16.898 px).

---

## 0-bis. Vincoli integrati prima dell'implementazione — 2026-07-27

Tre correzioni alla proposta originale, richieste in sede di approvazione. La terza la cambia in modo sostanziale.

### A · Nessun riuso della stessa sorgente in capitoli consecutivi

La proposta originale violava il vincolo in due punti: `re-materia` in `ch01` e `ch02`, e `pietra-farina` in `ch06` e `ch07`. Riassegnazione completa:

| Cap. | Pattern | Asset | Nota |
|---|---|---|---|
| 01 | `CAMPITURA` | `campo-terra` | la terra come fondo della varietà |
| 02 | `LASTRA` | `re-materia` | — |
| 03 | — | — | silenzio deliberato |
| 04 | `REPERTO` 1:1 | `atmosfera-luce` | — |
| 05 | `LASTRA` | `campo-coltura` | — |
| 06 | `CAMPITURA` + oggetto | `pietra-macina` + `pietra-farina` | due sorgenti diverse |
| 07 | `LASTRA` | `referenze-collettiva` *(nuovo)* | — |
| 08 | — | — | notte, tipografica |

**Zero riusi. Zero ripetizioni consecutive. Nessun fallback necessario.** Il conto torna: sette sorgenti per sette slot. Per ottenerlo ho eliminato il `REPERTO` sovrapposto di `ch05` previsto in origine — la sovrapposizione richiedeva un ottavo asset che avrebbe imposto un riuso, e la lastra a vivo regge il capitolo da sola.

`campo-terra` (ch01) e `campo-coltura` (ch05) appartengono alla stessa famiglia materica ma sono sorgenti distinte, distano quattro capitoli e ricevono trattamenti opposti — fondo al 10% contro lastra a vivo.

### B · Le opacità delle `CAMPITURA` sono intervalli, non valori

0,10–0,14 è un punto di partenza. Da verificare a 1440, 1024 e mobile misurando il contrasto reale del testo sopra l'immagine, e da correggere per crop, `object-position` e opacità dove la fotografia interferisce con corpo, numerali o colonna dati. Risultati delle misure nella §13.

### C · `ch07` non resta tipografico — verifica e correzione

**Verifica.** `ch07 — Le referenze` è **l'unica sezione prodotto dell'intero sito.** Non esiste, e non è pianificata, alcuna composizione separata con immagini scontornate. `art-direction.md` §17 stabilisce che i prodotti siano *"presented without packshots"*, e `asset-plan.md` ha **cancellato** `ch07-galletta` e `ch07-grissini` alla chiusura del programma fotografico.

**Conseguenza.** La proposta originale — una lastra di farina in apertura e poi solo tipografia — lasciava di fatto i prodotti senza alcuna rappresentazione, in tutto il sito. Non era una scelta dichiarata: era un effetto collaterale. Va corretta.

**Soluzione adottata: una composizione collettiva non enumerabile.**

`ch07` si apre con una `LASTRA` che mostra il mais **come cibo**: farina, briciole, frammenti di sfoglia e grissini sovrapposti e sparsi. È collettiva perché mostra le trasformazioni insieme, e **deliberatamente non enumerabile**: non si possono contare i prodotti nell'inquadratura.

Questa seconda proprietà non è un dettaglio. Una composizione in cui si contano tre oggetti riaffermerebbe visivamente *"Non una gamma. Tre."* — la dichiarazione falsa appena rimossa dal sito. Il catalogo ha cinque referenze, due delle quali sono liquidi che non possono essere mostrati senza inventare una bottiglia. **L'unica composizione onesta è quella che non si conta.**

**Limite dichiarato.** Non è un packshot e non lo sostituisce. Birra e Amaro non vi compaiono. È una piastra provvisoria come tutte le altre, marcata `IMMAGINE PROVVISORIA`, e la fotografia collettiva definitiva delle confezioni la sostituirà nello stesso slot senza modifiche al layout.

**Le righe prodotto restano intatte:** nessuna immagine per referenza. Una foto per riga trasformerebbe il registro in una griglia e-commerce, esplicitamente fuori mandato, e sarebbe un pattern ripetuto cinque volte.

---

## 0. La diagnosi, in numeri

Non è un'impressione. È misurato.

| | |
|---|---|
| Piastre fotografiche in pagina | **6** |
| Larghezze diverse fra loro | **1** — tutte 477 px |
| Altezze diverse fra loro | **1** — tutte ~347 px |
| Piastre che iniziano a x = 295 | **4 su 6** |
| Rapporti d'immagine usati | **1** (8:5). L'art direction ne prevede **2** |
| Immagini a pieno campo o a vivo | **0** |
| Immagini che escono dalla griglia | **0** |
| Superficie di pagina occupata da fotografia | **~8%** |

**Il problema non è che il pattern si ripete. È che non esiste gerarchia.** Sei momenti fotografici, tutti della stessa identica dimensione, su una pagina alta 16.898 px. Nessuna immagine è più importante di un'altra, quindi nessuna è importante.

E c'è un secondo problema, più grave, che la richiesta non nominava:

**La fotografia è tutta concentrata in una fascia centrale.** La prima piastra compare a 2.865 px; l'ultima finisce a 9.314 px. Il **17% iniziale** e il **45% finale** della pagina non hanno una sola fotografia. Le referenze, la Custodia e i Contatti — cioè tutta la seconda metà, dove si converte — sono un blocco tipografico di 7.500 px ininterrotti.

> Nota di metodo: la legge del progetto (§7.5) vieta già lo zig-zag — *"Content never alternates left/right between sections. There is no zig-zag. A registry does not zig-zag."* Quindi la soluzione **non** è alternare testo/immagine a specchio. Sarebbe una violazione, e sarebbe anche solo un altro pattern ripetuto.

---

## 1. `ch01 — La varietà`

**1. Layout attuale.** Nessuna piastra fotografica. Solo una lastra procedurale di fondo (`prologue-static--plant`) al 18% di opacità.

**2. Criticità.** Il capitolo che presenta il protagonista è l'unico senza presenza fotografica. Introduce la varietà e non la mostra.

**3. Nuovo layout proposto.** **Campitura fotografica** — `re-materia` promossa a fondo di sezione: assoluta, `inset: 0`, `object-fit: cover`, `multiply`, opacità 0,10–0,12, dietro il testo e la colonna dati. Convive con la lastra procedurale esistente su un livello inferiore.

**4. Motivazione.** Apre la pagina con un registro **materico e non oggettuale**: si percepisce la materia prima di vedere un oggetto. E stabilisce fin da subito che questo sito ha due modi di usare la fotografia — come atmosfera e come reperto — invece di uno solo.

**5. Trasformazioni.** `re-materia` va riusata come background. Serve un secondo derivato dal master a copertura larga (2560×1600); nessuna nuova generazione.

---

## 2. `ch02 — Il mais del Re`

**1. Layout attuale.** Una piastra 8:5 a colonne 2–4 (x = 295, 477×347), sotto il corpo testo, con la colonna dati a destra.

**2. Criticità.** È il layout più convenzionale della pagina: testo a sinistra, dati a destra, immaginetta sotto. La piastra è troppo piccola per pesare e troppo grande per essere una nota. E ha **posizione e dimensione identiche** a quella di `ch04`.

**3. Nuovo layout proposto.** **Lastra a vivo destra.** `re-materia` (o il suo sostituto definitivo) passa a colonne **4 → oltre il bordo destro**, con il **16% della larghezza fuori schermo**. Altezza ~620 px. Il testo resta a colonne 2–3; la colonna dati sale sopra la lastra.

**4. Motivazione.** §7.4.1 autorizza esplicitamente il taglio al bordo destro nei capitoli **02, 05 e 07**, una immagine per capitolo, massimo 20% fuori campo. È **già legge e non è mai stato usato**. Questa è la mossa che rende la pagina editoriale invece che ordinata: l'immagine non è contenuta nella griglia, la attraversa ed esce — esattamente come il titolo dell'hero. Il gesto della copertina si ripresenta una volta sola, e qui.

**5. Trasformazioni.** Ingrandire da 477 a ~1.150 px di larghezza renderizzata. Master 2560×1600 già disponibile: nessuna rigenerazione.

---

## 3. `ch03 — Otto file`

**1. Layout attuale.** Nessuna piastra. Solo il rilascio della lastra procedurale.

**2. Criticità.** Nessuna, ed è deliberato.

**3. Nuovo layout proposto.** **Invariato. Zero fotografia.**

**4. Motivazione.** È il capitolo in cui il concetto si dimostra da solo: otto colonne, otto segni, il numerale 8 in Bodoni. Una fotografia qui indebolirebbe l'unico momento in cui la pagina è pura struttura. **Il vuoto fotografico è ciò che dà valore alla lastra di `ch02` che lo precede e a quella di `ch05` che lo segue.** Se ogni capitolo ha un'immagine, nessuna immagine conta.

**5. Trasformazioni.** Nessuna.

---

## 4. `ch04 — Quasi estinto`

**1. Layout attuale.** Una piastra 8:5 a colonne 2–4 (x = 295, 477×339). **Posizione e dimensione identiche a `ch02`.**

**2. Criticità.** La ripetizione più visibile della pagina: due capitoli consecutivi in cui l'occhio trova la stessa forma nello stesso punto. Viola anche lo spirito di §7.5 — *"the registry column… should not begin at the same offset in two consecutive chapters"*.

**3. Nuovo layout proposto.** **Dettaglio quadrato.** `atmosfera-luce` ritagliata **1:1**, ridotta a ~300 px, collocata a colonne **6–7**, allineata alla base del numerale `2007`.

**4. Motivazione.** §8 prevede **due** rapporti — 8:5 e 1:1 — e l'1:1 è documentato per i *detail plates*. Non è mai stato usato. Introdurre qui il quadrato piccolo fa tre cose insieme: rompe la sequenza di rettangoli, abbassa il volume dopo la lastra grande di `ch02`, e mette l'immagine accanto all'unico dato drammatico del capitolo — l'anno. Diventa una **scheda di reperto**, non un'illustrazione.

**5. Trasformazioni.** Ridurre e **ritagliare 1:1 dal master**, generando un derivato 1600×1600. Non ritagliare via CSS: §8.4 lo definisce un difetto (*"object-fit: cover with a non-native aspect box is a defect"*). Su mobile l'1:1 si elimina, come da §8.5.

---

## 5. `ch05 — Il campo`

**1. Layout attuale.** Due piastre 8:5 affiancate, 477×347 ciascuna, a colonne 2–4 e 5–7.

**2. Criticità.** La coppia affiancata è **il gesto più debole della pagina**. Legge come una galleria — due immagini di pari peso, decise da una griglia e non da una gerarchia. È anche il pattern che `ch06` ripete identico poco dopo.

**3. Nuovo layout proposto.** **Lastra a vivo + dettaglio sovrapposto.** `campo-terra` diventa la seconda lastra a vivo della pagina: colonne **3 → oltre il bordo destro**, 14% fuori campo, altezza ~700 px. `campo-coltura` diventa un **1:1 da ~260 px sovrapposto**, appoggiato sul bordo inferiore sinistro della lastra con offset di −40 px, sopra la colonna 2.

**4. Motivazione.** La sovrapposizione è l'unico modo di creare profondità senza animazione e senza parallasse (entrambe fuori mandato e vietate). Due immagini smettono di essere pari: una è il campo, l'altra è un campione prelevato dal campo. È la relazione che il capitolo racconta a parole — e la sovrapposizione la rende visibile. **Nessuna ombra CSS, nessun bordo, nessun keyline** (§8.6): la sovrapposizione si legge per taglio, non per effetto.

**5. Trasformazioni.** `campo-terra` da 477 a ~1.230 px. `campo-coltura` da 477 a 260 px e riquadrata 1:1.

---

## 6. `ch06 — La pietra`

**1. Layout attuale.** Due piastre 8:5 affiancate, 477×347. **Identico a `ch05`.**

**2. Criticità.** La ripetizione che la richiesta segnalava, nella sua forma più letterale: stessa griglia, stessa dimensione, stesso asse, a 1.800 px di distanza.

**3. Nuovo layout proposto.** **Momento a piena campitura.** `pietra-macina` diventa il fondo dell'intera sezione — assoluta, `inset: 0`, `cover`, `multiply`, opacità 0,14 — con testo, `CHICCO / FARINA` e colonna dati sopra. `pietra-farina` resta l'**unico oggetto** del capitolo: 8:5, colonne **5–7**, ~590 px, allineata in basso.

**4. Motivazione.** Questo è il capitolo dell'unico passaggio irreversibile del registro, e merita l'unico cambio di **ambiente** della metà chiara. La pietra smette di essere una fotografia e diventa la superficie su cui il capitolo è stampato — un gesto tipografico, non fotografico. Poi una sola immagine, la farina, come esito. **Da due immagini pari a un ambiente più un oggetto.**

**5. Trasformazioni.** `pietra-macina` → background a copertura (derivato 2560×1600). `pietra-farina` da 477 a ~590 px.

---

## 7. `ch07 — Le referenze`

**1. Layout attuale.** Zero immagini. Cinque righe di registro puramente tipografiche.

**2. Criticità.** È la sezione commercialmente più importante e l'inizio di **7.500 px senza una sola fotografia**. La pagina, proprio dove deve convincere, smette di essere vista e diventa solo letta.

**3. Nuovo layout proposto.** **Una sola lastra a vivo, in apertura di capitolo, prima della prima referenza.** `pietra-farina` riusata a colonne **4 → oltre il bordo destro**, 18% fuori campo, altezza ~520 px. **Le righe prodotto restano intatte: nessuna immagine per prodotto.**

**4. Motivazione.** §7.4.1 autorizza il taglio a destra anche in `ch07`, ed è il terzo e ultimo uso consentito. Mettere una foto per prodotto trasformerebbe il registro in un catalogo e-commerce — esattamente ciò che il concetto rifiuta, e sarebbe un quarto pattern ripetuto cinque volte. **Una sola immagine grande apre il capitolo, poi la tipografia lavora da sola.** Il contrasto fra la lastra e le righe nude è ciò che rende le righe autorevoli.

**5. Trasformazioni.** Riuso di `pietra-farina` con crop diverso dal master. Nessuna generazione.

---

## 8. `ch08 — Custodia` e `contatti`

**1. Layout attuale.** Zero immagini, campo notte.

**2. Criticità.** Nessuna.

**3. Nuovo layout proposto.** **Invariato. Zero fotografia, per legge.**

**4. Motivazione.** L'inversione notturna è l'unico evento cromatico del sito (Invariante 3). Introdurre fotografia sul campo `--notte` costringerebbe a un secondo trattamento d'immagine — su fondo scuro il `multiply` non funziona — e diluirebbe il momento che l'intera pagina costruisce per otto capitoli. **La chiusura è tipografica e deve restarlo.** Che gli ultimi 3.000 px non abbiano fotografia è corretto; il problema sono i 4.500 px *prima*, che il punto 7 risolve.

**5. Trasformazioni.** Nessuna.

---

## 9. I tre pattern fotografici della landing

Tre, e non uno di più. Ogni immagine della pagina deve appartenere a uno di questi.

### A · `LASTRA` — la lastra a vivo
8:5, 1.100–1.250 px renderizzati, esce dal bordo destro per il 14–18%. **Massimo tre in tutta la pagina: `ch02`, `ch05`, `ch07`** — i soli capitoli in cui §7.4.1 lo consente. È il momento fotografico alto, e la sua rarità è il suo valore.

### B · `REPERTO` — il dettaglio quadrato
1:1, 260–320 px, collocato nelle colonne 6–7 o sovrapposto a una `LASTRA`. Desktop e tablet; eliminato su mobile (§8.5). È il registro basso e ravvicinato: un campione, non una scena.

### C · `CAMPITURA` — l'immagine come fondo
Copertura di sezione, `multiply`, opacità **0,10–0,14**, dietro tutto il contenuto. **Massimo due in pagina: `ch01` e `ch06`.** È il momento quasi tipografico, in cui la fotografia diventa superficie di stampa e la leggibilità non si discute.

**Alternanza risultante** — `ch01` C · `ch02` A · `ch03` nulla · `ch04` B · `ch05` A+B · `ch06` C+oggetto · `ch07` A · `ch08` nulla.
Nessun pattern compare due volte di fila. Fra due `LASTRA` c'è sempre almeno un capitolo di respiro.

---

## 10. Pattern da eliminare

1. **La coppia affiancata 50/50.** Usata identica in `ch05` e `ch06`. Due immagini di pari peso non sono una gerarchia: sono l'assenza di una decisione. Va eliminata da entrambi i capitoli e non deve tornare.
2. **La dimensione unica 477×347.** È la causa reale della sensazione di prevedibilità. Dopo l'intervento le larghezze renderizzate vanno da 260 px a piena campitura: **cinque scale diverse invece di una.**
3. **L'asse fisso a x = 295.** Quattro piastre su sei partono dallo stesso punto. Le `LASTRA` partono da colonna 3 o 4, i `REPERTO` da colonna 6.
4. **La piastra "sotto il corpo testo".** Posizione di default, non scelta compositiva: l'immagine finisce dove avanza spazio.

**Da non introdurre**, benché richiesto in forma generica: lo **zig-zag testo/immagine a specchio** (vietato da §7.5) e l'**immagine a piena larghezza contenuta nelle colonne 1–8**. Quest'ultima occuperebbe la colonna 8, che è il vuoto riservato e la principale generatrice di asimmetria del progetto (Invariante 1, §7.5). La distinzione è precisa e vale la pena fissarla:

> **Il vuoto non è violato da un'immagine che lo attraversa ed esce. È violato da un'immagine che si ferma dentro.**
> Per questo la lastra a vivo è legale e il full-width contenuto non lo è.

---

## 11. Valutazione finale del ritmo visivo

**Stato attuale: 4/10.** Ordinato, coerente, tipograficamente forte — e visivamente piatto. Sei immagini di dimensione identica non producono ritmo: producono una texture regolare. La pagina ha un'ottima *struttura* e nessuna *dinamica*. E la fotografia abbandona il lettore esattamente a metà, prima delle referenze.

**Stato previsto dopo l'intervento: 8/10.** Con questa sequenza il lettore attraversa:

> materia diffusa → **lastra grande che esce dal foglio** → struttura pura, nessuna immagine → piccolo reperto quadrato → **lastra grande con campione sovrapposto** → cambio di ambiente, la pagina stampata sulla pietra → **ultima lastra** → tipografia nuda → notte.

Sette registri visivi diversi in otto capitoli, con due silenzi fotografici deliberati (`ch03` e la chiusura) che fanno da respiro. Nessuna animazione, nessun cambio al design system, nessuna riga di copy toccata.

**Cosa resta a 8 e non a 10:** le immagini sono ancora provvisorie e materiche. Il salto finale non è compositivo — è fotografico. Una `LASTRA` a 1.200 px chiede una fotografia vera, e a quella scala una piastra generata non regge il confronto. **Questo intervento prepara la pagina alle fotografie definitive; non le sostituisce.**

---

## 13. Implementato — misure prima/dopo (2026-07-27)

Tutte le cifre sono misurate a runtime, non stimate.

### 13.1 Dimensioni, rapporti, posizione — desktop 1440

| Prima | Dopo |
|---|---|
| 6 piastre, **tutte 477 × 347** | 7 piastre, **sette dimensioni diverse** |
| **1 sola larghezza** | 310 · 477 · 957 · 1115 · 1134 · 1376 · 1376 |
| **1 solo rapporto** (8:5) | **2 rapporti** — 8:5 e 1:1 reale |
| **4 su 6 a x = 295** | x = 64 · 295 · 462 · 462 · 629 · 796 · 1376 |
| **0 fuori griglia** | **3 lastre a vivo** — 13,8% · 12,3% · 15,3% fuori campo (limite §7.4.1: 20%) |
| 0 fondi | 2 campiture a piena sezione |

### 13.2 Superficie e distribuzione verticale

| | Prima | Dopo |
|---|---|---|
| Superficie piastre (esclusi i fondi) | ~8% | **9,6%** desktop · 10,4% a 1024 · 4,0% mobile |
| Superficie incluse le campiture | ~8% | **~24%** |
| Prima immagine | 2.865 px | **1.000 px** |
| Ultima immagine | 9.314 px | **11.239 px** |
| Pagina senza fotografia, in testa | 17% | **5%** |
| Pagina senza fotografia, in coda | **45%** | **34%** *(chiusura tipografica voluta)* |

La fascia coperta passa da 2.865–9.314 (38% dell'altezza) a 1.000–11.239 (**55%**), e non abbandona più il lettore prima delle referenze.

### 13.3 Rispetto dei vincoli

| Verifica | 1440 | 1024 | 390 |
|---|---|---|---|
| Overflow orizzontale | 0 | 0 | 0 |
| Collisioni immagine/contenuto | 0 | 0 | 0 |
| Errori console | 0 | 0 | 0 |
| Lastre a vivo | 3 | 3 | **0** (rientrano nel campo, §7.4.1) |
| Reperto 1:1 | 1 | 1 | **0** (eliminato, §8.5) |

### 13.4 Leggibilità sopra le campiture — il vincolo 2

Le opacità proposte (0,10–0,14) **non erano utilizzabili.** Misurate:

| | proposto | misurato | esito |
|---|---|---|---|
| Testo secondario su ch01 | 0,09 | **4,35 : 1** | ✗ sotto AA |
| Testo secondario su ch06 | 0,11 | **4,18 : 1** | ✗ sotto AA |

`--pietra-testo` sta a 5,15:1 su `--carta` nuda: il fondo si mangiava tutto il margine. Opacità ridotte a **0,055** (ch01) e **0,06** (ch06), ×0,75 su mobile:

| | dopo | testo primario |
|---|---|---|
| ch01 · 1440 e 1024 | **4,71 : 1** ✓ | 13,09 : 1 |
| ch06 · 1440 e 1024 | **4,71 : 1** ✓ | 13,09 : 1 |
| mobile | **5,12 : 1** ✓ | 14,24 : 1 |

Il margine è sottile (4,71 contro 4,50). Chi rialza quei valori deve **rimisurare**, non giudicare a occhio.

### 13.5 Difetti trovati e corretti durante la review visiva

1. **Le campiture non si posizionavano.** Una regola scritta a suo tempo per il prologue — `.scheda > :not(.prologue-static) { position: relative }` — annullava `position: absolute` e riduceva il fondo a una cella di griglia da 143 × 89 px. Esclusione estesa a `.piastra--campitura`.
2. **In ch02 la tabella dati era stampata sopra la lastra.** Stessa riga di griglia. Lastra spostata su una riga propria.
3. **In ch04 il numerale `2007` si sovrapponeva al reperto.** Reperto spostato a sinistra: quadrato piccolo a sinistra, numerale grande a destra.
4. **In ch07 il righello `01…08` era stampato sopra la fotografia.** Il primo rilevatore non lo controllava perché interrogava un elenco di selettori scelto a mano; allargato a ogni elemento foglia, e la lastra spostata sotto il righello.
5. **L'oggetto di ch06 non aveva alcuna regola di posizionamento** e cadeva in una cella casuale (87 × 293 px su mobile).

### 13.5-bis Mobile — la gerarchia invertita

**La prima implementazione mobile era sbagliata, e va detto: non era una composizione, era una sottrazione.** Applicava correttamente `§13.6` (via l'1:1) e `§13.7` (via il vivo) e non metteva niente al loro posto. Risultato misurato: **quattro piastre tutte 291 × 231**, cioè esattamente il difetto — una sola scala, nessuna gerarchia — che questa review esisteva per eliminare. Più un'immagine semplicemente cancellata.

**Il vincolo reale.** Sotto i 768 px nessuna piastra può superare 291 px di larghezza o 182 px di altezza: il vivo è vietato, il rapporto è bloccato a 8:5, il vuoto della colonna 8 sopravvive (`§13.4`). Le piastre **non possono** portare la scala su un telefono.

**La correzione: mobile scambia i ruoli.** Sul desktop le lastre pesano e i fondi sussurrano. Sotto i 768 px sono i **fondi** a diventare l'elemento forte — una superficie materica alta 1.561 px su cui il capitolo è stampato — e le piastre diventano punteggiatura silenziosa a tre larghezze diverse. Stessi asset, stesse regole, logica opposta.

| | Prima | Dopo |
|---|---|---|
| Larghezze piastra | **1** (291) | **3** — 291 · 206 · 206 |
| Posizioni orizzontali | 1 (x = 56) | 2 — x = 56 e **x = 142** |
| Immagini visibili | 3 piastre + 2 fondi *(ch04 cancellata)* | **5 piastre + 2 fondi** |
| Forza dei fondi | 0,041 / 0,045 — quasi invisibili | **0,075 / 0,080** |
| Contrasto testo secondario | 5,12 : 1 | **4,71 : 1** (ch01) · **5,07 : 1** (ch06) ✓ |
| Overflow | 0 | 0 |

**Tre decisioni dietro i numeri.**

1. **`ch04` riprende la sua immagine.** `§8.5` elimina il *rapporto* 1:1, non l'*immagine*: la prima implementazione confondeva le due cose. Mobile riceve ora lo stesso soggetto nel formato consentito (8:5, 206 px), registrato come slot proprio in `media.ts`. Ciascuna delle due versioni è nascosta all'altro breakpoint e non viene scaricata quando non serve.
2. **I fondi si rafforzano invece di attenuarsi.** La prima passata li riduceva del 25%, rendendo quasi invisibile l'unico elemento capace di portare scala su un telefono. I valori attuali sono il massimo misurato che tiene `--pietra-testo` sopra 4,5:1 a 390 px.
3. **Uno scarto di posizione, non un zig-zag.** L'oggetto di `ch06` si sposta a colonne 3–7. Nulla si alterna: un solo elemento è disassato una sola volta. `§7.5` vieta l'alternanza sistematica, non l'asimmetria.

### 13.6 Onestà degli asset — il vincolo 5

Nessuna piastra è presentata come fotografia reale del prodotto o dell'azienda.

- Tutte e cinque le piastre citabili portano l'annotazione **`IMMAGINE PROVVISORIA`**, generata dallo stato e non scritta a mano.
- Le didascalie nominano la materia e si fermano: *Brattee secche · Luce · Steli · Farina · Materia*.
- Gli alt descrivono ciò che è visibile e mai luogo, proprietario, persona o processo.
- Le due campiture sono `aria-hidden`, senza didascalia e senza nome accessibile: un fondo non è una piastra citabile.
- Un test vieta nei testi delle piastre: `azienda`, `giardino`, `cherasco`, `piemonte`, `langhe`, `matteo`, `nostro`, `coltivat`, `storic`, `archivio`.

### 13.7 Fallback e limiti dichiarati

- **Nessun riuso di sorgente.** Sette master per sette slot. Il `REPERTO` sovrapposto previsto in ch05 è stato eliminato proprio per evitare l'ottavo slot che avrebbe imposto un riuso.
- **`ch07` non mostra confezioni.** La composizione collettiva è materia, non packshot; Birra e Amaro non vi compaiono. È il limite dichiarato in §0-bis C, e si risolve solo con fotografia reale.
- **Deroga dichiarata a §8.4 per le sole `CAMPITURA`.** Un fondo di sezione non può avere rapporto fisso, perché la sezione cresce col contenuto: il derivato è reale (2000 × 1250) ma il riquadro è a copertura. La regola §8.4 riguarda le *piastre* — oggetti citabili con didascalia — non le superfici. Le campiture sono decorative e `aria-hidden`, e questa è la ragione per cui l'eccezione è difendibile.

---

## 12. Nota tecnica per l'implementazione

Il sistema esistente regge tutto quanto sopra senza modifiche strutturali:

- I derivati 1:1 e a copertura si producono **dai master già in `assets/masters/piastre/`** con `scripts/build-piastre.mjs`. Nessuna nuova generazione Higgsfield, nessun credito speso.
- I nuovi ritagli si registrano come nuove voci in `src/content/media.ts`, che resta l'unico punto in cui esistono i path.
- §8.4 va rispettata: ogni ritaglio è un **derivato reale al rapporto in cui viene mostrato**, mai un `object-fit` su un box di rapporto diverso.
- I pattern `LASTRA`, `REPERTO` e `CAMPITURA` vanno espressi come tre varianti di `<Piastra>`, così che il pattern sia una scelta dichiarata nel markup e non una regola CSS per capitolo.
- Le didascalie e l'annotazione `IMMAGINE PROVVISORIA` restano su `LASTRA` e `REPERTO`. Su `CAMPITURA` decadono: un fondo non è una piastra citabile, ed è `aria-hidden`.
