<template>
  <div id="discount">
    <mt-header fixed title="资金明细">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <div class="content">
      <ul class="clearfix">
        <li class="clearfix">
          <div>金额</div>
          <div>类型</div>
          <div style="flex:2">时间</div>
          <div>状态</div>
        </li>
         <li class="clearfix" v-for="item in list" :key="item.id">
          <div style="color:#ff0000">{{item.tradeAmt | toFixed}}元</div>
          <div style="color:#333">{{item.tradeTypeName}}</div>
          <div style="flex:2;color:#333">{{item.tradeTime}}</div>
          <div style="color:#333">{{item.tradeStatus}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {withdrawRecord} from '@/services/getDetail'

export default {
  data() {
    return {
      list:[],
      listQuery:{
        pageSize:10,
        pageId:1,
      }
    }
  },
  methods:{
    goback() {
      this.$router.go(-1)
    },
    initData() {
      withdrawRecord(this.listQuery).then(res => {
        console.log(res)
        if(res.state){
          this.list = res.data.dataList
        }
        
      })
    }
  },
  mounted() {
    this.initData()
  },
  filters:{
    toFixed(val){
      if(val != "" || val !=null){
        return parseInt(val).toFixed(2)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.clearfix:after{ display: block; clear: both; content: "\0020"; visibility: hidden; height: 0 }
.mint-header {
  background-color: #e74444;
}
.content{
  background-color:#fff;
  padding: 2rem 3% 0;
  ul{
    li{
      display:flex;
      padding:0.5rem 0;
      border-bottom:1px solid #eee;
      div{
        flex:1;
        text-align:center;
        font-size:.6rem;
        color:#999;
      }
    }
  }
}

</style>
