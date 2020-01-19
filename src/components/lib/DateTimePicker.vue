<template>
  <v-card tile>
    <v-card-text class="px-0 py-0">
      <v-tabs fixed-tabs v-model="activeTab">
        <v-tab key="calendar">
          <slot name="dateIcon">
            <v-icon>event</v-icon>
          </slot>
        </v-tab>
        <v-tab key="timer" :disabled="dateSelected">
          <slot name="timeIcon">
            <v-icon>access_time</v-icon>
          </slot>
        </v-tab>
        <v-tab-item key="calendar">
          <v-date-picker
            class="elevation-0 pa-0 container"
            v-model="date"
            v-bind="datePickerProps"
            @input="showTimePicker"
            full-width
          ></v-date-picker>
        </v-tab-item>
        <v-tab-item key="timer">
          <v-time-picker
            ref="timer"
            class="elevation-0 pa-0 container"
            v-model="time"
            v-bind="timePickerProps"
            full-width
          ></v-time-picker>
        </v-tab-item>
      </v-tabs>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <slot name="actions" :parent="this">
        <v-btn tile color="primary" text @click.native="clearHandler">{{
          clearText
        }}</v-btn>
        <v-btn tile color="accent" text @click="okHandler">{{ okText }}</v-btn>
      </slot>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.container {
  height: 390px;
}
</style>

<script>
import moment from "moment";

const DEFAULT_DATE = "";
const DEFAULT_TIME = "00:00:00";
const DEFAULT_DATE_FORMAT = "YYYY-MM-DD";
const DEFAULT_TIME_FORMAT = "HH:mm:ss";
const DEFAULT_CLEAR_TEXT = "CLEAR";
const DEFAULT_OK_TEXT = "OK";

export default {
  name: "datetime-picker",
  model: {
    prop: "datetime",
    event: "input"
  },
  props: {
    datetime: {
      type: [Date, String],
      default: null
    },
    dateFormat: {
      type: String,
      default: DEFAULT_DATE_FORMAT
    },
    timeFormat: {
      type: String,
      default: "HH:mm"
    },
    clearText: {
      type: String,
      default: DEFAULT_CLEAR_TEXT
    },
    okText: {
      type: String,
      default: DEFAULT_OK_TEXT
    },
    datePickerProps: {
      type: Object
    },
    timePickerProps: {
      type: Object
    }
  },
  data() {
    return {
      activeTab: 0,
      date: DEFAULT_DATE,
      time: DEFAULT_TIME
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    dateTimeFormat() {
      return this.dateFormat + " " + this.timeFormat;
    },
    defaultDateTimeFormat() {
      return DEFAULT_DATE_FORMAT + " " + DEFAULT_TIME_FORMAT;
    },
    formattedDatetime() {
      return this.selectedDatetime
        ? moment(this.selectedDatetime).format(this.dateTimeFormat)
        : "";
    },
    selectedDatetime() {
      if (this.date && this.time) {
        let datetimeString = this.date + " " + this.time;
        if (this.time.length === 5) {
          datetimeString += ":00";
        }
        return moment(datetimeString).format(this.defaultDateTimeFormat);
      } else {
        return null;
      }
    },
    dateSelected() {
      return !this.date;
    }
  },
  methods: {
    init() {
      if (!this.datetime) {
        return;
      }

      let initDateTime;
      if (this.datetime instanceof Date) {
        initDateTime = this.datetime;
      } else if (
        typeof this.datetime === "string" ||
        this.datetime instanceof String
      ) {
        // see https://stackoverflow.com/a/9436948
        initDateTime = moment(this.datetime).format(this.dateTimeFormat);
      }

      this.date = moment(initDateTime).format(DEFAULT_DATE_FORMAT);
      this.time = moment(initDateTime).format(DEFAULT_TIME_FORMAT);
    },
    okHandler() {
      this.resetPicker();
      this.$emit("input", this.selectedDatetime);
    },
    clearHandler() {
      this.resetPicker();
      this.date = DEFAULT_DATE;
      this.time = DEFAULT_TIME;
      this.$emit("input", null);
    },
    resetPicker() {
      this.activeTab = 0;
      if (this.$refs.timer) {
        this.$refs.timer.selectingHour = true;
      }
    },
    showTimePicker() {
      this.activeTab = 1;
    }
  },
  watch: {
    datetime: function() {
      this.init();
    }
  }
};
</script>
