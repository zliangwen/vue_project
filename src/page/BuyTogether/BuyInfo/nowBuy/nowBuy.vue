<template>
  <div id="betting">
    <mt-header fixed title="立即投资">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <div class="content">
      <ul class="clearfix">
          <li class="clearfix">
            <span class="left">剩余可投金额：</span>
            <span class="right red" >{{money | toFixed}}</span>
          </li>
          <li class="clearfix" v-if="show">
            <span class="left">投资金额：</span>
            <input  type="text" v-model="longMomey"  class="right" placeholder="请输入投资金额(元)" v-on:input="changeMoney"/>
          </li>
          <li class="clearfix" v-if="!show">
            <span class="left">认购金额：</span>
            <input  type="text" v-model="longMomey"  class="right" placeholder="请输入认购金额(元)" v-on:input="changeInput"/>
          </li>
          <li class="clearfix" @click="choose(1)" v-if="showAction">
            <span class="left">收益券：</span>
            <span  class="right" v-if="showAndHide">您有{{count}}张收益券</span>
            <span class="right" v-if="!showAndHide">已选择价值{{couponMoney}}元收益券</span>
          </li>
          <li class="clearfix" @click="choose(2)" v-if="showAction">
            <span class="left">加息券：</span>
            <span  class="right" v-if="showAndHide">您有{{count1}}张加息券</span>
            <span class="right" v-if="!showAndHide">已选择价值{{raiseMoney}}%加息券</span>
          </li>
      </ul>
    <footer class="footer">
      <button @click="toBuy(1)" v-if="show">立即投资</button>
       <button @click="toBuy(2)" v-if="!show">立即认购</button>
    </footer>
    </div>

    <!--仿支付宝支付密码框-->
    <div class="password" v-if="passwordTrue">
        <div class="pay-tool" >
          <div class="pay-tool-title border-bottom">
            <span class="icon" @click="backHandle">
              <img src="../../../../../static/img/back.png" />
            </span><strong>请输入交易密码</strong>
          </div>
          <div class="pay-tool-content">
            <div class="pay-tool-inputs">
              <div class="item" v-for="i in items">
                <span class="icon_dot" v-if="passwordList[i]"></span>
              </div>
            </div>
            <div class="pay-tool-link" @click="floage">忘记密码？</div>
          </div>
          <div class="pay-tool-keyboard">
            <ul>
              <li @click="keyUpHandle($event)" v-for="val in keys">
                {{ val }}
              </li>
              <li class="del" @click="delHandle"><span class="icon-del"><</span></li>
            </ul>
          </div>
        </div>
    </div>
    



  </div>
</template>

<script>
import {investProject,isRealName,investProjectPre,usableCoupon} from "@/services/getDetail"
import {getStore,removeStore} from "@/config/mUtils"
const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0]
export default {

  data() {
    return {
      selected:'open',
      pageSize:10,
      pageId:1,
      tabs:0,
      money:0,
      longMomey:null,
      count:null,
      count1:null,
      show:true,
      flog:false,
      showAction:false,
      coupon:[],
      couponType:[],
      couponId:"",
      raiseId:"",
      couponMoney:"",
      raiseMoney:"",
      showAndHide:true,
      items: [0, 1, 2, 3, 4, 5],
      keys: keys(),
      password: '',
      passwordTrue:false,
      passwordList:[],
    }
  },
  mounted(){
    //this.getBuyRecordList();
    this.money=this.$route.query.momey
    if(this.$route.query.type == 2){
      this.show = false;
      this.showAction=false;
    }else{
      this.show = true;
    }
    if(this.$route.query.investMoney){
      this.longMomey = this.$route.query.investMoney
      this.usableCoupon();
      this.usableCoupon1();
      this.couponId=this.$route.query.couponId;
      this.raiseId = this.$route.query.raiseId;
      
     
    }
    if(getStore("couponId")){
      this.showAndHide = false;
      this.couponMoney = JSON.parse(getStore("couponId")).couponValue
    }
    if(getStore("raiseId")){
      this.showAndHide = false;
       this.raiseMoney = JSON.parse(getStore("raiseId")).couponValue
    }
    //this.investProjectPre()
  },
  methods:{
    backHandle () {
        this.clearPasswordHandle() 
         // 返回时清除password
        this.$emit('backFnc') // 返回上级
        this.passwordTrue = false;
      },
      keyUpHandle (e) {
        let text = e.currentTarget.innerText
        let len = this.passwordList.length
        if (!text || len >= 6) return
          console.log(text)
        this.passwordList.push(text)
        this.ajaxData()

      },
      delHandle () {
        if (this.passwordList.length <= 0) return false
        this.passwordList.shift()
      },
      ajaxData () {
        if (this.passwordList.length >= 6) {

          console.log(parseInt(this.passwordList.join(' ').replace(/\s/g, '')))
          this.password = parseInt(this.passwordList.join(' ').replace(/\s/g, ''))
          this.investProject()
        }
        return false
      },
      clearPasswordHandle: function () {
        this.passwordList = []
      },
      floage(){
        this.$router.push({
          name:"changePayPsd"
        })
      },
    goback() {
      // this.$router.push({
      //   name:"buyInfoDetail"
      // })
      this.$router.go(-1)
    },
    choose(type){
      if(type == 1){
         this.$router.push({
          name:"chooseAction",
          query:{
            couponType:"01",
            investMoney:this.longMomey,
            id:this.$route.query.id,
            momey:this.$route.query.momey
          }
        })
      }else{
         this.$router.push({
          name:"chooseAction",
          query:{
            couponType:"02",
            investMoney:this.longMomey,
            id:this.$route.query.id,
            momey:this.$route.query.momey

          }
        })
      }
     
    },
    changeInput(){
      var inputNum = /^[0-9]*$/
      if(!(inputNum).test(this.longMomey)){
        this.$toast("请输入数字")
      }
    },
    //查询收益券跟加息券
    changeMoney(){
      var inputNum = /^[0-9]*$/
      setTimeout(()=>{
        if(!(inputNum).test(this.longMomey)){
          this.$toast("请输入数字")
        }else{
          this.usableCoupon()
          this.usableCoupon1()
        }
      },1000)
      
    },
    //查询优惠券
    usableCoupon(){
      var data ={
        investMoney:this.longMomey,
        couponType:"01"
      }
      if(this.longMomey < 100){
        this.$toast("最低投资金额为100")
      }else{
        usableCoupon(data).then(res=>{
        console.log(res)
        if(res.state){
          if(res.data != 0){
            this.count = res.data.length
            this.showAction=true;
            
          }
        }
        })
      }
      
    },
    usableCoupon1(){
      var data ={
        investMoney:this.longMomey,
        couponType:"02"
      }
      if(this.longMomey < 100){
        this.$toast("最低投资金额为100")
      }else{
        usableCoupon(data).then(res=>{
        console.log(res)
          if(res.state){
            if(res.data != 0){
              this.count1 = res.data.length
              this.showAction=true;
              
            }
          }
        })
      }
    },
    toBuy(type){
      var that = this
      if(type == 1){
        that.investProjectPre()
      }else{
        if(that.longMomey == null){
          that.$toast("请输入认购金额")
          return
        }
        if (that.longMomey > that.money){
          that.$toast("输入的大于可投金额")
          return
        }
        that.investProjectPre()
      }
      
    },
    investProject(){
      var data={
        projectId:this.$route.query.id,
        investMoney:this.longMomey,
        paymentCode:this.password,
        //couponId:JSON.parse(getStore("couponId")).couponId,
        //raiseId:JSON.parse(getStore("raiseId")).couponId
      }
      investProject(data).then(res => {
        console.log(res)
        if(res.state){
          removeStore('couponId')
          removeStore('raiseId')
          this.$toast("投标成功")
          setTimeout(()=>{
            this.$router.push({
              name:"cooperate"
            })
          },2000)
        }else{
          this.$toast(res.msg)
          removeStore('couponId')
          removeStore('raiseId')
        }
      })

      
    },
    investProjectPre(){

      investProjectPre().then(res => {
        console.log(res)
        if(res.state){
          //this.flog = res.data.flag
          this.passwordTrue=true;
          
        }else if(res.data=="02"){
          this.$messagebox.confirm(res.msg).then(action=>{
            this.$router.push({
              name:"integral"
            })
          }).catch(err => {

          })
        }else if(res.data=="03"){
          this.$messagebox.confirm(res.msg).then(action=>{
            this.$router.push({
              name:"setPayPsd"
            })
          }).catch(err => {

          })
        }else if(res.data=="01"){
          this.$toast(res.msg)
        }
      })
    }

  },
  filters:{
    toFixed(val){
      if(val != "" || val !=null){
        return parseInt(val).toFixed(2)+"元"
      }
    },
    hide(val){
      if(val.length > 1){
        return val.substring(0,1)+"*"
      }
    }
  }
}
</script>

<style lang="less" scoped>
.clearfix:after{ display: block; clear: both; content: "\0020"; visibility: hidden; height: 0 }
.content {
  padding-top:2rem;
    ul{
      padding:0 3%;
      background:#fff;
      li{
        padding:0.5rem 0;
        border-bottom:1px solid #eee;
        font-size:.6rem;
        color:#333;
        span.left{
          float:left;
        }
        input.right{
          float:right;
          border:none;
          text-align:right;
        }
        span.right{
          float:right
        }
        span.red{
          color:#ff0000;
        }
      }
    }
}
.footer{
  
  width:80%;
  margin:3rem auto;
  button{
    width:100%;
    background:#e52920;
    padding:0.5rem 0;
    color:#fff;
    text-align:center;
    border:0;
    font-size:.7rem;
  }
}  
  

.password{
  width:100%;
  height:100%;
  background:rgba(00,00,00,0.8);
  position:fixed;
  top:0;
}
  .pay-tool {
    position: fixed;
    bottom:0;
    width:100%;
    height: 18.93333333rem;
    background-color: #fff;
    overflow: hidden;
    &-title {
      width: 100%;
      height: 2.08888888rem;
      padding: 0 0.8rem;
      line-height: 2.08888888rem;
      text-align: center;
      overflow: hidden;
      .icon {
        width:1.2rem;
        float: left;
        margin-top:.25rem;

      }
      strong {
        font-size: 0.8rem;
      }
    }
    &-content {
      .pay-tool-inputs {
        width: 14.46666666rem;
        height: 2.31111111rem;
        margin: 1.28888888rem auto 0;
        border: 1px solid #b9b9b9;
        border-radius: 0.26666666rem;
        box-shadow: 0 0 1px #e6e6e6;
        display: flex;
        .item {
          width: 16.66666666%;
          height: 2.31111111rem;
          border-right: 1px solid #b9b9b9;
          line-height: 2.31111111rem;
          text-align: center;
          &:last-child {
            border-right: none;
          }
          .icon_dot {
            display: inline-block;
            width: 1.5rem;
            height: 1.1rem;
            background: url(../../../../../static/img/bullet.png) no-repeat;
            background-size: cover;

          }
        }
      }
      .pay-tool-link {
        padding: 0.53333333rem 0.8rem 0;
        text-align: right;
        font-size: .6rem;
      }
    }
    .pay-tool-keyboard {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        li {
          width: 33.3333%;
          height: 2.25442834rem;
          line-height: 2.25442834rem;
          text-align: center;
          border-right: 1px solid #aeaeae;
          border-bottom: 1px solid #aeaeae;
          font-size: 0.8rem;
          font-weight: bold;
          &:nth-child(1), &:nth-child(2), &:nth-child(3) {
            border-top: 1px solid #eee;
          }
          &:nth-child(3), &:nth-child(6), &:nth-child(9), &:nth-child(12) {
            border-right: none;
          }
          &:nth-child(10), &:nth-child(11), &:nth-child(12) {
            border-bottom: none;
          }
          &:nth-child(10), &:nth-child(12), &:active {
            background-color: #d1d4dd;
          }
          &:nth-child(12):active {
            background-color: #fff;
          }
        }
      }
    }
  }
</style>