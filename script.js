// Temporary frontend seed data. Replace these records with API/database results later;
// the image fields currently use remote placeholder URLs so no backend is required yet.
const imageFallback = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23dfeadd'/%3E%3Cstop offset='1' stop-color='%23176b47'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='600' fill='url(%23g)'/%3E%3Cpath d='M394 434c-68-68-70-164-3-231 71 63 81 158 3 231Z' fill='%23fff' fill-opacity='.72'/%3E%3Cpath d='M402 430c66-31 108-87 120-165 53 52 53 132 5 179-34 33-80 36-125-14Z' fill='%23fff' fill-opacity='.45'/%3E%3Ctext x='400' y='514' text-anchor='middle' font-family='Inter,Arial' font-size='34' font-weight='700' fill='%23fff'%3EPlant image pending%3C/text%3E%3C/svg%3E";

const plants = [
  {
    name: "Tulsi",
    scientific: "Ocimum tenuiflorum",
    family: "Lamiaceae",
    uses: "Traditionally referenced for cough, cold, and general wellness.",
    tags: ["Respiratory", "Immunity", "Sacred"],
    image: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Turmeric",
    scientific: "Curcuma longa",
    family: "Zingiberaceae",
    uses: "Commonly documented in educational references for skin and wellness preparations.",
    tags: ["Skin", "Digestive", "Rhizome"],
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Aloe Vera",
    scientific: "Aloe barbadensis miller",
    family: "Asphodelaceae",
    uses: "Popular traditional external-use plant with clear care notes.",
    tags: ["Skin", "Succulent", "Home garden"],
    image: "assets/plants/Aloe Vera/Green Minimalist Gardening and Planting Business Presentation conv 1.png"
  },
  {
    name: "Neem",
    scientific: "Azadirachta indica",
    family: "Meliaceae",
    uses: "Widely recognized in conservation and traditional plant knowledge.",
    tags: ["Skin", "Tree", "Conservation"],
    image: "assets/plants/Neem/Green Playful Photosynthesis Group Project Presentation conv 1.png"
  },
  {
    name: "Ginger",
    scientific: "Zingiber officinale",
    family: "Zingiberaceae",
    uses: "Educationally associated with digestion and seasonal comfort.",
    tags: ["Digestive", "Respiratory", "Rhizome"],
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900e1?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Ashwagandha",
    scientific: "Withania somnifera",
    family: "Solanaceae",
    uses: "Referenced in learning modules for wellness and cultivation.",
    tags: ["Wellness", "Root", "Course"],
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=700&q=80"
  }
];

const plantGrid = document.querySelector("#plantGrid");
const toast = document.querySelector("#toast");
const search = document.querySelector("#globalSearch");
const splash = document.querySelector("#splash");
const smartAssist = document.querySelector("#smartAssist");
const symptomSearch = document.querySelector("#symptomSearch");
const symptomDeck = document.querySelector("#symptomDeck");
const deckTitle = document.querySelector("#deckTitle");
const slideCounter = document.querySelector("#slideCounter");
const slideDots = document.querySelector("#slideDots");
let currentSlides = [];
let currentSlideIndex = 0;

function initAnimatedBackground() {
  const canvas = document.querySelector("#livingForestCanvas");
  const shell = document.querySelector("#animatedBackground");
  if (!canvas || !shell) return;

  const context = canvas.getContext("2d", { alpha: true });
  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
  const navigatorMemory = navigator.deviceMemory || 4;
  const lowPower = navigatorMemory <= 4 || navigator.hardwareConcurrency <= 4 || coarsePointerQuery.matches;
  const state = {
    width: 0,
    height: 0,
    dpr: 1,
    points: [],
    pollen: [],
    glows: [],
    leaves: [],
    floatingLeaves: [],
    raf: 0,
    running: false,
    reduced: reduceMotionQuery.matches,
    start: performance.now(),
    lastLeaf: 0,
    mouse: { x: -9999, y: -9999, active: false }
  };

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function resize() {
    state.width = window.innerWidth;
    state.height = window.innerHeight;
    state.dpr = Math.min(window.devicePixelRatio || 1, lowPower ? 1.35 : 1.75);
    canvas.width = Math.floor(state.width * state.dpr);
    canvas.height = Math.floor(state.height * state.dpr);
    canvas.style.width = `${state.width}px`;
    canvas.style.height = `${state.height}px`;
    context.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    seed();
    draw(performance.now());
  }

  function seed() {
    const area = state.width * state.height;
    const networkCount = state.reduced ? 62 : Math.min(lowPower ? 135 : 220, Math.max(86, Math.floor(area / (lowPower ? 7800 : 5400))));
    const pollenCount = state.reduced ? 150 : Math.min(lowPower ? 720 : 1450, Math.max(320, Math.floor(area / (lowPower ? 1650 : 850))));
    const glowCount = state.reduced ? 5 : lowPower ? 8 : 13;

    const columns = Math.ceil(Math.sqrt(networkCount * state.width / state.height));
    const rows = Math.ceil(networkCount / columns);
    const cellW = state.width / columns;
    const cellH = state.height / rows;
    state.points = Array.from({ length: networkCount }, (_, index) => {
      const column = index % columns;
      const row = Math.floor(index / columns);
      const root = index / networkCount;
      return {
        x: column * cellW + rand(cellW * 0.16, cellW * 0.84),
        y: row * cellH + rand(cellH * 0.16, cellH * 0.84),
        baseX: 0,
        baseY: 0,
        vx: rand(-0.026, 0.026),
        vy: rand(-0.02, 0.02),
        phase: rand(0, Math.PI * 2),
        pulse: rand(0, Math.PI * 2),
        size: rand(0.95, 2.2),
        drift: rand(0.18, 0.72),
        family: root
      };
    });
    state.points.forEach((point) => {
      point.baseX = point.x;
      point.baseY = point.y;
    });

    state.pollen = Array.from({ length: pollenCount }, () => ({
      x: rand(0, state.width),
      y: rand(0, state.height),
      z: rand(0.35, 1),
      size: rand(0.42, lowPower ? 1.22 : 1.48),
      phase: rand(0, Math.PI * 2),
      speed: rand(0.01, 0.038),
      alpha: rand(0.22, 0.68)
    }));

    const floatingLeafCount = state.reduced ? 8 : lowPower ? 18 : 34;
    state.floatingLeaves = Array.from({ length: floatingLeafCount }, () => ({
      x: rand(0, state.width),
      y: rand(0, state.height),
      size: rand(5, lowPower ? 11 : 15),
      angle: rand(0, Math.PI * 2),
      phase: rand(0, Math.PI * 2),
      drift: rand(0.08, 0.22),
      alpha: rand(0.18, 0.36)
    }));

    state.glows = Array.from({ length: glowCount }, () => ({
      x: rand(0, state.width),
      y: rand(0, state.height),
      radius: rand(70, 210),
      phase: rand(0, Math.PI * 2),
      hue: Math.random() > 0.45 ? "47, 196, 148" : "46, 176, 178"
    }));
  }

  function drawLeaf(x, y, angle, age, scale = 1, alphaBoost = 1) {
    const life = Math.max(0, 1 - age / 6200);
    if (life <= 0) return;
    const sway = Math.sin(performance.now() * 0.0014 + x * 0.02) * 0.18;
    const size = (6 + 11 * Math.sin(Math.min(1, age / 1500) * Math.PI)) * scale;
    context.save();
    context.translate(x, y);
    context.rotate(angle + sway);
    context.globalAlpha = life * 0.68 * alphaBoost;
    context.fillStyle = "rgba(96, 236, 174, 0.82)";
    context.shadowColor = "rgba(57, 224, 169, 0.62)";
    context.shadowBlur = 15;
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
    context.restore();
  }

  function drawFloatingLeaves(elapsed) {
    state.floatingLeaves.forEach((leaf) => {
      if (!state.reduced) {
        leaf.x += Math.sin(elapsed * 0.16 + leaf.phase) * leaf.drift;
        leaf.y += Math.cos(elapsed * 0.11 + leaf.phase) * leaf.drift - leaf.drift * 0.18;
        leaf.angle += Math.sin(elapsed * 0.08 + leaf.phase) * 0.0018;
      }
      if (leaf.x < -30) leaf.x = state.width + 30;
      if (leaf.x > state.width + 30) leaf.x = -30;
      if (leaf.y < -30) leaf.y = state.height + 30;
      if (leaf.y > state.height + 30) leaf.y = -30;
      drawLeaf(leaf.x, leaf.y, leaf.angle + Math.sin(elapsed * 0.5 + leaf.phase) * 0.22, 1700, leaf.size / 14, leaf.alpha);
    });
  }

  function draw(time) {
    context.clearRect(0, 0, state.width, state.height);
    const elapsed = (time - state.start) * 0.001;
    const zoom = state.reduced ? 1 : 1.018 + Math.sin(elapsed * Math.PI / 20) * 0.018;
    const cx = state.width / 2;
    const cy = state.height / 2;

    context.save();
    context.translate(cx, cy);
    context.scale(zoom, zoom);
    context.translate(-cx, -cy);

    drawLargeGlows(elapsed);
    if (!state.reduced) updatePoints(elapsed);
    drawNetwork(elapsed, time);
    drawPollen(elapsed);
    drawFloatingLeaves(elapsed);
    context.restore();

    state.leaves = state.leaves.filter((leaf) => time - leaf.created < 6200);
    state.leaves.forEach((leaf) => drawLeaf(leaf.x, leaf.y, leaf.angle, time - leaf.created, leaf.scale || 1, 1));

    if (state.running) state.raf = requestAnimationFrame(draw);
  }

  function updatePoints(elapsed) {
    const radius = lowPower ? 100 : 128;
    state.points.forEach((point) => {
      point.baseX += point.vx + Math.sin(elapsed * 0.1 + point.phase) * 0.012 * point.drift;
      point.baseY += point.vy + Math.cos(elapsed * 0.085 + point.phase) * 0.01 * point.drift;
      if (point.baseX < -120) point.baseX = state.width + 120;
      if (point.baseX > state.width + 120) point.baseX = -120;
      if (point.baseY < -120) point.baseY = state.height + 120;
      if (point.baseY > state.height + 120) point.baseY = -120;

      let repelX = 0;
      let repelY = 0;
      if (state.mouse.active) {
        const dx = point.baseX - state.mouse.x;
        const dy = point.baseY - state.mouse.y;
        const distance = Math.hypot(dx, dy);
        if (distance < radius && distance > 0.01) {
          const force = (1 - distance / radius) * (lowPower ? 18 : 30);
          repelX = (dx / distance) * force;
          repelY = (dy / distance) * force;
        }
      }
      point.x += (point.baseX + repelX - point.x) * 0.032;
      point.y += (point.baseY + repelY - point.y) * 0.032;
    });
  }

  function drawLargeGlows(elapsed) {
    state.glows.forEach((glow) => {
      const x = glow.x + Math.sin(elapsed * 0.055 + glow.phase) * 22;
      const y = glow.y + Math.cos(elapsed * 0.047 + glow.phase) * 18;
      const gradient = context.createRadialGradient(x, y, 0, x, y, glow.radius);
      gradient.addColorStop(0, `rgba(${glow.hue}, ${state.reduced ? 0.1 : 0.16})`);
      gradient.addColorStop(0.45, `rgba(${glow.hue}, 0.055)`);
      gradient.addColorStop(1, `rgba(${glow.hue}, 0)`);
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(x, y, glow.radius, 0, Math.PI * 2);
      context.fill();
    });
  }

  function drawNetwork(elapsed, time) {
    const maxDistance = lowPower ? 118 : 148;
    const mouseGlowRadius = lowPower ? 120 : 150;
    context.lineCap = "round";

    for (let i = 0; i < state.points.length; i += 1) {
      const a = state.points[i];
      for (let j = i + 1; j < state.points.length; j += 1) {
        const b = state.points[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.hypot(dx, dy);
        if (distance > maxDistance) continue;

        const growth = (Math.sin(elapsed * 0.18 + a.phase + b.phase) + 1) * 0.5;
        const alpha = Math.pow(1 - distance / maxDistance, 1.55) * (0.18 + growth * 0.4);
        const midX = (a.x + b.x) * 0.5;
        const midY = (a.y + b.y) * 0.5;
        const mouseDistance = state.mouse.active ? Math.hypot(midX - state.mouse.x, midY - state.mouse.y) : 9999;
        const interaction = mouseDistance < mouseGlowRadius ? (1 - mouseDistance / mouseGlowRadius) : 0;

        context.strokeStyle = `rgba(31, 188, 138, ${Math.min(0.82, alpha + interaction * 0.28)})`;
        context.lineWidth = 0.42 + growth * 0.28 + interaction * 0.5;
        context.shadowColor = `rgba(70, 239, 183, ${0.24 + interaction * 0.34})`;
        context.shadowBlur = 5 + interaction * 10;
        context.beginPath();
        context.moveTo(a.x, a.y);
        const curve = Math.sin(elapsed * 0.12 + a.phase) * 8;
        context.quadraticCurveTo(midX + curve, midY - curve, b.x, b.y);
        context.stroke();

        if (growth > 0.88 && !state.reduced) {
          const highlight = (growth - 0.88) / 0.12;
          context.strokeStyle = `rgba(116, 255, 199, ${0.16 * highlight + interaction * 0.12})`;
          context.lineWidth = 1.1 + interaction * 0.45;
          context.shadowColor = "rgba(74, 241, 187, 0.48)";
          context.shadowBlur = 12;
          context.beginPath();
          context.moveTo(a.x, a.y);
          context.quadraticCurveTo(midX + curve, midY - curve, b.x, b.y);
          context.stroke();
        }

        if (!state.reduced && time - state.lastLeaf > (lowPower ? 1500 : 900) && growth > 0.94 && Math.random() > 0.965) {
          const sprouts = lowPower ? 1 : 1 + Math.floor(Math.random() * 3);
          for (let sprout = 0; sprout < sprouts; sprout += 1) {
            const t = rand(0.28, 0.72);
            const leafX = a.x + (b.x - a.x) * t + rand(-5, 5);
            const leafY = a.y + (b.y - a.y) * t + rand(-5, 5);
            state.leaves.push({
              x: leafX,
              y: leafY,
              angle: Math.atan2(dy, dx) + Math.PI / 2 + rand(-0.55, 0.55),
              scale: rand(0.72, 1.18),
              created: time - sprout * 260
            });
          }
          state.lastLeaf = time;
        }
      }

      const pulse = (Math.sin(elapsed * 0.55 + a.pulse) + 1) * 0.5;
      context.shadowColor = "rgba(62, 236, 181, 0.58)";
      context.shadowBlur = 10;
      context.fillStyle = `rgba(116, 249, 202, ${0.46 + pulse * 0.34})`;
      context.beginPath();
      context.arc(a.x, a.y, a.size, 0, Math.PI * 2);
      context.fill();
    }
    context.shadowBlur = 0;
  }

  function drawPollen(elapsed) {
    state.pollen.forEach((speck) => {
      if (!state.reduced) {
        speck.x += Math.sin(elapsed * speck.speed + speck.phase) * 0.06 * speck.z;
        speck.y -= speck.speed * speck.z;
      }
      if (speck.y < -8) {
        speck.y = state.height + 8;
        speck.x = rand(0, state.width);
      }
      const shimmer = (Math.sin(elapsed * 0.9 + speck.phase) + 1) * 0.5;
      context.fillStyle = `rgba(125, 239, 197, ${speck.alpha * (0.55 + shimmer * 0.45)})`;
      context.beginPath();
      context.arc(speck.x, speck.y, speck.size * speck.z, 0, Math.PI * 2);
      context.fill();
    });
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
    seed();
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

function applyBrandLogo() {
  document.title = "Vital Flora | Medicinal Plant Knowledge Platform";
  const brand = document.querySelector(".brand");
  if (!brand) return;
  brand.setAttribute("aria-label", "Vital Flora home");
  brand.classList.add("logo-only");
  const existingMark = brand.querySelector(".brand-mark, .brand-logo");
  const logo = document.createElement("img");
  logo.className = "brand-logo";
  logo.src = "assets/logo/Vital Flora.jpeg";
  logo.alt = "Vital Flora logo";
  if (existingMark) {
    existingMark.replaceWith(logo);
  } else {
    brand.prepend(logo);
  }
  const brandName = brand.querySelector("strong");
  if (brandName) brandName.textContent = "Vital Flora";
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
  aloeVera: "assets/plants/Aloe Vera/Green Minimalist Gardening and Planting Business Presentation conv 1.png",
  neem: "assets/plants/Neem/Green Playful Photosynthesis Group Project Presentation conv 1.png"
};

const symptomGuides = {
  cough: {
      title: "Plant presentation deck",
      intro: "Current sample slides include Aloe Vera and Neem. More plant slides can be added later from the database.",
    hero: plants[2],
    slides: [
      {
        title: "Aloe Vera",
        label: "Plant profile",
        image: slideImages.aloeVera,
        fullImage: true,
        subtitle: "Exact uploaded Aloe Vera slide.",
        points: []
      },
      {
        title: "Neem",
        label: "Plant profile",
        image: slideImages.neem,
        fullImage: true,
        subtitle: "Exact uploaded Neem slide.",
        points: []
      }
    ]
  },
  cold: {
    title: "Cold educational guide",
    intro: "Explore plants traditionally discussed for seasonal wellness with a visual plant-learning flow.",
    hero: plants[0],
    slides: [
      { title: "Tulsi", label: "Primary match", image: sampleImages.tulsiLeaf, points: ["Known in many local knowledge systems.", "Often categorized under respiratory wellness.", "Suitable for garden education modules."] },
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
  plantGrid.innerHTML = items.map((plant) => `
    <article class="plant-card">
      <img loading="lazy" src="${plant.image || imageFallback}" alt="${plant.name} plant">
      <div class="plant-body">
        <span class="badge">${plant.family}</span>
        <h3>${plant.name}</h3>
        <p class="latin">${plant.scientific}</p>
        <p>${plant.uses}</p>
        <div class="tag-row">${plant.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
        <div class="card-actions">
          <button class="secondary-button quick-view">Quick view</button>
          <button class="primary-button favourite">Save</button>
        </div>
      </div>
    </article>
  `).join("");
  attachImageFallbacks(plantGrid);
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

renderPlants();

const searchShell = document.querySelector(".search-shell");

search.addEventListener("focus", () => {
  searchShell?.classList.add("focused");
});

search.addEventListener("blur", () => {
  searchShell?.classList.remove("focused");
});

search.addEventListener("input", (event) => {
  const term = event.target.value.toLowerCase().trim();
  const filtered = plants.filter((plant) =>
    [plant.name, plant.scientific, plant.family, plant.uses, ...plant.tags].join(" ").toLowerCase().includes(term)
  );
  renderPlants(filtered.length || term ? filtered : plants);
  smartAssist.textContent = term
    ? filtered.length
      ? `Found ${filtered.length} educational match${filtered.length === 1 ? "" : "es"}. Try filtering by region, family, or category next.`
      : "No exact match yet. Try a local name, plant family, or broader symptom like cough or digestion."
    : "Smart suggestions will appear as you search.";
  if (symptomGuides[term]) {
    location.hash = "symptoms";
    symptomSearch.value = term;
    renderSymptomDeck(term);
  }
});

document.addEventListener("click", (event) => {
  const modalId = event.target.closest("[data-open-modal]")?.dataset.openModal;
  if (modalId) {
    event.preventDefault();
    document.querySelectorAll("dialog[open]").forEach((dialog) => dialog.close());
    document.querySelector(`#${modalId}`).showModal();
  }

  if (event.target.matches(".favourite")) {
    showToast("Saved to favourites");
  }

  if (event.target.id === "compareButton") {
    showToast("Compare mode is ready for saved plants");
  }

  if (event.target.id === "qrButton") {
    showToast("QR profile preview will connect to backend records later");
  }

  if (event.target.id === "notifyButton") {
    showToast("3 updates: garden event, new course, pending review");
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

  if (event.target.matches(".quick-view") || event.target.id === "quickViewButton") {
    showPage("explore");
    setTimeout(() => document.querySelector("#plant-detail").scrollIntoView({ behavior: "smooth", block: "start" }), 120);
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

document.querySelectorAll("#mobileMenu a").forEach((link) => {
  link.addEventListener("click", () => document.querySelector("#mobileMenu").classList.remove("open"));
});

const selectedSymptoms = new Set();
const symptomChips = document.querySelector("#symptomChips");
if (symptomChips) {
  symptomChips.addEventListener("click", (event) => {
    if (!event.target.matches("button")) return;
    const symptom = event.target.dataset.symptom;
    event.target.classList.toggle("active");
    selectedSymptoms.has(symptom) ? selectedSymptoms.delete(symptom) : selectedSymptoms.add(symptom);
    const list = [...selectedSymptoms];
    document.querySelector("#symptomResult").textContent = list.length
      ? `Current sample matches: Aloe Vera and Neem. Open the slide deck for plant photos, profile details, visual cards, and references.`
      : "Choose one or more symptoms to see educational plant matches.";
    if (list.length) renderSymptomDeck(list[0]);
  });
}

document.querySelector("#symptomSearchButton").addEventListener("click", () => {
  const term = symptomSearch.value.toLowerCase().trim();
  renderSymptomDeck(term);
});

symptomSearch.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    renderSymptomDeck(symptomSearch.value.toLowerCase().trim());
  }
});

renderSymptomDeck("cough");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
