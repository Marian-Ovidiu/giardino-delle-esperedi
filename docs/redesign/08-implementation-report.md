# Mais Rosso Co. — Implementation report

## Esito

L'evoluzione strutturata è stata implementata e verificata. La landing è passata da una narrazione centrata sul concept editoriale a una presenza riconoscibile come Mais Rosso Co., mantenendo rendering server, accessibilità, responsive, semantica e progressive enhancement.

Il gate tecnico finale è verde. Il progetto è pronto per revisione cliente; il go-live resta condizionato ai dati elencati nell'ultima sezione.

## Agenti eseguiti

| Agente | Ambito | Esito |
|---|---|---|
| 0 — Brand Redesign Lead | coordinamento, master plan, integrazione, cleanup, QA visuale | completato |
| 1 — Brand Asset & Identity Analyst | logo, palette, font, packaging e licenze | completato |
| 2 — Content Truth & Product Analyst | record di verità, prodotti, claim e contatti | completato |
| 3 — Photography & Media Director | inventario e piano fotografie | completato |
| 4 — Information Architecture & UX Strategist | nuova gerarchia e comportamento responsive | completato |
| 5 — Visual System & Art Direction Designer | sistema visuale e implementazione UI | completato |
| 6 — Copy & Conversion Strategist | copy consumer, prodotti e conversione | completato |
| 7 — Technical Preservation & Implementation Planner | piano tecnico, dati e suite QA | completato |

Il workstream media di implementazione è stato finalizzato dal Lead dopo aver risolto il percorso dei master raw; selezione e criteri restano quelli prodotti dall'Agente 3.

## File documentali prodotti

- `docs/redesign/00-redesign-master-plan.md`;
- `docs/redesign/01-brand-identity-extraction.md`;
- `docs/redesign/02-content-source-of-truth.md`;
- `docs/redesign/03-photography-media-plan.md`;
- `docs/redesign/04-information-architecture.md`;
- `docs/redesign/05-visual-system-art-direction.md`;
- `docs/redesign/06-copy-conversion.md`;
- `docs/redesign/07-implementation-plan.md`;
- `docs/redesign/08-implementation-report.md`.

I report storici sono rimasti invariati.

## Decisioni consolidate

- `Mais Rosso Co.` è l'unico brand commerciale pubblico.
- Il vecchio albero e il sigillo non sono pubblicati.
- P0 usa un wordmark League Spartan e icone temporanee testuali `MR`.
- La palette digitale deriva dai valori estratti dai materiali cliente.
- Il catalogo pubblico contiene Farina, La Maisèra, Maisette e Maissini, con pari gerarchia.
- La Maisèra è seconda nell'ordine mobile e usa i dati dell'etichetta recente.
- Maisotti restano omessi perché lo stato documentale è contraddittorio.
- Amaro del Dottore e la referenza birra storica sono esclusi.
- La filiera distingue coltivazione diretta, selezione, partner specializzati e responsabilità finale.
- Non sono pubblicati prezzi, ettari, quantità, IBU, 0,75 L o claim non confermati.
- Il consumatore consapevole è il pubblico primario; il percorso professionale è secondario.

## Modifiche implementate

### Dati e copy

- introdotti `SourceRef`, `Fact<T>`, stati, fonti e flag di pubblicabilità;
- creati selettori che impediscono ai fatti non pubblicabili di raggiungere l'interfaccia;
- creato catalogo P0 data-driven a quattro prodotti;
- applicato il copy consolidato a hero, materia, campo, filiera, prodotti, custodia e contatti;
- creati mailto consumer e professionale senza promesse di stock o risposta;
- JSON-LD limitato a dati brand confermati.

### Identità e SEO

- aggiornati title, description, Open Graph, Twitter, manifest e package identity;
- rimossi vecchio dominio e vecchi recapiti;
- create icon e apple icon P0 senza vecchio emblema;
- sostituita l'immagine Open Graph con fotografia reale;
- mantenuto intenzionalmente assente `metadataBase` fino alla conferma del dominio.

### Media e font

- integrato League Spartan locale con licenza OFL;
- creati sei derivati web reali: hero, pannocchia, chicchi/farina, campo, raccolto ed etichetta La Maisèra;
- registrati fonte, crop, diritti e limiti di attribuzione;
- esclusi dal runtime asset AI documentari, pack obsoleti e vecchi marchi;
- Maisette e Maissini usano slot tipografici onesti finché mancano packshot puliti.

### Architettura e UI

- nuova sequenza: Header → Hero → Materia → Campo/filiera → Prodotti → Custodia → Contatti;
- foto reale e materia prima nel primo viewport;
- quattro card prodotto paritarie;
- nuovo sistema 12/8/4 colonne con palette corallo, crema e petrolio;
- inversione finale preservata;
- menu mobile nativo e utilizzabile senza JavaScript;
- target interattivi portati ad almeno 44 px;
- motion ridotto a IntersectionObserver e CSS, con reduced motion e Save-Data.

### Cleanup

- ritirati route preview, WebGL, rail, prologo, pin, timeline e componenti legacy;
- rimossa la dipendenza GSAP non più usata;
- font, immagini e script legacy spostati in `assets/archive/runtime-legacy/`, quindi recuperabili ma fuori dal runtime;
- aggiornati README, package slug e comandi;
- creato `scripts/check-public-content.mjs` e aggiunto a `npm run verify`.

## Verifiche eseguite

Comando finale:

```text
npm run verify
```

Esito:

- Prettier: superato;
- ESLint: superato;
- TypeScript: superato;
- audit del perimetro pubblico: superato su 29 file testuali;
- build Next.js 16.2.12: superata;
- route pubbliche: `/`, icon, apple icon, manifest e Open Graph; nessuna route preview;
- Playwright: 36 passed, 12 skip condizionali previsti, 0 failed.

Copertura Playwright:

- unico H1 e brand pubblico;
- primo viewport con Ottofile, Cherasco e fotografia reale;
- quattro prodotti e ordine mobile;
- filiera e blacklist dei claim;
- DOM, head, manifest e JSON-LD;
- contatti e anchor;
- target 44 px e menu da tastiera;
- reduced motion, no-JS e deep link;
- caricamento media;
- overflow a 320, 390, 768, 1440 e 1920 px;
- errori console ed eccezioni client.

Sono state inoltre ispezionate catture full-page desktop, tablet e mobile, sia a pagina iniziale sia dopo il caricamento lazy delle immagini.

## Problemi residui

- Il wordmark P0 e l'icona `MR` sono una soluzione sicura ma temporanea, non un nuovo logo definitivo.
- L'etichetta La Maisèra è corretta ma a risoluzione limitata e non sostituisce un packshot bottiglia.
- Maisette e Maissini non hanno ancora packshot puliti; il sito evita mockup e mostra slot tipografici.
- La mancanza di `metadataBase` produce un warning non bloccante in build; viene risolta con il dominio canonico.
- I recapiti pubblici sono documentati ma richiedono conferma finale del cliente.
- I file di cattura QA sono materiale di revisione e non fanno parte del runtime.

## Dati ancora da ricevere o confermare

Prima del go-live servono:

1. logo o approvazione esplicita del wordmark P0;
2. packshot correnti di Farina, Maisette, Maissini e bottiglia La Maisèra;
3. conferma di email, telefono e profilo Instagram come recapiti consumer;
4. ragione sociale completa, P. IVA e sede legale;
5. privacy policy e dominio canonico;
6. conferma dell'omissione di Maisotti o stato commerciale definitivo;
7. conferma dei diritti/attribuzioni nel registro media finale.

IBU, percentuale di mais, formato 0,75 L, nomi dei partner, ettari, quantità e prezzi non sono necessari per pubblicare questa P0: restano omessi finché non vengono confermati.
