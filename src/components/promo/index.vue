<template>
  <v-main class="backgrnd">
    <div class="parallelogram"></div>

    <v-container class="fill-height" fluid>
      <v-row no-gutters justify="center">
        <v-img
          alt="Launchpad Logo"
          class="shrink mr-2"
          contain
          src="/images/logo.png"
          width="240"
        />
      </v-row>
      <v-carousel
        cycle
        height="90vh"
        hide-delimiters
        :show-arrows="false"
        interval="30000"
      >
        <v-carousel-item
          v-for="(project, i) in projects"
          :key="i"
          reverse-transition="fade-transition"
          transition="fade-transition"
        >
          <project-promo :project="project" />
        </v-carousel-item>
      </v-carousel>
    </v-container>
  </v-main>
</template>

<style scoped>
.backgrnd {
  height: 100vh;
  background-size: cover;
  background-position: right;
  background-repeat: no-repeat;
  background-image: url("/images/login_background.jpg");
}
.parallelogram {
  width: 115vh;
  height: 100%;
  -webkit-transform: skew(-20deg);
  -moz-transform: skew(-20deg);
  -o-transform: skew(-20deg);
  background: #fafafa;
  position: absolute;
  opacity: 0.95;
}
</style>

<script>
import ProjectPromo from "./ProjectPromo";

export default {
  name: "promo",
  components: {
    ProjectPromo
  },
  created() {
    this.getProjects();
    this.timer = setInterval(this.getProjects, 300000);
  },
  methods: {
    getProjects() {
      this.axios({ url: "/promo" })
        .then(resp => {
          this.projects = resp.data;
        })
        .catch(resp => {
          this.error = resp.data;
        });
    },
    cancelAutoUpdate() {
      clearInterval(this.timer);
    }
  },
  beforeDestroy() {
    this.cancelAutoUpdate();
  },
  data() {
    return {
      error: null,
      timer: null,
      projects: []
    };
  }
};
</script>
