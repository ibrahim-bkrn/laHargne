<script setup>
/**
 * AppFooter.vue — Pied de page minimal
 *
 * L'année est calculée dynamiquement et remplace "{année}" dans le texte
 * de copyright venant de la feuille de textes.
 */
import { computed } from 'vue'
import { useTexts } from '../composables/useTexts'

const { t, fetchTexts } = useTexts()
fetchTexts()

const year = new Date().getFullYear()

const copyText = computed(() =>
  t('footer_copyright', '© {année} LAHARGNE — Tous droits réservés').replace('{année}', year),
)
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <!-- Logo -->
      <div class="footer-logo">
        <img src="/images/logo-symbole.png" alt="" class="footer-logo-img" />
        <span class="footer-logo-text">LAHARGNE</span>
      </div>

      <!-- Copyright -->
      <p class="footer-copy">
        {{ copyText }}
      </p>

      <p class="footer-credit">
        {{ t('footer_credit_intro', 'Site réalisé par') }}
        <a
          href="https://ib-studio.fr"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-credit-link"
        >IB Studio</a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-bg);
  border-top: 1px solid var(--color-border);
  padding: 52px 0;
}

.footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  text-align: center;
}

.footer-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  opacity: 0.6;
}

.footer-logo-img {
  height: 80px;
  width: auto;
}

.footer-logo-text {
  font-family: var(--font-title);
  font-size: 1.35rem;
  letter-spacing: 0.2em;
  color: var(--color-accent);
}

.footer-copy {
  font-family: var(--font-body);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  color: var(--color-muted);
  opacity: 0.7;
}

.footer-credit {
  font-family: var(--font-body);
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  color: var(--color-muted);
  opacity: 0.4;
}

.footer-credit-link {
  color: var(--color-muted);
  text-decoration: none;
  border-bottom: 1px solid var(--color-border);
  transition: color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease;
}

.footer-credit-link:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
  opacity: 1;
}
</style>
