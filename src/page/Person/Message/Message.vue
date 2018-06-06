<template>
  <div id="betting">
    <mt-header fixed title="优惠券">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <div class="content">
      <ul class="ulClass">
        <li class="liClassContent" v-for="(item,index) in titleList" :class='{liClass:tabs == index}' @click="changeTab(index)">
          <span>{{item.names}}</span>
        </li>
     </ul>
      <!-- tab-container -->
      <mt-tab-container v-model="selected" style="margin-top:2.5rem;margin-bottom:2rem;">
        <mt-tab-container-item id="open">
          <ul class="list" >
            <li v-for="(item,index) in list" v-if="isShow">
              <div class="list_top">
                <div style="padding-top:.5rem;" >
                    <i>￥</i><span>{{item.couponValue}}</span>
                </div>
                <div style="flex:2">
                  <p class="div_p" style="padding-left:.5rem;">现金券{{item.couponValue}}元 </p>
                  <p style="color:#fff;padding-left:.5rem;">投资金额>={{item.investLimit}}可用</p>                
                </div>
                <div style="flex:0.8" >
                  <span style="width:1rem;font-size:.6rem;display:block;margin-left:1.5rem;" v-if="item.useState == '02'">立即使用</span>
                   <span style="width:1rem;font-size:.6rem;display:block;margin-left:1.5rem;" v-if="item.useState == '01'">已使用</span>
                    <span style="width:1rem;font-size:.6rem;display:block;margin-left:1.5rem;" v-if="item.useState == '03'">已过期</span>
                </div>
              </div>
              <div class="" style="border-bottom:1px solid #b30a00;position:relative;height:0.5rem;" class="clearfix">
                <p style="text-align:center;color:#b30a00;position:absolute;bottom:-0.4rem;margin-left:20%;background:#ea372d;padding:0 1rem;">有效期：{{item.expireTime | toSubstring}}</p>
              </div>
               <!-- <p style="margin-top:.5rem;"></p> -->
            </li>
            <li v-for="(item,index) in list1" v-if="isShow1">
              <div class="list_top">
                <div style="padding-top:.5rem;" >
                    <i></i><span>{{item.couponValue}}%</span>
                </div>
                <div style="flex:2">
                  <p class="div_p" style="padding-left:.5rem">加息券{{item.couponValue}}% </p>
                  <p style="color:#fff;padding-left:.5rem">投资金额>={{item.investLimit}}可用</p>                
                </div>
                <div style="flex:0.8" >
                  <span style="width:1rem;font-size:.6rem;display:block;margin-left:1.5rem;" v-if="item.useState == '02'">立即使用</span>
                   <span style="width:1rem;font-size:.6rem;display:block;margin-left:1.5rem;" v-if="item.useState == '01'">已使用</span>
                    <span style="width:1rem;font-size:.6rem;display:block;margin-left:1.5rem;" v-if="item.useState == '03'">已过期</span>

                </div>
              </div>
              <div class="" style="border-bottom:1px solid #b30a00;position:relative;height:0.5rem;" class="clearfix">
                <p style="text-align:center;color:#b30a00;position:absolute;bottom:-0.4rem;margin-left:20%;background:#ea372d;padding:0 1rem;">有效期：{{item.expireTime | toSubstring}}</p>
              </div>
               <!-- <p style="margin-top:.5rem;"></p> -->
            </li>
            <!-- <p class="p" v-if="isShow" @click="toHistory">查看历史现金券</p>
            <p class="p" v-if="isShow1" @click="toHistory">查看历史加息券</p> -->
          </ul>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <p v-if="showP" style="text-align:center;font-size:0.7rem;padding:0.7rem 0;">暂无数据~</p>
    <footer class="ft" @click="Popularity">人气值兑换</footer>
  </div>
</template>

<script>
import {couponList} from "@/services/getDetail"
export default {
  data() {
    return {
      selected:'open',
      listQuery:{
        pageSize:10,
        pageId:1,
      },
      
      lotteryStatus:"",
      titleList:[
        {names:"现金券",id:"1"},
        {names:"加息券",id:"2"},
      ],
      tabs:0,
      isShow:true,
      isShow1:false,
      isShow2:false,
      list:[],
      list1:[],
      showP:false,

    }
  },
  mounted(){
    this.initData();
  },
  methods:{
    goback() {
      this.$router.push("/person")
    },
    initData(){
      this.listQuery.couponType="01";
      couponList(this.listQuery).then(res=>{
        console.log(res)
        if(res.state){
            this.list =res.data.dataList
        }
      })
    },
    couponList(){
      this.listQuery.couponType="02";
       couponList(this.listQuery).then(res=>{
        console.log(res)
        if(res.state){
            this.list1 =res.data.dataList

        }
      })
    },
    changeTab(index){
      var that = this;
      that.tabs = index;
      if(that.tabs == 0){
        that.isShow1=false;
        that.isShow = true;
        that.initData();
      }else if(that.tabs == 1){
        that.isShow1=true;
        that.isShow = false;
        that.couponList()
      }
    },
    //去往历史页面
    toHistory(){
      if(this.isShow){
        this.$router.push({
          name:'history',
          query:{
            type:1
          }
        })
        //this.$router.push("/person/history")
      }else{
        this.$router.push({
          name:'history',
          query:{
            type:2
          }
        })
      }
    },
    //去往人气值兑换
    Popularity(){
      //this.$router.push("/person/popularity")
      if(this.isShow){
        this.$router.push({
          name:"details",
          query:{
            type:1
          }
        })
      }else{
        this.$router.push({
          name:"details",
          query:{
            type:2
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
    },
    toSubstring(val){
      if(val != ''){
        return val.substring(0,10)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.clearfix:after{ display: block; clear: both; content: "\0020"; visibility: hidden; height: 0 }
.ft{
  position:fixed;
  bottom:0;
  text-align:center;
  font-size:.6rem;
  width:100%;
  padding:0.5rem 0;
  background-color:#e83737;
  color:#fff;
}
.content {
  ul.ulClass{
    display:flex;
    background-color:#fff;
    position:fixed;
    top:2rem;
    z-index:1;
    width:100%;
    .liClassContent{
      flex:1;
      text-align:center;
      font-size:0.6rem;
      padding:0.5rem;

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
    .p{
      border-bottom:1px solid #e83737;
      color:#e83737;
      font-size:.6rem;
      width:28%;
      margin:1rem auto;

    }
    li{
        width:94%;
        margin:0 auto;
        border-radius:.5rem;
        background:url(../../../../static/img/youhuiquan.png) no-repeat;;
        background-size:100%;
        font-size:.6rem;
        margin-bottom:.3rem;
        padding:0.7rem .5rem;
        .list_top{
          display:flex;
          div{
            flex:1;
            i{
              font-style:normal;
              color:#fff;
              margin-left:.5rem;
              margin-top:.5rem;
            }
            span{
              font-size:1.2rem;
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
  .is-selected {
    border-bottom: 3px solid #e83737;
    color: #e83737;
     margin-bottom: -3px;
  }
}
</style>
