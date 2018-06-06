<template>
  <div id="personInfo">
    <mt-header fixed title="自动投标">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <div class="concent clearfix">
      <span>自动投标</span>
      <mt-switch v-model="value" style="float:right" @change="changeValue"></mt-switch>
    </div>
    <div class="concenter clearfix" v-if="isSet">
      <ul class="clearfix">
          <li class="clearfix">
            <span>开始时间</span>
            <i @click="chooseTime" style="font-size:.6rem;float:right;font-style:normal">{{chooseData}}</i>
          </li>
          <li class="clearfix">
            <span>结束时间</span>
            <i @click="chooseTimeData" style="font-size:.6rem;float:right;font-style:normal">{{chooseDataEnd}}</i>
            <calendar
             v-model="calendarShow1"
             :defaultDate="defaultDate"
             @change="handelChange1"
             v-if="showData1"
             >
            </calendar>
          </li>
          <li class="clearfix">
            <span>投标频率</span>
            <i @click="chooseInvest" style="font-size:.6rem;float:right;font-style:normal">{{investRest}}</i>
          </li>
          <li class="clearfix">
            <span>项目类型</span>
            <i @click="popupVisible4 = true" style="font-size:.6rem;float:right;font-style:normal">{{projectName}}</i>
          </li>
          <li class="clearfix">
            <span>项目期限</span>
            <div style="float:right;width:50%;display:flex;height:100%;">
                <i @click="popupVisible1 = true" style="font-size:.6rem;font-style:normal;flex:1;float:left:padding:0 0.25rem;text-align:center;background:#eeeeee;color:#999">{{star}}</i>
                <i style="float:right;flex:.3;line-height:.5rem;text-align:center;">-</i>
                <i @click="popupVisible2 = true" style="font-size:.6rem;font-style:normal;flex:1;float:left;padding:0 0.25rem;text-align:center;background:#eeeeee;color:#999">{{end}}</i>            
            </div>
            
          </li>
          <li class="clearfix">
            <span>使用优惠券</span>
            <i @click="popupVisible3 = true" style="font-size:.6rem;float:right;font-style:normal">{{popur}}</i>
          </li>
      </ul>
    </div>
    <div class="momey clearfix" v-if="isSet">
      <span>投标金额</span>

      <input  type="number" v-model="data.investAmt" placeholder="请输入投标金额" />
    </div>
    <div class='sureButton' v-if="isSet" @click="sure">
      确认
    </div>
    <!-- 投标频率 -->
    <mt-popup
      v-model="popupVisible"
      position="bottom"
      style="width:80%"
      >
      <ul>
        <li v-for="item in investRateList" @click="chooseInvestRate(item)" style="font-size:.6rem;padding:0.25rem 0;text-align:center;border-bottom:1px solid #eee;">{{item.name}}</li>
      </ul>
    </mt-popup>
    <!-- 项目期限 -->
     <mt-popup
      v-model="popupVisible1"
      position="bottom"
      style="width:80%;height:6rem;overflow-y:auto;">
      <ul>
        <li v-for="item in projectTime" @click="chooseProjectTime(item)" style="font-size:.6rem;padding:0.25rem 0;text-align:center;border-bottom:1px solid #eee;">{{item.name}}</li>
      </ul>
    </mt-popup>
    <mt-popup
      v-model="popupVisible2"
      position="bottom"
      style="width:80%;height:6rem;overflow-y:auto;">
      <ul>
        <li v-for="item in projectTime" @click="chooseTimePro(item)" style="font-size:.6rem;padding:0.25rem 0;text-align:center;border-bottom:1px solid #eee;">{{item.name}}</li>
      </ul>
    </mt-popup>
    <!-- 选择优惠券 -->
    <mt-popup
      v-model="popupVisible3"
      position="bottom"
      style="width:80%"
      >
      <ul>
        <li v-for="item in popurlist" @click="choosePopur(item)" style="font-size:.6rem;padding:0.25rem 0;text-align:center;border-bottom:1px solid #eee;">{{item.name}}</li>
      </ul>
    </mt-popup>
    <!-- 项目类型 -->
    <mt-popup
      v-model="popupVisible4"
      position="bottom"
      style="width:80%"
      >
      <ul>
        <li v-for="item in projectList" @click="choosePro(item)" style="font-size:.6rem;padding:0.25rem 0;text-align:center;border-bottom:1px solid #eee;">{{item.projectName}}</li>
      </ul>
    </mt-popup>
  </div>
</template>

<script>
import {getPersonData,showInfo,paramsSet} from '@/services/getDetail'
import {setStore,removeStore,getStore,format} from '@/config/mUtils'
export default {
  data() {
    return {
      userName:'',
      baseImg:'../../src/assets/img/userAll.png',
      isSet:false,
      value:false,
      showData:false,
      calendarShow:"",
      star:"起始区间",
      end:"结束区间",
      defaultDate:new Date(),
      chooseData:"选择开始日期",
      calendarShow1:"",
      chooseDataEnd:"选择结束日期",
      investRest:"选择投标频率",
      popur:"不使用优惠券",
      projectName:"请选择项目类型",
      showData1:false,
      popupVisible:false,
      popupVisible1:false,
      popupVisible2:false,
      popupVisible3:false,
      popupVisible4:false,

      data:{
        autoInvestId:"",
        enableStatus:"01",
        expireTimeBegin:"",
        expireTimeEnd:"",
        investRate:"",
        projectType:"",
        projectCycleBegin:null,
        projectCycleEnd:null,
        investAmt:null,
        userCoupon:"01",
      },
      datal:{},
      investRateList:[
        {name:"每天投标一次",type:"01"},
        {name:"每个项目每天投标一次",type:"02"},
      ],
      projectTime:[
        {name:"1个月"},{name:"2个月"},{name:"3个月"},{name:"4个月"},{name:"5个月"},{name:"6个月"},{name:"7个月"},{name:"8个月"},{name:"9个月"},{name:"10个月"},{name:"11个月"},{name:"12个月"}
      ],
      popurlist:[
        {name:"优先使用收益最高优惠券",type:"02"},{name:"优先使用有效期最短优惠券",type:"03"},
      ],
      projectList:[
        {projectName:"全部",projectType:"01"},{projectName:"直投项目",projectType:"02"},{projectName:"债权转让",projectType:"03"}
      ]
    }
  },
  methods:{
    goback() {
      this.$router.go(-1)
    },
    toChangeName() {
      this.$router.push('/person/personInfo/changeName')
    },
    handelChange(data,formatDate){
      console.log(data)
      if(data.getTime() < this.defaultDate.getTime()){
        this.$toast("请选择当前日期之后的时间")
        this.showData = false;
        return
      }
      this.showData = false;
      console.log(formatDate)
      this.chooseData = formatDate;
    },
    handelChange1(data,formatDate){
      if(data.getTime() < this.defaultDate.getTime()){
        this.$toast("请选择当前日期之后的时间")
        this.showData1 = false;
        return
      }
      this.showData1 = false;
      this.chooseDataEnd = formatDate;
      this.data.expireTimeEnd = formatDate;
      //this.expireTimeEnd
    },
    chooseTime(){
      this.showData = true;
      console.log(this.showData)
    },
    chooseTimeData(){
      this.showData1 = true;
      console.log(this.showData1)
    },
    changeValue(){
      console.log(this.value)
      if(this.value){
        this.isSet = true;
        this.data.enableStatus = "01"
        setStore('isSet',true)
      }else{
        this.isSet = false;
        removeStore('isSet')
        //console.log(this.datal)
        this.datal.enableStatus="02";
        this.datal.autoInvestId =  this.datal.id
        console.log(this.datal)
        paramsSet(this.data).then(res=>{
          console.log(res)
        })

      }
    },

    chooseInvest(){
      this.popupVisible = true;
    },
    chooseInvestRate(item){
      this.data.investRate = item.type
      this.popupVisible = false;
      this.investRest=item.name;
    },
    chooseProjectTime(item){
      this.popupVisible1 = false;
      this.star=item.name
      this.data.projectCycleBegin = item.name.substring(0,1)
    },
    chooseTimePro(item){
      this.popupVisible2 = false;
      this.end=item.name
      this.data.projectCycleEnd = item.name.substring(0,1)
    },
    choosePopur(item){
      this.popupVisible3 = false;
      this.popur = item.name;
      this.data.userCoupon = item.type;
    },
    initData() {
      showInfo().then(res => {
        console.log(res) 
        if(res.state){
          if(res.data.enableStatus == "01"){
              this.value = true;
              this.isSet = true;
              this.data.autoInvestId = res.data.id
              this.datal = res.data
              console.log(res.data.expireTimeBegin)
              this.chooseData = res.data.expireTimeBegin.substring(0,10);
              this.data.enableStatus = res.data.enableStatus;
              this.data.expireTimeBegin = res.data.expireTimeBegin.substring(0,10);
              // this.data.expireTimeBegin
              this.chooseDataEnd = res.data.expireTimeEnd.substring(0,10)
              this.data.expireTimeEnd = res.data.expireTimeEnd.substring(0,10)
              this.data.investRate = res.data.investRate;
              this.data.projectType = res.data.projectType
              this.data.projectCycleBegin = res.data.projectCycleBegin
              this.data.projectCycleEnd = res.data.projectCycleEnd
              this.data.investAmt = res.data.investAmt;
              this.data.userCoupon = res.data.userCoupon
              if(res.data.investRate == "01"){
                this.investRest='每天投标一次'
              }else{
                this.investRest = "每个项目每天投标一次"
              }
              if(res.data.userCoupon == "02"){
                this.popur = '优先使用收益最高优惠券'
              }else if(res.data.userCoupon == "02"){
                this.popur = '优先使用有效期最短优惠券'
              }
              if(res.data.projectType == "01"){
                this.projectName = "全部"
              }else if(res.data.projectType=="02"){
                this.projectName = "直投项目"
              }else {
                this.projectName = "债权转让"
              }
              this.star = res.data.projectCycleBegin +'个月'
              this.end = res.data.projectCycleEnd + '个月'
              this.data.investAmt=res.data.investAmt
          }else{
            this.chooseData = this.dateFormat(new Date(),'Y-m-d')
          }
         
        }
        
      })
    },
    dateFormat(timestamp, formats) {
        // formats格式包括
        // 1. Y-m-d
        // 2. Y-m-d H:i:s
        // 3. Y年m月d日
        // 4. Y年m月d日 H时i分
        formats = formats || 'Y-m-d';
          var zero = function (value) {
            if (value < 10) {
               return '0' + value;
            }
            return value;
        };
        var myDate = timestamp? new Date(timestamp): new Date();
        var year = myDate.getFullYear();
        var month = zero(myDate.getMonth() + 1);
        var day = zero(myDate.getDate());
        var hour = zero(myDate.getHours());
        var minite = zero(myDate.getMinutes());
        var second = zero(myDate.getSeconds());
        return formats.replace(/Y|m|d|H|i|s/ig, function (matches) {
          return ({
             Y: year,
             m: month,
             d: day,
             H: hour,
             i: minite,
             s: second
          })[matches];
        });
    },
    choosePro(item){
      this.projectName = item.projectName;
      this.data.projectType = item.projectType;
      this.popupVisible4=false;
    },
    sure(){
      console.log(this.data)
      this.data.expireTimeBegin = this.chooseData;
      //this.data.expireTimeEnd = this.chooseDataEnd;
      if(this.data.expireTimeEnd==""){
        this.$toast("请选择结束时间")
        return
      } 
      if(this.data.investRate == ""){
        this.$toast("强选择投标频率")
        return ;
      }
      if(this.data.projectType == ""){
        this.$toast("请选择投标项目类型")
        return ;
      }
      if(this.data.projectCycleBegin == null){
        this.$toast("请输入项目期限的开始区间")
        return ;
      }
      if(this.data.projectCycleEnd == null){
        this.$toast("请输入项目期限的结束区间")
        return ;
      }
      if(this.data.investAmt == null){
        this.$toast("请输入投标金额")
        return ;
      }
      paramsSet(this.data).then(res=>{
        console.log(res)
      })
      // this.data.investRate 
    }
  },
  mounted() {
    this.initData()
    if(getStore('isSet')){
      this.isSet = true;
      this.value = true;
    }
    

  }
}
</script>

<style lang="less" scoped>
.clearfix:after{ display: block; clear: both; content: "\0020"; visibility: hidden; height: 0 }
@mianColor:#e83737;
.concent{
  margin-top:2rem;
  padding:.7rem 3%;
  background:#fff;
  span{
    float:left;
    font-size:.7rem;
  }  
}
.el-date-editor.el-input.el-date-editor--date{
  input{
    font-size:.6rem;
  }
}
.concenter{
  background:#fff;
  padding:0 3%;
  margin-top:.2rem;
  ul{
    li{
      padding:0.5rem 0;
      border-bottom:1px solid #eee;
      span{
        float:left;
        font-size:.6rem;
      }
    }
  }
}
.momey{
  padding:0.5rem 3%;
  margin-top:.2rem;
  background:#fff;
  span{
    float:left;
    font-size:.6rem;
  }
  input{
    float:left;
    border:0;
    width:40%;
    font-size:.6rem;
    color:#e52920;
    padding-left:.5rem;
  }
}
.sureButton{
  width:80%;
  margin:0 auto;
  height:1.8rem;
  line-height:1.8rem;
  text-align:center;
  color:#fff;
  background:#e52920;
  font-size:.7rem;
  margin-top:1rem;
  border-radius:5px;
}
</style>