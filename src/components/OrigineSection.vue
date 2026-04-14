<script setup>
const imageDebut = '/images/imageDecor.png'
const imageFin   = '/images/imageProduitNoir.png'

const photosA = [
  '/images/imagePalge.png',
  '/images/imageProduitBleue.png',
  '/images/imageProduitGris.png',
  '/images/IMG_8079.JPEG',
  '/images/imageProduitGris - Copie.png',
]

const photosB = [
  '/images/imageProduitGris - Copie.png',
  '/images/IMG_8079.JPEG',
  '/images/imageProduitGris.png',
  '/images/imageProduitBleue.png',
  '/images/imagePalge.png',
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
      <div class="image-wrap">
        <img :src="imageDebut" alt="Les débuts — Août 2025" class="main-img" />
        <div class="image-overlay"></div>
      </div>
      <div class="date-label">
        <span class="date-tag">Août 2025</span>
        <p class="date-desc">Le début. Tout à construire.</p>
      </div>
    </div>

    <!-- Texte central -->
    <div class="process-text">
      <p class="process-tag">La sérigraphie</p>
      <h2 class="process-quote">
        Pour la hargne<br>on a tout arraché.
      </h2>
      <p class="process-body">
        De la première encre posée à la main jusqu'au premier tee-shirt livré.
        Pas de raccourcis. Chaque pièce porte ce travail.
      </p>
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
  grid-template-columns: 1fr 1.4fr 1fr;
  grid-template-rows: 180px 1fr 180px;
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
  overflow: hidden;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.strip-a { border-bottom: none; }

.strip-item {
  flex: 1;
  overflow: hidden;
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

/* ── Texte central ── */
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
  color: rgba(255,255,255,0.35);
  margin-bottom: 20px;
}

.process-quote {
  font-family: var(--font-title);
  font-size: clamp(1.8rem, 3.2vw, 3rem);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-text);
  line-height: 1.05;
  margin-bottom: 20px;
}

.process-body {
  font-family: var(--font-body);
  font-size: 0.83rem;
  line-height: 1.75;
  color: rgba(255,255,255,0.4);
  max-width: 260px;
}

/* ════════════════════════════════
   MOBILE — strips en colonnes latérales
   [strip-a] [col-left / text / col-right] [strip-b]
════════════════════════════════ */
@media (max-width: 768px) {
  .origine {
    grid-template-columns: 56px 1fr 56px;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "strip-a  col-left   strip-b"
      "strip-a  text       strip-b"
      "strip-a  col-right  strip-b";
    min-height: auto;
  }

  /* Strips deviennent des colonnes verticales */
  .strip {
    flex-direction: column;
    border-top: none;
    border-bottom: none;
    height: 100%;
  }

  .strip-a {
    border-right: 1px solid var(--color-border);
    border-bottom: none;
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

  /* Images — format téléphone */
  .col-left,
  .col-right {
    border-right: none;
    border-left: none;
    border-bottom: 1px solid var(--color-border);
    height: 70vw;
    max-height: 420px;
  }
  .col-right { border-bottom: none; }

  .process-text {
    border-left: none;
    border-right: none;
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
    padding: 36px 20px;
  }

  .date-label {
    padding: 16px;
  }
}
</style>
