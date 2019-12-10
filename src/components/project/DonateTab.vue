<template>
  <v-row
    justify-md="start"
    justify-sm="center"
    no-gutters
    class="grey lighten-5 my-5"
  >
    <v-row v-if="donations.length == 0" justify="center" no-gutters>
      <v-col class="my-11">
        <v-row justify="center">
          <v-icon size="80" color="secondarytext">
            mdi-human-greeting
          </v-icon>
        </v-row>
        <div class="secondarytext--text caption text-center">
          Стань первым участником!
        </div>
      </v-col>
    </v-row>
    <v-col
      md="6"
      sm="10"
      xs="12"
      v-for="(donat, index) in donations"
      :key="'donation_' + index"
    >
      <donate-line :type="type" :donation="donat" />
    </v-col>
  </v-row>
</template>

<style scoped>
.circle {
  border-radius: 10px;
  color: red;
}
</style>

<script>
import DonateLine from "./DonateLine";

export default {
  components: {
    DonateLine
  },
  name: "DonateTab",
  data() {
    return {};
  },
  props: {
    donations: Array,
    type: Object
  }
};
</script>
