<script setup>
/**
 * HomeView.vue — Version V1 de LAHARGNE
 */

// Lien Instagram officiel de la marque
const INSTAGRAM_URL = 'https://instagram.com/lahargne'

// Numéro WhatsApp (format international, sans + ni espaces ni tirets)
const WHATSAPP_NUMBER = '33769799093'

// URL WhatsApp de base
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

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
    <AppNav :instagram-url="INSTAGRAM_URL" />

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
