<template>
  <div id="setPayPsd">
    <mt-header fixed title="设置支付密码">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
      <mt-button  slot="right" style="font-size:.6rem" @click="toChangePayPsd">修改支付密码</mt-button>
    </mt-header>
    <div class="content">
      <div class="chose" style="background-color:#fff;">
        <span style="font-size:.6rem;">交易密码</span>
        <input type="password" placeholder="请输入交易密码" style="font-size:.6rem;" v-model="psd.paymentCode">
      </div>
      <div class="chose" style="background-color:#fff">
        <span style="font-size:.6rem;">确认交易密码</span>
        <input type="password" placeholder="请确认交易密码" style="font-size:.6rem;" v-model="psd.passwd">
      </div>
      <div class="submit">
        <mt-button type="primary" size="large" @click="toSure">确定</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import {setPass} from '@/services/getDetail'
export default {
  data() {
    return {
      psd:{
        paymentCode:"",
        passwd:""
      }
    }
  },
  methods:{
    goback() {
      this.$router.go(-1)
    },
    toChangePayPsd() {
      this.$router.push('/person/personInfo/changePayPsd')      
    },
    toSure(){
      var psdRule = /^[0-9]*$/
      if(!(psdRule.test(this.psd.paymentCode))) {
        this.$toast('请输入密码(6位纯数字)')
        return
      }
      if(this.psd.paymentCode.length > 6){
        this.$toast('密码只限6位纯数字')
        return
      }
      if(this.psd.paymentCode != this.psd.passwd){
        this.$toast('两次输入密码不一致')
        return
      }

      setPass(this.psd).then(res => {
        console.log(res)
        if(res.state){
          this.$toast(res.msg)
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
#recharge {
  position: relative;
}
.content {
  padding: 2rem 0 0;
  font-size:.6rem;
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