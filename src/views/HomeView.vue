<script setup>
/**
 * HomeView.vue — Version V1 de LAHARGNE
 */
import { computed } from 'vue'
import { useTexts } from '../composables/useTexts'

const { remoteTexts, fetchTexts } = useTexts()
fetchTexts()

// undefined (feuille pas encore chargée / injoignable) → repli codé en dur
// '' (cellule vide dans la feuille) → lien/bouton caché par les composants enfants
const INSTAGRAM_URL = computed(() => {
  const v = remoteTexts.value?.instagram_url
  return v === undefined ? 'https://instagram.com/lahargne' : v
})

const WHATSAPP_URL = computed(() => {
  const v = remoteTexts.value?.whatsapp_numero
  const numero = v === undefined ? '33769799093' : v
  return numero ? `https://wa.me/${numero}` : ''
})

import AppNav from '../components/AppNav.vue'
import HeroSection from '../components/HeroSection.vue'
import MarqueeTicker from '../components/MarqueeTicker.vue'
import ManifestoSection from '../components/ManifestoSection.vue'
import OrigineSection from '../components/OrigineSection.vue'
import CounterSection from '../components/CounterSection.vue'
import CollectionSection from '../components/CollectionSection.vue'
import LookbookSection from '../components/LookbookSection.vue'
import ContactSection from '../components/ContactSection.vue'
import AppFooter from '../components/AppFooter.vue'
</script>

<template>
  <!-- Contenu principal -->
  <div class="app-wrapper">
    <AppNav />

    <main>
      <HeroSection :instagram-url="INSTAGRAM_URL" />
      <MarqueeTicker />
      <!-- <ManifestoSection /> -->
      <OrigineSection />
      <!--<CounterSection />-->
      <CollectionSection />
      <LookbookSection :instagram-url="INSTAGRAM_URL" />
      <ContactSection
        :instagram-url="INSTAGRAM_URL"
        :whatsapp-url="WHATSAPP_URL"
      />
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  background-color: var(--color-bg);
}
</style>
