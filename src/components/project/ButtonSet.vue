<template>
  <v-fade-transition>
    <div v-if="IS_USER_DONATIONS_LOADED">
      <v-tooltip :disabled="!type.goal_by_amount" bottom>
        <template v-slot:activator="{ on }">
          <v-scroll-x-transition>
            <v-chip
              v-on="on"
              v-show="!!donation"
              outlined
              class="mr-2 my-1 donat"
              color="primarytext"
              large
            >
              {{ donationText }}
            </v-chip>
          </v-scroll-x-transition>
        </template>
        <span>Твой вклад</span>
      </v-tooltip>
      <v-btn
        v-if="donateAllowed && !donation"
        color="accent"
        tile
        min-width="100"
        large
      >
        {{ joinButtonText }}
      </v-btn>
      <v-btn
        v-if="donateAllowed && donation && isMoneyType"
        class="mr-2 my-1"
        color="accent"
        outlined
        tile
        min-width="100"
        large
      >
        Уточнить
      </v-btn>
      <v-btn
        v-if="donateAllowed && donation"
        color="primary"
        class="mr-2 my-1"
        outlined
        tile
        min-width="100"
        large
      >
        Отказаться
      </v-btn>
      <v-btn v-if="isDraft" disabled tile min-width="100" large>
        {{ joinButtonText }}
      </v-btn>
    </div>
  </v-fade-transition>
</template>

<style>
.donat {
  border-radius: 0px !important;
  height: 43.99px !important;
}
</style>

<script>
import { mapGetters } from "vuex";
import { U_DONATIONS_REQUEST } from "../../store/actions/userDonations";
import { STATUS_DRAFT, STATUS_SEARCH } from "../lib/const/status";

export default {
  name: "ButtonSet",
  created: async function() {
    if (this.IS_AUTHORIZED) {
      await this.$store.dispatch(U_DONATIONS_REQUEST);
    }
  },
  computed: {
    ...mapGetters([
      "IS_AUTHORIZED",
      "IS_USER_DONATIONS_LOADED",
      "USER_DONATIONS"
    ]),
    donateAllowed() {
      return this.status == STATUS_SEARCH;
    },
    isDraft() {
      return this.status == STATUS_DRAFT;
    },
    isMoneyType() {
      return !this.type.goal_by_people && this.type.goal_by_amount;
    },
    joinButtonText() {
      return this.type.goal_by_amount ? "Поддержать" : "Присоединиться";
    },
    currentDonation() {
      if (!!this.donation && this.USER_DONATIONS) {
        if (this.donation.id in this.USER_DONATIONS) {
          return this.USER_DONATIONS[this.donation.id].payment;
        }
      }
      return 0;
    },
    donationText() {
      if (this.type.goal_by_people && !this.type.goal_by_amount) {
        return "Я иду!";
      }
      if (this.type.goal_by_people && this.type.goal_by_amount) {
        return "Я в деле!";
      }
      return this.currentDonation + "₽";
    }
  },
  data() {
    return {};
  },
  props: {
    type: Object,
    donation: Object,
    status: String
  }
};
</script>
