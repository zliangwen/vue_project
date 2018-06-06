<template>
  <div class="withdraw">
    <mt-header fixed title="提现">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <div class="content">
      <div class="chose">
        <span>提现金额</span>
        <input type="number" v-model="withdrawMoney" placeholder="请输入提现金额(最少10元)">
      </div>
      <!-- <div class="chose" @click="openChose">
        <span>银行卡</span>
        <input type="text" disabled placeholder="请选择银行卡" v-model="bankName">
        <i class="iconfont icon-unfold"></i>
      </div> -->
      <div>
        <form id="subForm" action="https://jzh-test.fuiou.com/jzh/app/500003.action" method="post" onsubmit="return true" ref="subForm" >
            <input type="hidden" id="mchnt_cd" name="mchnt_cd" v-model="subForm.mchnt_cd" />
            <input type="hidden" id="mchnt_txn_ssn" name="mchnt_txn_ssn" v-model="subForm.mchnt_txn_ssn" />
            <input type="hidden" id="login_id" name="login_id" v-model="subForm.login_id" />
            <input type="hidden" id="amt" name="amt" v-model="subForm.amt" />
            <input type="hidden" id="page_notify_url" name="page_notify_url" v-model="subForm.page_notify_url" />
            <input type="hidden" id="back_notify_url" name="back_notify_url" v-model="subForm.back_notify_url" />
            <input type="hidden" id="signature" name="signature" v-model="subForm.signature" />
        </form>
      </div>
      <!-- <div class="chose">
        <span>提现密码</span>
        <input type="text" placeholder="请输入密码">
      </div> -->
      <div class="submit">
        <mt-button type="primary" size="large" @click="withdraw">确定</mt-button>
      </div>
    </div>
    <ul class="choseModel" v-if="isChosed">
      <li v-for="(item,index) in cardList" :key="index"
      @click="choseCard(item)"
      >{{item.openingBankName}}<br>{{item.cardNo}}</li>
    </ul>
    <!-- <mt-popup
    v-model="popupVisible"
    position="bottom"
    popup-transition="popup-fade">
      <ul class="popBank">
        <li @click="choseCard(item)" v-for="(item,index) in cardList" :key="index">
          {{item.openingBankName}}
        </li>
      </ul>
    </mt-popup> -->
  </div>
</template>

<script>
import {getCardData,withdraw,withdrawAppFySave} from '@/services/getDetail'

export default {
  data() {
    return {
      isChosed: false,
      // popupVisible:false,
      bankName:'',
      bankCardId:'',
      withdrawMoney:'',
      cardList:[],
      subForm:{},
      tempForm:{},

    }
  },
  methods:{
    goback() {
      this.$router.go(-1)
    },
    openChose() {
      this.isChosed = true
    },
    choseCard(item) {
      this.bankName = item.openingBankName
      this.bankCardId = item.id
      this.isChosed = false
    },
    withdraw(){
      //需要在加个判断余额是否够的判断
      if(this.withdrawMoney.length == 0) {
        this.$toast('请输入提现金额')
      }else{
        // var data = {
        //   bankCardId:this.bankCardId,
        //   withdrawMoney:this.withdrawMoney
        // }
        var that = this;
        withdrawAppFySave(this.withdrawMoney).then(response => {
          console.log(response)
          if(response.state) {
            that.tempForm.mchnt_cd = response.data.mchnt_cd;
            that.tempForm.mchnt_txn_ssn = response.data.mchnt_txn_ssn;
            that.tempForm.login_id = response.data.login_id;
            that.tempForm.amt = response.data.amt;
            that.tempForm.page_notify_url = response.data.page_notify_url;
            that.tempForm.back_notify_url = response.data.back_notify_url;
            that.tempForm.signature = response.data.signature;
            console.log(response.data.mchnt_cd);
            setTimeout(function () {
              document.getElementById("mchnt_cd").value = that.tempForm.mchnt_cd;
              document.getElementById("mchnt_txn_ssn").value = that.tempForm.mchnt_txn_ssn;
              document.getElementById("login_id").value = that.tempForm.login_id;
              document.getElementById("amt").value = that.tempForm.amt;
              document.getElementById("page_notify_url").value = that.tempForm.page_notify_url;
              document.getElementById("back_notify_url").value = that.tempForm.back_notify_url;
              document.getElementById("signature").value = that.tempForm.signature;
              that.$refs['subForm'].submit();
            }, 500)
            // this.$messagebox.confirm('您已提现成功，是否继续？').then(() => {
            //   this.withdrawMoney = ''
            // },() => {
            //   this.$router.go(-1)
            // });
          }else {
            this.$toast(response.msg)
          }
        })
      }
    },
    initData() {
      getCardData().then(res => {
        // console.log(res)
        if(res.data.dataList.length !== 0) {
          this.cardList = res.data.dataList
        }else {
          this.$messagebox.confirm('您尚未绑定银行卡，是否去绑定？').then(() => {
            this.$router.push('/person/card')
          },() => {
            this.$router.go(-1)
          });
        }
      })
    }
  },
  mounted() {
    this.initData()
  }
}
</script>
<style lang="less" scoped>
#withdraw {
  position: relative;
}
.content {
  padding: 2rem 0 0;
  height: 100vh;
  .submit {
    margin-top: 2.5rem;
    padding: 0 1rem;
    .mint-button {
      background-color: #e83737;
      border-radius: 1rem;
    }
  }
}
.choseModel {
  position: absolute;
  top: 6rem;
  left: 31%;
  background-color: #ccc;
  color: #333;
  box-shadow: 0 1px 5px rgba(0,0,0,0.1);
  li {
    border-bottom: 1px solid #fff;
    font-size: .7rem;
    padding: .1rem .5rem;
    &:last-of-type {
      border-bottom: none;
    }
  }
}
</style>