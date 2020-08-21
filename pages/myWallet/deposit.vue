<template>
	<view class="box">
		<view class="border flexs1">
			<view class="border_card">到账银行卡</view>
			<view class="border_ran flexs1">
				<image class="border_img" :src="baseurl+bankList.bank_image" mode=""></image>
				<view>{{bankList.bank_name}}({{bankList.bank_num}})</view>
			<!-- 	<input type="text" v-model="bank_num" placeholder="" /> -->
				<!-- <view class="card_color" v-model="card">{{card}}</view> -->
			</view>
		</view>
	<view class="border flexs1">
		<view class="border_cards">提现金额</view>
		<view class="border_ran flexs1">
			<input type="text"  v-model="money" placeholder="请输入提现金额" />
		</view>
	</view>
	<view class="button" @tap="gopay"  data-target="DialogModal1">确认提现</view>
	<!-- 支付密码 -->
		<passkeyborad :show="show" @close="close" :money='realymoney' @makesure='makesure'></passkeyborad>
	</view>
</template>

<script>
	import passkeyborad from '@/components/yzc-withwalkeyboard/yzc-withwalkeyboard.vue';
		export default{
		components: {
			passkeyborad,
		},
	data(){
		return{ 
			modalName: null,
			realymoney:'',
			show: false,
			money:'',
			// type:'',
			// bank_num:'',
			card:'123',
			bankList:[],
			baseurl: this.$common.baseUrl,
		}
	},
	onLoad(wallt){
		this.gatadata()
		this.getList()
		// this.type=wallt.type
	},
	methods:{
		showModal(e) {
			this.modalName = e.currentTarget.dataset.target
		},
		hideModal(e) {
			this.modalName = null
		},
		// 打开弹框
		gopay(){
			this.modalName = null
			this.show = true
		},
		// 关闭支付密码弹框
		close() {
			this.show = false
		},
		makesure(password){
			this.show = false
			let obj = {
				money:this.money,
				// type:this.type,
				pay_pwd:password,
			}
			this.$common.requests('/api/money/add_withdraw',obj).then(res => {
				if(res.data.code == 1){
					this.$api.msg(res.data.msg);
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1000)
				}else{
					this.$api.msg(res.data.msg);
				}
			})

		},
		gatadata(){
			this.$common.requests('/api/money/add_withdraw').then(res=>{
				
			})
		},
		//获取银行卡信息
		getList() {
			this.$common.requests('/api/money/get_bank').then(res => {
				if (res.data.code == 1) {
					this.bankList = res.data.data;
					console.log(this.bankList)
				} else {
					this.$api.msg(res.data.msg);
				}
			})
		}
	},
}
</script>

<style lang="scss" scoped>
	.box{
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background-color: #FFFFFF;
	}
	.border{
		width:100%;
		height: 160rpx;
		padding: 0 30rpx;
	}
	.border_card{
		width: 188rpx;
		font-size: 32rpx;
		font-weight: 500;
		letter-spacing: 2rpx;
	}
	.border_cards{
		width: 180rpx;
		font-size: 32rpx;
		font-weight: 500;
		letter-spacing: 6rpx;
	}
	.border_img{
		width: 52rpx;
		height: 44rpx;
		margin-right: 10rpx;
	}
	.border_ran{
		width: 72%;
		height:120rpx;
		border-bottom: solid 1rpx #E5E5E5;
	}
	.uni-input-placeholder{
		font-size: 28rpx;
		color:#6C6C6C
	}
	.button{
		width: 94%;
		line-height: 100rpx;
		text-align: center;
		background-color:#5A7EF8 ;
		color: #FFFFFF;
		margin: 100rpx 3% 0 3%;
		font-size: 34rpx;
	}
	.buttons{
		width: 94%;
		line-height: 80rpx;
		text-align: center;
		background-color:#5A7EF8 ;
		color: #FFFFFF;
		margin: 100rpx 3% 0 3%;
		font-size: 34rpx;
		margin: 20rpx 30rpx 50rpx 30rpx;
	}
	.deleat{
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		right: 20rpx;
		top:20rpx;
	}
	.pasword{
		font-size: 32rpx;
		margin: 30rpx 0 20rpx 0;
	}
	.list{
		width: 100%;
		height: 180rpx;
	}
	.box_list{
		width: 80rpx;
		height: 80rpx;
		border: solid 1rpx #E5E5E5;
	}
	.box_list input{
		margin-top: 16rpx;
		font-size: 34rpx;
	}
	.card_color{
		font-size: 30rpx;
		color: #808080;
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
