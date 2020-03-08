<template>
    <main>
        <section class="section">
            <div class="container" v-if="plant">
                <h1 class="title">{{plant.name}} <span class="tag is-info"
                                                       v-if="plantSpecies">{{plantSpecies.name}}</span></h1>
                <ul class="level">
                    <li class="level-item has-text-centered">
                        <div>
                            <p class="heading">Logs</p>
                            <p class="title">{{plant.logs.length}}</p>
                        </div>
                    </li>
                    <li class="level-item has-text-centered">
                        <div>
                            <p class="heading">Active</p>
                            <p class="title">
                                <font-awesome-icon icon="check" v-if="plant.isActive"></font-awesome-icon>
                                <font-awesome-icon icon="times" v-if="!plant.isActive"></font-awesome-icon>
                            </p>
                        </div>
                    </li>
                </ul>

                <h2 class="title">Logs</h2>
                <button class="button" v-on:click="openModal()">Add Log</button>
                <p class="content" v-if="!plant.logs || plant.logs.length === 0">No logs found</p>
                <ul class="list is-hoverable">
                    <li class="list-item" v-for="log in plant.logs" :key="log.id">{{log.log}}</li>
                </ul>

                <AddLogComponent :plant-id="plant.id" :show="showAddLogModal"></AddLogComponent>


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
    import {PlantSpecies} from "@/models/PlantSpecies";
    import AddLogComponent from '@/components/AddLogComponent.vue';

    export default Vue.extend({
        name: 'PlantDetail',
        data: () => {
            return {showAddLogModal: false};
        },
        computed: {
            plant(): Plant | null {
                const plant = this.$store.getters.getPlantById(this.$route.params.id);

                if (null === plant || undefined === plant) {
                    this.$store.dispatch('loadPlants');
                    return null;
                }

                if (undefined === plant.logs) {
                    this.$store.dispatch('loadPlantLogsForPlant', {plantId: plant.id});
                }

                return plant;
            },
            plantSpecies(): PlantSpecies | null {
                if (undefined === this.plant || null === this.plant) {
                    return null;
                }
                const plantSpecies = this.$store.getters.getPlantSpeciesById(this.plant.plantSpeciesId);

                if (null === plantSpecies || undefined === plantSpecies) {
                    this.$store.dispatch('loadPlantSpecies');
                    return null;
                }
                return plantSpecies;
            }

        },
        methods: {
            openModal: function() {
                this.showAddLogModal = false;
                this.showAddLogModal = true;
            },
        },
        components: {AddLogComponent}
    });
</script>
