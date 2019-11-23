<template>
  <v-content class="backgrnd">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="5">
          <v-card tile>
            <v-card-text class="px-6 pt-10 pb-4">
              <v-form ref="loginForm" v-model="fildsFilled">
                <v-text-field
                  class="py-2"
                  label="Имя пользователя"
                  name="login"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="username"
                  :rules="[rules.required]"
                  required
                />

                <v-text-field
                  class="py-2"
                  id="password"
                  label="Пароль"
                  name="password"
                  prepend-icon="mdi-lock"
                  v-model="password"
                  @keyup.enter="validate"
                  :rules="[rules.required]"
                  :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="() => (value = !value)"
                  :type="value ? 'password' : 'text'"
                  required
                />
              </v-form>
            </v-card-text>
            <v-card-actions class="px-6 pt-0 pb-4">
              <v-spacer />
              <v-btn
                color="primary"
                @click="validate"
                tile
                min-width="100"
                large
              >
                Войти
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
      value: String,
      fildsFilled: true,
      username: "",
      password: "",
      rules: {
        required: value => !!value || "Ой ёй, полюшко то не заполнено!"
      }
    };
  },
  methods: {
    validate() {
      if (this.$refs.loginForm.validate()) {
        this.login();
      }
    },
    login() {
      const { username, password } = this;
      this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
        this.$router.push("/explore");
      });
    }
  }
};
</script>

<style scoped>
.backgrnd {
  height: calc(100vh - 64px);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  line-height: calc(100vh - 64px);
  background-image: url("/images/login_background.jpg");
}
</style>
