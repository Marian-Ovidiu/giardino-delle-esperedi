# Audit critico — Il Giardino delle Esperidi

**Data:** 2026-07-27
**Metodo:** ispezione del sito renderizzato a 1440×1000, 14 frame sezione per sezione, più stato notte e footer. Nessuna valutazione fatta a memoria o sui documenti di progetto.
**Panel:** UX Lead · Creative Director · Brand Strategist · Senior Copywriter · Conversion Designer · Food Brand Specialist · Art Director

---

## Verdetto in una riga

**È un oggetto editoriale eccellente e un sito commerciale gravemente incompleto.** La direzione artistica è di livello premio; il sito non vende, non fa venire fame, non mostra il Piemonte, non mostra nessun essere umano, e ha dimenticato un'intera linea di prodotto.

---

## 0. La scoperta che invalida parte del lavoro fatto

Il brief di questo audit elenca sei prodotti:

Mais Rosso Ottofile · Gallette · Farina · **Birra** · Grissini · Amaro del Dottore

**"Birra" non compare in nessun file del progetto. Zero occorrenze in `src/`, zero in `docs/`.**

Non è una svista di copy: è un prodotto intero mai entrato nel record. La `facts.ts` è stata costruita su tre referenze confermate dal packaging, e la birra non è mai stata menzionata fino a oggi. Il sito dichiara con enfasi tipografica **"Non una gamma. Tre."** — una frase che, alla luce di questo, è **falsa**.

Questa è la prima cosa da correggere, prima di qualsiasi ritocco estetico. E impone una domanda strategica: il concept OTTO è costruito sull'idea che tutto discenda da un unico ingrediente. La birra e l'amaro **non discendono dal mais** (l'amaro viene dalle erbe officinali). Il concept non ha un posto per loro se non "allegato fuori registro", che oggi è una riga di testo.

---

## 1. Analisi per sezione

### `hero` — Copertina

| | |
|---|---|
| **Obiettivo** | Dichiarare il soggetto. Chiaro. |
| **Chiarezza** | ❌ Un visitatore **non capisce cosa vende l'azienda**. Vede il nome di una varietà di mais e coordinate GPS. Non c'è un prodotto, non c'è un'azione, non c'è un beneficio. |
| **Gerarchia** | Corretta e forte: il nome della varietà domina, tagliato dal bordo. |
| **Brand** | Alto. Non somiglia a nessun'altra azienda agricola. |
| **Conversione** | Nessuna. Nessuna CTA, nessuno scroll hint. Era una scelta deliberata; a 15.311 px di pagina è una scelta costosa. |
| **Design** | Il pezzo migliore del sito. Bodoni a 208px tagliato dal viewport è una decisione vera. |

**Il problema:** funziona come copertina di un catalogo di museo. Ma il visitatore medio di un'azienda agricola arriva da Instagram o da una ricerca, e in 3 secondi deve capire *che si mangia*. Oggi non lo capisce.

---

### `ch01 — La varietà`

- **Obiettivo:** chiaro. Cosa viene registrato.
- **Copy:** ottimo. *"Una varietà dell'Albese tra quelle a maggior rischio di estinzione in Piemonte"* è concreto e ha una posta in gioco.
- **Design:** la colonna dati a destra è il dispositivo più riuscito del sito — comunica rigore senza dirlo.
- **Immagine:** il campo di chicchi WebGL è astratto e sobrio, ma **non è cibo**. Non emoziona, non fa venire appetito, non aumenta il valore percepito del prodotto. Racconta "biodiversità" a un designer; a un compratore non racconta niente.

---

### `ch02 — Il mais del Re`

**La sezione peggiore del sito.** Un frame quasi interamente vuoto: tre righe di testo in alto a sinistra, una colonna dati a metà altezza, e circa **1.400 px verticali di carta bianca**.

- Il vuoto qui non legge come lusso: legge come pagina non finita.
- La storia — un re che impone la semina di un mais — è **il miglior aneddoto che l'azienda possieda**, e viene liquidata in una frase subordinata con un `[DA VERIFICARE]` implicito sulla data.
- Nessuna immagine, nessun documento, nessuna data, nessun ritratto, nessun riferimento visivo al Regno di Sardegna.

**Occasione sprecata in modo netto.**

---

### `ch03 — Otto file`

- Concettualmente il cuore del sito ed è ben eseguito: il numero 8 diventa griglia, indice, ritmo.
- **Ma le otto file non si vedono mai.** Non c'è una fotografia, una sezione trasversale, un disegno botanico. Il sito afferma "esattamente otto" e non lo dimostra mai visivamente. La rail conta 64 segni, che è un'astrazione dell'interfaccia, non una prova.
- Per un brand che vende rarità, **non mostrare la cosa rara è un errore strutturale**.

---

### `ch04 — Quasi estinto`

- La frase *"Una varietà a rischio non si conserva in un archivio: si conserva seminandola ogni anno"* è **la migliore del sito** e l'unico momento in cui il registro diventa un argomento d'acquisto.
- È sepolta a metà pagina, in corpo testo, senza risalto tipografico. Dovrebbe essere un momento display.

---

### `ch05 — Il campo`

- Agricoltura simbiotica spiegata bene e senza claim illegali.
- `CONCIMI CHIMICI —` / `PESTICIDI —` con il trattino è un tocco eccellente: registra l'assenza invece di vantarla.
- **Ma non c'è il campo.** La sezione si chiama "Il campo" e non contiene un campo. Nessuna terra, nessuna pianta, nessuna stagione, nessun Piemonte.

---

### `ch06 — La pietra`

- `CHICCO / FARINA` con la barra in `--chicco` è il miglior momento tipografico dopo l'hero.
- La macinatura a pietra è un asset commerciale forte (è tattile, artigianale, verificabile) e viene raccontata solo a parole.
- **Nessuna immagine della pietra, della farina, della macina.** Per un prodotto la cui differenza è *materiale*, è un'omissione grave.

---

### `ch07 — Tre referenze`

**La sezione commercialmente più importante, e la più debole.**

- I tre prodotti sono presentati **solo come parole**. Nessuna confezione, nessun prodotto, nessun contesto d'uso, nessun piatto.
- Layout a scaletta diagonale: elegante, ma i tre blocchi sono sfalsati verticalmente in modo che **non si confrontano**. Il lettore non può paragonarli con un colpo d'occhio, che è esattamente ciò che serve in una sezione prodotto.
- `Maissini` non ha peso netto: corretto (non è confermato), ma visivamente crea un buco nella griglia rispetto agli altri due.
- **Manca la birra.** Manca il prezzo, la disponibilità, dove si compra, se si spedisce.
- Amaro del Dottore ridotto a una riga "fuori registro": per un prodotto reale è quasi una dichiarazione di disinteresse.
- Una sola CTA in tutto il sito, `Richiedi disponibilità`, come link di testo.

**Domanda del Conversion Designer:** cosa deve fare esattamente un ristoratore di Alba che arriva qui e vuole 20 kg di farina? Oggi: scrivere una mail a freddo, senza sapere se è possibile.

---

### `ch08 — Custodia` (notte)

- **Il momento migliore del sito.** L'inversione a nero con il display in oro e il mito delle Esperidi in corsivo Bodoni funziona: è memorabile, è il "screenshot moment", ed è meritato dopo sette capitoli di carta.
- Il mito è finalmente usato come architettura e non come aneddoto.
- ⚠️ **Difetto reale osservato:** durante la transizione il fondo attraversa un grigio-fango (~#6B655C) su cui il display grande resta illeggibile per alcune centinaia di ms. Il momento più importante del sito ha una fase di transito brutta.

---

### `contatti` + `piede`

**Due bug di layout visibili, sulla sezione che converte.**

1. Email e telefono si toccano senza spazio: `amministrazione@giardino-delle-esperidi.com338 286 6127`. Sembra rotto, e riduce la fiducia esattamente dove serve.
2. Il copyright nel footer si sovrappone/tronca contro `PRIVACY POLICY`.
3. Enorme vuoto verticale tra l'occhiello e i contatti veri.
4. Nessuna P. IVA (già segnalato: probabile obbligo D.Lgs. 70/2003).
5. Nessun indirizzo completo, nessuna mappa, nessun orario, nessun "dove trovarci".

---

## 2. Le domande chiave

### «Il Mais Rosso è il vero protagonista?»

**Sì, concettualmente. No, sensorialmente.** È protagonista come *soggetto documentale*: tutto il sito è costruito su di lui. Ma non lo si vede mai, non lo si sente, non se ne immagina il sapore. È protagonista come una voce di catalogo è protagonista di un archivio.

### «Il Piemonte si sente?»

**No.** "Piemonte", "Cherasco", "Langhe e Cuneese" compaiono come *valori di campo dati*. Non c'è una collina, una nebbia, una luce, una stagione, un dialetto, un nome di persona. **Il sito potrebbe essere di un'azienda del Michigan.** Per un brand il cui asset principale è il territorio, è una perdita enorme.

### «Perché comprare questi invece che al supermercato?»

Il sito risponde solo a metà. Emerge chiaramente: *è raro, sta scomparendo, otto file, macinato a pietra, senza chimica.*

**Non emerge:** che sapore ha, cosa ci faccio, chi lo fa, quanto costa, dove lo compro, perché dovrei fidarmi di loro invece che di un altro produttore di mais antichi (che in Piemonte esistono — il mio stesso research iniziale ne ha trovati almeno cinque).

**Manca la prova.** Il sito afferma con grande autorevolezza tipografica, ma non dimostra quasi nulla.

### «Cosa aumenta e cosa riduce la fiducia?»

**Aumenta:** il rigore dei dati, l'assenza di claim gonfiati, la disciplina del copy, la mancanza di superlativi, l'aver evitato i claim nutrizionali illegali.

**Riduce:** zero foto reali, zero volti, zero prezzi, zero P. IVA, i due bug di layout nei contatti, "Non una gamma. Tre." che è falso, e l'assenza totale di prova visiva per ogni affermazione fatta.

---

## 3. Voti

| Area | Voto | Nota |
|---|:---:|---|
| **Brand** | **7,5** | Distintivo e non generico. Perde punti perché l'austerità ha rimosso il calore umano di un'azienda familiare. |
| **Storytelling** | **6** | Arco narrativo ottimo sulla carta, affamato di prove. Blocchi collegati concettualmente, non emotivamente. |
| **UX** | **4,5** | 15.311 px per pochissimo contenuto. Vuoti enormi. Una sola CTA. Due bug visibili nei contatti. |
| **Copy** | **8,5** | Il vero punto di forza. Asciutto, concreto, legalmente accorto. Una frase eccellente sprecata in corpo testo. |
| **Visual** | **7** | Tipografia superba, sistema colore rigoroso. **Zero fotografia** su un brand alimentare. |
| **Conversione** | **2** | Un `mailto:`. Nessun prezzo, listino, disponibilità, form, shop, rivenditori. |
| **Valore percepito** | **5** | Design premium, prodotto invisibile. Non si desidera ciò che non si vede. |
| **Memorabilità** | **7,5** | Il registro, i 64 chicchi e l'inversione notte si ricordano. |
| **Premium perception** | **6** | Legge premium a un designer, "vuoto/incompleto" a un compratore. |
| **MEDIA** | **6,0** | |

---

## 4. Cosa funziona già molto bene

1. **Il concept OTTO.** Un vincolo strutturale vero (otto file → otto colonne → otto capitoli). Leggibile in una frase.
2. **Il copy.** Asciutto, senza *eccellenza/passione/autentico*. Corregge il difetto principale del sito attuale.
3. **La disciplina legale.** Aver rimosso i claim nutrizionali (Reg. 1924/2006) e il termine *biologico* non certificato è lavoro professionale serio.
4. **L'inversione del capitolo 08.** Meritata, memorabile, unico evento cromatico.
5. **La colonna dati registro.** Comunica rigore senza affermarlo.
6. **`CONCIMI CHIMICI —`.** Registrare l'assenza con un trattino invece di vantarla.
7. **L'hero tagliato dal bordo.** Decisione vera, non decorazione.
8. **Il sistema tipografico.** Bodoni/Archivo/DM Mono con ruoli rigidi e motivati.
9. **`CHICCO / FARINA`** con la barra in colore indice.
10. **Il rigore del sistema colore.** Sette valori, `--chicco` mai come riempimento.

---

## 5. Errori gravi

Tutto ciò che oggi impedisce il livello premium, in ordine di gravità.

1. **La birra non esiste nel sito.** Prodotto intero mancante. E `"Non una gamma. Tre."` è quindi una dichiarazione falsa.
2. **Zero fotografia su un brand alimentare.** Nessun prodotto, nessun cibo, nessuna materia prima, nessun luogo, nessuna persona. È il difetto che, da solo, tiene il sito fuori dal livello premium: il lusso alimentare si vende con il desiderio, e il desiderio è visivo.
3. **Conversione praticamente assente.** Una CTA `mailto:` in 15.000 px. Nessun prezzo, nessuna disponibilità, nessun rivenditore, nessun form.
4. **Il territorio non esiste.** Il Piemonte è un valore di campo dati.
5. **Nessuna presenza umana.** "Filiera controllata" e "coltivazione diretta" sono affermazioni su *persone che lavorano*. Non c'è nessuno.
6. **Il vuoto è diventato spazio morto.** Il "reserved void" era una scelta di composizione; a questa densità di contenuto è pagina non finita (ch02 e ch05 in particolare).
7. **Due bug di layout nei contatti.** Email/telefono attaccati, footer sovrapposto. Sulla sezione che converte.
8. **Le otto file non si vedono mai.** Il sito afferma la sua unica prova verificabile e non la mostra.
9. **Amaro ridotto a una riga.** Un prodotto reale trattato come nota a piè di pagina.
10. **Transizione dell'inversione con fase illeggibile** (~#6B655C).
11. **P. IVA assente.**

---

## 6. Opportunità non sfruttate

| Opportunità | Cosa si perde oggi |
|---|---|
| **Storia del mais** | Il decreto di Vittorio Emanuele II è liquidato in una frase. È materiale da capitolo intero, con data, contesto, documento. |
| **Il fondatore / la famiglia** | Assente. Chi ha deciso di riprendere una varietà quasi estinta? Perché? È **la storia più vendibile che l'azienda possiede** e non c'è. |
| **Mito delle Esperidi** | Usato bene, ma solo alla fine. Potrebbe informare il naming dei prodotti, le stagioni, la luce. |
| **Filiera** | Dichiarata a parole ("semina · raccolta · trasformazione") mai mostrata. Tre foto la renderebbero prova. |
| **Territorio** | Langhe, Cherasco, nebbia, stagioni: tutto assente. |
| **Lavorazioni** | La macinatura a pietra è tattile e cinematografica. Non mostrata. |
| **Biodiversità** | Concetto forte ridotto a una riga di dati. |
| **Ricette** | Polenta tradizionale e col Bimby esistono nel materiale e sono state **tagliate**. Sono il ponte fra "varietà rara" e "stasera cosa cucino". |
| **Esperienza sensoriale** | Nessun accenno a colore, profumo, grana, sapore, consistenza. Per un prodotto alimentare è l'omissione più costosa. |
| **Stagionalità / raccolto** | "Si conserva seminandola ogni anno" implica un ciclo. Mai mostrato. |
| **Prova sociale** | Nessun ristorante, nessuna bottega, nessun mercato, nessuna citazione. |
| **Confronto** | Nessun paragone con il mais commerciale: sarebbe la dimostrazione più immediata della differenza. |

---

## 7. Roadmap

### PRIORITÀ 1 — impatto massimo (senza queste, non è un sito premium)

1. **Chiarire la gamma reale con il cliente e riscrivere la sezione prodotti.** Inserire la birra. Verificare se esistono altri prodotti mai emersi. Eliminare `"Non una gamma. Tre."` o renderla vera. Decidere dove vivono birra e amaro nel concept, dato che non discendono dal mais.
2. **Fotografia reale.** È l'intervento a più alto ritorno del progetto. Minimo vitale: 3 packshot dei prodotti, 1 macro della farina, 1 macro della pannocchia che mostri le otto file, 2 del territorio, 1 della macinatura, 1 umana (mani al lavoro). **Non generarle con l'AI: otto tentativi su due famiglie di modelli sono già falliti proprio sul realismo alimentare.** Serve uno shooting vero, o materiale del cliente.
3. **Costruire la conversione.** Definire con il cliente: si vende online? si spedisce? c'è un listino? ci sono rivenditori? Poi progettare CTA reali, ripetute, con un percorso. Oggi il sito non ha un obiettivo commerciale.
4. **Correggere i due bug dei contatti** e aggiungere la P. IVA.

### PRIORITÀ 2 — alto impatto

5. **Aggiungere le persone.** Una sezione sul recupero della varietà: chi, quando, perché. Con un volto.
6. **Far vedere le otto file.** La prova visiva dell'unica affermazione verificabile del brand.
7. **Portare il Piemonte dentro.** Territorio come capitolo, non come campo dati.
8. **Recuperare le ricette.** Ponte fra rarità e uso quotidiano; già disponibili e verificate.
9. **Promuovere la frase di ch04** a momento display.
10. **Ridurre il vuoto morto** in ch02 e ch05: o riempirli di contenuto vero, o accorciarli.

### PRIORITÀ 3 — rifinitura

11. Rivedere la scaletta diagonale di ch07 così che i tre prodotti siano confrontabili.
12. Correggere la fase di transito grigia dell'inversione.
13. Dare all'Amaro una presenza degna.
14. Aggiungere descrizione sensoriale ai prodotti.
15. Aggiungere prova sociale quando disponibile.

---

## 8. Nota finale del panel

Il lavoro fatto ha una qualità che va difesa: **il concept, il copy e il sistema tipografico sono di livello alto e non vanno annacquati.** Il rischio, correggendo, è di trasformarlo nel solito sito agricolo caldo e rassicurante — e sarebbe uno spreco.

Ma va detto con chiarezza: **oggi questo è un magnifico contenitore quasi vuoto.** È stato costruito il sistema — griglia, colore, tipografia, movimento, regole — e non è stata costruita la sostanza: prodotti, prove, luogo, persone, desiderio, acquisto.

La buona notizia è che il difficile è fatto. Il sistema regge; deve solo ricevere il contenuto che merita. Le fotografie e la gamma reale, da sole, porterebbero la media da 6,0 a circa 8,5.
