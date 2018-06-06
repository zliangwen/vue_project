<template>
  <div id="register">
    <mt-header fixed title="找回密码">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <div class="content">
      <div class="form">
        <div class="form-item">
          <span class="phone"></span>
          <input type="tel" v-model="userPhone" placeholder="请输入手机号">
        </div>

        <div class="form-item">
          <span class="check"></span>
          <input type="text" v-model="randCode" placeholder="请输入验证码">
          <button class="getcheck" v-if="sendMsgDisabled" disabled @click="getCheckImg">已发送({{time}})</button>
          <button class="getcheck" v-if="!sendMsgDisabled" @click="getCheckImg">获取验证码</button>
        </div>

        <div class="form-item">
          <span class="psd"></span>
          <input type="password" v-model="userPasswd" placeholder="请输入密码">
        </div>

          <div class="form-item">
            <span class="psd"></span>
          <input type="password" v-model="rePasswd" placeholder="请再次输入密码">
          </div>

      </div>
      <div class="submit" @click="forget">
        <mt-button type="primary" size="large">确定</mt-button>                  
      </div>
    </div>
    <!-- mask弹窗  -->
			<div class="mask" v-if="isShow">
				<div class="box">
					<div class="close" @click="closeMask">X</div>
					<div class="title">请输入图形验证码</div>
					<div class="m-contain">
						<input type="text" v-model="setImgCode" placeholder="请输入">
						<img :src="checkImg" alt="" @click="getCheckImg">
					</div>
					<div class="footer">
						<div class="blue" @click="getCheckCode">确认</div>
					</div>
				</div>
			</div>
  </div>
</template>
<script>
import {getCheckImg,getCheckCode,forget} from '@/services/getDetail'
import {setStore,getStore} from '@/config/mUtils'
export default {
  data(){
    return {
      time: 120,
      sendMsgDisabled: false,
      isShow: false,	
      imgCheck:false,      			
      checkImg:'./static/img/shibai@2x.png',
      setImgCode:'',
      userPhone:'',
      userPasswd:'',
      randCode:'',
      rePasswd:''
    }
  },
  methods:{
    goback() {
      this.$router.go(-1)
    },
    getCheckImg() {
      if(!this.checkPhone()){
        return
      }else{
        getCheckImg({
          'userPhone':this.userPhone
        }).then(res =>{
          // console.log(res.data)
          if(res.state){
            this.checkImg = 'data:image/png;base64,'+res.data.image
          }
          else {
            this.$toast(res.msg)
          }
          this.openMask()
        },err => {
           
        })
        .catch(e=>{
          console.log(e)
        })
      }
    },
    getCheckCode() {
      var data = {
        userPhone: this.userPhone,
        setImgCode: this.setImgCode
      }
      var interval = null;
      getCheckCode(data).then(res =>{
        // console.log(res)
        
        if(res.state) {
          this.imgCheck = true         
          this.setImgCode='';
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
    openMask() {
      this.isShow = true;
    },
    closeMask() {
      this.isShow = false;
    },
    forget() {
      var v = this.userPasswd
      var psdRule = /^(?=.*\d)(?=.*[A-Za-z])[\da-zA-Z]{6,20}$/
      if(!this.checkPhone()){
        return
      }
      //必须先获取验证码
      if(!this.imgCheck) {
        this.$toast('您必须先获取验证码')
        return
      }
      //验证码不能为空
      if(this.randCode.length ==0){
        this.$toast('请输入验证码')
        return
      }
      //密码正则验证
      if(!psdRule .test(v)) {
        this.$toast('请输入6~20位字符，至少包含数字、字母（区分大小写）两种')
        return
      }
      if(this.rePasswd.length == 0) {
        this.$toast('请再次输入您的密码')
        return
      }
      if(this.userPasswd !== this.rePasswd){
        this.$toast('两次密码不一致，请检查')
        return
      }
      var data = {
        userPhone:this.userPhone,
        userPasswd:this.userPasswd,
        randCode:this.randCode
      }
      forget(data).then(res => {
        console.log(res)
        if(res.state) {
          this.$toast(res.msg)
          setTimeout(()=> {
            this.$router.push('/mine')
          },2000)
        }else {
          this.$toast(res.msg)
        }
      })
    },
    //手机验证
    checkPhone(){
      var mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      //判断有没有输入手机号
      if(this.userPhone.length == 0) {
        this.$toast('请输入手机号')
        return false
      }else if(!mobile.test(this.userPhone)) {
        this.$toast('请输入正确手机号')
        return false
      }else {
        return true
      }
    },
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
  padding-top: 2rem;
}
.form-item {
  position: relative;
  margin: .5rem 0;
  border-bottom: 1px solid #eee;
}
.form-item span {
  position: absolute;
  width: 0.7rem;
  height: 0.9rem;
  display: inline-block;
}
.form-item input {
  border: none;
  margin: 0;
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  padding: 0 0 0 2rem;
  font-size:.7rem;
}
.getcheck {
  position: absolute;
  top: .35rem;
  right: 1rem;
  height: 1.2rem;
  line-height: 1.2rem;
  padding-left: .8rem;
  font-size: .6rem;
  color: @mianColor;
  background-color: #fff;
  border: none;
  border-left: 1px solid #c0c0c0;
}
.phone {
  top: .6rem;
  left: .5rem;
  background: url("../../../assets/img/phone@2x.png") no-repeat;
  background-size: contain;
}
.check {
  top: .6rem;
  left: .5rem;
  background: url("../../../assets/img/check@2x.png") no-repeat;
  background-size: contain;
}
.psd {
  top: .6rem;
  left: .5rem;
  background: url("../../../assets/img/passward@2x.png") no-repeat;
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
/*mask*/
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
