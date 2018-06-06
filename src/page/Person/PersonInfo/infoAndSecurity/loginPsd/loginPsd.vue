<template>
  <div id="changePayPsd">
    <mt-header fixed title="修改登录密码">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <div class="content">
      <div class="chose">
        <span>原始密码</span>
        <input type="password" placeholder="请输入原始密码" v-model="psd.oldUserPasswd">
      </div>
      
      <div class="chose">
        <span>新密码</span>
        <input type="password" placeholder="请输入新交易密码" v-model="psd.userPasswd">
      </div>
      
      <div class="chose">
        <span>确认密码</span>
        <input type="password" placeholder="请输入新交易密码" v-model="psd.againPsd">
      </div>
      <div class="chose">
        <p>密码长度6-16位  包含数字和字母</p>
      </div>
      <div class="submit">
        <mt-button type="primary" size="large" @click="toSure">确定</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import {registPsd} from '@/services/getDetail'
export default {
  data() {
    return {
      psd:{
        oldUserPasswd:"",
        userPasswd:"",
        againPsd:""
      }
    }
  },
  methods:{
    goback() {
      this.$router.go(-1)
    },

    toSure(){
      var psdRule = /^(?=.*\d)(?=.*[A-Za-z])[\da-zA-Z]{6,20}$/
      if(this.psd.oldUserPasswd == "") {
        this.$toast('请输入原始密码')
        return
      }
      if(!psdRule .test(this.psd.userPasswd)) {
        this.$toast('请输入新密码')
        return
      }
      if(!psdRule .test(this.psd.againPsd)) {
        this.$toast('请再次输入新密码')
        return
      }
      if(this.psd.userPasswd != this.psd.againPsd){
         this.$toast('两次输入密码不一致')
         return
      }
      console.log(this.psd)
      registPsd(this.psd).then(res =>{
        console.log(res)
        if(res.state){
          this.$toast(res.msg)
          this.$router.push('/Mine')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
#recharge {
  position: relative;
}
.content {
  padding: 2rem 0 0;
  height: 100vh;

  .chose{
    p{
      font-size:.6rem;
      color:#999;
    }
  }
  .submit {
    margin-top: 2.5rem;
    padding: 0 1rem;
    .mint-button {
      background-color: red;
      border-radius: 1rem;
    }
  }
}
</style>