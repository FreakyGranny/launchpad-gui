<template>
  <div v-if="IS_PROJECT_TYPE_LOADED">
    {{ getText }}
  </div>
</template>

<style></style>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GoalCounter",
  computed: {
    ...mapGetters(["IS_PROJECT_TYPE_LOADED", "PROJECT_TYPE"]),
    type() {
      return this.PROJECT_TYPE[this.typeId];
    },
    getText() {
      if (this.mode == "members") {
        if (this.type.goal_by_amount) {
          return this.getMembers();
        }
        if (this.type.goal_by_people) {
          return null;
        }
      }
      if (this.mode == "units") {
        if (this.type.goal_by_people) {
          return this.count;
        }
        if (this.type.goal_by_amount) {
          return this.count + "₽";
        }
      }
      if (this.type.goal_by_people) {
        return this.getMembers();
      }
      if (this.type.goal_by_amount) {
        return "собрано";
      }
      return null;
    }
  },
  methods: {
    getMembers() {
      let cases = [2, 0, 1, 1, 1, 2];
      let titles = ["участник", "участника", "участников"];
      return titles[
        this.count % 100 > 4 && this.count % 100 < 20
          ? 2
          : cases[this.count % 10 < 5 ? this.count % 10 : 5]
      ];
    }
  },
  data() {
    return {};
  },
  props: {
    count: Number,
    typeId: Number,
    mode: String
  }
};
</script>
