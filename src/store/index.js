import Vue from 'vue'
import Vuex from 'vuex'
import { getDatabase, ref, child, get, set, remove } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

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
    user: null
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
      state.user = payload
    },
    logout(state){
      state.user = null
    },
    setUser(state, payload){
      state.user = payload
    },
  },
  actions: {
    addEvent({commit}, payload){
      commit("setLoading", true)
      commit('addEvent', payload.new)
      set(ref(getDatabase(), 'events/' + payload.userId + '/' + payload.new.id), payload.new)
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
    getEvents({commit}, payload){
      const dbRef = ref(getDatabase());
      get(child(dbRef, "events/" + payload)).then((snapshot) => {
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
    getUser({commit}){
      const dbRef = ref(getDatabase());
      get(child(dbRef, "events/")).then((snapshot) => {
        if (snapshot.exists()) {
          commit('setUser', snapshot.val())
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
        if(state.events[i].id == payload.event.id){
          state.events[i] = payload.event
          break
        }
      }
      set(ref(getDatabase(), 'events/' + payload.userId + '/' + payload.event.id), payload.event)
      .then(() => {
        commit("setLoading", false)
      })
      .catch((error)=> {
        console.log(error)
        commit("setLoading", false)
      })
    },
    login({commit}, payload){
      commit("setLoading", true)
      const auth = getAuth();
      signInWithEmailAndPassword(auth, payload.username, payload.password)
        .then((userCredential) => {
          const user = userCredential.user;
          commit("setUser", user.uid)
          const dbRef = ref(getDatabase());
          get(child(dbRef, "events/" + user.uid)).then((snapshot) => {
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
        })
        .catch((error) => {
          console.log(error.code + ': ' + error.message)
          commit('setLoading', false)
        });
    },
    logout({commit}){
      const auth = getAuth();
      signOut(auth).then(() => {
        set(ref(getDatabase(), 'user/'), null)
        .then(() => {
          commit('logout')
          commit("setLoading", false)
        })
      }).catch((error) => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    autoLogin({commit}, payload){
      commit('login', payload)
    },
    signup({commit}, payload){
      let auth = getAuth();
      createUserWithEmailAndPassword(auth, payload.username, payload.password)
      .then((userCredential) => {
        commit('setLoading', true)
        let user = userCredential.user;
        commit("setUser", user.uid)
        let testEvent = {
          color: "red",
          content: "content",
          end: "2022-01-02 08:00",
          id: "thisisanid1",
          name: "test1",
          start: "2022-01-01 00:00"
        }
        set(ref(getDatabase(), 'events/' + user.uid + "/thisisanid1"), testEvent)
        .then(() => {
          commit("setEvents", [testEvent])
          commit("setLoading", false)
        })
        .catch((error) => {
          console.log(error.code + ': ' + error.message)
          commit('setLoading', false)
        })
      })
      .then(() => {
        commit("setLoading", false)
      })
      .catch((error) => {
        console.log(error.code + ': ' + error.message)
        commit('setLoading', false)
      })
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
      return state.events.sort((a, b) => a.end < b.end ? - 1 : Number(a.end > b.end))
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
    user(state){
      return state.user
    }
  }
})
