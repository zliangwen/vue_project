<template>
  <div id="card">
    <mt-header fixed title="绑卡">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <div class="content">
      <div v-if="!isAddCard" class="showCard">
        <ul v-if="!noCard" class="cardList">
          <li v-for="(item,index) in cardList" :key="index">
            <span class="bankName">{{item.openingBankName}}</span>
            <p>{{item.cardNo}}</p>
            <span class="edit" @click="delCard(item)">编辑</span>
          </li>
        </ul>
        <div v-if="noCard" class="noCard">
          <div class="title">
          <span></span>
            <p>您还未添加银行卡信息</p>
          </div>
        </div>
        <div class="submit">
          <mt-button type="primary" size="large" @click="toAddCard">添加银行卡</mt-button>
        </div>
      </div>
      <div v-if="isAddCard" class="addCard">
        <div class="chose">
          <span>开户人姓名</span>
          <input type="text" v-model="realName" placeholder="请输入开户人姓名">
        </div>
        <div class="chose">
          <span>银行卡号</span>
          <input type="number" v-model="cardNo" placeholder="请输入银行卡号">
        </div>
        <div class="chose" @click="openChose">
          <span>开户行名称</span>
          <input type="text" disabled placeholder="请选择银行卡" v-model="bankName">
          <i class="iconfont icon-unfold"></i>
        </div>
        <div class="submit">
          <mt-button type="primary" size="large" @click="addCard">确定</mt-button>
        </div>
      </div>
    </div>
    <!-- <ul class="choseModel" v-if="isChosed">
      <li v-for="(item,index) in cardList" :key="index"
      @click="chose(item)"
      :class="{isChose:item.chosed}"
      >{{item.name}}</li>
    </ul> -->
    <mt-popup
    v-model="popupVisible"
    position="bottom"
    popup-transition="popup-fade"
    style="width:80%;"
    >
      <ul class="popBank">
        <li @click="choseCard(item)" v-for="(item,index) in bankList" :key="index" style="font-size:0.7rem;border-bottom:1px solid #eee;padding:0.25rem 0;text-align:center">
          {{item.bankName}}
          </li>
      </ul>
    </mt-popup>
  </div>
</template>

<script>
import {getCardData,getBankCode,addCard,delCard,isRealName} from '@/services/getDetail'

export default {
  data(){
    return {
      isAddCard:false,
      popupVisible:false,
      noCard:true,
      cardNo:'',
      realName:'',
      bankName:'',
      bankCode:'',
      pmsBankNo:'',
      bankList:[],
      cardList:[],
      flag:false,
      // cardList:[{name:'工商银行',num:'1234123412341234'},{name:'建设银行',num:'1231263489769'},
      // {name:'工商银行',num:'1234123412341234'},{name:'建设银行',num:'1231263489769'}]
    }
  },
  methods:{
    goback() {
      this.$router.go(-1)
    },
    openChose() {
      if(this.flag){
        this.popupVisible = true
      }else{
        this.$messagebox.confirm("您还没实名认证,是否实名认证?").then(()=>{
          this.$router.push({
            name:"integral"
          })
        },()=>{

        })
      }
      
    },
    choseCard(item) {
      this.bankName = item.bankName
      this.bankCode = item.bankCode
      // this.cardList.forEach(i => {
      //   i.chosed = false
      // });
      // item.chosed = true
      this.popupVisible = false
    },
    toAddCard() {
      this.isAddCard = true
    },
    //绑卡
    addCard() {
      var data= {
        cardNo:this.cardNo,
        realName:this.realName,
        bankName:this.bankName,
        bankCode:this.bankCode,
        pmsBankNo:this.pmsBankNo
      }
      //开户人姓名
      var nameRule = /^[\u4e00-\u9fa5]{2,7}$/
      if(!nameRule.test(this.realName)) {
        this.$toast('请输入正确的姓名（2-7位汉字）')
        return
      }
      //银行卡验证
      var bankRule = /^\d{16,19}$/
      if(!bankRule.test(this.cardNo)){
        this.$toast('请输入正确的银行卡号')
        return
      }
      if(this.flag){
        addCard(data).then(res => {
          console.log(res)
          if(res.state) {
            this.$messagebox.confirm('绑卡成功，是否继续绑卡？').then(() => {
              this.cardNo = ''
              this.bankName = ''
              this.realName = ''
              this.pmsBankNo = ''
              // this.$router.go(0)
              this.isAddCard = true
            },() => {
              this.isAddCard = false
              this.initData()
              //window.location.reload()
            });
          }else{
            this.$toast(res.msg)
          }
        })
      }else{
        this.$messagebox.confirm("您还没实名认证,是否实名认证?").then(()=>{
          this.$router.push({
            name:"integral"
          })
        },()=>{

        })
      }
      
    },
    //删除银行卡
    delCard(item) {
      var bankId = item.id
      var that = this;
      that.$messagebox.confirm('是否要移除该银行卡？').then(() => {
        delCard({id:bankId}).then(res => {
          console.log(res)
          if(res.state) {
            that.initData()
            //window.location.reload()
          }else {
            that.$toast(res.msg)
          }
        })
      })
    },
    initData() {
      getCardData().then(res => {
        console.log(res)
        if(res.data.dataList.length !== 0) {
          this.noCard = false
          this.cardList = res.data.dataList
        }else {
          this.noCard = true
        }
      })
      //获取银行列表，用于绑卡
      getBankCode().then(res => {
        console.log(res)
        if(res.state) {
          this.bankList = res.data.bankCodeList
        }
      })
    },
    //用户是否实名认证
    isRealName(){
      isRealName().then(res =>{
        console.log(res)
        if(res.state){
          this.flag = res.data.flag
        }
      })
    }
  },
  mounted() {
    this.initData()
    this.isRealName()

  }
}
</script>
<style lang="less" scoped>
@mainColor:#e83737;
#card {
  position: relative;
}
.content {
  padding: 2rem 0 0;
  height: 100vh;
  .noCard {
    .title {
      padding: 6.2rem 0 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    span {
      display: inline-block;
      width: 4.5rem;
      height: 3rem;
      background: url("../../../assets/img/noCard@2x.png") no-repeat;
      background-size: 100% 100%;
    }
    p {
      margin-top: .5rem;
      font-size: .7rem;
      color: #999;
    }
  }
  .showCard {
    .cardList {
      padding: 0 .7rem;
      max-height: 20rem;
      overflow: auto;
    }
    li {
      position: relative;
      margin-top:.9rem;
      padding: .5rem 0 1.5rem;
      background-color: tomato;
      border: 1px solid @mainColor;
      border-radius: .1rem;
      .bankName {
        padding-left: 2rem;
        font-size: .7rem;
        font-weight: 600;
        color: #fff;
      }
      p {
        padding-left:2rem; 
        font-size: .9rem;
        font-weight: 700;
        color: #fff;
        margin-top: .5rem;
      }
      .edit {
        position: absolute;
        top: .3rem;
        right: 0.3rem;
        font-size: .7rem;
        padding: 0 .3rem;
        color: #fff;
        border: 1px solid #fff;
        border-radius: .4rem;
      }
    }
  }
  .submit {
    padding: 0 1rem;
    width:60%;
    margin:2.5rem auto; 0
    .mint-button {
      background-color: @mainColor;
      border-radius: 5px;
    }
  }
}
.mint-button--primary{
  background-color:#e83737;
}
.choseModel {
  top: 8rem;
}
</style>