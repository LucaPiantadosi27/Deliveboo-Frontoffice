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

  <div class="box py-5">

    <router-view></router-view>
  </div>

  <AppFooter></AppFooter>
  
</template>



<style scoped>
.box{
  margin-bottom: 500px;

  height: 1000px;

}





</style>
