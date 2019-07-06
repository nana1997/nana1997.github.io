// 入口文件

// 使用es6的模块化规范,使用import方法引入一个模块
import Vue from 'vue'  // 引入主类库
import App from './App.vue'  // 引入根组件,层级最高的组件
import router from './router'  //引入路由配置文件
import store from './store'  // 引入vuex配置文件
import '@/assets/css/index.scss'


import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper) /* { default global options } */

import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

// 使用mint-ui的组件 
import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);

import Vant from "vant";
import 'vant/lib/index.css';
Vue.use(Vant)


import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
Vue.component("Header", Header)
Vue.component("Footer", Footer)

import Chat from "@/components/Chat.vue"
Vue.component("Chat", Chat)

import { Indicator } from 'mint-ui';

import axios from "axios";
// 将axios添加到Vue上,然后在组件里面使用它的时候,只需要this.$axios
Vue.prototype.$axios = axios;  // this.$axios 指向 axios 


// 配置公共的请求域
const commonUrl = process.env.NODE_ENV == 'development' 
? 'http://192.168.53.82:8888' 
: ''

Vue.prototype.$commonUrl = commonUrl



// 配置axios的请求拦截器
axios.interceptors.request.use(function (config) {
	// 发送请求之前，显示loading
	Indicator.open('加载中...')

	// 给页面上所有的axios请求,添加共同的请求域
	// 如果不加反向代理,就要在这里设置全局的请求域
	config.url = commonUrl + config.url.replace(/\/api/, '')

	// 如果没有请求参数，就给它设置一个默认值，为空对象
	config.data = config.data || {}

	// 再添加一个请求参数，为token
	config.data.token = store.state.token

	return config
}, (error) => {
	return Promise.reject(error)
});

// 配置axios的响应拦截器
axios.interceptors.response.use(function (response) {
	// 接收响应之前，关闭loading
	Indicator.close()

	// 对响应数据做点什么
	return response;
}, function (error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});

Vue.config.productionTip = false

// 实例化
new Vue({
	router,
	store,
	render: h => h(App) // el:'#app'
}).$mount('#app')
