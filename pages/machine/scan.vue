<template>
	<view class="box">
		<view class="border flexs1">
			<image class="border_image" src="../../static/image/0000.png" mode="" @click="back"></image>
			<view class="border_text ">扫一扫</view>
		</view>
		<view class="title">请对准机具条形码</view>
		<view class="touming">

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
			this.saoyisao()
		},
		methods: {
			saoyisao() {
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
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
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
		background-image: url(../../static/image/008.png);
		background-size: 100% 100%;
	}
	/* border */
	.border {
		width: 100%;
		height: 120rpx;
		padding: 30rpx 30rpx 0 30rpx;
	}
	.border_image {
		width: 40rpx;
		height: 30rpx;
	}
	.border_text {
		width: 120rpx;
		font-size: 38rpx;
		color: #FCFFFC;
		margin: 0 auto;
	}
	.title {
		color: #FFFFFF;
		text-align: center;
		margin-top: 180rpx;
	}

	.touming {
		width: 80%;
		height: 260rpx;
		margin: 30rpx 10% 0 10%;
		background-color: rgba(216, 216, 218, .18);
	}
</style>
