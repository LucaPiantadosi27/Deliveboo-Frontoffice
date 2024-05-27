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

        // DROP-IN
        initializeBraintree() {
            const button = document.querySelector('#submit_button');
            if (button) {
                dropin.create({
                    authorization: this.token,
                    container: '#dropin-container',
                    threeDSecure: true,
                    // card: {
                    //     cardholderName: {
                    //         required: true
                    //     },
                    // }
                }, (createErr, instance) => {
                    if (createErr) {
                        console.error('Errore durante la creazione dell\'interfaccia Drop-in:', createErr);
                        return;
                    }
                    button.addEventListener('click', function(e) {
                        e.preventDefault();
                        // this.threeDSecureParameters.total = this.Cart.total                        
                        instance.requestPaymentMethod({
                            threeDSecure: this.threeDSecureParameters
                        }, function (requestPaymentMethodErr, payload){
                            if (requestPaymentMethodErr) {
                                console.error('Errore durante la richiesta del metodo di pagamento:', requestPaymentMethodErr);
                                return;
                            }
                            axios.post(this.baseApiUrl + "payment/checkout", { paymentMethodNonce: payload.nonce })
                                .then(result => {
                                    if (result.data.success) {
                                        // document.getElementById('checkout-message').innerHTML = '<h1>Successo</h1><p>La tua interfaccia Drop-in funziona! Controlla il tuo <a href="https://sandbox.braintreegateway.com/login">sandbox Control Panel</a> per le tue transazioni di prova.</p>';
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

        // requestPayment() {
        //     instance.requestPaymentMethod((requestPaymentMethodErr, payload) => {
        //         if (requestPaymentMethodErr) {
        //             console.error('Errore durante la richiesta del metodo di pagamento:', requestPaymentMethodErr);
        //             return;
        //         }
        //         axios.post(this.baseApiUrl + "payment/checkout", { paymentMethodNonce: payload.nonce })
        //             .then(result => {
        //                 if (result.data.success) {
        //                     document.getElementById('checkout-message').innerHTML = '<h1>Successo</h1><p>La tua interfaccia Drop-in funziona! Controlla il tuo <a href="https://sandbox.braintreegateway.com/login">sandbox Control Panel</a> per le tue transazioni di prova.</p>';
        //                 } else {
        //                     document.getElementById('checkout-message').innerHTML = '<h1>Errore</h1><p>Controlla la console per maggiori dettagli.</p>';
        //                 }
        //             })
        //             .catch(error => {
        //                 console.error('Errore durante il checkout:', error);
        //                 document.getElementById('checkout-message').innerHTML = '<h1>Errore</h1><p>Controlla la console per maggiori dettagli.</p>';
        //             });
        //     });
        // }

        // CUSTOM FIELDS ATTEMPT
        // initializeBraintree() {

        //     braintree.client.create({
        //         authorization: 'sandbox_g42y39zw_348pk9cgf3bgyw2b'
        //     }, function (err, clientInstance) {
        //         if (err) {
        //             console.error(err);
        //             return;
        //         }
    
        //         braintree.hostedFields.create({
        //             preventAutofill: false,
        //             client: clientInstance,
        //             styles: {
        //                 input: {
        //                     // change input styles to match
        //                     // bootstrap styles
        //                     'font-size': '1rem',
        //                     color: '#495057'
        //                 }
        //             },
        //             fields: {
        //                 cardholderName: {
        //                     selector: '#cc-name',
        //                     placeholder: 'Name as it appears on your card'
        //                 },
        //                 number: {
        //                     selector: '#cc-number',
        //                     placeholder: '4111 1111 1111 1111'
        //                 },
        //                 cvv: {
        //                     selector: '#cc-cvv',
        //                     placeholder: '123'
        //                 },
        //                 expirationDate: {
        //                     selector: '#cc-expiration',
        //                     placeholder: 'MM / YY'
        //                 }
        //             }
        //         }, function (err, hostedFieldsInstance) {
        //             if (err) {
        //                 console.error(err);
        //                 return;
        //             }
        //             function createInputChangeEventListener(element) {
        //                 return function () {
        //                     validateInput(element);
        //                 }
        //             }
    
        //             function setValidityClasses(element, validity) {
        //                 if (validity) {
        //                     element.removeClass('is-invalid');
        //                     element.addClass('is-valid');
        //                 } else {
        //                     element.addClass('is-invalid');
        //                     element.removeClass('is-valid');
        //                 }
        //             }
    
        //             function validateInput(element) {
        //                 // very basic validation, if the
        //                 // fields are empty, mark them
        //                 // as invalid, if not, mark them
        //                 // as valid
    
        //                 if (!element.val().trim()) {
        //                     setValidityClasses(element, false);
    
        //                     return false;
        //                 }
    
        //                 setValidityClasses(element, true);
    
        //                 return true;
        //             }
    
        //             function validateEmail() {
        //                 var baseValidity = validateInput(email);
    
        //                 if (!baseValidity) {
        //                     return false;
        //                 }
    
        //                 if (email.val().indexOf('@') === -1) {
        //                     setValidityClasses(email, false);
        //                     return false;
        //                 }
    
        //                 setValidityClasses(email, true);
        //                 return true;
        //             }
    
        //             var ccName = $('#cc-name');
        //             var email = $('#email');
    
        //             ccName.on('change', function () {
        //                 validateInput(ccName);
        //             });
        //             email.on('change', validateEmail);
    
    
        //             hostedFieldsInstance.on('validityChange', function (event) {
        //                 var field = event.fields[event.emittedBy];
    
        //                 // Remove any previously applied error or warning classes
        //                 $(field.container).removeClass('is-valid');
        //                 $(field.container).removeClass('is-invalid');
    
        //                 if (field.isValid) {
        //                     $(field.container).addClass('is-valid');
        //                 } else if (field.isPotentiallyValid) {
        //                     // skip adding classes if the field is
        //                     // not valid, but is potentially valid
        //                 } else {
        //                     $(field.container).addClass('is-invalid');
        //                 }
        //             });
    
        //             hostedFieldsInstance.on('cardTypeChange', function (event) {
        //                 var cardBrand = $('#card-brand');
        //                 var cvvLabel = $('[for="cc-cvv"]');
    
        //                 if (event.cards.length === 1) {
        //                     var card = event.cards[0];
    
        //                     // change pay button to specify the type of card
        //                     // being used
        //                     cardBrand.text(card.niceType);
        //                     // update the security code label
        //                     cvvLabel.text(card.code.name);
        //                 } else {
        //                     // reset to defaults
        //                     cardBrand.text('Card');
        //                     cvvLabel.text('CVV');
        //                 }
        //             });
    
        //             form.submit(function (event) {
        //                 event.preventDefault();
    
        //                 var formIsInvalid = false;
        //                 var state = hostedFieldsInstance.getState();
    
        //                 // perform validations on the non-Hosted Fields
        //                 // inputs
        //                 if (!validateEmail()) {
        //                     formIsInvalid = true;
        //                 }
    
        //                 // Loop through the Hosted Fields and check
        //                 // for validity, apply the is-invalid class
        //                 // to the field container if invalid
        //                 Object.keys(state.fields).forEach(function (field) {
        //                     if (!state.fields[field].isValid) {
        //                         $(state.fields[field].container).addClass('is-invalid');
        //                         formIsInvalid = true;
        //                     }
        //                 });
    
        //                 if (formIsInvalid) {
        //                     // skip tokenization request if any fields are invalid
        //                     return;
        //                 }
    
        //                 hostedFieldsInstance.tokenize(function (err, payload) {
        //                     if (err) {
        //                         console.error(err);
        //                         return;
        //                     }
    
        //                     // This is where you would submit payload.nonce to your server
        //                     $('.toast').toast('show');
    
        //                     // you can either send the form values with the payment
        //                     // method nonce via an ajax request to your server,
        //                     // or add the payment method nonce to a hidden inpiut
        //                     // on your form and submit the form programatically
        //                     // $('#payment-method-nonce').val(payload.nonce);
        //                     // form.submit()
        //                 });
        //             });
        //         });
        //     });
        // }
    },


    watch: {
        // Il watcher rende solamente l'ogetto cart reattivo in componenti diversi
        'Cart.items'(newItems, oldItems) { },
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

        <!-- <div id="dropin-wrapper">
            <div id="checkout-message"></div>
        </div> -->

        <!-- Bootstrap inspired Braintree Hosted Fields example -->
        <!-- <div class="bootstrap-basic">
            <form class="needs-validation" novalidate="">

                <div class="row">
                    <div class="col-sm-6 mb-3">
                        <label for="cc-name">Cardholder Name</label>
                        <div class="form-control" id="cc-name"></div>
                        <small class="text-muted">Full name as displayed on card</small>
                        <div class="invalid-feedback">
                            Name on card is required
                        </div>
                    </div>
                    <div class="col-sm-6 mb-3">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" id="email" placeholder="you@example.com">
                        <div class="invalid-feedback">
                            Please enter a valid email address for shipping updates.
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-6 mb-3">
                        <label for="cc-number">Credit card number</label>
                        <div class="form-control" id="cc-number"></div>
                        <div class="invalid-feedback">
                            Credit card number is required
                        </div>
                    </div>
                    <div class="col-sm-3 mb-3">
                        <label for="cc-expiration">Expiration</label>
                        <div class="form-control" id="cc-expiration"></div>
                        <div class="invalid-feedback">
                            Expiration date required
                        </div>
                    </div>
                    <div class="col-sm-3 mb-3">
                        <label for="cc-expiration">CVV</label>
                        <div class="form-control" id="cc-cvv"></div>
                        <div class="invalid-feedback">
                            Security code required
                        </div>
                    </div>
                </div>

                <hr class="mb-4">
                <div class="text-center">
                    <button class="btn btn-primary btn-lg" type="submit">Pay with <span
                            id="card-brand">Card</span></button>
                </div>
            </form>
        </div>
        <div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 200px;">
            <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-autohide="false">
                <div class="toast-header">
                    <strong class="mr-auto">Success!</strong>
                    <small>Just now</small>
                    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="toast-body">
                    Next, submit the payment method nonce to your server.
                </div>
            </div>
        </div> -->



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