<template>
    <div class="modal" :class="{'is-active': show}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Add new plant</p>
                <button class="delete" aria-label="close" @click="close"></button>
            </header>
            <section class="modal-card-body">
                <div class="field">
                    <label class="label">Plant Species</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="plantSpeciesId">
                                <option value="">None</option>
                                <option v-for="plantSpecies in species" :key="plantSpecies.id" :value="plantSpecies.id">
                                    {{plantSpecies.label}}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Name</label>
                    <div class="control">
                        <input class="input" v-model="name"/>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" @click="save">Save changes</button>
                <button class="button" @click="close">Cancel</button>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {PlantSpecies} from "@/models/PlantSpecies";

    export default Vue.extend({
        name: "AddPlant",
        data: function () {
            return {
                plantSpeciesId: '',
                name: '',
            };
        },
        computed: {
            show(): boolean {
                return this.$store.state.showAddPlantModal;
            },
            species(): { id: string; label: string } {
                return this.$store.state.plantSpecies.map((plantSpecies: PlantSpecies) => {
                    return {id: plantSpecies.id, label: plantSpecies.name};
                })
            }
        },
        methods: {
            close() {
                this.$store.commit('closeAddPlantModal');
            },
            save() {
                this.$store.dispatch('createPlant', {
                    name: this.name,
                    plantSpeciesId: this.plantSpeciesId,
                })
                    .then(() => {
                        this.name = '';
                        this.plantSpeciesId = '';
                        this.close();
                    });

            }
        },
        created(): void {
            this.$store.dispatch('loadPlantSpecies');
        }
    });
</script>

<style scoped lang="scss">

</style>