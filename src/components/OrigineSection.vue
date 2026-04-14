<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const imageDebut = '/images/imgProcess/aout2025.PNG'
const imageFin   = '/images/imgProcess/avril2026.JPG'

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

// Chaque ligne apparaît une par une dans la colonne centrale
const textLines = [
  'La sérigraphie',
  '—',
  'De la hargne',
  'et du temps.',
  '',
  'Des tests,',
  'des échecs,',
  'trop de doutes,',
  'du temps perdu,',
  'de la fatigue,',
  'des progrès.',
  '',
  "C'est de la hargne",
  'derrière chaque',
  'produit.',
]

// État d'animation
const isVisible = ref(false)
const textRef = ref(null)

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.08 }
  )
  if (textRef.value) observer.observe(textRef.value)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
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
      <div class="image-wrap">
        <img :src="imageDebut" alt="Les débuts — Août 2025" class="main-img" />
        <div class="image-overlay"></div>
      </div>
      <div class="date-label">
        <span class="date-tag">Août 2025</span>
        <p class="date-desc">Le début.. Tout à construire.</p>
      </div>
    </div>

    <!-- Texte central — colonne du milieu entre les deux strips -->
    <div class="process-text" ref="textRef">
      <div class="text-lines">
        <span
          v-for="(line, i) in textLines"
          :key="i"
          class="text-line"
          :class="{ 'line-in': isVisible, 'line-empty': line === '' }"
          :style="{ '--li': i }"
        >{{ line }}</span>
      </div>
    </div>

    <!-- Grande image droite — Avril 2026 -->
    <div class="col-right">
      <div class="image-wrap">
        <img :src="imageFin" alt="Aujourd'hui — Avril 2026" class="main-img" />
        <div class="image-overlay"></div>
      </div>
      <div class="date-label">
        <span class="date-tag">Avril 2026</span>
        <p class="date-desc">Le produit. Livré.</p>
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

.date-label {
  padding: 20px 20px;
  border-top: 1px solid var(--color-border);
}

.date-tag {
  display: block;
  font-family: var(--font-body);
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
  margin-bottom: 6px;
}

.date-desc {
  font-family: var(--font-title);
  font-size: 1rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text);
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

.text-lines {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

/* Chaque ligne — part du bas, invisible */
.text-line {
  display: block;
  font-family: var(--font-body);
  font-size: 0.85rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.5);
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  transition-delay: calc(var(--li) * 0.07s);
}

.text-line.line-empty { height: 0.5em; }

.text-line:first-child {
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.2);
}

.text-line:nth-child(2) {
  color: rgba(255,255,255,0.12);
}

/* Déclenche : monte en position + apparaît */
.text-line.line-in {
  opacity: 1;
  transform: translateY(0);
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

  /* Texte — colonne centrale entre les deux strips */
  .process-text {
    border-left: none;
    border-right: none;
    padding: 8px 4px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .text-lines {
    padding: 12px 4px;
    gap: 6px;
    align-items: flex-start;
    width: 100%;
  }

  .text-line {
    font-size: clamp(1rem, 4.5vw, 1.3rem);
    line-height: 1.4;
    white-space: normal;
    word-break: break-word;
    color: rgba(255, 255, 255, 0.75);
    /* Reset transform pour mobile — vient du bas */
    transform: translateY(24px);
  }

  .text-line:first-child {
    font-size: clamp(0.65rem, 2.5vw, 0.8rem);
  }

  .date-label { padding: 14px 16px; }
}
</style>
