<template>
  <span
    class="status-text-color"
    :class="{
      'status-color-green': !isFail,
      'status-color-gray': isFail
    }"
    >{{ getStatus }}</span
  >
</template>

<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine";

.status-color-green {
  color: md-get-palette-color(green, 700);
}
.status-color-gray {
  color: md-get-palette-color(gray, 700);
}
</style>

<script>
export default {
  name: "Status",
  computed: {
    getStatus() {
      if (this.sourceStatus in this.statusMap) {
        return this.statusMap[this.sourceStatus];
      }
      return "НЕ ИЗВЕСТЕН";
    },
    isFail() {
      if (this.sourceStatus == "fail") {
        return true;
      }
      return false;
    }
  },
  data() {
    return {
      statusMap: {
        draft: "ЧЕРНОВИК",
        success: "УСПЕШЕН",
        fail: "ЗАКРЫТ",
        search: "ПОИСК УЧАСТНИКОВ",
        harvest: "СБОР СРЕДСТВ"
      }
    };
  },
  props: { sourceStatus: String }
};
</script>
