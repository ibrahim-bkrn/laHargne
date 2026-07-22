<template>
  <section class="preview">
    <div class="bg">
      <img src="/images/imageProduitBleue_12_11zon.webp" alt="" aria-hidden="true" />
      <img src="/images/imageProduitNoir_19_11zon.webp" alt="" aria-hidden="true" />
      <img src="/images/imageProduitGris - Copie_14_11zon.webp" alt="" aria-hidden="true" class="last" />
    </div>
    <div class="overlay" aria-hidden="true"></div>

    <div class="content">
      <p class="label">Option 7 — Diagonal · énergie streetwear</p>
      <h1 class="title">
        <span class="l1">Arracher la place</span>
        <span class="l2">qu'on nous donnerai jamais.</span>
      </h1>
    </div>

    <router-link to="/slogan/8" class="nav-next">Option suivante →</router-link>
    <router-link to="/slogan/6" class="nav-home">← Précédente</router-link>
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
  color: rgba(255,255,255,0.4);
  margin-bottom: 2rem;
}

.title {
  display: flex;
  flex-direction: column;
  font-family: 'Bebas Neue', 'Anton', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  line-height: 1;
  transform: rotate(-3deg);
  transform-origin: left center;
  gap: 0.1em;
  margin: 0;
}

.title span { display: block; }

.l1 {
  font-size: clamp(3.5rem, 9vw, 8.5rem);
  color: #fff;
}

.l2 {
  font-size: clamp(2rem, 5.2vw, 5rem);
  color: rgba(255,255,255,0.65);
  padding-left: 0.5em;
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