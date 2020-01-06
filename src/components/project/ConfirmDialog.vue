<template>
  <v-card>
    <v-card-text>
      <slot></slot>
    </v-card-text>
    <v-card-actions class="pb-6">
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        outlined
        tile
        large
        min-width="160"
        @click="$emit('confirm')"
        >Подтвердить</v-btn
      >
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<style></style>

<script>
export default {
  name: "ConfirmDialog",
  data() {
    return {};
  }
};
</script>
