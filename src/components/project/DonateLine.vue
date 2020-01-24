<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      :elevation="hover ? 3 : 0"
      class="grey lighten-5 ma-1"
      min-width="290"
      tile
    >
      <v-card-text>
        <v-row align="baseline" no-gutters>
          <v-col cols="2" class="mr-4">
            <v-avatar size="40">
              <img
                v-bind:src="donation.user.avatar"
                onerror="this.onerror=null;this.src='/images/avatar.png';"
                alt="Author avatar"
              />
            </v-avatar>
          </v-col>
          <v-col cols="8">
            <router-link v-bind:to="'/user/' + donation.user.id">
              <div
                class="primarytext--text body-2 font-weight-regular text-no-wrap"
              >
                {{ donation.user.first_name + " " + donation.user.last_name }}
              </div>
            </router-link>
          </v-col>
          <v-col cols="1" v-if="!!type">
            <v-icon
              v-if="!isMoneyProject"
              :color="donation.paid ? 'accent' : ''"
            >
              mdi-ticket-outline
            </v-icon>
            <v-tooltip
              v-if="isMoneyProject"
              bottom
              transition="fade-transition"
            >
              <template v-slot:activator="{ on }">
                <v-icon :color="donation.paid ? 'accent' : ''" v-on="on">
                  {{ paymentIcon }}
                </v-icon>
              </template>
              <span>{{ paymentTooltip }}</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<style></style>

<script>
export default {
  name: "DonateLine",
  computed: {
    isMoneyProject() {
      if (this.type.goal_by_amount) {
        return true;
      }
      return false;
    },
    paymentIcon() {
      return this.donation.paid
        ? "mdi-credit-card"
        : "mdi-credit-card-clock-outline";
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
    type: Object
  }
};
</script>
