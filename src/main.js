import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import ElementUI from 'element-ui'

import 'mint-ui/lib/style.css'
import './xiaoshou/iconfont.css'
//公共样式（xu）
import '../static/common.css'

import store from './store'
import Axios from 'axios'
import Calendar from 'vue-mobile-calendar'
 


//import ElementUI from 'element-ui'
// import { AlertPlugin, ToastPlugin, LoadingPlugin } from 'vux'

Vue.prototype.$http = Axios
// Axios.defaults.baseURL = 'http://test.mihutime.com/seller/v1'

// Vue.use(AlertPlugin)
// Vue.use(ToastPlugin)
// Vue.use(LoadingPlugin)
Vue.use(MintUI)
Vue.use(Calendar)
// Vue.use(vueBridge)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$goRoute = function (index) {
  this.$router.push(index)
}
// Vue.prototype.$bridge = vueBridge
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // store,
  router,
  // template: '<App/>',
  // components: { App }
  render: h => h(App)
})

window.alert = function(){
	console.log(Vue)
}