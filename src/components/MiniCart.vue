<script setup>
/**
 * MiniCart.vue — Icône panier + dropdown d'aperçu
 *
 * - Le badge affiche le nombre total d'articles (count)
 * - Le clic sur l'icône ouvre/ferme le dropdown manuellement
 * - Le dropdown s'ouvre aussi automatiquement 4s après un ajout (openMiniCart,
 *   déclenché depuis CollectionSection.vue) puis se referme seul
 */
import { useCart } from '../composables/useCart'

const { items, count, total, miniCartOpen, openMiniCart, closeMiniCart, removeItem } = useCart()

function formatPrice(value) {
  return `${value.toFixed(2).replace('.', ',')} €`
}

function toggleDropdown() {
  if (miniCartOpen.value) {
    closeMiniCart()
  } else {
    openMiniCart()
  }
}
</script>

<template>
  <div class="mini-cart">
    <button
      class="cart-btn"
      @click="toggleDropdown"
      aria-label="Aperçu du panier"
      :aria-expanded="miniCartOpen"
    >
      <svg
        class="cart-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      <span v-if="count > 0" class="cart-badge">{{ count }}</span>
    </button>

    <!--
      Teleporté sur <body> pour ne pas rester coincé dans le contexte
      d'empilement de la nav (z-index 1000), qui pourrait passer sous
      d'éventuels overlays plein écran (z-index plus élevé) ailleurs sur le site.
    -->
    <Teleport to="body">
      <Transition name="mini-cart-fade">
        <div v-if="miniCartOpen" class="mini-cart-dropdown" role="dialog" aria-label="Aperçu du panier">
          <p v-if="items.length === 0" class="mini-cart-empty">Ton panier est vide</p>

          <template v-else>
            <ul class="mini-cart-list">
              <li v-for="item in items" :key="`${item.id}-${item.format}`" class="mini-cart-item">
                <img v-if="item.image" :src="item.image" alt="" class="mini-cart-img" />
                <div class="mini-cart-info">
                  <span class="mini-cart-name">{{ item.nom }}</span>
                  <span class="mini-cart-meta">Taille {{ item.format }} × {{ item.qty }}</span>
                </div>
                <button
                  class="mini-cart-remove"
                  @click="removeItem(item.id, item.format)"
                  aria-label="Retirer l'article"
                >✕</button>
              </li>
            </ul>

            <div class="mini-cart-total">
              <span>Total</span>
              <span>{{ formatPrice(total) }}</span>
            </div>

            <router-link to="/panier" class="btn-primary mini-cart-cta" @click="closeMiniCart">
              Voir le panier
            </router-link>
          </template>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.mini-cart {
  position: relative;
}

.cart-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  transition: color var(--transition-fast);
}

.cart-btn:hover {
  color: var(--color-accent);
}

.cart-icon {
  width: 22px;
  height: 22px;
}

.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 50%;
  background-color: var(--color-accent);
  color: var(--color-bg);
  font-family: var(--font-body);
  font-size: 0.65rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

/* ---- Dropdown (teleporté sur <body>, positionné en fixed) ---- */
.mini-cart-dropdown {
  position: fixed;
  top: 84px;
  right: 24px;
  width: 320px;
  max-width: calc(100vw - 48px);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* Reste au-dessus des autres éléments de la page (menu mobile, etc.) */
  z-index: 5100;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
}

.mini-cart-empty {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-muted);
  text-align: center;
  padding: 12px 0;
}

.mini-cart-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  list-style: none;
  max-height: 260px;
  overflow-y: auto;
}

.mini-cart-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mini-cart-img {
  width: 48px;
  height: 48px;
  object-fit: cover;
  object-position: center top;
  border-radius: var(--border-radius);
  flex-shrink: 0;
  background-color: var(--color-bg);
}

.mini-cart-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.mini-cart-name {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mini-cart-meta {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-muted);
}

.mini-cart-remove {
  background: none;
  border: none;
  color: var(--color-muted);
  cursor: pointer;
  font-size: 0.8rem;
  padding: 4px;
  flex-shrink: 0;
  transition: color var(--transition-fast);
}

.mini-cart-remove:hover {
  color: var(--color-accent);
}

.mini-cart-total {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-title);
  font-size: 1rem;
  letter-spacing: 0.05em;
  color: var(--color-text);
  border-top: 1px solid var(--color-border);
  padding-top: 12px;
}

.mini-cart-cta {
  width: 100%;
  justify-content: center;
  padding: 12px;
  font-size: 0.85rem;
}

/* ---- Transition ---- */
.mini-cart-fade-enter-active,
.mini-cart-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.mini-cart-fade-enter-from,
.mini-cart-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
