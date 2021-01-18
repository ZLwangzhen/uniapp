// import Cookies from 'js-cookie'
// import myProcess from'../config.js'

// import Mgr from '../services/SecurityService'
const TokenKey = 'App-Token'
const RefreshTokenKey = 'App-Refresh-Token'
const UserKey = 'App-User-Key'


export function setToken(token) {
	return uni.setStorageSync(TokenKey, token)
}
export function getToken() {
	return uni.getStorageSync(TokenKey)
}
export function removeToken() {
	return uni.removeStorageSync(TokenKey)
}


//存储refresh_token
export function setRefreshToken(refresh_token) {
	return uni.setStorageSync(RefreshTokenKey, refresh_token)
}

export function getRefreshToken() {
	return uni.getStorageSync(RefreshTokenKey)
}
export function removeRefreshToken() {
	return uni.removeStorageSync(RefreshTokenKey)
}


export function setUserInfo(userInfo) {
	const userInfoObj = JSON.stringify(userInfo)
	return uni.setStorageSync(UserKey, userInfoObj)
}
export function getUserInfo() {
	return JSON.parse(uni.getStorageSync(UserKey))
}
export function removeUserInfo() {
	return uni.removeStorageSync(UserKey)
}
