<template>
	<view class='machinelist'>
		<view class='orderbox_content new_size'>
			<view class='topbox_left'>机身编号</view>
			<view class="topbox_cneter">
				<view @click="changOrder()">
					<image class='mysortimg' src="../../static/pic/up_hui.png" mode="" v-show="order == 1"></image>
					<image class='mysortimg' src="../../static/pic/004.png" mode="" v-show="order == 0"></image>
					<image class='mysortimg' src="../../static/pic/down_lan.png" mode="" v-show="order == 1"></image>
					<image class='mysortimg' src="../../static/pic/005.png" mode="" v-show="order == 0"></image>
				</view>
				<image @tap="showModal" data-target="DialogModal1" src="../../static/pic/sort.png" mode=""></image>
			</view>
			<view>操作</view>
		</view>
		<scroll-view scroll-y="true" class='bigcontent_box' @scrolltolower='onpullresh' :refresher-triggered="triggered"
		 @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="stoprefresh"
		 refresher-enabled='true' :refresher-threshold="50" refresher-background="#f7f7f7">
			<block v-for='(item,index) in pos_list' :key='index'>
				<view class='orderbox_content'>
					<view class='topbox_left'>
						<view class='bianmaqian'>{{item.num}}</view>
						<view class='addyellow'>{{item.last_four}}</view>
						<!-- <view class='copybox'>复制</view> -->
						<view class='nocopybox'></view>
					</view>
					<view class="right_box">
						<!-- <view>{{item.checked}}</view> -->
						<view class='convertent' v-if="item.send_status == 1 && !item.checked" @click='xiafachoose(item.id,index,item)'>
							<!-- 下发 -->
							<image src="../../static/icon_choose_nor@2x.png" mode=""></image>
						</view>
						<view class='guycolor' v-if="item.send_status == 1 && item.checked" @click='canclexiafa(item.id,index,item)'>
							<!-- 取消 -->
							<image src="../../static/icon_choose@2x.png" mode=""></image>
						</view>
					</view>
				</view>
			</block>
			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</scroll-view>

		<view class='bottom_box'>
			<view class='abbox'>{{choosenum}}</view>
			<view class='bottom_box_left' @click='allchoose'>批量选中</view>
			<view class='bottom_box_rightcolor' @tap='buymachine' v-if='chooseid.length != 0' data-target="DialogModal">购买</view>
			<view class='bottom_box_right' @click='nobuymachine' v-else>购买</view>
		</view>

		<!-- 模态框1 -->
		<view class="cu-modal" :class="paymodal=='DialogModal'?'show':''">
			<view class="cu-dialog">
				<image class="deleat" src="../../static/image/icon_mm_gb@2x.png" mode="" @tap="hidepayModal"></image>
				<view class="pasword">选择支付方式</view>
				<view class="list flexs2">
					<view class="flexs1">
						<image class="list_image" src="../../static/image/icon_qianbao@2x.png" mode=""></image>
						<view class="pa_l">钱包余额</view>
						<view class='blanceclass'>{{blance}}</view>
					</view>
					<image class="list_yuan" src="../../static/image/0005.png" mode="" v-if='currentIndex==0' @click="choosetype(0)"></image>
					<image class="list_yuan" src="../../static/image/0004.png" mode="" v-else @click="choosetype(0)"></image>
				</view>
				<view class="list flexs2">
					<view class="flexs1">
						<image class="list_image" src="../../static/image/icon_wxzf@2x.png" mode=""></image>
						<view class="pa_l">微信支付</view>
					</view>
					<image class="list_yuan" src="../../static/image/0005.png" mode="" v-if='currentIndex==1' @click="choosetype(1)"></image>
					<image class="list_yuan" src="../../static/image/0004.png" mode="" v-else @click="choosetype(1)"></image>
				</view>
				<!-- <view class="list flexs2">
					<view class="flexs1">
						<image class="list_image" src="../../static/image/icon_zfb@2x.png" mode=""></image>
						<view class="pa_l">支付宝支付</view>
					</view>
					<image class="list_yuan" src="../../static/image/0005.png" mode="" v-if='currentIndex==2' @click="choosetype(2)"></image>
					<image class="list_yuan" src="../../static/image/0004.png" mode="" v-else @click="choosetype(2)"></image>
				</view> -->
				<view class="flexs1">
					<view class="buttons" @tap="gopay" data-target="DialogModal1">立即付款</view>
				</view>
			</view>
		</view>

		<!-- 筛选模态框 -->
		<view class='masking' v-show="modalName" @click='hideModal'></view>
		<view class='sortmodify' v-show="modalName" :class="modalName=='DialogModal1'?'show':''">
			<view class='head'>
				<view></view>
				<view class='myaddfont'>筛选</view>
				<view @click='resetbtn'>重置</view>
			</view>
			<view class='content'>
				<view class='jishen'>机身编号区间</view>
				<view class='sortinputview'>
					<input class='sortinput' type="text" v-model="startnum" placeholder-style='color:#595959;font-size:28rpx;letter-spacing:2rpx;'
					 placeholder="起始机身编号" maxlength="20">
					<image src="../../static/pic/sortsaoyisao.png" mode="" class='sortsaoyisao' @click='startcamera'></image>
				</view>
				<view class='sortinputview'>
					<input class='sortinput' type="text" v-model="endnum" placeholder-style='color:#595959;font-size:28rpx;letter-spacing:2rpx;'
					 placeholder="终末机身编号" maxlength="20">
					<image src="../../static/pic/sortsaoyisao.png" mode="" class='sortsaoyisao' @click='startcamera'></image>
				</view>
			</view>
			<view class='finishbox' @click='finishbtn'>完成</view>
		</view>
		
		<!-- 支付密码 -->
		<passkeyborad ref='passkeyborad' :show="showStatus" @close="close" :money='realymoney' @makesure='makesure' @resetpassword='resetpassword'></passkeyborad>
	</view>
</template>

<script>
	import passkeyborad from '@/components/yzc-paykeyboard/yzc-paykeyboard.vue';
	export default {
		components: {
			passkeyborad,
		},
		data() {
			return {
				// 钱包余额
				blance:'',
				// 购买订单id
				buyorderid:'',
				// 密码弹框组件显示状态
				showStatus:false,
				// 支付金额
				realymoney:'200',
				
				// 默认选中支付类型
				currentIndex:0,
				// 支付类型选择弹框
				paymodal:null,
				
				type:'',
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
				freshing: '',
			}
		},
		onLoad(option) {
			// 这类型选择需要吗？
			this.machinetype = option.type
		},
		onShow() {
			this._getblance()
			this.get_my_num();
			this.freshing = false;
			setTimeout(() => {
				this.triggered = true;
			}, 1000)

			this.chooseid = []
			this.serialArray = []
			// 全部选中状态清空
			if (this.pos_list) {
				for (var i = 0; i < this.pos_list.length; i++) {
					this.pos_list[i].checked = false
				}
			}
			this.choosenum = this.chooseid.length
		},
		methods: {
			// 获取余额
			_getblance(){
				this.$common.requests('/api/user/get_settlement').then(res=>{
					console.log(res.data.data,888)
					this.blance = res.data.data
				})
				
			},
			// 上拉触底刷新
			onpullresh() {
				console.log('上拉触底')
				this.showLoadMore = true
				setTimeout(() => {
					//获取数据
					if (this.lisize == 10) {
							this.page++;
							this.get_tools();
						
					} else {
						this.loadMoreText = "暂无更多";
						this.showLoadMore = false;
					}
				}, 1000);
			},

			// 自定义下拉触发
			onRefresh() {
				console.log('下拉刷新触发')
				this.page = 1
				this.pos_list = []
				this.get_tools()

				if (this.freshing) return;
				this.freshing = true;
				setTimeout(() => {
					this.triggered = false;
					this.freshing = false;
				}, 1000)
			},
			onRestore() {
				this.triggered = 'restore'; // 需要重置
				console.log("onRestore");
			},
			stoprefresh() {

			},

			// 筛选重置
			resetbtn() {
				this.startnum = ''
				this.endnum = ''
			},
			// 完成筛选重新发送请求
			finishbtn() {
				this.pos_list = [];
				this.get_tools();
				this.modalName = null
				// 当请求数据完成置空数据
				this.resetbtn()
			},
			changOrder() {
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
			get_tools() {
				var obj = {
					page: this.page,
					limit: this.limit,
					order: this.order,
					start: this.startnum,
					end: this.endnum,
					type: this.machinetype,
				}
				this.$common.requests('/api/Organization/get_Organization_pos_list', obj).then(res => {
					this.showLoadMore = false;
					if (res.data.code == 1) {
						this.lisize = res.data.data.length
						if (this.lisize == 0 && this.pos_list==[]) {
							this.$api.msg('采购系统繁忙,请通过平台客服进行购买')
							// return
						}
						if (this.page == 1) {
							this.pos_list = res.data.data
						} else {
							// console.log(res.data.data.length,'合并前长度')
							this.pos_list = this.pos_list.concat(res.data.data)
							// console.log(this.pos_list.length,'合并后长度')
						}
						// uni.stopPullDownRefresh();
					} else {
						this.$api.msg(res.data.msg);
					}
				});
			},
			get_my_num() {
				this.$common.requests('/api/pos/get_my_pos_num').then(res => {
					if (res.data.code == 1) {
						this.list = res.data.data;
					} else {
						this.$api.msg(res.data.msg);
					}
				});
			},
			// 开启相机扫描
			startcamera() {
				let that = this;
				console.log('启动相机吗?')
				uni.scanCode({
					success: function(res) {
						let inarr = JSON.parse(res.result);
						console.log(inarr, '数值进来')
						if (inarr.ty == 1) {

						} else if (inarr.ty == 2) {

						} else if (inarr.ty == 3 && inarr.paytn == 1) {

						} else if (inarr.ty == 3 && inarr.paytn == 2) {

						}

					}
				});
			},
			// 筛选模态框
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			// 选中购买
			xiafachoose(id, index, obj) {
				this.chooseid.push(id)
				this.pos_list[index].checked = true
				this.serialArray.push(obj)
				console.log(this.chooseid,6666)
				this.choosenum++;
			},
			// 全选或者全不选
			allchoose() {
				var lengths = this.pos_list.length
				if (this.choosenum == 0) {
					for (var i = 0; i < lengths; i++) {
						this.chooseid.push(this.pos_list[i].id)
						this.pos_list[i].checked = true
						this.serialArray.push(this.pos_list[i])
					}
					this.choosenum = this.chooseid.length
				} else {
					for (var i = 0; i < lengths; i++) {
						this.chooseid = []
						this.serialArray = []
						this.pos_list[i].checked = false
					}
					this.choosenum = 0
				}
			},
			// 批量购买
			nobuymachine() {
				// this.$api.msg('请先批量选择')
				this.$api.msg('请选择机具')
			},
			// 取消购买
			canclexiafa(id, index) {
				this.pos_list[index].checked = false
				// 遍历已选择的id数组
				let mylength = this.chooseid.length
				for (var i = 0; i < mylength; i++) {
					if (this.chooseid[i] == id) {
						this.chooseid.splice(i, 1)
					}
				}
				// 遍历已存的对象
				for (var i = 0; i < this.serialArray.length; i++) {
					if (this.serialArray[i].id == id) {
						this.serialArray.splice(i, 1)
					}
				}
				this.choosenum--;
				console.log(this.chooseid, '删除机具结束')
			},
			// 购买1.先生成订单 2.打开支付弹框
			buymachine(e) {
				// console.log(this.chooseid,55555)
				let obj = {
					pos_ids:this.chooseid,
					pos_type:this.machinetype
				}
				this.$common.requests('/api/Organization/setorganization_order',obj).then(res=>{
					if(res.data.code == 1){
						this.buyorderid = res.data.data
						// 弹出支付选择
						this.paymodal = e.currentTarget.dataset.target
					}else{
					// console.log(res)
					this.$api.msg(res.data.msg)
					}
				})
			},
			// 隐藏支付选择
			hidepayModal(){
				this.paymodal = null
			},
			// 选择支付类型
			choosetype(index){
				if (index == this.currentIndex) {
					this.currentIndex = 200
					return
				}
				this.currentIndex = index
			},
			// 支付选择隐藏并弹出密码弹框
			gopay(){
				this.paymodal = null
				if(this.currentIndex == 1){
					let myobj = {
						order_id:this.buyorderid,
						// 1=礼包活动订单,2=机构中心采购订单
						order_type:2
					}
					this.$common.requests('/addons/epay/index/experience',myobj).then(res=>{
						console.log(res.data,'后台返回数据')
						// 微信支付
						uni.requestPayment({
							provider: 'wxpay',
							orderInfo: JSON.stringify(res.data), //微信、支付宝订单数据
							success: function (res) {
								console.log('success:' + JSON.stringify(res));
							},
							fail: function (err) {
								console.log('fail:' + JSON.stringify(err));
							}
						});
						
					})
					console.log('微信支付')
					return
				}
				//判断是否设置支付密码
				this.$common.requests('/api/user/judge_pay_password').then(res => {
					console.log(res)
					if (res.data.code == 0 && this.currentIndex == 0) {
						this.$api.msg('请先设置支付密码')
						setTimeout(() => {
							uni.navigateTo({
								url: '../setUp/setPay'
							})
						}, 1000)
					} else {
						this.showStatus = true
					}
				})
			},
			close() {
				this.showStatus = false
			},
			//点击确定支付
			makesure(e) {
				var that = this
				// console.log(e)
				
				var obj = {
					order_id:this.buyorderid,
					pay_pwd: e
				}
				this.$common.requests('/api/Organization/buy_organization_pos',obj).then(res=>{
					// 付款成功重新刷新页面
					if(res.data.code == 1){
						this.$api.msg(res.data.msg)
						// 关闭支付密码框
						this.showStatus = false
						// 支付成功也要清空密码
						this.$refs.passkeyborad.resetinit()
						// 把已选择this.chooseid清空
						this.chooseid = []
						this.choosenum = this.chooseid.length
						that.get_tools()
					}else{
						this.$api.msg(res.data.msg)
						this.$refs.passkeyborad.resetinit()
					}
					// console.log(res)
				})
			},
			// 跳转重置密码
			resetpassword(){
				uni.navigateTo({
					url:'../setUp/resetPay'
				})
			}
		}
	}
</script>

<style>
	.uni-loadmore {
		text-align: center;
	}

	.border_list {
		background-color: #F2F2F2;
	}

	.border_list:hover {
		background-color: #5A7EF8;
		color: #FFFFFF;
	}

	.border_lists {
		background-color: #5A7EF8;
	}

	.machinelist {
		width: 100vw;
		height: 100vh;
		background-color: #F2F2F2;
		position: relative;
	}

	.bigcontent_box {
		/* 高,底部悬浮高*/
		/*100rpx 90rpx*/
		height: calc(100vh - 190rpx);
		background-color: #FFFFFF;
		/* border:1rpx solid red; */
	}

	.orderbox_content {
		background-color: #FFFFFF;
		border: 1rpx solid #E5E5E5;
		height: 90rpx;
		padding: 15rpx 0;
		width: 100%;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.new_size {
		font-size: 30rpx;
	}

	.topbox_left {
		width: 420rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.topbox_cneter {
		width: 90rpx;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.topbox_cneter>view {
		/* width:24rpx; */
		width: 34rpx;
		height: 28rpx;
		display: flex;
		justify-content: space-between;
	}

	/* 有换机的样式 */
	.right_box {
		height: 100%;
		width: 180rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	/* 复制下发样式 */
	/* .convertent {
		width: 80rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		background-color: #5B7DF8;
		color: #FFFFFF;
		margin-left: 40rpx;
	} */
	.convertent {
		width:60rpx;
		height:60rpx;
		margin-left: 40rpx;
	}
	.convertent image{
		width: 60rpx;
		height: 60rpx;
		width:100%;
		height:100%;
		border-radius: 50%;
	}
	
	/* 灰色 */
/* 	.guycolor {
		width: 80rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		background-color: #E5E5E5;
		color: #FFFFFF;
		margin-left: 40rpx;
	} */
	.guycolor {
		width:60rpx;
		height:60rpx;
		margin-left: 40rpx;
	}
	.guycolor image{
		width: 60rpx;
		height: 60rpx;
		width:100%;
		height:100%;
		border-radius: 50%;
	}
	
	
	.mysortimg {
		width: 12rpx;
		height: 28rpx;
	}

	.topbox_cneter>image {
		width: 24rpx;
		height: 28rpx;
	}

	.bianmaqian {
		/* width:30%; */
		line-height: 90rpx;
		height: 90rpx;
	}

	.addyellow {
		height: 90rpx;
		line-height: 90rpx;
		/* width:30%; */
		color: #E7A342;
		font-size: 40rpx;
	}

	.copybox {
		border: 1rpx solid #E5E5E5;
		color: #9A9A9A;
		width: 80rpx;
		text-align: center;
		height: 32rpx;
		line-height: 32rpx;
	}

	.nocopybox {
		height: 32rpx;
		width: 80rpx;
	}

	.addnum {
		width: 32rpx;
		height: 32rpx;
	}

	.bottom_box {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		display: flex;
		box-shadow: 0rpx 1rpx 2rpx 1rpx rgba(0, 0, 0, 0.3);
	}

	.abbox {
		height: 84rpx;
		line-height: 84rpx;
		text-align: center;
		width: 84rpx;
		background-color: #FFFFFF;
		position: absolute;
		top: -30rpx;
		left: 30rpx;
		border-radius: 50%;
		box-shadow: 0rpx 0rpx 2rpx 1rpx rgba(0, 0, 0, 0.3);
	}

	.bottom_box_left {
		width: 75%;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #FFFFFF;
		color: #989898;
		padding-right: 20rpx;
		text-align: end;
	}

	/* 购买高亮 */
	.bottom_box_rightcolor {
		height: 100rpx;
		line-height: 100rpx;
		width: 25%;
		text-align: center;
		background-color: #5B7DF8;
		color: #FFFFFF;
		position: absolute;
		top: 0;
		right:0;
	}

	.bottom_box_right {
		height: 100rpx;
		line-height: 100rpx;
		width: 25%;
		text-align: center;
		background-color: #D4D4D4;
		color: #FFFFFF;
		position: absolute;
		top: 0;
		right:0;
	}

	/* 筛选模态框 */
	.masking {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .3);
	}

	.sortmodify {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		height: 100vh;
		width: 80vw;
		background-color: #FFFFFF;
	}

	.finishbox {
		position: fixed;
		bottom: 0;
		right: 0;
		height: 90rpx;
		width: 80vw;
		line-height: 90rpx;
		color: #FFFFFF;
		text-align: center;
		background-color: #5A7EF8;
	}

	.head {
		height: 130rpx;
		width: 100%;
		background-color: #5A7EF8;
		color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.head>view {
		width: 100rpx;
		text-align: center;
	}

	.myaddfont {
		font-size: 36rpx;
	}

	.content {
		height: calc(100vh - 130rpx);
		background-color: #FFFFFF;
		padding: 0 50rpx;
	}

	.jishen {
		height: 210rpx;
		padding-top: 140rpx;
		padding-bottom: 30rpx;
		line-height: 40rpx;
	}

	.sortinputview {
		width: 100%;
		height: 60rpx;
		display: flex;
		justify-content: space-between;
		background-color: #F2F2F2;
		align-items: center;
		margin-bottom: 30rpx;
	}

	.sortinput {
		padding-left: 30rpx;
		height: 100%;
		width: calc(100% - 60rpx);
		/* border:1rpx solid red; */
	}

	.sortsaoyisao {
		width: 30rpx;
		height: 30rpx;
		margin-right: 30rpx;
	}
	/* 筛选模态框 end*/

	
	/* 支付方式选择弹框 */
	.deleat {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		right: 20rpx;
		top: 20rpx;
	}
	
	.pasword {
		font-size: 32rpx;
		margin: 30rpx 0 20rpx 0;
	}
	
	.pa_l {
		padding-left: 40rpx;
		font-size: 32rpx;
	}
	
	.list {
		width: 100%;
		height: 100rpx;
		padding: 0 20rpx;
	}
	
	.list_image {
		width: 40rpx;
		height: 40rpx;
	}
	
	.list_yuan {
		width: 40rpx;
		height: 40rpx;
	}
	
	.box_list {
		width: 80rpx;
		height: 80rpx;
		border: solid 1rpx #E5E5E5;
	}
	
	.text_s {
		font-size: 32rpx;
		color: #656565;
	}
	
	.box_list input {
		margin-top: 16rpx;
		font-size: 34rpx;
	}
	
	.buttons {
		width: 94%;
		line-height: 80rpx;
		text-align: center;
		background-color: #5A7EF8;
		color: #FFFFFF;
		margin: 100rpx 3% 0 3%;
		font-size: 34rpx;
		margin: 20rpx 30rpx 50rpx 30rpx;
	}
	
	.blanceclass{
		width:200rpx;
		height:42rpx;
		line-height: 42rpx;
	}
	/* end */
	
</style>

