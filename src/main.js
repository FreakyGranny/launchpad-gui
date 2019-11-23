import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import { TiptapVuetifyPlugin } from "tiptap-vuetify";

import "tiptap-vuetify/dist/main.css";
import "@/assets/kickstarter.css";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

Vue.use(TiptapVuetifyPlugin, {
  vuetify,
  iconsGroup: "mdi"
});

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
