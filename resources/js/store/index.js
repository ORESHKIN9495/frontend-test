import Vue from "vue";
import Vuex from "vuex";

import { del, get, patch, post } from "../composables/request";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        comments: [],
        comment: {},
        pages: 1,
    },

    getters: {
        updateComment(state) {
            return state.comments.find((el) => el.id === state.comment.id);
        },
    },

    actions: {
        getComments({ commit }) {
            get("http://localhost/api/comments/").then((data) =>
                commit("getComments", data)
            );
        },

        addComment({ dispatch }, data) {
            post("http://localhost/api/comments/", data).then(() =>
                dispatch("getComments")
            );
        },

        removeComment({ dispatch }, id) {
            del(`http://localhost/api/comments/${id}`).then(() =>
                dispatch("getComments")
            );
        },

        updateComment({ dispatch }, data) {
            const { form, id } = data;

            patch(`http://localhost/api/comments/${id}`, form).then(() =>
                dispatch("getComments")
            );
        },
    },

    mutations: {
        getComments(state, data) {
            state.comments = data;
        },

        getPages(state, data) {
            state.pages = data;
        },

        setComment(state, data) {
            state.comment = data;
        },
    },
});
