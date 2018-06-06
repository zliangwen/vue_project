import fetch from '../config/fetch'
import {getStore} from '../config/mUtils'

// 获取首页banner
export const getBanner = (data) => fetch('/h5/index/indexBanner',data);
// 查询公告信息
export const getNotice = (data) => fetch('/h5/index/getArticleList',data);
// 公告列表
//图片上传/h5/file/upload
export const upload = (data) =>fetch('/h5/file/upload',data);
//保存头像/h5/center/updateHeadPortrait
export const updateHeadPortrait=(userHeadPortraitId) => fetch('/h5/center/updateHeadPortrait',{
	userHeadPortraitId:userHeadPortraitId
});
//签到/h5/userSign
export const userSign = () => fetch('/h5/userSign');
//查询是否签到/h5/checkUserSign
export const checkUserSign =()=>fetch('/h5/checkUserSign');
// 公告详情
export const getDetail = (articleId) => fetch('/h5/index/getArticleDetail', {
    articleId:articleId
});
// 获取彩票种类信息
export const getLottery = () => fetch('/h5/index/indexLottery', {
    type: 'lottery'
});
// 帮助中心
export const getQuestion = () => fetch('/h5/index/indexPlatFaq', {
    type:'platfaq'
});
// 帮助中心详情
export const getQuestionDetail = (faqId) => fetch('/h5/index/platFaqDetail', {
    faqId:faqId
});

export const buyRecord = (pageId,pageSize) => fetch('/h5/index/indexBuyRecord', {
    pageId:pageId,
    pageSize:pageSize
    //data:data
});

//风险评估内容列表
export const getQuestionList = () => fetch("/h5/center/getQuestionList");
//提交风险评估列表接口
export const getAnswerSubmit = (data) => fetch("/h5/center/answerSubmit",data);


//理财投资/h5/invest/frontListData
export const frontListData=(data)=>fetch('/h5/invest/frontListData',data);
//项目明细 /h5/invest/loanInfo
export const loanInfo=(projectId)=>fetch('/h5/invest/loanInfo',{
    projectId:projectId
});
//获取图片 /h5/loanView/productImageList
export const productImageList = (data) => fetch('/h5/loanView/productImageList',data);
//查询投资记录/h5/loanView/investList
export const investList=(data)=>fetch("/h5/loanView/investList",data);
//查询还款计划列表/h5/loanView/repaymentPlan
export const repaymentPlan =(data)=>fetch('/h5/loanView/repaymentPlan',data);
//查询优惠券 /h5/usercoupon/usableCoupon
export const  usableCoupon = (data) => fetch('/h5/usercoupon/usableCoupon',data);
//兑换优惠券/h5/popular/convert
export const convert = (data) =>fetch('/h5/popular/convert',data);
//回款明细/h5/invest/incomeplanList
export const incomeplanList = (data) => fetch('/h5/invest/incomePlanList',data);


//立即投资/h5/invest/investProject
export const investProject = (data) =>fetch("/h5/invest/investProject",data);
//判断是否冻结 、是否实名认证 和是否设置交易密码/h5/invest/investProjectPre
export const investProjectPre=()=>fetch("/h5/invest/investProjectPre");
//自动投标设置/h5/investSet/showInfo
export const showInfo = () =>fetch('/h5/investSet/showInfo');
export const paramsSet = (data) =>fetch('/h5/investSet/paramSet',data);
//个人中心
//我的投资记录
export const myInvestList=(data) => fetch("/h5/invest/myInvestList",data);
//查询我的债权转让/h5/transfer/myTransferList
export const myTransferList=(data) =>fetch('/h5/transfer/myTransferList',data);
// 登录
export const login = (data) => fetch("/h5/login",data);
//退出
export const logout = () => fetch("/h5/loginOut");
//资金明细提现/h5/center/tradeRecord 
export const withdrawRecord = (data) => fetch('/h5/center/tradeRecord',data);
//我的优惠 /h5/usercoupon/couponList
export const couponList = (data) =>fetch('/h5/usercoupon/couponList',data);
//兑换优惠券列表/h5/usercoupon/convertibleList
export const  convertibleList =(data) => fetch('/h5/usercoupon/convertibleList',data);
//获取验证图片与验证码
export const getCheckImg = (data) => fetch("/h5/getImgCode",data);
export const getCheckCode = (data) => fetch("/h5/sendMessages",data);

//修改密码
export const registPsd = (data) => fetch('/h5/updatePasswd',data);
//设置交易密码
export const setPass = (data) => fetch('/h5/center/addPaymentCode',data);
//修改交易密码
export const modifyPass = (data) => fetch('/h5/updatePaypassword',data) ;
//修改手机号
export const modifyPhone = (data) => fetch('/h5/updatePhone',data);
//手机号丢失或更换 修改手机号
export const modify = (data) => fetch('/h5/updatePhoneByIdCard',data);

//注册
// export const getRule = (data) => fetch("/h5/index/getArticle",data);
export const register = (data) => fetch("/h5/regist",data);

//用户是否实名认证
export const isRealName = () => fetch('/h5/center/isRealName');
//用户提交实名认证
export const isReName = (data) => fetch('/h5/center/submitRealName',data);
//提交信息之前操作getRealName
export const getRealName = () => fetch('/h5/center/getRealName');
//forget
export const forget = (data) => fetch("/h5/forgetPasswd",data);
//查询地址信息/h5/center/getAllAreaList
export const getAllAreaList = () => fetch('/h5/center/getAllAreaList');
// person
export const getPersonData = () => fetch("/h5/center/indexUserInfo");
//用户资料详情
export const getPersonDetails = () => fetch("/h5/center/userInfomation");
//修改用户资料
export const upDateInfo = (data) => fetch('/h5/center/updateUserInfomation',data)

export const changeUserName = (data) => fetch("/h5/center/updateUserName",data);

//message
//我的消息接口/h5/center/myMsgList
export const getMessage = (data) => fetch("/h5/center/myMsgListAndUpdateIsRead",data);
//关于我们getOneArticle
export const getOneArticle =(data) =>fetch('/h5/index/getOneArticle',data);
//integral
export const getIntegralData = (data) => fetch("/h5/center/integralDetailedList",data);
// exchange
export const exChange = (data) => fetch("/h5/center/exchangeIntegral",data);
//capitalDetails
export const getCapitalDetailsData = (data) => fetch("/h5/center/tradeRecord",data);
//discount
export const getDiscount = () => fetch("/h5/center/rechargeActivityList");



//充值/h5/center/rechargeMoney
export const rechargeMoney = (tradeAmt) => fetch('/pc/fypay/rechargeAppFySave',{
	tradeAmt:tradeAmt
});
//提现withdrawAppFySave
export const withdrawAppFySave =(withdrawMoney) => fetch('/pc/fypay/withdrawAppFySave',{
    withdrawMoney:withdrawMoney
});
//card
//绑卡List
export const getCardData = () => fetch("/h5/center/myBankCardList");
//银行列表list
export const getBankCode = () => fetch("/h5/center/toBandCard");
//绑卡提交
export const addCard = (data) => fetch("/h5/center/bandCardSubmit",data);
//删除银行卡
export const delCard = (data) => fetch("/h5/center/delBandCard",data);

//withdraw
export const withdraw = (data) => fetch("/h5/center/withdrawSubmit",data);
//reCharge
export const reCharge = (data) => fetch("/app/gcpay/fetchPayOrder",data);
// share 
export const getShareMsg = () => fetch("/h5/getInviteCode");

//开户/h5/getFyProvinceAreaList   /h5/getFyAreaList /h5/getFyBankList /h5/getBranchBankList /h5/openAccountSubmit
///h5/center/isOpenAccount   /h5/openAccountInfomation

export const getFyProvinceAreaList = () => fetch('/h5/getFyProvinceAreaList');
export const getFyAreaList = (data) =>fetch('/h5/getFyAreaList',data);
export const getFyBankList = () => fetch('/h5/getFyBankList');
export const getBranchBankList =(data) =>fetch('/h5/getBranchBankList',data);
export const openAccountSubmit = (data) =>fetch('/h5/openAccountSubmit',data);
export const isOpenAccount = () =>fetch('/h5/center/isOpenAccount');
export const openAccountInfomation = () =>fetch('/h5/openAccountInfomation')