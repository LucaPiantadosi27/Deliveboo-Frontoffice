<script>

export default {
    name: 'AppFooter',
}


</script>


<template>
    <footer id="footer" class="fixed-footer text-white">
        <div class="my-footer">
            <div class="row pt-4 text-center  text-md-left">
                <!-- Colonna 1 -->
                <div class="col-md-4 mb-4">
                    <h5 class="text-uppercase">Colonna 1</h5>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-white">Link 1</a></li>
                        <li><a href="#" class="text-white">Link 2</a></li>
                        <li><a href="#" class="text-white">Link 3</a></li>
                    </ul>
                </div>
                <!-- Colonna 2 -->
                <div class="col-md-4 mb-4">
                    <h5 class="text-uppercase">Colonna 2</h5>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-white">Link 1</a></li>
                        <li><a href="#" class="text-white">Link 2</a></li>
                        <li><a href="#" class="text-white">Link 3</a></li>
                    </ul>
                </div>
                <!-- Colonna 3 -->
                <div class="col-md-4 mb-4">
                    <h5 class="text-uppercase">Colonna 3</h5>
                    <ul class="list-unstyled">
                        <li><a href="#" class="text-white">Link 1</a></li>
                        <li><a href="#" class="text-white">Link 2</a></li>
                        <li><a href="#" class="text-white">Link 3</a></li>
                    </ul>
                </div>
            </div>
            <div class="row d-flex 100w justify-content-center align-items-center ">
                <div class="col-6 d-flex justify-content-center align-items-center  ">
                    <div class="text-center">
                        <p><strong>COPYRIGHT</strong></p>
                        <p class="mb-0">© 2024 Deliveboo. Developed by MLMSM</p>
                    </div>
                </div>
                <div class="col-6 d-flex flex-column justify-content-start align-items-center ">
                    <div class="text-center ">
                        <p class=""><strong>FOLLOW US</strong></p>
                        <div class="d-flex justify-content-around gap-4">
                            <i class="fa-brands fa-square-facebook "></i>
                            <i class="fa-brands fa-square-x-twitter "></i>
                            <i class="fa-brands fa-square-instagram "></i>
                            <i class="fa-brands fa-linkedin "></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>


<style lang="scss">


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
    height: 250px;
}

i {
    cursor: pointer;
    font-size: 25px;
    transition: .2s linear;

    &:hover{
        
        transform: scale(1.3);
    }
}


</style>

