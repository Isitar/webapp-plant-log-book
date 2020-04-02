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
                    <router-link to="/" class="navbar-item" @click.native="closeAllMenus">Home</router-link>
                    <a class="navbar-item" @click.prevent="showPlantList">Plant List</a>
                    <router-link to="/about" class="navbar-item">About</router-link>
                </div>
            </div>
        </nav>
        <div id="content">
            <transition name="slide-from-right">
                <aside class="menu has-background-light" v-if="showAside" >
                    <PlantListMenuList v-if="showPlantListInAside">

                    </PlantListMenuList>
                </aside>
            </transition>
            <main class="main">
                <transition name="fade">
                    <router-view/>
                </transition>
            </main>
        </div>
        <footer class="footer" v-if="showFooter">
            <div class="content has-text-centered">
                <p>
                    <strong>Plant Log Book</strong> by <a href="https://github.com/isitar">Isitar</a>
                </p>
            </div>
        </footer>
        <ConfirmDialog></ConfirmDialog>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import PlantListMenuList from "@/components/PlantListMenuList.vue";
    import ConfirmDialog from "@/components/ConfirmDialog.vue";

    export default Vue.extend({
        components: {PlantListMenuList, ConfirmDialog},
        methods: {
            toggleMobileNav() {
                this.$store.commit('toggleMobileMenu');
            },
            showPlantList() {
                this.$store.commit('togglePlantListInAside');
            },
            closeAllMenus() {
                this.$store.commit('closeMobileMenu');
                this.$store.commit('closeAside');
            },
        },
        computed: {
            showMobileMenu() {
                return this.$store.state.showMobileMenu;
            },
            showFooter() {
                return this.$store.state.showFooter;
            },
            showAside() {
                return this.$store.state.showAside;
            },
            showPlantListInAside() {
                return this.$store.state.showPlantListInAside;
            },
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

        #content {
            position: relative;
            display: flex;
            flex-direction: column;
            @include desktop {
                flex-direction: row;
            }

            > aside {
                padding: $box-padding;
                flex: none;
                @include desktop {
                    order: 2;
                    position: absolute;
                    right: 0;
                    height: 100%;
                    > * {
                        position: sticky;
                        top: $box-padding;
                    }
                }
            }

            > main {
                flex: 1 0 auto;
            }
        }
    }
</style>
