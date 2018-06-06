<template>
  <div id="tabbar">
    <mt-tabbar v-model="selected">
      <mt-tab-item id="home">
        <!-- <img slot="icon" src="../assets/100x100.png"> -->
        <i slot="icon" class="iconfont icon-zhuye2"></i>
        首页
      </mt-tab-item>
      <mt-tab-item id="buyTogether">
        <!-- <img slot="icon" src="../assets/100x100.png"> -->
        <i slot="icon" class="iconfont icon-qianbao"></i>        
        理财
      </mt-tab-item>
      <mt-tab-item id="person">
        <!-- <img slot="icon" src="../assets/100x100.png"> -->
        <i slot="icon" class="iconfont icon-zhanghuffffffpx"></i>
        账户
      </mt-tab-item>
      <!-- <mt-tab-item v-if="!isLogin" id="mine">
        <i slot="icon" class="iconfont icon-people"></i> 
        账户
      </mt-tab-item> -->
      <mt-tab-item  id="open">
        <!-- <img slot="icon" src="../assets/100x100.png"> -->
        <i slot="icon" class="iconfont icon-gengduo2"></i>    
        <!-- <i slot="icon" class="iconfont icon-appreciatefill"></i> -->
        更多
      </mt-tab-item>

    </mt-tabbar>
  </div>
</template>

<script>
import {setStore,getStore} from '@/config/mUtils'
export default {
  data() {
    return {
      selected: '',
      // isLogin: false
      showUrl:true,
      selectList:[
        {name:"首页",id:"home",imgUrl:"../../static/img/home1.png"},
        {name:"合买",id:"buyTogether",imgUrl:"../../static/img/hehuo1.png"},
      ]
    }
  },
  watch:{
    selected(newVal,oldVal) {
      this.$router.push(newVal)
      setStore('tabbarValue',newVal)
      this.showUrl=false
    }
  },
  // methods:{
    
  // },
  mounted(){
    // let AccessToken = getStore('accesstoken') || ''
    // if(AccessToken) {
    //   this.isLogin = true
    // }else {
    //   this.isLogin = false
    // }
    this.selected = getStore('tabbarValue') || 'home'
    console.log(this.selected)
    //this.showUrl=false
  }
}
</script>

<style lang="less" scopeds>
#tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  color:#000;
  z-index: 2;
  .is-selected {
    color:red;
  }
  .iconfont {
    font-size: .9rem;
  }
  .mint-tab-item-icon {
    margin: 0 auto;
  }
}

</style>
