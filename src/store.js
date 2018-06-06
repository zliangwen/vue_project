/**
 * Created by Administrator on 2017/7/20.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './store/action'
import Login from './store/login'
import setFinance from './store/Finance'

Vue.use(Vuex)
const vuex = new Vuex.Store({
  actions,
  modules: {
    Login,
    setFinance
  }
})

export default vuex
