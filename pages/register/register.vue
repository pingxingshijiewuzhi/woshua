<template>
	<view class="register_content">
		<view class="register_body1">
			<view class="register_body1_top">
				<view class="register_body1_top_left">
					<image class="register_logo1" src="../../static/android/img_yaoqing.png"></image>
				</view>
				<view class="register_body1_top_center">
					<input type="text" v-model="idnum" name="请输入邀请码" placeholder="请输入邀请码">
				</view>
				<view class="register_body1_top_right flexs" @click="toshaomiao">
					<image class="ewm" src="../../static/android/btn_sm.png"></image>
				</view>
			</view>
			<view class="register_body1_top">
				<view class="register_body1_top_left">
					<image class="register_logo2" src="../../static/android/img_sji.png"></image>
				</view>
				<view class="register_body1_top_center">
					<input type="text" v-model="mobile" name="请输入11位手机号" placeholder="请输入11位手机号">
				</view>
			</view>
			<view class="register_body1_top">
				<view class="register_body1_top_left">
					<image class="register_logo1" src="../../static/android/img_yzm.png"></image>
				</view>
				<view class="register_body1_top_center">
					<input type="text" v-model="code" name="请输入验证码" placeholder="请输入验证码">
				</view>
				<view class="code">
					<text class="password_body1_header_yzm flexs" v-show="stus == true" @click="sendSMS">{{ text }}</text>
					<text class="password_body1_header_yzm flexs" v-show="stus == false">{{ text }}S重新获取</text>
				</view>
			</view>
		</view>
		<view class="register_body2 flexs" @click="tiaozhuan2">
			下一步
		</view>
		<view class="register_body3">
			<checkbox-group class="" @change="CheckboxChange">
				<view class="chhoose_color">
					<checkbox :class="checkbox[0].checked?'checked':''" :checked="checkbox[0].checked?true:false" value="A" @click="changtrue"></checkbox>
				</view>
			</checkbox-group>
			<view class="register_text flexs">阅读并同意</view>
			<view class="register_body2_last_left flexs" @click="tiaozhuan6">{{xieyi_name}}</view>
			<view class="register_body2_last_center flexs">与</view>
			<view class="register_body2_last_right flexs" @click="tiaozhuan7">{{yinsixieyi}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checkbox: [{
					value: 'A',
					checked: false
				}],
				idnum: '',
				mobile: '',
				code: '',
				stus: true, //倒计时标识
				sunmax: 60,
				text: '获取验证码',
				xieyi_name:'',
				yinsixieyi:''

			}
		},
		onLoad() {
			this.checkbox.checked = false
			console.log(this.checkbox.checked)
			this._getprocol()
		},
		onShow() {
			console.log(this.checkbox.checked)
		},
		methods: {
			// 获取协议名称
			_getprocol(){
				this.$common.requests('/api/user/getxieyiname').then(res=>{
					console.log(res.data.data,999)
					this.xieyi_name = res.data.data.xieyi_name
					this.yinsixieyi = res.data.data.yinsixieyi
				})
			},
			changtrue() {
				if (!this.checkbox.checked) {
					this.checkbox.checked = true
				} else {
					this.checkbox.checked = false
				}

				console.log(this.checkbox.checked)
			},
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
			saoma() {
				this.$api.msg('等大神调插件')
			},
			tiaozhuan2() {
				if (this.idnum == '') {
					this.$api.msg('邀请码不能为空')
					return;
				}
				if (this.mobile == "") {
					this.$api.msg('手机号不能为空')
					return;
				}
				if (this.code == '') {
					this.$api.msg('验证码不能为空')
					return;
				}

				if (!this.checkbox.checked) {
					this.$api.msg('请先同意协议')
					return;
				}
				uni.navigateTo({
					url: "../password/passwords?mobile=" + this.mobile + "&code=" + this.code + "&idnum=" + this.idnum +
						"&is_register=" + "yes"
				})
			},
			tiaozhuan6() {
				uni.navigateTo({
					url: "../xieyi/jxs?xieyi_name="+this.xieyi_name
				})
			},
			tiaozhuan7() {
				uni.navigateTo({
					url: "../xieyi/ys?yinsixieyi="+this.yinsixieyi
				})
			},
			toshaomiao() {
					let that = this;
					console.log('启动相机吗?')
					uni.scanCode({
						success: function(res) {
							let inarr = JSON.parse(res.result);
							console.log(inarr, '数值进来')
							if (inarr.ty == 1) {
				
							} else if (inarr.ty == 2) {
				
							} else if (inarr.ty == 3 && inarr.paytn == 1) {
				
							} else if (inarr.ty == 3 && inarr.paytn == 2) {
				
							}
				
						}
					});
				// uni.navigateTo({
				// 	url: "../machine/scan"
				// })
			},
			CheckboxChange(e) {
				var items = this.checkbox,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
			},
		},

	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.register_content {
		width: 100vw;
		height: 100vh;
		background-color: #FFF;
	}

	.register_body1 {
		width: 600rpx;
		height: 460rpx;
		/* border:1rpx solid red; */
		margin: 0 auto;
		position: relative;
		top: 50rpx
	}

	.register_body1_top {
		width: 600rpx;
		height: 160rpx;
		padding-top: 48rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-bottom: 2rpx solid #E5E5E5;
	}

	.register_body1_top_left {
		width: 80rpx;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.register_logo1 {
		width: 45rpx;
		height: 50rpx;
	}

	.register_logo2 {
		width: 35rpx;
		height: 50rpx;
	}

	.ewm {
		width: 40rpx;
		height: 40rpx;
	}

	.register_body1_top_center {
		width: 350rpx;
		height: 45rpx;
	}

	.register_body1_top_right {
		width: 100rpx;
		height: 80rpx;
		margin-left: 66rpx;
		/* border:1rpx solid red; */
	}

	.password_body1_header_yzm {
		width: 200rpx;
		height: 60rpx;
		background-color: #D4D4D4;
		letter-spacing: 2rpx;
		color: #FCFCFC;
	}

	.register_body2 {
		width: 600rpx;
		height: 80rpx;
		font-size: 30rpx;
		letter-spacing: 5rpx;
		color: #FFFFFF;
		background-color: #5A7EF8;
		margin-left: 76rpx;
		margin-top: 180rpx
	}

	.register_body3 {
		width: 748rpx;
		margin-top: 108rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		position: fixed;
		bottom: 50rpx;
	}

	.register_text {
		height: 40rpx;
		font-size: 26rpx;
		color: #DEDEDE;
		margin-left: 2rpx;
	}

	.register_body2_last_left {
		height: 40rpx;
		font-size: 26rpx;
		color: #5A7EF8;
	}

	.register_body2_last_center {
		height: 40rpx;
		font-size: 26rpx;
		color: #5A7EF8;
	}

	.register_body2_last_right {
		height: 40rpx;
		font-size: 26rpx;
		color: #5A7EF8;
	}

	a {
		text-decoration: none;
	}

	.register_body1_bottom_right {
		height: 40rpx;
		background-color: #D4D4D4;
		font-size: 26rpx;
		letter-spacing: 2rpx;
		color: #FCFCFC;
	}

	.uni-radio.green.checked {}

	.uni-checkbox-input-checked {
		background-color: #5A7EF8 !important;
	}

	.uni-input-placeholder {
		font-size: 28rpx;
	}
</style>
