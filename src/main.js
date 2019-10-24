import Vue from "vue";

import App from "./App";
import router from "./router";
import store from "./store";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "@/assets/material.scss";
import axios from "axios";
// import Loading from "./components/lib/loading";

Vue.config.productionTip = false;
Vue.use(VueMaterial);

const token = localStorage.getItem("user-token");
if (token) {
  axios.defaults.headers.common["Authorization"] = "Token " + token;
}
// axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.baseURL = "https://gaijin-be.k8s.2gis.dev/api";

// Vue.component("loading", Loading);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
});
