<template>
  <div id="exChane">
    <mt-header fixed title="积分兑换">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <div class="content">
      <div class="chose">
        <span>积分兑换</span>
        <input type="number" v-model="integral" placeholder="请输入您需要兑换的积分" onkeyup="this.value=this.value.replace(/[^1-9-]+/,'');">
      </div>
      <div class="list" >
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" 
        :auto-fill="autos" :top-distance="distant"  :bottom-all-loaded="allLoaded" 
        ref="loadmore">
          <table class="details" v-if="!isNodata">
            <thead class="t-head">
              <td>兑换金额</td>            
              <td>积分</td>
              <td>时间</td>
            </thead>
            <!-- <tr class="t-body" v-for="(item,index) in details" :key="index">
              <td>{{item.integralTypeName}}</td>
              <td class="isGreen" :class="{ 'isRed': item.integralFlag == '01'}">{{item.integralNum | itemColor(item.integralFlag)}}</td>
              <td>{{item.createDate}}</td>                
            </tr> -->
            <tr class="t-body" v-for="(item,index) in exchangeList" :key="index">
              <td>{{item.exMoney}}</td>
              <td>-{{item.integralNum}}</td>
              <td>{{item.createDate}}</td>
            </tr>
          </table>
          <div class="nodata">
            <div v-if="isNodata">
                <span></span>
                <p>暂无数据~</p>
            </div>
            <p v-if="footershow">没有更多数据~</p>                           
          </div>
        </mt-loadmore>
      </div>
      <div class="submit">
        <mt-button type="primary" size="large" @click="exChange">确定兑换</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import {getIntegralData,exChange} from '@/services/getDetail'

export default {
  data() {
    return {
      allLoaded:false,  //是否禁止上拉加载
      distant:70,
      autos:false,
      isNodata: true,
      footershow:false, // 数据加载完毕，显示相关内容 
      exchangeList:[],
      queryData:{
        pageId:1,
        pageSize:10
      },
      integral:'',
      userIntegral:0
    }
  },
  methods:{
    goback() {
      this.$router.go(-1)
    },
    loadTop(){
      this.queryData.pageId = 1
      this.exchangeList = []
      setTimeout(() =>{
        this.initData();
        this.$refs.loadmore.onTopLoaded();
      },80)
    },
    loadBottom(){
      setTimeout(() => {
        this.initData()
        this.$refs.loadmore.onBottomLoaded();
      },800);
    },
    exChange() {
      if(this.integral.length == 0) {
        this.$toast('请输入您需要兑换的积分数量')
      }else if(this.integral == 0) {
        this.$toast('请输入您需要兑换的积分数量,不能为0')
      }
      else if(this.integral>this.userIntegral) {
        this.$toast('你没有这么多的积分')
      }else {
        exChange({integral:this.integral}).then(res => {
          console.log(res)
          // this.$router.go(0)
          //window.location.reload()
          this.initData()
        })
      }
    },
    initData() {
      var data = {
        pageId:this.queryData.pageId,
        pageSize:this.queryData.pageSize,
        integralType:'02'
      }
      getIntegralData(data).then(res => {
        console.log(res)
        this.userIntegral = res.data.userIntegral
        if(res.state) {
          if(res.data.dataList.length != 0){
            this.exchangeList = this.exchangeList.concat(res.data.dataList)
            this.isNodata = false
            this.footershow = false
            this.allLoaded = false
            this.queryData.pageId +=1
          }else {
            this.allLoaded = true
            if(!this.isNodata) {
              this.footershow = true
            }
          }
        }else {
          this.$toast(res.msg)
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
.content {
  overflow: hidden;
  height: 100vh;
  padding: 2rem 0 0;
  .chose{
    background:#fff;
  }
  .list {
    overflow: auto;
    max-height: 70%;
    border-radius: 0.2rem;
    .details {
      width: 100%;
      text-align: center;
    }
    .t-head td {
      font-size: .5rem;
      height: 1.5rem;
      line-height: 1.5rem;
      color:#999;
      border-bottom: 1px solid #eee;
    }
    .t-body td {
      font-size: 0.6rem;
      color: #333;
      height: 2rem;
      line-height: 2rem;
      border-bottom: 1px solid #eee;  
    }
  }
  .submit {
    position: absolute;
    bottom: 2rem;
    width: 100%;
    padding: 0 1rem;
    .mint-button {
      background-color: red;
      border-radius: 1rem;
    }
  }
  .nodata {
    span {
      background: url("../../../../assets/img/noData@2x.png") no-repeat;
      background-size: contain;
    }
  }
}
</style>
