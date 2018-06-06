<template>
  <div id="betting">
    <mt-header fixed :title="title" id="mt-header">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>

    </mt-header>
    <div class="topHeader">
      <p class="p">当前人气值</p>
      <p style="margin-top:.5rem;">{{popularity}}</p>
    </div>
    <div class="content clearfix">
        
        <ul class="ul_content" v-if="isShow">
          <li v-for="(item,index) in list" :key="item.index" @click="toDetails(item)">
              <div class="clearfix div_top">
                <div style="float:left;margin:1.5rem 0 1rem;padding-left:.5rem" v-if="item.couponType=='01'"><i>￥</i><span>{{item.couponValue}}</span></div>
                <div style="float:left;margin:1.5rem 0 1rem;padding-left:1rem" v-if="item.couponType=='02'"><span>{{item.couponValue}}</span><i>%</i></div>
                <div  style="float:right;font-size:0.5rem;margin-top:1.8rem;margin-right:.4rem" v-if="item.couponType=='01'">现金券</div>
                <div  style="float:right;font-size:0.5rem;margin-top:1.8rem;margin-right:.4rem" v-if="item.couponType=='02'">加息券</div>
                <div style="float:right;font-size:0.5rem;margin-right:.2rem;background:#ffae01;color:#fff;margin-top:.1rem;padding:0 0.1rem;border-radius:3px;">立即兑换</div>
              </div>
              <p>所需人气值<span>{{item.isPop}}</span></p>
          </li>
        </ul>
        <ul class="ul_content" v-if="isShow1">
          <li>
              
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import {convertibleList} from "@/services/getDetail"
export default {
  data() {
    return {
      selected:'open',
      listQuery:{
        pageSize:10,
        pageId:1,
      },
      lotteryStatus:"",
      title:"人气值兑换",
      list:[],
      isShow1:false,
      isShow:true,
      popularity:0,
    }
  },
  mounted(){
    //this.getBuyRecordList();
    if(this.$route.query.type == 1){
      this.convertibleList();
    }else{
      this.convertibleListApply()
    }
  },
  methods:{
    goback() {
      this.$router.go(-1)
    },
    toDetails(item){
      this.$router.push({
        name:"popularity",
        query:{
          id:item.id,
          couponValue:item.couponValue,
          couponType:item.couponType,
          popularityValues:item.popularityValues,
          investLimit:item.investLimit

        }
      })
    },
    convertibleList(){
      this.listQuery.couponType="01"
      convertibleList(this.listQuery).then(res=>{
        console.log(res)
        if(res.state){
          this.list = res.data.dataList
          this.popularity = res.data.popularity
        }
      })
    },
    convertibleListApply(){
      this.listQuery.couponType="02"
      convertibleList(this.listQuery).then(res=>{
        console.log(res)
        if(res.state){
          this.list = res.data.dataList
          this.popularity = res.data.popularity
        }
      })
    }
    
  },
  filters:{
    toFixed(val){
      if(val != "" || val !=null){
        return parseInt(val).toFixed(2)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.clearfix:after{ display: block; clear: both; content: "\0020"; visibility: hidden; height: 0 }
#mt-header{
  background:url(../../../../static/img/topHeader.png) no-repeat;
  background-size:100%;
}
.topHeader{
  height:4rem;
  margin-top:2rem;
  background:url(../../../../static/img/topHeader.png) no-repeat;
  background-size:100% 98%;
  .p{
    padding-top:1.4rem;
    font-size:.8rem;
  }
  p{
    text-align:center;
    color:#fff;
    font-size:.6rem;
  }
}
.content {
  
  background:#fff;
  .p{
    font-size:.6rem;
    padding:0.5rem 3%;
    span{
      float:right;
      color:#e83737;
    }
  }
  .ul_content{
    border-top:1px solid #eee;
    padding:0 3%;
    background:#fff;
    li{
      float:left;
      width:40%;
      padding:0.7rem 0;
      div.div_top{
        background:url(../../../../static/img/01.png) no-repeat;
        background-size:100% 98%;
      }
      div{
        font-size:1rem;
        color:#fff;
        i{
          font-size:.6rem;
          font-style:normal;
        }

      }
      p{
        font-size:.6rem;
        padding:0.25rem 0;
        color:#999;
        span{
          float:right;
          color:#e83737;
        }
      }
    }
    li:nth-of-type(2n+1){
      margin-right:10%;
      margin-left:5%;
    }
  }
}
</style>