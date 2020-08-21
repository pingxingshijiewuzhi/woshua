<template>
	<view class='organization'>
		<view class='head_box'>
			<view class='myimgbox'>
				<image src="../../static/pic/img_gsi@2x.png" mode=""></image>
			</view>
			<view class='mycompany'>{{name}}</view>
		</view>
		<view class='repertory' @click='onlinerepertory'>
			<view class='repertory_one'>
				<view class='onlinerepertory'>线上库存</view>
				<view class='fontcolor'>我的机具总量</view>
			</view>
			<view class='repertory_two flexs2'>
				<view>{{num}}</view>
				<image class="next_img" src="../../static/pic/btn_psdz_xyb@2x.png"></image>
			</view>
		</view>
		<view class='getresponse'>
			<view class='response_head'>收到的请求</view>
			<view class='response_body'>
				<view class='response_body_item' @click='goruku'>
					<image src="../../static/pic/icon_d_ruku@2x.png" mode=""></image>
					<view class='response_text'>入库</view>
				</view>
				<view class='response_body_item' @click='goChangePlanes'>
					<image src="../../static/pic/transfrom.png" mode=""></image>
					<view class='response_text'>换机申请</view>
				</view>
				<view class='response_body_item' @click='gojiebangapplication'>
					<image src="../../static/pic/icon_d_jb@2x.png" mode=""></image>
					<view class='response_text'>解绑</view>
				</view>
				<view class='response_body_item' @click='goConversionApplication'>
					<image src="../../static/pic/icon_d_hjsq@2x.png" mode=""></image>
					<view class='response_text'>兑换订单</view>
				</view>
				<view class='response_body_item' @click='goorderinfo'>
					<image src="../../static/pic/orgbuyorder.png" mode=""></image>
					<view class='response_text'>购买订单</view>
				</view>
			</view>
		</view>
		<view class='getresponse'>
			<view class='response_head'>收到的请求</view>
			<view class='response_body'>
				<view class='response_body_item' @click='gochuku'>
					<image src="../../static/pic/icon_d_chuku@2x.png" mode=""></image>
					<view class='response_text'>出库</view>
				</view>
					<view class='response_body_item' @click='gohuanji'>
					<image src="../../static/pic/transfrom.png" mode=""></image>
					<view class='response_text'>换机</view>
				</view>
				<view class='response_body_item' @click='jiebang'>
					<image src="../../static/pic/icon_d_jb@2x.png" mode=""></image>
					<view class='response_text'>解绑</view>
				</view>
				<view class='response_body_item' @click='goConversion'>
					<image src="../../static/pic/icon_d_hjsq@2x.png" mode=""></image>
					<view class='response_text'>兑换</view>
				</view>
			</view>
		</view>
		<view class='bottombox flexs3'>
			<view class='bottombox_item' @click='myrobot'>下发新机</view>
			<view class='bottombox_item' @click='buy_machines'>购买机具码</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				num: ''
			}
		},
		onLoad() {
			this.get_name_num();
		},
		methods: {
			get_name_num() {
				this.$common.requests('/api/pos/get_jigouzhuanqu').then(res => {
					if (res.data.msg == '请先通过实名认证') {
						this.$api.msg(res.data.msg)
						setTimeout(() => {
							uni.navigateTo({
								url: '../personal/realname'
							})
						}, 1000)
						return
					}
					if (res.data.code == 1) {
						this.name = res.data.data.name
						this.num = res.data.data.kucun
					} else {
						this.$api.msg(res.data.msg)
					}
				});
			},
			// 线上库存
			onlinerepertory() {
				uni.navigateTo({
					url: 'onlinerepertory'
				})
			},
			// 入库
			goruku() {
				uni.navigateTo({
					url: 'ruku'
				})
			},
			// 换机申请
			goChangePlanes(){
				this.$api.msg('暂未开放')
				// uni.navigateTo({
				// 	url:'changeplanes'
				// })
			},
			// 解绑申请
			gojiebangapplication(){
				this.$api.msg('暂未开放')
				// uni.navigateTo({
				// 	url:'jiebangapplication'
				// })
			},
			// 兑换申请
			goConversionApplication() {
				uni.navigateTo({
					url: 'conversionapplication'
				})
			},
			// 发放新机
			providenewrobot() {
				uni.navigateTo({
					url: 'providenewrobot'
				})
			},
			// 出库
			gochuku() {
				uni.navigateTo({
					url: 'chuku'
				})
			},
			// 换机更机
			gohuanji(){
				this.$api.msg('暂未开放')
				// uni.navigateTo({
				// 	url:'huanjigengji'
				// })
			},
			// 解绑
			jiebang(){
				this.$api.msg('暂未开放')
				// uni.navigateTo({
				// 	url:'jiebang'
				// })
			},
			// 去兑换
			goConversion() {
				uni.navigateTo({
					url: '../myIntegral/myIntegral'
				})
			},
			// 我的机具
			myrobot() {
				// uni.navigateTo({
				// 	url: '../machine/mymachine'
				// })
				uni.navigateTo({
					url:'../machine/type'
				})
			},
			buy_machines(){
				uni.navigateTo({
					url:'../buymachine/buymachine'
				})
			},
			// 购买订单
			goorderinfo(){
				uni.navigateTo({
					url:'orderRecode'
				})
			}
		}
	}
</script>

<style scoped>
	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.organization {
		height: 100vh;
		width: 100vw;
		overflow: hidden;
	}

	.head_box {
		height: 400rpx;
		width: 100%;
		padding-top: 66rpx;
	}

	.myimgbox {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.myimgbox image {
		width: 176rpx;
		height: 160rpx;
	}

	.mycompany {
		width: 100%;
		height: 120rpx;
		padding-top: 40rpx;
		line-height: 56rpx;
		padding-bottom: 24rpx;
		font-size: 30rpx;
		text-align: center;
	}

	.myname {
		width: 100%;
		text-align: center;
	}

	/* 线上库存样式 */
	.repertory {
		background-color: #FFFFFF;
		padding: 30rpx;
		height: 130rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-bottom: 30rpx;
	}

	.repertory_one {
		width: 230rpx;
		height: 80rpx;
	}

	.onlinerepertory {
		height: 35rpx;
		font-size: 30rpx;
	}

	.fontcolor {
		height: 45rpx;
		padding-top: 10rpx;
		line-height: 35rpx;
		color: #555555;
	}

	.repertory_two {
		width: 80rpx;
		height: 70rpx;
	}

	.repertory_two>view {
		font-size: 36rpx;
		font-weight: 400;
	}

	.next_img {
		width: 18rpx;
		height: 32rpx
	}

	/* 收到请求样式 */
	.getresponse {
		height: 250rpx;
		background-color: #FFFFFF;
		width: 100%;
		padding: 0 30rpx;
		margin-bottom: 30rpx;
	}

	.response_head {
		height: 90rpx;
		width: 100%;
		line-height: 90rpx;
		font-size: 30rpx;
	}

	.response_body {
		width: 100%;
		height: 160rpx;
		display: flex;
		/* justify-content: space-between; */
		justify-content: space-around;
		align-items: center;
	}

	.response_body_item {
		width: 130rpx;
		height: 120rpx;
		/* border:1rpx solid red;     */
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.response_body_item image {
		height: 60rpx;
		width: 60rpx;
	}

	.response_text {
		width: 100%;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
	}

	/* 底部按钮 */
	.bottombox {
		width: 100%;
		height: 100rpx;
		text-align: center;
		position: absolute;
		bottom: 0;
	}
	.bottombox_item{
		width:40%;
		height:80rpx;
		line-height: 80rpx;
		text-align: center;
		border:2rpx solid #F3AB69;
	}
</style>
