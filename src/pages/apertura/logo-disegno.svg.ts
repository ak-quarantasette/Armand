// Logo dell'azienda "che si disegna", usato nell'apertura da telefono (Apertura.astro).
// Si crea da solo dal logo vero (src/assets/logo-azienda.svg) quando si costruisce il sito: ogni forma
// colorata viene prima tracciata con una linea sottile del suo colore, poi si riempie. L'ordine segue il
// disegno: tetti, onda, scritte. L'animazione è dentro il file (CSS), così basta mostrarlo come immagine.
import type { APIRoute } from 'astro';
import logo from '../../assets/logo-azienda.svg?raw';

// colore → ordine in cui si disegna (0 = per primo)
const ordine: Record<string, number> = {
  '#902020': 0, // tetto rosso
  '#1f4d9a': 1, // tetto blu
  '#b9c6dc': 2, // luci del tetto
  '#6f8f6b': 3, // onda verde
  '#c9d3c4': 4, // onda chiara
  '#023883': 5, // A.M.
  '#1f2327': 6, // COSTRUZIONI snc
};

const PASSO = 0.2; // secondi tra una forma e la successiva
const TRATTO = 1.1; // secondi per tracciare una forma
const RIEMPI = 0.5; // secondi per riempirla di colore

export const GET: APIRoute = () => {
  const viewBox = logo.match(/viewBox="([^"]+)"/)![1];
  const forme = [...logo.matchAll(/<path([^>]*?)\sd="([^"]+)"([^>]*)\/?>/g)].map((m) => {
    const attr = m[1] + m[3];
    const colore = attr.match(/fill="([^"]+)"/)![1].toLowerCase();
    return { colore, d: m[2], k: ordine[colore] ?? 7 };
  });
  const corpo = forme
    .map((f) => `<path class="f" style="--k:${f.k}" fill="${f.colore}" stroke="${f.colore}" fill-rule="evenodd" pathLength="1" d="${f.d}"/>`)
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"><style>
.f{stroke-width:14;stroke-linejoin:round;stroke-dasharray:1 1;stroke-dashoffset:1;fill-opacity:0;
animation:traccia ${TRATTO}s cubic-bezier(.45,0,.25,1) calc(var(--k)*${PASSO}s) forwards,
riempi ${RIEMPI}s ease-out calc(var(--k)*${PASSO}s + ${TRATTO * 0.75}s) forwards}
@keyframes traccia{to{stroke-dashoffset:0}}
@keyframes riempi{to{fill-opacity:1;stroke-opacity:0}}
@media (prefers-reduced-motion:reduce){.f{animation:none;fill-opacity:1;stroke-opacity:0}}
</style>${corpo}</svg>`;
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml; charset=utf-8' } });
};
