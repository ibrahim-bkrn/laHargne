<template>
  <section class="preview">
    <div class="bg">
      <img src="/images/imageProduitBleue_12_11zon.webp" alt="" aria-hidden="true" />
      <img src="/images/imageProduitNoir_19_11zon.webp" alt="" aria-hidden="true" />
      <img src="/images/imageProduitGris - Copie_14_11zon.webp" alt="" aria-hidden="true" class="last" />
    </div>
    <!-- Pas d'overlay ici : les photos passent à travers le texte -->

    <div class="content">
      <p class="label">Option 8 — Photos à travers le texte</p>
      <h1 class="title">
        <span>Arracher</span>
        <span>la place</span>
        <span>qu'on nous</span>
        <span>donnerai jamais.</span>
      </h1>
    </div>

    <router-link to="/" class="nav-next">← Retour accueil</router-link>
    <router-link to="/slogan/7" class="nav-home">← Précédente</router-link>
  </section>
</template>

<style scoped>
.preview {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: #0a0a0a;
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

.content {
  position: relative;
  z-index: 2;
  padding: 0 5vw;
  width: 100%;
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
  font-size: clamp(4.5rem, 12vw, 11rem);
  line-height: 0.9;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  gap: 0;
  margin: 0;

  /* Effet : les photos passent à travers le texte */
  background: linear-gradient(to bottom,
    rgba(5,5,5,0.30) 0%,
    rgba(5,5,5,0.10) 40%,
    rgba(5,5,5,0.30) 100%
  );
  background-attachment: fixed;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  /* Fallback si background-clip text non supporté */
  filter: drop-shadow(0 0 0 transparent);
}

/* On utilise une couleur image via mix-blend-mode */
.title span {
  display: block;
  color: transparent;
  background-image: url('/images/imageProduitNoir_19_11zon.webp'),
                    url('/images/imageProduitBleue_12_11zon.webp'),
                    url('/images/imageProduitGris - Copie_14_11zon.webp');
  background-size: 33.33% 100%, 33.33% 100%, 33.33% 100%;
  background-position: 0% center, 50% center, 100% center;
  background-repeat: no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  filter: brightness(1.4) contrast(1.1);
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