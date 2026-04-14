<script setup>
/**
 * AppFooter.vue — Pied de page minimal
 *
 * L'année est calculée dynamiquement.
 * ✏️ Modifiez le texte de copyright si besoin.
 */
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <!-- Logo texte -->
      <span class="footer-logo" aria-label="LAHARGNE">LAHARGNE</span>

      <!-- Copyright -->
      <!-- ✏️ Modifiez ce texte si besoin -->
      <p class="footer-copy">
        &copy; {{ year }} LAHARGNE — Tous droits réservés
      </p>

      <p class="footer-credit">
        Site réalisé par
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
  font-family: var(--font-title);
  font-size: 1.3rem;
  letter-spacing: 0.18em;
  color: var(--color-accent);
  opacity: 0.6;
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
