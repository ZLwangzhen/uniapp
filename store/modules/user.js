import {
	setToken,
	removeToken
} from '@/utils/auth'
import router, {
	resetRouter
} from '@/router'

const state = {
	token: '',
	name: '',
	nickName: '',
	avatar: '',
	introduction: '',
	roles: [],
	roleIds: [],
	sid: '', // 学校Id
	oid: '', // 组织机构Id，学校，学院，企业，部门等
	userInfo: {},
	listMajor: [],
	baseMajorIds: '',
	userType: ''
}

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_INTRODUCTION: (state, introduction) => {
		state.introduction = introduction
	},
	SET_NAME: (state, name) => {
		state.name = name
	},
	SET_NICKNAME: (state, nickName) => {
		state.nickName = nickName
	},
	SET_AVATAR: (state, avatar) => {
		state.avatar = avatar
	},
	SET_ROLES: (state, roles) => {
		state.roles = roles
	},
	SET_ROLEIDS: (state, roleIds) => {
		state.roleIds = roleIds
	},
	SET_SID: (state, sid) => {
		state.sid = sid
	},
	SET_OID: (state, oid) => {
		state.oid = oid
	},
	SET_USERID: (state, userId) => {
		state.userId = userId
	},
	SET_USERTYPE: (state, userType) => {
		state.userType = userType
	},
	SET_VALUE(state, params) {
		state[params.key] = params.value
	}
}

const actions = {
	// get user info
	getInfo({
		commit
	}, info) {
		const {
			userId,
			name,
			access_token,
			Email,
			Id,
			NickName,
			Phone,
			Role,
			SId,
			UserName,
			UserType
		} = info
		commit('SET_USERID', userId)
		commit('SET_NAME', name)
		commit('SET_TOKEN', access_token)
		commit('SET_SID', SId)
		commit('SET_NAME', UserName)
		commit('SET_NICKNAME', NickName)
		commit('SET_USERID', Id)
		commit('SET_USERTYPE', UserType)
		// if (roleObj && roleObj.length > 0) {
		// 	var roleIdList = roleObj.map(m => {
		// 		return m.Id
		// 	})
		// 	var roleCodeList = roleObj.map(m => {
		// 		return m.Code
		// 	})
		// 	commit('SET_ROLEIDS', roleIdList)
		// 	commit('SET_ROLES', roleCodeList)

		// }
	},

	// user logout
	logout({
		commit,
		state
	}) {
		commit('SET_TOKEN', '')
		commit('SET_ROLES', [])
		commit('SET_ROLEIDS', [])
		commit('SET_SID', '')
		commit('SET_OID', '')
		commit('SET_USERID', '')
		removeToken()
		resetRouter()

		userMgr.signOut()
	},

	// remove token
	resetToken({
		commit
	}) {
		return new Promise(resolve => {
			commit('SET_TOKEN', '')
			commit('SET_ROLES', [])
			commit('SET_SID', '')
			commit('SET_USERID', '')
			removeToken()
			resolve()
		})
	},


}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
