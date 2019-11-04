<template>
  <div class="md-layout md-alignment-top-left">
    <div
      class="md-layout-item md-small-50 md-xsmall-100"
      v-for="(donat, index) in donations"
      :key="'donation_' + index"
      @click="onClickDonation(donat.user.id)"
    >
      <donate-line :typeId="typeId" :donation="donat" />
    </div>
  </div>
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
    typeId: Number
  }
};
</script>
