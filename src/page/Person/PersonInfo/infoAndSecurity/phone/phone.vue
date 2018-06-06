<template>
  <div id="changePayPsd">
    <mt-header fixed title="修改手机号码">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <div class="content" v-if="isShow">
      <div class="chose">
        <span>原手机号码</span>
        <input type="text"  placeholder="请输入旧手机号码" v-model="obj.oldPhone">
      </div>
      
      <div class="chose">
        <span>验证码</span>
        <input type="text" placeholder="请输入验证码" v-model="obj.oldRandCode" style="padding-left:1.1rem">
       <span style="border:1px solid #e83737;color:#e83737;padding:0.1rem .2rem;border-radius:5px;text-align:center;font-size:.5rem;" @click="getCheckImg" v-if="!sendMsgDisabled">获取验证码</span>
        <span v-if="sendMsgDisabled" style="border:1px solid #e83737;color:#e83737;padding:0.1rem .2rem;border-radius:5px;text-align:center; font-size:.5rem;">已发送({{time}})</span>

      </div>
      
      <div class="chose">
        <span>新手机号码</span>
        <input type="text" placeholder="请输入新手机号码" v-model="obj.userPhone" >
      </div>
       <div class="chose">
        <span>验证码</span>
        <input type="text" placeholder="请输入验证码"  v-model="obj.randCode" style="padding-left:1.1rem">
        <span style="border:1px solid #e83737;color:#e83737;padding:0.1rem .2rem;border-radius:5px;text-align:center;font-size:.5rem;" @click="getCheckImgNew" v-if="!sendMsgDisabled1">获取验证码</span>
        <span v-if="sendMsgDisabled1" style="border:1px solid #e83737;color:#e83737;padding:0.1rem .2rem;border-radius:5px;text-align:center; font-size:.5rem;">已发送({{time1}})</span>
      </div>
      <div class="submit">
        <mt-button type="primary" size="large" @click="toSure">确定</mt-button>
      </div>
      <p style="color:#e83737;font-size:.6rem;text-align:center;padding:0.7rem 0;" @click="choosePhone">原手机号码丢失或已更换？</p>
    </div>



    <div class="content" v-if="!isShow">
      <div class="chose">
        <span>姓名</span>
        <input type="text" placeholder="请输入您的真实姓名" v-model="newObj.realName">
      </div>
      
      <div class="chose">
        <span>身份证号</span>
        <input type="text" placeholder="请输入您的身份证号" v-model="newObj.idCard">
      </div>
      
      <div class="chose">
        <span>新手机号码</span>
        <input type="text" placeholder="请输入新手机号码" v-model="newObj.userPhone">
      </div>
      <div class="chose">
        <span>验证码</span>
        <input type="text" placeholder="请输入验证码" v-model="newObj.randCode">
        <span style="border:1px solid #e83737;color:#e83737;padding:0.1rem .2rem;border-radius:5px;text-align:center;font-size:.5rem;" @click="getCheckImg2" v-if="!sendMsgDisabled2">获取验证码</span>
        <span v-if="sendMsgDisabled2" style="border:1px solid #e83737;color:#e83737;padding:0.1rem .2rem;border-radius:5px;text-align:center; font-size:.5rem;">已发送({{time2}})</span>
      </div>
      <div class="submit">
        <mt-button type="primary" size="large" @click="toSures">确定</mt-button>
      </div>
    </div>
    <!-- 验证码弹窗 -->
      <div class="mask" v-if="isShowTrue">
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

      <div class="mask" v-if="isShowTrue1">
        <div class="box">
          <div class="close" @click="closeMaskNew">X</div>
          <div class="title">请输入图形验证码</div>
          <div class="m-contain">
            <input type="text" v-model="setImgCode" placeholder="请输入">
            <img :src="checkImg" alt="" @click="getCheckImgNew">
          </div>
          <div class="footer">
            <div class="blue" @click="getCheckCodeNew" >确认</div>
            
          </div>
        </div>
      </div>

      <div class="mask" v-if="isShowTrue2">
        <div class="box">
          <div class="close" @click="closeMask1">X</div>
          <div class="title">请输入图形验证码</div>
          <div class="m-contain">
            <input type="text" v-model="setImgCode" placeholder="请输入">
            <img :src="checkImg" alt="" @click="getCheckImg2">
          </div>
          <div class="footer">
            <div class="blue" @click="getCheckCode1" >确认</div>
            
          </div>
        </div>
      </div>
  </div>
</template>

<script>
 import {modifyPhone,logout,getCheckImg,getCheckCode,modify} from '@/services/getDetail'
export default {
  data() {
    return {
      isShow:true,
      //oldPhone:"18510464347",
      time:120,
      time1:120,
      time2:120,
      obj:{
        userPhone:"",
        randCode:"",
        oldPhone:"",
        oldRandCode:"",
      },
      isShowTrue:false,
      sendMsgDisabled:false,
      setImgCode:"",
      sendMsgDisabled1:false,
      isShowTrue1:false,
      sendMsgDisabled2:false,
      isShowTrue2:false,
      newObj:{
        userPhone:"",
        realName:"",
        idCard:"",
        randCode:"",
      }
    }
  },
  methods:{
    goback() {
      this.$router.go(-1)
    },
    choosePhone(){
      this.isShow = false;
    },
    openMask(){
      this.isShowTrue = true;
    },
    closeMask(){
      this.isShowTrue = !this.isShowTrue;
    },
    getCheckImg() {
      if(!this.checkPhone(this.obj.oldPhone)){
        return
      }else{
        getCheckImg({'userPhone':this.obj.oldPhone}).then(res =>{
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
    openMaskNew(){
      this.isShowTrue1 = true;
    },
    closeMaskNew(){
      this.isShowTrue1 = !this.isShowTrue1;
    },
    getCheckImgNew(){
      if(!this.checkPhone(this.obj.userPhone)){
        return
      }else{
        getCheckImg({'userPhone':this.obj.userPhone}).then(res =>{
          // console.log(res.data)
          if(res.state) {
            this.checkImg = 'data:image/png;base64,'+res.data.image
            this.openMaskNew()
          }else {
            this.$toast(res.msg)
          }
        })
      }
    },
    //手机验证
    checkPhone(phone){
      console.log(phone)
      var mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      //判断有没有输入手机号
      if(phone.length == 0) {
        this.$toast({
          message: '请输入手机号'
        })
        return false
      }else if(!mobile.test(phone)) {
        this.$toast({
          message: '请输入正确手机号'
        })
        return false
      }else {

        return true
      }
    },
    //旧手机号码
    getCheckCode() {
      //this.checkPhone();
      var data = {
        userPhone: this.obj.oldPhone,
        setImgCode: this.setImgCode,
      }
      console.log(data)
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
    //新手机号码
     getCheckCodeNew() {
        //this.checkPhone();
        var data = {
          userPhone: this.obj.userPhone,
          setImgCode: this.setImgCode,
        }
        console.log(data)
        var interval = null;
        getCheckCode(data).then(res =>{
          console.log(res)
          this.setImgCode='';   
          if(res.state) {
            this.imgCheck = true
            this.closeMaskNew()
            //短信发送成功，倒计时120秒 
            this.sendMsgDisabled1 = true;
            interval = window.setInterval(() => {
              if ((this.time1--) <= 0) {
                this.time = 120;
                this.sendMsgDisabled1 = false;
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
      console.log(this.obj)
      if(!this.checkPhone(this.obj.oldPhone)){
        return
      };
      if(this.obj.oldRandCode == ""){
        this.$toast("请输入旧手机获取的验证码")
        return;
      }
      if(!this.checkPhone(this.obj.userPhone)){
        return
      }
      if(this.obj.randCode == ""){
        this.$toast("请输入新手机获取的验证码")
        return;
      }
      modifyPhone(this.obj).then(res => {
        console.log(res)
        if(res.state){
          this.$toast(res.msg)
        }
      })
    },
    openMask1(){
      this.isShowTrue2 = true;
    },
    closeMask1(){
      this.isShowTrue2 = !this.isShowTrue2;
    },

    getCheckImg2() {
      if(!this.checkPhone(this.newObj.userPhone)){
        return
      }else{
        getCheckImg({'userPhone':this.newObj.userPhone}).then(res =>{
          // console.log(res.data)
          if(res.state) {
            this.checkImg = 'data:image/png;base64,'+res.data.image
            this.openMask1()
          }else {
            this.$toast(res.msg)
          }
        })
      }
    },
    getCheckCode1() {
      //this.checkPhone();
      var data = {
        userPhone: this.newObj.userPhone,
        setImgCode: this.setImgCode,
      }
      console.log(data)
      var interval = null;
      getCheckCode(data).then(res =>{
        console.log(res)
        this.setImgCode='';   
        if(res.state) {
          this.imgCheck = true
          this.closeMask1()
          //短信发送成功，倒计时120秒 
          this.sendMsgDisabled2 = true;
          interval = window.setInterval(() => {
            if ((this.time2--) <= 0) {
              this.time2 = 120;
              this.sendMsgDisabled2 = false;
              window.clearInterval(interval);
            }
          }, 1000);
          this.$toast(res.msg)
        }else {
          this.$toast(res.msg)
        }
      })
    },
    toSures(){
      modify(this.newObj).then(res => {
        console.log(res)
        if(res.state){
          this.$toast(res.msg)
        }else{
          this.$toast(res.msg)
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
@mianColor:#e83737;
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