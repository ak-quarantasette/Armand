// Immagine che compare come anteprima quando si manda il link del sito (WhatsApp, Facebook, messaggi):
// il logo dell'azienda al centro di un riquadro chiaro 1200x630, la misura che usano quei programmi.
// Si crea da sola dal logo vero (src/assets/logo-azienda.svg) quando si costruisce il sito.
// PNG e non SVG: WhatsApp e gli altri non mostrano le immagini vettoriali.
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import logo from '../assets/logo-azienda.svg?raw';

export const GET: APIRoute = async () => {
  const L = 1200, A = 630;
  const disegno = await sharp(Buffer.from(logo), { density: 300 }).resize({ width: 820, height: 430, fit: 'inside' }).png().toBuffer();
  const { width = 0, height = 0 } = await sharp(disegno).metadata();
  const png = await sharp({ create: { width: L, height: A, channels: 3, background: '#FFFFFF' } })
    .composite([{ input: disegno, left: Math.round((L - width) / 2), top: Math.round((A - height) / 2) }])
    .png({ compressionLevel: 9 })
    .toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
