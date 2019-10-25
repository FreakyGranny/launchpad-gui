<template>
  <div>
    <md-toolbar class="c-toolbar" md-elevation="0">
      <router-link to="/">
        <h1 class="md-title">2 START</h1>
      </router-link>
      <div class=" md-toolbar-section-start nav-button">
        <md-button to="/explore" class="md-primary">исследовать</md-button>
      </div>
      <div class=" md-toolbar-section-end" v-if="profile.username">
        <md-button class="md-raised md-primary custom-button">новый проект</md-button>
        <div class="profile">
          <router-link to="/account">
            <md-avatar>
              <img v-bind:src="profile.avatar" alt="Avatar" />
              <md-tooltip md-direction="bottom">Профиль</md-tooltip>
            </md-avatar>
          </router-link>
        </div>
      </div>
    </md-toolbar>
    <md-content>
      <div class="main-container">
        <router-view />
      </div>
    </md-content>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { USER_REQUEST } from "./store/actions/user";

export default {
  components: {},
  name: "app",
  computed: mapState({ profile: state => state.user.profile }),
  created: function() {
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch(USER_REQUEST);
    }
  }
};
</script>

<style lang="scss">
.c-toolbar {
  border-bottom: 1px solid #ddd;
}
.nav-button {
  margin-left: 12px;
}
.profile {
  border-left: 1px solid #ddd;
  padding-left: 10px;
  margin-left: 20px;
}
</style>
