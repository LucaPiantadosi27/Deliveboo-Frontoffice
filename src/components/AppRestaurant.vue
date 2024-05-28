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
      <div v-for="restaurant in restaurants" :key="restaurant.id" class="col-md-4 mb-4 z-3">
        <router-link @click="scrollToTarget()" :to="{ name: 'restaurant', params: { id: restaurant.id }}" class="text-decoration-none" >
          <div class="restaurant-card h-100 pb-5 rounded-5 bg-gradient">
            <img :src="apiImageUrl + restaurant.img_res" class="card-img-top h-75 object-fit-cover rounded-top-5 bg-light" :alt="restaurant.name_res">
            <div class="description">
              <h3 class="text-center">{{ restaurant.name_res }}</h3>
              <h4 class="text-center">{{ restaurant.address_res }}</h4>
              <div class="categories text-center">
                <span v-for="category in restaurant.categories" :key="category.id" class="badge bg-secondary">{{ category.name }}</span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

  .thinking{
    width: 75%;
  }

  .woman{
    transform: scaleX(-1);
  }

  .restaurant-card {
    padding: 1px;
    background-color:#279647;
    
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

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

  .categories .badge {
    margin-right: 5px;
  }
</style>