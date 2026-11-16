// Le foto del cliente, con il testo alternativo. I titoli e le didascalie stanno in contenuti/lavori.md.
import type { ImageMetadata } from 'astro';
import { pagina, sezione } from '../lib/testi';

// tutte le foto tranne il vecchio logo, che non compare in nessuna pagina
const file = import.meta.glob(['../../materiali/originali/*.{jpg,avif}', '!**/logo-*'], { eager: true, import: 'default' }) as Record<string, ImageMetadata>;

export const foto = (nome: string): ImageMetadata => {
  const chiave = Object.keys(file).find((k) => k.replace(/^.*\//, '').replace(/\.\w+$/, '') === nome);
  if (!chiave) throw new Error(`Foto non trovata: ${nome}`);
  return file[chiave];
};

export const alt: Record<string, string> = {
  'facciata-dopo': 'Facciata di un edificio a due piani dopo i lavori: intonaco chiaro, cornici grigie alle finestre e portone ad arco.',
  'facciata-prima': "La stessa facciata prima dei lavori, con l'intonaco color pesca rovinato.",
  'bagno-doccia': 'Bagno con doccia a filo pavimento rivestita in lastre effetto pietra, sanitari sospesi e pavimento effetto legno.',
  'parete-carta-da-parati': 'Angolo di una stanza con carta da parati a grandi fiori.',
  soggiorno: 'Soggiorno con divano chiaro, parete attrezzata scura e pavimento effetto legno.',
  'cucina-soggiorno': 'Zona giorno con cucina a isola e mobili scuri.',
  'sala-da-pranzo': 'Sala da pranzo con tavolo in vetro, sedie scure e lampade a sospensione.',
  'scala-in-legno': 'Scala con gradini in legno tra due pareti bianche.',
  'cantiere-doccia-in-muratura': 'Piatto doccia in muratura appena costruito, con le pareti impermeabilizzate.',
  'cantiere-massetto': 'Massetto appena steso in una stanza in ristrutturazione.',
  'stanza-in-cantiere': 'Stanza prima dei lavori, con finestra, porta e termosifone.',
};

export type Lavoro = { titolo: string; didascalia: string; foto: string[]; gruppo: string };

// Voci del tipo: - **Titolo** (file-1, file-2). Didascalia.
export function lavori(): Lavoro[] {
  const p = pagina('lavori');
  const out: Lavoro[] = [];
  for (const s of p.sezioni) {
    for (const b of s.blocchi) {
      if (b.tipo !== 'ul') continue;
      for (const v of b.voci) {
        const m = v.match(/^<strong>(.+?)<\/strong> \((.+?)\)\. (.*)$/);
        if (m) out.push({ titolo: m[1], foto: m[2].split(',').map((x) => x.trim()), didascalia: m[3], gruppo: s.titolo });
      }
    }
  }
  return out;
}

export const lavoriIntro = () => sezioneIntro();
function sezioneIntro() {
  const p = pagina('lavori');
  return { p, intro: p.intro };
}
export { sezione };
