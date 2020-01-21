<template>
  <v-card :elevation="cardElevation" tile>
    <v-card-text class="pa-0">
      <v-row no-gutters>
        <v-sheet height="250" width="250" class="hidden-xs-only">
          <img
            class="userImage"
            v-bind:src="user.avatar"
            onerror="this.onerror=null;this.src='/images/avatar.png';"
            alt="User avatar"
          />
        </v-sheet>
        <v-avatar size="120" class="mt-4 ml-7 hidden-sm-and-up">
          <img
            v-bind:src="user.avatar"
            onerror="this.onerror=null;this.src='/images/avatar.png';"
            alt="User avatar"
          />
        </v-avatar>
        <v-col class="px-4 pt-3">
          <v-row no-gutters class="px-4">
            <div class="primarytext--text headline font-weight-medium">
              {{ user.first_name }} {{ user.last_name }}
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mb-1"
                    v-on="on"
                    text
                    icon
                    color="secondary"
                    :href="'https://planeta.2gis.ru/profile/' + user.username"
                    target="_blank"
                    v-if="totalDonation == null"
                  >
                    <v-icon size="22">mdi-earth</v-icon>
                  </v-btn>
                  <v-btn
                    class="mb-1"
                    v-on="on"
                    text
                    icon
                    color="secondary"
                    v-if="totalDonation != null"
                    @click="logout"
                  >
                    <v-icon size="22">mdi-location-exit</v-icon>
                  </v-btn>
                </template>
                <span>
                  {{
                    totalDonation == null
                      ? "Открыть профиль на планете"
                      : "Выйти"
                  }}
                </span>
              </v-tooltip>
            </div>
          </v-row>
          <v-divider></v-divider>
          <v-row no-gutters>
            <v-col>
              <v-row no-gutters align="center" class="pt-2 px-2">
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-sheet v-on="on">
                      <v-rating
                        background-color="primary"
                        :value="user.profile.success_rate * 5"
                        length="5"
                        half-increments
                        readonly
                      >
                      </v-rating>
                    </v-sheet>
                  </template>
                  <span
                    >Успешность проектов
                    {{ user.profile.success_rate * 100 }}%</span
                  >
                </v-tooltip>
              </v-row>

              <v-row no-gutters align="baseline" class="px-4">
                <div class="secondarytext--text body-2">
                  Проектов
                </div>
                <div
                  class="ml-2 pt-2 secondarytext--text title font-weight-bold"
                >
                  {{ user.profile.project_count }}
                </div>
              </v-row>

              <v-row
                v-if="totalDonation != null"
                no-gutters
                align="baseline"
                class="px-4"
              >
                <div class="pt-2 secondarytext--text body-2">
                  Переведено
                </div>
                <div class="ml-2 accent--text title font-weight-bold">
                  <animated-number
                    :value="totalDonation"
                    :formatValue="formatUnits"
                    :duration="500"
                  />
                </div>
              </v-row>
            </v-col>
          </v-row>

          <v-spacer
            class="pb-8 hidden-xs-only"
            v-if="totalDonation == null"
          ></v-spacer>
          <v-spacer class="pb-4 hidden-sm-and-up"></v-spacer>

          <v-row no-gutters justify="center" class="pt-3 pb-1 px-4">
            <div class="secondarytext--text body-2 font-weight-medium">
              Статистика участия
            </div>
          </v-row>
          <v-divider></v-divider>
          <v-row
            no-gutters
            justify="center"
            class="my-1"
            v-if="IS_PROJECT_TYPE_LOADED && user"
          >
            <v-col
              sm="2"
              v-for="(project_type, index) in PROJECT_TYPE"
              :key="index"
            >
              <v-sheet class="mx-2">
                <v-row align="center" justify="center" no-gutters>
                  <type-icon
                    :size="24"
                    :type="project_type"
                    :withTooltip="true"
                  />
                  <div class="secondarytext--text body-1 py-1 pl-2">
                    {{ get_count(project_type) }}
                  </div>
                </v-row>
              </v-sheet>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.userImage {
  width: 250px;
  height: 250px;
}
</style>

<script>
import { mapGetters } from "vuex";
import TypeIcon from "../lib/typeIcon";
import AnimatedNumber from "animated-number-vue";
import { AUTH_LOGOUT } from "../../store/actions/auth";
import { PROJECT_TYPE_REQUEST } from "../../store/actions/projectType";

export default {
  name: "UserCard",
  components: {
    TypeIcon,
    AnimatedNumber
  },
  created() {
    if (!this.IS_PROJECT_TYPE_LOADED) {
      this.$store.dispatch(PROJECT_TYPE_REQUEST);
    }
  },
  computed: {
    ...mapGetters(["IS_PROJECT_TYPE_LOADED", "PROJECT_TYPE"]),
    cardElevation() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 1;
        case "sm":
          return 1;
        default:
          return 8;
      }
    }
  },
  methods: {
    formatUnits(value) {
      return value.toFixed() + "₽";
    },
    get_count(project_type) {
      for (let obj of this.user.profile.participation) {
        if (obj.id == project_type.id) {
          return obj.count;
        }
      }
      return 0;
    },
    logout() {
      this.$store.dispatch(AUTH_LOGOUT);
      this.$router.push("/login");
    }
  },
  data() {
    return {};
  },
  props: {
    user: Object,
    totalDonation: Number
  }
};
</script>
