import Vue from "vue";

import App from "./App";
import router from "./router";
import store from "./store";
import VueMaterial from "vue-material";
import VueMq from "vue-mq";
import "vue-material/dist/vue-material.min.css";
import "@/assets/material.scss";
import axios from "axios";

Vue.config.productionTip = false;
Vue.use(VueMaterial);

Vue.use(VueMq, {
  breakpoints: {
    sm: 600,
    md: 960,
    lg: Infinity
  }
});

const token = localStorage.getItem("user-token");
if (token) {
  axios.defaults.headers.common["Authorization"] = "Token " + token;
}
axios.defaults.baseURL =
  process.env.ROOT_API || "https://gaijin-be.k8s.2gis.dev/api";

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
});
