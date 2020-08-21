<template>
	<view class="box">
		<view class="border">
			<view class="flexs2">
				<image class="border_image" src="../../static/image/btn_h_fanhui@2x.png" mode="" @click="back"></image>
				<view class="border_text">创建入网商户</view>
				<view class="border_right" @click="todengdai">待入网商户</view>
			</view>
		</view>
		<view class="box_list">
			<view class="list flexs1">
				<input type="number" v-model="phone" placeholder="请输入登录手机号" />
			</view>
			<view class="list flexs2">
			<input type="text" v-model='verCode' placeholder="请输入图形验证码" />
			<view class="canvas-img-code" @click="refresh()">
				<canvas :style="{width:width+'px',height:height+'px'}" canvas-id="imgcanvas" @error="canvasIdErrorCallback"></canvas>
			</view>
			<!-- <image class="photos" src="../../static/image/0006.png" mode=""></image> -->
			</view>
			<view class="list flexs2">
				<input type="text" placeholder="请输入验证码" v-model='phonepassword' />
				<text v-show="stus == true" class="phone" @click="getcaptcha">{{ text }}</text>
				<text class="phone" v-show="stus == false">{{ text }}S重新获取</text>
				<!-- <view class="phone">获取验证码</view> -->
			</view>
		</view>
		<view class="button" @click="tonext">下一步</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				verCode: "", //验证码
				width: 120,
				height: 45,
				
				phonepassword: '',
				phone: '',
				stus: true, //倒计时标识
				sunmax: 60,
				text: '获取验证码'
			}
		},
		onShow() {
			var _this = this;
			setTimeout(function() {
				_this.init();
			}, 1000)
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			todengdai() {
				uni.navigateTo({
					url: "../locationin/merchants"
				})
			},
			// 获取验证码
			getcaptcha() {
				if (/^1[345789]\d{9}$/.test(this.phone)) {
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
						mobile: this.phone
					};
					this.$common.requests('/api/user/sendSMS', obj).then(res => {
						this.$api.msg(res.data.msg);
						if (res.data.code == 1) {}
					});
				} else {
					this.$api.msg('请输入正确的手机号');
				}
			},
			tonext() {
				if (this.verCode.length != 4) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '图片验证码不正确'
					});
					return false;
				}
				if (this.verCode.toLowerCase() != uni.getStorageSync('imgcode').toLowerCase()) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '图片验证码不正确'
					});
					return false;
				}
				var that = this
				let obj = {
					mobile: this.phone,
					captcha: this.phonepassword
				}
				this.$common.requests('/api/shops/mobile_code', obj).then(res => {
					if (res.data.code == 1) {
						uni.navigateTo({
							url: "../locationin/information?phone="+that.phone
						})
					} else {
						console.log(res.data.msg)
						this.$api.msg(res.data.msg);
					}
				})
			},
			// 初始化验证码
			init: function() {
				console.log('start');
				var context = uni.createCanvasContext('imgcanvas', this),
					w = this.width,
					h = this.height;
				context.setFillStyle("white");
				context.setLineWidth(5);
				context.fillRect(0, 0, w, h);
				var pool = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "I", "M", "N", "O", "P", "Q", "R", "S",
						"T", "U", "V", "W", "S", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
					],
					str = '';
				for (var i = 0; i < 4; i++) {
					var c = pool[this.rn(0, pool.length - 1)];
					var deg = this.rn(-30, 30);
					context.setFontSize(18);
					context.setTextBaseline("top");
					context.setFillStyle(this.rc(80, 150));
					context.save();
					context.translate(30 * i + 15, parseInt(h / 1.5));
					context.rotate(deg * Math.PI / 180);
					context.fillText(c, -15 + 5, -15);
					context.restore();
					str += c;
				}
				uni.setStorage({
					key: 'imgcode',
					data: str,
				});
				for (var i = 0; i < 40; i++) {
					context.beginPath();
					context.arc(this.rn(0, w), this.rn(0, h), 1, 0, 2 * Math.PI);
					context.closePath();
					context.setFillStyle(this.rc(150, 200));
					context.fill();
				}
				context.draw();
				console.log('end');
			},
			rc: function(min, max) {
				var r = this.rn(min, max);
				var g = this.rn(min, max);
				var b = this.rn(min, max);
				return "rgb(" + r + "," + g + "," + b + ")";
			},
			rn: function(max, min) {
				return parseInt(Math.random() * (max - min)) + min;
			},
			refresh: function() {
				this.init();
			},
			canvasIdErrorCallback: function(e) {
				console.error(e.detail.errMsg)
			}
		}
	}
</script>

<style>
	.box {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}

	/* border */
	.border {
		width: 100%;
		height: 100rpx;
		color: #3D3D3D;
		margin-top: 80rpx;
		padding: 0 26rpx;
	}

	.border_image {
		width: 40rpx;
		height: 30rpx;
	}

	.border_text {
		font-size: 32rpx;
		letter-spacing: 8rpx;
		margin-left: 34rpx;
		font-weight: 600;
	}

	.border_right {
		font-size: 30rpx;
	}

	.border_top {
		width: 94%;
		height: 100rpx;
	}

	.photos {
		width: 120rpx;
		height: 60rpx;
	}

	.phone {
		width: 200rpx;
		line-height: 60rpx;
		background-color: #D2D2D2;
		color: #FFFFFF;
		text-align: center;
	}

	.list {
		width: 85%;
		height: 140rpx;
		padding-top: 30rpx;
		margin: 0 12% 0 4%;
		border-bottom: solid #E5E5E5 1rpx;
	}

	.button {
		width: 82%;
		line-height: 90rpx;
		margin: 0 9%;
		background-color: #5A7EF9;
		text-align: center;
		color: #FFFFFF;
		font-size: 32rpx;
		margin-top: 160rpx;
	}

	.uni-input-placeholder {
		font-size: 28rpx;
	}
	.canvas-img-code{
		/* border:1rpx solid red; */
	}
</style>
