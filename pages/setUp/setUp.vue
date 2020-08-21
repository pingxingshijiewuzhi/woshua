<template>
	<view class="content">

		<view class="list flexs2" @click="goReal">
			<view class='list_l'>个人信息</view>
			<view class='list_r flexs2'>
				<view></view>
				<image class="top_next" src="../../static/pic/btn_psdz_xyb@2x.png"></image>
			</view>
		</view>
		<view class="list flexs2" @click="goPhone">
			<view class='list_l'>修改登录密码</view>
			<view class='list_r list_new flexs2'>
				<view></view>
				<image class="top_next" src="../../static/pic/btn_psdz_xyb@2x.png"></image>
			</view>
		</view>
		<view class="list flexs2" @click="goSetPay">
			<view class='list_l'>设置支付密码</view>
			<view class='list_r list_new flexs2'>
				<view></view>
				<image class="top_next" src="../../static/pic/btn_psdz_xyb@2x.png"></image>
			</view>
		</view>
		<!-- <view class="list flexs2" @click="goResetSetPay">
			<view class='list_l'>重置支付密码</view>
			<view class='list_r list_new flexs2'>
				<view></view>
				<image class="top_next" src="../../static/pic/btn_psdz_xyb@2x.png"></image>
			</view>
		</view> -->
		<view class="list flexs2" @click="goAddress">
			<view class='list_l'>我的地址</view>
			<view class='list_r list_new flexs2'>
				<view></view>
				<image class="top_next" src="../../static/pic/btn_psdz_xyb@2x.png"></image>
			</view>
		</view>
		<view class="list flexs2" @click="clearCache()">
			<view class='list_l'>清除缓存</view>
			<view class='list_r list_new flexs2'>
				<view></view>
				<image class="top_next" src="../../static/pic/btn_psdz_xyb@2x.png"></image>
			</view>
		</view>
		<view class="btns" @click="logout">退出登录</view>
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
			clearCache() {
				this.$api.msg('清除缓存成功');
			},
			logout() {
				this.$common.requests('/api/user/logout').then(res => {
					if (res.data.code == 1) {
						uni.removeStorageSync('uid');
						uni.removeStorageSync('token');
						uni.removeStorageSync('userinfo');
						// uni.removeStorageSync('account')
						// uni.removeStorageSync('password')
						this.$api.msg(res.data.msg);
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}, 1500);
					}
				})
			},
			goReal() {
				uni.navigateTo({
					url: "../personal/infomation"
				})
			},
			goPhone() {
				uni.navigateTo({
					url: "setPassword"
				})
			},
			goCode() {
				uni.navigateTo({
					url: "code"
				})
			},
			goSetPay() {
				uni.navigateTo({
					url: "setPay"
				})
			},
			goAddress() {
				uni.navigateTo({
					url: "../myIntegral/site"
				})
			},
			// goResetSetPay(){
			// 	uni.navigateTo({
			// 		url:'resetPay'
			// 	})
			// }
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.content {
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
	}


	.top_next {
		width: 16rpx;
		height: 26rpx
	}

	.list {
		width: 100%;
		height: 10%;
		border-bottom: 1px solid #E5E5E5;
		padding: 26rpx
	}

	.list_r {
		width: 24%;
	}

	.list_new {
		width: 28%;
	}

	.list_img {
		width: 50rpx;
		height: 50rpx
	}

	.btns {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #5A7EF8;
		color: #FFFFFF;
		text-align: center;
		position: fixed;
		bottom: 0
	}
</style>
