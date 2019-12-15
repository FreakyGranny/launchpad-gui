<template>
  <v-container fluid class="my-auto" :style="{ minheight: '200px' }">
    <v-row :style="mainStyle" justify="center" align="center" no-gutters>
      <v-col cols="12">
        <v-row no-gutters justify="center">
          <v-icon :size="100" color="secondarytext">
            {{ icon }}
          </v-icon>
        </v-row>
        <v-row no-gutters justify="center">
          <div
            class="mb-1 primarytext--text title font-weight-bold text-center"
          >
            {{ label }}
          </div>
        </v-row>
        <v-row no-gutters justify="center">
          <div class="secondarytext--text body-2 text-center">
            {{ description }}
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>

<script>
export default {
  name: "EmptyState",
  computed: {
    mainStyle() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return { height: "calc(" + this.heightPercent + "vh)" };
        default:
          return { height: "calc(" + this.heightPercent + "vh - 140px)" };
      }
    }
  },
  data() {
    return {};
  },
  props: {
    label: String,
    description: String,
    heightPercent: Number,
    icon: String
  }
};
</script>
