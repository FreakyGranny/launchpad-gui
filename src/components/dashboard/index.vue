<template>
  <div>
    <bg-header v-if="IS_CATEGORY_LOADED" :categoryId="categoryFilter" />
    <div class="md-layout explore-grid">
      <div
        class="md-layout-item md-xlarge-size-25 md-large-size-25 md-medium-size-30 md-small-hide explore-filter"
      >
        <load-spinner
          v-if="!IS_CATEGORY_LOADED || !IS_PROJECT_TYPE_LOADED"
        ></load-spinner>
        <md-list
          class="md-dense"
          v-if="IS_CATEGORY_LOADED && IS_PROJECT_TYPE_LOADED"
        >
          <md-subheader>КАТЕГОРИИ</md-subheader>
          <md-list-item
            class="list-offset"
            :md-ripple="false"
            :to="buildFilterLink(typeFilter, null, onlyOpen)"
          >
            <span
              class="list-regular-item"
              v-bind:class="{
                'list-selected-item': $route.query.category == null
              }"
              >Все проекты</span
            >
          </md-list-item>

          <md-list-item
            class="list-offset"
            :md-ripple="false"
            v-for="(category, index) in CATEGORY"
            :key="'category_' + index"
            :to="buildFilterLink(typeFilter, category.id, onlyOpen)"
          >
            <span
              class="list-regular-item"
              v-bind:class="{
                'list-selected-item': category.id == $route.query.category
              }"
            >
              {{ category.name }}
            </span>
          </md-list-item>

          <md-divider></md-divider>
          <md-subheader>ТИП ПРОЕКТА</md-subheader>

          <md-list-item
            class="list-offset"
            :md-ripple="false"
            :to="buildFilterLink(null, categoryFilter, onlyOpen)"
          >
            <span
              class="list-regular-item"
              v-bind:class="{ 'list-selected-item': $route.query.type == null }"
            >
              Любой
            </span>
          </md-list-item>

          <md-list-item
            class="list-offset"
            :md-ripple="false"
            v-for="(type, index) in PROJECT_TYPE"
            :key="'type_' + index"
            :to="buildFilterLink(type.id, categoryFilter, onlyOpen)"
          >
            <span
              class="list-regular-item"
              v-bind:class="{
                'list-selected-item': type.id == $route.query.type
              }"
            >
              {{ type.name }}
            </span>
          </md-list-item>

          <md-divider></md-divider>
          <md-list-item>
            <span class="list-regular-item">Только активные</span>
            <md-switch v-model="onlyOpen" />
          </md-list-item>
          <md-button class="md-raised md-primary custom-button" to="/explore">
            Сбросить фильтры
          </md-button>
        </md-list>
      </div>
      <div
        class="md-layout-item md-xlarge-size-75 md-large-size-75 md-medium-size-70 md-small-size-100 md-xsmall-hide"
      >
        <div class="md-layout md-alignment-center-left">
          <project-card
            v-for="(project, index) in projects"
            :key="index"
            :project="project"
            :category="CATEGORY[project.category[0]]"
          />
        </div>
        <div class="md-layout md-alignment-center">
          <load-spinner v-if="loading"></load-spinner>
          <div class="spacing" v-if="!loading">
            <md-empty-state
              md-icon="help_outline"
              md-label="Проекты не найдены"
              md-description="К сожалению, не нашлось проектов удовлетворяющих всем фильтрам."
              v-if="projects.length == 0"
            >
            </md-empty-state>
            <md-button
              class="md-raised md-primary custom-button"
              v-bind:disabled="isFinalPage"
              v-on:click="getProjects"
              v-if="projects.length != 0"
            >
              загрузить еще
            </md-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine";

.explore-grid {
  padding-top: 30px;
  margin: auto;
  max-width: 1200px;
}
.explore-filter {
  padding-right: 10px;
  padding-right: 40px;
}
.spacing {
  margin-top: 100px;
  margin-bottom: 100px;
}
.md-button-clean {
  display: inline !important;
}
.list-regular-item {
  color: md-get-palette-color(gray, 800);
  font-size: 15px;
  font-weight: 400;
}
.list-selected-item {
  color: md-get-palette-color(green, 700);
  font-size: 15px;
  font-weight: 600;
}
.list-offset {
  padding-left: 15px;
}
</style>

<script>
import ProjectCard from "../lib/ProjectCard";
import LoadSpinner from "../lib/loading";
import BgHeader from "../lib/bgHeader";
import axios from "axios";
import { mapGetters } from "vuex";
// import { PROJECT_TYPE_REQUEST } from "../../store/actions/projectType";
// import { CATEGORY_REQUEST } from "../../store/actions/category";

export default {
  components: {
    ProjectCard,
    BgHeader,
    LoadSpinner
  },
  name: "dashboard",
  created: async function() {
    // await this.$store.dispatch(PROJECT_TYPE_REQUEST);
    // await this.$store.dispatch(CATEGORY_REQUEST);
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
      let pUrl = "/project?page_size=9";
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
      axios({ url: this.buildProjectUrl() })
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
