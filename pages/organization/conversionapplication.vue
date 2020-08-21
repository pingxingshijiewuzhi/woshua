<template>
	<view class='conversionapplication'>
		<view class="mytabbar">
			<view class="mytabbar_top flexs2">
				<image class="mytabbar_image" @click="back" src="../../static/image/0000.png" mode=""></image>
				<view class="mytabbar_text">兑换订单</view>
				<view class=" mytabbar_right"></view>
			</view>
		</view>
		<view class='navtabbar'>
			<view class='basestyle' @click='choose(0)'>
				<view :class="{'active':currentIndex==0}">
					全部
				</view>
			</view>
			<view class='basestyle' @click='choose(1)'>
				<view :class="{'active':currentIndex==1}">
					等待发放
				</view>
			</view>
		</view>
		<block v-for='(item,index) in appealList' :key='index'>
			<view class='mytimetitle'>
				<view class='conversiontime'>
					<view>{{item.createtime}}</view>
				</view>
				<view class='await'>{{item.status_text}}</view>
				<!-- <view class='already'>已完成</view> -->
			</view>
			<view class='converrecodeitem' @click='goconverdetail(item.id)'>
				<view class='item_left'>
					<image :src="$common.baseUrl + item.product_image" mode=""></image>
					<view class='oneprice'>
						<view>{{item.product_name}}</view>
						<view class='mygay'>
							<view class='addcolorandred'>积分{{item.price}}</view>
							<view> /{{item.product_norms}}</view>
						</view>
					</view>
				</view>
				<view class='item_right'>
					× {{item.num}}
				</view>
			</view>
			<view class='applicationperson'>
				<view class='leftbox'>申请人 : {{item.user.nickname}}</view>
				<!-- <view class='rightbox'>合计 : {{Number(item.price) * Number(item.num) + Number(item.yunfei)}}</view> -->
				<view class='rightbox'>合计 : {{item.order_price}}</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0,
				appealList: [], //展示列表
				page_all: 1, //全部列表 页码
				page_app: 1, //等待发放页面 页码
				limit: 10,
				type: 1
			}
		},
		onLoad() {
			this.appealList = [];
			this.currentIndex = 0;
			this.page_all = 1;
			this.getdata();
		},
		onReachBottom() {
			if (this.currentIndex == 0) {
				this.page_all++
			}
			if (this.currentIndex == 1) {
				this.page_app++
			}
			// console.log(99966)
			this.getdata()
		},
		onPullDownRefresh() {
			if (this.currentIndex == 0) {
				this.page_all = 1
			}
			if (this.currentIndex == 1) {
				this.page_app = 1
			}
			this.getdata()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		methods: {
			getdata() {
				if (this.currentIndex == 0) {
					//全部页面进入
					var obj = {
						page: this.page_all,
						limit: this.limit,
						type: this.type,
					}
				} else {
					//等待发货页面进入
					var obj = {
						page: this.page_app,
						limit: this.limit,
						type: this.type,
					}
				}
				this.$common.requests('/api/integral/get_zhuanqu_duihuan', obj).then(res => {
					if (res.data.code == 1) {
						if(this.currentIndex == 0 && this.page_all == 1){
							this.appealList = res.data.data;
							return 
						}
						if(this.currentIndex == 1 && this.page_app == 1){
							this.appealList = res.data.data;
							return 
						}
						this.appealList = this.appealList.concat(res.data.data);
						
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
			choose(index) {
				this.currentIndex = index
				this.appealList = [];
				// 我的兑换申请全部
				if (this.currentIndex == 0) {
					this.type = 1;
					this.page_all = 1;
				}
				// 我的兑换申请等待发放
				if (this.currentIndex == 1) {
					this.type = 2;
					this.page_app = 1;
				}
				this.getdata();
			},
			// 换机兑换申请结果
			goconverdetail(id) {
				uni.navigateTo({
					url: 'converresult?id=' + id
				})
			}
		}
	}
</script>

<style>
	.conversionapplication {
		width: 100vw;
		/* height: 100vh; */
		background-color: #F2F2F2;
	}

	/* mytabbar */
	.mytabbar {
		width: 100%;
		height: 120rpx;
		background-color: #5A7EF8;
		padding: 30rpx 20rpx;
	}

	.mytabbar_image {
		width: 40rpx;
		height: 34rpx;
	}

	.mytabbar_text {
		font-size: 38rpx;
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

	.navtabbar {
		height: 90rpx;
		width: 100%;
		background-color: #FFFFFF;
		display: flex;
		margin-bottom: 30rpx;
	}

	.basestyle {
		/* flex-grow: 1; */
		height: 90rpx;
		width: 50%;
		text-align: center;
		line-height: 90rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.basestyle>view {
		width: 200rpx;
		height: 100%;
	}

	.active {
		color: #5D7DF4;
		border-bottom: 1rpx solid #5D7DF4;
	}


	/* 换机申请流水记录样式 */
	.mytimetitle {
		height: 82rpx;
		background-color: #FFFFFF;
		font-size: 34rpx;
		padding: 0 30rpx;
		border-bottom: 1rpx solid #E5E5E5;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.conversiontime {
		width: 410rpx;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.conversiontime>view {
		letter-spacing: 4rpx;
	}

	.await {
		color: #5882FB;
		width: 180rpx;
		height: 82rpx;
		line-height: 82rpx;
		text-align: end;
	}

	.already {
		color: #25A33F;
		width: 180rpx;
		height: 82rpx;
		line-height: 82rpx;
		text-align: end;
	}

	.converrecodeitem {
		padding: 30rpx 30rpx 20rpx 30rpx;
		background-color: #FFFFFF;
		height: 180rpx;
		border-bottom: 1rpx solid #E5E5E5;
		display: flex;
		justify-content: space-between;
	}

	.item_left {
		height: 130rpx;
		width: 300rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.item_right {
		height: 130rpx;
		padding-top: 90rpx;
	}

	.item_left image {
		width: 126rpx;
		height: 126rpx;
	}

	.oneprice {
		width: 140rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.mygay {
		width: 170rpx;
		display: flex;
	}

	.addcolorandred {
		color: red;
		font-size: 30rpx;
	}

	.applicationperson {
		height: 90rpx;
		width: 100%;
		padding: 0 30rpx;
		justify-content: space-between;
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		margin-bottom: 30rpx;
	}

	.leftbox {
		width: 300rpx;
		height: 90rpx;
		line-height: 90rpx;
	}

	.rightbox {
		width: 300rpx;
		text-align: end;
		height: 90rpx;
		line-height: 90rpx;
	}
</style>
