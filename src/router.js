// 引入各种类库文件
import Vue from 'vue'
import VueRouter from 'vue-router'

// 0.  模块化编程 全面声明
Vue.use(VueRouter) // 使用路由插件

// 引入各种路由组件
// 1 定义路由组件
import App from './App.vue'
import Home from './views/Home.vue'
import Classify from './views/Classify.vue'
import Detail from './views/Detail.vue'
import Cart from './views/Cart.vue'
import Personal from './views/Personal.vue'
import Search from './views/Search.vue'
import Login from "./views/Login.vue"; //登录
import Register from "./views/Register.vue"; //注册
import Chat from './views/Chat.vue' // 聊天室
import WaitingPay from './views/WaitingPay.vue' //待付款
import WaitingDeliverGoods from './views/WaitingDeliverGoods.vue' // 待发货
import DeliverGoods from './views/DeliverGoods.vue' // 已发货
import Collection from './views/Collection.vue' // 收藏夹
import Address from './views/Address.vue' //地址列表
import AddressEdit from './views/AddressEdit.vue' //地址编辑

// 2 配置routes
const routes = [
	{
		path: '/app',
		name: 'app',
		component: App,
		children: [
			{
				path: "/home",
				name: "home",
				component: Home //首页
			},
			{
				path: '/classify',
				name: 'classify',
				component: Classify //分类
			},
			{
				path: '/detail/:id',
				name: 'detail',
				component: Detail //详情
			},
			{
				path: '/cart',
				name: 'cart',
				component: Cart //购物车
			}, 
			{
				path: '/personal',
				name: 'personal',
				component: Personal //个人中心
			},
			{
				path: '/address',
				name: 'address',
				component: Address //地址
			},
			{
				path:'/search',
				name:'search',
				component:Search
			},
			{
				path:'/chat',
				name:'chat',
				component:Chat //聊天室
			},
			{
				path:'/waitingpay',
				name:'waitingpay',
				component:WaitingPay //待付款
			},
			{
				path:'/waitingDeliverGoods',
				name:'waitingDeliverGoods',
				component:WaitingDeliverGoods //待发货
			},
			{
				path:'/deliverGoods',
				name:'deliverGoods',
				component:DeliverGoods //已发货
			},
			{
				path:'/collection',
				name:'collection',
				component:Collection //收藏夹
			},
			{
				path:'/addressEdit',
				name:'addressEdit',
				component:AddressEdit //地址编辑
			},
			{
				path: "/login",
				name: "login",
				component: Login
			},
			{
				path: "/register",
				name: "register",
				component: Register
			}
		]
	},
	{
		path: "*",
		redirect: { name: "home" }
	}
]

// 3 创建router
const router = new VueRouter({
	routes,
	mode: "hash"
})

// 4 挂载到根实例 模块化,导出就行了.根实例是main.js里面的new Vue
export default router;
