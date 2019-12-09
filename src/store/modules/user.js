/* eslint-disable no-unused-vars */
import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from "../actions/user";
import axios from "axios";
import Vue from "vue";
import { AUTH_LOGOUT } from "../actions/auth";

const state = {
  uid: localStorage.getItem("user-id") || null,
  status: "",
  profile: {}
};

const getters = {
  PROFILE: state => state.profile,
  IS_PROFILE_LOADED: state => !!state.profile.username,
  UID: state => state.uid
};

const actions = {
  [USER_REQUEST]: async ({ commit, dispatch }) => {
    commit(USER_REQUEST);
    axios({ url: "/user" })
      .then(resp => {
        commit(USER_SUCCESS, resp);
      })
      .catch(resp => {
        commit(USER_ERROR);
        // if resp is unauthorized, logout, to
        dispatch(AUTH_LOGOUT);
      });
  }
};

const mutations = {
  [USER_REQUEST]: state => {
    state.status = "loading";
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = "success";
    Vue.set(state, "profile", resp.data);
    Vue.set(state, "uid", resp.data.id);
    localStorage.setItem("user-id", resp.data.id);
  },
  [USER_ERROR]: state => {
    state.status = "error";
  },
  [AUTH_LOGOUT]: state => {
    state.profile = {};
    state.uid = null;
    localStorage.removeItem("user-id");
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
