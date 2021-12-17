import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
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
        card: '#404040',
        background: colors.indigo.base
      }
    }
  }
});
