<script>
import {store} from "../components/store" 
;


export default {
    name: "AppCart",

    components: {
        
    },

    data() {
        return {
           
        }
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
              <div v-if="showModal" class="modal fade show d-block" tabindex="-1"
                  style="background: rgba(0, 0, 0, 0.5);">
                  <div class="modal-dialog">
                      <div class="modal-content">
                      </div>
                  </div>
              </div>

            <ul>
              <li v-for="item in Carrello">
                {{ item.name }}
              </li>
            </ul>
        </div>

</template>



<style lang="scss" scoped>


</style>