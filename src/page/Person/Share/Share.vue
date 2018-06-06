<template>
  <div id="share">
    <mt-header>
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <div class="content">
     <div class="banner">
       <img src="../../../../static/img/shareBanner.png"/>
     </div>
     <div class="one">
       <img src="../../../../static/img/one.png"/>
     </div>
     <div class="one">
       <img src="../../../../static/img/two.png"/>
     </div>
     <div class="one">
       <img src="../../../../static/img/three.png"/>
     </div>
     <div class="one">
       <img src="../../../../static/img/playRole.png"/>
     </div>
     <div class="one">
       <img src="../../../../static/img/role.png"/>
     </div>
     <div class="one share-btn" @click="share" :data-clipboard-text="shareSrc">
        <img src="../../../../static/img/sureGoodF.png"/>
     </div>
    </div>
  </div>
</template>

<script>
import {getShareMsg} from '@/services/getDetail'
import Clipboard from 'clipboard';
export default {
  data() {
    return {
      imgUrl:'',
      shareSrc:''
    }
  },
  methods:{
    goback() {
      this.$router.go(-1)
    },
    share() {
      console.log(1111)
      var clipboard = new Clipboard('.share-btn')  
      clipboard.on('success', e => {  
        this.$toast('复制成功')
        // 释放内存  
        clipboard.destroy()  
      })  
      clipboard.on('error', e => {  
        // 不支持复制  
        this.$toast('该浏览器不支持自动复制')  
        // 释放内存   
        clipboard.destroy()  
      })
    },
    initData() {
      getShareMsg().then(res => {
        console.log(res)
        if(res.state) {
          //this.imgUrl = 'data:image/png;base64,'+res.data.image
          this.shareSrc = res.data.appContent
        }else {
          this.$toast(res.msg)
        }
      })
    }
  },
  mounted() {
    this.initData()
  }
}
</script>

<style lang="less" scoped>
#share {
  background:#fe4122;
  padding-bottom:2rem;
  .mint-header {
    background-color: transparent;
  }
 .content{
  .banner{
    margin-top:-2rem;
  }
  .one{
    padding:.5rem 5%;
  }
 }
}
</style>