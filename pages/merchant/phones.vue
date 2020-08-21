<template>
	<view class="box">
		<view class="border">
			<view class="flexs2">
				<image class="border_image" src="../../static/image/btn_h_fanhui@2x.png" mode="" @click="back"></image>
				<view class="border_text">我的商户</view>
				<view class="border_right" @click="todengdai"></view>
			</view>
		</view>
		<view class="center flexs2">
			<view class="flexs1">
				<view class="center_l">
					<view class=" center_cen flexs2">
						<view class="center_name">{{merchantuserobj.merchantName}}</view>
						<view class="center_mpos">{{merchantuserobj.productCode}}</view>
					</view>
					<!-- <image class="center_image" src="../../static/image/img_wdsh_toxiang@2x.png" mode=""></image> -->
					<view class="times flexs2">
						<view class="center_time">入网时间</view>
						<view class="center_times">{{merchantuserobj.inNetTime}}</view>
					</view>
				</view>

			</view>
			<view class="center_r ">
				<view class=" center_images flexs1">
					<!-- <image class="center_phone" src="../../static/image/icon_shxq_h_dh@2x.png" mode=""></image> -->
					<!-- <image class="center_duan" src="../../static/image/icon_shxq_h_dx@2x.png" mode=""></image> -->
				</view>
			</view>
		</view>
		<view class="tabar flexs1">
			<view @click='clickbtn(1)' class='tabar_l flexs' :class="{'tabar_r':currentIndex==1}">他/她的设备</view>
			<view @click='clickbtn(2)' class='tabar_l flexs' :class="{'tabar_r':currentIndex==2}">他/她的交易</view>
		</view>
		<view class="tabar_center" v-show="currentIndex==1">
			<view class="tabar_left">刷脸支付</view>
			<view class="tabar_bottoms">
				<view class="">设备编号：{{merchantuserobj.posSerialNumber}}</view>
				<view class="">激活时间：{{merchantuserobj.jihuo_time}}</view>
			</view>
		</view>
		<view class="tabar_center" v-show="currentIndex==2">
			<view class="tabar_lefts tabar_bgc flexs1">
				<view class="tabar_start ">
					<view class="start_l">{{merchantuserobj.money}}</view>
					<view class="">本月交易额(元)</view>
				</view>
				<view class="tabar_border"></view>
				<view class="tabar_start ">
					<view class="start_l">{{merchantuserobj.money_count}}</view>
					<view class="start_r">累计交易额(元)</view>
				</view>
			</view>
			<view class="tabar_left pa_l">本月交易明细</view>
			<view class="tabar_bottom">
				<view class="flexs2" v-for="(item,index) in merchantuserobj.monthlist" :key="index">
					<view class="unificationitem">{{item.name}}</view>
					<view class="">{{item.value}}</view>
					<view class="unifyitem" @click="showmingxi">
						{{item.num}}
					</view>
				</view>
			</view>
		</view>
		<view v-if='showmoreStatus' class='morebox'>
			<view class='head_time'>
				<view>单笔明细</view>
				<view>     </view>
				<image src="../../static/close.png" mode="" @click='closemore'></image>
			</view>
			<scroll-view class='content_time' scroll-y="true" 
			:refresher-threshold="50" refresher-background="#f7f7f7"
			 refresher-enabled='true' @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="stoprefresh"
			 @scrolltolower='onpullresh' :refresher-triggered="triggered">
				<block v-for='(item,index) in transaction_list' :key='index'>
					<view class="moretime flexs2"  @click='godetail(item.id)'>
						<view class='flexs2'>
							<view class='bianmaqian'>{{item.tradeTime}}</view>
							<view >{{item.payWay}}</view>
						</view>
						<view class="btnstyle">{{item.tradeAmount}}元</view>
					</view>
				</block>
				<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				showmoreStatus:false,
				currentIndex: 1,
				posSerialNumber: '',
				merchantuserobj: {},
				id: '',
				
				
				loadMoreText: "加载中...",
				showLoadMore: false,
				// 接收交易明细列表
				transaction_list:[],
				lisize:0,
				page:1,
				limit:10,
				// 下拉按钮状态显示与否
				triggered: false,
				// 下拉按钮防抖
				freshing: '',
			}
		},
		onLoad(option) {
			this.posSerialNumber = option.posSerialNumber
			this._getmerchantdetail()
			// 我默认打开请求,不打开看详细我请求干啥
			// this._getdetail()
		},
		onShow() {
			
		},
		methods: {
			// 上拉触底刷新
			onpullresh() {
				console.log('上拉触底')
				this.showLoadMore = true
				setTimeout(() => {
					//获取数据
					if (this.lisize == 10) {
							//未激活页面
							this.page++;
							this._getdetail();
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
				this.transaction_list = []
				this._getdetail();
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
			// 展示交易明细列表
			showmingxi(){
				this.showmoreStatus = !this.showmoreStatus;
				this.freshing = false;
				setTimeout(() => {
					this.triggered = true;
				}, 1000)
			},
			// 获取交易明细列表
			_getdetail(){
				let obj = {
					posSerialNumber: this.posSerialNumber,
					page:this.page,
					limit:this.limit
				}
				this.$common.requests('/api/shops/getDetailPayList', obj).then(res => {
					this.showLoadMore = false;
					if (res.data.code == 1) {
					// console.log(res.data.data.transaction_list,'获取数据')
						this.lisize = res.data.data.transaction_list.length
						if(this.page ==1){
							this.transaction_list = res.data.data.transaction_list
						}else{
							this.transaction_list = this.transaction_list.concat(res.data.data.transaction_list)
						}
					}
				})
			},
			closemore(){
				this.showmoreStatus = false;
			},
			_getmerchantdetail() {
				let obj = {
					posSerialNumber: this.posSerialNumber
				}
				this.$common.requests('/api/shops/get_shops_detail', obj).then(res => {
					if (res.data.code == 1) {
						console.log(res.data.data)
						this.merchantuserobj = res.data.data
						this.id = res.data.data.id
					} else {
						console.log(res.data.msg)
						this.$api.msg(res.data.msg);
					}
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			clickbtn(index) {
				this.currentIndex = index
				console.log(index)
				return
			},
			todengdai() {
				uni.navigateTo({
					url: '../merchant/zhuanyi?id=' + this.id
				})
			},
			// 商户交易详情
			godetail(id){
				uni.navigateTo({
					url:'../transaction/transaction?id='+id
				})
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.box {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}

	/* border */
	.border {
		width: 100%;
		line-height: 100rpx;
		color: #3D3D3D;
		padding: 40rpx 20rpx 0 20rpx;
		background-color: #FFFFFF;
		border-bottom: solid 1rpx #F2F2F2;
	}

	.border_image {
		width: 40rpx;
		height: 30rpx;
	}

	.border_text {
		font-size: 32rpx;
		letter-spacing: 8rpx;
		margin-left: 34rpx;
		font-weight: 600;
	}

	.border_right {
		font-size: 30rpx;
	}

	.border_top {
		width: 94%;
		height: 100rpx;
	}

	.center {
		width: 100%;
		height: 200rpx;
		background-color: #FFFFFF;
	}

	.center_image {
		width: 110rpx;
		height: 110rpx;
		margin-bottom: 20rpx;
	}

	.center_phone {
		width: 32rpx;
		height: 30rpx;
	}

	.center_duan {
		width: 38rpx;
		height: 38rpx;
		margin-left: 50rpx;
	}

	.center_cen {
		width: 260rpx;
		height: 120rpx;
	}

	.center_l {
		margin-left: 30rpx;
		overflow: hidden;
	}

	.center_name {
		font-size: 30rpx;
		font-weight: 500;
		margin-right: 20rpx;
	}

	.center_mpos {
		width: 140rpx;
		line-height: 42rpx;
		background-color: #5A7EF8;
		border-radius: 10rpx 10rpx;
		color: #FFFFFF;
		text-align: center;
	}

	.center_time {
		width: 180rpx;
		line-height: 50rpx;
		letter-spacing: 2rpx;
		color: #636363;
	}

	.center_times {
		width: 180rpx;
		line-height: 50rpx;
		text-align: right;
		letter-spacing: 2rpx;
		color: #636363;
	}

	.times {
		width: 94vw;
		color: #555555;
		position: relative;
	}

	.tabar {
		width: 100%;
		height: 80rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
	}

	.tabar_l {
		width: 50%;
		line-height: 80rpx;
		color: #555555;
		text-align: center;
		border-bottom: solid 1rpx #FFFFFF;

	}

	.tabar_r {
		width: 50%;
		line-height: 80rpx;
		border-bottom: solid 1rpx #7890EB;
		color: #7890EB;
		text-align: center;
	}

	.tabar_left {
		line-height: 100rpx;
		margin-left: 3%;
		color: #555555;
	}

	.tabar_lefts {
		width: 100%;
		line-height: 100rpx;
		color: #9F9F9F;
	}

	.tabar_bottom {
		width: 94%;
		height: 600rpx;
		overflow-y: scroll;
		margin: 0 3%;
		background-color: #FFFFFF;
		color: #555555;
		padding: 0 30rpx;
		line-height: 66rpx;
		font-size: 30rpx;
	}

	.tabar_bottoms {
		width: 94%;
		height: 190rpx;
		margin: 0 3%;
		background-color: #FFFFFF;
		color: #555555;
		/* padding: 0 30rpx; */
		padding-left:30rpx;
		padding-top: 30rpx;
		line-height: 66rpx;
		font-size: 30rpx;
	}

	.tabar_border {
		border-right: solid 1rpx #F3F3F3;
		height: 110rpx;
	}

	.tabar_start {
		width: 50%;
		line-height: 50rpx;
		text-align: center;
		margin: 30rpx 0;
	}

	.tabar_bgc {
		background-color: #FFFFFF;
	}

	.start_l {
		font-size: 38rpx;
		color: #000000;
	}

	.pa_l {
		padding-left: 30rpx;
	}
	.unificationitem{
		width:150rpx;
		height:auto;
		/* border:1rpx solid red; */
	}
	.unifyitem{
		width:100rpx;
		/* height:auto; */
		height:50rpx;
		line-height: 50rpx;
		border-radius: 10rpx;
		color:#FFFFFF;
		background-color: #7890EB;
		text-align: center;
		border:1rpx solid #EEEEEE; 
	}
	/* 模态框跟过机具 */
	.morebox{
		position: absolute;
		left:0;
		right:0;
		bottom:0;
		height:550rpx;
		/* border:1rpx solid red; */
		overflow: hidden;
		background: #ffffff;
		margin: 0 3%;
	}
	/* 单独给更多机具头部样式 */
	.head_time{
		width: 100%;
		height: 150rpx;
		font-size: 30rpx;
		border-bottom: solid 1rpx #E5E5E5;
		padding: 0 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.head_time image{
		width:30rpx;
		height:30rpx;
	}
	.content_time{
		height:400rpx;
		width:100%;
		/* border:1rpx solid red; */
	}
	.moretime {
		width: 100%;
		height: 100rpx;
		font-size: 30rpx;
		border-bottom: solid 1rpx #E5E5E5;
		padding: 0 20rpx;
	}
	.bianmaqian {
		margin-right: 10rpx;
		line-height: 100rpx;
		height: 100rpx;
	}
	.btnstyle{
		color:#FFFFFF;
		background-color: #7890EB;
		padding: 5rpx 10rpx;
		border-radius: 4rpx;
	}
	.addyellow {
		height: 100rpx;
		line-height: 100rpx;
		/* width:30%; */
		color: #E7A342;
		font-size: 40rpx;
	}
	
	/* 下拉刷新提示 */
	.uni-loadmore {
		text-align: center;
	}
</style>
