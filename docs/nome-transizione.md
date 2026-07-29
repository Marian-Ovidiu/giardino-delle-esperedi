# Transizione del nome

**2026-07-29.** Il cliente cambia nome e dominio. Parole sue: *«Cambierei il nome in generale, e di conseguenza il dominio. Lo storytelling sul giardino lo perdiamo, ma va bene così.»*

Il nuovo nome non esiste ancora e il nuovo logo nemmeno. Questo documento registra la linea seguita, che cosa è uscito, che cosa è rimasto **di proposito**, e che cosa si sblocca il giorno in cui il nome arriva.

---

## 1. La linea

Il nome faceva due lavori diversi nel sito, e solo uno dei due muore adesso.

| | Cosa fa | Decisione |
|---|---|---|
| **Identifica** | Wordmark, recapiti, copyright, dominio email, Facebook, privacy policy, `<title>` | **Resta.** È il nome legale e commerciale finché non ce n'è un altro, e i link sono reali. Toglierlo ora lascerebbe il sito anonimo e romperebbe indirizzi funzionanti. |
| **Significa** | Il mito delle Esperidi, «il Giardino» come personaggio che semina e porta le referenze alle fiere, il capitolo 08 costruito sul senso del nome | **Uscito.** È lo storytelling che il cliente ha accettato di perdere. |

Il logo dell'albero resta in tutte e tre le collocazioni, su istruzione esplicita del cliente, finché non c'è un marchio nuovo.

---

## 2. Che cosa è uscito

**Il capitolo 08, interamente.** Era il mito: il frutteto di Hera, il boschetto di meli dalle mele d'oro, le Esperidi come ninfe della sera, e la chiusa *«Il nome dell'azienda è la descrizione del lavoro. Un frutto d'oro quasi perduto…»*. Era anche il climax cromatico del sito — il campo notte, l'oro, l'inversione su kernel 64 — quindi non poteva essere cancellato: doveva essere ricostruito.

Ora poggia sull'unica cosa che non cambia col nome: **l'Ottofile è una varietà da conservazione, e una varietà da conservazione sopravvive solo finché qualcuno continua a seminarla.**

- Titolo: `Custodire / vuol dire / seminare` — tre righe da ~9 caratteri, che è un vincolo tipografico e non di stile: righe più lunghe rompono l'impostazione `t-d1` a 390px.
- Standfirst: *«Iscritta in un registro dal 2007, viva perché ancora seminata.»*
- Chiusa: *«Questo non è un catalogo. È il registro di una varietà che esiste ancora perché continua a essere seminata.»*
- `final` invariato: *«Il registro resta aperto»*.

**Nessuna asserzione nuova.** Ogni fatto del nuovo capitolo era già a registro nelle schede 01, 04 e 05: iscrizione 2007 al Registro delle Varietà da Conservazione, semina in purezza, raccolta a mano, essiccazione al sole, disponibilità legata al raccolto. La scheda 08 non aggiunge nulla, riordina.

**«Il Giardino» come soggetto che agisce**, in nove punti: *la semina in purezza* (ch01), *ne racconta l'origine* (ch02), *dichiara di adottare* (ch05), *materia prima principale del Giardino* (ch07), il railFact di ch07, *non vende online* (contatti), *direttamente con il Giardino* (percorso 03), *porta le sue referenze alle fiere*, *dove trovare il Giardino*. Tutti → **«l'azienda»**. Più `definition` dell'Amaro: *«della collezione del Giardino»* → *«della collezione aziendale»*.

**`export const myth`** in `facts.ts`: rimosso, sostituito da una nota che vieta di reintrodurlo.

**La classe `.chapter--custody__myth`** → `__testo`, in 5 punti di `components.css`. Lasciare `myth` nel codice dopo aver tolto il mito è il modo normale in cui un concetto rientra da una porta laterale.

---

## 3. Che cosa è rimasto, di proposito

**`--esperide`** (`#D9A441`) **non è stato rinominato.** L'oro sopravvive per funzione e non per racconto — è `--indice` sul campo notte, non «l'oro delle Esperidi» — quindi il colore non perde giustificazione insieme al mito. Rinominare il token adesso, prima che il nome nuovo esista, significherebbe rinominarlo due volte. Va fatto col rebrand. Nota lasciata in `tokens.css`.

**`meta.title`** invariato. È identificazione, non storytelling, e cambia col dominio.

**`package.json → name`** e la directory del progetto: invariati, sono interni.

**Il marchio dell'albero in ch08.** L'Art Director lo aveva ratificato come **citazione** e non come badge — l'albero delle Esperidi accanto al paragrafo che spiegava il nome dell'azienda (`brand-signature-ruling.md` §3). Quel paragrafo non c'è più, quindi **l'argomento della citazione non regge più**: adesso è semplicemente l'azienda che firma il proprio registro. Trattamento invariato e deliberatamente — `--pietra`, un solo inchiostro, nessun movimento — ma la collocazione **va riratificata** contro il marchio nuovo.

---

## 4. Verifica

`tests/prototype.spec.ts` → *«tells no story about the company name, which is being replaced»*.

Controlla che il vocabolario del mito non ricompaia (`frutteto`, `hera`, `mele d'oro`, `ninfe`, `tramont*`, `boschetto`, `meli`, `dorat*`, `il nome dell'azienda`), che «il Giardino» non torni a fare da soggetto, e che la scheda 08 chiuda ancora il registro con il marchio al suo posto.

Le asserzioni usano **confini di parola, non sottostringhe**: `hera` sta dentro `C-hera-sco`, che è il comune e resta. La prima stesura del test falliva esattamente lì.

**Inventario del nome nella pagina renderizzata, dopo l'intervento** — solo identificazione, in nessun punto significato:

| Dove | Cosa |
|---|---|
| `header.site-header__wordmark` | Il Giardino delle Esperidi |
| `address.contact__recapiti` | Il Giardino delle Esperidi · Azienda agricola · 12062 Cherasco (CN) |
| `div.contact__legal` | © 2026 Il Giardino delle Esperidi · Azienda agricola · Cherasco (CN) |
| `a.canale__action` ×8 | `amministrazione@giardino-delle-esperidi.com` |
| `ul.contact__social` | `GiardinodelleEsperidiShop` |
| `a` privacy | `https://www.giardino-delle-esperidi.com/privacy-policy/` |
| `<title>` | Il Giardino delle Esperidi — Mais Rosso Ottofile, varietà Albese |

**Ritmo verticale:** nessuna regressione. A 390px la pagina passa da 16.737px a **16.657px** (−80), e la scheda 08 mantiene identica altezza (2.578px) perché è pinnata. Il lavoro di taratura mobile non è stato toccato.

---

## 5. Sbloccato dal nome nuovo

1. Sostituire il nome in **7 punti renderizzati** (tabella §4) — tutti alimentati da `company` in `facts.ts` tranne `piede.privacy.href` e `meta.title`, che sono letterali.
2. **Dominio email e privacy policy**: l'indirizzo `@giardino-delle-esperidi.com` e l'URL della privacy sono link reali. Non cambiarli finché i nuovi non sono attivi, o il sito perde il canale di conversione primario.
3. **Handle Facebook** `GiardinodelleEsperidiShop`. Instagram è già `mais_rosso_company` e non si tocca.
4. **Rinominare `--esperide`** e i suoi 7 usi.
5. **Riratificare il marchio in ch08** con l'Art Director (§3).
6. `package.json → name` e la directory del progetto.
7. Riconsiderare l'ordine di `meta.title`: con un nome nuovo e senza equity di ricerca, conviene probabilmente far guidare la varietà.

## 6. Domande aperte al cliente

- **Il nuovo nome sarà `Mais Rosso Co.`?** È già il marchio della linea mais sul packaging 2026 ed è già l'handle Instagram. Se sì, il sito ha già la distinzione azienda/marchio scritta in ch07 e andrebbe collassata, non estesa.
- **La ragione sociale cambia o cambia solo il nome commerciale?** Da questo dipende se `address` e `copyright` seguono il rebrand o restano.
- Il sigillo Mais Rosso Co. per ch07 (già bloccato prima di questa richiesta) va ridisegnato comunque: se il nome converge lì, sale di priorità.
