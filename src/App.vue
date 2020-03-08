<template>
    <div id="app">
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
                   data-target="menu">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div class="navbar-menu" id="menu">
                <div class="navbar-end">
                    <router-link to="/" class="navbar-item">Home</router-link>
                    <router-link to="/plants" class="navbar-item">Plant List</router-link>
                    <router-link to="/about" class="navbar-item">About</router-link>
                </div>
            </div>
        </nav>

        <router-view/>

        <footer class="footer" v-if="this.$store.state.showFooter">
            <div class="content has-text-centered">
                <p>
                    <strong>Plant Log Book</strong> by <a href="https://github.com/isitar">Isitar</a>
                </p>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {}

    document.addEventListener('DOMContentLoaded', () => {
        // Get all "navbar-burger" elements
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {

            // Add a click event on each of them
            $navbarBurgers.forEach(burger => {
                burger.addEventListener('click', () => {

                    // Get the target from the "data-target" attribute
                    const target = burger.dataset.target;
                    const $target = document.getElementById(target);

                    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                    burger.classList.toggle('is-active');
                    $target.classList.toggle('is-active');
                });
            });
        }
    })
</script>

<style lang="scss">

</style>
