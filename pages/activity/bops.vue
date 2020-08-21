<template>
	<view class="box" :style="'background-image: url('+imgUrl+img+')'" @click.self="tocaigou">
		<view class="border">
			<view class="flexs1">
				<image class="border_image" src="../../static/image/0000.png" mode="" @click="back"></image>
				<view class="border_text">{{title}}</view>
			</view>
		</view>
		<view class="btns flexs" @click="tocaigou">
			<image src="../../static/image/0003.png" ></image>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				id: '',
				imgUrl: this.$common.baseUrl,
				img: '',
				title: '线上购买'
			}
		},
		onLoad(options) {
			this.id = options.id;
			this._getactivitydetail();
			if (this.id == 1) {
				this.title = '线上购买';
			} else {
				this.title = '线上购买';
			}
		},
		methods: {
			_getactivitydetail() {
				let obj = {
					giftshop_id: this.id
				}
				this.$common.requests('/api/giftshop/get_content', obj).then(res => {
					if (res.data.code == 1) {
						// console.log(res.data.data)
						// console.log(this.id)
						this.img = res.data.data.detail_image
					} else {
						console.log(res.data.msg)
						this.$api.msg(res.data.msg);
					}
				})
			},
			tocaigou() {
				uni.navigateTo({
					url: "../activity/xianshangcai?id=" + this.id
				})
			},
			onBackPress(e) {
				if (e.from == 'backbutton') {
					uni.navigateTo({
						url: 'activity'
					})
					return true
				}
				if (e.from == 'navigateBack') {
					uni.navigateTo({
						url: 'activity'
					})
					return true
				}
			},
			back() {
				uni.navigateTo({
					url:'activity'
				})
			},
		}
	}
</script>

<style class="less">
	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.box {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	/* border */
	.border {
		width: 100%;
		height: 80rpx;
		padding: 30rpx 20rpx;
	}

	.border_image {
		width: 32rpx;
		height: 32rpx;
		margin-left: 30rpx;
	}

	.border_text {
		width: 400rpx;
		line-height: 100rpx;
		text-align: center;
		font-size: 38rpx;
		color: #FCFFFC;
		letter-spacing: 8rpx;
		margin-left: 17%;
	}

	.center {
		width: 80%;
		margin: 56% 10% 0 10%;
		letter-spacing: 4rpx;
	}

	.center {
		text-align: center;
		font-size: 34rpx;
		font-weight: 500;
	}

	.center_center {
		font-size: 30rpx;
		color: #696969;
		margin-top: 20rpx;
	}

	.button {
		width: 290rpx;
		height: 86rpx;
		position: absolute;
		bottom: 50rpx;
		left: 29%;
	}

	.btns {
		width: 100%;
		height: 100rpx;
		position: absolute;
		bottom: 200rpx;
	}

	.btns image {
		width: 300rpx;
		height: 90rpx
	}
</style>
