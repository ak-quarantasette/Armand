import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// INDIRIZZO DEFINITIVO DEL SITO. Si scrive qui, una volta sola, quando c'è il dominio:
// per esempio 'https://www.amcostruzionisnc.it' (senza barra finale).
// Finché resta vuoto il sito è in "anteprima": si può pubblicare a un indirizzo provvisorio
// e ogni pagina chiede ai motori di ricerca di non indicizzarla. Con il dominio scritto qui
// compaiono da soli l'indirizzo canonico, la mappa del sito e il via libera a Google.
const DOMINIO = '';

// Sottocartella in cui vive il sito. Serve solo per l'anteprima su GitHub Pages
// (.../Armand/), dove la imposta il flusso in .github/workflows; altrove resta '/'.
const base = process.env.SITO_BASE || '/';

export default defineConfig({
  site: DOMINIO || undefined,
  base,
  trailingSlash: 'always',
  integrations: DOMINIO ? [sitemap()] : [],
  devToolbar: { enabled: false },
});
