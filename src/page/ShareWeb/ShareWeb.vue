<template>
  <div id="shareWeb">
    <mt-header fixed title="注册">
    </mt-header>
    <div class="content">
				<div class="form">
					<div class="form-item">
						<span class="phone"></span>
            <input type="tel" v-model="userData.userPhone" placeholder="请输入手机号">
					</div>
					<div class="form-item">
						<span class="check"></span>
						<input type="text" v-model="userData.randCode" placeholder="请输入验证码">
						<button class="getcheck" v-if="sendMsgDisabled" disabled @click="getCheckImg">已发送({{time}})</button>
						<button class="getcheck" v-if="!sendMsgDisabled" @click="getCheckImg">获取验证码</button>
					</div>
				  	<div class="form-item">
						<span class="psd"></span>
						<input type="password" v-model="userData.userPasswd" placeholder="请输入密码">
				  	</div>
				  	<div class="form-item">
						<span class="invitation"></span>
						<input type="text" v-model="userData.invitationCode" placeholder="请输入邀请码">
					</div>
				</div>
				<div class="tips">
					<input type="checkbox" v-model="isCheck"> 我已同意<span @click="rule">&lt;&lt;个股期权注册协议&gt;&gt;</span>
				</div>
				<div class="submit" @click="register">
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
			<!-- rule -->
			<div class="rule" v-if="isRule" @click="rule">
				<div class="rule-box">
					<div class="htm">
						<!-- <h2>{{ruleData.articleName}}</h2> -->
						<div v-html="ruleData.content"></div>
					</div>
					<!-- <div class="rule-close">关闭</div> -->
				</div>
			</div>
  </div>
</template>
<script>
import {getCheckImg,getCheckCode,register} from '@/services/getDetail'
import {setStore,getStore} from '@/config/mUtils'

export default {
  data() {
    return {
      time: 120,
      sendMsgDisabled: false,
      imgCheck:false,
      isCheck: false,
      isShow: false,
      isRule: false,				
      checkImg:'./static/img/shibai@2x.png',
      setImgCode:'',
      userData:{
        userPhone:'',
        userPasswd:'',
        randCode:'',
        invitationCode:''
      },
      ruleData:[]
    }
  },
  methods:{
    getCheckImg() {
      if(!this.checkPhone()){
        return
      }else{
        getCheckImg({'userPhone':this.userData.userPhone}).then(res =>{
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
    getCheckCode() {
      var data = {
        userPhone: this.userData.userPhone,
        setImgCode: this.setImgCode,
        isCheckExsit:'01'
      }
      var interval = null;
      getCheckCode(data).then(res =>{
        // console.log(res)
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
    //手机验证
    checkPhone(){
      var mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      //判断有没有输入手机号
      if(this.userData.userPhone.length == 0) {
        this.$toast({
          message: '请输入手机号'
        })
        return false
      }else if(!mobile.test(this.userData.userPhone)) {
        this.$toast({
          message: '请输入正确手机号'
        })
        return false
      }else {
        return true
      }
    },
    //弹出规则
    rule() {
      this.isRule = !this.isRule;
    },
    //获取规则
    // getRule() {
    //   getRule({articleType:'03'}).then(res => {
    //     console.log(res)
    //     if(res.state) {
    //       this.ruleData = res.data
    //     }else {
    //       this.$toast(res.msg)
    //     }
    //   })
    // },
    //打开关闭弹窗
    openMask() {
      this.isShow = true;
    },
    closeMask() {
      this.isShow = false;
    },
    register() {
      var v = this.userData.userPasswd
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
      if(this.userData.randCode.length ==0){
        this.$toast('请输入验证码')
        return
      }
      //密码正则验证
      if(!psdRule .test(v)) {
        this.$toast('请输入6~20位字符，至少包含数字、字母（区分大小写）两种')
        return
      }
      //用户需要勾选同意
      if(this.isCheck) {
        register(this.userData).then(res => {
          // console.log(res)
          if(res.state) {
            //注册成功跳转到下载页面
            var u = navigator.userAgent, app = navigator.appVersion;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
            var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isAndroid) {
              // alert("安卓机！")
              window.location.href = 'https://www.pgyer.com/wNvI'              
            }
            if (isIOS) {
              // alert("苹果机！")
              window.location.href = 'https://www.pgyer.com/UH7K'
            }
          }else {
            this.$toast(res.msg)
          }
        })
      } else {
        this.$toast('您必须同意注册协议，才能进行注册~')
      }  
    },
    getQueryUrl(name) {
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      // console.log(window.location)
      var search = window.location.href
      var l = search.indexOf('?')
      var r = search.substr(l+1).match(reg);
      // console.log(r)
      if(r!=null)return  decodeURI(unescape(r[2]),"utf-8"); return null;
    }
  },
  mounted() {
    //this.getRule()
    // 邀请注册时候，邀请码自动带入
    var invitationCode = this.getQueryUrl('invitationCode') || '';
    if (invitationCode.length !==0) {
      this.userData.invitationCode=invitationCode;
    }
  }
}
</script>
<style lang="less" scoped>
@mianColor:#e83737;
#shareWeb {
  background: url('../../assets/img/shareWeb-bj@2x.png');
  background-size: 100% 100%;
}
.mint-header {
  background-color: transparent;
  color:#333;
}
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
  margin-top: 4rem;
}
.form-item {
  position: relative;
  border-bottom: 1px solid #eee;
  margin-bottom: .5rem;
}
.form-item span {
  position: absolute;
  width: 0.7rem;
  height: 0.9rem;
  display: inline-block;
}
.form-item input {
  border: none;
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  padding: 0 0 0 2rem;
  font-size: .7rem;
}
.getcheck {
  position: absolute;
  top: .35rem;
  right: 1rem;
  height: 1.2rem;
  background-color: #fff;
  line-height: 1.2rem;
  padding-left: .8rem;
  font-size: .6rem;
  color: @mianColor;
  border: none;
  border-left: 1px solid #c0c0c0;
}
.phone {
  top: .6rem;
  left: .5rem;
  background: url("../../assets/img/phone@2x.png") no-repeat;
  background-size: contain;
}
.check {
  top: .6rem;
  left: .5rem;
  background: url("../../assets/img/check@2x.png") no-repeat;
  background-size: contain;
}
.psd {
  top: .6rem;
  left: .5rem;
  background: url("../../assets/img/passward@2x.png") no-repeat;
  background-size: contain;
}
.invitation {
  top: .6rem;
  left: .5rem;
  background: url("../../assets/img/invitation@2x.png") no-repeat;
  background-size: contain;
}
.tips {
  display: flex;
  align-items: center;
  color: #999;
  font-size: .7rem;
  padding-left: .4rem;
}
.tips span {
  display: inline-block;
  font-size: .7rem;
  color: #f8bd33;
}
.submit {
  margin-top: 2rem;
  padding: 0 .6rem;
  .mint-button {
    background-color: #f8bd33;
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
/*rule*/
.rule {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,.5);
}
.rule .rule-box {
  position: relative;
  width: 90%;
  height: 85%;
  margin: 3.3rem auto 0;
  border-radius: .2rem;
  overflow: auto;
  background-color: #fff;
}
.rule-box h2 {
  font-size: 1rem;
  text-align: center;
  padding: .3rem 0;
}
.rule-box p {
  margin: .5rem;
  font-size: .7rem;
}
</style>