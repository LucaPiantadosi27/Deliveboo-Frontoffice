import { createRouter, createWebHistory } from "vue-router";

import AppHome from './pages/AppHome.vue';
import AppWelcome from './pages/AppWelcome.vue';
import AppPageRestaurant from "./pages/AppPageRestaurant.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'welcome',
            component: AppWelcome
        },
        {
            path: '/home',
            name: 'home',
            component: AppHome
        },
        {
            path: '/restaurant/:id',
            name: 'restaurant',
            component: AppPageRestaurant,
        },
        
    ]
})

export {router};