// robots.txt. Con il dominio definitivo indica la mappa del sito; in anteprima non la indica:
// lì ogni pagina dice già da sé ai motori di ricerca di non indicizzarla.
import type { APIRoute } from 'astro';
import { sito } from '../data/sito';

export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n${sito.anteprima ? '' : `\nSitemap: ${sito.origine}/sitemap-index.xml\n`}`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
