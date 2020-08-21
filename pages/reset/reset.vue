<template>
	<view class="password_content">
		<view class="password_body1">
			<view class="password_body1_header">
				<view class="password_body1_header_left">
					<image class="password_mima" src="../../static/android/img_sji.png"></image>
				</view>
				<view class="passeord_body1_header_center">
					<input type="text" v-model="mobile" name="请输入11位手机号码" placeholder="请输入11位手机号码">
				</view>
			</view>
			<view class="password_body1_header">
				<view class="password_body1_header_left">
					<image class="password_mima" src="../../static/android/img_yzm.png"></image>
				</view>
				<view class="password_body1_header_center">
					<input type="text" v-model="code" name="请输入验证码" placeholder="请输入验证码">
				</view>
				<!-- <view class="password_body1_header_yzm flexs" @click="sendSMS">
						获取验证码
					</view> -->
				<view class="code">
					<text class="password_body1_header_yzm flexs" v-show="stus == true" @click="sendSMS">{{ text }}</text>
					<text class="password_body1_header_yzm flexs" v-show="stus == false">{{ text }}S重新获取</text>
				</view>
			</view>
		</view>
		<view class="password_body2 flexs" @click="password">
			下一步
		</view>

	</view>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				code: '',
				stus: true, //倒计时标识
				sunmax: 60,
				text: '获取验证码'
			}
		},

		methods: {
			sendSMS() {
				if (/^1[345789]\d{9}$/.test(this.mobile)) {
					this.stus = false;
					this.text = this.sunmax;
					let timeInt = setInterval(() => {
						this.text--;
						if (this.text <= 0) {
							this.stus = true;
							this.text = '获取验证码';
							clearInterval(timeInt);
						}
					}, 1000);
					var obj = {
						mobile: this.mobile
					}
					this.$common.requests('/api/user/sendSMS', obj).then(res => {
						if (res.data.code == 1) {
							this.$api.msg(res.data.msg)
						} else {
							this.$api.msg(res.data.msg)
						}
					})
				} else {
					this.$api.msg('请输入正确手机号')
				}

			},
			password() {
				if (!this.mobile || this.mobile == "") {
					this.$api.msg('手机号不能为空')
					return;
				}
				if (!this.code || this.code == "") {
					this.$api.msg('验证码不能为空')
					return;
				}
				uni.navigateTo({
					url: "../password/password?mobile=" + this.mobile + "&code=" + this.code + "&is_register=" + "no"
				})
			},
		}
	}
</script>

<style>
	.password_content {
		width: 100vw;
		height: 100vh;
		background-color: #FFF;
	}

	.password_body1 {
		width: 600rpx;
		height: 460rpx;
		/* border:1rpx solid red; */
		margin: 0 auto;
		padding-top: 66rpx;
	}

	.password_body1_header {
		width: 600rpx;
		height: 110rpx;
		/* border:1rpx solid blue; */
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 40rpx;
		border-bottom: 2rpx solid #D4D4D4;
	}

	.password_body1_header_left {
		width: 80rpx;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.password_body1_header_center {
		width: 350rpx;
		height: 45rpx;
	}

	.password_mima {
		width: 40rpx;
		height: 50rpx;
	}

	.password_body2 {
		width: 600rpx;
		height: 80rpx;
		font-size: 30rpx;
		letter-spacing: 5rpx;
		color: #FFFFFF;
		background-color: #5A7EF8;
		margin-left: 76rpx;
		margin-top: 68rpx;
	}

	.password_body1_header_yzm {
		width: 200rpx;
		height: 60rpx;
		background-color: #D4D4D4;
		letter-spacing: 2rpx;
		color: #FCFCFC;
	}

	.uni-input-placeholder {
		font-size: 28rpx;
	}

	.flexs {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.flexs1 {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.flexs2 {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.flexs3 {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.flexs4 {
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
	}

	.flexs5 {
		display: flex;
		flex-direction: row;
	}

	.flexs6 {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.flexs7 {
		display: flex;
		justify-content: center;
	}

	.flexs8 {
		display: flex;
		align-items: flex-end;
		justify-content: space-around;
	}

	.flexs9 {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.flexs10 {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
</style>
