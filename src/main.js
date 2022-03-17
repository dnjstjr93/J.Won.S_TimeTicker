import Vue from 'vue'
import App from './App.vue'
import store from "./store"
import {library} from '@fortawesome/fontawesome-svg-core'
import {faSun, faCloudSun, faCloud, faCloudRain, faCloudShowersHeavy, faBolt, faSnowflake, faSmog} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(faSun, faCloudSun, faCloud, faCloudRain, faCloudShowersHeavy, faBolt, faSnowflake, faSmog)

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')