# Mais Rosso Co. — Redesign master plan

## 0. Stato del documento

Questo documento consolida e approva gli output dei sette workstream di analisi:

1. `01-brand-identity-extraction.md`;
2. `02-content-source-of-truth.md`;
3. `03-photography-media-plan.md`;
4. `04-information-architecture.md`;
5. `05-visual-system-art-direction.md`;
6. `06-copy-conversion.md`;
7. `07-implementation-plan.md`.

Il coordinatore ha letto integralmente gli output, risolto i conflitti e verificato il gate. Il piano autorizza l'implementazione controllata, ma non equivale a un'autorizzazione al go-live: logo definitivo, packshot, dati legali, privacy e recapito pubblico devono ancora essere chiusi con il cliente.

I report di audit precedenti restano documenti storici e non vengono riscritti retroattivamente. Nei nuovi file operativi la denominazione precedente non viene propagata.

## 1. Decisione strategica

La direzione approvata è **evoluzione strutturata**, non restyling cosmetico e non ricostruzione totale.

Il progetto conserva il proprio motore tecnico — rendering server, accessibilità, responsive, semantica, registry media, catalogo data-driven, fallback e controlli motion — ma sostituisce il contratto editoriale che oggi fa prevalere il concept sulla realtà dell'azienda.

La gerarchia vincolante diventa:

> brand reale → materia prima → territorio e lavoro → trasformazioni → prodotti → custodia → acquisto o contatto

La direzione visiva è **agricolo contemporaneo**: materia autentica, fotografia reale, packaging, ordine editoriale e grafica riconoscibile. Non deve risultare rustica convenzionale, luxury generica, museale, da cantina, da birrificio americano o da e-commerce standard.

## 2. Decisioni definitive

### 2.1 Brand pubblico

- `Mais Rosso Co.` è l'unico nome commerciale pubblico.
- Il nome precedente viene rimosso da UI, metadata, manifest, icone, alt, CTA, dati strutturati, contatti, social e asset runtime.
- Il vecchio albero non viene usato come marchio, icona o decorazione.
- Il soggetto legale può apparire soltanto nel footer o nei documenti obbligatori, con gerarchia subordinata.
- Package slug e README vengono aggiornati senza alterare i report storici.

### 2.2 Logo e simboli

- Il sigillo circolare presente nei materiali non è pubblicabile perché incorpora elementi e diciture non approvati.
- In P0 il marchio è un wordmark tipografico `Mais Rosso Co.` in League Spartan.
- Per favicon e apple icon è approvato un segno temporaneo testuale `MR`, privo di pretese di logo ufficiale.
- La doppia pannocchia può essere usata come illustrazione editoriale soltanto quando disponibile in qualità adeguata e senza trasformarla nel logo definitivo.
- Il go-live con marchio definitivo resta condizionato alla consegna di un master pulito o all'approvazione esplicita del wordmark P0.

### 2.3 Catalogo pubblico

Il catalogo P0 contiene quattro prodotti sullo stesso livello:

1. Farina di Mais Rosso Ottofile;
2. La Maisèra;
3. Maisette;
4. Maissini.

Regole:

- nessun prodotto eroe;
- La Maisèra compare entro la seconda card su mobile e nel primo gruppo desktop;
- nessun prezzo finché non è confermato come corrente;
- nessun totale fisso di prodotti nel copy;
- nessun badge stagionale;
- Maisotti restano nel record come stato contraddittorio e non vengono renderizzati;
- Amaro del Dottore è escluso da dati pubblici, navigazione, UI, metadata, placeholder e suggerimenti futuri.

### 2.4 La Maisèra

Sono pubblicabili:

- formato `33 cl`;
- gradazione `7% vol.`;
- stile `Bière de Garde / Farmhouse`;
- ingredienti: acqua, malto d'orzo, farina integrale di Mais Rosso Ottofile, luppolo e lievito;
- indicazione dei cereali contenenti glutine;
- ruolo del mais aziendale come ingrediente caratterizzante.

Non sono pubblicabili senza nuova fonte:

- formato `0,75 L`;
- IBU;
- percentuale di mais;
- affermazioni di produzione interna.

La comunicazione non mette in primo piano il produttore terzo, ma non nasconde il ricorso a partner specializzati.

### 2.5 Territorio e calendario agricolo

Formulazioni approvate:

- campi ai piedi di Cherasco;
- semina in primavera, indicativamente a maggio;
- raccolta a settembre;
- disponibilità legata all'andamento dell'annata.

Sono esclusi ettari fissi, quantità produttive fisse e promesse rigide di disponibilità.

### 2.6 Filiera

Il racconto deve distinguere chiaramente:

- coltivazione diretta del Mais Rosso Ottofile varietà Albese;
- selezione della materia prima;
- controllo di qualità, ricette e prodotto finale;
- trasformazioni affidate, quando necessario, a partner specializzati.

Per la farina è approvata la formula `macinata a pietra`. Non si specificano pietra, mulino, località o partner senza necessità normativa o decisione successiva.

Sono vietati claim di filiera interamente interna, assenza di intermediari o produzione integralmente nei laboratori aziendali.

### 2.7 Target e conversione

- Il pubblico primario è il consumatore consapevole tra circa 25 e 60 anni, curioso, attento a origine e ingredienti.
- Professionisti e rivenditori hanno un percorso secondario, non dominano la voce del sito.
- La CTA primaria è `Scopri i prodotti`.
- La CTA commerciale è `Verifica disponibilità`, senza promettere stock, spedizione o tempi di risposta.
- Durante lo sviluppo si può usare `giordano.matteo@outlook.com` come recapito documentato più recente, insieme a telefono e Instagram già censiti; tutti i recapiti sono comunque soggetti a conferma pre-go-live.
- Vecchio dominio, vecchia email, vecchio handle Facebook e vecchia privacy URL non vengono riutilizzati.

## 3. Punti ancora non risolvibili

### 3.1 Non bloccano l'implementazione

- IBU, percentuale di mais e formato 0,75 L della birra;
- nome e località dei trasformatori;
- quantità e superficie annuale;
- metodo agricolo non formalmente validato;
- tempi di cottura o dettagli ricetta non confermati;
- presenza di volti identificabili;
- stato definitivo di Maisotti, che resta omesso;
- prezzi correnti, che restano omessi.

### 3.2 Bloccano il go-live, non lo sviluppo

- approvazione del wordmark P0 o consegna del logo pulito;
- conferma di almeno un canale consumer pubblico;
- ragione sociale completa, P. IVA, sede legale e testo privacy necessari;
- dominio e canonical definitivi;
- packshot correnti o approvazione delle card P0 senza pack completo;
- conferma esplicita dell'omissione di Maisotti;
- registro finale dei diritti fotografici, già autorizzati in linea generale dal cliente.

## 4. Brand system approvato

### 4.1 Palette

Colori estratti dai materiali cliente:

| Token | Valore | Ruolo principale |
|---|---:|---|
| `--color-coral` | `#F5915E` | campo caldo, sezioni identitarie |
| `--color-cream` | `#F1DFBF` | superfici, card e sfondi chiari |
| `--color-petrol` | `#16607D` | testo, CTA, chiusura e contrasto |
| `--color-kernel-red` | `#C32F24` | accento controllato |
| `--color-bordeaux` | `#5B1208` | testo/scuro caldo secondario |
| `--color-brown` | `#37240B` | materia, didascalie e dettaglio |

È ammesso un avorio derivato per modulare le superfici. Nero e oro non diventano asse luxury; verde salvia non diventa scorciatoia agricola.

### 4.2 Tipografia

- League Spartan è l'unico font ufficiale approvato per il web nella P0.
- Il file deve provenire dal fascicolo cliente e la licenza OFL deve essere conservata nel repository.
- Archivo Black resta non utilizzabile finché non viene consegnato un file con licenza verificabile.
- Font Bitstream/OnlineWebFonts e Bodoni non definiscono il nuovo sistema.
- Il fallback è un sans di sistema robusto.

### 4.3 Griglia e densità

- desktop: 12 colonne;
- tablet: 8 colonne;
- mobile: 4 colonne;
- larghezza, ritmo e spaziatura sono editoriali ma non monumentali;
- nessuna sezione usa altezza coreografica obbligatoria;
- i prodotti usano lo stesso contratto visivo e la stessa area media.

### 4.4 Fotografia e packaging

- La fotografia reale è prova, non sfondo generico.
- Colori e contrasto rispettano i materiali; niente filtri pittorici o look cinematico uniforme.
- Il packaging ispira bordi, fasce, densità tipografica e accenti, ma l'etichetta non viene copiata sull'intera pagina.
- I mockup non sostituiscono packshot mancanti.

### 4.5 Motion

- transizioni brevi da 160, 240 e 400 ms;
- reveal discreti e non necessari alla comprensione;
- nessun pin narrativo, nessuna camera WebGL, nessuna sequenza a 64 chicchi;
- reduced motion, Save-Data, deep link e no-JS sono requisiti;
- GSAP resta solo se una misurazione dimostra valore non ottenibile con CSS e IntersectionObserver.

## 5. Record di verità approvato

Il contenuto viene migrato a un modello esplicito:

```ts
type Fact<T> = {
  value: T;
  source: string;
  sourceDate: string | null;
  status:
    | "client-confirmed"
    | "document-confirmed"
    | "historical"
    | "contradictory"
    | "requested"
    | "not-publishable";
  approvedBy: string | null;
  public: boolean;
  notes: string;
};
```

Decisioni di implementazione:

- i fatti grezzi vivono in `facts.ts` e citano `sources.ts`;
- solo i selettori in `selectors.ts` possono fornire dati pubblici ai componenti;
- un fatto `historical`, `contradictory`, `requested` o `not-publishable` non viene renderizzato;
- metadata, JSON-LD e manifest usano gli stessi selettori;
- il catalogo non contiene prezzi né numero totale;
- i campi facoltativi non producono trattini o placeholder visibili.

## 6. Architettura approvata

### 6.1 Ordine dei blocchi

1. **Header** — wordmark, quattro anchor essenziali, CTA contatto.
2. **Hero** — brand, Mais Rosso Ottofile, Cherasco, foto reale e due CTA.
3. **Materia** (`#il-mais`) — colore, chicco, pannocchia e firma dell'otto.
4. **Campo e filiera** (`#dal-campo`) — calendario agricolo e distinzione tra lavoro diretto e partner.
5. **Prodotti** (`#prodotti`) — quattro card paritarie.
6. **Custodia** (`#custodia`) — annata, selezione e responsabilità finale.
7. **Contatti e footer** (`#contatti`) — disponibilità, percorso consumer e contatto professionale secondario.

### 6.2 Primo viewport

Il primo viewport deve mostrare o rendere immediatamente raggiungibili:

- `Mais Rosso Co.`;
- `Mais Rosso Ottofile varietà Albese`;
- `ai piedi di Cherasco`;
- una fotografia reale;
- CTA prodotti e disponibilità.

### 6.3 Tempi narrativi

- una prova reale appare subito;
- il catalogo compare entro il 45% della pagina;
- la pagina viene accorciata rispetto al sistema a otto capitoli;
- il prologo non viene renderizzato nella P0;
- il rail non viene renderizzato su tablet e mobile; su desktop può sopravvivere soltanto come indice testuale leggero, se non duplica l'header;
- l'inversione finale petrolio/crema viene preservata come firma cromatica, non come sequenza motion.

### 6.4 Comportamento mobile

- ordine DOM lineare;
- hero non dipendente dal crop desktop;
- La Maisèra seconda card;
- CTA e target almeno 44 px dove praticabile;
- menu accessibile da tastiera con focus ed Escape se custom;
- nessun overflow orizzontale, testo verticale o micro-label obbligatoria.

## 7. Asset selezionati

### 7.1 Mappa P0

| Uso | Master selezionato | Nota |
|---|---|---|
| Hero | `Materiale fotografico/IMG_6427.JPG` | mani e cinque pannocchie, prova immediata |
| Materia | `Materiale fotografico/IMG_6378.JPG` | pannocchia e file del chicco |
| Chicco/farina | `Materiale fotografico/IMG_6380.JPG` | materia trasformata, adatta alla farina |
| Raccolto | `Mais rosso/IMG_5097.JPG` | cassette e raccolto reale |
| Campo | `Mais rosso/UYIO1755.JPG` | campo maturo; didascalia prudente |
| La Maisèra | etichetta più recente del 28 luglio 2026 | fonte prodotto, non hero; qualità limitata |

### 7.2 Prodotti senza packshot pulito

- Farina può usare temporaneamente la fotografia di chicchi e farina.
- Maisette e Maissini usano crop di prodotto reale soltanto se il crop elimina marchi obsoleti senza falsificare il pack; altrimenti ricevono una scheda tipografica/materica dichiaratamente non-packshot.
- La Maisèra usa l'etichetta corrente in un frame editoriale, senza ingrandimenti che ne denuncino la bassa risoluzione.
- Nessun mockup viene inventato.

### 7.3 Asset esclusi dal runtime

- piastre AI che simulano documentazione;
- paesaggi generici e scene luxury;
- pack con etichette obsolete quando il marchio è leggibile;
- vecchio albero e sigillo circolare;
- immagini di processi non verificati come aziendali;
- vecchi asset della referenza birra storica.

I master cliente restano in archivio; il frontend usa derivati WebP/AVIF dimensionati, registrati con fonte, crop, diritti e livello di verifica.

## 8. Copy direction approvata

### 8.1 Hero

- Eyebrow: `Piccola azienda agricola piemontese`.
- H1: `Mais Rosso Co.`.
- Apertura: coltivazione diretta del Mais Rosso Ottofile varietà Albese nei campi ai piedi di Cherasco, selezione della materia prima e responsabilità su qualità, ricette e prodotto finale.
- Gamma sintetica: farina, gallette, grissini e birra.

### 8.2 Tono

Caldo, concreto, competente, sensoriale e contemporaneo. Il testo mostra fatti e materia prima prima di formulare interpretazioni.

Da evitare:

- aristocrazia, mito regale e tono da maison;
- metacopy sul design o sul catalogo;
- eccellenza, unicità, tradizione e innovazione senza prova;
- claim salute o biologico;
- filiera totalmente interna;
- numeri, prezzi o disponibilità non confermati.

### 8.3 Metadata

- Title: `Mais Rosso Co. | Mais Rosso Ottofile ai piedi di Cherasco`.
- Description: `Mais Rosso Co. coltiva il Mais Rosso Ottofile varietà Albese ai piedi di Cherasco e ne segue farina, gallette, grissini e birra agricola.`
- `metadataBase`, canonical, legal address e contatti nei dati strutturati restano omessi finché non confermati.

## 9. Componenti da preservare

- rendering server e markup progressivo;
- skip link, landmark, heading semantici e focus management;
- responsive e controlli anti-overflow;
- reduced-motion, fallback statici e no-JS;
- `next/image`, dimensioni media e caricamento LCP controllato;
- registry media data-driven;
- catalogo generato da dati e non hardcoded nel markup;
- `<dl>` per fatti prodotto e `<address>` per contatti;
- generazione mailto;
- test Playwright utili su accessibilità, immagini, console, responsive e policy contenuto;
- inversione cromatica finale;
- una sola firma dell'otto come elemento editoriale discreto.

## 10. Componenti da cambiare o ritirare

### 10.1 Rifattorizzare

- `Header.tsx`: wordmark, nav essenziale e menu mobile minimo;
- `Hero.tsx`: foto reale, materia, territorio e CTA;
- `Piastra.tsx` → `MediaFrame.tsx`;
- `Scheda.tsx` → `SectionShell.tsx`;
- `Chapters.tsx` → sezioni isolate;
- `ProductsChapter` → `ProductsSection` e `ProductCard` paritaria;
- `ContactFooter.tsx`: consumer prima, professionisti dopo, riga legale subordinata;
- `ExperienceMotion.tsx`: enhancer ridotto senza pin.

### 10.2 Non renderizzare in P0

- prologo WebGL e sue piastre;
- rail a 64 chicchi;
- racconto regale;
- otto capitoli obbligatori;
- prezzi in forma di registro;
- UI dipendente da timeline.

### 10.3 Rimuovere dopo lo switch stabile

- componenti, route preview, script e CSS esclusivi del vecchio prologo;
- font runtime non approvati;
- immagini AI documentarie;
- vecchi marchi pubblici;
- test che cristallizzano il concept invece dei requisiti di prodotto.

La rimozione fisica avviene soltanto dopo una suite completa verde e un audit delle referenze.

## 11. Piano di implementazione approvato

L'implementazione procede per workstream a ownership esclusiva.

1. **Policy e baseline** — script di scansione pubblico, classificazione dei test, build iniziale.
2. **Record di verità** — `sources.ts`, `facts.ts`, `selectors.ts`, quattro prodotti pubblici.
3. **Pulizia identità** — stringhe, contatti obsoleti, vecchio albero, icone e contenuti esclusi.
4. **Branding tecnico** — metadata, manifest, OG e icone temporanee.
5. **Font e token** — League Spartan locale, licenza, palette estratta e focus.
6. **Architettura** — pagina e sezioni server-rendered.
7. **Media reali** — derivati ottimizzati e registry verificato.
8. **Catalogo** — card paritarie e La Maisèra seconda su mobile.
9. **Copy e contatti** — copy consolidato, filiera corretta e CTA.
10. **Motion** — progressive enhancement minimo.
11. **Responsive, accessibilità e SEO** — rifinitura e test multidispositivo.
12. **Pulizia e report** — codice morto, README, package slug, documentazione e report finale.

Nessuna nuova dipendenza è approvata. Sharp già presente può creare derivati; League Spartan è self-hosted.

## 12. Ownership e prevenzione conflitti

| Workstream | File principali |
|---|---|
| Verità e selettori | `src/content/sources.ts`, `facts.ts`, `selectors.ts` |
| Copy/view model | `src/content/site.ts`, helper mailto |
| Media | `src/content/media.ts`, derivati fotografici |
| Branding/SEO | `layout.tsx`, manifest, icon, OG |
| Architettura | `page.tsx`, Header, Hero, Footer, `components/sections/*` |
| Visual system | `fonts.ts`, `tokens.css`, `globals.css`, `components.css` |
| Motion | `ExperienceMotion.tsx`, costanti motion |
| QA | test, policy script, screenshot e report |

`page.tsx`, `site.ts`, `media.ts` e `components.css` hanno sempre un solo proprietario alla volta. Ogni passaggio richiede typecheck e il gate pertinente prima del workstream successivo.

## 13. Criteri di accettazione

### 13.1 Brand e contenuti

- Mais Rosso Co. è l'unico brand commerciale nel DOM, head, manifest, OG, JSON-LD e asset pubblici.
- La denominazione precedente, i relativi domini/handle e il vecchio albero sono assenti dal perimetro pubblico.
- Amaro del Dottore e la vecchia referenza birra sono assenti.
- I quattro prodotti pubblicati derivano dal catalogo recente e hanno pari gerarchia.
- La Maisèra non scende oltre la seconda card mobile.
- Nessun prezzo storico, ettaro, quantità, IBU, 0,75 L o claim non confermato è pubblicato.
- Maisotti non vengono renderizzati finché restano contraddittori.

### 13.2 Esperienza e direzione

- Nel primo viewport si comprendono brand, materia prima, territorio e presenza di un'azienda agricola reale.
- Una fotografia reale appare immediatamente.
- Prodotti e prova commerciale compaiono entro i primi blocchi.
- Packaging e sito condividono palette, tipografia, bordi e densità senza effetto costume.
- Il risultato è agricolo contemporaneo e non un concept autonomo.

### 13.3 Verità e conversione

- La pagina distingue coltivazione diretta, partner specializzati e responsabilità finale.
- I campi sono descritti ai piedi di Cherasco, senza trasformarli in sede legale.
- Semina e raccolta sono indicative; disponibilità e annata non diventano promessa.
- Il linguaggio principale parla al consumatore consapevole.
- Esiste almeno un recapito consumer approvato al go-live.

### 13.4 Tecnica

- un H1, landmark e heading outline corretti;
- tastiera, focus, screen reader e target interattivi validi;
- reduced motion, Save-Data, deep link e no-JS funzionanti;
- nessun overflow a 320, 390, 768, 1280, 1440 e 1920 px;
- immagini dimensionate, LCP prioritario, lazy load per il resto, nessun CLS evidente;
- nessun font remoto e nessun dato non approvato nei metadata;
- format, lint, typecheck, build, Playwright e audit pubblico verdi;
- performance e SEO mantenute o migliorate.

## 14. Rischi e mitigazioni

| Rischio | Gravità | Mitigazione approvata |
|---|---|---|
| logo pulito assente | alta | wordmark P0 e icona `MR`; gate cliente prima del go-live |
| packshot incompleti | alta | foto di materia/prodotto reale e card tipografiche, mai mockup |
| etichetta birra a bassa risoluzione | alta | uso contenuto in frame, richiesta packshot |
| contatti/privacy incompleti | critica per go-live | CTA di sviluppo e omissione dei dati non confermati |
| stato Maisotti contraddittorio | media | filtro pubblico e omissione |
| CSS accoppiato al concept | alta | nuovo layer, switch atomico, rimozione successiva |
| immagini raw pesanti | alta | derivati WebP/AVIF, `sizes`, LCP singolo |
| attribuzione fotografica eccessiva | alta | alt descrittivi solo del visibile, registry di verifica |
| ritorno a un concept autonomo | alta | prove reali, catalogo anticipato e motion non necessario |

## 15. Rollback

- un checkpoint per ogni workstream;
- dati, branding e rimozione dei contenuti vietati restano applicati anche in fallback;
- lo switch di `page.tsx` è isolato;
- nuovi asset hanno nomi nuovi e non sovrascrivono i master;
- il CSS nuovo viene stabilizzato prima di rimuovere il vecchio;
- codice e asset legacy vengono rimossi soltanto dopo QA completo;
- il fallback sicuro è una pagina server-rendered più semplice con identità e verità aggiornate, mai il ritorno pubblico alla landing precedente.

## 16. Esito del gate

Il gate documentale è **superato**.

Verifiche esplicite del coordinatore:

- unico brand pubblico: approvato;
- denominazione precedente non propagata: verificato nei sette output;
- Amaro escluso: approvato;
- La Maisèra fondamentale e paritaria: approvato;
- font e palette da materiali cliente: verificato, con League Spartan OFL come unica scelta P0;
- fotografie reali prioritarie: approvato con mappa file;
- filiera non falsificata: protetta da record e test;
- consumatore consapevole come target principale: approvato;
- accessibilità e qualità tecnica da preservare: inserite nei gate;
- design subordinato al brand: reso misurabile nei criteri di accettazione.

L'implementazione può iniziare. Il rilascio esterno resta condizionato ai punti della sezione 3.2.
