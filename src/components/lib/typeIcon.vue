<template>
  <v-tooltip :disabled="!withTooltip" bottom>
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
import {
  TYPE_CAMPAIGN,
  TYPE_CAMPAIGN_FAIR,
  TYPE_EVENT,
  TYPE_EVENT_PLUS
} from "./const/types";

export default {
  name: "TypeIcon",
  computed: {
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
    type: Object,
    withTooltip: Boolean,
    size: Number
  }
};
</script>
