<template>
  <div :class="statusClass">
    {{ getStatus }}
  </div>
</template>

<style scoped></style>

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
        (map[STATUS_FAIL] = "ЗАВЕРШЁН"),
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
    },
    statusClass() {
      if (this.noColor) {
        return "white--text";
      }
      return this.isFail ? "secondarytext--text" : "accent--text";
    }
  },
  data() {
    return {};
  },
  props: {
    sourceStatus: String,
    noColor: Boolean
  }
};
</script>
