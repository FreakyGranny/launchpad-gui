<template>
  <div>
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
            :params="project"
          />
        </div>
        <div class="md-layout md-alignment-center">
          <load-spinner v-if="loading"></load-spinner>
          <div class="spacing" v-if="!loading">
            <md-button
              class="md-raised md-primary"
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
.explore-grid {
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

export default {
  components: {
    ProjectCard,
    LoadSpinner
  },
  name: "home",
  created() {
    this.projects = this.getProjects();
  },
  computed: {
    isFinalPage() {
      if (typeof this.projects === "undefined") {
        return false;
      }
      return this.totalProjects == this.projects.length;
    }
  },
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
