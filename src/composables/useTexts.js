/**
 * useTexts.js — Textes du site lus depuis un Google Sheets public
 *
 * Feuille "LAHARGNE - Textes" : colonnes Section | Clé | Texte.
 * Le client modifie une cellule "Texte", le site l'affiche au prochain
 * chargement de page — aucun redéploiement requis.
 *
 * Comportement :
 * - Feuille injoignable (réseau, droits pas configurés...) → repli sur le
 *   texte codé en dur dans chaque composant. Jamais de page cassée.
 * - Cellule vide alors que la feuille EST bien chargée → selon le champ :
 *   soit repli sur le texte par défaut (cas général, via `t()`), soit
 *   comportement spécifique géré par le composant lui-même (ex: prix barré
 *   masqué si `produit_ancien_prix` est vide, bouton caché si une URL est
 *   vide) — dans ce cas le composant doit lire `remoteTexts` directement
 *   plutôt que passer par `t()`.
 */
import { ref } from 'vue'

const TEXTS_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1_fegG0UCCj-2yjnjAj8Fcpcil_L0Owc0dXigpB8_Ewo/export?format=csv&gid=772660520'

// null tant que pas chargé (ou en cas d'échec) ; sinon { [cle]: texte }
const remoteTexts = ref(null)
let fetchPromise = null

// Parseur CSV minimal gérant les champs entre guillemets (virgules internes,
// guillemets échappés en ""). Ne gère pas les retours à la ligne à l'intérieur
// d'une cellule — nos textes tiennent sur une seule ligne.
function parseCsvLine(line) {
  const cells = []
  let cur = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (inQuotes) {
      if (c === '"') {
        if (line[i + 1] === '"') {
          cur += '"'
          i++
        } else {
          inQuotes = false
        }
      } else {
        cur += c
      }
    } else if (c === '"') {
      inQuotes = true
    } else if (c === ',') {
      cells.push(cur)
      cur = ''
    } else {
      cur += c
    }
  }
  cells.push(cur)
  return cells
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/)
  const result = {}

  for (const line of lines.slice(1)) {
    if (!line.trim()) continue
    const cells = parseCsvLine(line)
    const cle = cells[1]?.trim()
    if (!cle) continue
    result[cle] = cells[2] ?? ''
  }

  return result
}

function fetchTexts() {
  if (fetchPromise) return fetchPromise

  fetchPromise = fetch(TEXTS_CSV_URL)
    .then(res => {
      if (!res.ok) throw new Error('Textes injoignables')
      return res.text()
    })
    .then(text => {
      remoteTexts.value = parseCsv(text)
    })
    .catch(() => {
      remoteTexts.value = null
    })

  return fetchPromise
}

export function useTexts() {
  // Texte en direct si la clé existe et n'est pas vide, sinon la valeur
  // de secours codée en dur passée par le composant
  function t(key, fallback) {
    const value = remoteTexts.value?.[key]
    return value !== undefined && value !== '' ? value : fallback
  }

  return { remoteTexts, fetchTexts, t }
}
