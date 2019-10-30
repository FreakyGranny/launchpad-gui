<template>
  <div>
    <md-toolbar class="c-toolbar" md-elevation="0">
      <router-link to="/explore">
        <img class="logo" src="/images/logo-tr.png" alt="2 KICKSTARTER" />
      </router-link>
      <div class=" md-toolbar-section-start nav-button">
        <router-link to="/">
          <span class="nav-link">Как это работает?</span>
        </router-link>
      </div>
      <div class=" md-toolbar-section-end">
        <router-link to="/" v-if="IS_PROFILE_LOADED">
          <span class="nav-link">Новый проект</span>
        </router-link>
        <div class="profile">
          <router-link to="/login" v-if="!IS_PROFILE_LOADED">
            <span class="nav-link">Войти</span>
          </router-link>
          <router-link to="/account" v-if="IS_PROFILE_LOADED">
            <md-avatar>
              <img
                v-bind:src="PROFILE.avatar"
                onerror="this.onerror=null;this.src='/images/avatar.jpeg';"
                alt="Avatar"
              />
              <md-tooltip md-direction="bottom">Профиль</md-tooltip>
            </md-avatar>
          </router-link>
        </div>
      </div>
    </md-toolbar>
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
  }
};
</script>

<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine";

.c-toolbar {
  border-bottom: 1px solid #ddd;
  padding-left: 10px;
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
}
.nav-link:hover {
  color: md-get-palette-color(deeppurple, 600);
}
.logo {
  height: 40px;
}
</style>
