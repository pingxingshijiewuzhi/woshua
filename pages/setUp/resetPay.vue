<template>
	<view class='content'>
		<view class="top">
			<view class='list  flexs3'>
				<image src="../../static/pic/people.png"></image>
				<view class="list_input flexs1">
					<input class="uni-input" v-model="mobile" type="number" placeholder="请输入11位手机号" />
				</view>
			</view>
			<view class='list new flexs3'>
				<image src="../../static/pic/code (2).png"></image>
				<view class="list_input flexs1">
					<input class="uni-input" v-model="code" type="number" placeholder="请输入验证码" />
					<view class='list_code' @click="sendSMS()" v-show="send == false">获取验证码</view>
					<view class='list_code' v-show="send">{{second}}S后重新获取</view>
				</view>
			</view>
			<view class='list new flexs3'>
				<image src="../../static/pic/icon_d_mima@2x.png"></image>
				<view class="list_input flexs1">
					<input class="uni-input" v-model="newpassword" type="password" placeholder="请输入新密码" />
				</view>
			</view>
			<view class='list new flexs3'>
				<image src="../../static/pic/icon_d_mima@2x.png"></image>
				<view class="list_input flexs1">
					<input class="uni-input" v-model="repassword" type="number" password placeholder="请再次输入新密码" />
				</view>
			</view>
		</view>
		<view class="btns" @click="goNext">完成</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				mobile: '',
				code: '',
				second: 60,
				send: false,
				newpassword:'',
				repassword:''
			}
		},
		methods: {
			sendSMS() {
				if (this.mobile == '') {
					this.$api.msg('请输入手机号');
				}
				if (/^1[345789]\d{9}$/.test(this.mobile) == false) {
					this.$api.msg('请输入正确的手机号格式')
					return
				}
				if(this.mobile != uni.getStorageSync('userinfo').mobile){
					this.$api.msg('请和登录手机号保持一致')
					return
				}
				var obj = {
					mobile: this.mobile
				}
				this.$common.requests('/api/user/sendSMS', obj).then(res => {
					if (res.data.code == 1) {
						this.$api.msg(res.data.code);
						this.send = true;
						var that = this;
						let timer = setInterval(function() {
							if (that.second <= 0) {
								that.send = false;
								that.second = 60;
								clearInterval(timer);
							}
							that.second--
						}, 1000)
					} else {
						this.$api.msg(res.data.code);
					}
				});
			},
			goNext() {
				var that = this
				if (this.mobile == '' || this.code == '' || this.newpassword == '' || this.repassword=='') {
					this.$api.msg('请补全信息');
					return;
				}
				if(this.newpassword != this.repassword){
					this.$api.msg('两次密码不一致');
					return;
				}
				let obj = {
					mobile:this.mobile,
					pay_pwd:this.newpassword,
					captcha:this.code
				}
				this.$common.requests('/api/user/reset_pay_pwd',obj).then(res => {
					if(res.data.code == 1){
						this.$api.msg('重置密码成功')
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1000)
					}else{
						this.$api.msg('重置密码有误')
					}
					
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
		top: 300rpx;
		margin: 0 auto
	}
</style>

