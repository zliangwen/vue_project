<template>
  <div id="betting">
    <mt-header fixed title="回款明细">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>
    </mt-header>
    <div class="header"></div>
    <div class="content clearfix">
    	<ul class="clearfix">
    		<li class="clearfix" v-for="item in list">
    			<div>
    				<span>{{name}} 第{{issNum}}期</span>
    				<span class="span1">第{{item.period}}期/共{{list.length}}期 </span>
    				<span v-if="item.incomeStatus == '01'" class="span2">未回款</span>
    				<span v-if="item.incomeStatus == '02'" class="span2">已回款</span>
    			</div>
    			<p class="clearfix"><span >加息利息</span><span class="span" style="color:#e52920">{{item.shouldIncomeRaise}}%</span></p>
    			<p class="clearfix"><span>本金</span><span class="span">{{item.shouldIncomeMoney}}</span></p>
    			<p class="clearfix"><span>总额</span><span class="span">{{item.shouldIncomeTotalmoney}}</span></p>
    			<p class="clearfix"><span>利息</span><span class="span" style="color:#e52920">{{item.shouldIncomeInterset}}%</span></p>
    			<p class="clearfix"><span>时间</span><span class="span">{{item.shouldIncomeTime | toSubstring}}</span></p>
    			<p class="clearfix"><span>罚息</span><span class="span">{{item.shouldIncomeFine}}</span></p>
    		</li>
    	</ul>
    </div>
    <p v-if="showP" style="text-align:center;font-size:0.7rem;padding:0.7rem 0;">暂无数据~</p>
  </div>
</template>

<script>
import {incomeplanList} from "@/services/getDetail"
export default {
  data() {
    return {
      selected:'open',
      listQuery:{
        pageSize:10,
        pageId:1,
      },
      showP:false,
      list:[],
      name:"",
      issNum:""
    }
  },
  mounted(){
  	this.initData()
  	this.name = this.$route.query.name
  	this.issNum = this.$route.query.issSum
  },
  methods:{
    goback() {
      this.$router.push("/person")
    },
    initData(){
    	this.listQuery.investOrderId = this.$route.query.id
    	incomeplanList(this.listQuery).then(res=>{
    		console.log(res)
    		if(res.state){
    			this.list = res.data.dataList
    		}
    	})
    }
   
   
  },
  filters:{
    toFixed(val){
      if(val != "" || val !=null){
        return parseInt(val).toFixed(2)
      }
    },
    toSubstring(val){
      if(val != "" || val !=null){
        return val.substring(0,10)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.clearfix:after{ display: block; clear: both; content: "\0020"; visibility: hidden; height: 0 }
.header{
	padding:2rem 0 0;
	height:4rem;
	width:100%;
	background:#e52920;
	position:fixed;

}
.content{
	
	position:relative;
	top:2rem;
	width:94%;
	left:50%;
	margin-left:-47%;
	ul{
		li{	border-radius:5px;
			background:#fff;
			padding:0.7rem 3%;
			margin-bottom:.3rem;
			div{
				span{
					font-size:.7rem;
				}
				.span1{
					font-size:.6rem;
					color:#999;
				}
				.span2{
					display:block;
					background:#e52920;
					color:#fff;
					border-radius:5px;
					float:right;
					padding:0.1rem .2rem;
					font-size:.6rem;
					margin-top:.25rem;
				}
			}
			p{
				padding:0.5rem 0;
				font-size:.7rem;
				padding-bottom:0;
				span{
					float:left;
					color:#999;
				}
				span.span{
					float:right;
					color:#333
				}

			}
			
		}
	}
	
}
</style>