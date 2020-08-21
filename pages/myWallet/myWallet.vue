<template>
	<view class="box">
		<!-- border -->
		<view class="border">
			<view class="flexs2 new_box">
				<image class="border_image" src="../../static/image/0000.png" mode="" @click="back"></image>
				<view class="border_text">我的钱包</view>
				<view class="border_right" @click="tozhangdan">账单</view>
			</view>
			<view class="border_center">
				<view>总可用余额</view>
				<view>积分</view>
			</view>
			<view class="border_number">
				<view>{{item.all}}</view>
				<view>{{item.all_jifen}}</view>
			</view>
		</view>
		<!-- barner -->
		<view class="barner">
			<view class='titletabbar flexs3'>
				<!-- :class="{'chooseactive':type==1}" @click='clickbtn(1)' -->
				<view class='titletabbar_item flexs' >结算款账户</view>
				<!-- <view @click='clickbtn(2)' class='titletabbar_item flexs' :class="{'chooseactive':type==2}">激活奖励账户</view> -->
			</view>
		</view>
		<view class="bgc_"></view>
		<!-- v-show="type==1" -->
		<view class="deal flexs3 ">
			<view class="deal_left">
				<view class="deal_number">{{item.settlement}}</view>
				<view class="deal_text">可用余额(元)</view>
			</view>
			<view class="deal_bgc"></view>
			<view class="deal_left">
				<view class="deal_number">{{item.shui_jiesuan}}</view>
				<view class="deal_text">应纳税金额(元)</view>
			</view>
		</view>
		<!-- <view class="deal flexs3 " v-show="type==2">
			<view class="deal_left">
				<view class="deal_number">{{item.activation}}</view>
				<view class="deal_text">可用余额(元)</view>
			</view>
			<view class="deal_bgc"></view>
			<view class="deal_left">
				<view class="deal_number">{{item.shui_jihuo}}</view>
				<view class="deal_text">应纳税金额(元)</view>
			</view>
		</view> -->
		<view class="button" @click="totixian">去提现</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// type: '1',
				item: '',
				// 身份是否实名验证
				identity:'',
			}
		},
		onShow() {
			this.getdata();
			this._getStatus()
		},
		methods: {
			_getStatus(){
				this.$common.requests('/api/user/is_shiming').then(res => {
					if (res.data.code == 1) {
						this.identity = true
					} else {
						this.identity = false
						// this.$api.msg(res.data.msg);
					}
				});
			},
			// clickbtn(index) {
			// 	this.type = index
			// },
			tozhangdan() {
				uni.navigateTo({
					url: '../myWallet/bill'
				})
			},
			totixian() {
				if(this.identity){
					uni.navigateTo({
						url: '../myWallet/deposit'
					})
				}else{
					this.$api.msg('请实名认证绑定银行卡')
				}
				
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			getdata() {
				this.$common.requests('/api/money/get_money').then(res => {
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
	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.box {
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
		overflow: hidden;
	}

	/* border */
	.border {
		width: 100%;
		height: 330rpx;
		background-image: url(../../static/image/8888.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		padding: 70rpx 20rpx 30rpx 20rpx;
	}
	.new_box{
		width:97%;
		margin:0 auto;
	}
	.border_image {
		width: 40rpx;
		height: 30rpx;
	}

	.border_text {
		font-size: 32rpx;
		color: #FCFFFC;
	}

	.border_right {
		font-size: 28rpx;
		color: #DDE9F4;
	}

	.border_top {
		width: 94%;
		height: 100rpx;
	}

	.border_center {
		width:97%;
		margin:40rpx auto;
		font-size: 28rpx;
		color: #DDE9F4;
		display: flex;
		justify-content: space-between;
	}

	.border_number {
		width:97%;
		margin:30rpx auto;
		color: #FCFFFC;
		font-size: 40rpx;
		display: flex;
		justify-content: space-between;
	}

	/* barner */

	.titletabbar_item {
		width: 30%;
		height: 100%;
		font-size: 30rpx;
		font-weight: 500;
	}

	.chooseactive {
		font-size: 30rpx;
		font-weight: 500;
		color: #94A6EA;
		border-bottom: solid 2rpx #5A7DF6;
	}

	.titletabbar {
		width: 100%;
		height:90rpx;
		line-height: 90rpx;
	}

	.bgc_ {
		width: 100%;
		height: 30rpx;
		background-color: #F2F2F2;
	}

	.deal {
		width: 100%;
		height: 230rpx;
	}

	.deal_text {
		color: #BCBCBC;
		margin-top: 30rpx;
	}

	.deal_bgc {
		width: 10rpx;
		height: 100rpx;
		border-right: solid 1rpx #BCBCBC;
	}

	.button {
		width: 83%;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		margin: 0 10%;
		background-color: #EAF0FE;
		border: solid 1rpx #99AFFB;
		border-radius: 50rpx 50rpx;
		font-weight: 600;
	}

	.deal_left {
		width: 49%;
		text-align: center;
	}
	.deal_number{
		font-size: 36rpx;
		font-weight: 600;
		letter-spacing: 3rpx;
	}
</style>
