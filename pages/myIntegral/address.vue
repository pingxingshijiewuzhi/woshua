<template>
	<view class="box">
		<view class="border">
			<view class="border_list">废后将军</view>
			<view class="border_list">1555201234</view>
			<view class="border_list flexs2">
				<!-- <view class="">江苏省徐州市铜山区万达广场</view> -->
				<view>
					<pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
						<view v-if="region.length == ''"> 江苏省徐州市铜山区万达广场</view>
						<view v-else>{{regionName}}</view>
					</pick-regions>
					<!-- <view class="" v-else >{{regionName}}</view> -->
				</view>
				<image class="border_image" src="../../static/image/btn_xyb@2x.png" mode=""></image>
			</view>
			<view class="border_list">万达广场五号楼1402</view>
		</view>
		<view class="button">保存</view>
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

				region: [],
				defaultRegion: ['广东省', '广州市', '番禺区'],
				defaultRegionCode: '440113'
			}
		},
		computed: {
			regionName() {
				// 转为字符串
				return this.region.map(item => item.name).join(' ')
			}
		},
		methods: {
			// 获取选择的地区
			handleGetRegion(region) {
				this.region = region
				console.log(region)
			}
		},

	}
</script>


<style>
	.box {
		width: 100%;
		height: 100%;
		background-color: #F2F2F2;
		overflow: hidden;
	}

	.border {
		width: 100%;
		height: 600rpx;
		background-color: #FFFFFF;
		padding: 0 20rpx;
		margin-top: 20rpx;
		color: #6E6E6E;
		font-size: 30rpx;
	}

	.border_list {
		width: 90%;
		line-height: 100rpx;
		margin: 0 5%;
		border-bottom: solid 1rpx #E5E5E5;
	}

	.border_image {
		width: 20rpx;
		height: 30rpx;
	}

	.button {
		width: 100%;
		line-height: 120rpx;
		background-color: #5A7EF8;
		color: #FFFFFF;
		text-align: center;
		position: absolute;
		bottom: 0;
		font-size: 32rpx;
	}
</style>
