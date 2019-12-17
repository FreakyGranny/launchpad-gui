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
                    item-text="name"
                    item-value="id"
                    label="Категория проекта"
                    outlined
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="payload.release_date"
                        prepend-icon="mdi-calendar-question"
                        hint="Дата завершения"
                        persistent-hint
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="payload.release_date"
                      locale="ru-ru"
                      :first-day-of-week="1"
                      @input="menu = false"
                      :min="minAllowedDate"
                      :max="maxAllowedDate"
                    />
                  </v-menu>
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
                  v-if="instructionIsEmpty"
                >
                  <div class="body-2">
                    Это поле надо заполнить
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
                  placeholder="Расскажи о своем проекте …"
                  min-height="120"
                />
                <v-alert
                  text
                  tile
                  dense
                  type="error"
                  icon="mdi-text-subject"
                  v-if="descriptionIsEmpty"
                >
                  <div class="body-2">
                    Слишком короткое описание
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
import { mapGetters } from "vuex";
import moment from "moment";
import "moment/locale/ru";
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  HorizontalRule,
  History
} from "tiptap-vuetify";
import { CATEGORY_REQUEST } from "../../store/actions/category";

export default {
  name: "createForm",
  components: {
    TiptapVuetify
  },
  created() {
    if (!this.IS_CATEGORY_LOADED) {
      this.$store.dispatch(CATEGORY_REQUEST);
    }
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
    checkRichFields() {
      if (this.payload.instructions.length < 10) {
        this.instructionIsEmpty = true;
      } else {
        this.instructionIsEmpty = false;
      }
      if (this.payload.description.length < 20) {
        this.descriptionIsEmpty = true;
      } else {
        this.descriptionIsEmpty = false;
      }
      return this.instructionIsEmpty || this.descriptionIsEmpty;
    },
    create() {
      if (this.checkRichFields()) {
        return;
      }

      if (!this.type.goal_by_amount) {
        this.payload.goal_amount = 0;
      }
      if (!this.type.goal_by_people) {
        this.payload.goal_people = 0;
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
            this.requestError = "Теперь надо делать всё с полной уверенностью. Я уверен, что нам полный ***ц!"
          }
          this.makeRequest = false;
        });
    },
    checkLink(value) {
      if (value === null) {
        return true;
      }
      if (!value.includes("https://")) {
        return "Ссылка должна начинаться с https";
      }
      if (value.length < 15) {
        return "Слишком короткая ссылка";
      }
      return true;
    }
  },
  computed: {
    ...mapGetters(["IS_CATEGORY_LOADED", "CATEGORY"]),
    categoryArray() {
      return Object.values(this.CATEGORY);
    },
    minAllowedDate() {
      return moment()
        .add(1, "day")
        .format("YYYY-MM-DD");
    },
    maxAllowedDate() {
      return moment()
        .add(1, "month")
        .format("YYYY-MM-DD");
    },
    title() {
      if (this.type.goal_by_amount) {
        return "Новая " + this.type.name.toLowerCase();
      } else {
        return "Новое " + this.type.name.toLowerCase();
      }
    },
    instructionPlaceholder() {
      if (this.type.goal_by_amount) {
        return "Напиши тут как перевести тебе средства, по номеру телефона, карты или ты собираешь наличными.";
      } else {
        return "Добавь сюда дополнительную информацию, которую получат участники события в случае успеха.";
      }
    }
  },
  data: () => ({
    step: 1,
    makeRequest: false,
    requestError: null,
    menu: false,
    valid: true,
    instructionIsEmpty: false,
    descriptionIsEmpty: false,
    instruction_extensions: [
      Bold,
      Italic,
      Link,
      BulletList,
      OrderedList,
      ListItem,
      History
    ],
    extensions: [
      Bold,
      Italic,
      Link,
      BulletList,
      OrderedList,
      ListItem,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3]
          }
        }
      ],
      HorizontalRule,
      History
    ],
    rules: {
      required: value => !!value || "Поле обязательное",
      minPeople: value => value > 2 || "Грустное событие получится",
      minAmount: value => value >= 100 || "Маловато будет"
    },
    payload: {
      title: "",
      subtitle: "",
      release_date: moment()
        .add(7, "day")
        .format("YYYY-MM-DD"),
      category: "",
      goal_people: 4,
      goal_amount: 500,
      image_link: "",
      instructions: "",
      description: ""
    }
  }),
  props: {
    type: Object
  }
};
</script>
