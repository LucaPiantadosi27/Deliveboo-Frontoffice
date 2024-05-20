<script>

export default {
    name: 'AppFooter',
}


// document.addEventListener('scroll', function() {
//     const footer = document.getElementById('footer');
//     const scrollPosition = window.scrollY + window.innerHeight;
//     const documentHeight = document.body.offsetHeight;

//     if (scrollPosition >= documentHeight - 100) { // Adjust this value as needed
//         footer.classList.add('show');
//     } else {
//         footer.classList.remove('show');
//     }
// });


</script>


<template>
    <footer id="footer" class="fixed-footer bg-black text-white">
        <div class="my-footer">
            <div class="row text-center text-md-left">
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
            <div class="row">
                <div class="col text-center">
                    <p class="mb-0">© 2024 Deliveboo. Developed by MLMSM</p>
                </div>
                <div class="col text-center">
                    <ul class="list-unstyled">
                        <i class="fa-brands fa-square-facebook fa-2xl me-5"></i>
                        <i class="fa-brands fa-square-x-twitter fa-2xl me-5"></i>
                        <i class="fa-brands fa-square-instagram fa-2xl me-5"></i>
                        <i class="fa-brands fa-linkedin fa-2xl me-5"></i>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>


<style lang="scss">


.fixed-footer {
    position: fixed;
    bottom: -500px; 
    right: 0;
    left: 0;
    transition: bottom 0.5s ease-in-out;
    z-index: 1;
}

.fixed-footer.show {
    bottom: 0; 
}

.my-footer {
    height: 500px;
}

i {
    cursor: pointer;
}


</style>

