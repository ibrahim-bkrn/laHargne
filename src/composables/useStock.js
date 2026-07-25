/**
 * useStock.js — Stock produit lu depuis un Google Sheets public
 *
 * Le client (le frère) modifie directement les quantités dans la feuille
 * "LAHARGNE - Stock" sur Google Drive — aucun redéploiement du site requis.
 * Le site va lire cette feuille (exportée en CSV) au chargement de la page.
 *
 * Format attendu de la feuille (1re ligne = en-têtes) :
 *   Couleur,XS,S,M,L,XL,XXL
 *   Gris foncé,0,0,0,1,0,1
 *   ...
 *
 * Si la feuille est injoignable (réseau, droits de partage pas encore
 * configurés, etc.), le site retombe silencieusement sur le stock par
 * défaut codé en dur dans CollectionSection.vue — jamais de page cassée.
 */
import { ref } from 'vue'

const STOCK_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1_fegG0UCCj-2yjnjAj8Fcpcil_L0Owc0dXigpB8_Ewo/export?format=csv&gid=0'

// null tant que pas chargé (ou en cas d'échec) ; sinon { [couleur]: { [taille]: qty } }
const remoteStock = ref(null)
let fetchPromise = null

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/)
  if (lines.length < 2) return {}

  const sizeHeaders = lines[0].split(',').slice(1).map(h => h.trim())
  const result = {}

  for (const line of lines.slice(1)) {
    const cells = line.split(',').map(c => c.trim().replace(/^"|"$/g, ''))
    const couleur = cells[0]
    if (!couleur) continue

    const sizes = {}
    sizeHeaders.forEach((size, i) => {
      sizes[size] = parseInt(cells[i + 1], 10) || 0
    })
    result[couleur] = sizes
  }

  return result
}

function fetchStock() {
  if (fetchPromise) return fetchPromise

  fetchPromise = fetch(STOCK_CSV_URL)
    .then(res => {
      if (!res.ok) throw new Error('Stock injoignable')
      return res.text()
    })
    .then(text => {
      remoteStock.value = parseCsv(text)
    })
    .catch(() => {
      // Échec silencieux — CollectionSection.vue retombe sur son stock par défaut
      remoteStock.value = null
    })

  return fetchPromise
}

export function useStock() {
  return { remoteStock, fetchStock }
}
