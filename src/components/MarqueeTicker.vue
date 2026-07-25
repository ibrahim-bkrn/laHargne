<script setup>
import { computed } from 'vue'
import { useTexts } from '../composables/useTexts'

const { t, fetchTexts } = useTexts()
fetchTexts()

const phrases = computed(() => [
  t('marquee_phrase_1', 'Premier Drop'),
  t('marquee_phrase_2', 'édition limitée'),
  t('marquee_phrase_3', 'Arracher la place qu\'on nous donnera jamais'),
])

const separator = '—'
</script>

<template>
  <div class="ticker" aria-hidden="true">
    <div class="ticker-track">
      <span v-for="n in 4" :key="n" class="ticker-group">
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
  animation: ticker-scroll 18s linear infinite;
}

@keyframes ticker-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-25%); }
}

.ticker-group {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.ticker-phrase {
  font-family: var(--font-title);
  font-size: 0.9rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-muted);
  white-space: nowrap;
  padding: 0 30px;
}

.ticker-sep {
  font-family: var(--font-title);
  font-size: 0.65rem;
  color: var(--color-border);
  flex-shrink: 0;
}
</style>
