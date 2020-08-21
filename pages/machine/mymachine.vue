<template>
	<view class='myrobot'>
		<view class="mytabbar">
			<view class="mytabbar_top flexs2">
				<image class="mytabbar_image" @click="back" src="../../static/image/0000.png" mode=""></image>
				<view class="mytabbar_text">我的机具</view>
				<view class=" mytabbar_right" @click='flowrecode'>流动记录</view>
			</view>
			<view class='searchbox'>
				<image src="../../static/pic/search.png" mode="" class='searchimg' @click="search_by_num()"></image>
				<input class='myinput' type="text" @input="input_change()" v-model="pos_num" placeholder-style='color:#ffffff;font-size:28rpx;letter-spacing:4rpx;'
				 placeholder="请输入机身编码">
				<image src="../../static/pic/saoyisao.png" mode="" class='saoyisao' @click="toshaomiao"></image>
			</view>
		</view>
		<view class='content_topbox'>
			<view class='activatetabbar'>
				<view class='activate_item' :class="{'avtive':currentIndex == 0}" @click='clickbtn(0)'>未激活({{pos_list.nohuo_num}})</view>
				<view class='activate_item' :class="{'avtive':currentIndex == 1}" @click='clickbtn(1)'>已激活({{pos_list.jihuo_num}})</view>
			</view>
			<view class='topbox_right'>
				<view @click="changOrder()">
					<image class='mysortimg' src="../../static/pic/up_hui.png" mode="" v-show="order == 1"></image>
					<image class='mysortimg' src="../../static/pic/004.png" mode="" v-show="order == 0"></image>
					<image class='mysortimg' src="../../static/pic/down_lan.png" mode="" v-show="order == 1"></image>
					<image class='mysortimg' src="../../static/pic/005.png" mode="" v-show="order == 0"></image>
				</view>
				<image @tap="showModal" data-target="DialogModal1" src="../../static/pic/sort.png" mode=""></image>
			</view>
		</view>
		<view class='orderbox_content new_size'>
			<view class='topbox_left'>机身编号</view>
			<view>操作</view>
		</view>
		<scroll-view scroll-y="true" class='bigcontent_box' @scrolltolower='onpullresh' :refresher-triggered="triggered"
		 refresher-enabled='true' @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="stoprefresh"
		 :refresher-threshold="50" refresher-background="#f7f7f7">
			<block v-for='(item,index) in pos_list.list' :key='index'>
				<view class='orderbox_content'>
					<view class='topbox_left'>
						<view class='bianmaqian'>{{item.qian}}</view>
						<view class='addyellow'>{{item.hou}}</view>
						<view class='copybox' @click='copymachine(item.num)'>复制</view>
						<view class='nocopybox'></view>
					</view>
					<view class="right_box">
						<!-- <image class='addnum' src="../../static/pic/jia.png" mode=""></image> -->
						<!-- <view class='convertent' @click="tohuanji">换机</view> -->
						<!-- <view class='convertent'>解绑</view> -->
						<view class='convertent' v-if="item.send_status == 1 && !item.checked" @click='xiafachoose(item.id,index,item)'>下发</view>
						<view class='guycolor' v-if="item.send_status == 1 && item.checked" @click='canclexiafa(item.id,index,item)'>取消</view>
					</view>
				</view>
			</block>
			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</scroll-view>

		<view class='bottom_box'>
			<view class='abbox' :class="{'backcolor':choosenum>0}">{{choosenum}}</view>
			<view class='bottom_box_left' @click='allchoose'>批量选中</view>
			<view class='bottom_box_rightcolor' @click='xiafa' v-if='chooseid.length != 0'>下发</view>
			<view class='bottom_box_right' @click='noxiafa' v-else>下发</view>
		</view>

		<!--   @tap="showJiebang" data-target="DialogModal1" -->
		<!-- 那里单击显示这个弹框 -->
		<!--弹框 -->
		<!-- <view  class='masking'  v-show="jieabngmodify"  @click='hideJiebang'></view>
			<view class='bigbox'  v-show="jieabngmodify" :class="jieabngmodify=='DialogModal1'?'show':''">
				<view class="mytitle">提示</view>
				<view class='myentrue'>确认解绑该机具吗？</view>
				<view class="bottombtn flexs1">
					<view class="action_left" @tap="hideJiebang">取消</view>
					<view class="action_right" @tap="hideJiebang">确定</view>
				</view>
			</view> -->

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
					 placeholder="起始机身编号后六位" maxlength="20">
					<image src="../../static/pic/sortsaoyisao.png" mode="" class='sortsaoyisao' @click='startcamera'></image>
				</view>
				<view class='sortinputview'>
					<input class='sortinput' type="text" v-model="endnum" placeholder-style='color:#595959;font-size:28rpx;letter-spacing:2rpx;'
					 placeholder="终末机身编号后六位" maxlength="20">
					<image src="../../static/pic/sortsaoyisao.png" mode="" class='sortsaoyisao' @click='startcamera'></image>
				</view>
			<!-- 	<view class='jishen'>标签</view>
				<view class='markcontent'>
					<view class="border_list" v-for="(item,index) in list" :key="index" @click="select_type(item.type)">{{item.type}}</view>
				</view> -->
			</view>
			<view class='finishbox' @click='finishbtn'>完成</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:'',
				showcolor: true,
				modalName: null,
				jieabngmodify: null,
				currentIndex: 0,
				list: [], //这里是所有的机具类型,也就是筛选里面的标签
				jihuo_page: 1, //激活页码
				nohuo_page: 1, //未激活页码
				limit: 10000000,
				is_jihuo: 1, //1未激活,2=已激活
				order: 1, //1 为倒叙,0为正序
				startnum: '', //	开始的机具码
				endnum: '', //结束的机具码
				machinetype: '', //类型标签
				pos_list: [],
				pos_num: '', //指定搜索的机具码
				// 接收页码
				page: '',
				lisize: 0,
				loadMoreText: "加载中...",
				showLoadMore: false,

				// 置顶选中下发机具id
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
			// this.get_tools();
			this.machinetype = option.type
		},
		onShow() {
			this.get_my_num();
			this.freshing = false;
			setTimeout(() => {
				this.triggered = true;
			}, 1000)

			this.chooseid = []
			this.serialArray = []
			// 全部选中状态清空
			if (this.pos_list.list) {
				for (var i = 0; i < this.pos_list.list.length; i++) {
					this.pos_list.list[i].checked = false
				}
			}
			this.choosenum = this.chooseid.length
		},
		methods: {
			// 上拉触底刷新
			onpullresh() {
				console.log('上拉触底')
				this.showLoadMore = true
				setTimeout(() => {
					//获取数据
					if (this.lisize == 10) {
						if (this.currentIndex == 0) {
							//未激活页面
							this.jihuo_page++;
							this.get_tools();
						} else {
							//激活页面
							this.nohuo_page++;
							this.get_tools();
						}
					} else {
						this.loadMoreText = "暂无更多";
						this.showLoadMore = false;
					}
				}, 1000);
			},

			// 自定义下拉触发
			onRefresh() {
				console.log('下拉刷新触发')
				this.jihuo_page = 1
				this.nohuo_page = 1
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
			// 复制机具码
			copymachine(machinenumber){
				uni.setClipboardData({
					data:machinenumber,
					success: () => {
						uni.showToast({
							title: '复制成功'
						})
					}
				})
			},
			
			// 筛选重置
			resetbtn() {
				this.machinetype = ''
				this.startnum = ''
				this.endnum = ''
			},
			select_type(type) {
				this.machinetype = type
			},
			input_change() {
				if (this.pos_num == '') {
					this.pos_list = [];
					this.get_tools();
				}
			},
			search_by_num() {
				this.pos_list = [];
				this.get_tools();
			},
			// 完成发送请求
			finishbtn() {
				if (this.currentIndex == 0) {
					//未激活页面
					this.jihuo_page = 1;
					this.pos_list = [];
					this.get_tools();
					this.modalName = null
				} else {
					//激活页面
					this.nohuo_page = 1;
					this.pos_list = [];
					this.get_tools();
					this.modalName = null
				}
				// 当请求数据完成置空数据
				this.resetbtn()
			},
			changOrder() {
				if (this.order == 1) {
					this.order = 0;
					if (this.currentIndex == 0) {
						//未激活页面
						this.jihuo_page = 1;
						this.pos_list = [];
						this.get_tools();
					} else {
						//激活页面
						this.nohuo_page = 1;
						this.pos_list = [];
						this.get_tools();
					}
				} else {
					this.order = 1;
					if (this.currentIndex == 0) {
						//未激活页面
						this.jihuo_page = 1;
						this.pos_list = [];
						this.get_tools();
					} else {
						//激活页面
						this.nohuo_page = 1;
						this.pos_list = [];
						this.get_tools();
					}
				}
			},
			get_tools() {
				if (this.currentIndex == 0) {
					this.page = this.jihuo_page
				} else {
					this.page = this.nohuo_page
				}
				var obj = {
					page: this.page,
					limit: this.limit,
					is_jihuo: this.is_jihuo,
					order: this.order,
					start: this.startnum,
					end: this.endnum,
					type: this.machinetype,
					pos_num: this.pos_num
				}
				this.$common.requests('/api/pos/get_pos_list', obj).then(res => {
					this.showLoadMore = false;
					if (res.data.code == 1) {
						this.lisize = res.data.data.list.length
						if (this.lisize == 0 && this.pos_list) {
							this.$api.msg('暂无数据')
							// return
						}
						if (this.page == 1) {
							this.pos_list = res.data.data
							console.log(res.data.data)
						} else {
							// console.log(res.data.data.list.length,'合并前长度')
							this.pos_list.list = this.pos_list.list.concat(res.data.data.list)
							// console.log(this.pos_list.list.length,'合并后长度')
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
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			toshaomiao() {
				this.startcamera()
				// uni.navigateTo({
				// 	url:"../machine/scan"
				// })
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
			tohuanji() {
				uni.navigateTo({
					url: "../machine/huanji"
				})
			},
			clickbtn(index) {
				this.currentIndex = index
				if (index == 0) {
					this.is_jihuo = 1;
					this.nohuo_page = 1;
				} else {
					this.is_jihuo = 2;
					this.jihuo_page = 1;
				}
				this.pos_list = [];
				this.get_tools();
			},
			// 流动记录
			flowrecode() {
				uni.navigateTo({
					url: '../flowrecode/flowrecode'
				})
			},
			// 删选模态框
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},

			// 解绑该机具弹框
			showJiebang(e) {
				this.jieabngmodify = e.currentTarget.dataset.target
			},
			hideJiebang(e) {
				this.jieabngmodify = null
			},
			// 选中下发
			xiafachoose(id, index, obj) {
				this.chooseid.push(id)
				this.pos_list.list[index].checked = true
				this.serialArray.push(obj)
				console.log(this.chooseid,6666)
				this.choosenum++;
			},
			// 全选或者全不选
			allchoose() {
				var lengths = this.pos_list.list.length
				if (this.choosenum == 0) {
					for (var i = 0; i < lengths; i++) {
						if (this.pos_list.list[i].send_status == 1) {
							this.chooseid.push(this.pos_list.list[i].id)
							this.pos_list.list[i].checked = true
							this.serialArray.push(this.pos_list.list[i])
						}
					}
					this.choosenum = this.chooseid.length
				} else {
					for (var i = 0; i < lengths; i++) {
						this.chooseid = []
						this.serialArray = []
						this.pos_list.list[i].checked = false
					}
					this.choosenum = 0
				}
			},
			// 批量下发
			noxiafa() {
				this.$api.msg('请先批量选择')
			},
			// 取消下发
			canclexiafa(id, index) {
				this.pos_list.list[index].checked = false
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
			// 下发
			xiafa() {
				console.log(this.chooseid,'全选已选中')
				let mydeid = JSON.stringify(this.chooseid)
				let myserialArray = JSON.stringify(this.serialArray)
				uni.navigateTo({
					url: '../organization/xiafa?alid=' + mydeid + '&serialArray=' + myserialArray
				})
			},
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

	.myrobot {
		width: 100vw;
		height: 100vh;
		background-color: #F2F2F2;
		position: relative;
	}

	/* mytabbar */
	.mytabbar {
		width: 100%;
		height: 250rpx;
		background-color: #5A7EF8;
		padding: 30rpx 20rpx;
		padding-top: 60rpx;
	}

	.mytabbar_image {
		width: 40rpx;
		height: 34rpx;
	}

	.mytabbar_text {
		font-size: 36rpx;
		font-weight: 400;
		color: #FCFFFC;
	}

	.mytabbar_right {
		font-size: 28rpx;
		color: #DDE9F4;
	}

	.mytabbar_top {
		width: 100%;
		height: 100rpx;
	}

	.searchbox {
		margin: 0 auto;
		width: 690rpx;
		height: 60rpx;
		background-color: #8CA4FA;
		border-radius: 50rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 40rpx;
	}

	.myinput {
		height: 100%;
		margin-left: 20rpx;
		width: 540rpx;
		/* border:1rpx solid red; */
		color: #FFFFFF;
	}

	/* input::-webkit-input-placeholder { color: red;}
	 input:-moz-placeholder { color: red;}
	 input:-ms-input-placeholder { color: red;}​ */
	.searchimg,
	.saoyisao {
		width: 30rpx;
		height: 30rpx;
	}

	.bigcontent_box {
		/* 最顶部高, 导航栏高,底部悬浮高   机身操作高度*/
		/* 250rpx  100rpx;  120rpx 90rpx*/
		height: calc(100vh - 560rpx);
		background-color: #FFFFFF;
		/* border:1rpx solid red; */
	}

	.content_topbox {
		width: 100%;
		padding: 0 30rpx;
		height: 90rpx;
		background-color: #FFFFFF;
		margin-bottom: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.activatetabbar {
		width: 410rpx;
		height: 90rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.activate_item {
		width: 160rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		font-weight: 600;
	}

	.avtive {
		color: #587FF6;
		border-bottom: 1rpx solid #587FF6;
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
		width: 450rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.topbox_right {
		width: 90rpx;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.topbox_right>view {
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

	.convertent {
		width: 80rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		background-color: #5B7DF8;
		color: #FFFFFF;
		margin-left: 40rpx;
	}

	/* 灰色 */
	.guycolor {
		width: 80rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		background-color: #E5E5E5;
		color: #FFFFFF;
		margin-left: 40rpx;
	}

	.mysortimg {
		width: 12rpx;
		height: 28rpx;
	}

	.topbox_right>image {
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
		width: 100rpx;
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

	/* 下发高亮 */
	.bottom_box_rightcolor {
		height: 100rpx;
		line-height: 100rpx;
		width: 25%;
		text-align: center;
		background-color: #5B7DF8;
		color: #FFFFFF;
	}

	.bottom_box_right {
		height: 100rpx;
		line-height: 100rpx;
		width: 25%;
		text-align: center;
		background-color: #D4D4D4;
		color: #FFFFFF;
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

	.markcontent {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
	}

	.markcontent>view {
		background-color: #F2F2F2;
		margin-right: 20rpx;
		padding: 10rpx 20rpx;
	}

	/* 解绑改机具 */
	.bigbox {
		width: 690rpx;
		height: 320rpx;
		background-color: #FFFFFF;
		border-radius: 40rpx;
		position: fixed;
		top: 50%;
		left: 50%;
		letter-spacing: 4rpx;
		transform: translate(-50%, -50%);
	}

	.mytitle {
		width: 100%;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		color: #5B7DF8;
		font-size: 30rpx;
	}

	.myentrue {
		height: 90rpx;
		line-height: 90rpx;
		width: 100%;
		text-align: center;
		color: #9A9A9A;
	}

	.bottombtn {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 70rpx;
		border-top: 1rpx solid #E5E5E5;
	}

	.action_left {
		height: 70rpx;
		line-height: 70rpx;
		width: 50%;
		text-align: center;
		border-bottom-left-radius: 40rpx;
	}

	.action_right {
		text-align: center;
		line-height: 70rpx;
		height: 70rpx;
		width: 50%;
		background-color: #FFFFFF;
		color: #5A7EF8;
		border-left: 1rpx solid #E5E5E5;
		border-top: 1rpx solid #E5E5E5;
		border-bottom-right-radius: 40rpx;
	}
	.backcolor{
		background-color: #5A7EF8;
		color:#FFFFFF;
	}
</style>
