<template>
  <div class="buyInfo">
  	<header class="header">
  		<mt-header fixed title="开户申请">
	      <i @click="goback" slot="left" class="iconfont icon-back"></i>
	    </mt-header>
  	</header>
  	<ul class="clearfix firstUi">
  		<li class="clearfix">
  			<span>姓名：</span>
  			<input type="text" placeholder="请输入姓名" readonly  v-model="user.realName" />
  		</li>
  		<li class="clearfix">
  			<span>身份证号：</span>
  			<input type="text" placeholder="请输入身份证号" readonly  v-model="user.idCard" />
  		</li>
  		<li class="clearfix">
  			<span>手机号码：</span>
  			<input type="text" placeholder="请输入手机号码"  readonly  v-model="user.userPhone"/>
  		</li>
  		<li class="clearfix">
  			<span>开户行所在省：</span>
  			<input type="text" placeholder="请输入开户行所在省"  v-model="province" readonly @click="change"  v-if="trueAction"/>
  			<input type="text" placeholder="请输入开户行所在省"  v-model="user.province" readonly  v-if="!trueAction"/>
  		</li>
  		<li class="clearfix">
  			<span>开户行所在市：</span>
  			<input type="text" placeholder="请输入开户行所在市" v-model = "city"  readonly @click="getFyAreaList" v-if="trueAction" />
  			<input type="text" placeholder="请输入开户行所在市" v-model = "user.city"  readonly  v-if="!trueAction" />
  		</li>
  		<li class="clearfix" v-if="trueAction">
  			<span>选择银行</span>
  			<input type="text" placeholder="请选择银行" v-model="bank"  readonly @click="getbank"  />
  		</li>
  		<li class="clearfix">
  			<span>开户行支行：</span>
  			<input type="text" placeholder="请输入开户行支行"  v-model="BranchBank" readonly @click="getBranchBank" v-if="trueAction"/>
  			<input type="text" placeholder="请输入开户行支行"  v-model="user.BranchBank" readonly  v-if="!trueAction"/>
  		</li>
  		<li class="clearfix">
  			<span>银行账号：</span>
  			<input type="number" placeholder="请输入银行账号" v-model = "cardNo"  v-if="trueAction"/>
  			<input type="number" placeholder="请输入银行账号" v-model = "user.cardNo" readonly  v-if="!trueAction"/>
  		</li>
  		<li class="clearfix" v-if="trueAction">
  			<span>交易密码：</span>
  			<input type="password" placeholder="请输入交易密码"  v-model="tradePassword" />
  		</li>
  	</ul>

  	<div class="footer" @click="sure" v-if="trueAction">确定</div>
  	<div class="footer"  v-if="!trueAction">已开户</div>
  	<!-- 省级 -->
  	<mt-popup
	  v-model="popupVisible"
	  position="bottom"
	  style="width:100%;height:12rem;overflow-y:auto;"
	  >
	  	<ul class="sencond_ul">
	  		<li v-for="(item,index) in provinceList" @click="chooseProvice(item)">{{item.cityName}}</li>
	  	</ul>
	</mt-popup>
	<!-- 市级 -->
	<mt-popup
	  v-model="popupVisible1"
	  position="bottom"
	  style="width:100%;height:12rem;overflow-y:auto;"
	  >
	  	<ul class="sencond_ul">
	  		<li v-for="(item,index) in cityList" @click="chooseCity(item)">{{item.cityName}}</li>
	  	</ul>
	</mt-popup>
	<!-- 银行 -->
	<mt-popup
	  v-model="popupVisible2"
	  position="bottom"
	  style="width:100%;height:12rem;overflow-y:auto;"
	  >
	  	<ul class="sencond_ul">
	  		<li v-for="(item,index) in bankList" @click="chooseBank(item)">{{item.bankName}}</li>
	  	</ul>
	</mt-popup>
	<!-- 支行 -->
	<mt-popup
	  v-model="popupVisible3"
	  position="bottom"
	  style="width:100%;height:12rem;overflow-y:auto;"
	  >
	  	<ul class="sencond_ul">
	  		<li v-for="(item,index) in BranchBankList" @click="chooseBranchBank(item)">{{item.subBankName}}</li>
	  	</ul>
	</mt-popup>
  </div>
</template>

<script>

import {getFyProvinceAreaList,getFyAreaList,getFyBankList,getBranchBankList,isRealName,openAccountSubmit,isOpenAccount,openAccountInfomation} from '../../../services/getDetail'

export default {
  data() {
    return {
    	user:{},
    	popupVisible:false,
    	popupVisible1:false,
    	popupVisible2:false,
    	popupVisible3:false,
    	province:"",
    	parentCode:"",
    	provinceList:[],
    	city:"",
    	cityCode:"",
    	cityList:[],
    	bank:"",
    	bankCode:"",
    	bankList:[],
    	BranchBankList:[],
    	BranchBank:"",
    	branchBankId:"",
    	cardNo:"",
    	tradePassword:"",
    	trueAction:true
    }
  },
  mounted(){
  	this.isRealName()
  	this.initDate()
  	
  },
  methods:{
  	goback(){
  		this.$router.go(-1)
  	},
  	initDate(){
  		getFyProvinceAreaList().then(res => {
  			console.log(res)
  			if(res.state){
  				this.provinceList = res.data;
  			}
  		})
  	},
  	change(){
  		this.popupVisible = true;
  	},
  	chooseProvice(item){
  		this.province = item.cityName
  		this.parentCode = item.cityCode;
  		this.popupVisible = false;
  	},
  	getFyAreaList(){
  		if(this.parentCode == ''){
  			this.$toast('请选择开户行所在省')
  		}else{

  			var data={
  				parentCode:this.parentCode
  			}
  			getFyAreaList(data).then(res => {
  				console.log(res)
  				if(res.state){
  					this.cityList = res.data
  					this.popupVisible1 = true
  				}
  			})
  		}
  	},
  	chooseCity(item){
  		this.city = item.cityName;
  		this.cityCode = item.cityCode;
  		this.popupVisible1 = false;
  	},
  	getbank(){
  		if(this.parentCode == ''){
  			this.$toast('请选择开户行所在省')
  			return;
  		}
  		if(this.cityCode == ""){
  			this.$toast('请选择开户行所在市')
  			return;
  		}
  		getFyBankList().then(res => {
  			console.log(res)
  			if(res.state){
  				this.bankList = res.data
  				this.popupVisible2 = true;
  			}
  		})

  	},
  	chooseBank(item){
  		this.bank = item.bankName;
  		this.bankCode = item.bankCode;
  		this.popupVisible2 = false;
  	},
  	getBranchBank(){
  		if(this.parentCode == ''){
  			this.$toast('请选择开户行所在省')
  			return;
  		}
  		if(this.cityCode == ""){
  			this.$toast('请选择开户行所在市')
  			return;
  		}
  		if(this.bankCode == ''){
  			this.$toast('请选择银行')
  			return;
  		}
  		var data = {
  			cityCode:this.cityCode,
  			bankCode:this.bankCode
  		}
  		getBranchBankList(data).then(res =>{
  			console.log(res)
  			if(res.state){
  				if(res.data.length == 0){
  					this.$toast('该地点'+this.bank +'没有支行')
  					return
  				}
  				this.BranchBankList = res.data;
  				this.popupVisible3 = true
  			}
  		})

  	},
  	chooseBranchBank(item){
  		this.BranchBank = item.subBankName;
  		this.branchBankId = item.subBankId;
  		this.popupVisible3 = false;

  	},
  	isRealName(){
  		isRealName().then(res =>{
  			console.log(res)
  			if(res.state){
  				if(res.data.flag){

  					this.user = res.data
  					this.isOpenAccount();
  				}else{
  					this.$messagebox.confirm("您还没有实名认证?").then(()=>{
  						this.$router.push({
  							name:"integral"
  						})
  					},()=>{
  						this.$router.go(-1)
  					})
  				}
  			}
  		})
  	},
  	//判断有没有开户
  	isOpenAccount(){
  		isOpenAccount().then(res =>{
  			console.log(res)
  			if(res.state){
  				if(res.data.flag){
  					openAccountInfomation().then(res => {
  						console.log(res)
  						if(res.state){
  							this.trueAction=false;
  							this.user.province=res.data.provinceName
							this.user.city=res.data.cityName
							this.user.BranchBank=res.data.bankName
							this.user.cardNo=res.data.bankCardNo
  						}
  					})
  				}else{

  				}
  			}
  		})
  	},
  	sure(){
  		var bankRule = /^([1-9]{1})(\d{14}|\d{18})$/
  		if(this.branchBankId == ""){
  			this.$toast('请按步骤选择支行')
  			return;
  		}
  		if(this.cardNo == ""){
  			this.$toast('请输入银行卡号')
  			return;
  		}
  		console.log(this.tradePassword)
  		if(!bankRule.test(this.cardNo)){
  			this.$toast("请输入正确的银行卡")
  			return;
  		}
  		if(this.tradePassword == ""){
  			this.$toast("请输入交易密码")
  			return;
  		}
  		var data ={
  			branchBankId:this.branchBankId,
  			cardNo:this.cardNo,
  			tradePassword:this.tradePassword
  		}
  		openAccountSubmit(data).then(res => {
  			console.log(res)
  			if(res.state){
  				this.$toast(res.msg)
  				this.trueAction = false;
  			}else{
  				this.$toast(res.msg)
  			}
  		})
  	}
  	
  	
  },
 
  filters:{
  	
  },
}
</script>

<style lang="less" scoped>
.clearfix:after{ display: block; clear: both; content: "\0020"; visibility: hidden; height: 0 }
ul.firstUi{
	padding:2rem 3% 0;
	background:#fff;
	li{
		padding:0.5rem 0;
		border-bottom:1px solid #eee;
		span{
			display:block;
			width:35%;
			font-size:.7rem;
			color:#333;
			float:left;
		}
		input{
			width:65%;
			float:left;
			font-size:.7rem;
			border:0;
			
		}
		input::-webkit-input-placeholder{
			color:#c0c0c0;
		}
	}
}
.footer{
	width:90%;
	margin: 1rem auto;
	height:2rem;
	line-height:2rem;
	text-align:center;
	color:#fff;
	background:#e52920;
	border-radius:5px;
}
.sencond_ul{
	li{
		border-bottom:1px solid #eee;
		font-size:.7rem;
		padding:0.25rem 0;
		text-align:center;
	}
}
</style>

