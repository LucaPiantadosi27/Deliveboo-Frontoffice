<script>

export default {
    name: 'AppHeader',

    data(){
        return{
            apiImageUrl: 'http://127.0.0.1:8000/storage/',
        }
    }
}

</script>


<template>

<nav class="navbar navbar-expand-md">
    <div class="container">
        <!-- Logo a sinistra -->
        <a class="navbar-brand d-flex align-items-center" href="{{ url('/') }}">
            <div class="logo_laravel">
                <img :src="'http://localhost:8000/storage/' + 'branding/deliveboo.svg'" style="width: 100px" alt="">
            </div>
        </a>

        <!-- Bottone del toggler -->
        <button class="navbar-toggler border-0 my-burger" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
            <i class="fa-solid fa-burger"></i>
        </button>

        <!-- Elementi di navigazione a destra -->
        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul class="navbar-nav gap-3">
                <!-- Link di navigazione -->
                <li class="nav-item">
                    <router-link :to="{ name: 'home'}" class=" text-decoration-none">Home</router-link>
                </li>
                <li class="nav-item">
                    <a class="text-decoration-none" href="http://127.0.0.1:8000/login">Login</a>
                </li>
                <li class="nav-item">
                    <a class="text-decoration-none" href="http://127.0.0.1:8000/register">Register</a>
                </li>
                <!-- Icona del carrello -->
                <li class="nav-item">
                    <router-link :to="{name:'cart'}" class="text-decoration-none"><i class="fa-solid fa-cart-shopping"></i></router-link>
                </li>
            </ul>
        </div>
    </div>
</nav>


</template>

<style lang="scss">

nav{
    background-color: #f8ebde;

    color: #D62300 !important;
    font-size: 25px;

    font-family:sans-serif;
    font-weight: 400;
    font-style: normal;

    z-index: 99;
    ul{
        li, a{
            color: #D62300 !important;

            transition: .2s linear;

            display: flex;
            align-items: center;
            justify-content: center;

            :hover{
                transition: .2s linear;
                transform: scale(1.2);
            }
        }
    }

    .my-burger{
        color: #F6F3E4;

        font-size: 30px;
    }

}

</style>
