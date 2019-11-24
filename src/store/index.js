import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import auth from "./modules/auth";
import projectType from "./modules/projectType";
import category from "./modules/category";
import userDonations from "./modules/userDonations";
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    user,
    userDonations,
    auth,
    projectType,
    category
  },
  strict: debug
});
