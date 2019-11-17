<template>
  <div>
    <load-spinner :overlay="!IS_PROJECT_TYPE_LOADED || loading"></load-spinner>
    <v-container fluid v-if="!!project">
      <v-row justify="center" no-gutters>
        <v-col xl="7" lg="9" md="11" sm="9" xs="12" class="my-3">
          <v-row justify="center" no-gutters>
            <project-picture :imageSrc="project.image_link" />
            <v-col xl="5" lg="5" md="5" sm="12">
              <v-row class="mx-4 mt-3 mb-0">
                <status
                  class="subtitle-2 font-weight-bold"
                  :sourceStatus="project.status"
                />
              </v-row>
              <v-row class="mx-4 mt-1">
                <div class="primarytext--text display-1">
                  {{ project.title }}
                </div>
              </v-row>
              <v-row class="ma-4 subtitle-area">
                <div class="secondarytext--text title font-weight-regular">
                  {{ project.subtitle }}
                </div>
              </v-row>

              <v-row class="mx-4" align="center">
                <v-avatar size="50">
                  <img
                    v-bind:src="project.owner.avatar"
                    onerror="this.onerror=null;this.src='/images/avatar.png';"
                    alt="Author avatar"
                  />
                </v-avatar>
                <v-col cols="9" class="pa-0">
                  <v-row class="mx-4">
                    <!-- hide author profile for a while -->
                    <!-- <router-link v-bind:to="'/user/' + project.owner.id"> -->
                    <div class="primarytext--text title font-weight-regular">
                      {{ project.owner.first_name }}
                      {{ project.owner.last_name }}
                    </div>
                    <!-- </router-link> -->
                  </v-row>
                  <v-row class="mx-4">
                    <div class="primarytext--text body-1 font-weight-medium">
                      {{ project.owner.profile.project_count }}
                    </div>
                    <project-counter
                      class="primarytext--text body-1 ml-1"
                      :count="project.owner.profile.project_count"
                    />
                  </v-row>
                </v-col>
              </v-row>

              <v-row class="mx-4 mt-2" no-gutters v-if="IS_PROJECT_TYPE_LOADED">
                <v-col cols="6" class="pa-0">
                  <v-row align="baseline" no-gutters>
                    <goal-counter
                      class="primarytext--text headline"
                      :typeId="project.project_type"
                      :count="project.total"
                      :animate="true"
                      mode="units"
                    />
                    <goal-counter
                      class="primarytext--text body-1 pl-1"
                      :typeId="project.project_type"
                      :count="project.total"
                    />
                  </v-row>
                </v-col>
                <v-col cols="6" class="pa-0" v-if="isMoneyProject">
                  <v-row justify="end" align="baseline" no-gutters>
                    <div class="primarytext--text headline">
                      {{ donations.length }}
                    </div>
                    <goal-counter
                      class="primarytext--text body-1 pl-1"
                      :typeId="project.project_type"
                      :count="donations.length"
                      mode="members"
                    />
                  </v-row>
                </v-col>
              </v-row>

              <v-row class="mx-4 my-1">
                <v-progress-linear
                  color="accent"
                  height="10px"
                  rounded
                  v-bind:value="project.percent"
                />
              </v-row>

              <v-row class="mx-4 mb-4" no-gutters v-if="IS_PROJECT_TYPE_LOADED">
                <v-col cols="6" class="pa-0">
                  <v-row align="baseline" no-gutters>
                    <div class="primarytext--text body-1">
                      {{ project.percent }}% из
                    </div>
                    <goal-counter
                      v-if="isMoneyProject"
                      class="primarytext--text body-1 pl-1"
                      :typeId="project.project_type"
                      :count="project.goal_amount"
                      mode="units"
                    />
                    <goal-counter
                      v-if="!isMoneyProject"
                      class="primarytext--text body-1 px-1"
                      :typeId="project.project_type"
                      :count="project.goal_people"
                      mode="units"
                    />
                    <div
                      class="primarytext--text body-1"
                      v-if="!isMoneyProject"
                    >
                      людей
                    </div>
                  </v-row>
                </v-col>
                <v-col cols="6" class="pa-0" v-if="isMoneyProject">
                  <days-counter
                    class="body-1"
                    :endDate="project.release_date"
                    :withIcon="false"
                    :ended="project.status != search_status"
                    :alignBottom="true"
                    :justifyEnd="true"
                  />
                </v-col>
              </v-row>
              <v-row class="ma-4">
                <button-set
                  :status="project.status"
                  :type="PROJECT_TYPE[project.project_type]"
                  :donation="currentDonation"
                  @reload="reloadData()"
                />
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row justify="center" no-gutters v-if="!loading" class="tabs-area">
        <tabs
          :donations="donations"
          :description="project.description"
          :typeId="project.project_type"
        />
      </v-row>
    </v-container>
  </div>
  <!--
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
  </div> -->
</template>

<style lang="scss" scoped>
.subtitle-area {
  height: 70px;
}
.tabs-area {
  min-height: 300px;
}
</style>

<script>
import { mapGetters } from "vuex";
import LoadSpinner from "../lib/loading";
import Status from "../lib/status";
import DaysCounter from "../lib/daysCounter";
import GoalCounter from "../lib/goalCounter";
import ProjectCounter from "../lib/projectCounter";
import ButtonSet from "./ButtonSet";
import ProjectPicture from "./ProjectPicture";
import Tabs from "./Tabs";
import { STATUS_SEARCH } from "../lib/const/status";

export default {
  components: {
    LoadSpinner,
    Status,
    GoalCounter,
    ProjectCounter,
    ButtonSet,
    ProjectPicture,
    Tabs,
    DaysCounter
  },
  name: "project",
  created() {
    this.getProject(true);
    this.getDonations(true);
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
    },
    currentDonation() {
      for (let donation of this.donations) {
        if (donation.user.id === this.PROFILE.id) {
          return donation;
        }
      }
      return null;
    }
  },
  methods: {
    reloadData() {
      this.getProject(false);
      this.getDonations(false);
    },
    getProject(setLoading) {
      if (setLoading) {
        this.loadingProject = true;
      }
      this.axios({ url: "/project/" + this.$route.params.id })
        .then(resp => {
          this.project = resp.data;
        })
        .catch(resp => {
          this.error = resp.data;
        });
      if (setLoading) {
        this.loadingProject = false;
      }
    },
    getDonations(setLoading) {
      if (setLoading) {
        this.loadingDonation = true;
      }
      this.axios({ url: "/donation?project_id=" + this.$route.params.id })
        .then(resp => {
          this.donations = resp.data;
        })
        .catch(resp => {
          this.error = resp.data;
        });
      if (setLoading) {
        this.loadingDonation = false;
      }
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
