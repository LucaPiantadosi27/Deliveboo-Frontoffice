<script>

export default {
    name: 'AppHeader',
}

</script>


<template>

<nav class="navbar navbar-expand-md">
    <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="{{ url('/') }}">
            <div class="logo_laravel">
                <img :src="'http://localhost:8000/storage/' + 'branding/logo.png'" style="width: 100px" alt="">
            </div>
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <!-- Left Side Of Navbar -->
            <ul class="navbar-nav me-auto">
                
            </ul>

            <!-- Right Side Of Navbar -->
            <ul class="navbar-nav ml-auto gap-3 ">
                <!-- Authentication Links -->
                <li class="nav-item">
                    <router-link :to="{ name: 'welcome'}" class="nav-link text-light text-decoration-none ">Home</router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-light" href="@">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-light" href="@">Register</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

</template>

<style lang="scss">

nav{
    background-color: #3393a6;

    color: #F6F3E4;
    font-size: 25px;

    font-family:"Pacifico", cursive;
    text-shadow:2px 4px hsla(4, 98%, 66%, 0.7);
    font-weight: 400;
    font-style: normal;

    z-index: 99;
    ul{
        li{
            color: #F6F3E4;

            transition: .2s linear;

            :hover{
                transition: .2s linear;
                transform: scale(1.2);
            }
        }
    }

   
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}

.all{
    background-color: #3dc4df;

    height: calc(100% - 126px);
}

</style>
