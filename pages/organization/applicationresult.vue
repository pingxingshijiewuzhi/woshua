<template>
	<view class='applicationresult'>
		<view class="mytabbar">
			<view class="mytabbar_top flexs2">
				<image class="mytabbar_image" @click="back" src="../../static/image/btn_h_fanhui@2x.png" mode=""></image>
				<view class="mytabbar_text">下发</view>
				<view class=" mytabbar_right"></view>
			</view>
		</view>
		<view class="content">
			<image class='myresultimg' src="../../static/image/icon_d_chenggong@2x.png" mode=""></image>
			<view>已成功申请，请耐心等待</view>
			<view>{{second}}秒后自动返回</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				second: 4
			}
		},
		onLoad() {
			this._gettime()
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			_gettime() {
				var that = this
				var timer = setInterval(() => {
					this.second--
					if (this.second == 0) {
						that.back()
						clearInterval(timer)
					}
				}, 1000)
			}
		}
	}
</script>

<style scoped>
	.applicationresult {
		width: 100vw;
		height: 100vh;
		background-color: #F2F2F2;
	}

	/* mytabbar */
	.mytabbar {
		width: 100%;
		height: 120rpx;
		/* background-color:#5A7EF8; */
		background-color: #FFFFFF;
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
		width: 100%;
		padding-top: 100rpx;
	}

	.myresultimg {
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
	}
</style>
