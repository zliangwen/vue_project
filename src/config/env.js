/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 * 
 */

let baseUrl = ''; 
let routerMode = 'hash';
let imgBaseUrl;


// if (process.env.NODE_ENV == 'development') {
//   imgBaseUrl = 'http://192.168.6.81:8089';

// }else if(process.env.NODE_ENV == 'production'){
	//baseUrl = "http://192.168.6.47:9980"
	//baseUrl="http://192.168.6.85:9095"//何欢
	//baseUrl = "http://192.168.6.88:8090"//葛龙洲
	baseUrl = "http://192.168.6.89:8300"

// }

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
}