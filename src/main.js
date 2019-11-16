import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@/assets/kickstarter.css";

import axios from "axios";

Vue.config.productionTip = false;

const token = localStorage.getItem("user-token");
if (token) {
  axios.defaults.headers.common["Authorization"] = "Token " + token;
}
axios.defaults.baseURL =
  process.env.ROOT_API || "https://gaijin-be.k8s.2gis.dev/api";

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

/* eslint-disable no-new */
// new Vue({
//   el: "#app",
//   router,
//   store,
//   template: "<App/>",
//   components: { App }
// });
