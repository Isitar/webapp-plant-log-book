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
                    lalala
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success">Save changes</button>
                    <button class="button" v-on:click="show = false">Cancel</button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "AddLogComponent",
        props: ['plantId', 'show'],
    }
</script>

<style scoped lang="scss">

</style>