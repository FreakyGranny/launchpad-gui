<template>
  <span>
    {{ getText }}
  </span>
</template>

<style></style>

<script>
export default {
  name: "ProjectCounter",
  computed: {
    getText() {
      let cases = [2, 0, 1, 1, 1, 2];
      let titles = ["проект", "проекта", "проектов"];
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
    count: Number
  }
};
</script>
