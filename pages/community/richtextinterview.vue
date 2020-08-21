<template>
	<view class='interviewdetail'>
		<view class="status_bar">
			<view class="top_view"></view> <!-- 这里是首页状态栏 去除原生导航 占位 -->
		</view>
		<!-- shadow="true"不给导航栏阴影 -->
		<uni-nav-bar left-icon="arrowleft" fixed="true" status-bar="true" @clickLeft="back" @clickRight="sharebtn" :title="contentsde.title">
			<block slot="right">
				<view class="city">
					<view :class="{active:shstatus}"></view>
				</view>
			</block>
		</uni-nav-bar>
		<view class='interview_title'>
			{{detail.title}}
		</view>
		<view class='interview_secondtitle'>
			<view class='addblue'>{{detail.author}}</view>
			<view class='oldtime'>{{detail.createtime}}</view>
		</view>
		<!-- <img style="width:100%" src="http://ohbrush.shangxin6688.com/uploads/20200716/e5188e73b5465a1b7eb371b55fbe3968.jpg" title="" alt=""/> -->
		<view class="mycontent">
			<jyf-parser :html="detail.content" ref="article"></jyf-parser>
			<!-- <rich-text :nodes="detail.content"></rich-text> -->
		</view>
		<!-- <view class='imgbox'>
			<image :src="$common.baseUrl + detail.image" mode=""></image>
		</view> -->
		<view class='masking' @click='modclick' v-if='sharestatus'></view>
		<view class='modelopacity' v-if='sharestatus'>
			<view class='my_title'>选择要分享到的平台</view>
			<view class='typechoose'>
				<image src="../../static/image/icon_wdsh_h_wx@2x.png" mode=""></image>
				<image src="../../static/image/icon_h_wdsh_pyq@2x.png" mode=""></image>
			</view>
			<view class='bottombtn' @click='closeshare'>
				<image src="../../static/communityimage/btn_h_qxfx@2x.png" mode=""></image>
			</view>
		</view>
	</view>

</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	export default {
		components: {
			uniIcons,
			uniNavBar,
			jyfParser
		},
		data() {
			return {
				contentsde: {
					title: ''
				},
				// 分享状态
				shstatus: false,
				// 默认不显示弹框
				sharestatus: false,
				id: '', //访谈id
				detail: [], //访谈详情
			}
		},
		onLoad(option) {
			// console.log(option)
			this.id = option.id
			this.getFangTanDetail()
		},
		methods: {
			getFangTanDetail() {
				//获取访谈详情
				var obj = {
					voice_id: this.id
				}
				this.$common.requests('/api/voice/get_voice_detail', obj).then(res => {
					if (res.data.code == 1) {
						this.detail = res.data.data
						console.log(this.detail, 9987654321)
						this.contentsde.title = res.data.data.name
					} else {
						this.$api.msg(res.data.code)
					}
				});
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 分享按钮
			sharebtn() {
				this.sharestatus = true
			},
			modclick() {
				this.sharestatus = false
			},
			// 取消分享
			closeshare() {
				this.sharestatus = false
			},
		}
	}
</script>

<style lang="scss" scoped>
	.status_bar {
		/* 把状态栏的位置从前景部分让出来，可写一个占位div，高度设为css变量。 */
		// height: var(--status-bar-height);
		width: 100%;
		background: #fff;
	}

	.top_view {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		background-color: #fff;
		top: 0;
		z-index: 999;
	}

	.city {
		view {
			width: 40upx;
			height: 38upx;
			background: url(../../static/communityimage/sharebtn.png) no-repeat;
			background-size: 100% 100%;
		}

		view.active {
			background: url(../../static/communityimage/sharebtn.png) no-repeat;
			background-size: 100% 100%;
		}
	}

	.interviewdetail {
		height: 100vh;
		width: 100vw;
		// min-height: 100vh;
		background: #fff;
		position: relative;
	}

	.interview_title {
		height: 120rpx;
		width: 100%;
		padding: 40rpx 30rpx 30rpx 30rpx;
		line-height: 60rpx;
	}

	.interview_secondtitle {
		padding-left: 30rpx;
		width: 380rpx;
		height: 50rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.addblue {
		color: #6E84E7;
		height: 50rpx;
		width: 80%;
		line-height: 50rpx;
	}

	.oldtime {
		width: 80%;
		height: 50rpx;
		line-height: 50rpx;
		text-align: right;
		color: #979797;
	}

	.mycontent {
		// height:calc(100vh - 258rpx);
		width: 100%;
		// text-indent: 2em;
	}
	.imgbox {
		width: 100%;
	}
	.imgbox image {
		margin: 0 auto;
		width: 90%;
		// height:300rpx;
		display: block;
	}
	/* 分享弹框样式 */
	.masking {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .3);
	}
	.modelopacity {
		position: fixed;
		z-index: 999;
		left: 0;
		right: 0;
		bottom: 0;
		height: 380rpx;
		background-color: #FFFFFF;
		/* border:1rpx solid red; */
	}

	.my_title {
		height: 150rpx;
		line-height: 150rpx;
		text-align: center;
		font-size: 32rpx;
	}

	.typechoose {
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.typechoose image {
		width: 110rpx;
		height: 110rpx;
	}

	.bottombtn {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 80rpx;
	}

	.bottombtn image {
		width: 100%;
		height: 100%;
	}
</style>
