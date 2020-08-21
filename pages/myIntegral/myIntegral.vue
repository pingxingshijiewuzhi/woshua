<template>
	<view class="box">
		<view class="border">
			<view class="flexs2 new_box">
				<image class="border_image" src="../../static/image/0000.png" mode="" @click="back"></image>
				<view class="border_text">我的积分</view>
				<view class="border_right" @click="tomingxi">明细</view>
			</view>
			<view class="border_center flexs">总可用积分</view>
			<view class="border_number flexs">{{item.all_integral}}</view>
		</view>
		<view class=" barner_box flexs">
			<view class="barner ">积分</view>
		</view>
		<view class="bgc_"></view>
		<view class="deal flexs3 ">
			<view class="deal_left">
				<view class="deal_number">{{item.integral_currency}}</view>
				<view class="deal_text">通用积分</view>
			</view>
			<view class="deal_bgc"></view>
			<view class="">
				<view class="deal_number">{{item.integral_activity}}</view>
				<view class="deal_text">活动积分</view>
			</view>
		</view>
		<view class="button" @click="toduihuan">去兑换</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: '',
			}
		},
		onLoad() {
			this.getdata();
		},
		methods: {
			back() {
				// uni.navigateBack({
				// 	delta: 1
				// })
				uni.switchTab({
					url:'../index/index'
				})
			},
			tomingxi() {
				uni.navigateTo({
					url: "../myIntegral/card"
				})
			},
			toduihuan() {
				uni.navigateTo({
					url: "../myIntegral/procut_fenlei"
				})
			},
			getdata() {
				this.$common.requests('/api/user/get_integral').then(res => {
					if (res.data.code == 1) {
						this.item = res.data.data;
						console.log(this.item)
					} else {
						this.$api.msg(res.data.msg);
					}
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
		background-color: #FFFFFF;
	}

	/* border */
	.border {
		width: 100%;
		height: 300rpx;
		background-image: url(../../static/image/8888.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		padding: 60rpx 30rpx 0 30rpx;
	}

	.new_box {
		width: 97%;
		margin: 0 auto;
	}

	.border_image {
		width: 40rpx;
		height: 30rpx;
	}

	.border_text {
		font-size: 32rpx;
		color: #FCFFFC;
		letter-spacing: 8rpx;
		margin-left: 34rpx;
		font-weight: 600;
	}

	.border_right {
		font-size: 28rpx;
		color: #DDE9F4;
	}

	.border_top {
		width: 94%;
		height: 100rpx;
	}

	.border_center {
		font-size: 26rpx;
		color: #DDE9F4;
		margin-top: 20rpx;
		letter-spacing: 2rpx;
	}

	.border_number {
		color: #FCFFFC;
		font-size: 40rpx;
		margin-top: 30rpx;
		letter-spacing: 2rpx;
	}

	.barner {
		width: 140rpx;
		height: 70rpx;
		font-size: 34rpx;
		margin-left: 20rpx;
		letter-spacing: 4rpx;
		color: #5A7DF6;
		border-bottom: solid 2rpx #5A7DF6;
		text-align: center;
	}

	.barner_box {
		width: 100%;
		height: 100rpx;
	}

	.bgc_ {
		width: 100%;
		height: 30rpx;
		background-color: #F2F2F2;
	}

	.deal_number {
		font-size: 36rpx;
		font-weight: 600;
		letter-spacing: 3rpx;
		margin-top: 36rpx;
	}

	.deal_text {
		color: #BCBCBC;
		margin-top: 20rpx;
		text-align: center;
	}

	.button {
		width: 83%;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		margin: 0 10%;
		background-color: #EAF0FE;
		border: solid 1rpx #99AFFB;
		border-radius: 50rpx 50rpx;
		margin-top: 80rpx;
		font-size: 34rpx;
		font-weight: 500;
	}

	.deal_bgc {
		width: 10rpx;
		height: 100rpx;
		border-right: solid 1rpx #BCBCBC;
		margin-top: 40rpx;
	}
</style>
