<template>
  <div>
    <load-spinner v-if="!IS_PROFILE_LOADED" />
    <user-card :user="PROFILE" v-if="IS_PROFILE_LOADED" />
    <div
      v-if="IS_PROFILE_LOADED"
      class="md-layout projects-grid md-alignment-top-center"
    >
      <md-tabs md-alignment="fixed">
        <template slot="md-tab" slot-scope="{ tab }">
          <span class="md-subheading tab-head">{{ tab.label }} </span>
          <md-chip v-if="tab.data.badge">{{ tab.data.badge }} </md-chip>
        </template>

        <md-tab
          id="tab-owned"
          md-label="Я автор"
          :md-template-data="{ badge: projectsOwned.length }"
        >
          <md-content class="tab-content">
            <load-spinner v-if="loading" />
            <div class="md-layout md-alignment-top-center">
              <div class="spacing" v-if="!loading">
                <md-empty-state
                  md-icon="help_outline"
                  md-label="Проекты не найдены"
                  md-description="Вы пока не являетесь автором ни одного проекта."
                  v-if="projectsOwned.length == 0"
                />
              </div>
              <project-card
                v-for="(project, index) in projectsOwned"
                :key="index"
                :project="project"
                :category="CATEGORY[project.category[0]]"
              />
            </div>
          </md-content>
        </md-tab>

        <md-tab
          id="tab-member"
          md-label="Я участник"
          :md-template-data="{ badge: projectsContributed.length }"
        >
          <md-content class="tab-content">
            <div class="md-layout md-alignment-top-center">
              <div class="spacing" v-if="!loading">
                <md-empty-state
                  md-icon="help_outline"
                  md-label="Проекты не найдены"
                  md-description="Вы пока не поддержали ни один проект."
                  v-if="projectsContributed.length == 0"
                />
              </div>
              <project-card
                v-for="(project, index) in projectsContributed"
                :key="index"
                :project="project"
                :category="CATEGORY[project.category[0]]"
              />
            </div>
          </md-content>
        </md-tab>

        <md-tab
          id="tab-likes"
          md-label="Мне понравилось"
          :md-template-data="{ badge: '0' }"
          md-disabled
        >
          <md-content class="tab-content"> </md-content>
        </md-tab>
      </md-tabs>
    </div>
  </div>
</template>

<style scoped>
.header-account {
  background-image: url("/images/user.jpg");
  height: 300px;
  line-height: 300px;
}
.projects-grid {
  padding-top: 30px;
  margin: auto;
  max-width: 1500px;
}
.md-chip {
  margin-left: 10px;
  height: 20px;
  line-height: 20px;
}
</style>

<script>
import ProjectCard from "../lib/ProjectCard";
import UserCard from "../lib/UserCard";
import LoadSpinner from "../lib/loading";
import axios from "axios";
import { mapGetters } from "vuex";

export const FILTER_OWNED = "owned";
export const FILTER_CONTRIBUTED = "contributed";

export default {
  components: {
    ProjectCard,
    UserCard,
    LoadSpinner
  },
  name: "account",
  created: async function() {
    this.getProjects(FILTER_OWNED);
    this.getProjects(FILTER_CONTRIBUTED);
  },
  computed: {
    ...mapGetters([
      "STORAGE_STATUS",
      "IS_CATEGORY_LOADED",
      "IS_PROJECT_TYPE_LOADED",
      "IS_PROFILE_LOADED",
      "CATEGORY",
      "PROJECT_TYPE",
      "PROFILE"
    ])
  },
  methods: {
    buildProjectUrl(filter) {
      let pUrl = "/project?page_size=20";
      if (filter === FILTER_OWNED) {
        pUrl += "&filter=" + FILTER_OWNED;
      }
      if (filter === FILTER_CONTRIBUTED) {
        pUrl += "&filter=" + FILTER_CONTRIBUTED;
      }
      return pUrl;
    },
    getProjects(filter) {
      this.loading = true;
      axios({ url: this.buildProjectUrl(filter) })
        .then(resp => {
          this.loading = false;
          if (filter == FILTER_OWNED) {
            this.projectsOwned = resp.data.results;
            // window.console.log(resp);
          }
          if (filter == FILTER_CONTRIBUTED) {
            this.projectsContributed = resp.data.results;
          }
        })
        .catch(resp => {
          this.error = resp.data;
          this.loading = false;
        });
    }
  },
  data() {
    return {
      loading: true,
      error: null,
      projectsOwned: [],
      projectsContributed: []
    };
  }
};
</script>
