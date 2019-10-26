<template>
  <div>
    <md-icon v-if="withIcon">access_time</md-icon>
    <span class="counter-style" v-if="daysLeft > 0 && !ended">{{
      daysLeft
    }}</span>
    <span class="text-style">{{ getText }}</span>
  </div>
</template>

<style scoped>
.md-icon {
  width: 16px;
  min-width: 16px;
  height: 16px;
  font-size: 16px !important;
}
.counter-style {
  margin-left: 4px;
  vertical-align: middle;
  font-weight: 500;
}
.text-style {
  margin-left: 4px;
  vertical-align: middle;
}
</style>

<script>
import moment from "moment";
import "moment/locale/ru";

export default {
  name: "DaysCounter",
  computed: {
    daysLeft() {
      let release = moment(this.endDate, "YYYY-MM-DD");
      let daysDiff = release.diff(moment(), "day");
      return daysDiff > 0 ? daysDiff : 0;
    },
    getText() {
      if (this.ended) {
        return "завершен";
      }
      if (this.daysLeft == 0) {
        return "последний день";
      }
      let cases = [2, 0, 1, 1, 1, 2];
      let titles = ["день остался", "дня осталось", "дней осталось"];
      return titles[
        this.daysLeft % 100 > 4 && this.daysLeft % 100 < 20
          ? 2
          : cases[this.daysLeft % 10 < 5 ? this.daysLeft % 10 : 5]
      ];
    }
  },
  data() {
    return {};
  },
  props: {
    endDate: String,
    withIcon: Boolean,
    ended: Boolean
  }
};
</script>
