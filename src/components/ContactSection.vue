<script setup>
/**
 * ContactSection.vue — Boutons de contact Instagram & WhatsApp
 *
 * Les liens sont passés depuis App.vue via props.
 * Modifiez les constantes INSTAGRAM_URL et WHATSAPP_NUMBER dans App.vue.
 */
import { useTexts } from '../composables/useTexts'

const { t, fetchTexts } = useTexts()
fetchTexts()

defineProps({
  instagramUrl: {
    type: String,
    required: true,
  },
  whatsappUrl: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section class="contact" id="contact">
    <div class="container">

      <!-- En-tête -->
      <header class="contact-header" v-scroll-reveal>
        <h2 class="section-title">{{ t('contact_titre_section', 'Nous Contacter') }}</h2>
        <p class="contact-tagline">
          {{ t('contact_accroche', 'Pour toute commande ou question, on est là.') }}
        </p>
      </header>

      <!-- Deux gros boutons d'action -->
      <div class="contact-buttons" v-scroll-reveal="120">

        <!-- Bouton Instagram -->
        <a
          v-if="instagramUrl"
          :href="instagramUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-outline contact-btn"
        >
          <!-- Icône Instagram (SVG inline) -->
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="contact-icon"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
          </svg>
          {{ t('contact_bouton_instagram', 'Instagram') }}
        </a>

        <!-- Bouton WhatsApp -->
        <a
          v-if="whatsappUrl"
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-outline contact-btn"
        >
          <!-- Icône WhatsApp (SVG inline — logo officiel simplifié) -->
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            class="contact-icon"
            aria-hidden="true"
          >
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
            />
          </svg>
          {{ t('contact_bouton_whatsapp', 'WhatsApp') }}
        </a>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* ---- Section ---- */
.contact {
  padding: var(--spacing-section) 0;
  background-color: var(--color-bg);
  border-top: 1px solid var(--color-border);
}

/* ---- En-tête ---- */
.contact-header {
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.contact-tagline {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-muted);
  max-width: 420px;
}

/* ---- Boutons côte à côte ---- */
.contact-buttons {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

/* Chaque bouton prend la place disponible mais garde une largeur minimum */
.contact-btn {
  flex: 1;
  min-width: 200px;
  max-width: 340px;
  justify-content: center;
  font-size: 1rem;
  padding: 22px 36px;
  /* Transition un peu plus lente pour que ça soit plus prononcé */
  transition:
    background-color 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease,
    border-color 0.25s ease;
}

.contact-icon {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
}

/* ---- Responsive ---- */
@media (max-width: 520px) {
  .contact-buttons {
    flex-direction: column;
  }

  .contact-btn {
    max-width: none;
  }
}
</style>
