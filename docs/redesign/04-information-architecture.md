# Mais Rosso Co. — Information Architecture & UX Strategy

Data: 5 agosto 2026  
Responsabile: Agente 4 — Information Architecture & UX Strategist  
Stato: proposta pre-implementazione da consolidare nel master plan

## 1. Mandato e criterio di decisione

La nuova landing deve far capire prima **chi è Mais Rosso Co., che cosa coltiva e che cosa offre**, e solo dopo sviluppare l'interpretazione editoriale. La sequenza raccomandata è:

> brand → materia prima → territorio e lavoro → trasformazioni → prodotti → custodia → contatto

La proposta non devia da questa gerarchia. Riduce però sette passaggi narrativi a cinque blocchi di contenuto, più hero e footer, unendo territorio, calendario agricolo e filiera in una sola sezione articolata. La fusione è motivata da tre ragioni:

1. gli stessi asset reali — campi, mani, raccolto e cassette — provano sia il luogo sia il lavoro;
2. separare ogni concetto in un capitolo autonomo riprodurrebbe la lunghezza e l'effetto “registro” già diagnosticati;
3. la filiera diventa più comprensibile quando coltivazione diretta e trasformazioni affidate a partner sono mostrate nello stesso quadro, senza ellissi.

Le fonti che governano questa proposta sono:

- `docs/redesign/02-content-source-of-truth.md`, in particolare §§3–9;
- `docs/brand-audit-materiali-cliente.md`, in particolare §§1.4, 3–8 e 10–12;
- `docs/landing-brand-gap-analysis.md`, in particolare §§1, 4, 8–12;
- la composizione runtime in `src/app/page.tsx`;
- copy e dati in `src/content/site.ts` e `src/content/facts.ts`;
- media registry in `src/content/media.ts`;
- componenti in `src/components/`;
- griglia, ritmo e comportamento responsive in `src/styles/components.css`;
- specifiche di rail, prologo, inversione e reduced motion in `docs/art-direction.md` e `docs/motion-spec.md`.

### 1.1 Vincoli di verità che l'architettura deve rendere strutturali

- `Mais Rosso Co.` è l'unico brand commerciale pubblico.
- La denominazione precedente non entra in header, hero, navigazione, copy, alt text, CTA, footer o moduli futuri.
- Il centro è il **Mais Rosso Ottofile varietà Albese coltivato direttamente** nei campi ai piedi di Cherasco.
- Semina e raccolta sono periodi indicativi: primavera, orientativamente maggio; settembre per il raccolto.
- Ettari, resa e quantità non diventano numeri fissi.
- La disponibilità dipende dall'annata, ma i prodotti non vengono classificati come stagionali.
- La coltivazione è diretta; alcune trasformazioni, inclusa la macinazione, sono conto terzi. Il layout non deve indurre a leggere una filiera interamente interna.
- Il catalogo pubblico iniziale usa solo referenze e campi pubblicabili dal record di verità. La presenza dei Maisotti resta condizionata a conferma binaria.
- La Maisèra 8file è un prodotto fondamentale, non un'appendice né una “novità” minore.
- Nessun prezzo storico, primato, claim salute, dato tecnico mancante o racconto storico incerto viene usato per riempire uno spazio.
- Il percorso primario parla a consumatori consapevoli; il percorso professionale è secondario.

## 2. Diagnosi architetturale della landing corrente

La pagina attuale è composta da hero, otto schede e footer (`src/app/page.tsx:19-43`). Il visitatore attraversa varietà, racconto regale, morfologia, conservazione, campo, macinazione, prodotti e custodia prima di arrivare alla conversione. Il sistema è formalmente coerente, ma produce quattro effetti UX non più accettabili:

1. **L'oggetto editoriale precede l'azienda.** Nel primo viewport si capisce il soggetto “Mais Rosso Ottofile”, ma non si vede il brand attuale, il pack o una prova documentaria forte (`src/components/Hero.tsx`, `src/content/site.ts:44-66`).
2. **Il catalogo arriva troppo tardi.** Sul desktop osservato nel gap audit compare dopo circa 11.000 px; su mobile dopo circa 7.200 px. Il contatto arriva ancora più tardi.
3. **La pagina assegna una sezione intera a fatti deboli e spezza fatti forti.** Il racconto regale e il registro 2007 ricevono spazio monumentale, mentre campo reale, calendario agricolo, persone, packaging e trasformazioni effettive non hanno uno spazio adeguato.
4. **La navigazione dipende dal concept.** `RigaOttava` richiede otto capitoli e 64 chicchi (`src/components/RigaOttava.tsx`); `ExperienceMotion` e il climax finale dipendono dallo stesso conteggio. Il modello rende costoso correggere l'ordine dei contenuti.

La nuova IA deve quindi mantenere qualità tecnica e ritmo, ma eliminare la dipendenza tra verità del brand e numero dei capitoli.

## 3. Nuova sitemap della landing

### 3.1 Navigazione globale

Header compatto, inizialmente sovrapposto o adiacente alla hero e poi sticky se la verifica visuale dimostra che non copre il contenuto.

Voci principali:

1. **Il mais** → `#il-mais`
2. **Dal campo** → `#dal-campo`
3. **Prodotti** → `#prodotti`
4. **Contatti** → `#contatti`

CTA persistente: **Verifica disponibilità** → `#contatti`.

Il link per professionisti non entra nella navigazione primaria; compare nel blocco contatti come percorso secondario. “Storia”, “registro”, racconto regale e metacopy sull'otto non sono voci di navigazione.

### 3.2 Ordine dei blocchi

| Ordine | ID | Blocco | Funzione |
|---:|---|---|---|
| 0 | — | Header | Identificare subito il brand e dare accesso a prodotti/contatto |
| 1 | `#inizio` | Hero — brand, mais e prova reale | Dire chi coltiva cosa e dove; mostrare subito una fotografia reale |
| 2 | `#il-mais` | Materia prima — Ottofile Albese | Rendere riconoscibili pannocchia, chicco, colore e otto file |
| 3 | `#dal-campo` | Campo, annata e trasformazioni | Mostrare territorio/lavoro e spiegare con onestà responsabilità dirette e partner |
| 4 | `#prodotti` | Gamma attuale | Presentare referenze sullo stesso livello, con packaging e CTA utili |
| 5 | `#custodia` | Custodia concreta | Collegare continuità della coltivazione, annata e scelta del prodotto senza monumentalizzare |
| 6 | `#contatti` | Disponibilità, contatti e footer | Convertire il consumatore; offrire un percorso professionale subordinato; chiudere legalmente |

Il conteggio dei blocchi non deve essere comunicato al visitatore e non deve entrare nei dati. Se un futuro aggiornamento unisce o divide una sezione, la firma del brand non deve cambiare.

## 4. Primo viewport e soglie di prova

### 4.1 Cosa deve apparire senza scroll o con uno scroll minimo

Nel primo viewport devono convivere:

- il nome `Mais Rosso Co.` come elemento dominante o immediatamente leggibile;
- il riferimento completo al Mais Rosso Ottofile varietà Albese;
- la localizzazione prudente “campi ai piedi di Cherasco”;
- una fotografia reale di campo, pannocchie o raccolto, non una piastra generata;
- il segno di marca approvato: logo recente o doppia pannocchia, nella variante con gerarchia già ripulita;
- CTA primaria **Scopri i prodotti**;
- CTA secondaria **Verifica disponibilità**.

Il logo non sostituisce il nome in testo. Se il master definitivo non è ancora disponibile, la hero usa temporaneamente un wordmark testuale accessibile e non ricostruisce il marchio per approssimazione.

### 4.2 Entro quando devono comparire le prove reali

| Prova | Soglia massima consigliata |
|---|---|
| Fotografia reale di campo/pannocchia | Primo viewport |
| Doppia pannocchia o segno ufficiale | Primo viewport |
| Chicchi/farina reali | Entro il secondo blocco |
| Gesto agricolo, raccolto o cassette | Entro il terzo blocco |
| Packaging reale o anticipazione della gamma | Entro 1,5–2 viewport |
| Catalogo completo | Entro il 45% della lunghezza della pagina |
| CTA di disponibilità | Primo viewport e blocco prodotti |
| Contatto azionabile | Header e blocco finale; mai solo nel footer legale |

La hero non deve eleggere un singolo prodotto a protagonista. Se mostra packaging, usa una composizione di gamma o più elementi con peso equivalente. La materia prima può essere protagonista perché unifica l'intero catalogo; una singola SKU no.

## 5. Specifica dei blocchi

## 5.1 Header

### Funzione

Identità, orientamento e scorciatoia commerciale.

### Contenuto richiesto

- logo/wordmark Mais Rosso Co.;
- quattro anchor link;
- CTA “Verifica disponibilità”.

Il riferimento legale non appare in testata. “Cherasco” non è presentato come sede: la sua funzione territoriale viene spiegata nella hero e nel blocco campo.

### Componenti esistenti riutilizzabili

- struttura semantica e ingombro di `src/components/Header.tsx`;
- skip link già presente in `src/app/page.tsx`;
- focus state, target minimi e link styling esistenti.

### Modifica necessaria

`Header` passa da tre elementi testuali a lockup di marca, nav e CTA. Non deve dipendere da `company.name` nel modello attuale finché il nuovo record non filtra i soli fatti pubblici.

### Mobile

Wordmark e pulsante menu rimangono sempre disponibili. Il menu apre una lista lineare di anchor e chiude dopo la selezione; niente rail fisso, tooltip o navigazione a micro-segni. La CTA di disponibilità resta nel menu e ricompare nella hero.

## 5.2 Hero — brand, materia e prova

### Funzione

Rispondere in pochi secondi a tre domande: chi siete, che cosa coltivate, perché questo mais è riconoscibile.

### Contenuto richiesto

- H1: `Mais Rosso Co.`;
- proposizione: coltivazione diretta del Mais Rosso Ottofile varietà Albese nei campi ai piedi di Cherasco;
- micro-dato opzionale: “semina in primavera · raccolta a settembre”, solo se non sovraccarica;
- CTA “Scopri i prodotti” e “Verifica disponibilità”.

L'H1 non deve essere “Mais Rosso Ottofile Integrale”: “integrale” è corretto per alcune lavorazioni, non come qualificatore universale del brand o della birra.

### Asset richiesto

Una fotografia reale orizzontale con pannocchie/campo/raccolto e spazio per il testo. Alternative provvisorie già individuate nell'audit: `Materiale fotografico/IMG_6426.JPG`, `IMG_6427.JPG` o una fotografia documentaria di campo. La scelta esatta e il crop spettano al piano media. L'immagine deve restare riconoscibile come fotografia e non essere desaturata fino a sembrare una piastra.

### Componenti esistenti riutilizzabili

- landmark e H1 di `src/components/Hero.tsx`;
- `next/image` con dimensioni esplicite via un'evoluzione di `Piastra`;
- fallback statico e rispetto delle preferenze di movimento.

### Cosa non resta

- metadato “registro / 8 schede”;
- hero come copertina museale;
- prologo WebGL come soggetto visivo principale;
- titolo costruito per il clipping del viewport.

### Mobile

Il testo precede l'immagine nell'ordine DOM. Immagine e parte della materia devono comunque essere visibili nello stesso viewport o entro il primo gesto di scroll. Nessun testo viene sovrapposto a una zona fotografica con contrasto instabile.

## 5.3 Materia prima — Ottofile Albese

### Funzione

Far riconoscere fisicamente la varietà e spiegare l'otto senza raccontare il design del sito.

### Contenuto richiesto

- nome della materia prima;
- chicco vitreo rosso, tra arancio bruciato e bordeaux;
- pannocchia tipicamente disposta su otto file;
- antico mais piemontese riportato in coltivazione dopo la diffusione degli ibridi ad alta resa;
- collegamento visivo chicco → farina, senza anticipare una falsa composizione di gamma.

### Asset richiesti

- dettaglio reale di pannocchia/chicchi: candidati `IMG_6378.JPG`, `IMG_6379.JPG`;
- rapporto chicco/farina: candidati `IMG_6380.JPG`, `IMG_6383.JPG`, `IMG_6391.JPG`;
- doppia pannocchia illustrata come elemento di marca, non come prova fotografica.

### Firma “otto”

Una sola evidenza numerica forte: otto chicchi/segni o una sezione morfologica accompagnata dal numero 8. Non si spiega più che il numero governa colonne, capitoli o motion. La firma deve aiutare a ricordare la varietà, non il portfolio.

### Componenti esistenti riutilizzabili

- `RegistroDati` per 3–4 coppie termine/valore;
- struttura a due assi di `Scheda`, liberata da etichetta `Scheda NN/08`;
- parte tipografica di `EightRowsChapter`, senza metacopy e senza dipendenza dal rail.

### CTA

Nessuna CTA commerciale primaria. Link discreto “Vedi cosa ne nasce” → `#prodotti`.

### Mobile

Foto prima dei dati secondari. Il numero 8 non deve diventare un display alto un'intera schermata. Dati in `<dl>`, massimo quattro righe.

## 5.4 Campo, annata e trasformazioni

### Funzione

Portare insieme geografia, lavoro e filiera, rendendo immediatamente distinguibile ciò che Mais Rosso Co. fa direttamente da ciò che affida a competenze esterne.

### Struttura interna

Il blocco ha due sottosezioni consecutive, non due capitoli autonomi.

#### A. Ai piedi di Cherasco

Contenuto:

- campi ai piedi/alle pendici di Cherasco;
- semina in primavera, indicativamente a maggio;
- raccolta indicativamente a settembre;
- quantità e disponibilità legate all'andamento dell'annata.

Asset:

- campo reale in una fase leggibile;
- raccolto/cassette;
- mani o gesto di lavoro, senza attribuire identità non confermate.

#### B. Dal campo alle trasformazioni

La filiera deve essere leggibile come quattro responsabilità, non come una freccia che suggerisce un solo luogo:

| Passaggio | Attribuzione pubblica |
|---|---|
| Coltiviamo | Mais Rosso Co. coltiva direttamente il proprio Ottofile |
| Selezioniamo | Mais Rosso Co. seleziona la materia prima |
| Trasformiamo con competenze dedicate | Quando necessario intervengono partner specializzati; la macinazione a pietra è conto terzi |
| Seguiamo | Mais Rosso Co. segue qualità, ricette e prodotto finale |

Il nome e la località dei partner non compaiono nel racconto editoriale, salvo obblighi normativi. La struttura vieta di comprimere i quattro passaggi nella formula “dalla semina alla bottiglia”, che cambierebbe il senso.

### Asset richiesti

- campo: selezione finale dal piano fotografico; candidati documentari `TRUS5087.JPG`, `LIAI9634.JPG`, `MBMU3083.JPG`, `UNDG2504.JPG`, `UYIO1755.JPG`;
- raccolto: `IMG_5091.JPG`, `IMG_5092.JPG`, `IMG_5097.JPG`–`IMG_5099.JPG`, `IMG_5118.JPG`;
- lavorazione reale `UBCW8681.JPG`, solo dopo conferma di cosa mostra;
- in assenza di una prova corretta della macinazione, usare chicco/farina reali e dichiarare il fatto nel testo senza simulare il mulino.

### Componenti esistenti riutilizzabili

- `RegistroDati` per calendario e responsabilità;
- schema “stati” di `StoneChapter`, trasformato da “Chicco/Farina” in una sequenza accessibile di responsabilità;
- media registry centralizzato;
- griglia responsive di `FieldChapter`.

### CTA

Link secondario “Scopri i prodotti” → `#prodotti`.

### Mobile

Ordine DOM: titolo → foto campo → calendario → foto lavoro/raccolto → filiera. Le quattro responsabilità diventano una lista verticale; nessuna freccia orizzontale obbliga scrolling laterale.

## 5.5 Prodotti

### Funzione

Rendere concreta la gamma, mostrare il packaging e trasformare interesse in richiesta di disponibilità.

### Gerarchia

Tutte le referenze pubblicabili hanno:

- identico formato di card/scheda;
- stessa area immagine;
- stessa scala del nome;
- stessi campi base;
- CTA dello stesso peso;
- nessun badge “eroe”, “novità”, “premium” o “stagionale”.

La Maisèra deve apparire nel primo gruppo visibile del catalogo su desktop e non oltre la seconda scheda su mobile. Questa è una correzione di visibilità, non una gerarchia commerciale. L'ordine iniziale raccomandato è:

1. Farina di Mais Rosso Ottofile;
2. La Maisèra 8file;
3. Maisette;
4. Maissini;
5. Maisotti, esclusivamente se lo stato viene confermato attivo.

L'ordine affianca subito la trasformazione più diretta e quella più articolata, mostrando l'ampiezza della gamma senza eleggere una SKU. Se il cliente approva un ordine commerciale diverso, il rendering resta data-driven.

### Campi base per scheda

1. fotografia reale del pack o del prodotto;
2. nome;
3. definizione precisa del legame con il mais;
4. formato, solo se pubblico nel record;
5. una caratteristica o uso concreto approvato;
6. eventuale allergene essenziale se necessario a evitare una lettura errata;
7. CTA “Verifica disponibilità — [prodotto]”.

Campi assenti non generano trattini, badge “in arrivo” o descrizioni inventate. Prezzo, e-commerce, spedizione e disponibilità di stock non sono campi obbligatori del layout.

### Regole specifiche La Maisèra

- nome, 33 cl, 7% vol. e stile derivano dall'etichetta recente;
- il Mais Rosso Ottofile aziendale è ingrediente caratterizzante, non unico ingrediente;
- la scheda può parlare di partner specializzato senza farne il protagonista;
- nessun IBU, formato 75 cl o percentuale di mais finché non confermati;
- visualmente non deve assumere codici da birreria americana né una card più scura delle altre.

### Asset richiesti

Packshot fronte o fotografia reale per ogni referenza. Se gli originali individuali non esistono, è preferibile mostrare materia/prodotto reale con pack leggibile a un mockup costruito. Per La Maisèra serve la bottiglia/etichetta più recente; la foto di etichetta a bassa risoluzione è prova dati, non hero definitiva.

### Componenti esistenti riutilizzabili

- mapping data-driven di `ProductsChapter` e `referenze`;
- `<ol>`, `<dl>` e mailto specifici già presenti;
- capacità delle `specs` di omettere campi;
- comportamento one-column mobile.

### Refactoring necessario

- da righe testuali senza immagine a griglia/lista visuale con media per referenza;
- da stato record globale a fatti pubblicabili per singolo campo;
- rimozione della matrice 01–08 ripetuta sopra il catalogo;
- rimozione di prezzi storici e totale rigido;
- CTA rinominata “Verifica disponibilità”, coerente col canale non ancora definito.

### Mobile

Una sola colonna, nessun carosello. L'immagine precede nome e dati nell'ordine DOM. Le schede non hanno altezza forzatamente uniforme: l'uguaglianza deriva da trattamento e priorità, non da spazi vuoti.

## 5.6 Custodia concreta

### Funzione

Chiudere il racconto agricolo senza negare il catalogo e senza trasformare la custodia in una scena museale.

### Contenuto richiesto

- una varietà resta viva perché torna in campo;
- semina e raccolta seguono l'annata;
- la disponibilità segue ciò che il campo produce;
- scegliere i prodotti significa sostenere la continuità della coltivazione, formulato senza promessa ambientale assoluta.

Il blocco non usa registro 2007, rischio di estinzione come classifica, mito regale, “questo non è un catalogo”, semina in purezza, raccolta a mano o essiccazione al sole finché non confermati.

### Asset richiesto

Una fotografia reale del raccolto, delle cassette o delle mani con pannocchie. Il visual deve chiudere il percorso mostrando materia che esiste, non un marchio isolato o un'illustrazione atmosferica.

### Inversione

Conservare l'idea di una variazione cromatica finale, ma ridurla a questo blocco e ai contatti. Non usare un pin, non imporre 240svh e non ritardare la conversione fino al completamento di 64 soglie. Colore e contrasto saranno definiti dall'Agente 5 sulla palette del packaging; l'IA vieta il ritorno automatico a nero/oro.

### CTA

“Verifica disponibilità” → `#contatti`.

### Componenti esistenti riutilizzabili

- logica di cambio campo e fallback reduced-motion di `ExperienceMotion`;
- struttura di chiusa di `CustodyChapter`;
- registration marks solo se coerenti col nuovo sistema visuale.

### Mobile

Altezza guidata dal contenuto, indicativamente 0,8–1,2 viewport. Il cambio cromatico è già presente al caricamento se la sezione è raggiunta con deep link; con reduced motion è istantaneo.

## 5.7 Contatti, disponibilità e footer

### Funzione

Consentire al visitatore di agire senza promettere un canale commerciale non confermato.

### Contenuto richiesto

- titolo: direzione “Chiedi informazioni e disponibilità”;
- CTA primaria con mailto precompilato;
- telefono ed email solo dopo conferma come canali pubblici;
- una frase su cosa indicare nella richiesta: prodotto e quantità di interesse;
- percorso secondario “Sei un professionista?” con contatto dedicato nello stesso canale, non una sezione B2B dominante;
- Instagram solo dopo verifica dell'handle;
- soggetto legale, indirizzo, P. IVA e privacy solo quando confermati.

La landing non dichiara né che esiste uno shop né che non esiste. Non promette fiere, rivenditori, spedizioni, campioni, listini, tempi di risposta o modalità di ritiro finché non documentati.

### Componenti esistenti riutilizzabili

- `ContactFooter` come landmark e struttura semantica;
- mailto precompilato;
- liste di canali;
- target minimi, focus e address/footer legale.

### Riduzione consigliata

Eliminare il percorso a tre passi se ripete la CTA; eliminare il blocco fiere finché non confermato; separare visivamente consumatore e professionista senza creare due landing. Il contatto primario deve essere comprensibile in una schermata desktop e in circa 1,5 schermate mobile, esclusi i dati legali.

## 6. Sistema a otto: cosa resta e cosa cambia

### 6.1 Da conservare

- l'otto come fatto morfologico e mnemonico;
- una sola sequenza di otto segni/chicchi nel blocco materia;
- il numero 8 come accento tipografico controllato;
- eventuali proporzioni o micro-dettagli derivati dall'otto, se non diventano una regola autoreferenziale;
- semantica e accessibilità della navigazione ad anchor;
- motion deterministica e reversibile dove viene ancora usata.

### 6.2 Da abbandonare

- obbligo di otto capitoli;
- 64 chicchi come progresso dell'intero documento;
- copy “Scheda NN/08”;
- matrice 01–08 nel catalogo;
- metacopy su colonne, pagina e registro;
- l'idea che misure, durate e struttura debbano essere multipli di otto per essere coerenti col brand.

Il brand resta riconoscibile perché l'otto è collegato alla pannocchia reale, non perché l'utente deve contare il layout.

## 7. Rail, prologo e inversione: decisioni UX

### 7.1 Rail

**Decisione: mantenere il principio di indice, non la forma a 64 chicchi.**

Desktop:

- indice laterale o superiore compatto con i quattro anchor principali;
- stato corrente leggibile tramite testo o segno, non solo colore;
- nessun conteggio `00/08`;
- il componente può riusare osservazione dello scroll e focus management di `RigaOttava`/`ExperienceMotion`.

Tablet/mobile:

- il rail fisso viene rimosso;
- la navigazione vive nell'header e conserva skip link/deep link;
- si recuperano 40–48 px di larghezza e si evita che micro-segni occupino oltre il 10% del viewport mobile.

### 7.2 Prologo

**Decisione: il prologo non definisce più la narrazione della pagina.**

Il renderer attuale racconta dispersione → pannocchia → pianta → campo → registro e resta tecnicamente valido, ma continua a privilegiare l'interpretazione concettuale. La raccomandazione è:

- rimuoverlo dalla sequenza Hero→terzo capitolo;
- mantenere codice e fallback disponibili durante il primo passaggio di implementazione, senza renderli pubblici;
- valutare dopo il nuovo visual system un riuso molto breve e astratto nella sola hero, subordinato alla fotografia e al marchio reale;
- non simulare campo, processo o pannocchia ufficiale con geometria procedurale.

Se il coordinatore decide di mantenerne una traccia, deve terminare entro la hero, essere `aria-hidden`, non aggiungere altezza, non competere con l'immagine reale e offrire la stessa informazione con motion ridotta o assente. Non è un requisito di accettazione della nuova IA.

### 7.3 Inversione finale

**Decisione: mantenere la variazione, rimuovere la performance.**

- semanticamente coincide con `#custodia` e continua nei contatti;
- non dipende da kernel 64 o conteggio sezioni;
- non usa pin o tratto di scroll artificiale;
- adotta palette approvata dal packaging;
- con reduced motion cambia stato senza interpolazione;
- con JavaScript disabilitato la sezione conserva già il proprio sfondo e contrasto corretti.

## 8. Riduzione della lunghezza e del carico cognitivo

La landing osservata misura circa 20.933 px a 1440×1000 e 15.965 px a 390×844. La nuova IA non deve inseguire un'altezza identica per tutti i contenuti, ma deve dimezzare il tratto che precede il catalogo e ridurre i vuoti non informativi.

### Obiettivi indicativi

| Misura | Attuale | Target IA |
|---|---:|---:|
| Blocchi narrativi numerati | 8 | 4 anchor principali, 5 blocchi contenuto |
| Catalogo | dopo circa 52% desktop | entro 35–45% |
| Prima foto reale | attenuata nel capitolo 01 | hero |
| Primo packaging | capitolo prodotti | hero/bordo hero o entro 2 viewport |
| Contatto azionabile | header + fondo molto distante | header, hero e prodotti |
| Altezza desktop 1440×1000 | ~20.933 px | indicativamente 9.000–12.000 px |
| Altezza mobile 390×844 | ~15.965 px | indicativamente 9.000–11.500 px |

I target sono guardrail, non min-height da codificare. La presenza condizionata di Maisotti può modificare la lunghezza del catalogo senza richiedere una nuova composizione.

### Regole di compressione

- nessuna sezione ordinaria usa `min-height` superiore a `120svh`;
- hero tra `80svh` e `110svh`, in funzione dell'immagine e dell'header;
- niente 168–240svh per esprimere un singolo fatto;
- massimo un momento di pausa ampia, nel passaggio custodia/contatti;
- corpo e dati restano affiancati su desktop quando migliora la scansione;
- su mobile i dati seguono immediatamente l'immagine o il testo cui appartengono;
- nessun blocco viene allungato per pareggiare il numero di prodotti o sostenere una coreografia.

## 9. Strategia di conversione per il target 25–60

### 9.1 Percorso primario — consumatore consapevole

1. riconosce brand e materia in hero;
2. vede una prova reale e comprende il luogo;
3. capisce cosa viene fatto direttamente e cosa tramite partner;
4. confronta i prodotti senza linguaggio tecnico eccessivo;
5. verifica disponibilità con un contatto diretto.

La CTA primaria non è “Acquista ora”, perché modalità di acquisto ed e-commerce non sono confermati. “Verifica disponibilità” è concreta, non aggressiva e compatibile con annate variabili.

### 9.2 Percorso secondario — professionisti

Nel blocco contatti compare un modulo testuale breve:

> Per ristorazione, gastronomie e negozi: indica attività, referenze e quantità di interesse.

La formula non promette campioni, listino, minimi o distribuzione. Il percorso usa un mailto con oggetto distinto, ma non cambia il tono dell'intera pagina.

### 9.3 Accessibilità cognitiva

- frasi brevi e dati leggibili senza lessico da registro amministrativo;
- nessuna informazione affidata soltanto a hover, motion o icona;
- ingredienti/allergeni sono separati dal racconto sensoriale;
- etichette “formato”, “contiene”, “coltivato da”, “trasformazione” sono esplicite;
- CTA ripetute con la stessa formulazione per evitare ambiguità.

## 10. Mappa di riuso dei componenti

| Componente/file attuale | Decisione | Nuovo ruolo |
|---|---|---|
| `src/app/page.tsx` | Rifattorizzare | Nuovo ordine dei blocchi e anchor |
| `src/components/Header.tsx` | Preservare e ampliare | Brand lockup, nav, CTA |
| `src/components/Hero.tsx` | Rifattorizzare | H1 brand, proposizione, foto reale, due CTA |
| `src/components/Scheda.tsx` | Preservare il guscio | Section shell per materia, senza conteggio schede |
| `src/components/RegistroDati.tsx` | Preservare | Dati morfologici, calendario e responsabilità |
| `src/components/Piastra.tsx` | Preservare e generalizzare | Media reale con provenienza, crop e caption; non solo lastra/reperto |
| `src/components/Chapters.tsx` | Scomporre | Nuovi blocchi Materia, Campo/Filiera, Prodotti, Custodia |
| `ProductsChapter` | Preservare il motore dati, rifare la presentazione | Schede prodotto visuali e paritarie |
| `src/components/ContactFooter.tsx` | Preservare e accorciare | Contatto consumatore, percorso professionale secondario, legale |
| `src/components/RigaOttava.tsx` | Rifattorizzare profondamente | Eventuale indice desktop testuale; rimosso su mobile |
| `src/components/ExperienceMotion.tsx` | Preservare infrastruttura, riscrivere mapping | Reveal discreti, stato sezione, inversione senza pin |
| `KernelPrologue` / `ImprontaTransition` | Non renderizzare nel primo passaggio | Codice preservato per valutazione successiva, non narratore pubblico |
| `src/content/facts.ts` | Migrare secondo il record di verità | Fatti per campo con stato e pubblicabilità |
| `src/content/site.ts` | Riscrivere dopo Agente 6 | Copy dei nuovi blocchi e CTA |
| `src/content/media.ts` | Preservare il registry, sostituire il contenuto | Foto reali prioritarie e asset di pack |

Il riuso non obbliga a conservare classi CSS, commenti o nomi legati al vecchio concept. Significa preservare semantica, data flow, fallback, accessibilità e componenti robusti.

## 11. Comportamento responsive complessivo

### Desktop

- griglia editoriale asimmetrica, ma non obbligatoriamente a otto colonne;
- hero testo/foto in rapporto equilibrato;
- materia e campo alternano immagine e contenuto senza mosaici decorativi;
- prodotti in due colonne paritarie, con La Maisèra nel primo gruppo visibile;
- indice compatto opzionale, mai dominante;
- custodia e contatti nello stesso campo cromatico finale.

### Tablet

- griglia a due aree quando la misura del testo resta leggibile;
- dati scendono sotto il copy prima di comprimere le colonne;
- catalogo a due colonne solo se pack e nomi restano leggibili, altrimenti una colonna;
- nessun rail fisso.

### Mobile

- ordine lineare rispettoso dell'ordine DOM;
- header compatto con menu e CTA;
- nessuna immagine bleeding fuori viewport;
- nessun carosello prodotto;
- ogni target almeno 44×44 px dove possibile, mai sotto il floor tecnico esistente;
- immagini con aspect ratio stabilito e `sizes` corretti;
- niente testo minuto verticale o tooltip touch;
- custodia content-driven e contatti entro circa 1,5 schermate prima del legale.

### Reduced motion, no-JS e deep link

- tutte le immagini e i contenuti essenziali sono presenti nel markup server;
- reveal non nascondono il first paint;
- l'inversione finale ha uno stato CSS corretto senza JavaScript;
- un deep link a `#prodotti` o `#contatti` non dipende da una timeline precedente;
- nessun dato o CTA compare soltanto dopo un'animazione;
- la rimozione del prologo non deve ridurre la comprensione della pagina.

## 12. Dipendenze e contenuti condizionati

### Necessari per il go-live, non per costruire l'IA

- conferma dello stato Maisotti;
- contatti pubblici aggiornati;
- dati legali e privacy;
- schede/etichette finali di Farina, Maisette e Maissini;
- modalità reale di acquisto;
- master logo senza elementi della denominazione precedente;
- packshot correnti.

### Omissibili senza placeholder pubblico

- formato La Maisèra 75 cl;
- IBU e percentuale di mais;
- prezzi;
- nomi dei partner;
- tempi di cottura;
- metodo agricolo non ancora documentato in modo sufficiente;
- racconto regale, registro 2007 e primati;
- volto/nome di una persona se foto, ruolo e autorizzazione non sono confermati.

Il layout deve collassare questi campi senza lasciare righe vuote. Le lacune restano visibili nel record interno, non vengono esposte al visitatore come “coming soon”.

## 13. Criteri di accettazione dell'IA

La nuova architettura è approvabile se:

1. nel primo viewport sono chiari brand, Mais Rosso Ottofile e campi ai piedi di Cherasco;
2. una fotografia reale compare nel primo viewport;
3. il catalogo è raggiungibile dalla hero e compare entro il 45% della pagina;
4. La Maisèra riceve la stessa struttura e visibilità delle altre referenze;
5. nessun prodotto domina per dimensione, colore, card o CTA;
6. coltivazione diretta e trasformazioni esterne sono distinguibili senza nominare i partner;
7. l'otto resta memorabile, ma la pagina può cambiare numero di sezioni;
8. il rail non sottrae larghezza al mobile;
9. prologo e motion non sono necessari a comprendere brand, filiera o catalogo;
10. la variazione cromatica finale non ritarda il contatto;
11. il percorso consumer è primario e quello professionale secondario;
12. dati mancanti possono essere omessi senza card rotte o copy inventato;
13. la pagina è sensibilmente più corta senza diventare una landing generica;
14. il confronto tra packaging e sito restituisce lo stesso brand;
15. denominazione precedente e referenze escluse non vengono propagate.

## 14. Handoff agli agenti successivi

### Per l'Agente 5 — Visual System & Art Direction

- definire la griglia digitale senza ripristinare l'obbligo delle otto colonne;
- determinare la palette dell'inversione finale dai materiali reali;
- specificare il rapporto foto/logo/doppia pannocchia in hero;
- progettare una card prodotto paritaria che tolleri campi assenti;
- evitare che il nuovo indice desktop torni a dominare la pagina;
- decidere trattamento e crop degli asset selezionati dall'Agente 3.

### Per l'Agente 6 — Copy & Conversion

- scrivere hero, materia, campo/filiera, catalogo, custodia e contatti su questa struttura;
- mantenere “Verifica disponibilità” come CTA finché il canale commerciale non è definito;
- distinguere chiaramente coltivazione, selezione, trasformazione e responsabilità finale;
- non introdurre metacopy sul design;
- preparare il mailto consumer e quello professionale senza promesse non confermate.

### Per l'Agente 7 — Implementation Planner

- pianificare la migrazione da otto capitoli ai nuovi anchor senza lasciare test morti;
- separare l'infrastruttura motion dai vincoli `data-scheda`, 64 kernel e pin finale;
- preservare i fallback e il comportamento server-rendered;
- prevedere un rollback che possa riattivare la pagina corrente senza ripristinare contenuti pubblici vietati.

## 15. Decisione conclusiva

La landing non deve essere ridotta a una pagina prodotto né espansa in un racconto agricolo generico. La struttura consigliata conserva il ritmo editoriale, la precisione dei dati, il catalogo data-driven e una chiusa memorabile, ma sposta l'autorità su fotografie, materia, campo, packaging e responsabilità reali.

La differenza sostanziale è questa:

> l'otto non decide più quante sezioni servono; il brand e le prove decidono che cosa il visitatore deve vedere.
