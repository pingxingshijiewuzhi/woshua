<template>
	<view class="box">
		<view class="big_list ">
			<view class="list " v-for="(item,index) in pos_list" :key="index" @click="tochine(item.type)">
				<image class="list_image" src="../../static/image/img_jj1@2x.png" mode=""></image>
				<view class="list_right">
					<view class="">{{item.type_text}}</view>
					<view class="">{{item.num}}</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				pos_list: []
			}
		},
		onLoad() {
			this.get_my_pos_num();
		},
		methods: {
			get_my_pos_num() {
				this.$common.requests('/api/Organization/get_organization_pos').then(res => {
					if (res.data.code == 1) {
						this.pos_list = res.data.data;
						console.log(this.pos_list)
						uni.removeStorageSync('data_list', this.pos_list)
						uni.setStorageSync('data_list', this.pos_list)
					} else {
						this.$api.msg(res.data.msg);
					}
				});
			},
			tochine(e) {
				var type = e;
				console.log(type)
				uni.navigateTo({
					url: "../machinelist/machinelist?type=" + type,
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
	}

	.box {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}

	.big_list {
		width: 100%;
		height: 1000rpx;
		overflow-y: scroll;
	}

	.list {
		width: 37%;
		height: 120rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		position: relative;
		display: inline-block;
		margin-top: 40rpx;
		box-shadow: 2px 5px 12px rgba(0, 0, 0, .1);
	}

	.list_image {
		width: 48rpx;
		height: 88rpx;
		margin: 16rpx 38rpx;
	}

	.list_right {
		position: absolute;
		left: 120rpx;
		top: 30rpx;
		font-size: 32rpx;
	}

	.list:nth-child(odd) {
		margin-left: 10%;
		margin-right: 10%;
	}
</style>

