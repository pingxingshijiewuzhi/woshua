<template>
	<view class="contents">
		<view class='top flexs1' @click="goInfo">
			<view class="top_left flexs3">
				<image class="top_left_img" :src="avatar"></image>
				<view class="top_left_t text-center">
					<view class=" name ">{{name}}</view>
					<view class="top_number">推荐码：{{idnum}}</view>
				</view>
			</view>
			<view class="top_right flexs3">
				<image class="ma_img" src="../../static/pic/icon-ewm@2x.png"></image>
				<image class="jian_img" src="../../static/pic/icon_fanhui@2x.png"></image>
			</view>
		</view>
		<view class="types flexs3">
			<view class='types_list' @click="goGift">
				<image class="types_img" src="../../static/pic/icon_libao@2x.png"></image>
				<view>礼包</view>
			</view>
			<view class='types_list' @click="skipdd">
				<image class="types_img" src="../../static/pic/icon_dd@2x.png"></image>
				<view>兑换</view>
			</view>
			<view class='types_list' @click="tobuy">
				 <!-- style="width:30rpx;height:40rpx" -->
				<image class="types_img"  src="../../static/pic/icon_gouji.png"></image>
				<view>购机</view>
			</view>
			<view class='types_list' @click="towallet">
				<image class="types_img" src="../../static/pic/icon_qb@2x.png"></image>
				<view>钱包</view>
			</view>
			<view class='types_list' @click="tobankcard">
				<image class="types_img" src="../../static/pic/icoN-yhk@2x.png"></image>
				<view>银行卡</view>
			</view>
		</view>
		<!-- 因为去掉一个授权书，所有判断都的改，草草 -->
		<!-- <view class="mille" :style="{'height':(user_type == 3?'35%':'28%')}"> -->
		<view class="mille" :style="{'height':(user_type == 3?'28%':'21%')}">
			<block v-if='user_type == 3'>
<!-- 				<view class="middle_list flexs2" :style="{'height':(user_type == 3?'20%':'25%')}"  @click='goorganization'> -->
				<view class="middle_list flexs2" :style="{'height':(user_type == 3?'25%':'33%')}"  @click='goorganization'>
				
					<view class='middle_list_l flexs2'>
						<image src="../../static/pic/img_gsi@2x.png"></image>
						<view>机构专区</view>
					</view>
					<image class="next_img" src="../../static/pic/btn_psdz_xyb@2x.png"></image>
				</view>
			</block>
			<!-- <view class="middle_list flexs2" :style="{'height':(user_type == 3?'20%':'25%')}" @click="topartners"> -->
			<view class="middle_list flexs2" :style="{'height':(user_type == 3?'25%':'33%')}" @click="topartners">
				<view class='middle_list_l flexs2'>
					<image src="../../static/pic/icon_yqjr@2x.png"></image>
					<view>邀请码</view>
				</view>
				<view class="middle_list_r flexs2">
					<view class="text-colors">邀请有大礼</view>
					<image class="next_img" src="../../static/pic/btn_psdz_xyb@2x.png"></image>
				</view>
			</view>
			<!-- <view class="middle_list flexs2" :style="{'height':(user_type == 3?'20%':'25%')}"> -->
			<view class="middle_list flexs2" :style="{'height':(user_type == 3?'25%':'33%')}">
				<view class='middle_list_l flexs2'>
					<image src="../../static/pic/icon_tjr@2x.png"></image>
					<view>我的推荐人</view>
				</view>
				<view class="middle_list_r flexs2">
					<block v-if='my_father'>
						<view class="people">{{my_father}}</view>
						<image class="next_imgs" src="../../static/pic/icon_dianhua@2x.png" @click="mobileCall(father_mobile)"></image>
					</block>
				</view>
			</view>
			
			<!-- <view class="middle_list flexs2" @click="topartner" :style="{'height':(user_type == 3?'20%':'25%')}">
				<view class='middle_list_l flexs2'>
					<image src="../../static/pic/icon_sqs@2x.png"></image>
					<view>授权书</view>
				</view>
				<image class="next_img" src="../../static/pic/btn_psdz_xyb@2x.png"></image>
			</view> -->
			<!-- 'border-bottom':'none !important' -->
			
			<!-- <view class="middle_list flexs2" @click="tohelp" :style="{'height':(user_type == 3?'20%':'25%')}"> -->
			<view class="middle_list flexs2" @click="tohelp" :style="{'height':(user_type == 3?'25%':'33%')}">
				<view class='middle_list_l flexs2'>
					<image src="../../static/pic/icon_jch.png"></image>
					<view>教程与帮助</view>
				</view>
				<image class="next_img" src="../../static/pic/btn_psdz_xyb@2x.png"></image>
			</view>
		</view>
		<view class="bottom">
			<view class="middle_lists flexs2">
				<view class='middle_list_l flexs2'>
					<image src="../../static/pic/icon_kefu.png"></image>
					<view>客服热线</view>
				</view>
				<view class="middle_list_r flexs2">
					<view class="mobile">{{friends_mobile}}</view>
					<image class="next_imgs" src="../../static/pic/icon_dianhua@2x.png" @click="mobileCall(friends_mobile)"></image>
				</view>
			</view>
			<view class="middle_lists flexs2" @click="towomen">
				<view class='middle_list_l flexs2'>
					<image src="../../static/pic/icon_gywm@2x.png"></image>
					<view>关于我们</view>
				</view>
				<image class="next_img" src="../../static/pic/btn_psdz_xyb@2x.png"></image>
			</view>
			
			<view class="middle_lists  flexs2" @click="tofeedback">
				<view class='middle_list_l flexs2'>
					<image src="../../static/pic/icon_yjfk@2x.png"></image>
					<view>意见反馈</view>
				</view>
				<image class="next_img" src="../../static/pic/btn_psdz_xyb@2x.png"></image>
			</view>
			<view class="middle_lists border_none flexs2" @click="goSetup">
				<view class='middle_list_l flexs2'>
					<image src="../../static/pic/icon_sz@2x.png"></image>
					<view>设置</view>
				</view>
				<image class="next_img" src="../../static/pic/btn_psdz_xyb@2x.png"></image>
			</view>
		</view>
		<view class='nosay' v-if='user_type != 3'>
			
		</view>
		
	</view>
</template>
<script>
	export default {
		data() {
			return {
				father_mobile:'',
				name: '',
				idnum: '',
				friends_mobile: '',
				my_father: '',
				avatar: '',
				// 身份是否实名验证
				identity: '',
				user_type:''
			}
		},
		onShow() {
			this._getStatus()
			this.get_all_info();
		},
		methods: {
			_getStatus() {
				this.$common.requests('/api/user/is_shiming').then(res => {
					if (res.data.code == 1) {
						this.identity = true
					} else {
						this.identity = false
						// this.$api.msg(res.data.msg);
					}
				});
			},
			mobileCall(needMobile) {
				// if(/^1[345789]\d{9}$/.test(needMobile)){

				// }else{
				// 	this.$api.msg('请确认手机号')
				// }
				// alert(needMobile)
				if (needMobile != '') {
					uni.makePhoneCall({
						phoneNumber: needMobile //仅为示例
					});
				}
			},
			get_all_info() {
				this.$common.requests('/api/user/get_mypage_info').then(res => {
					if (res.data.code == 1) {
						this.name = res.data.data.name;
						this.idnum = res.data.data.idnum;
						this.friends_mobile = res.data.data.friends_mobile;
						this.father_mobile = res.data.data.father_mobile
						this.my_father = res.data.data.father;
						// console.log(res.data.data,9999)
						this.avatar = this.$common.baseUrl + res.data.data.avatar;
						this.user_type = res.data.data.user_type
					} else {
						this.$api.msg(res.data.msg);
					}
				});
			},
			goInfo() {
				uni.navigateTo({
					url: "infomation"
				})
			},
			skipdd() {
				uni.navigateTo({
					url: "../myorder/exchange"
				})
			},

			goSetup() {
				uni.navigateTo({
					url: "../setUp/setUp"
				})
			},
			goGift() {
				uni.navigateTo({
					url: "../myGift/myGift?myStatus=true"
				})
			},
			tobuy() {
				uni.navigateTo({
					url: "../upgrade/upgrade"
				})
			},
			// 机构专区
			goorganization() {
				if (this.identity) {
					uni.navigateTo({
						url: "../organization/organization"
					})
				} else {
					this.$api.msg('请实名认证或者等待实名认证通过')
				}
			},
			towallet() {
				uni.navigateTo({
					url: "../myWallet/myWallet"
				})
			},
			tobankcard() {
				if (this.identity) {
					uni.navigateTo({

						url: "../bankCard/bankCard"

					})
				} else {
					this.$api.msg('请实名认证或者等待实名认证通过')
				}
			},
			topartners() {
				// this.$common.requests('/api/user/checking_user_type').then(res=>{
				// 	if(res.data.code == 1){
						
				// 	}else{
				// 		this.$api.msg(res.data.msg)
				// 	}
				// })
				uni.navigateTo({
					url: "../partners/partners"
				})
			},
			// 授权书
			topartner() {
				if (this.identity) {
					uni.navigateTo({
						url: "../personal/partners"
					})
				} else {
					this.$api.msg('请实名认证或者等待实名认证通过')
				}
			},
			tohelp() {
				uni.navigateTo({
					url: "../personal/help"
				})
			},
			towomen() {
				console.log(1)
				uni.navigateTo({
					url: "../aboutUs/aboutUs"
				})
			},
			tofeedback() {
				uni.navigateTo({
					url: "../aboutUs/feedback"
				})
			}
		},


	}
</script>

<style>
	.contents {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}

	.top {
		width: 100%;
		height: 21%;
		background-image: url(../../static/pic/bg.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.top_left {
		width: 70%;
		height: 100%;
	}

	.top_left_img {
		width: 140rpx;
		height: 140rpx;
		border-radius: 50% 50%;
		position: absolute;
		top: 90rpx;
		left: 20rpx
	}

	.name {
		width: 480rpx;
		height: 88rpx;
		/* border:1rpx solid red; */
		color: #FFFFFF;
		line-height: 50rpx;
		font-size: 36rpx;
		letter-spacing: 2rpx;
		padding-left: 120rpx;
		padding-top: 26rpx;
		text-align: left;
	}

	.top_left_t {
		width: 80%;
		height: 42%;
		line-height: 96rpx;
	}

	.top_number {
		width: 430rpx;
		line-height: 50rpx;
		background-color: #CFE3FE;
		border-radius: 20rpx;
		padding-left: 120rpx;
		text-align: left;
	}

	.top_right {
		width: 30%;
		height: 100%;
	}

	.ma_img {
		width: 50rpx;
		height: 50rpx;
	}

	.jian_img {
		width: 26rpx;
		height: 40rpx;
		margin-left: 20rpx
	}

	.types {
		width: 100%;
		height: 10%;
		background-color: #FFFFFF;
	}

	.types_list {
		width: 150rpx;
		height: 140rpx;
		line-height: 40rpx;
		padding-top: 24rpx;
		text-align: center;
	}

	.types_img {
		width: 50rpx;
		height: 50rpx
	}

	.mille {
		width: 100%;
		margin-top: 20rpx;
		background-color: #FFFFFF;
	}

	.bottom {
		width: 100%;
		height: 29%;
		background-color: #FFFFFF;
		/* margin-top: 20rpx; */
	}

	.middle_list {
		width: 100%;
		/* height: 20%; */
		height: 25%;
		border-bottom: 1px solid #E5E5E5;
		padding: 0 34rpx;
	}

	.middle_lists {
		width: 100%;
		height: 25%;
		border-bottom: 1px solid #E5E5E5;
		padding: 0 34rpx;
	}

	.border_none {
		border-bottom: none;
	}

	.middle_list_l {
		/* 	width:27%; */
		height: 100%;
	}

	.middle_list_l image {
		width: 40rpx;
		height: 40rpx;
		margin-right: 30rpx
	}

	.middle_list_r {
		width: 35%;
		height: 100%;
	}

	.next_img {
		width: 18rpx;
		height: 32rpx
	}

	.next_imgs {
		width: 24rpx;
		height: 32rpx
	}

	.people {
		color: #969696;
		/* margin-left: 84rpx */
	}

	.mobile {
		color: #969696;
	}
	.nosay{
		width:100%;
		height:7%;
	}
	

</style>
