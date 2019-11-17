<template>
  <v-card>
    <v-card-text>
      <div class="pt-6 primarytext--text headline text-center">
        Вы уверены?
      </div>
      <div class="mt-5 primarytext--text body-1 text-center">
        Вы собираетесь отказаться от участия в проекте.
      </div>
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
  },
  props: {
    dialog: Boolean
  }
};
</script>
