<template>
	<view class="box">
		<view class="border">
			<image class="border_image" :src="imgUrl+'/assets/img/avatar.png' " mode=""></image>
			<view class="border_center flexs2">
				<view class="">
					<view class="border_last">{{user.product.name}}</view>
					<view class=" flexs1">
						<view class="border_next">￥{{user.product.price}}</view>
						<view class="border_num">/{{user.product.unit}}</view>
					</view>
				</view>
				<view class="">
					<view class="border_ran">喔积分</view>
					<view class="border_rans">通用积分0，积分活动0</view>
				</view>
			</view>
		</view>
		<view class="barner">
			<view class="barner_place flexs">
				<view class="barner_border"></view>
				<view class="barner_puplack">商品简介</view>
				<view class="barner_border"></view>
			</view>
			<view class="barner_big">
				<view class="barner_list mts">刷脸e付智能支付终端</view>
				<view class="barner_list mt">小巧便捷，安全可靠，操作简单</view>
				<view class="barner_list mts">通讯接口：蓝牙</view>
				<view class="barner_list mt">产品型号：ytqwer</view>
				<view class="barner_list mt">制造商：武汉天宇股份有限公司</view>
			</view>
		</view>
		<view class="button" @click="totijiao">立即兑换</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				integral_product_id: '1',
				user: '',
				imgUrl: this.$common.baseUrl,
			}
		},
		onLoad(wallt) {
			this.getdata()
		},
		methods: {
			totijiao() {
				uni.navigateTo({
					url: "../myIntegral/order"
				})
			},
			getdata() {
				let obj = {
					integral_product_id: this.integral_product_id
				}
				this.$common.requests('/api/integral/get_now_exchange', obj).then(res => {
					if (res.data.code == 1) {
						this.user = res.data.data;
						console.log(this.user)
					} else {
						this.$api.msg(res.data.msg);
					}
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
		background-color: #F2F2F2;
		overflow: hidden;
	}

	.border {
		width: 100%;
		height: 54%;
		background-color: #FFFFFF;
	}

	.border_image {
		width: 92%;
		height: 78%;
		margin: 0 4%;
	}

	.border_center {
		padding: 0 30rpx;
	}

	.border_last {
		width: 380rpx;
		line-height: 70rpx;
		font-size: 30rpx;
		font-weight: 600;
		;
	}

	.border_next {
		font-size: 38rpx;
		color: #DE0E0B;
		font-weight: 500;
	}

	.border_num {
		color: #E9E9E9;
		letter-spacing: 2rpx;
	}

	.border_ran {
		text-align: center;
		font-size: 26rpx;
		margin-top: 40rpx;
		color: #9E9E9E;
	}

	.border_rans {
		text-align: center;
		font-size: 26rpx;
		color: #9E9E9E;

	}

	.barner_border {
		width: 180rpx;
		border-top: solid 1rpx #96A9F1;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}

	.barner_puplack {
		color: #96A9F1;
	}

	.barner_place {
		margin-top: 20rpx;
		padding-top: 20rpx;
	}

	.barner {
		width: 100%;
		height: 27%;
		background-color: #FFFFFF;
	}

	.barner_big {
		padding: 0 20rpx;
		font-size: 30rpx;
		color: #686868;
	}

	.mt {
		margin-top: 10rpx;
	}

	.mts {
		margin-top: 25rpx;
	}

	.button {
		width: 100%;
		line-height: 80rpx;
		background-color: #5A7EF8;
		color: #FFFFFF;
		text-align: center;
		position: absolute;
		bottom: 0;
	}
</style>
