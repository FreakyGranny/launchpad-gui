<template>
  <v-card>
    <v-card-text>
      <div class="pt-6 primarytext--text headline text-center">
        Выберите сумму
      </div>
      <div class="my-5 primarytext--text title text-center">{{ payment }}₽</div>
      <v-slider
        v-model="payment"
        :min="minimum"
        :max="limit > lowTarget ? limit : lowTarget"
        track-color="secondarytext"
        :step="step"
      >
        <template v-slot:prepend v-if="limit > highTarget">
          <v-icon color="primary" @click="decrement">
            mdi-minus
          </v-icon>
        </template>

        <template v-slot:append v-if="limit > highTarget">
          <v-icon color="primary" @click="increment">
            mdi-plus
          </v-icon>
        </template>
      </v-slider>
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
      minimum: 100,
      lowTarget: 500,
      highTarget: 1000,
      payment: this.sum || 200
    };
  },
  computed: {
    step() {
      if (this.limit >= this.highTarget) {
        return 100;
      }
      return 50;
    }
  },
  methods: {
    decrement() {
      this.payment -= this.step;
    },
    increment() {
      this.payment += this.step;
    }
  },
  props: {
    sum: Number,
    limit: Number,
    specify: Boolean,
    dialog: Boolean
  }
};
</script>
