<script>
import {store} from "../components/store" ;


export default {
    name: "AppCart",

    components: {
        
    },

    data() {
        return {
           Cart:{
            items:[],
            total:0

           }
        }
    },

    mounted() {
        
        console.log(JSON.parse(localStorage.getItem("cart")));

        if (JSON.parse(localStorage.getItem("cart")) != null) {
            this.Cart = JSON.parse(localStorage.getItem("cart"))
        }

    },



    methods: {
        AddItemToCart(plate) {
            if (this.Cart.items.length != 0 && this.Cart.items.find((Item) => Item.restaurant_id != plate.restaurant_id)) {
                console.log("Diverso");
              
            } else {
                const CurrentItem = this.Cart.items.find((Item) => Item.id === plate.id)

                if (CurrentItem) {
                    CurrentItem.quantity++;
                    CurrentItem.subTotal = CurrentItem.price * CurrentItem.quantity
                    plate.subTotal= plate.subTotal.toFixed(2)
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
                this.Cart.total= this.Cart.total.toFixed(2)

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
                    plate.subTotal= plate.subTotal.toFixed(2)
                } else {
                    this.Cart.items.splice(plateIndex, 1)
                }
            }

            this.Cart.total = 0
            this.Cart.items.forEach(item => {
                this.Cart.total += Number(item.subTotal)
            });
            this.Cart.total= this.Cart.total.toFixed(2)

            localStorage.setItem("cart", JSON.stringify(this.Cart));
            console.log(JSON.parse(localStorage.getItem("cart")));
        },

        
        isItemInCart(plateId) {
            return this.Cart.items.some(item => item.id === plateId);
        },
    },

    // Il watcher rende solamente l'ogetto cart reattivo in componenti diversi

    watch: { 
        'Cart.items'(newItems, oldItems) { 
           
        }, 

    }
}
</script>



<template>

 <!-- CARRELLO -->
 <div class="w-25" id="Carrello">
              <div v-if="Cart.items.length > 0">
                  <h2 class="text-center">Cart <i class="fa-solid fa-shopping-cart"></i></h2>
                  <h3 class="text-center fs-1">{{ Cart.items[0].restaurant }}</h3>
                  <div v-for="item in Cart.items" :key="item.id" class="p-3 text-start text-white">
                      <div class="d-flex justify-content-between align-items-center pb-3">
                          <div>{{ item.quantity }}x {{ item.name }}</div>
                          <div>{{ item.subTotal }} &euro;</div>
                      </div>
                      <div class="d-flex justify-content-center align-items-center border-bottom border-white pb-3 gap-3">
                          <button class="btn btn-outline-light" @click="RemoveItemFromCart(item)"><i class="fa-solid fa-minus"></i></button>
                          <button class="btn btn-outline-light" @click="AddItemToCart(item)"><i class="fa-solid fa-plus"></i></button>
                      </div>
                  </div>
                  <h4 class="p-3 text-end text-white">Total: {{ Cart.total }} &euro;</h4>
              </div>
              <p v-else class="fs-5 text-center">Your Cart is Empty</p>
              
        </div>

</template>



<style lang="scss" scoped>

@use '../styles/variables' as *;



// .card {
//     border: solid 1px #F6F3E4;
//     background-color: rgb(130, 148, 196);
// }


#Carrello {
    width: 15%;
    border: solid 2px #F6F3E4;
    border-radius: 0.2em;
    height: 100vh;
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