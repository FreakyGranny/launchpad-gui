<template>
  <div>
    <v-speed-dial
      v-model="fab"
      top
      right
      absolute
      direction="bottom"
      transition="slide-y-transition"
    >
      <template v-slot:activator>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn v-model="fab" color="primary" v-on="on" fab>
              <v-icon>{{
                fab ? "mdi-chevron-double-up" : "mdi-settings"
              }}</v-icon>
            </v-btn>
          </template>
          <span>{{ fab ? "Свернуть управление" : "Управление проектом" }}</span>
        </v-tooltip>
      </template>

      <v-tooltip left v-if="isDraft">
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            fab
            dark
            small
            color="accent"
            @click="$emit('publish')"
          >
            <v-icon>mdi-publish</v-icon>
          </v-btn>
        </template>
        <span>Опубликовать</span>
      </v-tooltip>
      <v-tooltip left v-if="isDraft">
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            fab
            dark
            small
            color="error"
            @click="$emit('delete')"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Удалить</span>
      </v-tooltip>

      <v-tooltip left v-if="isSearch">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" fab dark small color="secondary">
            <v-icon>mdi-progress-clock</v-icon>
          </v-btn>
        </template>
        <span>Продлить</span>
      </v-tooltip>

      <v-tooltip left v-if="isHarvest">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" fab small color="accent" @click="$emit('mark')">
            <v-icon>mdi-credit-card-outline</v-icon>
          </v-btn>
        </template>
        <span>Отметить переводы</span>
      </v-tooltip>
    </v-speed-dial>
  </div>
</template>

<style></style>

<script>
import {
  STATUS_SEARCH,
  STATUS_HARVEST,
  STATUS_DRAFT
} from "../lib/const/status";

export default {
  name: "ManageMenu",
  data() {
    return {
      fab: this.menuExpanded()
    };
  },
  computed: {
    isDraft() {
      return this.status == STATUS_DRAFT;
    },
    isSearch() {
      return this.status == STATUS_SEARCH;
    },
    isHarvest() {
      return this.status == STATUS_HARVEST;
    }
  },
  methods: {
    menuExpanded() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return false;
        case "sm":
          return false;
        default:
          return true;
      }
    }
  },
  props: {
    status: String,
    donations: Array,
    type: Object
  }
};
</script>
