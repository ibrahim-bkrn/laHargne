<template>
  <section class="preview">
    <div class="bg">
      <img src="/images/imageProduitBleue_12_11zon.webp" alt="" aria-hidden="true" />
      <img src="/images/imageProduitNoir_19_11zon.webp" alt="" aria-hidden="true" />
      <img src="/images/imageProduitGris - Copie_14_11zon.webp" alt="" aria-hidden="true" class="last" />
    </div>
    <div class="overlay" aria-hidden="true"></div>

    <div class="content">
      <p class="label">Option 6 — Colonne alignée à droite</p>
      <h1 class="title">
        <span>Arracher</span>
        <span>la</span>
        <span>place</span>
        <span>qu'on nous</span>
        <span>donnerai</span>
        <span>jamais.</span>
      </h1>
    </div>

    <router-link to="/slogan/7" class="nav-next">Option suivante →</router-link>
    <router-link to="/slogan/5" class="nav-home">← Précédente</router-link>
  </section>
</template>

<style scoped>
.preview {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
  text-align: right;
}

.label {
  font-family: sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 1.5rem;
  text-align: right;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-family: 'Bebas Neue', 'Anton', sans-serif;
  font-size: clamp(3rem, 7.5vw, 7.5rem);
  line-height: 0.92;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #fff;
  gap: 0;
  margin: 0;
}

.title span { display: block; }

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