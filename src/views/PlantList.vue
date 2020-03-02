<template>
    <table>
        <thead>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="plant in plants" :key="plant.id">
            <td>{{plant.id}}</td>
            <td>{{plant.name}}</td>
            <router-link :to="{ name: 'plantDetail', params: {id: plant.id } }">Detail: {{plant.id}}</router-link>
        </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
    import {mapState} from "vuex";



    export default {
        name: 'PlantList',
        computed: mapState({
            plants: state => state.plants
        }),
        mounted(): void {
            this.$store.dispatch('loadPlants');
        }
    }
</script>

<style src="./PlantList.scss" lang="scss"></style>