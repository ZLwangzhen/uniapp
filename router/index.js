import Vue from 'vue'
import store from '../store/index.js'
import Router from 'uni-simple-router'

import {
	getToken,
	removeToken,
	removeRefreshToken,
} from '@/utils/auth' // get token from cookie

Vue.use(Router)
//初始化
const router = new Router({
	APP: {
		// holdTabbar: false, 
		loddingPageStyle: () => JSON.parse('{"backgroundColor":"#96DBF3"}'),
		//通过启动页生命钩子绘制加载gif
		loddingPageHook: (view) => {
			view.show();
			view.drawBitmap('/static/wait.gif', {}, {
				top: 'auto',
				left: 'auto',
				width: '200px',
				height: '200px'
			})
		}
	},
	encodeURI: false, //不对参数编码
	mode: 'history',
	scrollBehavior: () => ({
		y: 0
	}),
	// base: myProcess.env.BASE_URL,
	routes: ROUTES
})
const whiteList = ['login']
router.beforeEach(async (to, from, next) => {

	const hasToken = getToken()
	console.log('hasToken:', !!hasToken);
	if (hasToken) {
		// uni.setStorageSync('App-Token','00000000000123456')

		next()
	} else {
		/* has no token*/
		if (whiteList.indexOf(to.name) !== -1) {
			// 白名单路由可以直接进入

			next()
		} else {
			// 没有登录时没有权限的路由的需要跳转到登录
			// uni.reLaunch({
			//     url: 'pages/user/login'
			// })
			console.log('么得token');
			next()
			// next({ path: "/pages/user/login", replace: true });
		}
	}
})

router.afterEach(() => {

})

export default router;
