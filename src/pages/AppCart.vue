<script>
import axios from 'axios';
import dropin from 'braintree-web-drop-in';
import { router } from '../router';


export default {
    name: "AppCart",

    components: {

    },

    data() {
        return {
            Cart: {
                items: [],
                total: 0
            },

            token: '',
            baseApiUrl: "http://127.0.0.1:8000/api/",
            form: $('form'),
            threeDSecureParameters: {
                amount: 69,
                email: '',
                billingAddress: {
                    givenName: '',
                    surname: '',
                    phoneNumber: '',
                    streetAddress: '',
                }
            }
        }
    },

    mounted() {

        console.log(JSON.parse(localStorage.getItem("cart")));

        // recupera carrello
        if (JSON.parse(localStorage.getItem("cart")) != null) {
            this.Cart = JSON.parse(localStorage.getItem("cart"))
        }

        // recupera token checkout
        this.getClientToken();
        console.log('test', this.threeDSecureParameters)

    },



    methods: {
        // METODI CARRELLO
        AddItemToCart(plate) {
            if (this.Cart.items.length != 0 && this.Cart.items.find((Item) => Item.restaurant_id != plate.restaurant_id)) {
                console.log("Diverso");

            } else {
                const CurrentItem = this.Cart.items.find((Item) => Item.id === plate.id)

                if (CurrentItem) {
                    CurrentItem.quantity++;
                    CurrentItem.subTotal = CurrentItem.price * CurrentItem.quantity
                    plate.subTotal = plate.subTotal.toFixed(2)
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
                this.Cart.total = this.Cart.total.toFixed(2)

                localStorage.setItem("cart", JSON.stringify(this.Cart));
                console.log(JSON.parse(localStorage.getItem("cart")));
            }
        },

        RemoveItemFromCart(plate) {
            const plateIndex = this.Cart.items.findIndex((Item) => Item.id === plate.id)

            if (plateIndex != -1) {
                const plate = this.Cart.items[plateIndex]

                if (plate.quantity > 1) {
                    plate.quantity -= 1
                    plate.subTotal = plate.price * plate.quantity
                    plate.subTotal = plate.subTotal.toFixed(2)
                } else {
                    this.Cart.items.splice(plateIndex, 1)
                }
            }

            this.Cart.total = 0
            this.Cart.items.forEach(item => {
                this.Cart.total += Number(item.subTotal)
            });
            this.Cart.total = this.Cart.total.toFixed(2)

            localStorage.setItem("cart", JSON.stringify(this.Cart));
            console.log(JSON.parse(localStorage.getItem("cart")));
        },

        isItemInCart(plateId) {
            return this.Cart.items.some(item => item.id === plateId);
        },

        // METODI CHECKOUT
        async getClientToken() {
        try {
            const res = await axios.get(this.baseApiUrl + "payment/token");
            console.log(res);
            this.token = res.data.token;
            this.initializeBraintree();
        } catch (error) {
            console.error("Errore durante il recupero del token:", error);
        }
    },

    initializeBraintree() {
    const button = document.querySelector('#submit_button');
    if (button) {
        dropin.create({
            authorization: this.token,
            container: '#dropin-container',
            threeDSecure: true,
        }, (createErr, instance) => {
            if (createErr) {
                console.error('Errore durante la creazione dell\'interfaccia Drop-in:', createErr);
                return;
            }
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Imposta l'importo della transazione
                this.threeDSecureParameters.amount = this.Cart.total;
                
                instance.requestPaymentMethod({
                    threeDSecure: {
                        amount: this.threeDSecureParameters.amount,
                        email: this.threeDSecureParameters.email,
                        billingAddress: this.threeDSecureParameters.billingAddress
                    }
                }, (requestPaymentMethodErr, payload) => {
                    if (requestPaymentMethodErr) {
                        console.error('Errore durante la richiesta del metodo di pagamento:', requestPaymentMethodErr);
                        return;
                    }
                    axios.post(this.baseApiUrl + "payment/checkout", { 
                        paymentMethodNonce: payload.nonce,
                        amount: this.Cart.total // Passa l'importo totale qui
                    })
                    .then(result => {
                        if (result.data.success) {
                            router.push({ name: 'checkout' })
                        } else {
                            document.getElementById('checkout-message').innerHTML = '<h1>Errore</h1><p>Controlla la console per maggiori dettagli.</p>';
                        }
                    })
                    .catch(error => {
                        console.error('Errore durante il checkout:', error);
                        document.getElementById('checkout-message').innerHTML = '<h1>Errore</h1><p>Controlla la console per maggiori dettagli.</p>';
                    });
                });
            });
        });
    } else {
        console.error('Pulsante submit non trovato!');
    }
},

    watch: {
        // Il watcher rende solamente l'ogetto cart reattivo in componenti diversi
        'Cart.items'(newItems, oldItems) { },
    }
}
}
</script>



<template>
    <div class="my-box container py-5">

        <!-- CARRELLO -->
        <div class="" id="Carrello">
            <div v-if="Cart.items.length > 0">
                <h2 class="text-center">Cart <i class="fa-solid fa-shopping-cart"></i></h2>
                <h3 class="text-center fs-1">{{ Cart.items[0].restaurant }}</h3>
                <div v-for="item in Cart.items" :key="item.id" class="p-3 text-start text-white">
                    <div class="d-flex justify-content-between align-items-center pb-3">
                        <div>{{ item.quantity }}x {{ item.name }}</div>
                        <div>{{ item.subTotal }} &euro;</div>
                    </div>
                    <div class="d-flex justify-content-center align-items-center border-bottom border-white pb-3 gap-3">
                        <button class="btn btn-outline-light" @click="RemoveItemFromCart(item)"><i
                                class="fa-solid fa-minus"></i></button>
                        <button class="btn btn-outline-light" @click="AddItemToCart(item)"><i
                                class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
                <h4 class="p-3 text-end text-white">Total: {{ Cart.total }} &euro;</h4>
            </div>
            <p v-else class="fs-5 text-center">Your Cart is Empty</p>
        </div>

        <!-- CHECKOUT -->
        <form class="mt-5" action="javascript:void(0)">
            <div>
                <label class="form-label" for="name">Your name</label>
                <input class="form-control" type="name" name="name" :value="threeDSecureParameters.billingAddress.givenName" required>
            </div>

            <div>
                <label class="form-label" for="surname">Your surname</label>
                <input class="form-control" type="surname" name="surname" :value="threeDSecureParameters.billingAddress.surname" required>
            </div>

            <div>
                <label class="form-label" for="email">Your email</label>
                <input class="form-control" type="email" name="email" :value="threeDSecureParameters.email" required>
            </div>

            <div>
                <label class="form-label" for="address">Your address</label>
                <input class="form-control" type="text" name="address" :value="threeDSecureParameters.billingAddress.streetAddress" required>                
            </div>

            <div>
                <label class="form-label" for="phone">Your phone number</label>
                <input class="form-control" type="text" name="phone" :value="threeDSecureParameters.billingAddress.phoneNumber">    
            </div>

            <div id="dropin-container"></div>
            <button id="submit_button">Submit payment</button>
        </form>
    </div>
</template>



<style lang="scss" scoped>
@use '../styles/variables' as *;


#Carrello {
    // width: 15%;
    border: solid 2px #F6F3E4;
    border-radius: 0.2em;
    // height: 100vh;
    margin: 1em 0 1em 0;
    overflow-y: auto;
    position: relative;
    z-index: 10;
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