/* eslint-disable no-unused-vars */
import {
  U_DONATIONS_REQUEST,
  U_DONATIONS_ERROR,
  U_DONATIONS_SUCCESS
} from "../actions/userDonations";
import axios from "axios";
import Vue from "vue";
import { AUTH_LOGOUT } from "../actions/auth";

const state = { status: "", cItems: {} };

const getters = {
  USER_DONATIONS: state => state.dItems,
  IS_USER_DONATIONS_LOADED: state => state.userDonationsLoaded
};

const actions = {
  [U_DONATIONS_REQUEST]: async ({ commit, dispatch }) => {
    commit(U_DONATIONS_REQUEST);
    axios({ url: "/donation" })
      .then(resp => {
        commit(U_DONATIONS_SUCCESS, resp);
      })
      .catch(resp => {
        commit(U_DONATIONS_ERROR);
        // if resp is unauthorized, logout, to
        dispatch(AUTH_LOGOUT);
      });
  }
};

const mutations = {
  [U_DONATIONS_REQUEST]: state => {
    state.status = "loading";
  },
  [U_DONATIONS_SUCCESS]: (state, resp) => {
    state.status = "success";
    let donations = {};
    for (let donation of resp.data) {
      donations[donation.id] = donation;
    }
    Vue.set(state, "userDonationsLoaded", true);
    Vue.set(state, "dItems", donations);
  },
  [U_DONATIONS_ERROR]: state => {
    state.status = "error";
  },
  [AUTH_LOGOUT]: state => {
    state.dItems = {};
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
