# Segnalibro di progetto: sito A.M. Costruzioni

Claude legge questo file a inizio sessione: contiene tutto il contesto, quindi non serve rileggere altro.
Va aggiornato a ogni modifica (sezioni "Stato" e "Registro") e tenuto breve.
**La repo è pubblica: qui dentro niente dati personali.**

## Stato (aggiornato 2026-11-16)

- **Fase in corso**: 1 di 5, anteprima visiva. Pubblicata, in attesa delle scelte dell'utente.
- **Anteprime** (artifact privati dell'utente, fuori dalla repo; si leggono con lo strumento Artifact):
  - grafica: https://claude.ai/artifact/8Fb5WGHMtMJ6gDYfgVgBQq (primo schermo, colori, caratteri A/B/C,
    marchio 1/2/3, animazione telefono "Il tetto");
  - animazione computer "La posa": https://claude.ai/artifact/EmAnJNbVSZL4S1vYoGRsTX (p5.js, con parametri).
- **Prossimo passo**: ricevute le scelte, fase 2 (struttura e testi di tutte le pagine).
- **In attesa dall'utente**:
  - caratteri (A Lapidario consigliato, B Editoriale, C Classico italiano), marchio (1 Tetti consigliato,
    2 Targa, 3 Bollo), forma delle tessere (rombi, quadrati o listelli);
  - foto e testi del vecchio sito Jimdo (da qui è bloccato, vedi "Ambiente");
  - P.IVA, ragione sociale completa, sede legale, numero REA (la pagina della visura è bloccata da qui);
  - zone servite, quale dei due numeri usa WhatsApp, due righe sull'azienda.

## Progetto

- **Cliente**: A.M. Costruzioni snc, impresa edile di Fara Gera d'Adda (BG).
- **Servizi**: ristrutturazioni complete, ristrutturazioni interni, ristrutturazioni spazi commerciali, manutenzione e nuove coperture.
- **Obiettivi**: buona SEO locale, grafica di alta gamma, sito veloce e fluido, perfetto su telefono e computer, animazione d'apertura.
- **Contatti da pubblicare**: due numeri di telefono, un'email e il comune (Fara Gera d'Adda 24045, BG).
  Li ha forniti l'utente in chat: non si salvano qui finché la repo è pubblica, entrano solo nelle pagine del sito.
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
- **Caratteri**: prima scelta Marcellus (titoli, stile lapidario) + IBM Plex Sans (testi).
  Da ospitare sul sito, non da Google. Scelta finale nell'anteprima.
- **Marchio**: nuovo marchio tipografico per il sito, più sobrio del logo attuale: scritta "A.M. Costruzioni"
  e monogramma AM disegnato come linea di tetti (tre punte = le tre case del logo attuale);
  i due puntini di "A.M." restano blu e rosso. Serve l'ok del titolare.
- **Foto**: poche e al massimo 1440 px di lato. Mai a tutto schermo su computer: in cornici dove restano nitide.
- **Struttura**: Home, una pagina per ciascuno dei 4 servizi, Lavori, Chi siamo, Contatti, Privacy/Note legali.
  Home: apertura, prima/dopo della facciata, servizi, lavori, come lavoriamo, zone servite, contatti.
- **SEO**: testi scritti da Claude per le ricerche locali, dati strutturati di attività locale, sitemap,
  titoli e descrizioni per pagina. Niente recensioni inventate. Poi Google Business Profile e Search Console.
- **Tecnica**: sito statico con Astro, quasi zero JavaScript, immagini AVIF/WebP, obiettivo Lighthouse
  mobile almeno 95. Hosting statico gratuito (Cloudflare o GitHub Pages), da decidere alla pubblicazione.

## Animazioni d'apertura

Regole comuni: una volta per visita, sempre saltabili, contenuto vero già caricato sotto,
dissolvenza semplice se l'utente ha "riduci animazioni".

- **Computer, "La posa"** (interattiva, 5-8 secondi): parete di tessere dal lato grezzo (pietra grigia
  generata dal codice, tipo ceppo di Gré); passando il cursore le tessere si girano e mostrano il lato
  finito, intonaco bianco con il nuovo marchio. Senza movimento parte un'onda automatica. Alla fine la
  parete diventa lo sfondo della pagina. Forma di partenza: rombi; alternative quadrati e listelli.
  Prototipo con la skill `algorithmic-art` (p5.js); in produzione va riscritta in canvas leggero senza librerie.
  Va attivata solo con `(hover: hover) and (pointer: fine)`.
- **Telefono, "Il tetto"** (automatica, circa 2 secondi): il monogramma si disegna con un tratto solo,
  appare il nome, la schermata si apre a lamelle orizzontali. Solo CSS e SVG.

## Riservatezza (richiesta esplicita dell'utente)

- Dati legali e personali il meno visibili possibile, nei limiti di legge.
- P.IVA: per legge va sulla home, quindi in piccolo nel footer. Ragione sociale completa, sede legale e REA
  solo in una pagina "Note legali" collegata dal footer.
- Mai pubblicare né salvare nella repo: codici fiscali di persone, indirizzi privati, nomi dei soci
  oltre a quanto compare nella ragione sociale.
- Niente testo nascosto con trucchi (bianco su bianco e simili): non è a norma e penalizza la SEO.

## Fasi

1. Anteprima visiva fuori dalla repo (artifact): colori, caratteri, marchio, due animazioni. L'utente sceglie.
2. Struttura e testi: bozza di tutte le pagine da far controllare.
3. Costruzione nella repo.
4. Verifiche: telefono, tablet, computer, velocità, accessibilità, dati SEO. Qui c'è solo Chromium:
   la prova su iPhone la fa l'utente.
5. Pubblicazione: hosting, dominio, Search Console, scheda Google.

## Materiali

- `materiali/originali/`: logo attuale e 4 foto fornite dall'utente (facciata prima e dopo dello stesso
  edificio, bagno con doccia, parete con carta da parati). Sono alla risoluzione massima disponibile.

## Regole di lavoro

- Rispondere in italiano semplice: l'utente non è un tecnico.
- Prima il piano, poi il lavoro: l'utente vuole approvare le scelte importanti.
- Ramo di lavoro storico: `claude/youthful-hamilton-7pq7ob` (non ancora unito a `main`). Niente pull request
  se non richieste.
- Skill da usare: `frontend-design` per la grafica, `algorithmic-art` per l'animazione da computer.

## Ambiente

- jimdosite.com e ufficiocamerale.it rispondono 403 dal cloud (blocco Cloudflare): non insistere,
  chiedere il materiale all'utente.
- Google Fonts e cdnjs sono raggiungibili. Playwright con Chromium è preinstallato.

## Registro

- 2026-11-16: piano approvato; creato questo segnalibro; salvati i materiali originali.
- 2026-11-16: pubblicate le due anteprime della fase 1. Il monogramma è una polilinea SVG:
  `-3.2,110 32,0 64,100 84,0 108,62 132,0 154,110` in viewBox `-6 -13 164 113`, tratto 7,
  più la traversa della A da `16.5,66` a `47.5,66`, tratto 3.6.
