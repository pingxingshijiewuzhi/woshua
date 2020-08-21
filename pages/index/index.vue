<template>
	<view class="box">
		<!-- barner -->
		<swiper class="barner" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true" :autoplay="true"
		 interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image class="images_swiper" :src="Urls+ item.image" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<!-- list -->
		<view class="biglist">
			<view class="list_text flexs1">
				<view class="list " @click="tolibao">
					<image class="list_image" src="../../static/image/icon_lbhd@2x.png" mode=""></image>
					<view class="list_with">活动专区</view>
				</view>
				<view class="list" @click="towangpu">
					<image class="list_image" src="../../static/image/icon_wprj@2x.png" mode=""></image>
					<view class="list_with">商家入驻</view>
				</view>
				<view class="list" @click="tofuwu">
					<image class="list_image" src="../../static/image/icon_fwgd@2x.png" mode=""></image>
					<view class="list_with">服务中心</view>
				</view>
				<view class="list" @click="topartners">
					<image class="list_image" src="../../static/image/icon_yqhb@2x.png" mode=""></image>
					<view class="list_with">邀请团队</view>
				</view>
				<view class="list" @click="toranking">
					<image class="list_image" src="../../static/image/icon_phb@2x.png" mode=""></image>
					<view class="list_with">个人排行</view>
				</view>
			</view>
			<view class=" list_texts mt flexs1">
				<view class="list" @click="tomerchant">
					<image class="list_image" src="../../static/image/icon_wdsh@2x.png" mode=""></image>
					<!-- <view class="list_with">我的商户</view> -->
					<view class="list_with">我的终端</view>
				</view>
				<view class="list" @click="tojiju">
					<image class="list_image" src="../../static/image/icon_wdjj@2x.png" mode=""></image>
					<!-- <view class="list_with">我的机具</view> -->
					<view class="list_with">终端编码</view>
				</view>
				<view class="list" @click="toriend">
					<image class="list_image" src="../../static/image/icon_wdhb@2x.png" mode=""></image>
					<!-- <view class="list_with">我的代理</view> -->
					<view class="list_with">我的团队</view>
				</view>
				<view class="list" @click="towallet">
					<image class="list_image" src="../../static/image/icon_wdqb@2x.png" mode=""></image>
					<view class="list_with">我的钱包</view>
				</view>
				<view class="list" @click="tojifen">
					<image class="list_image" src="../../static/image/icon_jfdh@2x.png" mode=""></image>
					<!-- <view class="list_with">积分兑换</view> -->
					<view class="list_with">兑换中心</view>
				</view>
			</view>
		</view>
		<!-- notice -->
		<view class="notice flexs1" @click="totongzhi">
			<image class="image_left" src="../../static/image/img_xx@2x.png"></image>
			<view class="gx"></view>
			<uni-notice-bar class="gonggao" :scrollable="true" :text="welcome" />
		</view>
		<!-- now -->
		<view class="now" @click="toshuju">
			<view class="now_start">本月业绩</view>
			<view class="now_next">商户交易额（元）</view>
			<view class="now_ran">{{this_money}}</view>
			<view class=" now_number flexs2">
				<view class="screenitem">{{agent}}</view>
				<view class="screenitem">{{friends_num}}</view>
				<view class="screenitem">{{shop_num}}</view>
			</view>
			<view class=" now_last flexs2">
				<view class='screenitem'>新增代理(人)</view>
				<view class="screenitem">新增粉丝(人)</view>
				<view class="screenitem">新增商户(户)</view>
			</view>
		</view>
		<!-- last -->
		<view class="last" @click="toshuju">
			<view class="now_start">上月收益</view>
			<view class="now_next">上月收益（元）</view>
			<view class="now_ran">{{last_money}}</view>
			<view class="flexs last_big">
				<view class="last_left">同比上期收益</view>
				<view class="last_right">{{bi}}%</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	export default {
		components: {
			// numberKeyboard,
			// passwordInput
		},
		data() {
			return {
				// welcome:'新用户注册首单减免、邀请好友注册更有好礼相送！就不告诉你',
				welcome: '',
				dotStyle: false,
				swiperList: [],
				Urls: this.$common.baseUrl,
				this_money: '',
				last_money: '',
				shop_num: '',
				friends_num: '',
				bi: '',
				agent:'',
				// 记住账号密码
				// account:'',
				// password:''
			}
		},
		// onLoad() {
		// 	this.TowerSwiper('TowerSwiper ');
		// 	// 初始化towerSwiper 传已有的数组名即可
		// },
		onLoad() {
			// this.isLogin()
		},
		onShow() {
			this.getbanner();
			this.getnotice();
			this.get_yeji();
		},
		methods: {
			get_yeji() {

				this.$common.requests('/api/index/get_yeji').then(res => {
					if (res.data.code == 1) {
						this.this_money = res.data.data.this_money;
						this.last_money = res.data.data.last_money;
						this.shop_num = res.data.data.shop_num;
						this.friends_num = res.data.data.friends;
						this.bi = res.data.data.bi;

						this.agent = res.data.data.agent
					} else {
						this.$api.msg(res.data.msg)
					}
				});
			},
			getbanner() {
				this.$common.requests('/api/index/get_index_banner').then(res => {
					if (res.data.code == 1) {
						this.swiperList = res.data.data;
					} else {
						this.$api.msg(res.data.msg);
					}
				});
			},
			getnotice() {
				this.$common.requests('/api/index/get_new_notice').then(res => {
					if (res.data.code == 1) {
						this.welcome = res.data.data.content;
					} else {
						this.$api.msg(res.data.msg);
					}
				});
			},
			toriend() {
				this.$common.requests('/api/about/tttoken').then(res=>{
					uni.navigateTo({
						url: "../friend/partner"
					})
				})
			},
			tolibao() {
				this.$common.requests('/api/about/tttoken').then(res=>{
					uni.navigateTo({
						url: "../activity/activity"
					})
				})
			},
			towallet() {
				this.$common.requests('/api/about/tttoken').then(res=>{
				uni.navigateTo({
					url: "../myWallet/myWallet"
				})
				})
			},
			tojifen() {
				this.$common.requests('/api/about/tttoken').then(res=>{
					uni.navigateTo({
						url: "../myIntegral/myIntegral"
					})
				})
			},
			totongzhi() {
				uni.navigateTo({
					url: "../index/inform"
				})
			},
			towangpu() {
				this.$common.requests('/api/about/tttoken').then(res=>{
					uni.navigateTo({
						url: "../locationin/locationin"
					})
				})
			},
			tofuwu() {
				this.$common.requests('/api/about/tttoken').then(res=>{
				uni.navigateTo({
					url: "../service/service"
				})
				})
			},
			topartners() {
				// this.$common.requests('/api/user/checking_user_type').then(res=>{
				// 	if(res.data.code == 1){
						
				// 	}else{
				// 		this.$api.msg(res.data.msg)
				// 	}
				// })
				this.$common.requests('/api/about/tttoken').then(res=>{
					uni.navigateTo({
						url: "../partners/partners"
					})
				})
			},
			toranking() {
				this.$common.requests('/api/about/tttoken').then(res=>{
					uni.navigateTo({
						url: "../ranking/ranking"
					})
				})
			},
			tomerchant() {
				this.$common.requests('/api/about/tttoken').then(res=>{
					uni.navigateTo({
						url: "../merchant/merchant"
					})
				})
			},
			tojiju() {
				this.$common.requests('/api/about/tttoken').then(res=>{
					uni.navigateTo({
						url: "../machine/type"
					})
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
	}

	.box {
		width: 100vw;
		height: 100vh;
		background-color: #F2F2F2;
	}

	uni-image {
		width: 100%;
		height: 420rpx;
	}

	.image_left {}
	.images_swiper{
		width: 100%;
		height: 100%;
	}
	/* barner */
	.barner {
		width: 100%;
		height: 314rpx !important;
	}

	/* list */
	.biglist {
		width: 100%;
		height: 380rpx;
		background-color: #FFFFFF;
		font-size: 28rpx;
		line-height: center;
	}

	.list {
		width: 300rpx;
		text-align: center;
		margin-top: 25rpx;
	}

	.list_image {
		width: 92rpx;
		height: 92rpx;
		background-color: #FFFFFF;
	}

	.list_text {
		width: 100%;
		height: 50%;
		font-size: 30rpx;
	}

	.list_texts {
		width: 100%;
		height: 40%;
		font-size: 30rpx;
	}

	/* notice */
	.notice {
		height: 80rpx;
		background-color: #FFFFFF;
		margin-top: 25rpx;
	}

	.notice image {
		margin-left: 30rpx;
		width: 44rpx;
		height: 34rpx;
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
		height: 370rpx;
		margin: 0rpx auto;
		padding: 10rpx 0;
		background-color: #FFFFFF;
		margin-top: 25rpx;
		border-radius: 15rpx;
		box-shadow: 2px 5px 12px rgba(0, 0, 0, .1);
	}
	.screenitem{
		width:240rpx;
		height:50rpx;
		line-height: 50rpx;
		text-align: center;
		/* border:1rpx solid red; */
	}
	.now_start {
		height: 40rpx;
		font-size: 30rpx;
		margin: 25rpx 0 0 20rpx;
		padding: 0 0 0 10rpx;
		color: #617FE4;
		width: 330rpx;
		border-left: solid 6rpx #617FE4;
		font-weight: 600;
	}

	.now_next {
		width: 100%;
		line-height: 60rpx;
		height:60rpx;
		font-size: 34rpx;
		color: #A1A1A1;
		text-align: center;
		margin-top: 6rpx;
	}

	.now_ran {
		line-height: 70rpx;
		height:70rpx;
		font-size: 50rpx;
		color: #5980F8;
		font-weight: 600;
		text-align: center;
		margin-top: 6rpx;
	}

	.now_number {
		line-height: 50rpx;
		font-size: 36rpx;
		color: #555555;
		text-align: center;
		margin-top: 16rpx;
	}

	.now_last {
		line-height: 50rpx;
		font-size: 34rpx;
		color: #555555;
		margin-top: 10rpx;
	}

	/* last */
	.last {
		width: 92%;
		height: 280rpx;
		margin: 25rpx auto;
		background-color: #FFFFFF;
		border-radius: 20rpx 20rpx;
		padding-top: 10rpx;
		box-shadow: 2px 5px 12px rgba(0, 0, 0, .1);
	}

	.last_big {}

	.last_left {
		height:50rpx;
		line-height: 50rpx;
		font-size: 34rpx;
		color: #555555;
	}

	.last_right {
		height:50rpx;
		line-height: 50rpx;
		font-size: 34rpx;
		color: #D94647;
	}
</style>
