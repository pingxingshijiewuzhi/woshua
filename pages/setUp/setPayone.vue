<template>
	<view class='content'>
		<view class="top">
			<view class='list  flexs3'>
				<image src="../../static/pic/icon_d_mima@2x.png"></image>
				<view class="list_input flexs1">
					<input class="uni-input" v-model="password" type="number" password placeholder="请输入6~16位密码" />
				</view>
			</view>
			<view class='list new flexs3'>
				<image src="../../static/pic/icon_d_mima@2x.png"></image>
				<view class="list_input flexs1">
					<input class="uni-input" v-model="repassword" type="number" password placeholder="请再次输入密码" />
				</view>
			</view>
		</view>
		<view class="btns" @click="setPayPwd()">完成</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				code: '',
				idcard: '',
				password: '',
				repassword: ''
			}
		},
		onLoad(option) {
			this.mobile = option.mobile;
			this.code = option.code;
			this.idcard = option.idcard;
		},
		methods: {
			setPayPwd() {
				if (this.password == '' || this.repassword == '') {
					this.$api.msg('请补全信息');
					return;
				}
				var obj = {
					mobile: this.mobile,
					captcha: this.code,
					idcard: this.idcard,
					pay_pwd: this.password,
					repay_pwd: this.repassword
				}
				this.$common.requests('/api/user/set_paypwd', obj).then(res => {
					if (res.data.code == 1) {
						this.$api.msg(res.data.msg);
						setTimeout(function() {
							uni.switchTab({
								url: '../personal/personal'
							})
						}, 1000)
					} else {
						this.$api.msg(res.data.msg);
					}
				});
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
		height: 30%;
	}

	.list {
		width: 100%;
		height: 30%;
		position: relative;
		top: 30rpx;
	}

	.new {
		margin-top: 30rpx
	}

	.list image {
		width: 44rpx;
		height: 48rpx
	}

	.list_input {
		width: 85%;
		height: 120rpx;
		border-bottom: 1px solid #E5E5E5
	}

	.uni-input-placeholder {
		color: #555555 !important
	}

	.list_code {
		width: 160rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
		background-color: #D4D4D4;
		color: #FFFFFF
	}

	.btns {
		width: 80%;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #5A7EF8;
		color: #FFFFFF;
		text-align: center;
		position: relative;
		top: 150rpx;
		margin: 0 auto
	}
</style>
