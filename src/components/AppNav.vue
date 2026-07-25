<script setup>
/**
 * AppNav.vue — Navigation sticky
 *
 * - Fond transparent → #0D0D0D au scroll
 * - Pas de menu hamburger sur mobile : uniquement logo + panier
 * - Liens ancrés vers chaque section (scroll smooth), visibles desktop uniquement
 */
import { ref, computed, onMounted, onUnmounted } from 'vue'
import MiniCart from './MiniCart.vue'
import { useTexts } from '../composables/useTexts'

const { t, fetchTexts } = useTexts()
fetchTexts()

// État du scroll (pour changer le fond de la nav)
const isScrolled = ref(false)

// Liens de navigation
const navLinks = computed(() => [
  { label: t('nav_lien_collection', 'Collection'), href: '#collection' },
  { label: t('nav_lien_lookbook', 'Lookbook'), href: '#lookbook' },
  { label: t('nav_lien_contact', 'Contact'), href: '#contact' },
])

function handleScroll() {
  isScrolled.value = window.scrollY > 60
}

// Scroll fluide vers la section cible
function goTo(href) {
  const el = document.querySelector(href)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <!-- Barre de navigation principale -->
  <nav class="nav" :class="{ scrolled: isScrolled }">
    <div class="nav-container">
      <!-- Logo -->
      <a href="#" class="nav-logo" @click.prevent="goTo('#hero')" aria-label="LAHARGNE — Accueil">
        <img src="/images/logo-symbole.png" alt="" class="nav-logo-img" />
        <span class="nav-logo-text">{{ t('nav_logo_texte', 'LAHARGNE') }}</span>
      </a>

      <!-- Liens desktop -->
      <ul class="nav-links">
        <li v-for="link in navLinks" :key="link.href">
          <a :href="link.href" class="nav-link" @click.prevent="goTo(link.href)">
            {{ link.label }}
          </a>
        </li>
      </ul>

      <!-- Actions à droite : panier -->
      <div class="nav-actions">
        <MiniCart />
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* ---- Barre principale ---- */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 22px 10px;
  transition:
    background-color 0.35s ease,
    backdrop-filter 0.35s ease,
    padding 0.35s ease,
    border-color 0.35s ease;
  border-bottom: 1px solid transparent;
}

.nav.scrolled {
  background-color: rgba(13, 13, 13, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 14px 0;
  border-bottom-color: var(--color-border);
}

.nav-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* ---- Logo ---- */
.nav-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* ✏️ Espace entre le symbole et le texte "LAHARGNE" (desktop) — ajuste cette valeur */
  gap: 4px;
  text-decoration: none;
  transition: opacity var(--transition-fast);
}

.nav-logo-img {
  /* ✏️ Taille du symbole — augmente/diminue cette valeur */
  height: 52px;
  width: auto;
  display: block;
}

.nav-logo-text {
  font-family: var(--font-title);
  font-size: 1rem;
  letter-spacing: 0.2em;
  color: var(--color-accent);
  text-rendering: geometricPrecision;
  -webkit-font-smoothing: subpixel-antialiased;
  font-kerning: none;
}

.nav-logo:hover {
  opacity: 0.7;
}

/* ---- Liens desktop ---- */
.nav-links {
  display: flex;
  gap: 44px;
  list-style: none;
}

.nav-link {
  font-family: var(--font-title);
  font-size: 1.3rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text);
  text-decoration: none;
  position: relative;
  transition: color var(--transition-fast);
}

/* Soulignement animé au hover */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: var(--color-accent);
  transition: width 0.3s ease;
}
.nav-link:hover {
  color: var(--color-accent);
}
.nav-link:hover::after {
  width: 100%;
}

/* ---- Actions à droite (panier) ---- */
.nav-actions {
  display: flex;
  align-items: center;
}

/* ---- Responsive ---- */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  /* ✏️ Espace entre le symbole et "LAHARGNE" sur mobile uniquement */
  .nav-logo {
    gap: 0px;
  }

  .nav-logo-text {
    letter-spacing: 0.08em;
  }

  /* ✏️ Rapproche le panier du bord droit sur mobile */
  .nav-container {
    padding-right: 16px;
  }
}
</style>
