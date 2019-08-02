require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([4],{

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(26);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_b6e2bca0_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(29);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(27)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-b6e2bca0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_template_compiler_index_id_data_v_b6e2bca0_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_2_0_1_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\list\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b6e2bca0", Component.options)
  } else {
    hotAPI.reload("data-v-b6e2bca0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 27:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            list: [],
            value: ""
        };
    },

    methods: {
        listenInput: function listenInput(e) {
            // console.log(e)
            var inputValue = e.target.value;
            this.value = inputValue;
        },
        goSearch: function goSearch() {
            var _this = this;

            // console.log(this)
            var searchInput = this.value;
            if (searchInput === "") {
                this.reqList();
            } else {
                global.mpvue.showLoading({
                    //显示消息提示框  此处是提升用户体验的作用
                    title: "数据加载中",
                    icon: "loading"
                });
                global.mpvue.request({
                    url: "http://47.102.140.68:1903/react/search",
                    method: "POST", //请求方式
                    header: {
                        "content-type": "application/json" // 默认值
                    },
                    data: { title: searchInput },
                    complete: function complete() {
                        //请求结束后隐藏 loading 提示框
                        global.mpvue.hideLoading();
                    },

                    success: function success(res) {
                        // console.log(res)
                        _this.list = res.data.result;
                    }
                });
            }
        },
        goVideo: function goVideo() {
            global.mpvue.navigateTo({
                url: "../video/main"
            });
        },
        goDetail: function goDetail(e) {
            //获取传递的值
            // console.log("e",e)
            global.mpvue.navigateTo({
                //跳转详情页  切记配置app.json文件
                url: "../detail/main?id=" + e //传递参数
            });
        },
        reqList: function reqList() {
            var _this2 = this;

            global.mpvue.showLoading({
                //显示消息提示框  此处是提升用户体验的作用
                title: "数据加载中",
                icon: "loading"
            });
            global.mpvue.request({
                url: "http://47.102.140.68:1903/react/discoverlist",
                method: "POST", //请求方式
                header: {
                    "content-type": "application/json" // 默认值
                },
                complete: function complete() {
                    //请求结束后隐藏 loading 提示框
                    global.mpvue.hideLoading();
                },

                success: function success(res) {
                    // console.log(res);
                    _this2.list = res.data.result;
                }
            });
        }
    },
    onShareAppMessage: function onShareAppMessage(options) {},
    mounted: function mounted() {
        global.mpvue.showShareMenu({
            withShareTicket: true
        });
        this.reqList();
    }
});

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "list"
  }, [_c('view', {
    staticClass: "search"
  }, [_c('input', {
    staticClass: "input",
    attrs: {
      "placeholder": "输入搜索内容...",
      "eventid": '0'
    },
    on: {
      "change": _vm.listenInput
    }
  }), _vm._v(" "), _c('button', {
    staticClass: "button",
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": _vm.goSearch
    }
  }, [_vm._v("搜索")])], 1), _vm._v(" "), _c('div', {
    staticClass: "mv",
    attrs: {
      "eventid": '2'
    },
    on: {
      "click": _vm.goVideo
    }
  }, [_vm._v("\n        点击观看MV放松一下吧!\n    ")]), _vm._v(" "), _c('view', {
    staticClass: "content"
  }, _vm._l((_vm.list), function(item, index) {
    return _c('view', {
      key: index,
      staticClass: "li",
      attrs: {
        "eventid": '3_' + index
      },
      on: {
        "click": function($event) {
          _vm.goDetail(item._id)
        }
      }
    }, [_c('view', {
      staticClass: "img"
    }, [_c('image', {
      staticClass: "image",
      attrs: {
        "src": item.img
      }
    })]), _vm._v(" "), _c('view', {
      staticClass: "h3"
    }, [_vm._v(_vm._s(item.title))]), _vm._v(" "), _c('view', {
      staticClass: "h5"
    }, [_c('text', {
      staticClass: "author"
    }, [_vm._v(_vm._s(item.author))]), _vm._v(" "), _c('text', {
      staticClass: "date"
    }, [_vm._v(_vm._s(item.date))])]), _vm._v(" "), _c('view', {
      staticClass: "p"
    }, [_vm._v(_vm._s(item.state))])])
  }))])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-b6e2bca0", esExports)
  }
}

/***/ })

},[25]);