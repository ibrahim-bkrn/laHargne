import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/propositions',
    name: 'propositions',
    component: () => import('../views/PropositionsView.vue')
  },
  {
    path: '/flyer',
    name: 'flyer',
    component: () => import('../views/FlyerView.vue')
  },
  {
    path: '/panier',
    name: 'panier',
    component: () => import('../views/PanierView.vue')
  },
  {
    path: '/commander',
    name: 'commander',
    component: () => import('../views/CommanderView.vue')
  },
  {
    path: '/slogan/1',
    name: 'slogan-1',
    component: () => import('../views/slogan/Option1View.vue')
  },
  {
    path: '/slogan/2',
    name: 'slogan-2',
    component: () => import('../views/slogan/Option2View.vue')
  },
  {
    path: '/slogan/3',
    name: 'slogan-3',
    component: () => import('../views/slogan/Option3View.vue')
  },
  {
    path: '/slogan/4',
    name: 'slogan-4',
    component: () => import('../views/slogan/Option4View.vue')
  },
  {
    path: '/slogan/5',
    name: 'slogan-5',
    component: () => import('../views/slogan/Option5View.vue')
  },
  {
    path: '/slogan/6',
    name: 'slogan-6',
    component: () => import('../views/slogan/Option6View.vue')
  },
  {
    path: '/slogan/7',
    name: 'slogan-7',
    component: () => import('../views/slogan/Option7View.vue')
  },
  {
    path: '/slogan/8',
    name: 'slogan-8',
    component: () => import('../views/slogan/Option8View.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// /commander n'est accessible qu'en venant de /panier — bloque les accès
// directs (URL tapée à la main, lien externe, rechargement de page)
router.beforeEach((to, from) => {
  if (to.name === 'commander' && from.name !== 'panier') {
    return { name: 'panier' }
  }
})

export default router
