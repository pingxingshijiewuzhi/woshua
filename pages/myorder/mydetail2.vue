<template>
	<view class="box">
		<view class="barder flexs2">
			<image class="ditu" src="../../static/image/0008.png" mode=""></image>
			<view class="">
				<view class="flexs1">
					<view class="barder_left">{{order_info.name}}</view>
					<view class="barder_right">{{order_info.mobile}}</view>
				</view>
				<view class="barder_last">{{order_info.address}}</view>
			</view>
			<image class="next" src="" mode=""></image>
		</view>
		<view class="barner ">
			<view class="barner_border flexs1">
				<image class="libao" :src="baseUrl+order_info.product_image" mode=""></image>
				<view class="border_left">
					<view class="barner_first">{{order_info.product_name}}</view>
					<view class=" flexs1">
						<view class="border_next">积分{{order_info.price}}</view>
						<view class="border_num">/{{order_info.number}}{{order_info.product_norms}}</view>
					</view>
				</view>
				<view class="border_number">×{{order_info.num}}</view>
			</view>
		</view>
		<!-- 状态 -->
		<view class="big_box">
			<view class="big_box_l flexs1">
				<view>订单:</view>
				<view>{{order_info.status_text}}</view>
			</view>
			<view class="big_box_l flexs1">
				<view>价格:</view>
				<view>
					<text class="price">积分{{order_info.order_price}}</text><text>/{{order_info.num}}{{order_info.product_norms}}</text>
				</view>
			</view>
			<view class="big_box_l flexs1">
				<view>申请时间：</view>
				<view>{{order_info.createtime}}</view>
			</view>
			<view class="big_box_l flexs1">
				<view>付款方式：</view>
				<view>积分兑换</view>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="big_box1">
			<view class="big_box1_1 flexs1">
				<view>订单编号：{{order_info.order_num}}</view>
				<view class="fuzhi" @click="fuzhi_data(order_info.order_num)">复制</view>
			</view>
			<view class="big_box1_1 flexs1">
				<view>服务商:</view>
				<view>
					<text class="price">总部</text>
				</view>
			</view>
		</view>
		<!-- <view class="button flexs1">
			<view class="button_left" @click="goAccount">线下转账</view>
			<view class="button_right" @click="goOrder">继续支付</view>
		</view> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				order_info: [],
				order_id: '',
				baseUrl: this.$common.baseUrl
			}
		},
		onLoad(option) {
			this.order_id = option.order_id;
			this.get_orderInfo();
		},
		methods: {
			fuzhi_data(order_num) {
				uni.setClipboardData({
					data: order_num
				});
			},
			get_orderInfo() {
				let obj = {
					integral_order_id: this.order_id
				}
				this.$common.requests('/api/integral/get_integral_order_detail', obj).then(res => {
					if (res.data.code == 1) {
						this.order_info = res.data.data;
					} else {
						this.$api.msg(res.data.msg);
					}
				});
			}
			// goAccount(){
			// 	uni.navigateTo({
			// 		url:"account"
			// 	})
			// },
			// goOrder(){
			// 	uni.navigateTo({
			// 		url:"order"
			// 	})
			// },
			// todizhi(){
			// 	uni.navigateTo({
			// 		url:"../myIntegral/site"
			// 	})
			// },

		}
	}
</script>

<style>
	.box {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.barder {
		width: 100%;
		height: 180rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		padding: 0 30rpx;
	}

	/* 弹框 */
	.deleat {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		right: 20rpx;
		top: 20rpx;
	}

	.pasword {
		font-size: 32rpx;
		margin: 30rpx 0 20rpx 0;
	}

	.list {
		width: 100%;
		height: 180rpx;
	}

	.box_list {
		width: 80rpx;
		height: 80rpx;
	}

	.box_list input {
		margin-top: 16rpx;
		font-size: 34rpx;
	}

	.big_box {
		width: 100%;
		height: 20%;
		margin-top: 30rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
	}

	.big_box1 {
		width: 100%;
		height: 12%;
		margin-top: 30rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
	}

	.big_box_l {
		width: 96%;
		height: 24%;
		margin: 0 auto;
		letter-spacing: 6rpx;
	}

	.big_box1_1 {
		width: 96%;
		height: 50%;
		margin: 0 auto;
		letter-spacing: 6rpx;
	}

	.price {
		font-size: 32rpx;
		color: #FE1817;
		font-weight: 500;
	}

	.fuzhi {
		width: 80rpx;
		color: #5B7DEF;
		background-color: #F2F3F0;
		text-align: center;
	}

	.buttons {
		width: 94%;
		line-height: 80rpx;
		text-align: center;
		background-color: #5A7EF8;
		color: #FFFFFF;
		margin: 100rpx 3% 0 3%;
		font-size: 34rpx;
		margin: 20rpx 30rpx 50rpx 30rpx;
	}

	/* end */
	.ditu {
		width: 40rpx;
		height: 50rpx;
	}

	.next {
		width: 26rpx;
		height: 46rpx;
	}

	.border_next {
		font-size: 38rpx;
		color: #FE1817;
		font-weight: 500;
	}

	.border_num {
		letter-spacing: 4rpx;
	}

	.barner {
		width: 100%;
		height: 260rpx;
		background-color: #FFFFFF;
		margin-top: 30rpx;
		padding: 0 30rpx;
		position: relative;
	}

	.barner_border {
		width: 90%;
		margin: 0;
		height: 260rpx
	}

	.libao {
		width: 180rpx;
		height: 170rpx;
	}

	.text {
		width: 100%;
		line-height: 130rpx;
		background-color: #FFFFFF;
		padding: 0 30rpx;
	}

	.text_border {
		width: 90%;
		margin: 0 5%;
		height: 130rpx;
		letter-spacing: 4rpx;
	}

	.barner_first {
		width: 380rpx;
		height: 130rpx;
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

	.border_left {
		margin-left: 30rpx;
	}

	.border_number {
		width: 60rpx;
		line-height: 120rpx;
		position: absolute;
		bottom: 10rpx;
		right: 30rpx;
	}

	.mt {
		margin-top: 30rpx;
		border: none;
	}

	.none {
		border: none;
	}

	/* .button{
		width: 100%;
		line-height: 120rpx;
		color: #FFFFFF;
		text-align: center;
		position: absolute;
		bottom: 0;
		font-size: 32rpx;
	}
.button_left{
	width: 50%;
	height: 120rpx;
	background-color:#FFFFFF;
	color:#333333;
}
.button_right{
	width: 50%;
	height: 120rpx;
	background-color:#5880FA ;
} */
</style>
