<template>

<div>
    <div class="container fixedArea d-flex justify-content-end" v-if="step==0" @click="nextStep(1)"><button class="btn btn-secondary btn-lg btn-block">Accéder à mon panier</button></div>
    <div class="container">
<div class="row">
            <div class="text-center">
  <img src="../assets/logo500.png" class="rounded" alt="logo Caera senses">
</div>
</div>
<div class="row text-center">
    <h1>Caera senses</h1>
    <p v-if="step==0"> Choisissez vos prestations puis valider via l'onglet "Accéder au panier"</p>
</div>
    </div>
    <div class="container">
    <div class="row pt-5" v-if="step==0">
        <MenuComponent></MenuComponent>
    </div>
    <div class="row pt-5" v-else-if="step==1">
        <CalendarComponent></CalendarComponent>
    </div>
        <div class="row pt-5" v-else>
        oops
    </div>
    </div>

    
</div>

</template>

<script>
import MenuComponent from '@/components/MenuComponent.vue'
import CalendarComponent from '@/components/CalendarComponent.vue'




export default {
  name: 'PrestationView',
  components: {
    MenuComponent,CalendarComponent

},
data() {
    return {
        showBtnBasket:true,
        step:0
    }
},

methods: {
    nextStep(x){
        this.step=x
    }
},

}
</script>


<style scoped>
.fixedArea{
    position: fixed;
    z-index: 1000;
}


</style>