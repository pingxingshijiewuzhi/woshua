<template>
	<view class="password_content">
		<view class="password_body1">
			<view class="password_body1_header">
				<view class="password_body1_header_left">
					<image class="password_mima" src="../../static/android/img_mima.png"></image>
				</view>
				<view class="passeord_body1_header_center">
					<input type="text" v-model="password" password name="请输入6~16位密码" placeholder="请输入6~16位密码">
				</view>
			</view>
			<view class="password_body1_header">
				<view class="password_body1_header_left">
					<image class="password_mima" src="../../static/android/img_mima.png"></image>
				</view>
				<view class="password_body1_header_center">
					<input type="text" v-model="repassword" password name="请再输入一遍" placeholder="请再输入一遍">
				</view>
			</view>
		</view>
		<view class="password_body2 flexs" @click="resetpassword">
			完成注册
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
				password: '',
				repassword: '',
				is_register: '',
				idnum: '',
				newUrl:this.$common.newUrl
			}
		},
		onLoad(option) {
			console.log(option)
			this.mobile = option.mobile,
				this.code = option.code,
				// this.idnum = option.idnum ?? "",
				this.idnum = option.idnum ? option.idnum : "",
				this.is_register = option.is_register
		},
		methods: {
			resetpassword() {
				//console.log(this.is_register)
				// return
				if (this.is_register == "no") {
					var obj = {
						mobile: this.mobile,
						code: this.code,
						newpassword: this.password,
						renewpassword: this.repassword
					}
					uni.request({
						url: this.newUrl+'/api/user/resetpwd',
						header: {
							'Content-Type': 'application/json;charset=UTF-8',
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						data: obj,
						method: 'POST',
						success: (res) => {
							console.log(res, 555)
							if (res.data.code == 1) {
								this.$api.msg(res.data.msg)
								setTimeout(() => {
									uni.navigateTo({
										url: '/pages/login/login'
									})
								}, 1500);
							} else {
								this.$api.msg(res.data.msg)
							}
						},

					})
				} else {
					var obj = {
						mobile: this.mobile,
						code: this.code,
						password: this.password,
						repassword: this.repassword,
						idnum: this.idnum,
					}
					this.$common.requests('/api/user/register', obj).then(res => {
						if (res.data.code == 1) {
							this.$api.msg(res.data.msg);
							var data = res.data.data.userinfo;
							uni.setStorageSync('uid', data.user_id);
							uni.setStorageSync('token', data.token);
							uni.setStorageSync('userinfo', data);
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/index/index'
								})
							}, 1500);
						} else {
							this.$api.msg(res.data.msg)
						}
					})
				}

			},
		}
	}
</script>

<style>
	.password_content {
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;

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
