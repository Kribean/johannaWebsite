<template>
<div class="container">
    <div class="container">
         <div class="row">
         <div class="card m-2" v-for="command in listCommand" :key="command.id+'ok'">
  <div class="card-body">
<div class="container">
        <div class="row">
          <div class="col-lg-10 col-sm-12">
              <p>{{command.type}}|{{command.subtype}}|{{command.price}} &#8364;</p>
          </div>
          <div class="col-lg-2 col-sm-12">
              <button class="btn btn-danger" @click="RemoveItem(command.id)">Supprimer toute la liste</button>
          </div>
      </div>
</div>
 </div>

  </div>
</div>
    </div>


 <div class="row m-2">
     <div class="card">
  <div class="card-body">
    <p>Total: <strong>{{priceCommand}} &#8364;</strong></p>
  </div>
</div>
 </div>
 <div class="row">

          <div class="card">
  <div class="card-body">
         <p>Choisissez une date</p>

  <date-picker class="inline-block h-full"  v-model="date" :disabled-dates='{weekdays:[1]}'>
    <template v-slot="{ inputValue, togglePopover }">
      <div class="flex items-center">
        <button
          class="p-2 btn btn-primary"
          @click="togglePopover()"
        >
          date
        </button>
        <input
          :value="inputValue"
          class="bg-white text-gray-700 w-full py-1 px-2 appearance-none border rounded-r focus:outline-none focus:border-blue-500 "
          readonly
        />
      </div>
    </template>
  </date-picker>

  </div>
</div>
          <div class="card mb-5 mt-3 bg-gradient-primary text-white">
  <div class="card-body bg-gradient-primary text-white ">
<div class="row height-select bg-primary">
          <select v-model="selected">
  <option disabled value="">A partir de quelle heure souhaiteriez vous votre rendez vous? Nous vous proposerons par la suite plusieurs créneaux</option>
  <option v-for="i in 10" :key="i+'hh'">{{9+i}}h</option>
</select>
</div>

<div class="row" v-if="selected">
<p>Veuillez choisir une heure précise pour commencer votre séance, le temps que vous passerez à l'institut sera de {{lapsTimeCommand/60}}h{{lapsTimeCommand%60}}min </p>
    
<div class="col-lg-2 col-sm-2 m-1 d-flex justify-content-center" v-for="time in selectedTimes" :key="time.index"><button class="btn btn-outline-success btn-sm" @click="pickTheDate(time)" >{{time.date.getHours()}}h{{time.date.getMinutes().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
})}}</button> </div>
    
    
</div>
      </div>
      </div>



 </div>

 <b-modal v-model="modalShow"  hide-footer>
<div v-if="!showValidateADate">
<div class="row">
            <div class="text-center">
  <img src="../assets/logo500.png" class="rounded" alt="logo Caera senses">
</div>
</div>
<div class="row">
  <p>Vous y êtes presque!</p>
<p>Vous souhaitez être reçu le {{dayAndhour}}</p>
<p>Si cela vous va, cliquez sur "valider le créneau" ou sinon cliquez sur annuler </p>
</div>


<button class="btn btn-success btn-lg" @click="showValidateADate=!showValidateADate">Valider ce créneau</button></div>

<div class="container" v-else-if="showValidateADate&!showValidateTheForm">
<form>
    <div class="form-group">
    <label for="name">Mon nom</label>
    <input type="text" class="form-control" id="name" v-model="name" aria-describedby="nom" placeholder="Entrer votre nom" required>
  </div>
      <div class="form-group">
    <label for="firstName">Mon prénom</label>
    <input type="text" class="form-control" id="firstName" v-model="firstname" aria-describedby="prénom" placeholder="Entrer votre prénom" required>
  </div>
        <div class="form-group">
    <label for="phone">Téléphone</label>
    <input type="text" class="form-control" id="phone" v-model="phone" aria-describedby="prénom" placeholder="Entrer votre prénom" required>
  </div>
  <div class="form-group">
    <label for="email">Mon email</label>
    <input type="email" class="form-control" id="email" v-model="email" aria-describedby="email" placeholder="Entrer votre email" required>
  </div>
  <div class="form-group">
    <label for="mention">Recommandation</label>
    <textarea class="form-control" v-model="message" id="mention" placeholder="(Optionnelle) Avez vous des recommandation? Mentionnez les ici" rows="6"></textarea>
  </div>

  <button @click="submitForm" class="btn btn-primary m-3">Confirmer mon rendez-vous et Envoyer</button>
</form>
</div>
<div class="container" v-else-if="showValidateADate&showValidateTheForm">
<div class="row">
<div class="col-4"><img src="../assets/logo500.png" class="img-thumbnail"/></div>
<div class="col-8" v-if="showValidateFinalMessage==0">
<div class="spinner-grow text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
</div>
<div class="col-8" v-if="showValidateFinalMessage==1"><p class="h3">Formulaire validé 🥰 A bientôt</p></div>
<div class="col-8" v-else-if="showValidateFinalMessage==2"><p> 😓 Oops nous rencontrons des difficultés à finaliser l'enregistrement, nous nous excusons de cela.</p><p class="h3"> Pourriez vous nous contacter au 0651 84 14 09</p> </div>

</div>
</div>
 
 </b-modal>


</div>
</template>

<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

export default {
      components: {
   
    DatePicker
  },
    data(){
        return{
            listCommand:[],
            priceCommand:0,
            lapsTimeCommand:0,
            date: new Date(),
            selected:'',
            showValidateADate:false,
            showValidateTheForm:false,
            showValidateFinalMessage:0,
            modalShow: false,
            dayAndhour:'',
            name:"",
            firstname:"",
            phone:"",
            email:"",
            message:"",
            dateMili:0,
            allDatesMiliToFetch:[],
            forbiddenDates:[]
            
        }
    },

    computed: {
        selectedTimes:function(){

          let X0 = [];
          for(let i=0; i<12;i++)
          {
           
            let dateInt = new Date(this.date.getUTCFullYear(),this.date.getMonth()+1,this.date.getDate(),this.selected.split('h')[0],i*5)
            X0=[...X0, {index:i, date:dateInt,dateMili:dateInt.getTime() }]
          }
          for(let i=0; i<12;i++)
          {
                        let dateInt = new Date(this.date.getUTCFullYear(),this.date.getMonth()+1,this.date.getDate(),parseInt(this.selected.split('h')[0])+1,i*5)
            X0=[...X0, {index:i+12, date:dateInt,dateMili:dateInt.getTime() }]
            }

            const resultX0 = X0.filter(date => !(this.forbiddenDates.includes(date['dateMili'])) );


            /*create a function allowing filter X0 within the forbidden value. forbidden value are the days and hours already picked that you can find in variable: */
            return resultX0
            
            
        },


    },

    methods: {
        pickTheDate(time){
    
          
            
            this.modalShow = !this.modalShow
            this.dayAndhour = `${this.date.getDate()}/${this.date.getMonth()+1}/${this.date.getUTCFullYear()} à ${time.date.getHours()}h${time.date.getMinutes().toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
})}`

            for(let i=0;i<this.lapsTimeCommand;i+=5) /*5 min*/
            {
              this.allDatesMiliToFetch.push(time.dateMili+i*60e3) /*1 min= 1*60e3 ms*/
              console.log(this.allDatesMiliToFetch)
            }
            this.dateMili=time.dateMili;
        },
        submitForm(){
          this.showValidateADate=false;
          this.showValidateTheForm=true;
          //const API_URL='http://localhost:3000/api/appointment/createAppointment';
          const API_URL='https://caera-senses.herokuapp.com/api/appointment/createAppointment';
              fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

      },
          body: JSON.stringify({
name: this.name,
  firstname:this.firstname,
  email:this.email,
  phone: this.phone,
  message: this.message,
  dateMili: this.dateMili,
  priceCommand: this.priceCommand,
  lapsTimeCommand: this.lapsTimeCommand,
  allDatesMiliToFetch: this.allDatesMiliToFetch
          }),
    })
      .then((result) => {
        return result.json();
      })
      .then((tableauMessages) => {
        this.tableauMessages = tableauMessages;
        this.showValidateFinalMessage=1
        setTimeout(()=>{
          localStorage.clear();
            window.location.reload()},2000);
      }).catch(()=> {this.showValidateFinalMessage=2;
        setTimeout(()=>{
            window.location.reload()},10000);      
      });
      

        },
        RemoveItem(){
            localStorage.clear()
            window.location.reload()
        }
    },

    created() {
     
     
     /**create the tables of the forbidden {date+hour} */

    //const API_URL_GET='http://localhost:3000/api/appointment/getAllAppointment'
    const API_URL_GET='https://caera-senses.herokuapp.com/api/appointment/getAllAppointment'
    
              fetch(API_URL_GET)
      .then((result) => {
      
        return result.json();
      })
      .then((resultTab) => {
       const n=resultTab.length;
		for(let i=0;i<n;i++){
		this.forbiddenDates=this.forbiddenDates.concat(resultTab[i]['allDatesMiliToFetch'])
		}
      });
        
        let dataService = [
{id:0,type:"Massages",subtype:"Head Spa 30 min",price:30,description:"Massage relaxant de la tête, du visage, de la nuque, des épaules et du buste",timePrestation:"30 min",timePause:15,timePrestationValue:30},
{id:1,type:"Massages",subtype:"Massage à la bougie 45 minutes",price:45,description:"Massage relaxant et enveloppant de tout le corps",timePrestation:"45 min",timePause:15,timePrestationValue:45},
{id:2,type:"Massages",subtype:"Massage sur-mesure 1 heure",price:60,description:"Massage du monde. Le choix du massage se fait sur place en fonction de vos besoins et de vos attentes après un rapide entretien pour une meilleure personnalisation.",timePrestation:"1 heure",timePause:15,timePrestationValue:60},
{id:3,type:"Massages",subtype:"Massage signature 1 heure 30",price:90,description:"Massage créé et personnalisable sur le moment",timePrestation:"1 heure 30",timePause:15,timePrestationValue:90},
{id:4,type:"Massages",subtype:"Massaga pierres chaudes  1 heure",price:75,description:"Des pierres de basalte chauffées pour relaxation musculaire par la chaleur",timePrestation:"1 heure",timePause:15,timePrestationValue:60},
{id:5,type:"Massages",subtype:"Massage femme enceinte  45 min",price:45,description:"Massage californien pour la détente et personnalisable pour les jambes lourdes. Il se fait en 3ème mois aboutit et le 8ème de grossesse",timePrestation:"45 min",timePause:15,timePrestationValue:45},
{id:6,type:"Rituels",subtype:"Rituel 1h",price:60,description:"30 min gommage + 30 min massage Head Spa ou massage du dos",timePrestation:"1 heure",timePause:15,timePrestationValue:60},
{id:7,type:"Rituels",subtype:"Rituel 1 h30",price:100,description:"30 min gommage + 1h massage sur-mesure",timePrestation:"1 heure 30",timePause:15,timePrestationValue:90},
{id:8,type:"Soin vajacial",subtype:"Soin vajacial   1 heure",price:45,description:"Soin pour embellir le pubis après l'épilation du maillot intégrale qui s'accompagne d'un nettoyage de peau, extraction des comédons et poils incarnés, un masque et une crème",timePrestation:"1 heure",timePause:15,timePrestationValue:60},
{id:9,type:"Soin vajacial",subtype:"Maillots intégral + soin vajacial 1 h30",price:55,description:"Soin pour embellir le pubis après l'épilation du maillot intégrale qui s'accompagne d'un nettoyage de peau, extraction des comédons et poils incarnés, un masque et une crème",timePrestation:"1 heure",timePause:15,timePrestationValue:60},
{id:10,type:"Epilations",subtype:"Maillot intégral (MI)",price:25,description:"",timePrestation:"40 min",timePause:15,timePrestationValue:40},
{id:11,type:"Epilations",subtype:"Maillot semi-intégral (MSI)",price:22,description:"",timePrestation:"30 min",timePause:15,timePrestationValue:30},
{id:12,type:"Epilations",subtype:"Maillot Brésilien (MB)",price:16,description:"",timePrestation:"25 min",timePause:15,timePrestationValue:25},
{id:13,type:"Epilations",subtype:"Maillot simple (MSI)",price:12,description:"",timePrestation:"15 min",timePause:15,timePrestationValue:15},
{id:14,type:"Epilations",subtype:"Demi-jambe (DJ)",price:15,description:"",timePrestation:"30 min",timePause:15,timePrestationValue:30},
{id:15,type:"Epilations",subtype:"Jambe entière (J)",price:22,description:"",timePrestation:"45 min",timePause:15,timePrestationValue:45},
{id:16,type:"Epilations",subtype:"Aisselle (A)",price:11,description:"",timePrestation:"15 min",timePause:15,timePrestationValue:15},
{id:17,type:"Epilations",subtype:"Sourcils (S)",price:10,description:"",timePrestation:"15 min",timePause:15,timePrestationValue:15},
{id:18,type:"Epilations",subtype:"Lèvre (L)",price:6,description:"",timePrestation:"10 min",timePause:15,timePrestationValue:10},
{id:19,type:"Epilations",subtype:"Menton (M)",price:5,description:"",timePrestation:"10 min",timePause:15,timePrestationValue:10},
{id:20,type:"Forfait épilations",subtype:"Maillot intégral + jambes entières + aisselles",price:53,description:"",timePrestation:"1 heure 30",timePause:15,timePrestationValue:90},
{id:21,type:"Forfait épilations",subtype:"Maillot intégral + demi-jambes + aisselles",price:46,description:"",timePrestation:"1 heure 15",timePause:15,timePrestationValue:75},
{id:22,type:"Forfait épilations",subtype:"Maillot semi-intégral + demi jambes + aisselles",price:43,description:"",timePrestation:"1 heure",timePause:15,timePrestationValue:60},
{id:23,type:"Forfait épilations",subtype:"Sourcil + lèvre + menton",price:16,description:"",timePrestation:"35 min",timePause:15,timePrestationValue:35},
{id:24,type:"Forfait épilations",subtype:"Maillot intégral + jambes entières + aisselles + sourcil + lèvre",price:69,description:"",timePrestation:"1 heure 45",timePause:15,timePrestationValue:105},
{id:25,type:"Soins des pieds",subtype:"PédiSpa",price:45,description:"Mise en beauté des pieds avec un bain des pieds, gommage, mise en forme de l'ongle, couper les cuticules et un massages des pieds.",timePrestation:"1 heure",timePause:15,timePrestationValue:60},
{id:26,type:"Soins des pieds",subtype:"PédiSpa peeling",price:65,description:"Un PédiSpa complète + un masque anti-callosité avant le massage",timePrestation:"1 heure 30",timePause:15,timePrestationValue:90}]

    if(localStorage.storeCaeraSenses){
       let x =  JSON.parse(localStorage.storeCaeraSenses);
    this.listCommand=dataService.filter((e)=> (x.includes(String(e.id)))||(x.includes((e.id))))

    let priceInt =0
    let lapsTimeCommandInt=0
    
    this.listCommand.forEach(element => {
        priceInt=priceInt+element.price
        lapsTimeCommandInt=lapsTimeCommandInt+element.timePrestationValue
    }); 
    

    this.priceCommand = priceInt
    this.lapsTimeCommand = lapsTimeCommandInt
    

    }
    
     

  
    
    }

}

</script>

<style scoped>

.fixedArea{
    position: fixed;
    z-index: 1000;
}

.height-select{
  height: 100px;
}

</style>