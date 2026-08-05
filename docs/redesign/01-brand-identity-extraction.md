# Estrazione identità — Mais Rosso Co.

Data: 5 agosto 2026  
Responsabile: Agente 1 — Brand Asset & Identity Analyst  
Stato: proposta documentata per il consolidamento del Brand Redesign Lead; nessuna modifica al frontend o agli asset

## 1. Esito operativo

L’identità più recente e riconoscibile è costruita attorno a cinque elementi: nome **Mais Rosso Co.**, doppia pannocchia illustrata, sigillo circolare, palette arancio-corallo/crema/blu petrolio/rosso ramato e tipografia sans geometrica ad alto peso. Questi elementi compaiono con continuità nel logo di settembre 2025, nella brochure commerciale di settembre 2025, nel materiale espositivo di luglio 2025 e nell’etichetta La Maisèra ricevuta a luglio 2026.

Il sito non deve copiare un’etichetta su scala pagina. Deve però riprendere gli invarianti visivi del packaging, affinché sito e prodotti risultino appartenenti allo stesso marchio.

Decisioni da considerare già definitive:

- Mais Rosso Co. è l’unico brand commerciale pubblico;
- la denominazione storica e il vecchio albero non devono apparire nell’esperienza pubblica;
- la doppia pannocchia è il simbolo distintivo da portare in primo piano;
- arancio-corallo, crema e blu petrolio sono la base digitale, con rosso ramato e bruno derivati dal chicco;
- il vintage distressed può restare come accento molto limitato, non come costume;
- il sistema tipografico deve partire da font presenti nei materiali e legalmente utilizzabili, non dalla Bodoni per inerzia.

### Gate sul marchio

Il file logo più recente, `MAIS ROSSO LOGO.pdf` del 18 settembre 2025, contiene ancora due piccoli emblemi laterali: il timbro “Gourmet Piemonte” e il vecchio albero. Usarlo integralmente violerebbe la decisione di non mostrare il vecchio albero. Inoltre il PDF è un assemblato misto, con testo vettoriale/subset incorporati e immagini raster, non un master vettoriale pulito.

Per l’implementazione è quindi necessaria una delle seguenti approvazioni, in ordine di preferenza:

1. master ufficiale aggiornato, senza vecchio albero, in SVG/PDF vettoriale e PNG trasparente;
2. approvazione cliente di una lockup derivata esclusivamente dagli elementi correnti: doppia pannocchia + wordmark Mais Rosso Co.;
3. temporaneamente, wordmark testuale Mais Rosso Co. con doppia pannocchia separata, senza presentarlo come nuovo logo definitivo.

Questo è un blocco per la **riproduzione esatta del logo**, non per architettura, contenuti o sviluppo del resto del sistema.

## 2. Fonti e metodo

Sono stati letti integralmente i due report di base:

- `docs/brand-audit-materiali-cliente.md`;
- `docs/landing-brand-gap-analysis.md`.

È stato inoltre ispezionato l’archivio estratto in `/Users/marian/Downloads/MAIS ROSSO Co./`, con particolare attenzione ai 18 PDF, ai file font, agli ZIP font, alle licenze, ai raster di logo e pannocchia, alle etichette e alle brochure. I PDF sono stati analizzati sia come resa visiva sia con `pdfinfo`, `pdffonts`, conversione SVG e ispezione dei colori vettoriali. I font locali sono stati controllati con `fc-scan`, stringhe interne, copyright e file di licenza allegati.

La cronologia impiegata è:

- materiale 2021–2024: storico o di ricerca;
- progetti etichette febbraio 2025: bozze/esecutivi di gamma, con una revisione farina marcata “ok”;
- materiale espositivo luglio 2025: sistema promozionale;
- profilo social agosto 2025: versione pre-finale;
- brochure e logo settembre 2025: riferimenti principali per il sistema Mais Rosso Co.;
- etichetta La Maisèra luglio 2026: riferimento più recente per la birra.

Le decisioni definitive del task prevalgono sulle ambiguità dei documenti storici.

## 3. Marchio e varianti

### 3.1 Riferimento principale

**File:** `MAIS ROSSO LOGO.pdf`  
**Data documento:** 18 settembre 2025  
**Stato:** riferimento visivo più recente, non utilizzabile integralmente senza pulizia approvata

Composizione:

- forma circolare a sigillo;
- nome Mais Rosso Co. sull’arco superiore;
- due pannocchie rosse verticali al centro;
- “OTTOFILE” e “varietà Albese” sull’arco inferiore;
- bordo doppio arancio/petrolio;
- piccolo timbro “Gourmet Piemonte” a sinistra;
- piccolo vecchio albero a destra.

Il nome è il livello gerarchico principale, la materia prima il secondo. Le pannocchie occupano il centro e funzionano meglio del cerchio come segno autonomo. Il file usa due font incorporati: `LeagueSpartan-Thin` e `ArchivoBlack-Regular`.

Problemi tecnici:

- master di soli 240 × 240 pt;
- componenti raster all’interno del PDF;
- nessun SVG/AI/EPS sorgente;
- nessuna variante orizzontale ufficiale;
- nessuna versione monocromatica ufficiale;
- nessuna area di rispetto o dimensione minima documentata;
- contiene il vecchio albero, espressamente escluso dal nuovo sistema pubblico;
- status del timbro “Gourmet Piemonte” non documentato.

### 3.2 Varianti social

| Asset | Data | Differenza | Stato operativo |
|---|---|---|---|
| `IMMAGINE PROFILO IG.pdf` | 25/02/2025 | Prima variante Canva; stessa struttura generale, dettagli e spaziatura precedenti | Storica; non usare |
| `IMMAGINE PROFILO IG 2.pdf` | 28/08/2025 | Più vicina al file finale; usa League Spartan Bold e Archivo Black incorporati | Pre-finale; non usare se esiste il riferimento settembre |
| `4BIS.png` | coerente con fase settembre 2025 | Raster 320 × 320 su fondo arancio; marchio completo | Solo anteprima/riferimento cromatico; insufficiente per UI ampia |
| `MAIS ROSSO LOGO.pdf` | 18/09/2025 | Versione più recente | Riferimento principale, da ripulire con approvazione |

Le differenze tra profili non sono semplici artefatti di compressione: cambiano proporzioni, spaziatura e resa di alcuni elementi. Non mescolare componenti presi da versioni diverse.

### 3.3 Doppia pannocchia

**File:** `WhatsApp Image 2026-07-28 at 09.55.53.jpeg`  
**Dimensioni:** 854 × 1600 px  
**Stato:** simbolo corrente ad alta rilevanza, ma sorgente tecnica insufficiente

La doppia pannocchia è il segno più specifico del marchio. È riconoscibile anche fuori dal sigillo e può funzionare come:

- firma dell’hero;
- elemento di transizione tra campo e prodotto;
- marchio compatto mobile;
- dettaglio su card e moduli editoriali;
- base per favicon, purché ridisegnata/ottimizzata da un master.

Il JPEG ha fondo quasi bianco, nessuna trasparenza e artefatti da compressione. Non va scontornato alla cieca e trattato come master definitivo. Richiedere SVG/PNG trasparente o approvare una vettorializzazione fedele. Non deformare, non colorare con tinte arbitrarie e non separare le due pannocchie come se fossero due simboli autonomi.

### 3.4 Elementi esclusi o da verificare

| Elemento | Evidenza | Decisione |
|---|---|---|
| Vecchio albero circolare | Brochure 2024, retro di etichette 2025, piccolo emblema nel logo settembre 2025 | Non usare nel frontend, metadata, favicon o nuovi asset pubblici |
| Timbro “Gourmet Piemonte” | Logo, brochure, packaging, La Maisèra | Non trattare come certificazione; status e diritto d’uso da confermare prima di pubblicarlo |
| QR con handle storico | `il_giardino_delle_esperidi_qr.png` e materiali 2024–2025 | Non usare; destinazione e nomenclatura sono obsolete rispetto alla decisione di brand |
| Chicchi/semi decorativi | Brochure settembre 2025 e pannello luglio 2025 | Utilizzabili come pattern secondario, dopo verifica/ricostruzione del master |
| Icone vegano/vegetariano, senza conservanti, artigianale | Etichette e pannello | Non sono elementi identitari; usare solo per prodotti a cui il claim si applica ed è legalmente approvato |
| Corona, Re, araldica | Materiali narrativi storici | Non fanno parte del sistema approvato; evitare come asse visuale |

## 4. Palette effettiva

### 4.1 Colori estratti dal logo più recente

I sei colori seguenti provengono direttamente dalle dichiarazioni vettoriali di `MAIS ROSSO LOGO.pdf`, non da una stima a occhio. I valori esadecimali sono la conversione RGB a 8 bit dei valori percentuali del PDF.

| Ruolo materiale | RGB estratto | Hex digitale | Uso proposto |
|---|---:|---:|---|
| Bordeaux molto scuro | 91, 18, 8 | `#5B1208` | Testo espressivo, wordmark, dettagli del chicco |
| Rosso ramato | 195, 47, 36 | `#C32F24` | Accento di materia, indicatori, piccoli highlight |
| Bruno tutolo/inchiostro | 55, 36, 11 | `#37240B` | Testo primario caldo su crema/arancio |
| Crema etichetta | 241, 223, 191 | `#F1DFBF` | Fondo principale, card, campi testuali |
| Arancio-corallo | 245, 145, 94 | `#F5915E` | Fondo di marca, bande, CTA secondarie, sezioni prodotto |
| Blu petrolio | 22, 96, 125 | `#16607D` | Testo/contorno, CTA primaria, navigazione, focus visivo |

Il logo include inoltre molte sfumature raster della pannocchia: aranci, rosa, rossi, bordeaux, giallo paglia e grigi di tratto. Non vanno convertite tutte in token UI.

### 4.2 Riscontro nei materiali

- La brochure settembre 2025 riusa crema, petrolio, rosso e illustrazione arancio/ramata; lo sfondo è spesso bianco per alleggerire la densità.
- Le etichette di febbraio 2025 usano arancio pieno, medaglione crema, nastro petrolio e pannocchia illustrata.
- La revisione farina marcata “ok” accentua arancio e petrolio e rende più chiara la gerarchia.
- L’etichetta La Maisèra luglio 2026 conserva la stessa famiglia cromatica, con maggiore contrasto petrolio/crema/arancio e rosso della pannocchia.
- Il pannello espositivo luglio 2025 aggiunge giallo e verdi brillanti. Questi colori descrivono paesaggio e supporto fieristico, ma non sono l’asse principale del marchio.

Il verde non deve diventare il colore guida: renderebbe il brand simile a un generico marchio biologico. Nero e oro non devono diventare l’asse luxury.

### 4.3 Contrasto digitale preliminare

Verifica WCAG matematica sui colori estratti:

- `#37240B` su `#F1DFBF`: 11,30:1;
- `#5B1208` su `#F1DFBF`: 10,46:1;
- `#16607D` su `#F1DFBF`: 5,34:1;
- `#C32F24` su `#F1DFBF`: 4,28:1, quindi non sufficiente per testo normale AA;
- `#37240B` su `#F5915E`: 6,41:1;
- `#5B1208` su `#F5915E`: 5,93:1;
- `#16607D` su `#F5915E`: 3,03:1, utilizzabile solo per testo grande o elementi non testuali quando gli altri requisiti sono soddisfatti.

Le coppie arancio/petrolio funzionano come identità, ma non devono essere usate automaticamente per testo piccolo. Gli stati focus devono avere contrasto verificato sul contesto reale.

## 5. Tipografia estratta

### 5.1 Cronologia e uso

| Fase/documento | Font rilevati | Funzione osservata | Valore per il nuovo sistema |
|---|---|---|---|
| Brochure 2024 | Kollektif, Kollektif Bold/Italic, Granaina, Bright Sunshine, Open Sans | Corpo sans, titoli, script emozionale | Storico; non stabilisce il font corrente |
| Etichette 26–27/02/2025 | Geometric 415 Black, Geometric 212 Book Condensed, Humanist 521, Androgyne, Buckwheat Rough, Montserrat, Arial Narrow, talvolta Trajan | Nomi prodotto, microcopy, script, texture tipografica, ingredienti | Mostra l’intenzione “bottega/stampa”, ma è troppo affollato e le licenze non sono sicure |
| Farina “ok” 28/02/2025 | Aileron Bold, Filicudi Solid, Fira Sans ExtraBold, Tilt Warp | Gerarchia più pulita del pack farina | Utile come direzione, file/licenze non forniti |
| Pannello 30/07/2025 | Boucherie Block Bold, Calibri Bold | Titolo display e testo | Asset espositivo, non sistema web |
| Profili e logo 2025 | League Spartan Bold/Thin, Archivo Black | Nome e descriptor circolare | Riferimento principale del marchio |
| Brochure 10/09/2025 | League Spartan, Archivo Black nel logo; Kollektif, Bright Sunshine, Open Sans nel documento | Marchio, corpo editoriale, script | Conferma League/Archivo per la marca, non una famiglia unica per tutto il sito |
| Lettera 2026 | Garamond, Times New Roman | Documento commerciale Word | Non è evidenza di identità visuale |
| La Maisèra 2026 | Font non verificabili dal JPEG | Titolo su nastro, descriptor, microcopy | Non attribuire famiglie senza file sorgente |

### 5.2 Verifica licenze

#### Approvabile

**League Spartan**

- file variabile e nove statici presenti nel fascicolo;
- `OFL.txt` completo, SIL Open Font License 1.1;
- licenza consente uso, embedding e distribuzione con le condizioni OFL;
- indicato esplicitamente nel logo/profilo;
- famiglia consigliata come base sicura del sistema digitale;
- conservare il testo OFL insieme agli asset distribuiti.

#### Non approvabile senza prova ulteriore

**Archivo Black**

- incorporato come subset nei PDF di logo e brochure;
- il file sorgente e la licenza non sono presenti nello ZIP cliente;
- il subset incorporato non è una licenza per estrazione o riuso web;
- il repository contiene Archivo Variable già usato e documentato internamente come OFL, ma non è prova che costituisca il master esatto di `Archivo Black` usato nel logo;
- il wordmark approvato dovrebbe preferibilmente restare artwork, oppure essere ricostruito solo dopo confronto e approvazione.

**Geometric 212/415 e Humanist 521 BT**

- i file dichiarano copyright Bitstream e “all rights reserved”; Geometric 415 riporta anche “confidential” in una stringa interna;
- i pacchetti OnlineWebFonts allegano una licenza generica che richiede attribuzione ma avverte che alcuni file sono trial e possono richiedere licenza commerciale/embedding;
- non esiste prova di licenza specifica intestata al cliente;
- non utilizzare come webfont.

**Buckwheat TC Rough**

- stringhe interne: copyright 2018 Tom Chalky, tutti i diritti riservati;
- nessuna licenza specifica allegata oltre al testo generico OnlineWebFonts;
- non utilizzare come webfont.

**Androgyne Medium**

- un OTF dichiara “Donationware”, ma il readme rimanda soltanto al sito dell’autore e non contiene un grant di licenza;
- la variante TTF ha solo la licenza generica OnlineWebFonts;
- non utilizzare come webfont finché non viene documentata una licenza commerciale/web.

**Aileron, Filicudi, Fira Sans, Tilt Warp, Boucherie Block, Kollektif, Bright Sunshine, Open Sans, Calibri**

- appaiono come subset incorporati nei PDF ma non sono accompagnati dal relativo sorgente e dalla relativa licenza nel fascicolo;
- anche quando una famiglia è nota come open source in altre distribuzioni, il file incorporato non autorizza l’estrazione;
- Calibri non è un webfont liberamente redistribuibile;
- se una famiglia sarà scelta, procurare il file da una fonte ufficiale e conservare la licenza.

### 5.3 Gerarchia tipografica proposta

Questa è una proposta per il consolidamento, non una modifica al CSS:

- **wordmark/logo:** artwork ufficiale aggiornato; non ricomporre liberamente le lettere a ogni uso;
- **display e titoli:** League Spartan 700–800, con tracking da normale a leggermente negativo; evitare tutto maiuscolo sui titoli lunghi;
- **nomi prodotto e label:** League Spartan 650–800, prevalentemente maiuscolo solo per etichette brevi;
- **corpo:** League Spartan 400–500 come soluzione pienamente derivata e legalmente sicura, da testare a 16–18 px; in alternativa Archivo del repository può essere conservato come font tecnico solo se il Lead conferma provenienza/licenza e decide il ruolo;
- **dati e microcopy:** League Spartan 500–600; DM Mono può essere preservato solo dove un dato realmente tabellare lo richiede, non come linguaggio dominante del “registro”;
- **accento decorativo/script:** nessuna famiglia approvata. Non sostituire autonomamente Bright Sunshine/Androgyne; usare fotografia, composizione e pannocchia per dare carattere finché il cliente non approva e licenzia un accento.

Bodoni Moda non è proposta come display principale: il suo ruolo attuale è editoriale/luxury e non deriva dal packaging. Può essere rimossa senza perdere un tratto proprietario del marchio.

## 6. Grammatica del packaging

### 6.1 Invarianti utili

Il sistema delle etichette 2025–2026 ricorre a:

- fondo arancio-corallo;
- medaglione o campo centrale crema;
- bordi e testi blu petrolio;
- nastro sovrapposto per categoria/nome prodotto;
- doppia pannocchia che attraversa o affianca il medaglione;
- nome prodotto grande, spesso in maiuscolo;
- descriptor Ottofile/Albese sotto il nome;
- sigilli e pittogrammi come terzo livello;
- pannello laterale o posteriore per ingredienti, valori, lotto, QR e dati legali;
- angoli arrotondati nei pannelli più recenti;
- contrasto tra forma circolare agricola e fascia rettangolare commerciale.

La Maisèra conserva la stessa base ma la adatta alla bottiglia: arancio pieno, medaglione crema/petrolio, nastro, pannocchia verticale, gerarchia nome/stile/formato. È quindi parte della stessa famiglia, non un sottobrand da isolare in un’estetica craft americana.

### 6.2 Cosa trasferire al digitale

- palette e rapporti di contrasto;
- doppia pannocchia come immagine proprietaria;
- nastro/fascia solo per label, CTA o nome prodotto, senza applicarlo a ogni titolo;
- medaglioni e bordi come struttura di card selezionate;
- alternanza arancio/crema e foto reali;
- nomi prodotto chiari e grandi;
- microgerarchia ordinata per ingredienti, formato e disponibilità;
- angoli moderatamente arrotondati, non pillole SaaS generiche.

### 6.3 Cosa non trasferire letteralmente

- densità delle etichette su ogni blocco pagina;
- cinque o più font simultanei;
- testi distressed lunghi;
- sigilli non verificati;
- microtesto decorativo;
- collage di pittogrammi;
- falso invecchiamento della carta;
- vecchi dati legali/QR/indirizzi incorporati nelle bozze;
- geometria circolare usata per ogni componente.

## 7. Bordi, nastri, sigilli e texture

### Bordi

Il doppio bordo petrolio/arancio del sigillo e i bordi petrolio dei medaglioni sono ricorrenti. Nel web possono diventare:

- bordo da 1 px per card informative;
- doppio bordo solo su una firma di marca o su un elemento manifesto;
- raggio coerente con il packaging, non ornamentazione continua.

### Nastri

I nastri sono la sede del nome prodotto. Nel web funzionano per le card catalogo e per una singola firma in hero, non come intestazione universale. Devono restare piatti e grafici, senza ombre 3D o effetto stemma luxury.

### Sigilli

- il sigillo circolare Mais Rosso Co. è valido come forma, ma il master corrente deve essere ripulito;
- “Gourmet Piemonte” non è pubblicabile come certificazione senza conferma;
- le icone di prodotto devono dipendere dal record di verità, non dalla grafica storica;
- il vecchio albero è escluso.

### Texture

Le texture autentiche sono quelle fotografate: chicchi, farina, brattee, legno, cassette, juta e vetro. La carta può restare come fondo leggero, ma non deve simulare un documento museale. Evitare distressed digitale dominante e patine vintage uniformi.

## 8. Differenze tra versioni e ruling

| Area | Versione precedente | Versione più recente | Ruling |
|---|---|---|---|
| Brand | Vecchio albero e denominazione storica dominanti | Mais Rosso Co. e doppia pannocchia | Solo il sistema Mais Rosso Co. è pubblico |
| Logo | Albero come marchio principale | Sigillo circolare con pannocchie | Usare il riferimento settembre 2025 solo dopo rimozione approvata del vecchio albero |
| Palette | Crema/teal, fotografie calde, poco arancio sistemico | Arancio-corallo/crema/petrolio/rosso ramato | La palette recente governa i token |
| Tipografia | Kollektif/script e molte famiglie | League Spartan/Archivo nel marchio; gamma ancora eterogenea | League Spartan è la base approvabile; ridurre le famiglie |
| Pack farina | 390 g e vecchi dati | Revisione “ok” 500 g | La grafica “ok” è il riferimento di gerarchia, ma i dati vanno al record contenuti |
| Maisette | 120 g e proposta PEQ 90 g | Catalogo da verificare dal record prodotti | Non dedurre un formato dalla sola grafica |
| Birra | Vecchia referenza 33 cl 4,6% | La Maisèra 33 cl 7%, etichetta luglio 2026 | Escludere integralmente la vecchia referenza; La Maisèra è prodotto fondamentale |
| Pattern | Albero/foglie generiche | Chicchi, pannocchia, nastri | Preferire materia specifica al botanico generico |

## 9. Asset definitivi, condizionati e da non usare

### Definitivi come riferimento

| Asset | Uso |
|---|---|
| `MAIS ROSSO LOGO.pdf` | Riferimento più recente per forma, nome, font e palette; non pubblicare integralmente |
| `4BIS.png` | Controllo raster della resa cromatica del logo su arancio |
| `WhatsApp Image 2026-07-28 at 09.55.53.jpeg` | Riferimento della doppia pannocchia |
| `MAIS ROSSO brochure con prezzi.pdf` | Riferimento commerciale settembre 2025 per grammatica di pagina e relazione logo/prodotti |
| `WhatsApp Image 2026-07-28 at 09.55.23.jpeg` | Riferimento più recente per identità La Maisèra |
| `…/POLENTA 2025 ok.pdf` | Riferimento gerarchico della revisione farina, non master universale di brand |

### Utilizzabili solo dopo conferma o lavorazione approvata

- logo senza vecchio albero, ottenuto da master ufficiale o lockup approvata;
- doppia pannocchia scontornata/vettorializzata;
- pattern di chicchi della brochure;
- timbro “Gourmet Piemonte” solo dopo verifica;
- pittogrammi prodotto solo dopo verifica claim;
- packshot estratti da brochure solo come placeholder temporanei, non come master finali.

### Da non usare

- vecchio albero e denominazione storica;
- QR e handle storici;
- vecchie referenze birra;
- etichette Maisella/Maissnack e altre bozze non confermate come fonte di catalogo;
- font Bitstream/OnlineWebFonts senza licenza valida;
- collage e loghi ricostruiti da screenshot;
- stemmi regali o mito del Re come asse grafico;
- raster 320 × 320 come logo ad alta risoluzione;
- elementi con dati legali, nutrizionali, prezzi o formati obsoleti incorporati.

## 10. Token proposti

I token seguenti traducono i materiali reali in ruoli digitali. Sono proposte per l’Agente 5 e per il consolidamento; non sono stati applicati ai CSS.

```css
/* Brand source: MAIS ROSSO LOGO.pdf, 18/09/2025 */
:root {
  --brand-coral: #f5915e;
  --brand-cream: #f1dfbf;
  --brand-petrol: #16607d;
  --brand-kernel-red: #c32f24;
  --brand-bordeaux: #5b1208;
  --brand-husk-brown: #37240b;

  --surface-page: var(--brand-cream);
  --surface-brand: var(--brand-coral);
  --surface-card: #fff8ea; /* derivato chiaro, da calibrare su foto/contrasto */
  --surface-inverse: var(--brand-petrol);

  --text-primary: var(--brand-husk-brown);
  --text-on-brand: var(--brand-husk-brown);
  --text-on-inverse: var(--brand-cream);
  --text-accent: var(--brand-bordeaux);

  --action-primary-bg: var(--brand-petrol);
  --action-primary-fg: var(--brand-cream);
  --action-secondary-bg: var(--brand-bordeaux);
  --action-secondary-fg: var(--brand-cream);
  --border-brand: var(--brand-petrol);
  --focus-ring: var(--brand-bordeaux);

  --font-brand: "League Spartan", sans-serif;
  --font-display: var(--font-brand);
  --font-body: var(--font-brand);
  --font-data: var(--font-brand);

  --weight-body: 450;
  --weight-label: 650;
  --weight-heading: 750;
  --weight-product: 800;

  --radius-label: 0.5rem;
  --radius-card: 0.75rem;
  --border-hairline: 1px;
  --border-signature: 2px;
}
```

Note di approvazione:

- `#FFF8EA` è un derivato digitale proposto, non un colore estratto dal PDF; può essere sostituito da bianco o crema secondo fotografia e contrasto;
- evitare rosso `#C32F24` per testo normale su crema;
- petrolio su arancio non è sufficiente per testo normale piccolo;
- il body monofamiglia League Spartan è la soluzione più aderente e legalmente certa; l’eventuale mantenimento di Archivo va deliberato dal Lead;
- non introdurre uno script “simile” al packaging senza una scelta/licenza esplicita;
- motion, spaziatura e scala saranno definiti dall’Agente 5, non dedotti dalle misure di stampa.

## 11. Regole d’uso proposte

1. Il nome pubblico è sempre “Mais Rosso Co.”, con maiuscole e punteggiatura coerenti.
2. La doppia pannocchia non è un’immagine decorativa generica: è il principale segno proprietario.
3. Il logo circolare non va ridotto sotto una dimensione in cui descriptor e sigilli risultano illeggibili; per mobile serve una variante compatta approvata.
4. Non usare il vecchio albero, neppure come firma storica o pattern.
5. Non usare “Gourmet Piemonte” come bollino di qualità senza documentazione.
6. La palette deve restare calda e agricola; il petrolio organizza e dà contrasto, non deve rendere il sito freddo.
7. Il rosso deriva dal chicco, non da codici vino/luxury.
8. La fotografia reale ha precedenza sulla texture illustrata.
9. Nastri e medaglioni devono aiutare la gerarchia del catalogo, non trasformare ogni sezione in un’etichetta.
10. Massimo due famiglie tipografiche operative; al gate attuale una sola famiglia è pienamente approvata.
11. Nessun font estratto dai subset PDF deve essere distribuito sul web.
12. Ogni pittogramma di claim deve essere alimentato dal record di verità del prodotto.

## 12. Richieste al cliente e rischi residui

### Necessarie per chiudere il marchio

- master ufficiale Mais Rosso Co. senza vecchio albero;
- SVG/PDF vettoriale e PNG trasparente della doppia pannocchia;
- eventuale versione orizzontale, monocromatica e compatta;
- conferma sull’uso o rimozione del timbro “Gourmet Piemonte”;
- regole minime: area di rispetto, dimensione minima, fondi ammessi.

### Necessarie per chiudere la tipografia

- conferma che League Spartan sia il font di marca corrente;
- file/licenza ufficiale di Archivo Black se il wordmark deve essere ricomposto;
- eventuale licenza commerciale/web per un font decorativo, se il cliente vuole mantenerlo;
- divieto esplicito di riuso dei font Bitstream/OnlineWebFonts finché non viene fornita prova valida.

### Rischi

- pubblicare il PDF logo integrale reintrodurrebbe il vecchio albero;
- ricostruire il logo senza approvazione creerebbe una nuova identità non autorizzata;
- usare la pannocchia JPEG su grandi superfici renderebbe visibili compressione e fondo;
- importare tutta la grammatica del pack produrrebbe un sito rumoroso e vintage;
- mantenere Bodoni come titolare principale continuerebbe il distacco luxury/editoriale;
- usare font dei pacchetti generici esporrebbe il progetto a rischio di licenza;
- mostrare timbri o icone come certificazioni potrebbe creare un rischio legale/commerciale.

## 13. Consegna al coordinatore

Proposta da consolidare:

- **brand pubblico:** Mais Rosso Co.;
- **simbolo primario:** doppia pannocchia;
- **forma di firma:** sigillo o lockup pulita, senza vecchio albero;
- **palette:** `#F5915E`, `#F1DFBF`, `#16607D`, `#C32F24`, `#5B1208`, `#37240B`;
- **font approvabile:** League Spartan OFL 1.1;
- **font secondario:** non ancora approvato; Archivo può essere valutato solo tramite il file già licenziato nel repository, senza fingere che sia il master del wordmark;
- **direzione:** agricolo contemporaneo, fotografico e concreto;
- **packaging:** fonte della grammatica, non template da copiare;
- **asset da richiedere:** master logo pulito, doppia pannocchia trasparente/vettoriale e conferma del timbro.

Il sistema può procedere alla progettazione e all’implementazione con una lockup provvisoria dichiarata. La pubblicazione finale deve invece superare il gate sul master del marchio e sui diritti dei font.
