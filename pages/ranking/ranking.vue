<template>
	<view class="box">
		<view class="border flexs">
			<view class="border_l">TOP</view>
			<view class="border_r">
				<view class="border_num">{{res.mytop}}</view>
				<view class="border_cen">昨日个人推广TOP</view>
			</view>
		</view>
		<view class="last flexs2">
			<view class=" last_l flexs2">
				<view class="">排名</view>
				<view class="">代理</view>
			</view>
			<view class="last_r">激活量</view>
		</view>
		<view class="big_list">
			<view class="list flexs2" v-for="(item,index) in res.list" :key="index">
				<view class="flexs2">
					<view class="big_number" v-if='Number(index) > 2'>
					<!-- <image class="list_image" src="" mode=""></image> -->
					{{index + 1}}
					</view>
					
					<image class="list_image" v-show="index + 1 == 1" src="../../static/image/img_phb_dy@2x.png" mode=""></image>
					<image class="list_image" v-show="index + 1 == 2" src="../../static/image/img_phb_de@2x.png" mode=""></image>
					<image class="list_image" v-show="index + 1 == 3" src="../../static/image/img_phb_ds@2x.png" mode=""></image>
					<view :class="Number(index)	<	3?'big_name_new':'big_name'">{{item.user.nickname}}</view>
				</view>
				<view :class="Number(index)	<	3?'last_o_new':'last_o'">{{item.count}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				res: {},
			}
		},
		onLoad() {
			this.getindex()
		},
		methods: {
			getindex() {
				this.$common.requests('/api/shops/get_top_list').then(res => {
					if (res.data.code == 1) {
						this.res = res.data.data
						// console.log(this.res)
						// console.log(this.res.list)
						// console.log(res.data.data)
					} else {
						this.$api.msg(res.data.msg)
					}
				});
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

	.border {
		width: 100%;
		height: 260rpx;
		background-image: url(../../static/image/img_phb@2x.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.border_l {
		color: #FFFFFF;
		font-size: 62rpx;
		position: absolute;
		top: 30rpx;
		left: 66rpx;
	}

	.big_number {
		width: 54rpx;
		height: 52rpx;
		/* margin-right: 46rpx; */
		margin-right: 14rpx;
		background-image: url(../../static/image/icon_mingci.png);
		/* background-image: url(../../static/image/img_1@2x.png); */
		background-size: 100% 100%;
		background-repeat: no-repeat;
		color: #FFFFFF;
		text-align: center;
		font-size: 30rpx;
	}

	.big_name_new {
		width: 260rpx;
		margin-left: 180rpx;
		color: red;
	}

	.big_name {
		width: 260rpx;
		margin-left: 214rpx;
		color: #555555;
	}

	.border_r {
		margin-left: 190rpx;
		line-height: 58rpx;

	}

	.border_num {
		font-size: 42rpx;
		color: #FFFFFF;
		text-align: center;
	}

	.border_cen {
		font-size: 30rpx;
		color: #FFFFFF;
	}

	.last {
		width: 100%;
		height: 80rpx;
		color: #4E84FD;
		padding: 0 32rpx;
		border-bottom: solid 1rpx #E5E5E5;
	}

	.last_l {
		width: 50%;
	}

	.list {
		width: 100%;
		height: 116rpx;
		padding: 0 32rpx;
		border-bottom: solid 1rpx #E5E5E5;
		letter-spacing: 4rpx;
	}

	.list_image {
		width: 54rpx;
		height: 52rpx;
		margin-right: 46rpx;
	}

	.big_list {
		width: 100%;
		height: calc(100vh - 340rpx);
		overflow-y: scroll;
		margin-bottom: 100rpx;
	}

	.last_o {
		margin-right: 24rpx;
		color: #555;
	}

	.last_o_new {
		margin-right: 24rpx;
		color: red;
	}
</style>

 