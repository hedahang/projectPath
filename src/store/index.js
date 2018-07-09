import Vue from 'vue'
import Vuex from 'vuex'

import user from './user/index'

Vue.use(Vuex)

let modules = {
    ...user,
}


export default new Vuex.Store({
    modules
})