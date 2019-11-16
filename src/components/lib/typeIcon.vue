<template>
  <v-tooltip v-if="IS_PROJECT_TYPE_LOADED" :disabled="!withTooltip" bottom>
    <template v-slot:activator="{ on }">
      <v-icon color="primary" :size="size" v-on="on">
        {{ getIcon }}
      </v-icon>
    </template>
    <span>{{ type.name }}</span>
  </v-tooltip>
</template>

<style scoped></style>

<script>
import { mapGetters } from "vuex";
import {
  TYPE_CAMPAIGN,
  TYPE_CAMPAIGN_FAIR,
  TYPE_EVENT,
  TYPE_EVENT_PLUS
} from "./const/types";

export default {
  name: "TypeIcon",
  computed: {
    ...mapGetters(["IS_PROJECT_TYPE_LOADED", "PROJECT_TYPE"]),
    type() {
      return this.PROJECT_TYPE[this.typeId];
    },
    getIcon() {
      if (this.type.alias in this.typeIcons) {
        return this.typeIcons[this.type.alias];
      }
      return "error_outline";
    }
  },
  data() {
    return {
      typeIcons: {
        [TYPE_CAMPAIGN]: "mdi-cash",
        [TYPE_CAMPAIGN_FAIR]: "mdi-account-cash",
        [TYPE_EVENT]: "mdi-account-multiple",
        [TYPE_EVENT_PLUS]: "mdi-account-multiple-plus"
      }
    };
  },
  props: {
    typeId: Number,
    withTooltip: Boolean,
    size: Number
  }
};
</script>
