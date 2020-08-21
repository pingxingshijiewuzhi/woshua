<template>
	<view class="box">
		<view class="barder flexs2">
			<image class="ditu" src="../../static/image/0008.png" mode=""></image>
			<view class="">
				<view class="flexs1">
					<view class="barder_left">{{list.name}}</view>
					<view class="barder_right">{{list.mobile}}</view>
				</view>
				<view class="barder_last">{{list.address}}</view>
			</view>
			<image class="next" src="" mode=""></image>
		</view>
		<view class="barner ">
			<view class="barner_border flexs1">
				<image class="libao" :src="baseurl+list.product_image" mode=""></image>
				<view class="border_left">
					<view class="barner_first ">{{list.product_name}}</view>
					<view class=" flexs1">
						<view class="border_next">积分{{list.price}}</view>
						<view class="border_num">/{{list.number}}{{list.product_norms}}</view>
					</view>
				</view>
				<view class="border_number">X{{list.num}}</view>
			</view>
		</view>
		<!-- 状态 -->
		<view class="big_box">
			<view class="big_box_l flexs1">
				<view>订单：</view>
				<view>{{list.status_text}}</view>
			</view>
			<view class="big_box_l flexs1">
				<view>价格:</view>
				<view>
					<text class="price">积分{{list.order_price}}</text>
					<text>/{{list.num}}{{list.product_norms}}</text>
				</view>
			</view>
			<view class="big_box_l flexs1">
				<view>申请时间：</view>
				<view>{{list.createtime}}</view>
			</view>
			<view class="big_box_l flexs1">
				<view>通过时间：</view>
				<view>{{list.send_time}}</view>
			</view>
			<view class="big_box_l flexs1">
				<view>付款方式：</view>
				<view>积分兑换</view>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="big_box1">
			<view class="big_box1_1 flexs1">
				<view>订单编号：{{list.order_num}}</view>
				<view class="fuzhi" @click="copy_num(list.order_num)">复制</view>
			</view>
			<view class="big_box1_1 flexs1">
				<view>服务商:</view>
				<view><text>总部</text></view>
			</view>
			<view class="big_box1_1 flexs1" v-show="list.courier_number">
				<view>物流公司：</view>
				<view><text>{{list.courier_company}}</text></view>
			</view>
			<view class="big_box1_1 flexs1" v-show="list.courier_number">
				<view>物流单号：{{list.courier_number}}</view>
				<view class="fuzhi" @click="copy_num(list.courier_number)">复制</view>
			</view>
		</view>
		<view class="button flexs1" v-show="list.status == 3">
			<view class="button_left" @tap="showModal" data-target="ChooseModal">确认收货</view>
			<view class="button_right" @click="look_wuliu()">查看物流</view>
		</view>
		<view class="cu-modal " :class="modalName=='ChooseModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">

				<view class="button_color">
					<view class="button_top flexs">
						确认收货
					</view>
					<view class="button_middle">你确定收到该商品了吗？</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="button_bottom_left flexs" @tap="hideModal ">取消</view>
					<view class="button_bottom_right flexs" @click="queren">确定</view>
				</view>
			</view>
		</view>
	</view>
	<!-- <view class="button_que flexs">
			<view class="button_lefts" v-show="list.status == 3">确认收货</view>
			<view class="button_rights" v-show="list.courier_number">查看物流</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mydetailid: '',
				modalName: null,
				list: '',
				baseurl: this.$common.baseUrl,
				num: '',
				id: '',
			}
		},
		onLoad(option) {
			this.mydetailid = option.order_id,
				this.getdata()
		},
		methods: {
			look_wuliu() {
				this.$api.msg('补页面接口');
			},
			copy_num(copy_num) {
				//复制快递单号
				uni.setClipboardData({
					data: copy_num
				});
			},
			getdata() {
				let obj = {
					integral_order_id: this.mydetailid,
				}
				this.$common.requests('/api/integral/get_integral_order_detail', obj).then(res => {
					if (res.data.code == 1) {
						this.list = res.data.data;
						// console.log(this.list)
					} else {
						this.$api.msg(res.data.msg)
					}
				})
			},
			queren(e) {
				this.modalName = e.currentTarget.dataset.target
				let obj = {
					integral_order_id: this.mydetailid,
				}
				this.$common.requests('/api/integral/confirm_huo', obj).then(res => {
					if (res.data.code == 1) {
						this.$api.msg(res.data.msg);
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							})
						});
					} else {
						this.$api.msg(res.data.msg);
					}

				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			goAccount() {
				uni.navigateTo({
					url: "account"
				})
			},
			goOrder() {
				uni.navigateTo({
					url: "order"
				})
			},
			todizhi() {
				uni.navigateTo({
					url: "../myIntegral/site"
				})
			},

		},
	}
</script>

<style>
	.linshi1 {
		width: 60rpx;
		height: 60rpx;
		position: fixed;
		transform: translateX(300rpx);
		/* z-index: 99999; */
		margin-top: -30rpx;
	}

	.box {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.barder {
		width: 100%;
		height: 160rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		padding: 0 20rpx;
	}

	/* 弹框 */
	.deleat {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		right: 20rpx;
		top: 20rpx;
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
		height: 22%;
		margin-top: 30rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
	}

	.big_box1 {
		width: 100%;
		/* height:20%; */
		margin-top: 30rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
	}

	.big_box_l {
		width: 96%;
		height: 18%;
		margin: 0 auto;
		letter-spacing: 6rpx;
		margin-bottom: 7rpx;
		margin-top: 3rpx;
	}

	.big_box1_1 {
		width: 96%;
		height: 20%;
		margin: 0 auto;
		letter-spacing: 6rpx;
		/* margin-bottom: 10rpx; */
		margin-top: 10rpx;
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

	.button {
		width: 100%;
		line-height: 80rpx;
		text-align: center;
		background-color: #5A7EF8;
		color: #FFFFFF;
		font-size: 32rpx;
		position: absolute;
		bottom: 0;
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
		height: 220rpx;
		background-color: #FFFFFF;
		margin-top: 30rpx;
		padding: 0 30rpx;
		position: relative;
	}

	.barner_border {
		width: 90%;
		margin: 0;
		height: 220rpx
	}

	.libao {
		width: 170rpx;
		height: 160rpx;
	}

	.text {
		width: 100%;
		line-height: 126rpx;
		background-color: #FFFFFF;
		padding: 0 20rpx;
	}

	.text_border {
		width: 90%;
		margin: 0 5%;
		height: 126rpx;
		letter-spacing: 4rpx;
	}

	.barner_first {
		width: 380rpx;
		height: 116rpx;
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

	.button_que {
		width: 100%;
		line-height: 120rpx;
		color: #FFFFFF;
		text-align: center;
		position: absolute;
		bottom: 0;
		font-size: 32rpx;
	}

	.button_left {
		width: 100%;
		line-height: 120rpx;
		background-color: #FFFFFF;
		color: #333333;
	}

	.button_right {
		width: 100%;
		line-height: 120rpx;
		background-color: #5880FA;

	}

	/* model */
	.button_color {
		width: 680rpx;
		height: 300rpx;
		background-color: #FFFFFF;
		/* border-radius: 40rpx; */

	}

	.button_top {
		width: 680rpx;
		height: 150rpx;
		color: #3F57AD;
		font-size: 38rpx;
		;
	}

	.button_middle {
		width: 680rpx;
		height: 150rpx;
		display: flex;
		justify-content: center;
		color: #000000;
		/* align-items: center; */
	}

	.button_bottom_left {
		width: 50%;
		height: 100%;
		border-top: 1px solid #E1E1E1;

	}

	.button_bottom_right {
		width: 50%;
		height: 100%;
		border-left: 1px solid #E1E1E1;
		border-top: 1px solid #E1E1E1;
		color: #3F57AD;
	}

	/* .button_left{
	width: 50%;
	line-height: 120rpx;
	background-color:#FFFFFF;
	color:#333333;
	text-align: center;
}
.button_right{
	width: 50%;
	line-height: 120rpx;
	background-color:#5880FA ;
	text-align: center;
} */
</style>
