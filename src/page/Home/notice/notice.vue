<template>
  <div id="helpCenter">
    <!-- 头部 -->
    <mt-header fixed title="公告中心">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
    </mt-header>

    <!-- 日期 -->
    <div class="data_until">
      <!-- <div class="title">消息列表</div> -->
      <div class="list_content">
        <ul >
          <li v-for="(item,index) in messageList" :key="item.id" @click="newsDetail(item)">{{item.articleName}}<span>></span></li>
        </ul>
      </div> 
    </div>
  </div>
</template>

<script>
import {getNotice} from '../../../services/getDetail'
export default {
  data() {
    return {
      messageList:[],
    }
  },
  mounted(){
    var that = this;
    that.getNews()
  },
  methods:{
    getNews(){
      var that=this;
      var data={
          category:"02",
          articleType:"04",
          pageId:1,
          pageSize:10
      }
      getNotice(data).then(res => {
        console.log(res);
        that.messageList = res.data.dataList;
      })
    },
    // 点击跳转到公告详情
    newsDetail(item){
      var that = this;
      that.$router.push({
        path:'/noticeDetail',
        query:{
          articleId:item.articleId
        }
      })
      // this.$router.push({
      //   name:'noticeDetail',
      //   params:{
      //     noticeId:item.noticeId
      //   }
      // });
    },


  },
    
}
</script>

<style lang="less" scoped>
  .mint-header {
    background-color: #e83737;
  }
  .data_until{
    margin-top:2rem;
    .title{
      width:95%;
      margin:0 auto;
      font-size: 0.6rem;
      color:#999;
      padding:0.5rem 0;
    } 
    .list_content{
      background: #fff;
      ul{
        width:95%;
        margin:0 auto;
        font-size: 0.6rem;
        color:#333;
        li{
          border-bottom:1px solid #eee;
          padding:0.5rem 0;
          span{
            float:right;
            color:#999;
          }
        }
      }
    }  
  }
</style>