<template>
	<view class="box">
		<!-- barner -->
		<swiper class="barner" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true" :autoplay="true"
		 interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>
		<!-- list -->
		<view class="biglist">
			<view class="flexs1">
				<view class="list " @click="tolibao">
					<image class="list_image" src="../../static/image/icon_lbhd@2x.png" mode=""></image>
					<view class="list_with">礼包活动</view>
				</view>
				<view class="list" @click="towangpu">
					<image class="list_image" src="../../static/image/icon_wprj@2x.png" mode=""></image>
					<view class="list_with">旺铺入住</view>
				</view>
				<view class="list" @click="tofuwu">
					<image class="list_image" src="../../static/image/icon_fwgd@2x.png" mode=""></image>
					<view class="list_with">服务单位</view>
				</view>
				<view class="list" @click="topartners">
					<image class="list_image" src="../../static/image/icon_yqhb@2x.png" mode=""></image>
					<view class="list_with">邀请代理</view>
				</view>
				<view class="list" @click="toranking">
					<image class="list_image" src="../../static/image/icon_phb@2x.png" mode=""></image>
					<view class="list_with">排行榜</view>
				</view>
			</view>
			<view class=" list_text flexs1">
				<view class="list" @click="tomerchant">
					<image class="list_image" src="../../static/image/icon_wdsh@2x.png" mode=""></image>
					<view class="list_with">我的商户</view>
				</view>
				<view class="list" @click="tojiju">
					<image class="list_image" src="../../static/image/icon_wdjj@2x.png" mode=""></image>
					<view class="list_with">我的机具</view>
				</view>
				<view class="list" @click="toriend">
					<image class="list_image" src="../../static/image/icon_wdhb@2x.png" mode=""></image>
					<view class="list_with">我的代理</view>
				</view>
				<view class="list" @click="towallet">
					<image class="list_image" src="../../static/image/icon_wdqb@2x.png" mode=""></image>
					<view class="list_with">我的钱包</view>
				</view>
				<view class="list" @click="tojifen">
					<image class="list_image" src="../../static/image/icon_jfdh@2x.png" mode=""></image>
					<view class="list_with">积分兑换</view>
				</view>
			</view>
		</view>
		<!-- notice -->
		<view class="notice flexs1" @click="totongzhi">
			<image src="../../static/image/img_xx@2x.png"></image>
			<view class="gx"></view>
			<uni-notice-bar class="gonggao" :scrollable="true" :text="welcome" />
		</view>
		<!-- now -->
		<view class="now" @click="toshuju">
			<view class="now_start">本月业绩</view>
			<view class="now_next">商户交易金额</view>
			<view class="now_ran">636287.32</view>
			<view class=" now_number flexs3">
				<view class="">555</view>
				<view class="">0</view>
			</view>
			<view class=" now_last flexs3">
				<view class="">新增代理</view>
				<view class="">新增商户(户)</view>
			</view>
		</view>
		<!-- last -->
		<view class="last" @click="toshuju">
			<view class="now_start">上月业绩</view>
			<view class="now_next">商户交易金额</view>
			<view class="now_ran">636287.32</view>
			<view class="flexs last_big">
				<view class="last_left">同比上期收益</view>
				<view class="last_right">-2.00%</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	export default {
		data() {
			return {
				welcome: '新用户注册首单减免、邀请好友注册更有好礼相送！就不告诉你',
				dotStyle: false,
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, ],
			}
		},
		// onLoad() {
		// 	this.TowerSwiper('TowerSwiper ');
		// 	// 初始化towerSwiper 传已有的数组名即可
		// },
		methods: {
			toriend() {
				uni.navigateTo({
					url: "../friend/partner"
				})
			},
			tolibao() {
				uni.navigateTo({
					url: "../activity/activity"
				})
			},
			towallet() {
				uni.navigateTo({
					url: "../myWallet/myWallet"
				})
			},
			tojifen() {
				uni.navigateTo({
					url: "../myIntegral/myIntegral"
				})
			},
			totongzhi() {
				uni.navigateTo({
					url: "../index/inform"
				})
			},
			towangpu() {
				uni.navigateTo({
					url: "../locationin/locationin"
				})
			},
			tofuwu() {
				uni.navigateTo({
					url: "../service/service"
				})
			},
			topartners() {
				uni.navigateTo({
					url: "../partners/partners"
				})
			},
			toranking() {
				uni.navigateTo({
					url: "../ranking/ranking"
				})
			},
			tomerchant() {
				uni.navigateTo({
					url: "../merchant/merchant"
				})
			},
			tojiju() {
				uni.navigateTo({
					url: "../machine/type"
				})
			},
			toshuju() {
				uni.switchTab({
					url: "../data/data"
				})
			}
		},
		DotStyle(e) {
			this.dotStyle = e.detail.value
		},
		cardSwiper(e) {
			this.cardCur = e.detail.current
		},
		TowerSwiper(name) {
			let list = this[name];
			for (let i = 0; i < list.length; i++) {
				list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
				list[i].mLeft = i - parseInt(list.length / 2)
			}
			this.swiperList = list
		},
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
		overflow: hidden;
		background-color: #F2F2F2;
	}

	uni-image {
		width: 100%;
		height: 320rpx;
	}

	/* barner */
	.barner {
		width: 100vw;
		height: 290rpx !important;
	}

	/* list */
	.biglist {
		width: 100%;
		height: 24%;
		background-color: #FFFFFF;
		font-size: 28rpx;
	}

	.list {
		width: 20%;
		text-align: center;
		margin-top: 12rpx;
	}

	.list_image {
		width: 76rpx;
		height: 76rpx;
	}

	.list_text {
		font-size: 28rpx;
	}

	/* notice */
	.notice {
		height: 5%;
		background-color: #FFFFFF;
		margin-top: 15rpx;
	}

	.notice image {
		margin-left: 20rpx;
		width: 40rpx;
		height: 30rpx;
	}

	.notice_title {
		width: 350rpx;
		margin-left: 20rpx
	}

	.uni-noticebar {
		width: 100% !important;
		color: #000000 !important;
	}

	/* now */
	.now {
		width: 94%;
		height: 21%;
		margin: 0 3%;
		background-color: #FFFFFF;
		margin-top: 15rpx;
		border-radius: 15rpx;
		overflow: hidden;
	}

	.now_start {
		font-size: 30rpx;
		color: #617FE4;
		width: 220rpx;
		height: 40rpx;
		border-left: solid 6rpx #617FE4;
		margin: 10rpx 0 0 30rpx;
		padding-left: 20rpx;
	}

	.now_next {
		width: 100%;
		font-size: 28rpx;
		color: #A1A1A1;
		text-align: center;
		margin-top: 10rpx;
	}

	.now_ran {
		font-size: 44rpx;
		color: #5980F8;
		font-weight: 600;
		text-align: center;
		margin-top: 15rpx;
	}

	.now_number {
		font-size: 30rpx;
		color: #AAAAAA;
		text-align: center;
	}

	.now_last {
		font-size: 28rpx;
		color: #AAAAAA;
	}

	/* last */
	.last {
		width: 94%;
		height: 19%;
		margin: 0 3%;
		background-color: #FFFFFF;
		margin-top: 15rpx;
		overflow: hidden;
	}

	.last_big {
		margin-top: 10rpx;
	}

	.last_left {
		font-size: 28rpx;
		color: #A1A1A1;
	}

	.last_right {
		font-size: 28rpx;
		color: #CF5A5A;
	}
</style>
