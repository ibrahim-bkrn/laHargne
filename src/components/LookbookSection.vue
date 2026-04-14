<script setup>
/**
 * LookbookSection.vue — Grille photos de la marque
 *
 * ✏️ Pour ajouter vos vraies photos :
 *    - Placez vos images dans public/images/ à la racine du projet
 *    - Remplacez src: '' par ex: '/images/lookbook-1.jpg'
 *    - Ajustez wide: true sur les cases que vous voulez en 2 colonnes
 */

defineProps({
  instagramUrl: {
    type: String,
    required: true,
  },
})

// ✏️ LOOKBOOK — 4 photos, remplacez les src par vos vraies images
// Layout : [grande] [petite] / [petite] [grande]
// → Remplacer par ex: '/images/lookbook-1.jpg'
// Layout grille 3 col × 2 lignes :
// [ large (2col)       ] [ ← haut-droite ]
// [ ← bas-gauche ] [      large (2col)   ]
const lookbookItems = [
  {
    id: 1,
    src: 'https://picsum.photos/seed/lhargne-l1/900/700',
    alt: 'Look LAHARGNE 01',
    wide: true,   // haut-gauche, 2 colonnes
  },
  {
    id: 2,
    src: '/images/imagePalge.png',
    alt: 'Look LAHARGNE 02',
    wide: false,  // haut-droite
  },
  {
    id: 3,
    src: '/images/imageDecor.png',
    alt: 'Look LAHARGNE 03',
    wide: false,  // bas-gauche
  },
  {
    id: 4,
    src: 'https://picsum.photos/seed/boxing/900/700',
    alt: 'Look LAHARGNE 04',
    wide: true,   // bas-droite, 2 colonnes
  },
]
</script>

<template>
  <section class="lookbook" id="lookbook">
    <div class="container">

      <!-- En-tête -->
      <header class="lookbook-header" v-scroll-reveal>
        <h2 class="section-title">Lookbook</h2>
      </header>

      <!-- Grille asymétrique -->
      <div class="lookbook-grid">
        <div
          v-for="(item, index) in lookbookItems"
          :key="item.id"
          class="lookbook-item"
          :class="{ wide: item.wide }"
          v-scroll-reveal="index * 70"
        >
          <!--
            Photo lookbook — remplacez src="" par votre chemin d'image.
            La classe has-image permet d'afficher l'image réelle.
          -->
          <img
            v-if="item.src"
            :src="item.src"
            :alt="item.alt"
            class="lookbook-img"
          />

          <!-- Placeholder visible si pas d'image réelle -->
          <div class="lookbook-placeholder" aria-hidden="true">
            <!-- Numéro de la photo pour s'y retrouver en développement -->
            <span class="lookbook-placeholder-num">0{{ item.id }}</span>
            <span class="lookbook-placeholder-label">Photo à venir</span>
          </div>
        </div>
      </div>

      <!-- CTA Instagram -->
      <div class="lookbook-cta" v-scroll-reveal="150">
        <a
          :href="instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-outline"
        >
          <!-- Icône Instagram inline -->
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lookbook-ig-icon"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
          </svg>
          Suivre sur Instagram
        </a>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ---- Section ---- */
.lookbook {
  padding: var(--spacing-section) 0;
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

/* ---- En-tête ---- */
.lookbook-header {
  margin-bottom: 52px;
}

/* ---- Grille ---- */
/* Layout 4 images : [grande 2col] [petite] / [petite] [grande 2col] */
.lookbook-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 360px 360px;
  gap: 10px;
}

/* Les items "wide" s'étendent sur 2 colonnes */
.lookbook-item.wide {
  grid-column: span 2;
}

.lookbook-item {
  position: relative;
  overflow: hidden;
  background-color: #141414;
  border-radius: var(--border-radius);
  cursor: pointer;
}

/* Zoom subtil au hover */
.lookbook-item:hover .lookbook-img {
  transform: scale(1.06);
  filter: brightness(0.8);
}

.lookbook-img {
  width: 100%;
  height: 100%;
  /* cover pour les photos ambiance, contain pour les visuels produit */
  object-fit: cover;
  object-position: center;
  display: block;
  transition:
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.55s ease;
}


/* ---- Placeholder ---- */
.lookbook-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 18px 20px;
  pointer-events: none;
}

/* Masque le placeholder si une vraie image est présente */
.lookbook-item:has(.lookbook-img) .lookbook-placeholder {
  display: none;
}

.lookbook-placeholder-num {
  font-family: var(--font-title);
  font-size: 2rem;
  letter-spacing: 0.05em;
  color: var(--color-border);
  line-height: 1;
}

.lookbook-placeholder-label {
  font-family: var(--font-body);
  font-size: 0.68rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #333;
  margin-top: 4px;
}

/* ---- CTA bas de section ---- */
.lookbook-cta {
  margin-top: 52px;
  display: flex;
  justify-content: center;
}

.lookbook-ig-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

/* ---- Responsive ---- */
@media (max-width: 768px) {
  .lookbook-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(4, 240px);
  }

  /* Sur tablette, les wide prennent toute la largeur */
  .lookbook-item.wide {
    grid-column: span 2;
  }
}

@media (max-width: 480px) {
  .lookbook-grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 260px);
  }

  .lookbook-item.wide {
    grid-column: span 1;
  }
}
</style>
