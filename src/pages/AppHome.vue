<script>
import axios from "axios";
import AppRestaurant from '../components/AppRestaurant.vue';
import AppLoader from '../components/AppLoader.vue'

export default {
    name: "AppHome",

    components: {
        AppRestaurant,
        AppLoader
    },

    data() {
        return {
            baseApiUrl: "http://127.0.0.1:8000/api/",
            categories: [],
            Risultato: [],
            ArrayCategory: [],
            isLoading:true,
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
        },
        
    },

    mounted() {
        this.apiCall();
        setTimeout(() => {
          //impostaimo il timeout occio allo scoop
          this.isLoading=false
          
        }, 2000);

    },
}
</script>


<template>
  <section>
    <div class="container pb-5">
      <AppLoader v-if=" isLoading"></AppLoader>
      <div v-if="isLoading == false" class="container py-5">
        <div class="d-flex gap-2 justify-content-center category-wrapper justify-content-center flex-wrap">
          <div
            @click="AddCategory(category.id)"
            v-for="category in categories"
            :key="category.id"
            :class="{'selected': ArrayCategory.includes(category.id)}"
            class=" d-flex gap-2 align-items-center card-wrapper">
            <div class="card-category card h-100 rounded-4 border-0 ">
              <img class="category-img rounded-4" :src="'http://localhost:8000/storage/' + category.image" alt="">
              <div>{{ category.name }}</div>
            </div>
          </div>
        </div>
        <AppRestaurant :restaurants="Risultato"></AppRestaurant>
      </div>
      </div>
  </section>
</template>


<style lang="scss" scoped>
@use '../styles/variables' as *;

// .category-wrapper{
//   overflow-x: hidden;
//   padding-bottom: 2px;

//   &:hover{
//     overflow-x: auto;
//   }

//   &::-webkit-scrollbar {
//     height: 5px;
//   }
  
//   &::-webkit-scrollbar-track{
//     margin-top: 5px;
//   }

//   &::-webkit-scrollbar-thumb{
//     background-color: rgba($color: #000000, $alpha: 0.2);
//     border-radius: 30px;
//     opacity: 0;
//   }
// }

.card-wrapper{
  width: calc(100% / 6 - 8px * 6 / 5);
}

section {
  .card-category {
    background-color: rgba(0, 0, 0, 0.4);
    text-align: center;
    cursor: pointer;
    user-select: none;
    transition: opacity 0.3s ease;

    .category-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .selected .card-category {
    opacity: 0.4;
  }
}
</style>