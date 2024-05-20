<script>

import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default{
      components:{
        AppHeader,
        AppFooter
      }
}
</script>

<template>

  <AppHeader></AppHeader>

  <div class="">

    <router-view></router-view>

  </div>

  <AppFooter></AppFooter>
  
</template>

<style scoped>

</style>
