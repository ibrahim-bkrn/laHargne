<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function printFlyer() { window.print() }
</script>

<template>
  <div class="flyer-page">

    <!-- Toolbar — masquée à l'impression -->
    <div class="flyer-toolbar no-print">
      <button class="toolbar-back" @click="router.push('/')">← Retour</button>
      <span class="toolbar-title">Flyer LAHARGNE — 2025</span>
      <button class="toolbar-print" @click="printFlyer">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <polyline points="6 9 6 2 18 2 18 9"/>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
          <rect x="6" y="14" width="12" height="8"/>
        </svg>
        Exporter PDF
      </button>
    </div>

    <!-- Stage -->
    <div class="flyer-stage">
      <div class="flyer">

        <!-- LOGO -->
        <div class="flyer-logo-wrap">
          <img src="/images/logoNoir_6_11zon.webp" alt="">
        </div>

        <!-- SLOGAN -->
        <div class="flyer-slogan">
          ARRACHER LA PLACE<br>QU'ON NOUS DONNERA JAMAIS
        </div>

        <!-- PHOTO FACE — pleine largeur -->
        <div class="flyer-face">
          <img src="/images/imageDecor_9_11zon.webp" alt="LA HARGNE — Face" />
        </div>

        <!-- PHOTOS 3 COLONNES -->
        <div class="flyer-photos">
          <div class="photo-col">
            <img src="/images/imageProduitBleue_12_11zon.webp" alt="LA HARGNE — Bleu" />
          </div>
          <div class="photo-col photo-col--mid">
            <img src="/images/imageProduitNoir_19_11zon.webp" alt="LA HARGNE — Noir" />
          </div>
          <div class="photo-col">
            <img src="/images/imageProduitGris_15_11zon.webp" alt="LA HARGNE — Gris" />
          </div>
        </div>

        <!-- RULE -->
        <div class="flyer-rule"></div>

        <!-- INFOS COLLECTION -->
        <div class="flyer-meta">
          <span class="meta-item">SS · 2025</span>
          <span class="meta-sep">·</span>
          <span class="meta-item">TEE-SHIRT OVERSIZE</span>
          <span class="meta-sep">·</span>
          <span class="meta-item">39 €</span>
          <span class="meta-sep">·</span>
          <span class="meta-item">S — XXL</span>
        </div>

        <!-- RULE -->
        <div class="flyer-rule"></div>

        <!-- QR CODE + FOOTER -->
        <div class="flyer-bottom">
          <div class="qr-wrap">
            <img
              src="/images/qrCode_8_11zon.webp"
              alt="QR Code lahargne.fr"
              class="qr-img"
              onerror="this.style.opacity='0.1'"
            />
          </div>
          <div class="bottom-text">
            <span class="bottom-brand">lahargne</span>
            <span class="bottom-divider">|</span>
            <span class="bottom-url">lahargne.fr</span>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

/* ── PAGE ── */
.flyer-page {
  min-height: 100vh;
  background: #111;
  display: flex;
  flex-direction: column;
}

/* ── TOOLBAR ── */
.flyer-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 32px;
  background: #0a0a0a;
  border-bottom: 1px solid #1e1e1e;
}

.toolbar-back {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.12em;
  color: #555;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}
.toolbar-back:hover { color: #fff; }

.toolbar-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.2em;
  color: #333;
}

.toolbar-print {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.14em;
  color: #000;
  background: #fff;
  border: none;
  padding: 9px 20px;
  cursor: pointer;
  transition: opacity 0.2s;
}
.toolbar-print:hover { opacity: 0.85; }

/* ── STAGE ── */
.flyer-stage {
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 48px 24px 80px;
}

/* ── FLYER ── */
.flyer {
  width: 100%;
  max-width: 480px;
  background: #000;
  padding: 40px 36px 36px;
  box-shadow: 0 40px 120px rgba(0,0,0,0.9);
}

/* ── LOGO SVG ── */
.flyer-logo-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 28px;
}

.flyer-logo-svg {
  width: 100px;
  height: auto;
}

/* ── SLOGAN ── */
.flyer-slogan {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(1.6rem, 5.5vw, 2.1rem);
  letter-spacing: 0.04em;
  color: #fff;
  text-align: center;
  line-height: 1.05;
  margin-bottom: 28px;
}

/* ── RULE ── */
.flyer-rule {
  height: 1px;
  background: #1a1a1a;
  margin: 0 0 24px;
}

/* ── PHOTO FACE ── */
.flyer-face {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  margin-bottom: 3px;
}

.flyer-face img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  filter: grayscale(15%);
}

/* ── PHOTOS ── */
.flyer-photos {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 3px;
  margin-bottom: 24px;
}

.photo-col {
  aspect-ratio: 3 / 4;
  overflow: hidden;
}

.photo-col--mid {
  margin-top: -12px;
  aspect-ratio: 3 / 4.3;
}

.photo-col img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  filter: grayscale(15%);
}

/* ── META ── */
.flyer-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
}

.meta-item {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 0.85rem;
  letter-spacing: 0.18em;
  color: #555;
}

.meta-sep {
  font-family: 'Bebas Neue', sans-serif;
  color: #2a2a2a;
  font-size: 0.75rem;
}

/* ── BOTTOM ── */
.flyer-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.qr-wrap {
  width: 100px;
  height: 100px;
  background: #fff;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qr-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.bottom-text {
  display: flex;
  align-items: center;
  gap: 16px;
}

.bottom-brand,
.bottom-url {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1rem;
  letter-spacing: 0.18em;
  color: #888;
}

.bottom-divider {
  color: #2a2a2a;
  font-size: 1rem;
}

/* ── IMPRESSION ── */
@media print {
  .no-print { display: none !important; }

  .flyer-page { background: #000; min-height: auto; }

  .flyer-stage { padding: 0; }

  .flyer {
    max-width: 100%;
    width: 100%;
    box-shadow: none;
    background: #000 !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
