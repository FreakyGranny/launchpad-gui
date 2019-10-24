<template>
  <div>
    <load-spinner v-if="loading"></load-spinner>
    <div class="md-layout project-grid" v-if="!loading">
      <div class="md-layout-item md-size-60 md-small-hide project-image">
        <img
          class="blur"
          v-bind:src="project.image_link"
          alt="project background"
        />
        <img class="img" v-bind:src="project.image_link" alt="project image" />
      </div>
      <div class="project-description md-layout-item">
        <md-list>
          <md-list-item>Plain Text</md-list-item>
          <md-list-item>Button</md-list-item>
          <md-list-item href="https://google.com" target="_blank"
            >Link</md-list-item
          >
          <md-list-item to="/explore" exact
            >Router <code>explore</code></md-list-item
          >
          <md-list-item to="/components/list/router"
            >Router <code>/router/**</code></md-list-item
          >
        </md-list>
      </div>
      <div class="md-layout-item project-tabs">
        <md-tabs>
          <md-tab id="tab-home" md-label="Описание">
            Home Tab
          </md-tab>

          <md-tab id="tab-pages" md-label="Участники">
            Pages tab
            <p>
              Unde provident nemo reiciendis officia, possimus repellendus.
              Facere dignissimos dicta quis rem. Aliquam aspernatur dolor atque
              nisi id deserunt laudantium quam repellat.
            </p>
          </md-tab>

          <md-tab id="tab-posts" md-label="Комментарии">
            Posts tab
            <p>
              Qui, voluptas repellat impedit ducimus earum at ad architecto
              consectetur perferendis aspernatur iste amet ex tempora animi,
              illum tenetur quae assumenda iusto.
            </p>
          </md-tab>
        </md-tabs>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-grid {
  margin: auto;
  max-width: 1200px;
  padding-top: 30px;
}
.project-image {
  height: 450px;
  position: relative;
  width: 100%;
  overflow: hidden;
}
.project-description {
  margin-left: 40px;
  height: 450px;
}
.project-tabs {
  margin: auto;
  max-width: 800px;
  padding-top: 50px;
}
.blur {
  position: absolute;
  /* top: 50%;
  left: 50%; */
  transform: translate(-5%, -5%);
  display: block;
  width: 110%;
  max-width: 110%;
  max-height: 110%;
  object-fit: cover;
  filter: blur(5px);
}
.img {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: top;
}
</style>

<script>
import axios from "axios";
import LoadSpinner from "../lib/loading";

export default {
  components: {
    LoadSpinner
  },
  name: "project",
  created() {
    this.project = this.getProject();
  },
  methods: {
    getProject() {
      this.loading = true;
      axios({ url: "/project/" + this.$route.params.id })
        .then(resp => {
          this.project = resp.data;
          this.loading = false;
        })
        .catch(resp => {
          this.error = resp.data;
          this.loading = false;
        });
    }
  },
  data() {
    return {
      loading: true,
      error: null,
      project: null
    };
  }
};
</script>
