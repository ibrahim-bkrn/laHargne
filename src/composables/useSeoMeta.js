/**
 * useSeoMeta.js — Titre, meta description et canonical par page
 *
 * Pas de dépendance externe (pas de vue-meta/@vueuse/head installé) :
 * on manipule directement le <head> au montage de la page.
 */
import { onMounted } from 'vue'

const SITE_NAME = 'LAHARGNE'
const SITE_DOMAIN = 'https://lahargne.fr'

function setMetaTag(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * @param {Object} options
 * @param {string} options.title - Titre complet de la page (ex: "Panier — LAHARGNE")
 * @param {string} options.description - Meta description
 * @param {string} options.path - Chemin de la page (ex: "/panier"), utilisé pour canonical + og:url
 */
export function useSeoMeta({ title, description, path }) {
  onMounted(() => {
    const canonicalUrl = `${SITE_DOMAIN}${path}`

    document.title = title
    setMetaTag('name', 'description', description)
    setMetaTag('property', 'og:site_name', SITE_NAME)
    setMetaTag('property', 'og:title', title)
    setMetaTag('property', 'og:description', description)
    setMetaTag('property', 'og:url', canonicalUrl)
    setCanonical(canonicalUrl)
  })
}
