<template>
  <div>
    <form
      class="md-layout md-alignment-center-center fill-height"
      @submit.prevent="login"
    >
      <md-card
        class="md-layout-item md-size-40 md-xlarge-30 md-large-40 md-small-size-60 md-xsmall-size-100"
      >
        <md-card-content>
          <div class="md-layout md-alignment-center-center top-spacing">
            <div class="md-layout-item md-size-15">
              <md-icon class="md-promary md-size-2x">person</md-icon>
            </div>
            <div class="md-layout-item md-size-85">
              <md-field>
                <label>Имя пользователя</label>
                <md-input v-model="username" type="text" />
              </md-field>
            </div>
            <div class="md-layout-item md-size-15">
              <md-icon class="md-promary md-size-2x">vpn_key</md-icon>
            </div>
            <div class="md-layout-item md-size-85">
              <md-field>
                <label>Пароль</label>
                <md-input required v-model="password" type="password" />
              </md-field>
            </div>
          </div>
          <md-card-actions>
            <md-button type="submit" class="md-raised md-primary"
              >Войти</md-button
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
@import "~vue-material/dist/theme/engine";

.md-icon {
  color: md-get-palette-color(deeppurple, 600) !important;
}
.md-card {
  border-radius: 0px;
}
.top-spacing {
  padding-top: 30px;
}
.fill-height {
  height: calc(100vh - 47px);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  line-height: calc(100vh - 47px);
  background-image: url("/images/login_background.jpg");
}
</style>
