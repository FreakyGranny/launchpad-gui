<template>
  <v-card>
    <v-card-title class="px-7">
      <div class="primarytext--text title">
        Отметить переводы
      </div>
    </v-card-title>
    <v-progress-linear
      :active="makeRequest"
      indeterminate
      absolute
      color="secondary"
    />
    <v-list class="pt-3 pb-7 px-3">
      <v-list-item
        v-for="donation in donations"
        :key="donation.id"
        @click="markDonation(donation.id, donation.paid)"
      >
        <v-list-item-avatar>
          <v-img :src="donation.user.avatar"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            {{ donation.user.first_name + " " + donation.user.last_name }}
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon v-if="!donation.paid" color="gray">mdi-radiobox-blank</v-icon>
          <v-icon v-if="donation.paid" color="accent"
            >mdi-check-circle-outline</v-icon
          >
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style></style>

<script>
export default {
  name: "DonateMark",
  methods: {
    markDonation(id, isPaid) {
      // window.console.log(id);
      this.makeRequest = true;
      this.axios
        .patch("/donation/" + id, { paid: !isPaid })
        .then(resp => {
          this.$emit("mark", id, resp.data.paid);
          this.makeRequest = false;
        })
        .catch(resp => {
          this.requestError = resp;
          this.makeRequest = false;
          // window.console.log(resp);
        });
    }
  },
  data() {
    return {
      makeRequest: false,
      requestError: null
    };
  },
  props: {
    dialog: Boolean,
    donations: Array,
    type: Object
  }
};
</script>
