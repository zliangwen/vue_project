<template>
  <div id="personInfo">
    <mt-header fixed title="个人信息">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <ul class="content">
      <li class="infoList" @click="uploadHeadImg">
        <span>头像</span>
        <div style="position:relative">
          <img :src="headerImage" alt="" style="width:1.8rem;height:1.8rem;border-radius:50%">
          <i class="iconfont icon-right"></i>
        </div>
       <input type="file" accept="image/*"  @change="handleFile" class="hiddenInput" style="opacity:0;position:absolute;top:0;left:0;" />
      </li>
      <li class="infoList"  @click="conform(1)">

        <span>昵称</span>
        <div>
          <span>{{names}}</span>
          <i class="iconfont icon-iconfonti"></i>
        </div>
      </li>
      <li class="infoList"  @click="conform(2)">

        <span>电子邮箱</span>
        <div>
          <span>{{Email}}</span>
          <i class="iconfont icon-iconfonti"></i>
        </div>
      </li>
      <li class="infoList"  @click="conform(3)">
        <span>性别</span>
        <div>
          <span>{{sex}}</span>
          <i class="iconfont icon-iconfonti"></i>
        </div>
      </li>
      <li class="infoList"  @click="conform(4)">
        <span>生日</span>
        <div>
          <span>{{bor | substring}}</span>
          <i class="iconfont icon-iconfonti"></i>
        </div>
      </li>
      <li class="infoList"  @click="conform(5)">
        <span>学历</span>
        <div>
          <span>{{hignschool}}</span>
          <i class="iconfont icon-iconfonti"></i>
        </div>
      </li>
      <!-- <li class="infoList"  @click="conform(6)">
        <span>月收入</span>
        <div>
          <span>{{money}}</span>
          <i class="iconfont icon-iconfonti"></i>
        </div>
      </li>
      <li class="infoList"  @click="conform(7)">
        <span>职业</span>
        <div>
          <span>{{job}}</span>
          <i class="iconfont icon-iconfonti"></i>
        </div>
      </li> -->
      <li class="infoList"  @click="conform(8)">
        <!-- 修改用户名 @click="toChangeName" -->
        <span>户籍地</span>
        <div>
          <!-- <span>{{addressId}}</span> -->
          <m-Address :container-height="7" v-on:selectdata="selectdata" class="item" :inertia="inertia" :speed="speed" :addressId="addressId" ></m-Address>
          <i class="iconfont icon-iconfonti"></i>

        </div>
      </li>
      <li class="infoList"  @click="conform(9)">
        <!-- 修改用户名 @click="toChangeName" -->
        <span>现居地</span>
        <div>
          <!-- <span>{{addressone}}</span> -->
           <m-Address :container-height="7" v-on:selectdata="select" class="item" :inertia="inertia" :speed="speed" :addressId="addressone" ></m-Address>
          <i class="iconfont icon-iconfonti"></i>
        </div>
      </li>
      <li class="infoList"  @click="conform(10)">
        <span>详细地址</span>
        <div>
          <span>{{address}}</span>
          <i class="iconfont icon-iconfonti"></i>
        </div>
      </li>
      <!-- <div class="infoList" v-if="!isSet" @click="toSetPayPsd">
        <span>设置交易密码</span>
        <i class="iconfont icon-right"></i>
      </div>
      <div class="infoList" v-if="isSet" @click="toChangePayPsd">
        <span>修改交易密码</span>
        <i class="iconfont icon-right"></i>
      </div> -->
     
		</ul>
    <!-- 性别 -->
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <ul >
        <li v-for="(item,index) in sexList" @click="chooseSex(item)">{{item.name}}</li>
      </ul>
    </mt-popup>
    <!-- 学历 -->
    <mt-popup
      v-model="popupVisible1"
      position="bottom">
      <ul >
        <li v-for="(item,index) in recordList" @click="chooseRecord(item)">{{item.dictName}}</li>
      </ul>
    </mt-popup>
    <!-- 月收入 -->
    <mt-popup
      v-model="popupVisible2"
      position="bottom">
      <ul >
        <li v-for="(item,index) in moneyList" @click="chooseMoney(item)">{{item.name}}</li>
      </ul>
    </mt-popup>
    <!-- 职业 -->
    <mt-popup
      v-model="popupVisible3"
      position="bottom">
      <ul >
        <li v-for="(item,index) in jobList" @click="chooseJob(item)">{{item.name}}</li>
      </ul>
    </mt-popup>
    <mt-datetime-picker
      ref="picker"
      v-model="pickerVisible"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="confirm"
      :startDate="startDate"
      :endDate="endDate"
      style="width:100%"
      >
    </mt-datetime-picker>
    <!-- <mt-picker :slots="myAddressSlots" @change="onValuesChange"></mt-picker> -->
    
  </div>
</template>

<script>
import {getPersonDetails,logout,upDateInfo,upload,updateHeadPortrait,getAllAreaList} from '@/services/getDetail'
import {setStore,removeStore,format} from '@/config/mUtils'
import mCropper from "@/components/cropper"
import mAddress from "@/components/address"
window.baseImg ="../../src/assets/img/userAll.png"
export default {
  
  data() {
    return {
      startDate:new Date('1980'),
      endDate:new Date(),
      pickerVisible:"",
      userName:'', 
      inertia:30,
      speed:12,
      showAddress:false,
      //baseImg, 
      headerImage:'../../src/assets/img/userAll.png',    
      isSet:false,
      popupVisible:false,
      popupVisible1:false,
      popupVisible2:false,
      popupVisible3:false,
      addressShow:true,
      dictType:"",
      list:[],
      tabs:0,
      sexList:[
        {name:"男",type:"01"},
        {name:"女",type:"02"}
      ],
      recordList:[
        {name:"无"},{name:"小学以下"},{name:"小学到初中"},{name:"高中"},{name:"大专"},{name:"本科"},{name:"硕士"},{name:"博士"},{name:"博士后"}
      ],
      moneyList:[
        {name:"2000以下"},{name:"1000-3000"},{name:"3000-5000"},{name:"5000-7000"},{name:"7000-9000"},{name:"9000-12000"},{name:"12000-15000"},{name:"15000以上"}
      ],
      jobList:[
        {name:"企业主"},{name:"个体户"},{name:"上班族"},{name:"无固定职业"},
      ],
      names:"",//昵称
      Email:"",//Email
      sex:"",//性别
      bor:"",//生日
      hignschool:"",//学历
      money:"",//月收入
      job:"",//职业
      addressId:"选择地址",//户籍地
      addressone:"选择地址",//现居地
      address:"",//详细地址
      userMarry:"",//婚姻状况
      sexType:'01',
      myAddress:[],
      oldHouseProvince:"",//户籍地省
      oldHouseCity:"",//户籍地市
      oldHouseContry:"",//户籍地县
      nowHouseProvince:"",//现居住地省
      nowHouseCity:"",//现居住地市
      nowHouseContry:"",//现居住地县
      
    }
  },
  methods:{
    getAllAreaList(){
      getAllAreaList().then(res => {
        console.log(res)
        if(res.state){
          this.myAddress= res.data
          //console.log(this.myAddress)
        }

      })
    },
    goback() {
      this.$router.go(-1)
    },
           
    openPicker() {
      this.$refs.picker.open();
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
    confirm(value){
      this.bor = this.dateFormat(value,'Y-m-d')
      this.upDateInfo()
    }, 
    toChangeName() {
      this.$router.push('/person/personInfo/changeName')
    },
    uploadHeadImg () {
      document.querySelector('.hiddenInput').click()
    },
     handleFile (e) {
      let $target = e.target || e.srcElement
      let file = $target.files[0]
      this.photoCompress(file,50)
      
    },
    photoCompress(file,w){
      this.$indicator.open({
        text: '上传中...',
        spinnerType: 'fading-circle'
      });
      var that = this;
      var ready=new FileReader();     
      ready.onload = (data) => {
        //console.log(data)
        let res = data.target || data.srcElement
        console.log(res)
         var re = res.result  
         this.canvasDataURL(re,w)                 
      }
      ready.readAsDataURL(file);
    },
    canvasDataURL(re,w){       
        var that = this;
        var newImg=new Image();
        newImg.src=re;
        var imgWidth,imgHeight,offsetX=0,offsetY=0;
        newImg.onload=function(){
            var img=document.createElement("img");
            img.src=newImg.src;
            imgWidth=img.width;
            imgHeight=img.height;
            var canvas=document.createElement("canvas");
            canvas.width=w;
            canvas.height=w;
            var ctx=canvas.getContext("2d");
            ctx.clearRect(0,0,w,w);
            if(imgWidth>imgHeight){
                imgWidth=w*imgWidth/imgHeight;
                imgHeight=w;
                offsetX=-Math.round((imgWidth-w)/2);
            }else{
                imgHeight=w*imgHeight/imgWidth;
                imgWidth=w;
                offsetY=-Math.round((imgHeight-w)/2);
            }
            ctx.drawImage(img,offsetX,offsetY,imgWidth,imgHeight);
            var base64=canvas.toDataURL("image/jpeg",0.7);
            console.log(base64)
            
            that.saveImg(base64)
        }
        
    },
    saveImg(dataUrl){
      var data = {
        file:dataUrl
      }
      upload(data).then(res=>{
        console.log(res)
        if(res.state){
          this.headerImage = res.data.netUrl
          updateHeadPortrait(this.headerImage).then(res=>{
            if(res.state){
              this.$indicator.close()
              this.$toast("上传成功")
            }else{
              this.$indicator.close()
              this.$toast("上传失败")
            }
          })
        }
      })
    },
    logout() {
      logout().then(res => {
        removeStore('accesstoken')
        setStore('tabbarValue','home')
        this.$router.push('/home')
      })
    },
    
    initData() {
      getPersonDetails().then(res => {
        console.log(res)
        if(res.state) {
          this.userName = res.data.userNickName
          this.recordList = res.data.educationlist
          this.names = res.data.userNickName
          this.Email = res.data.userEmail
          if(res.data.userHeadPortrait != ""){
            this.headerImage = res.data.userHeadPortrait
          }
          if(res.data.oldHouseProvince !=""){
            this.addressId = res.data.oldHouseProvince + res.data.oldHouseCity+res.data.oldHouseContry
          }
          if(res.data.nowHouseProvince != ""){
            this.addressone = res.data.nowHouseProvince+res.data.nowHouseCity + res.data.nowHouseContry
          }
          
          this.address = res.data.userAddress
          if(res.data.userSex == '01'){
            this.sex = '男'
          }else{
            this.sex='女'
          }
          
          this.bor = res.data.userBirth
          this.hignschool = res.data.userEducationName.dictName

          this.money = res.data.userIncome
          this.job = res.data.userProfession
          // this.addressId = res.data.
          // this.addressone = res.data.
          // this.address = res.data.
          this.userMarry = res.data.userMarry
          this.baseImg = res.data.userHeadPortrait?res.data.userHeadPortrait:this.baseImg
        }else {
          this.$toast(res.msg)
        }
      })
    },
    upDateInfo(){
      var data = {
        userNickName:this.names,
        userEmail:this.Email,
        userSex:this.sexType,
        userBirth:this.bor,
        userEducation:this.dictType,
        userIncome:this.money,
        userProfession:this.job,
        oldHouseProvince:this.oldHouseProvince,
        oldHouseCity:this.oldHouseCity,
        oldHouseContry:this.oldHouseContry,
        nowHouseProvince:this.nowHouseProvince,
        nowHouseCity:this.nowHouseCity,
        nowHouseContry:this.nowHouseContry,
        userAddress:this.address,
        userMarry:this.userMarry
      }
      console.log(data)
      upDateInfo(data).then(res => {
        console.log(res)
      })
    },
    conform(type){
      if(type == "1"){
        this.$messagebox.prompt('请输入昵称').then(({value,action})=>{
          console.log(value)
          this.names = value
          this.upDateInfo()
        }).catch(()=>{

        })
      }else if(type=="2"){
        var e = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        this.$messagebox.prompt('请输入邮箱').then(({value,action})=>{
          console.log(value)
          if(!(e.test(value))){
            this.$toast("邮箱格式不正确")
          }else{
            this.Email = value
            this.upDateInfo()
          }
          
        }).catch(()=>{

        })
      }else if(type=="3"){
        //this.list = this.sexList
        this.popupVisible = true
        
      }else if(type== "4"){
        this.openPicker()
      }else if(type== "5"){
        //this.list = this.recordList;
        this.popupVisible1 = true;
      }else if(type== "6"){
        this.popupVisible2 = true;
      }else if(type== "7"){
        this.popupVisible3 = true;
      }else if(type== "8"){
        this.showAddress = true;
      }else if(type== "9"){
        
      }else if(type== "10"){
        this.$messagebox.prompt('请输入详细地址').then(({value,action})=>{
          console.log(value)
          this.address = value
          this.upDateInfo()
        }).catch(()=>{

        })
      }
    },
    chooseSex(item){
      this.sex = item.name
      this.popupVisible = false
      this.sexType = item.type
      this.upDateInfo()
    },
    //选择学历
    chooseRecord(item){
      this.hignschool = item.dictName
      this.dictType = item.dictValue
      this.popupVisible1 = false
      this.upDateInfo()
    },
    chooseMoney(item){
      this.money = item.name
      this.popupVisible2 = false
    },
    chooseJob(item){
      this.job = item.name;
      this.popupVisible3 = false;
    },
    selectdata(data){
      console.log(data)
      console.log(data.data.province)
      this.addressId = "";
      this.oldHouseProvince=data.data.province.text;
      this.oldHouseCity=data.data.city.text;
      this.oldHouseContry = data.data.county.text;
      this.upDateInfo()
    },
    select(data){
      console.log(data)
      this.nowHouseProvince=data.data.province.text;
      this.nowHouseCity=data.data.city.text;
      this.nowHouseContry = data.data.county.text;
      this.upDateInfo()
      
      
    }

  },
  mounted() {
    this.initData()
    this.getAllAreaList()

  },
  components:{
    mCropper,
    mAddress
  },
  filters:{
    substring(val){
      if(val != ""){
        return val.substring(0,10)
      }
    }
  }
}


</script>

<style lang="less" scoped>
@mianColor:#e83737;
.content {
  background-color:#fff;
  overflow: hidden;
  padding: 2rem .6rem 0;

  .infoList {
    height: 2rem;
    font-size: .6rem;
    color: #333;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      display: inline-block;
      height: 1.5rem;
    }
    div {
      display: flex;
      align-items: center;
    }
    i.iconfont {
      margin-left: .3rem;
      color:#999;
    }
    &:last-of-type {
      border-bottom: none;
    }
  }
  li:hth-of-type(3){
    border-bottom:.5rem solid #f4f4f4;
  }
  
}
.mint-popup-bottom{
  width:90%;
  ul{
    width:100%;
    li{
      text-align:center;
      border-bottom:1px solid #eee;
      font-size:0.7rem;
      padding:0.3rem 0;
    }
  }
}
</style>