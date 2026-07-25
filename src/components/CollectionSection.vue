<script setup>
/**
 * CollectionSection.vue — Présentation du produit unique avec 6 coloris
 *
 * ✏️ Un seul produit, 6 variantes de couleur.
 * Modifiez `product` pour mettre à jour les infos.
 * Modifiez `product.variants` pour changer les coloris.
 */
import { ref, computed, watch } from 'vue'
import { useCart } from '../composables/useCart'
import { useStock } from '../composables/useStock'
import { useTexts } from '../composables/useTexts'

// ✏️ LE PRODUIT — un seul modèle, plusieurs coloris
const product = {
  id: 1,
  name: 'TEE-SHIRT LAHARGNE',
  price: '15.90 €',
  oldPrice: '34.90 €',
  description: 'Prix de lancement à durée limitée, retour à 34,9 € prochainement',
    details: [
    '100% coton biologique 185g/m²',
    'Coupe oversize ',
    'Impression sérigraphie — logo LAHARGNE',
  ],
  sizes: ['XS','S', 'M', 'L', 'XL', 'XXL'],
  // ✏️ COLORIS — ajoutez l'image de chaque coloris quand vous l'avez
  // stock : valeur de secours utilisée si la feuille Google Sheets (useStock.js)
  // est injoignable. En temps normal, le stock réel vient de cette feuille.
  variants: [
    { id: 'blanc', label: 'Gris foncé',  hex: '#4A4A4A', images: ['/images/t-shirt-grisfonce_3_11zon.webp', '/images/tshirt-grisfonce2_1_11zon.webp'], mockupColor: '#4A4A4A', mockupTextColor: '#111111', mockupBg: 'linear-gradient(145deg,#1e1e1e,#111)',    stock: { L: 1, XXL: 1 } },
    { id: 'noir',  label: 'Noir',        hex: '#1C1C1C', images: ['/images/imageProduitNoir_19_11zon.webp',  '/images/imageProduitNoirFace_21_11zon.webp'], mockupColor: '#242424', mockupTextColor: '#ffffff',  mockupBg: 'linear-gradient(145deg,#2a2a2a,#111)',    stock: { XL: 1, L: 1 } },
    { id: 'gris',  label: 'Gris',        hex: '#CCCCCC', images: ['/images/imageProduitGris - Copie_14_11zon.webp',  '/images/imageProduitGrisff_18_11zon.webp'], mockupColor: '#CCCCCC', mockupTextColor: '#f0f0f0',  mockupBg: 'linear-gradient(145deg,#222,#111)',       stock: { M: 1, XL: 1 } },
    { id: 'bleu',  label: 'Bleu Marine', hex: '#2D4B7A', images: ['/images/imageProduitBleueFoncé_13.webp', '/images/imagePorduitBleueF_11_11zon.webp'], mockupColor: '#2d4b7a', mockupTextColor: '#ddeeff',  mockupBg: 'linear-gradient(145deg,#0e1824,#0d0d0d)', stock: { M: 1, XL: 1 } },
    { id: 'kaki',  label: 'Vert clair',  hex: '#C5C7B5', images: ['/images/tshirt-vert_11zon.webp', '/images/imageProduitVertF_3_11zon.webp'],      mockupColor: '#C5C7B5', mockupTextColor: '#f0f0f0',  mockupBg: 'linear-gradient(145deg,#181e12,#0d0d0d)', stock: { S: 2 } },
    { id: 'Rose',  label: 'Rose',        hex: '#EFBCB9', images: ['/images/tshirt-rose_2_11zon.webp', '/images/teeshirtrose-2_11zon.webp'], mockupColor: '#EFBCB9', mockupTextColor: '#f5e8e8',  mockupBg: 'linear-gradient(145deg,#1e1014,#0d0d0d)', stock: { S: 2 } },
  ],
}

// Stock en direct (Google Sheets) — fetchStock() est lancé une seule fois
// au montage ; remoteStock reste null tant que non chargé ou en cas d'échec
const { remoteStock, fetchStock } = useStock()
fetchStock()

// Textes en direct (même principe)
const { remoteTexts, t, fetchTexts } = useTexts()
fetchTexts()

// Prix affiché (texte) et prix barré — le prix barré disparaît complètement
// si sa cellule est vide dans la feuille (fin de promo), mais retombe sur
// la valeur codée en dur si la feuille est simplement injoignable
const displayPrice = computed(() => t('produit_prix', product.price))
const oldPriceText = computed(() => {
  if (remoteTexts.value === null) return product.oldPrice
  return remoteTexts.value.produit_ancien_prix || ''
})

// Stock d'un coloris : celui de la feuille en direct si dispo, sinon la valeur
// de secours codée en dur sur le variant
function stockFor(variant) {
  return remoteStock.value?.[variant.label] ?? variant.stock ?? {}
}

// Première taille en stock pour un coloris donné, sinon vide
function firstAvailableSize(variant) {
  const stock = stockFor(variant)
  return product.sizes.find(size => (stock[size] ?? 0) > 0) ?? ''
}

const selectedVariant = ref(product.variants.find(v => v.id === 'Rose') ?? product.variants[0])
const selectedImageIndex = ref(0)
const selectedSize = ref(firstAvailableSize(selectedVariant.value))

// La disponibilité des tailles dépend du coloris choisi.
// Une taille sans stock reste sélectionnable : elle passe en précommande
// (délai de 10 à 12 jours) plutôt que d'être bloquée.
function isSizeAvailable(size) {
  return (stockFor(selectedVariant.value)[size] ?? 0) > 0
}

const isPreorder = computed(() => selectedSize.value !== '' && !isSizeAvailable(selectedSize.value))

watch(selectedVariant, (variant) => {
  selectedImageIndex.value = 0
  // Présélectionne une taille disponible en stock pour le nouveau coloris
  selectedSize.value = firstAvailableSize(variant)
})

const activeImage = computed(() => selectedVariant.value.images[selectedImageIndex.value] ?? '')
const visibleThumbs = computed(() => selectedVariant.value.images.filter(img => img !== ''))

// Prix numérique — displayPrice est une chaîne formatée type "15.90 €"
const numericPrice = computed(() => parseFloat(displayPrice.value) || 0)

const { addItem } = useCart()

function addToCart() {
  addItem({
    id: product.id,
    nom: t('produit_nom', product.name),
    format: selectedSize.value,
    couleur: selectedVariant.value.label,
    couleurHex: selectedVariant.value.hex,
    prix: numericPrice.value,
    image: selectedVariant.value.images?.[0] ?? '',
    precommande: isPreorder.value,
  })
}
</script>

<template>
  <section class="collection" id="collection">
    <div class="container">

      <!-- En-tête -->
      <header class="collection-header" v-scroll-reveal>
        <h2 class="section-title">{{ t('collection_titre_section', 'Première Collection') }}</h2>
      </header>

      <!-- Feature produit : image gauche + info droite -->
      <div class="product-feature">

        <!-- ===== SÉLECTEUR COLORIS (au-dessus de l'image sur mobile) ===== -->
        <div class="variant-selector variant-selector-top">
          <div class="selector-label">
            {{ t('collection_label_coloris', 'Coloris') }}
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
            <h3 class="feature-name">
              {{ t('produit_nom', product.name) }}
              <span class="feature-badge">{{ t('collection_badge_edition', 'Édition limitée') }}</span>
            </h3>
            <div class="feature-price-row">
              <span class="feature-price">{{ displayPrice }}</span>
              <span v-if="oldPriceText" class="feature-price-old">{{ oldPriceText }}</span>
            </div>
          </div>

          <p class="feature-desc">{{ t('produit_description', product.description) }}</p>

          <!-- Sélecteur de coloris -->
          <div class="variant-selector">
            <div class="selector-label">
              {{ t('collection_label_coloris', 'Coloris') }}
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

          <!-- Sélecteur de taille -->
          <div class="size-selector">
            <div class="selector-label">
              {{ t('collection_label_taille', 'Taille') }}
              <span v-if="selectedSize" class="selector-current">— {{ selectedSize }}</span>
            </div>

            <div class="size-grid">
              <button
                v-for="size in product.sizes"
                :key="size"
                class="size-btn"
                :class="{ active: selectedSize === size, preorder: !isSizeAvailable(size), 'in-stock': isSizeAvailable(size) }"
                @click="selectedSize = size"
                :aria-pressed="selectedSize === size"
                :aria-label="isSizeAvailable(size) ? size : `${size} — en précommande`"
              >
                {{ size }}
              </button>
            </div>

            <p v-if="isPreorder" class="size-preorder-hint">
              {{ t('collection_hint_precommande', 'Précommande — disponible sous 10 à 12 jours') }}
            </p>
          </div>

          <!-- Détails produit (composition) -->
          <ul class="feature-details">
            <li v-for="(d, i) in [t('produit_detail_1', product.details[0]), t('produit_detail_2', product.details[1]), t('produit_detail_3', product.details[2])]" :key="i" class="detail-item">
              <span class="detail-dash">—</span> {{ d }}
            </li>
          </ul>

          <!-- CTA -->
          <button
            class="btn-primary feature-cta"
            :disabled="!selectedSize"
            @click="addToCart"
          >
            {{ isPreorder ? t('collection_bouton_precommander', 'Précommander') : t('collection_bouton_ajouter', 'Ajouter au panier') }}
          </button>
          <p class="feature-cta-hint" v-if="!selectedSize">
            {{ t('collection_hint_cta', 'Sélectionne une taille pour ajouter au panier') }}
          </p>

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
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.feature-badge {
  font-family: var(--font-body);
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-bg);
  background-color: var(--color-accent);
  padding: 5px 10px;
  border-radius: var(--border-radius);
  white-space: nowrap;
}

.feature-price-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.feature-price {
  font-family: var(--font-title);
  font-size: 2rem;
  letter-spacing: 0.04em;
  color: var(--color-text);
}

.feature-price-old {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-muted);
  text-decoration: line-through;
}

.feature-desc {
  font-family: var(--font-body);
  font-size: 0.92rem;
  line-height: 1.75;
  color: var(--color-muted);
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

/* ---- Sélecteur taille ---- */
.size-selector {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.size-grid {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.size-btn {
  position: relative;
  min-width: 52px;
  height: 44px;
  padding: 0 14px;
  font-family: var(--font-title);
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition:
    border-color var(--transition-fast),
    color var(--transition-fast),
    background-color var(--transition-fast);
}

/* Point plein = taille disponible immédiatement (pas de précommande) */
.size-btn.in-stock::after {
  content: '';
  position: absolute;
  top: 5px;
  right: 6px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--color-accent);
  opacity: 0.7;
}

.size-btn:hover {
  border-color: var(--color-text);
  color: var(--color-text);
}

.size-btn.active {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background-color: rgba(255, 255, 255, 0.06);
}

/* Taille sans stock : reste cliquable, juste un repère visuel discret (précommande) */
.size-btn.preorder {
  border-style: dashed;
}

.size-preorder-hint {
  font-family: var(--font-body);
  font-size: 0.78rem;
  color: var(--color-muted);
  opacity: 0.85;
}

/* ---- CTA ---- */
.feature-cta {
  width: 100%;
  justify-content: center;
  padding: 14px;
  font-size: 1.25rem;
  margin-top: 4px;
}

.feature-cta:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.feature-cta-hint {
  font-family: var(--font-body);
  font-size: 0.78rem;
  color: var(--color-muted);
  text-align: center;
  opacity: 0.7;
  margin-top: -16px;
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
