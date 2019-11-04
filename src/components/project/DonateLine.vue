<template>
  <md-card class="md-elevation-0" md-with-hover>
    <md-card-content>
      <div class="md-layout md-alignment-center-left">
        <div class="md-layout-item md-size-20">
          <md-avatar class="left-offset">
            <img
              v-bind:src="donation.user.avatar"
              alt="Avatar"
              onerror="this.onerror=null;this.src='/images/avatar.png';"
            />
          </md-avatar>
        </div>
        <div class="md-layout-item md-size-65">
          <div class="subheading">
            {{ donation.user.first_name + " " + donation.user.last_name }}
          </div>
        </div>
        <div class="md-layout-item md-size-15">
          <md-icon
            v-bind:class="{ 'md-accent': donation.paid }"
            v-if="IS_PROJECT_TYPE_LOADED && isMoneyProject"
          >
            {{ paymentIcon }}
            <md-tooltip md-direction="right">{{ paymentTooltip }}</md-tooltip>
          </md-icon>
        </div>
      </div>
    </md-card-content>
  </md-card>
</template>

<style scoped>
.md-card {
  width: 360px;
}
.md-card-content:last-of-type {
  padding-bottom: 16px;
}
.donation-entry {
  min-width: 100px;
}
.left-offset {
  margin-left: 5px;
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DonateLine",
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
    },
    paymentIcon() {
      return this.donation.paid
        ? "check_circle_outline"
        : "radio_button_unchecked";
    },
    paymentTooltip() {
      return this.donation.paid ? "Перевод получен" : "Ожидается перевод";
    }
  },
  data() {
    return {};
  },
  props: {
    donation: Object,
    typeId: Number
  }
};
</script>
