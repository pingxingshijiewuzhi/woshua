<template>
	<view class="box">
		<!-- border -->
		<view class="barder flexs2">
			<image class="ditu" src="../../static/image/0008.png" mode=""></image>
			<view class="">
				<view class="flexs1">
					<view class="barder_left">{{address.name}}</view>
					<view class="barder_right">{{address.mobile}}</view>
				</view>
				<view class="barder_last">{{address.address}}</view>
			</view>
			<image class="next" src="" mode=""></image>
		</view>
		<!-- barner -->
		<view class="barner ">
			<view class="barner_border flexs1">
				<image class="libao" :src='imgUrl+product.product_image' mode=""></image>
				<view class="border_left">
					<view class="border_top">
						<view class="barner_first">{{product.product_name}}</view>
						<!-- <view class="border_num">{{order.num}}</view> -->
					</view>
					<view class=" flexs1">
						<view class="">￥</view>
						<view class="border_next">{{product.price}}</view>
					</view>
				</view>
				<view class="border_number">X{{order.num}}</view>
			</view>
			<view class="barner_last flexs2">
				<view class="">订单金额</view>
				<view class="">￥{{order.order_price}}</view>
			</view>
		</view>
		<view class="center">
			<view class="flexs1">
				<view class="">订单编号：</view>
				<view class="">{{order.order_num}}</view>
			</view>
			<view class="flexs1">
				<view class="">下单时间：</view>
				<view class="">{{order.createtime}}</view>
			</view>
			<view class="flexs1">
				<view class="">付款时间：</view>
				<view class="">{{order.paytime}}</view>
			</view>
			<view class="flexs1">
				<view class="">付款方式：</view>
				<view class="">{{order.pay_status}}</view>
			</view>
			<view class="flexs1">
				<view class="">快递公司：</view>
				<view class="">{{order.courier}}</view>
			</view>
			<view class="flexs1">
				<view class="">快递单号：</view>
				<view class="">{{order.courier_number}}</view>
			</view>
		</view>
		<view class="button flexs1">
			<block v-if="status != 4">
				<view class="barner_last button_left" @tap="showModal" data-target="ChooseModal">确认收货</view>
			</block>
			<block v-else>
				<view class="barner_last button_left"></view>
			</block>
			<view class="button_right">查看物流</view>
		</view>
		<!-- model -->
		<view class="cu-modal " :class="modalName=='ChooseModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<view class="button_color">
					<view class="button_top flexs">确认收货</view>
					<view class="button_middle">您确定收到该商品了吗？</view>
				</view>
				<view class="flexs">
					<view class="button_bottom_left flexs" @tap="hideModal ">取消</view>
					<view class="button_bottom_right " @tap="hideModal">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
				imgUrl: this.$common.baseUrl,
				orderid: '',
				address: {},
				order: {},
				product: {},
				// 判断orderid状态
				status:''
			}
		},
		onLoad(option) {
			this.orderid = option.orderid
			this.status = option.status
			this._getorderdetail()
		},
		methods: {
			_getorderdetail() {
				let obj = {
					order_id: this.orderid,
				}
				this.$common.requests('/api/Giftorder/tools_order_detail', obj).then(res => {
					if (res.data.code == 1) {
						console.log(res.data.data)
						this.address = res.data.data.address
						this.order = res.data.data.order
						this.product = res.data.data.product
					} else {
						this.$api.msg(res.data.msg)
					}
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
		}
	}
</script>

<style>
	.box {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	/* border */
	.barder {
		width: 100%;
		height: 180rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		padding: 0 40rpx;
	}

	.ditu {
		width: 40rpx;
		height: 50rpx;
	}

	.next {
		width: 26rpx;
		height: 46rpx;
	}

	.barner_first {
		width: 380rpx;
		font-size: 34rpx;
	}

	.barder_left {
		font-size: 32rpx;
		font-weight: 600;
		margin-right: 40rpx;
		color: #363636;
		letter-spacing: 6rpx;
	}

	.barder_right {
		font-size: 32rpx;
		font-weight: 600;
		color: #363636;
		letter-spacing: 6rpx;
		margin-top: 8rpx;
	}

	.barder_last {
		font-size: 30rpx;
		margin-top: 10rpx;
		color: #5E5E5E;
	}

	/* barner */
	.barner {
		width: 100%;
		height: 380rpx;
		background-color: #FFFFFF;
		margin-top: 30rpx;
		padding: 0 30rpx;
		position: relative;
	}

	.barner_border {
		width: 96%;
		margin: 0 2%;
		height: 260rpx;
		border-bottom: solid 1rpx #E5E5E5;
		position: relative;
	}

	.border_top {
		width: 380rpx;
		height: 120rpx;
		letter-spacing: 2rpx;
	}

	.barder_left {
		font-size: 32rpx;
		font-weight: 600;
		margin-right: 40rpx;
		color: #363636;
		letter-spacing: 6rpx;
	}

	.barder_right {
		font-size: 32rpx;
		font-weight: 600;
		color: #363636;
		letter-spacing: 6rpx;
		margin-top: 8rpx;
	}

	.barder_last {
		font-size: 30rpx;
		margin-top: 10rpx;
		color: #5E5E5E;
	}

	.border_left {
		margin-left: 30rpx;
	}

	.border_num {
		height: 40rpx;
		margin-top: 24rpx;
		color: #434343;
	}

	.border_next {
		color: #D8120F;
		font-size: 36rpx;
	}

	.border_number {
		line-height: 50rpx;
		position: absolute;
		right: 0;
		bottom: 40rpx;
	}

	.libao {
		width: 180rpx;
		height: 170rpx;
	}

	.barner_last {
		line-height: 120rpx;
		color: #434343;
	}

	/* center */
	.center {
		width: 100%;
		height: 360rpx;
		background-color: #FFFFFF;
		margin-top: 30rpx;
		padding: 10rpx 40rpx;
		line-height: 60rpx;
		font-size: 30rpx;
		color: #434343;
	}

	.button {
		width: 100%;
		line-height: 100rpx;
		text-align: center;
		position: absolute;
		bottom: 0;
	}

	.button_left {
		width: 50%;
		background-color: #FFFFFF;
		color: #424242;
	}

	.button_right {
		width: 50%;
		background-color: #5A7EF8;
		color: #FFFFFF;
	}

	/* MODEL */
	.cu-dialog {
		border-radius: 20rpx;
	}

	.button_color {
		width: 680rpx;
		height: 260rpx;
		background-color: #FFFFFF;
	}

	.button_top {
		width: 680rpx;
		line-height: 130rpx;
		color: #3F57AD;
		font-size: 38rpx;
		;
	}

	.button_middle {
		width: 680rpx;
		height: 120rpx;
		display: flex;
		font-size: 30rpx;
		justify-content: center;
		color: #000000;
	}

	.button_bottom_left {
		width: 50%;
		line-height: 88rpx;
		border-top: 1px solid #E1E1E1;
		background-color: #FFFFFF;
	}

	.button_bottom_right {
		width: 50%;
		line-height: 88rpx;
		border-left: 1px solid #E1E1E1;
		border-top: 1px solid #E1E1E1;
		color: #3F57AD;
		background-color: #FFFFFF;
	}
</style>
