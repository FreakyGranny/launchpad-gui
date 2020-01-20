<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      :elevation="hover ? 8 : 2"
      min-width="250"
      width="88%"
      height="500"
      :to="{ name: 'Project', params: { id: project.id } }"
      tile
    >
      <v-img height="250px" width="100%" v-bind:src="project.image_link">
        <v-row no-gutters justify="center">
          <v-sheet
            class="pa-4 error"
            style="margin-top: 99px;"
            v-if="markDraft"
          >
            <div class="white--text body-2 font-weight-bold">
              НЕ ОПУБЛИКОВАН
            </div>
          </v-sheet>
        </v-row>
      </v-img>
      <v-card-text class="pt-2 px-4">
        <v-row class="py-1" no-gutters>
          <v-col cols="10">
            <status
              class="caption font-weight-bold"
              :sourceStatus="project.status"
            />
          </v-col>
          <v-col class="text-end" cols="2">
            <type-icon
              :size="20"
              :type="project.project_type"
              :withTooltip="true"
            />
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <div class="primarytext--text subtitle-1 font-weight-bold pt-2 pb-1">
          {{
            project.title.length > 22
              ? project.title.slice(0, 22) + "..."
              : project.title
          }}
        </div>
        <div class="secondarytext--text body-2 subtitle-area pt-1 pb-1">
          {{
            project.subtitle.length > 50
              ? project.subtitle.slice(0, 50) + "..."
              : project.subtitle
          }}
        </div>
        <v-row class="pt-2 pb-2" no-gutters>
          <router-link
            :to="{
              path: 'explore',
              query: { category: project.category.id.toString() }
            }"
          >
            <v-hover v-slot:default="{ hover }">
              <div
                :class="hover ? 'primary--text' : 'primarytext--text'"
                class="caption font-weight-bold"
              >
                {{ project.category.name.toUpperCase() }}
              </div>
            </v-hover>
          </router-link>
        </v-row>
        <v-row no-gutters>
          <v-col cols="auto">
            <goal-counter
              class="primarytext--text font-weight-bold"
              :type="project.project_type"
              :count="project.total"
              mode="units"
            />
          </v-col>
          <v-col class="pl-1">
            <goal-counter
              class="primarytext--text"
              :type="project.project_type"
              :count="project.total"
            />
          </v-col>
          <v-col cols="3" class="text-end">
            <div class="primarytext--text body-2">{{ project.percent }}%</div>
          </v-col>
        </v-row>
        <v-progress-linear
          color="accent"
          height="8px"
          rounded
          v-bind:value="project.percent"
        />
        <div class="pt-5">
          <v-row align="baseline" no-gutters>
            <days-counter
              class="body-2"
              :endDate="project.release_date"
              :withIcon="true"
              :ended="showDaysCounter"
            />
            <datetime
              v-if="
                !project.project_type.goal_by_amount &&
                  project.event_date &&
                  !isFailed
              "
              :compact="true"
              :datetime="project.event_date"
            />
          </v-row>
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<style scoped>
* {
  text-decoration: none !important;
}
.subtitle-area {
  height: 50px;
}
</style>

<script>
import Status from "../lib/status";
import DaysCounter from "../lib/daysCounter";
import Datetime from "../lib/datetime";
import GoalCounter from "../lib/goalCounter";
import TypeIcon from "../lib/typeIcon";
import { STATUS_SEARCH, STATUS_DRAFT, STATUS_FAIL } from "../lib/const/status";

export default {
  components: {
    Status,
    DaysCounter,
    Datetime,
    GoalCounter,
    TypeIcon
  },
  computed: {
    markDraft() {
      return this.project.status == STATUS_DRAFT;
    },
    isFailed() {
      return this.project.status == STATUS_FAIL;
    },
    showDaysCounter() {
      switch (this.project.status) {
        case STATUS_DRAFT:
        case STATUS_SEARCH:
          return false;
        default:
          return true;
      }
    }
  },
  name: "ProjectCard",
  props: {
    project: Object
  }
};
</script>
