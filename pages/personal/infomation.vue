<template>
	<view class="content">
		<view class="top flexs2" @tap='choosetype' data-target='DialogModal'>
			<view class="top_left">头像</view>
			<view class="top_right flexs2">
				<!-- <image class="top_avatar" src="../../static/pic/img_toxiang_grxx@2x.png"></image> -->
				<image class="top_avatar" :src="imgUrl+avatar"></image>
				<image class="top_next" src="../../static/pic/btn_psdz_xyb@2x.png"></image>
			</view>
		</view>
		<view class="list flexs2" @click="goReal">
			<view class='list_l'>实名认证</view>
			<view class='list_r flexs2'>
				<view>{{real_name}}</view>
				<image class="top_next" src="../../static/pic/btn_psdz_xyb@2x.png"></image>
			</view>
		</view>
		<view class="list flexs2" @click="goPhone">
			<view class='list_l'>手机号</view>
			<view class='list_r list_new flexs2'>
				<view>{{mobile}}</view>
				<image class="top_next" src="../../static/pic/btn_psdz_xyb@2x.png"></image>
			</view>
		</view>
		<view class="list flexs2">
			<view class='list_l'>我的推荐码</view>
			<view class='list_r list_new flexs2'>
				<view>{{idnum}}</view>
				<image class="top_next" src="../../static/pic/btn_psdz_xyb@2x.png"></image>
			</view>
		</view>
		<view class="list flexs2" @click="goCode">
			<view class='list_l'>我的二维码</view>
			<view class='list_r flexs2'>
				<image class="list_img" src="../../static/pic/code.png"></image>
				<image class="top_next" src="../../static/pic/btn_psdz_xyb@2x.png"></image>
			</view>
		</view>
		<!-- model  photo -->
		<view class='myimgtype' v-show="modalName" :class="modalName=='DialogModal'?'show':''" @click.self='hidemodify'>
			<view class='contents'>
				<view class='common_type addbottom' @click='choosecamera'>拍照上传</view>
				<view class='common_type' @click='choosephone'>从相册选择</view>
			</view>
			<view class='commoncancle' @tap='canclechoose'>取消</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
				avatar: '',
				idnum: '',
				is_real_name: '',
				imgUrl: this.$common.baseUrl,
				mobile: '',
				// 真实姓名
				real_name:''
			}
		},
		onShow() {
			this.get_myuserinfo();
			this._getStatus()
		},
		methods: {
			_getStatus() {
				this.$common.requests('/api/user/is_shiming').then(res => {
					if (res.data.code == 1) {
						this.real_name = res.data.data
					} else {
						this.real_name = '未实名'
					}
				});
			},
			get_myuserinfo() {
				this.$common.requests('/api/user/get_myuserinfo').then(res => {
					if (res.data.code == 1) {
						this.avatar = res.data.data.avatar
						this.idnum = res.data.data.idnum
						this.is_real_name = res.data.data.is_real_name
						this.mobile = res.data.data.mobile
					} else {
						this.$api.msg(res.data.msg)
					}
				});
			},
			changeAvatar(avatarImage) {
				var obj = {
					avatar: avatarImage,
				}
				this.$common.requests('/api/user/change_avatar', obj).then(res => {
					if (res.data.code == 1) {
						this.$api.msg(res.data.code);
					} else {
						this.$api.msg(res.data.code);
					}
				});
			},
			goReal() {
				if (this.is_real_name != '未实名') {
					//只要不是未实名,直接干掉
					return;
				}
				uni.navigateTo({
					url: "realname",
				})
			},
			goPhone() {
				uni.navigateTo({
					url: "editPhone"
				})
			},
			goCode() {
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
			// 选择图片来源途径
			choosetype(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			// 拍照选择
			choosecamera() {
				var that = this
				this.modalName = null
				this.$common.upimg(1, 1, ['camera']).then(res => {
					this.avatar = res[0];
					this.changeAvatar(res[0]);
				})
			},
			// 从相册选择
			choosephone() {
				var that = this
				this.modalName = null
				this.$common.upimg(1, 1, ['album']).then(res => {
					this.avatar = res[0];
					this.changeAvatar(res[0]);
				})
			},
			// 取消 隐藏
			canclechoose() {
				this.modalName = null
			},
			hidemodify(){
				this.modalName = null
			},
			// 模态框时间
			changeDatetimePicker(date) {
				console.log(date);
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

	.content {
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
	}

	.top {
		width: 100%;
		height: 14%;
		border-bottom: 1px solid #E5E5E5;
		padding: 26rpx
	}

	.top_right {
		width: 24%;
	}

	.top_left {
		letter-spacing: 4rpx;
	}

	.top_avatar {
		width: 90rpx;
		height: 90rpx;
		border-radius: 45rpx;
	}

	.top_next {
		width: 16rpx;
		height: 26rpx
	}

	.list {
		width: 100%;
		height: 10%;
		border-bottom: 1px solid #E5E5E5;
		padding: 26rpx
	}

	.list_r {
		width: 24%;
	}

	.list_new {
		width: 28%;
	}

	.list_img {
		width: 50rpx;
		height: 50rpx
	}

	/* model */
	.myimgtype {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .3);
		z-index: 101;
	}

	.common_type {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 20rpx 20rpx 0 0;
	}

	.commoncancle {
		line-height: 80rpx;
		text-align: center;
		color: #3C84F2;
		border-radius: 20rpx;
		background-color: #FFFFFF;
		position: absolute;
		bottom: 20rpx;
		left: 40rpx;
		right: 40rpx;
	}

	.addbottom {
		border: 1rpx solid #F2F2F2;
	}

	.contents {
		position: absolute;
		bottom: 120rpx;
		left: 40rpx;
		right: 40rpx;
		height: 160rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx 20rpx;
		color: #3C84F2;
	}
</style>
