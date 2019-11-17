<template>
  <v-card>
    <v-card-text>
      <div class="pt-6 primarytext--text headline text-center">
        Твой вклад
      </div>
      <div class="my-5 primarytext--text title text-center">{{ payment }}₽</div>
      <v-slider v-model="payment" min="100" step="50" max="1000"></v-slider>
    </v-card-text>
    <v-card-actions class="pb-6">
      <v-spacer></v-spacer>
      <v-btn
        color="accent"
        outlined
        tile
        large
        min-width="140"
        @click="$emit('confirm', payment)"
      >
        {{ specify ? "Уточнить" : "Внести" }}
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<style></style>

<script>
export default {
  name: "DonateDialog",
  data() {
    return {
      payment: this.sum || 250
    };
  },
  props: {
    sum: Number,
    specify: Boolean,
    dialog: Boolean
  }
};
</script>
