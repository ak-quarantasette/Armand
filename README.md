# Sito A.M. Costruzioni

Sito statico dell'impresa edile A.M. Costruzioni, costruito con [Astro](https://astro.build).

## Comandi

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

`npm run dev` apre l'anteprima locale; `npm run build` crea il sito pronto da pubblicare nella cartella `dist/`.
Serve Node 22.23.4 o più recente. Non c'è nulla da configurare: niente variabili, niente password.

## Contatti e dati legali

Telefoni, email, partita IVA, ragione sociale, sede legale e REA compaiono sul sito, quindi sono pubblici e
stanno in chiaro in un solo file: `src/data/sito.ts`. Per cambiare un numero o l'email si modifica quel file.
Se una voce viene lasciata vuota, sul sito non compare.

Nella repo non vanno invece gli altri dati personali: codici fiscali di persone, indirizzi privati, PEC.

## Indirizzo del sito e modalità anteprima

L'indirizzo definitivo si scrive una volta sola, in `astro.config.mjs`, alla riga `DOMINIO`.

- **Finché `DOMINIO` è vuoto** il sito è in anteprima: funziona a qualunque indirizzo provvisorio e ogni pagina
  chiede a Google di non indicizzarla, così l'anteprima non fa concorrenza al sito vero.
- **Con il dominio scritto lì** compaiono da soli l'indirizzo canonico, la mappa del sito (`sitemap-index.xml`)
  e il via libera ai motori di ricerca.

## Pubblicazione

Il sito è pronto per due servizi gratuiti. Si possono usare anche tutti e due.

### Cloudflare (scelto per il sito definitivo)

Usa `wrangler.jsonc` (già pronto) e dà subito un indirizzo gratuito del tipo `armand.<account>.workers.dev`.
Nella dashboard: **Workers & Pages → Create application → Import a repository**, poi:

- nome del progetto: `armand` (deve restare uguale a quello scritto in `wrangler.jsonc`);
- build command: `npm run build`;
- deploy command: `npx wrangler deploy`.

Da quel momento ogni modifica del ramo collegato viene pubblicata da sola. Il file `public/_headers` tiene gli
indirizzi provvisori `workers.dev` fuori da Google e fa tenere in memoria ai browser i file che non cambiano.

### GitHub Pages (anteprima)

L'anteprima è su `https://ak-quarantasette.github.io/Armand/`. GitHub Pages è impostato su
**Deploy from a branch → main → / (root)**: pubblica i file della repo così come sono, quindi qui dentro ci
sono anche le pagine già pronte.

- `anteprima/`: il sito costruito.
- `index.html` e `404.html` nella cartella principale: copie della home e della pagina di errore.
- `.nojekyll`: dice a GitHub di non rielaborare i file.

Sono file generati e non vanno modificati a mano: a ogni modifica di `main` il flusso
`.github/workflows/anteprima-github-pages.yml` ricostruisce il sito, li aggiorna e li salva. Le pagine da
modificare restano quelle in `contenuti/` e `src/`.

Nell'anteprima il sito vive nella sottocartella `/Armand/anteprima/`: per questo tutti i link interni passano
dalla funzione `u()` di `src/lib/percorsi.ts`. Un link scritto a mano con `/pagina/` lì non funzionerebbe.

## Cartelle

- `contenuti/`: i testi delle pagine, in Markdown. È l'unico posto in cui si modificano le parole.
- `materiali/`: foto e logo originali, logo vettoriale, foto del muro per l'apertura.
- `src/`: pagine, componenti e stile del sito. I dati dell'azienda sono in `src/data/sito.ts`.
- `public/`: file serviti così come sono (icona, immagini dell'apertura, intestazioni per Cloudflare).
- `anteprima/`, `index.html`, `404.html`: pagine pronte per GitHub Pages, generate in automatico.

Il contesto del progetto, le decisioni prese e lo stato dei lavori sono in `CLAUDE.md`.
