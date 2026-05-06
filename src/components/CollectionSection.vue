<script setup>
/**
 * CollectionSection.vue — Présentation du produit unique avec 6 coloris
 *
 * ✏️ Un seul produit, 6 variantes de couleur.
 * Modifiez `product` pour mettre à jour les infos.
 * Modifiez `product.variants` pour changer les coloris.
 */
import { ref, computed, watch } from 'vue'

defineProps({
  whatsappUrl: { type: String, required: true },
})

const emit = defineEmits(['open-product'])

// ✏️ LE PRODUIT — un seul modèle, plusieurs coloris
const product = {
  id: 1,
  name: 'TEE-SHIRT LAHARGNE',
  price: '15.90 €',
  description: "L'essentiel. Un seul modèle. Six façons de l'habiter.",
    details: [
    '100% coton biologique 185g/m²',
    'Coupe oversize ',
    'Impression sérigraphie — logo LAHARGNE',
    'Fabriqué au Portugal',
  ],
  sizes: ['XS','S', 'M', 'L', 'XL', 'XXL'],
  // ✏️ COLORIS — ajoutez l'image de chaque coloris quand vous l'avez
  variants: [
    { id: 'blanc', label: 'Gris foncé',  hex: '#4A4A4A', images: ['/images/imageProduitGrisF_16_11zon.webp', '/images/imageProduitGrisFace_17_11zon.webp'], mockupColor: '#4A4A4A', mockupTextColor: '#111111', mockupBg: 'linear-gradient(145deg,#1e1e1e,#111)'     },
    { id: 'noir',  label: 'Noir',        hex: '#1C1C1C', images: ['/images/imageProduitNoir_19_11zon.webp',  '/images/imageProduitNoirFace_21_11zon.webp'], mockupColor: '#242424', mockupTextColor: '#ffffff',  mockupBg: 'linear-gradient(145deg,#2a2a2a,#111)'    },
    { id: 'gris',  label: 'Gris',        hex: '#CCCCCC', images: ['/images/imageProduitGris - Copie_14_11zon.webp',  '/images/imageProduitGrisff_18_11zon.webp'], mockupColor: '#CCCCCC', mockupTextColor: '#f0f0f0',  mockupBg: 'linear-gradient(145deg,#222,#111)'       },
    { id: 'bleu',  label: 'Bleu Marine', hex: '#2D4B7A', images: ['/images/imageProduitBleueFoncé_13.webp', '/images/imagePorduitBleueF_11_11zon.webp'], mockupColor: '#2d4b7a', mockupTextColor: '#ddeeff',  mockupBg: 'linear-gradient(145deg,#0e1824,#0d0d0d)' },
    { id: 'kaki',  label: 'Vert clair',  hex: '#C5C7B5', images: ['/images/imageProduitVert_2_11zon.webp', '/images/imageProduitVertF_3_11zon.webp'],      mockupColor: '#C5C7B5', mockupTextColor: '#f0f0f0',  mockupBg: 'linear-gradient(145deg,#181e12,#0d0d0d)' },
    { id: 'Rose',  label: 'Rose',        hex: '#EFBCB9', images: ['/images/imagePalge_10_11zon.webp', '/images/imageProduitRoseF_1_11zon.webp'], mockupColor: '#EFBCB9', mockupTextColor: '#f5e8e8',  mockupBg: 'linear-gradient(145deg,#1e1014,#0d0d0d)' },
  ],
}

const selectedVariant = ref(product.variants.find(v => v.id === 'Rose') ?? product.variants[0])
const selectedImageIndex = ref(0)

watch(selectedVariant, () => { selectedImageIndex.value = 0 })

const activeImage = computed(() => selectedVariant.value.images[selectedImageIndex.value] ?? '')
const visibleThumbs = computed(() => selectedVariant.value.images.filter(img => img !== ''))

function openProductPage() {
  // Passe le produit + la variante active à la page détail
  emit('open-product', { ...product, activeVariantId: selectedVariant.value.id })
}
</script>

<template>
  <section class="collection" id="collection">
    <div class="container">

      <!-- En-tête -->
      <header class="collection-header" v-scroll-reveal>
        <h2 class="section-title">Première Collection</h2>
        <!--<span class="collection-tag">Tee-shirts — 2025</span>-->
      </header>

      <!-- Feature produit : image gauche + info droite -->
      <div class="product-feature">

        <!-- ===== SÉLECTEUR COLORIS (au-dessus de l'image sur mobile) ===== -->
        <div class="variant-selector variant-selector-top">
          <div class="selector-label">
            Coloris
            <span class="selector-current">— {{ selectedVariant.label }}</span>
          </div>
          <div class="swatches-row">
            <button
              v-for="v in product.variants"
              :key="v.id"
              class="swatch-btn"
              :class="{ active: selectedVariant.id === v.id }"
              :style="{ '--c': v.hex }"
              :title="v.label"
              :aria-label="v.label"
              :aria-pressed="selectedVariant.id === v.id"
              @click="selectedVariant = v"
            ></button>
          </div>
        </div>

        <!-- ===== VISUEL ===== -->
        <div class="feature-visual" v-scroll-reveal>

          <!-- Image principale -->
          <img
            v-if="activeImage"
            :src="activeImage"
            :alt="`${product.name} — ${selectedVariant.label}`"
            class="feature-img"
          />
          <div
            v-else
            class="feature-mockup"
            :style="{ background: selectedVariant.mockupBg }"
            aria-hidden="true"
          >
            <svg class="mockup-tee" viewBox="0 0 220 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="110" cy="254" rx="80" ry="7" fill="rgba(0,0,0,0.3)" />
              <path d="M 68,10 C 82,32 138,32 152,10 L 220,38 L 196,72 L 165,60 L 165,248 L 55,248 L 55,60 L 24,72 L 0,38 Z" :fill="selectedVariant.mockupColor" />
              <path d="M 68,10 C 82,32 138,32 152,10 C 138,4 82,4 68,10 Z" :fill="selectedVariant.mockupColor" stroke="rgba(0,0,0,0.07)" stroke-width="1" />
              <line x1="55" y1="60" x2="165" y2="60" stroke="rgba(0,0,0,0.06)" stroke-width="1" />
              <text x="110" y="162" text-anchor="middle" dominant-baseline="middle" font-family="Anton, sans-serif" font-size="24" letter-spacing="5" :fill="selectedVariant.mockupTextColor" opacity="0.88">LAHARGNE</text>
              <line x1="80" y1="176" x2="140" y2="176" :stroke="selectedVariant.mockupTextColor" stroke-width="0.7" opacity="0.35" />
            </svg>
          </div>

          <!-- Miniatures (si plusieurs photos pour ce coloris) -->
          <div class="thumb-row" v-if="visibleThumbs.length > 1">
            <button
              v-for="(img, idx) in visibleThumbs"
              :key="idx"
              class="thumb-btn-inline"
              :class="{ active: selectedImageIndex === idx }"
              @click="selectedImageIndex = idx"
            ><img :src="img" :alt="`Vue ${idx + 1}`" /></button>
          </div>

          <!-- Indicateur coloris actif sous le visuel -->
          <div class="visual-label">
            <span class="visual-dot" :style="{ backgroundColor: selectedVariant.hex }"></span>
            {{ selectedVariant.label }}
          </div>
        </div>

        <!-- ===== INFOS ===== -->
        <div class="feature-info" v-scroll-reveal="120">

          <!-- Nom & prix -->
          <div class="feature-header">
            <h3 class="feature-name">{{ product.name }}</h3>
            <span class="feature-price">{{ product.price }}</span>
          </div>

          <p class="feature-desc">{{ product.description }}</p>

          <div class="feature-divider"></div>

          <!-- Sélecteur de coloris -->
          <div class="variant-selector">
            <div class="selector-label">
              Coloris
              <span class="selector-current">— {{ selectedVariant.label }}</span>
            </div>

            <div class="swatches-row">
              <button
                v-for="v in product.variants"
                :key="v.id"
                class="swatch-btn"
                :class="{ active: selectedVariant.id === v.id }"
                :style="{ '--c': v.hex }"
                :title="v.label"
                :aria-label="v.label"
                :aria-pressed="selectedVariant.id === v.id"
                @click="selectedVariant = v"
              ></button>
            </div>
          </div>


          <!-- Détails produit (composition) -->
          <ul class="feature-details">
            <li v-for="(d, i) in product.details" :key="i" class="detail-item">
              <span class="detail-dash">—</span> {{ d }}
            </li>
          </ul>

          <!-- CTA -->
          <button class="btn-primary feature-cta" @click="openProductPage">
            Voir le produit & commander
          </button>

        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* ── Visuel inner : image + miniatures côte à côte ── */
.visual-inner {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: stretch;
}

.visual-main {
  flex: 1;
  min-width: 0;
}

/* ── Miniatures en colonne ── */
.thumb-col {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 64px;
  flex-shrink: 0;
}

.thumb-btn {
  width: 64px;
  height: 64px;
  border: 1px solid var(--color-border);
  background: none;
  padding: 2px;
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.2s;
  flex-shrink: 0;
}

.thumb-btn img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.thumb-btn.active {
  border-color: var(--color-accent);
}

.thumb-btn:hover {
  border-color: rgba(255,255,255,0.4);
}

.collection {
  padding: var(--spacing-section) 0;
  background-color: var(--color-bg);
}

/* ---- En-tête ---- */
.collection-header {
  display: flex;
  align-items: baseline;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 72px;
}

.collection-tag {
  font-family: var(--font-body);
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-muted);
}

/* ============================
   FEATURE PRODUIT — layout 2 col
   ============================ */
.product-feature {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

/* ---- Colonne visuelle ---- */
.feature-visual {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.feature-img {
  width: 100%;
  max-height: 600px;
  object-fit: cover;
  object-position: center center;
  border-radius: var(--border-radius);
}

.feature-mockup {
  width: 100%;
  aspect-ratio: 2 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius);
  position: relative;
  overflow: hidden;
}

.mockup-tee {
  width: 72%;
  height: auto;
  filter: drop-shadow(0 16px 40px rgba(0, 0, 0, 0.55));
  /* Transition douce quand le coloris change */
  transition: filter 0.3s ease;
}

/* Nom du coloris sous le visuel */
.visual-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-body);
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.visual-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid rgba(255,255,255,0.15);
  transition: background-color 0.3s ease;
}

/* ---- Colonne infos ---- */
.feature-info {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.feature-header {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.feature-name {
  font-family: var(--font-title);
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-accent);
  line-height: 1.05;
}

.feature-price {
  font-family: var(--font-title);
  font-size: 2rem;
  letter-spacing: 0.04em;
  color: var(--color-text);
}

.feature-desc {
  font-family: var(--font-body);
  font-size: 0.92rem;
  line-height: 1.75;
  color: var(--color-muted);
}

.feature-divider {
  height: 1px;
  background-color: var(--color-border);
}

/* Sélecteur du haut — caché sur desktop, visible sur mobile */
.variant-selector-top {
  display: none !important;
}

/* ---- Sélecteur coloris ---- */
.variant-selector {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.selector-label {
  font-family: var(--font-title);
  font-size: 0.78rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.thumb-row {
  display: flex;
  gap: 6px;
}

.thumb-btn-inline {
  width: 56px;
  height: 56px;
  border: 1px solid var(--color-border);
  background: none;
  padding: 2px;
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.2s;
  flex-shrink: 0;
}

.thumb-btn-inline img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

.thumb-btn-inline.active {
  border-color: var(--color-accent);
}

.thumb-btn-inline:hover {
  border-color: rgba(255,255,255,0.4);
}

.selector-current {
  color: var(--color-accent);
  font-family: var(--font-body);
  text-transform: none;
  letter-spacing: 0;
  font-size: 0.85rem;
}

.swatches-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.swatch-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--c);
  border: none;
  cursor: pointer;
  position: relative;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.swatch-btn:hover {
  transform: scale(1.18);
}

/* Anneau blanc autour du swatch actif */
.swatch-btn.active {
  box-shadow:
    0 0 0 2px var(--color-bg),
    0 0 0 4px var(--color-accent);
  transform: scale(1.12);
}

/* ---- Détails produit ---- */
.feature-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  list-style: none;
}

.detail-item {
  font-family: var(--font-body);
  font-size: 0.84rem;
  color: var(--color-muted);
  display: flex;
  gap: 10px;
}

.detail-dash {
  color: var(--color-border);
  flex-shrink: 0;
}

/* ---- CTA ---- */
.feature-cta {
  width: 100%;
  justify-content: center;
  padding: 14px;
  font-size: 1.25rem;
  margin-top: 4px;
}

/* ---- Responsive ---- */
@media (max-width: 900px) {
  .product-feature {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  /* Affiche le sélecteur au-dessus de l'image */
  .variant-selector-top {
    display: flex !important;
  }

  /* Cache celui dans feature-info */
  .feature-info .variant-selector {
    display: none;
  }

  .feature-mockup,
  .feature-img {
    aspect-ratio: 3 / 4;
    max-height: 75vh;
  }
}

@media (max-width: 480px) {
  .feature-mockup,
  .feature-img {
    aspect-ratio: 3 / 4;
    max-height: 80vh;
  }
}
</style>
