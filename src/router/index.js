import Vue from "vue";
import Router from "vue-router";
import Wellcome from "../components/wellcome";
import Project from "../components/project";
import Dashboard from "../components/dashboard";
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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: [
    {
      path: "/",
      name: "Wellcome",
      component: Wellcome
    },
    {
      path: "/project",
      redirect: "/explore"
    },
    {
      path: "/project/:id",
      name: "Project",
      component: Project
    },
    {
      path: "/explore",
      name: "Dashboard",
      component: Dashboard,
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
