import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import titleMixin from './plugins/title'
import VuePapaParse from 'vue-papa-parse'
import JsonCSV from 'vue-json-csv'
import JsonExcel from 'vue-json-excel'
import * as VueGoogleMaps from 'vue2-google-maps'
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA8zwDZ77P2uKcFhoTY2vF0rakMSR7s-hU",
  authDomain: "personal-website-8a1cd.firebaseapp.com",
  projectId: "personal-website-8a1cd",
  storageBucket: "personal-website-8a1cd.appspot.com",
  messagingSenderId: "27903663924",
  appId: "1:27903663924:web:6017db12789c4cbbc18f61",
  measurementId: "G-RDJCYRJXP1"
}
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
Vue.config.productionTip = false
Vue.mixin(titleMixin)
Vue.use(VuePapaParse)
Vue.component('downloadCsv', JsonCSV)
Vue.component('downloadExcel', JsonExcel)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD2KRG2yfuSgD1CwsUM5kIkVqF3gAU-yj8',
    libraries: 'places,drawing,visualization',
    installComponents: true
  },
}),

new Vue({
  router,
  store,
  vuetify,
  database,
  render: function (h) { return h(App) },
  created(){
    this.$store.dispatch('getAwards')
    this.$store.dispatch('getEducation')
    this.$store.dispatch('getExperiences')
    this.$store.dispatch('getHomepage')
    this.$store.dispatch('getInterests')
    this.$store.dispatch('getIntroduction')
    this.$store.dispatch('getLearnings')
    this.$store.dispatch('getProjects')
  }
}).$mount('#app')
