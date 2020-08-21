<template>
	<view class="box">
		<view class="border">
			<view class="flexs2">
				<image class="border_image" src="../../static/image/btn_h_fanhui@2x.png" mode="" @click="back"></image>
				<view class="border_text">商户转移</view>
				<view class="border_right" @click="tomerchant">确定</view>
			</view>
		</view>
		<view class="list_box">
			<!-- <radio-group class="block" @change="RadioChangeSport">
				<view class='flexs1 radiobig_list_c'>
					<view class="small">
						<radio class='radio' :class="sportradio=='Aa'?'checked':''" :checked="sportradio=='Aa'?true:false" value="Aa">
						</radio>是
					</view>
					<view class="small">
						<radio class='radio' :class="sportradio=='Bb'?'checked':''" :checked="sportradio=='Bb'?true:false" value="Bb">
						</radio>否
					</view>
				</view>		
			</radio-group> -->
			<radio-group name="" @change="changradio">
				<view class="list" v-for="(item,index) in datalist" :key="index">
					<label>
						<radio class='radio' :class="radioIndex==item.id?'checked':''" :checked="radioIndex==item.id?true:false" :value="item.id+''" />
						<view class='merchant'>{{item.nickname}}</view>
					</label>
					<!-- <view class="list_text">{{item.nickname}}</view> -->
				</view>
			</radio-group>
		</view>
		<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				limit: 10,
				lisize: 0,
				loadMoreText: "加载中...",
				showLoadMore: false,

				merchantid: '',
				radioIndex: '',
				datalist: []

			}
		},
		onLoad(option) {
			this.merchantid = option.id
			this._getmerchantlist()
		},
		onPullDownRefresh() {
			this.page = 1
			this._getmerchantlist()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 500)
		},
		onReachBottom() { //监听上拉触底事件
			this.showLoadMore = true
			setTimeout(() => {
				//获取数据
				if (this.lisize == 10) { //
					this.page++;
					this._getmerchantlist();
				} else {
					this.loadMoreText = "暂无更多";
					this.showLoadMore = false;
				}
			}, 1000);
		},
		methods: {
			_getmerchantlist() {
				let obj = {
					page: this.page,
					limit: this.limit
				}
				this.$common.requests('/api/shops/get_son_list').then(res => {
					if (res.data.code == 1) {
						this.lisize = res.data.data.length
						if (this.lisize == 0) {
							this.$api.msg('暂无更多数据数据')
							return
						} else {
							this.datalist = this.datalist.concat(res.data.data)
						}
					} else {
						this.$api.msg(res.data.msg)
					}
				});
			},
			changradio(e) {
				this.radioIndex = e.detail.value
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 点击确定,执行商户转移
			tomerchant() {
				let obj = {
					access_id: this.merchantid,
					son_id: this.radioIndex
				}
				this.$common.requests('/api/shops/shops_transfer', obj).then(res => {
					if (res.data.code == 1) {
						uni.navigateTo({
							url: "../merchant/merchant"
						})
					} else {
						this.$api.msg(res.data.msg)
					}
				});
			},
			// CheckboxChange(e) {
			// 	var items = this.checkbox,
			// 		values = e.detail.value;
			// 	for (var i = 0, lenI = items.length; i < lenI; ++i) {
			// 		items[i].checked = false;
			// 		for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
			// 			if (items[i].value == values[j]) {
			// 				items[i].checked = true;
			// 				break
			// 			}
			// 		}
			// 	}
			// },
		}
	}
</script>

<style>
	.uni-loadmore {
		text-align: center;
	}

	page {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.box {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background-color: #FFFFFF;
	}

	.border {
		width: 100%;
		line-height: 100rpx;
		color: #3D3D3D;
		padding: 60rpx 20rpx 0 20rpx;
		background-color: #FFFFFF;
		border-bottom: solid 1rpx #F2F2F2;
	}

	.border_image {
		width: 40rpx;
		height: 30rpx;
	}

	.border_text {
		font-size: 40rpx;
		letter-spacing: 8rpx;
		margin-left: 34rpx;
		font-weight: 500;
	}

	.border_right {
		font-size: 30rpx;
		color: #7E97ED;
	}

	.border_top {
		width: 94%;
		height: 100rpx;
	}

	.list_box {
		width: 100%;
		height: 100%;
		overflow-y: scroll;
	}

	.list {
		width: 100%;
		height: 100rpx;
		margin-left: 30rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.uni-label-pointer {
		cursor: pointer;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.merchant {
		margin-left: 20rpx;
		height: 40rpx;
		line-height: 40rpx;
	}

	.list_text {
		margin-left: 50rpx;
		height: 40rpx;
	}
</style>
