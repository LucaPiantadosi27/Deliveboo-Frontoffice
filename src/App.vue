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

  <div class="box">

    <router-view></router-view>
  </div>

  <AppFooter></AppFooter>
  
</template>



<style scoped>
.box{
  margin-bottom: 350px;
  background-color: rgb(172, 177, 214);

  height: 100%;
  min-height: 800px;

}
</style>
