<script>

export default {
    name: 'AppFooter',
}


</script>


<template>
    <footer id="footer" class="fixed-footer text-white ">
        <div class="my-footer">
            <div class="row pt-4 text-center  text-md-left text-decoration-none ">
                <!-- Colonna 1 -->
                <div class="col-md-4 mb-4 ">
                    <h5 class="text-uppercase fw-bold ">Discover Deliveboo</h5>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-white text-decoration-none ">Who we are</a></li>
                        <li><a href="#" class="text-white text-decoration-none ">Restaurants</a></li>
                        <li><a href="#" class="text-white text-decoration-none ">Design</a></li>
                        <li><a href="#" class="text-white text-decoration-none ">Become our partner</a></li>
                        <li><a href="#" class="text-white text-decoration-none ">Programmig</a></li>
                        <li><a href="#" class="text-white text-decoration-none ">Work with us</a></li>
                    </ul>
                </div>

        
                <!-- Colonna 2 -->
                <div class="col-md-4 mb-4">
                    <h5 class="text-uppercase fw-bold ">Legal Notices</h5>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-white text-decoration-none ">Temrs and Conditions</a></li>
                        <li><a href="#" class="text-white text-decoration-none ">Privacy Police</a></li>
                        <li><a href="#" class="text-white text-decoration-none ">Cookies</a></li>
                        <li><a href="#" class="text-white text-decoration-none ">Classificatio of partners</a></li>
                        <li><a href="#" class="text-white text-decoration-none ">Requests from the authorities</a></li>
                        <li><a href="#" class="text-white text-decoration-none ">Public</a></li>
                    </ul>
                </div>
                <!-- Colonna 3 -->
                <div class="col-md-4 mb-4">
                    <h5 class="text-uppercase fw-bold ">Help</h5>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-white text-decoration-none ">Contacts</a></li>
                        <li><a href="#" class="text-white text-decoration-none ">FAQ</a></li>
                        <li><a href="#" class="text-white text-decoration-none ">Types of cuisine</a></li>
                    </ul>
                </div>
            </div>

            <div class="row d-flex 100w justify-content-center align-items-center ">
                <div class="col-6 d-flex justify-content-center align-items-center  ">
                    <div class="text-center">
                        <h5>COPYRIGHT</h5>
                        <p class="mb-0">© 2024 Deliveboo. Developed by MLMSM</p>
                    </div>
                </div>
                
                <div class="col-4 d-flex justify-content-center align-items-center">
                    <div class="text-center">
                    <h5>DOWNLOAD APP</h5>
                    <div class="d-flex gap-3 justify-content-center " >
                        <img class="small-image w-25  " :src="'http://localhost:8000/storage/' + 'download_images/appstore.png'" alt="App Store">
                        <img class="small-image w-25  " :src="'http://localhost:8000/storage/' + 'download_images/playstore.png'" alt="App Store">
                    </div>
                    </div>
                </div>

                <div class="col-6 d-flex flex-column justify-content-start align-items-center ">
                    <div class="text-center ">
                        <h5>FOLLOW US</h5>
                        <div class="box-icon d-flex justify-content-around gap-4">
                            <i class=" fa-brands fa-square-facebook "></i>
                            <i class=" fa-brands fa-square-x-twitter "></i>
                            <i class=" fa-brands fa-square-instagram "></i>
                            <i class=" fa-brands fa-linkedin "></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>


<style lang="scss" scoped>

.footer{
    color: #F6F3E4;
    font-size: 25px;

    width: 100vw;

}

.fixed-footer {
    position: fixed;
    bottom: 0; 
    right: 0;
    left: 0;

    background-color: #FFAC5F;

    z-index: -1;

    h5{
        color:#713616;

        font-family: "Chicle", serif;
        font-weight: 400;
        font-style: normal;
        text-align: center; 
    }
}

.fixed-footer.show {
    bottom: 0; 
}

.my-footer {
    height: 450px;
}

.small-image{
    
       
      &:hover{

        cursor: pointer;
       
    }
}

.box-icon{

    i:nth-of-type(1):hover{
        color: #1877f2;
    }
    i:nth-of-type(2):hover{
   
        color: #000000;
    }
    i:nth-of-type(3):hover{
        color: rgb(176, 39, 194);
    }
    i:nth-of-type(4):hover{
        color: #0077B5;
    }

    i {
        cursor: pointer;
        font-size: 25px;
        transition: .2s linear;
    
        &:hover{
            
        transition: transform 0.3s ease, background-color 0.3s ease;
        border-radius: 3px;
        transform: scale(1.2);
    
    
    }
}



}
</style>

