<template>
	<view class='fafangnewrobot'>
		<view class="mytabbar">
			<view class="mytabbar_top flexs2">
				<image class="mytabbar_image" @click="back" src="../../static/image/btn_h_fanhui@2x.png" mode=""></image>
				<view class="mytabbar_text">发放新机</view>
				<view class=" mytabbar_right"></view>
			</view>
		</view>
		<view class='content'>
			<image class='imgbox' src="../../static/pic/icon_d_cg@2x.png" mode=""></image>
			<view class="mystatus">发放成功</view>
			<view class='goindex' @click='goindex'>返回首页</view>
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
			goindex() {

			}
		}
	}
</script>

<style scoped>
	.fafangnewrobot {
		width: 100vw;
		height: 100vh;
		/* background-color:#F2F2F2; */
		background-color: #FFFFFF;
		position: relative;
	}

	/* mytabbar */
	.mytabbar {
		width: 100%;
		height: 120rpx;
		padding: 30rpx 20rpx;
	}

	.mytabbar_image {
		width: 40rpx;
		height: 34rpx;
	}

	.mytabbar_text {
		font-size: 38rpx;
	}

	.mytabbar_right {
		font-size: 28rpx;
	}

	.mytabbar_top {
		width: 100%;
		height: 100rpx;
	}

	.content {
		height: calc(100vh - 120rpx);
		background-color: #F2F2F2;
		padding-top: 110rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.imgbox {
		width: 170rpx;
		height: 170rpx;
	}

	.mystatus {
		width: 170rpx;
		text-align: center;
		height: 150rpx;
		line-height: 120rpx;
		padding-bottom: 30rpx;
	}

	.goindex {
		width: 300rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: #5A7EF8;
	}
</style>
