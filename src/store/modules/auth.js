/* eslint-disable no-unused-vars */
/* eslint-disable promise/param-names */
import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from "../actions/auth";
import { USER_REQUEST } from "../actions/user";
import { CATEGORY_REQUEST } from "../actions/category";
import { PROJECT_TYPE_REQUEST } from "../actions/projectType";
import axios from "axios";

const state = {
  token: localStorage.getItem("user-token") || "",
  status: "",
  hasLoadedOnce: false
};

const getters = {
  IS_AUTHORIZED: state => !!state.token,
  STORAGE_STATUS: state => state.status
};

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);
      axios({
        url: "/token",
        data: user,
        method: "POST"
      })
        .then(resp => {
          localStorage.setItem("user-token", resp.data.token);
          // Here set the header of your ajax library to the token value.
          // example with axios
          axios.defaults.headers.common["Authorization"] =
            "Token " + resp.data.token;
          commit(AUTH_SUCCESS, resp);
          dispatch(USER_REQUEST);
          dispatch(CATEGORY_REQUEST);
          dispatch(PROJECT_TYPE_REQUEST);
          resolve(resp);
        })
        .catch(err => {
          commit(AUTH_ERROR, err);
          localStorage.removeItem("user-token");
          reject(err);
        });
    });
  },
  [AUTH_LOGOUT]: ({ commit, dispatch }) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT);
      localStorage.removeItem("user-token");
      delete axios.defaults.headers.common["Authorization"];
      resolve();
    });
  }
};

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = "success";
    state.token = resp.data.token;
    state.hasLoadedOnce = true;
  },
  [AUTH_ERROR]: state => {
    state.status = "error";
    state.hasLoadedOnce = true;
  },
  [AUTH_LOGOUT]: state => {
    state.token = "";
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
