<script>

import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default{

  data() {
    return{
      apiImageUrl: 'http://127.0.0.1:8000/storage/',
    }
  },


  components:{
    AppHeader,
    AppFooter
  }
}
</script>

<template>

  <AppHeader></AppHeader>

  <div class="box">
    <div class="wave-box">
      <img :src="apiImageUrl + 'branding/svg.png' " alt="">
    </div>

    <router-view></router-view>

    <!-- offcanvas -->
    <div class="offcanvas offcanvas-end my-offcanvas" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div class="offcanvas-header">
            <h2 class="offcanvas-title my-title" id="offcanvasScrollingLabel">My Cart</h2>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <p>Try scrolling the rest of the page to see this option in action.</p>
        </div>
    </div>
    <!-- end offcanvas -->
  </div>

  <AppFooter></AppFooter>
  
</template>



<style scoped>


.box{

  margin-bottom: 450px;
  background-color: rgb(172, 177, 214);
  position: relative;
  
  height: 100%;
  min-height: 800px;
  
  .wave-box{
    background-color: rgb(172, 177, 214);
    position: absolute;
    width: 100%;
  
    img{
      width: 100%;
      height: 100%;
      transform: rotate(180deg);
        
    }
    
  }

}


.my-offcanvas{
  background-color:rgb(172, 177, 214) ;

  .my-title{
    font-family:"Pacifico", cursive;
    text-shadow:2px 3px rgb(130, 148, 196);
    font-weight: 400;
    font-style: normal;
  }

}
</style>
