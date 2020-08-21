<template>
	<view class="box">
		<view class="big_list">
			<view class="list" v-for="(item,index) in addressList" :key="index">
				<view class="" @click="tosong(item.id)">
					<view class="flexs1">
						<view class="barder_left">{{item.name}}</view>
						<view class="barder_right">{{item.mobile}}</view>
					</view>
					<view class="barder_last">{{item.address}}</view>
				</view>
				<view class="center flexs2">
					<view class="flexs1">
						<view class="border_bor" @click="choose_border(index,item.id,item.is_default)" v-if="item.is_default == 0"></view>
						<view class="image_border" v-else>
							<image class="center_choose" @click="choose_border(index,item.id,item.is_default)" src="../../static/image/0005.png"
							 mode=""></image>
						</view>
						<view class="center_di">默认地址</view>
					</view>
					<view class="flexs1">
						<view class="flexs1">
							<image class="center_image" src="../../static/image/btn_bj@2x.png" mode=""></image>
							<view class="center_text" @click="tobianji(item.id)">编辑</view>
						</view>
						<view class="flexs1 mlf">
							<image class="center_image" src="../../static/image/btn_sc@2x.png" mode=""></image>
							<view class="center_text" @tap="showModal($event,index)" data-target="DialogModal1">删除</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--弹框 -->
		<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end content">
					<view class="content">提示</view>
				</view>
				<view class="padding-xl" @change="changeDatetimePicker">
					<view class="row">确定要删除该条地址吗</view>
				</view>
				<view class=" flexs1">
					<button class="action_left" @tap="hideModal">取消</button>
					<button class="action_right" @tap="hideModal_delete">确定</button>
				</view>
			</view>
		</view>
		<view class="button" @click="topeisong">添加地址</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_default: '',
				choose_image: true,
				modalName: null,
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
				page: 1,
				limit: 10,
				addressList: [],
				address_index: '',
				is_check: false
			}
		},
		onLoad(option) {
			this.is_check = option.is_check ? option.is_check : false;
		},
		onShow() {
			this.page = 1;
			this.addressList = [];
			this.get_address();
		},
		onPullDownRefresh() {
			//下拉刷新
			this.addressList = [];
			this.page = 1;
			this.get_address();
		},
		onReachBottom() {
			//上拉触底
			this.page++;
			this.get_address();
		},
		methods: {
			get_address() {
				var obj = {
					page: this.page,
					limit: this.limit
				}
				this.$common.requests('/api/Shipping_address/get_address_list', obj).then(res => {
					if (res.data.code == 1) {
						console.log(res.data.data)
						if(this.page == 1){
						this.addressList = res.data.data
						}else{
						this.addressList = this.addressList.concat(res.data.data);
						}
					} else {
						this.$api.msg(res.data.msg);
					}
					uni.stopPullDownRefresh();
				});
			},
			choose_border(index, addressId, addressDefault) {
				console.log(addressId)
				for (var i = 0; i < this.addressList.length; i++) {
					this.addressList[i]['is_default'] = 0;
				}
				if (addressDefault == 1) {
					this.addressList[index]['is_default'] = 0;
				} else {
					this.addressList[index]['is_default'] = 1;
				}
				this.changeDefault(addressId, addressDefault);
				return
			},
			changeDefault(id, is_default) {
				var obj = {
					address_id: id
				}
				this.$common.requests('/api/Shipping_address/set_default', obj).then(res => {
					if (res.data.code == 1) {
						this.$api.msg(res.data.msg);
					} else {
						this.$api.msg(res.data.msg);
					}
				});
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
			showModal(e, index) {
				console.log(e);
				console.log(index);
				this.address_index = index;
				this.modalName = "DialogModal1";
			},
			hideModal(e) {
				this.modalName = null
			},
			hideModal_delete(e) {
				this.modalName = null;
				var obj = {
					address_id: this.addressList[this.address_index]['id']
				}
				this.$common.requests('/api/Shipping_address/delete_address', obj).then(res => {
					if (res.data.code == 1) {
						this.$api.msg(res.data.msg);
						this.addressList.splice(this.address_index, 1);
					} else {
						this.$api.msg(res.data.msg);
					}
				});
			},
			changeDatetimePicker(e) {
				console.log(e)
			},
			tosong(address_id) {
				if (Boolean(this.is_check) == true) {
					uni.setStorageSync('area_id', address_id);
					uni.navigateBack({
						delta: 1
					})
				} else {
					//没看懂跳这个页面干啥
				}
			},
			tobianji(address_id) {
				uni.navigateTo({
					url: "../myIntegral/shipping?type=" + 2 + '&address_id=' + address_id
				})
			},
			topeisong() {
				uni.navigateTo({
					url: "../myIntegral/shipping"
				})
			}
		},
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;
	}

	.box {
		width: 100%;
		/* height:100vh; */
		height: calc(100vh - 100rpx);
		background-color: #F2F2F2;
		overflow: hidden;
	}

	.list {
		width: 100%;
		padding-bottom: 20rpx;
		background-color: #FFFFFF;
		margin-top: 36rpx;
	}

	.border_bor {
		margin-top: 10rpx;
		width: 32rpx;
		height: 32rpx;
		border: solid 1rpx #5A7EF8;
		border-radius: 50% 50%;
	}

	.barder_left {
		font-size: 32rpx;
		font-weight: 600;
		margin-right: 40rpx;
		color: #363636;
		letter-spacing: 6rpx;
		margin-top: 20rpx;
		margin-left: 30rpx;
	}

	.barder_right {
		font-size: 32rpx;
		font-weight: 600;
		color: #363636;
		letter-spacing: 6rpx;
		margin-top: 8rpx;
		margin-top: 20rpx;

	}

	.center_choose {
		width: 32rpx;
		height: 32rpx;
	}

	.barder_last {
		font-size: 30rpx;
		margin-top: 20rpx;
		color: #5E5E5E;
		margin-left: 30rpx;
	}

	.center {
		padding: 0 30rpx;
		margin-top: 10rpx;
	}

	.center_di {
		margin-left: 20rpx;
		margin-top: 10rpx;
	}

	.mlf {
		margin-left: 30rpx;
	}

	.button {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #5A7EF8;
		color: #FFFFFF;
		text-align: center;
		position: absolute;
		bottom: 0;
	}

	.center_image {
		width: 30rpx;
		height: 30rpx;
	}

	.center_text {
		margin-left: 10rpx;
		color: #7A7A7A;
	}

	.big_list {
		width: 100%;
		/* height:1110rpx; */
		height: 100%;
		overflow-y: scroll;
	}

	/* model */
	.action_left {
		width: 50%;
		line-height: 100rpx;
		font-size: 30rpx;
		background-color: #FFFFFF;
	}

	.row {
		height: 130rpx;
		font-size: 34rpx;
		color: #AFAFAF;
		padding-top: 20rpx;
	}

	.action_right {
		width: 50%;
		line-height: 100rpx;
		font-size: 30rpx;
		color: #5A7EF8;
		background-color: #FFFFFF
	}

	.content {
		width: 100% !important;
		height: 70rpx;
		color: #5F84F7;
	}

	.action_right:hover {
		color: #5A7EF8;
	}

	.padding-xl {
		background-color: #FFFFFF;
		padding: 0;
	}

	.image_border {
		width: 32rpx;
		height: 32rpx;
		margin-top: 10rpx;
	}
</style>
