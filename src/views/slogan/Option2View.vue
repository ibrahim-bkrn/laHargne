<template>
  <section class="preview">
    <div class="bg">
      <img src="/images/imageProduitBleue_12_11zon.webp" alt="" aria-hidden="true" />
      <img src="/images/imageProduitNoir_19_11zon.webp" alt="" aria-hidden="true" />
      <img src="/images/imageProduitGris - Copie_14_11zon.webp" alt="" aria-hidden="true" class="last" />
    </div>
    <div class="overlay" aria-hidden="true"></div>

    <div class="content">
      <p class="label">Option 2 — Une ligne géante qui déborde</p>
      <div class="marquee-wrap">
        <h1 class="title">Arracher la place qu'on nous donnerai jamais.</h1>
      </div>
    </div>

    <router-link to="/slogan/3" class="nav-next">Option suivante →</router-link>
    <router-link to="/slogan/1" class="nav-home">← Précédente</router-link>
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
  width: 100%;
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

.marquee-wrap {
  overflow: hidden;
  width: 100%;
}

.title {
  font-family: 'Bebas Neue', 'Anton', sans-serif;
  font-size: clamp(5rem, 13vw, 13rem);
  line-height: 0.9;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #fff;
  white-space: nowrap;
  margin: 0;
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