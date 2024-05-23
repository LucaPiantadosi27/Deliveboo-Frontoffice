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
            singleRestaurant: '',
            Cart: {
                items: [],
                total: 0,
            },
            showModal: false,
        }
    },

    components: {
        AppRestaurant,
        AppLoader,
        AppCart,
    },

    mounted() {
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
            this.Cart = JSON.parse(localStorage.getItem("cart"))
        }
    },
    methods: {
        AddItemToCart(plate) {
            if (this.Cart.items.length != 0 && this.Cart.items.find((Item) => Item.restaurant_id != plate.restaurant_id)) {
                console.log("Diverso");
                this.showModal = true;
            } else {
                const CurrentItem = this.Cart.items.find((Item) => Item.id === plate.id)

                if (CurrentItem) {
                    CurrentItem.quantity++;
                    CurrentItem.subTotal = CurrentItem.price * CurrentItem.quantity
                } else {
                    let Item = plate;
                    Item.quantity = 1;
                    Item.restaurant = this.singleRestaurant.name_res
                    Item.subTotal = Item.price
                    this.Cart.items.push(Item);
                }

                this.Cart.total = 0
                this.Cart.items.forEach(item => {
                    this.Cart.total += Number(item.subTotal)
                });

                localStorage.setItem("cart", JSON.stringify(this.Cart));
                console.log(JSON.parse(localStorage.getItem("cart")));
            }
        },

        closeModal() {
            this.showModal = false;
        },

        RemoveItemFromCart(plate) {
            const plateIndex = this.Cart.items.findIndex((Item) => Item.id === plate.id)

            if (plateIndex != -1) {
                const plate = this.Cart.items[plateIndex]

                if (plate.quantity > 1) {
                    plate.quantity -= 1
                    plate.subTotal = plate.price * plate.quantity
                } else {
                    this.Cart.items.splice(plateIndex, 1)
                }
            }

            this.Cart.total = 0
            this.Cart.items.forEach(item => {
                this.Cart.total += Number(item.subTotal)
            });

            localStorage.setItem("cart", JSON.stringify(this.Cart));
            console.log(JSON.parse(localStorage.getItem("cart")));
        },

        emptyCart() {
            this.Cart = {
                items: [],
                total: 0
            };
            localStorage.removeItem("cart");
            this.showModal = false;
        },
        
        isItemInCart(plateId) {
            return this.Cart.items.some(item => item.id === plateId);
        }
    },
}
</script>

<template>
    <div id="restaurant" style="width: 100%;"
        class="container  position-relative d-flex justify-content-center align-items-center  flex-column   pt-5 ">

        <!-- PULSANTE BACK -->
        <div class="back pe-5 me-5 ">
            <router-link class="text-decoration-none" :to="{ name: 'home' }"><i
                    class="my-arrow fa-solid fa-reply"></i></router-link>
        </div>

        <!-- JUMBO RISTO -->
        <div class="my-jumbo row card d-flex flex-row w-100  " style="width: 90%;">
            <div class="col-6 p-0">
                <div class="img-box">
                    <img class="img-fluid " :src="apiImageUrl + singleRestaurant.img_res" />
                </div>
            </div>
            <div class="col-6 p-3 card-body">
                <h1 class="card-title">{{ singleRestaurant.name_res }}</h1>
                <h3>{{ singleRestaurant.address_res }}</h3>
                <div class="d-flex gap-2">
                    <span class="badge text-bg-light" v-for="tag in singleRestaurant.categories">{{ tag.name }}</span>
                </div>
            </div>
        </div>

        <!-- MENU PIATTI -->
        <div class="d-flex w-100">
            <div class="w-75">
                <div class="d-flex justify-content-center pt-5">
                    <h2>Menù</h2>
                </div>
                <div class=" d-flex justify-content-between   pt-5">
                    <div class="d-flex flex-wrap justify-content-center gap-3 "
                        style="width: calc(100% / 14rem - 1rem/4 * 5);">

                        <!-- SINGOLO PIATTO -->
                        <div v-for="plate in singleRestaurant.plates" class="card " style="width: 14rem;">
                            <img :src="apiImageUrl + plate.image" class="card-img-top object-fit-cover" alt="@"
                                style="height: 170px;">
                            <div class="card-body d-flex flex-column justify-content-between">
                                <h5 class="card-title">{{ plate.name }}</h5>
                                <p class="fst-italic">{{ plate.ingredients }}</p>
                                <h6 class="card-text">{{ plate.price }} &euro;</h6>
                            </div>
                            <div class="d-flex justify-content-center pb-2">
                                <button v-if="!isItemInCart(plate.id)" class="btn btn-outline-light" @click="AddItemToCart(plate)">
                                    Add to cart
                                </button>
                                <div v-else>
                                    <button class="btn btn-outline-light" @click="RemoveItemFromCart(plate)"><i class="fa-solid fa-minus"></i></button>
                                    <button class="btn btn-outline-light" @click="AddItemToCart(plate)"><i class="fa-solid fa-plus"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CARRELLO -->
            <div class="w-25" id="Carrello">
                <h2 class="text-center">Cart</h2>
                <div v-if="Cart.items.length > 0">
                    <h3 class="text-center">{{ Cart.items[0].restaurant }}</h3>
                    <div class="p-3 text-start d-flex gap-1 justify-content-between text-white"
                        v-for="item in Cart.items">
                        <div>{{ item.quantity }}x</div>
                        <div>{{ item.name }}</div>
                        <div>{{ item.subTotal }} &euro;</div>
                    </div>
                    <div class="border-bottom border-white d-flex justify-content-center text-white pb-3"
                        v-for="item in Cart.items">
                        <div>
                            <button class="btn btn-outline-light" @click="RemoveItemFromCart(item)"><i class="fa-solid fa-minus"></i></button>
                            <button class="btn btn-outline-light" @click="AddItemToCart(item)"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                    <h4 class="p-3 text-end text-white" v-if="Cart.items.length > 0">Total: {{ Cart.total }} &euro;</h4>
                </div>
                <p v-else class="fs-5 text-center">Your Cart is Empty</p>
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
                                <p>You already have items in your cart with {{ Cart.items[0].restaurant }}. Do you wish
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
</template>



<style lang="scss">
@use '../styles/variables' as *;

.back {
    position: absolute;

    left: -10%;
    top: 4%;

    .my-arrow {
        font-size: 35px;
        color: #F6F3E4;

        &:hover {
            color: #F6F3E4;
        }
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
        font-family: "Pacifico", cursive;
        text-shadow: 2px 3px rgb(172, 177, 214);
        color: #F6F3E4;
    }
}

.card {
    border: solid 1px #F6F3E4;
    background-color: rgb(130, 148, 196);
}

.modal.show.d-block {
    display: block;
}

#Carrello {
    width: 15%;
    border: solid 2px #F6F3E4;
    border-radius: 0.2em;
    height: 100vh;
    margin: 1em 0 1em 0;
    overflow-y: auto;
    // padding: 1rem;

    .lista {
        list-style: none;
    }

    h2 {
        font-family: "Pacifico", cursive;
        text-shadow: 2px 3px rgb(172, 177, 214);
        color: #F6F3E4;
    }
}
</style>