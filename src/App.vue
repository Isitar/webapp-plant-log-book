<template>
    <div id="app">
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
                   @click="toggleMobileNav()" :class="{'is-active': showMobileMenu}">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div class="navbar-menu" id="menu" :class="{'is-active': showMobileMenu}">
                <div class="navbar-end">
                    <router-link to="/" class="navbar-item">Home</router-link>
                    <router-link to="/plants" class="navbar-item">Plant List</router-link>
                    <router-link to="/about" class="navbar-item">About</router-link>
                </div>
            </div>
        </nav>

        <router-view/>

        <footer class="footer" v-if="showFooter">
            <div class="content has-text-centered">
                <p>
                    <strong>Plant Log Book</strong> by <a href="https://github.com/isitar">Isitar</a>
                </p>
            </div>
        </footer>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        methods: {
            toggleMobileNav() {
                this.$store.commit('toggleMobileMenu');
            },
        },
        computed: {
            showMobileMenu() {
                return this.$store.state.showMobileMenu;
            },
            showFooter() {
                return this.$store.state.showFooter;
            }
        }
    })
</script>

<style lang="scss">
    #app {
        min-height: 100vh;
        display: flex;
        flex-direction: column;

        nav + * {
            flex: 1 1 auto;
        }
    }
</style>
