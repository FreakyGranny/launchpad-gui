<template>
  <div class="md-layout-item project-card">
    <div @click="onClickCard()">
      <md-card md-with-hover>
        <md-ripple>
          <md-card-media>
            <img class="img" v-bind:src="project.image_link" alt="People" />
          </md-card-media>
          <md-card-content>
            <div class="md-layout md-alignment-center">
              <div class="md-layout-item md-size-90 status-area">
                <b>
                  <status
                    class="status-text"
                    :sourceStatus="project.status"
                  ></status>
                </b>
              </div>
              <div class="md-layout-item md-size-10 status-area right-text">
                <type-icon :typeId="project.project_type"></type-icon>
              </div>
              <div class="md-layout-item md-size-100">
                <md-divider></md-divider>
              </div>
              <div class="md-layout-item md-size-100 title-area">
                <b>
                  <span class="title-text">{{
                    project.title.length > 25
                      ? project.title.slice(0, 25) + "..."
                      : project.title
                  }}</span>
                </b>
              </div>
              <div class="md-layout-item md-size-100 subtitle-area">
                <span class="subtitle-text">{{
                  project.subtitle.length > 50
                    ? project.subtitle.slice(0, 50) + "..."
                    : project.subtitle
                }}</span>
              </div>
              <div
                v-if="IS_CATEGORY_LOADED"
                class="md-layout-item md-size-100 category-area"
              >
                <b>
                  <span class="category-text">{{
                    category.name.toUpperCase()
                  }}</span>
                </b>
              </div>
              <div class="md-layout-item md-size-100">
                <div class="md-layout">
                  <div class="md-layout-item">
                    <goal-counter
                      class="goal-count-text"
                      :typeId="project.project_type"
                      :count="project.total"
                      mode="units"
                    />
                    <goal-counter
                      class="goal-units-text"
                      :typeId="project.project_type"
                      :count="project.total"
                    />
                  </div>
                  <div class="md-layout-item right-text">
                    <span class="md-body-1">{{ project.percent }}%</span>
                  </div>
                </div>
                <md-progress-bar
                  class="md-accent"
                  md-mode="determinate"
                  v-bind:md-value="project.percent"
                ></md-progress-bar>
              </div>
              <div class="md-layout-item md-size-100 days-area">
                <days-counter
                  class="md-body-1 days-text-centred"
                  :endDate="project.release_date"
                  :withIcon="true"
                  :ended="project.status != 'search'"
                ></days-counter>
              </div>
            </div>
          </md-card-content>
        </md-ripple>
      </md-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine";

.project-card {
  padding: 20px;
  flex: none;
}
.img {
  object-fit: cover;
  width: 250px;
  height: 250px;
}
.md-card {
  object-fit: cover;
  width: 250px;
  height: 500px;
}
.md-card-content {
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 15px;
}
.md-progress-bar {
  height: 8px;
  border-radius: 4px;
}
.status-text {
  font-size: 12px;
}
.title-text {
  font-size: 15px;
}
.subtitle-text {
  font-size: 13px;
  color: md-get-palette-color(gray, 600);
}
.category-text {
  font-size: 12px;
  color: md-get-palette-color(deeppurple, 600);
}
.status-area {
  padding-bottom: 5px;
}
.title-area {
  padding-top: 10px;
  padding-bottom: 5px;
}
.subtitle-area {
  padding-top: 5px;
  padding-bottom: 5px;
  height: 50px;
}
.category-area {
  padding-top: 7px;
  padding-bottom: 7px;
}
.right-text {
  text-align: right;
}
.days-area {
  padding-top: 20px;
}
.goal-count-text {
  font-size: 14px;
  font-weight: 800;
}
.goal-descr-text {
  padding-left: 5px;
  font-size: 12px;
}
.md-icon {
  width: 20px;
  min-width: 20px;
  height: 20px;
  font-size: 20px !important;
}
</style>
<script>
import { mapGetters } from "vuex";
import Status from "../lib/status";
import DaysCounter from "../lib/daysCounter";
import GoalCounter from "../lib/goalCounter";
import TypeIcon from "../lib/typeIcon";
import { STATUS_SEARCH } from "../lib/const/status";

export default {
  components: {
    Status,
    DaysCounter,
    GoalCounter,
    TypeIcon
  },
  data() {
    return {
      search_status: STATUS_SEARCH
    };
  },
  computed: {
    ...mapGetters(["IS_CATEGORY_LOADED"])
  },
  methods: {
    onClickCard() {
      this.$router.push({ name: "Project", params: { id: this.project.id } });
    }
  },
  name: "ProjectCard",
  props: {
    project: Object,
    category: Object
  }
};
</script>
