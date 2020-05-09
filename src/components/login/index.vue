<template>
  <v-content class="backgrnd">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="5" lg="4">
          <v-card tile>
            <v-card-text class="px-6 pt-10 pb-4">
              <v-alert
                outlined
                type="error"
                prominent
                border="left"
                v-if="STORAGE_STATUS == 'error'"
              >
                Ой, ошибочка вышла :(
              </v-alert>
              <div class="pb-3 primarytext--text body-1 text-center">
                Войти через социальную сеть
              </div>
            </v-card-text>
            <v-card-actions class="px-6 pt-0 pb-8">
              <v-spacer />
              <v-btn :href="authUrl" color="primary" fab x-large>
                <v-icon>mdi-vk</v-icon>
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";
import { AUTH_REQUEST } from "../../store/actions/auth";

export default {
  name: "login",
  created: async function() {
    this.setCode();
  },
  computed: {
    ...mapGetters(["STORAGE_STATUS"]),
    authUrl() {
      const authUrl = "https://oauth.vk.com/authorize";
      const params = new URLSearchParams();
      params.append("display", "page");
      params.append("scope", "email");
      params.append("response_type", "code");
      params.append("v", "5.103");
      params.append("client_id", process.env.VUE_APP_VK_CLIENT_ID);
      params.append(
        "redirect_uri",
        (process.env.VUE_APP_VK_REDIRECT_URI || "http://localhost:8080") +
          "/login"
      );
      if (this.$route.query.state) {
        params.append("state", this.$route.query.state);
      }

      return authUrl + "?" + params.toString();
    }
  },
  methods: {
    setCode() {
      if (this.$route.query.code) {
        this.login(this.$route.query.code);
      }
    },
    login(code) {
      this.$store.dispatch(AUTH_REQUEST, { code }).then(() => {
        this.$router.push(this.$route.query.state || "/explore");
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
