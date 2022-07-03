
<template>
        <header class="masthead">
        <div class="container">
            <div class="masthead-heading"><h1>Caera Senses</h1></div>
            <div class="masthead-subheading">Réserver votre soin</div>
            <div class="row d-flex justify-content-center">
<div class="col-10 p-3 mb-2 bg-light text-dark rounded">
            <router-link class="btn btn-primary btn-xl text-uppercase" to="/prestation"> Réserver  </router-link>
</div>
            </div>

        </div>
    </header>
</template>

<script>
export default {
  name: 'BannerComponent',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>

/*$varRed:#c9c9c9;
$primary:#c29938;
@import '../../node_modules/bootstrap/scss/bootstrap.scss';
@mixin family{
  font-family: 'Dancing Script', cursive;
  color:$varRed
}*/
header.masthead {
    padding-top: 10.5rem;
    padding-bottom: 6rem;
    text-align: center;
    color: #fff;
    background-image: url("../assets/bann5760×3840.png");
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-position: center center;
    background-size: cover;
  }
  header.masthead .masthead-subheading {
    font-size: 1.5rem;
    font-style: italic;
    line-height: 1.5rem;
    margin-bottom: 25px;
    font-family: "Roboto Slab", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }
  header.masthead .masthead-heading {
    font-size: 3.25rem;
    font-weight: 700;
    line-height: 3.25rem;
    margin-bottom: 2rem;
    font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }
  
  @media (min-width: 768px) {
    header.masthead {
      padding-top: 17rem;
      padding-bottom: 12.5rem;
    }
    header.masthead .masthead-subheading {
      font-size: 2.25rem;
      font-style: italic;
      line-height: 2.25rem;
      margin-bottom: 2rem;
    }
    header.masthead .masthead-heading {
      font-size: 4.5rem;
      font-weight: 700;
      line-height: 4.5rem;
      margin-bottom: 4rem;
    }
  }
</style>
