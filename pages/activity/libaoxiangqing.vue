<template>
	<view class="box">
		<view class="border_bgc">
			<image class="image_top" :src="imgUrl+productobj.image" mode=""></image>
			<view class="border_left">
				<view class="barner_first">{{productobj.name}}</view>
				<view class=" border_bootom flexs1">
					<view class="flexs1">
						<view class="">积分</view>
						<view class="border_next">{{productobj.price}}</view>
					</view>
					<view class="border_num">{{'/'+productobj.number+productobj.norms}}</view>
				</view>
			</view>
		</view>
		<view class="barner">
			<view class="barrner_top mt flexs">
				<view class="border_top mr"></view>
				<view class="barner_title">礼包简介</view>
				<view class="border_top ml"></view>
			</view>
			<rich-text class="barner_text" :nodes="productobj.content"></rich-text>
		</view>
		<view class="button" @click="tobuy(productobj.id)">立即购买</view>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				imgUrl: this.$common.baseUrl,
				id: '',
				productobj: {}
			}
		},
		onLoad(option) {
			this.id = option.id
			this._getproductdetail()
		},
		methods: {
			_getproductdetail() {
				let obj = {
					integral_product_id: this.id
				}
				this.$common.requests('/api/integral/get_integral_product_detail', obj).then(res => {
					if (res.data.code == 1) {
						// console.log(this.id)
						// console.log(res.data.data)
						this.productobj = res.data.data
					} else {
						console.log(res.data.msg)
						this.$api.msg(res.data.msg);
					}
				})
			},
			tobuy(id) {
				uni.navigateTo({
					url: "../activity/tijiaodingdan?id=" + id
				})
			},
		},
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;

		/* overflow: hidden; */
	}

	.box {
		width: 100vw;
		height: 100vh;
		/* overflow: hidden; */
		overflow-y: scroll;
		background-color: #F2F2F2;
		margin-bottom: 110rpx;
	}

	.barner_text {
		background-color: #F2F2F2;
	}

	.border_bgc {
		width: 100%;
		height: 53%;
		background-color: #FFFFFF;
	}

	.image_top {
		width: 90%;
		height: 75%;
		display: inline-block;
		margin: 20rpx 5% 0 5%;
	}

	.border_left {
		margin-left: 30rpx;
	}

	.barner_first {
		width: 380rpx;
		line-height: 80rpx;
		font-size: 36rpx;

	}

	.border_next {
		font-size: 46rpx;
		color: #FE3131;
		letter-spacing: 2rpx;
	}

	.border_num {
		letter-spacing: 2rpx;
		color: #B6B6B6;
	}

	.border_bootom {
		padding-bottom: 20rpx;
	}

	.barner {
		width: 100%;
		margin-top: 20rpx;
		background-color: #FFFFFF;
		font-size: 30rpx;
		color: #B6B6B6;
		padding: 0 20rpx 10rpx 20rpx;
	}

	.border_top {
		width: 140rpx;
		border-top: solid 1rpx #B6B6B6;
	}

	.ml {
		margin-left: 20rpx;
	}

	.mt {
		padding-top: 16rpx;
	}

	.mr {
		margin-right: 20rpx;
	}

	.barner_center {
		font-size: 30rpx;
		margin-top: 30rpx;
		margin-left: 3%;
	}

	.button {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #5A7EF8;
		color: #FFFFFF;
		text-align: center;
		font-size: 34rpx;
		letter-spacing: 2rpx;
		position: fixed;
		bottom: 0;
	}
</style>
