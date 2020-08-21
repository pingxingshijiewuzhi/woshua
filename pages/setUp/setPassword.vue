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
					<view class='list_code' @click="getCode()"  v-show="send == true">{{text}}</view>
					<view class='list_code'  v-show="send == false">{{text}}S重新获取</view>
				</view>
			</view>
		</view>
		<view class="btns" @click="goNext">下一步</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				code: '',
				second: 60,
				send: true, //倒计时标识
				sunmax: 60,
				text: '获取验证码',
			}
		},
		methods: {
			//获取验证码
			getCode() {
				if (/^1[345789]\d{9}$/.test(this.mobile)) {
					this.send = false;
					this.text = this.sunmax;
					var that = this
					let timeInt = setInterval(() => {
						that.text--;
						if (that.text <= 0) {
							that.send = true;
							that.text = '获取验证码';
							clearInterval(timeInt);
						}
					}, 1000);
					var obj = {
						mobile: this.mobile
					};
					this.$common.requests('/api/user/sendSMS', obj).then(res => {
						this.$api.msg(res.data.msg);
						if (res.data.code == 1) {
						}
					});
				} else {
					this.$api.msg('请输入正确的手机号');
				}
			},
			// sendSMS() {
			// 	if (this.mobile == '') {
			// 		this.$api.msg('请输入手机号');
			// 	}
			// 	if (/^1[345789]\d{9}$/.test(this.mobile) == false) {
			// 		this.$api.msg('请输入正确的手机号格式')
			// 		return
			// 	}
			// 	var obj = {
			// 		mobile: this.mobile
			// 	}
			// 	this.$common.requests('/api/user/sendSMS', obj).then(res => {
			// 		if (res.data.code == 1) {
			// 			this.$api.msg(res.data.code);
			// 			this.send = true;
			// 			var that = this;
			// 			let timer = setInterval(function() {
			// 				console.log(111)
			// 				if (that.second <= 0) {
			// 					that.send = false;
			// 					that.second = 60;
			// 					clearInterval(timer);
			// 				}
			// 				that.second--
			// 			}, 1000)
			// 		} else {
			// 			this.$api.msg(res.data.code);
			// 		}
			// 	});
			// },
			goNext() {
				if (this.mobile == '' || this.code == '') {
					this.$api.msg('请补全信息');
					return;
				}
				uni.navigateTo({
					url: 'setPasswordone?mobile=' + this.mobile + '&code=' + this.code + '&type=' + 2
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
		width: 184rpx;
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
