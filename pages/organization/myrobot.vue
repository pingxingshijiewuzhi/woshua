<template>
	<view class='myrobot'>
		<view class="mytabbar">
			<view class="mytabbar_top flexs2">
				<image class="mytabbar_image" @click="back" src="../../static/image/0000.png" mode=""></image>
				<view class="mytabbar_text">我的机具</view>
				<view class=" mytabbar_right" @click='flowrecode'>流动记录</view>
			</view>
			<view class='searchbox'>
				<image src="../../static/pic/search.png" mode="" class='searchimg'></image>
				<input class='myinput' type="text" placeholder-style='color:#ffffff;font-size:28rpx;letter-spacing:4rpx;'
				 placeholder="请输入机身号">
				<image src="../../static/pic/saoyisao.png" mode="" class='saoyisao'></image>
			</view>
		</view>
		<view class='content_topbox'>
			<view class='activatetabbar'>
				<view class='activate_item' :class="{'avtive':currentIndex == 0}" @click='clickbtn(0)'>未激活(2)</view>
				<view class='activate_item' :class="{'avtive':currentIndex == 1}" @click='clickbtn(1)'>已激活(0)</view>
			</view>
			<view class='topbox_right'>
				<view>
					<image class='mysortimg' src="../../static/pic/up_hui.png" mode=""></image>
					<image class='mysortimg' src="../../static/pic/down_lan.png" mode=""></image>
				</view>
				<image @tap="showModal" data-target="DialogModal1" src="../../static/pic/sort.png" mode=""></image>
			</view>
		</view>
		<view class='bigcontent_box'>
			<view class='orderbox_content'>
				<view class='topbox_left'>
					机身编号
				</view>
				<view>操作</view>
			</view>
			<block v-for='(item,index) in 2' :key='index'>
				<view class='orderbox_content'>
					<view class='topbox_left'>
						<view>21111222222</view>
						<view class='addyellow'>5151</view>
						<!-- <view class='copybox'>复制</view> -->
						<view class='nocopybox'></view>
					</view>
					<view class="right_box">
						<image class='addnum' src="../../static/pic/jia.png" mode=""></image>
						<view class='convertent'>换机</view>
						<!-- <view class='convertent'>解绑</view> -->
					</view>
				</view>
			</block>
		</view>
		<view class='bottom_box'>
			<view class='abbox'>0</view>
			<view class='bottom_box_left'>批量选中</view>
			<view class='bottom_box_right' @click='xiafa'>下发</view>
		</view>

		<!--   @tap="showJiebang" data-target="DialogModal1" -->
		<!-- 那里单击显示这个弹框 -->
		<!--弹框 -->
		<!-- <view  class='masking'  v-show="jieabngmodify"  @click='hideJiebang'></view>
			<view class='bigbox'  v-show="jieabngmodify" :class="jieabngmodify=='DialogModal1'?'show':''">
				<view class="mytitle">提示</view>
				<view class='myentrue'>确认解绑该机具吗？</view>
				<view class="bottombtn flexs1">
					<view class="action_left" @tap="hideJiebang">取消</view>
					<view class="action_right" @tap="hideJiebang">确定</view>
				</view>
			</view> -->

		<!-- 筛选模态框 -->
		<view class='masking' v-show="modalName" @click='hideModal'></view>
		<view class='sortmodify' v-show="modalName" :class="modalName=='DialogModal1'?'show':''">
			<view class='head'>
				<view></view>
				<view class='myaddfont'>筛选</view>
				<view>重置</view>
			</view>
			<view class='content'>
				<view class='jishen'>机身编号区间</view>
				<view class='sortinputview'>
					<input class='sortinput' type="text" placeholder-style='color:#595959;font-size:28rpx;letter-spacing:2rpx;'
					 placeholder="起始机身编号" maxlength="20">
					<image src="../../static/pic/sortsaoyisao.png" mode="" class='sortsaoyisao'></image>
				</view>
				<view class='sortinputview'>
					<input class='sortinput' type="text" placeholder-style='color:#595959;font-size:28rpx;letter-spacing:2rpx;'
					 placeholder="终末机身编号" maxlength="20">
					<image src="../../static/pic/sortsaoyisao.png" mode="" class='sortsaoyisao'></image>
				</view>
				<view class='jishen'>标签</view>
				<view class='markcontent'>
					<view>成长计划</view>
					<view>成长计划</view>
					<view>其他</view>
				</view>
			</view>
			<view class='finishbox' @click='finishbtn'>完成</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalName: null,
				jieabngmodify: null,
				currentIndex: 0
			}
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			clickbtn(index) {
				this.currentIndex = index
			},
			// 流动记录
			flowrecode() {
				uni.navigateTo({
					url: '../flowrecode/flowrecode'
				})
			},
			// 删选模态框
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},

			// 解绑该机具弹框
			showJiebang(e) {
				this.jieabngmodify = e.currentTarget.dataset.target
			},
			hideJiebang(e) {
				this.jieabngmodify = null
			},
			// 筛选完成
			finishbtn() {
				this.modalName = null
			},
			// 下发
			xiafa() {
				uni.navigateTo({
					url: 'xiafa'
				})
			}
		}
	}
</script>

<style>
	.myrobot {
		width: 100vw;
		height: 100vh;
		background-color: #F2F2F2;
		position: relative;
	}

	/* mytabbar */
	.mytabbar {
		width: 100%;
		height: 270rpx;
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

	.searchbox {
		margin: 0 auto;
		width: 690rpx;
		height: 60rpx;
		background-color: #8CA4FA;
		border-radius: 50rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 40rpx;
	}

	.myinput {
		height: 100%;
		margin-left: 20rpx;
		width: 540rpx;
		/* border:1rpx solid red; */
		color: #FFFFFF;
	}

	/* input::-webkit-input-placeholder { color: red;}
	 input:-moz-placeholder { color: red;}
	 input:-ms-input-placeholder { color: red;}​ */
	.searchimg,
	.saoyisao {
		width: 30rpx;
		height: 30rpx;
	}

	.bigcontent_box {
		/* 270rpx  100rpx;  120rpx*/
		height: calc(100vh - 490rpx);
		background-color: #FFFFFF;
		/* border:1rpx solid red; */
	}

	.content_topbox {
		width: 100%;
		padding: 0 30rpx;
		height: 90rpx;
		background-color: #FFFFFF;
		margin-bottom: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.activatetabbar {
		width: 410rpx;
		height: 90rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.activate_item {
		width: 160rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
	}

	.avtive {
		color: #587FF6;
		border-bottom: 1rpx solid #587FF6;
	}

	.orderbox_content {
		background-color: #FFFFFF;
		border: 1rpx solid #E5E5E5;
		height: 90rpx;
		padding: 15rpx 0;
		width: 100%;
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.topbox_left {
		width: 420rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.topbox_right {
		width: 90rpx;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.topbox_right>view {
		/* width:24rpx; */
		width: 34rpx;
		height: 28rpx;
		display: flex;
		justify-content: space-between;
	}

	/* 有换机的样式 */
	.right_box {
		height: 100%;
		width: 180rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.convertent {
		width: 80rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		background-color: #5B7DF8;
		color: #FFFFFF;
		margin-left: 40rpx;
	}

	.mysortimg {
		width: 12rpx;
		height: 28rpx;
	}

	.topbox_right>image {
		width: 24rpx;
		height: 28rpx;
	}

	.addyellow {
		color: #DAAE4F;
	}

	.copybox {
		border: 1rpx solid #E5E5E5;
		color: #9A9A9A;
		width: 80rpx;
		text-align: center;
		height: 32rpx;
		line-height: 32rpx;
	}

	.nocopybox {
		height: 32rpx;
		width: 80rpx;
	}

	.addnum {
		width: 32rpx;
		height: 32rpx;
	}

	.bottom_box {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		display: flex;
		box-shadow: 0rpx 1rpx 2rpx 1rpx rgba(0, 0, 0, 0.3);
	}

	.abbox {
		height: 84rpx;
		line-height: 84rpx;
		text-align: center;
		width: 84rpx;
		background-color: #FFFFFF;
		position: absolute;
		top: -30rpx;
		left: 30rpx;
		border-radius: 50%;
		box-shadow: 0rpx 0rpx 2rpx 1rpx rgba(0, 0, 0, 0.3);
	}

	.bottom_box_left {
		width: 75%;
		height: 100rpx;
		line-height: 100rpx;
		background-color: #FFFFFF;
		color: #989898;
		padding-right: 20rpx;
		text-align: end;
	}

	.bottom_box_right {
		height: 100rpx;
		line-height: 100rpx;
		width: 25%;
		text-align: center;
		background-color: #D4D4D4;
		color: #FFFFFF;
	}

	/* 筛选模态框 */
	.masking {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .3);
	}

	.sortmodify {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		height: 100vh;
		width: 80vw;
		background-color: #FFFFFF;
	}

	.finishbox {
		position: fixed;
		bottom: 0;
		right: 0;
		height: 90rpx;
		width: 80vw;
		line-height: 90rpx;
		color: #FFFFFF;
		text-align: center;
		background-color: #5A7EF8;
	}

	.head {
		height: 130rpx;
		width: 100%;
		background-color: #5A7EF8;
		color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.head>view {
		width: 100rpx;
		text-align: center;
	}

	.myaddfont {
		font-size: 36rpx;
	}

	.content {
		height: calc(100vh - 130rpx);
		background-color: #FFFFFF;
		padding: 0 50rpx;
	}

	.jishen {
		height: 210rpx;
		padding-top: 140rpx;
		padding-bottom: 30rpx;
		line-height: 40rpx;
	}

	.sortinputview {
		width: 100%;
		height: 60rpx;
		display: flex;
		justify-content: space-between;
		background-color: #F2F2F2;
		align-items: center;
		margin-bottom: 30rpx;
	}

	.sortinput {
		padding-left: 30rpx;
		height: 100%;
		width: calc(100% - 60rpx);
		/* border:1rpx solid red; */
	}

	.sortsaoyisao {
		width: 30rpx;
		height: 30rpx;
		margin-right: 30rpx;
	}

	.markcontent {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
	}

	.markcontent>view {
		background-color: #F2F2F2;
		margin-right: 20rpx;
		padding: 10rpx 20rpx;
	}

	/* 解绑改机具 */
	.bigbox {
		width: 690rpx;
		height: 320rpx;
		background-color: #FFFFFF;
		border-radius: 40rpx;
		position: fixed;
		top: 50%;
		left: 50%;
		letter-spacing: 4rpx;
		transform: translate(-50%, -50%);
	}

	.mytitle {
		width: 100%;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		color: #5B7DF8;
		font-size: 30rpx;
	}

	.myentrue {
		height: 90rpx;
		line-height: 90rpx;
		width: 100%;
		text-align: center;
		color: #9A9A9A;
	}

	.bottombtn {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 70rpx;
		border-top: 1rpx solid #E5E5E5;
	}

	.action_left {
		height: 70rpx;
		line-height: 70rpx;
		width: 50%;
		text-align: center;
		border-bottom-left-radius: 40rpx;
	}

	.action_right {
		text-align: center;
		line-height: 70rpx;
		height: 70rpx;
		width: 50%;
		background-color: #FFFFFF;
		color: #5A7EF8;
		border-left: 1rpx solid #E5E5E5;
		border-top: 1rpx solid #E5E5E5;
		border-bottom-right-radius: 40rpx;
	}
</style>
