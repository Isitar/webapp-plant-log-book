<template>
  <article>
    <section class="hero is-primary is-bold is-fullheight-with-navbar">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Plant Log Book
          </h1>
          <h2 class="subtitle">
            Start monitoring your plants
          </h2>
        </div>
      </div>
    </section>
  </article>
</template>

<script>

export default {
  name: 'Home',
  mounted() {
    this.$store.state.showFooter = false;
  },
  beforeDestroy() {
    this.$store.state.showFooter = true;
  }
}
</script>
