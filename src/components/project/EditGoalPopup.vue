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
                <v-col v-if="type.goal_by_amount">
                  <v-text-field
                    label="Сумма"
                    v-model="newAmount"
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
                <v-col v-if="type.goal_by_people">
                  <v-text-field
                    label="Цель"
                    prepend-icon="mdi-account-group"
                    :rules="[rules.required, rules.minPeople]"
                    v-model="newPeople"
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
  name: "EditGoalPopup",
  extends: projectFields,
  data() {
    return {
      menu: false,
      valid: true,
      makeRequest: false,
      newAmount: this.amount,
      newPeople: this.people
    };
  },
  props: {
    editable: Boolean,
    amount: Number,
    people: Number
  },
  computed: {
    changed() {
      return this.amount !== this.newAmount || this.people !== this.newPeople;
    }
  },
  methods: {
    handleAbort() {
      this.newAmount = this.amount;
      this.newPeople = this.people;
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
      data["goal_amount"] = Number(this.newAmount);
      data["goal_people"] = Number(this.newPeople);
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
