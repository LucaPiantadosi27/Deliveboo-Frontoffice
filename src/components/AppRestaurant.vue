<script>

export default {
  name: "AppRestaurant",
  name:"AppCart",

  props: {
    restaurants: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      apiImageUrl: 'http://127.0.0.1:8000/storage/',
    }
  },

  computed: {
    restaurantText() {
      const count = this.restaurants.length;
         if (count === 1) {
        return "One Restaurant";
      } else if (count > 1) {
        return "Restaurants";
      }
    },

    restaurantCount() {
      return this.restaurants.length > 1 ? this.restaurants.length : '';
    }
  }
}
</script>

<template>
  <div class="container pt-5">
    <div class="d-flex justify-content-center" v-if="restaurants.length === 0">
      <div class="col-6">
        <img class="thinking woman " :src="apiImageUrl + 'branding/avatar.svg'" alt="">
      </div>
      <div class="col-6 d-flex justify-content-end ">
        <img class="thinking man " :src="apiImageUrl + 'branding/avatar1.svg'" alt="">
      </div>
      
    </div>
    <strong class="text-center mb-3">{{ restaurantCount }} {{ restaurantText }}</strong>
    <div class="row">
      <div v-for="restaurant in restaurants" :key="restaurant.id" class="col-md-3 mb-4 z-3">
        <router-link :to="{ name: 'restaurant', params: { id: restaurant.id }}" class="text-decoration-none" >
          <div class="restaurant-card h-100 pb-5 rounded-5">
            <img :src="apiImageUrl + restaurant.img_res" class="card-img-top h-75 object-fit-cover rounded-top-5 bg-light" :alt="restaurant.name_res">
            <div class="description position-relative">
              <h3 class="pt-3">{{ restaurant.name_res }}</h3>
              <span>address: {{ restaurant.address_res }}</span>
              <div class="categories text-center position-absolute">
                <div class="square position-absolute"></div>
                <span v-for="category in restaurant.categories" :key="category.id" class="badge">{{ category.name }}</span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '../styles/variables' as *;

  .thinking{
    width: 75%;
  }

  .restaurant-card {
    padding: 1px;
    background-color:#279647;
    
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

  }

  .card-img-top {
    width: 100%;
    display: block;
    border-radius: 5px 5px 0 0;


  }

  .description {
    padding: 15px;
    color:#f8ebde ;
  }

  .categories{
    background-color: $color-red;

    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden;

    transition: width .2s linear;

    height: 20px;
    width: 25px;
    right: 0;
    top: 5px;

    .square{
      background-color: #279647;
      height: 16px;
      width: 16px;
      position: relative;

      left: -7px;
      transform: rotate(45deg);
    }

    .badge {
      margin-left: 5px;
      display: none;
    }

    &:hover{
      width: 90%;

      .badge{
        display: inline;
      }
    }
  }
  
</style>