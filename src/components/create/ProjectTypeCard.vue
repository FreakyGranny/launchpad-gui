<template>
  <md-card md-with-hover>
    <md-card-content>
      <div class="md-layout md-alignment-center">
        <type-icon
          class="md-primary md-size-3x"
          :typeId="typeId"
          :withTooltip="false"
        />
      </div>
      <div class="md-layout md-alignment-center">
        <div class="options-title-text">{{ name }}</div>
        <ul class="list-options">
          <li
            class="list-options-item"
            v-for="(option, index) in options"
            :key="index"
          >
            <span class="options-text">{{ option }}</span>
          </li>
        </ul>
      </div>
    </md-card-content>
  </md-card>
</template>

<style lang="scss" scoped>
@import "~vue-material/dist/theme/engine";

.md-card {
  object-fit: cover;
  width: 300px;
  height: 390px;
  border-radius: 0px;
}
.options-title-text {
  font-size: 16px;
  font-weight: 800;
  border-bottom: 1px solid #ddd;
}
.options-text {
  font-size: 13px;
  color: md-get-palette-color(gray, 600);
}
.list-options {
  padding-inline-start: 25px;
}
.list-options-item {
  padding-bottom: 5px;
}
</style>

<script>
import TypeIcon from "../lib/typeIcon";

export default {
  name: "create",
  components: {
    TypeIcon
  },
  props: {
    typeId: Number,
    name: String,
    options: Array
  }
};
</script>
