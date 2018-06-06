import * as types from '../store/mutation-types'
import * as func from '../store/local'
import AXios from 'axios'

const state = func.local.get() || {
  data: {}
}
AXios.defaults.headers['X-Access-Token'] = state.data.token
const mutations = {
  [types.SET_LOGIN] (state, userInfo) {
    state.data = userInfo
    func.local.set(state)
    AXios.defaults.headers['X-Access-Token'] = state.data.token
  },
  [types.UPDATE_STOREID] (state, store) {
    state.data = store
  },
  [types.CLEAR_TOKEN] (state) {
    func.local.clear(state)
  }
}

const getters = {
  getData (state) {
    return state.data
  }
}
export default {
  state,
  mutations,
  getters
}
