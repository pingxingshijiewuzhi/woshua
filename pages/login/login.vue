<template>
	<view class="login_content ">
		<view class="login_body1">
			<view class="login_body1_header">
				<view class="login_body1_header_left">
					<image class="login_shouji" src="../../static/android/img_sji.png"></image>
				</view>
				<!-- <block v-if='account'> -->
					<view class="login_body1_header_center">
						<input type="text" v-model="account" placeholder="手机号">
					</view>
				<!-- </block> -->
				
			</view>
			<view class="login_body1_bottom">
				<view class="login_body1_header_left">
					<image class="login_shouji" src="../../static/android/img_mima.png"></image>
				</view>
				<view class="login_body1_header_center">
					<!-- <block v-if='password'> -->
						<input type="password" v-model="password" placeholder="密码" v-show="input_type == true">
						<input type="text" v-model="password" placeholder="密码" v-show="input_type == false">
					<!-- </block> -->
				</view>
				<view class="login_body1_bottom_left flexs">
					<image class="sign1" src="../../static/android/img_guanbi.png" @click="emputypwd">
				</view>
				<view class="login_body1_bottom_left flexs">
					<image class="sign2" src="../../static/android/register_icon_yj_bi@2x.png" @click="pwdtotext" v-show="input_type == true">
						<image class="sign2" src="../../static/android/register_icon_yj_kai@2x.png" @click="pwdtotext" v-show="input_type == false">
				</view>
			</view>
			<view class='mima'>
				<checkbox-group class="mycheckbox" @change="CheckboxChange">
					<view class="chhoose_color">
						<checkbox :class="checkbox[0].checked?'checked':''" :checked="checkbox[0].checked?true:false" value="A" @click="changtrue"></checkbox>
					</view>
				</checkbox-group>
				<view class='myrecommend'>记住账号密码</view>
			</view>
		</view>
		<view class="login_body2">
			<view class="login_body2_top  flexs" @click="login">
				登录
			</view>
			<view class="login_body2_middle flexs" @click="tiaozhuan1">
				注册
			</view>
			<view class="login_body2_bottom flexs" @click="resetpwd">
				重置密码？
			</view>
		</view>
	<!-- 	<view class="login_body2_last flexs">
			<view class="login_body2_last_left" @click="tiaozhuan3">{{xieyi_name}}</view>
			<view class="login_body2_last_center">与</view>
			<view class="login_body2_last_right" @click="tiaozhuan4">{{yinsixieyi}}</view>
		</view> -->
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
				account: '',
				password: '',
				input_type: true,
				xieyi_name:'',
				yinsixieyi:''
			}
		},
		onReady() {
			this._getprocol()
			this._getacouuntpassword()
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
			pwdtotext() {
				if (this.input_type == true) {
					this.input_type = false
				} else {
					this.input_type = true
				}
			},
			emputypwd() {
				this.password = ''
			},
			resetpwd() {
				uni.navigateTo({
					url: "../reset/reset"
				})
			},
			_getacouuntpassword(){
				this.account = uni.getStorageSync('account')
				this.password = uni.getStorageSync('password')
				console.log(this.account)
				console.log(this.password)
			},
			login() {
				if(this.checkbox.checked){
					uni.setStorageSync('account',this.account)
					uni.setStorageSync('password',this.password)
				}else{
					uni.setStorageSync('account','')
					uni.setStorageSync('password','')
				}
				var obj = {
					account: this.account,
					password: this.password
				}
				this.$common.requests('/api/user/login', obj).then(res => {
					if (res.data.code == 1) {
						this.$api.msg(res.data.msg);
						var data = res.data.data.userinfo;
						uni.setStorageSync('uid', data.user_id);
						uni.setStorageSync('token', data.token);
						uni.setStorageSync('userinfo', data);
						// console.log(data,666666)
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/index/index'
							})
						}, 1500);
					} else {
						console.log(res.data.msg)
						this.$api.msg(res.data.msg);
					}
				});
			},
			tiaozhuan1() {
				uni.navigateTo({
					url: "../register/register"
				})
			},
			tiaozhuan3() {
				uni.navigateTo({
					url: "../xieyi/jxs?xieyi_name="+this.xieyi_name
				})
			},
			tiaozhuan4() {
				uni.navigateTo({
					url: "../xieyi/ys?yinsixieyi="+this.yinsixieyi
				})
			},
			// 记住密码账号
			changtrue() {
				if (!this.checkbox.checked) {
					this.checkbox.checked = true
				} else {
					this.checkbox.checked = false
				}
			
				console.log(this.checkbox.checked)
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
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.login_content {
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
		position: relative;
	}

	.login_body1 {
		width: 600rpx;
		/* height: 350rpx; */
		/* border:1rpx solid red; */
		padding-top: 66rpx;
		margin: 0 auto;
	}

	.login_body1_header {
		width: 600rpx;
		height: 110rpx;
		/* border:1rpx solid blue; */
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 25rpx;
		border-bottom: 2rpx solid #D4D4D4;
	}

	.login_body1_header_left {
		width: 80rpx;
		height: 80rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.login_shouji {
		width: 34rpx;
		height: 46rpx;
	}

	.uni-input-placeholder {
		letter-spacing: 12rpx;
	}

	.login_body1_bottom {
		width: 600rpx;
		height: 110rpx;
		/* border:1rpx solid blue; */
		display: flex;
		flex-direction: row;
		align-items: center;
		border-bottom: 2rpx solid #D4D4D4;
		margin-top: 40rpx;
	}

	.sign1 {
		width: 35rpx;
		height: 35rpx;
	}

	.sign2 {
		width: 50rpx;
		height: 26rpx;
	}

	.login_body1_bottom_left {
		width: 64rpx;
		height: 110rpx;
		/* border:1rpx solid blue; */
		margin-left: 2rpx;
		margin-right: 20rpx;

	}
	.mima{
		width:100%;
		height:70rpx;
		display: flex;
		padding-top: 20rpx;
		justify-content: flex-end;
		color: #979797;
		padding-right: 20rpx;
		/* border:1rpx solid red; */
	}
	.mycheckbox{
		width:40rpx;
		height:40rpx;
	}
	.myrecommend{
		height:50rpx;
		line-height: 50rpx;
		width:200rpx;
		text-align: center;
		/* border:1rpx solid blue; */
	}
	.login_body2 {
		width: 600rpx;
		height: 200rpx;
		margin: 140rpx auto;
	}

	.login_body2_top {
		width: 600rpx;
		height: 80rpx;
		font-size: 30rpx;
		letter-spacing: 5rpx;
		color: #FFFFFF;
		background-color: #5A7EF8;

	}

	.login_body2_middle {
		width: 600rpx;
		height: 80rpx;
		font-size: 30rpx;
		letter-spacing: 4rpx;
		color: #7091F9;
		background-color: white;
		border: 1px solid #7091F9;
		margin: 30rpx auto;
	}

	.login_body2_bottom {
		width: 600rpx;
		height: 95rpx;
		font-size: 28rpx;
		letter-spacing: 4rpx;
		color: #979797;
		background-color: #FFFFFF;
		/* border: 1rpx solid #7091F9; */
		margin-top: 44rpx;
	}

	.login_body2_last {
		width: 100%;
		height: 40rpx;
		position: absolute;
		bottom: 150rpx;
	}

	.login_body2_last_left {
		height: 40rpx;
		font-size: 28rpx;
		letter-spacing: 4rpx;
		color: #5A7EF8;
	}

	.login_body2_last_center {
		width: 40rpx;
		height: 40rpx;
		font-size: 28rpx;
		color: #5A7EF8;

	}

	.login_body2_last_right {
		height: 40rpx;
		font-size: 28rpx;
		letter-spacing: 4rpx;
		color: #5A7EF8;
	}

	.uni-input-placeholder {
		font-size: 28rpx;
	}
</style>
