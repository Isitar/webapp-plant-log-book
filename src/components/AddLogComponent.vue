<template>
    <div id="add-log">
        <div class="modal" :class="{'is-active': show}">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Add Log for {{plantId}}</p>
                    <button class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <label class="label">Log type</label>
                        <div class="control">
                            <div class="select" >
                                <select v-model="logType">
                                    <option value="">None</option>
                                    <option v-for="logType in logTypes" :key="logType.id" :value="logType.id">{{logType.label}}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Log</label>
                        <div class="control">
                            <textarea  class="textarea" v-model="log" />
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" @click="save()">Save changes</button>
                    <button class="button" @click="close()">Cancel</button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {PlantLogType} from "@/models/PlantLogType";

    export default Vue.extend({
        name: "AddLogComponent",
        props: {
            plantId: String,
        },
        data: function() {
            return {
                logType : '',
                log : '',
            };
        },
        computed: {
            show(): boolean {
                return this.$store.state.showAddPlantModal;
            },
            logTypes(): {id: string; label: string} {
                return this.$store.state.plantLogTypes.map((plantLogType: PlantLogType) => {return {id: plantLogType.id, label: plantLogType.name};})
            }
        },
        methods: {
            close() {
                this.$store.commit('closeAddPlantModal');
            },
            save() {
                this.$store.dispatch('savePlantLog', {
                    plantId: this.plantId,
                    logType: this.logType,
                    log: this.log,
                });
                this.close();
            }
        },
        mounted(): void {
            this.$store.dispatch('loadPlantLogTypes');
        }
    });
</script>

<style scoped lang="scss">

</style>