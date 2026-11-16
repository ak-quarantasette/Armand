// Legge i testi approvati in contenuti/*.md e li trasforma in una struttura semplice:
// titolo e descrizione per Google, titolo della pagina, introduzione e sezioni.
// Così le parole stanno in un posto solo e le pagine decidono solo come mostrarle.
import { segnaposto } from '../data/sito';

const grezzi = import.meta.glob('../../contenuti/**/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export type Blocco = { tipo: 'p'; html: string } | { tipo: 'ul' | 'ol'; voci: string[] };
export type Parte = { titolo: string; blocchi: Blocco[] };
export type Sezione = Parte & { sotto: Parte[] };
export type Pagina = { titolo: string; descrizione: string; url: string; h1: string; intro: Blocco[]; sezioni: Sezione[] };

const scappa = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function riga(t: string): string {
  return scappa(t)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\{\{(.+?)\}\}/g, (_, k: string) => scappa(segnaposto[k.trim()] || '—'));
}

export function pagina(nome: string): Pagina {
  const chiave = Object.keys(grezzi).find((k) => k.endsWith(`/contenuti/${nome}.md`));
  if (!chiave) throw new Error(`Testo non trovato: contenuti/${nome}.md`);
  const src = grezzi[chiave];
  const fm = src.match(/^---\n([\s\S]*?)\n---\n/);
  const meta: Record<string, string> = {};
  if (fm) {
    for (const l of fm[1].split('\n')) {
      const m = l.match(/^(\w+):\s*"?(.*?)"?\s*$/);
      if (m) meta[m[1]] = m[2];
    }
  }
  const p: Pagina = { titolo: meta.titolo ?? '', descrizione: meta.descrizione ?? '', url: meta.url ?? '/', h1: '', intro: [], sezioni: [] };
  let dove: Blocco[] = p.intro;
  let lista: { tipo: 'ul' | 'ol'; voci: string[] } | null = null;

  for (const grezza of src.slice(fm ? fm[0].length : 0).split('\n')) {
    const l = grezza.trimEnd();
    if (!l) { lista = null; continue; }
    if (l.startsWith('Pulsanti:')) continue; // i pulsanti li mette la pagina
    let m: RegExpMatchArray | null;
    if ((m = l.match(/^# (.*)$/))) { p.h1 = m[1]; lista = null; continue; }
    if ((m = l.match(/^## (.*)$/))) {
      const s: Sezione = { titolo: m[1], blocchi: [], sotto: [] };
      p.sezioni.push(s); dove = s.blocchi; lista = null; continue;
    }
    if ((m = l.match(/^### (.*)$/))) {
      const parte: Parte = { titolo: m[1], blocchi: [] };
      p.sezioni[p.sezioni.length - 1].sotto.push(parte); dove = parte.blocchi; lista = null; continue;
    }
    if ((m = l.match(/^- (.*)$/)) || (m = l.match(/^\d+\. (.*)$/))) {
      const tipo = l.startsWith('-') ? 'ul' : 'ol';
      if (!lista || lista.tipo !== tipo) { lista = { tipo, voci: [] }; dove.push(lista); }
      lista.voci.push(riga(m[1])); continue;
    }
    lista = null;
    dove.push({ tipo: 'p', html: riga(l) });
  }
  return p;
}

export const sezione = (p: Pagina, titolo: string): Sezione => {
  const s = p.sezioni.find((x) => x.titolo === titolo);
  if (!s) throw new Error(`Sezione "${titolo}" non trovata in ${p.url}`);
  return s;
};
