<template>
  <v-overlay absolute z-index="5" :value="overlay">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<style scoped></style>

<script>
export default {
  name: "LoadSpinner",
  data() {
    return {};
  },
  props: {
    overlay: Boolean
  }
};
</script>
