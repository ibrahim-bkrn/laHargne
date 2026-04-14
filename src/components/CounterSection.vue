<script setup>
/**
 * CounterSection.vue — Chiffres clés animés
 *
 * Les compteurs s'animent de 0 à leur valeur cible quand la section
 * entre dans le viewport (IntersectionObserver).
 *
 * ✏️ Modifiez `stats` pour personnaliser les chiffres et labels.
 */
import { ref, onMounted, onUnmounted } from 'vue'

// ✏️ CHIFFRES — Modifiez ces valeurs
const stats = [
  {
    value: 247,
    suffix: '',
    label: 'Pièces vendues',
    description: 'depuis le premier drop',
  },
  {
    value: 3,
    suffix: '',
    label: 'Drops réalisés',
    description: 'et ça ne fait que commencer',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Made with Hargne',
    description: 'sans compromis sur la qualité',
  },
]

// Valeurs affichées (démarrent à 0)
const displayValues = ref(stats.map(() => 0))
let observer = null

/**
 * Anime un compteur de 0 à `target` en `duration` ms
 * avec une easing ease-out cubique.
 */
function animateCounter(index, target, duration = 1800) {
  const start = performance.now()

  function step(now) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    // Easing ease-out cubique
    const eased = 1 - Math.pow(1 - progress, 3)
    displayValues.value[index] = Math.round(eased * target)
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

onMounted(() => {
  const section = document.getElementById('counter-section')
  if (!section) return

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        // Lance chaque compteur avec un léger délai décalé
        stats.forEach((stat, i) => {
          setTimeout(() => animateCounter(i, stat.value), i * 150)
        })
        // Ne déclenche qu'une seule fois
        observer.unobserve(section)
      }
    },
    { threshold: 0.3 },
  )

  observer.observe(section)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <section class="counter-section" id="counter-section">
    <div class="container">
      <div class="stats-grid">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="stat-item"
          v-scroll-reveal="index * 100"
        >
          <!-- Chiffre animé -->
          <div class="stat-value">
            {{ displayValues[index].toLocaleString('fr-FR') }}
            <span class="stat-suffix">{{ stat.suffix }}</span>
          </div>

          <!-- Label principal -->
          <div class="stat-label">{{ stat.label }}</div>

          <!-- Description secondaire -->
          <div class="stat-desc">{{ stat.description }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.counter-section {
  padding: 80px 0;
  background-color: var(--color-bg);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  /* Séparateurs verticaux entre chaque stat */
  divide: var(--color-border);
}

/* Séparateur vertical entre les stats */
.stat-item:not(:last-child) {
  border-right: 1px solid var(--color-border);
  padding-right: 48px;
}
.stat-item:not(:first-child) {
  padding-left: 48px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 4px;
}

.stat-value {
  font-family: var(--font-title);
  font-size: clamp(3rem, 7vw, 5.5rem);
  letter-spacing: -0.02em;
  color: var(--color-accent);
  line-height: 1;
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.stat-suffix {
  font-size: 0.55em;
  letter-spacing: 0;
  color: var(--color-muted);
}

.stat-label {
  font-family: var(--font-title);
  font-size: 0.9rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text);
  margin-top: 4px;
}

.stat-desc {
  font-family: var(--font-body);
  font-size: 0.78rem;
  color: var(--color-muted);
  line-height: 1.5;
}

/* ---- Responsive ---- */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .stat-item:not(:last-child) {
    border-right: none;
    border-bottom: 1px solid var(--color-border);
    padding-right: 0;
    padding-bottom: 40px;
  }

  .stat-item:not(:first-child) {
    padding-left: 0;
  }
}
</style>
