<script setup>
/**
 * AppNav.vue — Navigation sticky
 *
 * - Fond transparent → #0D0D0D au scroll
 * - Hamburger menu fullscreen sur mobile
 * - Liens ancrés vers chaque section (scroll smooth)
 */
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

defineProps({
  instagramUrl: {
    type: String,
    required: true,
  },
})

const router = useRouter()

// État du scroll (pour changer le fond de la nav)
const isScrolled = ref(false)

// État du menu hamburger mobile
const menuOpen = ref(false)

// Liens de navigation — modifiez les labels et hrefs si besoin
const navLinks = [
  { label: 'Collection', href: '#collection' },
  { label: 'Lookbook', href: '#lookbook' },
  { label: 'Contact', href: '#contact' },
]

function handleScroll() {
  isScrolled.value = window.scrollY > 60
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
  // Bloque le scroll de la page quand le menu mobile est ouvert
  document.body.style.overflow = menuOpen.value ? 'hidden' : ''
}

function closeMenu() {
  menuOpen.value = false
  document.body.style.overflow = ''
}

// Scroll fluide vers la section cible et ferme le menu mobile
function goTo(href) {
  closeMenu()
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
  // Sécurité : rétablit le scroll si le composant est démonté pendant que le menu est ouvert
  document.body.style.overflow = ''
})
</script>

<template>
  <!-- Barre de navigation principale -->
  <nav class="nav" :class="{ scrolled: isScrolled }">
    <div class="nav-container">
      <!-- Logo -->
      <a href="#" class="nav-logo" @click.prevent="goTo('#hero')">LAHARGNE</a>

      <!-- Liens desktop -->
      <ul class="nav-links">
        <li v-for="link in navLinks" :key="link.href">
          <a :href="link.href" class="nav-link" @click.prevent="goTo(link.href)">
            {{ link.label }}
          </a>
        </li>
      </ul>

      <!-- Bouton hamburger (mobile uniquement) -->
      <button
        class="nav-burger"
        :class="{ open: menuOpen }"
        @click="toggleMenu"
        :aria-label="menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'"
        :aria-expanded="menuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>

  <!-- Menu mobile plein écran -->
  <Transition name="mobile-menu">
    <div v-if="menuOpen" class="mobile-menu" role="dialog" aria-label="Menu de navigation">
      <!-- Bouton fermeture -->
      <button class="mobile-menu-close" @click="closeMenu" aria-label="Fermer le menu">✕</button>

      <ul class="mobile-menu-list">
        <li
          v-for="(link, index) in navLinks"
          :key="link.href"
          :style="{ '--delay': `${index * 0.08 + 0.1}s` }"
          class="mobile-menu-item"
        >
          <a
            :href="link.href"
            class="mobile-menu-link"
            @click.prevent="goTo(link.href)"
          >
            {{ link.label }}
          </a>
        </li>

      </ul>

      <a
        :href="instagramUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="mobile-menu-instagram"
        @click="closeMenu"
      >
        Instagram ↗
      </a>
    </div>
  </Transition>
</template>

<style scoped>
/* ---- Barre principale ---- */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 22px 0;
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
  align-items: center;
  gap: 10px;
  font-family: var(--font-title);
  font-size: 2rem;
  letter-spacing: 0.05em;
  color: var(--color-accent);
  text-decoration: none;
  transition: opacity var(--transition-fast);
  text-rendering: geometricPrecision;
  -webkit-font-smoothing: subpixel-antialiased;
  font-kerning: none;
}

.nav-logo-img {
  height: 32px;
  width: auto;
  display: block;
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
  font-size: 1rem;
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

/* ---- Bouton hamburger ---- */
.nav-burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 4px;
  z-index: 1001;
}

.nav-burger span {
  display: block;
  height: 1.5px;
  background-color: var(--color-accent);
  transition:
    transform 0.3s ease,
    opacity 0.3s ease,
    width 0.3s ease;
  transform-origin: center;
}

.nav-burger.open span:nth-child(1) {
  transform: translateY(7.5px) rotate(45deg);
}
.nav-burger.open span:nth-child(2) {
  opacity: 0;
  width: 0;
}
.nav-burger.open span:nth-child(3) {
  transform: translateY(-7.5px) rotate(-45deg);
}

/* ---- Menu mobile plein écran ---- */
.mobile-menu {
  position: fixed;
  inset: 0;
  background-color: #0d0d0d;
  z-index: 998;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 64px;
  padding: 40px;
}

.mobile-menu-close {
  position: absolute;
  top: 24px;
  right: 24px;
  font-size: 1.2rem;
  color: var(--color-muted);
  background: none;
  border: none;
  cursor: pointer;
  transition: color var(--transition-fast);
}
.mobile-menu-close:hover {
  color: var(--color-accent);
}

.mobile-menu-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  list-style: none;
}

.mobile-menu-item {
  opacity: 0;
  transform: translateY(20px);
  animation: menu-item-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s) both;
}

@keyframes menu-item-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobile-menu-link {
  font-family: var(--font-title);
  font-size: clamp(2.2rem, 9vw, 3.5rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text);
  text-decoration: none;
  transition: color var(--transition-fast);
  display: block;
  text-align: center;
}
.mobile-menu-link:hover {
  color: var(--color-accent);
}

.mobile-menu-instagram {
  font-family: var(--font-body);
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-muted);
  text-decoration: none;
  transition: color var(--transition-fast);
  animation: menu-item-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both;
}
.mobile-menu-instagram:hover {
  color: var(--color-accent);
}

/* ---- Transitions Vue ---- */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.35s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
}

/* ---- Responsive ---- */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .nav-burger {
    display: flex;
  }
}
</style>
