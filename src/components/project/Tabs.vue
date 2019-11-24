<template>
  <v-col xl="5" lg="7" md="9" sm="7" xs="12" class="my-3">
    <v-tabs v-model="tab" centered grow>
      <v-tab href="#tab-about">
        <v-row align="center" justify="center">
          О проекте
        </v-row>
      </v-tab>

      <v-tab href="#tab-members">
        <v-row align="center" justify="center">
          Участники
          <v-chip class="ma-2" color="secondarytext" small outlined>
            {{ donations.length }}
          </v-chip>
        </v-row>
      </v-tab>

      <v-tab disabled href="#tab-comments" class="hidden-sm-and-down">
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
        <v-card flat>
          <progress-steps :status="status" :type="type" />
          <v-card
            tile
            color="lightprimary"
            class="ma-4"
            min-width="265"
            v-if="isMember && showInstructions"
          >
            <v-card-text>
              <div class="mb-2 primarytext--text subtitle-2 text-center">
                Информация для участников проекта
              </div>
              <div
                v-html="instruction"
                class="secondarytext--text caption text-center"
              />
            </v-card-text>
          </v-card>
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
