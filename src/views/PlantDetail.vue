<template>
    <div>
        <dl>
            <dt>Id</dt>
            <dd>{{plant.id}}</dd>

            <dt>Name</dt>
            <dd>{{plant.name}}</dd>
        </dl>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'PlantDetail',
        computed: {
            plant() {
                return this.$store.getters.getPlantById(this.$route.params.id);
            }
        }
    }
</script>
