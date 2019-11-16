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
      <div class="primarytext--text ml-1">
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
      let daysDiff = release.diff(moment(), "day");
      return daysDiff > 0 ? daysDiff : 0;
    },
    getText() {
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
