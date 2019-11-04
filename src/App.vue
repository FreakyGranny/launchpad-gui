<template>
  <div class="top-of-top">
    <md-toolbar class="c-toolbar" md-elevation="0">
      <router-link to="/explore">
        <img class="logo" src="/images/logo-tr.png" alt="2 KICKSTARTER" />
      </router-link>
      <div class="md-layout">
        <div class="md-layout-item">
          <div class=" md-toolbar-section-start nav-button">
            <router-link to="/">
              <span v-if="$mq === 'lg'" class="nav-link">
                Как это работает?
              </span>
              <md-button
                v-if="$mq === 'md'"
                class="md-icon-button md-dense md-primary"
              >
                <md-icon>help</md-icon>
              </md-button>
            </router-link>
          </div>
        </div>
      </div>
      <div class=" md-toolbar-section-end">
        <div class="md-layout md-alignment-center-right">
          <div v-if="$mq !== 'sm'" class="md-layout-item">
            <div>
              <router-link to="/create" v-if="IS_PROFILE_LOADED">
                <span class="nav-link">Новый проект</span>
              </router-link>
            </div>
          </div>
          <div v-if="$mq !== 'sm'" class="md-layout-item">
            <div class="profile">
              <router-link to="/login" v-if="!IS_PROFILE_LOADED">
                <span class="nav-link">Войти</span>
              </router-link>
              <router-link to="/account" v-if="IS_PROFILE_LOADED">
                <md-avatar>
                  <img
                    v-bind:src="PROFILE.avatar"
                    onerror="this.onerror=null;this.src='/images/avatar.png';"
                    alt="Avatar"
                  />
                  <md-tooltip md-direction="bottom">Профиль</md-tooltip>
                </md-avatar>
              </router-link>
            </div>
          </div>
        </div>
        <md-button
          v-if="$mq === 'sm'"
          class="md-icon-button"
          @click="showNavigation = !showNavigation"
        >
          <md-icon>menu</md-icon>
        </md-button>
      </div>
    </md-toolbar>
    <md-list v-if="showNavigation">
      <md-list-item to="/create" exact>Новый проект</md-list-item>
      <md-list-item to="/account">Профиль</md-list-item>
      <md-list-item to="/">Как это работает?</md-list-item>
    </md-list>
    <md-content>
      <div class="main-container">
        <transition>
          <router-view />
        </transition>
      </div>
    </md-content>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { USER_REQUEST } from "./store/actions/user";
import { PROJECT_TYPE_REQUEST } from "./store/actions/projectType";
import { CATEGORY_REQUEST } from "./store/actions/category";

export default {
  components: {},
  name: "app",
  computed: {
    ...mapGetters(["IS_AUTHORIZED", "IS_PROFILE_LOADED", "PROFILE"])
  },
  created: async function() {
    if (this.IS_AUTHORIZED) {
      await this.$store.dispatch(PROJECT_TYPE_REQUEST);
      await this.$store.dispatch(CATEGORY_REQUEST);
      await this.$store.dispatch(USER_REQUEST);
    }
  },
  data() {
    return {
      showNavigation: false
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine";

.top-of-top {
  min-width: 350px;
}
.c-toolbar {
  border-bottom: 1px solid #ddd;
  padding-left: 10px;
  min-height: 47px;
  min-width: 300px;
}
.nav-button {
  margin-left: 15px;
}
.profile {
  border-left: 1px solid #ddd;
  padding-left: 16px;
  margin-left: 20px;
}
* {
  text-decoration: none !important;
}
.nav-link {
  color: md-get-palette-color(gray, 700);
  font-size: 14px;
  font-weight: 700;
  vertical-align: middle;
  white-space: nowrap;
}
.nav-link:hover {
  color: md-get-palette-color(deeppurple, 600);
}
.logo {
  height: 40px;
}
</style>
