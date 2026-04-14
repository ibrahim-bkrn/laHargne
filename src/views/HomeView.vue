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

import { ref } from 'vue'
import AppLoader from '../components/AppLoader.vue'
import AppNav from '../components/AppNav.vue'
import HeroSection from '../components/HeroSection.vue'
import MarqueeTicker from '../components/MarqueeTicker.vue'
import ManifestoSection from '../components/ManifestoSection.vue'
import CounterSection from '../components/CounterSection.vue'
import CollectionSection from '../components/CollectionSection.vue'
import LookbookSection from '../components/LookbookSection.vue'
import ContactSection from '../components/ContactSection.vue'
import AppFooter from '../components/AppFooter.vue'
import CustomCursor from '../components/CustomCursor.vue'
import ProductPage from '../components/ProductPage.vue'

// Contrôle l'affichage du loader
const loaderDone = ref(false)

// Produit actuellement ouvert en page détail (null = fermé)
const selectedProduct = ref(null)

function openProduct(product) {
  selectedProduct.value = { ...product, whatsappUrl: WHATSAPP_URL }
}

function closeProduct() {
  selectedProduct.value = null
}
</script>

<template>
  <!-- Curseur personnalisé -->
  <CustomCursor />

  <!-- Loader plein écran -->
  <AppLoader v-if="!loaderDone" @done="loaderDone = true" />

  <!-- Contenu principal -->
  <div v-if="loaderDone" class="app-wrapper">
    <AppNav :instagram-url="INSTAGRAM_URL" />

    <main>
      <HeroSection :instagram-url="INSTAGRAM_URL" />
      <MarqueeTicker />
      <ManifestoSection />
      <CounterSection />
      <CollectionSection
        :whatsapp-url="WHATSAPP_URL"
        @open-product="openProduct"
      />
      <LookbookSection :instagram-url="INSTAGRAM_URL" />
      <ContactSection
        :instagram-url="INSTAGRAM_URL"
        :whatsapp-url="WHATSAPP_URL"
      />
    </main>

    <AppFooter />

    <ProductPage
      v-if="selectedProduct"
      :product="selectedProduct"
      @close="closeProduct"
    />
  </div>
</template>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  background-color: var(--color-bg);
}
</style>
