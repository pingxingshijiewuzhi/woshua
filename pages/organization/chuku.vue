<template>
	<view class='ruku'>
		<view class="mytabbar">
			<view class="mytabbar_top flexs2">
				<image class="mytabbar_image" @click="back" src="../../static/image/0000.png" mode=""></image>
				<view class="mytabbar_text">出库</view>
				<view class=" mytabbar_right"></view>
			</view>
		</view>
		<block v-for='(item,index) in chukuArray' :key='index'>
			<view class='nothing'>
				<view class='mytimetitle'>{{item.time}}</view>
				<block v-for='(item1,index1) in item.list' :key='index1'>
					<view class='recodeitem' @click='godetail(item1.id)'>
						<view class='recodeitem_left'>
							<view class='left_title addblue'>出库成功</view>
							<view class='left_time'>接收者:{{item1.form_name}}</view>
						</view>
						<view class='recodeitem_right'>
							<view class='addmycolor'>
								<view class='addfontsize'>{{item1.num}}</view> 台
							</view>
							<view class='right_num'>{{item1.createtime}}</view>
						</view>
					</view>
				</block>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chukuArray: [],
				page: 1,
				limit: 10
			}
		},
		onLoad() {
			this._getchuku()
		},
		methods: {
			_getchuku() {
				let obj = {
					type: 2,
					page: this.page,
					limit: this.limit
				}
				this.$common.requests('/api/pos/get_pos_transfer_list', obj).then(res => {
					if (res.data.code == 1) {
						console.log(res.data.data)
						this.chukuArray = res.data.data
					} else {
						this.$api.msg(res.data.msg)
					}
				});
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			godetail(id) {
				uni.navigateTo({
					url: 'chukudetail?id=' + id
				})
			}
		}
	}
</script>

<style scoped>
	.ruku {
		width: 100vw;
		height: 100vh;
		background-color: #F2F2F2;
	}

	/* mytabbar */
	.mytabbar {
		width: 100%;
		height: 120rpx;
		background-color: #5A7EF8;
		padding: 30rpx 20rpx;
	}

	.mytabbar_image {
		width: 40rpx;
		height: 34rpx;
	}

	.mytabbar_text {
		font-size: 38rpx;
		color: #FCFFFC;
	}

	.mytabbar_right {
		font-size: 28rpx;
		color: #DDE9F4;
	}

	.mytabbar_top {
		width: 100%;
		height: 100rpx;
	}

	/* 入库流水记录样式 */
	.nothing {
		margin-bottom: 30rpx;
	}

	.mytimetitle {
		height: 82rpx;
		line-height: 82rpx;
		background-color: #FFFFFF;
		font-size: 34rpx;
		padding-left: 30rpx;
		border-bottom: 1rpx solid #E5E5E5;
	}

	.recodeitem {
		padding: 30rpx;
		background-color: #FFFFFF;
		height: 150rpx;
		display: flex;
		justify-content: space-between;
		margin-bottom: 30rpx;
	}

	.recodeitem_left {
		height: 90rpx;
		width: 400rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		/* align-items: center; */
	}

	.left_time {}

	.left_title {
		height: 36rpx;
		line-height: 36rpx;
		font-size: 30rpx;
		color: #5F84F6;
	}

	.recodeitem_right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
		height: 90rpx;
		width: 300rpx;
		text-align: right;
	}

	.addmycolor {
		display: flex;
		width: 80rpx;
		justify-content: space-between;
		height: 36rpx;
		line-height: 36rpx;
		font-size: 30rpx;
	}

	.addfontsize {
		font-size: 34rpx;
	}
</style>
