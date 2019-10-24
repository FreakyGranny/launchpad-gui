<template>
  <div class="md-layout md-layout-item md-size-100 md-alignment-center">
    <md-progress-spinner
      class="spacing"
      :md-stroke="3"
      md-mode="indeterminate"
    ></md-progress-spinner>
  </div>
</template>

<style scoped>
.spacing {
  margin-top: 100px;
  margin-bottom: 100px;
}
</style>

<script>
export default {
  name: "LoadSpinner",
  data() {
    return {};
  }
};
</script>
