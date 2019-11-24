<template>
  <!-- <v-menu open-on-hover bottom min-width="290px">
    <template v-slot:activator="{ on }">
      <v-card v-on="on" min-width="290px" width="400px">
      <v-row justify="center" no-gutters>
        <v-btn class="mx-3" fab x-small color="accent">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn class="mx-3" fab x-small color="primary">
          <v-icon>mdi-cash-multiple</v-icon>
        </v-btn>
        <v-btn class="mx-3" fab x-small color="secondarytext">
          <v-icon>mdi-party-popper</v-icon>
        </v-btn>
      </v-row>
      </v-card>
    </template> -->
  <v-card tile class="ma-4 mt-6" min-width="265">
    <v-stepper
      class="elevation-0"
      :alt-labels="true"
      :value="currentStep"
      v-if="!!type"
    >
      <v-stepper-header
        class="mx-auto"
        :class="type.goal_by_amount ? 'money-width' : 'event-width'"
      >
        <v-stepper-step
          step="search"
          complete
          complete-icon="mdi-magnify"
          error-icon="mdi-cancel"
          :color="searchColor"
          :rules="isFail"
        >
          <div class="secondarytext--text caption text-center">
            Поиск участников
          </div>
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          step="harvest"
          v-if="type.goal_by_amount"
          complete
          complete-icon="mdi-cash-multiple"
          :color="harvestColor"
        >
          <div class="secondarytext--text caption text-center">
            Сбор средств
          </div>
        </v-stepper-step>

        <v-divider v-if="type.goal_by_amount"></v-divider>

        <v-stepper-step
          step="done"
          complete
          complete-icon="mdi-party-popper"
          :color="doneColor"
        >
          <div class="secondarytext--text caption text-center">
            Все получилось
          </div>
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content class="pt-0 pb-7" step="fail">
          <div class="primarytext--text subtitle-2 text-center">
            Проект завершен.
          </div>
          <div class="secondarytext--text caption text-center">
            Проект не нашел достаточно участников.
          </div>
        </v-stepper-content>
        <v-stepper-content class="pt-0 pb-7" step="draft">
          <div class="primarytext--text subtitle-2 text-center">
            Проект не опубликован!
          </div>
          <div class="secondarytext--text caption text-center">
            Проект виден только автору, после публикации редактирование проекта
            будет невозможно.
          </div>
        </v-stepper-content>

        <v-stepper-content class="pt-0 pb-7" step="search">
          <div class="primarytext--text subtitle-2 text-center">
            Проект находится на стадии поиска участников
          </div>
          <div
            v-if="type.goal_by_amount && !type.goal_by_people"
            class="secondarytext--text caption text-center"
          >
            На этом этапе собрается необходимые для реализации средства. Сумма
            произвольная.
          </div>
          <div
            v-if="!type.goal_by_amount"
            class="secondarytext--text caption text-center"
          >
            На этом этапе идет поиск людей, заинтересованных в проведении
            события.
          </div>
          <div
            v-if="type.goal_by_amount && type.goal_by_people"
            class="secondarytext--text caption text-center"
          >
            На этом этапе идет поиск людей, готовых поддержать проект.
          </div>
        </v-stepper-content>
        <v-stepper-content class="pt-0 pb-7" step="harvest">
          <div class="primarytext--text subtitle-2 text-center">
            Проект находится на стадии сбора средств
          </div>
          <div class="secondarytext--text caption text-center">
            На этом этапе участники переводят средства автору проекта, автор
            отметмечает переводы.
          </div>
        </v-stepper-content>
        <v-stepper-content class="pt-0 pb-7" step="done">
          <div class="primarytext--text subtitle-2 text-center">
            Проект успешно завершен!
          </div>
          <div
            v-if="type.goal_by_amount"
            class="secondarytext--text caption text-center"
          >
            Средства собраны, о реализации проекта узнавайте у автора.
          </div>
          <div
            v-if="!type.goal_by_amount"
            class="secondarytext--text caption text-center"
          >
            Подробности о месте и времения встречи узнавайте у автора.
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
  <!-- </v-menu> -->
</template>

<style>
.v-stepper__header {
  box-shadow: none !important;
}
.money-width {
  max-width: 500px;
}
.event-width {
  max-width: 300px;
}
</style>

<script>
import {
  STATUS_DRAFT,
  STATUS_SEARCH,
  STATUS_FAIL,
  STATUS_HARVEST,
  STATUS_SUCCESS
} from "../lib/const/status";

export default {
  name: "ProgressSteps",
  computed: {
    isFail() {
      let ok = true;
      if (this.status == STATUS_FAIL) {
        ok = false;
      }
      return [() => ok];
    },
    searchColor() {
      if (this.status == STATUS_SEARCH) {
        return "primary";
      }
      if (this.status == STATUS_DRAFT) {
        return "grey";
      }
      return "accent";
    },
    harvestColor() {
      if (this.status == STATUS_HARVEST) {
        return "primary";
      }
      if (this.status == STATUS_SUCCESS) {
        return "accent";
      }
      return "grey";
    },
    doneColor() {
      if (this.status == STATUS_SUCCESS) {
        return "accent";
      }
      return "grey";
    },
    currentStep() {
      switch (this.status) {
        case STATUS_SUCCESS:
          return "done";
        case STATUS_SEARCH:
          return "search";
        case STATUS_HARVEST:
          return "harvest";
        case STATUS_DRAFT:
          return "draft";
      }
      return "fail";
    }
  },
  data() {
    return {};
  },
  props: {
    status: String,
    type: Object
  }
};
</script>
