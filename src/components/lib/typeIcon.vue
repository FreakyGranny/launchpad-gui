<template>
  <md-icon v-if="IS_PROJECT_TYPE_LOADED">
    {{ getIcon }}
    <md-tooltip md-direction="top">{{ type.name }}</md-tooltip>
  </md-icon>
</template>

<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine";

.md-icon {
  color: md-get-palette-color(deeppurple, 600) !important;
}
</style>

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
    iconMap() {
      let map = {};
      (map[TYPE_CAMPAIGN] = "donut_large"),
        (map[TYPE_CAMPAIGN_FAIR] = "view_module"),
        (map[TYPE_EVENT] = "group"),
        (map[TYPE_EVENT_PLUS] = "group_add");
      return map;
    },
    getIcon() {
      if (this.type.alias in this.iconMap) {
        return this.iconMap[this.type.alias];
      }
      return "error_outline";
    }
  },
  data() {
    return {};
  },
  props: { typeId: Number }
};
</script>
