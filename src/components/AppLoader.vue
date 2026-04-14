<script setup>
/**
 * AppLoader.vue — Écran de chargement plein écran
 *
 * Comportement :
 *  - Les lettres de "LAHARGNE" apparaissent une par une (slide-in)
 *  - Après 1 800 ms : démarrage du fade-out (transition 700 ms)
 *  - Après 2 500 ms : émission de l'événement 'done' → le parent retire le loader
 */
import { ref, onMounted } from 'vue'

const emit = defineEmits(['done'])

// Chaque lettre du nom de marque
const letters = 'LAHARGNE'.split('')

// Contrôle le déclenchement des animations de lettres
const isVisible = ref(false)

// Contrôle le fade-out global du loader
const isFading = ref(false)

onMounted(() => {
  // Lance les animations de lettres au prochain frame
  requestAnimationFrame(() => {
    isVisible.value = true
  })

  // Début du fade-out à 1 800 ms
  setTimeout(() => {
    isFading.value = true
  }, 1800)

  // Notifie le parent que le loader est terminé à 2 500 ms
  // (1 800 ms + 700 ms de transition CSS)
  setTimeout(() => {
    emit('done')
  }, 2500)
})
</script>

<template>
  <div class="loader" :class="{ 'fade-out': isFading }" aria-hidden="true">
    <div class="loader-content">
      <!--
        Chaque lettre reçoit un animation-delay proportionnel à son index.
        La classe .visible déclenche l'animation CSS (définie en <style>).
      -->
      <span
        v-for="(letter, index) in letters"
        :key="index"
        class="letter"
        :class="{ visible: isVisible }"
        :style="{ animationDelay: `${index * 0.07}s` }"
      >
        {{ letter }}
      </span>
    </div>

    <!-- Ligne décorative sous le titre -->
    <div class="loader-line" :class="{ visible: isVisible }"></div>
  </div>
</template>

<style scoped>
/* ---- Wrapper plein écran ---- */
.loader {
  position: fixed;
  inset: 0;
  background-color: #0d0d0d;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  z-index: 10000;
  transition: opacity 0.7s ease;
}

.loader.fade-out {
  opacity: 0;
  pointer-events: none;
}

/* ---- Conteneur des lettres ---- */
.loader-content {
  display: flex;
  /* Espace négatif entre lettres pour que le tracking d'Anton soit serré */
  gap: 0.02em;
}

/* ---- Lettre individuelle ---- */
.letter {
  font-family: 'Anton', sans-serif;
  font-size: clamp(3rem, 12vw, 8rem);
  color: #ffffff;
  text-transform: uppercase;
  /* État initial : invisible et décalé vers le bas */
  opacity: 0;
  display: inline-block;
  /* Correction rendu optique du font Anton */
  text-rendering: geometricPrecision;
  -webkit-font-smoothing: subpixel-antialiased;
  font-kerning: none;
}

/* Quand .visible est ajouté, déclenche l'animation lettre par lettre */
.letter.visible {
  animation: letter-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes letter-in {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ---- Ligne décorative ---- */
.loader-line {
  width: 0;
  height: 1px;
  background-color: #2a2a2a;
  transition: width 1s cubic-bezier(0.22, 1, 0.36, 1) 0.6s;
}

.loader-line.visible {
  width: clamp(200px, 40vw, 480px);
}
</style>
