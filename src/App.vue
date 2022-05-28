<template>
  <div id="app">
    <nav>
      <router-link class="btn btn-info m-2" to="/">Accueil</router-link>
      <router-link class="btn btn-info  m-2" to="/prestation">Prestation</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
h1, h2, h3 {
  font-family: 'Dancing Script', cursive; ;
}
</style>
