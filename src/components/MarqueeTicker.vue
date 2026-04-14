<script setup>
/**
 * MarqueeTicker.vue — Bandeau texte défilant en boucle infinie
 *
 * ✏️ Modifiez `phrases` pour changer le texte du ticker.
 * Le contenu est dupliqué pour créer une boucle seamless.
 */

const phrases = [
  "T'AS LA HARGNE OU T'AS PAS",
  'PORTER LAHARGNE C\'EST UN ÉTAT D\'ESPRIT',
  'CHAQUE JOUR EST UN COMBAT',
  'HABILLE-TOI EN CONSÉQUENCE',
  'LA HARGNE — C\'EST UN CHOIX',
  'COLLECTION 2025',
]

// Séparateur entre chaque phrase
const separator = '—'
</script>

<template>
  <div class="ticker" aria-hidden="true">
    <div class="ticker-track">
      <!--
        Le contenu est répété 3 fois pour garantir une boucle
        seamless quelle que soit la largeur d'écran.
      -->
      <span
        v-for="n in 3"
        :key="n"
        class="ticker-group"
      >
        <template v-for="(phrase, i) in phrases" :key="i">
          <span class="ticker-phrase">{{ phrase }}</span>
          <span class="ticker-sep">{{ separator }}</span>
        </template>
      </span>
    </div>
  </div>
</template>

<style scoped>
.ticker {
  width: 100%;
  overflow: hidden;
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: 14px 0;
  /* Empêche le sélection du texte pendant le défilement */
  user-select: none;
}

.ticker-track {
  display: flex;
  width: max-content;
  /* Animation : défilement de 0 à -33.33% (un tiers du contenu = 1 répétition) */
  animation: ticker-scroll 28s linear infinite;
  gap: 0;
}

/* Pause au hover */
.ticker:hover .ticker-track {
  animation-play-state: paused;
}

.ticker-group {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.ticker-phrase {
  font-family: var(--font-title);
  font-size: 0.82rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-muted);
  white-space: nowrap;
  padding: 0 20px;
  transition: color 0.2s ease;
}

.ticker:hover .ticker-phrase {
  color: var(--color-text);
}

.ticker-sep {
  font-family: var(--font-title);
  font-size: 0.65rem;
  color: var(--color-border);
  flex-shrink: 0;
}

@keyframes ticker-scroll {
  from {
    transform: translateX(0);
  }
  to {
    /* Déplace exactement d'un tiers = une répétition = loop seamless */
    transform: translateX(-33.3333%);
  }
}

/* Sur mobile : un peu plus rapide */
@media (max-width: 768px) {
  .ticker-track {
    animation-duration: 20s;
  }
}
</style>
