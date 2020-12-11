import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import de from 'vuetify/src/locale/de';
import '@fortawesome/fontawesome-free/css/all.css';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { de },
    current: 'de',
  },
  icons: {
    iconfont: 'fa',
  },
});
