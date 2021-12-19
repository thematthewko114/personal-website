import Vue from 'vue'
import Vuex from 'vuex'
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    user: null,
    awards: null,
    education: null,
    experiences: null,
    homepage: null,
    interests: null,
    introduction: null,
    learnings: null,
    projects: null
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setUser(state, payload){
      state.user = payload
    },
    setAwards(state, payload){
      state.awards = payload
    },
    setEducation(state, payload){
      state.education = payload
    },
    setExperiences(state, payload){
      state.experiences = payload
    },
    setHomepage(state, payload){
      state.homepage = payload
    },
    setInterests(state, payload){
      state.interests = payload
    },
    setIntroduction(state, payload){
      state.introduction = payload
    },
    setLearnings(state, payload){
      state.learnings = payload
    },
    setProjects(state, payload){
      state.projects = payload
    },
  },
  actions: {
    getAwards({commit}){
      const dbRef = ref(getDatabase());
      get(child(dbRef, "awards/")).then((snapshot) => {
        if (snapshot.exists()) {
          let awards = snapshot.val()
          commit('setAwards', awards)
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    },
    getEducation({commit}){
      const dbRef = ref(getDatabase());
      get(child(dbRef, "education/")).then((snapshot) => {
        if (snapshot.exists()) {
          let education = snapshot.val()
          commit('setEducation', education)
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    },
    getExperiences({commit}){
      const dbRef = ref(getDatabase());
      get(child(dbRef, "experiences/")).then((snapshot) => {
        if (snapshot.exists()) {
          let experiences = snapshot.val()
          commit('setExperiences', experiences)
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    },
    getHomepage({commit}){
      const dbRef = ref(getDatabase());
      get(child(dbRef, "homepage/")).then((snapshot) => {
        if (snapshot.exists()) {
          let homepage = snapshot.val()
          commit('setHomepage', homepage)
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    },
    getInterests({commit}){
      const dbRef = ref(getDatabase());
      get(child(dbRef, "interests/")).then((snapshot) => {
        if (snapshot.exists()) {
          let interests = snapshot.val()
          commit('setInterests', interests)
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    },
    getIntroduction({commit}){
      const dbRef = ref(getDatabase());
      get(child(dbRef, "introduction/")).then((snapshot) => {
        if (snapshot.exists()) {
          let introduction = snapshot.val()
          commit('setIntroduction', introduction)
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    },
    getLearnings({commit}){
      const dbRef = ref(getDatabase());
      get(child(dbRef, "learnings/")).then((snapshot) => {
        if (snapshot.exists()) {
          let learnings = snapshot.val()
          commit('setLearnings', learnings)
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    },
    getProjects({commit}){
      const dbRef = ref(getDatabase());
      get(child(dbRef, "projects/")).then((snapshot) => {
        if (snapshot.exists()) {
          let projects = snapshot.val()
          commit('setProjects', projects)
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
  },
  getters:{
    user(state){
      return state.user
    },
    awards(state){
      return state.awards
    },
    education(state){
      return state.education
    },
    experiences(state){
      return state.experiences
    },
    homepage(state){
      return state.homepage
    },
    interests(state){
      return state.interests
    },
    introduction(state){
      return state.introduction
    },
    learnings(state){
      return state.learnings
    },
    projects(state){
      return state.projects
    }
  }
})
