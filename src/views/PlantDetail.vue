<template>
    <article>
        <section class="section">
            <div class="container" v-if="plant">
                <h1 class="title">{{plant.name}} <span class="tag is-info"
                                                       v-if="plantSpecies">{{plantSpecies.name}}</span></h1>
                <ul class="level">
                    <li class="level-item has-text-centered">
                        <div>
                            <p class="heading">Logs</p>
                            <p class="title" v-if="plant.logs">{{plant.logs.length}}</p>
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

                <button class="button" @click="openAddLogModal()">Add Log</button>

                <p class="content" v-if="!plant.logs || plant.logs.length === 0">No logs found</p>
                <div class="table-container">
                    <table class="table is-fullwidth">
                        <colgroup>
                            <col style="width: 10%" />
                        </colgroup>
                        <thead>
                        <tr>
                            <th>Typ</th>
                            <th>Log</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="log in plant.logs" :key="log.id">
                            <td>{{logTypeName(log.plantLogTypeId)}}</td>
                            <td class="nl2br">{{log.log}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <AddLog :plant-id="plant.id"></AddLog>

            </div>
            <div class="container">
                <progress class="progress is-primary" max="100" v-if="!plant"></progress>
            </div>
        </section>
    </article>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Plant} from "@/models/Plant";
    import {PlantSpecies} from "@/models/PlantSpecies";
    import AddLog from '@/components/AddLog.vue';
    import {PlantLogType} from "@/models/PlantLogType";

    export default Vue.extend({
        name: 'PlantDetail',
        components: {AddLog},
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
            },
        },
        methods: {
            openAddLogModal: function () {
                this.$store.commit('openAddPlantLogModal');
            },

            logTypeName: function(id: string): string|null {
                const plantLogType = this.$store.state.plantLogTypes.find((plt: PlantLogType) => plt.id === id);
                if (undefined === plantLogType){
                    return null;
                }
                return plantLogType.name;
            }
        },
    });
</script>
