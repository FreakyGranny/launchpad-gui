<template>
  <div>
    <div class="headline">
      <h1>Your doge profile</h1>
    </div>
    <p v-if="profile.username">
      <strong>Name:</strong> {{ profile.username }} {{ profile.avatar }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.headline {
  margin-top: 1em;
  display: flex;
  img {
    height: 80px;
    width: 80px;
    border-radius: 50%;
  }
}
</style>

<script>
import { mapState } from "vuex";

export default {
  name: "account",
  computed: mapState({ profile: state => state.user.profile })
};
</script>
