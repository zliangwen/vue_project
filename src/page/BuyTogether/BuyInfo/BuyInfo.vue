<template>
  <div class="buyInfo">
  	<header class="header">
  		<mt-header fixed title="项目详情" id="mt-header">
	      <i @click="goback" slot="left" class="iconfont icon-back"></i>
	    </mt-header>
	    <div class="center">
	    	<p class="p">{{object.projectRate|toFixed}}<i>%</i></p>
	    	<span>预期年收益率</span>
	    </div>
	    <div class="bottom">
	    	<div>
	    		<span>投资期限</span>
	    		<span>{{object.projectTimelimit}}个月</span>
	    	</div>
	    	<div>
	    		<span>项目总额</span>
	    		<span>{{object.projectMoney}}元</span>
	    	</div>
	    </div>
  	</header>
  	<ul class="clearfix concent">
  		<li class="clearfix">
  			<span class="left">项目名称</span>
  			<span class="right">{{object.projectName}}-第{{object.projectNum}}期</span>
  		</li>
  		<li class="clearfix">
  			<span class="left">剩余可投金额</span>
  			<span class="right red">{{object.projectMoney - haveMoney}}元</span>
  		</li>
  		<li class="clearfix">
  			<span class="left">起投金额</span>
  			<span class="right">{{object.minInvest}}元</span>
  		</li>
  		<li class="clearfix">
  			<span class="left">还款方式</span>
  			<span class="right">{{object.repaymentTypeName}}</span>
  		</li>
  	</ul>
  	<footer class="footer">
  		<p @click="toBuyInfoDetail"><i><img src="../../../../static/img/top.png"/></i>向上滑动,查看详情</p>
  		<button @click="toTouzi" v-if="investMoney != 0">立即投资</button>
  		<button v-if="investMoney == 0" style="background:rgb(204, 204, 204)">已售完</button>
  	</footer>
  </div>
</template>

<script>

import {loanInfo,} from '../../../services/getDetail'

export default {
  data() {
    return {
    	object:{},
    	haveMoney:null,
    	investMoney:null
    }
  },
  mounted(){
  	this.initData()
  	
  },
  methods:{
  	goback(){
  		this.$router.go(-1)
  	},
  	toBuyInfoDetail(){
  		this.$router.push({
  			name:"buyInfoDetail",
  			query:{
  				id:this.$route.query.id,
  				investMoney:this.investMoney
  			}
  		})
  	},
  	toTouzi(){
  		this.$router.push({
  			name:"nowBuy",
  			query:{
  				id:this.$route.query.id,
  				type:2,
  				momey:this.investMoney
  			}
  		})
  	},
  	initData(){
  		loanInfo(this.$route.query.id).then(res => {
  			console.log(res)
  			if(res.state){
  				this.object = res.data.dataShow
  				this.haveMoney = res.data.haveMoney
  				this.investMoney = res.data.investMoney
  			}
  		})
  	},
  	test(){
  		test()
  	}
  	
  },
 
  filters:{
  	centerTextNone:function(val){
  		if(val !="" || val != null){
  			return val.substring(0,1)+'*'+val.substring(val.length-1)
  		}
  		
  	},
  	toFixed(val){
      if(val != '' || val != null){
        return parseInt(val).toFixed(2)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.clearfix:after{ display: block; clear: both; content: "\0020"; visibility: hidden; height: 0 }
#mt-header{
	background:url(../../../../static/img/02.png) no-repeat;
	background-size:100%;
}
.header{
	height:7rem;
	position:relative;
	background:url(../../../../static/img/02.png) no-repeat;
	background-size:100%;
	.center{
		padding-top:2rem;
		.p{
			text-align:center;
			font-size:1rem;
			color:#fff;
			i{
				font-size:0.6rem;
				font-style:normal;
			}
		}
		span{
			padding-top:.25rem;
			display:block;
			width:100%;
			text-align:center;
			font-size:0.6rem;
			color:#fff;
		}
	}
	.bottom{
		width:100%;
		height:1.5rem;
		background:url(../../../../static/img/03.png) no-repeat;
		background-size:100%;
		position:absolute;
		bottom:0;
		left:0;
		display:flex;
		div{
			text-align:center;
			line-height:1.2rem;
			color:#fff;
			flex:1;
			span{
				font-size:.6rem;
				text-align:center;
			}
		}
	}
}
.concent{
	background:#fff;
	padding:0 3%;
	li{
		padding:0.7rem 0;
		border-bottom:1px solid #eee;
		span{
			font-size:.6rem;
		}
		span.left{
			float:left;
			color:#999;

		}
		span.right{
			float:right;
			color:#333;
		}
		span.red{
			color:#e52920
		}
	}
}
.footer{
	position:fixed;
	bottom:0;
	width:100%;
	p{
		text-align:center;
		color:#999;
		font-size:.6rem;
		padding:0.5rem;
		position:relative;
		i{
			display:block;
			width:.6rem;
			height:.6rem;
			position:absolute;
			left:28%;

		}
	}
	button{
		width:100%;
		background:#e52920;
		padding:0.5rem 0;
		color:#fff;
		text-align:center;
		border:0;
		font-size:.7rem;
	}
}
</style>

