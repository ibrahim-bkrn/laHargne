<script setup>
/**
 * PanierView.vue — Page /panier
 *
 * Layout 2 colonnes : liste des articles (large) + résumé sticky (total + CTA).
 * Sur mobile, le résumé devient une barre fixe en bas d'écran.
 * CTA vers /commander (autorisé uniquement depuis cette page, cf. router).
 */
import { useCart } from '../composables/useCart'
import { useSeoMeta } from '../composables/useSeoMeta'

useSeoMeta({
  title: 'Mon panier — LAHARGNE',
  description: 'Retrouve les articles de ton panier LAHARGNE et passe commande.',
  path: '/panier',
})

const { items, total, updateQty, removeItem } = useCart()

function formatPrice(value) {
  return `${value.toFixed(2).replace('.', ',')} €`
}
</script>

<template>
  <section class="panier-page">
    <div class="container">
      <h1 class="section-title">Mon panier</h1>

      <!-- Panier vide -->
      <div v-if="items.length === 0" class="panier-empty">
        <svg
          class="panier-empty-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <p class="panier-empty-title">Ton panier est vide</p>
        <p class="panier-empty-text">Découvre la première collection et trouve ton coloris.</p>
        <router-link to="/" class="btn-primary">Voir la collection</router-link>
      </div>

      <!-- Panier rempli -->
      <div v-else class="panier-grid">

        <!-- ===== Colonne gauche : articles ===== -->
        <div class="panier-main">
          <!-- En-têtes de colonnes -->
          <div class="panier-head">
            <span class="panier-head-produit">Produit</span>
            <span class="panier-head-qty">Quantité</span>
            <span class="panier-head-subtotal">Sous-total</span>
          </div>

          <ul class="panier-list">
            <li v-for="item in items" :key="`${item.id}-${item.format}-${item.couleur}`" class="panier-row">
              <div class="panier-row-produit">
                <img v-if="item.image" :src="item.image" :alt="item.nom" class="panier-row-img" />
                <div class="panier-row-info">
                  <span class="panier-row-name">{{ item.nom }}</span>
                  <span class="panier-row-variant">
                    <span
                      v-if="item.couleurHex"
                      class="variant-dot"
                      :style="{ backgroundColor: item.couleurHex }"
                      aria-hidden="true"
                    ></span>
                    {{ item.couleur }} — Taille {{ item.format }}
                  </span>
                </div>
              </div>

              <div class="panier-row-qty">
                <button
                  type="button"
                  @click="updateQty(item.id, item.format, item.couleur, item.qty - 1)"
                  aria-label="Diminuer la quantité"
                >−</button>
                <span class="qty-value">{{ item.qty }}</span>
                <button
                  type="button"
                  @click="updateQty(item.id, item.format, item.couleur, item.qty + 1)"
                  aria-label="Augmenter la quantité"
                >+</button>
              </div>

              <div class="panier-row-subtotal">
                <span>{{ formatPrice(item.prix * item.qty) }}</span>
                <button
                  type="button"
                  class="panier-row-remove"
                  @click="removeItem(item.id, item.format, item.couleur)"
                  aria-label="Supprimer l'article"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M3 6h18" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                  </svg>
                </button>
              </div>
            </li>
          </ul>

          <router-link to="/" class="panier-continue">← Continuer mes achats</router-link>
        </div>

        <!-- ===== Colonne droite : résumé (sticky) ===== -->
        <aside class="panier-summary">
          <h2 class="panier-summary-title">Résumé</h2>
          <div class="panier-total">
            <span>Total</span>
            <span>{{ formatPrice(total) }}</span>
          </div>
          <router-link to="/commander" class="btn-primary panier-cta">
            Passer commande
          </router-link>
        </aside>

      </div>
    </div>
  </section>
</template>

<style scoped>
.panier-page {
  padding: 140px 0 var(--spacing-section);
  min-height: 60vh;
}

/* ---- Panier vide ---- */
.panier-empty {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  margin-top: 48px;
  max-width: 420px;
}

.panier-empty-icon {
  width: 40px;
  height: 40px;
  color: var(--color-muted);
  margin-bottom: 8px;
}

.panier-empty-title {
  font-family: var(--font-title);
  font-size: 1.6rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.panier-empty-text {
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--color-muted);
  margin-bottom: 10px;
}

/* ---- Grille 2 colonnes ---- */
.panier-grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 60px;
  align-items: start;
  margin-top: 40px;
}

/* ---- Colonne gauche ---- */
.panier-main {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* ---- En-têtes de colonnes ---- */
.panier-head {
  display: grid;
  grid-template-columns: 1fr 160px 120px;
  gap: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
}

.panier-head span {
  font-family: var(--font-title);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.panier-head-qty {
  text-align: center;
}

.panier-head-subtotal {
  text-align: right;
}

/* ---- Liste continue (pas de cartes encadrées) ---- */
.panier-list {
  display: flex;
  flex-direction: column;
  list-style: none;
}

.panier-row {
  display: grid;
  grid-template-columns: 1fr 160px 120px;
  gap: 20px;
  align-items: center;
  padding: 24px 0;
  border-bottom: 1px solid var(--color-border);
}

.panier-row-produit {
  display: flex;
  align-items: center;
  gap: 20px;
  min-width: 0;
}

.panier-row-img {
  width: 130px;
  height: 130px;
  flex-shrink: 0;
  object-fit: cover;
  object-position: center top;
  border-radius: var(--border-radius);
  background-color: var(--color-surface);
}

.panier-row-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.panier-row-name {
  font-family: var(--font-title);
  font-size: 1.15rem;
  letter-spacing: 0.03em;
  color: var(--color-accent);
  text-transform: uppercase;
  line-height: 1.1;
}

.panier-row-variant {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-body);
  font-size: 0.82rem;
  color: var(--color-muted);
}

.variant-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.panier-row-qty {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.panier-row-qty button {
  width: 28px;
  height: 28px;
  background: none;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  cursor: pointer;
  border-radius: 50%;
  font-size: 1rem;
  line-height: 1;
  transition: border-color var(--transition-fast), color var(--transition-fast);
}

.panier-row-qty button:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.qty-value {
  min-width: 20px;
  text-align: center;
  font-family: var(--font-body);
  color: var(--color-text);
}

.panier-row-subtotal {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
  font-family: var(--font-title);
  font-size: 1.05rem;
  color: var(--color-text);
  white-space: nowrap;
}

.panier-row-remove {
  background: none;
  border: none;
  color: var(--color-muted);
  cursor: pointer;
  padding: 2px;
  display: flex;
  transition: color var(--transition-fast);
}

.panier-row-remove svg {
  width: 17px;
  height: 17px;
}

.panier-row-remove:hover {
  color: var(--color-accent);
}

.panier-continue {
  align-self: flex-start;
  font-family: var(--font-body);
  font-size: 0.85rem;
  letter-spacing: 0.03em;
  color: var(--color-muted);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.panier-continue:hover {
  color: var(--color-accent);
}

/* ---- Colonne droite : résumé sticky ---- */
.panier-summary {
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 28px;
  position: sticky;
  top: 120px;
}

.panier-summary-title {
  font-family: var(--font-title);
  font-size: 1.2rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.panier-total {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-family: var(--font-title);
  font-size: 1.6rem;
  letter-spacing: 0.04em;
  color: var(--color-accent);
  border-top: 1px solid var(--color-border);
  padding-top: 20px;
}

.panier-cta {
  width: 100%;
  justify-content: center;
  padding: 16px;
  font-size: 1rem;
}

/* ---- Responsive ---- */
@media (max-width: 900px) {
  .panier-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  /* La colonne gauche laisse de la place pour la barre fixe en bas */
  .panier-page {
    padding-bottom: 110px;
  }

  /* En-têtes de colonnes masqués : la ligne passe en 2 rangées sur mobile */
  .panier-head {
    display: none;
  }

  .panier-row {
    grid-template-columns: 1fr auto;
    grid-template-areas:
      'produit produit'
      'qty subtotal';
    row-gap: 16px;
  }

  .panier-row-produit {
    grid-area: produit;
  }

  .panier-row-img {
    width: 100px;
    height: 100px;
  }

  .panier-row-qty {
    grid-area: qty;
    justify-content: flex-start;
  }

  .panier-row-subtotal {
    grid-area: subtotal;
  }

  .panier-row-name {
    font-size: 1.05rem;
  }

  /* Résumé transformé en barre fixe en bas d'écran */
  .panier-summary {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: auto;
    z-index: 900;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    border-radius: 0;
    border-left: none;
    border-right: none;
    border-bottom: none;
    padding: 14px 20px;
    background-color: rgba(26, 26, 26, 0.97);
    backdrop-filter: blur(8px);
  }

  .panier-summary-title {
    display: none;
  }

  .panier-total {
    border-top: none;
    padding-top: 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    font-size: 1.1rem;
  }

  .panier-cta {
    width: auto;
    padding: 13px 26px;
    font-size: 0.85rem;
  }
}
</style>
