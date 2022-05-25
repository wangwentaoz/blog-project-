import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isSignIn: 0,
    token:''
  },
  mutations: {
    changIsSignIn (state,n) {
      state.isSignIn = n
    },
    setToken(state,val) {
      state.token = val
    }
  },
});
