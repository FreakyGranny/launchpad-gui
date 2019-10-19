<template>
  <div>
    <md-toolbar class="md-transparent">
      <h1 class="md-title">2GO</h1>
    </md-toolbar>

    <md-content>
      <h1>Auth Flow</h1>
      <ul>
        <li>
          <router-link v-if="loggedIn" to="/logout">Log out</router-link>
          <router-link v-if="!loggedIn" to="/login">Log in</router-link>
        </li>
        <li>
          <router-link to="/about">About</router-link>
        </li>
        <li>
          <router-link to="/dashboard">Dashboard</router-link>
          (authenticated)
        </li>
      </ul>
      <template v-if="$route.matched.length">
        <router-view></router-view>
      </template>
      <template v-else>
        <p>You are logged {{ loggedIn ? "in" : "out" }}</p>
      </template>
    </md-content>
  </div>
</template>

<script>
import auth from "../auth";
export default {
  data() {
    return {
      loggedIn: auth.loggedIn()
    };
  },
  created() {
    auth.onChange = loggedIn => {
      this.loggedIn = loggedIn;
    };
  }
};
</script>

<style lang="scss">
.md-content {
  padding: 16px;
}
</style>
