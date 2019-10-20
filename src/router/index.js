import Vue from "vue";
import Router from "vue-router";
import Wellcome from "../components/wellcome";
import Home from "../components/home";
import Account from "../components/account";
import Login from "../components/login";
import store from "../store";

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/explore");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Wellcome",
      component: Wellcome
    },
    {
      path: "/explore",
      name: "Home",
      component: Home,
      beforeEnter: ifAuthenticated
    },
    {
      path: "/account",
      name: "Account",
      component: Account,
      beforeEnter: ifAuthenticated
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      beforeEnter: ifNotAuthenticated
    }
  ]
});
