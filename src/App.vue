<template>
  <v-app>
    <v-app-bar app hide-on-scroll scroll-threshold="20">
      <div class="d-flex align-center">
        <router-link to="/explore">
          <v-img
            alt="Kickstarter Logo"
            class="shrink mr-2"
            contain
            src="/images/logo-tr.png"
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
            v-if="!IS_PROFILE_LOADED"
            class="justify-end primarytext--text"
            :to="{ name: 'Login' }"
          >
            Войти
          </v-list-item>
          <v-list-item
            v-if="IS_PROFILE_LOADED"
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
        <router-link :to="{ name: 'Create' }" v-if="IS_PROFILE_LOADED">
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
        <router-link :to="{ name: 'Login' }" v-if="!IS_PROFILE_LOADED">
          <v-hover v-slot:default="{ hover }">
            <div
              :class="hover ? 'primary--text' : 'secondarytext--text'"
              class="subtitle-2 font-weight-bold"
            >
              Войти
            </div>
          </v-hover>
        </router-link>
        <!-- <v-avatar size="40" v-if="IS_PROFILE_LOADED">
          <img
            v-bind:src="PROFILE.avatar"
            onerror="this.onerror=null;this.src='/images/avatar.png';"
            alt="Avatar"
          />
        </v-avatar> -->
        <router-link :to="{ name: 'Account' }" v-if="IS_PROFILE_LOADED">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-avatar size="40">
                <img
                  v-on="on"
                  v-bind:src="PROFILE.avatar"
                  onerror="this.onerror=null;this.src='/images/avatar.png';"
                  alt="Avatar"
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
    <!-- <v-footer>
      <v-spacer></v-spacer>
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer> -->
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import { USER_REQUEST } from "./store/actions/user";
import { PROJECT_TYPE_REQUEST } from "./store/actions/projectType";
import { CATEGORY_REQUEST } from "./store/actions/category";

export default {
  components: {},
  name: "app",
  computed: {
    ...mapGetters(["IS_AUTHORIZED", "IS_PROFILE_LOADED", "PROFILE"])
  },
  created: async function() {
    if (this.IS_AUTHORIZED) {
      await this.$store.dispatch(PROJECT_TYPE_REQUEST);
      await this.$store.dispatch(CATEGORY_REQUEST);
      await this.$store.dispatch(USER_REQUEST);
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
