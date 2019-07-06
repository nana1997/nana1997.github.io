import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'

/*
	一般情况下,只需要使用state和mutation就可以完成一个小项目的状态管理
	如果在改变参数的时候需要进行异步操作,就会使用action
*/

export default new Vuex.Store({
	// 参数对象,定义每个参数的初始值 //仓库,可以存整个项目所有的参数,及时更新
	state: {
		token: '',
		userInfo: null
	},
	// 定义改变这些参数的函数
	mutations: {
		token(state, data) {
			state.token = data
		},
		userInfo(state, data) {
			state.userInfo = data
		}
	},
	// 分发上面这些状态变更函数,第一个参数是store的上下文对象,可以解构出它的state和commit
	actions: {
		token({ commit }, data) {
			// action提交的是mutation
			commit('token', data)
		},
		myAction({ state, commit }, data) {
			// 这是一个异步操作，用来添加到购物车，需要传入token、商品id和选中商品的数量
			// console.log('myAction',data)
			return axios.post('/cart/cartAdd', {
				token: state.token,
				goodsid: data.goodsid,
				goodsname: data.goodsname,
				goodsprice: data.goodsprice,
				goodsNum: data.goodsNum,
				goodsSize:data.goodsSize,
				goodsColor:data.goodsColor,
				modelImg: data.modelImg
			})
		}
	}
})
