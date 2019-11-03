<template>
  <div>
    <div class="header header-create">
      <span class="white-text">Новый проект</span>
    </div>

    <div
      v-if="IS_PROJECT_TYPE_LOADED"
      class="md-layout md-alignment-top-center create-grid"
    >
      <div
        class="md-layout-item project-type-card"
        v-for="(project_type, index) in PROJECT_TYPE"
        :key="index"
      >
        <div @click="onClickCard(project_type.id)">
          <project-type-card
            :name="project_type.name"
            :options="project_type.options"
            :typeId="project_type.id"
          />
        </div>
      </div>
    </div>
    <md-dialog-alert
      v-if="selectedType"
      :md-active.sync="modal"
      :md-title="selectedType.toString()"
      md-content="Your post <strong>Material Design is awesome</strong> has been created."
    />
  </div>
</template>

<style scoped>
.header-create {
  background-image: url("/images/create.jpg");
}
.project-type-card {
  padding: 20px;
  flex: none;
}
.create-grid {
  padding-top: 50px;
  padding-bottom: 50px;
  margin: auto;
}
</style>

<script>
import { mapGetters } from "vuex";
import ProjectTypeCard from "./ProjectTypeCard";

export default {
  name: "create",
  components: {
    ProjectTypeCard
  },
  computed: {
    ...mapGetters(["IS_PROJECT_TYPE_LOADED", "PROJECT_TYPE"])
  },
  methods: {
    onClickCard(typeId) {
      this.selectedType = typeId;
      this.modal = !this.modal;
    }
  },
  data() {
    return {
      modal: false,
      selectedType: null
    };
  }
};
</script>
