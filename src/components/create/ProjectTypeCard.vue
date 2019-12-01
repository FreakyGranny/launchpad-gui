<template>
  <!-- badge for new project types -->
  <v-badge class="pa-2" color="grey" overlap v-model="badgeShow">
    <template v-slot:badge>
      <div>Comming soon</div>
    </template>

    <v-hover v-slot:default="{ hover }">
      <v-card
        :elevation="hover ? 8 : 2"
        width="280"
        height="400"
        tile
        @click="handleClick"
        :disabled="type.id > 2"
      >
        <!-- disabled new project types for a while -->
        <v-card-text class="pt-2 px-4">
          <v-row class="mt-2" justify="center" no-gutters>
            <type-icon :size="75" :type="type" :withTooltip="false" />
          </v-row>
          <v-row class="mb-2" justify="center" no-gutters>
            <div class="primarytext--text subtitle-1 font-weight-bold">
              {{ name }}
            </div>
          </v-row>
          <v-divider></v-divider>
          <v-row class="mt-2" justify="center" no-gutters>
            <div class="secondarytext--text caption">
              <ul class="list-options">
                <li
                  class="py-1"
                  v-for="(option, index) in options"
                  :key="index"
                >
                  <span class="options-text">{{ option }}</span>
                </li>
              </ul>
            </div>
          </v-row>
        </v-card-text>
      </v-card>
    </v-hover>
  </v-badge>
</template>

<style scoped></style>

<script>
import TypeIcon from "../lib/typeIcon";

export default {
  name: "ProjectTypeCard",
  components: {
    TypeIcon
  },
  computed: {
    badgeShow() {
      return this.type.id > 2;
    }
  },
  methods: {
    handleClick() {
      this.$emit("click");
    }
  },
  props: {
    type: Object,
    name: String,
    options: Array
  }
};
</script>
