<script setup>
/**
 * PropositionsView.vue
 * 3 propositions de design Header + Hero — à comparer côte à côte
 * Accessible sur /propositions
 */
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const heroImage = 'https://picsum.photos/seed/boxing/1920/1080'

// Proposition active
const active = ref('A')
const options = ['A', 'B', 'C']

const labels = {
  A: { name: 'Éditorial', desc: 'Nav légère, texte ancré en bas à gauche. Référence : Fear of God, Essentials.' },
  B: { name: 'Centré symétrique', desc: 'Logo au centre, liens de part et d\'autre. Référence : Acne Studios, Maison Margiela.' },
  C: { name: 'Typographique brutal', desc: 'La typo remplit tout l\'écran. Référence : Balenciaga, Supreme.' },
}
</script>

<template>
  <div class="proposals-page">

    <!-- ===== BARRE PROPOSITIONS ===== -->
    <div class="props-bar">
      <button class="props-back" @click="router.push('/')">← Retour au site</button>

      <div class="props-tabs">
        <button
          v-for="opt in options"
          :key="opt"
          class="props-tab"
          :class="{ active: active === opt }"
          @click="active = opt"
        >
          <span class="tab-letter">{{ opt }}</span>
          <span class="tab-name">{{ labels[opt].name }}</span>
        </button>
      </div>

      <div class="props-desc">{{ labels[active].desc }}</div>
    </div>

    <!-- ===== PROPOSITION A — ÉDITORIAL ===== -->
    <div v-show="active === 'A'" class="proposal-frame">

      <!-- Nav A : Logo Anton gauche · liens Inter droite · icône IG far right -->
      <nav class="nav-a">
        <span class="logo-a">LAHARGNE</span>
        <ul class="links-a">
          <li><a href="#">Collection</a></li>
          <li><a href="#">Lookbook</a></li>
          <li><a href="#">Contact</a></li>
          <li>
            <a href="https://instagram.com/lahargne" target="_blank" class="ig-icon-a" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
              </svg>
            </a>
          </li>
        </ul>
      </nav>

      <!-- Hero A : texte ancré en bas à gauche -->
      <div class="hero-a">
        <img :src="heroImage" alt="" class="hero-bg-img" aria-hidden="true" />
        <div class="hero-a-overlay"></div>

        <div class="hero-a-content">
          <p class="eyebrow-a">— Collection 2025</p>
          <h1 class="title-a">
            <span class="ta-line1">LA HARGNE</span>
            <span class="ta-line2">C'EST UN ÉTAT D'ESPRIT</span>
          </h1>
          <a href="#" class="cta-a">Collection <span>→</span></a>
        </div>
      </div>

    </div>

    <!-- ===== PROPOSITION B — CENTRÉ SYMÉTRIQUE ===== -->
    <div v-show="active === 'B'" class="proposal-frame">

      <!-- Nav B : liens gauche · logo centré · IG droite -->
      <nav class="nav-b">
        <ul class="links-b left">
          <li><a href="#">Collection</a></li>
          <li><a href="#">Lookbook</a></li>
        </ul>
        <span class="logo-b">LAHARGNE</span>
        <ul class="links-b right">
          <li><a href="#">Contact</a></li>
          <li>
            <a href="https://instagram.com/lahargne" target="_blank" class="ig-icon-b" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
              </svg>
            </a>
          </li>
        </ul>
      </nav>

      <!-- Hero B : tout centré, ligne de séparation, bouton outline -->
      <div class="hero-b">
        <img :src="heroImage" alt="" class="hero-bg-img" aria-hidden="true" />
        <div class="hero-b-overlay"></div>

        <div class="hero-b-content">
          <h1 class="title-b">LA HARGNE</h1>
          <div class="sep-b"></div>
          <p class="subtitle-b">C'EST UN ÉTAT D'ESPRIT</p>
          <a href="#" class="cta-b">Voir la Collection</a>
        </div>
      </div>

    </div>

    <!-- ===== PROPOSITION C — TYPOGRAPHIQUE BRUTAL ===== -->
    <div v-show="active === 'C'" class="proposal-frame">

      <!-- Nav C : logo minimal gauche · menu texte droite -->
      <nav class="nav-c">
        <span class="logo-c">LH</span>
        <div class="nav-c-right">
          <ul class="links-c">
            <li><a href="#">Collection</a></li>
            <li><a href="#">Lookbook</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </nav>

      <!-- Hero C : typo qui REMPLIT l'écran, fit-width -->
      <div class="hero-c">
        <img :src="heroImage" alt="" class="hero-bg-img" aria-hidden="true" />
        <div class="hero-c-overlay"></div>

        <div class="hero-c-content">
          <h1 class="title-c">
            <span class="tc-1">LA</span>
            <span class="tc-2">HARGNE</span>
          </h1>
          <div class="hero-c-bottom">
            <span class="tagline-c">C'est un état d'esprit</span>
            <a href="#" class="cta-c">Collection →</a>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
/* =====================
   PAGE WRAPPER
   ===================== */
.proposals-page {
  background: #0d0d0d;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
}

/* =====================
   BARRE DE SÉLECTION
   ===================== */
.props-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9000;
  background: rgba(13, 13, 13, 0.96);
  backdrop-filter: blur(16px);
  border-top: 1px solid #2a2a2a;
  padding: 16px 32px;
  display: flex;
  align-items: center;
  gap: 32px;
}

.props-back {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  color: #666;
  background: none;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  white-space: nowrap;
  transition: color 0.2s;
}
.props-back:hover { color: #fff; }

.props-tabs {
  display: flex;
  gap: 8px;
}

.props-tab {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background: transparent;
  border: 1px solid #2a2a2a;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 2px;
}
.props-tab:hover {
  border-color: #555;
}
.props-tab.active {
  background: #fff;
  border-color: #fff;
}

.tab-letter {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.1rem;
  color: #888;
  transition: color 0.2s;
}
.tab-name {
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #888;
  transition: color 0.2s;
}
.props-tab.active .tab-letter,
.props-tab.active .tab-name {
  color: #0d0d0d;
}

.props-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #555;
  max-width: 360px;
  line-height: 1.5;
}

/* =====================
   FRAME COMMUN
   ===================== */
.proposal-frame {
  height: calc(100vh - 80px);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.hero-bg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* =====================
   PROPOSITION A — ÉDITORIAL
   ===================== */
.nav-a {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 26px 48px;
}

.logo-a {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.7rem;
  letter-spacing: 0.08em;
  color: #fff;
  text-rendering: geometricPrecision;
}

.links-a {
  display: flex;
  align-items: center;
  gap: 40px;
  list-style: none;
}

.links-a a {
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.65);
  text-decoration: none;
  transition: color 0.2s, opacity 0.2s;
}
.links-a a:hover { color: #fff; }

.ig-icon-a svg {
  width: 18px;
  height: 18px;
  color: rgba(255,255,255,0.55);
  display: block;
  transition: color 0.2s;
}
.ig-icon-a:hover svg { color: #fff; }

.hero-a {
  flex: 1;
  position: relative;
  display: flex;
  align-items: flex-end; /* ancrage bas */
}

.hero-a-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(5,5,5,0.92) 0%,
    rgba(5,5,5,0.35) 45%,
    rgba(5,5,5,0.15) 100%
  );
}

.hero-a-content {
  position: relative;
  z-index: 2;
  padding: 0 48px 72px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.eyebrow-a {
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
}

.title-a {
  display: flex;
  flex-direction: column;
  gap: 0;
  line-height: 0.92;
}

.ta-line1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(5rem, 12vw, 10rem);
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #fff;
  display: block;
}

.ta-line2 {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: clamp(1rem, 2.2vw, 1.8rem);
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: rgba(255,255,255,0.65);
  display: block;
}

.cta-a {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: color 0.2s, gap 0.2s;
  width: fit-content;
}
.cta-a span { transition: transform 0.2s; }
.cta-a:hover { color: #fff; }
.cta-a:hover span { transform: translateX(6px); }

/* =====================
   PROPOSITION B — CENTRÉ
   ===================== */
.nav-b {
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 26px 48px;
}

.logo-b {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.6rem;
  letter-spacing: 0.1em;
  color: #fff;
  text-align: center;
  text-rendering: geometricPrecision;
}

.links-b {
  display: flex;
  gap: 36px;
  list-style: none;
}
.links-b.left { justify-content: flex-start; }
.links-b.right { justify-content: flex-end; }

.links-b a {
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  transition: color 0.2s;
}
.links-b a:hover { color: #fff; }

.ig-icon-b svg {
  width: 17px;
  height: 17px;
  color: rgba(255,255,255,0.5);
  display: block;
  transition: color 0.2s;
}
.ig-icon-b:hover svg { color: #fff; }

.hero-b {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-b-overlay {
  position: absolute;
  inset: 0;
  background: rgba(5,5,5,0.62);
}

.hero-b-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  text-align: center;
  padding: 0 48px;
}

.title-b {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(5rem, 14vw, 12rem);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #fff;
  line-height: 1;
}

.sep-b {
  width: 60px;
  height: 1px;
  background: rgba(255,255,255,0.3);
}

.subtitle-b {
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.55);
}

.cta-b {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 0.82rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #fff;
  text-decoration: none;
  border: 1px solid rgba(255,255,255,0.4);
  padding: 14px 36px;
  margin-top: 12px;
  transition: background 0.25s, color 0.25s, border-color 0.25s;
  border-radius: 1px;
}
.cta-b:hover {
  background: #fff;
  color: #0d0d0d;
  border-color: #fff;
}

/* =====================
   PROPOSITION C — BRUTAL
   ===================== */
.nav-c {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 48px;
}

.logo-c {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.3rem;
  letter-spacing: 0.18em;
  color: #fff;
}

.nav-c-right { display: flex; align-items: center; gap: 48px; }

.links-c {
  display: flex;
  gap: 36px;
  list-style: none;
}
.links-c a {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
  text-decoration: none;
  transition: color 0.2s;
}
.links-c a:hover { color: #fff; }

.hero-c {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 40px 64px;
}

.hero-c-overlay {
  position: absolute;
  inset: 0;
  background: rgba(5,5,5,0.55);
}

.hero-c-content {
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title-c {
  display: flex;
  flex-direction: column;
  line-height: 0.85;
  /* Les lettres remplissent toute la largeur */
  width: 100%;
}

.tc-1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(6rem, 20vw, 18rem);
  text-transform: uppercase;
  color: #fff;
  display: block;
  /* Remplit la largeur comme une affiche */
  white-space: nowrap;
}
.tc-2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(6rem, 20vw, 18rem);
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255,255,255,0.7);
  display: block;
  white-space: nowrap;
}

.hero-c-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.tagline-c {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: 0.8rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
}

.cta-c {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  transition: color 0.2s;
}
.cta-c:hover { color: #fff; }
</style>
