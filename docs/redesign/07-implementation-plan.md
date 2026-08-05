# Mais Rosso Co. — Technical Preservation & Implementation Plan

Data: 5 agosto 2026  
Responsabile: Agente 7 — Technical Preservation & Implementation Planner  
Stato: proposta pre-implementazione da consolidare nel master plan; nessuna modifica al frontend o agli asset

## 1. Esito operativo

Il progetto non richiede una ricostruzione tecnica. Richiede una migrazione controllata dell'autorità del sistema:

- dai dati dichiarati “verificati” in modo globale a fatti pubblicabili per singolo campo;
- da otto capitoli e 64 soglie a una landing server-rendered con anchor stabili;
- da piastre simulate a fotografie cliente registrate con provenienza e diritti;
- dalla vecchia firma pubblica a Mais Rosso Co. come unico brand;
- da catalogo con prezzi e stati storici a schede che renderizzano solo campi ammessi;
- da motion che governa la struttura a motion subordinata al contenuto.

La base da conservare è sostanziale: Next.js App Router, Server Components per il contenuto, `next/image`, `next/font/local`, CSS a token, semantica HTML, skip link, descrizioni in `<dl>`, catalogo data-driven, mailto precompilati, reduced motion, fallback no-JS, Playwright multi-viewport e assenza di dipendenze superflue.

La strategia raccomandata è una serie di patch piccole e verificabili. Il punto di rollback non deve mai ripristinare la denominazione precedente, il prodotto escluso, la vecchia referenza birra, prezzi storici o claim non approvati.

## 2. Fonti tecniche e vincoli assunti

Sono stati letti integralmente:

- `docs/brand-audit-materiali-cliente.md`;
- `docs/landing-brand-gap-analysis.md`;
- `docs/redesign/01-brand-identity-extraction.md`;
- `docs/redesign/02-content-source-of-truth.md`;
- `docs/redesign/03-photography-media-plan.md`;
- `docs/redesign/04-information-architecture.md`;
- `docs/redesign/06-copy-conversion.md`.

Sono stati ispezionati `src/app`, tutti i componenti renderizzati, i tre moduli contenuto, font, token, CSS, motion, renderer WebGL, configurazione Next/TypeScript/Playwright, asset pubblici e `tests/prototype.spec.ts`.

Prima delle raccomandazioni sono state consultate le guide locali di Next.js 16.2.12 in `node_modules/next/dist/docs/`, in particolare:

- Server e Client Components;
- immagini e `next/image`;
- font locali e `next/font`;
- Metadata API, icone, Open Graph e manifest;
- JSON-LD;
- Playwright;
- checklist di produzione.

Conseguenze tecniche:

1. `layout.tsx` e `page.tsx` restano Server Components; i confini client vengono limitati a menu mobile e motion realmente interattiva.
2. Le fotografie locali usano `next/image` con dimensioni intrinseche o dichiarate, `sizes` realistici e priorità solo per il visual LCP della hero.
3. I font restano self-hosted tramite `next/font/local`; nessun subset estratto dai PDF entra nel bundle.
4. Metadata, icone, OG e manifest usano le convenzioni App Router, non tag manuali duplicati.
5. Eventuale JSON-LD viene renderizzato come `<script type="application/ld+json">` server-side, con serializzazione che sostituisce `<` con `\u003c`.
6. I test browser continuano a girare contro `next build` + `next start`, nei tre viewport già configurati.

## 3. Baseline tecnica attuale

### 3.1 Architettura

- Framework: Next.js `16.2.12`, React `19.2.4`, TypeScript strict.
- Rendering: pagina e quasi tutti i componenti sono Server Components.
- Client bundle mirato: `ExperienceMotion` e `KernelPrologue.client` usano GSAP, browser API e WebGL.
- Stili: `src/app/globals.css` importa `src/styles/tokens.css` e `src/styles/components.css`.
- Dati: `src/content/facts.ts` alimenta `src/content/site.ts`; `src/content/media.ts` centralizza le immagini.
- Media: `Piastra` riceve una chiave di registry, mai un percorso libero.
- QA: una suite Playwright ampia su desktop, tablet e mobile; build di produzione avviata dal `webServer`.

### 3.2 Accoppiamenti da sciogliere

| Accoppiamento | File principali | Effetto |
|---|---|---|
| 8 capitoli → 64 chicchi → inversione finale | `RigaOttava.tsx`, `ExperienceMotion.tsx`, `site.ts` | Il numero dei blocchi diventa un requisito tecnico anziché una conseguenza del contenuto |
| Prologo → anchor e geometria di capitoli specifici | `KernelPrologue.client.tsx` | Cambiare l'IA rompe la sequenza WebGL |
| Stato complessivo prodotto → pubblicazione di tutti i campi | `facts.ts`, `site.ts`, `Chapters.tsx` | Un formato confermato può trascinare prezzo o ingredienti non approvati |
| Nome aziendale → header, mailto, footer, social, metadata | `facts.ts`, `site.ts`, `layout.tsx` | Una sola stringa obsoleta si propaga in tutta l'esperienza pubblica |
| “Piastra” → rapporti e bleed del concept | `Piastra.tsx`, `components.css` | Le fotografie reali vengono costrette a sembrare reperti |
| Campo notte → kernel 64 e pin | `ExperienceMotion.tsx`, `motion.ts` | Il contatto dipende da una performance di scroll |

## 4. Inventario delle occorrenze della denominazione precedente

La classificazione distingue la presenza del valore senza riprodurlo in questo documento.

### 4.1 Pubbliche e da rimuovere

| Posizione | Occorrenza/funzione | Azione |
|---|---|---|
| `src/content/facts.ts` | `company.name` | Sostituire con `Mais Rosso Co.` nel nuovo record pubblico |
| `src/content/facts.ts` | email sul dominio precedente | Non renderizzare; rimuovere dal frontend e attendere/approvare un contatto coerente |
| `src/content/facts.ts` | handle e URL Facebook con nomenclatura precedente | Rimuovere dal record pubblico; non creare un sostituto senza canale verificato |
| `src/content/site.ts` | metadata title derivato dalla denominazione precedente | Sostituire con il title approvato in `06-copy-conversion.md` |
| `src/content/site.ts` | URL privacy sul dominio precedente | Rimuovere finché non esiste URL approvato; il link deve collassare, non puntare al vecchio dominio |
| `src/app/layout.tsx` | `metadataBase` sul dominio precedente | Rimuovere temporaneamente o sostituire solo dopo conferma del dominio Mais Rosso Co. |
| `src/app/icon.png` | sigillo con vecchio albero e microtesto della denominazione precedente | Sostituire prima del rilascio; non può restare come favicon corrente |
| `src/app/apple-icon.png` | stessa composizione del sigillo non ripulito | Sostituire prima del rilascio |
| `public/images/marchio/tondo-384.png` | vecchio albero usato nella chiusa | Togliere dal rendering e spostare fuori da `public/` oppure eliminare dal set distribuibile dopo verifica delle referenze |
| `public/images/marchio/tondo-80.png` | vecchio albero usato nel footer | Stessa azione del file 384 px |
| `src/components/Chapters.tsx` | firma visiva della chiusa | Eliminare il nodo e la classe collegata |
| `src/components/ContactFooter.tsx` | firma visiva del footer | Eliminare il nodo e la classe collegata |
| `src/styles/components.css` | maschere `.marchio` che caricano i due raster | Eliminare dopo la rimozione dei componenti |

`src/app/opengraph-image.png` non contiene testualmente la denominazione precedente e mostra la doppia pannocchia; resta però un derivato da master non definitivo. Può sopravvivere solo come asset transitorio, poi va rigenerato dal master approvato e affiancato da un alt aggiornato.

### 4.2 Interne o storiche

| Posizione | Classe | Trattamento |
|---|---|---|
| `package.json`, `package-lock.json` | slug tecnico del progetto | Rinominabile in un commit meccanico separato; non è contenuto pubblico, ma va aggiornato per coerenza operativa |
| `README.md` | descrizione tecnica ormai superata | Aggiornare dopo l'implementazione; non usarlo come fonte di contenuto |
| commenti in `facts.ts`, `Chapters.tsx`, `tokens.css`, `tests/prototype.spec.ts` | storia delle decisioni del vecchio concept | Rimuovere o riscrivere quando si tocca il relativo file; non conservare commenti che suggeriscono di reintrodurre contenuti vietati |
| `.claude/agents/*` | prompt interni precedenti | Archiviare o aggiornare fuori dal workstream frontend; non sono runtime, ma oggi contengono istruzioni fattualmente superate |
| `.git/logs/*` | cronologia Git | Non modificare; non è contenuto distribuibile né sorgente operativa |

### 4.3 Legali o amministrative

Non esiste nel repository un'occorrenza che possa essere mantenuta pubblicamente solo perché “legale”. Il soggetto legale documentato è distinto dal brand e deve entrare esclusivamente nel footer legale quando ragione sociale, sede e dati fiscali saranno verificati.

L'email, la privacy e i social legati alla denominazione precedente sono dipendenze amministrative da sostituire, non eccezioni al divieto pubblico. Possono restare solo in documentazione privata di migrazione o nella cronologia, mai nel DOM, nei metadata, nel manifest, nel JSON-LD o negli asset serviti.

### 4.4 Documentali

I report preesistenti in `docs/` sono fonti storiche e non vanno riscritti retroattivamente. Restano esclusi dalle scansioni che validano il frontend. I nuovi documenti operativi, questo incluso, usano soltanto la formula “denominazione precedente”.

## 5. Cosa preservare

### 5.1 Fondazione applicativa

| Elemento | Decisione | Motivazione e nuovo ruolo |
|---|---|---|
| App Router, Root Layout, pagina statica | Preservare | La landing non necessita fetch dinamico né backend per essere completa |
| Server Components | Preservare come default | Contenuto, catalogo, media e metadata non richiedono idratazione |
| TypeScript strict | Preservare | Il nuovo schema dei fatti beneficia del controllo sui campi condizionati |
| Nessuna nuova dipendenza | Preservare | React, Next, GSAP, Sharp e Playwright coprono già le necessità |
| `next/image` | Preservare | Dimensioni, lazy loading, formati moderni e stabilità layout |
| `next/font/local` | Preservare | Self-hosting, privacy e assenza di layout shift |
| `next.config.ts` image sizes | Preservare e ricontrollare | I breakpoint coincidono già con i viewport di progetto |

### 5.2 Accessibilità e resilienza

- skip link e landmark `header`/`main`/`footer`;
- un solo H1 e gerarchia H2/H3 coerente;
- `<dl>` per dati morfologici, calendario e specifiche;
- `<ol>` o `<ul>` per sequenze e catalogo, non `div` cliccabili;
- link con focus visibile e sottolineatura persistente;
- target interattivi da portare dal floor attuale di 40 px al target 44×44 px;
- alt descrittivi e `alt=""` per decorazioni;
- contenuto essenziale presente nel server HTML;
- deep link che funzionano senza timeline precedente;
- no-JS leggibile e azionabile;
- reduced motion che rimuove movimento, non contenuto o contrasto;
- supporto Save-Data per qualsiasi motion/visual pesante eventualmente conservato.

### 5.3 Componenti e pattern riusabili

| Elemento attuale | Decisione | Limite |
|---|---|---|
| `RegistroDati.tsx` | Mantenere quasi invariato | Rinominarne eventualmente le classi, non la semantica |
| `Piastra.tsx` | Generalizzare in `MediaFrame` o mantenere nome con API nuova | Non imporre più due soli rapporti né il linguaggio da reperto |
| mapping prodotti in `ProductsChapter` | Preservare il principio data-driven | Rifare markup e selezione dei campi pubblici |
| mailto specifici per prodotto | Preservare | Generarli solo da contatto approvato e prodotto pubblico |
| `ContactFooter` | Preservare landmark e struttura di contatto | Eliminare fiere, percorso ridondante, vecchi canali e firma obsoleta |
| cambio cromatico finale | Preservare come idea | Deve essere CSS-first, senza pin e indipendente dal conteggio |
| utility motion e tempi | Riutilizzare se il visual system li approva | Rimuovere nomi e vincoli legati al registro |
| media registry | Preservare e rafforzare | Aggiungere verità, diritti, crop, stato pubblico e master |

### 5.4 Test e performance da non perdere

- build di produzione prima dei test browser;
- tre progetti Playwright: 1440×1000, 768×900, 390×844;
- controllo overflow orizzontale;
- verifica link/anchor morti;
- tastiera e focus;
- reduced motion;
- no-JS;
- errori console/page exceptions;
- immagini risolte e dimensionate;
- verifica che dati e claim assenti non riappaiano;
- immagini LCP ottimizzate e nessun caricamento eager indiscriminato;
- nessun componente client esteso a tutta la pagina.

## 6. Cosa modificare

### 6.1 Contenuti e dati

- `facts.ts` passa da oggetti piatti a `Fact<T>` per singolo campo.
- `site.ts` diventa un livello di view model: copy approvato, anchor, CTA e selettori pubblici.
- Lo stato di pubblicabilità non vive nel componente.
- Prezzi storici restano fuori dal bundle pubblico.
- I Maisotti non vengono renderizzati finché lo stato commerciale resta contraddittorio.
- La Maisèra è una referenza con identico contratto di card, non un caso speciale visivo.
- Nessun totale catalogo è hard-coded.
- La referenza esplicitamente esclusa e la vecchia birra non devono esistere in array, union, placeholder, fixture, alt, metadata o test del nuovo frontend.

### 6.2 Architettura pagina

Nuovo ordine:

1. header;
2. hero `#inizio`;
3. materia `#il-mais`;
4. campo e filiera `#dal-campo`;
5. prodotti `#prodotti`;
6. custodia `#custodia`;
7. contatti `#contatti`.

Il catalogo deve iniziare entro il 35–45% della pagina. Nessun blocco ordinario usa altezze artificiali superiori a `120svh`; la chiusa non usa pin.

### 6.3 Visual system

- sostituire i token archivio/notte/oro con i ruoli approvati dal master plan;
- introdurre i colori estratti dal logo: corallo, crema, petrolio, rosso ramato, bordeaux e bruno;
- verificare contrasto per ogni coppia, senza usare petrolio su corallo per testo piccolo;
- sostituire Bodoni come display dominante con League Spartan OFL;
- mantenere Archivo solo se il master plan ne approva il ruolo e la licenza del file repository;
- ridurre DM Mono a dati realmente tabellari o rimuoverlo;
- rimuovere commenti/invarianti “otto colonne”, “sette colori”, “un solo evento” non più validi;
- mantenere la texture carta solo se non sterilizza fotografie e pack.

### 6.4 Media

- importare derivati web dai master cliente autorizzati, mai dalle copie WhatsApp quando esiste l'originale;
- usare `IMG_6427.JPG` come candidata LCP, soggetta al ruling finale;
- usare immagini reali per materia, campo, raccolto, chicco/farina;
- non usare `UBCW8681.JPG` come prova di una fase tecnica finché il soggetto non è identificato;
- non mostrare vecchi pack come catalogo corrente;
- mantenere card tipografiche paritarie finché mancano packshot correnti, senza mockup e senza box “in arrivo”;
- registrare ogni derivato con fonte, data, diritti, crop e verifiche sul soggetto.

### 6.5 Metadata e SEO

- aggiornare title, description, Open Graph title/description/site name;
- sostituire o omettere `metadataBase` finché il nuovo dominio non è confermato;
- sostituire icone che contengono il vecchio emblema;
- aggiornare `opengraph-image.alt.txt` alla fotografia/illustrazione effettivamente scelta;
- aggiungere `src/app/manifest.ts` solo con nome, short name, colori e icone approvati;
- aggiungere `src/app/robots.ts` e `src/app/sitemap.ts` soltanto quando l'URL canonico è confermato;
- aggiungere JSON-LD `Organization`/`Brand` senza indirizzo, telefono o identità legale non approvati;
- non creare `Product`, `Offer`, prezzi o disponibilità strutturata con dati incompleti.

## 7. Cosa rimuovere

### 7.1 Dal rendering

- `RigaOttava` nella forma a 64 chicchi;
- `ImprontaTransition` e `KernelPrologue` dalla landing nel primo passaggio;
- `RoyalChapter`;
- `ConservationChapter` fondato su rischio classificato/registro 2007;
- matrice 01–08 del catalogo;
- label “Scheda NN/08” e `data-scheda`;
- pin finale e soglia kernel 64;
- vecchio albero in chiusa/footer;
- fiere e promessa “non vendiamo online” finché il canale non è confermato;
- prezzi 2025;
- indirizzo trattato come sede legale;
- social e privacy non coerenti col brand pubblico.

### 7.2 Asset runtime

Da togliere dal registry pubblico:

- le cinque piastre AI che simulano pannocchia, pianta, campo, pietra/macinazione e farina;
- i due raster del vecchio albero;
- i derivati di packaging incompleto quando vengono sostituiti da materiali correnti;
- icone sigillo non ripulite.

I file generati possono restare temporaneamente nel repository ma fuori da ogni import durante la migrazione. Dopo il collaudo e un `rg` delle referenze, vanno spostati in `assets/archive/` o rimossi dal set servito in una patch dedicata e reversibile.

### 7.3 Codice inutilizzato

Il renderer WebGL, shader, topologia, `KernelPrologue.client`, `StaticProloguePlate`, `ImprontaTransition` e route preview restano inizialmente intatti ma non renderizzati. Dopo il ruling motion definitivo:

- se una firma astratta breve viene riapprovata, si isola un componente hero senza dipendenze dagli anchor;
- se non viene riapprovata, si eliminano codice, script di cattura/esportazione, asset fallback e test specializzati in un commit separato.

Non conservare a tempo indefinito un sottosistema WebGL non raggiungibile.

## 8. Modello dati e migrazione

### 8.1 File proposti

| File | Ruolo |
|---|---|
| `src/content/sources.ts` | Registro stabile delle fonti (`SourceRef`) |
| `src/content/facts.ts` | Fatti tipizzati, inclusi stati non pubblici necessari all'audit |
| `src/content/selectors.ts` | Guard e selettori che espongono soltanto fatti pubblicabili |
| `src/content/site.ts` | Copy/view model approvato per le sezioni |
| `src/content/media.ts` | Registry media con verità, diritti e flag pubblico |
| `src/content/structured-data.ts` | Payload JSON-LD costruito solo dai selettori pubblici |

La separazione in `selectors.ts` evita che componenti o metadata leggano direttamente un fatto storico. Non è necessaria una libreria di stato né un CMS.

### 8.2 Contratti

Usare gli stati definiti in `02-content-source-of-truth.md` e il contratto minimo:

```ts
type PublicFactStatus = "confermato-cliente" | "confermato-documento-recente";

type Fact<T> = {
  value: T;
  source: readonly SourceRef[];
  sourceDate: string | null;
  status: FactStatus;
  approvedBy: string | null;
  public: boolean;
  notes: readonly string[];
};

function isPublicFact<T>(fact: Fact<T>): fact is Fact<T> & {
  status: PublicFactStatus;
  public: true;
} {
  return fact.public &&
    (fact.status === "confermato-cliente" ||
      fact.status === "confermato-documento-recente");
}
```

Per dati regolatori e commerciali serve un secondo guard più restrittivo: prezzo, ingredienti, allergeni, disponibilità, contatti e dati legali richiedono `approvedBy !== null` al go-live, anche se provengono da un documento recente.

### 8.3 Prodotti

Ogni prodotto possiede fatti indipendenti per:

- nome;
- stato commerciale;
- definizione;
- formati;
- ingredienti;
- allergeni;
- lavorazione;
- prezzo;
- media;
- ordine editoriale.

Il selettore `getPublicProducts()`:

1. include soltanto `commercialState: active` pubblicabile;
2. omette il singolo campo non pubblicabile;
3. non crea placeholder;
4. non espone prezzo storico;
5. non dipende da un conteggio;
6. restituisce La Maisèra con lo stesso tipo degli altri prodotti;
7. non contiene record per referenze vietate o storiche.

### 8.4 Contatti

Il mailto viene costruito soltanto quando l'email pubblica supera il guard. In assenza:

- le CTA rimangono anchor a `#contatti` durante lo sviluppo;
- non si usa un link con `href="#"`;
- non si pubblica una CTA apparentemente azionabile senza destinazione;
- il rilascio resta bloccato finché esiste almeno un canale consumer approvato.

## 9. Component map

### 9.1 Mantenere

- `RegistroDati.tsx`;
- utility `.sr-only` e skip link;
- Root Layout come Server Component;
- `Piastra.tsx` solo se viene generalizzato;
- parti del markup `ProductsChapter` e `ContactFooter` che preservano liste, `<dl>`, `<address>` e mailto;
- `lib/motion.ts` solo per costanti ancora usate;
- configurazione `next/image`, font, TypeScript, ESLint e Playwright.

### 9.2 Rifattorizzare

| Attuale | Destinazione proposta | Nota |
|---|---|---|
| `Header.tsx` | Header server + `MobileNav.client.tsx` minimo | L'unico stato client è apertura/chiusura menu; in alternativa `<details>` se UX e a11y risultano migliori |
| `Hero.tsx` | Hero brand/foto/CTA | Niente dipendenza dal prologo |
| `Scheda.tsx` | `SectionShell.tsx` | Nessun numero o vuoto “portante” obbligatorio |
| `Piastra.tsx` | `MediaFrame.tsx` | `kind`, ratio/crop, caption, priority e `sizes` dal registry |
| `Chapters.tsx` | componenti di sezione separati | Evita un file monolitico e rende chiaro il riuso |
| `ProductsChapter` | `ProductsSection.tsx` + `ProductCard.tsx` | Card visuali paritarie, campi condizionati |
| `ContactFooter.tsx` | contatto consumer + professionale + footer legale | Un solo blocco compatto |
| `ExperienceMotion.tsx` | enhancer ridotto | Stato sezione/reveal/inversione senza pin o conteggi |

### 9.3 Creare

- `src/components/BrandMark.tsx`: wordmark testuale + simbolo approvato, con fallback sicuro;
- `src/components/MobileNav.client.tsx`, solo se necessario;
- `src/components/SectionShell.tsx`;
- `src/components/MediaFrame.tsx`;
- `src/components/sections/MatterSection.tsx`;
- `src/components/sections/FieldProcessSection.tsx`;
- `src/components/sections/ProductsSection.tsx`;
- `src/components/sections/ProductCard.tsx`;
- `src/components/sections/CustodySection.tsx`;
- `src/content/sources.ts`;
- `src/content/selectors.ts`;
- `src/content/structured-data.ts`;
- `src/app/manifest.ts`;
- `scripts/check-public-content.mjs` per la policy di stringhe/asset pubblici, senza dipendenze;
- test Playwright separati per struttura, policy contenuto, a11y/responsive e metadata.

### 9.4 Eliminare a fine migrazione

- `RigaOttava.tsx`, se l'indice desktop viene implementato dentro Header/section observer;
- vecchi export di `Chapters.tsx`;
- `ImprontaTransition.tsx`, `StaticProloguePlate.tsx`, `KernelPrologue.client.tsx` e `src/lib/prologue/*` se non riapprovati;
- `ProloguePreview.tsx` e route preview se il prologo viene ritirato;
- CSS e script legati esclusivamente a rail, 64 kernel, piastre AI, capture/export del prologo e vecchia firma;
- vecchi font non più referenziati dal bundle.

## 10. Ownership dei workstream

Per evitare conflitti concorrenti:

| Workstream | File posseduti | Non deve toccare |
|---|---|---|
| Dati/verità | `src/content/sources.ts`, `facts.ts`, `selectors.ts` | componenti, CSS, asset |
| Copy/view model | `src/content/site.ts`, mailto | facts grezzi, CSS |
| Branding/SEO | `layout.tsx`, metadata files, manifest, icone/OG | componenti sezione, catalogo |
| Media | `media.ts`, nuove cartelle immagini, eventuale script derivati | copy e layout |
| Architettura | `page.tsx`, `components/sections/*`, Header/Hero/Footer | facts grezzi e asset master |
| Visual system | `fonts.ts`, `tokens.css`, `globals.css`, `components.css` | contenuto e metadata |
| Motion | `ExperienceMotion.tsx`, `motion.ts`, eventuale firma astratta | markup semantico e facts |
| QA | `tests/*`, script policy, capture QA | implementazione salvo fix concordati |

Le modifiche a `page.tsx`, `site.ts`, `media.ts` e `components.css` hanno un solo owner alla volta.

## 11. Ordine delle patch e gate intermedi

### Patch 0 — Baseline e protezioni

Obiettivo:

- salvare esito di `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm run build` e Playwright prima delle modifiche;
- aggiungere lo script di policy per rilevare nel perimetro pubblico denominazione precedente, prodotto escluso, vecchia birra, prezzi storici e claim vietati;
- definire i pattern di esclusione per i report storici.

Gate: baseline documentata; nessun test viene rimosso prima di essere classificato.

### Patch 1 — Record di verità

Obiettivo:

- introdurre `SourceRef`, `Fact<T>`, stati e selettori;
- migrare brand, materia, territorio, filiera e quattro prodotti pubblicabili;
- mantenere un adapter temporaneo per il vecchio rendering, senza duplicare i dati.

Gate:

- typecheck;
- selettori non espongono stati storici/contraddittori;
- nessun prezzo corrente;
- Maisotti assenti dal selettore pubblico;
- La Maisèra completa nei campi ammessi.

### Patch 2 — Rimozione identità e contenuti vietati

Obiettivo:

- aggiornare tutti i valori pubblici;
- rimuovere vecchi contatti/social/privacy;
- rimuovere il vecchio albero dal DOM;
- sostituire/neutralizzare icon e apple icon;
- togliere prodotto escluso e vecchia birra da tipi, fixture e commenti operativi.

Gate: scansione testuale su `src`, `public`, metadata generati e server HTML. I report storici non sono modificati.

### Patch 3 — Metadata, manifest e branding base

Obiettivo:

- metadata approvati;
- `siteName: Mais Rosso Co.`;
- OG alt coerente;
- manifest senza dati non confermati;
- favicon temporanea sicura: wordmark/simbolo pulito approvato, mai il sigillo corrente non ripulito.

Gate: head e manifest ispezionati nella build di produzione; nessun URL sul vecchio dominio.

### Patch 4 — Font e token

Obiettivo:

- importare League Spartan dal fascicolo con licenza OFL conservata;
- applicare palette e ruoli consolidati dall'Agente 5/master plan;
- mantenere contrasto, focus e leggibilità;
- non applicare ancora il nuovo layout completo.

Gate: nessuna richiesta font esterna; nessun subset PDF; contrasto verificato sulle coppie reali.

### Patch 5 — Nuova architettura server-rendered

Obiettivo:

- costruire Header, Hero, Materia, Campo/Filiera, Prodotti, Custodia e Contatti;
- lasciare prologo e rail fuori dal rendering;
- mantenere un solo H1, anchor e ordine DOM corretti;
- ridurre la pagina senza min-height coreografici.

Gate: navigazione, deep link, no-JS e heading outline.

### Patch 6 — Fotografie reali e media registry

Obiettivo:

- derivare formati web dai master approvati con Sharp già presente;
- inserire hero, materia, campo e raccolto reali;
- registrare diritti/crop/verifiche;
- rimuovere le piastre AI dal registry pubblico.

Gate: prima foto reale nel viewport iniziale; nessun AI documentario; nessun vecchio pack; immagini risolte e senza CLS.

### Patch 7 — Catalogo e La Maisèra

Obiettivo:

- card paritarie;
- La Maisèra entro il primo gruppo desktop e non oltre la seconda card mobile;
- formati e ingredienti solo dove pubblici;
- CTA specifiche;
- nessun totale, prezzo o badge stagionale.

Gate: ordine mobile/desktop, parità CSS e policy contenuti.

### Patch 8 — Copy e conversione

Obiettivo:

- applicare il copy consolidato;
- distinguere coltivazione, partner e responsabilità finale;
- consumatore primario, professionista secondario;
- attivare mailto/telefono/social soltanto dopo approvazione.

Gate: nessuna promessa logistica, di stock o risposta; almeno un canale consumer approvato prima del go-live.

### Patch 9 — Motion

Obiettivo:

- reveal discreti, non bloccanti;
- variazione cromatica finale content-driven;
- nessun pin, 64 kernel o timeline necessaria alla comprensione;
- eliminare GSAP se, dopo il prototipo, le interazioni residue sono realizzabili bene in CSS/IntersectionObserver. La rimozione della dipendenza avviene solo con misura del bundle e test equivalenti.

Gate: reduced motion, Save-Data, deep link e no-JS.

### Patch 10 — Responsive, accessibilità e SEO

Obiettivo:

- rifinire 1440, 768 e 390, aggiungendo controlli a 320/360 e 1280/1920;
- tastiera, menu mobile, focus, target 44 px;
- alt/caption, landmark e screen reader;
- JSON-LD e URL canonici solo se confermati;
- verificare LCP/CLS e peso immagini.

Gate: tutti i criteri di accettazione del master plan.

### Patch 11 — Pulizia e documentazione

Obiettivo:

- eliminare codice/asset/test morti;
- aggiornare README e package slug;
- aggiornare manifest asset e licenze;
- chiudere i TODO o trasferirli nel record cliente;
- produrre report finale.

Gate: `rg` senza referenze morte, build e suite completa verdi.

## 12. Strategia test

### 12.1 Test da mantenere e adattare

| Test attuale | Nuova asserzione |
|---|---|
| un solo H1 | H1 esatto `Mais Rosso Co.` |
| nessun overflow | stesso controllo su tutti i viewport, inclusi menu e card |
| anchor validi | quattro link nav + CTA puntano a sezioni esistenti |
| target interattivi ≥40 | target ≥44 dove praticabile, mai sotto il floor esistente |
| reduced motion | nessun contenuto nascosto, nessun pin, cambio finale istantaneo |
| no-JS | testo, immagini, catalogo e contatti essenziali disponibili |
| deep link | `#prodotti` e `#contatti` atterrano correttamente senza timeline |
| catalogo count-agnostic | nessun totale; tutte le card pubbliche rispettano lo stesso contratto |
| anti gluten-free | mantenere e ampliare alla gamma e ai metadata |
| no logistica/stock inventati | mantenere |
| immagini risolte | mantenere con verifica `kind`, diritti e dimensioni |
| console pulita | mantenere |

### 12.2 Test del vecchio concept da ritirare

Ritirare perché non rappresentano più requisiti di prodotto:

- 64 kernel, otto link, otto `data-scheda`;
- otto colonne a ogni breakpoint;
- quattro piastre statiche del prologo;
- topologia, hash, camera e pointer del prologo nel percorso pubblico;
- mapping Hero→varietà→racconto regale→otto file;
- pin legato al kernel 64;
- touch label del rail mobile;
- hero obbligata a tre linee;
- piastre 8:5/1:1 e bleed permessi solo in capitoli numerati;
- campiture con opacità massima definita dal vecchio sistema;
- prezzi presenti nel registro;
- almeno cinque prodotti;
- Maisotti obbligatori;
- fiere e dichiarazione assoluta sull'assenza di vendita online.

Il ritiro avviene nella stessa patch che rende il requisito obsoleto, sostituendolo con un test della nuova decisione. Non eliminare in blocco la suite.

### 12.3 Nuovi test di policy contenuto

Verificare in DOM, `<head>`, OG alt, JSON-LD, manifest e HTML server:

- unico brand pubblico `Mais Rosso Co.`;
- assenza della denominazione precedente e dei relativi slug/handle;
- assenza del prodotto escluso e della referenza birra storica;
- assenza prezzi 2025;
- assenza 75 cl, IBU e percentuale mais non confermati;
- assenza ettari, quantità fisse, registro 2007, mito regale, “senza intermediari”, produzione tutta interna, salute, biologico e stagionalità;
- La Maisèra 33 cl, 7% vol., stile e cereali con glutine;
- filiera con coltivazione diretta e partner specializzati;
- campi ai piedi di Cherasco, semina indicativa e raccolta indicativa;
- Maisotti non renderizzati finché pending.

Lo script statico deve usare una allowlist esplicita per i report storici e non ignorare genericamente tutto Markdown del repository: i nuovi documenti operativi devono restare coerenti.

### 12.4 Nuovi test UX/a11y

- primo viewport contiene H1, Ottofile, Cherasco e immagine reale;
- catalogo entro il 45% dell'altezza documento;
- La Maisèra non oltre seconda card su mobile;
- nessuna card prodotto ha area immagine, titolo o CTA più grande delle altre;
- ordine DOM lineare su mobile;
- menu mobile apribile/chiudibile da tastiera, focus gestito e Escape supportato se è un dialog/menu custom;
- ogni immagine informativa ha alt non vuoto; decorazioni hanno alt vuoto;
- nessun alt attribuisce persona, luogo o processo non verificato;
- focus visibile su corallo, crema e petrolio;
- contrasto testo/CTA verificato nei due campi cromatici;
- screen reader: landmark e heading outline senza salti;
- con JavaScript disabilitato le CTA anchor e i mailto approvati restano azionabili.

### 12.5 Comandi finali

Eseguire nell'ordine:

```text
npm run format:check
npm run lint
npm run typecheck
npm run build
npm run test:browser
npm run verify
```

`npm run verify` ripete build e test ma resta il comando finale unico. Aggiungere il nuovo `audit:public` alla catena `verify` dopo che la allowlist è stabilizzata.

## 13. Rischi e mitigazioni

| Rischio | Impatto | Mitigazione |
|---|---|---|
| Master logo pulito assente | Alto | Wordmark testuale + doppia pannocchia separata come soluzione temporanea approvata; go-live del logo bloccato finché manca master |
| Icone correnti contengono vecchio emblema | Critico | Sostituzione nella patch identità, prima di qualunque preview condivisa |
| Packshot correnti incompleti | Alto | Card paritarie tipografiche; niente mockup; go-live completo condizionato al set prodotto |
| Foto La Maisèra troppo piccola | Alto | Usarla come fonte dati, non come hero; richiedere bottiglia reale ad alta risoluzione |
| Contatto/dominio/privacy non approvati | Critico per pubblicazione | CTA anchor durante sviluppo; nessun vecchio dominio; blocco rilascio finché esiste un canale consumer e privacy legale |
| Stato Maisotti contraddittorio | Medio | Omissione automatica via selettore; nessun conteggio fisso |
| CSS da 2.000 righe accoppiato al concept | Alto | Nuove classi di sezione in strato separato, switch pagina, poi rimozione meccanica del CSS morto |
| Nuovo CSS convive con vecchio e crea regressioni | Medio | Namespace/classi nuove, screenshot per patch, pulizia solo dopo switch stabile |
| WebGL/GSAP pesa senza valore | Medio | Non renderizzare prologo; misurare bundle; eliminare sottosistema se non riapprovato |
| Foto raw troppo pesanti | Alto | Derivati AVIF/WebP, dimensioni corrette, `sizes`, lazy loading; priority solo LCP |
| Foto autentiche attribuite a luogo/processo sbagliato | Alto | Registry con `subjectVerified`, `locationVerified`, `personVerified`; alt descrive soltanto ciò che si vede |
| Informazioni legali incomplete | Critico per go-live | Footer condizionato e publication gate; mai usare “campi ai piedi di Cherasco” come sede |
| JSON-LD amplifica dati non approvati | Alto | Costruirlo dai selettori pubblici; niente `Offer`, indirizzo o contatto pending |
| Font non licenziati | Alto | League Spartan OFL; conservare licenza; nessun subset/OnlineWebFonts |
| Redesign torna a essere concept autonomo | Alto | Criteri testabili: foto reale al primo viewport, pack entro due viewport, prodotti entro 45%, nessun motion necessario |

## 14. Rollback

### 14.1 Principio

Il rollback è per workstream, non un ritorno allo stato iniziale. I commit che rimuovono identità e contenuti vietati sono irreversibili dal punto di vista del rilascio: un revert tecnico che li reintroduce non è un rollback accettabile.

### 14.2 Meccanica

1. Un commit per patch/gate, con build e test registrati.
2. Prima della nuova architettura, mantenere un adapter compatibile in `site.ts` così la migrazione dati può essere verificata separatamente.
3. Lo switch di `page.tsx` avviene in un commit singolo.
4. Asset nuovi usano nomi nuovi; non sovrascrivere in-place file serviti e cacheabili.
5. CSS nuovo viene aggiunto prima di rimuovere il vecchio; la pulizia è una patch separata.
6. Codice WebGL e vecchi asset non vengono eliminati nello stesso commit dello switch visuale.
7. Se una patch fallisce, si torna all'ultimo gate verde mantenendo applicate Patch 1–3.
8. La rimozione fisica di asset/code avviene solo dopo almeno una suite completa e un audit di referenze.

### 14.3 Fallback sicuro

Se la nuova composizione non supera QA, il fallback non è la landing precedente così com'era. È l'ultimo checkpoint server-rendered che contiene:

- Mais Rosso Co. come unico brand;
- record pubblico filtrato;
- nessun prodotto o claim vietato;
- metadata e icone ripuliti;
- contatto soltanto se approvato.

Il fallback può essere visualmente più semplice, ma non può essere fattualmente regressivo.

## 15. Dipendenze e gate di pubblicazione

### Implementazione non bloccata

- IBU e percentuale di mais della birra;
- formato 0,75 L;
- nomi/località dei partner;
- tempo di cottura;
- metodo agricolo non validato;
- racconto regale, registro 2007, primati;
- ettari e quantità annuali;
- volto di una persona.

Questi campi vengono omessi.

### Go-live bloccato

- master logo/lockup pubblicabile senza vecchio albero;
- almeno un canale consumer pubblico approvato;
- dati legali e privacy necessari;
- icone senza vecchia identità;
- pack/etichette correnti sufficienti a non rappresentare falsamente il catalogo;
- conferma dello stato Maisotti oppure sua omissione approvata;
- licenze font e diritti/attribuzioni media registrati.

## 16. Criteri tecnici di accettazione

1. `Mais Rosso Co.` è l'unico brand commerciale nel DOM, head, manifest, OG, JSON-LD e asset pubblici.
2. La scansione del perimetro pubblico non trova denominazione precedente, relativi domini/handle, prodotto escluso o vecchia birra.
3. Icon e apple icon non contengono il vecchio albero né microtesti obsoleti.
4. Hero server-rendered con H1, materia, territorio, foto reale e CTA.
5. Catalogo data-driven senza conteggio fisso, prezzi storici o campi vuoti.
6. La Maisèra usa lo stesso componente e lo stesso peso delle altre referenze.
7. Coltivazione diretta, partner specializzati e responsabilità finale sono distinguibili.
8. `facts.ts` non può esporre al rendering uno stato non pubblico senza fallire typecheck/test.
9. Ogni media pubblico ha fonte, dimensioni, diritti, crop e stato.
10. Nessun asset AI è registrato come documentario.
11. Un solo H1; heading outline, landmark, alt e `<dl>` corretti.
12. Tastiera, focus, target, reduced motion, Save-Data, no-JS e deep link passano.
13. Nessun overflow o sovrapposizione a 320, 390, 768, 1280, 1440 e 1920 px.
14. Immagine LCP dimensionata e prioritaria; resto lazy; nessun font remoto.
15. Metadata e JSON-LD non contengono dati legali/commerciali non approvati.
16. `format:check`, lint, typecheck, build, Playwright e audit pubblico passano.
17. Il codice non contiene componenti, script, font o asset runtime inutilizzati dopo la pulizia finale.

## 17. Decisione conclusiva

La via tecnica corretta è preservare il motore e cambiare il contratto. Il frontend attuale è robusto perché contenuto, media e componenti sono già separati; è fragile perché la pubblicabilità è implicita e motion, layout e narrazione condividono lo stesso numero magico.

Il redesign deve rendere esplicite tre regole nel codice:

1. un fatto non approvato non arriva al componente;
2. un'immagine non verificata non diventa documentazione;
3. una scelta creativa non determina quante verità il brand deve raccontare.

Con questa migrazione il progetto mantiene accessibilità, performance, responsive, semantica e qualità del motion, ma il rollback e i test proteggono finalmente il brand reale prima del concept.
