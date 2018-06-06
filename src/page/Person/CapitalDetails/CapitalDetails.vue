<template>
  <div id="betting">
    <mt-header fixed title="债权转让">
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
            <li v-for="(item,index) in list" v-if="isShow">
              <p>{{item.projectName}}-{{item.projectNo}}期</p>
              <div class="list_top">
                <div>
                    <div>{{item.transferMoney | toFixed}}</div>
                    <i>项目金额(元)</i>
                </div>
                <div>
                    <div>{{item.projectRate}}%</div>
                    <i>预期年收益率</i>
                </div>
                <div>
                    <div>{{item.haveMoney | toFixed}}</div>
                    <i>认购金额(元)</i>
                </div>
              </div>
              <div style="position:relative;padding: 0.7rem 0">
                <mCircle type="line" :percentage="item.schedule"></mCircle>
              </div>
            </li>
            <li v-for="(item,index) in list1" v-if="isShow1">
              <p>{{item.projectName}}-{{item.projectNo}}期</p>
              <div class="list_top">
                <div>
                    <div>{{item.transferMoney | toFixed}}</div>
                    <i>项目金额(元)</i>
                </div>
                <div>
                    <div>{{item.projectRate}}%</div>
                    <i>预期年收益率</i>
                </div>
                <div>
                    <div>{{item.haveMoney | toFixed}}</div>
                    <i>认购金额(元)</i>
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
import {myTransferList} from "@/services/getDetail"
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
        {names:"转让中",id:"1"},
        {names:"已转让",id:"2"},
        {names:"已流标",id:"3"}
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
    this.myTransferList();
  },
  methods:{
    goback() {
      this.$router.push("/person")
    },
    myTransferList(){
      this.listQuery.claimsStatus ='02',

      myTransferList(this.listQuery).then(res =>{
        console.log(res)
        if(res.state){
          if(res.data.dataList != 0){
            this.list = res.data.dataList;
          }
        }

      })

    },
    getBuyRecord(){
      this.listQuery.claimsStatus ='04',
      myTransferList(this.listQuery).then(res =>{
        console.log(res)
        if(res.state){
          if(res.data.dataList != 0){
            this.list1 = res.data.dataList;
          }
        }

      })
    },
    getLiubiao(){
      this.listQuery.claimsStatus ='06',
      myTransferList(this.listQuery).then(res =>{
        console.log(res)
        if(res.state){
          if(res.data.dataList != 0){
            this.list1 = res.data.dataList;
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
        that.myTransferList();
      }else if(that.tabs == 1){
        that.isShow1=true;
        that.isShow = false;
        that.getBuyRecord()
      }else{
        that.isShow1=true;
        that.isShow = false;
        that.getLiubiao();
      }
    }
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
      padding:0 3%;
        p{
          padding:0.5rem 0;
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
          display:flex;
          font-size:0.6rem;
          padding:0.5rem 3%;
          border-top:1px solid #eee;
          div{
            flex:1;
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