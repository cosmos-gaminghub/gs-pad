import Vuex from 'vuex'
import Vue from 'vue'
import authModule from './auth'
import modalModule from './modal'

Vue.use(Vuex)

const store = {
  modules: {
    'auth': authModule,
    'modal': modalModule,
  },
}

export default new Vuex.Store(store)