<template>
  <div id="betting">
    <mt-header fixed :title="title">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <div class="content clearfix">

        <ul class="ul_content" v-if="isShow">
          <li >
              <div class="clearfix div_top">
                <div style="float:left;margin:1.5rem 0 1rem;padding-left:.5rem" v-if='couponType=="01"'>
                  <i>￥</i>
                  <span>{{list.money}}</span>
                </div>
                 <div style="float:left;margin:1.5rem 0 1rem;padding-left:.5rem" v-if='couponType=="02"'>
                  <span>{{list.money}}</span>
                  <i>%</i>
                </div>
                <div  style="float:right;font-size:0.5rem;margin-top:1.8rem;margin-right:.4rem" v-if='couponType=="01"'>现金券</div>
                <div  style="float:right;font-size:0.5rem;margin-top:1.8rem;margin-right:.4rem" v-if='couponType=="02"'>加息券</div>
                
              </div>
              
          </li>
        </ul>
        <div class="role">
          <p class="p1">{{list.money}}元现金券</p>
          <div class="num clearfix">
            <span> 数量:</span>
            <div class="clearfix">
              <i @click="down">-</i>
              <i>{{count}}</i>
              <i @click="up">+</i>
            </div>
            <span style="color:#e83737;float:right;font-size:.6rem">{{popularity}}点<i style="color:#333;font-style:normal;">人气值</i></span>
          </div>
          <p style="color:#333">兑换规则：</p>
          <p style="padding:0.25rem 3%;">1、使用条件：投资金额>={{popularityValues}}元可使用</p>
          <p style="padding-bottom:0.25rem;">2、兑换后10天取消</p>
        </div>
    </div>
    <footer class="ft" @click="toBuy">立即兑换</footer>
  </div>
</template>

<script>
import {convertibleList,convert} from "@/services/getDetail"
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
      list:{
          money:"",
      },
      count:1,
      isShow1:false,
      isShow:true,
      couponType:"",
      popularity:null,
      investLimit:null,
      popularityValues:null
    }
  },
  mounted(){
    //this.getBuyRecordList();
    this.couponType = this.$route.query.couponType
    this.list.money = this.$route.query.couponValue
    this.popularity = this.$route.query.popularityValues
    this.popularityValues = this.$route.query.popularityValues
    this.investLimit = this.$route.query.investLimit

  },
  methods:{
    goback() {
      this.$router.go(-1)
    },
    convertibleList(){
      this.listQuery.couponType="01";
      convertibleList(this.listQuery).then(res=>{
        if(res.state){

        }
      })
    },
    up(){
      this.count ++;
      this.popularity = this.popularityValues * this.count
    },
    down(){
      //this.popularity=null;
      if(this.count > 1){
        this.count --
        this.popularity = this.popularityValues*this.count
      }else{
        this.$toast("不能再少哦")
      }
      
    },
    toBuy(){
      var data={
        couponId:this.$route.query.id,
        couponNum:this.count,
        popularity:this.popularity,
        popularityType:"03"
      }
      convert(data).then(res => {
        console.log(res)
        if(res.state){
          this.$toast(res.msg)
        }else{
          this.$toast(res.msg)
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
.content {
  padding: 2rem 0 0;
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
      width:40%;
      padding:0.7rem 0;
      margin:0 auto;
      div.div_top{
        background:url(../../../../static/img/01.png) no-repeat;
        background-size:100% 98%;
      }
      div{
        font-size:.9rem;
        color:#fff;
        i{
          font-size:.6rem;
          font-style:normal;
        }
        span{
          font-style:.8rem
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
    
  }
  .role{
    border-top:.2rem solid #f4f4f4;
    .p1{
      padding:0.5rem 3%;
      font-size:0.6rem;
    }
    .num{
      font-size:.7rem;
      padding:0 3% .5rem;
      span{
        float:left;
        margin-right:.5rem;

      }
      div{  
        float:left;        
        i{
          display:block;
          width:1.2rem;
          height:1rem;
          line-height:1rem;
          font-size:.6rem;
          float:left;
          font-style:normal;
          text-align:center;
          border:1px solid #eee;
        }
      }
      
    }
    p{  
      padding:0 3%;
      font-size:.6rem;
      color:#999;
    }
  }

}
.ft{
  position:fixed;
  bottom:0;
  width:100%;
  color:#fff;
  font-size:.7rem;
  padding:0.5rem 0;
  background:#e83737;
  z-index:1;
  text-align:center;
}
</style>