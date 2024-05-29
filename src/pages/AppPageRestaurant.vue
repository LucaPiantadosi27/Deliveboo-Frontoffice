<script>
import axios from "axios";
import AppRestaurant from '../components/AppRestaurant.vue';
import AppLoader from '../components/AppLoader.vue'
import { store } from "../components/store";


export default {
    name: "AppPageRestaurant",

    data() {
        return {
            store,
            baseApiUrl: "http://127.0.0.1:8000/api/",
            apiImageUrl: 'http://127.0.0.1:8000/storage/',
            categories: [],
            Risultato: [],
            ArrayCategory: [],
            isLoading: true,
            restaurantId: null,
            singleRestaurant: '',
            showModal: false,
        }
    },

    components: {
        AppRestaurant,
        AppLoader,
        
    },

    mounted() {
        document.documentElement.scrollTop = 0

        this.restaurantId = this.$route.params.id

        axios.get(this.baseApiUrl + 'restaurants/' + this.restaurantId).then(res => {
            if (res.data.success) {
                this.singleRestaurant = res.data.results
                console.log(res.data);
            } else {
                this.$router.push({ name: 'home' })
            }
        })
        console.log(JSON.parse(localStorage.getItem("cart")));

        if (JSON.parse(localStorage.getItem("cart")) != null) {
            this.store.Cart = JSON.parse(localStorage.getItem("cart"))
        }
    },
    methods: {
        AddItemToCart(plate) {
            if (this.store.Cart.items.length != 0 && this.store.Cart.items.find((Item) => Item.restaurant_id != plate.restaurant_id)) {
                console.log("Diverso");
                this.showModal = true;
            } else {
                const CurrentItem = this.store.Cart.items.find((Item) => Item.id === plate.id)

                if (CurrentItem) {
                    CurrentItem.quantity++;
                    CurrentItem.subTotal = CurrentItem.price * CurrentItem.quantity
                    CurrentItem.subTotal= CurrentItem.subTotal.toFixed(2)
                } else {
                    let Item = plate;
                    Item.quantity = 1;
                    Item.restaurant = this.singleRestaurant.name_res
                    Item.subTotal = Item.price
                    this.store.Cart.items.push(Item);
                }

                this.store.Cart.total = 0
                this.store.Cart.items.forEach(item => {
                    this.store.Cart.total += Number(item.subTotal)
                });
                this.store.Cart.total= this.store.Cart.total.toFixed(2)

                localStorage.setItem("cart", JSON.stringify(this.store.Cart));
                console.log(JSON.parse(localStorage.getItem("cart")));
            }
        },

        closeModal() {
            this.showModal = false;
        },

        RemoveItemFromCart(plate) {
            const plateIndex = this.store.Cart.items.findIndex((Item) => Item.id === plate.id)

            if (plateIndex != -1) {
                const plate = this.store.Cart.items[plateIndex]

                if (plate.quantity > 1) {
                    plate.quantity -= 1
                    plate.subTotal = plate.price * plate.quantity
                    plate.subTotal= plate.subTotal.toFixed(2)
                } else {
                    this.store.Cart.items.splice(plateIndex, 1)
                }
            }

            this.store.Cart.total = 0
            this.store.Cart.items.forEach(item => {
                this.store.Cart.total += Number(item.subTotal)
            });
            this.store.Cart.total= this.store.Cart.total.toFixed(2)

            localStorage.setItem("cart", JSON.stringify(this.store.Cart));
            console.log(JSON.parse(localStorage.getItem("cart")));
        },

        emptyCart() {
            this.store.Cart = {
                items: [],
                total: 0
            };
            localStorage.removeItem("cart");
            this.showModal = false;
        },
        
        isItemInCart(plateId) {
            return this.store.Cart.items.some(item => item.id === plateId);
        },

        scrollToTarget() {
            const targetSection = document.getElementById('target');
            if (targetSection) {
              targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        },
    },
}
</script>

<template>

    <div id="restaurant" style="width: 100%;"
        class="position-relative d-flex justify-content-center align-items-center  flex-column  pt-5 ">
        <div class="container position-relative mb-5">
            <!-- PULSANTE BACK -->
            <div @click="scrollToTarget()" class="back pe-5 me-5 ">
                <router-link class="text-decoration-none" :to="{ name: 'home' }"><i
                        class="my-arrow fa-solid fa-reply"></i></router-link>
            </div>
    
            <!-- JUMBO RISTO -->
            <div class="my-jumbo p-0 row card d-flex flex-row w-100 rounded-5 shadow-lg  " style="width: 90%;">
                <div class="col-7 p-0 position-relative">
                    <div class="img-box">
                        <img class="img-fluid rounded-start-5 " :src="apiImageUrl + singleRestaurant.img_res" />
                    </div>
                    <img :src="apiImageUrl + 'branding/wave-restaurant.png'" class="wave-restaurant img-fluid h-100 position-absolute" alt="@">
                </div>
                <div class="col-4 p-3 card-body position-relative">
                    <h1 class="card-title">{{ singleRestaurant.name_res }}</h1>
                    <h3>{{ singleRestaurant.address_res }}</h3>
                    <div class="d-flex gap-2">
                        <span class="badge text-bg-light" v-for="tag in singleRestaurant.categories">{{ tag.name }}</span>
                    </div>
                </div>
            </div>
    
            <!-- MENU PIATTI -->
            <div class="d-flex justify-content-between w-100 pb-3" id= menu >
                <div class="w-75 ">
                    <div class=" d-flex justify-content-between pt-5 ">
                        <div class="d-flex flex-wrap justify-content-start gap-3  rounded-2"
                            style="width: calc(100% / 14rem - 1rem/4 * 5);">
    
                            <!-- SINGOLO PIATTO -->
                            <div v-for="plate in singleRestaurant.plates" class="my-card card position-relative rounded-4 shadow-lg" style="width: 75%;">
                                <div class="d-flex flex-wrap">
                                    <div class="my-plate rounded-top-4 object-fit-cover" style="height: 100px ;width: 200px;">
                                        <img :src="apiImageUrl + plate.image" class="h-100 w-100 rounded-4 object-fit-covers" alt="@">

                                    </div>
                                        
                                    <div class="card-body d-flex flex-column  text-black border-black">
                                        <h5 class="card-title">{{ plate.name }}</h5>
                                        <p class="fst-italic">{{ plate.ingredients }}</p>
                                    </div>

                                    <div class="w-100 d-flex justify-content-between p-2">
                                        <h6 class="card-text px-3 pt-2">{{ plate.price }} &euro;</h6>

                                        <button v-if="!isItemInCart(plate.id)" class="btn btn-success" @click="AddItemToCart(plate)">
                                        Add to cart <i class="fa-solid fa-shopping-cart"></i>
                                        </button>
                                        <div class="d-flex gap-3 pe-3" v-else>
                                            <button class="btn btn-outline-danger" @click="RemoveItemFromCart(plate)"><i class="fa-solid fa-minus"></i></button>
                                            <button class="btn btn-outline-success" @click="AddItemToCart(plate)"><i class="fa-solid fa-plus"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    
                <!-- CARRELLO -->
                
                <div class="w-25 rounded-5 shadow-lg" id="Carrello">
                    
                    <div v-if="store.Cart.items.length > 0">
                        <h2 class="text-center pt-2"> <i class="fa-solid fa-shopping-cart small"></i></h2>
                        <h3 class="text-center fs-1 fw-bold">{{ store.Cart.items[0].restaurant }}</h3>
                        <p class="text-center fs-5 fw-semibold font-weight-400 text-black">Order Summary:</p>
                        <div v-for="item in store.Cart.items" :key="item.id" class="p-3 text-start text-white">
                            <div class="d-flex justify-content-between align-items-center pb-3 text-black">
                                <div>{{ item.quantity }}x {{ item.name }}</div>
                                <div>{{ item.subTotal }} &euro;</div>
                            </div>
                            <div class="d-flex justify-content-center align-items-center border-bottom border-black pb-3 gap-3">
                                <button class="btn btn-outline-danger" @click="RemoveItemFromCart(item)"><i class="fa-solid fa-minus"></i></button>
                                <button class="btn btn-outline-success" @click="AddItemToCart(item)"><i class="fa-solid fa-plus"></i></button>
                            </div>
                        </div>
                        <h4 class="p-3 text-end text-white text text-center text-bg-primary rounded-5 m-3">Total: {{ store.Cart.total }} &euro;</h4>
                        <div class="text-center mt-3 pb-3">
                            <router-Link class="btn btn-success p-2" :to="{ name: 'cart'}">Go to Checkout</router-Link>
                        </div>
                    </div>
                    <p v-else class="fs-5 text-center fw-bolder p-3">Your Cart is Empty </p>
               
                    <div v-if="showModal" class="modal fade show d-block" tabindex="-1"
                        style="background: rgba(0, 0, 0, 0.5);">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            </div>
                        </div>
                    </div>
    
                    <!-- MODALE CONFLITTO PIATTI -->
                    <div v-if="showModal" class="modal fade show d-block" tabindex="-1"
                        style="background: rgba(0, 0, 0, 0.5);">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Attention</h5>
                                    <button type="button" class="btn-close" @click="closeModal"></button>
                                </div>
                                <div class="modal-body">
                                    <p>You already have items in your cart with {{ store.Cart.items[0].restaurant }}. Do you wish
                                        to empty your cart?</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                                    <button type="button" class="btn btn-primary" @click="emptyCart">Empty cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>



<style lang="scss" scoped>
@use '../styles/variables' as *;

#restaurant{
    background-color: #f8ebde;
}

.back {
    position: absolute;

    left: -10%;
    top: 4%;

    .my-arrow {
        font-size: 35px;
        color: #ff0800;
    }
}

.my-jumbo {

    .img-box {
        height: 100%;
        width: 100%;
    }

    h1 {
        text-align: center;
        margin-top: 15px;
        font-family: 'Open Sans', sans-serif;
        font-weight: bold;
        color: #d62300;
    }

    .wave-restaurant{
        top: 0;
        right: 0%;
    }
}

.card {
    border: solid 1px #9c999983;
    background-color: #f8ebde;
    color: #d62300;
    
}

.my-card{
    
    border: solid 1px #9c999983;
    
}

.modal.show.d-block {
    display: block;
}

h2 {
        font-family: "chicle", cursive;
        color: #d62300;
    }


#menu{
    margin-top: 40px;

    .my-plate{
        left: -10px;
        top: -10px;
    }

}
#Carrello {
    margin-top: 47px;
    width: 15%;
    border: solid 1px #9c999983;
    background-color: #f8ebde;
    color: #d62300;
  
    
    border-radius: 0.2em;
    height: 50%;
    // margin: 1em 0 1em 0;
    overflow-y: auto;
    // padding: 1rem;

    .lista {
        list-style: none;
        color: #d38f4a;
    }

    h2 {
        font-family: "chicle", cursive;
        color: #d62300;
    }
}
</style>