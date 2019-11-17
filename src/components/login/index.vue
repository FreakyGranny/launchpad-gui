<template>
  <v-content class="backgrnd">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="5">
          <v-card tile>
            <v-card-text class="px-6 pt-10 pb-4">
              <v-form>
                <v-text-field
                  label="Имя пользователя"
                  name="login"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="username"
                />

                <v-text-field
                  id="password"
                  label="Пароль"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="password"
                  v-on:keyup.enter="login"
                />
              </v-form>
            </v-card-text>
            <v-card-actions class="px-6 pt-0 pb-4">
              <v-spacer />
              <v-btn color="primary" @click="login" tile min-width="100" large>
                войти
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { AUTH_REQUEST } from "../../store/actions/auth";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
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
.backgrnd {
  height: calc(100vh - 64px);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  line-height: calc(100vh - 64px);
  background-image: url("/images/login_background.jpg");
}
</style>
