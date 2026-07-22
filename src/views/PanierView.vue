<script setup>
/**
 * PanierView.vue — Page /panier
 *
 * Liste des articles du panier, quantité modifiable, suppression, total.
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
        <p>Ton panier est vide pour le moment.</p>
        <router-link to="/" class="btn-outline">Retour à la boutique</router-link>
      </div>

      <!-- Panier rempli -->
      <div v-else class="panier-content">
        <ul class="panier-list">
          <li v-for="item in items" :key="`${item.id}-${item.format}`" class="panier-item">
            <img v-if="item.image" :src="item.image" :alt="item.nom" class="panier-item-img" />

            <div class="panier-item-info">
              <span class="panier-item-name">{{ item.nom }}</span>
              <span class="panier-item-format">Taille {{ item.format }}</span>
              <span class="panier-item-price">{{ formatPrice(item.prix) }}</span>
            </div>

            <div class="panier-item-qty">
              <button
                type="button"
                @click="updateQty(item.id, item.format, item.qty - 1)"
                aria-label="Diminuer la quantité"
              >−</button>
              <span class="qty-value">{{ item.qty }}</span>
              <button
                type="button"
                @click="updateQty(item.id, item.format, item.qty + 1)"
                aria-label="Augmenter la quantité"
              >+</button>
            </div>

            <span class="panier-item-subtotal">{{ formatPrice(item.prix * item.qty) }}</span>

            <button
              type="button"
              class="panier-item-remove"
              @click="removeItem(item.id, item.format)"
              aria-label="Supprimer l'article"
            >Supprimer</button>
          </li>
        </ul>

        <div class="panier-summary">
          <div class="panier-total">
            <span>Total</span>
            <span>{{ formatPrice(total) }}</span>
          </div>
          <router-link to="/commander" class="btn-primary panier-cta">
            Passer commande
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.panier-page {
  padding: 140px 0 var(--spacing-section);
  min-height: 60vh;
}

.panier-empty {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  margin-top: 32px;
  font-family: var(--font-body);
  color: var(--color-muted);
}

.panier-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 40px;
}

.panier-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  list-style: none;
}

.panier-item {
  display: grid;
  grid-template-columns: 72px 1fr auto auto auto;
  align-items: center;
  gap: 20px;
  padding: 16px 0;
  border-bottom: 1px solid var(--color-border);
}

.panier-item-img {
  width: 72px;
  height: 72px;
  object-fit: cover;
  object-position: center top;
  border-radius: var(--border-radius);
  background-color: var(--color-surface);
}

.panier-item-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.panier-item-name {
  font-family: var(--font-title);
  font-size: 1.1rem;
  letter-spacing: 0.03em;
  color: var(--color-accent);
  text-transform: uppercase;
}

.panier-item-format {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-muted);
}

.panier-item-price {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-text);
}

.panier-item-qty {
  display: flex;
  align-items: center;
  gap: 12px;
}

.panier-item-qty button {
  width: 30px;
  height: 30px;
  background: none;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  cursor: pointer;
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: border-color var(--transition-fast), color var(--transition-fast);
}

.panier-item-qty button:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.qty-value {
  min-width: 20px;
  text-align: center;
  font-family: var(--font-body);
  color: var(--color-text);
}

.panier-item-subtotal {
  font-family: var(--font-title);
  font-size: 1rem;
  color: var(--color-text);
  white-space: nowrap;
}

.panier-item-remove {
  background: none;
  border: none;
  color: var(--color-muted);
  font-family: var(--font-body);
  font-size: 0.78rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  transition: color var(--transition-fast);
  white-space: nowrap;
}

.panier-item-remove:hover {
  color: var(--color-accent);
}

.panier-summary {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
}

.panier-total {
  display: flex;
  gap: 24px;
  font-family: var(--font-title);
  font-size: 1.6rem;
  letter-spacing: 0.04em;
  color: var(--color-accent);
}

.panier-cta {
  padding: 16px 40px;
}

/* ---- Responsive ---- */
@media (max-width: 700px) {
  .panier-item {
    grid-template-columns: 56px 1fr auto;
    grid-template-areas:
      'img info remove'
      'img qty subtotal';
    row-gap: 10px;
  }

  .panier-item-img { grid-area: img; width: 56px; height: 56px; }
  .panier-item-info { grid-area: info; }
  .panier-item-remove { grid-area: remove; }
  .panier-item-qty { grid-area: qty; }
  .panier-item-subtotal { grid-area: subtotal; text-align: right; }
}
</style>
