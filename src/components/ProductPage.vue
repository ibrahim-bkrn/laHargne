<script setup>
/**
 * ProductPage.vue — Page détail produit (overlay plein écran)
 *
 * S'ouvre par-dessus le site quand on clique sur une carte produit.
 * - Sélection de taille
 * - Lien WhatsApp avec taille et nom du produit pré-remplis
 * - Fermeture via bouton ✕ ou clic sur le fond
 */
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
    // Structure attendue :
    // { id, name, price, description, longDescription, details, sizes, image, imageAlt, whatsappUrl }
  },
})

const emit = defineEmits(['close'])

// Taille sélectionnée
const selectedSize = ref('')

// Coloris sélectionné (variante active)
const selectedVariant = ref(null)

// Variante active — retourne la variante sélectionnée ou la première par défaut
const activeVariant = computed(
  () => selectedVariant.value ?? props.product.variants?.[0] ?? {}
)

// L'image à afficher : celle de la variante active si dispo, sinon vide
const activeImage = computed(() => activeVariant.value.image ?? '')

// Lien WhatsApp avec coloris + taille
const whatsappLink = computed(() => {
  const colorText = activeVariant.value.label ? `, coloris ${activeVariant.value.label}` : ''
  const sizeText  = selectedSize.value        ? `, taille ${selectedSize.value}`          : ''
  const message = encodeURIComponent(
    `Bonjour, je suis intéressé(e) par le ${props.product.name}${colorText}${sizeText}. Pouvez-vous me donner plus d'informations ? Merci !`,
  )
  return `${props.product.whatsappUrl}?text=${message}`
})

function selectVariant(variant) {
  selectedVariant.value = variant
}

function close() {
  emit('close')
}

function onKeydown(e) {
  if (e.key === 'Escape') close()
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', onKeydown)
  if (props.product.sizes?.length) selectedSize.value = props.product.sizes[0]
  // Pré-sélectionne la variante cliquée depuis la collection, sinon la première
  if (props.product.variants?.length) {
    const preselected = props.product.activeVariantId
      ? props.product.variants.find(v => v.id === props.product.activeVariantId)
      : null
    selectedVariant.value = preselected ?? props.product.variants[0]
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <!-- Transition d'entrée/sortie de l'overlay -->
  <Transition name="page-overlay" appear>
    <div class="product-page" role="dialog" :aria-label="`Détail : ${product.name}`">

      <!-- Fond semi-transparent — clic pour fermer -->
      <div class="product-backdrop" @click="close" aria-hidden="true"></div>

      <!-- Panneau principal — slide depuis la droite -->
      <Transition name="panel-slide" appear>
        <div class="product-panel">

          <!-- ===== COLONNE IMAGE ===== -->
          <div class="product-visual">
            <!-- Image principale (placeholder si src vide) -->
            <div class="product-image-frame">
              <img
                v-if="activeImage"
                :src="activeImage"
                :alt="product.imageAlt"
                class="product-main-img"
              />

              <!-- Mockup tee-shirt — couleur réactive au coloris sélectionné -->
              <div
                v-else
                class="product-img-placeholder"
                :style="{ background: activeVariant.mockupBg || 'linear-gradient(145deg,#181818,#0d0d0d)' }"
                aria-hidden="true"
              >
                <svg
                  class="placeholder-tee-svg"
                  viewBox="0 0 220 260"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse cx="110" cy="254" rx="80" ry="7" fill="rgba(0,0,0,0.4)" />
                  <path
                    d="M 68,10 C 82,32 138,32 152,10 L 220,38 L 196,72 L 165,60 L 165,248 L 55,248 L 55,60 L 24,72 L 0,38 Z"
                    :fill="activeVariant.mockupColor || '#e8e8e8'"
                  />
                  <path
                    d="M 68,10 C 82,32 138,32 152,10 C 138,4 82,4 68,10 Z"
                    :fill="activeVariant.mockupColor || '#e8e8e8'"
                    stroke="rgba(0,0,0,0.08)" stroke-width="1"
                  />
                  <text
                    x="110" y="168" text-anchor="middle" dominant-baseline="middle"
                    font-family="Anton, sans-serif" font-size="26" letter-spacing="5"
                    :fill="activeVariant.mockupTextColor || '#111'" opacity="0.9"
                  >LAHARGNE</text>
                  <line x1="75" y1="182" x2="145" y2="182"
                    :stroke="activeVariant.mockupTextColor || '#111'"
                    stroke-width="0.8" opacity="0.4" />
                </svg>
                <span class="placeholder-num">0{{ product.id }}</span>
              </div>
            </div>

            <!-- Label catégorie -->
            <div class="product-category">Tee-shirt — Collection 2025</div>
          </div>

          <!-- ===== COLONNE INFO ===== -->
          <div class="product-info">
            <!-- Bouton fermer -->
            <button class="product-close" @click="close" aria-label="Fermer">
              <span class="close-icon">✕</span>
            </button>

            <!-- Contenu scrollable -->
            <div class="product-content">

              <!-- Nom & prix -->
              <header class="product-header">
                <h1 class="product-name">{{ product.name }}</h1>
                <div class="product-price">{{ product.price }}</div>
              </header>

              <!-- Accroche courte -->
              <p class="product-tagline">{{ product.description }}</p>

              <!-- Description longue -->
              <p class="product-long-desc" v-if="product.longDescription">
                {{ product.longDescription }}
              </p>

              <!-- Séparateur -->
              <div class="product-divider"></div>

              <!-- Sélecteur de coloris -->
              <div class="color-selector" v-if="product.variants?.length">
                <div class="selector-label">
                  Coloris
                  <span class="selector-value">— {{ activeVariant.label }}</span>
                </div>
                <div class="color-swatches">
                  <button
                    v-for="v in product.variants"
                    :key="v.id"
                    class="color-swatch-btn"
                    :class="{ active: activeVariant.id === v.id }"
                    :style="{ '--swatch-color': v.hex }"
                    :title="v.label"
                    :aria-label="v.label"
                    :aria-pressed="activeVariant.id === v.id"
                    @click="selectVariant(v)"
                  ></button>
                </div>
              </div>

              <!-- Sélecteur de taille -->
              <div class="size-selector" v-if="product.sizes?.length">
                <div class="size-label">
                  Taille
                  <span v-if="selectedSize" class="size-selected-value">— {{ selectedSize }}</span>
                </div>
                <div class="size-grid">
                  <button
                    v-for="size in product.sizes"
                    :key="size"
                    class="size-btn"
                    :class="{ active: selectedSize === size }"
                    @click="selectedSize = size"
                    :aria-pressed="selectedSize === size"
                  >
                    {{ size }}
                  </button>
                </div>
              </div>

              <!-- CTA WhatsApp -->
              <a
                :href="whatsappLink"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary product-cta-btn"
                :class="{ 'cta-ready': selectedSize }"
              >
                <!-- Icône WhatsApp inline -->
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="cta-icon"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Commander via WhatsApp
              </a>

              <p class="cta-hint" v-if="!selectedSize">
                Sélectionne une taille pour personnaliser ta commande
              </p>

              <!-- Séparateur -->
              <div class="product-divider"></div>

              <!-- Détails produit -->
              <div class="product-details" v-if="product.details?.length">
                <div class="details-title">Composition & détails</div>
                <ul class="details-list">
                  <li v-for="(detail, i) in product.details" :key="i" class="details-item">
                    <span class="details-bullet">—</span>
                    {{ detail }}
                  </li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      </Transition>

    </div>
  </Transition>
</template>

<style scoped>
/* ===== OVERLAY ===== */
.product-page {
  position: fixed;
  inset: 0;
  z-index: 5000;
  display: flex;
  align-items: stretch;
}

.product-backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

/* ===== PANNEAU PRINCIPAL ===== */
.product-panel {
  position: relative;
  z-index: 1;
  margin-left: auto;
  width: 100%;
  max-width: 1080px;
  height: 100%;
  background-color: var(--color-bg);
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  border-left: 1px solid var(--color-border);
}

/* ===== COLONNE IMAGE ===== */
.product-visual {
  position: relative;
  background-color: #111111;
  display: flex;
  flex-direction: column;
}

.product-image-frame {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.product-main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Placeholder image */
.product-img-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(160deg, #131313 0%, #0e0e0e 100%);
}

.placeholder-tee-svg {
  width: 72%;
  height: auto;
  filter: drop-shadow(0 16px 40px rgba(0, 0, 0, 0.6));
}

.placeholder-num {
  position: absolute;
  bottom: 28px;
  left: 28px;
  font-family: var(--font-title);
  font-size: 6rem;
  color: #1c1c1c;
  letter-spacing: -0.04em;
  line-height: 1;
  user-select: none;
}

.product-category {
  padding: 16px 24px;
  font-family: var(--font-body);
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-muted);
  border-top: 1px solid var(--color-border);
}

/* ===== COLONNE INFO ===== */
.product-info {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Bouton fermer */
.product-close {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid var(--color-border);
  color: var(--color-muted);
  cursor: pointer;
  transition:
    border-color var(--transition-fast),
    color var(--transition-fast),
    background-color var(--transition-fast);
  border-radius: var(--border-radius);
}
.product-close:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background-color: rgba(255, 255, 255, 0.05);
}

.close-icon {
  font-size: 0.9rem;
}

/* Contenu scrollable */
.product-content {
  flex: 1;
  overflow-y: auto;
  padding: 48px 40px 48px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  /* Scrollbar fine */
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}
.product-content::-webkit-scrollbar {
  width: 3px;
}
.product-content::-webkit-scrollbar-thumb {
  background: var(--color-border);
}

/* Header nom + prix */
.product-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 24px; /* Espace pour le bouton fermer */
}

.product-name {
  font-family: var(--font-title);
  font-size: clamp(1.8rem, 3.5vw, 2.8rem);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-accent);
  line-height: 1.05;
}

.product-price {
  font-family: var(--font-title);
  font-size: 1.8rem;
  letter-spacing: 0.04em;
  color: var(--color-text);
}

/* Description courte */
.product-tagline {
  font-family: var(--font-body);
  font-size: 0.92rem;
  color: var(--color-muted);
  font-style: italic;
}

/* Description longue */
.product-long-desc {
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--color-text);
  opacity: 0.8;
}

.product-divider {
  height: 1px;
  background-color: var(--color-border);
}

/* ===== SÉLECTEUR COLORIS ===== */
.color-selector {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.selector-label {
  font-family: var(--font-title);
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.selector-value {
  color: var(--color-accent);
  font-family: var(--font-body);
  text-transform: none;
  letter-spacing: 0;
}

.color-swatches {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.color-swatch-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: var(--swatch-color);
  border: 2px solid transparent;
  cursor: pointer;
  position: relative;
  transition: transform 0.2s ease, border-color 0.2s ease;
  /* Anneau de sélection via box-shadow */
  box-shadow: 0 0 0 1px rgba(255,255,255,0.12);
}

.color-swatch-btn:hover {
  transform: scale(1.15);
}

.color-swatch-btn.active {
  /* Anneau blanc autour du swatch sélectionné */
  box-shadow: 0 0 0 2px var(--color-bg), 0 0 0 4px var(--color-accent);
  transform: scale(1.1);
}

/* ===== SÉLECTEUR TAILLE ===== */
.size-selector {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.size-label {
  font-family: var(--font-title);
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.size-selected-value {
  color: var(--color-accent);
  font-family: var(--font-body);
  text-transform: none;
  letter-spacing: 0;
}

.size-grid {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.size-btn {
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

.size-btn:hover {
  border-color: var(--color-text);
  color: var(--color-text);
}

.size-btn.active {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background-color: rgba(255, 255, 255, 0.06);
}

/* ===== CTA WHATSAPP ===== */
.product-cta-btn {
  width: 100%;
  justify-content: center;
  padding: 18px 32px;
  font-size: 0.88rem;
}

.cta-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.cta-hint {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-muted);
  text-align: center;
  opacity: 0.6;
  margin-top: -12px;
}

/* ===== DÉTAILS PRODUIT ===== */
.product-details {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.details-title {
  font-family: var(--font-title);
  font-size: 0.78rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.details-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
}

.details-item {
  display: flex;
  gap: 12px;
  font-family: var(--font-body);
  font-size: 0.88rem;
  color: var(--color-text);
  opacity: 0.75;
  line-height: 1.5;
}

.details-bullet {
  color: var(--color-border);
  flex-shrink: 0;
}

/* ===== TRANSITIONS VUE ===== */
.page-overlay-enter-active,
.page-overlay-leave-active {
  transition: opacity 0.35s ease;
}
.page-overlay-enter-from,
.page-overlay-leave-to {
  opacity: 0;
}

.panel-slide-enter-active {
  animation: panel-in 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}
.panel-slide-leave-active {
  animation: panel-out 0.35s ease;
}

@keyframes panel-in {
  from {
    transform: translateX(100%);
  }
}
@keyframes panel-out {
  to {
    transform: translateX(100%);
  }
}

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .product-panel {
    max-width: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: 45vh 1fr;
    border-left: none;
  }

  .product-visual {
    flex-direction: row;
    height: 100%;
  }

  .product-category {
    display: none;
  }

  .product-content {
    padding: 28px 24px 32px;
  }

  .product-header {
    padding-top: 36px; /* Espace pour bouton fermer sur mobile */
  }
}

@media (max-width: 480px) {
  .product-panel {
    grid-template-rows: 40vh 1fr;
  }
}
</style>
