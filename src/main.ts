import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {library} from '@fortawesome/fontawesome-svg-core'
import {faEye, faTrash, faCheck, faTimes, faUser} from '@fortawesome/free-solid-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'


require('./assets/scss/main.scss');


library.add(faEye, faTrash, faCheck, faTimes, faUser, faGithub);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
