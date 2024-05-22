<script>

export default {
    name: 'AppFooter',
}


</script>


<template>
    <footer id="footer" class="fixed-footer text-white">
        <div class="my-footer">
            <div class="row pt-4 text-center  text-md-left text-decoration-none ">
                <!-- Colonna 1 -->
                <div class="col-md-4 mb-4 ">
                    <h5 class="text-uppercase fw-bold ">Scopri Deliveboo</h5>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-white text-decoration-none ">Chi siamo</a></li>
                        <li><a href="#" class="text-white text-decoration-none ">Ristoranti</a></li>
                        <li><a href="#" class="text-white text-decoration-none ">Design</a></li>
                        <li><a href="#" class="text-white text-decoration-none ">Diventa nostro partner</a></li>
                        <li><a href="#" class="text-white text-decoration-none ">Programmazione</a></li>
                        <li><a href="#" class="text-white text-decoration-none ">Lavora con noi</a></li>
                    </ul>
                </div>

        
                <!-- Colonna 2 -->
                <div class="col-md-4 mb-4">
                    <h5 class="text-uppercase fw-bold ">Note Legali</h5>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-white text-decoration-none ">Termini & Condizioni</a></li>
                        <li><a href="#" class="text-white text-decoration-none ">Informativa sulla privacy</a></li>
                        <li><a href="#" class="text-white text-decoration-none ">Cookies</a></li>
                        <li><a href="#" class="text-white text-decoration-none ">Classificazione dei partner</a></li>
                        <li><a href="#" class="text-white text-decoration-none ">Richieste da parte delle Autorità </a></li>
                        <li><a href="#" class="text-white text-decoration-none ">Pubbliche</a></li>
                    </ul>
                </div>
                <!-- Colonna 3 -->
                <div class="col-md-4 mb-4">
                    <h5 class="text-uppercase fw-bold ">Aiuto</h5>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-white text-decoration-none ">Contatti</a></li>
                        <li><a href="#" class="text-white text-decoration-none ">FAQ</a></li>
                        <li><a href="#" class="text-white text-decoration-none ">Tipi di cucina</a></li>
                    </ul>
                </div>
            </div>

            <div class="row d-flex 100w justify-content-center align-items-center ">
                <div class="col-6 d-flex justify-content-center align-items-center  ">
                    <div class="text-center">
                        <p class=""><strong>COPYRIGHT</strong></p>
                        <p class="mb-0">© 2024 Deliveboo. Developed by MLMSM</p>
                    </div>
                </div>
                
                <div class="col-4 d-flex justify-content-center align-items-center">
                    <div class="text-center">
                    <p><strong>DOWNLOAD APP</strong></p>
                    <div>
                        <img class="small-image" :src="'http://localhost:8000/storage/' + 'download_images/appstore.png'" alt="App Store">
                   
                        <img class="small-image" :src="'http://localhost:8000/storage/' + 'download_images/playstore.png'" alt="App Store">
                    </div>
                    </div>
                </div>

                <div class="col-6 d-flex flex-column justify-content-start align-items-center ">
                    <div class="text-center ">
                        <p class=""><strong>FOLLOW US</strong></p>
                        <div class="d-flex justify-content-around gap-4">
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

    font-family:"Pacifico", cursive;
    text-shadow:2px 3px rgb(172, 177, 214);
    
}

.fixed-footer {
    position: fixed;
    bottom: 0; 
    right: 0;
    left: 0;

    background-color: rgb(130, 148, 196);

    z-index: -1;
}

.fixed-footer.show {
    bottom: 0; 
}

.my-footer {
    height: 400px;
}

i:nth-of-type(1):hover{
    background-color: #1877f2;
}
i:nth-of-type(2):hover{
    background-color: #000000;
}
i:nth-of-type(3):hover{
    background-color: rgb(176, 39, 194);
}
i:nth-of-type(4):hover{
    background-color:#0077B5;
}
.small-image {
  width: 120px; 
  height: auto;
  border-radius: 5px;
  border: 2px solid transparent;

    &:hover{
        border-color: rgba(255, 255, 255, 0.514);
   
        cursor: pointer;
  
}


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
</style>

