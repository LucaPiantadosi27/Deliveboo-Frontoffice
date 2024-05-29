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
            formData: {
                amount: 0,
                email: '',
                billingAddress: {
                    name: '',
                    surname: '',
                    phoneNumber: '',
                    address: '',
                }
            },
            formErrors: {},
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

        emptyCart() {
            this.Cart = {
                items: [],
                total: 0
            };
            localStorage.removeItem("cart");
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
                        this.formData.amount = this.Cart.total;

                        instance.requestPaymentMethod({
                            threeDSecure: {
                                amount: this.formData.amount,
                                email: this.formData.email,
                                billingAddress: this.formData.billingAddress
                            }
                        }, (requestPaymentMethodErr, payload) => {
                            if (requestPaymentMethodErr) {
                                console.error('Errore durante la richiesta del metodo di pagamento:', requestPaymentMethodErr);
                                return;
                            }
                            axios.post(this.baseApiUrl + "payment/checkout", {
                                paymentMethodNonce: payload.nonce,
                                amount: this.Cart.total, // Passa l'importo totale qui
                                formData: this.formData
                            })
                                .then(result => {
                                    if (result.data.success) {
                                        this.createOrder();
                                        this.emptyCart();
                                        document.getElementById('checkout-message').innerHTML = '<h1>Your Order was successful</h1><p>You should receive a mail shortly with the details</p>';
                                        // router.push({ name: 'checkout' });
                                        console.log('info', result)
                                    } else {
                                        document.getElementById('checkout-message').innerHTML = '<h1>Errore</h1>';
                                        console.log('apiErrors',result);
                                        this.formErrors = result.data.error
                                        console.log('jsErrors', this.formErrors)
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

        createOrder() {
            axios.post(this.baseApiUrl + "order", {
                cart: this.Cart,
                customerData: this.formData
            })
                .then(result => {
                    console.log(result);
                })
                .catch(error => {
                    console.error("Errore creando l'ordine", error);
                });
        },

        // funzione per svuotare il carrello dopo il pagamento
        emptyCart() {
            this.Cart = {
                items: [],
                total: 0
            };
            localStorage.removeItem("cart");
        },
    },

    watch: {
        // Il watcher rende solamente l'oggetto cart reattivo in componenti diversi
        'Cart.items'(newItems, oldItems) { },
    },

    computed: {
        formIsValid(){
            if(this.formData.email == '' || this.formData.billingAddress.name == '' || this.formData.billingAddress.surname == '' || this.formData.billingAddress.address == '' || this.formData.billingAddress.phoneNumber == ''){
                return true
            }else{
                return false
            }
        },

        formHasError(input){
            if(this.formErrors.hasOwnProperty(input)){
                return 'border border-danger'
            }
        }

    }
}
</script>



<template>
    <div class="my-box container py-4">

        <!-- CARRELLO -->
        <div class=" rounded-5 col-6 m-auto shadow-lg" id="Carrello">
            <div v-if="Cart.items.length > 0">
                <h2 class="text-center "><i class="fa-solid fa-shopping-cart"></i></h2>
                <h3 class="text-center fs-1 fw-bolder">{{ Cart.items[0].restaurant }}</h3>
                <div v-for="item in Cart.items" :key="item.id" class="p-3 text-start text-black">
                    <div class="d-flex justify-content-around align-items-center pb-3 text-black fw-bolder">
                        <div>{{ item.quantity }}x {{ item.name }}</div>
                        <div>{{ item.subTotal }} &euro;</div>
                    </div>
                    <div class="d-flex justify-content-center align-items-center border-bottom border-black pb-3 gap-3">
                        <button class="btn btn-outline-danger" @click="RemoveItemFromCart(item)"><i
                                class="fa-solid fa-minus"></i></button>
                        <button class="btn btn-outline-success" @click="AddItemToCart(item)"><i
                                class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
                <h4 class="p-3 text-end text-white text-center text-bg-primary fw-bolder">Total: {{ Cart.total }} &euro;</h4>
            </div>
            <p v-else class="fs-5 text-center">Your Cart is Empty</p>
        </div>

        <div id="checkout-message" class="text-center"></div>

        <!-- CHECKOUT -->
        <form v-if="this.Cart.total > 0" class="mt-5" action="javascript:void(0)">

            <div>
                <label class="form-label" for="name">Name*</label>
                <input class="form-control" type="name" name="name"
                    v-model="formData.billingAddress.name" required>
                <div class="text-danger" v-if="formErrors.hasOwnProperty('formData.billingAddress.name')">Please input your name</div>
            </div>

            <div>
                <label class="form-label" for="surname">Surname*</label>
                <input class="form-control" type="surname" name="surname"
                    v-model="formData.billingAddress.surname" required>
                    <div class="text-danger" v-if="formErrors.hasOwnProperty('formData.billingAddress.surname')">Please input your surname</div>
            </div>

            <div>
                <label class="form-label" for="email">Email*</label>
                <input class="form-control" type="email" name="email" v-model="formData.email" required>
                <div class="text-danger" v-if="formErrors.hasOwnProperty('formData.email')">Please input a valid email</div>
            </div>

            <div>
                <label class="form-label" for="address">Address*</label>
                <input class="form-control" type="text" name="address"
                    v-model="formData.billingAddress.address" required>
                <div class="text-danger" v-if="formErrors.hasOwnProperty('formData.billingAddress.address')">Please input your address</div>
            </div>

            <div>
                <label class="form-label" for="phone">Phone Number*</label>
                <input class="form-control" type="text" name="phone"
                    v-model="formData.billingAddress.phoneNumber">
                    <div class="text-danger" v-if="formErrors.hasOwnProperty('formData.billingAddress.phoneNumber')">Please input your phone Number</div>
            </div>

            <small>*these fields are required</small>

            <div id="dropin-container"></div>
            <button class="btn btn-success" id="submit_button" :disabled="formIsValid">Submit payment</button>
        </form>
    </div>
</template>



<style lang="scss" scoped>
@use '../styles/variables' as *;

.my-box{
    position: relative;
    z-index: 10;
    color: black;
}

#Carrello {
    background-color: #f8ebde;
    // width: 15%;
    border: solid 1px #3b3b3b52;
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
        
        color: #d62300;
    }

    h3{
        font-family: "Pacifico", cursive;
        
        color: #d62300;
    }
}
</style>