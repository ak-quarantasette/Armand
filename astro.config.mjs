import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// L'indirizzo del sito arriva da una variabile d'ambiente: finché il dominio non c'è resta un segnaposto.
const site = process.env.SITO_URL || 'https://www.example.it';

export default defineConfig({
  site,
  trailingSlash: 'always',
  integrations: [sitemap()],
  devToolbar: { enabled: false },
});
