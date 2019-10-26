<template>
  <div>
    <div class="header">
      <span class="white-text">Все проекты</span>
    </div>
    <div class="md-layout explore-grid">
      <div
        class="md-layout-item md-large-size-25 md-medium-size-30 md-small-hide explore-filter"
      >
        <md-list>
          <md-list-item>Plain Text</md-list-item>
          <md-list-item>Button</md-list-item>
          <md-list-item href="https://google.com" target="_blank"
            >Link</md-list-item
          >
          <md-list-item to="/components/list" exact
            >Router <code>/</code></md-list-item
          >
          <md-list-item to="/components/list/router"
            >Router <code>/router/**</code></md-list-item
          >
        </md-list>
      </div>
      <div
        class="md-layout-item md-large-size-75 md-medium-size-70 md-small-size-100 md-xsmall-hide"
      >
        <div class="md-layout">
          <project-card
            v-for="(project, index) in projects"
            :key="index"
            :project="project"
            :type="projectTypes[project.project_type]"
          />
        </div>
        <div class="md-layout md-alignment-center">
          <load-spinner v-if="loading"></load-spinner>
          <div class="spacing" v-if="!loading">
            <md-button
              class="md-raised md-primary custom-button"
              v-bind:disabled="isFinalPage"
              v-on:click="getProjects"
            >
              загрузить еще
            </md-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.white-text {
  font-size: 42px;
  color: aliceblue;
}
.header {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("/images/campaign.jpg");
  height: 150px;
  text-align: center;
  line-height: 150px;
}
.explore-grid {
  padding-top: 30px;
  margin: auto;
  max-width: 1200px;
}
.explore-filter {
  padding-right: 50px;
}
.spacing {
  margin-top: 100px;
  margin-bottom: 100px;
}
</style>

<script>
import ProjectCard from "./ProjectCard.vue";
import LoadSpinner from "../lib/loading";
import axios from "axios";
import { mapState } from "vuex";
import { PROJECT_TYPE_REQUEST } from "../../store/actions/projectType";

export default {
  components: {
    ProjectCard,
    LoadSpinner
  },
  name: "home",
  created() {
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch(PROJECT_TYPE_REQUEST).then(() => {
        this.projects = this.getProjects();
      });
    }
  },
  computed: mapState({
    projectTypes: state => state.projectType.items,
    isFinalPage() {
      if (typeof this.projects === "undefined") {
        return false;
      }
      return this.totalProjects == this.projects.length;
    }
  }),
  methods: {
    getProjects() {
      this.loading = true;
      let projectList = this.projects ? this.projects : [];
      let pUrl = "/project?page_size=9";
      if (this.nextPage) {
        pUrl += "&page=" + this.nextPage;
      }
      axios({ url: pUrl })
        .then(resp => {
          for (let project of resp.data.results) {
            projectList.push(project);
          }
          this.projects = projectList;
          this.nextPage = resp.data.next;
          this.totalProjects = resp.data.total;
          this.loading = false;
        })
        .catch(resp => {
          this.error = resp.data;
          this.loading = false;
        });
    },
    getProjectTypes() {
      this.loadingTypes = true;
      axios({ url: "/project_type" })
        .then(resp => {
          this.projectTypes = resp.data;
          this.loadingTypes = false;
        })
        .catch(resp => {
          this.error = resp.data;
          this.loadingTypes = false;
        });
    }
  },
  data() {
    return {
      loading: true,
      error: null,
      nextPage: null,
      totalProjects: 0,
      projects: []
    };
  }
};
</script>
