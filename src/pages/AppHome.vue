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

            sessionStorage.setItem('categoryPermanent', JSON.stringify(this.ArrayCategory))
            console.log('Categorie cliccate',JSON.parse(localStorage.getItem("categoryPermanent")));
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
        },
  

    },

    mounted() {
        this.apiCall();

        if (JSON.parse(sessionStorage.getItem("categoryPermanent")) != null) {
            this.ArrayCategory = JSON.parse(sessionStorage.getItem("categoryPermanent"))
            this.CallCategory();
        }
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
            WELCOME TO<br> DELIVEBOO!
          </h1>
        </div>
        <div class="center-box col-2 d-flex align-items-end justify-content-center rounded-3 ">
          <button @click="scrollToTarget()" class="my-btn"><i class="fa-solid fa-down-long"></i></button>
        </div>
        <div class="logo_laravel col-5 d-flex justify-content-end align-items-center ">
          <img class="slide" :src="'http://localhost:8000/storage/' + 'branding/meat.png'" alt="@">
        </div>
      </div>
      
    </div>

  </div> 
<!-- End Jumbo -->
  <section id="target">
    <div class="container">
      <div class="container py-5">
        <h2 class="do-you">WHAT DO YOU WANT EAT?</h2>
        <div class="d-flex gap-4 justify-content-center category-wrapper flex-wrap">
          <div
            @click="AddCategory(category.id)"
            v-for="category in categories"
            :key="category.id"
            :class="{'selected': ArrayCategory.includes(category.id)}"
            class="d-flex gap-2 align-items-center card-wrapper">
            <div class="card-category card h-100 rounded-4">
              <img class="category-img rounded-4 rounded-bottom-0" :src="'http://localhost:8000/storage/' + category.image" alt="">
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
      font-size: 80px;
      color: #D62300;
      font-family: $mibery-font;
      font-style: normal;
      z-index: 99;
    }
  }

  .my-btn {
    padding: 10px 20px;
    border-radius: 50%;
    font-size: 25px;
    color: #D62300;
    border: #f8ebde 2px solid;
    background-color:  #f8ebde;
    z-index: 99;
 
    i {
      font-size: 1.5em;
    }

    &:hover {
      background-color: #f8ebde;
      color: #D62300;
      border-color: #f8ebde;
      animation: pulse 1s infinite;
      animation-timing-function: linear;   

    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { 
        transform: scale(1.1);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      };
      100% { transform: scale(1); }
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
  width: calc(100% / 6 - 20px * 9 / 5);
}

section {
  padding-bottom: 150px;
  
  .do-you{
    font-size: 60px;
  }

  strong{
    color: $color-green;
    font-family:'Open Sans', sans-serif;
    font-weight: bold;
    font-style: normal;
    margin-bottom: 20px;  
    font-size: 30px;

    text-align: center;
    display: block;
  }

  h2{
    padding-left: 10px;
    color: $color-green;
    font-size: 28px;
    font-family: $mibery-font;
    text-align: center;
    margin-bottom: 20px;
  }

  .card-category {
    background-color: #279647;
    text-align: center;
    cursor: pointer;
    user-select: none;  
    transition: transform .3s ease;

    color:#f8ebde;
    
    .category-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    &:hover{
      transform: scale(1.1);
      box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
    }
  }

  .selected .card-category {
    opacity: .6;
    transform: scale(1.1);
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  }


}
</style>