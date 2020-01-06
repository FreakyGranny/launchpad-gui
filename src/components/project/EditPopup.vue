<template>
  <v-sheet color="transparent" width="100%">
    <slot v-if="!editable"></slot>
    <v-menu
      v-if="editable"
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
    >
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
      <v-card>
        <v-card-text class="pb-0">
          <v-form ref="form" v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" v-if="fieldType == 'text'">
                  <v-text-field
                    v-model="newValue"
                    counter
                    :maxlength="maxLength"
                    :rules="[rules.required]"
                    clearable
                    clear-icon="mdi-close-circle"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" v-if="fieldType == 'link'">
                  <v-text-field
                    v-model="newValue"
                    hint="https ссылка на картинку"
                    :rules="[rules.required, checkLink]"
                    clearable
                    clear-icon="mdi-close-circle"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                  class="px-3 pb-0"
                  v-if="fieldType == 'instructions'"
                >
                  <tiptap-vuetify
                    v-model="newValue"
                    :extensions="instruction_extensions"
                    :card-props="{ flat: true, color: 'grey lighten-4' }"
                    :toolbar-attributes="{ color: 'grey lighten-4' }"
                    :placeholder="instructionPlaceholder"
                    min-height="50"
                  />
                  <v-alert
                    class="ma-0"
                    text
                    tile
                    dense
                    type="error"
                    icon="mdi-text-subject"
                    v-if="instructionInvalid"
                  >
                    <div class="body-2">
                      {{ checkInstructions(newValue) }}
                    </div>
                  </v-alert>
                </v-col>
                <v-col cols="12" v-if="fieldType == 'description'">
                  <tiptap-vuetify
                    v-model="newValue"
                    :extensions="extensions"
                    :card-props="{ flat: true, color: 'grey lighten-4' }"
                    :toolbar-attributes="{ color: 'grey lighten-4' }"
                    placeholder="Расскажи о своем проекте, очень важно описать проект как можно подробнее."
                    min-height="50"
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
                      {{ checkDescription(newValue) }}
                    </div>
                  </v-alert>
                </v-col>
                <v-col cols="12" class="pa-0" v-if="fieldType == 'date'">
                  <v-row no-gutters justify="center">
                    <v-date-picker
                      v-model="newValue"
                      locale="ru-ru"
                      width="330"
                      :first-day-of-week="1"
                      :min="minAllowedDate"
                      :max="maxAllowedDate"
                    />
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="handleAbort()">Отмена</v-btn>
          <v-btn
            :disabled="!changed || !valid || makeRequest"
            :loading="makeRequest"
            color="accent"
            text
            @click="validate"
            >Сохранить</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-sheet>
</template>

<style>
.icon-background {
  border-radius: 18px !important;
}
</style>

<script>
import projectFields from "../lib/projectFields";

export default {
  name: "EditPopup",
  extends: projectFields,
  data() {
    return {
      menu: false,
      valid: true,
      makeRequest: false,
      newValue: this.value
    };
  },
  props: {
    editable: Boolean,
    fieldType: String,
    fieldName: String,
    maxLength: Number,
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
      if (this.$refs.form.validate()) {
        if (this.fieldType === "instructions") {
          this.checkInstructions(this.newValue);
          if (this.instructionInvalid) {
            return;
          }
        }
        if (this.fieldType === "description") {
          this.checkDescription(this.newValue);
          if (this.descriptionInvalid) {
            return;
          }
        }
        this.editField();
        this.menu = false;
      }
    },
    editField() {
      this.makeRequest = true;
      let data = {};
      data[this.fieldName] = this.newValue;
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
