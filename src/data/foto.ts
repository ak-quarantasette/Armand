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
  'tetto-coppi-posati': 'Falda di un tetto con i coppi appena posati e il parapetto di sicurezza in legno.',
  'tetto-colmo-nuovo': 'Colmo di un tetto in coppi appena rifatto, con il ponteggio sul bordo.',
  'tetto-listelli-e-telo': 'Tetto in rifacimento: telo impermeabile e listelli in legno pronti per la posa delle tegole.',
  'tetto-tavolato': 'Tetto a due falde con il nuovo tavolato in legno, prima del telo e delle tegole.',
  'tetto-orditura-vecchia': 'Vecchio tetto scoperchiato: si vedono i listelli e il tavolato da sostituire.',
  'tetto-coppi-vecchi': 'Tetto in coppi prima dei lavori, con tegole spostate e macchiate.',
  'tetto-coppi-con-muschio': 'Vecchi coppi coperti di muschio e piantine.',
  'copertura-in-lamiera': 'Copertura nuova in lamiera grecata scura, vista dall\'alto.',
  'copertura-in-lamiera-falda': 'Falda di una copertura in lamiera grecata scura con la scossalina sul bordo.',
  'cantiere-gru-tetto': 'Camion con gru che porta i materiali sul tetto di una casa con il ponteggio montato.',
  'cantiere-riscaldamento-a-pavimento': 'Tubi rossi del riscaldamento a pavimento durante il getto del massetto.',
  'cantiere-massetto-lisciato': 'Massetto appena gettato e lisciato in una stanza.',
  'cantiere-vespaio-aerato': 'Vespaio aerato con casseri in plastica nera posati in una stanza con muri in mattoni.',
  'cantiere-solaio-in-legno': 'Nuovo solaio con travi in legno lamellare e tavelle in cotto, visto di lato.',
  'cantiere-solaio-in-legno-dal-basso': 'Nuovo solaio con trave in legno e tavelle in cotto, visto dal basso.',
  'cantiere-scavo-tubazione': 'Scavo in un giardino con una tubazione arancione appena posata.',
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
