<template>
  <div id="home">
    <!-- 轮播-->
    <div class="page-swipe">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in bannerList" :key="item.id">
         <img :src="item.imgUrl"  alt=""/>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 公告 -->
    <div class="first_ul" @click="toNotice()">
      <div><img src="../../assets/img/gb@2x.png" alt=""></div>
      <div class="box">
        <ul class="con1" ref="con1" :class="{anim:animate==true}">
          <li v-for="(item,index) in noticeList" :key="item.id" >{{item.articleName}}</li>
        </ul>
      </div>
      
    </div>
    <!-- 导航列表 -->
    <ul class="second_ul">
      <li  v-for="(item,index) in listImg" :key="index">
        <i><img :src="item.imgUrl" alt=""></i>
        <span>{{item.text}}</span>
      </li>
    </ul>

    <!-- concent -->
    <div class="concent">
      <div class="content_top">
        <span class="left">新客畅想</span>
        <span class="right">{{data.projectName}}-第{{data.projectNum}}期</span>
      </div>
      <div class="concent_center">
        <div>
          <span class="span1">{{data.projectRate | toFixed}}<i style="font-style:normal;font-size:0.5rem;">%</i></span>
          <span class="span2">预计年化收益</span>
        </div>
      </div>
      <div class="concent_footer">
        <ul>
          <li style="float:left"><i><img src="../../../static/img/time.png"/></i>期限{{data.projectTimelimit}}个月</li>
          <li style="float:right"><i><img src="../../../static/img/money.png"/></i>100元起投</li>
        </ul>
        <button class="btn" @click="toDetails(data)">立即抢购</button>
      </div>
    </div>

    <!-- 中奖记录 -->
    <ul class="fourth_ul">
      <li v-for="(item,index) in recordList " :key="item.id" @click="toDetails(item)">
        <div class="div_left" style="flex:.7">
          <span>精选理财</span>
          <div>
            <p>{{item.projectRate | toFixed}}<i>%</i></p>
            <p class="p" style="text-align:center">预期年收益率</p>
          </div>
        </div>
        <div class="div_right">
          <p>{{item.projectName}}-第{{item.projectNum}}期</p>
          <div class="div_right_footer">
            <div class="footer_div1">
              <p class="p">融资金额</p>
              <p>{{item.projectMoney | jifen}}</p>
            </div>
            <div class="footer_div1">
              <p class="p">投资期限</p>
              <p style="color:#333">{{item.projectTimelimit}}<i style="font-size:0.5rem;font-style:normal;">个月</i></p>
            </div>
            <div class="footer_div1">
              <p class="p">可投金额</p>
              <p  style="color:#333">{{item.investMoney | toFixed}} <i style="font-size:0.5rem;font-style:normal;">元</i></p>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="isTask" v-if="isTask" @click="userSign"></div>
    <m-tabbar></m-tabbar>
  </div>
</template>

<script>
import mTabbar from '../../components/tabbar'
import {getBanner,getNotice,buyRecord,frontListData,userSign,checkUserSign} from '../../services/getDetail'
import {getStore} from '../../config/mUtils'

export default {
  data() {
    return {
      animate:false,
      bannerList:[],
      noticeList:[],
      data1:{},
      data2:{},
      data3:{},
      data4:{},
      listQuery:{
        pageId:1,
        pageSize:5,
      },
      recordList:[],
      listImg:[
        {imgUrl:"./static/img/security.png",text:"我安全 你信赖"},
        {imgUrl:"./static/img/earnings.png",text:"高收益 低门槛"},
        {imgUrl:"./static/img/plane.png",text:"享灵活 超便捷"},
      ],
      listQuery:{
        pageSize:10,
        pageId:1,
      },
      data:{},
      isTask:true,
    }
  },
  created(){
    setInterval(this.scroll,2500)
  },

  mounted(){
    var that = this;
    that.getBanner()
    that.getNotice()
    that.frontListDataNew()
    that.frontListData()
    that.userSignAction()
    //that.getLottery()
    //that.buyRecord()
  },
  methods:{
    scroll(){
      var con1 = this.$refs.con1;
      // con1.style.marginTop='-1.5rem';
      this.animate=!this.animate;
      var that = this; 
      setTimeout(function(){
        that.noticeList.push(that.noticeList[0]);
        that.noticeList.shift();
        // con1.style.marginTop='0px';
        that.animate=!that.animate; 
      },2000)
    },
    //获取新手理财信息
    frontListDataNew(){
      this.listQuery.isNew ="01";
      frontListData(this.listQuery).then(res => {
        console.log(res)
        if(res.state){
          this.data=res.data.dataList[0];
        }
      })
    },
     //获取普通理财
    frontListData(){
      this.listQuery.isNew ="02";
      frontListData(this.listQuery).then(res => {
        console.log(res)
        if(res.state){
          this.recordList=res.data.dataList;
        }
      })
    },
   
      getBanner(){ 
        var data = {
          displayType :"02"
        }
        var that=this;
        // 获取banner
        getBanner(data).then(res => {
          console.log(res);
          that.bannerList = res.data;
        })
      },
     
      // 查询普通标
      getNotice(){
        var that=this;
        var data = {
          category:"02",
          articleType:"04",
          pageId:1,
          pageSize:10
        }
        getNotice(data).then(res =>{
          console.log(res);
          that.noticeList = res.data.dataList ;
        })
      },
      // 点击跳转到公告列表
      toNotice(){
        //console.log(item)
        this.$router.push({
          name:'notice',
          params:{
           
          }
        })
      },
      //点击去到项目详情
      toDetails(item){
        console.log(item)
        this.$router.push({
          name:"buyInfo",
          query:{
            id:item.id
          }
        })
      },
      //查询是否签到
      userSignAction(){
        checkUserSign().then(res =>{
          console.log(res)
          if(res.state){
            if(res.data.flag){
               this.isTask = true;
             }else{
                this.isTask = false;
             }
           
          }else{
          }
        })
      },
    //点击签到
    userSign(){
      userSign().then(res =>{
        console.log(res)
        if(res.state){
          this.$toast({
            position:"bottom",
            message:res.msg
          })
          this.isTask = false;
        }else if(res.code == '0002'){
          this.$router.push({
            name:"mine"
          })
          this.isTask = true;
        }
      })
    }
     
  },

  components: {
    mTabbar
  },

  filters:{
    nextPhone(val){
      return val.substring(0,3)+'****'+val.substring(val.length-4)
    },
    toFixed(val){
      if(val != '' || val != null){
        return parseInt(val).toFixed(2)
      }
    },
    jifen(value){
      if(parseInt(value).toString().length>5){
        return (parseInt(value)/10000).toFixed(0)+'万元'
      }
      return parseFloat(value).toFixed(2)+'元'
    }
  },

}
</script>

<style lang="less" scoped>
  .isTask{
    position:fixed;
    bottom:5rem;
    right:4%;
    width:2.5rem;
    height:2.5rem;
    border-radius:50%;
    font-size:.7rem;
    background:url(../../../static/img/isText.png) no-repeat;
    background-size:100%;
  }
  .page-swipe{
    width:100%;
    height:8.5rem;
    img{
      width:100%;
      height:100%;
    }
  }
  .line{
    width:100%;
    height:0.3rem;
    background:#e8e8e8;
  }
  .margin_right{
  	margin-right:2%;
  }
  .first_ul{
    width:94%;
    margin:0 auto;
    height:1.5rem;
    line-height:1.5rem;
    overflow:hidden;
    transition: all 0.5s;
    div{
      float:left;
      font-size: 0.5rem;
      color: #333333;
      img{
        width:50%;
      }
      .con1{
        li{
          height:1.5rem;
          line-height:1.5rem;
        }
      }
    }
  }
  .anim{
    transition: all 0.5s;
  }
  .second_ul{
    background: #fff;
    display: flex;
    width:94%;
    margin:0 auto;
    padding:0.5rem 0 1rem;
    li{
      flex:1;
      i{
        display: block;
        width:1.2rem;
        height:1.7rem;
        margin:0 auto;
        img{
          max-width:100%;
          vertical-align: middle;
        }
      }
      span{
        font-size: 0.6rem;
        display: block;
        width:100%;
        text-align: center;
        padding-top:0.4rem;
        height:0.7rem;
      }
    }
  }
  .concent{
    border-radius:.1rem;
    width:94%;
    margin:0.3rem auto 0.3rem;
    height:14rem;
    background:#fff;
    .content_top{
      padding-top:0.5rem;
      height:2rem;
      .left{
        display:block;
        padding:0.2rem;
        border:1px solid #e52920;
        border-radius:2px;
        color:#e52920;
        float:left;
        font-size:0.5rem;
        margin:0 1rem 0 0.5rem;
      }
      .right{
        display:block;
        float:left;
        font-size:0.7rem;
        line-height:1rem;
        text-align:center;
        width:50%;
        color:#333;
      }
    }
    .concent_center{

      div{
        width:6rem;
        height:6rem;
        background:url(../../../static/img/shape.png) no-repeat ;
        background-size:100%;
        margin:0 auto;
        overflow:hidden;
        position:relative;
        .span1{
          color:#fff;
          font-size:1rem;
          display:block;
          text-align:center;
          margin-top:2rem;
        }
        .span2{
          font-size:0.5rem;
          display:block;
          text-align:center;
          position:absolute;
          bottom:1rem;
          width:100%;
          color:#fff;

        }
      }
    }
    .concent_footer{
      ul{
        width:60%;
        margin:0 auto;
        padding:0.5rem 0;
        li{
          font-size:0.5rem;
          line-height:0.9rem;
          i{
            display:block;
            height:0.9rem;
            float:left;
            margin-right:0.25rem;
            img{
              line-height:middle;
            }
          }
        }
      }
      .btn{
        width:90%;
        margin:1rem 5%;
        height:2rem;
        background:#e52920;
        color:#fff;
        line-height:2rem;
        border:none;
        border-radius:5px;

      }
    }
  }
  .fourth_ul{
    background:#fff;
    width:94%;
    margin:0 auto;
    margin-bottom:4rem;
    padding:0 0.5rem;
    li{
      padding:0.7rem 0;
      display:flex;
      border-bottom:1px solid #eee;
      .div_left{
        flex:.9;
        font-size:0.7rem;
        span{
          font-size:0.6rem;
          border-radius:5px;
          padding:0.2rem;
          border:1px solid #ff9002;
          color:#ff9002;
        }
        p{
          color:#e52920;
          font-size:0.8rem;
          padding:0.5rem 0  0.5rem 0.5rem;
          i{
            font-size:0.5rem;
            font-style:normal;
          }
        }
        .p{
          font-size:0.5rem;
          padding:0;
          color:#999;
        }
      }
      .div_right{
        flex:2;
        font-size:0.7rem;
        border-left: 1px solid #eee;
        padding-left: 0.5rem;
        .div_right_footer{
          padding:0.5rem 0 0;
          display:flex;
          div.footer_div1{
            flex:1;
            font-size:0.7rem;
            p{
              padding:0.2rem 0;
              color:#e52920;
              font-size:0.6rem;
              text-align:center;
            }
            .p{
              color:#999;
            }
          }
        }
      }
    }
  }
</style>