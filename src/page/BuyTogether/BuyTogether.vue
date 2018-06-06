<template>
  <div id="buyTogether">
    <header class="header">
      <ul class="clearfix">
        <li v-for="(item,index) in tabList" :key="index" :class="{isActive : tabs == index }" @click="changeTab(index)">{{item.name}}</li>
      </ul>
    </header>
    <div class="concent">
      <ul class="clearfix">
        <li v-for="(item,index) in list" :key="item.id" @click="toDetails(item)" v-if="show1">
          <p class="div_p">{{item.projectName}}-第{{item.projectNum}}期</p>
          <div class="div_bottom">
            <div class="top">
              <span class="span1">{{item.projectRate | toFixed}}<i>%</i></span>
              <span>{{item.projectTimelimit}}<i>个月</i></span>
              <span class="span2">{{item.investMoney }} <i>元</i></span>
            </div>
            <div class="bottom">
              <span class="span1">预期年收益率</span>
              <span>期限</span>
              <span class="span2">可投金额</span>
            </div>
          </div>
          <div class="mcirlce">
            <mCircle type="line" :percentage="item.schedule"></mCircle>
          </div>
        </li>
        <li v-for="(item,index) in list" :key="item.id" @click="toDetails(item)" v-if="!show1">
          <p class="div_p">{{item.projectName}}-第{{item.projectNum}}期</p>
          <div class="div_bottom">
            <div class="top">
              <span class="span1">{{item.projectRate | toFixed}}<i>%</i></span>
              <span>{{item.projectTimelimit}}<i>个月</i></span>
              <span class="span2">{{item.investMoney | toFixed}} <i>元</i></span>
            </div>
            <div class="bottom">
              <span class="span1">预期年收益率</span>
              <span>期限</span>
              <span class="span2">可认购金额</span>
            </div>
          </div>
          <div class="mcirlce">
            <mCircle type="line" :percentage="item.schedule"></mCircle>
          </div>
        </li>
      </ul>
    </div>
    <m-tabbar></m-tabbar>
  </div>
</template>

<script>
import mTabbar from '@/components/tabbar'
 import mCircle from '@/components/circle'
// import vScroll from '@/components/pull-refresh'
import {frontListData} from '../../services/getDetail'


export default {
  data() {
    return {
      tabList:[
        {name:"投资理财"},{name:"转让专区"}
      ],
      tabs:0,
      list:[],
      show1:true,
      listQuery:{
        pageSize:10,
        pageId:1,
      }
    }
  },
  mounted(){
    
  	this.initData()
  },
  methods:{
    changeTab(index){
      this.tabs = index;
      if(this.tabs == 0){
        this.show1 = true
        this.initData()
      }else{
        this.show1 = false;
        this.getTransfer()
      }
    },
    toDetails(item){
      this.$router.push({
        name:"buyInfo",
        query:{
          id:item.id,
          
        }
      })
    },
    initData(){
      this.listQuery.isTransfer = "02"
      this.list=[];
      frontListData(this.listQuery).then(res => {
        console.log(res)
        if(res.state){
          if(res.data.dataList != 0){
            this.list = res.data.dataList;

          }
        }
      })
    },
    getTransfer(){
      this.listQuery.isTransfer = "01";
      this.list=[];
      frontListData(this.listQuery).then(res => {
        console.log(res)
        if(res.data.dataList != 0){
          this.list = res.data.dataList;
            
        }
      })
    }
  },
  components: {
    mTabbar,
     mCircle,
    // vScroll
  },
   filters:{
    
    toFixed(val){
      if(val != '' || val != null){
        return parseInt(val).toFixed(2)
      }
    }
  },
 
}
</script>

<style lang="less" scoped>
.clearfix:after{ display: block; clear: both; content: "\0020"; visibility: hidden; height: 0 }
  .header{
    height:2rem;
    position:fixed;
    top:0;
    left:0;
    z-index:100;
    background:#e52920;
    width:100%;
    ul{
      width:50%;
      margin:0.4rem auto;
      border:1px solid #fff;
      border-radius:5px;
      li{
        float:left;
        color:#fff;
        width:50%;
        text-align:center;
        font-size:.6rem;
        padding:0.2rem 0;
       
      }
      li.isActive{
        background:#fff;
        color:#e52920;
        border-radius:5px;
      }
    }
  }
  .concent{
    padding-top:2rem;
    padding-bottom:2.3rem;
    background:#fff;
    ul{
      padding:0 3%;
      li{
        border-bottom:1px solid #eee;
        .div_p{
          padding:0.7rem 0;
          font-size:0.7rem;
        }
        .div_bottom{
          .top{
            display:flex;
            span{
              flex:1;
              font-size:0.7rem;
              text-align:center;
              i{
                font-style:normal;
                font-size:.5rem;
              }
            }
            .span1{
              text-align:left;
              color:#e52920;
              font-size:.8rem;
            }
            .span2{
              text-align:right;
            }
          }
          .bottom{
            display:flex;
            span{
              flex:1;
              color:#999;
              text-align:center;
              font-size:.6rem;
            }
            .span1{
              text-align:left;              
            }
            .span2{
              text-align:right;
            }
          }
        }
        .mcirlce{
          padding:0.7rem 0;
          position:relative;

        }
      }
    }
  }
</style>