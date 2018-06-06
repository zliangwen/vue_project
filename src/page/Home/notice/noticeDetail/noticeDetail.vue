<template>
  <div id="helpCenter">
    <!-- 头部 -->
    <mt-header fixed title="公告中心">
        <router-link to="/notice" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
    </mt-header>

    <!-- 日期 -->
    <div class="data_until">
      <div class="title">
        <p v-html="">{{newsContent.articleName}}</p>
      </div>
      <div class="list_content">
        <p v-html="newsContent.articleContent"></p>
      </div> 
      <div class="list_content">
        <p style="text-align:right">{{newsContent.createDate}}</p>
      </div> 
    </div>
  </div>
</template>

<script>
import {getDetail} from '../../../../services/getDetail'
export default {
  data() {
    return {
      newsContent:[],
    }
  },
  mounted(){
    var that = this;
    that.getDetail()
  },
  methods:{
    getDetail(){
      var that=this;
      getDetail(this.$route.query.articleId).then(res => {
        console.log(res);
        that.newsContent = res.data;
      })
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
      font-size: 0.7rem;
      background: #fff;
      p{
        width:95%;
        margin:0 auto;
        border-bottom:1px solid #eee;
        padding:0.5rem 0;
        color:#333;
        font-size:0.7rem;
        font-weight: bold;
      }
    } 
    .list_content{
      background: #fff;
      p{
        width:95%;
        margin:0 auto;
        font-size: 0.6rem;
        color:#666;
        line-height:1rem;
        padding:0.6rem 0;
      }
    }  
  }
</style>