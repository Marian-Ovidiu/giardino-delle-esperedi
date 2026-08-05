# Gap analysis della landing — Il Giardino delle Esperidi / Mais Rosso Co.

Data: 5 agosto 2026  
Stato: diagnosi pre-redesign; nessuna modifica al frontend, nessun mockup, nessun nuovo asset  
Fonte primaria di confronto: `docs/brand-audit-materiali-cliente.md`

## Sintesi esecutiva

La landing non è poco rappresentativa perché è semplicemente «troppo bella», «troppo moderna» o tecnicamente sbagliata. Il problema è più preciso: **il sito dà autorità al proprio concept editoriale più di quanta ne dia alle prove visive, alle persone, ai prodotti e al sistema di marca dell’azienda**.

Il progetto trasforma il Mais Rosso Ottofile in un reperto da registro: otto schede, sessantaquattro chicchi nel rail, tipografia da documento istituzionale, grandi vuoti, immagini trattate come piastre, climax finale «Custodire vuol dire seminare». Questa direzione è coerente con se stessa e molto ben eseguita. È però solo una delle possibili interpretazioni del brand e, nel progetto, è stata resa non negoziabile prima di disporre dell’archivio cliente completo. La scelta è esplicita in `docs/art-direction.md:40-70` («The site is not an advertisement. It is a record») e nasce anche come opportunità da portfolio in `docs/discovery.md:117-121`.

Il Brand Audit restituisce invece una realtà più concreta e meno monumentale: una piccola azienda agricola piemontese, una materia prima distintiva, una filiera da mostrare con precisione, prodotti imperfettamente ma realmente disponibili, partner esterni, una voce personale e un archivio molto ricco di fotografie agricole (`docs/brand-audit-materiali-cliente.md`, §§1.4, 2, 3 e 10). La landing mostra pochissimo di tutto questo:

- nessun volto e nessuna persona identificata;
- nessun luogo aziendale riconoscibile;
- nessuna lavorazione reale;
- un solo montaggio di confezioni, incompleto e ricavato da un PDF;
- cinque file AI usati in sei slot narrativi, senza più la dicitura visibile «immagine provvisoria»;
- il sigillo Mais Rosso Co. e le due pannocchie relegati a favicon/anteprima social, non alla pagina;
- il vecchio albero de Il Giardino delle Esperidi usato invece come firma visibile;
- dati commerciali del listino settembre 2025 pubblicati come correnti;
- alcune affermazioni che il nuovo audit non conferma o contraddice: sede/campi a Cherasco, filiera «senza intermediari», registro dal 2007, centralità della storia del Re.

La pagina comunica quindi **un progetto culturale contemporaneo di conservazione agricola, raffinato e quasi museale**, più che **una piccola azienda agricola reale che coltiva un mais specifico e lo trasforma in prodotti acquistabili**. L’Ottofile è chiarissimo; l’azienda che lo coltiva molto meno.

La raccomandazione è il **Livello B — Evoluzione strutturata**. Non serve distruggere il progetto: vanno conservati infrastruttura, componenti, accessibilità, responsive, data model e conversione; vanno rimesse in discussione gerarchia narrativa, art direction fotografica, firma visiva e certezza dei dati.

### Priorità d’impatto

1. Sostituire la finzione documentaria con prove reali: persone, campo, raccolto, processo e pack correnti.
2. Definire l’architettura Il Giardino delle Esperidi / Mais Rosso Co. / Az. Agr. Giordano Matteo.
3. Correggere o sospendere dati non confermati, prezzi storici e claim di filiera.
4. Ridurre il peso del racconto «registro / Re / 2007» rispetto a azienda, materia, lavoro e prodotti.
5. Riportare nella UI la palette, le due pannocchie e il packaging realmente riconoscibili.
6. Esplicitare il posizionamento commerciale prioritario, soprattutto B2B vs vendita diretta.

---

## 0. Metodo, perimetro e attendibilità

Sono stati analizzati:

- il Brand Audit completo, incluse contraddizioni, catalogo, asset migliori e domande bloccanti;
- la composizione runtime di `src/app/page.tsx:19-43`;
- il record fattuale e commerciale in `src/content/facts.ts`;
- il copy e la gerarchia in `src/content/site.ts`;
- il registro asset in `src/content/media.ts`;
- tutti i componenti renderizzati in `src/components/`;
- palette, tipografia, griglia e comportamento responsive in `src/styles/tokens.css`, `src/app/globals.css` e `src/styles/components.css`;
- motion, rail, prologo WebGL/statico e inversione finale;
- i documenti interni che hanno determinato la direzione creativa, in particolare `docs/discovery.md`, `docs/art-direction.md`, `docs/brand-alignment.md`, `docs/art-review-immagini.md`, `docs/motion-spec.md` e `docs/nome-transizione.md`;
- tutti gli asset pubblici effettivamente caricati.

La pagina è stata avviata localmente e osservata con Chromium nei viewport di progetto:

| Viewport | Dimensione | Altezza documento osservata, motion attiva | Overflow orizzontale | Errori console |
|---|---:|---:|---:|---:|
| Desktop | 1440×1000 | 20.933 px | 0 | 0 |
| Tablet | 768×900 | 20.730 px | 0 | 0 |
| Mobile | 390×844 | 15.965 px | 0 | 0 |

Sono state osservate anche le singole sezioni, la pagina intera, la variante reduced-motion e i link renderizzati. Le misure descrivono la build locale del 5 agosto 2026, non un ambiente di produzione.

Nel seguito:

- **evidenza** indica quanto è direttamente leggibile in codice, asset o runtime;
- **impressione** indica la probabile lettura percettiva, dichiarata come tale;
- **non verificabile** indica che repository e audit non bastano a stabilire la verità commerciale o legale.

---

## 1. Ricognizione della landing attuale

### 1.1 Architettura della pagina

L’ordine è fissato in `src/app/page.tsx:25-40`:

| Ordine | Sezione / componente | Funzione attuale | Contenuto principale | Media |
|---:|---|---|---|---|
| Globale | `RigaOttava` | Indice fisso e progressione 00/08→08/08 | Otto righe × otto chicchi; link alle schede | Nessuno |
| Globale | `ImprontaTransition` + `KernelPrologue` | Prologo visuale scroll-linked | Dispersione → pannocchia/pianta → otto incisioni | Canvas WebGL + tre fallback code-native |
| 0 | `Header` | Identificazione minima e accesso ai contatti | Il Giardino delle Esperidi · Cherasco · Contatti | Nessuno |
| 0 | `Hero` | Copertina/identificazione della materia prima | Mais Rosso / Ottofile / Integrale | Prologo statico/dinamico |
| 1 | `Scheda` — La varietà | Definizione sintetica e dati morfologici | Albese, rischio di estinzione, Cherasco, otto file, colore | Foto cliente come campitura molto attenuata + prologo |
| 2 | `RoyalChapter` — Il mais del Re | Provenienza storica attribuita alla tradizione aziendale | Vittorio Emanuele II, Pollenzo, «melia du re» | Pannocchia AI su lastra |
| 3 | `EightRowsChapter` — Otto file | Dimostrazione del numero e del concept | Otto file; otto colonne; otto schede; 64 segni | Nessuna lastra; grande “8” |
| 4 | `ConservationChapter` — Quasi estinto | Stakes di conservazione | Registro delle Varietà da Conservazione · 2007 | Pianta AI, crop desktop/mobile |
| 5 | `FieldChapter` — Il campo | Metodo e filiera | Agricoltura simbiotica; nessun intermediario; raccolto | Steli secchi AI |
| 6 | `StoneChapter` — La pietra | Trasformazione chicco→farina | Integrale, pietra, 500 g, vasetto sottovuoto | Pietra e farina AI |
| 7 | `ProductsChapter` — Le referenze | Catalogo e richiesta disponibilità | 5 prodotti, formati, prezzi, allergeni, uso | Foto cliente di alcuni pack |
| 8 | `CustodyChapter` — Custodia | Climax emotivo e inversione notte/oro | «Custodire vuol dire seminare»; registro aperto | Vecchio marchio ad albero |
| Finale | `ContactFooter` | Conversione e recapiti | Email precompilata, telefono, fiere, social, privacy | Vecchio marchio ad albero |

Fonti: `src/app/page.tsx:1-43`, `src/components/Chapters.tsx:19-341`, `src/components/ContactFooter.tsx:15-106`.

### 1.2 Obiettivo narrativo complessivo

La pagina non si presenta come sito aziendale o catalogo, ma come **registro di una varietà**. Lo dichiara la chiusa «Questo non è un catalogo» (`src/content/site.ts:326-335`) e lo codifica l’art direction: schede, dati monospaziati, numeri, carta, rail e progressione (`docs/art-direction.md:40-81`).

L’arco è:

`identificazione → mito storico → morfologia → rischio → campo → trasformazione → referenze → custodia → contatto`

La struttura funziona come saggio editoriale, ma mette l’azienda, le persone e la vendita dopo circa 11.000 px su desktop e 7.200 px su mobile. La prima prova commerciale completa arriva quindi molto tardi.

### 1.3 Testi e call to action

Il copy è centralizzato in `src/content/site.ts`, i dati in `src/content/facts.ts`.

CTA presenti:

- «Contatti» in testata (`src/components/Header.tsx:5-10`);
- «Richiedi disponibilità» per ciascun prodotto, con email preindirizzata (`src/content/site.ts:260-282`, `src/components/Chapters.tsx:278-286`);
- richiesta generale via mailto precompilato;
- telefono cliccabile;
- email;
- Instagram e Facebook;
- acquisto di persona alle fiere (`src/content/site.ts:365-459`, `src/components/ContactFooter.tsx:17-103`).

Non ci sono carrello, form, mappa, rivenditori, download schede, campioni B2B o calendario fiere. La landing dichiara correttamente «Non vendiamo online» (`src/content/site.ts:365-372`).

### 1.4 Palette e materiali

La palette effettiva è definita in `src/styles/tokens.css:16-24`:

- carta fredda `#E9E3D6`;
- quasi nero `#16150F`;
- due grigi pietra;
- rosso chicco `#B23A16`, usato come indice;
- notte `#0D0B08`;
- oro `#D9A441`, solo nell’inversione finale.

Il fondo usa una texture carta generata e ripetuta (`src/app/globals.css:57-67`). Il sistema è coerente con un archivio/museo e parzialmente con crema/rosso/bruno del brand. Non porta però in pagina l’arancio-corallo sistemico del pack né il blu petrolio, entrambi centrali nei materiali recenti del cliente (Brand Audit §4.3).

### 1.5 Tipografia

Tre famiglie locali:

- Bodoni Moda per display e titoli;
- Archivo per testo/UI;
- DM Mono per dati e numeri.

Implementazione: `src/lib/fonts.ts:1-57`, ruoli in `src/app/globals.css:146-290`, scale responsive in `src/styles/tokens.css:62-145`.

La Bodoni monumentalizza il mais e porta codici da editoria d’arte, moda, vino e istituzione culturale. Archivo e DM Mono rendono leggibile e credibile il registro. Il sistema è tecnicamente solido e le licenze sono documentate come OFL in `docs/art-direction.md:118-138`, ma non deriva dalla tipografia del packaging cliente. Il suo rapporto con il brand è quindi interpretativo, non proprietario.

### 1.6 Componenti grafici

- griglia fissa a otto colonne a ogni breakpoint (`src/app/globals.css:292-307`);
- rail fisso con 64 chicchi (`src/components/RigaOttava.tsx:3-53`, `src/styles/components.css:11-117`);
- tabelle a coppie termine/definizione (`RegistroDati`);
- lastre 8:5, reperti 1:1 e campiture (`Piastra`);
- numeri monumentali “II”, “8” e “2007”;
- matrice 01–08 nelle referenze;
- segni di registro e inversione notte/oro;
- vecchio albero circolare come firma in custodia e footer (`src/styles/components.css:1959-2038`).

Il sigillo recente Mais Rosso Co. è visibile solo come `icon.png`/`apple-icon.png`; la doppia pannocchia è nell’Open Graph, non nel corpo della pagina (`src/app/icon.png`, `src/app/apple-icon.png`, `src/app/opengraph-image.png`).

### 1.7 Motion e interazioni

Il progetto usa una grammatica molto disciplinata:

- reveal del titolo mediante clip-path, non fade;
- reveal delle righe dati al 76% del viewport;
- rail aggiornato in funzione dello scroll;
- pannello informativo del rail su hover/focus desktop;
- prologo WebGL sensibile allo scroll e leggermente al puntatore;
- un solo pin in Custodia;
- inversione coordinata giorno→notte al 64º chicco;
- fallback statico e reduced-motion completi.

Fonti: `src/components/ExperienceMotion.tsx:11-294`, `src/components/KernelPrologue.client.tsx:75-381`, `src/lib/motion.ts:16-104`, `docs/motion-spec.md` §§3–6.

Il motion è raffinato, accessibile e raramente gratuito a livello micro. A livello macro, però, rafforza la lettura «esperienza concettuale»: il visitatore deve completare un registro prima che il sito conceda il climax cromatico.

### 1.8 Gerarchia brand/prodotto

La gerarchia renderizzata è:

1. **Mais Rosso Ottofile Integrale** — protagonista assoluto, titolo e otto capitoli;
2. **Il Giardino delle Esperidi** — firma istituzionale minuta in header/footer;
3. **Mais Rosso Co.** — nominato una sola volta nel capitolo prodotti e visibile nel favicon;
4. **Az. Agr. Giordano Matteo** — assente;
5. prodotti — presenti solo nel settimo capitolo.

Questa gerarchia non coincide né con un’architettura di marca approvata né con quella visibile sui pack. `src/content/facts.ts:23-50` assume Il Giardino delle Esperidi come nome aziendale; il Brand Audit identifica invece Az. Agr. Giordano Matteo come soggetto legale e lascia irrisolto il rapporto tra i due marchi (§§2.1 e 4.1). `docs/nome-transizione.md:3-18` registra inoltre una volontà del cliente di cambiare nome e dominio, ma il nuovo audit non formalizza l’esito: è un’evidenza di progetto da riconfermare, non una decisione applicabile automaticamente.

### 1.9 Esperienza desktop e mobile

**Desktop.** La pagina è ariosa, leggibile e compositivamente forte. Le lastre hanno peso, i dati sono comparabili, la rail aiuta l’orientamento. Gli oltre 20.000 px di altezza e l’arrivo tardivo del catalogo richiedono però un’attenzione da lettura editoriale, non da sito commerciale. Grandi spazi bianchi, Bodoni e immagini desaturate amplificano un tono premium quasi istituzionale.

**Tablet.** Mantiene la struttura desktop con densità maggiore. È il viewport più lungo in rapporto all’altezza disponibile; il catalogo raggiunge 4.514 px e la custodia 4.056 px. L’ordine resta chiaro ma la lettura è impegnativa.

**Mobile.** Non presenta overflow o testo tagliato. Il layout a colonna, i target da 40 px, il contatto e i dati restano utilizzabili. La rail occupa stabilmente 40 px su 390 (oltre il 10% della larghezza); le sue micro-marche hanno valore concettuale più che informativo. Il catalogo misura 3.807 px e arriva dopo 7.216 px; il footer arriva dopo 13.601 px. La pagina è tecnicamente responsiva, ma non è commercialmente rapida.

---

## 2. Brand comunicato dalla landing

### 2.1 Ritratto per un visitatore nuovo

| Domanda | Impressione probabile | Supporto nell’interfaccia | Natura del giudizio |
|---|---|---|---|
| Che tipo di azienda sembra? | Un progetto culturale/agricolo che custodisce un ecotipo, vicino a fondazione, archivio o maison di specialità | Registro, schede, numeri, tono impersonale, «non è un catalogo» | Forte evidenza UI + interpretazione |
| Quanto sembra grande? | Piccola nelle parole, ma con un sistema comunicativo da istituzione o brand strutturato | Nessun dato di scala; visual monumentale; «disponibilità legata al raccolto» | Ambiguo |
| Quanto sembra artigianale? | Medio | Macinata a pietra, raccolta a mano, vasetto; nessuna persona o gesto reale | Supportato dal copy, non dalle immagini |
| Quanto sembra agricola? | Medio-alta come tema, bassa come prova | Campo, semina, steli; ma nessun campo identificabile e nessuna lavorazione reale | Scarto tra copy e visual |
| Quanto sembra premium/luxury? | Alto | Bodoni, vuoto, palette trattenuta, ritmo lento, tono monumentale | Forte evidenza UI |
| Quanto sembra reale? | Medio-basso | Due immagini cliente derivate; cinque file AI; nessun volto/luogo/processo | Forte evidenza asset |
| Quanto sembra contemporanea? | Molto alto | WebGL, motion, griglia, tipografia, responsive | Forte evidenza UI |
| Quanto sembra piemontese? | Medio nel testo, basso nelle immagini | Cherasco, Langhe, Cuneese, Pollenzo, piemontese; nessun luogo reale | Forte evidenza copy |
| Quanto è evidente l’Ottofile Albese? | Molto alto | Hero, capitoli, rail, dati, prodotti | Forte evidenza UI |
| Quanto sono presenti persone reali? | Nulle | Nessuna persona, nessun volto, nessuna firma Matteo | Evidenza oggettiva |
| Quanto sono presenti luoghi reali? | Quasi nulli | Toponimi testuali; lastre generiche | Evidenza oggettiva |
| Quanto sono presenti prodotti reali? | Medio-basso | Una foto collettiva incompleta; schede testuali dettagliate | Evidenza oggettiva |
| Si capisce come acquistare/contattare? | Sì, dopo una lunga lettura; il link header aiuta | mailto, telefono, fiere, prezzi, richiesta disponibilità | Evidenza oggettiva |

### 2.2 Somiglia a un altro settore?

Sì sul piano visivo, meno sul piano testuale.

- La tipografia, la carta, il nero/oro, i titoli monumentali e il mito del Re potrebbero appartenere a vino, amaro, olio o ristorante gourmet.
- La struttura da archivio potrebbe appartenere a una banca del germoplasma, museo botanico o progetto culturale.
- Il nome del mais, l’otto e le schede prodotto impediscono una totale intercambiabilità.

La landing non è quindi generica nel concept, ma è **genericamente “heritage premium” nella voce visuale**. I segni che la renderebbero inequivocabilmente questa azienda — doppia pannocchia, pack arancio/crema/blu, campo reale, Matteo, cassette, vaso, lavorazioni — sono assenti o marginali.

---

## 3. Confronto sistematico con il Brand Audit

Legenda: **coerente**, **parzialmente coerente**, **incoerente**, **non verificabile**, **da confermare con il cliente**.

| Area | Stato | Landing attuale | Brand Audit | Diagnosi |
|---|---|---|---|---|
| Architettura di marca | **incoerente / da confermare** | Il Giardino firma; Ottofile domina; Mais Rosso Co. quasi invisibile; soggetto legale assente (`Header`, `facts.ts:23-50`, `site.ts:225-235`) | Gerarchia tra Il Giardino, Mais Rosso Co. e Az. Agr. Giordano Matteo non formalizzata (§§2.1, 4.1, 9) | Il sito rende definitiva una gerarchia ancora aperta |
| Identità visiva | **incoerente** | Sistema editoriale autonomo | Identità recente centrata su sigillo, doppia pannocchia, pack e palette (§4) | Il progetto ha creato una nuova identità di sito invece di evolvere quella esistente |
| Palette | **parzialmente coerente** | Crema, rosso ramato, bruni; nero e oro dominano nel finale | Arancio-corallo, crema, petrolio, rosso/bruno, giallo (§4.3) | Corretta famiglia calda, ma eliminati arancio e petrolio che rendono riconoscibile il pack |
| Simboli | **incoerente** | Rail di chicchi e vecchio albero; nuovo sigillo solo favicon | Doppia pannocchia = segno proprietario principale; albero generico/precedente (§§4.1-4.2) | Il simbolo più forte non compare nella pagina; quello debole firma il climax |
| Fotografia | **incoerente** | Prevalenza di studi AI desaturati e generici | Archivio reale molto ampio; campo, raccolto, mani, cassette e lavoro (§§1.4, 4.6) | Principale causa dell’effetto concept |
| Tono di voce | **parzialmente coerente** | Sobrio, preciso, privo di superlativi; però impersonale e museale | Familiare-professionale, caldo, diretto, sensoriale (§5) | Ottima disciplina fattuale; insufficiente presenza della voce di Matteo e del piacere del prodotto |
| Storia del mais | **parzialmente coerente** | Recupero, rischio, Re, 2007 | Recupero dagli ibridi è forte; storia del Re contraddittoria e da provare (§§2.1-2.3, 5.4) | Il fragile episodio regale riceve troppo spazio rispetto alla storia agricola documentabile |
| Registro 2007 | **non verificabile** | Sostiene interamente ch04 e ch08 (`site.ts:157-170`, `326-335`) | Non è documentato nel fascicolo cliente | Richiede fonte ufficiale prima di restare pilastro narrativo |
| Territorio | **parzialmente coerente / da confermare** | Cherasco presentato come località, sede e luogo di processo | Cherasco è intestazione della lettera; campi e sedi non sono univoci (§§2.1, 2.3, 9) | Toponimi corretti come area narrativa, troppo certi come geografia operativa |
| Persone | **incoerente** | Nessuno | Matteo è la voce e responsabilità visibile; persone reali da identificare (§§2.1, 7 Persone) | L’azienda appare senza autore |
| Metodi agricoli | **parzialmente coerente** | Simbiotica, semina in purezza, mano, sole | Ricorrenti ma certificazione/status da verificare (§§2.1, 2.3, 7) | Buoni contenuti, privi di prova visuale e spiegazione |
| Filiera | **incoerente** | «senza intermediari», dal campo alla confezione | Etichette indicano operatori e stabilimenti terzi (§§2.3, 9) | Promessa potenzialmente falsa o almeno fuorviante |
| Catalogo | **parzialmente coerente / da confermare** | 5 referenze, tutte marcate complete | Stessa gamma plausibile, ma formati e disponibilità confliggono (§6) | Buona struttura dati, certezza commerciale eccessiva |
| Packaging | **parzialmente coerente** | Una foto collettiva senza Maisotti/La Maisèra; nessun packshot individuale | Pack recente è elemento forte ma servono master e conferma formati (§§1.3, 4.7) | Troppo poco visibile e non abbastanza aggiornabile |
| Target | **parzialmente coerente** | Richiesta quantità, prezzi retail, monoporzione B2B, fiere | Botteghe, ristoratori e consumatori; canale prioritario non definito (§10-11) | La pagina parla a tutti e a nessuno in modo esplicito |
| Posizionamento | **parzialmente coerente** | Heritage premium / culturale / luxury | Piccola specialità agricola, premium accessibile, contadino competente (§3) | Eleganza corretta, grado di monumentalità e lusso eccessivo |
| CTA | **parzialmente coerente** | Contatto diretto e disponibilità; no shop | Relazione diretta coerente; per B2B sarebbero utili campioni/schede (§8) | Funzionale, ma non segmentata e basata su dati da validare |
| Eleganza vs rusticità | **incoerente** | Eleganza alta, rusticità quasi solo simulata nelle texture | Eleganza media, rusticità medio-alta e autentica (§3) | Il bilanciamento è invertito |
| Autenticità vs effetto scenico | **incoerente** | Effetto scenico molto alto; prove reali basse | «Mostrare prima di proclamare» (§12) | La regia precede l’evidenza |
| Dimensione aziendale | **parzialmente coerente** | Disponibilità legata al raccolto, nessun e-commerce | Azienda giovane e piccola; relazione diretta (§2.1) | Il sito non dice chiaramente «piccola» né mostra la scala umana |

---

## 4. Analisi sezione per sezione

### 4.0 Sistema trasversale — rail, griglia e prologo

**Funzione attuale.** Trasforma il fatto morfologico delle otto file in struttura, navigazione e memoria interattiva.

**Cosa funziona.** È un’idea specifica, tecnicamente notevole, accessibile da tastiera, reversibile allo scroll e dotata di reduced-motion. Il rail offre anche navigazione rapida.

**Distanza dal brand reale.** Il numero otto diventa più importante dell’azienda: otto colonne, otto schede, 64 chicchi, 8:5, durate multiple di otto. Il copy arriva a spiegare «la struttura a questa pagina» (`site.ts:141-153`), quindi il sito racconta il proprio design. Su mobile la rail usa 40 px permanenti per un’informazione quasi illeggibile senza tap.

**Gravità.** Media.

**Intervento consigliato.** **Semplificare** e mantenere come firma secondaria. Conservare il principio dell’otto e il codice, ma non obbligare la nuova architettura ad avere otto capitoli né a costruire ogni misura intorno al concept.

**Evidenze.** `src/components/RigaOttava.tsx`, `src/components/KernelPrologue.client.tsx`, `src/components/ExperienceMotion.tsx`, `src/styles/components.css:11-117`, `docs/art-direction.md:52-70`.

### 4.1 Header

**Funzione attuale.** Identificare azienda e luogo; offrire una scorciatoia ai contatti.

**Cosa funziona.** È sobrio, sempre chiaro e non invade la hero. «Contatti» è utile fin dal primo viewport.

**Distanza dal brand reale.** Il Giardino delle Esperidi è un semplice wordmark testuale; Mais Rosso Co. e il sigillo reale non appaiono. «Cherasco (CN)» sembra una localizzazione certa mentre l’audit distingue recapito, sede, campi e trasformatori.

**Gravità.** Alta.

**Intervento consigliato.** **Riprogettare parzialmente** dopo la decisione sull’architettura di marca; mantenere ingombro, link e comportamento.

**Evidenze.** `src/components/Header.tsx:3-13`, `src/content/site.ts:44-49`, Brand Audit §§4.1 e 9.

### 4.2 Hero

**Funzione attuale.** Rendere la varietà protagonista e aprire il registro.

**Cosa funziona.** Il visitatore capisce immediatamente «Mais Rosso Ottofile Integrale»; il titolo ha grande memorabilità; su mobile resta leggibile; il prologo è leggero nei fallback e rispettoso delle preferenze di motion.

**Distanza dal brand reale.** Non mostra il prodotto, la pannocchia proprietaria, il sigillo o una persona. Potrebbe essere la copertina di una mostra. «Registro · 8 schede» descrive l’oggetto editoriale, non il valore aziendale. L’azienda resta una riga minuta.

**Gravità.** Alta.

**Intervento consigliato.** **Mantenere struttura e riscrivere/sostituire immagini**. Conservare forza tipografica e chiarezza sul mais, aggiungendo firma di marca, una prova reale e una proposizione commerciale/aziendale breve.

**Evidenze.** `src/components/Hero.tsx`, `src/content/site.ts:51-66`, `src/styles/components.css:153-258`.

### 4.3 Scheda 01 — La varietà

**Funzione attuale.** Introdurre nome, morfologia, luogo, processo e rischio.

**Cosa funziona.** Informazioni organizzate e scansionabili; colore del chicco e otto file sono distintivi; la campitura deriva da una foto cliente.

**Distanza dal brand reale.** Troppe affermazioni eterogenee sono concentrate nella prima scheda. «A Cherasco» applicato a semina/raccolta/essiccazione non è provato dall’audit. La foto autentica è resa quasi invisibile (opacità 0,055 desktop), mentre la pianta code-native diventa il visual dominante. Nessun nome umano.

**Gravità.** Alta.

**Intervento consigliato.** **Mantenere ma riscrivere** e **sostituire/riportare in primo piano immagini reali**. Separare identità varietale, luogo e metodo finché non sono confermati.

**Evidenze.** `src/content/site.ts:87-113`, `src/components/Scheda.tsx:15-53`, `src/content/media.ts:83-106`, `src/styles/components.css:1828-1831`.

### 4.4 Scheda 02 — Il mais del Re

**Funzione attuale.** Dare profondità storica e spiegare il soprannome.

**Cosa funziona.** Il copy attribuisce correttamente il racconto alla «tradizione aziendale» anziché presentarlo senza cautele. Il soprannome e «la melia du re» sono memorabili.

**Distanza dal brand reale.** È il secondo capitolo e una delle lastre più grandi: una storia non provata riceve più importanza di Matteo, dell’azienda, del raccolto e dei prodotti. «Pollenzo» e la disposizione regia hanno versioni contraddittorie nel materiale. La pannocchia AI, lucida e scultorea, appare come prova pur essendo uno studio provvisorio.

**Gravità.** Alta.

**Intervento consigliato.** **Spostare** più avanti e **rendere più concreta**; mantenerla come nota/episodio attribuito solo dopo verifica. Sostituire la lastra con materiale reale o rimuoverla.

**Evidenze.** `src/content/site.ts:114-137`, `src/components/Chapters.tsx:19-47`, `src/content/media.ts:108-143`, Brand Audit §§2.3, 5.4, 9.

### 4.5 Scheda 03 — Otto file

**Funzione attuale.** Spiegare il tratto morfologico e legittimare l’intero sistema UI.

**Cosa funziona.** È la caratteristica più proprietaria e comprensibile. La scelta di non affidare il conteggio a una pannocchia generata è corretta.

**Distanza dal brand reale.** La seconda metà parla di «questa pagina», «otto colonne», «otto schede» e «sessantaquattro» invece che di pannocchia, seme, selezione o riconoscibilità. È autopresentazione del concept.

**Gravità.** Media.

**Intervento consigliato.** **Mantenere ma riscrivere**. Conservare il grande 8 e il dato; eliminare o ridurre la spiegazione metaprogettuale.

**Evidenze.** `src/content/site.ts:139-154`, `src/components/Chapters.tsx:50-83`.

### 4.6 Scheda 04 — Quasi estinto

**Funzione attuale.** Costruire lo stake emotivo della conservazione.

**Cosa funziona.** La frase «resta viva se viene seminata» è efficace e allinea acquisto/coltivazione con custodia.

**Distanza dal brand reale.** L’iscrizione al Registro delle Varietà da Conservazione nel 2007 non compare nel materiale auditato. Eppure è un numero monumentale e il pilastro della chiusa. La pianta è AI e sostituisce le foto reali di pannocchie sulla pianta disponibili nell’archivio cliente.

**Gravità.** Critica finché il 2007 non è provato; alta sul visual.

**Intervento consigliato.** **Riprogettare parzialmente**. Validare fonte e denominazione del registro; in assenza di prova, fondare il capitolo sul recupero dagli ibridi e sulla biodiversità documentata. Usare immagini reali di campo.

**Evidenze.** `src/content/site.ts:155-170`, `src/components/Chapters.tsx:86-124`, `src/content/media.ts:145-196`, Brand Audit §§2.1-2.3 e 7.

### 4.7 Scheda 05 — Il campo

**Funzione attuale.** Raccontare metodo, filiera e disponibilità legata al raccolto.

**Cosa funziona.** È vicino al cuore reale del brand; «disponibilità legata al raccolto» è una differenza commerciale credibile; il registro dati può rendere trasparente ogni fase.

**Distanza dal brand reale.** «Senza intermediari» e «dal campo alla confezione» contraddicono etichette con trasformatori/confezionatori terzi. L’immagine AI di steli secchi non mostra il campo aziendale né alcun lavoro. L’agricoltura simbiotica è nominata ma non spiegata o provata.

**Gravità.** Critica per la filiera; alta per fotografia e concretezza.

**Intervento consigliato.** **Rendere più concreta** e **riscrivere**. Trasformare il registro in una mappa trasparente: cosa fa l’azienda, cosa fanno i partner, dove, con quale prova. Sostituire l’immagine con campo/raccolto/lavorazione reali.

**Evidenze.** `src/content/site.ts:172-194`, `src/components/Chapters.tsx:126-155`, `src/content/media.ts:198-208`, Brand Audit §§2.3 e 9.

### 4.8 Scheda 06 — La pietra

**Funzione attuale.** Mostrare il passaggio chicco→farina e aprire alle trasformazioni.

**Cosa funziona.** «Chicco / Farina» è una transizione chiara; macinazione, integrale, formato e vasetto sono informazioni utili; la sezione prepara bene il catalogo.

**Distanza dal brand reale.** Sia la pietra sia la farina sono generiche/AI. Non si vede il vero vaso, la macina, il confezionamento o chi lavora. La frase sulle cinque trasformazioni non chiarisce subito che Maissini, Maisotti e birra includono altri ingredienti.

**Gravità.** Alta.

**Intervento consigliato.** **Mantenere struttura e sostituire immagini**, con copy più preciso sulla differenza tra materia principale e composizione dei prodotti.

**Evidenze.** `src/content/site.ts:195-218`, `src/components/Chapters.tsx:157-196`, `src/content/media.ts:210-233`.

### 4.9 Scheda 07 — Le referenze

**Funzione attuale.** Presentare gamma, uso, origine, formato, prezzo, allergeni e CTA.

**Cosa funziona.** È il blocco più riusabile. Il rendering è data-driven; può assorbire nuove righe senza cambiare componente. Distingue correttamente glutine e allergeni; non simula un e-commerce; ogni CTA apre una richiesta specifica. Su mobile le schede diventano una colonna leggibile.

**Distanza dal brand reale.** La foto non mostra Maisotti e La Maisèra e deriva da una brochure 2025, non da packshot correnti confermati. Prezzi e formati storici sono pubblicati come fatti attuali; tutte le schede sono marcate «complete» benché l’audit le consideri da confermare. Non sono esposti ingredienti completi, produttori/trasformatori, disponibilità, target o condizioni B2B. «Il catalogo è aperto. Alcune schede sono ancora parziali» è incoerente con lo stato `completo` di tutte le referenze.

**Gravità.** Alta.

**Intervento consigliato.** **Mantenere struttura, rendere più concreta e riprogettare parzialmente**. Validare il catalogo; aggiungere packshot reali o dettagli per prodotto; distinguere ingredienti e canali; eliminare prezzi finché non confermati.

**Evidenze.** `src/content/facts.ts:218-342`, `src/content/site.ts:219-304`, `src/components/Chapters.tsx:198-292`, `src/content/media.ts:235-270`, Brand Audit §6.

### 4.10 Scheda 08 — Custodia

**Funzione attuale.** Chiudere il registro con un climax emotivo e cromatico.

**Cosa funziona.** L’idea «custodire = continuare a seminare» è coerente con il Brand DNA; l’inversione è memorabile; la motion è ben controllata e il reduced-motion mantiene il significato.

**Distanza dal brand reale.** La sezione ripete registro 2007, purezza, raccolta a mano, sole e raccolto come verità consolidate. «Questo non è un catalogo» contraddice l’esigenza commerciale e sminuisce la sezione prodotti appena letta. Il grande corsivo arancio su crema e la firma ad albero hanno una forza luxury/editoriale estranea al pack recente. Il vecchio albero firma il momento più importante mentre Mais Rosso Co. non compare.

**Gravità.** Alta; critica se il 2007 non viene provato.

**Intervento consigliato.** **Riprogettare parzialmente**. Conservare eventualmente l’inversione e la tesi della custodia, ma fondarla su lavoro/persona/raccolto verificati e sulla firma di marca approvata.

**Evidenze.** `src/content/site.ts:306-336`, `src/components/Chapters.tsx:294-341`, `src/components/ExperienceMotion.tsx:37-97`, `src/styles/components.css:987-1127`, `1959-2038`.

### 4.11 Contatti e footer

**Funzione attuale.** Spiegare come acquistare senza e-commerce e dare canali diretti.

**Cosa funziona.** È concreto, rassicurante e fruibile. Dice subito che non esiste vendita online; chiarisce il percorso; offre email precompilata, telefono e fiere. È uno dei rari momenti in cui il visitatore incontra la scala relazionale del brand.

**Distanza dal brand reale.** Non distingue cliente finale, ristoratore e negozio; non offre campioni, listino aggiornato o scheda B2B. L’indirizzo «12062 Cherasco» è esposto come recapito certo; il soggetto legale e la P. IVA mancano. Il calendario fiere non esiste. I social appartengono a due nomenclature diverse. Vecchio albero e campo nero/oro mantengono il tono luxury.

**Gravità.** Media, con aspetti legali potenzialmente alti.

**Intervento consigliato.** **Mantenere ma riscrivere** e completare dopo la scelta commerciale. Preservare componenti, mailto e ordine; differenziare percorsi B2B/DTC e correggere dati legali.

**Evidenze.** `src/content/site.ts:338-470`, `src/components/ContactFooter.tsx`, Brand Audit §§9-11.

---

## 5. Inventario e valutazione degli asset attuali

### 5.1 Asset renderizzati o distribuiti

| Percorso / gruppo | Uso | Origine documentata | Classe | Coerenza brand | Credibilità | Azione / sostituto consigliato |
|---|---|---|---|---|---|---|
| `public/images/textures/carta.avif` | Fondo globale | Higgsfield `z_image`, derivato e neutralizzato (`assets-manifest` §Approved) | Generato/derivato | Media | Non documentaria | Può restare come texture discreta; non deve sostituire materia reale |
| `public/images/generated/prologue/dispersion.avif` | Fallback hero | Export deterministico del renderer WebGL | Derivato code-native | Media | Non documentaria | Preservabile come motion signature secondaria |
| `public/images/generated/prologue/plant.avif` | Fallback ch01 | Export deterministico WebGL | Derivato code-native | Media | Non documentaria | Ridurre se compete con la foto reale |
| `public/images/generated/prologue/incisions.avif` | Fallback ch02/ch03 | Export deterministico WebGL | Derivato code-native | Media-alta sul tema “otto” | Non documentaria | Preservabile nel capitolo morfologico, non come prova agricola |
| `public/images/foto/pannocchie-cover.avif` | Campitura ch01 | Foto cliente estratta dalla lettera, originale 538×593, ritagliata e upscalata | Autentica cliente + derivata/ritoccata | Alta | Media: soggetto reale, sorgente debole | Chiedere master; in alternativa usare gli originali `IMG_6376/6377`, `IMG_6378/6379` o campo reale indicati nel Brand Audit §12 |
| `public/images/generated/piastre/re-materia-test.png` | Ch02 Re | Higgsfield Nano Banana Pro | Generato, provvisorio | Bassa | Bassa | Sostituire con materia reale o rimuovere; non usare per sostenere una storia storica |
| `public/images/generated/piastre/atmosfera-luce.png` | Ch04 desktop e mobile | Higgsfield Nano Banana Pro | Generato, provvisorio; stesso file in due slot | Bassa | Bassa | Sostituire con `IMG_5046.JPG` o una foto reale della pannocchia in campo |
| `public/images/generated/piastre/campo-coltura.avif` | Ch05 campo | Higgsfield Nano Banana Pro | Generato, provvisorio | Molto bassa | Molto bassa: non è il campo aziendale | Usare `TRUS5087`, `LIAI9634`, `MBMU3083`, `UNDG2504`, `UYIO1755` dopo verifica luogo/diritti |
| `public/images/generated/piastre/pietra-macina-cover.avif` | Campitura ch06 | Higgsfield Nano Banana Pro | Generato, provvisorio | Bassa-media | Bassa | Richiedere foto della macinazione/partner reale; finché manca, usare un crop reale di chicco/farina senza attribuire processo |
| `public/images/generated/piastre/pietra-farina.avif` | Ch06 oggetto | Higgsfield Nano Banana Pro | Generato, provvisorio | Media come materia | Bassa per l’azienda | Usare `IMG_6380`, `IMG_6383`, `IMG_6391` o pack farina corrente, con master |
| `public/images/foto/referenze-confezioni.avif` | Ch07 pack collettivi | Foto cliente estratta da brochure, originale 908×908, ritagliata/upscalata | Autentica cliente + derivata/ritoccata; aggiornamento non garantito | Alta | Media | Chiedere originali e packshot correnti di tutte e cinque le referenze; non basta per catalogo 2026 |
| `public/images/marchio/tondo-384.png` | Firma ch08 | Vecchio albero Il Giardino delle Esperidi | Autentico cliente, identità precedente | Bassa rispetto alla fase Mais Rosso Co. | Alta come marchio storico, bassa come gerarchia corrente | Non eliminare finché il cliente decide; non usarlo come firma principale senza approvazione |
| `public/images/marchio/tondo-80.png` | Footer | Derivato del precedente | Autentico/derivato, identità precedente | Bassa-media | Media | Stessa decisione del 384 px |
| `src/app/icon.png` | Favicon | Sigillo Mais Rosso Co. recente, derivato da brochure | Autentico cliente + derivato | Molto alta | Alta come riferimento, non come master | Portare il sistema in pagina solo dopo master/gerarchia approvati |
| `src/app/apple-icon.png` | Icona Apple | Sigillo recente su carta | Autentico cliente + derivato | Molto alta | Alta come riferimento | Chiedere master vettoriale |
| `src/app/opengraph-image.png` | Condivisione social | Illustrazione cliente delle due pannocchie, estratta e ricomposta | Autentico cliente + derivato | Molto alta | Alta come simbolo, media come file sorgente | È il segno più specifico ma non è visibile nella landing; chiedere PNG trasparente/SVG master |
| `src/assets/fonts/*` | Tipografia | Bodoni Moda, Archivo, DM Mono, file locali OFL | Asset terzi licenziati | Media | Alta tecnica | Licenze più sicure dei font packaging; mantenibili, ma riequilibrare il ruolo della Bodoni |

### 5.2 Osservazioni critiche sull’inventario

1. Il runtime mostra sei figure con `data-status="provvisorio"`/`definitivo`; cinque file unici AI alimentano la narrazione, due immagini cliente alimentano la documentazione. `src/content/media.ts:13-34` lo dichiara correttamente nel codice.
2. La dicitura visibile «Immagine provvisoria» è stata rimossa su richiesta del cliente (`src/components/Piastra.tsx:89-94`). Da quel momento il visitatore non ha più modo di distinguere studio editoriale e prova reale.
3. Le foto autentiche sono state desaturate, ritagliate e upscalate per somigliare al sistema editoriale (`docs/brand-alignment.md:96-107`). Il trattamento «rende invisibile la provenienza mista», ma rende invisibile anche la differenza tra realtà e costruzione: un vantaggio estetico diventa un problema di fiducia.
4. Le due immagini cliente distribuite non provengono dai master originali. Il Brand Audit identifica decine di JPG ad alta risoluzione che il progetto non usa.
5. Il sigillo recente e la doppia pannocchia sono presenti nel repository ma quasi assenti dall’esperienza. Il vecchio albero è invece visibile due volte in momenti di firma.
6. Non esistono immagini individuali per Farina, Maisette, Maissini, Maisotti o La Maisèra; `public/images/products/` è vuota.
7. Non ci sono video in landing, né persone, sedi, macchine o partner reali.

### 5.3 Asset pittorici/editoriali e rischio percettivo

- `re-materia-test.png` appare come una pannocchia-scultura: pulita, levigata e quasi fashion.
- `atmosfera-luce.png` è una pianta isolata su fondo neutro: leggibile come illustrazione botanica o render.
- `campo-coltura.avif` mostra frammenti di steli su carta, non un campo; associa «Il campo» a un’astrazione.
- `pietra-macina-cover.avif` e `pietra-farina.avif` sono macro materiche convincenti, ma potrebbero appartenere a qualsiasi mulino o brand di polenta.
- `referenze-confezioni.avif` è l’unica prova di scaffale, ma viene trattata come una grande lastra editoriale e non permette di capire chiaramente gamma, scala e pack.

Questi asset non sono «brutti»; sono **troppo capaci di completare il racconto al posto dell’azienda**.

---

## 6. Analisi del linguaggio

### 6.1 Tono complessivo

Il copy attuale ha eliminato quasi tutti gli aggettivi pubblicitari e questo è un risultato da preservare. È più preciso della comunicazione storica del cliente. Il problema non è eccesso di poesia diffusa, ma **una cornice poetico-istituzionale eccessiva**: registro, custodia, quasi estinzione, Re, grande corsivo e chiusa programmatica.

Il Brand Audit individua come tono migliore «familiare-professionale, caldo, concreto, orgoglioso senza essere aristocratico» (§§3 e 5). La landing è professionale e concreta nei dati, ma non familiare, non personale e poco sensoriale.

### 6.2 Frasi e direzioni correttive

| Copy attuale | Problema | Direzione correttiva, senza riscrittura completa |
|---|---|---|
| «Varietà Albese · Cherasco (CN) · Registro · 8 schede» | Metacopy sul sito; Cherasco troppo certo | Sostituire la parte “registro/8 schede” con chi coltiva, dove con certezza e perché la varietà conta |
| «Una varietà dell’Albese tra quelle a maggior rischio di estinzione in Piemonte» | Claim non corroborato dal nuovo audit | Chiedere fonte; in alternativa parlare di varietà recuperata dopo l’abbandono a favore degli ibridi |
| «La seminiamo… a Cherasco, in un’oasi protetta…» | Combina metodo, sede e paesaggio da fonti diverse | Separare fatti; usare luogo esatto solo dopo mappa di filiera |
| «Il mais del Re» + Vittorio Emanuele II/Pollenzo | Storia fragile e troppo centrale | Mantenerla come tradizione attribuita/nota laterale dopo verifica, non come secondo capitolo |
| «Esattamente otto. Non sette, non dieci.» | Efficace ma teatrale | Può restare come accento; affiancare una prova reale/morfologica |
| «Il numero… dà la struttura a questa pagina» | Autoreferenziale; parla del design | Sostituire con ciò che le otto file significano per riconoscere/conservare la varietà |
| «Registro delle Varietà da Conservazione · 2007» | Non presente nei materiali auditati | Pubblicare solo con fonte ufficiale citabile |
| «La filiera va… senza intermediari» | Contraddetto dalle etichette terze | Parlare di filiera seguita/controllata e nominare con trasparenza i partner confermati |
| «Una terra sola. Una materia prima principale. Lavorazioni diverse.» | Buona tesi, ma “terra sola” può implicare luogo/filiera unici | Conservare il rapporto un campo→più prodotti, precisando ingredienti e lavorazioni |
| «Ogni scheda dichiara da che cosa nasce» | In realtà non presenta ingredienti completi né trasformatori | Ampliare il record o rendere meno assoluta la frase |
| «I prezzi sono quelli del listino aziendale» | Il listino è settembre 2025 | Eliminare finché il cliente non conferma listino 2026 |
| «Il catalogo è aperto. Alcune schede sono ancora parziali.» | Incoerente con cinque status `completo` | Allineare stato dati e copy; meglio dichiarare “dati da confermare” internamente, non al pubblico senza motivo |
| «Custodire vuol dire seminare» | Autentica e forte | Preservare come principio, sostenendolo con persona/campo reali |
| «Questo non è un catalogo» | Poetico e commercialmente difensivo; il sito contiene un catalogo | Sostituire con una chiusa che tenga insieme conservazione e disponibilità, senza negare l’offerta |
| «Quello che c’è è quello che il campo ha dato» | Caldo e distintivo, ma claim di scala/disponibilità | Conservare solo se il modello di disponibilità è confermato |
| «Non vendiamo online» | Concreto e utile | Preservare, aggiornare se cambia il canale |

### 6.3 Cosa manca nel linguaggio

- «Matteo Giordano» e una voce in prima persona riconoscibile;
- «piccola azienda agricola» o una descrizione onesta della scala;
- cosa rende buoni i prodotti: profumo, consistenza, uso, abbinamenti;
- differenza tra coltivare, macinare, far produrre, confezionare e vendere;
- luoghi esatti e partner, quando confermati;
- ingredienti principali e allergeni completi per prodotto;
- disponibilità e destinatario commerciale;
- origine della gamma dalla farina, se confermata cronologicamente;
- relazione chiara Il Giardino / Mais Rosso Co.

### 6.4 Storytelling inventato o sovrainterpretato

Il progetto evita invenzioni esplicite meglio di molti concept: attribuisce la storia del Re, vieta claim salute e non inventa persone. Tuttavia sovrainterpreta tre elementi:

1. **Il registro**: il Brand Audit non dimostra che l’identità vissuta dall’azienda sia quella di un’istituzione archivistica.
2. **Il numero otto**: vero e distintivo, ma elevato a legge totale del sistema.
3. **La custodia monumentale**: valore autentico, trasformato in climax museale e quasi sacrale.

Il rischio non è falso fact-checking, ma **una verità parziale elevata a identità completa**.

---

## 7. Concretezza commerciale

### 7.1 Cosa si capisce oggi

| Domanda | Risposta dalla landing | Valutazione |
|---|---|---|
| Cosa produce l’azienda? | Farina, Maisette, Maissini, Maisotti, La Maisèra | Chiaro nel ch07, ma tardi |
| Prodotti realmente disponibili? | Tutti sembrano disponibili su richiesta | Non verificabile; l’audit chiede catalogo attivo e disponibilità |
| Prodotti direttamente dal mais? | Farina e Maisette sono presentati come diretti; tutti hanno origine “Mais Rosso Ottofile” | Parzialmente chiaro; `origin` può far sembrare anche forno/birra derivati solo dal mais |
| Presenza di frumento/altri ingredienti? | Allergeni su Maissini/Maisotti/birra; 26,7% Mais Rosso sui Maisotti | Meglio della media, ma ingredienti completi assenti |
| Come avviene la vendita? | No online; email/telefono; disponibilità; fiere | Chiaro e credibile come meccanica |
| A chi vende? | Non dichiarato | Ambiguo tra consumatore, ristoratore e negozio |
| Quali formati? | 500 g, 120/18 g, 200 g, 250 g, 33 cl | Chiaro ma da riconfermare |
| Ruolo della birra? | Quinta trasformazione, birra agricola da tavola, 33 cl 7% | Narrativamente chiaro, commercialmente non confermato e senza foto |
| Ruolo dell’Amaro? | Assente | Repository dice “cliente ha confermato fuori catalogo” solo nei commenti; Brand Audit non contiene prova. Da verbalizzare/confermare |
| Prezzi? | Presenti per quattro prodotti | Non pubblicabili come correnti: listino settembre 2025 |
| Packaging? | Una collettiva parziale | Insufficiente a riconoscere cosa si riceve |

### 7.2 Promesse non sostenute o troppo certe

- semina, raccolta ed essiccazione **a Cherasco**;
- sede/recapito aziendale completo a Cherasco;
- filiera «senza intermediari»;
- tutte le schede prodotto «complete»;
- prezzi correnti;
- formati correnti di Maisette, Maissini e Maisotti;
- La Maisèra solo 33 cl e disponibile;
- Registro delle Varietà da Conservazione dal 2007;
- rischio di estinzione formulato come classificazione ufficiale;
- partecipazione alle fiere come canale continuativo attuale;
- eventuale risposta con disponibilità/modalità, se il processo commerciale non è organizzato.

### 7.3 Posizionamento commerciale realistico

Il posizionamento più sostenibile dai materiali è:

> Piccola azienda agricola piemontese che coltiva un Mais Rosso Ottofile specifico e lo porta, con partner e lavorazioni trasparenti, in una gamma limitata per botteghe, ristorazione e consumatori attenti all’origine.

Non è realistico presentarla come:

- maison luxury delle Langhe;
- e-commerce nazionale maturo;
- filiera interamente interna senza partner;
- brand salutistico/gluten free;
- catalogo ampio e stabile;
- istituzione scientifica senza prove delle collaborazioni.

---

## 8. Elementi da preservare

| Elemento | Perché non va buttato | Come riallinearlo |
|---|---|---|
| `facts.ts` come fonte dati | Separa contenuto e rendering; facilita correzioni | Cambiare lo stato da “verificato” a un record con fonte, data, validità e conferma cliente |
| Modello generico `Product.specs` | Assorbe formati, allergeni, prezzi e altri dati senza cambiare UI | Aggiungere ingredienti, trasformatori, disponibilità e target solo dopo validazione |
| `ProductsChapter` data-driven | È robusto e già responsive | Inserire foto/pack, rimuovere dati storici, segmentare CTA |
| Mailto precompilati per prodotto | Riduce attrito senza backend | Adattare soggetto/campi per B2B e DTC |
| Sezione «Come acquistare» | Risponde a una domanda reale | Portarla più in alto o anticiparne un estratto; distinguere canali |
| `Piastra` + registro `media.ts` | Consente swap asset senza riscrivere layout | Aggiungere provenienza/diritti/data anche nell’audit interno; sostituire AI con reali |
| Reduced-motion e fallback statici | Accessibilità e resilienza eccellenti | Preservare in ogni direzione |
| Semantica di `RegistroDati` | `<dl>` corretto e scansionabile | Usarlo per dati veri, non per monumentalizzare claim incerti |
| Responsive a colonna | Nessun overflow, testi leggibili, CTA usabili | Ridurre lunghezza e peso del rail mobile, non rifare da zero |
| Principio delle otto file | È realmente distintivo | Tenerlo come firma/episodio, non come legge assoluta dell’IA e della pagina |
| Hero centrata sul nome completo | Identifica subito il protagonista | Aggiungere azienda, pack/simbolo e prova reale |
| Disciplina anti-claim | Il sito evita salute, “bio”, superlativi e gluten-free impropri | Estendere la stessa cautela a storia, sedi, filiera e prezzi |
| Dati allergeni | Mostrano responsabilità e distinguono prodotto dal mais | Completare con ingredienti/schede validate |
| Inversione finale | È una firma memorabile e già ben implementata | Legarla a un contenuto vero e a un marchio approvato; ridurne il carattere luxury se necessario |
| Texture carta e griglia | Danno tattilità e ordine | Affiancarle a colori/forme del pack e fotografia più viva |
| Bodoni/Archivo/DM Mono | Sistema coerente, leggibile, legalmente più sicuro dei font packaging dubbi | Ridurre la Bodoni monumentale; introdurre un accento di marca approvato senza moltiplicare famiglie |
| Controlli e test esistenti | Proteggono accessibilità, overflow, claim e motion | Aggiornare i test quando cambiano decisioni, senza trasformare vecchie scelte creative in dogmi |

---

## 9. Cause dell’effetto «bellissimo, ma sembra un concept»

Ordinate per impatto.

| Priorità | Categoria | Causa | Impatto |
|---:|---|---|---|
| 1 | Fotografia / prove reali | Cinque file AI dominano sei slot; persone, luoghi, processi e pack individuali assenti | Critico |
| 2 | Branding | Sigillo Mais Rosso Co. e doppia pannocchia fuori pagina; vecchio albero firma ch08/footer | Critico |
| 3 | Contenuto / struttura | Il sito è costruito come registro a otto schede, non come azienda→campo→prodotti→contatto | Critico |
| 4 | Claim / prove | 2007, rischio, Cherasco e «senza intermediari» hanno un’autorità visiva superiore alla loro prova | Critico |
| 5 | Persone e territorio | Nessun Matteo, volto, mano riconoscibile, luogo o partner | Alto |
| 6 | Catalogo | Dati 2025 presentati come correnti; una sola foto incompleta; birra senza pack | Alto |
| 7 | Tipografia / UI | Bodoni, grandi vuoti e dati monospazio producono distanza museale/luxury | Alto |
| 8 | Copy | «Questo non è un catalogo», metacopy sull’otto e tono impersonale | Alto |
| 9 | Palette | Il sito sterilizza l’arancio/petrolio del pack in crema/nero/oro | Medio-alto |
| 10 | Motion | Rail, pin e climax premiano il completamento dell’esperienza più della scoperta dell’azienda | Medio |
| 11 | Concretezza commerciale | Contatto chiaro ma molto tardo; pubblico e condizioni non dichiarati | Medio |
| 12 | Minimalismo | Troppo spazio rispetto a prove e contenuto reale, soprattutto prima del catalogo | Medio |

### Causa radice organizzativa

La distanza non è accidentale. Tre decisioni interne l’hanno prodotta:

1. `docs/discovery.md:82-91` conclude che «nothing visual is worth carrying forward» prima di esaminare l’archivio cliente oggi auditato.
2. `docs/discovery.md:117-121` valuta esplicitamente il potenziale «for the portfolio» della direzione museale.
3. `docs/art-direction.md:52-70` rende invarianti non rivedibili otto colonne, otto capitoli e un solo evento cromatico.

Queste decisioni hanno protetto la qualità formale, ma hanno impedito al materiale cliente successivo di modificare davvero l’identità del progetto: le parole e due foto sono state inserite **dentro** il concept, mentre il concept non è stato riesaminato **alla luce** delle nuove prove.

---

## 10. Tre livelli di correzione

### Livello A — Riallineamento leggero

**Cosa cambia**

- correzione di prezzi, formati, sedi e claim;
- sostituzione delle piastre AI con fotografie cliente compatibili;
- inserimento più visibile di sigillo/doppia pannocchia;
- aggiunta di Matteo e di una breve descrizione aziendale;
- aggiornamento del footer legale/commerciale;
- piccoli ritocchi alla palette e al copy.

**Cosa resta**

- otto schede nello stesso ordine;
- rail e prologo invariati;
- registro come metafora dominante;
- tipografia e climax quasi invariati;
- catalogo nella stessa posizione.

**Vantaggi.** Rapido, basso rischio tecnico, massimo riuso.

**Rischi.** Le foto reali verrebbero assorbite dalla stessa voce museale; l’azienda continuerebbe ad arrivare tardi; storia del Re/2007/otto resterebbero sproporzionati.

**Complessità.** Bassa-media.

**Probabilità di risolvere la percezione cliente.** **35–50%**. Migliora credibilità, non corregge la causa strutturale.

### Livello B — Evoluzione strutturata

**Cosa cambia**

- nuova gerarchia narrativa basata su azienda/persona → mais → campo e filiera → prodotti → custodia/territorio → contatto;
- otto come firma, non obbligo di otto capitoli;
- art direction fotografica fondata su archivio reale e nuovo servizio mirato;
- identità UI riallineata a arancio/crema/petrolio/rosso ramato e simboli reali;
- brand architecture visibile e approvata;
- sezioni Re, 2007 e Custodia ridimensionate o rifondate;
- prodotti anticipati e resi più visivi/commerciali;
- percorsi B2B e diretto distinti;
- motion conservata dove sostiene contenuto vero.

**Cosa resta**

- fondazione Next/React e componenti;
- `facts.ts`/`site.ts`/`media.ts` come separazione di responsabilità;
- `Piastra`, `RegistroDati`, catalogo data-driven, mailto, footer e responsive;
- qualità tipografica e parte del sistema a griglia;
- prologo/rail/inversione, se ridimensionati e semanticamente riallineati;
- disciplina legale e accessibile.

**Vantaggi.** Affronta fotografie, marchio, gerarchia e commercio senza perdere il capitale tecnico. Permette al cliente di riconoscersi, non solo di ammirare il lavoro.

**Rischi.** Richiede decisioni cliente e asset migliori; va governato per evitare un ritorno a un generico sito agricolo rustico.

**Complessità.** Media-alta.

**Probabilità di risolvere la percezione cliente.** **80–90%**, se i blocker vengono chiusi.

### Livello C — Ripensamento profondo

**Cosa cambia**

- nuova architettura informativa e nuovo sistema visuale;
- eliminazione del registro come concetto principale;
- nuove sezioni e nuovi pattern commerciali;
- motion e navigazione ripensate;
- possibile ricostruzione di hero, catalogo e footer.

**Cosa resta**

- solo infrastruttura, dati verificati, accessibilità, alcune utility e componenti generici.

**Vantaggi.** Massima libertà di aderire al brand definitivo.

**Rischi.** Distrugge valore tecnico e soluzioni già valide; aumenta tempi/costi; può produrre un redesign agricolo convenzionale e meno memorabile.

**Complessità.** Alta.

**Probabilità di risolvere la percezione cliente.** **85–95%**, ma con rischio di sovracorrezione e spreco elevato.

### Raccomandazione

**Livello B — Evoluzione strutturata.**

È l’unico livello proporzionato alla diagnosi. Il problema è strutturale, quindi A non basta; il sistema tecnico e diversi componenti sono validi, quindi C è distruttivo. B consente di cambiare l’autorità del sito — dalle regole del concept alle prove dell’azienda — senza rinunciare a ciò che rende il progetto memorabile.

---

## 11. Questioni bloccanti

### 11.1 Decisioni necessarie prima del redesign

1. **Architettura di marca.** Quale nome guida header, hero, pack, social e footer? Che relazione hanno Il Giardino delle Esperidi, Mais Rosso Co. e Az. Agr. Giordano Matteo? La frase in `docs/nome-transizione.md:3-18` sul cambio nome è ancora valida?
2. **Catalogo attivo agosto 2026.** Per ogni referenza: nome, stato, formato, ingredienti, allergeni, valori, partner, prezzo, disponibilità.
3. **Canale prioritario.** B2B ristoranti/botteghe, vendita diretta, fiere o mix; territori serviti, minimi, spedizione, campioni.
4. **Mappa della filiera.** Sede legale, recapito, campi, essiccazione, macinazione, soffiatura, forno, birrificazione, confezionamento.
5. **Claim e fonti.** Registro 2007, rischio di estinzione, Re/Pollenzo/melia du re, agricoltura simbiotica, semina in purezza, mano, sole, collaborazioni, primati.
6. **La Maisèra.** 33/75 cl, gradazione, stato attivo, percentuale mais, birrificio/partner e foto corrente.
7. **Amaro del Dottore.** La nota nel repository che lo dichiara fuori catalogo deve diventare una decisione cliente tracciabile; se rientra servono tutti i materiali.
8. **Asset e diritti.** Master logo/pack, fotografie autorizzate, identità di `AXBH4011.JPG`, liberatorie e origine della scena birra.

### 11.2 Decisioni gestibili temporaneamente con placeholder dichiarati

- packshot mancanti: mantenere uno slot vuoto/dichiarato, non un mockup falso;
- foto persone: usare mani/campo reali senza volto solo con diritti verificati;
- calendario fiere: indicare che non è pubblicato senza inventare date;
- partner di filiera: predisporre il componente, non pubblicare nomi senza conferma;
- prezzo: omettere la riga; il componente già tollera `specs` assenti;
- formato alternativo La Maisèra: mostrare solo quello confermato o nessuno;
- nuovo nome/marchio: continuare a identificare correttamente il soggetto attuale, senza fingere il rebrand.

### 11.3 Problemi che non bloccano il lavoro

- numero esatto di animazioni secondarie;
- texture carta definitiva;
- presenza futura di ricette;
- eventuali premi/recensioni non ancora disponibili;
- calendario editoriale social;
- sistema completo di icone, oggi non necessario;
- ottimizzazione finale del rail, purché l’architettura sia stata decisa.

### 11.4 Problemi legali o commerciali da non aggirare

- P. IVA e dati obbligatori del soggetto commerciale;
- privacy policy e dominio effettivamente validi;
- claim salute/nutrizione/gluten-free/biologico;
- ingredienti, allergeni e valori nutrizionali per singolo prodotto;
- prezzi scaduti presentati come correnti;
- lavorazioni conto terzi presentate come interne;
- font packaging non OFL e licenze OnlineWebFonts;
- diritti e liberatorie fotografiche;
- uso di timbri come «Gourmet Piemonte» senza chiarirne lo status;
- claim storici, collaborazioni universitarie e primati senza prova;
- denominazioni e dati alcolici di La Maisèra;
- indirizzi che confondono sede, campi, stabilimento e confezionatore.

---

## 12. Piano operativo consigliato

### Fase 1 — Delibere cliente e record di verità

**Obiettivo.** Chiudere nomi, catalogo, canali, luoghi, filiera e claim.

**File/componenti coinvolti.** Prima solo documentazione; poi `src/content/facts.ts`, metadata in `src/app/layout.tsx`, contatti in `src/content/site.ts`.

**Dipendenze.** Risposte cliente, schede prodotto, documenti legali, fonti storiche/tecniche.

**Risultato atteso.** Un registro con campi `fonte`, `data`, `stato`, `approvato da`, non una lista di fatti “verificati” per assunzione.

### Fase 2 — Architettura di marca

**Obiettivo.** Stabilire chi firma, cosa è il marchio di linea e come appare il soggetto legale.

**File/componenti coinvolti.** `Header`, `Hero`, `ProductsChapter`, `CustodyChapter`, `ContactFooter`, `src/app/icon.png`, `apple-icon.png`, Open Graph, metadata.

**Dipendenze.** Decisione Il Giardino / Mais Rosso Co. / Az. Agr. Giordano Matteo; master logo.

**Risultato atteso.** Una gerarchia ripetibile su sito, pack e social; nessun vecchio albero o nuovo sigillo usato per inerzia.

### Fase 3 — Piano asset e diritti

**Obiettivo.** Sostituire le prove simulate con prove reali prioritarie.

**File/componenti coinvolti.** `src/content/media.ts`, `Piastra`, cartelle `public/images/foto` e future `products`; script di crop/grade solo dopo scelta asset.

**Dipendenze.** Master esistenti, liberatorie, verifica luoghi, nuovo servizio fotografico.

**Risultato atteso.** Set minimo: Matteo, campo, pannocchia, raccolto/cassette, macinazione o partner, vaso farina, Maisette, Maissini, Maisotti, La Maisèra, gruppo gamma.

Ordine di sostituzione:

1. campo e persona;
2. packaging corrente;
3. lavorazione/filiera;
4. pannocchia/chicco/farina;
5. eventuali immagini atmosferiche.

### Fase 4 — Nuova gerarchia dei contenuti

**Obiettivo.** Portare l’azienda reale prima del sistema concettuale.

**File/componenti coinvolti.** `src/app/page.tsx`, `src/content/site.ts`, `Chapters.tsx`, `Scheda.tsx`, `RigaOttava.tsx`.

**Dipendenze.** Fasi 1-3.

**Risultato atteso.** Un arco indicativo, da progettare dopo le decisioni:

`azienda/persona → Ottofile reale → campo e filiera → trasformazioni/prodotti → territorio/custodia → acquisto`

La storia del Re e il 2007 diventano moduli subordinati finché non provati.

### Fase 5 — Correzione copy

**Obiettivo.** Conservare precisione, aggiungere calore, persona, sensorialità e trasparenza.

**File/componenti coinvolti.** `src/content/site.ts`, `src/content/facts.ts`, metadata e alt/caption in `src/content/media.ts`.

**Dipendenze.** Record validato e target commerciale.

**Risultato atteso.** Nessun superlativo generico; nessuna metacopy sul concept; ogni claim sostenuto; prodotti descritti per materia, gusto, uso e composizione.

### Fase 6 — Evoluzione visuale e motion

**Obiettivo.** Riallineare palette, tipografia, simboli e interazioni senza perdere qualità.

**File/componenti coinvolti.** `src/styles/tokens.css`, `globals.css`, `components.css`, `ExperienceMotion`, `KernelPrologue`, `RigaOttava`.

**Dipendenze.** Architettura di marca e asset reali.

**Risultato atteso.** Più arancio/crema/petrolio/rosso ramato dove funzionale; meno monumentalità da museo; otto come firma; motion che accompagna prove reali e non obbliga una narrazione di otto capitoli.

### Fase 7 — Evoluzione commerciale

**Obiettivo.** Rendere l’offerta azionabile per il pubblico prioritario.

**File/componenti coinvolti.** `ProductsChapter`, `ContactFooter`, `contatti`, eventuali moduli/risorse nuove.

**Dipendenze.** Catalogo, prezzi, logistica, target.

**Risultato atteso.** Percorsi distinti:

- consumatore: disponibilità, acquisto diretto/fiere/rivenditore se esiste;
- ristoratore: campioni, formati, abbinamenti, disponibilità;
- negozio: listino, cartoni, minimi, schede.

### Fase 8 — Verifica finale

**Obiettivo.** Dimostrare che il sito appartiene all’azienda e non solo al concept.

**File/componenti coinvolti.** Intero frontend, metadata, asset manifest, test browser.

**Dipendenze.** Tutte le fasi precedenti.

**Risultato atteso.** Checklist di accettazione:

- il cliente riconosce persone, luoghi, pack e voce;
- visitatore nuovo capisce entro il primo viewport chi coltiva cosa;
- entro i primi due/tre blocchi vede una prova reale;
- marchi e soggetto legale hanno gerarchia chiara;
- tutti i dati hanno fonte/data/stato;
- nessun prezzo/formato/claim obsoleto;
- B2B e diretto sono distinguibili;
- nessun asset AI può essere scambiato per documentazione;
- desktop, tablet, mobile, reduced-motion e tastiera restano validi;
- P. IVA, privacy, diritti fotografici e licenze sono chiusi;
- un confronto “pack in mano / sito aperto” restituisce la stessa azienda.

---

## Conclusione

La landing attuale ha risolto molto bene un problema di design: come rendere memorabile una varietà di mais attraverso un sistema editoriale rigoroso. Non ha ancora risolto altrettanto bene il problema di brand: come far riconoscere **questa** piccola azienda, **queste** persone, **questi** campi, **questa** filiera e **questi** prodotti.

Il lavoro da fare non consiste nell’abbassare la qualità o nel rendere il sito più rustico per principio. Consiste nel cambiare la gerarchia delle prove:

> prima l’azienda reale, poi l’interpretazione; prima il campo, il pack e le persone, poi la scena; prima ciò che è confermato, poi ciò che è bello raccontare.

Se si mantiene il capitale tecnico e si applica questo principio con un’evoluzione strutturata, il progetto può smettere di sembrare un concept senza perdere ciò che oggi lo rende eccezionale.
