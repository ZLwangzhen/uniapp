import {
	url_config,
	chat_config,
	user_config
} from '../config.js'

import {
	getToken,
	getRefreshToken,
	getUserInfo,
	setToken,
	setRefreshToken,
	removeRefreshToken,
	removeToken
} from './auth.js'

import qs from 'qs'

import store from '@/store/index.js'
import router from '@/router/index.js'
import {
	createLogger
} from 'vuex'

let request_url = ''
const http = (params) => {
	if (params.url.startsWith('/connect')) {
		request_url = user_config
	} else if (params.url.startsWith('/PostResume') || params.url.startsWith('/JobManage') || params.url.startsWith(
		'/ResumeManage') || params.url.startsWith('/BO') || params.url.startsWith('/ContentData') || params.url.startsWith(
			'/Dialog') || params.url.startsWith('/Message')) {
		request_url = chat_config
	} else {
		request_url = url_config
	}
	//返回promise 对象
	return new Promise((resolve, reject) => {
		console.log('请求信息', params);

		uni.request({
			// 服务器url+参数中携带的接口具体地址
			url: request_url + params.url,
			// 请求参数
			data: params.data,
			// 设置后端需要的常用的格式就好，特殊情况调用的时候单独设置
			header: params.header || {
				"Content-Type": "application/json;charset=utf-8",
				"Authorization": 'Bearer ' + getToken()
			},
			method: params.method && params.method.toUpperCase() || 'POST', //默认为POST请求
			dataType: 'json', //返回的数据格式,默认为JSON，特殊格式可以在调用的时候传入参数
			success: res => {
				console.log('请求成功', res);
				// 接口访问正常返回数据
				if (res.statusCode == 200) {
					//1. 操作成功返回数据
					resolve(res.data)
				}
				//token过期
				else if (res.statusCode == 401) {

					console.log('token过期', res);
					checkStatus(params).then(res => {
						console.log('检查状态返回的数据', res);
						resolve(res)
					})
				} else if (res.statusCode == 400) {

					console.log('账号密码错误', res);
					uni.showToast({
						icon: 'none',
						title: res.data.error_description,
						duration: 3000
					})
					store.dispatch('user/resetToken')
				} else {

					console.log(res);
					uni.showToast({
						icon: "none",
						title: '请求出错' + res.data.Message,
						duration: 3000
					})
					resolve(res.data)
				}
			},
			fail: function (e) {
				console.log('请求失败', e);
				if (e.errMsg === "request:fail timeout") {
					uni.showToast({
						icon: "none",
						title: "网络连接超时,请稍后重试"
					})
				}
				// router.push({
				// 	name: 'login'
				// })
				reject(e)
				setTimeout(() => {
					uni.hideLoading();
				}, 1500)
			}
		})
	})
}



// 缓存
let subscribers = [];

function onAccessTokenFetched() {
	subscribers.forEach((callback) => {
		callback()
	})
	subscribers = [];
}

function addSubscriber(callback) {
	subscribers.push(callback)
}
let isRefreshing = true;

function checkStatus(params) {
	if (isRefreshing) {
		referToken()
	}
	isRefreshing = false;
	const retryOriginalRequest = new Promise((resolve) => {
		addSubscriber(() => {
			if (params.header && params.header.Authorization) {
				params.header.Authorization = "Bearer " + getToken()
			}

			resolve(http(params))
		})
	});
	return retryOriginalRequest;
}

//token刷新函数
function referToken() {
	if (getRefreshToken()) {
		store.dispatch('user/login', getUserInfo())
			.then(() => {
				onAccessTokenFetched()
				//延迟几秒再将刷新token的开关放开，不然偶尔还是会重复提交刷新token的请求
				setTimeout(() => {
					isRefreshing = true
				}, 3000)
			})
			.catch(err => {

				removeToken()
				removeRefreshToken()
				router.push({
					name: 'login'
				})
				console.log('刷新token失败', err);
			})
	} else {
		router.push({
			name: 'login'
		})
	}
}

export default http
