<template>
	<view class="box">
		<view class="list flexs2">
			<view class="">持卡人</view>
			<view class="">{{bank.name}}</view>
		</view>
		<view class="list flexs2">
			<view class="">身份证号</view>
			<view class="">{{bank.idcard}}</view>
		</view>
		<view class="list flexs2">
			<view class="">请输入银行卡号</view>
			<input type="number" v-model="bank_num" placeholder="" />
		</view>
		<view class="list flexs2" @click="toyinh">
			<view class="" v-if="bank_name ==''">请选择开户行</view>
			<view v-else>{{bank_name}}</view>
			<image class="list_next" src="../../static/image/btn_psdz_xyb@2x.png" mode=""></image>
		</view>
		<view class="card_show" v-show="show_card">
			<block v-for="(item,index) in user" :key="index">
				<view class="card_model" @click="choose(index,item.id)">{{item.name}}</view>
			</block>
		</view>
		<view class="list flexs2">
			<view class="">手机号码</view>
			<view class="">{{bank.mobile}}</view>
		</view>
		<view class="list flexs2">
			<input class="input_yanz " type="text" v-model="code" placeholder="请输入验证码" style="text-align: left;" />
			<view class="list_yz" @click="toget" v-show="send == false">获取验证码</view>
			<view class='list_yz' v-show="send">{{second}}S后重新获取</view>
		</view>
		<view class="button" @click="getindexs">完成</view>
	</view>
</template>

<script>
	import xflSelect from '../../components/xfl-select/xfl-select.vue';
	components: {
		xflSelect
	}
	export default {
		data() {
			return {
				second: 60,
				send: false,
				bank_name: '',
				code: '',
				bank_num: '',
				user: [],
				bank: '',
				show_card: false,
				bank_list_id: '',
				res: '',
				mobile: '',
				true_mobile: '',
				new_mobile:''
			}
		},
		onLoad() {
			this.getdata()
			this.getbank()
		},
		methods: {
			choose(index, id) {
				var that = this
				this.bank_name = this.user[index].name
				console.log(index)
				this.bank_list_id = id
				setTimeout(function() {
					that.show_card = false;
				}, 500);
			},
			toyinh() {
				this.show_card = !this.show_card;
				return;
			},
			getbank() {
				this.$common.requests('/api/money/get_bank_detail').then(res => {
					if (res.data.code == 1) {
						this.bank = res.data.data;
						console.log(res.data.data,1)
						this.true_mobile = res.data.data.true_mobile
					} else {
						this.$api.msg(res.data.msg);
					}
				})
			},
			getdata() {
				this.$common.requests('/api/Datacount/get_bank_list').then(res => {
					if (res.data.code == 1) {
						this.user = res.data.data;
						console.log(this.user)
					} else {
						this.$api.msg(res.data.msg);
					}
				})
			},
			getindexs() {
				let obj = {
					bank_num: this.bank_num,
					bank_name: this.bank_name,
					bank_list_id: this.bank_list_id,
					code: this.code,
				}
			//	console.log(obj)
				this.$common.requests('/api/money/set_bank', obj).then(res => {
					if (res.data.code == 1) {
						this.res = res.data.data;
						this.$api.msg(res.data.msg);
						setTimeout(() => {
							uni.navigateBack({
								delta:1
							})
						}, 1000);
						
					} else {
						this.$api.msg(res.data.msg);
					}
				})
			},
			toget() {
				if (/^1[345789]\d{9}$/.test(this.true_mobile) == false) {
					this.$api.msg('请输入正确的手机号格式')
					return
				}
				let obj = {
					mobile: this.true_mobile
				}
				this.$common.requests('/api/user/sendSMS', obj).then(res => {
					if (res.data.code == 1) {
						this.send = true;
						this.$api.msg(res.data.msg);
						var that = this;
						let timer = setInterval(function() {
							console.log(111)
							if (that.second <= 0) {
								that.send = false;
								that.second = 60;
								clearInterval(timer);
							}
							that.second--
						}, 1000)
					} else {
						this.$api.msg(res.data.msg);
					}
				})
			}
		},
	}
</script>

<style>
	.box {
		width: 100vw;
		height: 100vh;
		background-color: #F2F2F2;
	}

	.list {
		width: 100%;
		line-height: 120rpx;
		background-color: #FFFFFF;
		border-bottom: solid 1rpx #E5E5E5;
		padding: 0 3%;
		font-size: 32rpx;
	}

	.list input {
		width: 400rpx;
		text-align: end;
	}

	.heig {
		height: 120rpx;
	}

	.list_kaihu {

		border-radius: 0 0;
		border: none;
		padding-left: 0;

	}

	.list_yz {
		/* width: 220rpx; */
		line-height: 60rpx;
		background-color: #F2F2F2;
		font-size: 30rpx;
		border-radius: 10rpx;
		text-align: center;
		padding: 0 10rpx;
	}

	.list_next {
		width: 22rpx;
		height: 32rpx;
	}

	.button {
		width: 100%;
		line-height: 80rpx;
		background-color: #5A7EF8;
		color: #FFFFFF;
		text-align: center;
		position: absolute;
		bottom: 0;
	}

	.input_yanz {
		width: 200rpx;
		height: 120rpx;
	}

	.list:nth-child(3) {
		margin-top: 20rpx;
	}

	.card_model {
		width: 100%;
		background-color: #FFFFFF;
		border-bottom: solid 1rpx #E5E5E5;
		line-height: 100rpx;
		padding-left: 20rpx;
	}

	.card_model:hover {
		width: 100%;
		background-color: #5A7EF8;
		color: #FFFFFF;
		border-bottom: solid 1rpx #E5E5E5;
		line-height: 100rpx;
		padding-left: 20rpx;
	}

	.card_show {
		width: 100%;
		position: absolute;
		z-index: 1;
	}
</style>
