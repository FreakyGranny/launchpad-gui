<template>
  <div v-if="IS_PROJECT_TYPE_LOADED">
    <v-btn v-if="donateAllowed" color="primary" tile min-width="100" large>
      Поддержать
    </v-btn>
  </div>
</template>

<style></style>

<script>
import { mapGetters } from "vuex";
// import {
//   TYPE_CAMPAIGN,
//   TYPE_CAMPAIGN_FAIR,
//   TYPE_EVENT,
//   TYPE_EVENT_PLUS
// } from "../lib/const/types";
import {
  //   STATUS_DRAFT,
  //   STATUS_SUCCESS,
  //   STATUS_FAIL,
  STATUS_SEARCH
  //   STATUS_HARVEST
} from "../lib/const/status";

export default {
  name: "ButtonSet",
  computed: {
    ...mapGetters(["IS_PROJECT_TYPE_LOADED", "PROJECT_TYPE"]),
    type() {
      return this.PROJECT_TYPE[this.typeId];
    },
    donateAllowed() {
      return this.status == STATUS_SEARCH;
    }
  },
  data() {
    return {};
  },
  props: {
    typeId: Number,
    status: String
  }
};
</script>
