# Mais Rosso Co.

Landing editoriale e commerciale di Mais Rosso Co., piccola azienda agricola piemontese che coltiva Mais Rosso Ottofile varietà Albese nei campi ai piedi di Cherasco.

Il progetto usa fotografia reale, dati con provenienza esplicita e un sistema visuale derivato dai materiali cliente. I componenti possono renderizzare soltanto fatti marcati come pubblici dai selettori del record di verità.

## Stack

- Next.js 16 App Router e React 19;
- TypeScript in modalità strict;
- CSS authored con token locali;
- League Spartan self-hosted con licenza OFL;
- `next/image` e Sharp per i derivati fotografici;
- Playwright per QA responsive, accessibilità e policy contenuti.

## Avvio locale

Serve una versione di Node.js supportata da Next.js 16.

```bash
npm install
npm run dev
```

Il server di sviluppo risponde su `http://localhost:3000`.

## Comandi

```bash
npm run dev           # sviluppo locale
npm run build         # build di produzione
npm run start         # server di produzione
npm run lint          # ESLint
npm run typecheck     # TypeScript senza emit
npm run format        # Prettier write
npm run format:check  # controllo Prettier
npm run audit:public  # policy su brand, claim e contenuti pubblici
npm run test:browser  # Playwright sulla build servita
npm run verify        # formattazione, lint, tipi, audit, build e browser QA
```

## Architettura

```text
src/
  app/                 route, metadata e stile globale
  assets/fonts/        font locali e licenze
  components/          componenti server e piccoli enhancer client
  content/             fonti, fatti, selettori, copy e registry media
  lib/                 font loading e utility tecniche
  styles/              token e CSS dei componenti
public/images/brand/   derivati web approvati
scripts/               audit e acquisizioni QA
tests/                 verifiche Playwright
docs/redesign/         analisi specialistiche e master plan
```

`src/content/facts.ts` conserva i fatti con fonte, data, stato e pubblicabilità. `src/content/selectors.ts` è l'unico confine ammesso tra record grezzo e interfaccia pubblica. Copy, metadata e dati strutturati non devono duplicare o amplificare informazioni non approvate.

La pagina è server-rendered per impostazione predefinita. Motion e menu mobile sono progressive enhancement: contenuti, catalogo, anchor e contatti restano utilizzabili senza JavaScript e con reduced motion.

## Asset

I master cliente non vengono sovrascritti. Il runtime usa derivati nuovi e ottimizzati, registrati con fonte, crop, dimensioni e livello di verifica. Immagini generate non possono essere presentate come documentazione dell'azienda; mockup e pack obsoleti non sostituiscono packshot mancanti.

## Verifica prima del rilascio

Prima del go-live vanno confermati:

- logo o wordmark definitivo;
- packshot correnti;
- recapito consumer pubblico;
- dati legali, privacy e dominio canonico;
- stato di eventuali prodotti ancora contraddittori nel materiale cliente.

Il dettaglio delle decisioni e dei gate è in `docs/redesign/00-redesign-master-plan.md`.
