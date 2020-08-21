<template>
	<view class="box">
		<view class="border flexs1">{{orderdetailobj.question}}</view>
		<view class="barner flexs">客服解答</view>
		<view class="bottom">
			<rich-text :nodes="orderdetailobj.answer"></rich-text>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				id: '',
				orderdetailobj: {}
			}
		},
		onLoad(option) {
			this.id = option.id
			this._getorderdetail()
		},
		methods: {
			_getorderdetail() {
				let myobj = {
					service_id: this.id
				}
				this.$common.requests('/api/Service/get_service_detail', myobj).then(res => {
					if (res.data.code == 1) {
						this.orderdetailobj = res.data.data

					} else {
						console.log(res.data.msg)
						this.$api.msg(res.data.msg);
					}
				})
			},
			totijiao() {
				uni.navigateTo({
					url: "../service/order"
				})
			},
		}
	}
</script>
<style>
	.box {
		width: 100vw;
		height: 100vh;
		background-color: #F2F2F2;
		overflow: hidden;
	}

	.border {
		width: 100%;
		height: 100rpx;
		font-size: 34rpx;
		padding-left: 30rpx;
		background-color: #FFFFFF;
		margin-top: 30rpx;
		letter-spacing: 2rpx;
	}

	.barner {
		width: 94%;
		height: 80rpx;
		margin: 30rpx 3%;
		border-radius: 50rpx 50rpx;
		color: #97A6EA;
		background-color: #FFFFFF;
		font-size: 30rpx;
		letter-spacing: 2rpx;
	}

	.bottom {
		width: 100%;
		height: 260rpx;
		background-color: #FFFFFF;
		line-height: 42rpx;
		padding: 14rpx 20rpx;
		letter-spacing: 4rpx;
	}
</style>
