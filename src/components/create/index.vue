<template>
  <div>
    <v-parallax height="150" src="/images/create.jpg">
      <v-row align="center" justify="center">
        <div class="white--text display-1">
          Новый проект
        </div>
      </v-row>
    </v-parallax>
    <load-spinner :overlay="!IS_PROJECT_TYPE_LOADED" />
    <v-container
      class="fill-height type-container"
      v-if="IS_PROJECT_TYPE_LOADED"
      fluid
    >
      <v-row align="baseline" justify="center">
        <v-col xl="9" lg="11" md="12" sm="10">
          <v-row align="center" justify="center">
            <v-col v-for="(project_type, index) in PROJECT_TYPE" :key="index">
              <v-row justify="center" no-gutters>
                <project-type-card
                  :name="project_type.name"
                  :options="project_type.options"
                  :type="project_type"
                  @click="onClickCard(project_type.id)"
                />
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-row justify="center">
      <v-dialog v-model="dialog" scrollable persistent max-width="650px">
        <create-form
          :type="PROJECT_TYPE[selectedType]"
          @close="handleCloseDialog"
        />
      </v-dialog>
    </v-row>
  </div>
</template>

<style scoped>
.type-container {
  min-height: calc(100vh - 262px);
}
</style>

<script>
import { mapGetters } from "vuex";
import LoadSpinner from "../lib/loading";
import ProjectTypeCard from "./ProjectTypeCard";
import CreateForm from "./CreateForm";

export default {
  name: "create",
  components: {
    CreateForm,
    ProjectTypeCard,
    LoadSpinner
  },
  computed: {
    ...mapGetters(["IS_PROJECT_TYPE_LOADED", "PROJECT_TYPE"])
  },
  methods: {
    onClickCard(typeId) {
      this.selectedType = typeId;
      this.dialog = !this.dialog;
    },
    handleCloseDialog() {
      this.dialog = false;
    }
  },
  data() {
    return {
      dialog: false,
      selectedType: null
    };
  }
};
</script>
