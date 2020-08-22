<template>
  <v-sheet color="transparent" width="100%">
    <slot v-if="!editable"></slot>
    <v-dialog v-if="editable" v-model="dialog" width="290px">
      <template v-slot:activator="{ on }">
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card v-on="on" flat color="transparent">
              <slot></slot>
              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="lightprimary">
                  <div class="primary icon-background">
                    <v-icon color="white">mdi-pencil-circle</v-icon>
                  </div>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
      </template>
      <v-date-picker
        v-if="fieldType == 'date'"
        v-model="newValue"
        locale="ru-ru"
        :first-day-of-week="1"
        @input="validate"
        :min="minAllowedDate"
        :max="maxAllowedDate"
      />
      <datetime-picker
        v-if="fieldType == 'datetime'"
        v-model="newValue"
        clearText="Сбросить"
        okText="Подтвердить"
        @input="validate"
        :datePickerProps="{
          firstDayOfWeek: 1,
          min: minAllowedEventDate(minDate),
          max: maxAllowedDate,
          locale: 'ru-ru'
        }"
        :time-picker-props="{
          format: '24hr',
          allowedMinutes: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
        }"
      />
    </v-dialog>
  </v-sheet>
</template>

<style>
.icon-background {
  border-radius: 18px !important;
}
</style>

<script>
import projectFields from "../lib/projectFields";
import DatetimePicker from "../lib/DateTimePicker";

export default {
  name: "EditPopup",
  extends: projectFields,
  components: {
    DatetimePicker
  },
  data() {
    return {
      dialog: false,
      makeRequest: false,
      newValue: this.value
    };
  },
  props: {
    editable: Boolean,
    fieldType: String,
    fieldName: String,
    maxLength: Number,
    minDate: String,
    value: String
  },
  computed: {
    changed() {
      return this.value !== this.newValue;
    }
  },
  methods: {
    handleAbort() {
      this.newValue = this.value;
      this.menu = false;
    },
    validate() {
      this.editField();
      this.dialog = false;
    },
    editField() {
      this.makeRequest = true;
      let data = {};
      data[this.fieldName] = this.newValue;
      if (this.fieldName == "event_date" && this.newValue == null) {
        data["drop_event_date"] = true;
      }
      this.axios
        .patch("/project/" + this.$route.params.id, data)
        // eslint-disable-next-line no-unused-vars
        .then(resp => {
          this.$emit("reload");
          this.makeRequest = false;
        })
        .catch(error => {
          this.$emit("error", error);
          this.makeRequest = false;
        });
    }
  }
};
</script>
