import Vue from 'vue'
import Vuex from 'vuex'
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    user: null
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setUser(state, payload){
      state.user = payload
    }
  },
  actions: {
    getAwards(){
      const dbRef = ref(getDatabase());
      get(child(dbRef, "awards/")).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    },
    logUserIn({commit}, payload){
      commit('setLoading', true)
      const auth = getAuth();
      signInWithEmailAndPassword(auth, payload.username, payload.password)
        .then((userCredential) => {
          let user = userCredential.user;
          commit('setUser', {username: user.email, id: user.uid})
          commit('setLoading', false)
        })
        .catch((error) => {
          commit('setLoading', false)
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + ": " + errorMessage)
        })
    },
    signUserUp({commit}, payload){
      commit('setLoading', true)
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, payload.username, payload.password)
        .then((userCredential) => {
          let user = userCredential.user;
          commit('setUser', {username: user.email, id: user.uid})
          commit('setLoading', false)
        })
        .catch((error) => {
          commit('setLoading', false)
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + ": " + errorMessage)
        });
    }
  },
  modules: {
  }
})
