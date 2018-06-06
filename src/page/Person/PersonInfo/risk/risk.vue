<template>
  <div id="personInfo">
    <mt-header fixed  style="background:url(../../../../../static/img/cep.png) no-repeat;background-size:100%">
      <i @click="goback" slot="left" class="iconfont icon-back"></i>

    </mt-header>
    <div class="header">
        <img src="../../../../../static/img/cep.png"/>
      </div>
    <div class="concent clearfix">
      <ol type=1>
        <li v-for="(item,myIndex) in items">
          <div>{{item.title}}</div>
         <ul class="clearfix">
           <li v-for="(val,index) in item.answerList" class="clearfix" @click="checkAction(myIndex,val)">
             <i>
               <img src="../../../../../static/img/check.png" v-if="val.checked"/>
               <img src="../../../../../static/img/checkFalse.png" v-if="!val.checked"/>
             </i>
             <span>{{val.answerDetail}}</span>
           </li>
         </ul>
         
          
        </li>
      </ol>

    </div>
       <div class="button" @click="sure(items)">确认</div>
  </div>
</template>

<script>
import {getQuestionList,getAnswerSubmit} from '@/services/getDetail'
import {setStore,removeStore} from '@/config/mUtils'
export default {
  data() {
    return {
      userName:'',
      baseImg:'../../src/assets/img/userAll.png',
      isSet:false,
      radios:"",
      //value:"",
      //checkedValue:"",
      items:'',
      from:{},
      ids:[],
    }
  },
  methods:{
    goback() {
      this.$router.go(-1)
    },
   toEnd(item){
   	this.$router.push({
   		name:"riskEnd",
   		query:{
   			id:item.id
   		}
   	})
   },

   checkAction(index,item){
    console.log(index)
    console.log(item)
    item.checked = true;

    var length = this.items
    //console.log(length)
    this.items[index].id = item.answerId
    for(var i=0;i<length[index].answerList.length;i++){
      if(item.answerId == length[index].answerList[i].answerId){
        continue;
      }
      if(length[index].answerList[i].checked == true){
        length[index].answerList[i].checked = false;
        this.items[index].id = item.answerId
      }       
    }
    console.log(this.items)
   },
   initDate(){
    getQuestionList().then(res=>{
      console.log(res)
      this.items=res.data;
    });
   },
   sure(dataList){
    var items = []
    //console.log(data)
    var isCheck = false;
    for(var i=0;i<dataList.length;i++){
      if(dataList[i].id){
        items[i] = dataList[i].id
      }else{
        isCheck = true
      }
      
    }
    if(isCheck){
      this.$toast("请选择答案")
      return;
    }
   console.log(items.toString())
      var data={
        answerIds:items.toString()
      }
      getAnswerSubmit(data).then(res=>{
        console.log(res)
        if(res.state){
          setStore("data",res.data)
          this.$router.push({
            name:"riskEnd",
          })
        }
      })
   }
   
  },
  mounted() {
    this.initDate();
  }
}
</script>

<style lang="less" scoped>
.clearfix:after{ display: block; clear: both; content: "\0020"; visibility: hidden; height: 0 }
@mianColor:#e83737;
.mint-cell-wrapper{
  background:none;
}
.concent{
  background:#fff;
  padding:0 3%;
  ol {
    padding:0 .7rem;
  	li{
      padding:.5rem 0;
  		font-size:.7rem;
      border-bottom:1px solid #eee;
      ul{
        li{
          border:0;
          width:50%;
          float:left;
          i{
            display:block;
            width:.8rem;
            height:.8rem;
            float:left;
          }
          span{
            display:block;
            float:left;
            line-height:.8rem;
            margin-left:.5rem;
          }
        }
      }
  	}
  }

  
}
.button{
  width:80%;
  height:2rem;
  margin:2rem auto 0;
  background:#e52920;
  border-radius:5px;
  color:#fff;
  font-size:.7rem;
  text-align:center;
  line-height:2rem;
}

</style>
