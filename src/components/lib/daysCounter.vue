<template>
  <v-row
    :align="alignBottom ? 'baseline' : 'center'"
    :justify="justifyEnd ? 'end' : 'start'"
    no-gutters
  >
    <v-col cols="1" v-if="withIcon">
      <v-icon size="18" color="primarytext">
        {{ ended ? "mdi-timer-off" : "mdi-timer" }}
      </v-icon>
    </v-col>
    <v-col cols="auto" v-if="daysLeft > 0 && !ended">
      <div class="primarytext--text font-weight-bold ml-1">
        {{ daysLeft }}
      </div>
    </v-col>
    <v-col cols="auto" v-if="!ended">
      <div
        class="ml-1"
        :class="daysLeft < 0 ? 'error--text' : 'primarytext--text'"
      >
        {{ getText }}
      </div>
    </v-col>
  </v-row>
</template>

<style scoped></style>

<script>
import moment from "moment";
import "moment/locale/ru";

export default {
  name: "DaysCounter",
  computed: {
    daysLeft() {
      let release = moment(this.endDate, "YYYY-MM-DD");
      return release.diff(moment(), "day");
    },
    getText() {
      if (this.daysLeft < 0) {
        return "время вышло";
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
    ended: Boolean,
    alignBottom: Boolean,
    justifyEnd: Boolean
  }
};
</script>
