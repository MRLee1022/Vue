import qs from 'qs'
import axios from 'axios';

axios.defaults.timeout = 5000;
axios.defaults.baseURL ='';
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";

axios.interceptors.request.use(config => {
	return config
},err=>{

	return Promise.reject(error);
});



axios.interceptors.response.use(response => {
	let data;
    if(response.data == undefined){
        data = response.request.responseText
    } else{
        data = response.data
    }
	return response;
},err=>{
	if(err && err.response){
		switch(err.response.status){
			case 400:err.message = "请求错误";break;
			case 401:err.message = "未授权，请登录";break;
			case 403:err.message = "拒绝访问";break;
			case 404:err.message = `请求地址出错: ${err.response.config.url}`;break;
			case 408:err.message = "请求超时";break;
			case 500:err.message = "服务器内部错误";break;
			case 501:err.message = "服务未实现";break;
			case 502:err.message = "网关错误";break;
			case 503:err.message = "服务不可用";break;
			case 504:err.message = "网关超时";break;
			case 505:err.message = "HTTP版本不受支持";break;
			default:err.message = `连接错误${err.response.status}`;
		}
	}else{
			err.mssage = "连接到服务器失败"
	}
	return Promise.reject(error);
});




export default {
	post(url, data) {
		return new Promise((resolve, reject) => {
			axios({
                method: 'post',
                url,
                data: qs.stringify(data),
			}).then(response =>{

			},err=>{

			})
		})
	},
	postByJSON(url, data) {
		return new Promise((resolve, reject) => {
			axios({
                method: 'post',
                url,
                data,
                header:{
                    'Content-Type':'application/JSON'
                }
			}).then(response =>{
				resolve(response.data);
			},err=>{
				reject(err);
			})
		})	
	},

	get(url,data) {
		return new Promise((resolve, reject) => {
			axios({
                method: 'get',
                url,
                params,
			}).then(response =>{
				resolve(response.data);
			},err=>{
				reject(err);
			})
		})
	},
	upload(url, formData) {
		return new Promise((resolve, reject) => {
			axios({
                method: 'post',
                url,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData,
			}).then(response =>{
				resolve(response.data);
			},err=>{
				reject(err);
			})
		})
	},
	put(url, data) {
		return new Promise((resolve, reject) => {
			axios({
                method: 'put',
                url,
                data: qs.stringify(data),
			}).then(response =>{
				resolve(response.data);
			},err=>{
				reject(err);
			})
		})	
	},
	delete(url, data) {
		return new Promise((resolve, reject) => {
			axios({
                method: 'delete',
                url,
                data: qs.stringify(data),
			}).then(response =>{
				resolve(response.data);
			},err=>{
				reject(err);
			})
		})	
	},
}