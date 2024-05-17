<script>

export default {
    name: 'AppFooter',
}

</script>


<template>

<footer>

    <div class="container">
        <div class="top-footer d-flex justify-content-around py-2">
            <div class="links">
                <ul class="d-flex gap-5">
                    <li><a class="text-decoration-none text-white" href="#">Link</a></li>
                    <li><a class="text-decoration-none text-white" href="#">Link</a></li>
                    <li><a class="text-decoration-none text-white" href="#">Link</a></li>
                    <li><a class="text-decoration-none text-white" href="#">Link</a></li>
                    <li><a class="text-decoration-none text-white" href="#">Link</a></li>
                </ul>
            </div>
        </div>
    </div>

</footer>

</template>


<style lang="scss">

footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100px;
    background-color: grey; 
    z-index: 100; 
    border-top: 1px solid white;
}

</style>