// Piccolo programma di Cloudflare per i video della home (public/video/).
// Il Safari dell'iPhone, prima di far partire un video, ne chiede solo un pezzo (intestazione "Range") e vuole
// indietro esattamente quel pezzo (risposta 206). I file statici di Cloudflare rispondono sempre con il file
// intero: questo programma prende il file e restituisce solo il pezzo chiesto. Tutto il resto del sito non
// passa di qui (vedi "run_worker_first" in wrangler.jsonc).
export default {
  async fetch(richiesta, env) {
    const risposta = await env.ASSETS.fetch(richiesta);
    const intervallo = richiesta.headers.get('Range');
    if (!intervallo || risposta.status !== 200) return risposta;

    const m = /^bytes=(\d*)-(\d*)$/.exec(intervallo.trim());
    if (!m) return risposta; // intervalli strani o multipli: file intero, va bene lo stesso
    const dati = await risposta.arrayBuffer();
    const totale = dati.byteLength;
    let inizio, fine;
    if (m[1] === '') { // "bytes=-500": gli ultimi 500 byte
      inizio = Math.max(0, totale - Number(m[2]));
      fine = totale - 1;
    } else {
      inizio = Number(m[1]);
      fine = m[2] === '' ? totale - 1 : Math.min(Number(m[2]), totale - 1);
    }
    const intestazioni = new Headers(risposta.headers);
    intestazioni.set('Accept-Ranges', 'bytes');
    if (inizio >= totale || inizio > fine) {
      intestazioni.set('Content-Range', `bytes */${totale}`);
      return new Response(null, { status: 416, headers: intestazioni });
    }
    intestazioni.set('Content-Range', `bytes ${inizio}-${fine}/${totale}`);
    intestazioni.set('Content-Length', String(fine - inizio + 1));
    return new Response(dati.slice(inizio, fine + 1), { status: 206, headers: intestazioni });
  },
};
