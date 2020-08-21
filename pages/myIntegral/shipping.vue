<template>
	<view class="box">
		<view class="border">
			<view class="border_list">
				<input class="" v-model="name" type="text" placeholder="收货人姓名" />
			</view>
			<view class="border_list">
				<input type="number" v-model="mobile" placeholder="手机号码" />
			</view>
			<view class="border_list flexs2">
				<view>
					<pick-regions class="border_with" @getRegion="handleGetRegion" :defaultRegion="defaultRegionCode">
						<view v-if="city != '' && region.length == 0">
							{{city}}
						</view>
						<view v-else-if="region.length == ''"> 所在地区</view>
						<view v-else>{{regionName}}</view>
						<image class="border_image" src="../../static/image/btn_xyb@2x.png" mode=""></image>
					</pick-regions>
				</view>
			</view>
			<view class="border_list">
				<input class="" type="text" v-model="address" placeholder="详细地址" />
			</view>
			<view class="flexs2">
				<view class="border_list lnh">设置默认地址</view>
				<view class="mr">
					<view class="border_bor" @click="choose_border" v-if="choose_image"></view>
					<image class="center_choose" v-else @click="choose_border" src="../../static/image/0005.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="button" @click="addAddress">保存</view>
	</view>
</template>


<script>
	import pickRegions from '@/address/components/pick-regions/pick-regions.vue'
	export default {
		components: {
			pickRegions
		},
		data() {
			return {
				is_default: 0,
				city: '',
				name: '',
				choose_image: false,
				mobile: '',
				address: '',
				checkbox: [{
					value: 'A',
					checked: true
				}, {
					value: 'B',
					checked: true
				}, {
					value: 'C',
					checked: false
				}],
				region: [],
				defaultRegion: ['广东省', '广州市', '番禺区'],
				defaultRegionCode: '440112',
				type: 1,
				address_id: '',
				cityCode: ''

			}
		},
		computed: {
			regionName() {
				// 转为字符串
				return this.region.map(item => item.name).join(' ');
			}
		},
		onLoad(option) {
			this.type = option.type ? option.type : 1; //1是新增2=修改
			// 如果是新增,默认显示是设置 choose_image: false,就是设置为默认地址
			if(this.choose_image == false){
				this.is_default = 1
			}
			this.address_id = option.address_id ? option.address_id : '';
			if (this.type == 2) {
				this.get_addressInfo(this.address_id);
			}

		},
		methods: {
			get_addressInfo(address_id) {
				var obj = {
					address_id: address_id
				}
				console.log(obj,999)
				this.$common.requests('/api/Shipping_address/get_address_info', obj).then(res => {
					if (res.data.code == 1) {
						this.name = res.data.data.name;
						this.mobile = res.data.data.mobile;
						this.city = res.data.data.city;
						this.defaultRegionCode = res.data.data.cityCode;
						this.cityCode = res.data.data.cityCode;
						this.address = res.data.data.address;
						this.is_default = res.data.data.default_switch;
						if (this.is_default == 0) {
							this.choose_image = true;
						} else {
							this.choose_image = false;
						}
					} else {
						this.$api.msg(res.data.msg);
					}
				});
			},
			addAddress() {
				if (this.type == 1) {
					//新增
					if (this.name == '' || this.mobile == '' || this.city == '' || this.address == '') {
						this.$api.msg('请补全信息');
						return;
					}
					if (/^1[345789]\d{9}$/.test(this.mobile) == false) {
						this.$api.msg('请输入正确的手机号格式')
						return
					}
					var obj = {
						name: this.name,
						mobile: this.mobile,
						city: this.city,
						address: this.address,
						is_default: this.is_default,
						cityCode: this.cityCode
					}
					this.$common.requests('/api/Shipping_address/add_address', obj).then(res => {
						if (res.data.code == 1) {
							this.$api.msg(res.data.msg);
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							}, 1000);
						} else {
							this.$api.msg(res.data.msg);
						}
					});
				} else {
					//修改
					if (this.name == '' || this.mobile == '' || this.city == '' || this.address == '') {
						console.log(this.mobile);
						this.$api.msg('请补全信息');
						return;
					}
					var obj = {
						name: this.name,
						mobile: this.mobile,
						city: this.city,
						address: this.address,
						is_default: this.is_default,
						address_id: this.address_id,
						cityCode: this.cityCode
					}
					this.$common.requests('/api/Shipping_address/update_address', obj).then(res => {
						if (res.data.code == 1) {
							this.$api.msg(res.data.msg);
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								})
							}, 1000);
						} else {
							this.$api.msg(res.data.msg);
						}
					});
				}
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
			choose_border() {
				this.choose_image = !this.choose_image
				if (this.choose_image) {
					this.is_default = 0;
				} else {
					this.is_default = 1;
				}
			},
			// 获取选择的地区
			handleGetRegion(region) {
				this.region = region
				console.log(this.region)
				this.city = this.region[0]['name'] + ' ' + this.region[1]['name'] + ' ' + this.region[2]['name'];
				this.cityCode = this.region[2]['code'];
			}
		},
	}
</script>


<style>
	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.box {
		width: 100vw;
		height: 100vh;
		background-color: #F2F2F2;
		overflow: hidden;
	}

	.border {
		width: 100%;
		height: 500rpx;
		background-color: #FFFFFF;
		padding: 0 20rpx;
		margin-top: 20rpx;
		color: #6E6E6E;
		font-size: 30rpx;
	}

	.border_bor {
		width: 32rpx;
		height: 32rpx;
		border: solid 1rpx #5A7EF8;
		border-radius: 50% 50%;

	}

	.border_with {
		width: 80vw;
	/* 	line-height: 100rpx; */
		font-size: 32rpx;
	}

	.center_choose {
		width: 32rpx;
		height: 32rpx;
	}

	.border_list {
		width: 90%;
		height: 100rpx;
		margin: 0 5%;
		border-bottom: solid 1rpx #E5E5E5;
		overflow: hidden;
		position: relative;
	}

	.lnh {
		line-height: 100rpx;
		border: none;
	}

	.border_list input {
		margin-top: 30rpx;
	}

	.border_image {
		width: 20rpx;
		height: 30rpx;
		position: absolute;
		right: 0;
		top: 32rpx;
	}

	checkbox-group {
		margin-right: 30rpx !important;
	}

	.button {
		width: 100%;
		line-height: 90rpx;
		background-color: #0055ff;
		color: #FFFFFF;
		text-align: center;
		position: absolute;
		bottom: 0;
	}

	.mr {
		margin-right: 36rpx;
	}

	.mr image {
		display: block;
	}
</style>
