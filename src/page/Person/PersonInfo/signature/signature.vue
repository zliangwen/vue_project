<template>
  <div id="personInfo">
    <mt-header fixed title="电子签名">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <div class="concent clearfix">
      <span>自动签署</span>
      <mt-switch v-model="value" style="float:right"></mt-switch>
    </div>
    
  </div>
</template>

<script>
import {getPersonData,logout} from '@/services/getDetail'
import {setStore,removeStore} from '@/config/mUtils'
export default {
  data() {
    return {
      userName:'',
      baseImg:'../../src/assets/img/userAll.png',
      isSet:false,
      value:false
     
    }
  },
  methods:{
    goback() {
      this.$router.go(-1)
    },
    toChangeName() {
      this.$router.push('/person/personInfo/changeName')
    },
    
    logout() {
      logout().then(res => {
        removeStore('accesstoken')
        setStore('tabbarValue','home')
        this.$router.push('/home')
      })
    },
    initData() {
      getPersonData().then(res => {
        console.log(res)
        if(res.state) {
          this.userName = res.data.userNickName
          this.baseImg = res.data.userHeadPortrait?res.data.userHeadPortrait:this.baseImg
        }else {
          this.$toast(res.msg)
        }
      })
    },
   
   
  },
  mounted() {
    this.initData()
  }
}
</script>

<style lang="less" scoped>
.clearfix:after{ display: block; clear: both; content: "\0020"; visibility: hidden; height: 0 }
@mianColor:#e83737;
.concent{
  margin-top:2rem;
  padding:.7rem 3%;
  background:#fff;
  span{
    float:left;
    font-size:.7rem;
  }

  
}
</style>