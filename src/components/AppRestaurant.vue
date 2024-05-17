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
      <h2 class="text-center">Ristoranti</h2>
      <div v-if="restaurants.length === 0" class="text-center">Nessun ristorante</div>
      <div v-for="restaurant in restaurants" :key="restaurant.id" class="restaurant-card">
        <img :src="apiImageUrl + restaurant.img_res" class="card-img-top mx-auto d-block w-50" :alt="restaurant.name_res">
        <h3 class="text-center">{{ restaurant.name_res }}</h3>
        <h4 class="text-center">{{ restaurant.address_res }}</h4>
        <div class="categories text-center">
          <span v-for="category in restaurant.categories" :key="category.id" class="badge bg-secondary">{{ category.name }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .restaurant-card {
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  
  .categories .badge {
    margin-right: 5px;
  }
  
  /* Rimuovi il contorno */
  .restaurant-card img {
    border: none;
  }
  
  /* Centra l'immagine */
  .restaurant-card img {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  </style>