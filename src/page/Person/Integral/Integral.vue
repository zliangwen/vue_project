<template>
  <div class="integral">
    <div class="header">
      <mt-header title="实名认证">
        <i @click="goback" slot="left" class="iconfont icon-back"></i>
      </mt-header>
      
    </div>
    
    <div class="content">
      <div class="list">
          <ul class="clearfix">
              <li>
                <span class="left">真实姓名</span> 
                <div class="right">
                    <input type="text" placeholder="请输入真实姓名" v-model="title" v-if="showButton == 1"/>
                    <input type="text" placeholder="请输入真实姓名" readonly v-model="title" v-if="showButton != 1"/>
                </div>
              </li>
              <li>
                <span class="left">身份证号</span> 
                <div class="right">
                  <input type="text" placeholder="请输入身份证号" v-model="idCard" v-if="showButton == 1"/>
                  <input type="text" placeholder="请输入真实姓名" readonly v-model="idCard" v-if="showButton != 1"/>
                </div>
              </li>
          </ul>
          <div class="more clearfix">
            <h4>附件上传</h4>
            <div class="img clearfix">
              <div class="img_left" @click="upFile(1)" style="height:7rem">
                <img :src="img_left" style="height:5rem" />
                <p>请上传身份证正面照</p>
                <input type="file" accept="image/*" style="opacity:0;" class="InputUpload" @change="changeInput($event,1)">
              </div>
              <div class="img_right" @click="upFile(2)" style="height:7rem">
                <img :src="img_right" style="height:5rem"/>
                <p>请上传身份证反面照</p>
                <input type="file" accept="image/*" style="opacity:0;" class="InputUpload1" @change="changeInput($event,2)">
              </div>
              <div class="img_right" @click="upFile(3)" style="height:7rem">
                <img :src="img_heard" style="height:5rem"/>
                <p>请上传身份证手持照</p>
                <input type="file" accept="image/*" style="opacity:0;" class="InputUpload2" @change="changeInput($event,3)">
              </div>
            </div>
          </div>
      </div>
      <button class="button" @click="isReName" v-if="showButton == 1">确认</button>
      <button class="button" v-if="showButton == 2">正在审核中</button>
      <button class="button" v-if="showButton == 3">审核通过</button>


		</div>
    
  </div>
</template>

<script>
import {isReName,upload,updateHeadPortrait,getRealName} from '@/services/getDetail'
export default {
  data() {
    return {
     title:"",
     idCard:"",
     img_left:"../../../../static/img/idCardTrue.png",
     img_right:"../../../../static/img/idCardFalse.png",
     img_heard:"../../../../static/img/shenfenzheng.png",
     img_1:"",
     img_2:"",
     img_3:"",
     showButton:1,
    }
  },
  methods:{
    goback() {
      this.$router.go(-1)
    },
   upFile(type){
    if(this.showButton == 2){

    }else{
        if(type == 1){
          this.$el.querySelector('.InputUpload').click()
        }else if(type == 2){
          this.$el.querySelector('.InputUpload1').click()
        }else{
          this.$el.querySelector('.InputUpload2').click()
        }
    }
    
    
   },
   initData(){
    getRealName().then(res =>{
      console.log(res)
      if(res.state){
        this.title = res.data.realName;
        this.idCard = res.data.identityCard;
        if(res.data.imageFrontUrl==""){
          this.img_left=this.img_left
        }else{
          this.img_left =res.data.imageFrontUrl;
        }
        //
        if(res.data.imageBackUrl==""){
          this.img_right = this.img_right
        }else{
          this.img_right=res.data.imageBackUrl;
        }
        if(res.data.imageHandUrl==""){
          this.img_heard = this.img_heard
        }else{
          this.img_heard=res.data.imageHandUrl;
        }
        
        
        if(res.data.checkStatus == "01"){
          this.showButton = 2;
        }else if(res.data.checkStatus == "02"){
          this.showButton = 3;
        }
      }
    })
   },
   changeInput(e,index){
      let $target = e.target || e.srcElement
      let file = $target.files[0]
      this.photoCompress(file,350,200,index)
   },
   photoCompress(file,w,h,index){
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

         this.canvasDataURL(re,w,h,index) 

      }
      ready.readAsDataURL(file);
    },
    canvasDataURL(re,w,h,index){
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
            canvas.height=h;
            var ctx=canvas.getContext("2d");
            ctx.clearRect(0,0,w,h);
            if(imgWidth>imgHeight){
                imgWidth=w*imgWidth/imgHeight;
                imgHeight=h;
                offsetX=-Math.round((imgWidth-w)/2);
            }else{
                imgHeight=w*imgHeight/imgWidth;
                imgWidth=w;
                offsetY=-Math.round((imgHeight-w)/2);
            }
            ctx.drawImage(img,offsetX,offsetY,imgWidth,imgHeight);
            var base64=canvas.toDataURL("image/jpeg",0.7);
            console.log(base64)
            if(index == 1){
              that.img_left = base64;
             }else if(index == 2){
              that.img_right = base64;
             }else{
              that.img_heard = base64
             }
            that.saveImg(base64,index)
        }
        
    },

   saveImg (dataUrl,index) {
    console.log(dataUrl)
    console.log(index)
      var data = {
        file:dataUrl
      }
      upload(data).then(res=>{
        console.log(res)
        if(res.state){
          this.$indicator.close()
          if(index == 1){
            console.log(111)
           // this.netUrl = res.data.netUrl
           
           this.img_1 =  res.data.netUrl
           console.log(this.img_1)
          }else if(index == 2){
            this.img_2 =  res.data.netUrl
          }else{
            this.img_3 =  res.data.netUrl
          }
          //this.netUrl = res.data.netUrl
        }
      })
    },
  isReName(){
      var data={
        realName:this.title,
        identityCard:this.idCard,
        imageFrontId:this.img_1,
        imageBackId:this.img_2,
        imageHandId:this.img_3
      }
      var isName=/^[\u4e00-\u9fa5]{2,7}$/;
      var idCard=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if(!isName.test(data.realName)){
        this.$toast("请输入中文名字")
        return;
      }
      if(!idCard.test(data.identityCard)){
        this.$toast('请输入正确的身份证号码')
        return;
      }
      if(data.imageFrontId==""){
        this.$toast('请上传身份证正面照')
        return;
      }
      if(data.imageBackId==""){
        this.$toast('请上传身份证反面照')
        return;
      }
      if(data.imageHandId==""){
        this.$toast('请上传身份证手持照')
        return;
      }
      console.log(data)
      isReName(data).then(res => {
        console.log(res)
        if(res.state){
          this.showButton = 2
        }
      })
    }
  },
  mounted() {
    this.initData()
  },
  filters: {
  }
}
</script>

<style lang="less" scoped>
.clearfix:after{ display: block; clear: both; content: "\0020"; visibility: hidden; height: 0 }
.header {
  position: fixed;
  width: 100%;
  background: url("../../../assets/img/integral-bj@2x.png") no-repeat;
  background-size: 100% 100%;
  .mint-header {
   
  }
  .toExchange {
    font-size: .7rem;
  }
}

.content {
  overflow: hidden;
  padding-top:2rem;
  .list {
    background-color:#fff;
    ul{
      li{
        display:flex;
        height:2rem;
        line-height:2rem;
        padding-left:3%;
        border-bottom:1px solid #eee;
        span.left{

          flex:0.6;
          font-size:0.6rem;
          
        }
        div.right{
          flex:2;
          input{
            border:none;
            font-size:0.6rem;
            width:100%;
          }
        }
      }
    }
    .more{
      background:#fff;
      h4{
        font-size:0.6rem;
        padding:0.5rem 3%;
      }
      div.img{
        padding:3%;
        div{
          padding:0.7rem 0.7rem 0.7rem;
          border:1px dashed #eee;
          font-size:0.6rem;
          text-align:center;
          margin:0 0.5rem 0.5rem; 
          p{
            color:#999;
            font-size:.5rem;
          }
        }
       
      }
    }
  }
   
}
.button{
  width:80%;
  background:#e83737;
  border:none;
  padding:0.5rem 0;
  margin-left:10%;
  color:#fff;
  margin-top:2rem;
  margin-bottom:1rem;
  border-radius:5px;
  font-size:.7rem;
}
</style>

