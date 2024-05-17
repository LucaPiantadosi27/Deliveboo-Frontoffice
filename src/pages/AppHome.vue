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
        }
    },

    methods: {
        // initial api call to retrieve restaurant categories
        apiCall(){
            axios.get(this.baseApiUrl + "categories").then((res) => {
                this.categories = res.data.results;
                console.log(this.categories);
            })
        }
    },

    mounted() {
        this.apiCall();
    },
}
</script>

<template>
<section>
    <div class="container py-5">
        <h1 class="text-center">DeliveBoo</h1>
        <ul class="d-flex gap-2 justify-content-center">
            <li v-for="category in categories" class="fs-5">
                <a href="#!" class="text-decoration-none text-uppercase">{{ category.name }}</a>
            </li>
        </ul>
    </div>

</section>

</template>

<style lang="scss" scoped>

ul{
    list-style: none;
}


</style>