<template>
  <div id="uploading" style="display: none">
    {{ msg }}
  </div>
</template>

<script>
export default {
  props: {
    msg: String
  },
  methods: {
    toggleProgress: function() {
      document.getElementById("uploading").style.display =
        document.getElementById("uploading").style.display === "none"
          ? "block"
          : "none";
    }
  }
};
</script>

<style scoped>
#uploading {
  position: absolute;
  z-index: 2000;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.7;
}
</style>
