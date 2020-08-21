<template>
	<view class="box">
		<view class="barder flexs2" @click="todizhi">
			<image class="ditu" src="../../static/image/0008.png" mode=""></image>
			<view v-if="address.name == '' && address.mobile == '' && address.address == ''"  >
				暂无地址
			</view>
			<view v-else>
				<view class=" border_left flexs1">
					<view class="barder_left">{{address.name}}</view>
					<view class="barder_right">{{address.mobile}}</view>
				</view>
				<view class="barder_last">{{address.address}}</view>
			</view>
			<image class="next" src="../../static/image/btn_psdz_xyb@2x.png" mode=""></image>
		</view>
		<view class="barner ">
			<view class="barner_border flexs1">
				<image class="libao" :src="$common.baseUrl + product.image" mode=""></image>
				<view class="border_left">
					<view class="barner_first">{{product.name}}</view>
					<view class='adjust'>
						<view class="adjust_left flexs1">
							<view class="border_next">积分{{product.integral}}</view>
							<view class="border_num">/{{product.unit}}</view>
						</view>
						<view class="border_number">X{{num}}</view>
					</view>
				</view>
				
			</view>
		</view>
		<view class="text">
			<view class="text_border flexs2">
				<view class="text_s">数量</view>
				<view class="text_s"><uni-number-box :min="1" :value="1" @change="bindChange"></uni-number-box></view>
			</view>
		</view>
		<view class="text">
			<view class="text_border flexs2">
				<view class="text_s">兑换对象</view>
				<view class="text_s">总部</view>
			</view>
		</view>
		<view class="text">
			<view class="text_border none flexs2">
				<view class="text_s">运费</view>
				<view class="text_s" v-show="kuaidi != 0">{{kuaidi}}</view>
				<view class="text_s" v-show="kuaidi == 0">包邮</view>
			</view>
		</view>
		<view class="text">
			<view class="text_border flexs2">
				<view class="text_s">支付方式</view>
				<view class="text_s">{{mytype}}</view>
			</view>
		</view>
		<view class="button flexs1">
			<view class="button_left">合计:￥{{pricetruely}}</view>
			<view class="button_right" @tap="gopay" data-target="DialogModal1">提交</view>
		</view>

		<!-- 支付密码 -->
		<passkeyborad ref='passkeyborad' :show="show" @close="close" :money="pricetruely+''" @makesure='makesure' @resetpassword='resetpassword'></passkeyborad>
	</view>
</template>

<script>
	import passkeyborad from '@/components/yzc-paykeyboard/yzc-paykeyboard.vue';
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue";
	export default {
		components: {
			passkeyborad,
			uniNumberBox
		},
		data() {
			return {
				num:1,//购买数量
				topasword: false,
				trade_pwd: '',
				focus: true,
				show: false,
				numarr: [],
				d_time: 10,
				nextsteep: false,
				tel: 0,
				numlength: "",
				gopen: false,
				isactive: true,
				resgetcode: false,
				modalName: '',
				currentIndex: 0,
				// 商品价格
				realymoney: '',
				address: {},
				product: {},
				// 快递金额
				kuaidi: '',
				// 真实付费
				pricetruely: 0,
				area_id: '',
				id: '',
				// 支付方式
				mytype: '',
				morenadress:true
			}
		},
		onLoad(option) {
			if (uni.getStorageSync('chooseintegral') == 1) {
				this.mytype = '通用积分'
			}
			if (uni.getStorageSync('chooseintegral') == 2) {
				this.mytype = '活动积分'
			}
			this.id = option.id ? option.id : ''
			this._getorderdetail()
			// 如果页面没有打开，将不能 注册监听事件 uni.$on 和 uni.$once 。
			// uni.$once('update',function(data){
			// 	console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
			// 	if(data.msg == 1){
			// 		this.mytype = '通用积分'
			// 	}
			// 	if(data.msg == 2){
			// 		this.mytype = '活动积分'
			// 	}
			// })
		},
		onShow() {
			// 每日默认真实价格为空
			this.pricetruely = 0
			if (uni.getStorageSync('area_id')) {
				this.area_id = uni.getStorageSync('area_id');
				this._getorderdetail()
				this.address.id = uni.getStorageSync('area_id');
				uni.removeStorage({
					key: 'area_id'
				});
			}else{
				this._getorderdetail()
			}
		},
		mounted() {
			this.bus.$on('integralcategory', function(id) {
				console.log(id)
			})
		},
		beforeDestroy() {
			this.bus.$off('integralcategory')
		},
		computed: {
			len: function() {
				if (this.trade_pwd.length == 6) {
					// 第一次进来可以点击的

				}
				return this.trade_pwd.length
			}
		},
		methods: {
			bindChange(num){
				//数量变化事件
				this.num = num;
				var obj = {
					address_id:this.address.id,//收货地址id
					product_id:this.product.id,//商品id
					num:num,//数量
				}
				this.$common.requests('/api/Integral/get_integral_yunfei',obj).then(res=>{
					if(res.data.code == 1){
						this.kuaidi = res.data.data;
					}else{
						//获取运费失败
						this.kuaidi = 0;
					}
					this.pricetruely = num * this.product.integral + this.kuaidi;
				});	
			},
			makesure(password) {
				
				let myobj = {
					address_id: this.address.id,
					integral_product_id: this.product.id,
					pay_pwd:password,
					num:this.num,
				}
				this.$common.requests('/api/Integral/goto_pay', myobj).then(res => {
					if (res.data.code == 1) {
						this.show = false
						this.$refs.passkeyborad.resetinit()
						uni.navigateTo({
							url: '../myorder/exchange'
						})
					} else {
						this.$api.msg(res.data.msg);
						this.$refs.passkeyborad.resetinit()
					}
				})
			},
			
			_getorderdetail() {
				var that = this
				let obj = {
					integral_product_id: this.id,
					address_id: this.area_id,
					num:this.num,
				}
				this.$common.requests('/api/integral/get_now_exchange', obj).then(res => {
					if(res.data.data.address.name==''){
						this.$api.msg('请先选择默认地址');
					}
					if (res.data.code == 1) {
						console.log(res.data.data)
						this.address = res.data.data.address;
						this.product = res.data.data.product;
						this.kuaidi = res.data.data.yunfei;
						this.pricetruely  = res.data.data.price_count;
						// 字符串截取  slice不改变原来字符串，返回截取内容
						// let aaa = this.product.price.slice(-3)
						// console.log(this.product.price)
						// console.log(aaa)

						// subdtring和substr才是字符串方法
						// let aaa = this.product.price.substring(0,this.product.price.length-3)
					
					} else {
						this.$api.msg(res.data.msg);
					}
				})
			},
			todizhi() {
				uni.navigateTo({
					url: "../myIntegral/site?is_check=" + true
				})
			},
			// 这里提交订单不做支付类型选择
			// this.modalName = e.currentTarget.dataset.target
			// 跳转订单页面
			tijiao(e) {
				let myobj = {
					address_id: this.address.id,
					integral_product_id: this.product.id,
					num:this.num,
				}
				this.$common.requests('/api/integral/goto_pay', myobj).then(res => {
					if (res.data.code == 1) {
						uni.navigateTo({
							url: '../myorder/exchange?Inv=0'
						})
					} else {
						this.$api.msg(res.data.msg);
					}
				})
			},


			// gopay() {
			// 	this.show = true
			// },
			gopay(e) {
				if(this.address.name == ''){
					return
				}
				this.show = true
				// 积分兑换,不用判断是否支付类型选择
				// let choosezhifu = uni.getStorageSync('choosezhifu')
				// console.log(choosezhifu,111)
				// if (choosezhifu == 2) {
				// 	this.modalName = e.currentTarget.dataset.target
				// 	return
				// }
			},
			hidden(index) {
				if (index == this.currentIndex) {
					this.currentIndex = 200
					return
				}
				this.currentIndex = index
			},
			writepwd(num) {
				if (num == 12) {
					this.close();
					return;
				}
				if (num == 10) {
					return;
				}
				if (num == 11) {
					num = 0;
					this.boardlists[10].checked = true;
				} else {
					this.boardlists[num - 1].checked = true;
				}
				this.numarr.push(num);
				if (this.numarr.length > 6) {
					return
				}
				var that = this;
				setTimeout(function() {
					for (var i = 0; i < that.boardlists.length; i++) {
						that.boardlists[i].checked = false;
					}
				}, 200)
				this.trade_pwd = this.numarr.join("");


			},
			//密码框
			back() {
				uni.navigateBack();
			},
			//回退方法,关闭弹框
			close() {
				this.show = false
				this.numarr.pop();
				if (this.trade_pwd.length > 0) {
					this.trade_pwd = this.trade_pwd.substring(0, this.trade_pwd.length - 1);
				}
			},
			// 跳转重置密码
			resetpassword(){
				uni.navigateTo({
					url:'../setUp/resetPay'
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
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

	.ditu {
		width: 42rpx;
		height: 56rpx;
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

	/* end */
	.next {
		width: 26rpx;
		height: 46rpx;
	}

	.border_next {
		font-size: 38rpx;
		color: #DE0E0B;
		font-weight: 500;
	}

	.border_num {
		letter-spacing: 4rpx;
	}

	.barner {
		width: 100%;
		height: 260rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		padding: 0 20rpx;
		position: relative;
	}

	.barner_border {
		width: 92%;
		margin: 0 4%;
		height: 260rpx;
		border-bottom: solid 1rpx #E5E5E5;
		position: relative;
	}

	.libao {
		width: 180rpx;
		height: 180rpx;
	}

	.text {
		width: 100%;
		line-height: 130rpx;
		background-color: #FFFFFF;
		padding: 0 30rpx;
	}

	.text_border {
		width: 92%;
		margin: 0 4%;
		height: 130rpx;
		border-bottom: solid 1rpx #E5E5E5;
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
		letter-spacing: 6rpx;
		color: #363636;
		position: absolute;
		left: 130rpx;
		top: 60rpx;
	}

	.barder_right {
		font-size: 34rpx;
		font-weight: 600;
		color: #363636;
		letter-spacing: 6rpx;
		position: absolute;
		left: 310rpx;
		top: 64rpx;
	}

	.barder_last {
		font-size: 30rpx;
		color: #5E5E5E;
		position: absolute;
		left: 130rpx;
		margin-top: 10rpx;
	}

	.border_left {
		margin-left: 30rpx;
		width: 440rpx;
	}
	.adjust{
		// border:1rpx solid red;
		width: 100%;
		height:auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.adjust_left{
		width:400rpx;
		height:52rpx;
		// border:1rpx solid blue;
	}
	// .border_number {
	// 	width: 60rpx;
	// 	line-height: 120rpx;
	// 	position: absolute;
	// 	bottom: 10rpx;
	// 	right: 30rpx;
	// }

	.mt {
		margin-top: 30rpx;
		border: none;
	}

	.none {
		border: none;
	}

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
		width: 70%;
		height: 120rpx;
		background-color: #FFFFFF;
		color: #D12D3E;
		letter-spacing: 4rpx;
		font-size: 34rpx;
		font-weight: 500;
	}

	.button_right {
		width: 30%;
		height: 120rpx;
		background-color: #5880FA;
		letter-spacing: 4rpx;
	}

	/* 支付 */
	.contents {
		width: 100%;
		font-size: 28upx;
		background: #fff;
		color: #555;
		height: 100vh;
		font-weight: 400;
		position: absolute;
		top: 0;
		z-index: 111;

		.keypan {
			width: 100%;
			height: 500upx;
			position: fixed;
			left: 0;
			bottom: 0;
			background: #E6E6E6;

			.titles {
				width: 90%;
				height: 80upx;
				background: #E6E6E6;
				display: flex;
				justify-content: space-between;
				line-height: 80upx;
				padding: 0 5%;
				font-size: 32upx;
				color: #292824;

				span {
					width: 100upx;
					height: 70upx;
					display: inline-block;
					padding-left: 30upx;
				}

			}

			.pan_num_key {
				width: 30%;
				height: 80upx;
				float: Left;
				margin-left: 2.1%;
				margin-top: 2.1%;
				text-align: center;
				background: #fff;
				font-size: 30upx;
				border-radius: 10upx;
				font-size: 35upx;
				line-height: 60upx;
				box-shadow: 0 2upx 5upx rgba(0, 0, 0, 0.5);

			}

			.pan_num_checked {
				width: 30%;
				height: 80upx;
				float: Left;
				margin-left: 2.1%;
				margin-top: 2.1%;
				text-align: center;
				font-size: 30upx;
				border-radius: 10upx;
				font-size: 35upx;
				line-height: 60upx;
				box-shadow: 0 2upx 5upx rgba(0, 0, 0, 0.5);
				animation: checked_bg 0.08s ease;
			}
		}

		.navigation_bar {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding-top: 60upx;

			.back-icon {
				width: 18upx;
				height: 34upx;
			}
		}

		.login {
			width: 100%;
			height: 300upx;

			.l_top {
				width: 700upx;
				height: 200upx;
				margin: 0 auto;
				position: relative;

				.l_text {
					width: 445upx;
					height: 69upx;
					font-size: 28upx;
					text-align: center;
					margin: auto;
					top: 100upx;
					position: relative;

				}

				.lt {
					margin-top: -20upx;
					font-size: 25upx;
					color: #555
				}
			}
		}

		.title {
			color: #616161;
			text-align: center;
			font-size: 30upx;
			margin-bottom: 34upx;
		}

		.mima {

			flex-direction: row;
			width: 680upx;
			height: 78upx;
			margin: 0 auto;
			position: relative;

			.item {
				width: 92upx;
				height: 100%;
				box-sizing: border-box;
				display: flex;
				float: left;
				align-items: center;
				justify-content: center;
				border-bottom: 1upx solid #E5E5E5;
				margin-left: 20upx;

				.line {
					width: 2upx;
					height: 40upx;
					background: #979797;
					animation: shan 1s ease infinite;
				}

				.dot {
					width: 20upx;
					height: 20upx;
					border-radius: 20upx;
					background: black;
				}
			}

			.trade_pwd {
				position: absolute;
				height: 78upx !important;
				width: 480upx;
				opacity: 0;
			}
		}
	}

	@keyframes shan {
		from {
			opacity: 1;
		}

		to {
			opacity: 0;
		}
	}

	@keyframes checked_bg {
		0% {
			background: #fff
		}

		50% {
			background: #D3D1E2
		}

		100% {
			background: #fff
		}
	}
</style>
