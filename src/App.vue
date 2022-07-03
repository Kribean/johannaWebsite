<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="btn btn-outline-primary m-2" to="/">Accueil</router-link>
      <router-link class="btn btn-outline-primary  m-2" to="/prestation">Prestation </router-link>
      <a href="https://www.instagram.com/caerasenses" target="_blank" class="m-2"><i class="fa-brands fa-instagram fa-2xl"></i></a>
      <a href="https://www.facebook.com/caerasenses" target="_blank" class="m-2"><i class="fa-brands fa-facebook fa-2xl"></i></a>

    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">

@mixin family{
  font-family: 'Dancing Script', cursive;
}
h1, h2, h3 {
  @include family
}
</style>
