<template>
	<view class="box">
		<view class="border">
			<view class=" list flexs2">
				<view class="">服务商</view>
				<view class="">服务中心</view>
			</view>
			<view class=" list flexs2">
				<view class="">换机原因</view>
				<view class="flexs1">
					<view class="" @click="toxuanzhe">请选择</view>
					<image class="next" src="../../static/image/btn_xyb@2x.png" mode=""></image>
				</view>
			</view>
			<view class="list flexs2">
				<view class="">已选机具编号</view>
				<view class="">2121212121</view>
			</view>
		</view>
		<view class="button flexs1">
			<view class="button_left">数量：1</view>
			<view class="button_right">确定</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			toxuanzhe() {
				uni.navigateTo({
					url: "../machine/result"
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
		background-color: #F2F2F2;
		overflow: hidden;
	}

	.border {
		width: 100%;
		height: 300rpx;
		background-color: #FFFFFF;
		margin-top: 30rpx;
	}

	.list {
		width: 94%;
		height: 100rpx;
		border-bottom: solid 1rpx #E5E5E5;
		margin: 0 3%;
	}

	.button {
		width: 100%;
		line-height: 100rpx;
		position: absolute;
		bottom: 0;
		font-size: 32rpx;
	}

	.button_left {
		width: 80%;
		background-color: #FFFFFF;
		text-align: end;
		padding-right: 40rpx;
	}

	.button_right {
		width: 20%;
		background-color: #5A7EF8;
		color: #FFFFFF;
		text-align: center;
	}

	.next {
		width: 20rpx;
		height: 30rpx;
		margin-left: 30rpx;
	}

	.list:nth-child(3) {
		border: none;
	}
</style>
