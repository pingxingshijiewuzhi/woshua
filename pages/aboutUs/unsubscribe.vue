<template>
	<view class="box">
		<rich-text class="box_text" :nodes="info"></rich-text>
		<!-- <view class="big_border">
			<view class="border">注销当前账号</view>
			<view class="next">将138****2121所绑定的账号注销</view>
			<view class="ran">
				如您注销本账号，则您在刷脸e付代理中留存的信息将被清空且无法找回！具体包括以下信息：
			</view>
		</view>
		<view class=" list mt flexs1">
			<image class="box_image" src="../../static/pic/img_xz@2x.png" mode=""></image>
			<view class="">个人资料，实名认证信息</view>
		</view>
		<view class=" list flexs1">
			<image class="box_image" src="../../static/pic/img_xz@2x.png" mode=""></image>
			<view class="">账户结算款以及奖励金余额</view>
		</view>
		<view class=" list flexs1">
			<image class="box_image" src="../../static/pic/img_xz@2x.png" mode=""></image>
			<view class="">以及您在刷脸e付代理平台保留的其他信息</view>
		</view> -->


		<view class=" button flexs">
			<image class="phone_image" src="../../static/image/icon_wdsh_h_dh@2x.png" mode=""></image>
			<view @click='concantserver'>联系客服注销账户</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: ''
			}
		},
		onLoad() {
			this._unsubscribe()
		},
		methods: {
			_unsubscribe() {
				this.$common.requests('/api/about/get_about_cancellation_account').then(res => {
					if (res.data.code == 1) {
						this.info = res.data.data
						// console.log(this.info)
					} else {
						console.log(res.data.msg)
						this.$api.msg(res.data.msg);
					}
				})
			},
			// 获取客服电话
			concantserver() {
				this.$common.requests('/api/about/get_about_customer_service').then(res => {
					if (res.data.code == 1) {
						// console.log(res.data.data)
						uni.makePhoneCall({
							phoneNumber: res.data.data
						});
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
		overflow: hidden;
		background-color: #FFFFFF;
		letter-spacing: 2rpx;
		font-size: 32rpx;
	}

	.box_text {
		text-indent: 2em;
	}

	/* 	.big_border{
		width: 100%;
		padding: 0 30rpx;
	}
	.border{
		width: 100%;
		line-height: 60rpx;
		margin-top:20rpx;
	}
	.next{
		line-height: 60rpx;
	}
	.ran{
		line-height: 50rpx;
	}
	.box_image{
		width: 36rpx;
		height: 36rpx;
		margin-right: 36rpx;
	}
	.mt{
		padding-top: 60rpx;
	}
	.list{
		line-height: 80rpx;
		margin-left: 50rpx;
	} */



	.phone_image {
		width: 32rpx;
		height: 36rpx;
		margin-right: 20rpx;
		margin-top: -10rpx;
	}

	.button {
		width: 100%;
		line-height: 100rpx;
		background-color: #5A7EF8;
		position: absolute;
		bottom: 0;
		color: #FFFFFF;
	}
</style>
