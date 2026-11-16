// Apertura da computer: un muro di mattoni veri che si costruisce corso per corso e,
// al passaggio del cursore, si crepa e crolla lasciando vedere il marchio sulla parete finita.
// La parete di fondo è la pagina stessa (HTML): qui si disegnano solo mattoni, spessore e ombre.
// Foto: Poly Haven "brick_wall_006", licenza CC0. Le celle dicono dov'è ogni mattone nella foto.
import dati from '../../materiali/muro/celle.json';

const carica = (src) =>
  new Promise((res) => {
    const im = new Image();
    im.onload = () => res(im);
    im.onerror = () => res(null);
    im.src = src;
  });
const rnd = (a, b) => a + Math.random() * (b - a);
const fuori = (x) => 1 + 2.70158 * Math.pow(x - 1, 3) + 1.70158 * Math.pow(x - 1, 2); // arrivo con un piccolo assestamento

export async function avvia(canvas) {
  const html = document.documentElement;
  const vw = window.innerWidth, vh = window.innerHeight;
  // risoluzione contenuta: abbastanza nitida, senza pesare sulla memoria
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(2600000 / (vw * vh)));
  const W = Math.round(vw * dpr), H = Math.round(vh * dpr);

  const [foto, sagome] = await Promise.race([
    Promise.all([carica(W > 1700 ? '/apertura/muro.webp' : '/apertura/muro-1600.webp'), carica('/apertura/muro-sagome.webp')]),
    new Promise((res) => setTimeout(() => res([null, null]), 3500)),
  ]);
  if (!foto || !sagome || !html.classList.contains('apertura-pc')) return false;
  window.amMuroPartito = true;

  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  const u = W / 1280; // unità: le misure sono pensate su uno schermo largo 1280
  const tela = (w = W, h = H) => {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    return c;
  };

  // La foto riempie lo schermo, tagliando l'eccesso ai lati o sopra e sotto.
  const k = Math.max(W / dati.tw, H / dati.th);
  const ox = (W - dati.tw * k) / 2, oy = (H - dati.th * k) / 2;
  const muro = tela();
  muro.getContext('2d').drawImage(foto, ox, oy, dati.tw * k, dati.th * k);
  const taglio = tela(); // solo i mattoni, senza malta: è quello che si stacca
  {
    const c = taglio.getContext('2d');
    c.drawImage(muro, 0, 0);
    c.globalCompositeOperation = 'destination-in';
    c.drawImage(sagome, ox, oy, dati.tw * k, dati.th * k);
  }
  const muroScuro = tela(); // i fianchi dei mattoni, in ombra: dà lo spessore al muro
  {
    const c = muroScuro.getContext('2d');
    c.drawImage(muro, 0, 0);
    c.globalCompositeOperation = 'source-atop';
    c.fillStyle = 'rgba(24,13,9,0.68)';
    c.fillRect(0, 0, W, H);
  }

  const strato = tela(), sx = strato.getContext('2d'); // mattoni ancora al loro posto
  const scuri = tela(), sc = scuri.getContext('2d');
  const scena = tela(), sn = scena.getContext('2d'); // muro con ombre e spessore, rifatto solo quando cambia
  const MW = 320, MH = Math.ceil((320 * H) / W), mk = MW / W;
  const masch = tela(MW, MH), mx = masch.getContext('2d');
  const masch2 = tela(64, Math.ceil((64 * H) / W)), m2 = masch2.getContext('2d');
  let sporco = true;

  // Mattoni: celle della foto portate sullo schermo. Combaciano al pixel.
  const B = [];
  for (const c of dati.celle) {
    const x0 = Math.round(ox + c[0] * k), x1 = Math.round(ox + (c[0] + c[2]) * k);
    const y0 = Math.round(oy + c[1] * k), y1 = Math.round(oy + (c[1] + c[3]) * k);
    if (x1 <= 0 || x0 >= W || y1 <= 0 || y0 >= H || x1 - x0 < 2 || y1 - y0 < 2) continue;
    B.push({ x: x0, y: y0, w: x1 - x0, h: y1 - y0, corso: c[4], st: 0, t0: 0, cade: Infinity, j: Math.random(), f: rnd(0.34, 0.66), tilt: null, crepa: false, sotto: [], sopra: [] });
  }
  const corsi = {};
  for (const b of B) (corsi[b.corso] || (corsi[b.corso] = [])).push(b);
  for (const b of B) {
    for (const q of corsi[b.corso - 1] || []) {
      const ov = Math.min(b.x + b.w, q.x + q.w) - Math.max(b.x, q.x);
      if (ov > Math.min(b.w, q.w) * 0.2) { b.sotto.push(q); q.sopra.push(b); }
    }
  }
  const corsoMin = Math.min(...B.map((b) => b.corso));
  const inizio = performance.now();
  for (const b of B) b.t0 = inizio + 80 + (b.corso - corsoMin) * 56 + (b.x / W) * 150 + rnd(0, 60);

  const copia = (c, src, b, dx = 0, dy = 0) => {
    const x0 = Math.max(0, b.x), y0 = Math.max(0, b.y), x1 = Math.min(W, b.x + b.w), y1 = Math.min(H, b.y + b.h);
    if (x1 > x0 && y1 > y0) c.drawImage(src, x0, y0, x1 - x0, y1 - y0, x0 + dx, y0 + dy, x1 - x0, y1 - y0);
  };
  const posa = (b) => {
    sx.setTransform(1, 0, 0, 1, 0, 0); copia(sx, muro, b);
    sc.setTransform(1, 0, 0, 1, 0, 0); copia(sc, muroScuro, b);
    mx.fillStyle = '#000'; mx.fillRect(b.x * mk, b.y * mk, b.w * mk, b.h * mk);
    sporco = true;
  };
  const togli = (b) => {
    const e = b.tilt ? Math.ceil(2 * u) : 0;
    for (const c of [sx, sc]) { c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(b.x - e, b.y - e, b.w + 2 * e, b.h + 2 * e); }
    mx.clearRect(b.x * mk - 0.3, b.y * mk - 0.3, b.w * mk + 0.6, b.h * mk + 0.6);
    sporco = true;
  };
  const crepa = (b) => {
    if (b.crepa) return;
    b.crepa = true;
    sx.setTransform(1, 0, 0, 1, 0, 0);
    if (b.tilt) { sx.translate(b.x + b.w / 2 + b.tilt.ox, b.y + b.h / 2 + b.tilt.oy); sx.rotate(b.tilt.a); sx.translate(-(b.x + b.w / 2), -(b.y + b.h / 2)); }
    const x0 = b.x + b.w * b.f, m = b.h * 0.14;
    sx.strokeStyle = 'rgba(30,14,10,0.78)';
    sx.lineWidth = 1.1 * u;
    sx.lineJoin = 'round';
    sx.beginPath();
    sx.moveTo(x0 + rnd(-2, 2) * u, b.y + m);
    for (let i = 1; i <= 4; i++) sx.lineTo(x0 + rnd(-3.5, 3.5) * u, b.y + m + ((b.h - 2 * m) * i) / 4);
    sx.stroke();
    sporco = true;
  };
  // Un mattone smosso: resta al suo posto ma perde la malta e si inclina appena.
  const smuovi = (b) => {
    if (b.tilt) return;
    togli(b);
    b.tilt = { a: rnd(-0.04, 0.04), ox: rnd(-1.2, 1.2) * u, oy: rnd(0.4, 1.8) * u };
    for (const [c, src] of [[sx, taglio], [sc, muroScuro]]) {
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.translate(b.x + b.w / 2 + b.tilt.ox, b.y + b.h / 2 + b.tilt.oy);
      c.rotate(b.tilt.a);
      c.drawImage(src, b.x, b.y, b.w, b.h, -b.w / 2, -b.h / 2, b.w, b.h);
    }
    mx.fillStyle = '#000'; mx.fillRect(b.x * mk, b.y * mk, b.w * mk, b.h * mk);
    sporco = true;
  };

  const corpi = [], polvere = [];
  let via = 0;
  const cur = { x: W / 2, y: H / 2, px: W / 2, py: H / 2, on: false, vx: 0, vy: 0 };
  const stacca = (b, ora) => {
    togli(b);
    b.st = 3;
    via++;
    const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
    let dx = cx - cur.x, dy = cy - cur.y;
    const dl = Math.hypot(dx, dy) || 1;
    dx /= dl; dy /= dl;
    const sp = rnd(40, 150) * u, colpo = rnd(30, 130) * u;
    const parti = Math.random() < 0.42 ? [[0, b.f], [b.f, 1]] : [[0, 1]];
    for (const [a0, a1] of parti) {
      const w = b.w * (a1 - a0);
      corpi.push({ sx: b.x + b.w * a0, sy: b.y, w, h: b.h, x: b.x + (b.w * (a0 + a1)) / 2, y: cy,
        vx: dx * sp + cur.vx * 0.2 + rnd(-40, 40) * u + (parti.length > 1 ? (a0 > 0 ? 38 : -38) * u : 0),
        vy: dy * sp * 0.5 - colpo + cur.vy * 0.12, r: b.tilt ? b.tilt.a : 0, vr: rnd(-5.5, 5.5) });
    }
    for (let i = 0, n = 5 + Math.floor(rnd(0, 5)); i < n; i++) {
      polvere.push({ x: b.x + rnd(0, b.w), y: b.y + rnd(0, b.h), vx: rnd(-70, 70) * u + dx * 40 * u, vy: rnd(-90, 30) * u, t: 0, max: rnd(0.45, 0.95), s: rnd(1.2, 3.4) * u, c: Math.random() < 0.55 ? '214,208,196' : '176,108,80' });
    }
    // chi resta senza appoggio lo segue, un attimo dopo
    for (const q of b.sopra) if (q.st === 1 && q.sotto.every((s) => s.st === 3)) { q.st = 2; q.cade = ora + rnd(110, 300); }
  };

  let fase = 'posa', fermo = inizio, gioco = 0, mano = false, gu = 0;
  const gp = [rnd(0, 6.28), rnd(0, 6.28), rnd(0, 6.28)];
  const manoPos = (t) => ({ x: W * (0.5 + 0.4 * Math.sin(t + gp[0]) + 0.05 * Math.sin(t * 2.9 + gp[2])), y: H * (0.46 + 0.25 * Math.sin(t * 1.618 + gp[1])) });
  const crolla = (ora) => {
    if (fase === 'crollo') return;
    for (const b of B) {
      if (b.st === 0) { posa(b); b.st = 1; }
      if (b.st === 3) continue;
      const t = ora + Math.hypot(b.x + b.w / 2 - cur.x, b.y + b.h / 2 - cur.y) / (1.5 * u) + rnd(0, 130);
      if (b.st === 1) { b.st = 2; b.cade = t; if (b.j > 0.5) crepa(b); } else b.cade = Math.min(b.cade, t);
    }
    fase = 'crollo';
  };
  const spazzola = (ora) => {
    const R = 110 * u, ax = cur.x - cur.px, ay = cur.y - cur.py, L2 = ax * ax + ay * ay;
    for (const b of B) {
      if (b.st !== 1) continue;
      const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
      let t = L2 > 0 ? ((cx - cur.px) * ax + (cy - cur.py) * ay) / L2 : 0;
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      const d = Math.hypot(cx - (cur.px + ax * t), cy - (cur.py + ay * t));
      if (d < R * (0.6 + 0.3 * b.j)) { b.st = 2; b.cade = ora + (d / R) * 150 + rnd(20, 110); crepa(b); }
      else if (d < R * 1.45 && b.j > 0.62) { smuovi(b); if (b.j > 0.85) crepa(b); }
    }
  };

  // Comandi: il mouse smonta il muro; clic, tasto o rotella lo fanno crollare subito.
  const suMouse = (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    const x = e.clientX * dpr, y = e.clientY * dpr;
    if (!cur.on || mano) { cur.px = x; cur.py = y; }
    cur.x = x; cur.y = y; cur.on = true; mano = false; fermo = performance.now();
  };
  const subito = () => crolla(performance.now());
  window.addEventListener('pointermove', suMouse, { passive: true });
  window.addEventListener('pointerdown', subito, { passive: true });
  window.addEventListener('keydown', subito);
  window.addEventListener('wheel', subito, { passive: true });

  return new Promise((fine) => {
    let prima = performance.now();
    const giro = (ora) => {
      const dt = Math.min(0.034, (ora - prima) / 1000);
      prima = ora;

      if (fase === 'posa') {
        let tutti = true;
        for (const b of B) if (b.st === 0) { if (ora >= b.t0 + 220) { posa(b); b.st = 1; } else tutti = false; }
        if (tutti) { fase = 'gioco'; fermo = ora; gioco = ora; }
      }

      if (fase === 'gioco') {
        let attivo = false;
        if (ora - fermo > 1600) { // nessuno muove il mouse: una mano invisibile smonta al posto suo
          if (!mano) { mano = true; const g0 = manoPos(gu); cur.x = cur.px = g0.x; cur.y = cur.py = g0.y; }
          gu += dt * 1.7;
          const g = manoPos(gu);
          cur.px = cur.x; cur.py = cur.y; cur.x = g.x; cur.y = g.y;
          attivo = true;
        } else attivo = cur.on && !mano;
        cur.vx = (cur.x - cur.px) / dt; cur.vy = (cur.y - cur.py) / dt;
        if (attivo) spazzola(ora);
        if (!mano) { cur.px = cur.x; cur.py = cur.y; }
        if (via >= B.length * 0.58 || ora - gioco > 7500) crolla(ora);
      }

      let restano = 0;
      if (fase !== 'posa') for (const b of B) { if (b.st === 2 && ora >= b.cade) stacca(b, ora); if (b.st !== 3) restano++; }

      if (sporco) {
        sporco = false;
        sn.setTransform(1, 0, 0, 1, 0, 0);
        sn.globalAlpha = 1;
        sn.clearRect(0, 0, W, H);
        m2.clearRect(0, 0, masch2.width, masch2.height);
        m2.drawImage(masch, 0, 0, masch2.width, masch2.height);
        sn.globalAlpha = 0.36; // ombra lontana, larga e morbida: il muro sta staccato dal fondo
        sn.drawImage(masch2, 0, 0, masch2.width, masch2.height, 26 * u, 38 * u, W, H);
        sn.globalAlpha = 0.34; // ombra vicina, più netta
        sn.drawImage(masch, 0, 0, MW, MH, 11 * u, 17 * u, W, H);
        sn.globalAlpha = 1;
        for (let i = 3; i >= 1; i--) sn.drawImage(scuri, Math.round(i * 2.1 * u), Math.round(i * 3.2 * u)); // spessore
        sn.drawImage(strato, 0, 0);
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(scena, 0, 0);

      if (fase === 'posa') {
        for (const b of B) {
          if (b.st !== 0 || ora < b.t0) continue;
          const p = Math.min(1, (ora - b.t0) / 220);
          ctx.globalAlpha = Math.min(1, p * 2.4);
          copia(ctx, muro, b, 0, Math.round((1 - fuori(p)) * -18 * u));
        }
        ctx.globalAlpha = 1;
      }

      const G = 1900 * u;
      for (let i = corpi.length - 1; i >= 0; i--) {
        const o = corpi[i];
        o.vy += G * dt; o.x += o.vx * dt; o.y += o.vy * dt; o.r += o.vr * dt;
        if (o.y - o.w > H) { corpi.splice(i, 1); continue; }
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.translate(o.x, o.y);
        ctx.rotate(o.r);
        ctx.drawImage(taglio, o.sx, o.sy, o.w, o.h, -o.w / 2, -o.h / 2, o.w, o.h);
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      for (let i = polvere.length - 1; i >= 0; i--) {
        const q = polvere[i];
        q.t += dt;
        if (q.t >= q.max) { polvere.splice(i, 1); continue; }
        q.vy += 420 * u * dt; q.vx *= 1 - 1.8 * dt; q.x += q.vx * dt; q.y += q.vy * dt;
        ctx.fillStyle = `rgba(${q.c},${(0.8 * (1 - q.t / q.max)).toFixed(3)})`;
        ctx.fillRect(q.x, q.y, q.s, q.s);
      }

      if (fase === 'crollo' && restano === 0 && corpi.length === 0 && polvere.length === 0) {
        window.removeEventListener('pointermove', suMouse);
        window.removeEventListener('pointerdown', subito);
        window.removeEventListener('keydown', subito);
        window.removeEventListener('wheel', subito);
        ctx.clearRect(0, 0, W, H);
        canvas.width = canvas.height = 0; // libera la memoria
        fine(true);
        return;
      }
      requestAnimationFrame(giro);
    };
    requestAnimationFrame(giro);
  });
}
