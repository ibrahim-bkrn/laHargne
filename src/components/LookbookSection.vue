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

      <div class="insta-photo-wrap" v-scroll-reveal="60">
        <img src="/images/insta.png" alt="LAHARGNE — Instagram" class="insta-photo" />
        <div class="insta-overlay"></div>
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

.insta-photo-wrap {
  position: relative;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: var(--border-radius);
}

.insta-photo {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: center top;
  display: block;
  filter: grayscale(10%);
}

.insta-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 55%, rgba(5,5,5,0.7) 100%);
  pointer-events: none;
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

@media (max-width: 900px) {
  .insta-photo {
    aspect-ratio: 3 / 4;
    width: auto;
  }
}
</style>
