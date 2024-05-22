<script>
import axios from "axios";
import AppRestaurant from '../components/AppRestaurant.vue';
import AppLoader from '../components/AppLoader.vue'
import AppCart from "../components/AppCart.vue";



export default {
    name: "AppPageRestaurant",
    
    data() {
        return {
            baseApiUrl: "http://127.0.0.1:8000/api/",
            apiImageUrl: 'http://127.0.0.1:8000/storage/',
            categories: [],
            Risultato: [],
            ArrayCategory: [],
            isLoading: true,
            restaurantId: null,
            singleRestaurant:'',
            Cart:[],
            showModal: false,
        }
    },

    components: {
        AppRestaurant,
        AppLoader,
        AppCart,
    },

    mounted() {
        // se il carrello non è vuoto
        //e se l'id del ristorante del piatto che stiamo aggiungendo non è uguale all'id del ristorante di un piatto gia inserito 
        

        this.restaurantId = this.$route.params.id

        axios.get( this.baseApiUrl + 'restaurants/' + this.restaurantId ).then(res => {

            if (res.data.success) {

                this.singleRestaurant = res.data.results

                console.log(res.data);

            } else {
                this.$router.push({ name: 'home' })
            }


        })
        console.log(JSON.parse(localStorage.getItem("cart")));
        // console.log("carrello",this.Carrello)

        this.Cart=JSON.parse(localStorage.getItem("cart"))
    },
    methods:{
        AddItemToCart(plate){

            //gestione ricerca id 
            if( this.Cart.length!=0 && this.Cart.find((Item)=>Item.restaurant_id != plate.restaurant_id)){
                console.log("Diverso");
                this.showModal = true;
            }else{
                const CurrentItem=this.Cart.find((Item)=>Item.id === plate.id)

                if(CurrentItem){

                    CurrentItem.quantity++;

                }else{

                    let Item = plate;

                    Item.quantity = 1;

                    this.Cart.push(Item);
                }
                //stringa inserita per la persistenza dei dati nello storage del browser
                localStorage.setItem("cart", JSON.stringify(this.Cart));

                console.log(JSON.parse(localStorage.getItem("cart")));
            }
        },

        closeModal() {
            this.showModal = false; 
        },

        RemoveItemFromCart(plate){
            const plateIndex = this.Cart.findIndex((Item)=>Item.id === plate.id)

            if(plateIndex != -1){

                const plate = this.Cart[plateIndex]

                if(plate.quantity > 1){

                    plate.quantity -= 1
                }
                else{
                    this.Cart.splice(plateIndex,1)
                }
                

            }
            localStorage.setItem("cart", JSON.stringify(this.Cart));
            // console.log("qualcosa",this.Cart)
            console.log(JSON.parse(localStorage.getItem("cart")));
        },

        // svuotamento carrello dal modale
        emptyCart() {
            this.Cart = [];
            localStorage.removeItem("cart");
            this.showModal = false; 
        },
    },
    // watch: { 
    //         Cart(newItems) { 
    //             localStorage.setItem(Cart(cart), JSON.stringify(newItems)); 
    //         }, 
    //     }, 

}
</script>


<template>
    <div id="restaurant" style="width: 100%;" class="container  position-relative d-flex justify-content-center align-items-center  flex-column   pt-5 ">
        <div class="back pe-5 me-5 ">
           <router-link class="text-decoration-none" :to="{ name: 'home'}"><i class="my-arrow fa-solid fa-reply"></i></router-link> 
        </div>
        <div class="my-jumbo row card d-flex flex-row  " style="width: 90%;">
            <div class="col-6 p-0">
                <div class="img-box">
                    <img class="img-fluid " :src="apiImageUrl + singleRestaurant.img_res"/>
                </div>
            </div>
            <div class="col-6 p-0 card-body">
                <h1 class="card-title">{{ singleRestaurant.name_res }}</h1>
            </div>
        </div>
        <div class="d-flex justify-content-center pt-5">
            <h2>Menù</h2>
        </div>
        <div class=" d-flex justify-content-center pt-5">
            <div class="d-flex flex-wrap justify-content-center gap-3 " style="width: calc(100% / 14rem - 1rem/4 * 5);">

                <div v-for="plate in singleRestaurant.plates"  class="card " style="width: 14rem;">
                    <img  :src="apiImageUrl + plate.image" class="card-img-top object-fit-cover"
                        alt="@" style="height: 170px;">
                    <div class="card-body" >
                        <h5 class="card-title">{{ plate.name }}</h5>
                        <div class="d-flex justify-content-between">
                            <h6 class="card-text">{{ plate.price }} &euro;</h6>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center gap-2">
                        <button  @click="AddItemToCart(plate)">Add</button>
                        <button  @click="RemoveItemFromCart(plate)">Remove</button>  
                    </div>
                </div>
            </div>
        </div>   
    </div>
    <div>
        <h1>Carrello</h1>
        <ul>
            <li class="fs-4 fw-bolder " v-for="(item, index) in Cart" :key="index">
                {{ item.name }}
                {{ item.quantity }}
            </li>
        </ul>
        
        <!-- modale gestione carrello -->
        <div v-if="showModal" class="modal fade show d-block" tabindex="-1" style="background: rgba(0, 0, 0, 0.5);">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Attention</h5>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <p>Are you trying to add a plate from a different restaurant, empty your cart first</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                    <button type="button" class="btn btn-primary" @click="emptyCart">Empty cart</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
@use '../styles/variables' as *;

.back{
    position: absolute;

    left: -10px;
    top: 45px;

    .my-arrow{
        font-size: 35px;
        color: rgb(130, 148, 196);

        &:hover{
            color: #F6F3E4;
        }
    }
}

.my-jumbo{
    
    .img-box{
        height: 100%;
        width: 100%;
    }

    h1{
        text-align: center;
        margin-top: 15px;
        font-family:"Pacifico", cursive;
        text-shadow:2px 3px rgb(172, 177, 214);
        color: #F6F3E4; 
    }
}

.card{
    border: solid 1px #F6F3E4;
    background-color: rgb(130, 148, 196);
}

.modal.show.d-block {
  display: block;
}

</style>