<template>
  <v-tooltip :disabled="!withTooltip" bottom transition="fade-transition">
    <template v-slot:activator="{ on }">
      <v-icon
        :color="primary ? 'primary' : 'secondarytext'"
        :size="size"
        v-on="on"
      >
        {{ getIcon }}
      </v-icon>
    </template>
    <span>{{ category.name }}</span>
  </v-tooltip>
</template>

<style scoped></style>

<script>
import {
  CATEGORY_DEFAULT,
  CATEGORY_VIDEO_GAMES,
  CATEGORY_BOARD_GAMES,
  CATEGORY_PARTY
} from "./const/categories";

export default {
  name: "CategoryIcon",
  computed: {
    getIcon() {
      if (this.category.alias in this.categoryIcons) {
        return this.categoryIcons[this.category.alias];
      }
      return "mdi-help-rhombus-outline";
    }
  },
  data() {
    return {
      categoryIcons: {
        [CATEGORY_DEFAULT]: "mdi-hexagon-multiple",
        [CATEGORY_VIDEO_GAMES]: "mdi-gamepad-variant",
        [CATEGORY_BOARD_GAMES]: "mdi-dice-multiple",
        [CATEGORY_PARTY]: "mdi-party-popper"
      }
    };
  },
  props: {
    category: Object,
    withTooltip: Boolean,
    size: Number,
    primary: Boolean
  }
};
</script>
