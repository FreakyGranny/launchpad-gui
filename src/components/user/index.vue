<template>
  <div>
    <load-spinner :overlay="loadingUser"></load-spinner>
    <v-parallax
      height="200"
      src="/images/user.jpg"
      class="hidden-sm-and-down"
    />

    <v-container class="pa-0" :style="userCardStyle">
      <v-row justify="center" no-gutters>
        <v-col xl="6" lg="8" md="10" sm="12">
          <v-card
            color="white"
            height="250px"
            elevation="0"
            v-if="loadingUser"
          />
          <user-card v-if="!loadingUser && userData" :user="userData" />
        </v-col>
      </v-row>
      <v-row justify="center" no-gutters>
        <div class="mt-10 mb-2 secondary--text subtitle-2 font-weight-medium">
          ПРОЕКТЫ
        </div>
      </v-row>

      <v-divider />
      <v-progress-linear
        :active="loadingProjects"
        :indeterminate="loadingProjects"
        height="1"
        color="secondary"
      />

      <v-row justify="center" no-gutters>
        <v-sheet :max-width="slideAreaWidth" class="grey lighten-5">
          <empty-state
            :heightPercent="40"
            icon="mdi-space-invaders"
            label="Проекты не найдены"
            description="Пользователь пока что не является автором ни одного проекта."
            v-if="!loadingProjects && projects.length == 0"
          />
          <v-slide-group class="pa-4" v-if="projects">
            <v-slide-item v-for="project in projects" :key="project.id">
              <v-sheet width="250" class="mx-4 mt-6 mb-8">
                <project-card :project="project" />
              </v-sheet>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped></style>

<script>
import UserCard from "../lib/UserCard";
import ProjectCard from "../lib/ProjectCard";
import LoadSpinner from "../lib/loading";
import EmptyState from "../lib/EmptyState";

export default {
  components: {
    UserCard,
    ProjectCard,
    EmptyState,
    LoadSpinner
  },
  name: "user",
  created() {
    this.getUser();
    this.getProjects();
  },
  computed: {
    userCardStyle() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return { marginTop: "4px" };
        case "sm":
          return { marginTop: "0px" };
        default:
          return { marginTop: "-125px" };
      }
    },
    slideAreaWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "100%";
        default:
          return "90%";
      }
    },
    pageTitle() {
      if (this.userData) {
        return (
          "Пользователь: " +
          this.userData.first_name +
          " " +
          this.userData.last_name
        );
      }
      return "Пользователь не найден";
    }
  },
  methods: {
    getUser() {
      this.loadingUser = true;
      this.axios({ url: "/user/" + this.$route.params.id })
        .then(resp => {
          this.userData = resp.data;
          this.loadingUser = false;
        })
        .catch(resp => {
          this.error = resp.data;
          this.loadingUser = false;
        });
    },
    getProjects() {
      this.loadingProjects = true;
      this.axios({ url: "/project/user=" + this.$route.params.id })
        .then(resp => {
          this.projects = resp.data.results;
          this.loadingProjects = false;
        })
        .catch(resp => {
          this.error = resp.data;
          this.loadingProjects = false;
        });
    }
  },
  watch: {
    pageTitle() {
      document.title = this.pageTitle;
    }
  },
  data() {
    return {
      loadingUser: true,
      loadingProjects: true,
      error: null,
      userData: null,
      projects: []
    };
  }
};
</script>
