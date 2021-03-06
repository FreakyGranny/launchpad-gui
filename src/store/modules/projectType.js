/* eslint-disable no-unused-vars */
import {
  PROJECT_TYPE_REQUEST,
  PROJECT_TYPE_ERROR,
  PROJECT_TYPE_SUCCESS
} from "../actions/projectType";
import axios from "axios";
import Vue from "vue";
import { AUTH_LOGOUT } from "../actions/auth";

const state = { status: "", ptItems: {} };

const getters = {
  PROJECT_TYPE: state => state.ptItems,
  IS_PROJECT_TYPE_LOADED: state => state.ptLoaded
};

const actions = {
  [PROJECT_TYPE_REQUEST]: async ({ commit, dispatch }) => {
    commit(PROJECT_TYPE_REQUEST);
    axios({ url: "/project_type" })
      .then(resp => {
        commit(PROJECT_TYPE_SUCCESS, resp);
      })
      .catch(resp => {
        commit(PROJECT_TYPE_ERROR);
        // if resp is unauthorized, logout, to
        dispatch(AUTH_LOGOUT);
      });
  }
};

const mutations = {
  [PROJECT_TYPE_REQUEST]: state => {
    state.status = "loading";
  },
  [PROJECT_TYPE_SUCCESS]: (state, resp) => {
    state.status = "success";
    let pt = {};
    for (let projectType of resp.data) {
      pt[projectType.id] = projectType;
    }
    Vue.set(state, "ptLoaded", true);
    Vue.set(state, "ptItems", pt);
  },
  [PROJECT_TYPE_ERROR]: state => {
    state.status = "error";
  },
  [AUTH_LOGOUT]: state => {
    state.ptItems = {};
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
