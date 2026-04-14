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
  '/images/imageProduitNoir.png',
  '/images/imageProduitBleue.png',
  '/images/imageProduitGris.png',
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
    </div>

    <!-- Overlay dégradé pour lisibilité du texte -->
    <div class="hero-overlay" aria-hidden="true"></div>

    <!-- ---- Contenu principal ---- -->
    <div class="hero-content">
      <!-- Sous-titre petit (eyebrow) -->
      <p class="hero-eyebrow">Tee-shirts — Collection 2025</p>

      <!-- Titre principal géant -->
      <!-- ✏️ Modifiez ce texte pour changer le message principal -->
      <!--
        Chaque ligne est dans un wrapper overflow:hidden.
        Le texte arrive par le bas (effet "masque de révélation").
        C'est plus percutant qu'un simple fade.
      -->
      <h1 class="hero-title" aria-label="La Hargne C'est un État d'esprit">
        <span class="line-wrap"><span class="line" style="--delay:0.3s">La Hargne</span></span>
        <span class="line-wrap"><span class="line" style="--delay:0.48s">C'est un</span></span>
        <span class="line-wrap accent-wrap"><span class="line accent" style="--delay:0.66s">État d'esprit</span></span>
      </h1>

      <!-- Boutons d'action -->
      <div class="hero-cta">
        <!-- Bouton principal → scroll vers la collection -->
        <button class="btn-primary" @click="scrollToCollection">
          Voir la Collection
        </button>

        <!-- Lien Instagram avec icône SVG inline -->
        <a
          :href="instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="hero-instagram"
        >
          <!-- Icône Instagram (SVG inline, pas de dépendance externe) -->
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
    rgba(5, 5, 5, 0.48) 0%,
    rgba(5, 5, 5, 0.20) 35%,
    rgba(5, 5, 5, 0.42) 65%,
    rgba(5, 5, 5, 0.82) 100%
  );
}

/* Vignette latérale gauche — légère, côté texte uniquement */
.hero-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(5, 5, 5, 0.28) 0%,
    transparent 55%
  );
}

/* ---- Contenu ---- */
.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
  padding-top: 100px; /* Compense la hauteur de la nav sticky */
}

/* Petit label au-dessus du titre */
.hero-eyebrow {
  font-family: var(--font-body);
  font-size: 0.78rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  /* Blanc avec opacité — visible sur toute photo */
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 28px;
  animation: fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
}

/* Titre géant */
.hero-title {
  display: flex;
  flex-direction: column;
  font-family: var(--font-title);
  font-size: clamp(3.8rem, 10.5vw, 9rem);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  line-height: 0.93;
  color: var(--color-text);
  margin-bottom: 52px;
}

/* Wrapper overflow:hidden — masque le texte qui arrive par le bas */
.line-wrap {
  display: block;
  overflow: hidden;
  /* Légère marge négative pour que les lignes se touchent bien */
  margin-bottom: -0.05em;
}

/* Chaque ligne démarre hors du wrapper (en-dessous) */
.hero-title .line {
  display: block;
  transform: translateY(110%);
  animation: line-reveal 1s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s) both;
}

/* La dernière ligne en blanc pur (accent) */
.hero-title .accent {
  color: var(--color-accent);
}

/* Groupe de CTA */
.hero-cta {
  display: flex;
  align-items: center;
  gap: 28px;
  flex-wrap: wrap;
  animation: fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.85s both;
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
  .hero-title {
    font-size: clamp(3rem, 14vw, 5.5rem);
  }

  .hero-cta {
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
  }
}
</style>
