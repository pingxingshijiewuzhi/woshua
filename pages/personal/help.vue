<template>
	<view class="box">
		<view class="big_border">
			<block v-for='(item,index) in infoobj' :key='index'>
				<view class="border flexs2" @click="tohelp(item.id,item.question)">
					<view class="border_center flexs1">
						<view class="border_num">{{index}}</view>
						<view class="">{{item.question}}</view>
					</view>
					<image class="image_next" src="../../static/image/btn_psdz_xyb@2x.png" mode=""></image>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				infoobj: []
			}
		},
		onLoad() {
			this._getquest()
		},
		methods: {
			_getquest() {
				this.$common.requests('/api/Queshelp/get_queshelp_list').then(res => {
					if (res.data.code == 1) {
						this.infoobj = res.data.data;
						console.log(this.infoobj)
					} else {
						this.$api.msg(res.data.msg);
					}
				})
			},
			tohelp(id,question) {
				uni.navigateTo({
					url: "../personal/problem?id=" + id + '&question=' +question
				})
			}
		}
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
		background-color: #FFFFFF;
	}

	.image_next {
		width: 20rpx;
		height: 30rpx;
	}

	.border {
		width: 100%;
		line-height: 120rpx;
		border-bottom: solid 1rpx #E5E5E5;
		padding: 0 30rpx;
		font-size: 32rpx;
	}

	.border_num {
		width: 48rpx;
		line-height: 36rpx;
		border-right: solid 4rpx #6B7FC9;
		color: #6B7FC9;
		margin-right: 18rpx;
	}

	.big_border {
		width: 100%;
		height: 1160rpx;
		overflow-y: scroll;
	}
</style>
