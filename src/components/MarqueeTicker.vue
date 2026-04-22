<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const phrases = [
  "T'AS LA HARGNE OU T'AS PAS",
  "PORTER LAHARGNE C'EST UN ÉTAT D'ESPRIT",
  'CHAQUE JOUR EST UN COMBAT',
  'HABILLE-TOI EN CONSÉQUENCE',
  "LA HARGNE — C'EST UN CHOIX",
  'COLLECTION 2025',
]

const separator = '—'

const trackRef = ref(null)
const offsetPx = ref(0)

function handleScroll() {
  if (!trackRef.value) return
  const groupWidth = trackRef.value.scrollWidth / 3
  offsetPx.value = -(window.scrollY * 0.4) % groupWidth
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="ticker" aria-hidden="true">
    <div
      class="ticker-track"
      ref="trackRef"
      :style="{ transform: `translateX(${offsetPx}px)` }"
    >
      <span v-for="n in 3" :key="n" class="ticker-group">
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
  user-select: none;
}

.ticker-track {
  display: flex;
  width: max-content;
  will-change: transform;
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
}

.ticker-sep {
  font-family: var(--font-title);
  font-size: 0.65rem;
  color: var(--color-border);
  flex-shrink: 0;
}
</style>
