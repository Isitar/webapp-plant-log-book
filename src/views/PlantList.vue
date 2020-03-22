<template>
    <article>
        <section class="section ">

            <div class="container">
                <h1 class="title">Plant List</h1>
                <button class="button" @click="showAddPlantModal()">Add Plant</button>
                <div class="table-container">
                    <table class="table is-striped is-hoverable is-fullwidth">
                        <thead>
                        <tr>
                            <th>Plant</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="plant in plants" :key="plant.id">
                            <td>{{plant.name}}</td>
                            <td class="has-text-right">
                                <router-link :to="{ name: 'plantDetail', params: {id: plant.id } }">
                                    <span class="icon">
                                        <font-awesome-icon icon="eye"/>
                                    </span>
                                </router-link>
                                <a @click.prevent="deletePlant(plant.id)">
                                    <span class="icon has-text-danger"><font-awesome-icon icon="trash"/> </span>
                                </a>

                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <AddPlantComponent></AddPlantComponent>
    </article>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {mapState} from "vuex";
    import {IPlantLogBookState} from "@/store/IPlantLogBookState";
    import AddPlantComponent from "@/components/AddPlantComponent.vue";


    export default Vue.extend({
        name: 'PlantList',
        components: {AddPlantComponent},
        computed: mapState<IPlantLogBookState>({
            plants: (state: IPlantLogBookState) => state.plants,
        }),
        methods: {
            showAddPlantModal(): void {
                this.$store.commit('openAddPlantModal');
            },
            deletePlant(id: string): void {
                this.$store.dispatch('deletePlant', id);
            },
        },
        created(): void {
            this.$store.dispatch('loadPlants');
        }
    });
</script>