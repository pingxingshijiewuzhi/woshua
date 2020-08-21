<template>
	<view class="content">
		<view class="top flexs">
			<view class="top_box flexs2">
				<image src="../../static/pic/icon_d_tanhao@2x.png"></image>
				<view class="text-red">请务必上传您真实有效的身份证信息</view>
			</view>
		</view>
		<view class="middle flexs3">
			<view class='middle_l' @tap='choosetype($event,1)' data-target='DialogModal'>
				<image src="../../static/pic/icon_fzz_zheng@2x.png" v-show="image1 == ''"></image>
				<image :src="this.$common.baseUrl + image1" v-show="image1"></image>
				<view>身份证正面</view>
			</view>
			<view class='middle_l' @tap='choosetype($event,2)' data-target='DialogModal'>
				<image src="../../static/pic/icon_sfz_fan@2x.png" v-show="image2 == ''"></image>
				<image :src="this.$common.baseUrl + image2" v-show="image2"></image>
				<view>身份证反面</view>
			</view>
		</view>
		<view class="list ">
			<view class="list_one">
				<input class="uni-input" v-model="name" type="text" maxlength="10" placeholder="请输入姓名" />
			</view>
			<view class="list_one">
				<input class="uni-input" v-model="idcard" type="text" placeholder="请输入身份证号" />
			</view>
		</view>
		<view class='btns' @click="goBank">下一步</view>
		<view class='myimgtype' v-show="modalName" :class="modalName=='DialogModal'?'show':''">
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
				image1: '',
				image2: '',
				imagess: '',
				name: '',
				idcard: ''
			}
		},
		onLoad() {

		},
		methods: {
			// 取消 隐藏
			canclechoose() {
				this.modalName = null
			},
			// 选择图片来源途径
			choosetype(e, imagess) {
				console.log(imagess);
				this.imagess = imagess;
				this.modalName = e.currentTarget.dataset.target
			},
			// 拍照选择
			choosecamera() {
				var that = this
				this.modalName = null
				this.$common.upimg(1, 1, ['camera']).then(res => {
					if (this.imagess == 1) {
						//是图片1-身份证正面图
						this.image1 = res[0];
					} else {
						//是图片2-身份证反面图
						this.image2 = res[0];
					}
				})
			},
			// 从相册选择
			choosephone() {
				var that = this
				this.modalName = null
				this.$common.upimg(1, 1, ['album']).then(res => {
					if (this.imagess == 1) {
						//是图片1-身份证正面图
						this.image1 = res[0];
					} else {
						//是图片2-身份证反面图
						this.image2 = res[0];
					}
				})
			},
			// 校验身份证
			// isCardNo(card) {
				// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
			// 	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			// 	console.log(reg.test(card))
			// 	if (reg.test(card) === false) {
			// 		uni.showToast({
			// 			title: '身份证输入不合法',
			// 			icon: 'none'
			// 		})
			// 		return false;
			// 	}
			// 	return true
			// },
			goBank() {
				if (this.image1 == '' || this.image2 == '' || this.name == '' || this.idcard == '') {
					this.$api.msg('请补全信息');
					return;
				}
				// if (!this.isCardNo(this.idcard)) {
				// 	return
				// }
				uni.navigateTo({
					url: 'bank?name=' + this.name + '&idcard=' + this.idcard + '&image1=' + this.image1 + '&image2=' + this.image2
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

	.common_type {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 20rpx 20rpx 0 0;
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

	.myimgtype {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .3);
		z-index: 101;
	}

	.content {
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
	}

	.top {
		width: 94%;
		height: 4%;
		background-color: #F2F2F2;
		border-radius: 30rpx;
		margin: 0rpx auto;
		position: relative;
		top: 30rpx
	}

	.top_box {
		width: 72%
	}

	.top image {
		width: 30rpx;
		height: 30rpx;
		border-radius: 15rpx;
	}

	.middle {
		width: 94%;
		height: 23%;
		line-height: 46rpx;
		position: relative;
		top: 80rpx;
		margin: 0 auto;
		text-align: center;
	}

	.middle_l image {
		width: 210rpx;
		height: 180rpx
	}

	.list {
		width: 90%;
		height: 20%;
		margin: 150rpx auto;
	}

	.list_one {
		width: 100%;
		height: 32%;
		margin-top: 50rpx;
		border-bottom: 1px solid #E5E5E5;
	}

	.btns {
		width: 100%;
		height: 120rpx;
		line-height: 120rpx;
		background-color: #5A7EF8;
		color: #FFFFFF;
		text-align: center;
		position: fixed;
		bottom: 0
	}
</style>
