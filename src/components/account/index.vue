<template>
  <div>
    <div class="header header-account">
      <span class="white-text">Профиль</span>
    </div>
    <p v-if="IS_PROFILE_LOADED">
      <strong>Name:</strong> {{ PROFILE.first_name }} {{ PROFILE.last_name }}
    </p>
  </div>
</template>

<style scoped>
.header-account {
  background-image: url("/images/keys.jpg");
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
