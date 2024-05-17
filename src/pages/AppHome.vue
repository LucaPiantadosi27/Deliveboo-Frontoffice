<script>
import axios from "axios";

export default {
    name: "AppHome",

    components: {

    },

    data() {
        return {
            baseApiUrl: "http://127.0.0.1:8000/api/",
            categories: [],
            Risultato:[],
            //array elementi che selezioniamo
            ArrayCategory:[],
        }
    },

    methods: {
        // initial api call to retrieve restaurant categories
        apiCall(){
            axios.get(this.baseApiUrl + "categories").then((res) => {
                this.categories = res.data.results;
                console.log(this.categories);
            })
        },
        
        async CallCategory(){
          await axios.get(this.baseApiUrl + "categories" + "/id" ).then((res)=>{
            this.Risultato = res.data.results;
            console.log(this.Risultato );
          })
        },
        AddCategory(valoreDaInserire) {
            const index = this.ArrayCategory.indexOf(valoreDaInserire);

            if (index === -1) {
            this.ArrayCategory.push(valoreDaInserire);
            } else {
            this.ArrayCategory.splice(index, 1);
            }

            console.log(this.ArrayCategory);
        }
        
        
    },

    mounted() {
        this.apiCall();
        // this.feachdata();
        this.CallCategory();
    },
}
</script>

<template>
  <section>
    <div class="container py-5">
      <h1 class="text-center">DeliveBoo</h1>
      <div class="d-flex gap-2 justify-content-center">
        <!-- Checkbox per selezionare le categorie -->
        <div v-for="category in categories" :key="category.id" class="fs-4">
          <input 
            type="checkbox" 
            :value="category.id" 
            v-model="selectedCategories" 
            @change="fetchRestaurants" 
          />
          <label>{{ category.name }}</label>
        </div>
      </div>
    </div>  
  </section>
</template>

<style lang="scss" scoped>

    ul{
        list-style: none;
    }

</style>