<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function printFlyer() {
  window.print()
}
</script>

<template>
  <div class="flyer-page">

    <!-- Barre d'actions (masquée à l'impression) -->
    <div class="flyer-toolbar no-print">
      <button class="toolbar-back" @click="router.push('/')">← Retour</button>
      <span class="toolbar-title">Flyer LAHARGNE — Collection 2025</span>
      <button class="toolbar-print" @click="printFlyer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <polyline points="6 9 6 2 18 2 18 9"/>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
          <rect x="6" y="14" width="12" height="8"/>
        </svg>
        Imprimer / Exporter PDF
      </button>
    </div>

    <!-- Zone d'impression -->
    <div class="flyer-stage">
      <div class="flyer">

        <!-- ── EN-TÊTE ── -->
        <header class="flyer-header">
          <div class="header-left">
            <span class="flyer-logo">LAHARGNE</span>
            <span class="flyer-season">SS · 2025</span>
          </div>
          <div class="header-right">
            <span class="flyer-ref">— 001</span>
          </div>
        </header>

        <!-- ── SÉPARATEUR ── -->
        <div class="flyer-rule"></div>

        <!-- ── BLOC TITRE PRINCIPAL ── -->
        <div class="flyer-title-block">
          <div class="big-title">
            <span class="bt-1">LA</span>
            <span class="bt-2">HARGNE</span>
          </div>
          <div class="flyer-tagline-block">
            <span class="tagline-dash">—</span>
            <span class="tagline-text">C'EST UN ÉTAT D'ESPRIT</span>
          </div>
        </div>

        <!-- ── PRODUIT ── -->
        <div class="flyer-product">

          <!-- Visuel produit -->
          <div class="product-visual">
            <img
              src="/images/imageProduitNoir.png"
              alt="Tee-shirt LAHARGNE — Noir"
              class="product-img"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
            />
            <!-- Fallback SVG si pas d'image -->
            <div class="product-svg-fallback" style="display:none">
              <svg viewBox="0 0 220 260" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 68,10 C 82,32 138,32 152,10 L 220,38 L 196,72 L 165,60 L 165,248 L 55,248 L 55,60 L 24,72 L 0,38 Z"
                  fill="#1a1a1a" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
                <text x="110" y="162" text-anchor="middle" dominant-baseline="middle"
                  font-family="'Bebas Neue', sans-serif" font-size="20" letter-spacing="6"
                  fill="rgba(255,255,255,0.5)">LAHARGNE</text>
              </svg>
            </div>
          </div>

          <!-- Infos produit -->
          <div class="product-info">
            <p class="product-label">Tee-shirt</p>
            <h2 class="product-name">TEE-SHIRT<br>LAHARGNE</h2>

            <div class="product-specs">
              <div class="spec-row">
                <span class="spec-key">Prix</span>
                <span class="spec-val">39 €</span>
              </div>
              <div class="spec-row">
                <span class="spec-key">Coloris</span>
                <span class="spec-val">6 disponibles</span>
              </div>
              <div class="spec-row">
                <span class="spec-key">Tailles</span>
                <span class="spec-val">S — XXL</span>
              </div>
              <div class="spec-row">
                <span class="spec-key">Matière</span>
                <span class="spec-val">100% coton 280g</span>
              </div>
            </div>

            <!-- Swatches coloris -->
            <div class="coloris-row">
              <span class="coloris-label">Coloris :</span>
              <div class="swatches">
                <span class="swatch" style="background:#E8E8E8" title="Blanc"></span>
                <span class="swatch" style="background:#242424;border-color:rgba(255,255,255,0.25)" title="Noir"></span>
                <span class="swatch" style="background:#4a4a4a" title="Gris"></span>
                <span class="swatch" style="background:#2d4b7a" title="Bleu"></span>
                <span class="swatch" style="background:#5c6b4a" title="Kaki"></span>
                <span class="swatch" style="background:#6b2737" title="Bordeaux"></span>
              </div>
            </div>
          </div>

        </div>

        <!-- ── SÉPARATEUR ── -->
        <div class="flyer-rule"></div>

        <!-- ── MANIFESTE ── -->
        <div class="flyer-manifeste">
          <p class="manifeste-quote">"T'as la hargne ou t'as pas."</p>
          <p class="manifeste-sub">
            Porter LAHARGNE c'est un état d'esprit. Chaque jour est un combat. Habille-toi en conséquence.
          </p>
        </div>

        <!-- ── SÉPARATEUR ── -->
        <div class="flyer-rule"></div>

        <!-- ── CONTACT & COMMANDE ── -->
        <footer class="flyer-footer">
          <div class="footer-col">
            <span class="footer-label">Commande directe</span>
            <span class="footer-val">WhatsApp : 07 69 79 90 93</span>
          </div>
          <div class="footer-divider"></div>
          <div class="footer-col">
            <span class="footer-label">Instagram</span>
            <span class="footer-val">@lahargne</span>
          </div>
          <div class="footer-divider"></div>
          <div class="footer-col footer-col--right">
            <span class="footer-label">Site</span>
            <span class="footer-val">lahargne.fr</span>
          </div>
        </footer>

        <!-- Filigrane de fond -->
        <div class="flyer-watermark" aria-hidden="true">LAHARGNE</div>

      </div>
    </div>

  </div>
</template>

<style scoped>
/* ==============================
   PAGE & TOOLBAR
   ============================== */
.flyer-page {
  min-height: 100vh;
  background: #111;
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif;
}

.flyer-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 32px;
  background: #0d0d0d;
  border-bottom: 1px solid #2a2a2a;
  gap: 16px;
}

.toolbar-back {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #666;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
  white-space: nowrap;
}
.toolbar-back:hover { color: #fff; }

.toolbar-title {
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #444;
}

.toolbar-print {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #0d0d0d;
  background: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 2px;
  transition: opacity 0.2s;
  white-space: nowrap;
}
.toolbar-print:hover { opacity: 0.85; }

/* ==============================
   STAGE (zone de centrage)
   ============================== */
.flyer-stage {
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 48px 24px 80px;
}

/* ==============================
   FLYER
   ============================== */
.flyer {
  position: relative;
  width: 100%;
  max-width: 520px;
  background: #0d0d0d;
  border: 1px solid #2a2a2a;
  padding: 40px 40px 36px;
  overflow: hidden;
  /* Proportions proches d'un A4 portrait */
  box-shadow: 0 40px 120px rgba(0,0,0,0.8);
}

/* ── Filigrane ── */
.flyer-watermark {
  position: absolute;
  bottom: -10%;
  right: -5%;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 10rem;
  letter-spacing: -0.02em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.03);
  pointer-events: none;
  user-select: none;
  line-height: 1;
}

/* ── En-tête ── */
.flyer-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 20px;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.flyer-logo {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2.6rem;
  letter-spacing: 0.08em;
  color: #fff;
  line-height: 1;
}

.flyer-season {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #555;
}

.flyer-ref {
  font-family: 'Inter', sans-serif;
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  color: #444;
}

/* ── Règle ── */
.flyer-rule {
  height: 1px;
  background: #1e1e1e;
  margin: 22px 0;
}

/* ── Titre principal ── */
.flyer-title-block {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 4px;
}

.big-title {
  display: flex;
  flex-direction: column;
  line-height: 0.88;
  gap: 0;
}

.bt-1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(4.5rem, 18vw, 7rem);
  color: #fff;
  letter-spacing: 0.04em;
  display: block;
}

.bt-2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(4.5rem, 18vw, 7rem);
  color: transparent;
  -webkit-text-stroke: 1.2px rgba(255,255,255,0.6);
  letter-spacing: 0.04em;
  display: block;
}

.flyer-tagline-block {
  display: flex;
  align-items: center;
  gap: 12px;
}

.tagline-dash {
  color: #333;
  font-size: 0.9rem;
}

.tagline-text {
  font-family: 'Inter', sans-serif;
  font-size: 0.68rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #555;
}

/* ── Produit ── */
.flyer-product {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 28px;
  align-items: center;
}

.product-visual {
  aspect-ratio: 3 / 4;
  background: #141414;
  border: 1px solid #1e1e1e;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-svg-fallback {
  align-items: center;
  justify-content: center;
  width: 80%;
}
.product-svg-fallback svg { width: 100%; height: auto; }

.product-info {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.product-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #444;
}

.product-name {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.7rem;
  letter-spacing: 0.06em;
  color: #fff;
  line-height: 1.0;
}

.product-specs {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px solid #1a1a1a;
  padding-bottom: 6px;
  gap: 8px;
}

.spec-key {
  font-family: 'Inter', sans-serif;
  font-size: 0.62rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #444;
}

.spec-val {
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  color: #bbb;
  text-align: right;
}

.coloris-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.coloris-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #444;
  white-space: nowrap;
}

.swatches {
  display: flex;
  gap: 6px;
}

.swatch {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.12);
  flex-shrink: 0;
}

/* ── Manifeste ── */
.flyer-manifeste {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.manifeste-quote {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.3rem;
  letter-spacing: 0.06em;
  color: #fff;
}

.manifeste-sub {
  font-family: 'Inter', sans-serif;
  font-size: 0.68rem;
  line-height: 1.7;
  color: #555;
  max-width: 340px;
}

/* ── Footer ── */
.flyer-footer {
  display: flex;
  align-items: center;
  gap: 0;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
}

.footer-col--right { align-items: flex-end; }

.footer-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #333;
}

.footer-val {
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  color: #888;
}

.footer-divider {
  width: 1px;
  height: 28px;
  background: #1e1e1e;
  margin: 0 20px;
  flex-shrink: 0;
}

/* ==============================
   IMPRESSION
   ============================== */
@media print {
  .no-print { display: none !important; }

  .flyer-page {
    background: #fff;
    min-height: auto;
  }

  .flyer-stage {
    padding: 0;
    align-items: flex-start;
  }

  .flyer {
    max-width: 100%;
    width: 100%;
    border: none;
    box-shadow: none;
    padding: 20mm 18mm;
    /* Fond noir préservé à l'impression */
    background: #0d0d0d !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
