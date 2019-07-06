// module.exports = {
//       devServer: {
//         open: true,   // 自动打开浏览器
//         proxy:{  // 反向代理 
//             "/api": {
//                 target:"http://192.168.53.82:8888", //实际请求的地址等于target加上/vue
//                 ws:true, //是否开启websocket
//                 changeOrigin: true, //是否开启代理服务
//                 pathRewrite:{// 路径重写
//                     '^/api':'' // 将开头的/api换成空，所以实际的请求地址就变成了target加上你的路由路径
//                 }
//             }
//         }
//     }
// }