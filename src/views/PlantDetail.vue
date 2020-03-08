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
    import Vue from 'vue';

    export default Vue.extend({
        name: 'PlantDetail',
        computed: {
            plant() {
                return this.$store.getters.getPlantById(this.$route.params.id);
            }
        }
    });
</script>
