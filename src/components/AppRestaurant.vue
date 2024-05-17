<script>

export default {

  name: "AppRestaurant",

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
}
</script>


<template>
    <div class="container py-5">
      <h2 class="text-center">Filtered Restaurants</h2>
      <div v-if="restaurants.length === 0" class="text-center">No restaurants found.</div>
      <div v-for="restaurant in restaurants" :key="restaurant.id" class="restaurant-card">
        <img :src="this.apiImageUrl + restaurant.img_res" class="card-img-top w-50" alt="{{ restaurant.name_res }}">
        <h3>{{ restaurant.name_res }}</h3>
        <h4>{{ restaurant.address_res }}</h4>
        <div class="categories">
          <span v-for="category in restaurant.categories" :key="category.id" class="badge bg-secondary">{{ category.name }}</span>
        </div>
      </div>
    </div>
</template>


<style scoped>
    .restaurant-card {
        border: 1px solid #ccc;
        padding: 15px;
        margin-bottom: 10px;
        border-radius: 5px;
    }

    .categories .badge {
        margin-right: 5px;
    }
</style>