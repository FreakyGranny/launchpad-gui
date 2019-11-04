<template>
  <div class="outer">
    <div class="user-header">
      <div class="md-layout md-alignment-center inner">
        <md-content class="md-elevation-12 user-card">
          <div class="card-content md-layout md-alignment-top-left">
            <div class="md-layout-item md-size-40">
              <md-avatar class="avatar-custom">
                <img
                  v-bind:src="user.avatar"
                  onerror="this.onerror=null;this.src='/images/avatar.png';"
                  alt="Avatar"
                />
              </md-avatar>
            </div>
            <div class="md-layout-item md-size=60">
              <div class="md-display-1">
                {{ user.first_name }} {{ user.last_name }}
              </div>
              <md-divider class="divider-space" />
              <div class="md-layout">
                <div class="md-layout-item md-size-100 card-line">
                  <div class="md-subheading">Проектов</div>
                  <div class="md-subheading counter">
                    {{ user.profile.project_count }}
                  </div>
                </div>
              </div>
              <div class="md-layout bottom-link-bar">
                <md-button
                  :href="'https://planeta.2gis.ru/profile/' + user.username"
                  class="md-icon-button md-primary"
                >
                  <md-icon>language</md-icon>
                  <md-tooltip md-direction="bottom"
                    >Открыть профиль на планете</md-tooltip
                  >
                </md-button>
              </div>
            </div>
          </div>
          <md-content class="bottom-bar md-primary" />
        </md-content>
      </div>
    </div>
  </div>
</template>

<style scoped>
.outer {
  height: 400px;
}
.user-header {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("/images/keys.jpg");
  height: 300px;
  position: relative;
}
.inner {
  width: 100%;
  position: absolute;
  top: 60px;
}
.user-card {
  width: 800px;
  display: inline-block;
  vertical-align: top;
}
.card-content {
  margin: 30px;
}
.bottom-bar {
  height: 7px;
}
.divider-space {
  margin-top: 10px;
  margin-bottom: 10px;
}
.avatar-custom {
  min-width: 250px;
  min-height: 250px;
  border-radius: 0px;
}
.counter {
  font-weight: 700;
  padding-left: 1%;
}
.card-line {
  margin-top: 5px;
  padding-left: 15px;
  display: inline-flex;
}
.bottom-link-bar {
  margin-top: 120px;
}
</style>

<script>
export default {
  name: "UserCard",
  data() {
    return {};
  },
  props: {
    user: Object
  }
};
</script>
