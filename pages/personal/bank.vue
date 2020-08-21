<template>
	<view class="content">
		<view class="top flexs">
			<view class="top_box flexs3">
				<image src="../../static/pic/icon_d_tanhao@2x.png"></image>
				<view class="text-red">银行卡信息用于您在平台的资金结算，请确保是本人持有</view>
			</view>
		</view>
		<view class="middle flexs">
			<view class='middle_l' @tap='choosetype' data-target='DialogModal'>
				<image src="../../static/pic/icon_fzz_zheng@2x.png" v-show="bankImage == ''"></image>
				<image :src="this.$common.baseUrl + bankImage" v-show="bankImage"></image>
				<view>银行卡正面</view>
			</view>

		</view>
		<view class="list ">
			<view class="list_one">
				<input class="uni-input" type="number" v-model="bankNum" placeholder="请输入银行卡号" />
			</view>
			<view class="list_one">
				<view class='banckCard'>
					<input class="uni-input" type="text" v-model="bankName" placeholder="请输入开户行" @click='change' disabled/>
					<image src="../../static/image/icon_h_sanjiao_hui@2x.png" class='bankimg' @click='change'></image>
					<view class='shabizhang' v-if='bankStauts'>
						<block v-for='(item,index) in bankList' :key='index'>
							<view @click='choosebank(item.id,item.name)' class='shabizhang_item'>
								{{item.name}}</view>
						</block>
					</view>
				</view>
			</view>
		</view>
		<view class='btns' @click="Submit()">完成</view>
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
				// 定义一个变量显示银行类型选择
				bankStauts: false,
				bankList: [],
				modalName: null,
				name: '', //真实姓名
				idcard: '', //身份证号
				idcard1Image: '', //身份证正面图
				idcard2Image: '', //身份证反面图
				bankImage: '', //银行卡正面
				bankName: '', //银行名
				bankNum: '', //银行卡号
				bankId: '' //银行的id,暂时写死,待下拉框实现

			}
		},
		onLoad(option) {
			this.name = option.name;
			this.idcard = option.idcard;
			this.idcard1Image = option.image1;
			this.idcard2Image = option.image2;
			this.get_bank_list();
		},
		methods: {
			change() {
				this.bankStauts = true
			},
			choosebank(id, name) {
				this.bankStauts = false
				this.bankName = name
				this.bankId = id
			},
			get_bank_list() {
				this.$common.requests('/api/Datacount/get_bank_list').then(res => {
					if (res.data.code == 1) {
						this.bankList = res.data.data
						// this.bankList = [
						// 	{id: 1, name: "建设银行"},
						// 	{id: 1, name: "建设银行1"},
						// 	{id: 1, name: "建设银行2"},
						// 	{id: 1, name: "建设银行3"},
						// 	{id: 1, name: "建设银行4"},
						// 	{id: 1, name: "建设银行5"},
						// 	{id: 1, name: "建设银行6"},
						// 	{id: 1, name: "建设银行7"},
						// 	{id: 1, name: "建设银行8"},
						// 	{id: 1, name: "建设银行9"},
						// 	{id: 1, name: "建设银行0"},
						// 	{id: 1, name: "建设银行99"},
						// 	{id: 1, name: "建设银行88"},
						// 	{id: 1, name: "建设银行78d"},
						// ]
					} else {
						this.$api.msg(res.data.msg);
					}
				});
			},
			// 校验银行卡号
			isCardNo(card) {
				// 银行卡号一般15位或19位
				var reg = /^([1-9]{1})(\d{14}|\d{18}|\d{15}|\d{16}|\d{17})$/;
				console.log(reg.test(card))
				if (reg.test(card) === false) {
					uni.showToast({
						title: '银行卡号输入不合法',
						icon: 'none'
					})
					return false;
				}
				return true
			},
			Submit() {
				if (!this.isCardNo(this.bankNum)) {
					return
				}
				console.log(this.bankImage)
				console.log(this.bankName)
				console.log(this.bankNum)
				console.log(this.bankId)
				if (this.bankImage == '' || this.bankName == '' || this.bankNum == '' || this.bankId == '') {
					this.$api.msg('请补全信息');
					return;
				}
				var obj = {
					name: this.name,
					idcard: this.idcard,
					bank_num: this.bankNum,
					bank_name: this.bankName,
					idcard_image1: this.idcard1Image,
					idcard_image2: this.idcard2Image,
					bank_image: this.bankImage,
					bank_list_id: this.bankId
				}
				this.$common.requests('/api/money/shiming', obj).then(res => {
					if (res.data.code == 1) {
						uni.setStorageSync('number_',res.data.code)
						this.$api.msg(res.data.msg);
						setTimeout(function() {
							uni.navigateBack({
								delta: 2
							})
						}, 1000);
					} else {
						this.$api.msg(res.data.msg);
					}
				});
			},
			// 取消 隐藏
			canclechoose() {
				this.modalName = null
			},
			// 选择图片来源途径
			choosetype(e, ) {
				this.modalName = e.currentTarget.dataset.target
			},
			// 拍照选择
			choosecamera() {
				var that = this
				this.modalName = null
				this.$common.upimg(1, 1, ['camera']).then(res => {
					this.bankImage = res[0];
				})
			},
			// 从相册选择
			choosephone() {
				var that = this
				this.modalName = null
				this.$common.upimg(1, 1, ['album']).then(res => {
					this.bankImage = res[0];
				})
			},
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
		width: 97%;
		letter-spacing: -4rpx;
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

	.banckCard {
		position: relative;
		height: 100rpx;
		width: 100%;
		/* border:1rpx solid red; */
	}

	.bankimg {
		position: absolute;
		right: 20rpx;
		top: 30%;
		transform: translateY(-50%);
		height: 30rpx;
		width: 30rpx;
	}

	.shabizhang {
		position: absolute;
		top: 100rpx;
		left: 0;
		right: 0;
		height: 300rpx;
		/* border:1rpx solid red; */
		overflow-y: scroll;
	}

	.shabizhang_item {
		height: 70rpx;
		width: 100%;
		line-height: 70rpx;
		text-align: center;
	}
</style>
