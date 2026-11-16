// robots.txt con l'indirizzo della mappa del sito preso dalla configurazione.
import type { APIRoute } from 'astro';
import { sito } from '../data/sito';

export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sito.url}/sitemap-index.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
