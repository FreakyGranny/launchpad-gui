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
                <v-col cols="12" class="pa-0" v-if="fieldType == 'category'">
                  <v-select
                    v-model="newValue"
                    v-if="IS_CATEGORY_LOADED"
                    :items="categoryArray"
                    :rules="[rules.required]"
                    item-text="name"
                    item-value="id"
                    no-data-text="no category"
                    outlined
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" class="pa-0" v-if="fieldType == 'type'">
                  <v-select
                    v-model="newValue"
                    v-if="IS_PROJECT_TYPE_LOADED"
                    :items="projectTypeArray"
                    :rules="[rules.required]"
                    item-text="name"
                    item-value="id"
                    no-data-text="no project type"
                    outlined
                    required
                  ></v-select>
                  <v-sheet class="secondarytext--text caption" max-width="480">
                    <ul>
                      <li
                        class="py-1"
                        v-for="(option, index) in currentType.options"
                        :key="index"
                      >
                        <span>{{ option }}</span>
                      </li>
                    </ul>
                  </v-sheet>
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
import { mapGetters } from "vuex";
import { PROJECT_TYPE_REQUEST } from "../../store/actions/projectType";

export default {
  name: "EditSelectPopup",
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
    value: Object
  },
  created() {
    if (!this.IS_PROJECT_TYPE_LOADED) {
      this.$store.dispatch(PROJECT_TYPE_REQUEST);
    }
  },
  computed: {
    ...mapGetters(["IS_PROJECT_TYPE_LOADED", "PROJECT_TYPE"]),
    projectTypeArray() {
      return Object.values(this.PROJECT_TYPE);
    },
    changed() {
      return this.value !== this.newValue;
    },
    currentType() {
      if (typeof this.newValue == "number") {
        return this.PROJECT_TYPE[this.newValue];
      } else {
        return this.newValue;
      }
    }
  },
  methods: {
    handleAbort() {
      this.newValue = this.value;
      this.menu = false;
    },
    validate() {
      if (this.$refs.form.validate()) {
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
