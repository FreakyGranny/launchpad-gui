<template>
  <div>
    <load-spinner v-if="loading" />
    <user-card :user="userData" v-if="!loading && userData" />
  </div>
</template>

<style scoped></style>

<script>
import UserCard from "../lib/UserCard";
import LoadSpinner from "../lib/loading";
import axios from "axios";

export default {
  components: {
    UserCard,
    LoadSpinner
  },
  name: "user",
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.loading = true;
      axios({ url: "/user/" + this.$route.params.id })
        .then(resp => {
          this.userData = resp.data;
          this.loading = false;
        })
        .catch(resp => {
          this.error = resp.data;
          this.loading = false;
        });
    }
  },
  data() {
    return {
      loading: true,
      error: null,
      userData: null
    };
  }
};
</script>
