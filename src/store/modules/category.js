/* eslint-disable no-unused-vars */
import {
  CATEGORY_REQUEST,
  CATEGORY_ERROR,
  CATEGORY_SUCCESS
} from "../actions/category";
import axios from "axios";
import Vue from "vue";
import { AUTH_LOGOUT } from "../actions/auth";

const state = { status: "", cItems: {} };

const getters = {
  CATEGORY: state => state.cItems,
  IS_CATEGORY_LOADED: state => state.categoriesLoaded
};

const actions = {
  [CATEGORY_REQUEST]: async ({ commit, dispatch }) => {
    commit(CATEGORY_REQUEST);
    axios({ url: "/category" })
      .then(resp => {
        commit(CATEGORY_SUCCESS, resp);
      })
      .catch(resp => {
        commit(CATEGORY_ERROR);
        // if resp is unauthorized, logout, to
        dispatch(AUTH_LOGOUT);
      });
  }
};

const mutations = {
  [CATEGORY_REQUEST]: state => {
    state.status = "loading";
  },
  [CATEGORY_SUCCESS]: (state, resp) => {
    state.status = "success";
    let cat = {};
    for (let category of resp.data) {
      cat[category.id] = category;
    }
    Vue.set(state, "categoriesLoaded", true);
    Vue.set(state, "cItems", cat);
  },
  [CATEGORY_ERROR]: state => {
    state.status = "error";
  },
  [AUTH_LOGOUT]: state => {
    state.category = [];
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
