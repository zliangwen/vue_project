<template>
  <div id="mine" style="background:#fff;">
    <mt-header fixed title="登录">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <div class="content">
      <p class="title">欢迎回来</p>
      <div class="form">
        <div class="form-item">
          <span class="phone"></span>
          <input type="tel" v-model="userData.userPhone" placeholder="请输入手机号">
        </div>
        <div class="form-item">
          <span class="psd"></span>
          <input type="password" v-model="userData.userPasswd" placeholder="请输入密码">
        </div>
      </div>
      <div class="submit">
        <mt-button type="primary" size="large" @click="login">登录</mt-button>        
      </div>
      <div class="tips">
        <router-link to="/mine/register">立即注册</router-link>
        <i class="split"></i>
        <router-link to="/mine/forgetPsd">忘记密码</router-link>
      </div>
    </div>
    <!-- <m-tabbar></m-tabbar> -->
  </div>
</template>

<script>
// import mTabbar from '@/components/tabbar'
import {login} from '@/services/getDetail'
import {setStore,getStore} from '@/config/mUtils'
export default {
  data() {
    return {
      AccessToken:'',
      userData: {
        userPhone:'',
        userPasswd:'',
      }
    }
  },
  // components: {
  //   mTabbar
  // },
  methods:{
    goback() {
      this.$router.go(-1)
    },
    login() {
      var mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      //判断有没有输入手机号
      if(this.userData.userPhone.length == 0) {
        this.$toast({
          message: '请输入手机号'
        })
        return
      }
      //判断手机号格式
      if(!mobile.test(this.userData.userPhone)) {
        this.$toast({
          message: '请输入正确手机号'
        })
        return
      }
      if(this.userData.userPasswd.length == 0) {
        this.$toast({
          message: '请输入密码'
        })
        return
      }
      login(this.userData).then(res => {
        console.log(res)
        if(res.state) {
          // 设置token
          setStore('accesstoken',res.data.tokenId)
          setStore('tabbarValue','person')
          this.$router.push('/person')
        }else {
          this.$toast(res.msg)
        }
        
      })
    }
  }
}
</script>

<style lang="less" scoped>
@mianColor:#e83737;
.content {
  width: 90%;
  overflow: hidden;
  height: 100vh;
  margin: 0 auto;
  padding-top: 4.4rem;
}
.content .title {
  font-size: .9rem;
  color: #333;
}
.content .form {
  margin-top: 2rem;
}
.form input {
  border:none;
}
.form-item {
  position: relative;
  margin-bottom: .5rem;
  border-bottom: 1px solid #eee;
}
.form-item span {
  position: absolute;
  width: 0.7rem;
  height: 0.9rem;
  display: inline-block;
}
.form-item input {
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  padding: 0 0 0 2rem;
  font-size:.7rem;
}
.phone {
  top: .6rem;
  left: .5rem;
  background: url("../../assets/img/phone@2x.png") no-repeat;
  background-size: contain;
}
.psd {
  top: .6rem;
  left: .5rem;
  background: url("../../assets/img/passward@2x.png") no-repeat;
  background-size: contain;
}
.submit {
  margin-top: 2.5rem;
  padding: 0 .6rem;
  .mint-button {
    background-color: @mianColor;
    border-radius: 1rem;
  }
}
.tips {
  margin-top: 1.6rem; 
  text-align: center;
}
.split {
  display: inline-block;
  width: 1px;
  height: .6rem;
  margin: 0 1rem;
  background-color: #999;
}
.tips a {
  display: inline-block;
  font-size: .6rem;
  color: #999;
}
</style>