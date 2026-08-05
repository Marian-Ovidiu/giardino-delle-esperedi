# Mais Rosso Co. — Copy & Conversion

Data: 5 agosto 2026  
Responsabile: Agente 6 — Copy & Conversion Strategist  
Stato: proposta quasi definitiva pre-implementazione, soggetta al consolidamento del Brand Redesign Lead

## 1. Ruolo del documento

Questo documento traduce il record di verità e la nuova architettura in copy pubblico. Le fonti operative sono:

- `docs/redesign/02-content-source-of-truth.md`;
- `docs/redesign/04-information-architecture.md`;
- `docs/brand-audit-materiali-cliente.md`, in particolare §§3, 5–7 e 12;
- `docs/landing-brand-gap-analysis.md`, in particolare §§6–9;
- i contenuti correnti in `src/content/site.ts` e `src/content/facts.ts`, consultati solo per individuare formulazioni da conservare o superare.

Il copy qui definito non colma i vuoti del record con frasi persuasive. Quando un'informazione non è pubblicabile, la soluzione è ometterla e lasciare che il layout si ricomponga. Non sono previste diciture pubbliche come “da confermare”, “in arrivo” o “scheda incompleta”.

## 2. Principi di voce approvati

### 2.1 Voce

Mais Rosso Co. parla in prima persona plurale quando descrive il proprio lavoro e in forma diretta quando invita il visitatore ad agire.

La voce è:

- calda, perché parte dal campo e dal cibo;
- concreta, perché nomina materia, luoghi, tempi e lavorazioni;
- competente, perché distingue ciò che viene coltivato direttamente da ciò che viene trasformato con partner specializzati;
- contemporanea, perché usa frasi pulite e non imita né un disciplinare né una marca rurale d'epoca;
- sensoriale soltanto quando colore, consistenza o profilo sono documentati;
- sobria nella vendita: orienta alla disponibilità senza fingere uno shop o un listino corrente.

### 2.2 Lessico proprietario da privilegiare

`Mais Rosso Ottofile`, `varietà Albese`, `chicco`, `granella`, `pannocchia`, `otto file`, `campo`, `semina`, `raccolto`, `annata`, `macinata a pietra`, `integrale`, `sottovuoto`, `ricetta`, `partner specializzati`, `disponibilità`.

Questi termini devono avere precedenza su aggettivi generici come “autentico”, “genuino”, “unico”, “eccellente”, “premium” o “innovativo”. La qualità emerge dai fatti e dal prodotto, non da un superlativo.

### 2.3 Regole sintattiche

- Frasi prevalentemente tra 8 e 22 parole.
- Un concetto verificabile per frase quando si parla di luogo o filiera.
- Prima persona sobria, senza trasformare la piccola scala in folklore.
- Nessun maiuscolo promozionale, punto esclamativo o domanda retorica ornamentale.
- Titoli concreti: materia, campo, trasformazione, prodotto, disponibilità.
- Dati tecnici separati dal racconto sensoriale, idealmente in `<dl>`.
- “Direttamente” qualifica soltanto la coltivazione.

### 2.4 Espressioni da non reintrodurre

- la denominazione commerciale precedente, anche come firma o nota storica;
- la referenza esclusa e la vecchia referenza birra;
- formule che fanno pensare a una filiera interamente interna o priva di passaggi esterni;
- claim salute, ambientali, biologici o gluten free non approvati;
- primati, classifiche di rischio, iscrizioni a registri o racconti regali non documentati;
- ettari, rese e quantità fisse;
- prezzi non correnti;
- “prodotti stagionali”;
- “tradizione e innovazione”, “massima qualità”, “eccellenza unica” e formule equivalenti;
- metacopy sul registro, sulle schede, sulle colonne o sul design della pagina;
- negazioni difensive come “questo non è un catalogo”.

## 3. Messaggio centrale

### Formula interna di posizionamento

> Mais Rosso Co. è una piccola azienda agricola piemontese che coltiva direttamente il Mais Rosso Ottofile varietà Albese ai piedi di Cherasco, ne seleziona la materia prima e segue ricette, qualità e prodotto finale, affidando a partner specializzati le trasformazioni che richiedono competenze dedicate.

Questa è una formula strategica completa, non il testo da ripetere integralmente in ogni sezione.

### Promessa pubblica breve

> Un mais piemontese riconoscibile, coltivato ai piedi di Cherasco e trasformato in una gamma concreta.

La formula non suggerisce una disponibilità permanente e può essere usata nei metadata o negli spazi molto brevi.

## 4. Navigazione e microcopy globale

### Header

| Elemento | Copy pubblico | Destinazione |
|---|---|---|
| Brand testuale accessibile | `Mais Rosso Co.` | `#inizio` |
| Link 1 | `Il mais` | `#il-mais` |
| Link 2 | `Dal campo` | `#dal-campo` |
| Link 3 | `Prodotti` | `#prodotti` |
| Link 4 | `Contatti` | `#contatti` |
| CTA | `Verifica disponibilità` | `#contatti` |

### Accessibilità e menu mobile

- Pulsante chiuso: `Apri il menu`.
- Pulsante aperto: `Chiudi il menu`.
- Etichetta nav: `Navigazione principale`.
- Skip link: `Vai al contenuto`.
- Il logo grafico è decorativo se accanto compare il nome testuale; in caso contrario il nome accessibile è `Mais Rosso Co.`.

La CTA mantiene sempre la stessa formulazione. Non alternare “Contattaci”, “Scrivici”, “Scopri come acquistare” e “Richiedi disponibilità” nello stesso percorso.

## 5. Copy definitivo per blocco

## 5.1 Hero — `#inizio`

### Copy pubblico

**Sovratitolo**  
`Piccola azienda agricola piemontese`

**H1**  
`Mais Rosso Co.`

**Testo principale**  

> Coltiviamo direttamente il Mais Rosso Ottofile varietà Albese nei campi ai piedi di Cherasco. Ne selezioniamo la materia prima e seguiamo qualità, ricette e prodotto finale.

**Riga di gamma**  

> Farina, gallette, grissini e birra agricola: lavorazioni diverse intorno allo stesso mais.

**CTA primaria**  
`Scopri i prodotti` → `#prodotti`

**CTA secondaria**  
`Verifica disponibilità` → `#contatti`

**Microdato facoltativo**  
`Semina in primavera · raccolta indicativamente a settembre`

Il microdato può essere omesso nei viewport in cui sovraccarica la hero, ma non deve essere abbreviato in date assolute.

### Perché questa formulazione

- Il brand è il soggetto dell'H1; la materia prima compare nella prima frase.
- “Coltiviamo direttamente” è limitato al fatto confermato.
- La riga di gamma non afferma che i prodotti siano composti soltanto di mais.
- Luogo, prodotti e due azioni utili sono comprensibili nel primo viewport.

## 5.2 Materia prima — `#il-mais`

### Copy pubblico

**Sovratitolo**  
`La materia prima`

**H2**  
`Rosso nel chicco, Ottofile nella pannocchia`

**Corpo**  

> Il Mais Rosso Ottofile varietà Albese è un antico mais piemontese. La granella è vitrea e arrotondata, con un colore tra l'arancio bruciato e il bordeaux. La pannocchia dispone tipicamente i chicchi su otto file.

> Dopo la diffusione degli ibridi ad alta resa, questa varietà è stata riportata in coltivazione. Oggi è il centro del lavoro di Mais Rosso Co.

**Dati**

| Etichetta | Valore |
|---|---|
| Origine | `Antico mais piemontese` |
| Chicco | `Vitreo · arrotondato` |
| Colore | `Arancio bruciato · bordeaux` |
| Pannocchia | `Tipicamente otto file` |

**Link di prosecuzione**  
`Vedi cosa ne nasce` → `#prodotti`

### Nota editoriale sull'otto

L'espressione “tipicamente otto file” è più accurata di slogan assoluti. Il numero può essere evidenziato visualmente, ma il copy non parla mai di otto sezioni, 64 segni o altre regole della pagina.

## 5.3 Campo, annata e trasformazioni — `#dal-campo`

### Sottoblocco A — territorio e calendario

**Sovratitolo**  
`Il campo`

**H2**  
`Ai piedi di Cherasco, secondo il ritmo dell'annata`

**Corpo**  

> I nostri campi si trovano ai piedi di Cherasco. La semina avviene in primavera, indicativamente a maggio; il raccolto arriva indicativamente a settembre.

> Superficie e quantità cambiano di anno in anno. Anche la disponibilità dei prodotti segue l'andamento dell'annata.

**Dati**

| Etichetta | Valore |
|---|---|
| Territorio | `Ai piedi di Cherasco` |
| Semina | `In primavera · indicativamente a maggio` |
| Raccolta | `Indicativamente a settembre` |
| Disponibilità | `Legata all'andamento dell'annata` |

Non aggiungere “a mano”, “in purezza”, “al sole”, una superficie o una resa finché il record non li rende pubblicabili.

### Sottoblocco B — responsabilità di filiera

**Sovratitolo**  
`Le trasformazioni`

**H3**  
`Coltiviamo qui. Seguiamo ogni trasformazione.`

**Corpo**  

> Coltiviamo direttamente il nostro Ottofile e selezioniamo la materia prima. Quando una lavorazione richiede competenze dedicate, ci affidiamo a partner specializzati. Seguiamo la qualità, le ricette e il prodotto finale.

**Sequenza di responsabilità**

1. **Coltiviamo**  
   `Il Mais Rosso Ottofile cresce nei nostri campi, dalla semina al raccolto.`
2. **Selezioniamo**  
   `Scegliamo la materia prima destinata alle diverse ricette.`
3. **Lavoriamo con competenze dedicate**  
   `La macinazione a pietra e le altre trasformazioni necessarie vengono affidate a partner specializzati.`
4. **Seguiamo**  
   `Qualità, ricette e prodotto finale restano sotto la responsabilità di Mais Rosso Co.`

**Link di prosecuzione**  
`Scopri i prodotti` → `#prodotti`

### Nota di precisione

“Le altre trasformazioni necessarie” evita un elenco incompleto o l'impressione che il solo passaggio esterno sia la macinazione. La birrificazione può essere nominata nella scheda di La Maisèra, dove è contestualizzata. Non usare una linea grafica continua “semina → bottiglia” se il testo non rende visibile il passaggio ai partner.

## 5.4 Gamma — `#prodotti`

### Apertura della sezione

**Sovratitolo**  
`I prodotti`

**H2**  
`L'Ottofile, in lavorazioni diverse`

**Introduzione**  

> Una gamma costruita intorno alla stessa materia prima, con ricette e ingredienti diversi. Dal chicco alla farina, dalle gallette ai grissini, fino alla birra agricola.

Non indicare il numero totale delle referenze. Il copy e il layout devono restare corretti anche quando cambia lo stato commerciale di un prodotto.

### Ordine e parità

Ordine iniziale raccomandato: Farina, La Maisèra, Maisette, Maissini. Le quattro card hanno lo stesso peso. L'ordine permette di mostrare presto l'ampiezza delle trasformazioni, non crea un prodotto eroe.

### Card — Farina di Mais Rosso Ottofile

**Nome**  
`Farina di Mais Rosso Ottofile integrale`

**Specificazione**  
`Varietà Albese`

**Descrizione**  

> Dal mais coltivato nei nostri campi, una farina integrale macinata a pietra e confezionata sottovuoto in vaso di vetro.

**Dati pubblici**

| Etichetta | Valore |
|---|---|
| Formato | `500 g` |
| Lavorazione | `Integrale · macinata a pietra` |
| Confezione | `Vaso in vetro sottovuoto` |

**CTA visiva**  
`Verifica disponibilità`

**Nome accessibile della CTA**  
`Verifica disponibilità — Farina di Mais Rosso Ottofile`

Non indicare tempi di cottura, ingredienti regolatori, allergeni o porzioni prima della validazione della scheda corrente.

### Card — La Maisèra 8file

**Nome**  
`La Maisèra 8file`

**Specificazione**  
`Birra agricola al Mais Rosso Ottofile “Albese”`

**Descrizione**  

> Una Bière de Garde — Farmhouse non filtrata. Il Mais Rosso Ottofile coltivato nei nostri campi è un ingrediente caratterizzante della ricetta.

**Nota sensoriale**  

> Calda e rustica, con note di tostato, crosta di pane e un leggero richiamo al miele.

**Nota di trasformazione**  

> Birrificata e confezionata con un partner specializzato.

**Dati pubblici**

| Etichetta | Valore |
|---|---|
| Stile | `Bière de Garde · Farmhouse` |
| Formato | `33 cl` |
| Gradazione | `7% vol.` |
| Ingredienti | `Acqua · malto d'orzo · farina integrale di Mais Rosso Ottofile “Albese” · luppolo · lievito` |
| Contiene | `Cereali con glutine` |

**CTA visiva**  
`Verifica disponibilità`

**Nome accessibile della CTA**  
`Verifica disponibilità — La Maisèra 8file`

Non pubblicare IBU, percentuale di mais, formato 75 cl, primati o prezzo finché non vengono confermati.

### Card — Maisette

**Nome**  
`Maisette`

**Specificazione**  
`Gallette di Mais Rosso Ottofile integrale, varietà Albese`

**Descrizione**  

> Gallette ottenute dal Mais Rosso Ottofile coltivato nei nostri campi, nel formato da 120 g e in monoporzione da 18 g.

**Dati pubblici**

| Etichetta | Valore |
|---|---|
| Formati | `120 g · monoporzione 18 g` |
| Materia prima | `Mais Rosso Ottofile integrale` |

**CTA visiva**  
`Verifica disponibilità`

**Nome accessibile della CTA**  
`Verifica disponibilità — Maisette`

Non usare claim gluten free. Ingredienti e allergeni completi entrano soltanto dopo la validazione dell'etichetta definitiva.

### Card — Maissini

**Nome**  
`Maissini`

**Specificazione**  
`Grissini con farina di Mais Rosso Ottofile varietà Albese`

**Descrizione**  

> Una ricetta da forno con farina di Mais Rosso Ottofile. Contiene frumento e malto d'orzo.

**Dati pubblici**

| Etichetta | Valore |
|---|---|
| Legame con il mais | `Con farina di Mais Rosso Ottofile` |
| Contiene | `Frumento · malto d'orzo` |

**Campo condizionato**  
`Formato · 200 g` può essere aggiunto solo dopo verifica sul pack corrente.

**CTA visiva**  
`Verifica disponibilità`

**Nome accessibile della CTA**  
`Verifica disponibilità — Maissini`

Non definirli “grissini di mais” né suggerire che la lavorazione avvenga in un forno aziendale.

### Stato Maisotti

Maisotti non ricevono copy pubblico in questa versione. Non compaiono come card, teaser, placeholder, prodotto futuro o voce nel totale. Se il cliente ne conferma lo stato attivo, la scheda deve essere scritta a partire da pack e dati correnti; non va riattivato automaticamente il testo storico.

### Microcopy comune alle card

- Label immagine, se utile agli screen reader: nessuna; l'`alt` descrive il pack.
- Label tecnica: `Formato`, `Lavorazione`, `Contiene`, `Stile`, `Gradazione`.
- CTA visuale comune: `Verifica disponibilità`.
- Oggetto della richiesta: il nome esatto del prodotto viene aggiunto al mailto.

Non usare badge “artigianale”, “premium”, “novità”, “stagionale”, “disponibile” o “esaurito” senza un dato commerciale aggiornato.

## 5.5 Custodia concreta — `#custodia`

### Copy pubblico

**Sovratitolo**  
`La continuità`

**H2**  
`Il campo non produce sempre allo stesso modo`

**Corpo**  

> Coltivare una varietà significa misurarsi con ogni annata. Seminiamo in primavera e raccogliamo indicativamente a settembre; quantità e disponibilità cambiano con il campo.

> Per noi custodire il Mais Rosso Ottofile significa continuare a coltivarlo e portarlo in prodotti concreti, da conoscere e scegliere.

**CTA**  
`Verifica disponibilità` → `#contatti`

### Variante breve, se il blocco deve essere compresso

> Ogni annata ha il suo raccolto. Continuiamo a coltivare il Mais Rosso Ottofile e la disponibilità segue ciò che il campo produce.

Usare la versione completa oppure la variante, non entrambe. La versione completa è raccomandata perché mantiene il valore della custodia senza ricreare un climax museale.

## 5.6 Contatti e conversione — `#contatti`

### Percorso principale — consumatore

**Sovratitolo**  
`Informazioni e disponibilità`

**H2**  
`Quale prodotto ti interessa?`

**Corpo**  

> Indica il prodotto e la quantità di interesse. Possiamo verificare la disponibilità legata all'annata e darti le informazioni utili.

**CTA primaria**  
`Verifica disponibilità`

**Riga di supporto**  
`Nella richiesta indica prodotto e quantità di interesse.`

La CTA diventa un mailto soltanto quando l'indirizzo pubblico viene approvato. Durante l'implementazione può restare un anchor al blocco contatti; non pubblicare indirizzi provvisori o appartenenti alla denominazione precedente.

### Percorso secondario — professionisti

**H3**  
`Informazioni per la tua attività`

**Corpo**  

> Se lavori nella ristorazione, in una gastronomia o in un negozio, indica la tua attività, le referenze e le quantità di interesse.

**CTA secondaria**  
`Richiedi informazioni professionali`

Non promettere listini, campioni, minimi, rete distributiva o tempi di risposta. Il tono e il peso visuale di questo percorso restano subordinati al contatto consumer.

### Mailto consumer

**Oggetto**  
`Disponibilità prodotti Mais Rosso Co.`

**Corpo precompilato**

```text
Buongiorno,
vorrei informazioni sulla disponibilità di:

Prodotto:
Quantità indicativa:

Grazie.
```

Se la CTA parte da una card, compilare automaticamente la riga `Prodotto` con il nome della referenza.

### Mailto professionale

**Oggetto**  
`Informazioni professionali — Mais Rosso Co.`

**Corpo precompilato**

```text
Buongiorno,
sono [nome] di [attività].
Vorrei informazioni su:

Referenze:
Quantità indicative:

Grazie.
```

### Dati di contatto e legali

Email, telefono, Instagram, ragione sociale, sede legale, dati fiscali e privacy vengono renderizzati solo dopo la conferma prevista nel record di verità. Non sostituire i dati mancanti con la localizzazione dei campi.

## 5.7 Footer

### Firma di brand

`Mais Rosso Co.`

### Descrizione breve

`Mais Rosso Ottofile varietà Albese, coltivato ai piedi di Cherasco.`

### Link

- `Il mais`
- `Dal campo`
- `Prodotti`
- `Contatti`
- `Instagram`, solo dopo verifica dell'handle
- `Privacy`, solo dopo approvazione dell'URL aggiornato

### Nota legale

Il soggetto legale compare soltanto nel footer legale e soltanto dopo verifica di ragione sociale, indirizzo e dati fiscali. Non diventa un secondo lockup e non compare vicino al logo commerciale.

## 6. Copy per metadata e condivisione

### Metadata principali

**Title**  
`Mais Rosso Co. | Mais Rosso Ottofile ai piedi di Cherasco`

**Description**  
`Mais Rosso Co. coltiva il Mais Rosso Ottofile varietà Albese ai piedi di Cherasco e ne segue farina, gallette, grissini e birra agricola.`

### Open Graph

**Title**  
`Mais Rosso Co. — Mais Rosso Ottofile varietà Albese`

**Description**  
`Un mais piemontese riconoscibile, coltivato ai piedi di Cherasco e trasformato in una gamma concreta.`

**Alt immagine OG**  
`Pannocchie di Mais Rosso Ottofile fotografate nel campo.`

L'alt va adattato all'immagine definitiva. Non attribuire un luogo, una persona o una fase di lavoro che lo scatto non dimostra.

### Dati strutturati

La descrizione dell'organizzazione può riusare:

> Mais Rosso Co. coltiva il Mais Rosso Ottofile varietà Albese nei campi ai piedi di Cherasco e ne segue le trasformazioni in una gamma di prodotti.

Inserire indirizzo, contatti e soggetto legale solo quando i dati sono verificati. Non dichiarare e-commerce, offerte, prezzi, disponibilità di stock o certificazioni.

## 7. Alt text e didascalie

### Regola

L'alt descrive ciò che l'immagine mostra, non il messaggio che il copy vorrebbe provare. Le fotografie decorative hanno `alt=""`; il packaging che identifica una referenza ha un alt informativo. Le didascalie aggiungono contesto solo quando il luogo o il passaggio sono verificati.

### Formule consigliate

| Uso | Alt proposto | Condizione |
|---|---|---|
| Hero con mani e pannocchie | `Pannocchie di Mais Rosso Ottofile tenute tra le mani in un campo.` | Non implica raccolta interamente manuale |
| Dettaglio materia | `Dettaglio dei chicchi rossi disposti sulla pannocchia di Ottofile.` | Lo scatto deve mostrare davvero la disposizione |
| Chicchi e farina | `Granella di Mais Rosso Ottofile accanto alla farina macinata.` | Nessuna attribuzione del luogo di molitura |
| Campo | `File di mais in campo durante la crescita.` | Aggiungere Cherasco solo se il file è localizzato |
| Raccolto in cassette | `Pannocchie di Mais Rosso Ottofile raccolte nelle cassette.` | Non aggiungere quantità o annata non note |
| Farina | `Vaso da 500 g di Farina di Mais Rosso Ottofile integrale.` | Solo pack corrente e leggibile |
| Maisette | `Confezione di Maisette, gallette di Mais Rosso Ottofile.` | Adattare al formato mostrato |
| Maissini | `Confezione di Maissini con farina di Mais Rosso Ottofile.` | Solo pack corrente |
| La Maisèra | `Bottiglia da 33 cl di La Maisèra 8file.` | Etichetta definitiva recente |
| Doppia pannocchia | `Illustrazione di due pannocchie di Mais Rosso Ottofile.` | Usare solo se l'immagine porta informazione; altrimenti `alt=""` |

Non usare negli alt claim, parole come “autentico” o “sostenibile”, né nomi di persone non identificate e autorizzate.

## 8. Microcopy di stato ed errore

Il sito non ha ancora un form confermato; se l'implementazione mantiene soltanto mailto e telefono, non servono stati di invio. Se viene introdotto un form senza nuove dipendenze, usare:

| Stato | Copy |
|---|---|
| Campo obbligatorio | `Completa questo campo.` |
| Email non valida | `Inserisci un indirizzo email valido.` |
| Errore invio | `Non siamo riusciti a inviare la richiesta. Riprova oppure usa il contatto email indicato.` |
| Conferma invio | `Richiesta inviata. Grazie per averci scritto.` |

Non promettere una risposta entro un intervallo non confermato. Se l'email pubblica non è disponibile, non pubblicare un form che non può consegnare la richiesta.

## 9. Matrice di conversione

| Momento | Domanda del visitatore | Risposta del copy | Azione |
|---|---|---|---|
| Hero | Chi siete e che cosa coltivate? | Brand, Ottofile Albese, campi ai piedi di Cherasco | `Scopri i prodotti` |
| Materia | Che cosa rende diverso questo mais? | Colore, granella vitrea, otto file, origine piemontese | `Vedi cosa ne nasce` |
| Campo/filiera | Che cosa fate davvero voi? | Coltivazione e selezione dirette; trasformazioni con partner; responsabilità finale | `Scopri i prodotti` |
| Gamma | Che cosa posso scegliere? | Quattro referenze pubblicabili, pack, legame con il mais e dati confermati | `Verifica disponibilità` |
| Custodia | Perché la disponibilità può cambiare? | Annata, raccolto e continuità della coltivazione | `Verifica disponibilità` |
| Contatti | Come faccio a chiedere? | Prodotto e quantità in una richiesta semplice | Mailto consumer |
| Percorso professionale | Posso contattarvi per la mia attività? | Percorso secondario senza promesse commerciali | Mailto professionale |

La conversione non dipende da prezzo o disponibilità immediata. Dipende dal passaggio chiaro fra interesse per il prodotto e richiesta diretta.

## 10. Campi condizionati e comportamento editoriale

### Necessari prima del go-live

1. Contatto consumer pubblico approvato.
2. Modalità reale di acquisto da comunicare dopo la richiesta.
3. Pack ed etichette correnti di Farina, Maisette e Maissini.
4. Dati legali e privacy obbligatori.
5. Decisione sullo stato commerciale dei Maisotti.

### Omissibili senza indebolire il copy

- prezzo;
- IBU e percentuale di mais della birra;
- formato 75 cl;
- nomi dei partner;
- tempi di cottura;
- metodo agricolo non validato;
- dati annuali di superficie o produzione;
- storia regale e primati;
- persone non ancora identificate o autorizzate.

### Regola di aggiornamento

Ogni nuovo dato entra nel copy soltanto dopo l'aggiornamento del fatto corrispondente con fonte, data, stato, approvazione e flag pubblico. Un dato assente non deve cambiare il tono: semplicemente non viene renderizzato.

## 11. Controllo di coerenza finale

Prima della pubblicazione, verificare che:

- `Mais Rosso Co.` sia l'unico nome commerciale visibile;
- il primo viewport dica brand, materia prima e territorio;
- la fotografia reale arrivi prima di qualunque interpretazione astratta;
- “direttamente” qualifichi soltanto la coltivazione;
- partner specializzati e responsabilità finale siano descritti senza false omissioni;
- La Maisèra abbia la stessa completezza e lo stesso peso delle altre card;
- Maisotti restino assenti finché lo stato è contraddittorio;
- nessun prezzo storico o formato non approvato sia visibile;
- le CTA consumer dominino sul percorso professionale;
- metadata, alt, mailto e footer rispettino lo stesso record del corpo pagina;
- il copy resti comprensibile senza motion, immagini o conoscenza pregressa del brand.

## 12. Decisione conclusiva

La nuova voce non ha bisogno di rendere il marchio più rustico né più solenne. Deve avvicinare le parole alle cose: un mais riconoscibile, un campo reale, tempi agricoli indicativi, trasformazioni dichiarate con onestà e prodotti che il visitatore può identificare e chiedere.

La frase che guida l'intero sistema è:

> Coltiviamo direttamente il mais. Per le competenze che servono lavoriamo con partner specializzati. Su materia prima, ricette, qualità e prodotto finale risponde Mais Rosso Co.
