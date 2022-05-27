<template>

<div class="container">

    <div class="card mb-2" v-for="data in dataTypes" :key="data">
  <div class="card-header">
    <h2>{{data}}</h2>
  </div>
  <div class="card-body">
    <SectionMenuComponent :valueType="data" @add-or-delete-item="addOrDeleteItem"></SectionMenuComponent>
  </div>
</div>
    
</div>

</template>

<script>
import SectionMenuComponent from './SectionMenuComponent.vue'
import  './CardTypeComponent.vue'

export default {
  name: 'MenuComponent',
  components: {
    SectionMenuComponent
},
methods: {
        addOrDeleteItem(id){
            this.listOfItem.push(id);
            console.log(this.listOfItem)
        }
    },

data(){
    return{
        listOfItem:[],
        dataTypes:["Massages","Rituels","Soin vajacial","Epilations","Forfait épilations","Soins des pieds"],
    }
}


}

</script>

<style>

</style>