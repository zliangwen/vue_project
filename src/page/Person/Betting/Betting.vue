<template>
  <div id="betting">
    <mt-header fixed title="投注记录">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <div class="content">
      <ul class="ulClass">
        <li class="liClassContent" v-for="(item,index) in titleList" :class='{liClass:tabs == index}' @click="changeTab(index)">
          <span>{{item.names}}</span>
        </li>
     </ul>
      <!-- tab-container -->
      <mt-tab-container v-model="selected" style="margin-top:2.3rem;">
        <mt-tab-container-item id="open">
          <ul class="list">
            <li v-for="(item,index) in list">
              <div class="list-item-head">
                <span class="lotteyName">{{item.lotteryName}}<span class="lotteyNum">{{item.issueNum}}期</span></span>
                <!-- <span class="tag" @click="toZhuihao(item)">追号</span> -->
              </div>
              <div class="list-item">
                <span class="left">玩法</span>
                <span>{{item.playTypeName}}</span>
              </div>
              <div class="list-item">
                <span class="left">投注号码</span>
                <span class="red">{{item.buyDetail}}</span>
              </div>
              <div class="list-item">
                <span class="left">注数</span>
                <span>{{item.betsNum}}</span>
              </div>
              <div class="list-item">
                <span class="left">金额</span>
                <span class="red">{{item.joinMoney}}元</span>
              </div>
               <div class="list-item" v-show="item.appendNo">
                <span class="left">追号期数</span>
                <span>{{item.appendNo}}</span>
              </div>
              <div class="list-item" v-show="item.isAppend">
                <span class="left">是否追号</span>
                <span v-if="item.isAppend=='01'">是</span>
                <span v-if="item.isAppend=='02'">否</span>
              </div>
              <div class="list-item" v-show="item.prizeStatus">
                <span class="left">是否中奖</span>
                <span v-if="item.prizeStatus=='02'">未中奖</span>
                <span v-if="item.prizeStatus=='01'">已中奖</span>
              </div>
              <div class="list-item" v-show="item.openNum">
                <span class="left">开奖号码</span>
                <span class="red">{{item.openNum}}</span>
              </div>
              <div class="list-item" v-if="item.prizeStatus=='01'">
                <span class="left">中奖金额</span>
                <span >{{item.prize}}</span>
              </div>
              <div class="list-item">
                <span class="left">投注时间</span>
                <span>{{item.createDate}}</span>
              </div>
              <div class="list-item" v-show="item.openTime">
                <span class="left">开奖时间</span>
                <span>{{item.openTime}}</span>
              </div>
            </li>
          </ul>
          <p v-if="showP" style="text-align:center;padding:0.7rem 3%;font-size:0.7rem;">暂无数据~</p>
        </mt-tab-container-item>
        
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
// import {getBuyRecordByOnly} from "../../../services/getDetail"
export default {
  data() {
    return {
      selected:'open',
      pageSize:10,
      pageId:1,
      lotteryStatus:"",
      titleList:[
        {names:"待开奖",id:"1"},
        {names:"已开奖",id:"2"}
      ],
      tabs:0,
      list:[],
      showP:false,
    }
  },
  mounted(){
    this.getBuyRecordList();
  },
  methods:{
    goback() {
      this.$router.push("/person")
    },
    getBuyRecordList(){
      var that = this;
      that.lotteryStatus="01"
      that.list=[];
      that.$indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      getBuyRecordByOnly(that.lotteryStatus,that.pageSize,that.pageId).then(res =>{
        console.log(res)
        if(res.state){
          if(res.data.dataList != 0){
            that.list = res.data.dataList
            that.showP = false;
          }else{
            that.showP = true;
          }
          
        }
        that.$indicator.close()
      })
    },
    getBuyRecord(){
      var that = this;
      that.lotteryStatus="02"
      that.list=[];
      that.$indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      getBuyRecordByOnly(that.lotteryStatus,that.pageSize,that.pageId).then(res =>{
        console.log(res)
        if(res.state){
            if(res.data.dataList != 0){
              that.list = res.data.dataList
              that.showP = false;
            }else{
              that.showP = true;
            }
        }
        that.$indicator.close()
      })
    },
    changeTab(index){
      var that = this;
      that.tabs = index;
      if(that.tabs == 0){
        that.getBuyRecordList();
      }else{
        that.getBuyRecord()
      }
    },
    toZhuihao(item){
      var that = this;
      console.log(item)
      if(item.lotteryType == "01"){
        that.$router.push({path:"/plan",query:{type:1,playType:item.playType,lotteryNo:item.buyDetail}})
      }else if(item.lotteryType=="02"){
         that.$router.push({path:"/plan",query:{type:2,playType:item.playType,lotteryNo:item.buyDetail}})
      }else if(item.lotteryType=="03"){
         that.$router.push({path:"/plan",query:{type:4,playType:item.playType,lotteryNo:item.buyDetail}})
      }else if(item.lotteryType=="04"){
         that.$router.push({path:"/plan",query:{type:3,playType:item.playType,lotteryNo:item.buyDetail}})
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  ul.ulClass{
    display:flex;
    position:fixed;
    top:2rem;
    z-index:1;
    width:100%;
    background-color:#fff;
    .liClassContent{
      flex:1;
      text-align:center;
      font-size:0.6rem;
      padding:0.7rem;
    }
    .liClass{
      color:#e83737;
      span{
        padding:0.5rem 0.2rem;
        border-bottom:2px solid #e83737
      }
    }
  }
  
  padding: 2rem 0 0;
  .list {
    li{
      overflow: hidden;
      background-color:#fff;
      border-bottom: 1px solid #eee;
      margin:0.3rem 0;
      .list-item-head {
        padding: .6rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        font-size: .7rem;
        .lotteyName {
          font-weight: 700;
        }
        .lotteyNum {
          color: #999;
        }
        .tag {
          color:#fff;
          background-color: #e83737;
          border-radius: 0.5rem;
          padding: 0 .2rem;
          font-size: .6rem;
        }
      }
      .list-item {
        display: flex;
        justify-content: space-between;
        padding: .3rem .6rem;
        font-size: .7rem;
        span {
          font-size: .6rem;
        }
        .left {
          color: #999;
        }
        .red {
          color: #ff0000;
        }
      }
    }
  }
  .is-selected {
    border-bottom: 3px solid #e83737;
    color: #e83737;
    // margin-bottom: -3px;
  }
}
</style>