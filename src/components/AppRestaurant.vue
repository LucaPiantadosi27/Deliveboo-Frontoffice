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
    <h2 class="text-center mb-3">{{ restaurantCount }} {{ restaurantText }}</h2>
    <div class="row">
      <div v-for="restaurant in restaurants" :key="restaurant.id" class="col-md-4 mb-4 z-3">
        <router-link :to="{ name: 'restaurant', params: { id: restaurant.id }}" class="text-decoration-none" >
          <div class="restaurant-card h-100 pb-5">
            <img :src="apiImageUrl + restaurant.img_res" class="card-img-top h-75 object-fit-cover" :alt="restaurant.name_res">
            <div class="description text-black">
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
    width: 10%;
  }

  .woman{
    transform: scaleX(-1);
  }

  .thinking{
    width: 500px;
    height: 500px;
  }

  .restaurant-card {
    border: none;
    border-radius: 5px;
    padding: 15px;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  }

  .card-img-top {
    width: 100%;
    display: block;
    border-radius: 5px 5px 0 0;


  }

  .description {
    padding: 15px;
  }

  .categories .badge {
    margin-right: 5px;
  }
</style>