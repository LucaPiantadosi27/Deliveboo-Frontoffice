<script>
import { store } from "../components/store" 

export default {
    

    components: {
        
    },

    data() {
        return {
            store,
            Carrello:JSON.parse(localStorage.getItem("cart")),
           
        }
    },

    methods: {

        
    },

    mounted() {
        console.log("carrello",this.Carrello)
        
    },
}
</script>


<template>
    <h1>Carrello</h1>

    <ul>
        <li v-for="item in Carrello">
            {{ item.name }}

        </li>
    </ul>
    

</template>


<style lang="scss" scoped>

</style>