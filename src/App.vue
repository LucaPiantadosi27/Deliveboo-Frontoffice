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
  margin-bottom: 250px;
  background-color: #3dc4df;

  height: 100%;
  min-height: 1000px;

}





</style>
