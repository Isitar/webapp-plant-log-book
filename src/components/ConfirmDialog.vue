<template>
    <transition name="fade">
        <div class="modal" :class="{'is-active': show}">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Are you sure?</p>
                    <button class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                    <p>
                        {{text}}
                    </p>
                </section>

                <footer class="modal-card-foot">
                    <button class="button is-danger" @click="ok">Ok</button>
                    <button class="button" @click="close">Cancel</button>
                </footer>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: "ConfirmDialog",

        computed: {
            show(): boolean {
                return this.$store.state.confirmDialogOpen;
            },
            text(): string {
                return this.$store.state.confirmDialogText;
            }
        },
        methods: {
            close() {
                if (null !== this.$store.state.confirmDialogCancelCallback) {
                    this.$store.state.confirmDialogCancelCallback();
                }
                this.$store.commit('closeConfirmDialog');
            },
            ok() {
                if (null !== this.$store.state.confirmDialogSuccessCallback) {
                    this.$store.state.confirmDialogSuccessCallback()
                }
                this.$store.commit('closeConfirmDialog');
            },
        },
        created(): void {
            this.$store.dispatch('loadPlantLogTypes');
        }
    });
</script>

<style scoped lang="scss">

</style>