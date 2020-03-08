<template>
    <main>
        <section class="section">
            <div class="container" v-if="plant">
                <h1 class="title">{{plant.name}}</h1>
                <div class="tile is-ancestor">
                    <div class="tile">
                        <p>Species: <strong class="has-text-primary">{{plant.plantSpeciesId}}</strong></p>
                    </div>
                </div>
            </div>
            <div class="container">
                <progress class="progress is-primary" max="100" v-if="!plant"></progress>
            </div>
        </section>
    </main>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Plant} from "@/models/Plant";

    export default Vue.extend({
        name: 'PlantDetail',
        computed: {
            plant(): Plant {
                const plant = this.$store.getters.getPlantById(this.$route.params.id);
                if (undefined === plant) {
                    this.$store.dispatch('loadPlants');
                }
                return this.$store.getters.getPlantById(this.$route.params.id);
            }
        }
    });
</script>
