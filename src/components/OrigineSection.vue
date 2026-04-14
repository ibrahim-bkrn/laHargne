<script setup>
/**
 * OrigineSection.vue — L'histoire du produit, de 0 à aujourd'hui
 *
 * ✏️ Remplacez les images dans processPhotosTop / processPhotosBottom
 *    par vos vraies photos de sérigraphie quand vous les aurez.
 *    Placez-les dans public/images/
 */

// ✏️ Image gauche — le tout début (Août 2025)
const imageDebut = '/images/imageDecor.png'

// ✏️ Image droite — aujourd'hui (Avril 2026)
const imageFin = '/images/imageProduitNoir.png'

// ✏️ Petites photos du processus — rangée du haut
const processPhotosTop = [
  '/images/imagePalge.png',
  '/images/imageProduitBleue.png',
  '/images/imageProduitGris.png',
  '/images/IMG_8079.JPEG',
  '/images/imageProduitGris - Copie.png',
]

// ✏️ Petites photos du processus — rangée du bas
const processPhotosBottom = [
  '/images/imageProduitGris - Copie.png',
  '/images/IMG_8079.JPEG',
  '/images/imageProduitGris.png',
  '/images/imageProduitBleue.png',
  '/images/imagePalge.png',
]
</script>

<template>
  <section class="origine" id="origine">

    <!-- ── Colonne gauche : image début ── -->
    <div class="col-image col-left">
      <div class="image-wrap">
        <img :src="imageDebut" alt="Les débuts — Août 2025" class="main-img" />
        <div class="image-overlay"></div>
      </div>
      <div class="date-label">
        <span class="date-tag">Août 2025</span>
        <p class="date-desc">Le début. Tout à construire.</p>
      </div>
    </div>

    <!-- ── Colonne centrale : processus ── -->
    <div class="col-process">

      <!-- Rangée de petites photos — haut -->
      <div class="photo-strip">
        <div
          v-for="(photo, i) in processPhotosTop"
          :key="'top-' + i"
          class="strip-item"
        >
          <img :src="photo" alt="" aria-hidden="true" />
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
          Pas de raccourcis. Pas d'intermédiaire. Chaque pièce porte ce travail.
        </p>
      </div>

      <!-- Rangée de petites photos — bas -->
      <div class="photo-strip">
        <div
          v-for="(photo, i) in processPhotosBottom"
          :key="'bot-' + i"
          class="strip-item"
        >
          <img :src="photo" alt="" aria-hidden="true" />
        </div>
      </div>

    </div>

    <!-- ── Colonne droite : image aujourd'hui ── -->
    <div class="col-image col-right">
      <div class="image-wrap">
        <img :src="imageFin" alt="Aujourd'hui — Avril 2026" class="main-img" />
        <div class="image-overlay"></div>
      </div>
      <div class="date-label">
        <span class="date-tag">Avril 2026</span>
        <p class="date-desc">Le produit. Livré.</p>
      </div>
    </div>

  </section>
</template>

<style scoped>
/* ── Layout principal ── */
.origine {
  display: grid;
  grid-template-columns: 1fr 1.4fr 1fr;
  min-height: 100vh;
  background: var(--color-bg);
  overflow: hidden;
}

/* ── Colonnes images ── */
.col-image {
  display: flex;
  flex-direction: column;
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
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(5, 5, 5, 0.85) 100%
  );
}

/* Label date sous l'image */
.date-label {
  padding: 28px 24px;
  background: var(--color-bg);
  border-top: 1px solid var(--color-border);
}

.date-tag {
  display: inline-block;
  font-family: var(--font-body);
  font-size: 0.72rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 8px;
}

.date-desc {
  font-family: var(--font-title);
  font-size: 1.1rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text);
}

/* ── Colonne centrale ── */
.col-process {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
}

/* Rangées de petites photos */
.photo-strip {
  display: flex;
  flex: 0 0 auto;
  height: 180px;
  overflow: hidden;
}

.strip-item {
  flex: 1;
  overflow: hidden;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.strip-item:last-child {
  border-right: none;
}

.strip-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  filter: grayscale(30%);
  transition: filter 0.4s ease;
}

.strip-item:hover img {
  filter: grayscale(0%);
}

/* Texte central */
.process-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 48px 32px;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
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

/* ── Responsive ── */
@media (max-width: 900px) {
  .origine {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    min-height: auto;
  }

  .col-image {
    height: 75vw;
    max-height: 420px;
  }

  .col-process {
    border-left: none;
    border-right: none;
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
  }

  .photo-strip {
    height: 120px;
  }

  .process-text {
    padding: 40px 24px;
  }
}
</style>
