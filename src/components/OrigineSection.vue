<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const imageDebut = '/images/imgProcess/aout2025.PNG'
const imageFin   = '/images/imgProcess/avril2026.JPG'

const mobileLines = [
  'La sérigraphie',
  '—',
  'De la hargne',
  'et du temps.',
  'Des tests,',
  'des échecs,',
  'trop de doutes,',
  'du temps perdu,',
  'de la fatigue,',
  'des progrès.',
  "C'est de la hargne",
  'derrière chaque',
  'produit.',
]

const linesVisible = reactive(Array(mobileLines.length).fill(false))
const mobileTextRef = ref(null)
const lineRefs = []
let timeouts = []
let containerObserver = null

onMounted(() => {
  if (!mobileTextRef.value) return

  containerObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        containerObserver.disconnect()
        mobileLines.forEach((_, i) => {
          const t = setTimeout(() => {
            linesVisible[i] = true
          }, 400 + i * 550)
          timeouts.push(t)
        })
      }
    },
    { threshold: 0.15 }
  )
  containerObserver.observe(mobileTextRef.value)
})

onUnmounted(() => {
  timeouts.forEach(t => clearTimeout(t))
  if (containerObserver) containerObserver.disconnect()
})

const photosA = [
  '/images/imgProcess/1.1.PNG',
  '/images/imgProcess/1.2.JPG',
  '/images/imgProcess/1.3.png',
  '/images/imgProcess/1.4.jpg',
  '/images/imgProcess/1.5.PNG',
]

const photosB = [
  '/images/imgProcess/2.1.JPG',
  '/images/imgProcess/2.2.PNG',
  '/images/imgProcess/2.3.PNG',
  '/images/imgProcess/2.4.PNG',
  '/images/imgProcess/2.5.jpg',
]
</script>

<template>
  <section class="origine" id="origine">

    <!-- Strip A — rangée haut (desktop) / colonne gauche (mobile) -->
    <div class="strip strip-a">
      <div v-for="(p, i) in photosA" :key="i" class="strip-item">
        <img :src="p" alt="" aria-hidden="true" />
      </div>
    </div>

    <!-- Grande image gauche — Août 2025 -->
    <div class="col-left">
      <div class="date-top">
        <span class="date-tag">Août 2025</span>
      </div>
      <div class="image-wrap">
        <img :src="imageDebut" alt="Les débuts — Août 2025" class="main-img" />
        <div class="image-overlay"></div>
      </div>
      <div class="date-bottom">
        <p class="date-desc">Le début.. Tout à construire.</p>
      </div>
    </div>

    <!-- Texte central desktop -->
    <div class="process-text">
      <p class="process-tag">La sérigraphie</p>
      <h2 class="process-quote">
        De la hargne<br>et du temps.
      </h2>
      <p class="process-body">
        Des tests, des échecs, trop de doutes, du temps perdu,
        de la fatigue, des progrès.<br>
        C'est de la hargne derrière chaque produit.
      </p>
    </div>

    <!-- Texte central mobile — lignes animées au scroll -->
    <div class="mobile-text" ref="mobileTextRef">
      <span
        v-for="(line, i) in mobileLines"
        :key="i"
        :ref="el => { if (el) lineRefs[i] = el }"
        class="mobile-line"
        :class="{ 'line-in': linesVisible[i] }"
      >{{ line }}</span>
    </div>

    <!-- Grande image droite — Avril 2026 -->
    <div class="col-right">
      <div class="date-top">
        <span class="date-tag">Avril 2026</span>
      </div>
      <div class="image-wrap">
        <img :src="imageFin" alt="Aujourd'hui — Avril 2026" class="main-img" />
        <div class="image-overlay"></div>
      </div>
      <div class="date-bottom">
        <p class="date-desc">Le produit. Prêt .</p>
      </div>
    </div>

    <!-- Strip B — rangée bas (desktop) / colonne droite (mobile) -->
    <div class="strip strip-b">
      <div v-for="(p, i) in photosB" :key="i" class="strip-item">
        <img :src="p" alt="" aria-hidden="true" />
      </div>
    </div>

  </section>
</template>

<style scoped>
/* ════════════════════════════════
   DESKTOP — 3 colonnes
   [col-left] [strip-a / text / strip-b] [col-right]
════════════════════════════════ */
.origine {
  display: grid;
  grid-template-columns: 0.7fr 1.1fr 0.7fr;
  grid-template-rows: 200px 0fr 200px;
  grid-template-areas:
    "col-left  strip-a  col-right"
    "col-left  text     col-right"
    "col-left  strip-b  col-right";
  min-height: 100vh;
  background: var(--color-bg);
  overflow: hidden;
}

.strip-a      { grid-area: strip-a; }
.col-left     { grid-area: col-left; }
.process-text { grid-area: text; }
.mobile-text  { grid-area: text; display: none; }
.col-right    { grid-area: col-right; }
.strip-b      { grid-area: strip-b; }

/* ── Grandes images ── */
.col-left,
.col-right {
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--color-border);
}
.col-right {
  border-right: none;
  border-left: 1px solid var(--color-border);
}

.image-wrap {
  position: relative;
  flex: 1;
  overflow: hidden;
}

.main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 50%, rgba(5,5,5,0.85) 100%);
}

.date-top {
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border);
}

.date-tag {
  display: block;
  font-family: var(--font-title);
  font-size: clamp(2.6rem, 2.5vw, 2.4rem);
  letter-spacing: 0.06em;
  text-align: center;
  padding-top: 30px;
  text-transform: uppercase;
  color: var(--color-text);
  line-height: 1;
}

.date-bottom {
  padding: 16px 20px;
  border-top: 1px solid var(--color-border);
}

.date-desc {
  font-family: var(--font-body);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
}

/* ── Strips (desktop = lignes horizontales) ── */
.strip {
  display: flex;
  flex-direction: row;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.strip-a { border-bottom: none; }

.strip-item {
  flex: 1;
  border-right: 1px solid rgba(255,255,255,0.05);
}
.strip-item:last-child { border-right: none; }

.strip-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  filter: grayscale(30%);
  transition: filter 0.4s ease;
}
.strip-item:hover img { filter: grayscale(0%); }

/* ── Texte central (desktop) ── */
.process-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 48px 32px;
  border-left: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
}

.process-tag {
  font-family: var(--font-body);
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.35);
  margin-bottom: 24px;
}

.process-quote {
  font-family: var(--font-title);
  font-size: clamp(1.8rem, 3.5vw, 3.2rem);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-text);
  line-height: 1.05;
  margin-bottom: 24px;
}

.process-body {
  font-family: var(--font-body);
  font-size: 0.85rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.45);
  max-width: 280px;
}

/* ════════════════════════════════
   MOBILE — 3 colonnes : strip-a | texte | strip-b
════════════════════════════════ */
@media (max-width: 768px) {
  .origine {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "col-left  col-left  col-left"
      "strip-a   text      strip-b"
      "col-right col-right col-right";
    min-height: auto;
  }

  /* Images pleine largeur */
  .col-left,
  .col-right {
    border-left: none;
    border-right: none;
    border-bottom: 1px solid var(--color-border);
  }
  .col-right {
    border-top: 1px solid var(--color-border);
  }

  .image-wrap { height: 260px; }

  .main-img {
    height: 100%;
    object-fit: cover;
  }

  /* Strips : colonnes verticales de photos */
  .strip {
    flex-direction: column;
    border: none;
    height: 100%;
    min-height: 400px;
  }

  .strip-a {
    border-right: 1px solid var(--color-border);
  }

  .strip-b {
    border-left: 1px solid var(--color-border);
  }

  .strip-item {
    flex: 1;
    border-right: none;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .strip-item:last-child { border-bottom: none; }

  .strip-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }

  /* Texte desktop — caché sur mobile */
  .process-text {
    display: none;
  }

  /* Texte mobile animé */
  .mobile-text {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    padding: 12px 4px;
    height: 100%;
  }

  .mobile-line {
    display: block;
    font-family: var(--font-title);
    font-size: clamp(1.1rem, 5.5vw, 1.6rem);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--color-text);
    line-height: 1;
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 0.35s ease-out, transform 0.35s ease-out;
  }

  .mobile-line:first-child {
    font-family: var(--font-body);
    font-size: clamp(0.6rem, 2.2vw, 0.75rem);
    letter-spacing: 0.2em;
    color: rgba(255,255,255,0.35);
  }

  .mobile-line:nth-child(2) {
    color: rgba(255,255,255,0.15);
    font-size: clamp(0.9rem, 4vw, 1.2rem);
  }

  .mobile-line.line-in {
    opacity: 1;
    transform: translateY(0);
  }

  .date-label { padding: 14px 16px; }
}
</style>
