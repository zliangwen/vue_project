<template>
  <div class="recharge">
    <mt-header fixed title="充值">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <div class="content">
      <div class="chose">
        <span>充值金额</span>
        <input type="text" v-model="transMoney" placeholder="请输入充值金额(最少10元)">
      </div>
      <!-- <div class="chose" @click="openChose">
        <span>充值方式</span>
        <input type="text" disabled placeholder="请输入充值方式" v-model="commodityName">
        <i class="iconfont icon-unfold"></i>
      </div> -->
      <div>
        <form id="subForm" action="https://jzh-test.fuiou.com/jzh/app/500002.action" method="post" onsubmit="return true" ref="subForm" >
            <input type="hidden" id="mchnt_cd" name="mchnt_cd" v-model="subForm.mchnt_cd" />
            <input type="hidden" id="mchnt_txn_ssn" name="mchnt_txn_ssn" v-model="subForm.mchnt_txn_ssn" />
            <input type="hidden" id="login_id" name="login_id" v-model="subForm.login_id" />
            <input type="hidden" id="amt" name="amt" v-model="subForm.amt" />
            <input type="hidden" id="page_notify_url" name="page_notify_url" v-model="subForm.page_notify_url" />
            <input type="hidden" id="back_notify_url" name="back_notify_url" v-model="subForm.back_notify_url" />
            <input type="hidden" id="signature" name="signature" v-model="subForm.signature" />
        </form>
      </div>
      <div class="submit">
        <mt-button type="primary" size="large" @click="reCharge">确定</mt-button>
      </div>
    </div>
    
    <ul class="choseModel" v-if="isChosed">
      <li v-for="(item,index) in choseList" :key="index"
      @click="chose(item)"
      >{{item.name}}</li>
    </ul>
    <div class="mask" v-if="isMask">
      <div class="mask-box">
				<div class="title">充值确认</div><span class="close" @click="closeMask">X</span>
        <div class="message">
          <p><span>订单编号:<br></span>{{plOrderNum}}</p>
          <p><span>合计支付:</span><span style="color:red">{{transMoney}}元</span></p>
        </div>				
        <img :src="qrImg" alt="">
        <p class="footer">请打开{{commodityName}}，扫码支付</p>
      </div>
    </div>
  </div>
</template>

<script>
import {rechargeMoney} from '@/services/getDetail'
export default {
  data() {
    return {
      isChosed: false,
      isMask:false,
      commodityName:'',
      service:'',
      qrImg:'',
      plOrderNum:'',
      transMoney:'',
      tempForm:{},
      subForm:{},
      // choseList:[{name:'京东钱包',code:'cj008'},{name:'QQ钱包',code:'cj005'}]
    }
  },
  methods:{
    goback() {
      this.$router.go(-1)
    },
    openChose() {
      this.isChosed = true
    },
    chose(item) {
      this.commodityName = item.name
      this.service = item.code
      this.isChosed = false
    },
    closeMask() {
      this.isMask = false
    },
    reCharge() {

      // var data = {
      //   service:this.service,
      //   transMoney:this.transMoney
      // }
      if(this.transMoney.length == 0) {
        this.$toast('请输入充值金额')
        return
      }
      if(parseFloat(this.transMoney) <10) {
        this.$toast('请输入正确的充值金额（最低10元）')
        return
      }
      // if(this.service.length == 0) {
      //   this.$toast('请选择充值方式')
      //   return
      // }
      this.$indicator.open({
        text:'充值中...',
        spinnerType: 'fading-circle'
      })
      var that= this
      rechargeMoney(this.transMoney).then(response => {
        console.log(response)
        if(response.state) {
          this.$indicator.close() 
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
          // this.$toast(res.msg)
          // this.transMoney=null
          // this.$indicator.close()
          // this.isMask = true
          // this.qrImg = res.data.image
          // this.plOrderNum = res.data.plOrderNum
        }else {
          //this.$toast(res.msg)
          this.$messagebox.confirm(response.msg).then(action=>{
            this.$router.push({
              name:'integral'
            })
          })
          this.$indicator.close()
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
  .chose{
    background-color:#fff;
  }
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
.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0,0,0,.5);
  .mask-box {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 12.8rem;
    margin:  5rem auto 0;
    padding: .5rem;
    border-radius: .5rem;
    background-color: #fff;
    p {
      font-size: .7rem;
      color: #666;
      padding: .3rem 0;
    }
    span {
      font-size: .7rem;
      color:#333;
      font-weight: 700;
      margin-right: .5rem;
    }
    img {
      display: inline-block;
      width: 5rem;
    }
    .close {
      position: absolute;
      font-size: .9rem;
      font-weight: normal;
      top: 5.5rem;
      right: 2.5rem;
      color: #ccc;
    }
    .title {
      text-align: center;
      font-size: .8rem;
      padding: .2rem 0
    }
    .footer {
      text-align: center;
      padding: .2rem 0;
    }
  }
}

</style>