<template>
  <v-col xl="5" lg="7" md="9" sm="7" xs="12" class="my-3">
    <v-tabs v-model="tab" background-color="grey lighten-5" class="mx-4">
      <v-tab href="#tab-about">
        <v-row align="center" justify="center" :class="tabClass">
          О проекте
        </v-row>
      </v-tab>

      <v-tab href="#tab-members">
        <v-row align="center" justify="center" :class="tabClass">
          Участники
          <v-chip class="ma-2" color="secondarytext" small outlined>
            {{ donations.length }}
          </v-chip>
        </v-row>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item value="tab-about">
        <v-card flat class="grey lighten-5">
          <progress-steps :status="status" :type="type" />
          <v-sheet tile class="ma-4" v-if="isMember && showInstructions">
            <v-expansion-panels v-model="expPanel" :multiple="isEditable">
              <v-expansion-panel tile class="bordered">
                <v-expansion-panel-header>
                  <div class="pl-6 primarytext--text body-2 text-center">
                    Информация для участников проекта
                  </div>
                  <template v-slot:actions>
                    <v-icon color="secondary">mdi-chevron-down</v-icon>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <edit-popup
                    :editable="isEditable"
                    fieldType="instructions"
                    fieldName="instructions"
                    :type="type"
                    :value="instruction"
                    @reload="$emit('reload')"
                  >
                    <div
                      v-html="instruction"
                      class="secondarytext--text caption"
                    />
                  </edit-popup>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-sheet>
          <v-card outlined tile class="ma-4" min-width="265">
            <v-card-subtitle class="pb-0">
              <div class="accent--text subtitle-2 text-center">
                ОПИСАНИЕ
              </div>
            </v-card-subtitle>
            <v-card-text class="px-6 pt-2">
              <edit-popup
                :editable="isEditable"
                fieldType="description"
                fieldName="description"
                :value="description"
                @reload="$emit('reload')"
                @error="passError"
              >
                <div class="secondarytext--text body-2" v-html="description" />
              </edit-popup>
            </v-card-text>
          </v-card>
        </v-card>
      </v-tab-item>
      <v-tab-item value="tab-members">
        <donate-tab :donations="donations" :type="type" />
      </v-tab-item>
    </v-tabs-items>
  </v-col>
</template>

<style scoped>
.bordered {
  border: 1px solid #e0e0e0;
}
</style>

<script>
import DonateTab from "./DonateTab";
import EditPopup from "./EditPopup";
import ProgressSteps from "./ProgressSteps";
import { STATUS_HARVEST, STATUS_DRAFT } from "../lib/const/status";

export default {
  components: {
    ProgressSteps,
    EditPopup,
    DonateTab
  },
  name: "Tabs",
  computed: {
    showInstructions() {
      return this.status === STATUS_HARVEST || this.status === STATUS_DRAFT;
    },
    isEditable() {
      return this.status === STATUS_DRAFT;
    },
    tabClass() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "px-3";
        default:
          return "px-10";
      }
    }
  },
  methods: {
    passError(data) {
      this.$emit("error", data);
    }
  },
  data() {
    return {
      expPanel: [0],
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
