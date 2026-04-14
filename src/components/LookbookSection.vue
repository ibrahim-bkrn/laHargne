<script setup>
defineProps({
  instagramUrl: {
    type: String,
    required: true,
  },
})

// ✏️ 3 images côte à côte format portrait
const photos = [
  { src: '/images/profilInsta.png',   alt: 'LAHARGNE — Profil Instagram' },
  { src: '/images/IMG_8079.JPEG',    alt: 'LAHARGNE — Look 02' },
  { src: '/images/imageDecor.png',    alt: 'LAHARGNE — Look 03' },
]
</script>

<template>
  <section class="lookbook" id="lookbook">
    <div class="container">

      <!-- En-tête -->
      <header class="lookbook-header" v-scroll-reveal>
        <h2 class="section-title">Lookbook</h2>
      </header>

      <!-- 3 images portrait côte à côte -->
      <div class="lookbook-grid">
        <div
          v-for="(photo, i) in photos"
          :key="i"
          class="lookbook-item"
          v-scroll-reveal="i * 80"
        >
          <img :src="photo.src" :alt="photo.alt" class="lookbook-img" />
        </div>
      </div>

      <!-- CTA Instagram -->
      <div class="lookbook-cta" v-scroll-reveal="200">
        <a
          :href="instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-outline"
        >
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
.lookbook {
  padding: var(--spacing-section) 0;
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.lookbook-header {
  margin-bottom: 52px;
}

/* ---- Grille 3 colonnes portrait ---- */
.lookbook-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.lookbook-item {
  overflow: hidden;
  border-radius: var(--border-radius);
  background: #141414;
}

.lookbook-img {
  width: 100%;
  aspect-ratio: 9 / 16;
  object-fit: cover;
  object-position: center top;
  display: block;
  transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), filter 0.55s ease;
}

.lookbook-item:hover .lookbook-img {
  transform: scale(1.05);
  filter: brightness(0.8);
}

/* ---- CTA ---- */
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
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .lookbook-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
  }

  .lookbook-img {
    aspect-ratio: 3 / 5;
  }
}
</style>
