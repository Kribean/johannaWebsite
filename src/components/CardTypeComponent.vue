<template>

<div class="card mb-1 onCard" @click="AddBasket(dataValue.id)">
    <div class="card-body">
    <div class="row">
        <div class="col-lg-10 col-sm-12">
            <div class="row">
                <div class="col-lg-4 col-sm-12">
            <h3>{{ dataValue.subtype}}</h3>
        </div>
            <div class="col-lg-2 col-sm-12">
            <p>{{ dataValue.price}} &#8364;</p>
        </div>
                <div class="col-lg-2 col-sm-12">
            <p>{{ dataValue.timePrestation}}</p>
        </div>
    </div>
    <div class="row">
                <div class="col-12">
                <p>{{ dataValue.description}}</p>
            
        </div>
    </div>
        </div>
        <div class="col-lg-2 col-sm-12 d-flex justify-content-center">
            <button v-show="boolChoice" type="button" class="btn btn-primary btn-sm " @click.stop="DeleteBasket(dataValue.id)">Retiré du panier</button>
        </div>
    </div>
            
    </div>
</div>

</template>

<script>

export default {
    
    name: 'CardTypeComponent',
    props:['dataValue'],
    data(){
        return{
            boolChoice:false
        }

    },
    methods: {
        AddBasket(id){
            this.boolChoice=true;

            if(localStorage.storeCaeraSenses){
                console.log("premier")
                console.log(id)
            let x = JSON.parse(localStorage.storeCaeraSenses);
            console.log(x)
            if(!(id+1 in x) ||!(String(id+1) in x) )
                { console.log("je suis la")
                    x=[...x,id]}
            console.log(x)
            localStorage.setItem('storeCaeraSenses',JSON.stringify(x))
            
            }else
            {
                console.log("deuxieme")
                localStorage.setItem('storeCaeraSenses',JSON.stringify([id]))
            }


        },
        DeleteBasket(id){
            this.boolChoice=false;
            if(localStorage.storeCaeraSenses){
                console.log(id)
            let x = JSON.parse(localStorage.storeCaeraSenses);
            console.log(x)
            x=x.filter((e)=>String(e)!=String(id))
            console.log(x)
            localStorage.setItem('storeCaeraSenses',JSON.stringify(x))
            
            }
        }
    },


}

</script>

<style scoped>
.onCard :hover{
    background-color: #eeeeee;
    cursor: pointer;
   

}

</style>