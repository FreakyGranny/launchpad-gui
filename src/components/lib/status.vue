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
import {
  STATUS_DRAFT,
  STATUS_SUCCESS,
  STATUS_FAIL,
  STATUS_SEARCH,
  STATUS_HARVEST
} from "./const/status";

export default {
  name: "Status",
  computed: {
    statusMap() {
      let map = {};
      (map[STATUS_DRAFT] = "ЧЕРНОВИК"),
        (map[STATUS_SUCCESS] = "УСПЕШЕН"),
        (map[STATUS_FAIL] = "ЗАКРЫТ"),
        (map[STATUS_SEARCH] = "ПОИСК УЧАСТНИКОВ"),
        (map[STATUS_HARVEST] = "СБОР СРЕДСТВ");
      return map;
    },
    getStatus() {
      if (this.sourceStatus in this.statusMap) {
        return this.statusMap[this.sourceStatus];
      }
      return "НЕ ИЗВЕСТЕН";
    },
    isFail() {
      if (this.sourceStatus == STATUS_FAIL) {
        return true;
      }
      return false;
    }
  },
  data() {
    return {};
  },
  props: { sourceStatus: String }
};
</script>
