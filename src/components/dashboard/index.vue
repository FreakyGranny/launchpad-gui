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
        <v-col xl="2" lg="2" md="3" class="hidden-sm-and-down">
          <filters
            class="mt-2"
            :selectedType="typeFilter"
            :selectedCategory="categoryFilter"
            :selectedOnlyOpen="onlyOpenFilter"
            @clickCategory="filteringByCategory"
            @clickType="filteringByType"
            @clickOpen="filteringByOpen"
          />
        </v-col>
        <!-- projects -->
        <v-col xl="8" lg="8" md="9">
          <v-row
            no-gutters
            justify="center"
            v-if="!loading"
            class="hidden-sm-and-up"
          >
            <v-btn
              color="secondary"
              outlined
              tile
              large
              width="88%"
              @click="filterDialog = !filterDialog"
            >
              фильтры
            </v-btn>
          </v-row>
          <empty-state
            :heightPercent="90"
            icon="mdi-toy-brick-search-outline"
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
          <v-row
            no-gutters
            justify="center"
            class="my-12"
            v-if="projects.length != 0"
          >
            <v-btn
              color="primary"
              :disabled="loading || !hasNextPage"
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

    <v-dialog
      v-model="filterDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="filterDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Фильтры</v-toolbar-title>
        </v-toolbar>
        <filters
          class="px-5"
          :selectedType="typeFilter"
          :selectedCategory="categoryFilter"
          :selectedOnlyOpen="onlyOpenFilter"
          @clickCategory="filteringByCategory"
          @clickType="filteringByType"
          @clickOpen="filteringByOpen"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped></style>

<script>
import ProjectCard from "../lib/ProjectCard";
import LoadSpinner from "../lib/loading";
import BgHeader from "../lib/bgHeader";
import EmptyState from "../lib/EmptyState";
import Filters from "./Filters";
import { mapGetters } from "vuex";

export default {
  components: {
    ProjectCard,
    BgHeader,
    EmptyState,
    Filters,
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
    // isFinalPage() {
    //   if (typeof this.projects === "undefined") {
    //     return false;
    //   }
    //   return this.totalProjects == this.projects.length;
    // },
    projectsOnPage() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 5;
        case "lg":
          return 6;
        case "xl":
          return 8;
        default:
          return 6;
      }
    }
  },
  methods: {
    filteringByCategory(clickedCategory) {
      this.$router.push(
        this.buildFilterLink(
          this.typeFilter,
          clickedCategory,
          this.onlyOpenFilter
        )
      );
    },
    filteringByType(clickedType) {
      this.$router.push(
        this.buildFilterLink(
          clickedType,
          this.categoryFilter,
          this.onlyOpenFilter
        )
      );
    },
    filteringByOpen(clickedOpen) {
      this.$router.push(
        this.buildFilterLink(this.typeFilter, this.categoryFilter, clickedOpen)
      );
    },
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
        this.onlyOpenFilter = true;
      } else {
        this.onlyOpenFilter = false;
      }
    },
    buildProjectUrl() {
      let pUrl = "/project?page_size=" + this.projectsOnPage;
      if (this.nextPage) {
        pUrl += "&page=" + this.nextPage;
      }
      if (this.categoryFilter) {
        pUrl += "&category=" + this.categoryFilter;
      }
      if (this.typeFilter) {
        pUrl += "&type=" + this.typeFilter;
      }
      if (this.onlyOpenFilter) {
        pUrl += "&filter=open";
      }
      return pUrl;
    },
    getProjects() {
      this.filterDialog = false;
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
          this.hasNextPage = resp.data.has_next;
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
      this.hasNextPage = false;
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
  data() {
    return {
      filterDialog: false,
      toTopFab: false,
      typeFilter: null,
      categoryFilter: null,
      onlyOpenFilter: false,
      loading: true,
      error: null,
      nextPage: null,
      hasNextPage: false,
      projects: []
    };
  }
};
</script>
