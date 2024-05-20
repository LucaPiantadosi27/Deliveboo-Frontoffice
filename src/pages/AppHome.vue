<script>
import axios from "axios";
import AppRestaurant from '../components/AppRestaurant.vue';

export default {
    name: "AppHome",

    components: {
        AppRestaurant
    },

    data() {
        return {
            baseApiUrl: "http://127.0.0.1:8000/api/",
            categories: [],
            Risultato: [],
            ArrayCategory: [],
        }
    },

    methods: {
        apiCall(){
            axios.get(this.baseApiUrl + "categories").then((res) => {
                this.categories = res.data.results;
                console.log(this.categories);
            })
        },

        async CallCategory(){
          await axios.post(this.baseApiUrl + "categories", {
            queryId: this.ArrayCategory,
          }).then((res) => {
            this.Risultato = res.data.results;
            console.log(this.Risultato);
          })
        },

        AddCategory(valoreDaInserire) {
            const index = this.ArrayCategory.indexOf(valoreDaInserire);

            if (index === -1) {
                this.ArrayCategory.push(valoreDaInserire);
            } else {
                this.ArrayCategory.splice(index, 1);
            }

            this.CallCategory();
            console.log(this.ArrayCategory);
        }
    },

    mounted() {
        this.apiCall();
    },
}
</script>


<template>
  <section>
    <div class="container py-5">
      <h1 class="text-center">DeliveBoo</h1>
      <div class="d-flex gap-2 justify-content-center">
        <div @click="AddCategory(category.id)" v-for="category in categories" :key="category.id" class="fs-4 d-flex gap-2 align-items-center ">
          <div class="card h-100 border-0" style="width: 150px;">
            <img class="category-img" :src="'http://localhost:8000/storage/' + category.image" alt="">
            <div>{{ category.name }}</div>

          </div>
        </div>
      </div>
      <AppRestaurant :restaurants="Risultato"></AppRestaurant>
    </div>
  </section>
</template>


<style lang="scss" scoped>

    ul{
        list-style: none;
    }

    .card{
      pointer-events: none;
    }
    
    .category-img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }


</style>