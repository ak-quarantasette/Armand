// Tutti i link interni passano da qui. Così il sito funziona sia alla radice di un dominio
// sia dentro una sottocartella, come nell'anteprima su GitHub Pages (.../Armand/anteprima/).
const radice = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Percorso interno completo: u('/lavori/') diventa '/lavori/' oppure '/Armand/anteprima/lavori/'. */
export const u = (percorso: string): string => radice + percorso;

/** Il percorso della pagina senza la sottocartella: serve per capire in quale pagina siamo. */
export const senzaRadice = (percorso: string): string =>
  radice && percorso.startsWith(radice) ? percorso.slice(radice.length) || '/' : percorso;
