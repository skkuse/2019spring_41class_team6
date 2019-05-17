<template>
  <div id="app" class="site-wrap">
    <Header></Header>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "app",
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss"></style>
