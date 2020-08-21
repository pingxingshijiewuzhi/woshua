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
						<!-- <view class="border_num">{{product.num}}</view> -->
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
			<view class="flexs1" v-if='order.paytime'>
				<view class="">付款时间：</view>
				<view class="">{{order.paytime}}</view>
			</view>
			<view class="flexs1" v-if='order.pay_status'>
				<view class="">付款方式：</view>
				<view class="">{{order.pay_status}}</view>
			</view>
		</view>
		<view class="button flexs1 " v-if="status == 1">
			<view class="button_left" @click="goAccount">线下转账</view>
			<view class="button_right" @click="goOrder" data-target="DialogModal">继续支付</view>
		</view>
		
		<!-- 模态框1 -->
		<view class="cu-modal" :class="modalName=='DialogModal'?'show':''">
			<view class="cu-dialog">
				<image class="deleat" src="../../static/image/icon_mm_gb@2x.png" mode="" @tap="hideModal"></image>
				<view class="pasword">选择支付方式</view>
				<view class="list flexs2">
					<view class="flexs1">
						<image class="list_image" src="../../static/image/icon_qianbao@2x.png" mode=""></image>
						<view class="pa_l">钱包余额</view>
						<view class='blanceclass'>{{blance}}</view>
					</view>
					<image class="list_yuan" src="../../static/image/0005.png" mode="" v-if='currentIndex==0' @click="hidden(0)"></image>
					<image class="list_yuan" src="../../static/image/0004.png" mode="" v-else @click="hidden(0)"></image>
				</view>
				<view class="list flexs2">
					<view class="flexs1">
						<image class="list_image" src="../../static/image/icon_wxzf@2x.png" mode=""></image>
						<view class="pa_l">微信支付</view>
					</view>
					<image class="list_yuan" src="../../static/image/0005.png" mode="" v-if='currentIndex==1' @click="hidden(1)"></image>
					<image class="list_yuan" src="../../static/image/0004.png" mode="" v-else @click="hidden(1)"></image>
				</view>
				<!-- <view class="list flexs2">
					<view class="flexs1">
						<image class="list_image" src="../../static/image/icon_zfb@2x.png" mode=""></image>
						<view class="pa_l">支付宝支付</view>
					</view>
					<image class="list_yuan" src="../../static/image/0005.png" mode="" v-if='currentIndex==2' @click="hidden(2)"></image>
					<image class="list_yuan" src="../../static/image/0004.png" mode="" v-else @click="hidden(2)"></image>
				</view> -->
				<view class=" content flexs1">
					<view class="buttons" @tap="gopay" data-target="DialogModal1">立即付款</view>
				</view>
			</view>
		</view>
		<!-- 支付密码 -->
		<passkeyborad  ref='passkeyborad' :show="show" @close="close" :money='realymoney' @makesure='makesure'  @resetpassword='resetpassword'></passkeyborad>
	</view>
</template>

<script>
	import passkeyborad from '@/components/yzc-paykeyboard/yzc-paykeyboard.vue';
	export default {
		components: {
			passkeyborad,
		},
		data() {
			return {
				// 钱包余额
				blance:'',
				// 默认不显示支付密码弹框
				show: false,
				realymoney: '',
				
				orderid: '',
				imgUrl: this.$common.baseUrl,
				address: {},
				order: {},
				product: {},
				modalName:'',
				currentIndex: 0,
				// 传过来orderid的状态
				status:''
			}
		},
		onLoad(option) {
			this.orderid = option.orderid
			this.status = option.status
			this._getorderdetail()
		},
		onShow() {
			this.getadata()
			this._getblance()
		},
		methods: {
			// 获取余额
			_getblance(){
				this.$common.requests('/api/user/get_settlement').then(res=>{
					console.log(res.data.data,888)
					this.blance = res.data.data
				})
				
			},
			_getorderdetail() {
				let obj = {
					order_id: this.orderid,
				}
				this.$common.requests('/api/Giftorder/tools_order_detail', obj).then(res => {
					if (res.data.code == 1) {
						this.address = res.data.data.address
						this.order = res.data.data.order
						this.product = res.data.data.product
						console.log(res.data.data)
					} else {
						this.$api.msg(res.data.msg)
					}
				})
			},
			getadata() {

			},
			// 线下转账
			goAccount() {
				uni.navigateTo({
					url:'../myGift/account'
				})
			},
			hideModal(){
				this.modalName = null
			},
			gopay() {
				this.modalName = null
				// 如果选择微信和支付宝就不需要判断是否设置支付密码
				if(this.currentIndex == 1){
					let myobj = {
						order_id:this.id,
						// 1=礼包活动订单,2=机构中心采购订单
						order_type:1
					}
					this.$common.requests('/addons/epay/index/experience',myobj).then(res=>{
						console.log(res.data,'后台返回数据')
						// 微信支付
						uni.requestPayment({
							provider: 'wxpay',
							orderInfo: JSON.stringify(res.data), //微信、支付宝订单数据
							success: function (res) {
								console.log('success:' + JSON.stringify(res));
							},
							fail: function (err) {
								console.log('fail:' + JSON.stringify(err));
							}
						});
						
					})
					console.log('微信支付')
					return
				}
				//判断是否设置支付密码
				var obj = {}
				this.$common.requests('/api/user/judge_pay_password', obj).then(res => {
					console.log(res)
					if (res.data.code == 0 && this.currentIndex == 0) {
						this.$api.msg('请先设置支付密码')
						setTimeout(() => {
							uni.navigateTo({
								url: '../setUp/setPay'
							})
						}, 1000)
					} else {
						this.show = true
					}
				})
			
			},
			goOrder(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			// 关闭支付密码弹框
			close() {
				this.show = false
			},
			// 跳转重置密码
			resetpassword(){
				uni.navigateTo({
					url:'../setUp/resetPay'
				})
			},
			//点击确定支付
			makesure(e) {
				console.log(e);
				this.password = e;
				var obj = {
					order_id: this.orderid,
					pay_pwd: this.password
				};
			
				this.$common.requests('/api/Giftorder/money_pay', obj).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						this.show = false
						uni.navigateBack({
							delta:1
						})
					} else {
						console.log(res.data.msg)
						this.$api.msg(res.data.msg);
						this.$refs.passkeyborad.resetinit()
					}
				});
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
		/* height: 250rpx; */
		background-color: #FFFFFF;
		margin-top: 30rpx;
		padding: 10rpx 40rpx;
		line-height: 60rpx;
		font-size: 30rpx;
		color: #434343;
	}
	
	/* 支付弹框 */
	.cu-dialog {
		border-radius: 20rpx;
	}
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
	
	.pa_l {
		padding-left: 40rpx;
		font-size: 32rpx;
	}
	
	.list {
		width: 100%;
		height: 100rpx;
		padding: 0 20rpx;
	}
	
	.list_image {
		width: 40rpx;
		height: 40rpx;
	}
	
	.list_yuan {
		width: 40rpx;
		height: 40rpx;
	}
	
	.box_list {
		width: 80rpx;
		height: 80rpx;
		border: solid 1rpx #E5E5E5;
	}
	
	.text_s {
		font-size: 32rpx;
		color: #656565;
	}
	
	.box_list input {
		margin-top: 16rpx;
		font-size: 34rpx;
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
	.blanceclass{
		width:200rpx;
		height:42rpx;
		line-height: 42rpx;
	}
	/* 支付弹框end */
	
	/* 底部继续支付样式 */
	.button {
		width: 100%;
		line-height: 120rpx;
		color: #FFFFFF;
		text-align: center;
		position: absolute;
		bottom: 0;
		font-size: 32rpx;
	}
	
	.button_left {
		width: 50%;
		height: 120rpx;
		background-color: #FFFFFF;
		color: #333333;
	}
	
	.button_right {
		width: 50%;
		height: 120rpx;
		background-color: #5880FA;
	}
		/* 底部继续支付样式 */
</style>
