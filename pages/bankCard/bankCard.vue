<template>
	<view class="box">
		<view class="border">
			<view class="border_card">
				<view class="flexs1">
					<view class="img_box flexs">
						<image class="card_image" :src="baseurl+item.bank_image " mode=""></image>
					</view>
					<view class="card_name">{{item.bank_name}}</view>
				</view>
				<view class="card_number">{{item.bank_num}}</view>
			</view>
			<view class=" border_right flexs1" @click="tocard">
				<view class="border_ran">更换银行卡</view>
				<image class="border_next" src="../../static/image/btn_xyb@2x.png" mode=""></image>
			</view>
		</view>
		<view class="barner flexs">
			<view class="barner_border"></view>
			<view class="barner_center">小贴士</view>
			<view class="barner_border"></view>
		</view>
		<view class="center">为保证您的资金安全，请务必添加您本人持有的银行卡，如有疑问，请拨打客服电话热线：{{mobile}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: '',
				baseurl: this.$common.baseUrl,
				mobile: ''
			}
		},
		onShow() {
			this.getdata();
		},
		onLoad() {
			this.get_service_mobile();
		},
		methods: {
			get_service_mobile() {
				this.$common.requests('/api/index/customer_service').then(res => {
					if (res.data.code == 1) {
						this.mobile = res.data.data;
					} else {
						this.$api.msg(res.data.msg);
					}
				});
			},
			tocard() {
				uni.navigateTo({
					url: "../bankCard/placecard"
				})
			},
			getdata() {
				this.$common.requests('/api/Datacount/get_my_bankcard').then(res => {
					if (res.data.code == 1) {
						this.item = res.data.data;
						console.log(this.item)
					} else {
						this.$api.msg(res.data.msg);
					}
				})
			}
		}
	}
</script>

<style>
	page{
		width:100%;
		height:100%;
		overflow: hidden;
	}
	.box {
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
	}
	.border{
		padding-top:30rpx
	}
	.border_card {
		width: 92%;
		height: 320rpx;
		margin: 0rpx 4% 30rpx 4%;
		padding-top: 20rpx;
		background-image: url(../../static/pic/003.png);
		background-size: 100% 100%;
	}
	.img_box{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50rpx;
		background-color: #FFFFFF;
		margin: 20rpx 30rpx;
	}
	.card_image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 40rpx;
	}

	.card_name {
		font-size: 34rpx;
		color: #FFFFFF;
		letter-spacing: 4rpx;
	}

	.card_number {
		font-size: 36rpx;
		color: #FFFFFF;
		margin-left: 128rpx;
		letter-spacing: 4rpx;
		margin-top: 20rpx;
	}

	.border_image {
		width: 94%;
		height: 300rpx;
		margin: 30rpx 3%;
	}

	.border_next {
		width: 16rpx;
		height: 22rpx;
	}

	.border_right {
		position: absolute;
		right: 3%;
	}

	.border_ran {
		margin-right: 20rpx;
		color: #353535;
	}

	.barner {
		width: 100%;
		margin-top: 320rpx;
	}

	.barner_border {
		width: 100rpx;
		height: 2rpx;
		border-top: solid 1rpx #8BA2F0;
	}

	.barner_center {
		line-height: 80rpx;
		color: #8BA2F0;
		margin: 0 20rpx;
		font-weight: 500;
		font-size: 30rpx;
	}

	.center {
		margin-top: 20rpx;
		width: 100%;
		padding: 0 3%;
		color: #353535;
		line-height: 56rpx;
	}
</style>
