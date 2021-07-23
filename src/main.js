import Vue from 'vue';
import VeeValidate from 'vee-validate';

import { store } from './_store';
import { router } from './_helpers';
import App from './App';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Autocomplete from 'v-autocomplete';
import ArgonDashboard from './plugins/argon-dashboard';
import VueExcelViewer from '@uublue/vue-excel-viewer'
import '@uublue/vue-excel-viewer/lib/vue-excel-viewer.css'


Vue.use(VueExcelViewer)

Vue.use(VeeValidate);

Vue.use(VueAxios, axios);

Vue.use(Autocomplete);

Vue.use(ArgonDashboard);


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});