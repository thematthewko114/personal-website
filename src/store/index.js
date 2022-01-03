import Vue from 'vue'
import Vuex from 'vuex'
import { getDatabase, ref, child, get, set, remove } from "firebase/database";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    awards: null,
    education: null,
    experiences: null,
    events: [],
    homepage: null,
    interests: null,
    introduction: null,
    learnings: null,
    projects: null,
    users: null
  },
  mutations: {
    addEvent(state, payload){
      state.events.push(payload)
    },
    setEvents (state, payload) {
      state.events = payload
    },
    setLoading (state, payload) {
      state.loading = payload
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
    login(state, payload){
      state.users = payload
    },
    logout(state){
      state.users = null
    }
  },
  actions: {
    addEvent({commit}, payload){
      commit("setLoading", true)
      commit('addEvent', payload.new)
      set(ref(getDatabase(), 'events/' + payload.new.id), payload.new)
      .then(() => {
        commit("setLoading", false)
      })
      .catch((error)=> {
        console.log(error)
        commit("setLoading", false)
      })
    },
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
    getEvents({commit}){
      const dbRef = ref(getDatabase());
      get(child(dbRef, "events/")).then((snapshot) => {
        if (snapshot.exists()) {
          let events = snapshot.val()
          let eventArray = []
          for(let i in events){
            eventArray.push(events[i])
          }
          commit('setEvents', eventArray)
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    },
    getUsers({commit}){
      const dbRef = ref(getDatabase());
      get(child(dbRef, "users/")).then((snapshot) => {
        if (snapshot.exists()) {
          commit('login', snapshot.val())
        }
      }).catch((error) => {
        console.error(error);
      });
    },
    deleteEvent({commit, state}, payload){
      commit("setLoading", true)
      for(let i in state.events){
        if(state.events[i].id == payload){
          state.events.splice(i, 1)
        }
      }
      remove(ref(getDatabase(), 'events/' + payload))
      commit("setLoading", false)
    },
    editEvent({commit, state}, payload){
      commit('setLoading', true)
      for(let i in state.events){
        if(state.events[i].id == payload.id){
          state.events[i] = payload
          break
        }
      }
      set(ref(getDatabase(), 'events/' + payload.id), payload)
      .then(() => {
        commit("setLoading", false)
      })
      .catch((error)=> {
        console.log(error)
        commit("setLoading", false)
      })
    },
    login({commit}){
      set(ref(getDatabase(), 'users/'), "sebrgiuserb")
      .then(() => {
        commit('login')
        commit("setLoading", false)
      })
      .catch((error)=> {
        console.log(error)
        commit("setLoading", false)
      })
    },
    logout({commit}){
      set(ref(getDatabase(), 'users/'), null)
      .then(() => {
        commit('logout')
        commit("setLoading", false)
      })
      .catch((error)=> {
        console.log(error)
        commit("setLoading", false)
      })
    },
    autoLogin({commit}){
      commit('login')
    }
  },
  modules: {
  },
  getters:{
    awards(state){
      return state.awards
    },
    education(state){
      return state.education
    },
    experiences(state){
      return state.experiences
    },
    events(state){
      return state.events
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
    },
    users(state){
      return state.users
    }
  }
})
