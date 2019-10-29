<template>
  <div
    class="header"
    v-if="IS_CATEGORY_LOADED"
    v-bind:style="{ 'background-image': 'url(' + imageUrl + ')' }"
  >
    <span class="white-text">{{ text }}</span>
  </div>
</template>

<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine";
.white-text {
  font-size: 42px;
  color: md-get-palette-color(white, 400);
}
.header {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 150px;
  text-align: center;
  line-height: 150px;
}
</style>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BgHeader",
  computed: {
    ...mapGetters(["IS_CATEGORY_LOADED", "CATEGORY"]),
    curCategory() {
      return this.CATEGORY[this.categoryId];
    },
    text() {
      try {
        return this.curCategory.name;
      } catch {
        return "Все проекты";
      }
    },
    imageUrl() {
      try {
        return this.picMap[this.curCategory.alias];
      } catch {
        return "/images/campaign.jpg";
      }
    }
  },
  data() {
    return {
      picMap: {
        default: "/images/default.jpg",
        video_games: "/images/videogames.jpg",
        board_games: "/images/tabletop.jpg",
        party: "/images/party.jpg",
        quest: "/images/quest.jpg",
        journey: "/images/travel.jpg"
      }
    };
  },
  props: {
    categoryId: String
  }
};
</script>
