<template>
	<view class="box">
		<view class="barder flexs2">
			<image class="ditu" src="../../static/image/0008.png" mode=""></image>
			<view class="" @click="todizhi">
				<view class="flexs1">
					<view class="barder_left">废后将军</view>
					<view class="barder_right">155****1778</view>
				</view>
				<view class="barder_last">江苏省徐州市铜山区万达广场</view>
			</view>
			<image class="next" src="../../static/image/btn_psdz_xyb@2x.png" mode=""></image>
		</view>
		<view class="barner ">
			<view class="barner_border flexs1">
				<image class="libao" src="../../static/image/img_zp1@2x.png" mode=""></image>
				<view class="border_left">
					<view class="barner_first">小喔电签体验礼包A</view>
					<view class=" flexs1">
						<view class="border_next">￥3200</view>
						<view class="border_num">/20台</view>
					</view>
				</view>
				<view class="border_number">×1</view>
			</view>
		</view>
		<view class="text">
			<view class="text_border flexs2">
				<view class="">兑换对象</view>
				<view class="">总部</view>
			</view>
		</view>
		<view class="text">
			<view class="text_border none flexs2">
				<view class="">配送方式(包邮)</view>
				<view class="">快递配送</view>
			</view>
		</view>
		<view class="text ">
			<view class="text_border mt flexs2">
				<view class="">支付方式</view>
				<view class="">积分支付</view>
			</view>
		</view>
		<view class="button flexs1">
			<view class="button_left">合计￥3200</view>
			<view class="button_right" @tap="gopay">提交</view>
		</view>
		<!-- 		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
					<image class="deleat"  src="../../static/image/icon_mm_gb@2x.png" mode="" @tap="hideModal"></image>
					<view class="pasword">输入支付密码</view>
					<view class=" list flexs3">
						<view class="box_list"><input type="pasword" placeholder="" /></view>
						<view class="box_list"><input type="pasword" placeholder="" /></view>
						<view class="box_list"><input type="pasword" placeholder="" /></view>
						<view class="box_list"><input type="pasword" placeholder="" /></view>
						<view class="box_list"><input type="pasword" placeholder="" /></view>
						<view class="box_list"><input type="pasword" placeholder="" /></view>
					</view>
					<view class="  flexs1">
					 <view class="buttons" @tap="hideModal">确认支付 </view>
					</view>
			</view>
		</view> -->
		<!-- 支付密码 -->
		<view class="content" v-show="topasword">
			<view class="login">
				<view class="l_top" style="margin-bottom:100upx;">
					<view class="l_text">请输入6位支付密码，注意不要重复或连续数字</view>
				</view>
				<view class="l_top">
					<view class="mima">
						<view class="item">
							<view v-if="len<=0" :class="{line:show}"></view>
							<view v-if="len>=1" class="dot"></view>
						</view>
						<view class="item">
							<view v-if="len==1" :class="{line:show}"></view>
							<view v-if="len>=2" class="dot"></view>
						</view>
						<view class="item">
							<view v-if="len==2" :class="{line:show}"></view>
							<view v-if="len>=3" class="dot"></view>
						</view>
						<view class="item">
							<view v-if="len==3" :class="{line:show}"></view>
							<view v-if="len>=4" class="dot"></view>
						</view>
						<view class="item">
							<view v-if="len==4" :class="{line:show}"></view>
							<view v-if="len>=5" class="dot"></view>
						</view>
						<view class="item">
							<view v-if="len==5" :class="{line:show}"></view>
							<view v-if="len>=6" class="dot"></view>

						</view>
						<view v-if="len>5" class="dot">{{numlength}}</view>
						<input class="trade_pwd" disabled="disabled" maxlength="6" id="targetInput" @focus="focus1" @blur="blur1" type="number"
						 v-model="trade_pwd" />
					</view>
				</view>
			</view>
			<view class="keypan">
				<view class="titles">
					<span @click="back()">取消</span>
					<span @click='setpwd'>确认</span>
				</view>
				<view class="pan_num_key" :class="[items.checked?'pan_num_checked':'pan_num_key']" v-for="(items,index) in boardlists"
				 :key="index" @click="writepwd(items.id)">{{items.con}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	// 	export default{
	// 	data(){
	// 		return{
	// 			modalName: null,
	// 		}
	// 				},
	// 	methods:{
	// 		todizhi(){
	// 			uni.navigateTo({
	// 				url:"../myIntegral/site"
	// 			})
	// 		},
	// 			showModal(e) {
	// 				this.modalName = e.currentTarget.dataset.target
	// 			},
	// 			hideModal(e) {
	// 				this.modalName = null
	// 			},
	// 	},
	// }
	import {
		mapGetters,
		mapActions
	} from 'vuex';

	export default {
		computed: {
			...mapGetters(['statusBarHeight'])
		},
		data() {
			return {
				modalName: null,
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
				boardlists: [{
						id: 1,
						con: 1,
						checked: false
					}, {
						id: 2,
						con: 2,
						checked: false
					}, {
						id: 3,
						con: 3,
						checked: false
					}, {
						id: 4,
						con: 4,
						checked: false
					}, {
						id: 5,
						con: 5,
						checked: false
					}, {
						id: 6,
						con: 6,
						checked: false
					}, {
						id: 7,
						con: 7,
						checked: false
					}, {
						id: 8,
						con: 8,
						checked: false
					}, {
						id: 9,
						con: 9,
						checked: false
					}, {
						id: 10,
						con: "",
						checked: false
					}, {
						id: 11,
						con: 0,
						checked: false
					},
					{
						id: 12,
						con: "x",
						checked: false
					},

				],
				modalName1: null,
				currentIndex: 0,
			}
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

			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			inputNumFun(op) {
				let _this = this
				if (_this.password.length <= 6) {
					_this.password += op.num
					if (_this.password.length == 6) {
						_this.$emit('getPassword', {
							password: _this.password
						})
						uni.showModal({
							title: '密码',
							content: _this.password,
							success() {
								_this.password = ""
							}
						})
					}
				}

			},
			delNumFun() {
				if (this.password.length == 0) return
				this.password = this.password.substring(0, this.password.length - 1)
				console.log("删除后的结果", this.password)
			},
			forgetFun() {
				uni.showToast({
					title: '忘记密码操作',
					icon: 'none'
				})
			},
			hideFun() {
				this.$emit('hideFun')
			},
			todizhi() {
				uni.navigateTo({
					url: "../myIntegral/site"
				})
			},
			// 	showModal(e) {
			// 		this.modalName = e.currentTarget.dataset.target
			// 	},

			// 	// 模态框1确认
			// 	hideModal(e) {
			// 		this.modalName = null
			// 	},
			gopay() {
				this.modalName = null
				this.topasword = true
			},
			hidden(index) {
				console.log(index)
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
			//回退方法
			close() {
				this.numarr.pop();
				if (this.trade_pwd.length > 0) {
					this.trade_pwd = this.trade_pwd.substring(0, this.trade_pwd.length - 1);
				}
			},
			blur1() {
				this.show = false
			},
			focus1() {

				this.show = true
			},

			// 确认执行的方法
			setpwd() {
				if (this.trade_pwd.length < 6) {
					console.log('密码长度不能少于6位');
					return;
				}
				// 密码长度为6位以后执行方法
				console.log(this.trade_pwd);

			},
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
		border: solid 1rpx #E5E5E5;
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
		padding: 0 30rpx;
		position: relative;
	}

	.barner_border {
		width: 90%;
		margin: 0 5%;
		height: 260rpx;
		border-bottom: solid 1rpx #E5E5E5;
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
		width: 90%;
		margin: 0 5%;
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
	}

	.button_right {
		width: 30%;
		height: 120rpx;
		background-color: #5880FA;
	}

	/* 支付 */
	.content {
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
