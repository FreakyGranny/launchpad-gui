<template>
  <div>
    <form
      class="md-layout md-alignment-center-center fill-height"
      @submit.prevent="login"
    >
      <md-card
        class="md-layout-item md-size-40 md-small-size-80 md-xsmall-size-100"
      >
        <md-card-header>
          <div class="md-title">Sign in</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-xsmall-size-100">
              <md-field>
                <label>Username</label>
                <md-input v-model="username" type="text" placeholder="Snoopy" />
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-xsmall-size-100">
              <md-field>
                <label>Password</label>
                <md-input
                  required
                  v-model="password"
                  type="password"
                  placeholder="Password"
                />
              </md-field>
            </div>
          </div>
          <md-card-actions>
            <md-button type="submit" class="md-raised md-primary"
              >Login</md-button
            >
          </md-card-actions>
        </md-card-content>
      </md-card>
    </form>
  </div>
</template>

<script>
import { AUTH_REQUEST } from "../../store/actions/auth";

export default {
  name: "login",
  data() {
    return {
      username: "root",
      password: "qweqwe"
    };
  },
  methods: {
    login: function() {
      const { username, password } = this;
      this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
        this.$router.push("/explore");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.fill-height {
  height: 85vh;
}
</style>
