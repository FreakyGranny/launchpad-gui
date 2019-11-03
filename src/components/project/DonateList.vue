<template>
  <div class="md-layout md-alignment-center">
    <md-list>
      <md-list-item
        :md-ripple="false"
        v-for="(donat, index) in donations"
        :key="'donation_' + index"
      >
        <md-avatar>
          <img
            v-bind:src="donat.user.avatar"
            alt="Avatar"
            onerror="this.onerror=null;this.src='/images/avatar.jpeg';"
          />
        </md-avatar>
        <span>{{ donat.user.first_name + " " + donat.user.last_name }}</span>
        <md-icon v-if="IS_PROJECT_TYPE_LOADED && isMoneyProject">
          {{ paymentIcon(donat) }}
          <md-tooltip md-direction="right">{{
            paymentTooltip(donat)
          }}</md-tooltip>
        </md-icon>
      </md-list-item>
    </md-list>
  </div>
</template>

<style scoped>
.md-list {
  min-width: 400px;
  max-width: 100%;
  /* display: flex;
  align-items: flex-start; */
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DonateList",
  computed: {
    ...mapGetters(["IS_PROJECT_TYPE_LOADED", "PROJECT_TYPE"]),
    type() {
      return this.PROJECT_TYPE[this.typeId];
    },
    isMoneyProject() {
      if (this.type.goal_by_people) {
        return false;
      }
      return true;
    }
  },
  methods: {
    paymentIcon(donation) {
      return donation.paid ? "check_circle_outline" : "radio_button_unchecked";
    },
    paymentTooltip(donation) {
      return donation.paid ? "Перевод получен" : "Ожидается перевод";
    }
  },
  data() {
    return {};
  },
  props: {
    donations: Array,
    typeId: Number
  }
};
</script>
