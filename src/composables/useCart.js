/**
 * useCart.js — État global du panier
 *
 * Un seul état partagé par toute l'app (déclaré ici, hors de la fonction
 * useCart) : chaque composant qui appelle useCart() lit/modifie le même panier.
 * Persisté dans localStorage à chaque changement.
 *
 * Article de panier : { id, nom, format, couleur, couleurHex, prix, qty, image }
 * - id         : identifiant du produit (product.id)
 * - nom        : product.name
 * - format     : taille choisie (product.sizes)
 * - couleur    : label du coloris choisi (variant.label)
 * - couleurHex : code hex du coloris (variant.hex), pour afficher une pastille
 * - prix       : prix unitaire, nombre (ex: 15.9)
 * - qty        : quantité
 * - image      : url de la variante choisie, pour l'affichage dans le panier
 *
 * Un article est identifié de façon unique par (id, format, couleur) : même
 * produit + même taille mais coloris différent = deux lignes séparées.
 */
import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'lahargne_cart'
const MINI_CART_DELAY = 4000

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

// ---- État partagé (singleton) ----
const items = ref(loadFromStorage())
const miniCartOpen = ref(false)
let miniCartTimer = null

watch(
  items,
  (val) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  },
  { deep: true },
)

function findIndex(id, format, couleur) {
  return items.value.findIndex(
    (i) => i.id === id && i.format === format && i.couleur === couleur,
  )
}

function openMiniCart() {
  miniCartOpen.value = true
  if (miniCartTimer) clearTimeout(miniCartTimer)
  miniCartTimer = setTimeout(() => {
    miniCartOpen.value = false
    miniCartTimer = null
  }, MINI_CART_DELAY)
}

function closeMiniCart() {
  miniCartOpen.value = false
  if (miniCartTimer) {
    clearTimeout(miniCartTimer)
    miniCartTimer = null
  }
}

function addItem(item) {
  const qty = item.qty ?? 1
  const idx = findIndex(item.id, item.format, item.couleur)

  if (idx !== -1) {
    items.value[idx].qty += qty
  } else {
    items.value.push({
      id: item.id,
      nom: item.nom,
      format: item.format,
      couleur: item.couleur ?? '',
      couleurHex: item.couleurHex ?? '',
      prix: item.prix,
      image: item.image ?? '',
      qty,
    })
  }

  openMiniCart()
}

function removeItem(id, format, couleur) {
  const idx = findIndex(id, format, couleur)
  if (idx !== -1) items.value.splice(idx, 1)
}

function updateQty(id, format, couleur, qty) {
  const idx = findIndex(id, format, couleur)
  if (idx === -1) return

  if (qty <= 0) {
    items.value.splice(idx, 1)
  } else {
    items.value[idx].qty = qty
  }
}

function clearCart() {
  items.value = []
}

const count = computed(() => items.value.reduce((sum, i) => sum + i.qty, 0))
const total = computed(() => items.value.reduce((sum, i) => sum + i.prix * i.qty, 0))

export function useCart() {
  return {
    items,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    count,
    total,
    miniCartOpen,
    openMiniCart,
    closeMiniCart,
  }
}
