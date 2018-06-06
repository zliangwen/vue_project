<template>
  <div id="open">
    <mt-header fixed title="更多 "></mt-header>
    <div class="content clearfix">
    	<ul class="content_center clearfix">
    		<li  class="liConcent" v-for="(item,index) in openList" :key="item.id" @click="to(item)">
    			<div class="text">
    				<div class="div_text">
    					{{item.title}}
    				</div>
    				<div class="div_right">
              >    
            </div>
    			</div>
    		</li>
    	</ul>
    </div>
    <m-tabbar></m-tabbar>
  </div>
</template>

<script>
import mTabbar from '@/components/tabbar'
// import {getOpenList} from '../../services/getDetail'
export default {
  data() {
    return {
     	openList:[
        {title:"新闻公告",type:"1"},
        {title:"关于我们",type:"2"},
        {title:"帮助中心",type:"3"},
        //{title:"版本更新"}
      ],
      arr:{},
      img:{},
    }
  },
  mounted(){

  },
  methods:{
  	to(item){
      this.$router.push({
        name:"list",
        query:{
          type:item.type,
          name:item.title
        }
      })
    }
  },

  //过滤器
  filters:{
    // 截取日期字符串
    toFixed:function(val){
      return val.substring(11,16)
      },
  },

  components: {
    mTabbar
  },
}
</script>

<style lang="less" scoped>
.clearfix:after{ display: block; clear: both; content: "\0020"; visibility: hidden; height: 0 }
.content{
  padding-top:2rem;
	
	.content_center{
		li{
      height:2.2rem;
      line-height:2.2rem;
			background:#fff;
			border-bottom:1px solid #eee;
			div.text{
        display:flex;
				.div_text{
          padding-left:0.5rem;
          
          flex:3;
          font-size:0.7rem;
				}
        div.div_right{
          flex:1;
          text-align:right;
          padding-right:0.5rem;
        }
			}

		}
	}
}

</style>