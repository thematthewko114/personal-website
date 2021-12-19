import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#01DCFE',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c',
        card: '#DDDDDD',
        background: '#FFFFFF'
      },
      dark:{
        primary: '#3f00ff',
        card: '#505050',
        background: '#303030'
      }
    }
  }
});
