<template>
  <div id="betting">
    <mt-header fixed title="项目明细">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <div class="content">
      <ul class="ulClass">
        <li class="liClassContent" v-for="(item,index) in titleList" :class='{liClass:tabs == index}' @click="changeTab(index)">
          <span>{{item.names}}</span>
        </li>
     </ul>
      <!-- tab-container -->
      <div class="details">
        <div class="details_one" v-if="isShow">
          <p><i><img src="../../../../../static/img/06.png"/></i>项目详情</p>
          <div class="text">
            {{data.projectDetails}}
          </div>
          <p><i><img src="../../../../../static/img/05.png"/></i>借款人信息</p>
          <div class="img">
             <div style="padding-left:0" v-for="item in imgUrl">
                <img :src="item.imageUrl"/>
             </div>
                        
          </div>
          <ul class="clearfix">
              <li class="clearfix">
                <span class="left">姓名：</span>
                <span class="left">{{data.customerName}}</span>
              </li>
              <li class="clearfix">
                <span class="left">性别：</span>
                <span class="left">{{data.customerSex}}</span>
              </li>
              <li class="clearfix" >
                <span class="left">年龄：</span>
                <span class="left">{{data.customerAge}}</span>
              </li>
              <li class="clearfix" >
                <span class="left">身份证号：</span>
                <span class="left">{{customerIdcard}}</span>
              </li>
              <li class="clearfix">
                <span class="left">学历：</span>
                <span class="left">{{data.customerEduction}}</span>
              </li>
              <li class="clearfix">
                <span class="left">现居地：</span>
                <span class="left">{{data.customerAddress}}</span>
              </li>
              <li class="clearfix">
                <span class="left">婚否：</span>
                <span class="left">{{data.customerIsmarry}}</span>
              </li>
             <!--  <li class="clearfix">
                <span class="left">收入：</span>
                <span class="left">10000-15000元</span>
              </li>
              <li class="clearfix">
                <span class="left">职业：</span>
                <span class="left">某公司经理</span>
              </li> -->
             
            </ul>
            <p><i><img src="../../../../../static/img/04.png"/></i>担保方式</p>
            <div class="div_one">
              <h5>还款保障</h5>
              <p>第一还款来源：银行或机构资金放款；第二还款来源担保企业承担无限连带责任还款</p>
            </div>
             <div class="div_one">
              <h5>风控保障</h5>
              <p style="padding-bottom:.2rem;line-height:1rem;">保证措施：已对该借款人财务状况、资产状况、信用状况进行了严格审查</p>
              <p style="padding-top:0;">风控审核：经过严格的准入条件和全面的实地尽职调查。该借款项目真实可靠</p>
            </div>
        </div>
        <div class="datails_two" v-if="isShow1">
          <ul class="clearfix">
            <li style="color:#999;">
              <div >用户名</div>
              <div>投资金额</div>
              <div style="flex:1.8">投资时间</div>
            </li>
            <li v-for="(item,index) in list" :key="index">
              <div>{{item.userName | hide}}</div>
              <div style="color:#ff0000">{{item.investMoney | toFixed}}</div>
              <div style="flex:1.8">{{item.investTime}}</div>
            </li>
          </ul>
        </div>
        <div class="datails_two" v-if="isShow2">
          <ul class="clearfix">
            <li style="color:#999;">
              <div >用户名</div>
              <div>还款金额</div>
              <div style="flex:1.8">还款时间</div>
            </li>
            <li v-for="(item,index) in list1" :key="index">
              <div>{{item.userName | hide}}</div>
              <div style="color:#ff0000">{{item.shouldRpmtTotalmoney | toFixed}}</div>
              <div style="flex:1.8">{{item.shouldRpmtTime}}</div>
            </li>
          </ul>
        </div>
      </div>
            

    </div>
    <footer class="footer">
      <button @click="toBuy()"  v-if="money != 0">立即投资</button>
      <button v-if="money == 0" style="background:rgb(204, 204, 204)">已售完</button>
    </footer>
  </div>
</template>

<script>
 import {loanInfo,productImageList,investList,repaymentPlan} from "@/services/getDetail"
export default {
  data() {
    return {
      selected:'open',
      pageSize:10,
      pageId:1,
      tabs:0,
      titleList:[
        {names:"项目详情",id:"1"},
        {names:"投资记录",id:"2"},
        {names:"还款计划",id:"3"},
      ],
      list:[],
      list1:[],
      imgUrl:[],
      isShow:true,
      isShow1:false,
      isShow2:false,
      data:{},
      customerEduction:"",
      customerSex:"",
      customerIsmarry:"",
      customerIdcard:"",
      investMoney:"",
      money:null
    }
  },
  mounted(){
    this.money = this.$route.query.investMoney
    this.loanInfo();
    this.productImageList();
  },
  methods:{
    goback() {
      this.$router.go(-1)
    },
    loanInfo(){
      loanInfo(this.$route.query.id).then(res => {
        //console.log(res)
        if(res.state){
          this.data = res.data.dataShow
          this.investMoney = res.data.investMoney;
          //客户学历(01-小学、02-初中、03-高中、04-大学、05-研究生)
          this.customerIdcard = res.data.dataShow.customerIdcard.substring(0,6)+"****"+res.data.dataShow.customerIdcard.substring(res.data.dataShow.customerIdcard.length-4)
          if(res.data.dataShow.customerEduction == '01'){
              this.customerEduction = '小学'
          }else if(res.data.dataShow.customerEduction == '02'){
              this.customerEduction = '初中'
          }if(res.data.dataShow.customerEduction == '03'){
              this.customerEduction = '高中'
          }if(res.data.dataShow.customerEduction == '04'){
              this.customerEduction = '大学'
          }if(res.data.dataShow.customerEduction == '01'){
              this.customerEduction = '研究生'
          }

          if(res.data.dataShow.customerSex == "01"){
            this.customerSex="男"
          }if(res.data.dataShow.customerSex == "02"){
            this.customerSex="女"
          }

          if(res.data.dataShow.customerIsmarry == "01"){
            this.customerIsmarry ="已婚"
          } if(res.data.dataShow.customerIsmarry == "02"){
            this.customerIsmarry ="未婚"
          } if(res.data.dataShow.customerIsmarry == "03"){
            this.customerIsmarry ="离异"
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
        that.isShow2=false
        that.investList()
      }else{
        that.repaymentPlan()
        that.isShow=false;
        that.isShow1 = false;
        that.isShow2=true
      }
    },
    toBuy(){
      this.$router.push({
        name:"nowBuy",
        query:{
          momey:this.investMoney,
          id:this.$route.query.id
        }
      })
    },
    //获取图片
    productImageList(){
      var data = {
        projectId:this.$route.query.id,
        imageType:"01"
      }
      productImageList(data).then(res=>{
        console.log(res)
        if(res.state){
          this.imgUrl = res.data;
        }
      })
    },
    //获取投资记录
    investList(){
      var data = {
        projectId:this.$route.query.id,
        pageId:1,
        pageSize:10
      }
      this.list=[];
      investList(data).then(res=>{
        console.log(res)
        if(res.state){
          this.list = res.data.dataList
        }
      })
    },
    //获取还款计划列表
    repaymentPlan(){
      var data = {
        projectId:this.$route.query.id,
        pageId:1,
        pageSize:10
      }
      this.list=[]
      repaymentPlan(data).then(res=>{
        console.log(res)
        if(res.state){
          this.list1 = res.data.dataList
        }
      })
    }
  },
  filters:{
    toFixed(val){
      if(val != "" || val !=null){
        return parseInt(val).toFixed(2)+"元"
      }
    },
    hide(val){
      if(val.length > 1){
        return val.substring(0,1)+"*"
      }else{
        return val
      }
    },
    
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
  .details{    
    padding:4.4rem  0 3rem;
    .details_one{
      padding:0 3%;
      background:#fff;
      p{
        color:#999;
        font-size:.6rem;
        position:relative;
        padding:0.7rem 0 0.5rem 1rem;
        i{
          display:block;
          width:.6rem;
          height:.6rem;
          position:absolute;
          left:0;

        }
      }
      .text{
        font-size:.6rem;
        color:#999;
        padding-left:1rem;
        border-bottom:1px solid #eee;
        padding-bottom:.5rem;
      }
      .img{
        display:flex;
        padding-left:1rem;
        div{
          flex:1;
          padding:0 .5rem 0.5rem;
        }
      }
        ul{
          border-bottom:1px solid #eee;
          li{
            float:left;
            width:40%;
            padding-bottom:0.5rem;
            span.left{
              float:left;
              font-size:.6rem;
              color:#999;
            }
          }
          li:nth-of-type(2n){
            width:60%;
          }
          li:nth-of-type(2n+1){
            padding-left:1rem;
          }
        }
        .div_one{
          h5{
            font-size:.7rem;
            padding-left:1rem;
            p{
              padding-bottom:0;
            }
          }
        }
     
    }
    .datails_two{
      ul{
        background:#fff;
        padding:0 3%;
        li{
          display:flex;
          padding:0.5rem 0;
          border-bottom:1px solid #eee;
          div{
            flex:1;
            font-size:.6rem;
            text-align:center;
          }
        }
      }
    }
  }
}
.footer{
  position:fixed;
  bottom:0;
  width:100%;
  p{
    text-align:center;
    color:#999;
    font-size:.6rem;
    padding:0.5rem;
    position:relative;
    i{
      display:block;
      width:.6rem;
      height:.6rem;
      position:absolute;
      left:28%;

    }
  }
  button{
    width:100%;
    background:#e52920;
    padding:0.5rem 0;
    color:#fff;
    text-align:center;
    border:0;
    font-size:.7rem;
  }
}  
  
</style>