<template>
  <v-card tile class="fill-height">
    <v-card-title>
      <span class="headline">{{ title }}</span>
    </v-card-title>
    <v-window v-model="step">
      <v-window-item :value="1">
        <v-card-text class="card-text-area">
          <v-form ref="form" v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="payload.title"
                    label="Название"
                    counter
                    maxlength="25"
                    :rules="[rules.required]"
                    clearable
                    clear-icon="mdi-close-circle"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="payload.subtitle"
                    label="Подзаголовок"
                    counter
                    maxlength="50"
                    :rules="[rules.required]"
                    clearable
                    clear-icon="mdi-close-circle"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="payload.image_link"
                    label="Обложка (ссылка)"
                    hint="https ссылка на картинку"
                    :rules="[rules.required, checkLink]"
                    clearable
                    clear-icon="mdi-close-circle"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="payload.category"
                    v-if="IS_CATEGORY_LOADED"
                    :items="categoryArray"
                    :rules="[rules.required]"
                    no-data-text="no category"
                    item-text="name"
                    item-value="id"
                    label="Категория проекта"
                    outlined
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-dialog v-model="releaseDateDialog" width="290px">
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="payload.release_date"
                        prepend-icon="mdi-calendar-search"
                        hint="Дата завершения поиска"
                        persistent-hint
                        readonly
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      v-model="payload.release_date"
                      locale="ru-ru"
                      :first-day-of-week="1"
                      @input="releaseDateDialog = false"
                      :min="minAllowedDate"
                      :max="maxAllowedDate"
                    />
                  </v-dialog>
                </v-col>
                <v-col cols="12" sm="4" md="4" v-if="type.goal_by_amount">
                  <v-text-field
                    label="Сумма"
                    v-model="payload.goal_amount"
                    :step="250"
                    :rules="[rules.required, rules.minAmount]"
                    prepend-icon="mdi-currency-rub"
                    hint="Цель в рублях"
                    single-line
                    type="number"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4" v-if="type.goal_by_people">
                  <v-text-field
                    label="Цель"
                    prepend-icon="mdi-account-group"
                    :rules="[rules.required, rules.minPeople]"
                    v-model="payload.goal_people"
                    hint="Минимальное количество участников"
                    single-line
                    type="number"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4" v-if="!type.goal_by_amount">
                  <v-dialog v-model="eventDateDialog" width="290px">
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="payload.event_date"
                        prepend-icon="mdi-calendar-today"
                        hint="Дата/время проведения"
                        persistent-hint
                        readonly
                        v-on="on"
                      />
                    </template>
                    <datetime-picker
                      v-model="payload.event_date"
                      clearText="Сбросить"
                      okText="Подтвердить"
                      @input="eventDateDialog = false"
                      :datePickerProps="{
                        firstDayOfWeek: 1,
                        min: minAllowedDate,
                        max: maxAllowedDate,
                        locale: 'ru-ru'
                      }"
                      :time-picker-props="{
                        format: '24hr',
                        allowedMinutes: [
                          0,
                          5,
                          10,
                          15,
                          20,
                          25,
                          30,
                          35,
                          40,
                          45,
                          50,
                          55
                        ]
                      }"
                    />
                  </v-dialog>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <v-spacer></v-spacer>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="2">
        <v-card-text class="pb-0 card-text-area">
          <v-container>
            <v-row>
              <v-col cols="12">
                <div class="pb-2 primary--text body-1">
                  Инструкции для участников
                </div>
                <tiptap-vuetify
                  v-model="payload.instructions"
                  :extensions="instruction_extensions"
                  :card-props="{ flat: true, color: 'grey lighten-4' }"
                  :toolbar-attributes="{ color: 'grey lighten-4' }"
                  :placeholder="instructionPlaceholder"
                  min-height="90"
                />
                <v-alert
                  text
                  tile
                  dense
                  type="error"
                  icon="mdi-text-subject"
                  v-if="instructionInvalid"
                >
                  <div class="body-2">
                    {{ checkInstructions(payload.instructions) }}
                  </div>
                </v-alert>
              </v-col>
              <v-col cols="12">
                <div class="pb-2 primary--text body-1">О проекте</div>
                <tiptap-vuetify
                  v-model="payload.description"
                  :extensions="extensions"
                  :card-props="{ flat: true, color: 'grey lighten-4' }"
                  :toolbar-attributes="{ color: 'grey lighten-4' }"
                  placeholder="Расскажи о своем проекте, очень важно описать проект как можно подробнее."
                  min-height="120"
                />
                <v-alert
                  text
                  tile
                  dense
                  type="error"
                  icon="mdi-text-subject"
                  v-if="descriptionInvalid"
                >
                  <div class="body-2">
                    {{ checkDescription(payload.description) }}
                  </div>
                </v-alert>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-window-item>
    </v-window>
    <v-card-actions class="pa-7 pt-0">
      <v-col class="pa-0">
        <v-alert
          outlined
          dense
          type="error"
          prominent
          border="left"
          v-if="requestError"
        >
          {{ requestError }}
        </v-alert>
        <v-row no-gutters>
          <v-btn
            color="primary"
            tile
            outlined
            min-width="100"
            large
            @click="handleClose"
            >Отменить</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            color="accent"
            v-if="step == 1"
            tile
            outlined
            min-width="100"
            large
            @click="validate"
            >Далее</v-btn
          >
          <v-btn
            class="hidden-sm-and-down"
            color="secondarytext"
            v-if="step == 2"
            tile
            outlined
            min-width="100"
            large
            @click="step = 1"
            >Назад</v-btn
          >
          <v-btn
            color="accent"
            v-if="step == 2"
            tile
            min-width="100"
            large
            @click="create"
            :loading="makeRequest"
            >Создать</v-btn
          >
        </v-row>
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.card-text-area {
  min-height: 450px;
}
</style>

<script>
import projectFields from "../lib/projectFields";
import DatetimePicker from "../lib/DateTimePicker";
import moment from "moment";
import "moment/locale/ru";

export default {
  name: "createForm",
  extends: projectFields,
  components: {
    DatetimePicker
  },
  methods: {
    handleClose() {
      this.$emit("close");
      this.requestError = null;
      this.step = 1;
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.step++;
      }
    },
    create() {
      if (
        this.checkRichFields(
          this.payload.instructions,
          this.payload.description
        )
      ) {
        return;
      }

      if (!this.type.goal_by_amount) {
        this.payload.goal_amount = 0;
      }
      if (!this.type.goal_by_people) {
        this.payload.goal_people = 0;
      }
      if (this.type.goal_by_amount) {
        this.payload.event_date = null;
      }
      this.payload.project_type = this.type.id;

      this.makeRequest = true;
      this.axios
        .post("/project", this.payload)
        .then(resp => {
          this.makeRequest = false;
          this.$router.push({ name: "Project", params: { id: resp.data.id } });
        })
        .catch(error => {
          if (error.response.data) {
            this.requestError = error.response.data;
          } else {
            this.requestError =
              "Теперь надо делать всё с полной уверенностью. Я уверен, что нам полный ***ц!";
          }
          this.makeRequest = false;
        });
    }
  },
  computed: {
    title() {
      if (this.type.goal_by_amount) {
        return "Новая " + this.type.name.toLowerCase();
      } else {
        return "Новое " + this.type.name.toLowerCase();
      }
    }
  },
  data: () => ({
    step: 1,
    makeRequest: false,
    requestError: null,
    releaseDateDialog: false,
    eventDateDialog: false,
    valid: true,
    payload: {
      title: "",
      subtitle: "",
      release_date: moment()
        .add(7, "day")
        .format("YYYY-MM-DD"),
      event_date: null,
      category: "",
      goal_people: 4,
      goal_amount: 500,
      image_link: "",
      instructions: "",
      description: ""
    }
  })
};
</script>
