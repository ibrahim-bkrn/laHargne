<script setup>
defineProps({
  instagramUrl: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section class="insta-section" id="lookbook">
    <div class="container">

      <header class="insta-header" v-scroll-reveal>
        <p class="insta-tag">Instagram</p>
        <h2 class="insta-title">Suivez l'aventure</h2>
      </header>

      <div class="insta-feed-wrap" v-scroll-reveal="60">
        <!-- Widget Elfsight — flux Instagram en direct -->
        <div class="elfsight-app-72547dc1-d2c2-4513-87d3-8a045ff34529" data-elfsight-app-lazy></div>
      </div>

      <div class="insta-cta" v-scroll-reveal="120">
        <a
          :href="instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-primary"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="ig-icon"
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
.insta-section {
  padding: var(--spacing-section) 0;
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.insta-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 48px;
  text-align: center;
}

.insta-tag {
  font-family: var(--font-body);
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.insta-title {
  font-family: var(--font-title);
  font-size: clamp(2rem, 5vw, 3.6rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text);
  line-height: 1;
}

.insta-feed-wrap {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.insta-cta {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}

.ig-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 10px;
}

</style>
