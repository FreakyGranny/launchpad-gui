<template>
  <div v-if="IS_USER_DONATIONS_LOADED">
    <v-btn
      v-if="donateAllowed && !donation"
      class="my-1"
      color="accent"
      tile
      min-width="100"
      large
      @click="isMoneyType ? (donatePick = true) : joinProject(0)"
      :disabled="makeRequest"
      :loading="makeRequest"
    >
      {{ joinButtonText }}
    </v-btn>
    <v-tooltip
      :disabled="!type.goal_by_amount"
      bottom
      transition="fade-transition"
    >
      <template v-slot:activator="{ on }">
        <v-fade-transition>
          <v-chip
            v-on="on"
            v-show="!!donation && !isFail"
            outlined
            class="mr-2 my-1 donat"
            color="primarytext"
            large
          >
            {{ donationText }}
          </v-chip>
        </v-fade-transition>
      </template>
      <span>Твой вклад</span>
    </v-tooltip>
    <v-btn
      v-if="donateAllowed && donation && isMoneyType"
      class="mr-2 my-1"
      color="accent"
      outlined
      tile
      min-width="100"
      large
      @click="showSpecify = true"
      :disabled="makeRequest"
      :loading="makeRequest"
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
      @click="leaveConfirm = true"
      :disabled="makeRequest"
      :loading="makeRequest"
    >
      Отказаться
    </v-btn>
    <v-btn class="my-1" v-if="isDraft" disabled tile min-width="100" large>
      {{ joinButtonText }}
    </v-btn>
    <v-dialog v-model="leaveConfirm" max-width="400px">
      <confirm-dialog @confirm="leaveProject">
        <div class="pt-6 primarytext--text headline text-center">
          Вы уверены?
        </div>
        <div class="mt-5 primarytext--text body-1 text-center">
          Вы собираетесь отказаться от участия в проекте.
        </div>
      </confirm-dialog>
    </v-dialog>
    <v-dialog v-model="donatePick" max-width="400px">
      <donate-dialog
        @confirm="moneyDonate"
        :specify="false"
        :limit="donateLimit"
      />
    </v-dialog>
    <v-dialog v-model="showSpecify" max-width="400px">
      <donate-dialog
        @confirm="specifyDonate"
        :sum="currentDonationSum"
        :specify="true"
        :limit="donateLimit"
      />
    </v-dialog>
  </div>
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
import { STATUS_DRAFT, STATUS_SEARCH, STATUS_FAIL } from "../lib/const/status";
import ConfirmDialog from "./ConfirmDialog";
import DonateDialog from "./DonateDialog";

export default {
  components: {
    DonateDialog,
    ConfirmDialog
  },
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
    isFail() {
      return this.status == STATUS_FAIL;
    },
    isMoneyType() {
      return !this.type.goal_by_people && this.type.goal_by_amount;
    },
    joinButtonText() {
      return this.type.goal_by_amount ? "Поддержать" : "Присоединиться";
    },
    currentDonationSum() {
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
        return this.suggest + "₽";
      }
      return this.currentDonationSum + "₽";
    },
    currentContribution() {
      let beforeUpdate = 1;
      if (this.isMoneyType) {
        beforeUpdate = this.currentDonationSum;
      }
      return beforeUpdate;
    }
  },
  methods: {
    joinProject(payment) {
      this.makeRequest = true;
      let payload = {
        project: Number(this.$route.params.id),
        payment: payment
      };
      this.axios
        .post("/donation", payload)
        .then(resp => {
          this.project = resp.data;
          this.$emit("create", payment > 0 ? payment : 1);
          this.makeRequest = false;
        })
        .catch(resp => {
          this.requestError = resp;
          this.makeRequest = false;
          // window.console.log(resp);
        });
    },
    leaveProject() {
      this.leaveConfirm = false;
      this.makeRequest = true;
      this.axios
        .delete("/donation/" + this.donation.id)
        .then(resp => {
          this.some = resp.data;
          this.$emit("delete", this.currentContribution);
          this.makeRequest = false;
        })
        .catch(resp => {
          this.requestError = resp;
          this.makeRequest = false;
        });
    },
    moneyDonate(payment) {
      this.donatePick = false;
      this.joinProject(payment);
      this.$store.dispatch(U_DONATIONS_REQUEST);
    },
    specifyDonate(payment) {
      this.showSpecify = false;
      if (payment == this.currentContribution) {
        return;
      }
      this.makeRequest = true;
      this.axios
        .patch("/donation/" + this.donation.id, { payment: payment })
        .then(resp => {
          this.$store.dispatch(U_DONATIONS_REQUEST);
          this.$emit("update", resp.data.payment - this.currentContribution);
          this.makeRequest = false;
        })
        .catch(resp => {
          this.requestError = resp;
          this.makeRequest = false;
        });
    }
  },
  data() {
    return {
      donatePick: false,
      showSpecify: false,
      leaveConfirm: false,
      makeRequest: false,
      requestError: null
    };
  },
  props: {
    suggest: Number,
    donateLimit: Number,
    type: Object,
    donation: Object,
    status: String
  }
};
</script>
