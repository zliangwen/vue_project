<template>
  <div id="person">
    <header>
      <div class="logo" v-if="isLogin">

        <div class="user clearfix" >
          <!-- <img :src="baseImg" @click="toPersonInfo" alt=""> -->
          <img :src="baseImg" alt="" @click="toPersonInfo" style="border-radius:50%;">          
          <!-- <div class="loginBtn" v-if="!isLogin" @click="toLogin">登录/注册</div> -->
          <p v-if="isLogin">{{userNickName}}</p>
          <span @click="toMessage">
            <i>{{messageCount}}</i>
          </span>

        </div>
        <h5>账户总资产(元)</h5>
        <h1>{{money | tofixed}}</h1>
      </div>
      <div class="logo" v-if="!isLogin">
        <div class="user clearfix">
          <!-- <img :src="baseImg" @click="toPersonInfo" alt=""> -->
          <img :src="baseImg" alt="" >          
          <span></span> 
        </div>
        <div class="loginBtn clearfix"  >
            <div @click="toLogin">登录</div>
            <div @click="regin" style="float:right">注册</div>
        </div>
      </div>
      <div class="money" v-if="!isLogin">
        <div class="money-item">
          <span>待收本金(元)</span>
          <span class="description">{{accountMoney | tofixed()}}</span>
        </div>
        <div class="money-item">
          <span>待收利息(元)</span>
          <span class="description">{{handselMoney | tofixed()}}</span>
        </div>
      </div>
      <div class="money" v-if="isLogin">
        <div class="money-item">
          <span>待收本金(元)</span>
          <span class="description">{{accountMoney | tofixed()}}</span>
        </div>
        <div class="money-item">
          <span>待收利息(元)</span>
          <span class="description">{{handselMoney | tofixed()}}</span>
        </div>
      </div>
      <div class="tips clearfix" v-if="isLogin">
        <div class="recharge" style="display:block;">
          <p>可用余额</p>
          <p>{{account | tofixed}}</p>
        </div>

         <router-link tag="span" class="" to="/person/recharge" style="background:#e52920;color:#fff;">充值</router-link>
        <router-link tag="span" class="" to="/person/withdraw">提现</router-link>
      </div>
       <div class="tips clearfix" v-if="!isLogin">
        <div class="recharge" style="display:block;">
          <p>可用余额</p>
          <p>0.00</p>
        </div>

         <router-link tag="span" class="" to="/mine" style="background:#e52920;color:#fff;">充值</router-link>
        <router-link tag="span" class="" to="/mine">提现</router-link>
      </div>
    </header>
    <div class="content">
      <ul class="list" v-if="isLogin">
        <router-link v-for="(item,index) in list" :key="index" tag="li"
        :to="item.target">
          <img class="list-icon" :src="item.image">
          {{item.name}}
          <i class="right iconfont icon-right"></i>
        </router-link>        
      </ul>
      <!-- 未登录 -->
      <ul class="list" v-if="!isLogin">
        <router-link v-for="(item,index) in list" :key="index" tag="li"
        to="/mine">
          <img class="list-icon" :src="item.image">
          {{item.name}}
          <i class="right iconfont icon-right"></i>
        </router-link>        
      </ul>
      
      <div class="submit" v-if="isLogin">
        <mt-button type="primary" size="large" @click="logout">退出登录</mt-button>        
      </div>
    </div>
    
    <m-tabbar></m-tabbar>
  </div>
</template>

<script>
import mTabbar from '@/components/tabbar'
import {getPersonData,logout} from '@/services/getDetail'
import {setStore,removeStore} from '@/config/mUtils'
export default {
  data() {
    return {
      isLogin:false,
      accountMoney:0,
      notRead:'',
      userNickName:'',
      handselMoney:0,
      messageCount:0,
      account:0,
      baseImg:'./static/img/userALL.png',
      list:[
        {name:'实名认证',target:'/person/integral',image:'./static/img/20.png'},
        {name:"开户申请",target:'/person/opendoor',image:'./static/img/opendoor.png'},
        {name:'绑卡',target:'/person/card',image:'./static/img/21.png'},
        {name:'投资记录',target:'/person/cooperate',image:'./static/img/22.png'},
        {name:'债权转让',target:'/person/capitalDetails',image:'./static/img/23.png'},
        {name:'资金记录',target:'/person/discount',image:'./static/img/24.png'},
        {name:'优惠券',target:'/person/message',image:'./static/img/25.png'},
        {name:'邀请好友',target:'/person/share',image:'./static/img/26.png'}
      ],
      money:0,
    }
  },
  components: {
    mTabbar
  },
  methods:{
    toPersonInfo() {
      this.$router.push('/person/personInfo')
    },
    toLogin() {
      this.$router.push('/mine')
    },
    regin(){
      this.$router.push('/mine/register')
    },
    toMessage(){
      this.$router.push({
        name:"messAction",
        query:{
          
        }
      })
    },
    logout() {
      logout().then(res => {
        console.log(res)
        this.baseImg = './static/img/userALL.png'
        removeStore('accesstoken')
        this.isLogin = false;

        //window.location.reload()
        // this.$router.go(0)
        // setStore('tabbarValue','home')
        // this.$router.push('/home')
      })
    },
    initData() {
      var that = this
      getPersonData().then(res =>{
        console.log(res)
        if(res.state) {
          this.accountMoney = res.data.shouldIncomeMoney
          this.userNickName = res.data.userPhone
          this.handselMoney = res.data.shouldIncomeInterset
          this.account = res.data.useMoney
          this.messageCount = res.data.messageCount
          this.baseImg = res.data.userHeadPortrait?res.data.userHeadPortrait:this.baseImg
        }else {
          this.$messagebox.confirm(res.msg).then(action=>{
            //var that = this;
            removeStore('accesstoken')
            that.$router.push('/Mine')
          }).catch(err=>{
              
              that.isLogin = false;
          })         
        }
      })
    }
  },
  mounted() {
    var accesstoken = localStorage.getItem('accesstoken')
    if(accesstoken) {
      this.isLogin = true
      this.initData()
    }else {
      this.isLogin = false
    }
    
  },
  filters:{
    tofixed(num) {
      return parseFloat(num).toFixed(2)
    }
  }
}
</script>

<style lang="less" scoped>
.clearfix:after{ display: block; clear: both; content: "\0020"; visibility: hidden; height: 0 }
#person {
  color:#333;
}

header {
  overflow: hidden;
  width: 100%;
  position: fixed;
  z-index: 2;
  .logo {
    height: 8.7rem;
    width: 100%;
    background: #ec5348;
    background-size: contain;
    overflow: hidden;
    .user {
      margin-top: .5rem;
      img {
        display:block;
        width: 2.1rem;
        height: 2.1rem;
        margin-left:3%;
        float:left;
      }
      p {
        float:left;
        line-height:2.1rem;
        font-size: .7rem;
        text-align: center;
        padding-left:.5rem;
        
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #fff;
      }
      span{
        display:block;
        width:1rem;
        height:1rem;
        float:right;
        background:url(../../../static/img/message.png) no-repeat;
        background-size:100%;
        margin-top:.5rem;
        margin-right:3%;
        position:relative;
        i{
          display:block;
          width:.6rem;
          height:.6rem;
          background:#fff;
          border-radius:50%;
          float:right;
          color:#ec5348;
          font-size: .5rem;
          line-height: .6rem;
          font-style: normal;
          text-align: center;
          top: -4px;
          position: absolute;
          right: -2px;
        }
      }
      
    }
    .name {
      width: 5rem;
      margin: .3rem auto 0;
      text-align: center;
      font-size: .7rem;
      color: #fff;
    }
    h5{
      text-align:center;
      color:#fff;
      font-size:.6rem;
      margin-top:.8rem;

    }
    h1{
      text-align:center;
      color:#fff;
      margin-top:.5rem;
      font-size:1.2rem;
    }
    .loginBtn {
      width:40%;
      margin:2rem auto;
       div{
        float:left;
        font-size:.7rem;
        background:#f6a29b;
        color:#fff;
        padding:0.1rem 0.5rem;
        border-radius:5px;
       }
      }
  }
  .money {
    width: 100%;
    padding: .25rem 1.5rem 0;
    font-size: .8rem;
    color: #fff;
    background:#e34439;
    position: absolute;
    bottom: 3.2rem;
    z-index: 2;
    .money-item {
      width: 50%;
      height: 1.5rem;
      margin: .2rem 0;
      float: left;
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        font-size: .5rem;
      }
      .description {
        font-size: .68rem;
        font-weight: 700;
      }
      &:first-of-type {
        border-right: 1px solid #d32418;
      }
    }
  }
  .tips {
    height: 3rem;
    padding-left:3%;
    border-bottom: .1rem solid #f0f0f0;
    background-color: #fff;
    justify-content: space-around;
    align-items: center;
    span {
      font-size: .6rem;
      float:right;
      margin-right:5%;
      margin-top:1rem;
      border:1px solid #e52920;
      border-radius:5px;
     
       height:1.1rem;
        line-height:1rem;
        padding:0 0.5rem;
    }
    div.recharge{
      font-size: .6rem;
      float:left;
      margin-top:.6rem;

    }
    img {
      display: inline-block;
      width: .8rem;
      height: .8rem;
      margin: 0 .3rem 0 0;
    }
  }
}
.content {
  padding: 11.5rem 0 3rem;
  background-color: #f0f0f0;
  .list {
    margin-top: .2rem;
    li {
      position: relative;
      background-color: #fff;
      margin-top: .1rem;
      padding-left: 2rem;
      height: 2rem;
      line-height: 2rem;
      font-size: .6rem;
      .list-icon {
        position: absolute;
        display: inline-block;
        width: 0.9rem;
        height: 0.9rem;
        left: .5rem;
        top: .5rem;
      }
      .right {
        position: absolute;
        right: .5rem;
        color:#999;
      }
    }
  }
  .submit {
    margin-top: 1.5rem;
    padding: 0 .6rem;
    .mint-button {
      background-color: #e83737;
      border-radius: .2rem;
      font-size:.6rem;
    }
  }
}
</style>
