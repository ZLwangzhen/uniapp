let url_config = ""
let user_config = ""
let chat_config = ""
import { apiUrl } from './debug-setting.js'
const app_process = {}
//接口地址配置
if (process.env.NODE_ENV === 'development') {
	// 开发环境
	// 资源地址
	url_config = apiUrl
	// 登录地址
	user_config = 'https://user.ve-city.com'
	// chat_config = 'http://192.168.0.119:8089'
	chat_config = 'https://recruit.ve-city.com/prod-api/'
	// chat_config = 'http://192.168.0.118:8085/'
	// chat_config = 'http://192.168.0.114:8089/'
	app_process.VUE_APP_BASE_API = '/dev-api'

} else {
	// 生产环境
	// 资源地址
	url_config = 'http://dev.ic.ve-city.com/prod-api/'
	// 登录地址
	user_config = 'https://user.ve-city.com'
	chat_config = 'https://recruit.ve-city.com/prod-api/'
}

export { url_config, chat_config, user_config, app_process }
