<template>
  <v-col xl="5" lg="7" md="9" sm="7" xs="12" class="my-3">
    <v-tabs v-model="tab" centered fixed-tabs>
      <v-tab href="#tab-about" class="grey lighten-5">
        <v-row align="center" justify="center">
          О проекте
        </v-row>
      </v-tab>

      <v-tab href="#tab-members" class="grey lighten-5">
        <v-row align="center" justify="center">
          Участники
          <v-chip class="ma-2" color="secondarytext" small outlined>
            {{ donations.length }}
          </v-chip>
        </v-row>
      </v-tab>

      <v-tab
        disabled
        href="#tab-comments"
        class="grey lighten-5 hidden-sm-and-down"
      >
        <v-row align="center" justify="center">
          Комментарии
          <v-chip class="ma-2" color="secondarytext" small outlined>
            Soon
          </v-chip>
        </v-row>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item value="tab-about">
        <v-card flat class="grey lighten-5">
          <progress-steps :status="status" :type="type" />
          <v-sheet tile class="ma-4" v-if="isMember && showInstructions">
            <v-expansion-panels>
              <v-expansion-panel tile>
                <v-expansion-panel-header>
                  <div class="primarytext--text subtitle-2 text-center">
                    Информация для участников проекта
                  </div>
                  <template v-slot:actions>
                    <v-icon color="secondary">mdi-chevron-down</v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div
                    v-html="instruction"
                    class="secondarytext--text caption text-center"
                  />
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-sheet>
          <v-card-text v-html="description" class="tab-content" />
        </v-card>
      </v-tab-item>
      <v-tab-item value="tab-members">
        <donate-tab :donations="donations" :type="type" />
      </v-tab-item>
    </v-tabs-items>
  </v-col>
</template>

<style scoped></style>

<script>
import DonateTab from "./DonateTab";
import ProgressSteps from "./ProgressSteps";
import { STATUS_HARVEST } from "../lib/const/status";

export default {
  components: {
    ProgressSteps,
    DonateTab
  },
  name: "Tabs",
  computed: {
    showInstructions() {
      return this.status === STATUS_HARVEST;
    }
  },
  data() {
    return {
      tab: null
    };
  },
  props: {
    description: String,
    instruction: String,
    isMember: Boolean,
    donations: Array,
    status: String,
    type: Object
  }
};
</script>
