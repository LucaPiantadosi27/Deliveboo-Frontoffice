import { createRouter, createWebHistory } from "vue-router";

import AppHome from './pages/AppHome.vue';

import AppCart from './pages/AppCart.vue';


import AppPageRestaurant from "./pages/AppPageRestaurant.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
      
        {
            path: '/restaurant/:id',
            name: 'restaurant',
            component: AppPageRestaurant,
        },

        {
            path: '/cart',
            name: 'cart',
            component: AppCart,
        }
        
    ]
})

export {router};