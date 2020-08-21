<template>
	<view class="box">
		<view class="border">
			<view class=" border_tops flexs1">
				<image class="border_image" src="../../static/image/0000.png" mode="" @click="back"></image>
				<view class="border_text ">邀请代理</view>
			</view>
			<view class="barner ">
				<image class="border_photo flexs" :src="imgUrl+obj.avatar" mode=""></image>
				<view class="border_kefu flexs">{{obj.nickname}}</view>
				<view class="border_phone flexs">
					<image class="border_biao" src="../../static/image/icon_wdsh_h_dh@2x.png" mode=""></image>
					<view class="barner_phone">{{obj.mobile}}</view>
				</view>
				<image class="barner_tou flexs" :src="obj.picurl" mode=""></image>
				<view class=" barner_bottom flexs">{{obj.idnum}}</view>
				<view class=" barner_last flexs">推荐码</view>
			</view>
			<view class="last">
				<image class="last_l" src="../../static/image/icon_wdsh_h_wx@2x.png" mode="" @click='weichatshare'></image>
				<image class="last_r" src="../../static/image/icon_h_wdsh_pyq@2x.png" mode=""  @click='friendshare'></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgUrl: this.$common.baseUrl,
				obj: {},
				uid:''
			}
		},
		onLoad() {
			this._gethuoban()
		},
		methods: {
			_gethuoban() {
				this.$common.requests('/api/user/get_invitation').then(res => {
					if (res.data.code == 1) {
						this.obj = res.data.data
					} else {
						console.log(res.data.msg)
						this.$api.msg(res.data.msg);
					}
				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 微信分享
			weichatshare(){
				var that=this
				that.uid=uni.getStorageSync('uid');
				uni.share({
				    provider: "weixin",
				    scene: "WXSceneSession",
				    type: 0,
						href: "http://www.j6j6.net/woCodeh5/index.html#/?uid="+that.uid,//分享页面的H5
				    title: "刷脸e付分享",
				    // imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
			},
			// 朋友圈分享
			friendshare(){
				var that=this
				that.uid=uni.getStorageSync('uid');
				uni.share({
				    provider: "weixin",
				    scene: "WXSenceTimeline",
				    type: 0,
						href: "http://www.j6j6.net/woCodeh5/index.html#/?uid="+that.uid,//分享页面的H5
				    // summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				    success: function (res) {
				        console.log("success:" + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log("fail:" + JSON.stringify(err));
				    }
				});
			}
		}
	}
</script>

<style>
	.box {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background-image: url(../../static/image/bg_yqhh@2x.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.border_tops {
		padding-top: 40rpx;
	}

	/* border */
	.border {
		width: 100%;
		height: 100rpx;
		padding: 30rpx 20rpx;
	}

	.border_image {
		width: 40rpx;
		height: 30rpx;

	}

	.border_text {
		font-size: 38rpx;
		color: #FCFFFC;
		letter-spacing: 8rpx;
		/* margin-left: 34rpx; */
		margin: 0 auto;
	}

	.border_top {
		width: 94%;
		height: 100rpx;
	}

	/* barner */
	.barner {
		width: 86%;
		height: 900rpx;
		margin: 0 7%;
		border-radius: 20rpx 20rpx 0 0;
		background-image: url(../../static/image/bg_yqhb_bk@2x.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin-top: 60rpx;
		overflow: hidden;
	}

	.border_photo {
		width: 144rpx;
		height: 136rpx;
		margin: 0rpx auto;
		border-radius: 50% 50%;
		/* margin-top: 10rpx; */
	}

	.border_kefu {
		width: 212rpx;
		height: 60rpx;
		background-color: #587EF9;
		border-radius: 50rpx 50rpx;
		font-size: 30rpx;
		color: #FFFFFF;
		margin: 10rpx auto;
	}

	.border_biao {
		width: 26rpx;
		height: 26rpx;
		margin-top: 10rpx;
		margin-right: 10rpx;
	}

	.border_phone {
		color: #FFFFFF;
	}

	.barner_phone {
		margin-top: 10rpx;
	}

	.barner_tou {
		width: 370rpx;
		height: 370rpx;
		margin: 0 auto;
		margin-top: 90rpx;

	}

	.barner_bottom {
		letter-spacing: 2rpx;
		font-size: 32rpx;
		margin-top: 40rpx;
	}

	.barner_last {
		letter-spacing: 2rpx;
		font-size: 30rpx;
		margin-top: 10rpx;
	}

	.last {
		display: flex;
		justify-content: space-around;
		margin-top: 70rpx;
	}

	.last_l {
		width: 120rpx;
		height: 120rpx;
		margin-left: 50rpx;
	}

	.last_r {
		width: 120rpx;
		height: 120rpx;
		margin-right: 50rpx;
	}
</style>
