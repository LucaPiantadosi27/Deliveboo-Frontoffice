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
      <h2 class="text-center mb-3" v-if="restaurants.length != 0">Ristoranti {{ restaurants.length }}</h2>
      <div class="row">
        <div v-for="restaurant in restaurants" :key="restaurant.id" class="col-md-4 mb-4">
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
        </div>
      </div>
    </div>
</template>
  
<style scoped>

  .restaurant-card {
    border: none;
    border-radius: 5px;
    overflow: hidden;
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