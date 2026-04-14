<script setup>
/**
 * HeroSection.vue — Section d'entrée plein écran (100vh)
 *
 * Pour ajouter une vraie photo en fond :
 *   Remplacez la valeur de heroImage par le chemin vers votre image.
 *   Exemple : const heroImage = '/images/hero.jpg'
 *   Placez l'image dans le dossier public/ à la racine du projet.
 */

defineProps({
  instagramUrl: {
    type: String,
    required: true,
  },
})

const heroImages = [
  '/images/imageProduitBleue.png',
  '/images/imageProduitNoir.png',
  '/images/imageProduitGris - Copie.png',
]

function scrollToCollection() {
  const el = document.getElementById('collection')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="hero" id="hero">
    <!-- ---- Fond ---- -->
    <div class="hero-bg">
      <img
        v-for="(img, i) in heroImages"
        :key="i"
        :src="img"
        alt=""
        class="hero-img"
        aria-hidden="true"
      />
      <!-- Image rognée pour mobile uniquement -->
      <img
        src="/images/imageProduitNoir-responsive.png"
        alt=""
        class="hero-img hero-img-mobile"
        aria-hidden="true"
      />
    </div>

    <!-- Overlay dégradé pour lisibilité du texte -->
    <div class="hero-overlay" aria-hidden="true"></div>

    <!-- ---- Contenu principal ---- -->
    <div class="hero-content">
      <h1 class="hero-title" aria-label="Arracher la place qu'on nous donnerai jamais.">
        <span class="word-main">Arracher</span>
        <span class="word-sub">la place qu'on nous donnerai jamais.</span>
      </h1>

      <!-- Boutons d'action -->
      <div class="hero-cta">
        <button class="btn-primary" style="opacity: 0.7;" @click="scrollToCollection">
          Voir la Collection
        </button>

        <a
          :href="instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="hero-instagram"
        >
          <svg
            class="hero-instagram-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
          </svg>
          <span>Instagram</span>
        </a>
      </div>
    </div>

    <!-- Indicateur de scroll discret -->
    <div class="scroll-indicator" aria-hidden="true">
      <span class="scroll-line"></span>
    </div>
  </section>
</template>

<style scoped>
/* ---- Section principale ---- */
.hero {
  position: relative;
  height: 100vh;
  min-height: 620px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

/* ---- Fond ---- */
.hero-bg {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: #0d0d0d;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

/* Image rognée mobile — cachée sur desktop */
.hero-img-mobile {
  display: none;
}

/* Photo de droite (gris) — angle plus large, on remonte le sujet */
.hero-img:last-child {
  object-position: center 15%;
}

/* Séparateurs subtils entre les panneaux */
.hero-img:not(:last-child) {
  border-right: 1px solid rgba(255, 255, 255, 0.06);
}

/* Overlay principal — assombrit la photo sans l'écraser */
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(5, 5, 5, 0.25) 0%,
    rgba(5, 5, 5, 0.05) 35%,
    rgba(5, 5, 5, 0.20) 65%,
    rgba(5, 5, 5, 0.65) 100%
  );
}


/* ---- Contenu ---- */
.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 24px;
}

/* Titre centré */
.hero-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--font-title);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  line-height: 1.05;
  margin-bottom: 48px;
  animation: fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
  gap: 0.1em;
}

.word-main {
  display: block;
  font-size: clamp(5rem, 16vw, 15rem);
  color: #fff;
}

.word-sub {
  display: block;
  font-size: clamp(1.3rem, 3.2vw, 3rem);
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.05em;
}

/* Groupe de CTA */
.hero-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  flex-wrap: wrap;
  animation: fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.6s both;
}

/* Lien Instagram */
.hero-instagram {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-title);
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  /* Toujours visible sur photo claire ou sombre */
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color var(--transition-fast);
}
.hero-instagram:hover {
  color: var(--color-accent);
}
.hero-instagram-icon {
  width: 18px;
  height: 18px;
}

/* ---- Indicateur de scroll ---- */
.scroll-indicator {
  position: absolute;
  bottom: 44px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  animation: fade-up 1s ease 1.2s both;
}

.scroll-line {
  display: block;
  width: 1px;
  height: 56px;
  background: linear-gradient(to bottom, transparent, var(--color-border));
  margin: 0 auto;
  animation: scroll-pulse 2.2s ease-in-out 1.5s infinite;
}

/* ---- Animations ---- */
/* Révélation depuis le bas — pas de fade, juste du mouvement pur */
@keyframes line-reveal {
  from {
    transform: translateY(110%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(55px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scroll-pulse {
  0% {
    transform: scaleY(0);
    transform-origin: top;
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  50% {
    transform: scaleY(1);
    transform-origin: top;
  }
  51% {
    transform-origin: bottom;
  }
  80% {
    transform: scaleY(0);
    transform-origin: bottom;
    opacity: 0;
  }
  100% {
    transform: scaleY(0);
    opacity: 0;
  }
}

/* ---- Responsive ---- */
@media (max-width: 768px) {
  .hero {
    height: 90vh;
    min-height: 480px;
  }

  .hero-title {
    font-size: clamp(3rem, 14vw, 5.5rem);
  }

  .hero-cta {
    flex-direction: column;
    align-items: center;
    gap: 18px;
  }

  /* Sur mobile : une seule image, la noire */
  .hero-bg {
    grid-template-columns: 1fr;
  }

  /* Cache la bleue (1ère), la noire originale (2ème) et la grise (3ème) */
  .hero-img:nth-child(1),
  .hero-img:nth-child(2),
  .hero-img:nth-child(3) {
    display: none;
  }

  /* Image rognée mobile — visible seulement sur mobile */
  .hero-img-mobile {
    display: block;
    object-fit: cover;
    object-position: center top;
  }

}
</style>
