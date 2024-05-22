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
    background-color: rgb(172, 177, 214);
    overflow-x: hidden;

    height: calc(100vh - 126px);

    .welcome_text{
        h1{
            font-size: 100px;
            color: rgb(255, 234, 210);
            font-family:"Pacifico", cursive;
            text-shadow:2px 4px rgb(130, 148, 196);
            font-weight: 400;
            font-style: normal;

            z-index: 99;
        }
    }

.btn { 
  font-family:"Pacifico", cursive;
  font-size: 30px;
  color: rgb(255, 234, 210);
  text-shadow:2px 3px rgb(130, 148, 196);
  z-index: 99;

  &:hover{
   background-color: rgb(130, 148, 196); 
   color: rgb(255, 234, 210);
   text-shadow:2px 3px rgb(172, 177, 214);
   border-color: rgb(130, 148, 196);
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