<template>
  <v-row no-gutters>
    <div
      :style="heightControl"
      class="project-image project-image-md hidden-sm-and-down"
    >
      <img class="blur" v-bind:src="imageSrc" alt="project background" />
      <v-img contain class="img" v-bind:src="imageSrc" alt="project image" />
    </div>
    <div class="project-image project-image-sm d-none d-sm-flex d-md-none">
      <img class="blur" v-bind:src="imageSrc" alt="project background" />
      <v-img contain class="img" v-bind:src="imageSrc" alt="project image" />
    </div>
    <div class="project-image project-image-xs hidden-sm-and-up">
      <img class="blur" v-bind:src="imageSrc" alt="project background" />
      <v-img contain class="img" v-bind:src="imageSrc" alt="project image" />
    </div>
  </v-row>
</template>

<style scoped>
.blur {
  position: absolute;
  /* top: 50%;
  left: 50%; */
  transform: translate(-5%, -5%);
  /* display: block; */
  width: 110%;
  height: 110%;
  max-width: 110%;
  max-height: 110%;
  object-fit: cover;
  filter: blur(5px);
}
.img {
  position: relative;
  /* display: block; */
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}
.project-image {
  z-index: 1;
  min-width: 264px;
  position: relative;
  width: 100%;
  overflow: hidden;
}
.project-image-md {
  min-height: 200px;
  max-height: 356px;
  height: 37vw;
}
.project-image-sm {
  min-height: 200px;
  max-height: 356px;
  height: 42vw;
}
.project-image-xs {
  min-height: 160px;
  max-height: 55vw;
  height: 50vw;
}
</style>

<script>
export default {
  name: "ProjectPicture",
  data() {
    return {};
  },
  computed: {
    heightControl() {
      switch (this.$vuetify.breakpoint.name) {
        case "md":
          return { maxHeight: "362px" };
        default:
          if (this.withOffset) {
            return { maxHeight: "318px" };
          } else {
            return { maxHeight: "362px" };
          }
      }
    }
  },
  props: {
    imageSrc: String,
    withOffset: Boolean
  }
};
</script>
