<template>
  <div id="uploading">
    {{ msg }}
  </div>
</template>

<script>
export default {
  props: {
    msg: String
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
