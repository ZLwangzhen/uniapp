import request from '@/utils/request.js'


export function GetAllList(data){
	return request({
		url:'/ContentData/GetAllList',
		//为确保兼容性 务必大写
		method:'GET',
		data
	})
}
export function getList(data){
	return request({
		url:'/Dialog/GetList',
		//为确保兼容性 务必大写
		method:'POST',
		data
	})
}