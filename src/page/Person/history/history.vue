<template>
  <div id="betting">
    <mt-header fixed title="历史优惠券">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <div class="content">
      <!-- <ul class="ulClass">
        <li class="liClassContent" v-for="(item,index) in titleList" :class='{liClass:tabs == index}' @click="changeTab(index)">
          <span>{{item.names}}</span>
        </li>
     </ul> -->
      <!-- tab-container -->
      <mt-tab-container v-model="selected" style="margin-top:.5rem;">
        <mt-tab-container-item id="open">
          <ul class="list" >
            <li v-for="(item,index) in list" v-if="isShow">
              <div class="list_top">
                <div style="padding-top:.5rem;" >
                    <i>￥</i><span>{{item.money}}</span>
                </div>
                <div style="flex:2">
                  <p class="div_p">人气值兑换现金券100元 </p>
                  <p style="color:#fff;">投资金额>={{item.isInvesMoney}}可用</p>                
                </div>
                
              </div>
              <div class="" style="border-bottom:1px solid #666;position:relative;height:0.5rem;" class="clearfix">
                <p style="text-align:center;color:#666;position:absolute;bottom:-0.4rem;margin-left:20%;background:#b3b3b3;padding:0 1rem;">有效期：{{item.time}}</p>
              </div>
               <!-- <p style="margin-top:.5rem;"></p> -->
            </li>
            <li v-for="(item,index) in list1" v-if="isShow1">
              <div class="list_top">
                <div style="padding-top:.5rem;" >
                    <i></i><span>{{item.money}}%</span>
                </div>
                <div style="flex:2">
                  <p class="div_p">人气值兑换加息券{{item.money}}% </p>
                  <p style="color:#fff;">投资金额>={{item.isInvesMoney}}可用</p>                
                </div>
                
              </div>
              <div class="" style="border-bottom:1px solid #666;position:relative;height:0.5rem;" class="clearfix">
                <p style="text-align:center;color:#666;position:absolute;bottom:-0.4rem;margin-left:20%;background:#b3b3b3;padding:0 1rem;">有效期：{{item.time}}</p>
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
    <!-- <footer class="ft" @click="Popularity">人气值兑换</footer> -->
  </div>
</template>

<script>
// import {getBuyRecordList} from "../../../services/getDetail"
export default {
  data() {
    return {
      selected:'open',
      pageSize:10,
      pageId:1,
      lotteryStatus:"",
      titleList:[
        {names:"现金券",id:"1"},
        {names:"加息券",id:"2"},
      ],
      tabs:0,
      isShow:true,
      isShow1:false,
      isShow2:false,
      list:[
        {
          money:"1000",
          isInvesMoney:"2000",
          time:"2018-05-21"
        },{
          money:"2000",
          isInvesMoney:"2000",
          time:"2018-05-21"
        }
        
      ],
      list1:[
       {
          money:"0.8",
          isInvesMoney:"2000",
          time:"2018-05-21"
        },{
          money:"0.8",
          isInvesMoney:"2000",
          time:"2018-05-21"
        }
      ],
      showP:false,
    }
  },
  mounted(){
    //this.getBuyRecordList();
    if(this.$route.query.type == 1){
      this.isShow = true;
      this.isShow1 = false;
    }else{
      this.isShow = false;
      this.isShow1 = true;
    }
  },
  methods:{
    goback() {
      this.$router.push("/person")
    },
    getBuyRecordList(){
      var that = this;
      that.lotteryStatus="01"
      that.list=[];
      getBuyRecordList(that.lotteryStatus,that.pageSize,that.pageId).then(res =>{
        console.log(res)
        if(res.state){
          that.list = res.data.dataList;
          if(res.data.dataList != 0){
            for(var i=0;i<res.data.dataList.length;i++){
              res.data.dataList[i].arrList = res.data.dataList[i].buyDetail.split('|')
            }
          }else{
            that.showP = true
          }
          
          console.log(that.list)

        }

      })

    },
    getBuyRecord(){
      var that = this;
      that.lotteryStatus="02"
      that.list=[];
      getBuyRecordList(that.lotteryStatus,that.pageSize,that.pageId).then(res =>{
        console.log(res)
        if(res.state){
          if(res.data.dataList != 0){
            that.list = res.data.dataList
          }else{
            that.showP = true
          }
          
        }
      })
    },
    changeTab(index){
      var that = this;
      that.tabs = index;
      if(that.tabs == 0){
        that.isShow1=false;
        that.isShow = true;
        //that.getBuyRecordList();
      }else if(that.tabs == 1){
        that.isShow1=true;
        that.isShow = false;
        //that.getBuyRecord()
      }
    },
   
   
      
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
        background:url(../../../../static/img/history.png) no-repeat;;
        background-size:100%;
        font-size:.6rem;
        margin-bottom:.3rem;
        padding:0.7rem .5rem;
        .list_top{
          display:flex;
          padding-bottom:.5rem;
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