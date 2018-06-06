<template>
  <div id="betting">
    <mt-header fixed :title="title">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <div class="content">
      <ul class="list1" >
        <li class="liClass" v-for="(item,index) in list" @click="chooseCup(item)">
          <div class="list_top1">
            <div style="padding-top:.5rem;padding-left:1.5rem" v-if="type=='01'">
                <i>￥</i><span>{{item.couponValue}}</span>
            </div>
            <div style="padding-top:.5rem;padding-left:1.5rem" v-if="type=='02'">
                <span>{{item.couponValue}}</span><i>%</i>
            </div>
            <div>
              <p class="div_p" style="font-size:.7rem;font-weight:600">{{title}} </p>
              <p style="color:#fff;">满{{item.investLimit|toFixed}}可用</p>                
            </div>
          </div>
          <div class="" style="border-bottom:1px solid #b30a00;position:relative;height:0.5rem;" class="clearfix">
            <p style="text-align:center;color:#b30a00;position:absolute;bottom:-0.4rem;margin-left:20%;background:#ea372d;padding:0 1rem;">有效期：{{item.expireTime}}</p>
          </div>
           <!-- <p style="margin-top:.5rem;"></p> -->
        </li>        
      </ul>
    </div>
    <p v-if="showP" style="text-align:center;font-size:0.7rem;padding:0.7rem 0;">暂无数据~</p>
    
  </div>
</template>

<script>
import {usableCoupon} from "@/services/getDetail"
import {setStore} from "@/config/mUtils"
export default {
  data() {
    return {
      selected:'open',
      pageSize:10,
      pageId:1,
      lotteryStatus:"",
      title:"收益券",
      tabs:0,
      isShow:true,
      isShow1:false,
      isShow2:false,
      list:[],
      showP:false,
      type:"01"
    } 
  },
  mounted(){
    this.usableCoupon();
    if(this.$route.query.couponType == "01"){
      this.title="收益券"
      this.type="01"
    }else{
      this.title="加息券"
      this.type="02"
    }
  },
  methods:{
    goback() {
       this.$router.go(-1)
       // this.$router.push({
       //    name:"nowBuy",
       //    query:{
       //      investMoney:this.$route.query.investMoney,
       //      id:this.$route.query.id,
       //      momey:this.$route.query.momey
       //    }
       //  })
    },
    usableCoupon(){
      var data ={
        couponType:this.$route.query.couponType,
        investMoney:this.$route.query.investMoney,
      }
      usableCoupon(data).then(res=>{
        console.log(res)
        if(res.state){
          this.list=res.data
        }
      })
    },
    chooseCup(item){
      if(item.couponType == "01"){
        setStore("couponId",item)
        this.$router.push({
          name:"nowBuy",
          query:{
            investMoney:this.$route.query.investMoney,
            id:this.$route.query.id,
            momey:this.$route.query.momey,
            //couponId:item.couponId
          }
        })
      }else{
        setStore("raiseId",item)
        this.$router.push({
          name:"nowBuy",
          query:{
            investMoney:this.$route.query.investMoney,
            id:this.$route.query.id,
            momey:this.$route.query.momey,
            //raiseId:item.couponId
          }
        })
       
      }
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
  padding-top:2.3rem;
  .list1 { 
    .liClass{
        width:94%;
        margin:0 auto;
        border-radius:.5rem;
        background:url(../../../../../static/img/10.png) no-repeat;;
        background-size:100%;
        font-size:.6rem;
        margin-bottom:.3rem;
        padding:0.7rem .5rem;
        .list_top1{
          display:flex;
          padding-bottom:.5rem;
          div{
            flex:1;
            i{
              font-style:normal;
              color:#fff;
              font-size:.6rem;
              margin-left:.5rem;
              margin-top:.5rem;
            }
            span{
              font-size:1.5rem;
              font-weight:700;
              color:#fff;
            }
            .div_p{
              margin-top:.5rem;
              color:#fff;
            }
          }
          
        }
        .list_p{
            padding:0.5rem 0 0;
            
            color:#999;
            span{
              border:1px solid #e83737;
              color:#e83737;
              float:right;
              padding:.1rem .2rem;
              border-radius:5px;
              font-size:.5rem;
            }
          }    
      }
  }
  
}
</style>