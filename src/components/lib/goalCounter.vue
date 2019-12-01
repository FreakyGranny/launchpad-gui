<template>
  <div>
    <div v-if="!animate">
      {{ getText }}
    </div>
    <animated-number
      v-if="animate"
      :value="count"
      :formatValue="formatUnits"
      :duration="500"
    />
  </div>
</template>

<style></style>

<script>
import AnimatedNumber from "animated-number-vue";

export default {
  name: "GoalCounter",
  components: {
    AnimatedNumber
  },
  computed: {
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
        return this.formatUnits(this.count);
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
    formatUnits(value) {
      if (this.type.goal_by_people) {
        return value.toFixed();
      }
      if (this.type.goal_by_amount) {
        return value.toFixed() + "₽";
      }
      return null;
    },
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
    animate: Boolean,
    count: Number,
    type: Object,
    mode: String
  }
};
</script>
