<template>
  <div>
    <md-toolbar class="md-transparent">
      <router-link to="/">
        <h1 class="md-title">2 START</h1>
      </router-link>
      <div class=" md-toolbar-section-start nav-button">
        <md-button to="/explore" class="md-primary">исследовать</md-button>
      </div>
      <div class=" md-toolbar-section-end">
        <md-button class="md-raised md-primary">Create</md-button>
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
import { USER_REQUEST } from "./store/actions/user";

export default {
  components: {},
  name: "app",
  created: function() {
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch(USER_REQUEST);
    }
  }
};
</script>

<style lang="scss">
.md-content {
  padding: 16px;
}
.nav-button {
  margin-left: 12px;
}
</style>
