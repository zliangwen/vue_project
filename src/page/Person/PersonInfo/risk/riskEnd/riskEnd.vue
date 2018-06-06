<template>
  <div id="personInfo" style="height:100%">
    <mt-header fixed title="风险测评" style="background:#fe6447;">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <div class="concent clearfix">
      <div class="center">
        <div class="headImg">
          <img :src="info.headPortrait" />
        </div>
        <p>{{info.userName}}</p>
        <div class="type">
            {{info.result}}

        </div>
        <p style="color:#999999">{{info.resultDetail}}</p>
        <div class="sure" @click="sure">重新评测</div>
      </div>
      
    </div>
    
  </div>
</template>

<script>
import {getPersonData,logout} from '@/services/getDetail'
import {setStore,getStore,removeStore} from '@/config/mUtils'
export default {
  data() {
    return {
      userName:'',
      baseImg:'',
      isSet:false,
      value:false,
      info:{}    
    }
  },
  methods:{
    goback() {
      this.$router.go(-1)
    },
    initData(){
      if(getStore('data')){
        this.info = JSON.parse(getStore('data'))
      }
      console.log(this.info)
    },
    sure(){
      this.$router.go(-1)
    }
   
  },
  mounted() {
    this.initData()
  }
}
</script>

<style lang="less" scoped>
.clearfix:after{ display: block; clear: both; content: "\0020"; visibility: hidden; height: 0 }
@mianColor:#e83737;
.concent{
  padding:0 3%;
  background:#fe6447;
  height:100%;
  overflow:hidden;
 .center{
  width:80%;
  margin:35% auto;
  background:url(../../../../../../static/img/bigbox.png) no-repeat;
  background-size:100%;
  padding:1rem 0;
  .headImg{
    width:3rem;
    height:3rem;
    border-radius:50%;
    margin:0 auto;
    img{
      border-radius:50%;
    }
  }
  p{
    text-align:center;
    font-size:.7rem;
    padding:0.25rem 0;
  }
  .type{
      padding:2rem 0 .5rem;
      text-align:center;
      color:#e52920;
  }

 }

 .sure{
  width:80%;
  height:2rem;
  text-align:center;
  line-height:2rem;
  color:#fff;
  font-size:.7rem;
  background:#e52920;
  margin:1rem auto;
 } 
}
</style>