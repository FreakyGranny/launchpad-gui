<template>
  <v-sheet color="transparent" height="100%" class="ma-5">
    <v-row class="fill-height" align="end" justify="center">
      <v-col>
        <v-row no-gutters justify="end">
          <div class="ml-10 pl-10 primarytext--text text-right display-4">
            {{ project.title }}
          </div>
        </v-row>
        <v-row no-gutters justify="end">
          <div class="pa-4">
            <type-icon
              :size="100"
              :type="project.project_type"
              :withTooltip="false"
            />
          </div>
          <div class="py-4 pl-4">
            <category-icon
              :size="100"
              :category="project.category"
              :withTooltip="false"
              :primary="true"
            />
          </div>
        </v-row>

        <v-row no-gutters justify="end">
          <div
            class="subtitle-area py-12 secondarytext--text text-right font-weight-light display-2"
          >
            {{ project.subtitle }}
          </div>
        </v-row>
        <v-card flat height="35%" width="96%" class="ml-10 qr-area">
          <v-row no-gutters>
            <qr-code
              size="300"
              :text="'https://kickstarter.k8s.2gis.dev/project/' + project.id"
            ></qr-code>
            <v-col class="py-5" :class="barClass">
              <status
                class="py-12 text-center display-2"
                :sourceStatus="project.status"
                :noColor="true"
              />
              <div
                class="py-5 white--text text-center font-weight-regular display-3"
              >
                {{ project.percent }}%
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col>
        <v-row no-gutters justify="end" class="mr-7">
          <v-sheet color="transparent" height="80vh" width="80vh">
            <v-img
              class="promo-image grey lighten-5"
              height="80vh"
              width="80vh"
              v-bind:src="project.image_link"
            />
          </v-sheet>

          <v-avatar size="200">
            <img
              class="outlined grey lighten-5"
              v-bind:src="project.owner.avatar"
              onerror="this.onerror=null;this.src='/images/avatar.png';"
              alt="Author avatar"
            />
          </v-avatar>
        </v-row>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style scoped>
.promo-image {
  border-radius: 50%;
  border: 10px solid;
}
.outlined {
  border: 10px solid;
  margin-top: -30vh;
  width: 20vh;
  height: 20vh;
}
.subtitle-area {
  height: 25vh;
}
.qr-area {
  margin-bottom: 15vh;
}
</style>

<script>
import TypeIcon from "../lib/typeIcon";
import CategoryIcon from "../lib/categoryIcon";
import Status from "../lib/status";
import { STATUS_SUCCESS } from "../lib/const/status";
export default {
  name: "ProjectPromo",
  components: {
    TypeIcon,
    CategoryIcon,
    Status
  },
  computed: {
    isSuccess() {
      if (this.project.status == STATUS_SUCCESS) {
        return true;
      }
      return false;
    },
    barClass() {
      return this.isSuccess ? "secondary" : "accent";
    }
  },
  props: {
    project: Object
  }
};
</script>
