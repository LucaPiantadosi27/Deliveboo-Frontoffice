<script>
import axios from "axios";


export default {
    name: "AppWelcome",

    components: {
        
    },

    data() {
        return {
            
        }
    },
}
</script>


<template>
<div class="jumbotron px-5 d-flex align-items-center ">
    <div class="container-fluid d-flex justify-content-between flex-wrap px-5">
        <div class="welcome_text d-flex align-items-center ps-3 col-5 ">
            <h1 class="display-5 fw-bold">
                Welcome to<br> DeliveBoo!
            </h1>
        </div>
        <div class="center-box col-2 d-flex align-items-end justify-content-center rounded-3 ">
            <router-link :to="{ name: 'home'}" class="btn btn-outline-light">Welcome</router-link>
        </div>
        <div class="logo_laravel col-5 d-flex justify-content-end align-items-center ">
            <img class="slide" :src="'http://localhost:8000/storage/' + 'branding/meat.png'" alt="@">
        </div>
    </div>
</div>
</template>


<style lang="scss" scoped>
.jumbotron{
    background-color: #3dc4df;
    overflow-x: hidden;

    height: calc(100vh - 126px);

    .welcome_text{
        h1{
            font-size: 100px;
            color: #F6F3E4;
            font-family:"Pacifico", cursive;
            text-shadow:2px 4px #fd6055ba;
            font-weight: 400;
            font-style: normal;
        }
    }

.btn { 
  font-family:"Pacifico", cursive;
  font-size: 30px;
  color: #F6F3E4;
  text-shadow:2px 3px #fd6055ba;

  &:hover{
   background-color: #3393a6; 
   color: #F6F3E4;
   border-color: #3393a6;
  }

}



    .logo_laravel{
        .slide{

            height: 110%;
            transform: rotate(20deg);
            -webkit-animation: slide 0.8s cubic-bezier(0.175, 0.885, 0.320, 1.275) .7s both;
	        animation: slide 0.8s cubic-bezier(0.175, 0.885, 0.320, 1.275) .7s both;

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
</style>