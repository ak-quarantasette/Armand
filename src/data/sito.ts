// Dati dell'azienda. Telefoni, email e dati legali NON stanno nella repo:
// arrivano da variabili d'ambiente (vedi .env.example). Se mancano, la voce non compare.
const leggi = (chiave: string, predefinito = ''): string =>
  (process.env[chiave] ?? (import.meta.env as Record<string, string | undefined>)[chiave] ?? predefinito).trim();

const soloCifre = (t: string) => t.replace(/[^\d+]/g, '');

export const sito = {
  nome: 'A.M. Costruzioni',
  nomeLungo: 'A.M. Costruzioni snc',
  comune: "Fara Gera d'Adda",
  provincia: 'BG',
  cap: '24045',
  dal: 2017,
  url: leggi('SITO_URL', 'https://www.example.it').replace(/\/$/, ''),
  tel1: leggi('SITO_TEL_1'),
  tel2: leggi('SITO_TEL_2'),
  whatsapp: leggi('SITO_WHATSAPP'),
  email: leggi('SITO_EMAIL'),
  ragioneSociale: leggi('SITO_RAGIONE_SOCIALE'),
  sedeLegale: leggi('SITO_SEDE_LEGALE'),
  piva: leggi('SITO_PIVA'),
  rea: leggi('SITO_REA'),
};

export const telHref = (t: string) => (t ? 'tel:' + soloCifre(t) : '');

export const waHref = (messaggio = 'Buongiorno, vorrei una consulenza per dei lavori.') =>
  sito.whatsapp ? `https://wa.me/${soloCifre(sito.whatsapp).replace('+', '')}?text=${encodeURIComponent(messaggio)}` : '';

export const zone = ['Treviglio', "Cassano d'Adda", "Canonica d'Adda", 'Pontirolo Nuovo', "Vaprio d'Adda"];

export const servizi = [
  { file: 'servizi/ristrutturazioni-complete', slug: 'ristrutturazioni-complete', nome: 'Ristrutturazioni complete' },
  { file: 'servizi/ristrutturazioni-interni', slug: 'ristrutturazioni-interni', nome: 'Ristrutturazioni interni' },
  { file: 'servizi/ristrutturazioni-spazi-commerciali', slug: 'ristrutturazioni-spazi-commerciali', nome: 'Ristrutturazioni spazi commerciali' },
  { file: 'servizi/coperture', slug: 'coperture', nome: 'Manutenzione e nuove coperture' },
];

export const menu = [
  { href: '/#servizi', nome: 'Servizi' },
  { href: '/lavori/', nome: 'Lavori' },
  { href: '/chi-siamo/', nome: 'Chi siamo' },
  { href: '/contatti/', nome: 'Contatti' },
];

// Valori usati al posto dei segnaposto {{...}} nei testi.
export const segnaposto: Record<string, string> = {
  telefono_1: sito.tel1,
  telefono_2: sito.tel2,
  whatsapp: sito.whatsapp,
  email: sito.email,
  ragione_sociale: sito.ragioneSociale || sito.nomeLungo,
  sede_legale: sito.sedeLegale,
  partita_iva: sito.piva,
  rea: sito.rea,
};
