<template>
  <div>
    <load-spinner v-if="loading"></load-spinner>
    <div class="md-layout project-grid" v-if="!loading">
      <div class="md-layout-item md-size-55 md-small-hide project-image">
        <img
          class="blur"
          v-bind:src="project.image_link"
          alt="project background"
        />
        <img class="img" v-bind:src="project.image_link" alt="project image" />
      </div>
      <div class="project-description md-layout-item">
        <md-content class="side-bar">
          <div class="md-layout md-alignment-top">
            <div class="md-layout-item md-size-100 status-area">
              <b>
                <status
                  class="status-text"
                  :sourceStatus="project.status"
                ></status>
              </b>
            </div>
            <div class="md-layout-item md-size-100 title-area">
              <span class="title-text">{{ project.title }}</span>
            </div>
            <div class="md-layout-item md-size-100 subtitle-area">
              <span class="subtitle-text">{{ project.subtitle }}</span>
            </div>
            <div class="md-layout-item md-size-100">
              <div class="md-layout">
                <div class="md-layout-item md-size-15">
                  <div>
                    <router-link v-bind:to="'/user/' + project.owner.id">
                      <md-avatar class="owner-avatar">
                        <img v-bind:src="project.owner.avatar" alt="Avatar" />
                        <md-tooltip md-direction="bottom"
                          >Профиль автора</md-tooltip
                        >
                      </md-avatar>
                    </router-link>
                  </div>
                </div>
                <div
                  class="md-layout md-layout-item md-size-80 md-alignment-center"
                >
                  <div class="md-layout-item md-size-100">
                    <span class="md-title"
                      >{{ project.owner.first_name }}
                      {{ project.owner.last_name }}
                    </span>
                  </div>
                  <div class="md-layout-item">
                    <span class="md-subheading">{{
                      project.owner.profile.project_count
                    }}</span>
                    <project-counter
                      class="md-subheading"
                      :count="project.owner.profile.project_count"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="md-layout-item md-size-100 progress-area">
              <div
                v-if="IS_PROJECT_TYPE_LOADED"
                class="md-layout md-alignment-bottom-right progress-area-top"
              >
                <div class="md-layout-item">
                  <goal-counter
                    class="md-headline"
                    :typeId="project.project_type"
                    :count="project.total"
                    mode="units"
                  />
                  <goal-counter
                    class="md-subheading"
                    :typeId="project.project_type"
                    :count="project.total"
                  />
                </div>
                <div v-if="isMoneyProject" class="md-layout-item right-area">
                  <span class="md-subheading">{{ donations.length }}</span>
                  <goal-counter
                    class="md-subheading"
                    :typeId="project.project_type"
                    :count="donations.length"
                    mode="members"
                  />
                </div>
              </div>
              <md-progress-bar
                class="md-accent"
                md-mode="determinate"
                v-bind:md-value="project.percent"
              ></md-progress-bar>
              <div class="md-layout progress-area-bottom">
                <div v-if="IS_PROJECT_TYPE_LOADED" class="md-layout-item">
                  <span class="md-subheading">{{ project.percent }}% </span>
                  <span class="md-subheading">из</span>
                  <goal-counter
                    v-if="isMoneyProject"
                    class="md-subheading"
                    :typeId="project.project_type"
                    :count="project.goal_amount"
                    mode="units"
                  />
                  <goal-counter
                    v-if="!isMoneyProject"
                    class="md-subheading"
                    :typeId="project.project_type"
                    :count="project.goal_people"
                    mode="units"
                  />
                  <span v-if="!isMoneyProject" class="md-subheading"
                    >людей</span
                  >
                </div>
                <div class="md-layout-item right-area">
                  <days-counter
                    class="md-subheading"
                    :endDate="project.release_date"
                    :withIcon="false"
                    :ended="project.status != search_status"
                  ></days-counter>
                </div>
              </div>
            </div>
            <div class="md-layout-item md-size-100">
              <button-set
                :status="project.status"
                :typeId="project.project_type"
              />
            </div>
          </div>
        </md-content>
      </div>
    </div>
    <div class="md-layout-item md-size-100 separator"></div>
    <div class="md-layout project-grid" v-if="!loading">
      <div class="md-layout-item project-tabs">
        <md-tabs md-alignment="fixed">
          <template slot="md-tab" slot-scope="{ tab }">
            <span class="md-subheading tab-head">{{ tab.label }} </span>
            <md-chip v-if="tab.data.badge">{{ tab.data.badge }} </md-chip>
          </template>
          <md-tab id="tab-desc" md-label="Описание">
            <md-content v-html="project.description" class="tab-content">
            </md-content>
          </md-tab>

          <md-tab
            id="tab-member"
            md-label="Участники"
            :md-template-data="{ badge: donations.length }"
          >
            <md-content class="tab-content">
              <donate-tab
                :donations="donations"
                :typeId="project.project_type"
              />
            </md-content>
          </md-tab>

          <md-tab
            id="tab-comments"
            md-label="Комментарии"
            :md-template-data="{ badge: '0' }"
            md-disabled
          >
            <md-content class="tab-content">
              Home Tab
            </md-content>
          </md-tab>
        </md-tabs>
      </div>
    </div>
    <md-speed-dial
      v-if="project && isOwner"
      class="md-top-right"
      md-direction="bottom"
    >
      <md-speed-dial-target class="md-primary">
        <md-icon>menu</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content>
        <md-button class="md-icon-button">
          <md-icon>publish</md-icon>
        </md-button>

        <md-button class="md-icon-button">
          <md-icon>edit</md-icon>
        </md-button>

        <md-button class="md-icon-button">
          <md-icon>delete</md-icon>
        </md-button>
      </md-speed-dial-content>
    </md-speed-dial>
  </div>
</template>

<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine";

.separator {
  border-top: 1px solid #ddd;
  margin-top: 40px;
}
.moved-button {
  position: absolute;
  transform: translate(+25%, -25%);
}
.project-grid {
  margin: auto;
  max-width: 1100px;
  padding-top: 30px;
}
.project-image {
  height: 400px;
  position: relative;
  width: 100%;
  overflow: hidden;
}
.project-description {
  margin-left: 40px;
  height: 400px;
}
.project-tabs {
  margin: auto;
  max-width: 800px;
}
.tab-content {
  margin-left: 20px;
  margin-right: 20px;
  min-height: 400px;
}
.blur {
  position: absolute;
  /* top: 50%;
  left: 50%; */
  transform: translate(-5%, -5%);
  display: block;
  width: 110%;
  height: 110%;
  max-width: 110%;
  max-height: 110%;
  object-fit: cover;
  filter: blur(5px);
}
.img {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}
.badge {
  top: 12px;
  right: 15px;
}
.side-bar {
  padding: 0px;
}
.status-text {
  font-size: 14px;
}
.title-text {
  font-size: 32px;
}
.subtitle-text {
  font-size: 20px;
  color: md-get-palette-color(gray, 600);
}
.status-area {
  padding-bottom: 10px;
}
.title-area {
  margin-top: 5px;
  max-height: 60px;
}
.subtitle-area {
  margin-top: 10px;
  margin-bottom: 14px;
  min-height: 70px;
  max-height: 70px;
}
.progress-area {
  padding-top: 15px;
  padding-bottom: 5px;
}
.progress-area-top {
  margin-bottom: 5px;
}
.progress-area-bottom {
  padding-top: 5px;
  padding-bottom: 10px;
}
.right-area {
  text-align: right;
}
.days-area {
  padding-top: 15px;
}
.md-progress-bar {
  height: 10px;
  border-radius: 5px;
}
.owner-avatar {
  width: 50px;
  height: 50px;
}
.goal-text {
  font-size: 24px;
}
.goal-descr-text {
  font-size: 20px;
}
.md-chip {
  margin-left: 10px;
  height: 20px;
  line-height: 20px;
}
.tab-head {
  margin-top: 3px;
  display: inline-block;
  vertical-align: middle;
}
.md-speed-dial {
  position: absolute;
  transform: translate(0%, 20%);
}
</style>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import LoadSpinner from "../lib/loading";
import Status from "../lib/status";
import DaysCounter from "../lib/daysCounter";
import GoalCounter from "../lib/goalCounter";
import ProjectCounter from "../lib/projectCounter";
import ButtonSet from "./ButtonSet";
import DonateTab from "./DonateTab";
import { STATUS_SEARCH } from "../lib/const/status";

export default {
  components: {
    LoadSpinner,
    Status,
    GoalCounter,
    ProjectCounter,
    ButtonSet,
    DonateTab,
    DaysCounter
  },
  name: "project",
  created() {
    this.project = this.getProject();
    this.donations = this.getDonations();
  },
  computed: {
    ...mapGetters(["IS_PROJECT_TYPE_LOADED", "PROJECT_TYPE", "PROFILE"]),
    type() {
      return this.PROJECT_TYPE[this.project.project_type];
    },
    isMoneyProject() {
      if (this.type.goal_by_people) {
        return false;
      }
      return true;
    },
    isOwner() {
      return this.PROFILE.id == this.project.owner.id;
    },
    loading() {
      return this.loadingProject || this.loadingDonation;
    }
  },
  methods: {
    getProject() {
      this.loadingProject = true;
      axios({ url: "/project/" + this.$route.params.id })
        .then(resp => {
          this.project = resp.data;
          this.loadingProject = false;
        })
        .catch(resp => {
          this.error = resp.data;
          this.loadingProject = false;
        });
    },
    getDonations() {
      this.loadingDonation = true;
      axios({ url: "/donation?project_id=" + this.$route.params.id })
        .then(resp => {
          this.donations = resp.data;
          this.loadingDonation = false;
        })
        .catch(resp => {
          this.error = resp.data;
          this.loadingDonation = false;
        });
    }
  },
  data() {
    return {
      loadingProject: true,
      loadingDonation: true,
      error: null,
      project: null,
      donations: [],
      count: 1,
      search_status: STATUS_SEARCH
    };
  }
};
</script>
