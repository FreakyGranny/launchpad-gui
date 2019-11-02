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
        <md-card md-with-hover md-inset>
          <md-card-header>
            <md-icon class="md-size-2x">thumb_up</md-icon>
          </md-card-header>

          <md-card-content>
            <div class="md-subheading">{{ project_type.name }}</div>
            {{ project_type.description }}
          </md-card-content>
        </md-card>
      </div>
    </div>
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
  padding-top: 100px;
  padding-bottom: 100px;
  margin: auto;
}
.md-card {
  object-fit: cover;
  width: 273px;
  height: 273px;
  /* border-radius: 0px; */
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
  name: "create",
  computed: {
    ...mapGetters(["IS_PROJECT_TYPE_LOADED", "PROJECT_TYPE"])
  }
};
</script>
