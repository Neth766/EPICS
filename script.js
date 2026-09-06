const imageFallback = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23dfeadd'/%3E%3Cstop offset='1' stop-color='%23176b47'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23g)'/%3E%3Cpath d='M394 434c-68-68-70-164-3-231 71 63 81 158 3 231Z' fill='%23fff' fill-opacity='.72'/%3E%3Cpath d='M402 430c66-31 108-87 120-165 53 52 53 132 5 179-34 33-80 36-125-14Z' fill='%23fff' fill-opacity='.45'/%3E%3Ctext x='400' y='514' text-anchor='middle' font-family='Inter,Arial' font-size='34' font-weight='700' fill='%23fff'%3EPlant image pending%3C/text%3E%3C/svg%3E";

const plants = [
  {
    id: "tulsi", name: "Tulsi", localName: "Tulasi", scientific: "Ocimum tenuiflorum", family: "Lamiaceae", region: "South India",
    uses: "Sacred adaptogenic herb documented in community education for respiratory comfort, immunity, and digestive support.", tags: ["Immunity", "Respiratory", "Digestive"], symptoms: ["cough", "cold", "sore throat"],
    image: "assets/plants/Tulsi/Tulsi_or_Tulasi_Holy_basil.jpg", pdf: "assets/plants/Tulsi/Tulsi.pdf", pageCount: 3
  },
  {
    id: "kalmegh", name: "Kalmegh", localName: "Kalmegh", scientific: "Andrographis paniculata", family: "Acanthaceae", region: "Deccan Plateau",
    uses: "A medicinal plant documented in regional traditional knowledge and plant-learning resources.", tags: ["Fever", "Wellness", "Herb"], symptoms: ["fever", "flu"],
    image: "assets/plants/Kalmegh/Andrographis_paniculata_(Kalpa)_in_Narshapur_forest,_AP_W2_IMG_0867.jpg", pdf: "assets/plants/Kalmegh/Kalmegh.pdf", pageCount: 3
  },
  {
    id: "punarnava", name: "Punarnava", localName: "Punarnava", scientific: "Boerhavia diffusa", family: "Nyctaginaceae", region: "Western Ghats",
    uses: "A plant featured in traditional medicinal-plant documentation and general wellness learning.", tags: ["Wellness", "Body ache", "Herb"], symptoms: ["fatigue", "body ache"],
    image: "assets/plants/Punarnava/पुनर्नवा_फुले.jpg", pdf: "assets/plants/Punarnava/Punarnava.pdf", pageCount: 3
  },
  {
    id: "bhringraj", name: "Bhringraj", localName: "Bhringraj", scientific: "Eclipta prostrata", family: "Asteraceae", region: "Coastal India",
    uses: "A medicinal plant represented in regional knowledge and educational preparation practices.", tags: ["Headache", "Oil preparation", "Herb"], symptoms: ["headache"],
    image: "assets/plants/Bhringraj/Eclipta_prostrata_in_AP_W2_IMG_9785.jpg", pdf: "assets/plants/Bhringraj/Bhringraj.pdf", pageCount: 3
  },
  {
    id: "apamarga", name: "Apamarga", localName: "Apamargam", scientific: "Achyranthes aspera", family: "Amaranthaceae", region: "Deccan Plateau",
    uses: "A plant represented in regional medicinal-plant knowledge and community learning resources.", tags: ["Headache", "Body ache", "Infusion"], symptoms: ["headache", "body ache"],
    image: "assets/plants/Apamarga/Achyranthes_aspera_at_Kadavoor.jpg", pdf: "assets/plants/Apamarga/Apamarga.pdf", pageCount: 3
  },
  {
    id: "chirata", name: "Chirata", localName: "Chirata", scientific: "Swertia perennis", family: "Gentianaceae", region: "Himalayan foothills",
    uses: "A medicinal plant featured in traditional knowledge and regional educational plant guides.", tags: ["Indigestion", "Fever", "Decoction"], symptoms: ["indigestion", "fever"],
    image: "assets/plants/Chirata/Swertia_perennis_230705.jpg", pdf: "assets/plants/Chirata/Chirata.pdf", pageCount: 3
  },
  {
    id: "guduchi-giloy", name: "Guduchi (Giloy)", localName: "Giloy", scientific: "Tinospora cordifolia", family: "Menispermaceae", region: "Western Ghats",
    uses: "A climbing medicinal plant with a long history in traditional knowledge and wellness learning.", tags: ["Wellness", "Body ache", "Climber"], symptoms: ["fatigue", "body ache"],
    image: "assets/plants/Guduchi (or) Giloy/Tinospora_cordifolia.jpg", pdf: "assets/plants/Guduchi (or) Giloy/Guduchi (or) Giloy.pdf", pageCount: 3
  },
  {
    id: "vasaka", name: "Vasaka", localName: "Adhatoda", scientific: "Justicia adhatoda", family: "Acanthaceae", region: "South India",
    uses: "A medicinal plant commonly documented in traditional respiratory-focused plant knowledge.", tags: ["Cough", "Respiratory", "Decoction"], symptoms: ["cough", "sore throat", "shortness of breath"],
    image: "assets/plants/Vasaka/Justicia_adhatoda_1.jpg", pdf: "assets/plants/Vasaka/Vasaka.pdf", pageCount: 3
  }
];

const plantGrid = document.querySelector("#plantGrid");
const toast = document.querySelector("#toast");
const globalSearch = document.querySelector("#globalSearch");
const exploreSearch = document.querySelector("#exploreSearch");
const search = exploreSearch || globalSearch;
const searchInputs = [globalSearch, exploreSearch].filter(Boolean);
const splash = document.querySelector("#splash");
const smartAssist = document.querySelector("#smartAssist");
const searchType = document.querySelector("#searchType");
const familyFilter = document.querySelector("#familyFilter");
const regionFilter = document.querySelector("#regionFilter");
const sortSelect = document.querySelector("#sortSelect");
const symptomSearch = document.querySelector("#symptomSearch");
const symptomDeck = document.querySelector("#symptomDeck");
const deckTitle = document.querySelector("#deckTitle");
const slideCounter = document.querySelector("#slideCounter");
const slideDots = document.querySelector("#slideDots");
let currentSlides = [];
let currentSlideIndex = 0;
let selectedExplorePlant = plants[0];
const detailMainImage = document.querySelector("#detailMainImage");
const detailThumbOne = document.querySelector("#detailThumbOne");
const detailPlantName = document.querySelector("#detailPlantName");
const detailPlantScientific = document.querySelector("#detailPlantScientific");
const detailPlantDescription = document.querySelector("#detailPlantDescription");
const detailPlantLocalName = document.querySelector("#detailPlantLocalName");
const detailPlantFamily = document.querySelector("#detailPlantFamily");
const detailPlantRegion = document.querySelector("#detailPlantRegion");
const detailPlantUses = document.querySelector("#detailPlantUses");
const qrPanel = document.querySelector("#qrPanel");
const plantQrImage = document.querySelector("#plantQrImage");

function initAnimatedBackground() {
  const canvas = document.querySelector("#livingForestCanvas");
  const shell = document.querySelector("#animatedBackground");
  if (!canvas || !shell) return;

  const context = canvas.getContext("2d", { alpha: true });
  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
  const navMemory = navigator.deviceMemory || 4;
  const lowPower = navMemory <= 4 || navigator.hardwareConcurrency <= 4 || coarsePointerQuery.matches;

  const state = {
    width: 0, height: 0, dpr: 1,
    points: [], pollen: [], leaves: [], floatingLeaves: [], glows: [],
    raf: 0, running: false,
    reduced: reduceMotionQuery.matches,
    start: performance.now(),
    lastLeaf: 0, lastFrame: 0, frameCount: 0, fps: 60, lowFpsFrames: 0, skipNext: false,
    mouse: { x: -9999, y: -9999, active: false, smoothX: -9999, smoothY: -9999 },
    connGrowthTarget: 1, allConnections: null, nodeConnections: null,
    offscreen: null, offCtx: null,
    haloGrad: null
  };

  function smoothMouse() {
    if (state.mouse.active) {
      state.mouse.smoothX += (state.mouse.x - state.mouse.smoothX) * 0.18;
      state.mouse.smoothY += (state.mouse.y - state.mouse.smoothY) * 0.18;
    } else {
      state.mouse.smoothX += (-9999 - state.mouse.smoothX) * 0.05;
      state.mouse.smoothY += (-9999 - state.mouse.smoothY) * 0.05;
    }
  }

  function rand(min, max) { return min + Math.random() * (max - min); }

  /* ── Grid-based Poisson-like placement for even distribution ── */
  function poissonGridPlacement(count, width, height) {
    if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0 || count <= 0) {
      return [];
    }

    const cellSize = Math.sqrt((width * height) / count);
    if (!Number.isFinite(cellSize) || cellSize <= 0) {
      return [];
    }

    const cols = Math.max(1, Math.ceil(width / cellSize));
    const rows = Math.max(1, Math.ceil(height / cellSize));
    const grid = Array.from({ length: rows }, () => new Array(cols).fill(null));
    const result = [];

    let attempts = 0;
    const maxAttempts = count * 40;
    while (result.length < count && attempts < maxAttempts) {
      attempts++;
      const x = rand(8, width - 8);
      const y = rand(8, height - 8);
      const col = Math.floor(x / cellSize);
      const row = Math.floor(y / cellSize);
      let occupied = false;
      for (let r = Math.max(0, row - 2); r <= Math.min(rows - 1, row + 2); r++) {
        for (let c = Math.max(0, col - 2); c <= Math.min(cols - 1, col + 2); c++) {
          if (grid[r][c]) {
            const dx = x - grid[r][c].x;
            const dy = y - grid[r][c].y;
            if (dx * dx + dy * dy < cellSize * cellSize * 0.55) { occupied = true; break; }
          }
        }
        if (occupied) break;
      }
      if (!occupied) {
        const pt = { x, y };
        result.push(pt);
        grid[row][col] = pt;
      }
    }
    return result;
  }

  function resize() {
    state.width = window.innerWidth;
    state.height = window.innerHeight;
    state.dpr = Math.min(window.devicePixelRatio || 1, lowPower ? 1.25 : 1.5);
    canvas.width = Math.floor(state.width * state.dpr);
    canvas.height = Math.floor(state.height * state.dpr);
    canvas.style.width = `${state.width}px`;
    canvas.style.height = `${state.height}px`;
    context.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

    shell.style.contain = "layout paint style";
    canvas.style.willChange = "transform";
  canvas.style.transform = "translateZ(0)";

    state.allConnections = null;
    state.offscreen = null;
    state.haloGrad = null;

    state.connGrowthTarget = 1;

    // Pre-build halo sprite
    if (state.width > 0 && state.height > 0) {
      const size = 256;
      const offCanvas = document.createElement("canvas");
      offCanvas.width = size;
      offCanvas.height = size;
      const offCtx = offCanvas.getContext("2d");
      const grad = offCtx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grad.addColorStop(0, "rgba(47, 196, 148, 0.18)");
      grad.addColorStop(0.45, "rgba(47, 196, 148, 0.055)");
      grad.addColorStop(1, "rgba(47, 196, 148, 0)");
      offCtx.fillStyle = grad;
      offCtx.fillRect(0, 0, size, size);
      state.haloGrad = offCanvas;
    }

    seed();
    draw(performance.now());
  }

  function seed() {
    const area = state.width * state.height;
    const networkCount = state.reduced ? 52 : Math.min(lowPower ? 90 : 135, Math.max(42, Math.floor(area / (lowPower ? 9800 : 6200))));
    const pollenCount = state.reduced ? 140 : Math.min(lowPower ? 850 : 1500, Math.max(220, Math.floor(area / (lowPower ? 1900 : 900))));
    const glowCount = state.reduced ? 5 : lowPower ? 8 : 12;

    const positions = poissonGridPlacement(networkCount, state.width, state.height);
    state.points = positions.map((pos) => ({
      x: pos.x, y: pos.y, baseX: pos.x, baseY: pos.y,
      vx: rand(-0.02, 0.02), vy: rand(-0.015, 0.015),
      phase: rand(0, Math.PI * 2), pulse: rand(0, Math.PI * 2),
      size: rand(0.9, 1.9), drift: rand(0.15, 0.5),
      growth: 0, growthSpeed: rand(0.006, 0.018), nodeAlpha: 0
    }));

    state.pollen = Array.from({ length: pollenCount }, () => ({
      x: rand(0, state.width), y: rand(0, state.height),
      z: rand(0.35, 1), size: rand(0.38, 1.1),
      phase: rand(0, Math.PI * 2), speed: rand(0.008, 0.03),
      alpha: rand(0.18, 0.58)
    }));

    const floatingLeafCount = state.reduced ? 10 : lowPower ? 24 : 48;
    state.floatingLeaves = Array.from({ length: floatingLeafCount }, () => ({
      x: rand(0, state.width), y: rand(0, state.height),
      size: rand(4, lowPower ? 9 : 13),
      angle: rand(0, Math.PI * 2), phase: rand(0, Math.PI * 2),
      drift: rand(0.06, 0.18), alpha: rand(0.14, 0.3),
      leafType: Math.random() < 0.3 ? 1 : 0
    }));

    state.glows = Array.from({ length: glowCount }, () => ({
      x: rand(0, state.width), y: rand(0, state.height),
      radius: rand(60, 160), phase: rand(0, Math.PI * 2),
      hue: Math.random() > 0.5 ? "47,196,148" : "46,176,178"
    }));
    state.allConnections = null;
    state.nodeConnections = null;
  }

  function drawLeaf(x, y, angle, age, scale = 1, alphaBoost = 1, leafType = 0) {
    const life = Math.max(0, 1 - age / 6200);
    if (life <= 0) return;
    const sway = Math.sin(performance.now() * 0.0014 + x * 0.02) * 0.18;
    const size = (6 + 11 * Math.sin(Math.min(1, age / 1500) * Math.PI)) * scale;
    context.save();
    context.translate(x, y);
    context.rotate(angle + sway);
    context.globalAlpha = life * 0.52 * alphaBoost;

    if (leafType === 0) {
      context.fillStyle = "rgba(96, 236, 174, 0.82)";
      context.beginPath();
      context.moveTo(0, -size);
      context.bezierCurveTo(size * 0.75, -size * 0.25, size * 0.52, size * 0.68, 0, size);
      context.bezierCurveTo(-size * 0.62, size * 0.25, -size * 0.55, -size * 0.58, 0, -size);
      context.fill();
      context.strokeStyle = "rgba(184, 255, 224, 0.5)";
      context.lineWidth = 0.55;
      context.beginPath();
      context.moveTo(0, -size * 0.74);
      context.lineTo(0, size * 0.72);
      context.stroke();
    } else {
      context.fillStyle = "rgba(56, 190, 130, 0.85)";
      context.beginPath();
      context.moveTo(0, -size * 1.15);
      context.bezierCurveTo(size * 0.45, -size * 0.35, size * 0.38, size * 0.65, 0, size * 1.05);
      context.bezierCurveTo(-size * 0.38, size * 0.65, -size * 0.45, -size * 0.35, 0, -size * 1.15);
      context.fill();
      context.strokeStyle = "rgba(160, 255, 220, 0.45)";
      context.lineWidth = 0.4;
      context.beginPath();
      context.moveTo(0, -size * 0.85);
      context.lineTo(0, size * 0.85);
      context.stroke();
    }

    context.restore();
  }

  function drawFloatingLeaves(elapsed) {
    const leaves = state.floatingLeaves;
    for (let i = 0; i < leaves.length; i++) {
      const leaf = leaves[i];
      if (!state.reduced) {
        leaf.x += Math.sin(elapsed * 0.16 + leaf.phase) * leaf.drift;
        leaf.y += Math.cos(elapsed * 0.11 + leaf.phase) * leaf.drift - leaf.drift * 0.18;
        leaf.angle += Math.sin(elapsed * 0.08 + leaf.phase) * 0.0018;
      }
      if (leaf.x < -30) leaf.x = state.width + 30;
      if (leaf.x > state.width + 30) leaf.x = -30;
      if (leaf.y < -30) leaf.y = state.height + 30;
      if (leaf.y > state.height + 30) leaf.y = -30;
      drawLeaf(leaf.x, leaf.y, leaf.angle + Math.sin(elapsed * 0.5 + leaf.phase) * 0.22, 1700, leaf.size / 14, leaf.alpha, leaf.leafType || 0);
    }
  }

  function draw(time) {
    if (state.skipNext) {
      state.skipNext = false;
    }

    context.clearRect(0, 0, state.width, state.height);
    const elapsed = (time - state.start) * 0.001;

    smoothMouse();

    if (state.lastFrame > 0) {
      const dt = time - state.lastFrame;
      if (dt > 0) state.fps = 0.92 * state.fps + 0.08 * (1000 / dt);
      if (state.fps < 45) {
        state.lowFpsFrames++;
        if (state.lowFpsFrames > 60) state.skipNext = true;
      } else {
        state.lowFpsFrames = 0;
      }
    }
    state.lastFrame = time;
    state.frameCount++;

    drawLargeGlows(elapsed);
    if (!state.reduced) updatePoints(elapsed);
    drawNetwork(elapsed, time);
    drawPollen(elapsed);
    drawFloatingLeaves(elapsed);

    state.leaves = state.leaves.filter((leaf) => time - leaf.created < 6200);
    state.leaves.forEach((leaf) => drawLeaf(leaf.x, leaf.y, leaf.angle, time - leaf.created, leaf.scale || 1, 1, leaf.leafType || 0));

    if (state.running) state.raf = requestAnimationFrame(draw);
  }

  function updatePoints(elapsed) {
    const radius = lowPower ? 100 : 128;
    const points = state.points;
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      point.baseX += point.vx + Math.sin(elapsed * 0.1 + point.phase) * 0.012 * point.drift;
      point.baseY += point.vy + Math.cos(elapsed * 0.085 + point.phase) * 0.01 * point.drift;
      if (point.baseX < -120) point.baseX = state.width + 120;
      if (point.baseX > state.width + 120) point.baseX = -120;
      if (point.baseY < -120) point.baseY = state.height + 120;
      if (point.baseY > state.height + 120) point.baseY = -120;

      let repelX = 0;
      let repelY = 0;
      if (state.mouse.active) {
        const dx = point.baseX - state.mouse.smoothX;
        const dy = point.baseY - state.mouse.smoothY;
        const sqDist = dx * dx + dy * dy;
        const r2 = radius * radius;
        if (sqDist < r2 && sqDist > 0.01) {
          const dist = Math.sqrt(sqDist);
          const force = (1 - dist / radius) * (lowPower ? 18 : 30);
          repelX = (dx / dist) * force;
          repelY = (dy / dist) * force;
        }
      }
      point.x += (point.baseX + repelX - point.x) * 0.032;
      point.y += (point.baseY + repelY - point.y) * 0.032;
    }
  }

  function drawLargeGlows(elapsed) {
    if (!state.haloGrad) return;
    const glows = state.glows;
    for (let i = 0; i < glows.length; i++) {
      const glow = glows[i];
      const x = glow.x + Math.sin(elapsed * 0.055 + glow.phase) * 22;
      const y = glow.y + Math.cos(elapsed * 0.047 + glow.phase) * 18;
      const alpha = state.reduced ? 0.1 : 0.16;
      context.globalAlpha = alpha;
      context.drawImage(state.haloGrad, x - glow.radius, y - glow.radius, glow.radius * 2, glow.radius * 2);
    }
    context.globalAlpha = 1;
  }

  function drawNetwork(elapsed, time) {
    const maxDistance = lowPower ? 110 : 135;
    const mouseGlowRadius = lowPower ? 100 : 120;
    const mouseGlowRadiusSq = mouseGlowRadius * mouseGlowRadius;
    context.lineCap = "round";

    if (!state.allConnections) {
      const conns = [];
      const nodeConns = state.points.map(() => []);
      for (let i = 0; i < state.points.length; i++) {
        for (let j = i + 1; j < state.points.length; j++) {
          const dx = state.points[i].x - state.points[j].x;
          const dy = state.points[i].y - state.points[j].y;
          const distSq = dx * dx + dy * dy;
          const maxDistSq = maxDistance * maxDistance;
          if (distSq <= maxDistSq) {
            const dist = Math.sqrt(distSq);
            conns.push({ a: i, b: j, dist, growth: 0, distSq });
            nodeConns[i].push(conns.length - 1);
            nodeConns[j].push(conns.length - 1);
          }
        }
      }
      state.allConnections = conns;
      state.nodeConnections = nodeConns;
      state.connGrowthTarget = 1;
    }

    const conns = state.allConnections;
    const nodeConns = state.nodeConnections;

    for (let c = 0; c < conns.length; c++) {
      const conn = conns[c];
      conn.growth += (state.connGrowthTarget - conn.growth) * 0.018;
      if (conn.growth < 0.005) continue;

      const a = state.points[conn.a];
      const b = state.points[conn.b];
      const smooth = conn.growth < 1
        ? conn.growth * conn.growth * (3 - 2 * conn.growth)
        : 1;
      const growthWave = (Math.sin(elapsed * 0.18 + a.phase + b.phase) + 1) * 0.5;

      if (!conn._alphaCache || conn._elapsed !== elapsed) {
        conn._alphaCache = Math.pow(1 - conn.dist / maxDistance, 1.55);
        conn._elapsed = elapsed;
      }
      const alpha = conn._alphaCache * (0.18 + growthWave * 0.4) * smooth;
      if (alpha < 0.005) continue;

      const midX = (a.x + b.x) * 0.5;
      const midY = (a.y + b.y) * 0.5;
      let interaction = 0;
      if (state.mouse.active) {
        const mdx = midX - state.mouse.smoothX;
        const mdy = midY - state.mouse.smoothY;
        const mDistSq = mdx * mdx + mdy * mdy;
        if (mDistSq < mouseGlowRadiusSq) {
          interaction = 1 - Math.sqrt(mDistSq) / mouseGlowRadius;
        }
      }

      const drawAlpha = Math.min(0.52, alpha + interaction * 0.18);
      context.strokeStyle = `rgba(31, 188, 138, ${drawAlpha})`;
      context.lineWidth = 0.26 + growthWave * 0.16 + interaction * 0.34;
      context.beginPath();
      context.moveTo(a.x, a.y);
      const endX = a.x + (b.x - a.x) * smooth;
      const endY = a.y + (b.y - a.y) * smooth;
      const curve = Math.sin(elapsed * 0.12 + a.phase) * 8;
      context.quadraticCurveTo(midX + curve, midY - curve, endX, endY);
      context.stroke();
    }

    for (let i = 0; i < state.points.length; i++) {
      const point = state.points[i];
      const myConns = nodeConns[i];
      if (!myConns || myConns.length === 0) {
        point.nodeAlpha *= 0.95;
        continue;
      }
      let avgGrowth = 0;
      for (let c = 0; c < myConns.length; c++) {
        avgGrowth += conns[myConns[c]].growth;
      }
      avgGrowth /= myConns.length;
      point.nodeAlpha += (avgGrowth - point.nodeAlpha) * 0.04;

      if (point.nodeAlpha < 0.02) continue;
      const pulse = (Math.sin(elapsed * 0.55 + point.pulse) + 1) * 0.5;
      const na = point.nodeAlpha * (0.46 + pulse * 0.34);
      context.fillStyle = `rgba(116, 249, 202, ${na})`;
      context.beginPath();
      context.arc(point.x, point.y, point.size, 0, Math.PI * 2);
      context.fill();
    }
  }

  function drawPollen(elapsed) {
    const pollen = state.pollen;
    for (let i = 0; i < pollen.length; i++) {
      const speck = pollen[i];
      if (!state.reduced) {
        speck.x += Math.sin(elapsed * speck.speed + speck.phase) * 0.06 * speck.z;
        speck.y -= speck.speed * speck.z;
      }
      if (speck.y < -8) {
        speck.y = state.height + 8;
        speck.x = rand(0, state.width);
      }
      const shimmer = (Math.sin(elapsed * 0.8 + speck.phase) + 1) * 0.5;
      context.fillStyle = `rgba(125, 239, 197, ${speck.alpha * (0.55 + shimmer * 0.45)})`;
      context.beginPath();
      context.arc(speck.x, speck.y, speck.size * speck.z, 0, Math.PI * 2);
      context.fill();
    }
  }

  function start() {
    if (state.running) return;
    state.running = true;
    state.start = performance.now() - ((state.start || 0) % 40000);
    state.raf = requestAnimationFrame(draw);
  }

  function stop() {
    state.running = false;
    cancelAnimationFrame(state.raf);
    state.raf = 0;
  }

  function handlePointerMove(event) {
    state.mouse.x = event.clientX;
    state.mouse.y = event.clientY;
    state.mouse.active = !state.reduced;
  }

  function handlePointerLeave() {
    state.mouse.active = false;
  }

  function handleVisibility() {
    document.hidden ? stop() : start();
  }

  function handleMotionPreference() {
    state.reduced = reduceMotionQuery.matches || document.body.classList.contains("reduce-motion");
    state.allConnections = null;
    seed();
    state.fps = 60;
    draw(performance.now());
    state.reduced ? stop() : start();
  }

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
  document.addEventListener("visibilitychange", handleVisibility);
  reduceMotionQuery.addEventListener?.("change", handleMotionPreference);
  window.addEventListener("pagehide", stop);

  resize();
  if (state.reduced) {
    draw(performance.now());
  } else {
    start();
  }

  return {
    refreshMotion: handleMotionPreference,
    destroy() {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pagehide", stop);
    }
  };
}

const animatedBackground = initAnimatedBackground();

// ── Falling particles, ripening fruits, and birds in header ──
(function initFallingParticles() {
  if (document.body.classList.contains("reduce-motion")) return;
  const canvas = document.getElementById("topbarFallingCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];
  let birds = [];
  const MAX_PARTICLES = 14;

  function resize() {
    const header = canvas.closest(".topbar");
    if (!header) return;
    canvas.width = header.offsetWidth;
    canvas.height = header.offsetHeight * 3;
  }
  resize();
  window.addEventListener("resize", resize);

  function spawnBird() {
    return {
      x: -30,
      y: 12 + Math.random() * 30,
      speed: 0.3 + Math.random() * 0.5,
      wingPhase: Math.random() * Math.PI * 2,
      wingSpeed: 0.06 + Math.random() * 0.04,
      size: 3 + Math.random() * 4,
      color: Math.random() > 0.5 ? "#1a3a2a" : "#152e20",
    };
  }

  function spawnParticle() {
    const rand = Math.random();
    const isFruit = rand < 0.22;
    const isSeed = rand >= 0.22 && rand < 0.38;
    const s = 3 + Math.random() * 4;
    const fruitColors = ["#8b2500", "#a03020", "#c45c26", "#7a1f00", "#5c3a1e"];
    const fruitRipe = isFruit ? Math.random() < 0.4 : false;
    const autumnColors = ["#d4862b", "#c45c26", "#e0a030", "#b84e1e", "#a0522d", "#d4604a", "#8b4513"];
    return {
      x: Math.random() * (canvas.width + 60) - 30,
      y: isFruit || isSeed ? -s * 2 - Math.random() * 40 : -s * 2,
      size: isSeed ? 5 + Math.random() * 4 : s,
      speedY: isFruit ? 0.12 + Math.random() * 0.2 : isSeed ? 0.18 + Math.random() * 0.25 : 0.22 + Math.random() * 0.4,
      swayAmp: isSeed ? 1.5 + Math.random() * 2.5 : 0.3 + Math.random() * 0.9,
      swaySpeed: 0.008 + Math.random() * 0.018,
      swayOffset: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: isSeed ? 0.03 + Math.random() * 0.04 : (Math.random() - 0.5) * 0.012,
      isLeaf: !isFruit && !isSeed,
      isSeed: isSeed,
      color: isFruit
        ? fruitColors[Math.floor(Math.random() * fruitColors.length)]
        : isSeed ? "#8b6914" : autumnColors[Math.floor(Math.random() * autumnColors.length)],
      age: 0,
      isRipe: fruitRipe,
      ripeAge: fruitRipe ? Math.floor(Math.random() * 200) : 0,
    };
  }

  function drawLeaf(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.beginPath();
    ctx.moveTo(0, -p.size);
    ctx.bezierCurveTo(p.size * 0.7, -p.size * 0.5, p.size * 0.7, p.size * 0.5, 0, p.size);
    ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.5, -p.size * 0.7, -p.size * 0.5, 0, -p.size);
    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, -p.size * 0.7);
    ctx.lineTo(0, p.size * 0.7);
    ctx.strokeStyle = "rgba(0,0,0,0.12)";
    ctx.lineWidth = 0.35;
    ctx.stroke();
    ctx.restore();
  }

  function drawSeed(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = 0.9;
    // Helicopter seed body (small stem + wing)
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(0, -p.size);
    ctx.lineTo(-p.size * 0.22, -p.size * 0.12);
    ctx.lineTo(-p.size * 0.22, p.size * 0.6);
    ctx.lineTo(p.size * 0.22, p.size * 0.6);
    ctx.lineTo(p.size * 0.22, -p.size * 0.12);
    ctx.closePath();
    ctx.fill();
    // Seed outline
    ctx.strokeStyle = "rgba(0,0,0,0.15)";
    ctx.lineWidth = 0.5;
    ctx.stroke();
    // Small dot (seed kernel)
    ctx.fillStyle = "rgba(60,35,10,0.8)";
    ctx.beginPath();
    ctx.arc(0, -p.size * 0.15, p.size * 0.13, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawFruit(p) {
    const life = Math.max(0, 1 - p.age / 600);
    const alpha = life * 0.85;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    // small highlight
    ctx.beginPath();
    ctx.arc(p.x - p.size * 0.25, p.y - p.size * 0.25, p.size * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.22)";
    ctx.fill();
    ctx.restore();
  }

  function drawBird(b) {
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.strokeStyle = b.color;
    ctx.lineWidth = 1.5;
    ctx.lineCap = "round";
    const wingY = Math.sin(b.wingPhase) * 3.5;
    ctx.beginPath();
    ctx.moveTo(-b.size, wingY);
    ctx.quadraticCurveTo(-b.size * 0.3, wingY - 2, 0, wingY + 0.5);
    ctx.quadraticCurveTo(b.size * 0.3, wingY - 2, b.size, wingY);
    ctx.stroke();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Spawn particles
    if (particles.length < MAX_PARTICLES && Math.random() < 0.025) {
      particles.push(spawnParticle());
    }
    // Spawn birds occasionally
    if (birds.length < 3 && Math.random() < 0.003) {
      birds.push(spawnBird());
    }

    // Update & draw falling particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.age++;
      p.y += p.speedY;
      p.x += Math.sin(p.age * p.swaySpeed + p.swayOffset) * p.swayAmp;
      p.rotation += p.rotSpeed;

      // Ripening: change color as fruit ages
      if (p.isFruit && !p.isRipe && p.age > p.ripeAge) {
        const colors = ["#8b4513", "#a0522d", "#c45c26", "#d4862b"];
        p.color = colors[Math.floor(Math.random() * colors.length)];
        p.isRipe = true;
      }

      if (p.isLeaf) drawLeaf(p);
      else if (p.isSeed) drawSeed(p);
      else drawFruit(p);

      if (p.y > canvas.height + p.size * 2) {
        particles.splice(i, 1);
      }
    }

    // Update & draw birds
    for (let i = birds.length - 1; i >= 0; i--) {
      const b = birds[i];
      b.x += b.speed;
      b.wingPhase += b.wingSpeed;
      drawBird(b);
      if (b.x > canvas.width + 40) {
        birds.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
})();

function applyBrandLogo() {
  document.title = "EPICS | Medicinal Plant Knowledge Platform";
  const brand = document.querySelector(".brand");
  if (!brand) return;
  brand.setAttribute("aria-label", "EPICS home");
  const strong = brand.querySelector("strong");
  if (strong) strong.textContent = "EPICS";
}

const sampleImages = {
  tulsiLeaf: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 650'%3E%3Cdefs%3E%3CradialGradient id='bg' cx='50%25' cy='45%25' r='70%25'%3E%3Cstop stop-color='%23f3fbef'/%3E%3Cstop offset='1' stop-color='%23c6dfc0'/%3E%3C/radialGradient%3E%3ClinearGradient id='leaf' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%235eb36f'/%3E%3Cstop offset='1' stop-color='%23176b47'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='900' height='650' fill='url(%23bg)'/%3E%3Cpath d='M446 565C300 433 274 259 454 83c175 178 138 350-8 482Z' fill='url(%23leaf)'/%3E%3Cpath d='M449 112c-2 126-4 281-8 415' stroke='%23f7fff2' stroke-width='12' stroke-linecap='round' opacity='.9'/%3E%3Cpath d='M445 210c-48-18-88-38-123-72M444 284c-60-14-112-40-156-84M444 356c-67-10-128-38-183-86M445 432c-57-4-113-23-168-58M452 214c48-20 92-47 132-82M451 292c62-20 116-51 162-93M450 370c63-13 123-39 179-80M448 446c62-8 119-28 171-61' stroke='%23f7fff2' stroke-width='8' stroke-linecap='round' opacity='.72'/%3E%3Ccircle cx='196' cy='146' r='54' fill='%23d6a94f' opacity='.18'/%3E%3Ccircle cx='728' cy='505' r='82' fill='%232f9c68' opacity='.16'/%3E%3Ctext x='450' y='604' text-anchor='middle' font-family='Inter,Arial' font-size='38' font-weight='800' fill='%23176b47'%3ETulsi leaf%3C/text%3E%3C/svg%3E",
  honey: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 650'%3E%3Crect width='900' height='650' fill='%23f6efe1'/%3E%3Ccircle cx='215' cy='160' r='90' fill='%23f2c94c' opacity='.35'/%3E%3Cpath d='M360 178h180l-18 56H378z' fill='%23b86f24'/%3E%3Crect x='330' y='230' width='240' height='310' rx='56' fill='%23e8a735'/%3E%3Crect x='368' y='286' width='164' height='120' rx='26' fill='%23fff5d6' opacity='.78'/%3E%3Cpath d='M636 250c56 24 76 72 44 112-33 41-90 21-104-20-14-39 15-78 60-92Z' fill='%23d18a25'/%3E%3Cpath d='M258 458c86 34 204 52 376 0' stroke='%23176b47' stroke-width='18' fill='none' stroke-linecap='round' opacity='.28'/%3E%3Ctext x='450' y='365' text-anchor='middle' font-family='Inter,Arial' font-size='42' font-weight='800' fill='%23825b1b'%3EHoney%3C/text%3E%3C/svg%3E",
  ginger: "https://images.unsplash.com/photo-1615485500704-8e990f9900e1?auto=format&fit=crop&w=700&q=80",
  turmeric: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80",
  tulsiTea: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 650'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23e9f4e6'/%3E%3Cstop offset='1' stop-color='%23b7d7bd'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='900' height='650' fill='url(%23g)'/%3E%3Cpath d='M315 260h260v126c0 86-70 156-156 156s-156-70-156-156V312c0-29 23-52 52-52Z' fill='%23fff'/%3E%3Cpath d='M575 310h78c38 0 68 30 68 68s-30 68-68 68h-78v-48h72c12 0 22-10 22-22s-10-22-22-22h-72z' fill='%23fff'/%3E%3Cpath d='M300 292h290' stroke='%23176b47' stroke-width='18' stroke-linecap='round' opacity='.7'/%3E%3Cpath d='M398 214c-36-36-32-86 8-116 34 37 38 83-8 116Z' fill='%23176b47'/%3E%3Cpath d='M456 214c36-36 32-86-8-116-34 37-38 83 8 116Z' fill='%232f9c68'/%3E%3Cpath d='M428 226c0-62 0-92 0-128' stroke='%23176b47' stroke-width='10' stroke-linecap='round'/%3E%3Ctext x='450' y='594' text-anchor='middle' font-family='Inter,Arial' font-size='38' font-weight='800' fill='%23176b47'%3ETulsi infusion%3C/text%3E%3C/svg%3E",
  garden: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=900&q=80",
  aloeGel: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=80"
};

const slideImages = {
  aloeVera: "assets/plants/Aloe Vera/Green Minimalist Gardening and Planting Business Presentation conv 1.png?v=2",
  neem: "assets/plants/Neem/Green Playful Photosynthesis Group Project Presentation conv 1.png",
  tulsi: "assets/plants/Tulsi/Tulsi_or_Tulasi_Holy_basil.jpg"
};

const symptomGuides = {
  cough: {
      title: "Cough & respiratory plant deck",
      intro: "Educational plant references for respiratory wellness including Tulsi, Aloe Vera, and Neem.",
    hero: plants[0],
    slides: [
      {
        title: "Tulsi",
        label: "Primary match",
        image: slideImages.tulsi,
        subtitle: "Ocimum tenuiflorum • Lamiaceae",
        points: [
          "Sacred adaptogenic herb known across many local knowledge systems.",
          "Often categorized under respiratory wellness in traditional references.",
          "Suitable for kitchen garden and community education modules."
        ],
        features: ["Adaptogen", "Respiratory", "Sacred", "Immunity"]
      },
      {
        title: "Aloe Vera",
        label: "Plant profile",
        image: slideImages.aloeVera,
        subtitle: "Aloe barbadensis miller • Asphodelaceae",
        points: [
          "Succulent leaf gel widely documented in educational references.",
          "Useful for showing leaf morphology and external-use applications.",
          "Easy to grow in warm climates and home garden settings."
        ],
        features: ["Succulent", "External use", "Home garden", "Leaf gel"]
      },
      {
        title: "Neem",
        label: "Conservation profile",
        image: slideImages.neem,
        subtitle: "Azadirachta indica • Meliaceae",
        points: [
          "Recognized in conservation education for its broad canopy and traditional significance.",
          "Frequently used in school modules about plant protection and biodiversity.",
          "Supports outdoor garden planting in suitable tropical regions."
        ]
      }
    ]
  },
  cold: {
    title: "Cold educational guide",
    intro: "Explore plants traditionally discussed for seasonal wellness with a visual plant-learning flow.",
    hero: plants[0],
    slides: [
      { title: "Tulsi", label: "Primary match", image: slideImages.tulsi, subtitle: "Ocimum tenuiflorum • Lamiaceae", points: ["Sacred adaptogenic herb known across many local knowledge systems.", "Often categorized under respiratory wellness in traditional references.", "Suitable for kitchen garden and community education modules."], features: ["Adaptogen", "Respiratory", "Sacred", "Immunity"] },
      { title: "Ginger + honey example", label: "Visual pairing", image: sampleImages.ginger, points: ["Common kitchen medicinal plant example.", "Useful for preparation and parts-used lessons.", "Pairs well with warm drink visuals."], ingredients: [{ name: "Ginger", note: "Rhizome example", image: sampleImages.ginger }, { name: "Honey", note: "Common pairing visual", image: sampleImages.honey }, { name: "Warm drink", note: "Presentation sample", image: sampleImages.tulsiTea }] }
    ]
  },
  indigestion: {
    title: "Digestive wellness guide",
    intro: "Educational matches focus on plants commonly categorized under digestive learning.",
    hero: plants[4],
    slides: [
      { title: "Ginger", label: "Primary match", image: plants[4].image, points: ["Rhizome is the highlighted plant part.", "Useful for teaching preparation methods.", "Commonly searched for digestion topics."], features: ["Rhizome", "Kitchen garden", "Digestive category", "Preparation notes"] },
      { title: "Turmeric", label: "Related plant", image: plants[1].image, points: ["Another rhizome-based medicinal plant.", "Good comparison for plant families.", "Supports visual learning with preparation notes."] },
      { title: "Preparation board", label: "Visual guide", image: sampleImages.tulsiTea, points: ["Show the plant part clearly.", "Add local name and family.", "Keep preparation notes short and visual."], ingredients: [{ name: "Ginger", note: "Rhizome", image: sampleImages.ginger }, { name: "Turmeric", note: "Rhizome comparison", image: sampleImages.turmeric }, { name: "Warm infusion", note: "Sample visual", image: sampleImages.tulsiTea }] }
    ]
  },
  "skin irritation": {
    title: "Skin education guide",
    intro: "External-use plant slides focus on images, plant parts, preparation context, and verified references.",
    hero: plants[2],
    slides: [
      { title: "Aloe Vera", label: "Primary match", image: plants[2].image, points: ["Popular external-use teaching plant.", "Great for leaf gel and succulent morphology lessons.", "Useful for showing leaf gel, texture, and plant-part documentation."], ingredients: [{ name: "Aloe leaf", note: "Succulent leaf example", image: plants[2].image }, { name: "Aloe gel", note: "External-use visual sample", image: sampleImages.aloeGel }] },
      { title: "Turmeric", label: "Related plant", image: plants[1].image, points: ["Often discussed in traditional external applications.", "Useful for color, rhizome, and preparation examples.", "Can be shown with before/after documentation cards."] }
    ]
  },
  fatigue: {
    title: "General wellness guide",
    intro: "Wellness categories should stay educational and avoid treatment claims.",
    hero: plants[5],
    slides: [
      { title: "Ashwagandha", label: "Learning match", image: plants[5].image, points: ["Useful for studying roots and cultivation.", "Often appears in wellness modules.", "Works well for comparing root-based plant records."] },
      { title: "Tulsi", label: "Related plant", image: sampleImages.tulsiLeaf, points: ["Common household plant.", "Good for cultural knowledge documentation.", "Supports conservation awareness."] }
    ]
  }
};

function renderPlants(items = plants) {
  if (!plantGrid) return;
  plantGrid.innerHTML = items.length ? items.map((plant, index) => `
    <article class="plant-card" style="--card-index:${index}" data-plant-id="${plant.id}">
      <img loading="lazy" src="${plant.image || imageFallback}" alt="${plant.name} plant">
      <div class="plant-body">
        <span class="badge">${plant.family}</span>
        <h3>${plant.name}</h3>
        <p class="latin">${plant.scientific}</p>
        <p>${plant.uses}</p>
        <div class="tag-row">${plant.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
        <div class="card-actions">
          <button class="secondary-button quick-view" type="button" data-plant-id="${plant.id}">Quick view</button>
          <button class="primary-button favourite" type="button" data-plant-id="${plant.id}">${isPlantBookmarked(plant.id) ? "Saved" : "Bookmark"}</button>
        </div>
      </div>
    </article>
  `).join("") : `<div class="plant-empty">No plant records match these filters. Try a broader search.</div>`;
  attachImageFallbacks(plantGrid);
}

function isPlantBookmarked(plantId) {
  return JSON.parse(localStorage.getItem("epics-bookmarks") || "[]").includes(plantId);
}

function setDetailPlant(plant) {
  if (!plant) return;
  selectedExplorePlant = plant;
  detailMainImage.src = plant.image || imageFallback;
  detailMainImage.alt = `${plant.name} plant`;
  detailThumbOne.src = plant.image || imageFallback;
  detailThumbOne.alt = `${plant.name} plant detail`;
  detailPlantName.textContent = plant.name;
  detailPlantScientific.textContent = `${plant.scientific} • ${plant.family}`;
  detailPlantDescription.textContent = `${plant.name} is part of the EPICS community plant collection.`;
  detailPlantLocalName.textContent = plant.localName;
  detailPlantFamily.textContent = plant.family;
  detailPlantRegion.textContent = plant.region;
  detailPlantUses.textContent = plant.uses;
  qrPanel.hidden = true;
  plantQrImage.removeAttribute("src");
  document.querySelector("#bookmarkPlant").textContent = isPlantBookmarked(plant.id) ? "Bookmarked" : "Bookmark";
  attachImageFallbacks(document.querySelector("#plant-detail"));
}

function showPlantDetails(plant, openPdf = false) {
  if (!plant) return;
  setDetailPlant(plant);
  showPage("explore");
  setTimeout(() => document.querySelector("#plant-detail")?.scrollIntoView({ behavior: document.body.classList.contains("reduce-motion") ? "auto" : "smooth", block: "start" }), 120);
  if (openPdf) openPlantGuide(plant);
}

function getExploreMatches(term = "") {
  const normalizedTerm = term.toLowerCase().trim();
  const type = searchType?.value || "All fields";
  const family = familyFilter?.value || "Any family";
  const region = regionFilter?.value || "All regions";
  const fields = {
    "Plant name": (plant) => [plant.name],
    "Scientific name": (plant) => [plant.scientific],
    "Local name": (plant) => [plant.localName],
    Symptom: (plant) => [...plant.symptoms, ...plant.tags],
    "All fields": (plant) => [plant.name, plant.localName, plant.scientific, plant.family, plant.region, plant.uses, ...plant.symptoms, ...plant.tags]
  };
  return plants.filter((plant) => {
    const matchesTerm = !normalizedTerm || fields[type](plant).join(" ").toLowerCase().includes(normalizedTerm);
    return matchesTerm && (family === "Any family" || plant.family === family) && (region === "All regions" || plant.region === region);
  });
}

function applyExploreFilters() {
  const term = exploreSearch?.value || globalSearch?.value || "";
  const matches = getExploreMatches(term);
  const sort = sortSelect?.value || "Most viewed";
  if (sort === "A to Z") matches.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "Recently added") matches.reverse();
  if (sort === "Most saved") matches.sort((a, b) => Number(isPlantBookmarked(b.id)) - Number(isPlantBookmarked(a.id)));
  renderPlants(matches);
  if (smartAssist) smartAssist.textContent = term || familyFilter?.value !== "Any family" || regionFilter?.value !== "All regions"
    ? `${matches.length} plant record${matches.length === 1 ? "" : "s"} found in the EPICS collection.`
    : "Explore all plant records from the local EPICS collection.";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

function attachImageFallbacks(root = document) {
  root.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      image.src = imageFallback;
    }, { once: true });
  });
}

function showPage(pageName = "home") {
  const pageAliases = { learn: "community", categories: "explore", "plant-detail": "explore" };
  pageName = pageAliases[pageName] || pageName;
  const cleanPage = document.querySelector(`[data-page="${pageName}"]`) ? pageName : "home";
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.toggle("active", page.dataset.page === cleanPage);
  });
  document.querySelectorAll(".desktop-nav a, .mobile-menu a").forEach((link) => {
    link.classList.toggle("active-link", link.getAttribute("href") === `#${cleanPage}`);
  });
  window.scrollTo({ top: 0, behavior: document.body.classList.contains("reduce-motion") ? "auto" : "smooth" });
}

function renderSymptomDeck(symptom = "cough") {
  // Legacy deck support: the Symptoms page now uses the data-driven card viewer.
  if (!symptomDeck || !deckTitle || !slideCounter || !slideDots) return;
  const guide = symptomGuides[symptom] || symptomGuides.cough;
  if (!guide) return;
  deckTitle.textContent = guide.title;
  document.querySelector("#symptomResult").textContent = guide.intro;
  currentSlides = [...guide.slides];
  currentSlideIndex = 0;
  paintCurrentSlide();
}

function slideTemplate(slide, index) {
  if (slide.fullImage) {
    return `
      <article class="deck-slide current full-image-slide">
        <div class="deck-media">
          <img src="${slide.image || imageFallback}" alt="${slide.title} slide">
        </div>
      </article>
    `;
  }

  const ingredients = slide.ingredients ? `
    <div class="ingredient-board">
      ${slide.ingredients.map((item) => `
        <article class="ingredient-card">
          <img src="${item.image || imageFallback}" alt="${item.name}">
          <strong>${item.name}</strong>
          <small>${item.note}</small>
        </article>
      `).join("")}
    </div>
  ` : "";
  const features = slide.features ? `
    <div class="deck-feature-grid">
      ${slide.features.map((feature) => `<span>${feature}</span>`).join("")}
    </div>
  ` : "";
  return `
    <article class="deck-slide current">
      <div class="deck-media">
        <img src="${slide.image || imageFallback}" alt="${slide.title}">
      </div>
      <div class="deck-content">
        <span class="deck-number">${String(index + 1).padStart(2, "0")} • ${slide.label}</span>
        <h3>${slide.title}</h3>
        ${slide.subtitle ? `<p>${slide.subtitle}</p>` : ""}
        ${slide.points.length ? `<ul>${slide.points.map((point) => `<li>${point}</li>`).join("")}</ul>` : ""}
        ${features}
        ${ingredients}
      </div>
    </article>
  `;
}

function paintCurrentSlide() {
  const slide = currentSlides[currentSlideIndex];
  symptomDeck.innerHTML = slideTemplate(slide, currentSlideIndex);
  slideCounter.textContent = `${currentSlideIndex + 1} / ${currentSlides.length}`;
  slideDots.innerHTML = currentSlides.map((_, index) => `
    <button class="${index === currentSlideIndex ? "active" : ""}" data-slide="${index}" aria-label="Open slide ${index + 1}"></button>
  `).join("");
  attachImageFallbacks(symptomDeck);
  attachImageFallbacks(slideDots);
}

function initializePage() {
  applyBrandLogo();
  setTimeout(() => splash.classList.add("hidden"), 950);
  showPage(location.hash.replace("#", "") || "home");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePage, { once: true });
} else {
  initializePage();
}

if (familyFilter) {
  [...new Set(plants.map((plant) => plant.family).sort())].forEach((family) => familyFilter.insertAdjacentHTML("beforeend", `<option>${family}</option>`));
}
if (regionFilter) {
  [...new Set(plants.map((plant) => plant.region).sort())].forEach((region) => regionFilter.insertAdjacentHTML("beforeend", `<option>${region}</option>`));
}
renderPlants();
setDetailPlant(selectedExplorePlant);

const searchShell = document.querySelector(".search-shell");

searchInputs.forEach((searchInput) => searchInput.addEventListener("focus", () => {
  searchShell?.classList.add("focused");
}));

searchInputs.forEach((searchInput) => searchInput.addEventListener("blur", () => {
  searchShell?.classList.remove("focused");
}));

searchInputs.forEach((searchInput) => searchInput.addEventListener("input", (event) => {
  const term = event.target.value.toLowerCase().trim();
  if (exploreSearch && event.target === globalSearch) exploreSearch.value = event.target.value;
  if (globalSearch && event.target === exploreSearch) globalSearch.value = event.target.value;
  applyExploreFilters();
  const filtered = getExploreMatches(term);
  if (plantMappings?.some((plant) => plant.symptoms.includes(term))) {
    location.hash = "symptoms";
    symptomSearch.value = term;
    const checkbox = [...document.querySelectorAll("#symptoms input[data-symptom]")].find((input) => input.dataset.symptom === term);
    if (checkbox) checkbox.checked = true;
    updateSymptomResults();
  }
}));

[searchType, familyFilter, regionFilter, sortSelect].forEach((control) => control?.addEventListener("change", applyExploreFilters));

document.addEventListener("click", (event) => {
  const plantId = event.target.closest("[data-plant-id]")?.dataset.plantId;
  const clickedPlant = plants.find((plant) => plant.id === plantId);
  const modalId = event.target.closest("[data-open-modal]")?.dataset.openModal;
  if (modalId) {
    event.preventDefault();
    document.querySelectorAll("dialog[open]").forEach((dialog) => dialog.close());
    document.querySelector(`#${modalId}`).showModal();
  }

  if (event.target.matches(".favourite")) {
    if (clickedPlant) {
      const bookmarks = JSON.parse(localStorage.getItem("epics-bookmarks") || "[]");
      const nextBookmarks = bookmarks.includes(clickedPlant.id)
        ? bookmarks.filter((id) => id !== clickedPlant.id)
        : [...bookmarks, clickedPlant.id];
      localStorage.setItem("epics-bookmarks", JSON.stringify(nextBookmarks));
      event.target.textContent = nextBookmarks.includes(clickedPlant.id) ? "Saved" : "Bookmark";
      if (selectedExplorePlant.id === clickedPlant.id) document.querySelector("#bookmarkPlant").textContent = nextBookmarks.includes(clickedPlant.id) ? "Bookmarked" : "Bookmark";
      showToast(nextBookmarks.includes(clickedPlant.id) ? `${clickedPlant.name} bookmarked` : `${clickedPlant.name} removed from bookmarks`);
    }
  }

  if (event.target.id === "compareButton") {
    showToast("Compare mode is ready for saved plants");
  }

  if (event.target.id === "qrButton") {
    if (selectedExplorePlant) {
      const pdfUrl = new URL(selectedExplorePlant.pdf, window.location.href).href;
      plantQrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(pdfUrl)}`;
      qrPanel.hidden = false;
      showToast("QR share code ready");
    }
  }

  if (event.target.id === "removeQrButton") {
    qrPanel.hidden = true;
    plantQrImage.removeAttribute("src");
  }

  if (event.target.id === "downloadPlantPdf" && selectedExplorePlant) {
    const link = document.createElement("a");
    link.href = encodeURI(selectedExplorePlant.pdf);
    link.download = `${selectedExplorePlant.name} guide.pdf`;
    link.click();
    showToast(`${selectedExplorePlant.name} PDF download started`);
  }

  if (event.target.id === "bookmarkPlant" && selectedExplorePlant) {
    const cardButton = document.querySelector(`.favourite[data-plant-id="${selectedExplorePlant.id}"]`);
    cardButton?.click();
  }

  if (event.target.id === "sharePlant" && selectedExplorePlant) {
    const pdfUrl = new URL(selectedExplorePlant.pdf, window.location.href).href;
    if (navigator.share) {
      navigator.share({ title: `${selectedExplorePlant.name} plant guide`, text: "EPICS educational plant guide", url: pdfUrl }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(pdfUrl).then(() => showToast("Plant guide link copied"));
    } else {
      showToast("Plant guide link ready to copy from the address bar");
    }
  }

  if (event.target.id === "textSizeButton") {
    document.body.classList.toggle("large-text");
    showToast(document.body.classList.contains("large-text") ? "Larger text enabled" : "Default text size restored");
  }

  if (event.target.id === "motionButton") {
    document.body.classList.toggle("reduce-motion");
    animatedBackground?.refreshMotion();
    showToast(document.body.classList.contains("reduce-motion") ? "Motion reduced" : "Animations restored");
  }

  if (event.target.id === "scrollTopButton") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (event.target.id === "nextSlide") {
    currentSlideIndex = (currentSlideIndex + 1) % currentSlides.length;
    paintCurrentSlide();
  }

  if (event.target.id === "prevSlide") {
    currentSlideIndex = (currentSlideIndex - 1 + currentSlides.length) % currentSlides.length;
    paintCurrentSlide();
  }

  if (event.target.matches("[data-slide]")) {
    currentSlideIndex = Number(event.target.dataset.slide);
    paintCurrentSlide();
  }

  if (event.target.matches(".quick-view")) {
    showPlantDetails(clickedPlant, true);
  }

  if (event.target.id === "quickViewButton") {
    showPlantDetails(selectedExplorePlant, true);
  }

  if (event.target.matches("[data-view]")) {
    document.querySelectorAll("[data-view]").forEach((button) => button.classList.remove("active"));
    event.target.classList.add("active");
    plantGrid.classList.toggle("list", event.target.dataset.view === "list");
  }
});

window.addEventListener("hashchange", () => {
  showPage(location.hash.replace("#", "") || "home");
});

window.addEventListener("keydown", (event) => {
  if (!symptomDeck) return;
  if (location.hash.replace("#", "") !== "symptoms") return;
  if (event.key === "ArrowRight") {
    currentSlideIndex = (currentSlideIndex + 1) % currentSlides.length;
    paintCurrentSlide();
  }
  if (event.key === "ArrowLeft") {
    currentSlideIndex = (currentSlideIndex - 1 + currentSlides.length) % currentSlides.length;
    paintCurrentSlide();
  }
});

document.querySelector("#themeToggle").addEventListener("click", (event) => {
  document.body.classList.toggle("dark");
  event.currentTarget.textContent = document.body.classList.contains("dark") ? "☀" : "☾";
});

document.querySelector("#menuButton").addEventListener("click", () => {
  document.querySelector("#mobileMenu").classList.toggle("open");
});

const moreToggle = document.querySelector("#moreToggle");
const moreMenu = document.querySelector("#moreMenu");
if (moreToggle && moreMenu) {
  moreToggle.addEventListener("click", () => {
    const open = moreMenu.toggleAttribute("hidden") !== null ? false : true;
    moreMenu.hidden = !open;
    moreMenu.classList.toggle("open", open);
    moreToggle.setAttribute("aria-expanded", open);
  });
}

/* ── Auth dropdown ── */
const authToggle = document.querySelector("#authToggle");
const authMenu = document.querySelector("#authMenu");
const authDropdown = document.querySelector("#authDropdown");
if (authToggle && authDropdown) {
  authToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = authDropdown.hasAttribute("hidden");
    authDropdown.hidden = !open;
    authMenu.classList.toggle("open", open);
    authToggle.setAttribute("aria-expanded", open);
  });
}
document.addEventListener("click", (e) => {
  if (authMenu && !authMenu.contains(e.target) && !authToggle?.contains(e.target)) {
    authDropdown?.setAttribute("hidden", "");
    authMenu?.classList.remove("open");
    authToggle?.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("click", (e) => {
  if (moreMenu && !moreMenu.contains(e.target) && !moreToggle?.contains(e.target)) {
    moreMenu.hidden = true;
    moreMenu.classList.remove("open");
    moreToggle?.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll("#mobileMenu a").forEach((link) => {
  link.addEventListener("click", () => document.querySelector("#mobileMenu").classList.remove("open"));
});

// Data layer. This local array can later be replaced by a Supabase query without
// changing the matching, card, or viewer functions below.
const plantMappings = [
  {
    id: "tulsi", name: "Tulsi", scientificName: "Ocimum tenuiflorum",
    symptoms: ["cough", "cold", "sore throat"],
    traditionalUses: ["Traditionally referenced in South Asian respiratory-comfort preparations."],
    evidenceLevel: "Traditional knowledge", safetyInformation: ["Educational information only.", "Consult a qualified healthcare professional when appropriate."],
    ageGroups: ["child", "adult", "elderly"], genders: ["female", "male", "other"], preparationMethods: ["Tea", "Infusion"],
    description: "A widely documented medicinal plant with a long history in South Asian traditional knowledge.",
    image: "assets/plants/Tulsi/Tulsi_or_Tulasi_Holy_basil.jpg", pdf: "assets/plants/Tulsi/Tulsi.pdf", pageCount: 3
  },
  {
    id: "kalmegh", name: "Kalmegh", scientificName: "Andrographis paniculata",
    symptoms: ["fever", "flu"],
    traditionalUses: ["Traditionally included in regional herbal knowledge and plant-learning materials."],
    evidenceLevel: "Traditional knowledge", safetyInformation: ["Educational information only.", "Individual suitability can vary; seek professional advice when appropriate."],
    ageGroups: ["adult", "elderly"], genders: ["female", "male", "other"], preparationMethods: ["Infusion"],
    description: "A medicinal plant documented in traditional knowledge systems and community learning resources.",
    image: "assets/plants/Kalmegh/Andrographis_paniculata_(Kalpa)_in_Narshapur_forest,_AP_W2_IMG_0867.jpg", pdf: "assets/plants/Kalmegh/Kalmegh.pdf", pageCount: 3
  },
  {
    id: "punarnava", name: "Punarnava", scientificName: "Boerhavia diffusa",
    symptoms: ["fatigue", "body ache"],
    traditionalUses: ["Traditionally discussed in plant knowledge records for general wellness contexts."],
    evidenceLevel: "Traditional knowledge", safetyInformation: ["Educational information only.", "Consult a qualified healthcare professional when appropriate."],
    ageGroups: ["adult", "elderly"], genders: ["female", "male", "other"], preparationMethods: ["Decoction", "Infusion"],
    description: "A plant featured in traditional medicinal-plant documentation and educational reference material.",
    image: "assets/plants/Punarnava/पुनर्नवा_फुले.jpg", pdf: "assets/plants/Punarnava/Punarnava.pdf", pageCount: 3
  },
  {
    id: "bhringraj", name: "Bhringraj", scientificName: "Eclipta prostrata",
    symptoms: ["headache"],
    traditionalUses: ["Traditionally valued in regional medicinal-plant knowledge and preparation practices."],
    evidenceLevel: "Traditional knowledge", safetyInformation: ["Educational information only.", "Consult a qualified healthcare professional when appropriate."],
    ageGroups: ["adult", "elderly"], genders: ["female", "male", "other"], preparationMethods: ["Oil preparation", "Infusion"],
    description: "A medicinal plant represented in traditional knowledge and educational plant guides.",
    image: "assets/plants/Bhringraj/Eclipta_prostrata_in_AP_W2_IMG_9785.jpg", pdf: "assets/plants/Bhringraj/Bhringraj.pdf", pageCount: 3
  },
  {
    id: "apamarga", name: "Apamarga", scientificName: "Achyranthes aspera",
    symptoms: ["headache", "body ache"],
    traditionalUses: ["Traditionally documented in regional medicinal-plant knowledge and community learning resources."],
    evidenceLevel: "Traditional knowledge", safetyInformation: ["Educational information only.", "Consult a qualified healthcare professional when appropriate."],
    ageGroups: ["adult", "elderly"], genders: ["female", "male", "other"], preparationMethods: ["Infusion", "Decoction"],
    description: "A plant represented in traditional medicinal-plant knowledge and educational guide material.",
    image: "assets/plants/Apamarga/Achyranthes_aspera_at_Kadavoor.jpg", pdf: "assets/plants/Apamarga/Apamarga.pdf", pageCount: 3
  },
  {
    id: "chirata", name: "Chirata", scientificName: "Swertia perennis",
    symptoms: ["indigestion", "fever"],
    traditionalUses: ["Traditionally included in plant knowledge records and regional herbal-learning contexts."],
    evidenceLevel: "Traditional knowledge", safetyInformation: ["Educational information only.", "Consult a qualified healthcare professional when appropriate."],
    ageGroups: ["adult", "elderly"], genders: ["female", "male", "other"], preparationMethods: ["Infusion", "Decoction"],
    description: "A medicinal plant featured in traditional knowledge and educational plant guides.",
    image: "assets/plants/Chirata/Swertia_perennis_230705.jpg", pdf: "assets/plants/Chirata/Chirata.pdf", pageCount: 3
  },
  {
    id: "guduchi-giloy", name: "Guduchi (Giloy)", scientificName: "Tinospora cordifolia",
    symptoms: ["fatigue", "body ache"],
    traditionalUses: ["Traditionally referenced in South Asian medicinal-plant knowledge and wellness learning materials."],
    evidenceLevel: "Traditional knowledge", safetyInformation: ["Educational information only.", "Consult a qualified healthcare professional when appropriate."],
    ageGroups: ["adult", "elderly"], genders: ["female", "male", "other"], preparationMethods: ["Decoction", "Infusion"],
    description: "A climbing medicinal plant with a long history in traditional knowledge systems.",
    image: "assets/plants/Guduchi (or) Giloy/Tinospora_cordifolia.jpg", pdf: "assets/plants/Guduchi (or) Giloy/Guduchi (or) Giloy.pdf", pageCount: 3
  },
  {
    id: "vasaka", name: "Vasaka", scientificName: "Justicia adhatoda",
    symptoms: ["cough", "sore throat", "shortness of breath"],
    traditionalUses: ["Traditionally associated with respiratory-focused medicinal-plant knowledge."],
    evidenceLevel: "Traditional knowledge", safetyInformation: ["Educational information only.", "Consult a qualified healthcare professional when appropriate."],
    ageGroups: ["adult", "elderly"], genders: ["female", "male", "other"], preparationMethods: ["Infusion", "Decoction"],
    description: "A medicinal plant commonly documented in traditional South Asian plant knowledge.",
    image: "assets/plants/Vasaka/Justicia_adhatoda_1.jpg", pdf: "assets/plants/Vasaka/Vasaka.pdf", pageCount: 3
  }
];

const symptomResults = document.querySelector("#symptomResults");
const symptomResult = document.querySelector("#symptomResult");
const plantGuideModal = document.querySelector("#plantGuideModal");
const guideViewer = document.querySelector("#guideViewer");
const guideFrame = document.querySelector("#plantGuideFrame");
const guideLoading = document.querySelector("#guideLoading");
const guideError = document.querySelector("#guideError");
const guideTitle = document.querySelector("#guideTitle");
const pdfPageCounter = document.querySelector("#pdfPageCounter");
let activeGuidePlant = null;
let activePdfPage = 1;
let guideLastTrigger = null;
let guideTouchStartX = null;
let guideRequestId = 0;
let guideCloseTimer = null;

function getSelectedSymptoms() {
  return [...new Set([...document.querySelectorAll("#symptoms input[data-symptom]:checked")].map((input) => input.dataset.symptom))];
}

function calculateSymptomRelevance(plant, selected) {
  return selected.filter((symptom) => plant.symptoms.includes(symptom)).length;
}

function getPlantsForSymptoms(selected) {
  return plantMappings
    .map((plant) => ({ ...plant, relevance: calculateSymptomRelevance(plant, selected) }))
    .filter((plant) => plant.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance || a.name.localeCompare(b.name));
}

function renderPlantResults(plantsForSymptoms, selected) {
  if (!symptomResults || !symptomResult) return;
  if (!selected.length) {
    symptomResult.textContent = "Choose one or more symptoms to see educational plant references.";
    symptomResults.innerHTML = "";
    return;
  }
  symptomResult.textContent = `${plantsForSymptoms.length ? "Showing traditional plant references ranked by matching symptoms." : "No guide matches these symptoms yet. Try another selected symptom."} Profile details are not used for matching.`;
  symptomResults.innerHTML = plantsForSymptoms.length ? plantsForSymptoms.map((plant, index) => {
    const matches = selected.filter((symptom) => plant.symptoms.includes(symptom));
    return `<article class="symptom-result-card" style="--card-index:${index}">
      <img loading="lazy" src="${plant.image || imageFallback}" alt="${plant.image ? `${plant.name} plant` : "Plant image unavailable"}">
      <div class="symptom-result-card__body">
        <div><span class="badge">${plant.relevance} matching symptom${plant.relevance === 1 ? "" : "s"}</span><h3>${plant.name}</h3><p class="latin">${plant.scientificName}</p></div>
        <div><h4>Matching symptoms</h4><ul class="symptom-match-list">${matches.map((symptom) => `<li>${symptom}</li>`).join("")}</ul></div>
        <p>${plant.description}</p>
        <div><h4>${plant.evidenceLevel}</h4><p>${plant.traditionalUses[0]}</p></div>
        <ul class="safety-list">${plant.safetyInformation.map((item) => `<li>${item}</li>`).join("")}</ul>
        <button class="primary-button view-plant-guide" type="button" data-plant-id="${plant.id}" aria-label="View ${plant.name} guide">View Guide</button>
      </div>
    </article>`;
  }).join("") : `<div class="symptom-empty">No traditional plant guide is currently mapped to this selection.</div>`;
  attachImageFallbacks(symptomResults);
}

function updateSymptomResults() {
  const selected = getSelectedSymptoms();
  renderPlantResults(getPlantsForSymptoms(selected), selected);
}

function updatePdfControls() {
  const pageCount = activeGuidePlant?.pageCount || 1;
  pdfPageCounter.textContent = `${activePdfPage} / ${pageCount}`;
  document.querySelector("#previousPdfPage").disabled = activePdfPage <= 1;
  document.querySelector("#nextPdfPage").disabled = activePdfPage >= pageCount;
}

async function loadPdfPage(direction = "next") {
  if (!activeGuidePlant) return;
  const requestId = ++guideRequestId;
  guideViewer.classList.remove("is-ready");
  guideViewer.classList.add("is-loading", "guide-page-transition");
  guideViewer.classList.toggle("page-previous", direction === "previous");
  guideLoading.hidden = false;
  guideError.hidden = true;
  try {
    const guideUrl = encodeURI(activeGuidePlant.pdf);
    // Verify the local static asset first. The iframe itself has unreliable PDF
    // load/error events, so it never controls the application's error state.
    if (location.protocol !== "file:") {
      const response = await fetch(guideUrl, { method: "HEAD", cache: "no-store" });
      if (!response.ok) throw new Error(`Guide request returned ${response.status}`);
    }
    if (requestId !== guideRequestId) return;
    updatePdfControls();
    guideFrame.src = `${guideUrl}#page=${activePdfPage}&view=FitH`;
    // Give the browser viewer a short, non-blocking transition; native PDF
    // rendering continues independently and does not emit dependable events.
    setTimeout(() => {
      if (requestId !== guideRequestId) return;
      guideLoading.hidden = true;
      guideViewer.classList.remove("is-loading");
      guideViewer.classList.add("is-ready");
      setTimeout(() => guideViewer.classList.remove("guide-page-transition", "page-previous"), 300);
    }, 240);
  } catch (error) {
    if (requestId !== guideRequestId) return;
    console.error("Vital Flora: plant guide asset check failed", activeGuidePlant?.pdf, error);
    guideLoading.hidden = true;
    guideViewer.classList.remove("is-loading", "is-ready");
    guideError.hidden = false;
  }
}

function openPlantGuide(plant) {
  if (!plant?.pdf || !plantGuideModal) return;
  activeGuidePlant = plant;
  activePdfPage = 1;
  guideTitle.textContent = `${plant.name} guide`;
  clearTimeout(guideCloseTimer);
  plantGuideModal.classList.remove("is-closing");
  if (!plantGuideModal.open) plantGuideModal.showModal();
  loadPdfPage("next");
  document.querySelector("#closePlantGuide").focus();
}

function closePlantGuide() {
  if (!plantGuideModal?.open) return;
  ++guideRequestId;
  if (plantGuideModal.classList.contains("is-closing")) return;
  plantGuideModal.classList.add("is-closing");
  guideCloseTimer = setTimeout(() => {
    plantGuideModal.close();
    plantGuideModal.classList.remove("is-closing");
    activeGuidePlant = null;
    guideFrame.removeAttribute("src");
    guideLastTrigger?.focus();
  }, 240);
}

function changePdfPage(direction) {
  if (!activeGuidePlant) return;
  const nextPage = activePdfPage + direction;
  if (nextPage < 1 || nextPage > activeGuidePlant.pageCount) return;
  activePdfPage = nextPage;
  loadPdfPage(direction < 0 ? "previous" : "next");
}

document.querySelectorAll("#symptoms input[data-symptom]").forEach((input) => input.addEventListener("change", updateSymptomResults));
document.querySelector("#symptomSearchButton").addEventListener("click", () => {
  const term = symptomSearch.value.trim().toLowerCase();
  const checkbox = [...document.querySelectorAll("#symptoms input[data-symptom]")].find((input) => input.dataset.symptom === term);
  if (checkbox) checkbox.checked = true;
  updateSymptomResults();
});
symptomSearch.addEventListener("keydown", (event) => {
  if (event.key === "Enter") { event.preventDefault(); document.querySelector("#symptomSearchButton").click(); }
});
symptomResults?.addEventListener("click", (event) => {
  const button = event.target.closest(".view-plant-guide");
  if (!button) return;
  guideLastTrigger = button;
  openPlantGuide(plantMappings.find((plant) => plant.id === button.dataset.plantId));
});
document.querySelector("#closePlantGuide").addEventListener("click", closePlantGuide);
document.querySelector("#previousPdfPage").addEventListener("click", () => changePdfPage(-1));
document.querySelector("#nextPdfPage").addEventListener("click", () => changePdfPage(1));
guideViewer.addEventListener("touchstart", (event) => { guideTouchStartX = event.changedTouches[0]?.clientX ?? null; }, { passive: true });
guideViewer.addEventListener("touchend", (event) => {
  const endX = event.changedTouches[0]?.clientX;
  if (guideTouchStartX === null || endX === undefined) return;
  const distance = endX - guideTouchStartX;
  guideTouchStartX = null;
  if (Math.abs(distance) > 48) changePdfPage(distance < 0 ? 1 : -1);
}, { passive: true });
plantGuideModal.addEventListener("cancel", (event) => { event.preventDefault(); closePlantGuide(); });
plantGuideModal.addEventListener("click", (event) => { if (event.target === plantGuideModal) closePlantGuide(); });
window.addEventListener("keydown", (event) => {
  if (!plantGuideModal?.open) return;
  if (event.key === "Escape") { event.preventDefault(); closePlantGuide(); }
  if (event.key === "ArrowLeft") { event.preventDefault(); changePdfPage(-1); }
  if (event.key === "ArrowRight") { event.preventDefault(); changePdfPage(1); }
});
updateSymptomResults();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
