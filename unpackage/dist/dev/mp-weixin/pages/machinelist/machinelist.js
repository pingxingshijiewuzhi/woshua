(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/machinelist/machinelist"],{

/***/ 255:
/*!****************************************************************************************!*\
  !*** D:/wangzichi/woshua/woBrush/main.js?{"page":"pages%2Fmachinelist%2Fmachinelist"} ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _machinelist = _interopRequireDefault(__webpack_require__(/*! ./pages/machinelist/machinelist.vue */ 256));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_machinelist.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 256:
/*!*********************************************************************!*\
  !*** D:/wangzichi/woshua/woBrush/pages/machinelist/machinelist.vue ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _machinelist_vue_vue_type_template_id_1b64c3d2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./machinelist.vue?vue&type=template&id=1b64c3d2& */ 257);
/* harmony import */ var _machinelist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./machinelist.vue?vue&type=script&lang=js& */ 259);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _machinelist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _machinelist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _machinelist_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./machinelist.vue?vue&type=style&index=0&lang=css& */ 261);
/* harmony import */ var _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 10);

var renderjs





/* normalize component */

var component = Object(_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _machinelist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _machinelist_vue_vue_type_template_id_1b64c3d2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _machinelist_vue_vue_type_template_id_1b64c3d2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _machinelist_vue_vue_type_template_id_1b64c3d2___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/machinelist/machinelist.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 257:
/*!****************************************************************************************************!*\
  !*** D:/wangzichi/woshua/woBrush/pages/machinelist/machinelist.vue?vue&type=template&id=1b64c3d2& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_machinelist_vue_vue_type_template_id_1b64c3d2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./machinelist.vue?vue&type=template&id=1b64c3d2& */ 258);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_machinelist_vue_vue_type_template_id_1b64c3d2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_machinelist_vue_vue_type_template_id_1b64c3d2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_machinelist_vue_vue_type_template_id_1b64c3d2___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_machinelist_vue_vue_type_template_id_1b64c3d2___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 258:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/wangzichi/woshua/woBrush/pages/machinelist/machinelist.vue?vue&type=template&id=1b64c3d2& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 259:
/*!**********************************************************************************************!*\
  !*** D:/wangzichi/woshua/woBrush/pages/machinelist/machinelist.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_machinelist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./machinelist.vue?vue&type=script&lang=js& */ 260);
/* harmony import */ var _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_machinelist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_machinelist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_machinelist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_machinelist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_machinelist_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 260:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/wangzichi/woshua/woBrush/pages/machinelist/machinelist.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var passkeyborad = function passkeyborad() {__webpack_require__.e(/*! require.ensure | components/yzc-paykeyboard/yzc-paykeyboard */ "components/yzc-paykeyboard/yzc-paykeyboard").then((function () {return resolve(__webpack_require__(/*! @/components/yzc-paykeyboard/yzc-paykeyboard.vue */ 1093));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var _default =



















































































































{
  components: {
    passkeyborad: passkeyborad },

  data: function data() {
    return {
      // 钱包余额
      blance: '',
      // 购买订单id
      buyorderid: '',
      // 密码弹框组件显示状态
      showStatus: false,
      // 支付金额
      realymoney: '200',

      // 默认选中支付类型
      currentIndex: 0,
      // 支付类型选择弹框
      paymodal: null,

      type: '',
      showcolor: true,
      modalName: null,
      list: [], //这里是所有的机具类型,也就是筛选里面的标签

      limit: 10000000,
      order: 1, //1 为倒叙,0为正序
      startnum: '', //	开始的机具码
      endnum: '', //结束的机具码
      machinetype: '', //类型标签
      pos_list: [],
      // 接收页码
      page: 1,
      lisize: 0,
      loadMoreText: "加载中...",
      showLoadMore: false,

      // 置顶选中购买机具id
      chooseid: [],
      serialArray: [],
      // 选中个数
      choosenum: 0,


      // 下拉按钮状态显示与否
      triggered: false,
      // 下拉按钮防抖
      freshing: '' };

  },
  onLoad: function onLoad(option) {
    // 这类型选择需要吗？
    this.machinetype = option.type;
  },
  onShow: function onShow() {var _this = this;
    this._getblance();
    this.get_my_num();
    this.freshing = false;
    setTimeout(function () {
      _this.triggered = true;
    }, 1000);

    this.chooseid = [];
    this.serialArray = [];
    // 全部选中状态清空
    if (this.pos_list) {
      for (var i = 0; i < this.pos_list.length; i++) {
        this.pos_list[i].checked = false;
      }
    }
    this.choosenum = this.chooseid.length;
  },
  methods: {
    // 获取余额
    _getblance: function _getblance() {var _this2 = this;
      this.$common.requests('/api/user/get_settlement').then(function (res) {
        console.log(res.data.data, 888);
        _this2.blance = res.data.data;
      });

    },
    // 上拉触底刷新
    onpullresh: function onpullresh() {var _this3 = this;
      console.log('上拉触底');
      this.showLoadMore = true;
      setTimeout(function () {
        //获取数据
        if (_this3.lisize == 10) {
          _this3.page++;
          _this3.get_tools();

        } else {
          _this3.loadMoreText = "暂无更多";
          _this3.showLoadMore = false;
        }
      }, 1000);
    },

    // 自定义下拉触发
    onRefresh: function onRefresh() {var _this4 = this;
      console.log('下拉刷新触发');
      this.page = 1;
      this.pos_list = [];
      this.get_tools();

      if (this.freshing) return;
      this.freshing = true;
      setTimeout(function () {
        _this4.triggered = false;
        _this4.freshing = false;
      }, 1000);
    },
    onRestore: function onRestore() {
      this.triggered = 'restore'; // 需要重置
      console.log("onRestore");
    },
    stoprefresh: function stoprefresh() {

    },

    // 筛选重置
    resetbtn: function resetbtn() {
      this.startnum = '';
      this.endnum = '';
    },
    // 完成筛选重新发送请求
    finishbtn: function finishbtn() {
      this.pos_list = [];
      this.get_tools();
      this.modalName = null;
      // 当请求数据完成置空数据
      this.resetbtn();
    },
    changOrder: function changOrder() {
      if (this.order == 1) {
        this.order = 0;
        this.pos_list = [];
        this.get_tools();

      } else {
        this.order = 1;
        this.pos_list = [];
        this.get_tools();
      }
    },
    get_tools: function get_tools() {var _this5 = this;
      var obj = {
        page: this.page,
        limit: this.limit,
        order: this.order,
        start: this.startnum,
        end: this.endnum,
        type: this.machinetype };

      this.$common.requests('/api/Organization/get_Organization_pos_list', obj).then(function (res) {
        _this5.showLoadMore = false;
        if (res.data.code == 1) {
          _this5.lisize = res.data.data.length;
          if (_this5.lisize == 0 && _this5.pos_list == []) {
            _this5.$api.msg('采购系统繁忙,请通过平台客服进行购买');
            // return
          }
          if (_this5.page == 1) {
            _this5.pos_list = res.data.data;
          } else {
            // console.log(res.data.data.length,'合并前长度')
            _this5.pos_list = _this5.pos_list.concat(res.data.data);
            // console.log(this.pos_list.length,'合并后长度')
          }
          // uni.stopPullDownRefresh();
        } else {
          _this5.$api.msg(res.data.msg);
        }
      });
    },
    get_my_num: function get_my_num() {var _this6 = this;
      this.$common.requests('/api/pos/get_my_pos_num').then(function (res) {
        if (res.data.code == 1) {
          _this6.list = res.data.data;
        } else {
          _this6.$api.msg(res.data.msg);
        }
      });
    },
    // 开启相机扫描
    startcamera: function startcamera() {
      var that = this;
      console.log('启动相机吗?');
      uni.scanCode({
        success: function success(res) {
          var inarr = JSON.parse(res.result);
          console.log(inarr, '数值进来');
          if (inarr.ty == 1) {

          } else if (inarr.ty == 2) {

          } else if (inarr.ty == 3 && inarr.paytn == 1) {

          } else if (inarr.ty == 3 && inarr.paytn == 2) {

          }

        } });

    },
    // 筛选模态框
    showModal: function showModal(e) {
      this.modalName = e.currentTarget.dataset.target;
    },
    hideModal: function hideModal(e) {
      this.modalName = null;
    },
    // 选中购买
    xiafachoose: function xiafachoose(id, index, obj) {
      this.chooseid.push(id);
      this.pos_list[index].checked = true;
      this.serialArray.push(obj);
      console.log(this.chooseid, 6666);
      this.choosenum++;
    },
    // 全选或者全不选
    allchoose: function allchoose() {
      var lengths = this.pos_list.length;
      if (this.choosenum == 0) {
        for (var i = 0; i < lengths; i++) {
          this.chooseid.push(this.pos_list[i].id);
          this.pos_list[i].checked = true;
          this.serialArray.push(this.pos_list[i]);
        }
        this.choosenum = this.chooseid.length;
      } else {
        for (var i = 0; i < lengths; i++) {
          this.chooseid = [];
          this.serialArray = [];
          this.pos_list[i].checked = false;
        }
        this.choosenum = 0;
      }
    },
    // 批量购买
    nobuymachine: function nobuymachine() {
      // this.$api.msg('请先批量选择')
      this.$api.msg('请选择机具');
    },
    // 取消购买
    canclexiafa: function canclexiafa(id, index) {
      this.pos_list[index].checked = false;
      // 遍历已选择的id数组
      var mylength = this.chooseid.length;
      for (var i = 0; i < mylength; i++) {
        if (this.chooseid[i] == id) {
          this.chooseid.splice(i, 1);
        }
      }
      // 遍历已存的对象
      for (var i = 0; i < this.serialArray.length; i++) {
        if (this.serialArray[i].id == id) {
          this.serialArray.splice(i, 1);
        }
      }
      this.choosenum--;
      console.log(this.chooseid, '删除机具结束');
    },
    // 购买1.先生成订单 2.打开支付弹框
    buymachine: function buymachine(e) {var _this7 = this;
      // console.log(this.chooseid,55555)
      var obj = {
        pos_ids: this.chooseid,
        pos_type: this.machinetype };

      this.$common.requests('/api/Organization/setorganization_order', obj).then(function (res) {
        if (res.data.code == 1) {
          _this7.buyorderid = res.data.data;
          // 弹出支付选择
          _this7.paymodal = e.currentTarget.dataset.target;
        } else {
          // console.log(res)
          _this7.$api.msg(res.data.msg);
        }
      });
    },
    // 隐藏支付选择
    hidepayModal: function hidepayModal() {
      this.paymodal = null;
    },
    // 选择支付类型
    choosetype: function choosetype(index) {
      if (index == this.currentIndex) {
        this.currentIndex = 200;
        return;
      }
      this.currentIndex = index;
    },
    // 支付选择隐藏并弹出密码弹框
    gopay: function gopay() {var _this8 = this;
      this.paymodal = null;
      if (this.currentIndex == 1) {
        var myobj = {
          order_id: this.buyorderid,
          // 1=礼包活动订单,2=机构中心采购订单
          order_type: 2 };

        this.$common.requests('/addons/epay/index/experience', myobj).then(function (res) {
          console.log(res.data, '后台返回数据');
          // 微信支付
          uni.requestPayment({
            provider: 'wxpay',
            orderInfo: JSON.stringify(res.data), //微信、支付宝订单数据
            success: function success(res) {
              console.log('success:' + JSON.stringify(res));
            },
            fail: function fail(err) {
              console.log('fail:' + JSON.stringify(err));
            } });


        });
        console.log('微信支付');
        return;
      }
      //判断是否设置支付密码
      this.$common.requests('/api/user/judge_pay_password').then(function (res) {
        console.log(res);
        if (res.data.code == 0 && _this8.currentIndex == 0) {
          _this8.$api.msg('请先设置支付密码');
          setTimeout(function () {
            uni.navigateTo({
              url: '../setUp/setPay' });

          }, 1000);
        } else {
          _this8.showStatus = true;
        }
      });
    },
    close: function close() {
      this.showStatus = false;
    },
    //点击确定支付
    makesure: function makesure(e) {var _this9 = this;
      var that = this;
      // console.log(e)

      var obj = {
        order_id: this.buyorderid,
        pay_pwd: e };

      this.$common.requests('/api/Organization/buy_organization_pos', obj).then(function (res) {
        // 付款成功重新刷新页面
        if (res.data.code == 1) {
          _this9.$api.msg(res.data.msg);
          // 关闭支付密码框
          _this9.showStatus = false;
          // 支付成功也要清空密码
          _this9.$refs.passkeyborad.resetinit();
          // 把已选择this.chooseid清空
          _this9.chooseid = [];
          _this9.choosenum = _this9.chooseid.length;
          that.get_tools();
        } else {
          _this9.$api.msg(res.data.msg);
          _this9.$refs.passkeyborad.resetinit();
        }
        // console.log(res)
      });
    },
    // 跳转重置密码
    resetpassword: function resetpassword() {
      uni.navigateTo({
        url: '../setUp/resetPay' });

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 261:
/*!******************************************************************************************************!*\
  !*** D:/wangzichi/woshua/woBrush/pages/machinelist/machinelist.vue?vue&type=style&index=0&lang=css& ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_machinelist_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./machinelist.vue?vue&type=style&index=0&lang=css& */ 262);
/* harmony import */ var _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_machinelist_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_machinelist_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_machinelist_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_machinelist_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_C_Users_Administrator_Desktop_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_machinelist_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 262:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/wangzichi/woshua/woBrush/pages/machinelist/machinelist.vue?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[255,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/machinelist/machinelist.js.map