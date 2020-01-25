import Vue from "vue";
import Router from "vue-router";
// import Wellcome from "../components/wellcome";
import Project from "../components/project";
import Dashboard from "../components/dashboard";
import Account from "../components/account";
import User from "../components/user";
import Login from "../components/login";
import Create from "../components/create";
import store from "../store";

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.IS_AUTHORIZED) {
    next();
    return;
  }
  next("/explore");
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.IS_AUTHORIZED) {
    next();
    return;
  }
  next({
    path: "/login",
    query: {
      redirect: to.fullPath
    }
  });
};

const ifSameUser = (to, from, next) => {
  if (store.getters.IS_AUTHORIZED) {
    if (to.params.id != store.getters.UID) {
      next();
      return;
    }
  }
  next("/account");
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
    // {
    //   path: "/",
    //   name: "Wellcome",
    //   component: Wellcome
    // },
    {
      path: "/",
      redirect: "/explore"
    },
    {
      path: "/project",
      redirect: "/explore"
    },
    {
      path: "/project/:id",
      name: "Project",
      component: Project,
      beforeEnter: ifAuthenticated
    },
    {
      path: "/create",
      name: "Create",
      component: Create,
      beforeEnter: ifAuthenticated,
      meta: {
        title: "Новый проект"
      }
    },
    {
      path: "/explore",
      name: "Dashboard",
      component: Dashboard,
      beforeEnter: ifAuthenticated,
      meta: {
        title: "Проекты"
      }
    },
    {
      path: "/account",
      name: "Account",
      component: Account,
      beforeEnter: ifAuthenticated,
      meta: {
        title: "Твой профиль"
      }
    },
    {
      path: "/user",
      redirect: "/account"
    },
    {
      path: "/user/:id",
      name: "User",
      component: User,
      beforeEnter: ifSameUser
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      beforeEnter: ifNotAuthenticated,
      meta: {
        title: "Войти"
      }
    }
  ]
});
