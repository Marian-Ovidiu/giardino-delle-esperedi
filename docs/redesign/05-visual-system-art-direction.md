# Mais Rosso Co. — Sistema visivo e art direction

Data: 5 agosto 2026  
Responsabile: Agente 5 — Visual System & Art Direction Designer  
Stato: proposta pre-implementazione da consolidare nel master plan; nessuna modifica a frontend o asset

## 1. Decisione di art direction

La direzione approvabile è **agricolo contemporaneo**: fotografia reale e materia in primo piano, identità cromatica ricavata dal packaging, struttura editoriale ordinata e strumenti commerciali immediatamente leggibili.

Il sistema non deve imitare un'etichetta su scala pagina. Deve far riconoscere la stessa marca attraverso pochi invarianti ripetuti con disciplina:

1. arancio-corallo, crema e blu petrolio come asse cromatico;
2. rosso ramato e bordeaux come colori del chicco e dell'accento;
3. League Spartan come unica famiglia web già documentata e licenziabile;
4. doppia pannocchia come segno proprietario, soltanto da un master approvato;
5. fotografie reali di mani, pannocchie, campi, raccolto, chicco e farina;
6. medaglione, bordo e nastro usati come grammatica selettiva, non come costume;
7. prodotti presentati con identico peso e La Maisèra dentro la stessa famiglia visiva;
8. una chiusa petrolio/crema come evoluzione dell'inversione attuale, senza nero, oro o scroll performativo.

La qualità non deriva più dalla distanza scenica, ma dalla precisione: un rosso credibile, un campo reale, un nome prodotto leggibile, una filiera chiara e una CTA utile.

## 2. Fonti decisive e confini

Questo documento usa come fonti decisive, lette integralmente:

- `docs/redesign/01-brand-identity-extraction.md`;
- `docs/redesign/03-photography-media-plan.md`;
- `docs/redesign/04-information-architecture.md`.

Il codice attuale è stato consultato esclusivamente per distinguere ciò che può essere preservato: token semantici, griglia, componenti, stati focus, reduced motion, media registry e infrastruttura di inversione. Non sono state assunte come vincolanti la palette beige/nero/oro, la Bodoni, la griglia aritmetica a otto colonne, il rail a 64 chicchi o la grammatica da registro.

Non sono state prese decisioni di catalogo, claim o filiera in questo output: appartengono al record di verità e al consolidamento del coordinatore.

## 3. Principi non negoziabili

### Prima la prova, poi il segno

- Nel primo viewport la fotografia reale è almeno importante quanto il testo.
- La fotografia non viene attenuata fino a diventare una piastra atmosferica.
- Illustrazioni e texture restano riconoscibili come grafica, mai come documentazione.
- Un'assenza di packshot non viene colmata con mockup, compositing o immagini generate.

### Stessa marca, non stessa etichetta

- Colori, rapporti tra forme e gerarchie prodotto derivano dal packaging.
- Nastri, medaglioni e doppi bordi non compaiono tutti insieme in ogni blocco.
- Il microtesto da etichetta non diventa decorazione di pagina.
- Nessun bollino o pittogramma viene usato senza una base verificata.

### Parità commerciale

- Tutte le schede prodotto hanno la stessa area media, scala del nome, densità e CTA.
- La bottiglia non riceve una palette scura o una messa in scena autonoma da birrificio.
- Nessun prodotto riceve badge “eroe”, “premium”, “novità” o “stagionale”.
- Campi dati assenti collassano senza placeholder pubblici.

### Carattere senza costume

- Niente carta antica dominante, bordi consunti, timbri casuali o vintage distressed esteso.
- Niente nero/oro, serif aristocratica o composizione da maison.
- Niente verde salvia come scorciatoia per “agricolo”.
- Niente sistema SaaS bianco con pillole, card sospese e gradienti generici.

## 4. Sistema cromatico

### 4.1 Palette sorgente

I sei colori principali sono estratti dal logo più recente, non stimati visivamente.

| Token sorgente | Valore | Ruolo di marca |
|---|---:|---|
| Corallo | `#F5915E` | Campo di marca, bande, passaggi prodotto |
| Crema | `#F1DFBF` | Fondo principale, pannelli, testo su petrolio |
| Petrolio | `#16607D` | Azione primaria, bordi, navigazione, campo finale |
| Rosso chicco | `#C32F24` | Accento materiale e piccoli indicatori |
| Bordeaux | `#5B1208` | Accento testuale, CTA alternative, stati focus |
| Bruno tutolo | `#37240B` | Testo primario caldo |

Un solo colore derivato è ammesso nel sistema base:

| Token derivato | Valore | Stato | Uso |
|---|---:|---|---|
| Avorio digitale | `#FFF8EA` | Proposto, non estratto | Card e superfici che richiedono più respiro del crema |

L'avorio può essere sostituito da bianco o crema durante la calibrazione. Non deve diventare un secondo beige dominante né moltiplicare i fondi.

### 4.2 Token semantici proposti

```css
:root {
  --brand-coral: #f5915e;
  --brand-cream: #f1dfbf;
  --brand-petrol: #16607d;
  --brand-kernel: #c32f24;
  --brand-bordeaux: #5b1208;
  --brand-brown: #37240b;
  --brand-ivory: #fff8ea;

  --surface-page: var(--brand-cream);
  --surface-raised: var(--brand-ivory);
  --surface-brand: var(--brand-coral);
  --surface-inverse: var(--brand-petrol);

  --text-primary: var(--brand-brown);
  --text-secondary: var(--brand-bordeaux);
  --text-on-inverse: var(--brand-cream);

  --border-default: color-mix(in srgb, var(--brand-brown) 35%, transparent);
  --border-strong: var(--brand-petrol);

  --action-primary-bg: var(--brand-petrol);
  --action-primary-fg: var(--brand-cream);
  --action-strong-bg: var(--brand-bordeaux);
  --action-strong-fg: var(--brand-cream);
}
```

Il token `color-mix()` è una derivazione funzionale e non introduce un nuovo colore identitario. Deve avere un fallback opaco verificato se il supporto browser del progetto lo richiede.

### 4.3 Campi cromatici della pagina

La pagina usa quattro campi, con una gerarchia precisa:

1. **Crema — campo principale:** header, hero testuale, materia, campo/filiera.
2. **Avorio — superficie informativa:** card, `<dl>`, pannelli di contatto e sfondi dietro packshot.
3. **Corallo — evento di marca:** fascia catalogo, nastro di sezione o un singolo modulo manifesto; non più del 25–30% della lunghezza visiva.
4. **Petrolio — chiusa inversa:** custodia e contatti, con testo crema.

Il rosso e il bordeaux non sono campi di pagina estesi. Sono colori di materia, focus, nome prodotto o piccola azione. Il campo finale petrolio sostituisce l'attuale notte quasi nera: mantiene il cambio di ritmo senza spostare il brand nel luxury.

### 4.4 Contrasti autorizzati

| Coppia | Rapporto | Uso |
|---|---:|---|
| Bruno su crema | 11,30:1 | Testo normale e titoli |
| Bordeaux su crema | 10,46:1 | Titoli, label, link, focus |
| Petrolio su crema | 5,34:1 | Testo normale, bordi, icone |
| Bruno su corallo | 6,41:1 | Testo normale e CTA testuale |
| Bordeaux su corallo | 5,93:1 | Testo normale, bordi forti |
| Crema su petrolio | 5,34:1 | Testo normale nel campo inverso |
| Avorio su petrolio | 6,61:1 | Testo e icone nel campo inverso |
| Bordeaux su avorio | 12,94:1 | Testo, CTA, focus |
| Bruno su avorio | 13,99:1 | Testo normale |

Combinazioni vietate per testo normale:

- petrolio su corallo: 3,03:1;
- rosso chicco su crema: 4,28:1;
- crema su corallo: 1,76:1;
- rosso su petrolio: 1,25:1;
- bordeaux su petrolio: 1,96:1.

Il rosso chicco può essere usato su crema per forme, indicatori grandi e segni non testuali; non per corpo, label piccole o stati che devono essere compresi solo dal colore.

### 4.5 Uso cromatico per blocco

| Blocco | Campo | Testo | Accento | Nota |
|---|---|---|---|---|
| Header | Crema/trasparente con fallback crema | Bruno | Petrolio | Sticky senza vetro/blur dominante |
| Hero | Crema + fotografia reale | Bruno | Bordeaux/petrolio | Nessun velo corallo uniforme sulla foto |
| Materia | Crema/avorio | Bruno | Rosso chicco | L'otto è un solo evento |
| Campo e filiera | Crema | Bruno | Petrolio | Il calendario è informativo, non “tecnico” |
| Prodotti | Corallo con card avorio | Bruno | Petrolio/bordeaux | Packaging leggibile, card paritarie |
| Custodia | Petrolio | Crema | Corallo limitato | Nessuna notte nera |
| Contatti | Petrolio | Crema | Avorio/corallo | CTA chiara e dati legali subordinati |

## 5. Tipografia

### 5.1 Famiglia approvabile

**League Spartan** è la base del sistema web:

- è presente nei materiali;
- compare nel marchio recente;
- i file e la licenza SIL OFL 1.1 sono disponibili;
- sostiene sia titoli compatti sia una voce contemporanea non aristocratica.

La soluzione implementabile al gate è una sola famiglia, con fallback `Arial, Helvetica, sans-serif`. Ridurre le famiglie è coerente con il packaging senza importarne l'affollamento.

Non usare come webfont:

- font Bitstream/OnlineWebFonts senza licenza specifica;
- font decorativi estratti dai subset PDF;
- Archivo Black come ricostruzione presunta del wordmark;
- script “simili” scelti per analogia;
- Bodoni come titolare principale.

Archivo già presente nel repository può essere valutato dal coordinatore come eventuale corpo tecnico soltanto dopo una verifica di provenienza e licenza del file distribuito. Non è necessario per implementare questa proposta e non deve essere confuso con il master del wordmark.

### 5.2 Ruoli

| Ruolo | Peso | Desktop | Mobile | Line-height | Regole |
|---|---:|---:|---:|---:|---|
| Display hero | 750–800 | `clamp(3.75rem, 7vw, 7.5rem)` | `clamp(2.75rem, 13vw, 4.5rem)` | 0,92–0,98 | Maiuscole/minuscole reali; max 2 righe |
| H2 sezione | 700–780 | `clamp(2.75rem, 4.5vw, 5.25rem)` | `clamp(2.25rem, 10vw, 3.5rem)` | 0,98–1,04 | Max 3 righe, tracking negativo lieve |
| H3/prodotto | 700–800 | `clamp(1.75rem, 2.4vw, 2.75rem)` | `1.75rem–2.25rem` | 1,00–1,08 | Nome prodotto leggibile, niente condensed artificiale |
| Lead | 450–550 | `1.375rem–1.625rem` | `1.1875rem–1.375rem` | 1,35–1,45 | Misura 32–42 caratteri |
| Corpo | 400–500 | `1.0625rem–1.125rem` | `1rem` | 1,55–1,65 | Misura 55–70 caratteri |
| Small | 450–550 | `0.875rem–0.9375rem` | `0.875rem` | 1,45–1,6 | Mai sotto 14 px |
| Label | 650–750 | `0.75rem–0.8125rem` | `0.75rem` | 1,25–1,35 | Maiuscolo CSS, tracking 0,08–0,12em |
| Dati | 550–650 | `0.9375rem–1rem` | `0.9375rem` | 1,35–1,5 | Cifre tabulari se disponibili |
| Numero 8 | 750–800 | `clamp(4rem, 8vw, 8rem)` | `3.5rem–5rem` | 0,9 | Un solo uso manifesto |

La scala non è basata su multipli obbligatori di otto. I valori finali devono essere verificati in browser con le metriche effettive di League Spartan.

### 5.3 Cassa, tracking e tono

- Il nome pubblico mantiene maiuscole e punteggiatura corrette, non tutto maiuscolo per sistema.
- I titoli principali usano sentence case; le label brevi possono essere in uppercase CSS.
- Nomi prodotto possono usare uppercase solo se la resa resta leggibile e coerente con il pack.
- Tracking titoli: da `-0.03em` a `-0.01em`, mai compressione estrema.
- Tracking label: da `0.08em` a `0.12em`; non `0.16em` con corpo minuto.
- Il corpo non usa peso 300: su schermi piccoli perderebbe sostanza.
- Niente corsivi decorativi in attesa di un font approvato. L'enfasi nel corpo usa peso o struttura, non un falso script.
- DM Mono può sopravvivere soltanto in un dato realmente tabellare e per poche occorrenze; non deve mantenere il tono da registro.

### 5.4 Wordmark provvisorio

Il wordmark testuale temporaneo usa League Spartan 750–800 con il nome scritto in chiaro. Non ricostruisce il sigillo, non curva lettere, non aggiunge descriptor e non viene esportato come logo.

Attributi consigliati:

- una riga su desktop quando possibile;
- due righe controllate su mobile soltanto se necessarie;
- colore bordeaux su crema o crema su petrolio;
- nessun ®, ™, timbro o sigillo non verificato;
- accessibile come testo HTML, non come immagine.

## 6. Marchio, lockup e doppia pannocchia

### 6.1 Gate del master

Il PDF di logo più recente contiene ancora elementi esclusi e non è un master vettoriale pulito. La doppia pannocchia disponibile è un JPEG compresso senza trasparenza. Non è autorizzato:

- pubblicare il PDF integrale;
- scontornare automaticamente il JPEG e chiamarlo logo;
- vettorializzare o ridisegnare senza approvazione;
- mescolare componenti di versioni diverse;
- usare il vecchio albero, anche in miniatura, favicon o fondale;
- presentare il timbro “Gourmet Piemonte” come certificazione.

### 6.2 Sistema a due stati

#### Stato P0 — implementazione provvisoria

- header e footer: wordmark testuale;
- hero: wordmark testuale + fotografia reale;
- doppia pannocchia: se il coordinatore ne approva l'uso provvisorio, resta una **illustrazione separata** nel suo campo chiaro originale, con dimensione contenuta e senza essere definita logo;
- favicon/OG: segno neutro testuale o asset temporaneo approvato dal coordinatore, mai il sigillo contaminato;
- nessuna lockup esportata come nuova identità.

#### Stato P1 — dopo consegna/approvazione master

- variante orizzontale per header;
- simbolo compatto a doppia pannocchia per mobile, favicon e microfirma;
- sigillo pulito soltanto in hero/chiusa o contesto manifesto;
- versione monocromatica petrolio o crema, se prevista dal master;
- file SVG e PNG trasparente con area di rispetto documentata.

### 6.3 Gerarchia d'uso futura

1. Wordmark orizzontale: header e footer.
2. Doppia pannocchia: hero, materia e microfirma prodotto, massimo tre apparizioni rilevanti nella pagina.
3. Sigillo: una sola apparizione ampia, se il master pulito lo rende leggibile.
4. Descriptor Ottofile/Albese: testo editoriale, non ripetizione obbligatoria dentro ogni lockup.

Dimensioni indicative da validare sul master:

- wordmark header desktop: 144–192 px di larghezza;
- wordmark header mobile: 120–152 px;
- simbolo compatto: mai sotto 28 px;
- sigillo completo: mai sotto 112–128 px, perché i descriptor circolari diventano illeggibili.

L'area di rispetto proposta, in assenza di manuale, è almeno metà dell'altezza della pannocchia o della maiuscola del wordmark. È una regola temporanea, non una brand guideline definitiva.

## 7. Fotografia e grafica

### 7.1 Rapporto generale

La fotografia occupa il 55–65% della superficie utile dei primi tre blocchi e almeno il 45% della superficie del catalogo quando i packshot saranno disponibili. Grafica e testo organizzano, non coprono.

Gerarchia media:

1. fotografie cliente reali e autorizzate;
2. packaging reale aggiornato;
3. doppia pannocchia e grafica proprietaria approvate;
4. texture fotografiche autentiche;
5. illustrazioni astratte dichiarate, solo come accento;
6. nessun media generato in ruolo documentario.

### 7.2 Hero

Prima scelta: `Materiale fotografico/IMG_6427.JPG`.

- Desktop: crop 3:2 o 16:9; mani e cinque pannocchie restano leggibili.
- Mobile: crop 4:5 centrale; verificare entrambe le mani e il rosso dei chicchi.
- Nessun testo sopra mani, pannocchie o dettagli ad alto contrasto.
- Nessun duotone, seppia, vignetta o overlay petrolio opaco.
- È ammessa una leggera sfumatura neutra soltanto in una zona vuota destinata al testo, se il contrasto è misurato e il soggetto non cambia.

Alternative:

- `IMG_6426.JPG` per un crop più materico;
- `IMG_6376.JPG` se il coordinatore preferisce una hero senza presenza umana, dichiarando implicitamente la natura di still life.

La foto viene resa con bordo netto o raggio moderato, non dentro un falso medaglione. Il marchio non deve occultare il soggetto.

### 7.3 Mappa fotografia-blocchi

| Blocco | Asset primario | Rapporto | Trattamento |
|---|---|---:|---|
| Hero | `IMG_6427.JPG` | 3:2 / 4:5 | Naturale, crop mani+pannocchie |
| Materia | `IMG_6378.JPG` | 1:1 o 8:5 | Macro fedele, nessuna “prova” forzata del conteggio |
| Chicco/farina | `IMG_6380.JPG` | 8:5 | Limitare la lettura rustica dello styling tramite crop |
| Campo | `Mais rosso/UYIO1755.JPG` | 16:9 | Mantenere irregolarità e suolo |
| Raccolto | `Mais rosso/IMG_5097.JPG` | 4:5 / 1:1 | Conservare cassette come prova di scala |
| Trasformazioni | `Mais rosso/UBCW8681.JPG` | 4:5 | Pubblicare solo dopo conferma della fase; caption neutra |
| Custodia | `IMG_6413.JPG` o `IMG_6426.JPG` | 8:5 / 4:5 | Una sola immagine, senza accumulo di juta/rame |
| La Maisèra | Nessun master adeguato | — | Slot tipografico controllato finché arriva il packshot |

### 7.4 Sviluppo colore

- Correggere bilanciamento, esposizione e dominanti senza filtro uniforme.
- Mantenere rosso/arancio dei chicchi e giallo caldo della farina.
- Il verde del campo resta naturale e non diventa token di marca.
- Non desaturare per ricondurre tutto al crema.
- Non aumentare il rosso al punto da uniformare pannocchia, pack e pelle.
- Niente grana artificiale, bloom, haze o blur atmosferico.
- Niente rimozione di oggetti che alteri il significato documentario.

### 7.5 Crop e componenti media

Ogni immagine principale deve avere crop desktop e mobile espliciti nel media registry. Il componente media deve supportare:

- `kind`: documentary/product/illustration/texture;
- aspect ratio dichiarato;
- `object-position` per breakpoint;
- caption opzionale e fattuale;
- alt descrittivo, senza attribuzioni non verificate;
- fonte, diritti e stato pubblico;
- slot `null` senza immagine finta.

Raggi:

- foto manifesto/hero: `0–12px`;
- foto editoriali: `8–12px`;
- packshot/card: `8px`;
- nessun blob, cerchio casuale o maschera organica generica.

### 7.6 Asset generati

Rimuovere dai ruoli documentari le cinque piastre attuali di pannocchia-scultura, atmosfera, campo, macina e farina. Possono restare archiviate, non renderizzate come prove.

Il prologo e le texture astratte possono essere preservati soltanto se:

- subordinati alla fotografia reale;
- `aria-hidden`;
- non aggiungono altezza;
- non simulano campo, processo o marchio ufficiale;
- sono eliminabili senza perdita informativa;
- con reduced motion diventano statici o spariscono.

## 8. Griglia e composizione

### 8.1 Decisione

La nuova griglia non usa il numero otto come legge. Si propone:

- desktop ≥1280 px: 12 colonne fluide;
- tablet 768–1279 px: 8 colonne fluide;
- mobile <768 px: 4 colonne fluide;
- contenitore massimo: 1440–1536 px;
- padding laterale: 64–80 px desktop, 32–48 px tablet, 16–24 px mobile;
- gutter: 24–32 px desktop, 20–24 px tablet, 16 px mobile.

La scelta a 12 colonne desktop consente hero 5/7, blocchi 4/8 o 7/5 e catalogo 6/6 senza associare la struttura alla morfologia del mais. Il valore otto resta un fatto narrativo nel blocco materia.

### 8.2 Composizioni ricorrenti

#### Hero

- testo 5 colonne;
- fotografia 7 colonne;
- header sopra entrambe le aree;
- al massimo due CTA affiancate;
- su mobile: testo, CTA, foto; la foto entra nel primo viewport o nel primo gesto di scroll.

#### Materia

- foto macro 7 colonne;
- copy e dati 5 colonne;
- una sola sequenza di otto segni attraversa il margine o il bordo del modulo, senza diventare rail.

#### Campo e filiera

- campo a piena larghezza controllata 12 colonne;
- calendario 4 colonne e testo 8;
- responsabilità in 4 moduli equivalenti o lista numerata, mai frecce che suggeriscono un unico luogo.

#### Catalogo

- due card da 6 colonne su desktop;
- una card da 4 colonne su mobile;
- niente carosello;
- quinta card allineata a sinistra, non ingrandita per riempire la riga.

#### Custodia e contatti

- campo petrolio continuo;
- custodia 7/5 tra testo e foto;
- contatti 8/4 tra azione primaria e dati secondari;
- dati legali in fondo, con densità ridotta.

### 8.3 Allineamenti

- Testi, media e card condividono gli stessi margini; niente “lastra” disallineata per sola teatralità.
- Il bordo delle immagini risponde a titoli o dati vicini.
- Il testo lungo non supera 65–70 caratteri per riga.
- Le label non vengono ruotate e non occupano colonne verticali.
- Gli elementi a tutta larghezza sono massimo due: fotografia campo e passaggio custodia/contatti.

## 9. Ritmo, spaziatura e densità

### 9.1 Scala proposta

```css
:root {
  --space-1: 0.25rem;  /* 4 */
  --space-2: 0.5rem;   /* 8 */
  --space-3: 0.75rem;  /* 12 */
  --space-4: 1rem;     /* 16 */
  --space-6: 1.5rem;   /* 24 */
  --space-8: 2rem;     /* 32 */
  --space-12: 3rem;    /* 48 */
  --space-16: 4rem;    /* 64 */
  --space-24: 6rem;    /* 96 */
  --space-32: 8rem;    /* 128 */
}
```

La scala permette densità diversa senza la regola Fibonacci × 8 attuale. Non tutti i valori devono diventare token pubblici: l'implementazione può ridurli, purché mantenga i ruoli.

### 9.2 Ritmo verticale

- Hero: 80–100svh desktop; contenuto naturale su mobile, indicativamente 80–110svh.
- Blocchi principali: 96–160 px desktop, 64–96 px mobile tra ingresso e uscita.
- Sottosezioni: 48–80 px desktop, 32–56 px mobile.
- Card: 24–40 px di padding desktop, 20–24 px mobile.
- Nessuna sezione ordinaria supera 120svh per un singolo fatto.
- Nessun vuoto verticale esiste per sostenere motion o pareggiare un conteggio.

### 9.3 Densità

La densità cresce lungo la pagina:

1. hero: una proposizione e due azioni;
2. materia: foto + massimo quattro dati;
3. campo/filiera: calendario + quattro responsabilità;
4. catalogo: dati concreti e CTA;
5. custodia: ritorno a una frase forte;
6. contatti: azione, canali e legale.

Il catalogo è il blocco più informativo, non quello più scenografico. Il campo/filiera è il blocco più documentario. La custodia è il solo momento di pausa ampia.

## 10. Forme, bordi, nastri e texture

### 10.1 Forme

- Rettangoli e campi rettilinei costruiscono la pagina.
- Cerchi/medaglioni compaiono in un massimo di due momenti: materia e dettaglio prodotto.
- Raggio card 8–12 px, non pillola.
- La forma della pannocchia non viene imitata con blob decorativi.
- Nessuna ombra di elevazione SaaS; se serve separazione, usare bordo o differenza di campo.

### 10.2 Bordi

- `1px` per card, dati e separatori;
- `2px` petrolio per una firma o card selezionata, mai per evidenziare un prodotto rispetto agli altri;
- doppio bordo soltanto attorno a un singolo elemento di marca, se coerente col master;
- niente bordi consumati, tratteggi irregolari o effetto timbro.

### 10.3 Nastri

Il nastro è riservato a:

- label di blocco catalogo; oppure
- nome/categoria dentro la card prodotto.

Non viene usato contemporaneamente in hero, titoli sezione, CTA e footer. È piatto, senza pieghe 3D, ombre o punte araldiche.

### 10.4 Texture

- La texture primaria è fotografica: chicco, farina, brattee, legno, cassetta, vetro.
- `carta.avif` può restare a opacità molto bassa, indicativamente 3–6%, soltanto sui campi pieni.
- Nessuna texture sopra fotografie o testo piccolo.
- Sul petrolio la texture viene ridotta o rimossa per non sporcare il contrasto.
- Evitare juta e rame in più di un blocco: sommati trasformano il sito in una scena rustica costruita.

## 11. Schede prodotto

### 11.1 Struttura

Ogni card contiene, in quest'ordine DOM:

1. area media con aspect ratio comune `4:5` o `1:1`;
2. label di categoria facoltativa;
3. nome prodotto;
4. relazione concreta con il Mais Rosso Ottofile;
5. `<dl>` di soli campi pubblicabili;
6. allergene essenziale quando necessario;
7. CTA “Verifica disponibilità — [prodotto]”.

Le card usano fondo avorio, testo bruno, bordo petrolio attenuato. L'area media non cambia altezza in base al prodotto. Il pack deve poggiare su un fondo piano e coerente, senza piedistallo, ombra teatrale o riflesso artificiale.

### 11.2 Slot media incompleto

Finché non esistono packshot completi:

- mantenere lo stesso slot, con fondo crema e nome tipografico;
- non mostrare sagome tratteggiate, icone “foto in arrivo” o mockup;
- non pubblicare vecchie confezioni come correnti;
- non aumentare la foto di un prodotto solo perché è l'unica disponibile;
- considerare lo slot tipografico una condizione editoriale temporanea, non un nuovo packaging digitale.

Il go-live completo resta condizionato al set prodotto corrente; la struttura può essere implementata prima.

### 11.3 La Maisèra

- Stessa card, fondo e bordo delle altre referenze.
- Stessa area media e identica scala del nome.
- Compare entro il primo gruppo desktop e non oltre la seconda card mobile.
- Nessuna card nera, griglia luppolo, lettering craft o texture da taproom.
- La bottiglia futura viene fotografata nello stesso set luce della gamma o su fondo compatibile.
- Il vetro e l'etichetta possono introdurre contrasto, non un sottosistema cromatico.

### 11.4 Interazioni

- L'intera card non diventa link se esiste una CTA specifica.
- Hover: bordo da attenuato a petrolio e underline più evidente; nessun sollevamento.
- Focus: anello visibile e non tagliato.
- Nessuna informazione compare solo su hover.
- Card senza media resta semanticamente identica e non riceve stato “disabled”.

## 12. Pulsanti, link e CTA

### 12.1 Primaria

- fondo petrolio;
- testo crema;
- peso 650–700;
- altezza minima 48 px;
- padding 14–16 px verticale, 20–24 px orizzontale;
- raggio 8 px;
- nessuna ombra;
- icona freccia facoltativa, sempre accompagnata da testo.

### 12.2 Secondaria

- fondo trasparente;
- testo bordeaux o bruno secondo il campo;
- bordo 1 px bordeaux;
- stessa altezza e geometria della primaria.

Sul campo petrolio la secondaria usa testo e bordo crema. Sul corallo la CTA sicura usa bordeaux come testo/bordo o fondo bordeaux con testo crema.

### 12.3 Link testuali

- underline persistente;
- offset 3–5 px, non 8 px su corpo piccolo;
- hover cambia spessore o colore, non posizione;
- il percorso professionale usa un link testuale, non una seconda CTA primaria.

### 12.4 Focus

- Su crema/avorio/corallo: outline bordeaux 3 px con offset 3 px.
- Su petrolio: outline avorio 3 px; se l'elemento ha fondo avorio, aggiungere separazione petrolio interna.
- Il focus non usa solo rosso chicco e non viene affidato al cambio di bordo della card.

## 13. Header e navigazione

### Desktop

- Altezza indicativa 72–88 px.
- Wordmark a sinistra, quattro anchor al centro/destra, CTA in chiusura.
- Sticky solo dopo verifica che non copra foto o deep link.
- Fondo crema pieno o quasi pieno; blur traslucido non è il tratto di marca.
- Stato attivo espresso con underline/segno e testo, non solo colore.

L'indice laterale è opzionale e, se preservato, è soltanto testuale e compatto. Non contiene chicchi, contatori o tooltip. Non compete con l'header e scompare sotto desktop ampio.

### Mobile

- Wordmark testuale compatto e pulsante menu con target almeno 44×44 px.
- Menu a pannello crema, contenuto lineare, CTA primaria in fondo.
- Nessun rail fisso.
- Nessun logo circolare illeggibile ridotto nella barra.
- Il menu si chiude dopo la selezione e conserva focus management e tastiera.

## 14. Firma dell'otto

L'otto resta visibile una sola volta come memoria della morfologia:

- otto segni/chicchi disposti in una sequenza leggibile nel blocco materia;
- numero 8 grande, associato a un testo fisico sulla pannocchia;
- opzionale micro-ripresa di otto punti nel bordo di una sola card informativa.

Da non usare:

- otto capitoli obbligatori;
- griglia sempre a otto colonne;
- 64 chicchi di avanzamento;
- numerazione `NN/08`;
- misure, durate o spazi multipli di otto come dichiarazione concettuale;
- metacopy che spiega il layout.

La firma è efficace se un visitatore ricorda la pannocchia, non il sistema di impaginazione.

## 15. Direzione visuale per ogni blocco

### Header

Sobrio, concreto, cromaticamente legato al pack. Wordmark testuale fino al master. Una CTA visibile; nessun elemento storico.

### Hero

Composizione 5/7, foto reale `IMG_6427.JPG`, titolo dominante ma non monumentale al punto da nascondere la prova. Corallo in una piccola fascia o label, non filtro fotografico. Due CTA.

### Materia prima

Macro `IMG_6378.JPG` e chicco/farina `IMG_6380.JPG` in due ritmi diversi. Il numero 8 e la doppia pannocchia, quando approvata, agiscono come firme. Questo è il blocco più identitario, non il più lungo.

### Campo, annata e trasformazioni

Fotografia ampia del campo, poi una sequenza più densa di calendario, raccolto e responsabilità. Petrolio organizza titoli e bordi. Nessun diagramma industriale, nessun mulino simulato, nessuna freccia “tutto interno”.

### Prodotti

Campo corallo e card avorio. Il catalogo è immediatamente riconoscibile grazie ai colori del pack, ma resta leggibile. Due colonne desktop, una mobile, nessun prodotto fuori scala. Packaging corrente quando disponibile; slot tipografici onesti negli altri casi.

### Custodia

Passaggio al petrolio, foto reale di raccolto o mani, una frase concreta. Il cambio cromatico sostituisce il climax performativo; nessun pin o altezza artificiale.

### Contatti

Continuità petrolio, pannello avorio per l'azione primaria oppure CTA avorio su petrolio. Dati secondari e legali ridotti. Il percorso consumer precede quello professionale.

## 16. Motion e interazioni

### 16.1 Principio

Il motion accompagna la lettura e segnala stato. Non racconta una storia alternativa al brand e non crea prove che non esistono.

### 16.2 Durate proposte

```css
:root {
  --motion-fast: 160ms;
  --motion-base: 240ms;
  --motion-slow: 400ms;
  --ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
}
```

- Hover/focus cromatico: 160 ms.
- Menu e disclosure: 240 ms.
- Reveal di blocco: 240–400 ms.
- Inversione finale: massimo 400 ms.
- Nessuna durata legata a un conteggio di otto.

### 16.3 Pattern ammessi

- fade + traslazione massima 8–12 px per moduli secondari;
- reveal sfalsato massimo 40–60 ms tra elementi di una stessa lista;
- cambio bordo/underline su card e link;
- transizione di campo crema → petrolio al raggiungimento della custodia;
- menu mobile con apertura lineare e focus corretto.

### 16.4 Pattern da eliminare

- pin di sezione;
- scroll artificiale da 168–240svh;
- rail a 64 stati;
- parallasse della fotografia;
- zoom o pan continuo sul raccolto;
- morph procedurale che sostituisce la pannocchia ufficiale;
- animazione del logo;
- card che salgono, ruotano o proiettano ombre;
- reveal che nasconde contenuto server-rendered al first paint.

### 16.5 Reduced motion e fallback

Con `prefers-reduced-motion: reduce`:

- durate a zero o quasi zero;
- nessuna traslazione;
- menu e inversione cambiano stato immediatamente;
- contenuto e immagini sono visibili senza trigger;
- eventuale prologo astratto è statico o assente.

Senza JavaScript e su deep link, ogni sezione deve avere già campo, contrasto e contenuto corretti. L'inversione petrolio non dipende dall'aver attraversato la pagina.

## 17. Desktop, tablet e mobile

### Desktop

- Hero 5/7 con fotografia dominante.
- Navigazione completa; indice compatto soltanto se utile ai test.
- Alternanza 5/7 e 7/5 nei blocchi editoriali.
- Catalogo 2 colonne.
- Foto campo ampia, senza “lastra” monumentale ripetuta.
- Lunghezza complessiva indicativa 9.000–12.000 px a 1440×1000, come guardrail UX.

### Tablet

- Hero 3/5 o stack se la fotografia perde leggibilità.
- Nessun rail fisso.
- Catalogo a 2 colonne solo se nomi e media conservano misura; altrimenti una.
- Dati scendono sotto il copy prima di diventare troppo stretti.
- Padding minimo 32 px in portrait.

### Mobile

- Ordine DOM: testo → CTA → fotografia in hero; media → testo → dati negli altri blocchi.
- Header compatto con menu.
- Catalogo a una colonna, nessun carosello.
- Immagini con crop 4:5 o 1:1 controllato; niente bleed orizzontale.
- Nessun testo verticale, tooltip o label sotto 12 px.
- CTA a larghezza piena quando due azioni affiancate scendono sotto 320–360 px utili.
- Target interattivi minimo 44×44 px.
- Custodia content-driven, circa 0,8–1,2 viewport.
- Contatto primario entro circa 1,5 schermate prima del legale.

## 18. Componenti da preservare

| Elemento attuale | Valore da preservare | Riallineamento visuale |
|---|---|---|
| Token semantici | Separazione tra sorgente e ruolo | Sostituire palette e ruoli, mantenere alias |
| `Header` | Semantica, focus, ingombro controllato | Wordmark, nav, CTA e menu mobile |
| `Hero` | Landmark, H1, struttura server-rendered | Foto reale, gerarchia 5/7, due CTA |
| `Scheda` | Guscio editoriale riusabile | Rimuovere conteggio e altezze performative |
| `RegistroDati` | `<dl>` e scansione termine/valore | League Spartan, bordi petrolio, max 4 righe |
| `Piastra` | Dimensioni esplicite e media centralizzati | Generalizzare a fotografia reale/caption/crop |
| `ProductsChapter` | Mapping data-driven e CTA per referenza | Card visuali paritarie, media nullable |
| `ContactFooter` | Landmark, mailto, liste e legale | Accorciare e portare su petrolio |
| `ExperienceMotion` | Reduced motion e rilevamento sezione | Reveal discreti e inversione senza pin |
| Media registry | Provenienza centralizzata | Aggiungere diritti, crop, kind e stato |
| Skip link/focus | Accessibilità già solida | Aggiornare colori e spessori |
| Fallback statici | Resilienza no-JS | Rendere foto/campi indipendenti dal motion |

## 19. Elementi da eliminare o non renderizzare

- Bodoni come display e relativo tono inciso/luxury;
- vecchio albero in ogni forma pubblica;
- sigillo corrente integrale finché non viene ripulito e approvato;
- palette carta/inchiostro/notte/oro come asse del sito;
- rail a 64 chicchi e contatore dei capitoli;
- prologo come narratore dell'intera pagina;
- metacopy “registro”, “scheda”, “colonne” e “questo non è un catalogo”;
- piastre AI in ruoli documentari;
- card prodotto solo testuali senza area media prevista;
- matrice 01–08 sopra il catalogo;
- climax finale nero/oro e scroll pin;
- doppio bordo, timbro, nastro e texture applicati simultaneamente;
- iconografia di claim non alimentata da fatti pubblicabili;
- vecchi pack e QR in asset pubblici;
- layout che rende un prodotto più grande o più scuro degli altri.

## 20. Token visuali consolidabili

```css
:root {
  /* Colori */
  --brand-coral: #f5915e;
  --brand-cream: #f1dfbf;
  --brand-petrol: #16607d;
  --brand-kernel: #c32f24;
  --brand-bordeaux: #5b1208;
  --brand-brown: #37240b;
  --brand-ivory: #fff8ea;

  /* Tipografia */
  --font-brand: "League Spartan", Arial, Helvetica, sans-serif;
  --weight-body: 450;
  --weight-label: 650;
  --weight-heading: 750;
  --weight-product: 800;

  /* Geometria */
  --layout-max: 96rem;
  --measure-body: 68ch;
  --radius-control: 0.5rem;
  --radius-card: 0.75rem;
  --border-hairline: 1px;
  --border-signature: 2px;

  /* Motion */
  --motion-fast: 160ms;
  --motion-base: 240ms;
  --motion-slow: 400ms;
  --ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1);
}
```

Questi token sono proposte per il coordinatore. Non autorizzano la creazione di un nuovo logo, l'uso di font non licenziati o la pubblicazione di colori senza test sul componente reale.

## 21. Gate, dipendenze e soluzione provvisoria

### Gate necessari per chiudere il sistema

1. Master ufficiale del logo senza elementi esclusi, in SVG/PDF vettoriale e PNG trasparente.
2. Master trasparente/vettoriale della doppia pannocchia.
3. Conferma di varianti orizzontale, compatta, monocromatica e area di rispetto.
4. Conferma che League Spartan è la famiglia digitale di marca.
5. Eventuale prova di licenza di un secondo font; non necessaria per P0.
6. Packshot coerenti e aggiornati di tutta la gamma.
7. Packshot reale ad alta risoluzione di La Maisèra.
8. Conferma di fase e caption per `UBCW8681.JPG`.

### Soluzione P0 implementabile senza inventare

- wordmark testuale League Spartan;
- nessun sigillo ricostruito;
- palette estratta applicata ai token semantici;
- fotografie reali shortlist nei ruoli documentari;
- card prodotto paritarie con slot media tipografico quando manca un master;
- doppia pannocchia solo come illustrazione separata se il coordinatore autorizza il JPEG nel suo campo originale;
- hero, materia, campo/filiera, catalogo, custodia e contatti secondo la nuova IA;
- inversione finale petrolio;
- motion ridotta, accessibile e non necessaria al contenuto.

P0 consente sviluppo e validazione. La pubblicazione definitiva dell'identità resta condizionata al master del marchio e ai packshot; non è necessario bloccare architettura, token o componenti.

## 22. Rischi e contromisure

| Rischio | Effetto | Contromisura |
|---|---|---|
| Copiare troppe regole del packaging | Pagina rumorosa e vintage | Un solo nastro, massimo due medaglioni, texture minima |
| Usare il logo PDF integrale | Reintroduzione di elementi esclusi | Wordmark P0 e gate master |
| Scontornare il JPEG pannocchia | Falso master e artefatti | Uso illustrativo separato o omissione |
| Monofamiglia troppo uniforme | Sito senza ritmo | Gerarchia di peso, scala, foto e colore; non aggiungere font casuale |
| Corallo troppo esteso | Affaticamento e tono promozionale | Limitare al catalogo e piccoli eventi |
| Petrolio su corallo | Contrasto insufficiente | Bruno/bordeaux su corallo |
| Vecchi pack per riempire gli slot | Catalogo non credibile | Slot tipografici e richiesta packshot |
| Styling rustico ripetuto | Effetto bottega costruita | Limitare juta/rame, usare campo e cassette reali |
| Birra con sottosistema scuro | Frattura di gamma | Stessa card e stesso set luce |
| Motion preservata per inerzia | Concept di nuovo dominante | Nessun pin, rail o prologo necessario |
| Griglia 12 troppo generica | Perdita di carattere | Carattere affidato a palette, simbolo, foto e grammatica pack |
| Corpo League Spartan poco leggibile | Affaticamento sui testi lunghi | Test a 16/17/18 px; eventuale secondo font solo dopo gate licenza |

## 23. Criteri di accettazione visuale

Il sistema è approvabile quando:

1. il primo viewport mostra nome, materia prima, luogo e una fotografia reale;
2. il sito è riconoscibile attraverso palette, pannocchia e packaging senza dipendere dal copy;
3. crema/corallo/petrolio derivano dai materiali e hanno ruoli distinti;
4. nessuna coppia cromatica insufficiente è usata per testo normale;
5. League Spartan è caricata da una fonte licenziata e nessun subset PDF viene estratto;
6. il wordmark provvisorio non viene presentato come logo definitivo;
7. nessun vecchio albero o sigillo contaminato compare nel pubblico;
8. fotografie reali precedono media generati;
9. le immagini non sono desaturate o trattate come dipinti;
10. campo, pannocchia, chicco, farina e raccolto hanno ruoli visivi distinti;
11. tutte le card prodotto, compresa La Maisèra, hanno identico peso;
12. i campi assenti collassano senza mockup o testo inventato;
13. il catalogo compare entro il 45% della pagina;
14. l'otto è una firma nel blocco materia, non la struttura del sito;
15. il campo finale è petrolio/crema, non nero/oro;
16. il motion non aggiunge altezza, non nasconde contenuto e rispetta reduced motion;
17. mobile non ha rail, caroselli, bleed o tooltip;
18. focus, target e contrasto restano validi su ogni campo;
19. packaging e sito appartengono visivamente alla stessa marca senza copiare letteralmente l'etichetta;
20. il risultato appare agricolo contemporaneo, concreto e pronto all'uso, non come esercizio editoriale autonomo.

## 24. Decisioni richieste al Brand Redesign Lead

1. Approvare League Spartan come unica famiglia P0.
2. Approvare la palette estratta e l'avorio come solo derivato da calibrare.
3. Approvare il petrolio come inversione finale in sostituzione della notte nera.
4. Approvare `IMG_6427.JPG` come candidata hero e i crop indicati.
5. Approvare il passaggio a griglia 12/8/4 non autoreferenziale.
6. Approvare card prodotto avorio su campo corallo, tutte paritarie.
7. Decidere se la doppia pannocchia JPEG può apparire temporaneamente come illustrazione separata; in assenza di approvazione, ometterla in P0.
8. Approvare gli slot tipografici temporanei al posto di vecchi pack o mockup.
9. Confermare che prologo e cinque piastre AI non sono renderizzati nei ruoli documentari.
10. Inserire nel gate di pubblicazione master logo, pannocchia trasparente, packshot gamma e foto La Maisèra.

## 25. Conclusione

Il nuovo sistema non cerca un'estetica agricola generica: trasferisce nel digitale i segnali già presenti nei prodotti e li mette a contatto con fotografie vere. Il corallo dà riconoscibilità, il crema mantiene calore, il petrolio porta ordine e contrasto, il rosso torna alla materia. League Spartan sostituisce la distanza aristocratica con una voce più diretta. Il packaging diventa la grammatica della pagina, non il suo travestimento.

La forma provvisoria è volutamente trasparente: dove manca un master si usa testo, dove manca un packshot si mantiene uno slot onesto, dove manca una prova non si genera una scena. È questa disciplina — più che un nuovo effetto — a trasformare la landing da concept autonomo a esperienza credibile di Mais Rosso Co.
