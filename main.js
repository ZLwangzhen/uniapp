import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import Router, {RouterMount} from 'uni-simple-router';
Vue.use(Router)

Vue.config.productionTip = false


App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

const app = new Vue({
    ...App,
	router,
	store,
})

// app.$mount()
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, '#app');
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
