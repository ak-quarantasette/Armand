# Segnalibro di progetto: sito A.M. Costruzioni

Claude legge questo file a inizio sessione: contiene tutto il contesto, quindi non serve rileggere altro.
Va aggiornato a ogni modifica (sezioni "Stato" e "Registro") e tenuto breve.


## Stato (aggiornato 2026-11-16)

- **Fase in corso**: fasi 1-3 chiuse. Fase 4 (verifiche) fatta con Chromium su telefono, tablet e computer;
  manca solo la prova su iPhone, che fa l'utente. Fase 5 (pubblicazione) avviata: il sito è su `main` e
  l'anteprima è su GitHub Pages, https://ak-quarantasette.github.io/Armand/ (vedi "Pubblicazione").
- **Scelte già confermate**: caratteri A, logo dell'azienda in alto a destra con i colori attenuati come unico
  marchio, apertura a mattoni con ombra e spessore, testi approvati (si parla solo di "consulenza gratuita").
- **Scelte cambiate dall'utente il 2026-11-16 (valgono queste, non quelle del piano)**:
  - il marchio nuovo "Tetti" (monogramma AM e scritta) è stato tolto ovunque: resta solo il logo
    dell'azienda, in alto a destra, nel piede, nelle due aperture e come icona;
  - i colori di fondo passano in modo continuo da bianco freddo in cima a toni caldi in fondo
    (vedi "Scorrimento"); la fascia scura finale è bruno caldo `#2C241E`, non più ardesia.
- **Anteprime vecchie** (artifact privati dell'utente; si leggono con lo strumento Artifact). Servono solo come
  storico, ora fa fede il sito costruito:
  grafica https://claude.ai/artifact/8Fb5WGHMtMJ6gDYfgVgBQq ·
  prototipo "La posa" https://claude.ai/artifact/EmAnJNbVSZL4S1vYoGRsTX ·
  testi https://claude.ai/artifact/6gQLwvxVkgP78eZmE5bhvb ·
  schermate della prima versione https://claude.ai/artifact/MBtbF8rMkiibHqMq1uv5XL.
- **Prossimo passo**: l'utente guarda l'anteprima da iPhone e da computer e dice cosa cambiare. Poi Cloudflare
  per il sito definitivo.
- **In attesa dall'utente**:
  - commenti sull'anteprima e prova su iPhone;
  - creare il progetto su Cloudflare (passi in "Pubblicazione") quando vuole pubblicare davvero;
  - il dominio (proposte in "Progetto"): quando c'è, va scritto in `astro.config.mjs`.

## Progetto

- **Cliente**: A.M. Costruzioni snc, impresa edile di Fara Gera d'Adda (BG).
- **Servizi**: ristrutturazioni complete, ristrutturazioni interni, ristrutturazioni spazi commerciali, manutenzione e nuove coperture.
- **Obiettivi**: buona SEO locale, grafica di alta gamma, sito veloce e fluido, perfetto su telefono e computer, animazione d'apertura.
- **Contatti da pubblicare**: due numeri di telefono, un'email e il comune (Fara Gera d'Adda 24045, BG).
  Stanno in `src/data/sito.ts` insieme ai dati legali (vedi "Riservatezza").
- **Canali di contatto sul sito**: chiamata, WhatsApp, email. Niente modulo, niente cookie, niente banner.
- **Dominio**: non esiste ancora. Proposte da verificare: amcostruzionisnc.it, am-costruzioni.it, amcostruzionifara.it.
- **Vecchio sito**: una pagina Jimdo provvisoria, da cancellare quando il nuovo è online. Nessun posizionamento da preservare.

## Decisioni prese (piano approvato il 2026-11-16, non riaprirle)

- **Stile**: chiaro ed elegante. Riferimento dell'utente: terakawaoffice.com/en/ (piace l'impaginazione e lo scorrimento).
  Da lì si prendono i principi, non la copia: impaginazione ariosa da rivista, foto sfalsate su due colonne,
  titoli che salgono da dietro una maschera, comparsa lenta delle foto, scorrimento nativo del browser.
- **Scorrimento che racconta**: nel riferimento lo sfondo cambia come le ore del giorno; qui diventa
  l'avanzamento del cantiere, dal grezzo al finito, con una guida verticale a sinistra su computer.
- **Colori**: calce `#F5F4F0` (sfondo), antracite `#1F2327` (testi), pietra `#5E656B` (testi secondari),
  ardesia `#252C33` (fascia scura contatti), blu del logo `#184898` (link e pulsanti),
  rosso del logo `#902020` (solo piccoli dettagli). Il verde del logo non si usa.
- **Caratteri** (confermati): Marcellus per i titoli, stile lapidario, e IBM Plex Sans per i testi.
  Da ospitare sul sito, non da Google.
- **Marchio nuovo** (confermato, proposta 1 "Tetti"): scritta "A.M. Costruzioni" e monogramma AM disegnato
  come linea di tetti (tre punte = le tre case del logo attuale); i due puntini di "A.M." sono blu e rosso.
  Si usa nelle due aperture, nel piede e come icona del sito.
- **Logo dell'azienda**: l'utente vuole vederlo di più. Va nell'intestazione come link alla Home e nel piede
  su una targhetta bianca. È ricalcato in vettoriale in `materiali/logo/` (da alleggerire con SVGO in fase 3).
  Scelta dell'utente: in alto a destra, con i colori attenuati (`logo-attenuato.svg`: cambiano solo i verdi,
  più spenti, e il nero che diventa antracite).
- **Foto**: poche e al massimo 1440 px di lato. Mai a tutto schermo su computer: in cornici dove restano nitide.
- **Struttura**: Home, una pagina per ciascuno dei 4 servizi, Lavori, Chi siamo, Contatti, Privacy/Note legali.
  Home: apertura, prima/dopo della facciata, servizi, lavori, come lavoriamo, zone servite, contatti.
- **SEO**: testi scritti da Claude per le ricerche locali, dati strutturati di attività locale, sitemap,
  titoli e descrizioni per pagina. Niente recensioni inventate. Poi Google Business Profile e Search Console.
- **Testi**: li scrive Claude con le frasi tipiche di un'impresa edile, come ha chiesto l'utente; si può
  scrivere "dal 2017". Stanno in `contenuti/` (Markdown con titolo e descrizione per Google); contatti e dati
  legali sono segnaposto `{{...}}`. Niente numeri, certificazioni o recensioni inventati.
- **Tecnica**: sito statico con Astro 7 (`npm run build` crea `dist/`), quasi zero JavaScript, immagini
  AVIF/WebP, caratteri ospitati sul sito. Lighthouse da telefono misurato sulla home: 98 prestazioni, 100
  accessibilità, buone pratiche e SEO (prima versione). Hosting gratuito: Cloudflare per il sito definitivo
  (scelta dell'utente), GitHub Pages solo come anteprima alternativa. Vedi "Pubblicazione".

## Animazioni d'apertura

Regole comuni: una volta per visita, sempre saltabili, contenuto vero già caricato sotto,
dissolvenza semplice se l'utente ha "riduci animazioni".

- **Computer, "La posa"** (interattiva, 5-8 secondi): parete di tessere dal lato grezzo (pietra grigia
  generata dal codice, tipo ceppo di Gré); passando il cursore le tessere si girano e mostrano il lato
  finito, intonaco bianco con il nuovo marchio. Senza movimento parte un'onda automatica. Alla fine la
  parete diventa lo sfondo della pagina. Scelta dell'utente: i mattoni, al posto delle tessere che si girano.
  Il muro si costruisce corso per corso, i mattoni colpiti si crepano, si staccano e cadono con la polvere,
  quelli senza appoggio li seguono, e dietro resta la parete finita. Il muro è una foto vera (Poly Haven
  `brick_wall_006`, licenza CC0) con la luce cotta dalla mappa delle normali: l'utente lo vuole "come dal vivo".
  In `materiali/muro/` ci sono la foto, le sagome dei mattoni e le 405 celle
  `[x, y, larghezza, altezza, corso dal basso]` in pixel su 2048x1152.
  Il prototipo (p5.js, skill `algorithmic-art`) resta come riferimento; nel sito è riscritta in
  `src/scripts/muro.js`, canvas senza librerie, con ombra lontana, ombra vicina e spessore del muro: l'utente ha
  chiesto l'effetto "doppio fondo". Parte solo con `(hover: hover) and (pointer: fine)` e schermo da 900 px in su.
  Durata misurata: 7-8 secondi se nessuno tocca nulla (dopo 3 secondi di muro finito crolla da solo); finché il
  visitatore gioca col mouse va avanti, al massimo 7,5 secondi di gioco. Clic, tasto o rotella: crolla subito.
- **Telefono** (automatica, circa 2 secondi): compare il logo dell'azienda, poi la schermata si apre a
  lamelle orizzontali. Solo CSS. Anche su computer dietro il muro c'è il logo dell'azienda.

## Scorrimento (com'è fatto)

- **Comparsa lenta**: titoli con classe `maschera` e foto o blocchi con classe `entra` compaiono in 1,2 secondi
  quando entrano nello schermo, come nel sito di riferimento (lì 1,4 s, stessa curva morbida). Lo fa un piccolo
  script in testa a `Base.astro`: mette `moto` su `<html>` e `visto` sugli elementi. Senza JavaScript o con
  "riduci animazioni" tutto è visibile da subito. Funziona su tutti i browser.
- **Guida a sinistra** (solo home, da 1200 px di larghezza): il segno blu scende da Sopralluogo a Consegna e la
  tappa in corso si scurisce. Sotto i 1500 px le tappe sono scritte in verticale nel margine. Sta dentro il
  blocco `.racconto` di `index.astro` (tutte le sezioni chiare) e se ne va prima della fascia scura.
  È CSS puro legato allo scorrimento: nei browser che non lo gestiscono non compare.
- **Trappola già incontrata**: mai scrivere `animation: ...` insieme ad `animation-timeline`. Il compattatore
  del CSS li fonde in una forma che i browser scartano: in `npm run dev` funziona, nel sito costruito il
  movimento sparisce senza errori. Usare le proprietà lunghe (`animation-name`, ...), come in `Guida.astro`.
  Le animazioni vanno sempre controllate sul sito costruito, in movimento, non su schermate ferme.
- **Colori che cambiano scorrendo** (richiesta dell'utente): uno script in testa a `Base.astro` scrive in
  `--caldo` quanto si è scesi (0-1); in `global.css` sfondo, fasce e filetti sono miscele `color-mix` tra le
  coppie `--f-*` (freddo) e `--c-*` (caldo). Vale per tutte le pagine. Per ritoccare i toni si cambiano le coppie.

## Pubblicazione

- **Modalità anteprima**: finché `DOMINIO` in `astro.config.mjs` è vuoto, ogni pagina ha `noindex`, niente
  indirizzo canonico e niente sitemap. Scrivendo lì il dominio il sito diventa indicizzabile da solo.
  Non dimenticarlo quando arriva il dominio: è l'unico interruttore.
- **Cloudflare** (definitivo): `wrangler.jsonc` pubblica `dist/` come sito statico su Workers, con pagina 404.
  Nella dashboard: Workers & Pages → Create application → Import a repository → repo `Armand`, nome progetto
  `armand` (uguale a `wrangler.jsonc`, altrimenti la costruzione fallisce), build `npm run build`, deploy
  `npx wrangler deploy`. Indirizzo gratuito `armand.<account>.workers.dev`. `public/_headers` tiene
  `workers.dev` e `pages.dev` fuori da Google e dà memoria lunga ai file in `/_astro/`. Per il dominio vero i
  nameserver devono essere quelli di Cloudflare. Se un giorno l'indirizzo `workers.dev` diventasse quello
  definitivo, va tolta la sua regola da `_headers`.
- **GitHub Pages** (anteprima, https://ak-quarantasette.github.io/Armand/): l'utente l'ha acceso come nei suoi
  altri siti, cioè "Deploy from a branch" → `main` → `/ (root)`. In quella modalità GitHub pubblica i file
  della repo così come sono (il sorgente Astro da solo faceva fallire la costruzione), quindi su `main` ci
  sono anche le pagine pronte: `anteprima/` (sito costruito con base `/Armand/anteprima`), `index.html` e
  `404.html` alla radice (copie di quelli in `anteprima/`) e `.nojekyll`. Sono file generati: non si toccano
  a mano e non serve rifarli nelle pull request. Li rifà `.github/workflows/anteprima-github-pages.yml` a
  ogni modifica di `main`: costruisce, salva su `main` come `github-actions[bot]` e chiede a Pages di
  ripubblicare. Dopo un'unione l'anteprima si aggiorna quindi in due o tre minuti, e `main` riceve un
  salvataggio in più: ripartire sempre da `main` aggiornato. Per rifarli a mano:
  `SITO_BASE=/Armand/anteprima ANTEPRIMA_URL=https://ak-quarantasette.github.io npm run build`, poi copiare
  `dist/` in `anteprima/` e i due file alla radice. Non cambiare l'impostazione di Pages in "GitHub Actions":
  il flusso non pubblica in quel modo. Quando il sito sarà su Cloudflare questa anteprima si può spegnere e
  si possono cancellare `anteprima/`, `index.html`, `404.html`, `.nojekyll` e il flusso.
- **Quando arriva il dominio**: scriverlo in `DOMINIO`, collegarlo su Cloudflare, poi Search Console, scheda
  Google Business Profile e cancellazione della vecchia pagina Jimdo.

## Riservatezza (richiesta esplicita dell'utente)

- Dati legali e personali il meno visibili possibile, nei limiti di legge.
- P.IVA: per legge va sulla home, quindi in piccolo nel footer. Ragione sociale completa, sede legale e REA
  solo in una pagina "Note legali" collegata dal footer.
- Mai pubblicare né salvare nella repo: codici fiscali di persone, indirizzi privati, PEC, nomi dei soci
  oltre a quanto compare nella ragione sociale.
- Niente testo nascosto con trucchi (bianco su bianco e simili): non è a norma e penalizza la SEO.
- Decisione aggiornata dall'utente (2026-11-16): quello che compare sul sito è pubblico comunque, quindi non è
  riservato e sta in chiaro nella repo. Telefoni, email, P.IVA, ragione sociale, sede legale e REA sono in
  `src/data/sito.ts` (niente più variabili d'ambiente). Il numero WhatsApp è il primo dei due telefoni.
  Resta valida la richiesta sulla visibilità nel sito: dati legali in piccolo e fuori dai punti in vista.

## Fasi

1. Anteprima visiva fuori dalla repo (artifact): colori, caratteri, marchio, due animazioni. L'utente sceglie.
2. Struttura e testi: bozza di tutte le pagine da far controllare.
3. Costruzione nella repo.
4. Verifiche: telefono, tablet, computer, velocità, accessibilità, dati SEO. Qui c'è solo Chromium:
   la prova su iPhone la fa l'utente.
5. Pubblicazione: hosting, dominio, Search Console, scheda Google.

## Materiali

- `materiali/originali/`: logo attuale e 27 foto dell'utente, al massimo 1440 px di lato. Le 16 arrivate il
  2026-11-16 sono tetti (coppi, lamiera, fasi del rifacimento) e cantieri (massetti, vespaio, solaio, scavo).
  Le foto nuove l'utente le carica nella cartella principale di `main`: vanno rinominate e spostate qui.
  Finiti: facciata prima e dopo dello stesso edificio, bagno con doccia, parete con carta da parati,
  soggiorno, cucina-soggiorno, sala da pranzo, scala in legno. In corso d'opera: doccia in muratura,
  massetto, stanza in cantiere. Sono già leggere: il sito ne genera versioni AVIF/WebP per ogni schermo.
- `materiali/logo/`: logo dell'azienda in SVG (colori originali e attenuati) e monogramma "Tetti".
- `materiali/muro/`: foto del muro di mattoni, sagome e celle per l'apertura da computer.
- `contenuti/`: testi delle 9 pagine (home, 4 servizi, lavori, chi siamo, contatti, note legali).

## Codice del sito

- `src/data/sito.ts`: dati dell'azienda, contatti e dati legali. `src/data/foto.ts`: foto e testi alternativi.
- `src/lib/testi.ts`: legge `contenuti/*.md`, unica fonte dei testi, e li passa alle pagine.
- `src/lib/percorsi.ts`: `u('/pagina/')` per ogni link interno, così il sito funziona anche in sottocartella.
- `astro.config.mjs`: riga `DOMINIO` (vuota = anteprima, non indicizzata) e sottocartella `SITO_BASE`.
- `src/layouts/Base.astro`: testa della pagina, dati per Google e i due script in linea: comparsa lenta
  mentre si scorre e scelta dell'apertura.
- `src/components/`: Intestazione, Piede, Apertura (logo e lamelle), Foto, Azioni, Guida.
- `src/scripts/muro.js`: apertura a mattoni; usa `public/apertura/` e `materiali/muro/celle.json`.
- `src/pages/`: home, `[servizio]` (4 pagine), lavori, chi-siamo, contatti, note-legali, 404, robots.txt.
- Prova: `npm run build`, servire `dist/` (`python3 -m http.server -d dist`) e guardare con Playwright.
  Per provare come su Cloudflare (404, barre finali, intestazioni): `npx wrangler dev`.

## Regole di lavoro

- Rispondere in italiano semplice: l'utente non è un tecnico.
- Prima il piano, poi il lavoro: l'utente vuole approvare le scelte importanti.
- Il sito si pubblica da `main`: l'anteprima su GitHub Pages (e poi Cloudflare) segue quel ramo. Si lavora su
  un ramo `claude/...` e si porta su `main` con una pull request solo quando l'utente lo chiede o dà l'ok.
  Le modifiche si fanno in `contenuti/` e `src/`, mai nei file generati (`anteprima/`, `index.html`, `404.html`).
  I vecchi rami `claude/youthful-hamilton-7pq7ob` e `claude/vigilant-ptolemy-vvojok` sono già dentro `main`.
- Skill da usare: `frontend-design` per la grafica, `algorithmic-art` per l'animazione da computer.
  L'utente ha installato il plugin Design: `design:accessibility-review` e `design:design-critique` servono
  nelle verifiche della fase 4.

## Ambiente

- jimdosite.com e ufficiocamerale.it rispondono 403 dal cloud (blocco Cloudflare): non insistere,
  chiedere il materiale all'utente.
- Google Fonts e cdnjs sono raggiungibili. Playwright con Chromium è preinstallato.
- Dati personali che non compaiono sul sito non vanno scritti nella repo: se servono, chiedere prima all'utente.

## Registro

- 2026-11-16: piano approvato; creato questo segnalibro; salvati i materiali originali.
- 2026-11-16: pubblicate le due anteprime della fase 1. Il monogramma è una polilinea SVG:
  `-3.2,110 32,0 64,100 84,0 108,62 132,0 154,110` in viewBox `-6 -13 164 113`, tratto 7,
  più la traversa della A da `16.5,66` a `47.5,66`, tratto 3.6.
- 2026-11-16: l'utente conferma caratteri A e marchio 1, carica 7 foto e chiede più presenza del suo logo e i
  mattoni nell'apertura. Fatti: logo ricalcato in vettoriale, seconda bozza dell'anteprima, modalità mattoni
  nel prototipo.
- 2026-11-16: l'utente sceglie logo a destra, colori attenuati e mattoni, chiede un muro realistico e dice di
  scrivere i testi con buone frasi da impresa edile. Fatti: muro da foto vera nel prototipo, terza bozza
  dell'anteprima, prima bozza dei testi in `contenuti/` e nella pagina di lettura.
- 2026-11-16: l'utente approva i testi (solo "consulenza gratuita"), chiede più ombra nel muro e meno dati
  personali possibile nella repo. Fatti: ombra e spessore nel prototipo, testi aggiornati, sito costruito con
  Astro (10 pagine, due aperture, dati sensibili da variabili d'ambiente), controlli Lighthouse.
- 2026-11-16: l'utente decide che i dati che compaiono sul sito non sono riservati e sceglie Cloudflare, con
  prima un'anteprima gratuita. Fatti: contatti e dati legali in `src/data/sito.ts` (ricontrollati sulla
  visura), modalità anteprima, link adatti a una sottocartella, `wrangler.jsonc`, `_headers`, flusso per
  GitHub Pages, README aggiornato.
- 2026-11-16: verifiche della fase 4. Trovato e corretto: le animazioni di scorrimento nel sito costruito non
  funzionavano (vedi "Scorrimento"), la guida si vedeva solo oltre 1500 px, l'apertura da computer durava più
  di 10 secondi, in Lavori la coppia prima/dopo era minuscola su telefono, sui tablet mancava la barra Chiama.
  Esito: 90 aperture di pagina senza errori né link rotti (3 varianti, 3 larghezze), axe-core senza
  violazioni, home su telefono lento: elemento principale visibile in 0,7 s, 199 KB. Lighthouse in questa
  sessione è stato negato dal controllo dei permessi: la velocità è misurata con Playwright.
- 2026-11-16: con l'ok dell'utente il lavoro è stato unito a `main` (pull request #1). L'utente sceglie GitHub
  Pages per la prima anteprima; Cloudflare resta la scelta per il sito definitivo.
- 2026-11-16: l'utente accende Pages in modalità "Deploy from a branch" e la costruzione di GitHub fallisce
  sui file `.astro`; chiede di farlo funzionare così, con un index come negli altri suoi siti. Fatti: pagine
  pronte su `main` (`anteprima/`, `index.html`, `404.html`, `.nojekyll`) e flusso che le aggiorna da solo.
- 2026-11-16: l'utente vede l'anteprima e chiede tre modifiche. Fatte: colori dal freddo al caldo lungo la
  pagina, solo il logo dell'azienda (tolto il marchio "Tetti", anche dalle aperture), 16 foto nuove in Lavori,
  nella pagina Coperture e in home. Didascalie scritte guardando le foto: da far confermare.
