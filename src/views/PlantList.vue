<template>
    <main>
        <section class="section ">

            <div class="container">
                <h1 class="title">Plant List</h1>
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
                            <td align="right">
                                <router-link :to="{ name: 'plantDetail', params: {id: plant.id } }">
                                <span class="icon">
                                    <font-awesome-icon icon="eye"/>
                                </span>
                                </router-link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </main>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {mapState} from "vuex";
    import {IPlantLogBookState} from "@/store/IPlantLogBookState";


    export default Vue.extend({
        name: 'PlantList',
        computed: mapState<IPlantLogBookState>({
            plants: (state: IPlantLogBookState) => state.plants,
        }),
        mounted(): void {
            this.$store.dispatch('loadPlants');
        }
    });
</script>