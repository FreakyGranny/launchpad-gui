<template>
  <div>
    <loading v-if="loading" />
    <div class="md-layout explore-grid">
      <div
        class="md-layout-item md-large-size-25 md-medium-size-30 md-small-hide explore-filter"
      >
        <md-list>
          <md-list-item>Plain Text</md-list-item>
          <md-list-item>Button</md-list-item>
          <md-list-item href="https://google.com" target="_blank"
            >Link</md-list-item
          >
          <md-list-item to="/components/list" exact
            >Router <code>/</code></md-list-item
          >
          <md-list-item to="/components/list/router"
            >Router <code>/router/**</code></md-list-item
          >
        </md-list>
      </div>
      <div
        class="md-layout-item md-large-size-75 md-medium-size-70 md-small-size-100 md-xsmall-hide"
      >
        <div v-if="isAuthenticated" class="md-layout">
          <feed-item
            v-for="(feed, index) in fakeFeed"
            :key="index"
            :feed="feed"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.explore-grid {
  margin: auto;
  max-width: 1200px;
}
.explore-filter {
  padding-right: 50px;
}
</style>

<script>
import fakeFeed from "./fakeFeed";
import FeedItem from "./feedItem.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    FeedItem
  },
  name: "home",
  computed: {
    ...mapGetters(["isAuthenticated", "authStatus"]),
    loading: function() {
      return this.authStatus === "loading" && !this.isAuthenticated;
    }
  },
  data() {
    return { fakeFeed };
  }
};
</script>
