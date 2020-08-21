<template>
	<view class="content">
		<view class="kong"></view>
		<view class="top flexs3">
			<image src="../../static/image/0000.png" @click="back"></image>
			<view class="yao">邀请代理</view>
		</view>
		<view class="box">
			<view class="box_t flexs">
				<view class="box_t_l text-center">
					<image src="../../static/image/img_wdsh_toxiang@2x.png"></image>
					<view class="name text-white">小西柚</view>
					<view class="box_t_b text-white flexs3">
						<image class="" src="../../static/image/icon_wdsh_h_dh@2x.png"></image>
						<view class="">159****7471</view>
					</view>
				</view>
			</view>
			<view class="box_b text-center">
				<image src="../../static/image/img_wdsh_ewm@2x.png"></image>
				<view class="box_b_code">C15789854654</view>
				<view>推荐码</view>
			</view>
		</view>
		<view class="list flexs3">
			<image src="../../static/image/icon_wdsh_h_wx@2x.png"></image>
			<image src="../../static/image/icon_h_wdsh_pyq@2x.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style>
	.content {
		width: 100vw;
		height: 100vh;
		background-image: url(../../static/image/bg_yqhh@2x.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.kong {
		width: 100%;
		height: 50rpx
	}

	.top image {
		width: 38rpx;
		height: 34rpx
	}

	.top {
		width: 65%;
		height: 80rpx;
		color: #FFFFFF;
		font-size: 32rpx;
		font-weight: 700;
		letter-spacing: 4rpx;
	}

	.yao {
		width: 62%;
		text-align: right;
		line-height: 30px
	}

	.box {
		width: 78%;
		height: 62%;
		margin: 40rpx auto;
		background-image: url(../../static/image/bg_yqhb_bk@2x.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.box_t {
		width: 100%;
		height: 30%;
	}

	.box_t_l {
		width: 50%;
		height: 100%;
	}

	.box_t image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 60rpx;
	}

	.name {
		width: 200rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 25rpx;
		text-align: center;
		margin: 6rpx auto;
		background-color: #587FF8;
		letter-spacing: 4rpx;
	}

	.box_t_b {
		width: 92%;
		height: 50rpx;
		margin: 10rpx auto;
		letter-spacing: 4rpx;
	}

	.box_t_b image {
		width: 26rpx;
		height: 30rpx;
	}

	.box_b {
		width: 100%;
		height: 60%;
		margin-top: 40rpx
	}

	.box_b image {
		width: 400rpx;
		height: 350rpx;
		margin-top: 40rpx
	}

	.box_b_code {
		margin: 20rpx 0 10rpx 0;
		letter-spacing: 4rpx;
	}

	.list {
		width: 80%;
		height: 10%;
		margin: 60rpx auto;


	}

	.list image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 60rpx;
	}
</style>
