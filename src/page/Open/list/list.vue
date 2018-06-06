<template>
  <div class="list">
    <mt-header :title="title" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>					
		<div class="" v-html="concent.content"></div>
		<ul style="padding-top:2rem;" class="clearfix" >
			<li v-for="(item,index) in lotteryList" :key="item.articleId" @click="toDetails(item)">
				{{item.articleName}}
			</li>
		</ul>

  </div>

</template>

<script>
 import {getOneArticle,getNotice} from '@/services/getDetail'
export default {
	data(){
		return{
			title:"",
			allLoaded:false,
	        topStatus:'',
	        distant:70,
	        autos:false,
	        loading:false,
	        show:false,
	        stopLoad:false,
	        lotteryList:[],
			listQuery:{},
      		arr:{},
      		scrollData: {
                noFlag: false //暂无更多数据显示
            },
            concent:"",
            query:{
            	pageId:1,
            	pageSize:10,
            }
		}
	},
 	methods:{
    	goback() {
      		this.$router.go(-1)
    	},
    	//关于我们  	
    	initData(){
    		this.listQuery.category="02";
    		this.listQuery.articleType='01';
    		getOneArticle(this.listQuery).then(res=>{
    			console.log(res)
    			if(res.state){
    				this.concent = res.data.dataList[0];
    			}
    		})
    	},
    	// //新闻公告
    	getNoticeList(){
	        var that=this;
	        var data = {
	          category:"02",
	          articleType:"04",
	          pageId:1,
	          pageSize:10
	        }
	        getNotice(data).then(res =>{
	          console.log(res);
	          that.lotteryList = res.data.dataList ;
	        })
	      },
    	//帮助中心
    	getNotice(){
    		this.query.category="02";
    		this.query.articleType = "07";
    		getNotice(this.query).then(res=>{
    			console.log(res)
    			if(res.state){
    				this.lotteryList = res.data.dataList;
    			}
    		})
    	},
    	toDetails(item){
    		this.$router.push({
    			name:'noticeDetail',
    			query:{
    				articleId:item.articleId
    			}
    			
    		})
    	}
    		
  	},
  	mounted(){
  		//this.initData()
  		this.title = this.$route.query.name
  		if(this.$route.query.type == 1){
  			this.getNoticeList();
  		}else if(this.$route.query.type == 2){
  			this.initData()
  		}else{
  			this.getNotice()
  		}
  		
  	},
  	components: {
    },
  	filters:{
	    // 截取日期字符串
	    toFixed:function(val){
	      return val.substring(11,16)
	      },
  	},

}
</script>
<style lang="less" scoped>
.mint-header {
	z-index:1000;
  background-color: #e83737;
}
.clearfix:after{ display: block; clear: both; content: "\0020"; visibility: hidden; height: 0 }
ul{
	width:100%;
	background: #fff;
	padding:0 3%;
	li{
		padding:0.5rem 0;
		color:#333;
		font-size:.7rem;
		border-bottom:1px solid #eee;
	}
  }
</style>

