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
  render: function (h) { return h(App) }
}).$mount('#app')
