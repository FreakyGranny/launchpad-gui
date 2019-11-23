<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      :elevation="hover ? 12 : 2"
      width="250"
      height="500"
      :to="'project/' + project.id"
      :color="markDraft ? 'lightprimary' : 'white'"
      tile
    >
      <v-img height="250px" v-bind:src="project.image_link" />
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
              :typeId="project.project_type"
              :withTooltip="true"
            />
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <div class="primarytext--text subtitle-1 font-weight-bold pt-2 pb-1">
          {{
            project.title.length > 25
              ? project.title.slice(0, 25) + "..."
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
        <v-row class="pt-2 pb-2" no-gutters v-if="IS_CATEGORY_LOADED">
          <router-link
            :to="{
              path: 'explore',
              query: { category: category.id.toString() }
            }"
          >
            <v-hover v-slot:default="{ hover }">
              <div
                :class="hover ? 'primary--text' : 'primarytext--text'"
                class="caption font-weight-bold"
              >
                {{ category.name.toUpperCase() }}
              </div>
            </v-hover>
          </router-link>
        </v-row>
        <v-row no-gutters>
          <v-col cols="auto">
            <goal-counter
              class="primarytext--text font-weight-bold"
              :typeId="project.project_type"
              :count="project.total"
              mode="units"
            />
          </v-col>
          <v-col class="pl-1">
            <goal-counter
              class="primarytext--text"
              :typeId="project.project_type"
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
          <days-counter
            class="body-2"
            :endDate="project.release_date"
            :withIcon="true"
            :ended="showDaysCounter"
          />
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
import { mapGetters } from "vuex";
import Status from "../lib/status";
import DaysCounter from "../lib/daysCounter";
import GoalCounter from "../lib/goalCounter";
import TypeIcon from "../lib/typeIcon";
import { STATUS_SEARCH, STATUS_DRAFT } from "../lib/const/status";

export default {
  components: {
    Status,
    DaysCounter,
    GoalCounter,
    TypeIcon
  },
  computed: {
    ...mapGetters(["IS_CATEGORY_LOADED"]),
    markDraft() {
      return this.project.status == STATUS_DRAFT;
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
    project: Object,
    category: Object
  }
};
</script>
