<template>
  <md-icon v-if="IS_PROJECT_TYPE_LOADED">
    {{ getIcon }}
    <md-tooltip v-if="withTooltip" md-direction="top">
      {{ type.name }}
    </md-tooltip>
  </md-icon>
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
        [TYPE_CAMPAIGN]: "view_quilt",
        [TYPE_CAMPAIGN_FAIR]: "view_module",
        [TYPE_EVENT]: "group",
        [TYPE_EVENT_PLUS]: "group_add"
      }
    };
  },
  props: {
    typeId: Number,
    withTooltip: Boolean
  }
};
</script>
