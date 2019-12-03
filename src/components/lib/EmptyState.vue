<template>
  <v-container fluid>
    <v-row class="nf-area" justify="center" align="center" no-gutters>
      <v-col cols="12">
        <v-row no-gutters justify="center">
          <v-img
            alt="empty results"
            class="shrink mt-12"
            contain
            src="/images/box.svg"
            width="240"
            v-if="reason == 'not_found'"
          />
          <v-img
            alt="empty results"
            class="shrink ml-8"
            contain
            src="/images/file.svg"
            width="160"
            v-if="reason == 'empty_filter'"
          />
        </v-row>
        <v-row no-gutters justify="center">
          <div
            class="my-4 primarytext--text headline font-weight-bold text-center"
          >
            {{ label }}
          </div>
        </v-row>
        <v-row no-gutters justify="center">
          <div class="secondarytext--text text-center">
            {{ description }}
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.nf-area {
  height: 50vh;
}
</style>

<script>
export default {
  name: "EmptyState",
  data() {
    return {};
  },
  props: {
    label: String,
    description: String,
    reason: String
  }
};
</script>
