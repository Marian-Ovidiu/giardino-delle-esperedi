# Mais Rosso Co. — Content Source of Truth

Data di consolidamento: 5 agosto 2026  
Responsabile: Agente 2 — Content Truth & Product Analyst  
Stato: record operativo pre-implementazione; non sostituisce schede tecniche, etichette definitive o documentazione legale

## 1. Scopo e regole di precedenza

Questo documento stabilisce quali informazioni possono alimentare il prossimo sistema contenuti della landing. Non certifica autonomamente dati alimentari, legali o commerciali e non rende pubblicabile un fatto solo perché compare in un documento cliente.

Sono state confrontate integralmente le seguenti fonti:

- decisioni definitive contenute nel brief cliente del 5 agosto 2026;
- `docs/brand-audit-materiali-cliente.md`;
- `docs/landing-brand-gap-analysis.md`;
- i 18 PDF dello ZIP cliente, inclusi brochure, lettera di presentazione, ricerca esterna, logo e progetti di etichetta;
- l'etichetta fotografata di La Maisèra ricevuta il 28 luglio 2026;
- gli altri materiali estratti dallo ZIP utili alla verifica di pack, contatti e cronologia;
- `src/content/facts.ts`, `src/content/site.ts` e la documentazione interna esistente, usati come inventario delle affermazioni correnti, non come fonte superiore ai materiali cliente.

In caso di conflitto si applica questa priorità:

1. decisione esplicita del cliente nel brief del 5 agosto 2026;
2. etichetta definitiva più recente del singolo prodotto;
3. documento cliente recente e pertinente al dato;
4. documento cliente precedente;
5. contenuto oggi presente nel repository;
6. interpretazione editoriale.

Una fonte più recente prevale solo nel proprio ambito. Per esempio, l'etichetta recente della birra prevale su una lettera per formato, gradazione, ingredienti e denominazione della birra; non prova invece il canale di vendita dell'intera azienda.

## 2. Stati ammessi

Ogni dato futuro deve usare uno dei seguenti stati, senza sinonimi liberi.

| Stato | Significato operativo | Pubblicabilità predefinita |
|---|---|---|
| `confermato-cliente` | Decisione esplicita contenuta nel brief cliente corrente | Sì, salvo vincoli legali o nota contraria |
| `confermato-documento-recente` | Dato leggibile in un documento o in un'etichetta recente, non contraddetto da una decisione successiva | Sì per copy descrittivo; per dati regolati serve comunque la scheda definitiva |
| `storico` | Dato che fotografa una fase precedente, un vecchio listino, pack o racconto | No, salvo contesto storico chiaramente etichettato e approvato |
| `contraddittorio` | Due fonti pertinenti o una fonte e una dichiarazione cliente non coincidono | No finché non viene risolto |
| `da-richiedere` | Dato assente, incompleto o non sufficientemente provato | No; il layout deve tollerarne l'assenza |
| `non-pubblicabile` | Dato vietato, superato, rischioso o estraneo al perimetro pubblico approvato | No |

`approvedBy` registra un'approvazione reale, non l'autore del documento. Un PDF è una `source`; non è automaticamente un'approvazione. Quando il brief corrente decide il punto, `approvedBy` vale `Cliente — brief 2026-08-05`. Negli altri casi resta `null` finché il cliente o il responsabile autorizzato non approva.

## 3. Registro di verità approvato

### 3.1 Brand e soggetto responsabile

| ID | Value | Source | Source date | Status | Approved by | Public | Notes |
|---|---|---|---|---|---|---:|---|
| `brand.publicName` | `Mais Rosso Co.` | Brief cliente | 2026-08-05 | `confermato-cliente` | Cliente — brief 2026-08-05 | sì | È l'unico nome commerciale pubblico. Deve guidare header, hero, catalogo, footer, metadata, social preview e dati strutturati. |
| `brand.previousName` | Denominazione commerciale precedente | Brief cliente; materiali 2021–2025 | 2026-08-05 | `non-pubblicabile` | Cliente — brief 2026-08-05 | no | Non deve essere usata come sottobrand, firma storica, dicitura di coltivazione, handle, alt text o chiave narrativa. Nei nuovi contenuti operativi va indicata solo come “denominazione precedente”, senza riproporla. |
| `business.legalEntity` | `Az. Agr. Giordano Matteo` | Lettera di presentazione; etichette prodotto | 2026-05-06 | `confermato-documento-recente` | null | condizionato | Può comparire esclusivamente dove necessario per legge o trasparenza. Prima della pubblicazione va verificata la ragione sociale esatta. |
| `business.responsiblePerson` | `Matteo Giordano` | Firma della lettera di presentazione | 2026-05-06 | `confermato-documento-recente` | null | sì | Può sostenere una voce personale se il cliente approva ruolo, forma e fotografie. Non inventare altre persone o una genealogia familiare. |
| `business.kind` | Piccola azienda agricola piemontese | Lettera di presentazione, pp. 1 e 5 | 2026-05-06 | `confermato-documento-recente` | null | sì | “Piccola” è una definizione aziendale documentata; evitare numeri di scala. “Giovane” non va usato senza data di fondazione. |
| `business.vatAndFiscalData` | Non disponibili | Materiali cliente e repository | 2026-08-05 | `da-richiedere` | null | no | Partita IVA/codice fiscale e dati obbligatori sono un blocker di pubblicazione legale, non un campo da ricostruire. |
| `business.legalAddress` | Non determinato | Etichette e documenti con indirizzi differenti | 2026-08-05 | `contraddittorio` | null | no | I documenti citano luoghi diversi per recapito, confezionamento e stabilimenti. Nessuno va presentato come sede legale senza conferma. |

### 3.2 Materia prima e nomenclatura

| ID | Value | Source | Source date | Status | Approved by | Public | Notes |
|---|---|---|---|---|---|---:|---|
| `grain.publicName` | `Mais Rosso Ottofile varietà Albese` | Brief cliente; materiali recenti | 2026-08-05 | `confermato-cliente` | Cliente — brief 2026-08-05 | sì | Forma editoriale consigliata. “Integrale” descrive farina/gallette o uso del chicco, non va aggiunto automaticamente al nome botanico/commerciale della varietà. |
| `grain.companyCultivation` | Mais Rosso Co. coltiva direttamente il proprio Mais Rosso Ottofile | Brief cliente | 2026-08-05 | `confermato-cliente` | Cliente — brief 2026-08-05 | sì | È il centro della proposta di valore. Non estendere la coltivazione diretta ad altri ingredienti. |
| `grain.rows` | Pannocchia tipicamente disposta su otto file di chicchi | Pubblicazione esterna sugli antichi mais piemontesi, p. 68; lettera di presentazione | 2026-05-06 | `confermato-documento-recente` | null | sì | La fonte esterna del 2004 descrive l'Ottofile rosso; la lettera recente conferma il dato aziendale. La fonte esterna non certifica la denominazione “Albese” né l'azienda. |
| `grain.kernel` | Granella vitrea rossa; nei materiali aziendali descritta tra arancio bruciato e bordeaux, di forma arrotondata | Pubblicazione esterna, p. 68; lettera di presentazione | 2026-05-06 | `confermato-documento-recente` | null | sì | Usabile come descrizione visiva/sensoriale, senza convertirla in beneficio salute. |
| `grain.ancientPiedmonteseVariety` | Varietà/ecotipo piemontese antico | Pubblicazione esterna 2004; brochure e lettera | 2026-05-06 | `confermato-documento-recente` | null | sì | Formulazione pubblica prudente: “un antico mais piemontese”. Non attribuire alla fonte esterna la dicitura “Albese”. |
| `grain.recovery` | La varietà è stata riportata in coltivazione dopo essere stata sostituita in larga parte dagli ibridi ad alta resa | Materiali aziendali; fonte esterna sul contesto degli ecotipi | 2026-05-06 | `confermato-documento-recente` | null | sì | Non affermare che Mais Rosso Co. sia l'unico soggetto del recupero o che la coltivi in esclusiva. |
| `grain.extinctionRisk` | “Tra le varietà a maggior rischio di estinzione in Piemonte” | Brochure e lettera aziendali; nessuna prova specifica allegata | 2026-05-06 | `da-richiedere` | null | no | Richiede fonte citabile o riformulazione non classificatoria. |
| `grain.registry2007` | Iscrizione al Registro delle Varietà da Conservazione dal 2007 | Contenuto del repository, non presente nel fascicolo cliente | non disponibile | `da-richiedere` | null | no | Non usare data, denominazione del registro o iscrizione finché non arriva la fonte ufficiale. |
| `grain.royalStory` | Legame con Vittorio Emanuele II, Pollenzo e soprannome regale | Versioni discordanti nei materiali 2021–2026 | 2026-05-06 | `contraddittorio` | null | no | Non deve fondare la nuova narrazione. Eventuale nota storica solo con fonte e formula approvata. |
| `grain.exclusiveGeography` | “Coltivato solo sulle nostre colline” | Presentazione 2021 | 2021-12-16 | `non-pubblicabile` | null | no | L'esclusività non è provata ed è smentita dal contesto esterno sugli Ottofile piemontesi. |

### 3.3 Territorio, calendario e disponibilità

| ID | Value | Source | Source date | Status | Approved by | Public | Notes |
|---|---|---|---|---|---|---:|---|
| `territory.fields` | Campi ai piedi o alle pendici di Cherasco | Brief cliente | 2026-08-05 | `confermato-cliente` | Cliente — brief 2026-08-05 | sì | È una localizzazione dei campi, non la sede legale e non il luogo di ogni trasformazione. |
| `territory.region` | Piemonte, area di Cherasco tra Langhe e Cuneese | Brief cliente; lettera | 2026-08-05 | `confermato-cliente` | Cliente — brief 2026-08-05 | sì | Evitare descrizioni di paesaggio troppo specifiche non mostrate o non provate. |
| `calendar.sowing` | Semina indicativamente a maggio / in primavera | Brief cliente | 2026-08-05 | `confermato-cliente` | Cliente — brief 2026-08-05 | sì | Usare “indicativamente” o “in primavera”; non promettere una data fissa annuale. |
| `calendar.harvest` | Raccolta indicativamente a settembre | Brief cliente | 2026-08-05 | `confermato-cliente` | Cliente — brief 2026-08-05 | sì | Non equivale a “raccolta a mano”, che resta da provare. |
| `production.area` | Superficie variabile secondo l'anno | Brief cliente | 2026-08-05 | `confermato-cliente` | Cliente — brief 2026-08-05 | sì | Non pubblicare ettari fissi. |
| `production.quantity` | Quantità variabile secondo annata e raccolto | Brief cliente | 2026-08-05 | `confermato-cliente` | Cliente — brief 2026-08-05 | sì | Non pubblicare quintali, rese o quantità fisse. |
| `availability.annual` | Disponibilità collegata all'andamento dell'annata | Brief cliente; lettera | 2026-08-05 | `confermato-cliente` | Cliente — brief 2026-08-05 | sì | Formulazione ammessa; non chiamare per questo i prodotti “stagionali”. |
| `catalog.seasonality` | Non esiste un catalogo ufficialmente stagionale | Brief cliente | 2026-08-05 | `confermato-cliente` | Cliente — brief 2026-08-05 | sì | Non applicare badge “stagionale”, “solo inverno” o equivalenti senza nuova decisione. |

### 3.4 Coltivazione e filiera

| Fase | Attribuzione certa | Status | Public | Formulazione ammessa / limite |
|---|---|---|---:|---|
| Coltivazione del mais | Svolta direttamente da Mais Rosso Co. nei campi ai piedi di Cherasco | `confermato-cliente` | sì | “Coltiviamo direttamente il Mais Rosso Ottofile varietà Albese.” |
| Selezione della materia prima | Responsabilità di Mais Rosso Co. | `confermato-cliente` | sì | È ammesso parlare di selezione del mais, senza inventare protocolli o parametri tecnici. |
| Semina | Periodo indicativo confermato; purezza non provata in modo sufficiente | `confermato-cliente` per il periodo; `da-richiedere` per “in purezza” | parziale | Pubblicare il calendario; omettere “in purezza” finché non approvato. |
| Raccolta | Periodo indicativo confermato; modalità manuale non confermata nel brief | `confermato-cliente` per settembre; `da-richiedere` per “a mano” | parziale | Non trasformare una fotografia di mani in prova dell'intero raccolto manuale. |
| Essiccazione | La lettera dichiara essiccazione al sole, ma manca conferma operativa attuale | `da-richiedere` | no | Omettere finché non confermata. |
| Macinazione | Macinazione a pietra svolta conto terzi | `confermato-cliente` | sì | “Farina macinata a pietra.” Non specificare tipo di pietra, mulino o località. |
| Gallette | Trasformazione documentata, attribuzione interna non provata | `da-richiedere` per operatore e processo; il prodotto è confermato | parziale | Si può dire cosa sono; non dire che sono prodotte in azienda. |
| Prodotti da forno | Ricette e controllo del risultato fanno capo a Mais Rosso Co.; lavorazione interna non provata | `confermato-cliente` per responsabilità; `da-richiedere` per operatore | parziale | Parlare di ricetta e materia prima; non di forno aziendale. |
| Birrificazione e confezionamento | Svolti da un operatore terzo secondo l'etichetta recente | `confermato-documento-recente` | sì, in forma non protagonista | “Realizzata con un partner specializzato.” Non dire “prodotta internamente”; il nome del partner si mostra solo dove obbligatorio, per esempio sul retro etichetta. |
| Qualità, ricette e prodotto finale | Responsabilità di Mais Rosso Co. | `confermato-cliente` | sì | È la formula corretta per tenere insieme identità di marca e lavoro conto terzi. |

#### Claim di filiera superati

Le frasi “trasformiamo direttamente in azienda”, “senza intermediari”, “dalla semina alla bottiglia interamente in azienda” e varianti equivalenti sono `non-pubblicabile`. Compaiono in brochure o lettera, ma sono superate dalla decisione cliente che conferma trasformazioni conto terzi, inclusa la macinazione, e dalle indicazioni degli stabilimenti terzi sulle etichette.

La formulazione pubblica consolidata è:

> Mais Rosso Co. coltiva direttamente il Mais Rosso Ottofile varietà Albese, seleziona la materia prima e segue qualità e ricette. Quando una trasformazione richiede competenze dedicate, si affida a partner specializzati e mantiene la responsabilità sul prodotto finale.

Questa frase descrive il modello senza esporre i fornitori come protagonisti e senza nasconderli dietro una falsa produzione integralmente interna.

### 3.5 Metodo agricolo e claim ambientali

| ID | Value | Source | Source date | Status | Approved by | Public | Notes |
|---|---|---|---|---|---|---:|---|
| `method.symbioticAgriculture` | Metodo dichiarato come agricoltura simbiotica | Brochure 2024/2025, etichette, lettera | 2026-05-06 | `da-richiedere` | null | no | Ricorrenza comunicativa non equivale a certificazione. Richiedere definizione operativa, eventuale disciplinare/certificazione e formula autorizzata. Non trasformarlo in “biologico”. |
| `method.sustainability` | Impegno generico su fertilità, biodiversità e funzionalità microbica dei suoli | Materiali aziendali | 2026-05-06 | `da-richiedere` | null | no | Va convertito in pratiche concrete verificabili o omesso; evitare claim ambientali assoluti. |
| `method.noPreservatives` | Claim presente su pack di diversi prodotti | Progetti etichetta 2025; etichetta birra 2026 | 2026-07-28 | `da-richiedere` | null | no come claim di gamma | Validare prodotto per prodotto sulla scheda finale; non estenderlo all'intero catalogo. |
| `method.vegan` | Claim presente su Maisette e La Maisèra | Etichette | 2026-07-28 | `confermato-documento-recente` | null | condizionato | Pubblicare solo per la singola referenza e solo dopo verifica della versione finale dell'etichetta/processo. |

## 4. Catalogo operativo

### 4.1 Regola di gerarchia

I prodotti stanno sullo stesso livello gerarchico. La farina può essere descritta come il prodotto da cui il progetto ha preso avvio solo se questa informazione resta narrativa e non produce una card dominante. La Maisèra è fondamentale e deve avere la stessa completezza visuale, editoriale e commerciale degli altri prodotti. Nessun singolo prodotto deve far sembrare gli altri accessori.

Il catalogo consolidato ha quattro referenze pubblicabili nel perimetro informativo di base e una referenza con stato da risolvere prima della pubblicazione:

1. Farina di Mais Rosso Ottofile;
2. Maisette;
3. Maissini;
4. La Maisèra 8file;
5. Maisotti — presenza documentale recente ma stato commerciale contraddittorio.

Non si deve mostrare un totale numerico rigido nella UI finché lo stato di Maisotti non è risolto.

### 4.2 Farina di Mais Rosso Ottofile

| Campo | Value | Source | Source date | Status | Public | Notes |
|---|---|---|---|---|---:|---|
| Stato catalogo | Referenza attuale | Lettera di presentazione 2026 | 2026-05-06 | `confermato-documento-recente` | sì | Presenza nel documento più recente non contraddetta. |
| Nome pubblico | Farina di Mais Rosso Ottofile integrale, varietà Albese | Lettera; brochure/listino 2025 | 2026-05-06 | `confermato-documento-recente` | sì | Normalizzare maiuscole e punteggiatura, poi allineare al fronte pack definitivo. |
| Legame col mais | Prodotto diretto del Mais Rosso Ottofile coltivato dall'azienda | Brief cliente; documenti | 2026-08-05 | `confermato-cliente` | sì | Non servono altri ingredienti per la definizione editoriale; la lista legale va presa dalla scheda corrente. |
| Lavorazione | Integrale, macinata a pietra | Brief cliente; lettera | 2026-08-05 | `confermato-cliente` | sì | Non specificare il tipo di pietra. La macinazione è conto terzi. |
| Formato | 500 g | Etichetta farina “ok”; brochure/listino; lettera | 2026-05-06 | `confermato-documento-recente` | sì | È il formato coerente nelle fonti recenti; verificare packshot e scheda definitiva prima del go-live. |
| Confezione | Vaso in vetro sottovuoto | Brochure/listino; lettera | 2026-05-06 | `confermato-documento-recente` | sì | Evitare promesse sulla conservazione di oli o nutrienti non provate. |
| Cottura | 30 minuti / 40 minuti / minimo 60 minuti | Fonti diverse | 2026-05-06 | `contraddittorio` | no | Omettere finché il cliente non approva un'istruzione unica. |
| Porzioni | Sei | Etichetta e brochure 2025 | 2025-09-10 | `confermato-documento-recente` | condizionato | Informazione secondaria; validare sul pack finale. |
| Ingredienti/allergeni ufficiali | Scheda corrente non fornita in forma definitiva | Progetti etichetta 2025 | 2025-02-28 | `da-richiedere` | no | Non riciclare automaticamente le tracce allergeniche da una bozza. |
| Prezzo | €5,50 singolo; €10,00 due pezzi | Listino settembre 2025 | 2025-09-10 | `storico` | no | Non pubblicare come prezzo corrente. |

### 4.3 Maisette

| Campo | Value | Source | Source date | Status | Public | Notes |
|---|---|---|---|---|---:|---|
| Stato catalogo | Referenza attuale | Lettera 2026 | 2026-05-06 | `confermato-documento-recente` | sì | Prodotto diretto del mais. |
| Nome pubblico | Maisette — gallette di Mais Rosso Ottofile integrale, varietà Albese | Lettera; brochure/listino | 2026-05-06 | `confermato-documento-recente` | sì | Allineare al pack definitivo. |
| Formati | 120 g e monoporzione 18 g | Lettera 2026; brochure/listino 2025 | 2026-05-06 | `confermato-documento-recente` | sì | La bozza da 90 g è superata/non sufficiente e non va aggiunta. |
| Ingredienti documentati | Mais Ottofile, sale marino integrale, acqua | Progetto etichetta Maisette 2025 | 2025-02-27 | `confermato-documento-recente` | condizionato | Serve etichetta finale corrente prima di pubblicare una lista ingredienti regolatoria. |
| Tracce/allergeni | Possibili tracce di cereali con glutine, senape, soia, nocciole e frutta a guscio | Progetto etichetta 2025 | 2025-02-27 | `da-richiedere` | no | Verificare sulla confezione attuale. |
| “Senza glutine” | Il mais è naturalmente privo di glutine; il prodotto finito non è certificato nel fascicolo | Lettera e bozza etichetta | 2026-05-06 | `non-pubblicabile` | no | Non usare claim gluten free o formule equivalenti sul prodotto finito. |
| Prezzi | 120 g: €3,90 singolo / €9,90 tre; 18 g: 50 pezzi €45,00 | Listino settembre 2025 | 2025-09-10 | `storico` | no | Non pubblicare come corrente. |

### 4.4 Maissini

| Campo | Value | Source | Source date | Status | Public | Notes |
|---|---|---|---|---|---:|---|
| Stato catalogo | Referenza attuale | Lettera 2026 | 2026-05-06 | `confermato-documento-recente` | sì | Non è una galletta e non è un prodotto di solo mais. |
| Nome pubblico | Maissini — grissini con farina di Mais Rosso Ottofile varietà Albese | Lettera; brochure/listino | 2026-05-06 | `confermato-documento-recente` | sì | Preferire “con farina di” a “grissini di mais” per non sovrastimare la composizione. |
| Formato | 200 g | Brochure/listino settembre 2025 | 2025-09-10 | `confermato-documento-recente` | condizionato | La bozza etichetta da 120 g è in conflitto. Il formato 200 g può restare nel record, ma va verificato sul pack corrente prima del go-live. |
| Ingredienti documentati | Farina di frumento tipo 00, farina di Mais Rosso Ottofile varietà Albese, acqua, olio extravergine di oliva, lievito, sale, malto d'orzo | Brochure/listino | 2025-09-10 | `confermato-documento-recente` | condizionato | Per la lista pubblica regolatoria serve etichetta definitiva; non usare i dati copiati della bozza 120 g. |
| Allergeni evidenti | Glutine da frumento e orzo | Ingredienti brochure/listino | 2025-09-10 | `confermato-documento-recente` | sì in forma informativa | La dicitura legale definitiva va validata. |
| Lavorazione | Ricetta seguita da Mais Rosso Co.; produttore materiale da confermare | Brief cliente; etichette conto terzi | 2026-08-05 | `da-richiedere` | parziale | Non dichiarare forno o produzione interna. |
| Prezzo | €3,90 singolo; €9,90 tre pezzi | Listino settembre 2025 | 2025-09-10 | `storico` | no | Non pubblicare come corrente. |

### 4.5 Maisotti

| Campo | Value | Source | Source date | Status | Public | Notes |
|---|---|---|---|---|---:|---|
| Stato catalogo | Presente nei documenti recenti, ma il cliente ha indicato una possibile ripresa dopo consolidamento | Lettera 2026; brief cliente 2026-08-05 | 2026-08-05 | `contraddittorio` | no, fino a conferma | Non classificarlo arbitrariamente come attivo, futuro o cessato. Chiedere una risposta binaria prima della pubblicazione. |
| Nome pubblico | Maisotti — biscotti con farina integrale di Mais Rosso Ottofile varietà Albese e miele | Lettera; brochure/listino | 2026-05-06 | `confermato-documento-recente` | condizionato allo stato | Non sono paste di meliga e non sono biscotti di solo mais. |
| Formato | 250 g | Brochure/listino settembre 2025 | 2025-09-10 | `confermato-documento-recente` | condizionato | La bozza etichetta da 390 g è inattendibile e non va usata. |
| Ingredienti documentati | Farina di mais 26,7%, burro, uovo, farina di frumento, zucchero, miele, sale | Brochure/listino | 2025-09-10 | `confermato-documento-recente` | condizionato | La lista e l'ordine vanno verificati sull'etichetta finale prima del go-live. |
| Allergeni evidenti | Glutine/frumento, latte/burro, uovo | Ingredienti brochure/listino | 2025-09-10 | `confermato-documento-recente` | condizionato | Nessuna dichiarazione vegan o gluten free. |
| Prezzo | €5,50 singolo; €10,00 due pezzi | Listino settembre 2025 | 2025-09-10 | `storico` | no | Non pubblicare come corrente. |

### 4.6 La Maisèra 8file

| Campo | Value | Source | Source date | Status | Public | Notes |
|---|---|---|---|---|---:|---|
| Stato catalogo | Prodotto fondamentale, allo stesso livello delle altre referenze | Brief cliente | 2026-08-05 | `confermato-cliente` | sì | Non trattarla come appendice, novità minore o semplice esperimento. |
| Nome commerciale | `La Maisèra 8file` | Etichetta fotografata più recente | 2026-07-28 | `confermato-documento-recente` | sì | Accento e grafia vanno preservati. La vecchia referenza birra è solo materiale storico interno e non va nominata nel frontend. |
| Denominazione | Birra agricola al Mais Rosso Ottofile “Albese” | Etichetta fotografata più recente | 2026-07-28 | `confermato-documento-recente` | sì | Il mais aziendale è ingrediente caratterizzante, non l'unico ingrediente. |
| Stile | Bière de Garde — Farmhouse | Etichetta fotografata più recente | 2026-07-28 | `confermato-documento-recente` | sì | Usare la grafia dell'etichetta; non aggiungere stile o classificazioni non presenti. |
| Formato principale | 0,33 L / 33 cl | Brief cliente; etichetta | 2026-08-05 | `confermato-cliente` | sì | È il solo formato pubblicabile oggi. |
| Formato 0,75 L | Esistenza o interesse indicato dal cliente | Brief cliente; lettera 2026 | 2026-08-05 | `da-richiedere` | no | Richiedere disponibilità reale, etichetta, gradazione e stato commerciale. |
| Gradazione | 7% vol. | Etichetta fotografata più recente | 2026-07-28 | `confermato-documento-recente` | sì | La vecchia gradazione appartiene a una referenza superata. |
| Ingredienti | Acqua, malto d'orzo, farina integrale di Mais Rosso Ottofile “Albese”, luppolo, lievito | Etichetta fotografata più recente | 2026-07-28 | `confermato-documento-recente` | sì | Mantenere l'ordine dell'etichetta nella scheda tecnica. |
| Allergeni | Prodotta con cereali contenenti glutine | Etichetta fotografata più recente | 2026-07-28 | `confermato-documento-recente` | sì | Esclude qualunque claim gluten free di gamma. |
| Profilo sensoriale | Non filtrata; calda e rustica; note di tostato, crosta di pane e miele leggero | Etichetta fotografata più recente | 2026-07-28 | `confermato-documento-recente` | sì | È copy di etichetta, non valutazione indipendente. Può essere sintetizzato senza superlativi. |
| Deposito | Contiene deposito naturale | Etichetta fotografata più recente | 2026-07-28 | `confermato-documento-recente` | sì | Informazione utile se si mostra una scheda tecnica. |
| Produzione | Birrificazione/confezionamento tramite partner specializzato | Brief cliente; etichetta | 2026-08-05 | `confermato-cliente` | sì | Il produttore terzo non è protagonista, ma non va nascosto con affermazioni false. |
| Percentuale di mais | Non disponibile | Etichetta e materiali | 2026-08-05 | `da-richiedere` | no | Non dire che il mais è “protagonista assoluto” in senso quantitativo. |
| IBU | Non disponibile | Materiali cliente | 2026-08-05 | `da-richiedere` | no | Dato non bloccante: omettere. |
| Primato | “Prima birra prodotta con questa varietà coltivata in purezza” | Lettera 2026, senza prova | 2026-05-06 | `non-pubblicabile` | no | Richiedere prova del primato; non serve alla proposizione commerciale. |
| Prezzo | Non presente | Materiali recenti | 2026-08-05 | `da-richiedere` | no | Omettere; non creare un prezzo per uniformare le card. |

### 4.7 Esclusioni e concept non attivi

| Elemento | Status | Public | Regola |
|---|---|---:|---|
| Amaro del Dottore | `non-pubblicabile` | no | Escluso completamente per decisione cliente. Non entra in catalogo, navigazione, placeholder, roadmap, metadata, CTA o suggerimenti futuri. Può restare soltanto nei report storici già esistenti. |
| Vecchia referenza birra | `storico` / `non-pubblicabile` | no | Materiale superato dalla denominazione e dall'etichetta di La Maisèra. Non trattarla come seconda birra. |
| Maisella | `storico` | no | Concept di etichetta 2025 con ingredienti/nutrizionali incoerenti; assente dai documenti commerciali recenti. |
| Maissnack | `storico` | no | Concept di etichetta 2025 con dati incoerenti; assente dai documenti commerciali recenti. |
| Formato Maisette 90 g | `storico` | no | Simulazione tecnica precedente, superata dai formati 120 g e 18 g riportati nella lettera 2026. |
| Farina 220/390 g | `storico` | no | Formati 2021/bozza 2025, superati dal 500 g nelle fonti recenti. |

## 5. Target, posizionamento e canali

### 5.1 Target principale

| ID | Value | Source | Source date | Status | Approved by | Public | Notes |
|---|---|---|---|---|---|---:|---|
| `audience.primary.age` | Indicativamente 25–60 anni | Brief cliente | 2026-08-05 | `confermato-cliente` | Cliente — brief 2026-08-05 | interno | Guida tono, ritmo e accessibilità; non va dichiarato al visitatore. |
| `audience.primary.profile` | Persone istruite o curiose, attente all'alimentazione, alla provenienza e alle etichette | Brief cliente | 2026-08-05 | `confermato-cliente` | Cliente — brief 2026-08-05 | interno | Parlare con precisione senza tono accademico o salutistico. |
| `audience.primary.household` | Soprattutto coppie e donne single | Brief cliente | 2026-08-05 | `confermato-cliente` | Cliente — brief 2026-08-05 | interno | Indicazione strategica, non stereotipo da esplicitare nel copy o nelle immagini. |
| `audience.primary.value` | Disposti a scegliere qualità e origine, non soltanto il prezzo più basso | Brief cliente | 2026-08-05 | `confermato-cliente` | Cliente — brief 2026-08-05 | interno | Posizionamento di qualità contemporanea, non luxury aristocratico. |
| `audience.professional` | Chef, ristoranti, gastronomie e negozi bio non sono oggi il nucleo principale | Brief cliente | 2026-08-05 | `confermato-cliente` | Cliente — brief 2026-08-05 | interno | È possibile predisporre un percorso professionale secondario; non dominare hero e CTA. |

### 5.2 Posizionamento commerciale approvato

La definizione realistica è:

> Un marchio agricolo contemporaneo che coltiva direttamente un mais piemontese riconoscibile e ne segue le trasformazioni in una gamma concreta, con attenzione a origine, materia, ricette e prodotto finale.

Non posizionare Mais Rosso Co. come maison luxury, birrificio puro, azienda con filiera interamente interna, marchio salutistico, e-commerce nazionale maturo o brand esclusivamente B2B.

### 5.3 Vendita ed e-commerce

| ID | Value | Source | Source date | Status | Approved by | Public | Notes |
|---|---|---|---|---|---|---:|---|
| `sales.ecommerce` | Stato attuale dell'e-commerce non confermato dai materiali cliente | Repository e materiali | 2026-08-05 | `da-richiedere` | null | no | La landing attuale dice che non vende online, ma questa è una decisione di progetto da riconfermare. Non promettere shop né dichiararne definitivamente l'assenza. |
| `sales.directContact` | Richiesta di informazioni/disponibilità via contatto diretto | Lettera e brochure; modello corrente | 2026-05-06 | `confermato-documento-recente` | null | sì | È la CTA temporanea più sicura: “Chiedi informazioni” / “Verifica disponibilità”. Non promette prezzo, spedizione o tempi di risposta. |
| `sales.fairs` | Vendita/contatto alle fiere non confermati come canale corrente | Landing attuale, non provato nel fascicolo recente | 2026-08-05 | `da-richiedere` | null | no | Non pubblicare calendario o formula stabile finché il cliente non conferma. |
| `sales.retailers` | Rete rivenditori non documentata | Materiali cliente | 2026-08-05 | `da-richiedere` | null | no | Non inventare “trova rivenditore”. |
| `sales.b2b` | Possibile percorso professionale secondario | Brief cliente; lettera B2B | 2026-08-05 | `confermato-cliente` | Cliente — brief 2026-08-05 | sì | CTA secondaria possibile: contatto per informazioni professionali/campioni, ma campioni e condizioni vanno confermati. |
| `sales.prices` | Unico listino disponibile datato settembre 2025 | Brochure/listino | 2025-09-10 | `storico` | null | no | Nessun prezzo va mostrato finché il cliente non consegna un listino corrente o approva esplicitamente i valori. |

## 6. Contatti, social e dati legali

| Campo | Evidenza | Status | Public | Decisione operativa |
|---|---|---|---:|---|
| Email amministrativa sul dominio precedente | Brochure 2024/2025 | `storico` e incompatibile con il nuovo brand pubblico | no | Non mostrarla. Richiedere indirizzo di dominio Mais Rosso Co. o usare temporaneamente il contatto personale recente se approvato. |
| `giordano.matteo@outlook.com` | Firma della lettera 2026 | `confermato-documento-recente` | condizionato | È il contatto più recente privo della denominazione precedente. Verificare che sia destinato anche ai consumatori e approvarlo prima del go-live. |
| Telefono `338 286 6127` | Brochure 2024 e 2025 | `confermato-documento-recente` | condizionato | Non è contraddetto, ma va riconfermato come numero pubblico Mais Rosso Co. |
| Instagram `mais_rosso_company` | Brochure/listino settembre 2025 | `confermato-documento-recente` | condizionato | Handle coerente col brand; verificare URL e titolarità prima di pubblicarlo. |
| Facebook con nomenclatura precedente | Repository/materiali storici | `non-pubblicabile` | no | Rimuovere finché non esiste un canale aggiornato e coerente. |
| Dominio e privacy policy precedenti | Repository/materiali storici | `non-pubblicabile` per branding; `da-richiedere` per destinazione nuova | no | Servono dominio, URL privacy e titolare del trattamento aggiornati. Non puntare pubblicamente alla vecchia identità. |
| Indirizzo legale | Assente o confuso con luoghi di confezionamento/stabilimento | `contraddittorio` | no | Richiedere sede legale completa. “Campi ai piedi di Cherasco” non è un indirizzo. |
| P. IVA/codice fiscale | Assenti | `da-richiedere` | no | Blocker legale di pubblicazione. |
| Informazioni sul produttore terzo in etichetta | Presenti su La Maisèra e altri pack | `confermato-documento-recente` | obbligo di etichetta, non racconto | Se il sito mostra il retro etichetta, i dati possono essere leggibili. Non rimuovere informazioni obbligatorie dall'immagine, ma non trasformarle in capitolo editoriale. |

## 7. Claim matrix

### 7.1 Claim ammessi ora

| Claim/direzione | Stato | Condizione |
|---|---|---|
| Mais Rosso Co. è il brand pubblico | `confermato-cliente` | Nessun co-brand con la denominazione precedente. |
| Coltiviamo direttamente il Mais Rosso Ottofile varietà Albese | `confermato-cliente` | Il “direttamente” si riferisce alla coltivazione, non a tutte le trasformazioni. |
| I campi sono ai piedi / alle pendici di Cherasco | `confermato-cliente` | Non usarlo come indirizzo legale. |
| Seminiamo in primavera, indicativamente a maggio | `confermato-cliente` | Non dare date rigide. |
| Raccogliamo indicativamente a settembre | `confermato-cliente` | Non aggiungere “a mano”. |
| La disponibilità segue l'andamento dell'annata | `confermato-cliente` | Non creare una classificazione stagionale dei prodotti. |
| La farina è integrale e macinata a pietra | `confermato-cliente` | La macinazione è conto terzi; non nominare tipo di pietra. |
| Selezioniamo la materia prima e seguiamo qualità e ricette | `confermato-cliente` | Non inventare protocolli. |
| Quando necessario lavoriamo con partner specializzati | `confermato-cliente` | Non implica una filiera opaca né tutta interna. |
| La Maisèra contiene il mais coltivato dall'azienda | `confermato-cliente` | Dire “ingrediente caratterizzante”, non “solo mais”. |
| La Maisèra è una Bière de Garde/Farmhouse da 33 cl, 7% vol. | `confermato-documento-recente` | Deriva dall'etichetta più recente. |
| Maissini e Maisotti contengono anche frumento; la birra contiene cereali con glutine | `confermato-documento-recente` | Le diciture legali finali vanno allineate alle etichette correnti. |

### 7.2 Claim da omettere finché non arriva una fonte o conferma

- agricoltura simbiotica e relative promesse su fertilità/microbioma;
- semina in purezza;
- raccolta interamente a mano;
- essiccazione al sole;
- rischio di estinzione come classificazione ufficiale;
- iscrizione a un registro nel 2007;
- storia del Re, Pollenzo e versione dialettale del soprannome;
- collaborazioni con associazioni, università o banche del germoplasma;
- primato di La Maisèra;
- percentuale di mais e IBU della birra;
- qualità di “prodotto artigianale” quando non è definita per la singola referenza;
- benefici ambientali assoluti;
- anno di fondazione, saga familiare o continuità generazionale;
- tempi di cottura della farina;
- stato “attivo” dei Maisotti;
- rete fiere, spedizioni, minimi, tempi di risposta e rivenditori.

### 7.3 Claim non pubblicabili

- produzione o trasformazione interamente interna;
- assenza di intermediari;
- filiera senza passaggi esterni;
- birra prodotta internamente o “dalla semina alla bottiglia tutta in azienda”;
- coltivazione esclusiva della varietà;
- numeri fissi di ettari, resa o quantità;
- prezzi 2025 presentati come correnti;
- prodotti definiti “stagionali” senza decisione;
- claim salute su digestione, diabete, ipertensione, infiammazione, artrite, pelle, occhi o equivalenti;
- “senza glutine” sulla gamma o sui prodotti finiti privi di verifica;
- “biologico”, certificato o equivalente senza prova;
- “massima qualità”, “unico”, “si vende da solo”, “chi lo prova lo riordina” o superlativi non dimostrabili;
- vecchio brand, vecchi handle e vecchi elementi pubblici di nomenclatura;
- Amaro del Dottore;
- vecchia referenza birra e concept di prodotto non confermati.

## 8. Contenuto pubblico minimo sicuro

Il sistema può essere implementato senza attendere tutti i dati secondari usando questo perimetro:

1. `Mais Rosso Co.` come unico brand;
2. Mais Rosso Ottofile varietà Albese come materia prima coltivata direttamente;
3. campi ai piedi di Cherasco;
4. semina primaverile/indicativamente a maggio e raccolta indicativamente a settembre;
5. disponibilità legata all'annata;
6. filiera descritta con coltivazione diretta, selezione e controllo delle ricette, più partner specializzati per le trasformazioni necessarie;
7. quattro referenze pubblicabili nei loro dati essenziali: Farina, Maisette, Maissini, La Maisèra;
8. Maisotti inseriti solo dopo risoluzione dello stato;
9. contatto per informazioni/disponibilità senza prezzo, spedizione o tempi promessi;
10. percorso professionale secondario, non dominante.

Il layout deve omettere elegantemente formati, prezzi, ingredienti o dati tecnici non approvati. Non usare trattini, “coming soon”, schede vuote o copy inventato per uniformare la griglia.

## 9. Dati da ricevere dal cliente

### 9.1 Necessari prima della pubblicazione

1. conferma binaria sullo stato Maisotti: attivo ora sì/no; se sì, pack, formato e scheda corrente;
2. ragione sociale completa, P. IVA/codice fiscale e sede legale;
3. email, telefono, dominio e canali social pubblici sotto Mais Rosso Co.;
4. URL e titolare della privacy policy aggiornata;
5. etichetta/scheda definitiva corrente di Farina, Maisette e Maissini, con ingredienti, allergeni e formati;
6. conferma che `giordano.matteo@outlook.com` e il numero esistente possano ricevere richieste da consumatori;
7. modalità reale di acquisto: contatto, ritiro, spedizione, shop o altro.

### 9.2 Utili ma non bloccanti per l'implementazione

1. esistenza effettiva del formato La Maisèra 0,75 L;
2. IBU e percentuale di mais della birra;
3. listino corrente;
4. nome e ruolo dei partner, solo per il record interno o obblighi;
5. calendario fiere e condizioni professionali;
6. prova e formula approvata per agricoltura simbiotica;
7. conferma di semina in purezza, raccolta a mano ed essiccazione al sole;
8. fonti per Re/Pollenzo, registro 2007, rischio di estinzione, collaborazioni e primati;
9. anno di nascita del progetto e ruoli delle persone autorizzate a comparire.

## 10. Schema futuro per `facts.ts`

### 10.1 Principio

Il modello corrente assegna uno stato complessivo a un prodotto. Questo è insufficiente: una referenza può essere attiva ma avere prezzo storico, formato confermato e ingredienti ancora da validare. Lo stato deve quindi appartenere al singolo fatto.

Schema proposto:

```ts
export type FactStatus =
  | "confermato-cliente"
  | "confermato-documento-recente"
  | "storico"
  | "contraddittorio"
  | "da-richiedere"
  | "non-pubblicabile";

export interface SourceRef {
  id: string;
  title: string;
  sourceDate: string | null; // ISO 8601 quando disponibile
  locator?: string; // pagina, lato etichetta, sezione del brief
  kind: "client-decision" | "label" | "brochure" | "letter" | "external" | "repository";
}

export interface Fact<T> {
  value: T;
  source: readonly SourceRef[];
  sourceDate: string | null;
  status: FactStatus;
  approvedBy: string | null;
  public: boolean;
  notes: readonly string[];
}

export type CommercialState = "active" | "inactive" | "pending";

export interface ProductFacts {
  id: string;
  name: Fact<string>;
  commercialState: Fact<CommercialState>;
  definition: Fact<string | null>;
  formats: Fact<readonly string[]>;
  ingredients: Fact<readonly string[]>;
  allergens: Fact<readonly string[]>;
  process: Fact<string | null>;
  price: Fact<string | null>;
  imageId: Fact<string | null>;
}
```

### 10.2 Esempi

```ts
export const brandName: Fact<string> = {
  value: "Mais Rosso Co.",
  source: [sources.clientBrief20260805],
  sourceDate: "2026-08-05",
  status: "confermato-cliente",
  approvedBy: "Cliente — brief 2026-08-05",
  public: true,
  notes: ["Unico brand commerciale pubblico"],
};

export const maisottiState: Fact<CommercialState> = {
  value: "pending",
  source: [sources.presentationLetter20260506, sources.clientBrief20260805],
  sourceDate: "2026-08-05",
  status: "contraddittorio",
  approvedBy: null,
  public: false,
  notes: ["Chiedere conferma binaria prima della pubblicazione"],
};

export const beerFormat: Fact<readonly string[]> = {
  value: ["33 cl"],
  source: [sources.maiseraLabel20260728, sources.clientBrief20260805],
  sourceDate: "2026-08-05",
  status: "confermato-cliente",
  approvedBy: "Cliente — brief 2026-08-05",
  public: true,
  notes: ["Il formato 75 cl resta fuori finché non confermato"],
};

export const flourPrice: Fact<string | null> = {
  value: "1 pz €5,50 · 2 pz €10,00",
  source: [sources.priceBrochure20250910],
  sourceDate: "2025-09-10",
  status: "storico",
  approvedBy: null,
  public: false,
  notes: ["Non renderizzare come prezzo corrente"],
};
```

### 10.3 Regole di rendering

- Il frontend può leggere solo fatti con `public: true`.
- `public: true` non deve sovrascrivere `status`: per sicurezza, il selettore pubblico accetta solo `confermato-cliente` e `confermato-documento-recente`.
- `storico`, `contraddittorio`, `da-richiedere` e `non-pubblicabile` non vengono mai renderizzati, neppure come tooltip, placeholder o commento HTML.
- `approvedBy: null` segnala che il dato deriva da un documento ma non ha ancora un'approvazione esplicita. Per dati legali, prezzi, ingredienti, allergeni e disponibilità commerciale l'approvazione deve essere obbligatoria prima del go-live.
- Le fonti non vanno mostrate automaticamente al visitatore; servono ad audit, aggiornamenti e QA.
- Ogni modifica di valore aggiorna `source`, `sourceDate`, `status` e `approvedBy` nello stesso commit.
- Le card prodotto non devono dipendere da un conteggio fisso né dall'esistenza di prezzo, formato o immagine.

## 11. Decisione conclusiva

Il nuovo record non autorizza a trasformare le lacune in copy. Autorizza invece una landing completa nei suoi elementi essenziali: un unico brand, una materia prima coltivata direttamente ai piedi di Cherasco, una filiera descritta con onestà, una gamma reale senza prezzi obsoleti e una birra importante raccontata attraverso l'etichetta corrente.

I principali gate residui sono lo stato dei Maisotti, i dati legali, i contatti sotto il nuovo brand e le schede definitive dei prodotti. Tutto il resto — IBU, formato birra 0,75 L, partner nominativi, storia regale, agricoltura simbiotica e dati annuali — può essere omesso senza bloccare l'implementazione e senza indebolire la verità del brand.
