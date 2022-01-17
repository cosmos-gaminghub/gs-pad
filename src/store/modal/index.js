import mutations from './mutations'
import getters from './getters'
import initialState from './state'

export const state = initialState

export default {
  namespaced: true,
  state,
  mutations,
  getters,
}