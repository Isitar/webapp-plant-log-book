<template>
    <div>
        <p class="menu-label">
            Plant List
        </p>
        <ul class="menu-list">
            <li v-for="plant in plants" :key="plant.id">
                <router-link
                        :to="{ name: 'plantDetail', params: {id: plant.id } }"
                        @click.native="close"
                        :class="{'is-active': isActive(plant.id)}"
                >
                    {{plant.name}}
                </router-link>
            </li>
            <li>
                <router-link to="/plants" class="navbar-item" @click.native="close">Full Plant List</router-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Plant} from "@/models/Plant";

    export default Vue.extend({
        name: "PlantListMenuList", methods: {
            close(): void {
                this.$store.commit('togglePlantListInAside');
            },
            isActive(id: string): boolean {
                if (this.$router.currentRoute.name === 'plantDetail') {
                    return this.$router.currentRoute.params.id === id;
                }
                return false;
            }
        },
        computed: {
            plants(): Plant[] {
                return this.$store.getters.getPlantsSorted;
            },
        },
        created(): void {
            if (0 === this.$store.state.plants.length) {
                this.$store.dispatch('loadPlants');
            }
        }
    });
</script>

<style scoped lang="scss">

</style>