<template>
  <v-row align="center" :justify="compact ? 'end' : 'center'" no-gutters>
    <v-icon v-if="compact" size="18" color="secondarytext">
      mdi-calendar-today
    </v-icon>
    <div v-if="compact" class="ml-1 secondarytext--text">
      {{ formatDate }}
    </div>
    <v-col class="pa-2" v-if="!compact" cols="12" sm="6" xs="12">
      <v-row no-gutters justify="center">
        <v-icon size="30" color="white">
          mdi-calendar-today
        </v-icon>
        <div class="ml-1 my-auto white--text">
          {{ formatDate }}
        </div>
        <v-icon class="ml-6" size="30" color="white">
          mdi-clock-outline
        </v-icon>
        <div class="ml-1 my-auto white--text">
          {{ formatTime }}
        </div>
      </v-row>
    </v-col>
  </v-row>
</template>

<style scoped></style>

<script>
import moment from "moment";
import "moment/locale/ru";

export default {
  name: "Datetime",
  computed: {
    formatDate() {
      if (!this.datetime) {
        return "-- --";
      }
      moment.locale("ru");
      let date = moment(this.datetime, "YYYY-MM-DD hh:mm");
      if (this.compact) {
        return date.format("DD MMM");
      }
      return date.format("DD MMMM");
    },
    formatTime() {
      if (!this.datetime) {
        return "--:--";
      }
      moment.locale("ru");
      let date = moment(this.datetime, "YYYY-MM-DD h:mm");
      return date.format("HH:mm");
    }
  },
  data() {
    return {};
  },
  props: {
    datetime: String,
    compact: Boolean
  }
};
</script>
