<template>
  <div class="recharge">
    <mt-header fixed title="消息公告">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <div class="content">
      <div class="list">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" 
        :auto-fill="autos" :top-distance="distant"  :bottom-all-loaded="allLoaded" 
        ref="loadmore">
          <ul class="message">
						<!-- <li v-for="(item,index) in msgList" :key="index">
							<div class="msgInfo">{{item.messageInfo}}</div>						
							<div class="state">
									<span class="title">{{item.messageTitle}}</span>
									<div class="time">
										<span>{{item.createDate}}</span>
									</div>
							</div>
						</li> -->
            <li v-for="(item,index) in msgList" :key="index">
              <div class="msgInfo">{{item.messageInfo}}</div>
              <span class="time">{{item.createDate}}</span>
            </li>
					</ul>
					<div class="nodata">
						<div v-if="isNodata">
							<span></span>
							<p>暂无数据~</p>
						</div>
						<p v-if="footershow">没有更多数据~</p>                           
					</div>
        </mt-loadmore>
      </div>
		</div>
  </div>
</template>

<script>
import {getMessage} from '@/services/getDetail'
export default {
  data() {
    return {
      allLoaded:false,  //是否禁止上拉加载
      distant:70,
      autos:false,
      isNodata: true,
      footershow:false, // 数据加载完毕，显示相关内容 
      msgList:[],
      queryData:{
        pageId:1,
        pageSize:10
      }
    }
  },
  methods:{
    goback() {
      this.$router.go(-1)
    },
    loadTop(){
      this.queryData.pageId = 1
      this.msgList = []
      setTimeout(() =>{
        this.initData();
        this.$refs.loadmore.onTopLoaded();
      },80)
    },
    loadBottom(){
      setTimeout(() => {
        this.initData()
        this.$refs.loadmore.onBottomLoaded();
      },800);
    },
    initData() {
      getMessage(this.queryData).then(res => {
        console.log(res)
        if(res.state) {
          if(res.data.dataList.length != 0){
            this.msgList = this.msgList.concat(res.data.dataList)
            this.isNodata = false
            this.footershow = false
            this.allLoaded = false
            this.queryData.pageId +=1
          }else {
            this.allLoaded = true
            if(!this.isNodata) {
              this.footershow = true
            }
          }
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
.content {
  overflow: hidden;
  padding: 2rem 0 0;
  background:#fff;
  .list {
    overflow: auto;
    height: 100%;
    border-radius: 0.2rem;
    .message {
      width: 100%;
      padding: 0 .6rem;
      li {
        width: 100%;
        padding: .6rem 0;
        /* background-color: orange; */
        border-bottom: 1px solid #eee;
        &:last-of-type {
          border: none;
        }
      }
      .msgInfo {
        font-size: .7rem;
        color:#333;
      }
      .time {
        font-size: .6rem;
        color:#999;
      }
    }
  }
  .nodata {
    span {
      background: url("../../../assets/img/noData@2x.png") no-repeat;
      background-size: contain;
    }
  }
}
</style>
