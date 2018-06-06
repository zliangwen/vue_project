import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/page/Home/Home'
import BuyTogether from '@/page/BuyTogether/BuyTogether'
import Open from '@/page/Open/Open'
import Mine from '@/page/Mine/Mine'
import ShareWeb from '@/page/ShareWeb/ShareWeb'

import Register from '@/page/Mine/Register/Register'
import ForgetPsd from '@/page/Mine/ForgetPsd/ForgetPsd'


//开奖模块子页面
import List from '@/page/Open/list/list'
//合买模块子页面
import BuyInfo from '@/page/BuyTogether/BuyInfo/BuyInfo'
import BuyInfoDetail from '@/page/BuyTogether/BuyInfo/buyInfoDetail/buyInfoDetail'
import NowBuy from '@/page/BuyTogether/BuyInfo/nowBuy/nowBuy'
import ChooseAction from '@/page/BuyTogether/BuyInfo/chooseAction/chooseAction'


import Person from '@/page/Person/Person'
import PersonInfo from '@/page/Person/PersonInfo/PersonInfo'
import ChangeName from '@/page/Person/PersonInfo/ChangeName/ChangeName'
import ChangePayPsd from '@/page/Person/PersonInfo/ChangePayPsd/ChangePayPsd'
import SetPayPsd from '@/page/Person/PersonInfo/SetPayPsd/SetPayPsd'

//tips
import Recharge from '@/page/Person/Recharge/Recharge'
import Withdraw from '@/page/Person/Withdraw/Withdraw'
import Card from '@/page/Person/Card/Card'
//list
import Integral from '@/page/Person/Integral/Integral'
import ExChange from '@/page/Person/Integral/ExChange/ExChange'
import Betting from '@/page/Person/Betting/Betting'
import Cooperate from '@/page/Person/Cooperate/Cooperate'
import CapitalDetails from '@/page/Person/CapitalDetails/CapitalDetails'
import Discount from '@/page/Person/Discount/Discount'
import Message from '@/page/Person/Message/Message'
import Share from '@/page/Person/Share/Share'
import History from '@/page/Person/history/history'
import Popularity from '@/page/Person/Popularity/Popularity'
import Details from '@/page/Person/Details/Details'
import Risk from '@/page/Person/PersonInfo/risk/risk'
import RiskEnd from '@/page/Person/PersonInfo/risk/riskEnd/riskEnd'
import PersonInfo1 from '@/page/Person/PersonInfo/personInfo/personInfo'
import InfoAndSecurity from '@/page/Person/PersonInfo/infoAndSecurity/infoAndSecurity'
import Signature from '@/page/Person/PersonInfo/signature/signature'
import Tender from '@/page/Person/PersonInfo/tender/tender'
import Gest from '@/page/Person/PersonInfo/infoAndSecurity/gesturesPsd/gesturesPsd'
import Phone from '@/page/Person/PersonInfo/infoAndSecurity/phone/phone'
import LoginPsd from '@/page/Person/PersonInfo/infoAndSecurity/loginPsd/loginPsd'
import MessAction from '@/page/Person/messAction/messAction'
import Apply from '@/page/Person/Cooperate/apply/apply'
import openDoor from '@/page/Person/openDoor/openDoor'

import notice from '../page/Home/notice/notice'
import noticeDetail from '../page/Home/notice/noticeDetail/noticeDetail'

Vue.use(Router)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: '/buyTogether',
    name: 'buyTogether',
    component: BuyTogether
  },
  {
  	path:"/buyTogether/BuyInfo",
  	name:"buyInfo",
  	component:BuyInfo
  },
  {
    path:"/buyTogether/BuyInfo/buyInfoDetail",
    name:"buyInfoDetail",
    component:BuyInfoDetail
  },
  {
    path:"/buyTogether/BuyInfo/nowBuy/nowBuy",
    name:"nowBuy",
    component:NowBuy
  },
  {
    path:"/buyTogether/BuyInfo/chooseAction/chooseAction",
    name:"chooseAction",
    component:ChooseAction
  },
  {
    path: '/open',
    name: 'open',
    component: Open
  },
  {
    path: '/open/list',
    name: 'list',
    component: List
  },
  {
    path: '/shareWeb',
    name: 'shareWeb',
    component: ShareWeb
  },
  {
    path: '/mine',
    name: 'mine',
    component: Mine
  },
  {
    path: '/mine/register',
    name: 'register',
    component: Register
  },
  {
    path: '/mine/forgetPsd',
    name: 'forgetPsd',
    component: ForgetPsd
  },
  {
    path: '/person',
    name: 'person',
    component: Person
  },
  
  {
    path: '/person/personInfo',
    name: 'personInfo',
    component: PersonInfo
  },
  {
    path: '/person/personInfo/changeName',
    name: 'changeName',
    component: ChangeName
  },
  {
    path:'/person/messAction',
    name:"messAction",
    component:MessAction
  },
  {
    path:'/person/openDoor',
    name:"openDoor",
    component:openDoor
  },
  {
    path: '/person/personInfo/changePayPsd',
    name: 'changePayPsd',
    component: ChangePayPsd
  },
  {
    path: '/person/personInfo/setPayPsd',
    name: 'setPayPsd',
    component: SetPayPsd
  },
  {
    path: '/person/personInfo/personInfo',
    name: 'personInfo1',
    component: PersonInfo1
  },
  {
    path: '/person/risk/risk',
    name: 'risk',
    component: Risk
  },
  {
    path: '/person/risk/riskEnd/riskEnd',
    name: 'riskEnd',
    component: RiskEnd
  },
  {
    path: '/person/personInfo/infoAndSecurity',
    name: 'infoAndSecurity',
    component: InfoAndSecurity
  },
  {
    path:'/person/personInfo/infoAndSecurity/gesturesPsd/gesturesPsd',
    name:'gesturesPsd',
    component:Gest
  },
  {
    path:'/person/personInfo/infoAndSecurity/phone/phone',
    name:'phone',
    component:Phone
  },
  {
    path:'/person/personInfo/infoAndSecurity/loginPsd/loginPsd',
    name:'loginPsd',
    component:LoginPsd
  },
  {
    path: '/person/personInfo/signature',
    name: 'signature',
    component: Signature
  },
  {
    path: '/person/personInfo/tender',
    name: 'tender',
    component: Tender
  },
  {
    path: '/person/recharge',
    name: 'recharge',
    component: Recharge
  },
  {
    path: '/person/withdraw',
    name: 'withdraw',
    component: Withdraw
  },
  {
    path: '/person/card',
    name: 'card',
    component: Card
  },
  {
    path: '/person/integral',
    name: 'integral',
    component: Integral
  },
  {
    path: '/person/integral/exChange',
    name: 'exChange',
    component: ExChange
  },
  {
    path: '/person/betting',
    name: 'betting',
    component: Betting
  },
  {
    path: '/person/cooperate',
    name: 'cooperate',
    component: Cooperate
  },
  {
    path:"/person/cooperate/apply",
    name:"apply",
    component:Apply
  },
  {
    path: '/person/capitalDetails',
    name: 'capitalDetails',
    component: CapitalDetails
  },
  {
    path: '/person/discount',
    name: 'discount',
    component: Discount
  },
  {
    path: '/person/message',
    name: 'message',
    component: Message
  },
  {
    path: '/person/share',
    name: 'share',
    component: Share
  },
  {
    path:"/person/history",
    name:'history',
    component:History
  },
  {
    path:"/person/popularity",
    name:"popularity",
    component:Popularity
  },
  {
    path:"/person/details",
    name:"details",
    component:Details
  },
  
  {
    path: '/notice',
    name: 'notice',
    component: notice
  },
  {
    path: '/noticeDetail',
    name: 'noticeDetail',
    component: noticeDetail
  },
  
]

export default new Router({
  routes
})
