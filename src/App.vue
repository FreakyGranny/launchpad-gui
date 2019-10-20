<template>
  <div>
    <md-toolbar class="md-transparent">
      <a href="/">
        <h1 class="md-title">2 START</h1>
      </a>
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
</style>
