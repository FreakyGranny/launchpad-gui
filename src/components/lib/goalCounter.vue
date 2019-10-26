<template>
  <div>
    <span class="goal-count-text">{{ getCount }}</span>
    <span class="goal-descr-text">{{ getText }}</span>
  </div>
</template>

<style scoped>
.goal-count-text {
  font-size: 14px;
  font-weight: 800;
}
.goal-descr-text {
  padding-left: 5px;
  font-size: 12px;
}
</style>

<script>
export default {
  name: "GoalCounter",
  computed: {
    getCount() {
      if (this.type.goal_by_people) {
        return this.count;
      }
      if (this.type.goal_by_amount) {
        return this.count + "₽";
      }
      return this.count;
    },
    getText() {
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
    type: Object
  }
};
</script>
