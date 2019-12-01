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
            <div
              class="primarytext--text body-2 font-weight-regular text-no-wrap"
            >
              {{ donation.user.first_name + " " + donation.user.last_name }}
            </div>
          </v-col>
          <v-col cols="1">
            <v-tooltip v-if="!!type && isMoneyProject" bottom>
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
// import { mapGetters } from "vuex";

export default {
  name: "DonateLine",
  computed: {
    // ...mapGetters(["IS_PROJECT_TYPE_LOADED", "PROJECT_TYPE"]),
    // type() {
    //   return this.PROJECT_TYPE[this.typeId];
    // },
    isMoneyProject() {
      if (this.type.goal_by_people) {
        return false;
      }
      return true;
    },
    paymentIcon() {
      return this.donation.paid
        ? "mdi-check-circle-outline"
        : "mdi-radiobox-blank";
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
