<template>
  <div>
    <div class="headline">
      <h1>Your profile</h1>
    </div>
    <p v-if="IS_PROFILE_LOADED">
      <strong>Name:</strong> {{ PROFILE.first_name }} {{ PROFILE.last_name }}
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
import { mapGetters } from "vuex";

export default {
  name: "account",
  computed: {
    ...mapGetters(["IS_PROFILE_LOADED", "PROFILE"])
  }
};
</script>
