<template>
  <v-row justify-md="start" justify-sm="center" no-gutters class="my-5">
    <v-col
      md="6"
      sm="10"
      xs="12"
      v-for="(donat, index) in donations"
      :key="'donation_' + index"
    >
      <!-- @click="onClickDonation(donat.user.id)" -->
      <donate-line :type="type" :donation="donat" />
    </v-col>
  </v-row>
</template>

<style scoped></style>

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
  methods: {
    onClickDonation(userId) {
      this.$router.push({ name: "User", params: { id: userId } });
    }
  },
  props: {
    donations: Array,
    type: Object
  }
};
</script>
