import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Sottocartella in cui vive il sito. Serve solo per l'anteprima su GitHub Pages
// (.../Armand/anteprima/), dove la imposta il flusso in .github/workflows; altrove resta '/'.
const base = process.env.SITO_BASE || '/';

// INDIRIZZO DEFINITIVO DEL SITO (senza barra finale), collegato su Cloudflare il 2026-11-23.
// Con il dominio scritto qui compaiono da soli l'indirizzo canonico, la mappa del sito e il via libera a Google.
// Se fosse vuoto il sito sarebbe in "anteprima": ogni pagina chiede ai motori di ricerca di non indicizzarla.
// L'anteprima su GitHub Pages (quella con la sottocartella) resta sempre in anteprima, fuori da Google.
const DOMINIO = process.env.SITO_BASE ? '' : 'https://amcostruzionisnc.it';

export default defineConfig({
  site: DOMINIO || undefined,
  base,
  trailingSlash: 'always',
  integrations: DOMINIO ? [sitemap()] : [],
  devToolbar: { enabled: false },
});
