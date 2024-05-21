<script>
import axios from "axios";
import AppRestaurant from '../components/AppRestaurant.vue';
import AppLoader from '../components/AppLoader.vue'

export default {
    name: "AppPageRestaurant",
    
    data() {
        return {
            baseApiUrl: "http://127.0.0.1:8000/api/",
            categories: [],
            Risultato: [],
            ArrayCategory: [],
            isLoading: true,
            restaurantId: null,
            singleRestaurant:'',
        }
    },

    components: {
        AppRestaurant,
        AppLoader,
    },

    mounted() {

        this.restaurantId = this.$route.params.id

        axios.get( this.baseApiUrl + 'restaurants/' + this.restaurantId ).then(res => {

            if (res.data.success) {

                this.singleRestaurant = res.data.results

                console.log(res.data);

            } else {
                this.$router.push({ name: 'home' })
            }


        })
    },

}
</script>


<template>
    <div id="restaurant"  class="container">
        <h2 class="pt-4 fw-bolder ">{{singleRestaurant.name_res}}</h2>
        <span class="image fit"><img src="" alt="" /></span>
        <div class="box alt">
            <div class="row gtr-50 gtr-uniform">
                <div class="col-4"><span class="image fit"><img src="" alt="" /></span></div>
                <div class="col-4"><span class="image fit"><img src="" alt="" /></span></div>
                <div class="col-4"><span class="image fit"><img src="" alt="" /></span></div>
                <!-- Break -->
                <div class="col-4"><span class="image fit"><img src="" alt="" /></span></div>
                <div class="col-4"><span class="image fit"><img src="" alt="" /></span></div>
                <div class="col-4"><span class="image fit"><img src="" alt="" /></span></div>
                <!-- Break -->
                <div class="col-4"><span class="image fit"><img src="" alt="" /></span></div>
                <div class="col-4"><span class="image fit"><img src="" alt="" /></span></div>
                <div class="col-4"><span class="image fit"><img src="" alt="" /></span></div>
            </div>
        </div>   
    </div>
</template>


<style lang="scss" scoped>
@use '../styles/variables' as *;

</style>