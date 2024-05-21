<script>
import axios from "axios";
import AppRestaurant from '../components/AppRestaurant.vue';
import AppLoader from '../components/AppLoader.vue'

export default {
    name: "AppPageRestaurant",

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
            isLoading: true,
        }
    },

}
</script>


<template>
 
</template>


<style lang="scss" scoped>
@use '../styles/variables' as *;

</style>