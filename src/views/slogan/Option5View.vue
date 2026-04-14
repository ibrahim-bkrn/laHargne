<template>
  <section class="preview">
    <div class="bg">
      <img src="/images/imageProduitBleue.png" alt="" aria-hidden="true" />
      <img src="/images/imageProduitNoir.png" alt="" aria-hidden="true" />
      <img src="/images/imageProduitGris - Copie.png" alt="" aria-hidden="true" class="last" />
    </div>
    <div class="overlay" aria-hidden="true"></div>

    <div class="content">
      <p class="label">Option 5 — Centré · encadré de traits</p>
      <div class="frame">
        <span class="trait"></span>
        <h1 class="title">Arracher la place<br>qu'on nous donnerai jamais.</h1>
        <span class="trait"></span>
      </div>
    </div>

    <router-link to="/slogan/6" class="nav-next">Option suivante →</router-link>
    <router-link to="/slogan/4" class="nav-home">← Précédente</router-link>
  </section>
</template>

<style scoped>
.preview {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
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
    rgba(5,5,5,0.45) 0%,
    rgba(5,5,5,0.25) 40%,
    rgba(5,5,5,0.45) 100%
  );
}

.content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 5vw;
}

.label {
  font-family: sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  margin-bottom: 3rem;
}

.frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.trait {
  display: block;
  width: 60px;
  height: 1px;
  background: rgba(255,255,255,0.5);
}

.title {
  font-family: 'Bebas Neue', 'Anton', sans-serif;
  font-size: clamp(2.2rem, 5.5vw, 5.5rem);
  line-height: 1.1;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #fff;
  text-align: center;
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