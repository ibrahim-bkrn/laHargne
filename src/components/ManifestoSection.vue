<script setup>
/**
 * ManifestoSection.vue — Manifeste de la marque
 * Layout éditorial : citation massive + corps de texte en colonnes
 *
 * ✏️ Modifiez les textes ci-dessous.
 */

const tag = 'Manifeste — 01'

// Chaque ligne de la citation est positionnée indépendamment
const quoteLines = [
  { text: 'On ne naît pas',  indent: false, accent: false },
  { text: 'avec la hargne.', indent: true,  accent: false },
  { text: 'On la choisit.', indent: false, accent: true  },
]

const bodyText = [
  "La LAHARGNE n'est pas une marque. C'est une posture. Un choix quotidien de ne pas subir.",
  "Porter LAHARGNE, c'est s'afficher clairement : t'as décidé de te battre, de progresser, de ne jamais lâcher.",
  "Chaque pièce est un rappel. La hargne, c'est toi.",
]
</script>

<template>
  <section class="manifesto" id="manifesto">
    <div class="container">

      <!-- Label de section -->
      <div class="manifesto-tag" v-scroll-reveal>{{ tag }}</div>

      <!-- Citation massive — layout éditorial -->
      <div class="manifesto-quote-block">
        <div
          v-for="(line, i) in quoteLines"
          :key="i"
          class="quote-line"
          :class="{
            'indent': line.indent,
            'accent': line.accent,
          }"
          v-scroll-reveal="i * 90"
        >
          {{ line.text }}
        </div>
      </div>

      <!-- Séparateur -->
      <div class="manifesto-sep" v-scroll-reveal="300">
        <span class="sep-line"></span>
        <span class="sep-label">La philosophie</span>
      </div>

      <!-- Corps de texte en colonnes -->
      <div class="manifesto-body" v-scroll-reveal="380">
        <p
          v-for="(p, i) in bodyText"
          :key="i"
          class="manifesto-p"
        >
          {{ p }}
        </p>
      </div>

    </div>

    <!-- Grand texte fantôme en arrière-plan -->
    <div class="manifesto-bg-text" aria-hidden="true">HARGNE</div>
  </section>
</template>

<style scoped>
.manifesto {
  position: relative;
  background-color: var(--color-surface);
  padding: 110px 0 100px;
  overflow: hidden;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

/* ---- Label haut ---- */
.manifesto-tag {
  font-family: var(--font-body);
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-bottom: 52px;
}

/* ---- Citation massive ---- */
.manifesto-quote-block {
  display: flex;
  flex-direction: column;
  gap: 0.02em;
  margin-bottom: 64px;
}

.quote-line {
  font-family: var(--font-title);
  font-size: clamp(3.2rem, 7.5vw, 6.8rem);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  line-height: 1.0;
  color: var(--color-text);
  /* Chaque ligne démarre hors écran vers le bas — transition CSS */
}

/* Décalage de la 2e ligne */
.quote-line.indent {
  padding-left: clamp(1.5rem, 5vw, 5rem);
}

/* 3e ligne en blanc pur + légèrement plus grand */
.quote-line.accent {
  color: var(--color-accent);
  font-size: clamp(3.4rem, 8vw, 7.4rem);
}

/* ---- Séparateur ---- */
.manifesto-sep {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 48px;
}

.sep-line {
  flex: 1;
  height: 1px;
  background-color: var(--color-border);
  max-width: 200px;
}

.sep-label {
  font-family: var(--font-body);
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-border);
}

/* ---- Corps de texte en 3 colonnes ---- */
.manifesto-body {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 960px;
}

.manifesto-p {
  font-family: var(--font-body);
  font-size: 0.88rem;
  line-height: 1.85;
  color: var(--color-muted);
  /* Petite ligne verticale à gauche pour chaque paragraphe */
  padding-left: 16px;
  border-left: 1px solid var(--color-border);
}

/* ---- Texte fantôme en arrière-plan ---- */
.manifesto-bg-text {
  position: absolute;
  right: -2%;
  bottom: -8%;
  font-family: var(--font-title);
  font-size: clamp(10rem, 22vw, 22rem);
  text-transform: uppercase;
  letter-spacing: -0.04em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.04);
  pointer-events: none;
  user-select: none;
  line-height: 1;
  z-index: 0;
}

/* Le container est au-dessus du texte fantôme */
.container {
  position: relative;
  z-index: 1;
}

/* ---- Responsive ---- */
@media (max-width: 900px) {
  .manifesto-body {
    grid-template-columns: 1fr 1fr;
  }

  /* Sur tablette le 3e para prend toute la largeur */
  .manifesto-p:last-child {
    grid-column: span 2;
  }
}

@media (max-width: 600px) {
  .manifesto-body {
    grid-template-columns: 1fr;
  }

  .manifesto-p:last-child {
    grid-column: span 1;
  }

  .quote-line {
    font-size: clamp(2.4rem, 11vw, 4rem);
  }

  .quote-line.indent {
    padding-left: 1.2rem;
  }
}
</style>
