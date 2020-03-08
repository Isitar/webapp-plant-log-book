<template>
    <main>
        <section class="section">
            <div class="container">
                <h1 class="title">{{plant.name}}</h1>
            </div>
        </section>
    </main>
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
