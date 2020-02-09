<template>
  <v-app>
    <v-app-bar
      v-if="$route.name != 'Promo'"
      height="64"
      max-height="64"
      elevation="2"
    >
      <div class="d-flex align-center">
        <router-link to="/explore">
          <v-img
            alt="Kickstarter Logo"
            class="shrink mr-2"
            contain
            src="/images/logo.png"
            width="240"
          />
        </router-link>
        <!-- <router-link to="/" class="hidden-sm-and-down">
          <v-hover v-slot:default="{ hover }">
            <div
              :class="hover ? 'primary--text' : 'secondarytext--text'"
              class="subtitle-2 font-weight-bold"
            >
              Как это работает?
            </div>
          </v-hover>
        </router-link> -->
      </div>
      <v-spacer></v-spacer>
      <v-menu
        offset-y
        v-model="showNavigation"
        :position-x="0"
        :position-y="56"
        min-width="100%"
        transition="slide-y-transition"
        z-index="5"
        absolute
      >
        <v-list flat>
          <v-list-item
            v-if="!IS_AUTHORIZED"
            class="justify-end primarytext--text"
            :to="{ name: 'Login' }"
          >
            Войти
          </v-list-item>
          <v-list-item
            v-if="IS_AUTHORIZED"
            class="justify-end primarytext--text"
            :to="{ name: 'Create' }"
          >
            Новый проект
          </v-list-item>
          <v-list-item
            v-if="IS_PROFILE_LOADED"
            class="justify-end primarytext--text"
            :to="{ name: 'Account' }"
          >
            Мой профиль
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        color="primary"
        text
        icon
        large
        :ripple="false"
        class="hidden-sm-and-up"
        @click="showNavigation = true"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-row align="center" justify="end" class="me-1 hidden-xs-only">
        <router-link :to="{ name: 'Create' }" v-if="IS_AUTHORIZED">
          <v-hover v-slot:default="{ hover }">
            <div
              :class="hover ? 'primary--text' : 'secondarytext--text'"
              class="subtitle-2 font-weight-bold"
            >
              Новый проект
            </div>
          </v-hover>
        </router-link>
        <v-divider class="mx-4" vertical />
        <router-link :to="{ name: 'Login' }" v-if="!IS_AUTHORIZED">
          <v-hover v-slot:default="{ hover }">
            <div
              :class="hover ? 'primary--text' : 'secondarytext--text'"
              class="subtitle-2 font-weight-bold"
            >
              Войти
            </div>
          </v-hover>
        </router-link>
        <router-link :to="{ name: 'Account' }" v-if="IS_AUTHORIZED">
          <v-tooltip bottom transition="fade-transition">
            <template v-slot:activator="{ on }">
              <v-avatar size="40">
                <img
                  v-on="on"
                  v-bind:src="PROFILE.avatar"
                  onerror="this.onerror=null;this.src='/images/avatar.png';"
                  alt="Avatar"
                  v-if="IS_PROFILE_LOADED"
                />
                <img
                  v-on="on"
                  src="/images/avatar.png"
                  alt="Avatar"
                  v-if="!IS_PROFILE_LOADED"
                />
              </v-avatar>
            </template>
            <span>Мой профиль</span>
          </v-tooltip>
        </router-link>
      </v-row>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
    <v-footer
      v-if="$route.name != 'Login' && $route.name != 'Promo'"
      class="grey lighten-5"
    >
      <v-col class="pa-0">
        <v-divider />
        <v-row justify="center" class="mt-3">
          <v-btn
            text
            icon
            x-small
            link
            href="https://rnd2gis.slack.com/archives/CKNPN7DEX"
            target="_blank"
          >
            <v-icon>mdi-slack</v-icon>
          </v-btn>
          <v-btn
            text
            icon
            x-small
            href="https://gitlab.2gis.ru/pet-projects"
            target="_blank"
          >
            <v-icon>mdi-gitlab</v-icon>
          </v-btn>
        </v-row>
        <v-row justify="center">
          <div class="secondarytext--text overline pt-1 mb-3">
            KICKTEAM {{ new Date().getFullYear() }}
          </div>
        </v-row>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import { USER_REQUEST } from "./store/actions/user";

export default {
  components: {},
  name: "app",
  computed: {
    ...mapGetters(["IS_AUTHORIZED", "IS_PROFILE_LOADED", "PROFILE"])
  },
  created: async function() {
    if (this.IS_AUTHORIZED) {
      await this.$store.dispatch(USER_REQUEST);
    }
  },
  watch: {
    $route: {
      // eslint-disable-next-line no-unused-vars
      handler: (to, from) => {
        document.title = to.meta.title || "2GIS KICKSTARTER";
      },
      immediate: true
    }
  },
  data() {
    return {
      showNavigation: false
    };
  }
};
</script>

<style scoped></style>
