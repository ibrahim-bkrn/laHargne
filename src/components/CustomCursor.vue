<script setup>
/**
 * CustomCursor.vue — Curseur personnalisé
 *
 * - Le point suit la souris instantanément (position exacte)
 * - L'anneau suit le point avec un léger lag (interpolation)
 * - Se désactive sur les appareils tactiles
 */
import { ref, onMounted, onUnmounted } from 'vue'

// Position exacte de la souris → pour le point
const dotX = ref(-100)
const dotY = ref(-100)

// Position interpolée → pour l'anneau (avec lag)
const ringX = ref(-100)
const ringY = ref(-100)

const isHovering = ref(false)
const isVisible = ref(false)
const isTouchDevice = ref(false)

let rafId = null

function lerp(a, b, t) {
  return a + (b - a) * t
}

function onMouseMove(e) {
  dotX.value = e.clientX
  dotY.value = e.clientY
  if (!isVisible.value) isVisible.value = true
}

function onMouseOver(e) {
  const target = e.target.closest('a, button, .product-card, [role="button"]')
  isHovering.value = !!target
}

function onMouseLeave() {
  isVisible.value = false
}

function tick() {
  // L'anneau suit le point avec lag — facteur 0.18 = léger retard
  ringX.value = lerp(ringX.value, dotX.value, 0.18)
  ringY.value = lerp(ringY.value, dotY.value, 0.18)
  rafId = requestAnimationFrame(tick)
}

onMounted(() => {
  isTouchDevice.value = window.matchMedia('(pointer: coarse)').matches
  if (isTouchDevice.value) return

  document.documentElement.style.cursor = 'none'
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('mouseover', onMouseOver, { passive: true })
  document.addEventListener('mouseleave', onMouseLeave)

  rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  if (isTouchDevice.value) return
  document.documentElement.style.cursor = ''
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseover', onMouseOver)
  document.removeEventListener('mouseleave', onMouseLeave)
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <template v-if="!isTouchDevice">
    <!-- Point — suit la souris instantanément -->
    <div
      class="cursor-dot"
      :class="{ visible: isVisible, hovering: isHovering }"
      :style="{ transform: `translate(${dotX}px, ${dotY}px)` }"
      aria-hidden="true"
    ></div>

    <!-- Anneau — suit le point avec lag -->
    <div
      class="cursor-ring"
      :class="{ visible: isVisible, hovering: isHovering }"
      :style="{ transform: `translate(${ringX}px, ${ringY}px)` }"
      aria-hidden="true"
    ></div>
  </template>
</template>

<style scoped>
/* Propriétés communes */
.cursor-dot,
.cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 99999;
  opacity: 0;
  transition: opacity 0.3s ease;
  will-change: transform;
}

.cursor-dot.visible,
.cursor-ring.visible {
  opacity: 1;
}

/* ---- Point central — taille de la souris réelle ---- */
.cursor-dot {
  width: 6px;
  height: 6px;
  background-color: #ffffff;
  border-radius: 50%;
  margin-left: -3px;
  margin-top: -3px;
  transition:
    opacity 0.3s ease,
    transform 0s,        /* instantané */
    width 0.2s ease,
    height 0.2s ease,
    margin 0.2s ease;
}

/* Au hover : le point disparaît */
.cursor-dot.hovering {
  width: 0;
  height: 0;
  margin-left: 0;
  margin-top: 0;
  opacity: 0;
}

/* ---- Anneau extérieur — suit avec lag via JS ---- */
.cursor-ring {
  width: 34px;
  height: 34px;
  border: 1px solid rgba(255, 255, 255, 0.55);
  border-radius: 50%;
  margin-left: -17px;
  margin-top: -17px;
  transition:
    opacity 0.3s ease,
    width 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    height 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    margin 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.3s ease,
    background-color 0.3s ease;
}

/* Au hover : l'anneau grossit et se remplit légèrement */
.cursor-ring.hovering {
  width: 54px;
  height: 54px;
  margin-left: -27px;
  margin-top: -27px;
  border-color: rgba(255, 255, 255, 0.9);
  background-color: rgba(255, 255, 255, 0.06);
}
</style>
