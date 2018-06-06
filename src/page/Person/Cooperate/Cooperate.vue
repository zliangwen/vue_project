<template>
  <div id="betting">
    <mt-header fixed title="投资记录">
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
          <ul class="list" >
            <li v-for="(item,index) in list" v-if="isShow" style="padding:0 3%;">
              <p>{{item.projectName}}-第{{item.projectTimelimit}}期</p>
              <div class="list_top">
                <div>
                    <div>{{item.projectMoney | toFixed}}</div>
                    <i>项目金额(元)</i>
                </div>
                <div>
                    <div>{{item.projectRate}}%</div>
                    <i>预期年收益率</i>
                </div>
                <div>
                    <div>{{item.investMoney | toFixed}}</div>
                    <i>投资金额(元)</i>
                </div>
              </div>
              <div style="position:relative;padding: 0.7rem 0">
                <mCircle type="line" :percentage="item.schedule"></mCircle>
              </div>
            </li>
            <li v-for="(item,index) in list1" v-if="isShow1" style="padding:0 3%;">
              <p>
                {{item.projectName}}-第{{item.projectTimelimit}}期
                <span>转让</span>
                <span style="margin-right:.5rem;" @click="toApply(item)">回款明细</span> 
               
              </p>
              <div class="list_top">
                <div>
                    <div>{{item.projectMoney | toFixed}}</div>
                    <i>项目金额(元)</i>
                </div>
                <div>
                    <div>{{item.projectRate}}%</div>
                    <i>预期年收益率</i>
                </div>
                <div>
                    <div>{{item.investMoney | toFixed}}</div>
                    <i>投资金额(元)</i>
                </div>
              </div>
              
            </li>
          </ul>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <p v-if="showP" style="text-align:center;font-size:0.7rem;padding:0.7rem 0;">暂无数据~</p>
  </div>
</template>

<script>
import {myInvestList} from "../../../services/getDetail"
 import mCircle from '@/components/circle'
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
        {names:"招标中",id:"1"},
        {names:"还款中",id:"2"},
        {names:"已还清",id:"3"},
        {names:"流标",id:"4"},
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
    this.getBuyRecordList();
  },
  methods:{
    goback() {
      this.$router.push("/person")
    },
    getBuyRecordList(){
      var that = this;
      //that.lotteryStatus="01"
      that.listQuery.status="01";
      that.list=[];
      myInvestList(that.listQuery).then(res =>{
        console.log(res)
        if(res.state){
          if(res.data.dataList != 0){
            that.list = res.data.dataList;
          }else{
            that.showP = true
          }
        }

      })

    },
    getBuyRecord(){
      var that = this;
      that.listQuery.status="02"
      that.list=[];
      myInvestList(that.listQuery).then(res =>{
        console.log(res)
        if(res.state){
          if(res.data.dataList != 0){
            that.list1 = res.data.dataList
          }else{
            that.showP = true
          }
          
        }
      })
    },
    getNull(){
      var that = this;
      that.listQuery.status="03"
      that.list=[];
      myInvestList(that.listQuery).then(res =>{
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
    getLiuBiao(){
      var that = this;
      that.listQuery.status="04"
      that.list=[];
      myInvestList(that.listQuery).then(res =>{
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
        that.getBuyRecordList();
      }else if(that.tabs == 1){
        that.isShow1=true;
        that.isShow = false;
        that.getBuyRecord()
      }else if(that.tabs == 2){
        that.isShow1=false;
        that.isShow = true;
        that.getNull()
      }else{
        that.isShow1=false;
        that.isShow = true;
        that.getLiuBiao()
      }
    },
    toApply(item){
      this.$router.push({
        name:"apply",
        query:{
          id:item.id,
          name:item.projectName,
          issSum:item.projectTimelimit
        }
      })
    },
  },
  components: {
   
     mCircle,
    // vScroll
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
      background-color:#fff;
      margin-bottom:.2rem;
        p{
          padding:0.5rem 3%;
          font-size:0.7rem;
          border-bottom:1px solid #eee;
          span{
            float:right;
            color:#e83737;
            border:1px solid #e83737;
            font-size:.6rem;
            border-radius:5px;
            padding:0.1rem 0.2rem;
          }
        }
        .list_top{
          display:flex;
          padding: 0.5rem 0;

          div{
            flex:1;
            text-align:center;
            font-size:.6rem;
            padding:0.2rem 0;
            i{
              display:block;
              font-style:normal;
              color:#999;
              font-size:.5rem;
            }
          }
        }
        .list_bottom{
          font-size:0.6rem;
          padding:0.5rem 3%;
          border-top:1px solid #eee;
          div{
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