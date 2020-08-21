<template>
	<view class="box">
		<view class="border">
			<view class="flexs1">
				<image class="border_image " src="../../static/image/0000.png" mode="" @click="back"></image>
				<view class="border_text">2019刷脸e付代理线上普通采购</view>
			</view>
		</view>
		<view class="center">
			<view class="">1、线上加油包激活达标享受与线下同等奖励。</view>
			<view class="">2、线上加油包由系统自动入库，请在接收到加油包后</view>
			<view class="flexs1">
				<view class="">第一</view>
				<view class=""></view>
			</view>
			<view class="">时间确认机具SN号是否有误，如有问题，请尽快联系</view>
			<view class="flexs1">
				<view class="">客服</view>
				<view class=""></view>
			</view>
			<view class="">3、线上加油包在确认付款后不可取消，请确认无误后下单</view>
			<view class="">4、线上加油包因地域会对快递的时效产生一定的影响，请根据自身情况，合理安排时间。</view>
			<view class="center_top">功能介绍</view>
			<view class="center_bottom" @click="tojiayou">立即加油</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			tojiayou() {
				uni.navigateTo({
					url: "../activity/Package"
				})
			}
		},
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
		background-image: url(../../static/image/bg_cg@2x.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.border {
		width: 100%;
		height: 80rpx;
		padding: 30rpx 20rpx;
	}

	.border_image {
		width: 40rpx;
		height: 30rpx;
		margin-left: 4rpx;
	}

	.border_text {
		width: 400rpx;
		line-height: 110rpx;
		text-align: center;
		font-size: 32rpx;
		color: #FCFFFC;
		margin-left: 15%;
		margin-top: 8rpx;
		font-weight: 500;
	}

	.center {
		width: 90%;
		height: 48%;
		margin: 0 5%;
		background-color: #FFFFFF;
		border-radius: 20rpx 20rpx;
		line-height: 46rpx;
		padding: 56rpx 20rpx;
		font-size: 30rpx;
		position: relative;
		position: absolute;
		bottom: 70rpx;
		font-size: 28rpx;
	}

	.center_top {
		width: 420rpx;
		line-height: 70rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: #5B7FFA;
		position: absolute;
		top: -40rpx;
		left: 18%;
		border-radius: 20rpx 20rpx;
	}

	.center_bottom {
		width: 510rpx;
		line-height: 70rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: #5B7FFA;
		position: absolute;
		bottom: -40rpx;
		left: 13%;
		border-radius: 50rpx 50rpx;
	}
</style>
