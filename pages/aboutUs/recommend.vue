<template>
	<view class="box">
		<!-- <view class="border flexs">
			<view class="border_logo flexs">LOGO</view>
		</view>
		<view class="title flexs">刷脸e付代理</view>
		<view class="center">
		刷脸e付品牌创建于2016年，作为一-款以支付为基础的移动金融终端，旨在整合中国最好的支付。信贷保险旨在整合中国最好的支付
		</view> -->
		<rich-text :nodes="myrecommend"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myrecommend: ''
			}
		},
		onLoad() {
			this._getrecommend()
		},
		methods: {
			_getrecommend() {
				this.$common.requests('/api/about/get_about_understand_partner').then(res => {
					if (res.data.code == 1) {
						this.myrecommend = res.data.data
					} else {
						console.log(res.data.msg)
						this.$api.msg(res.data.msg);
					}
				})
			}
		}
	}
</script>

<style>
	.box {
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
		color: #888888;
		letter-spacing: 2rpx;
		padding: 0 40rpx;
		/* border:1rpx solid red; */
	}

	/* 	.border{
		width: 100%;
		height: 300rpx;
	}
	.border_logo{
		width: 200rpx;
		height: 200rpx;
		border-radius: 20rpx;
		background-color:#F2F2F2;
		color: #333333;
	}
	.title{
		font-size: 34rpx;
		line-height: 100rpx;
	}
	.center{
		width: 100%;
		line-height: 50rpx;
		padding: 0 30rpx;
	} */
</style>
