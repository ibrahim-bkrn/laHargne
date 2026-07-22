<script setup>
/**
 * CommanderView.vue — Page /commander
 *
 * Accessible uniquement en venant de /panier (cf. router.beforeEach dans
 * src/router/index.js). Formulaire de coordonnées + récapitulatif, envoi
 * vers Formspree, puis vidage du panier.
 */
import { ref, computed } from 'vue'
import { useCart } from '../composables/useCart'
import { useSeoMeta } from '../composables/useSeoMeta'

useSeoMeta({
  title: 'Commander — LAHARGNE',
  description: 'Finalise ta commande LAHARGNE : coordonnées de livraison et récapitulatif.',
  path: '/commander',
})

// ✏️ Remplace par ton véritable endpoint Formspree (https://formspree.io/f/XXXXXXX)
const FORM_ENDPOINT = 'https://formspree.io/f/VOTRE_ID_FORMSPREE'

const { items, total, clearCart } = useCart()

const form = ref({
  prenom: '',
  nom: '',
  email: '',
  telephone: '',
  adresse: '',
  codePostal: '',
  ville: '',
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const errorMessage = ref('')

function formatPrice(value) {
  return `${value.toFixed(2).replace('.', ',')} €`
}

const orderSummaryText = computed(() =>
  items.value
    .map((i) => `${i.nom} (taille ${i.format}) x${i.qty} — ${formatPrice(i.prix * i.qty)}`)
    .join('\n'),
)

async function submitOrder() {
  isSubmitting.value = true
  errorMessage.value = ''

  const payload = new FormData()
  payload.append('Prénom', form.value.prenom)
  payload.append('Nom', form.value.nom)
  payload.append('Email', form.value.email)
  payload.append('Téléphone', form.value.telephone)
  payload.append('Adresse', form.value.adresse)
  payload.append('Code postal', form.value.codePostal)
  payload.append('Ville', form.value.ville)
  payload.append('Commande', orderSummaryText.value)
  payload.append('Total', formatPrice(total.value))

  try {
    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: payload,
    })

    if (!response.ok) throw new Error('Envoi refusé')

    clearCart()
    isSubmitted.value = true
  } catch {
    errorMessage.value =
      "Une erreur est survenue lors de l'envoi de la commande. Réessaie ou contacte-nous directement."
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="commander-page">
    <div class="container">

      <!-- Confirmation après envoi -->
      <div v-if="isSubmitted" class="commander-success">
        <h1 class="section-title">Merci pour ta commande !</h1>
        <p>On revient vers toi rapidement pour confirmer les détails et l'expédition.</p>
        <router-link to="/" class="btn-primary">Retour à l'accueil</router-link>
      </div>

      <!-- Formulaire + récapitulatif -->
      <div v-else class="commander-grid">
        <form class="commander-form" @submit.prevent="submitOrder">
          <h1 class="section-title">Tes coordonnées</h1>

          <div class="form-row">
            <label class="form-field">
              <span>Prénom</span>
              <input v-model="form.prenom" type="text" required />
            </label>
            <label class="form-field">
              <span>Nom</span>
              <input v-model="form.nom" type="text" required />
            </label>
          </div>

          <label class="form-field">
            <span>Email</span>
            <input v-model="form.email" type="email" required />
          </label>

          <label class="form-field">
            <span>Téléphone</span>
            <input v-model="form.telephone" type="tel" required />
          </label>

          <label class="form-field">
            <span>Adresse</span>
            <input v-model="form.adresse" type="text" required />
          </label>

          <div class="form-row">
            <label class="form-field form-field-small">
              <span>Code postal</span>
              <input v-model="form.codePostal" type="text" required />
            </label>
            <label class="form-field">
              <span>Ville</span>
              <input v-model="form.ville" type="text" required />
            </label>
          </div>

          <p v-if="errorMessage" class="commander-error">{{ errorMessage }}</p>

          <button
            type="submit"
            class="btn-primary commander-submit"
            :disabled="isSubmitting || items.length === 0"
          >
            {{ isSubmitting ? 'Envoi en cours...' : 'Valider la commande' }}
          </button>
        </form>

        <aside class="commander-summary">
          <h2 class="commander-summary-title">Récapitulatif</h2>

          <ul class="commander-summary-list">
            <li v-for="item in items" :key="`${item.id}-${item.format}`" class="commander-summary-item">
              <img v-if="item.image" :src="item.image" alt="" class="commander-summary-img" />
              <div class="commander-summary-info">
                <span>{{ item.nom }}</span>
                <span class="commander-summary-meta">Taille {{ item.format }} × {{ item.qty }}</span>
              </div>
              <span class="commander-summary-price">{{ formatPrice(item.prix * item.qty) }}</span>
            </li>
          </ul>

          <div class="commander-summary-total">
            <span>Total</span>
            <span>{{ formatPrice(total) }}</span>
          </div>
        </aside>
      </div>

    </div>
  </section>
</template>

<style scoped>
.commander-page {
  padding: 140px 0 var(--spacing-section);
  min-height: 60vh;
}

.commander-success {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  max-width: 480px;
  font-family: var(--font-body);
  color: var(--color-muted);
}

.commander-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 60px;
  align-items: start;
  margin-top: 32px;
}

/* ---- Formulaire ---- */
.commander-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-field-small {
  max-width: 160px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: var(--font-body);
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.form-field input {
  font-family: var(--font-body);
  font-size: 0.95rem;
  text-transform: none;
  letter-spacing: normal;
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 12px 14px;
  transition: border-color var(--transition-fast);
}

.form-field input:focus {
  outline: none;
  border-color: var(--color-accent);
}

.commander-error {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: #e07a6d;
}

.commander-submit {
  margin-top: 8px;
  padding: 16px 32px;
  justify-content: center;
}

.commander-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ---- Récapitulatif ---- */
.commander-summary {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: 120px;
}

.commander-summary-title {
  font-family: var(--font-title);
  font-size: 1.2rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.commander-summary-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  list-style: none;
}

.commander-summary-item {
  display: flex;
  align-items: center;
  gap: 14px;
}

.commander-summary-img {
  width: 48px;
  height: 48px;
  object-fit: cover;
  object-position: center top;
  border-radius: var(--border-radius);
  flex-shrink: 0;
  background-color: var(--color-bg);
}

.commander-summary-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-text);
}

.commander-summary-meta {
  font-size: 0.75rem;
  color: var(--color-muted);
}

.commander-summary-price {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-text);
  white-space: nowrap;
}

.commander-summary-total {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-title);
  font-size: 1.3rem;
  letter-spacing: 0.04em;
  color: var(--color-accent);
  border-top: 1px solid var(--color-border);
  padding-top: 16px;
}

/* ---- Responsive ---- */
@media (max-width: 900px) {
  .commander-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .commander-summary {
    position: static;
  }
}

@media (max-width: 480px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .form-field-small {
    max-width: none;
  }
}
</style>
