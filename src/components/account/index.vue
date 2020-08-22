<template>
  <div>
    <load-spinner
      :overlay="!IS_PROFILE_LOADED || !IS_USER_DONATIONS_LOADED"
    ></load-spinner>
    <v-parallax
      height="200"
      src="/images/owner.jpg"
      class="hidden-sm-and-down"
    />

    <v-container class="pa-0" :style="userCardStyle">
      <v-row justify="center" no-gutters>
        <v-col xl="6" lg="8" md="10" sm="12">
          <v-card
            color="white"
            height="250px"
            elevation="0"
            v-if="!IS_PROFILE_LOADED || !IS_USER_DONATIONS_LOADED"
          />
          <user-card
            v-if="IS_PROFILE_LOADED && IS_USER_DONATIONS_LOADED"
            :user="PROFILE"
            :totalDonation="getSpentAmount"
          />
          <v-progress-linear
            :active="loading"
            :indeterminate="loading"
            color="secondary"
          />
        </v-col>
      </v-row>

      <v-row justify="center" no-gutters v-if="!loading && IS_PROFILE_LOADED">
        <v-tabs
          v-model="tab"
          class="mt-10"
          background-color="grey lighten-5"
          centered
          fixed-tabs
        >
          <v-tab href="#tab-owned">
            <v-row align="center" justify="center">
              Я автор
            </v-row>
          </v-tab>

          <v-tab href="#tab-contributed">
            <v-row align="center" justify="center">
              Я участник
            </v-row>
          </v-tab>
        </v-tabs>
        <v-sheet class="mb-5" :max-width="slideAreaWidth">
          <v-tabs-items v-model="tab" class="grey lighten-5">
            <v-tab-item value="tab-owned">
              <empty-state
                :heightPercent="50"
                icon="mdi-toy-brick-outline"
                label="Хм, тут ничего нет"
                description="Ты не являешься автором ни одного проекта"
                v-if="!loading && projectsOwned.length == 0"
              />
              <v-slide-group class="pa-4" v-if="projectsOwned">
                <v-slide-item
                  v-for="project in projectsOwned"
                  :key="project.id"
                >
                  <v-sheet width="250" class="mx-4 mt-6 mb-8">
                    <project-card :project="project" />
                  </v-sheet>
                </v-slide-item>
              </v-slide-group>
            </v-tab-item>
            <v-tab-item value="tab-contributed">
              <empty-state
                :heightPercent="50"
                icon="mdi-toy-brick"
                label="Тут пока пусто"
                description="Ты пока что не участвуешь ни в одном из проектов"
                v-if="!loading && projectsContributed.length == 0"
              />
              <v-slide-group class="pa-4" v-if="projectsContributed">
                <v-slide-item
                  v-for="project in projectsContributed"
                  :key="project.id"
                >
                  <v-sheet width="250" class="ma-4">
                    <project-card :project="project" />
                  </v-sheet>
                </v-slide-item>
              </v-slide-group>
            </v-tab-item>
          </v-tabs-items>
        </v-sheet>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped></style>

<script>
import ProjectCard from "../lib/ProjectCard";
import UserCard from "../lib/UserCard";
import LoadSpinner from "../lib/loading";
import EmptyState from "../lib/EmptyState";
import { mapGetters } from "vuex";
import { U_DONATIONS_REQUEST } from "../../store/actions/userDonations";

export const FILTER_OWNED = "owned";
export const FILTER_CONTRIBUTED = "contributed";

export default {
  components: {
    ProjectCard,
    UserCard,
    EmptyState,
    LoadSpinner
  },
  name: "account",
  created: async function() {
    if (this.IS_AUTHORIZED) {
      await this.$store.dispatch(U_DONATIONS_REQUEST);
    }
    this.getProjects(FILTER_OWNED);
    this.getProjects(FILTER_CONTRIBUTED);
  },
  computed: {
    ...mapGetters([
      "IS_PROJECT_TYPE_LOADED",
      "IS_PROFILE_LOADED",
      "IS_AUTHORIZED",
      "IS_USER_DONATIONS_LOADED",
      "USER_DONATIONS",
      "PROJECT_TYPE",
      "PROFILE",
      "UID"
    ]),
    getSpentAmount() {
      let spent = 0;
      for (let donation of Object.values(this.USER_DONATIONS)) {
        if (donation.paid) {
          spent += donation.payment;
        }
      }
      return spent;
    },
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
    }
  },
  methods: {
    buildProjectUrl(filter) {
      let pUrl = "/project/user/" + this.UID;
      if (filter === FILTER_OWNED) {
        pUrl += "?" + FILTER_OWNED + "=true";
      }
      if (filter === FILTER_CONTRIBUTED) {
        pUrl += "?" + FILTER_CONTRIBUTED + "=true";
      }
      return pUrl;
    },
    getProjects(filter) {
      this.loading = true;
      this.axios({ url: this.buildProjectUrl(filter) })
        .then(resp => {
          if (filter == FILTER_OWNED) {
            this.projectsOwned = resp.data;
          }
          if (filter == FILTER_CONTRIBUTED) {
            this.projectsContributed = resp.data;
          }
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
      tab: null,
      projectsOwned: [],
      projectsContributed: []
    };
  }
};
</script>
