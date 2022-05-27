
<template>
  <div class="home">
    <BannerComponent></BannerComponent>
    <DescriptionComponent></DescriptionComponent>
    <MapComponent></MapComponent>

  </div>
</template>

<script>
// @ is an alias to /src
import BannerComponent from '@/components/BannerComponent.vue'
import DescriptionComponent from '@/components/DescriptionComponent.vue'
import MapComponent from '../components/MapComponent.vue'



export default {
  name: 'HomeView',
  components: {
    BannerComponent,
    DescriptionComponent,
    MapComponent,
    
}
}
</script>
