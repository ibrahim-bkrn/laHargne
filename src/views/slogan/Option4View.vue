<template>
  <section class="preview">
    <div class="bg">
      <img src="/images/imageProduitBleue.png" alt="" aria-hidden="true" />
      <img src="/images/imageProduitNoir.png" alt="" aria-hidden="true" />
      <img src="/images/imageProduitGris - Copie.png" alt="" aria-hidden="true" class="last" />
    </div>
    <div class="overlay" aria-hidden="true"></div>

    <div class="content">
      <p class="label">Option 4 — Outline + mot clé plein</p>
      <h1 class="title">
        <span class="outline">Arracher</span>
        <span class="outline">la place</span>
        <span class="outline">qu'on nous donnerai</span>
        <span class="solid">jamais.</span>
      </h1>
    </div>

    <router-link to="/" class="nav-next">← Retour accueil</router-link>
    <router-link to="/slogan/3" class="nav-home">← Précédente</router-link>
  </section>
</template>

<style scoped>
.preview {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #0d0d0d;
}

.bg {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.bg img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
.bg img:not(:last-child) { border-right: 1px solid rgba(255,255,255,0.06); }
.bg .last { object-position: center 15%; }

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom,
    rgba(5,5,5,0.30) 0%,
    rgba(5,5,5,0.10) 35%,
    rgba(5,5,5,0.30) 65%,
    rgba(5,5,5,0.75) 100%
  );
}

.content {
  position: relative;
  z-index: 2;
  padding: 0 5vw;
}

.label {
  font-family: sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.45);
  margin-bottom: 2rem;
}

.title {
  display: flex;
  flex-direction: column;
  font-family: 'Bebas Neue', 'Anton', sans-serif;
  font-size: clamp(3.5rem, 8.5vw, 8rem);
  line-height: 0.95;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  gap: 0.05em;
}

.title span { display: block; }

.outline {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255,255,255,0.6);
}

.solid {
  color: #fff;
  -webkit-text-stroke: 0;
}

.nav-next, .nav-home {
  position: fixed;
  bottom: 2rem;
  font-family: sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  z-index: 10;
  transition: color 0.2s;
}
.nav-next:hover, .nav-home:hover { color: #fff; }
.nav-next { right: 2rem; }
.nav-home { left: 2rem; }
</style>