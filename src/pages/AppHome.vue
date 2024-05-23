<script>
import axios from "axios";
import AppRestaurant from '../components/AppRestaurant.vue';
import AppLoader from '../components/AppLoader.vue';

//dichiarazione dello store
import { store } from "../components/store";

export default {
    name: "AppHome",

    components: {
        AppRestaurant,
        AppLoader,
    },

    data() {
        return {
            baseApiUrl: "http://127.0.0.1:8000/api/",
            categories: [],
            Risultato: [],
            ArrayCategory: [],
            isLoading: true,
            store,
        }
    },

    methods: {
        async apiCall(){
            try {
                const res = await axios.get(this.baseApiUrl + "categories");
                this.categories = res.data.results;
                console.log(this.categories);

                // Aspetta il caricamento di tutte le immagini
                await this.loadAllImages();
                this.isLoading = false;
            } catch (error) {
                console.error("Errore nel caricamento delle categorie:", error);
            }
        },

        async CallCategory(){
            try {
                const res = await axios.post(this.baseApiUrl + "categories", {
                    queryId: this.ArrayCategory,
                });
                this.Risultato = res.data.results;
                console.log(this.Risultato);
            } catch (error) {
                console.error("Errore nel caricamento dei risultati della categoria:", error);
            }
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

        loadImage(src) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                img.onerror = reject;
            });
        },

        async loadAllImages() {
            const imagePromises = this.categories.map(category => {
                const imageUrl = `http://localhost:8000/storage/${category.image}`;
                return this.loadImage(imageUrl);
            });

            await Promise.all(imagePromises);
        },

          scrollToTarget() {
        const targetSection = document.getElementById('target');
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
  

    },

    mounted() {
        this.apiCall();
    },
}
</script>


<template>
  <!-- jumbo -->
  <div>
    <div class="jumbotron px-5 d-flex align-items-center ">
      <div class="container-fluid d-flex justify-content-between flex-wrap px-5">
        <div class="welcome_text d-flex align-items-center ps-3 col-5 ">
          <h1 class="display-5 fw-bold">
            Welcome to<br> DeliveBoo!
          </h1>
        </div>
        <div class="center-box col-2 d-flex align-items-end justify-content-center rounded-3 ">
          <button @click="scrollToTarget()" class="btn btn-outline-light"><span>Order Now!</span></button>
        </div>
        <div class="logo_laravel col-5 d-flex justify-content-end align-items-center ">
          <img class="slide" :src="'http://localhost:8000/storage/' + 'branding/meat.png'" alt="@">
        </div>
      </div>
      
    </div>

  </div> 
<!-- End Jumbo -->
  <section id="target">
    <div class="container pb-5">
      <AppLoader v-if="isLoading"></AppLoader>
      <div v-if="!isLoading" class="container py-5">
        <div class="d-flex gap-2 justify-content-center category-wrapper flex-wrap">
          <div
            @click="AddCategory(category.id)"
            v-for="category in categories"
            :key="category.id"
            :class="{'selected': ArrayCategory.includes(category.id)}"
            class="d-flex gap-2 align-items-center card-wrapper">
            <div class="card-category card h-100 rounded-4 border-0">
              <img class="category-img rounded-4" :src="'http://localhost:8000/storage/' + category.image" alt="">
              <div>{{ category.name }}</div>
            </div>
          </div>
        </div>
        <!-- passiamo i ristoranti e le categorie al componente AppRestaurant -->
        <AppRestaurant :restaurants="Risultato" :categories="categories"></AppRestaurant>
      </div>
    </div>
  </section>
</template>


<style lang="scss">
@use '../styles/variables' as *;

// jumbo
.jumbotron {
  overflow-x: hidden;
  height: calc(100vh - 126px);
  position: relative;

  .welcome_text {
    h1 {
      font-size: 100px;
      color: rgb(255, 234, 210);
      font-family: "Pacifico", cursive;
      text-shadow: 2px 4px rgb(130, 148, 196);
      font-weight: 400;
      font-style: normal;
      z-index: 99;
    }
  }

  .btn {
    font-family: "Pacifico", cursive;
    font-size: 30px;
    color: rgb(255, 234, 210);
    text-shadow: 2px 3px rgb(130, 148, 196);
    z-index: 99;

    span {
      display: block;
    }

    &:hover {
      background-color: rgb(255, 234, 210);
      color: #8294c4;
      text-shadow: 2px 3px rgb(173, 178, 215);
      border-color: rgb(255, 234, 210);

      span {
        transform: scale(1.7) rotate(-10deg);
      }
    }
  }

  .logo_laravel {
    .slide {
      height: 110%;
      transform: rotate(20deg);
      -webkit-animation: slide 0.8s cubic-bezier(0.175, 0.885, 0.320, 1.275) 0.7s both;
      animation: slide 0.8s cubic-bezier(0.175, 0.885, 0.320, 1.275) 0.7s both;

      @-webkit-keyframes slide {
        0% {
          -webkit-transform: translateX(100vw);
          transform: translateX(100vw);
        }
        100% {
          -webkit-transform: translateX(-100px);
          transform: translateX(-100px);
        }
      }
      @keyframes slide {
        0% {
          -webkit-transform: translateX(100vw);
          transform: translateX(100vw);
        }
        100% {
          -webkit-transform: translateX(0px);
          transform: translateX(0px);
        }
      }
    }
  }

}
// End jumbo

.card-wrapper{
  width: calc(100% / 6 - 8px * 6 / 5);
}

section {
  padding-bottom: 350px;
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