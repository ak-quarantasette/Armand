// Dati dell'azienda. Sono gli stessi che compaiono sul sito, quindi stanno qui in chiaro:
// per cambiare un numero o l'email basta modificare questo file.
// Qui NON vanno altri dati personali (codici fiscali di persone, indirizzi privati, PEC).
const soloCifre = (t: string) => t.replace(/[^\d+]/g, '');

// L'indirizzo definitivo si scrive una volta sola, in astro.config.mjs (DOMINIO).
// Finché manca, il sito è in "anteprima": funziona a qualunque indirizzo provvisorio
// e chiede ai motori di ricerca di non indicizzarlo.
const definitivo = import.meta.env.SITE as string | undefined;

export const sito = {
  nome: 'A.M. Costruzioni',
  nomeLungo: 'A.M. Costruzioni snc',
  comune: "Fara Gera d'Adda",
  provincia: 'BG',
  cap: '24045',
  dal: 2017,
  tel1: '+39 348 051 9963',
  tel2: '+39 338 777 2398',
  whatsapp: '+39 348 051 9963', // è il primo dei due numeri
  email: 'armand.molla85@gmail.com',
  ragioneSociale: 'A.M. Costruzioni snc di Matija Artan e C.',
  sedeLegale: "Via Pontirolo 4, 24045 Fara Gera d'Adda (BG)",
  piva: '04191330168', // vale anche come codice fiscale della società
  rea: 'BG-443258',
  anteprima: !definitivo,
  // Origine per gli indirizzi completi (Google, anteprime dei link). In anteprima può darla chi pubblica.
  origine: (definitivo ?? process.env.ANTEPRIMA_URL ?? '').replace(/\/$/, ''),
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
  ragione_sociale: sito.ragioneSociale,
  sede_legale: sito.sedeLegale,
  partita_iva: sito.piva,
  rea: sito.rea,
};
