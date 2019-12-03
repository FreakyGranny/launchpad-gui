<template>
  <div>
    <bg-header v-if="IS_CATEGORY_LOADED" :categoryId="categoryFilter" />
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      color="secondary"
    ></v-progress-linear>
    <v-container fluid>
      <load-spinner :overlay="!IS_CATEGORY_LOADED || !IS_PROJECT_TYPE_LOADED" />
      <v-row justify="center" no-gutters>
        <!-- filters -->
        <v-col xl="2" lg="2" md="3" class="hidden-sm-and-down">
          <v-list
            flat
            nav
            dense
            class="grey lighten-5 mt-2"
            v-if="IS_CATEGORY_LOADED && IS_PROJECT_TYPE_LOADED"
          >
            <v-subheader class="pa-2 secondarytext--text subtitle-1"
              >КАТЕГОРИИ</v-subheader
            >
            <v-divider></v-divider>

            <v-list-item
              class="pl-4 ma-0"
              :ripple="false"
              :to="buildFilterLink(typeFilter, null, onlyOpen)"
            >
              <v-list-item-content>
                <v-list-item-title
                  class="body-2"
                  :class="
                    $route.query.category == null
                      ? 'accent--text'
                      : 'secondarytext--text'
                  "
                >
                  Все проекты
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              v-for="(category, index) in CATEGORY"
              :ripple="false"
              :to="buildFilterLink(typeFilter, category.id, onlyOpen)"
              :key="'category_' + index"
              class="pl-4"
            >
              <v-list-item-content>
                <v-list-item-title
                  class="body-2"
                  :class="
                    $route.query.category == category.id
                      ? 'accent--text'
                      : 'secondarytext--text'
                  "
                >
                  {{ category.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-subheader class="pa-2 secondarytext--text subtitle-1"
              >ТИП ПРОЕКТА</v-subheader
            >
            <v-divider></v-divider>

            <v-list-item
              class="pl-4 ma-0"
              :ripple="false"
              :to="buildFilterLink(null, categoryFilter, onlyOpen)"
            >
              <v-list-item-content>
                <v-list-item-title
                  class="body-2"
                  :class="
                    $route.query.type == null
                      ? 'accent--text'
                      : 'secondarytext--text'
                  "
                >
                  Любой
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <!-- hidding new project types for a while -->
            <v-list-item
              v-for="(type, index) in PROJECT_TYPE"
              :key="'type_' + index"
              class="pl-4"
              :ripple="false"
              v-show="type.id < 4"
              :to="buildFilterLink(type.id, categoryFilter, onlyOpen)"
            >
              <v-list-item-content>
                <v-list-item-title
                  class="body-2"
                  :class="
                    $route.query.type == type.id
                      ? 'accent--text'
                      : 'secondarytext--text'
                  "
                >
                  {{ type.name }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item>
              <v-list-item-content>
                <div class="secondarytext--text">Только активные</div>
              </v-list-item-content>
              <v-list-item-action>
                <v-switch inset :ripple="false" v-model="onlyOpen" />
              </v-list-item-action>
            </v-list-item>

            <v-list-item class="pa-0 ma-0" :ripple="false">
              <v-list-item-content>
                <v-btn
                  color="secondary"
                  to="/explore"
                  tile
                  min-width="100"
                  large
                  :disabled="!(typeFilter || categoryFilter)"
                >
                  Сбросить фильтры
                </v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <!-- projects -->
        <v-col xl="8" lg="8" md="9">
          <empty-state
            reason="empty_filter"
            label="Проекты не найдены"
            description="К сожалению, не нашлось проектов удовлетворяющих всем фильтрам."
            v-if="!loading && projects.length == 0"
          />
          <v-row no-gutters>
            <v-col
              class="py-6"
              v-for="(project, index) in projects"
              :key="index"
              align-self="center"
              xl="3"
              lg="4"
              md="4"
              sm="6"
              xs="12"
            >
              <v-row no-gutters justify="center">
                <project-card :project="project" />
              </v-row>
            </v-col>
          </v-row>
          <v-row no-gutters justify="center" class="my-12">
            <v-btn
              color="primary"
              v-if="projects.length != 0"
              :disabled="isFinalPage || loading"
              :loading="loading"
              @click="getProjects"
              tile
              min-width="100"
              large
            >
              загрузить еще
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-fab-transition>
      <v-btn
        v-scroll="onScroll"
        v-show="toTopFab"
        fab
        fixed
        bottom
        right
        color="primary"
        @click="toTop"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<style scoped></style>

<script>
import ProjectCard from "../lib/ProjectCard";
import LoadSpinner from "../lib/loading";
import BgHeader from "../lib/bgHeader";
import EmptyState from "../lib/EmptyState";
import { mapGetters } from "vuex";

export default {
  components: {
    ProjectCard,
    BgHeader,
    EmptyState,
    LoadSpinner
  },
  name: "dashboard",
  created: async function() {
    this.getProjects();
  },
  computed: {
    ...mapGetters([
      "STORAGE_STATUS",
      "IS_CATEGORY_LOADED",
      "IS_PROJECT_TYPE_LOADED",
      "CATEGORY",
      "PROJECT_TYPE"
    ]),
    isFinalPage() {
      if (typeof this.projects === "undefined") {
        return false;
      }
      return this.totalProjects == this.projects.length;
    }
  },
  methods: {
    buildFilterLink(typeId, categoryId, openFilter) {
      let filterUrl = "/explore";
      let params = {};
      if (typeId) {
        params["type"] = typeId;
      }
      if (categoryId) {
        params["category"] = categoryId;
      }
      if (openFilter) {
        params["filter"] = "open";
      }
      let query = Object.keys(params)
        .map(k => escape(k) + "=" + escape(params[k]))
        .join("&");
      if (query) {
        filterUrl += "?" + query;
      }

      return filterUrl;
    },
    setQueryParams() {
      if (this.$route.query.type) {
        this.typeFilter = this.$route.query.type;
      } else {
        this.typeFilter = null;
      }
      if (this.$route.query.category) {
        this.categoryFilter = this.$route.query.category;
      } else {
        this.categoryFilter = null;
      }
      if (this.$route.query.filter) {
        this.onlyOpen = true;
      } else {
        this.onlyOpen = false;
      }
    },
    buildProjectUrl() {
      let pUrl = "/project?page_size=8";
      if (this.nextPage) {
        pUrl += "&page=" + this.nextPage;
      }
      if (this.categoryFilter) {
        pUrl += "&category=" + this.categoryFilter;
      }
      if (this.typeFilter) {
        pUrl += "&type=" + this.typeFilter;
      }
      if (this.onlyOpen) {
        pUrl += "&filter=open";
      }
      return pUrl;
    },
    getProjects() {
      this.loading = true;
      this.setQueryParams();
      let projectList = this.projects ? this.projects : [];
      this.axios({ url: this.buildProjectUrl() })
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
    resetState() {
      this.loading = true;
      this.error = null;
      this.nextPage = null;
      this.totalProjects = 0;
      this.projects = [];
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.toTopFab = top > 750;
    },
    toTop() {
      this.$vuetify.goTo(214);
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.$route.query.type = to.query.type;
    this.$route.query.category = to.query.category;
    this.$route.query.filter = to.query.filter;
    this.resetState();
    this.getProjects();

    next();
  },
  watch: {
    onlyOpen() {
      this.$router.push(
        this.buildFilterLink(
          this.typeFilter,
          this.categoryFilter,
          this.onlyOpen
        )
      );
    }
  },
  data() {
    return {
      toTopFab: false,
      typeFilter: null,
      categoryFilter: null,
      onlyOpen: false,
      loading: true,
      error: null,
      nextPage: null,
      totalProjects: 0,
      projects: []
    };
  }
};
</script>
