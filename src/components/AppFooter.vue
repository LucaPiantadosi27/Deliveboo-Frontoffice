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
    border-top: 1px solid white;
    z-index: 10;

    border-top: 1px solid white;
    ul {
        list-style-type: none;
        padding: 0;
    }
}

#contact-me{
    text-decoration: none;
    color: red;
    transition: all .3s ease;
    margin-bottom: 10px;
    &:hover{
        background-color: rgba(131, 24, 24, 0.4);
    }
}

</style>