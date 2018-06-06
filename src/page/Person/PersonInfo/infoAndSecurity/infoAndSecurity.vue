<template>
  <div id="personInfo">
    <mt-header fixed title="个人信息">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <ul class="content">
     
      <li class="infoList"  @click="conform(1)">
        <!-- 修改用户名 @click="toChangeName" -->
        <span>手机号码</span>
        <div>
          <i class="iconfont icon-iconfonti"></i>
        </div>
      </li>
      <li class="infoList"  @click="conform(2)">
        <!-- 修改用户名 @click="toChangeName" -->
        <span>登录密码</span>
        <div>
          <i class="iconfont icon-iconfonti"></i>
        </div>
      </li>
      <!-- <li class="infoList"  @click="conform(3)">
        <span>手势密码</span>
        <div>
          <i class="iconfont icon-iconfonti"></i>
        </div>
      </li> -->
      <li class="infoList"  @click="conform(4)">
        <!-- 修改用户名 @click="toChangeName" -->
        <span>交易密码</span>
        <div>
          <i class="iconfont icon-iconfonti"></i>
        </div>
      </li>
      
      <!-- <div class="infoList" v-if="!isSet" @click="toSetPayPsd">
        <span>设置交易密码</span>
        <i class="iconfont icon-right"></i>
      </div>
      <div class="infoList" v-if="isSet" @click="toChangePayPsd">
        <span>修改交易密码</span>
        <i class="iconfont icon-right"></i>
      </div> -->
     
		</ul>
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
    conform(type){
      if(type == "1"){
       this.$router.push('/person/personInfo/infoAndSecurity/phone/phone')
      }else if(type=="2"){
        this.$router.push('/person/personInfo/infoAndSecurity/loginPsd/loginPsd')
      }else if(type=="3"){
       	this.$router.push('/person/personInfo/infoAndSecurity/gesturesPsd/gesturesPsd')
      }else if(type== "4"){
      	//this.$router.push('/person/personInfo/changePayPsd')
        this.$router.push('/person/personInfo/setPayPsd')    
      }
    },
   
  },
  mounted() {
    this.initData()
  }
}
</script>

<style lang="less" scoped>
@mianColor:#e83737;
.content {
  background-color:#fff;
  overflow: hidden;
  padding: 2rem .6rem 0;

  .infoList {
    height: 2rem;
    font-size: .6rem;
    color: #333;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      display: inline-block;
      height: 1.5rem;
    }
    div {
      display: flex;
      align-items: center;
    }
    i.iconfont {
      margin-left: .3rem;
      color:#999;
    }
    &:last-of-type {
      border-bottom: none;
    }
  }
  li:hth-of-type(3){
    border-bottom:.5rem solid #f4f4f4;
  }
  
}
.mint-popup-bottom{
  width:90%;
  ul{
    width:100%;
    li{
      text-align:center;
      border-bottom:1px solid #eee;
      font-size:0.7rem;
      padding:0.3rem 0;
    }
  }
}
</style>