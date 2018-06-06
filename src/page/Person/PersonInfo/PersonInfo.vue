<template>
  <div id="personInfo">
    <mt-header fixed title="个人中心">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <div class="content">
      <div class="infoList" style="height:4rem;">
        <span>
           <img :src="baseImg" alt="" style="height:2rem;width:2rem;float:left;border-radius:50%">
           <div style="float:left;padding-left:.5rem;line-height:2rem;">{{userName}}</div>
        </span>
        <!-- <input type="file" accept="image/*"  @change="handleFile" class="hiddenInput" /> -->
      </div>
      <router-link class="infoList" tag="div" :to="item.to" v-for="(item,index) in list" :key="index">
        <!-- 修改用户名 @click="toChangeName" -->
        
        <span style="line-height:.9rem;">
          <img :src="item.imgUrl" alt="" style="float:left">
          <div style="float:left;padding-left:.5rem;">{{item.name}}</div>
          
        </span>
        <div>
          <i class="iconfont icon-iconfonti"></i>
        </div>
      </router-link>
     
     
		</div>
  </div>
</template>

<script>
 import {getPersonData,logout} from '@/services/getDetail'
import {setStore,removeStore} from '@/config/mUtils'
export default {
  data() {
    return {
      userName:'',
      baseImg:'../../src/assets/img/userAll.png',
      isSet:false,
      list:[
        {
          name:"个人资料",
          imgUrl:"./static/img/12.png",
          to:"/person/personInfo/personInfo",
        },{
          name:"账号与安全",
          imgUrl:"./static/img/15.png",
          to:"/person/personInfo/infoAndSecurity",
        },{
          name:"风险测评",
          imgUrl:"./static/img/11.png",
          to:"/person/risk/risk",
        // },{
        // //   name:"电子签名",
        // //   imgUrl:"./static/img/13.png",
        // //   to:"/person/personInfo/signature",
        // // },{
        // },{
        },{
          name:"自动投标",
          imgUrl:"./static/img/14.png",
          to:"/person/personInfo/tender",
        },
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
    logout() {
      logout().then(res => {
        removeStore('accesstoken')
        setStore('tabbarValue','home')
        this.$router.push('/home')
      })
    },
    initData() {
      getPersonData().then(res => {
        console.log(res)
        if(res.state) {
          this.userName = res.data.userPhone
          this.baseImg = res.data.userHeadPortrait?res.data.userHeadPortrait:this.baseImg
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
@mianColor:#e83737;
.content {

  overflow: hidden;
  padding: 2rem .6rem 0;
  background-color:#fff;
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
      height: .9rem;
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
  .submit {
    margin-top: 2.5rem;
    padding: 0 .6rem;
    .mint-button {
      background-color: @mianColor;
      border-radius: 1rem;
    }
  }
}
</style>