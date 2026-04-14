import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/global.css'

const app = createApp(App)

app.use(router)

/**
 * Directive globale v-scroll-reveal
 * Usage : <div v-scroll-reveal>          → apparition au scroll, sans délai
 *         <div v-scroll-reveal="200">    → apparition au scroll avec 200ms de délai
 *
 * Ajoute la classe CSS .reveal à l'élément, puis .visible quand
 * l'élément entre dans le viewport. Les styles sont dans global.css.
 */
app.directive('scroll-reveal', {
  mounted(el, binding) {
    el.classList.add('reveal')
    const delay = typeof binding.value === 'number' ? binding.value : 0

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add('visible'), delay)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12 },
    )

    observer.observe(el)
  },
})

app.mount('#app')
