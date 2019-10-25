<template>
  <div class="project-card md-layout-item">
    <router-link v-bind:to="'/project/' + params.id">
      <md-card md-with-hover>
        <md-ripple>
          <md-card-media>
            <img class="img" v-bind:src="params.image_link" alt="People" />
          </md-card-media>
          <md-card-content>
            <div class="md-layout md-alignment-center">
              <div class="md-layout-item md-size-100 status-area">
                <b>
                  <span class="status-text">ПОИСК УЧАСТНИКОВ</span>
                </b>
              </div>
              <div class="md-layout-item md-size-100">
                <md-divider></md-divider>
              </div>
              <div class="md-layout-item md-size-100 title-area">
                <b>
                  <span class="title-text">{{
                    params.title.length > 25
                      ? params.title.slice(0, 25) + "..."
                      : params.title
                  }}</span>
                </b>
              </div>
              <div class="md-layout-item md-size-100 subtitle-area">
                <span class="subtitle-text">{{
                  params.subtitle.length > 55
                    ? params.subtitle.slice(0, 55) + "..."
                    : params.subtitle
                }}</span>
              </div>
              <div class="md-layout-item md-size-100 category-area">
                <b>
                  <span class="category-text">ВИДЕО ИГРЫ</span>
                </b>
              </div>
              <div class="md-layout-item md-size-100">
                <div class="md-layout">
                  <div class="md-layout-item">
                    <span class="md-body-2">{{ params.total }}₽ </span>
                    <span class="md-caption">собрано</span>
                  </div>
                  <div class="md-layout-item right-text">
                    <span class="md-body-1">{{ params.percent }}%</span>
                  </div>
                </div>
                <md-progress-bar
                  class="md-accent"
                  md-mode="determinate"
                  v-bind:md-value="params.percent"
                ></md-progress-bar>
              </div>
              <div class="md-layout-item md-size-100 days-area">
                <md-icon>access_time</md-icon>
                <span class="md-body-1 middle-text">21 день остался</span>
              </div>
            </div>
          </md-card-content>
        </md-ripple>
      </md-card>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine";

.project-card {
  padding: 1em;
}
.img {
  object-fit: cover;
  width: 250px;
  height: 250px;
}
.md-icon {
  width: 16px;
  min-width: 16px;
  height: 16px;
  font-size: 16px !important;
}
.md-card {
  object-fit: cover;
  width: 250px;
  height: 500px;
}
.md-card-content {
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 15px;
}
.md-progress-bar {
  height: 8px;
  border-radius: 4px;
}
.status-text {
  font-size: 12px;
  color: md-get-palette-color(green, 700);
}
.title-text {
  font-size: 15px;
}
.subtitle-text {
  font-size: 13px;
  color: md-get-palette-color(gray, 600);
}
.category-text {
  font-size: 12px;
  color: md-get-palette-color(deeppurple, 600);
}
.middle-text {
  vertical-align: middle;
  margin-left: 5px;
}
.status-area {
  padding-bottom: 10px;
}
.title-area {
  padding-top: 10px;
  padding-bottom: 5px;
}
.subtitle-area {
  padding-top: 5px;
  padding-bottom: 5px;
  height: 50px;
}
.category-area {
  padding-top: 7px;
  padding-bottom: 7px;
}
.right-text {
  text-align: right;
}
.days-area {
  padding-top: 15px;
}
</style>
<script>
export default {
  name: "ProjectCard",
  props: { params: Object }
};
</script>
