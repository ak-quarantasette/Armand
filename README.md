# Sito A.M. Costruzioni

Sito statico dell'impresa edile A.M. Costruzioni, costruito con [Astro](https://astro.build).

## Comandi

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

`npm run dev` apre l'anteprima locale; `npm run build` crea il sito pronto da pubblicare nella cartella `dist/`.

## Dati che non stanno nella repo

Telefoni, email, partita IVA e dati legali non sono scritti in nessun file: il sito li legge da variabili
d'ambiente e mostra solo quelli impostati. I nomi delle variabili sono in `.env.example`. In locale si copia quel
file in `.env`; online si inseriscono le stesse voci nelle impostazioni del servizio di hosting.

## Cartelle

- `contenuti/`: i testi delle pagine, in Markdown. È l'unico posto in cui si modificano le parole.
- `materiali/`: foto e logo originali, logo vettoriale, foto del muro per l'apertura.
- `src/`: pagine, componenti e stile del sito.
- `public/`: file serviti così come sono (icona, immagini dell'apertura).

Il contesto del progetto, le decisioni prese e lo stato dei lavori sono in `CLAUDE.md`.
