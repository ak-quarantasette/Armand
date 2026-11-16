# Segnalibro di progetto: sito A.M. Costruzioni

Claude legge questo file a inizio sessione: contiene tutto il contesto, quindi non serve rileggere altro.
Va aggiornato a ogni modifica (sezioni "Stato" e "Registro") e tenuto breve.
**La repo è pubblica: qui dentro niente dati personali.**

## Stato (aggiornato 2026-11-16)

- **Fase in corso**: la 3 di 5 è conclusa (sito costruito, prima versione). Restano 4 verifiche e 5 pubblicazione.
  Fasi 1 e 2 chiuse: caratteri A, marchio 1, logo in alto a destra con i colori attenuati, apertura a mattoni
  con ombra e spessore, testi approvati (si parla solo di "consulenza gratuita").
- **Anteprime** (artifact privati dell'utente, fuori dalla repo; si leggono con lo strumento Artifact):
  - grafica: https://claude.ai/artifact/8Fb5WGHMtMJ6gDYfgVgBQq (primo schermo con il logo dell'azienda in
    alto e nel piede, scelte confermate, animazione telefono "Il tetto");
  - animazione computer "La posa": https://claude.ai/artifact/EmAnJNbVSZL4S1vYoGRsTX (p5.js, con parametri;
    forme: mattoni fotografici, rombi, quadrati);
  - testi: https://claude.ai/artifact/6gQLwvxVkgP78eZmE5bhvb (versione approvata di tutte le pagine);
  - schermate del sito costruito: https://claude.ai/artifact/MBtbF8rMkiibHqMq1uv5XL (da rifare se cambia la grafica).
- **Prossimo passo**: far scegliere all'utente dove pubblicare (fase 5) e fargli provare il sito su iPhone (fase 4).
- **In attesa dall'utente**:
  - dove pubblicare il sito (GitHub Pages o Cloudflare) e, lì, l'inserimento di contatti e dati legali come
    variabili d'ambiente (vedi "Riservatezza");
  - commenti sulla prima versione e prova su iPhone.

## Progetto

- **Cliente**: A.M. Costruzioni snc, impresa edile di Fara Gera d'Adda (BG).
- **Servizi**: ristrutturazioni complete, ristrutturazioni interni, ristrutturazioni spazi commerciali, manutenzione e nuove coperture.
- **Obiettivi**: buona SEO locale, grafica di alta gamma, sito veloce e fluido, perfetto su telefono e computer, animazione d'apertura.
- **Contatti da pubblicare**: due numeri di telefono, un'email e il comune (Fara Gera d'Adda 24045, BG).
  Li ha forniti l'utente in chat: non si salvano nella repo, il sito li legge da variabili d'ambiente.
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
  accessibilità, buone pratiche e SEO. Hosting statico gratuito (Cloudflare o GitHub Pages), da decidere alla
  pubblicazione. I link interni partono da `/`: su GitHub Pages senza dominio va prima gestito il sottopercorso.

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
- **Telefono, "Il tetto"** (automatica, circa 2 secondi): il monogramma si disegna con un tratto solo,
  appare il nome, la schermata si apre a lamelle orizzontali. Solo CSS e SVG.

## Riservatezza (richiesta esplicita dell'utente)

- Dati legali e personali il meno visibili possibile, nei limiti di legge.
- P.IVA: per legge va sulla home, quindi in piccolo nel footer. Ragione sociale completa, sede legale e REA
  solo in una pagina "Note legali" collegata dal footer.
- Mai pubblicare né salvare nella repo: codici fiscali di persone, indirizzi privati, nomi dei soci
  oltre a quanto compare nella ragione sociale.
- Niente testo nascosto con trucchi (bianco su bianco e simili): non è a norma e penalizza la SEO.
- Scelta dell'utente (2026-11-16): nella repo meno dati personali possibile. Telefoni, email, P.IVA, ragione
  sociale, sede e REA non si scrivono in nessun file: il sito li legge da variabili d'ambiente (i nomi sono in
  `.env.example`) e mostra solo quelli impostati. Vanno inseriti nel servizio di hosting: l'utente li ha già
  dati in chat e li ridarà lì. Il numero WhatsApp è il primo dei due telefoni. Per le prove si usano dati finti.

## Fasi

1. Anteprima visiva fuori dalla repo (artifact): colori, caratteri, marchio, due animazioni. L'utente sceglie.
2. Struttura e testi: bozza di tutte le pagine da far controllare.
3. Costruzione nella repo.
4. Verifiche: telefono, tablet, computer, velocità, accessibilità, dati SEO. Qui c'è solo Chromium:
   la prova su iPhone la fa l'utente.
5. Pubblicazione: hosting, dominio, Search Console, scheda Google.

## Materiali

- `materiali/originali/`: logo attuale e 11 foto dell'utente, alla risoluzione massima disponibile (1440 px).
  Finiti: facciata prima e dopo dello stesso edificio, bagno con doccia, parete con carta da parati,
  soggiorno, cucina-soggiorno, sala da pranzo, scala in legno. In corso d'opera: doccia in muratura,
  massetto, stanza in cantiere. Sono già leggere: il sito ne genera versioni AVIF/WebP per ogni schermo.
- `materiali/logo/`: logo dell'azienda in SVG (colori originali e attenuati) e monogramma "Tetti".
- `materiali/muro/`: foto del muro di mattoni, sagome e celle per l'apertura da computer.
- `contenuti/`: testi delle 9 pagine (home, 4 servizi, lavori, chi siamo, contatti, note legali).

## Codice del sito

- `src/data/sito.ts`: dati dell'azienda e variabili d'ambiente. `src/data/foto.ts`: foto e testi alternativi.
- `src/lib/testi.ts`: legge `contenuti/*.md`, unica fonte dei testi, e li passa alle pagine.
- `src/layouts/Base.astro`: testa della pagina, dati per Google e lo script che decide se mostrare l'apertura.
- `src/components/`: Intestazione, Piede, Apertura (monogramma e lamelle), Foto, Marchio, Azioni, Guida.
- `src/scripts/muro.js`: apertura a mattoni; usa `public/apertura/` e `materiali/muro/celle.json`.
- `src/pages/`: home, `[servizio]` (4 pagine), lavori, chi-siamo, contatti, note-legali, 404, robots.txt.
- Prova: costruire con variabili finte, servire `dist/` (`python3 -m http.server -d dist`) e guardare con Playwright.

## Regole di lavoro

- Rispondere in italiano semplice: l'utente non è un tecnico.
- Prima il piano, poi il lavoro: l'utente vuole approvare le scelte importanti.
- Ramo di lavoro storico: `claude/youthful-hamilton-7pq7ob` (non ancora unito a `main`). Niente pull request
  se non richieste.
- Skill da usare: `frontend-design` per la grafica, `algorithmic-art` per l'animazione da computer.
  L'utente ha installato il plugin Design: `design:accessibility-review` e `design:design-critique` servono
  nelle verifiche della fase 4.

## Ambiente

- jimdosite.com e ufficiocamerale.it rispondono 403 dal cloud (blocco Cloudflare): non insistere,
  chiedere il materiale all'utente.
- Google Fonts e cdnjs sono raggiungibili. Playwright con Chromium è preinstallato.
- Scrivere nella repo dati legali o personali viene bloccato dal controllo dei permessi: chiedere prima all'utente.

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
