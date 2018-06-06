<template>
  <div id="changePayPsd">
    <mt-header fixed title="修改交易密码">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <div class="content">
      <div class="chose">
        <span>手机号码</span>
        <input type="text" placeholder="请输入手机号码" v-model="obj.userPhone">
      </div>
      <div class="chose">
        <span>验证码</span>
        <input type="text" placeholder="请输入验证码" v-model="obj.randCode" style="padding-left:1.1rem;">
        <span style="border:1px solid #e83737;color:#e83737;padding:0.1rem .2rem;border-radius:5px;text-align:center;font-size:.5rem;" @click="getCheckImg" v-if="!sendMsgDisabled">获取验证码</span>
        <span v-if="sendMsgDisabled" style="border:1px solid #e83737;color:#e83737;padding:0.1rem .2rem;border-radius:5px;text-align:center; font-size:.5rem;">已发送({{time}})</span>
      </div>
      <div class="chose">
        <span>新交易密码</span>
        <input type="password" placeholder="请输入新交易密码" v-model="obj.newPasswd">
      </div>
      
      <div class="chose">
        <span>确认交易密码</span>
        <input type="password" placeholder="请输入新交易密码" v-model="obj.passwd">
      </div>
      <div class="submit">
        <mt-button type="primary" size="large" @click="toSure">确定</mt-button>
      </div>
    </div>
    <!-- 验证码弹窗 -->
      <div class="mask" v-if="isShow">
        <div class="box">
          <div class="close" @click="closeMask">X</div>
          <div class="title">请输入图形验证码</div>
          <div class="m-contain">
            <input type="text" v-model="setImgCode" placeholder="请输入">
            <img :src="checkImg" alt="" @click="getCheckImg">
          </div>
          <div class="footer">
            <div class="blue" @click="getCheckCode" >确认</div>
            
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {modifyPass,getCheckCode,getCheckImg} from '@/services/getDetail'
export default {
  data() {
    return {
      isShow:false,
      obj:{
        userPhone:"",
        randCode:"",
        newPasswd:"",
        passwd:""
      },
      checkImg:"",
      setImgCode:"",
      time:120,
      sendMsgDisabled:false,
    }
  },
  methods:{
    goback() {
      this.$router.go(-1)
    },
    openMask(){
      this.isShow = true
    },
    closeMask(){
      this.isShow = !this.isShow;
    },
    getCheckImg() {
      if(!this.checkPhone()){
        return
      }else{
        getCheckImg({'userPhone':this.obj.userPhone}).then(res =>{
          // console.log(res.data)
          if(res.state) {
            this.checkImg = 'data:image/png;base64,'+res.data.image
            this.openMask()
          }else {
            this.$toast(res.msg)
          }
        })
      }
    },
    //手机验证
    checkPhone(){
      var mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      //判断有没有输入手机号
      if(this.obj.userPhone.length == 0) {
        this.$toast({
          message: '请输入手机号'
        })
        return false
      }else if(!mobile.test(this.obj.userPhone)) {
        this.$toast({
          message: '请输入正确手机号'
        })
        return false
      }else {

        return true
      }
    },
    //获取验证码
    getCheckCode() {
      this.checkPhone();
      var data = {
        userPhone: this.obj.userPhone,
        setImgCode: this.setImgCode,
      }

      var interval = null;
      getCheckCode(data).then(res =>{
        console.log(res)
        this.setImgCode='';   
        if(res.state) {
          this.imgCheck = true
          this.closeMask()
          //短信发送成功，倒计时120秒 
          this.sendMsgDisabled = true;
          interval = window.setInterval(() => {
            if ((this.time--) <= 0) {
              this.time = 120;
              this.sendMsgDisabled = false;
              window.clearInterval(interval);
            }
          }, 1000);
          this.$toast(res.msg)
        }else {
          this.$toast(res.msg)
        }
      })
    },
    toSure(){
      //  this.checkPhone();
      console.log(this.obj)
      var psdRule = /^[0-9]*$/
      if(!(psdRule.test(this.obj.newPasswd))) {
        this.$toast('请输入密码(6位纯数字)')
        return
      }
      if(this.obj.newPasswd.length > 6){
        this.$toast('密码只限6位纯数字')
        return
      }
      if(this.obj.newPasswd != this.obj.passwd){
        this.$toast('两次输入密码不一致')
        return
      } 
      modifyPass(this.obj).then(res=>{
        console.log(res)
        if(res.state){
          this.$toast("修改成功")
        }else{
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
@mianColor:#e83737;
.content {
  padding: 2rem 0 0;
  height: 100vh;
  .submit {
    margin-top: 2.5rem;
    padding: 0 1rem;
    .mint-button {
      background-color: red;
      border-radius: 1rem;
    }
  }
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.5);
}
.mask .box {
  position: relative;
  width: 10.2rem;
  margin: 7.8rem auto 0;
  border-radius: .2rem;
  overflow: hidden;
  background-color: #fff;
}
.mask .close {
  position: absolute;
  top: .5rem;
  right: 0;
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  font-size: .8rem;
  color: #ccc;
}
.mask .box .title {
  color: #333;
  margin: .5rem;
  height: 2rem;
  line-height: 2rem;
  font-size: .75rem;
  text-align: center;
}
.mask .m-contain {
  margin: 0 auto;
  height: 2rem;
  padding: 0 .5rem;
  display: flex;
  justify-content: space-between;
}
.mask input {
  color: #333;  
  margin: 0;
  padding: 0;
  font-size: .7rem;
  padding-left: .3rem;
  display: inline-block;
  width: 60%;
  height: 100%;
}
.mask img {
  display: inline-block;
  margin-left: -.1rem;
  width: 40%;
  height: 100%;
}
.mask .footer {
  display: flex;
  justify-content: center;
}
.footer div {
  width: 100%;
  height: 1.7rem;
  margin-top: 1rem;
  color:#fff;
  font-size: .7rem;
  line-height: 1.7rem;
  text-align: center;
  background-color: @mianColor;
}
</style>