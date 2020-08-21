<template>
	<view class="box">
		<view class="border">
			<view class="flexs2">
				<image class="border_image" src="../../static/image/btn_h_fanhui@2x.png" mode="" @click="back"></image>
				<view class="border_text">入网信息认证</view>
				<view class="border_right" @click="toshouye">返回首页</view>
			</view>
		</view>
		<view class="barner flexs">
			<view class="barner_left">
				<!-- <view @click='clickbtn(2)' class='barner_border' :class="{'barner_borders':currentIndex==2}">1</view>
				<view  @click='clickbtn(2)' class='barner_corlor' :class="{'barner_colors':currentIndex==2}">基本信息</view> -->
				<view class="barner_borders">1</view>
				<view class="barner_colors">基本信息</view>
			</view>
			<view class="barner_dashed"></view>
			<view class="barner_right">
				<!-- <view @click='clickbtn(1)' class='barner_border' :class="{'barner_borders':currentIndex==1}">2</view>
				<view  @click='clickbtn(1)' class='barner_corlor' :class="{'barner_colors':currentIndex==1}">企业信息</view> -->
				<view class="barner_border">2</view>
				<view class="barner_color">企业信息</view>
			</view>
		</view>
		<view class="next">
			<view class="next_center">基本信息</view>
		</view>
		<view class="next_border">
			<view class="next_list flexs1">
				<view class="next_sh">商户简称</view>
				<view class="next_bottom flexs2">
					<input type="text" v-model="merchantmingcheng" placeholder="实体店名称或打印小票抬头" />
					<image class="next_image" src="../../static/image/0007.png" mode="" @click="tophotos"></image>
				</view>
			</view>
			<view class="next_list flexs1">
				<view class="next_sh">联系人姓名</view>
				<view class="next_bottom flexs2">
					<input type="text" v-model="merchantname" placeholder="请输入店铺联系人,可与法人不同" />
				</view>
			</view>
			<view class="next_list flexs1">
				<view class="next_sh">联系人手机</view>
				<view class="next_bottom flexs2">
					<input type="number" v-model="merchantphone" :placeholder="phone" disabled/>
				</view>
			</view>
		</view>
		<view class="button flexs" @click="todairu">保存并下一步</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 2,
				merchantmingcheng: '',
				merchantname: '',
				merchantphone: '',
				phone:''
			}
		},
		onLoad(option) {
			this.phone = option.phone
			// 不是从本地获取当前用户手机号
			// this._getphone()
		},
		methods: {
			// _getphone(){
			// 	this.phone = uni.getStorageSync('userinfo').mobile
			// 	console.log(this.phone)
			// },
			clickbtn(index) {
				this.currentIndex = index
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			toshouye() {
				uni.switchTab({
					url: '../index/index'
				})
			},
			tophotos() {
				uni.navigateTo({
					url: '../locationin/Business'
				})
			},
			todairu() {
				if (/^1[345789]\d{9}$/.test(this.phone)) {
					this.merchantphone=this.phone
					let obj = {
						enterprise_name: this.merchantmingcheng,
						contacts_name: this.merchantname,
						contacts_mobile: this.merchantphone
					}
					this.$common.requests('/api/shops/teep_second', obj).then(res => {
						if (res.data.code == 1) {
							uni.navigateTo({
								url: '../locationin/pendingMerchants?id=' + res.data.data
							})
						} else {
							console.log(res.data.msg)
							this.$api.msg(res.data.msg);
						}
					})
				} else {
					this.$api.msg('请输入正确手机号形式')
				}
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
		background-color: #F2F2F2;
	}

	/* border */
	.border {
		width: 100%;
		height: 120rpx;
		color: #3D3D3D;
		padding: 50rpx 20rpx 0 20rpx;
		background-color: #FFFFFF;
	}

	.border_image {
		width: 40rpx;
		height: 30rpx;
	}

	.border_text {
		font-size: 40rpx;
		letter-spacing: 8rpx;
		margin-left: 34rpx;
		font-weight: 500;
	}

	.border_right {
		font-size: 30rpx;
	}

	.border_top {
		width: 94%;
		height: 100rpx;
	}

	/* barner */
	.barner {
		width: 100%;
		height: 200rpx;
		background-color: #FFFFFF;
		margin-top: 30rpx;
	}

	.barner_border {
		width: 70rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 32rpx;
		border-radius: 50% 50%;
		background-color: #999999;
		margin-left: 16rpx;
	}

	.barner_borders {
		width: 70rpx;
		height: 70rpx;
		line-height: 70rpx;
		color: #FFFFFF;
		font-size: 32rpx;
		text-align: center;
		border-radius: 50% 50%;
		background-color: #5A7EF8;
		margin-left: 18rpx;

	}

	.barner_left {
		width: 120rpx;
		height: 120rpx;
		line-height: 64rpx;
		margin-left: -50rpx;
	}

	.barner_right {
		width: 120rpx;
		height: 120rpx;
		line-height: 64rpx;
	}

	.barner_corlor {
		color: #999999;
		margin-top: 10rpx;
	}

	.barner_colors {
		color: #5A7EF8;
	}

	.barner_dashed {
		width: 140rpx;
		height: 10rpx;
		border-top: 1rpx dashed #999999;
		margin: -30rpx 40rpx 0 40rpx;
	}

	/* next */
	.next {
		width: 100%;
		/* 	height: 180rpx; */
		color: #7E7E7E;
	}

	.next_center {
		width: 200rpx;
		height: 30rpx;
		line-height: 30rpx;
		color: #333333;
		font-weight: 600;
		border-left: solid 4rpx #5A7EF8;
		padding-left: 20rpx;
		margin: 40rpx 0 40rpx 30rpx;
	}

	.uni-input-placeholder {
		font-size: 28rpx;
		letter-spacing: 3rpx;
	}

	.next_border {
		width: 100%;
		height: 370rpx;
		background-color: #FFFFFF;
	}

	.next_image {
		width: 42rpx;
		height: 38rpx;
	}

	.next_bottom {
		width: 72%;
		height: 100rpx;
		border-bottom: solid 1rpx #E5E5E5;
	}

	.next_bottom input {
		width: 600rpx;
		height: 100rpx;
	}

	.next_sh {
		width: 160rpx;
		margin-left: 20rpx;
	}

	.next_list {
		margin-top: 20rpx;
	}

	.button {
		width: 100%;
		height: 90rpx;
		background-color: #5A7EF8;
		position: absolute;
		bottom: 0;
		color: #FFFFFF;
		font-size: 32rpx;
	}
</style>
