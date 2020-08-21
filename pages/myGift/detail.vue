<template>
	<view class="box">
		<view class="barder flexs2">
			<view class="ditu_image">
				<image class="ditu" src="../../static/image/0008.png" mode=""></image>
			</view>
			
			<view class="">
				<!-- @click="todizhi" -->
				<view class="flexs1">
					<view class="barder_left">{{datailobj.name}}</view>
					<view class="barder_right">{{datailobj.mobile}}</view>
				</view>
				<view class="barder_last">{{datailobj.address}}</view>
			</view>
			<image class="next" src="" mode=""></image>
		</view>
		<view class="barner ">
			<view class="barner_border flexs1">
				<image class="libao" :src="imgUrl + datailobj.product_image" mode=""></image>
				<view class="border_left">
					<view class="barner_first">{{datailobj.product_name}}</view>
					<view class=" flexs1">
						<view class="border_next">￥{{datailobj.price}}</view>
						<view class="border_num">/{{datailobj.product_norms}}</view>
					</view>
				</view>
				<view class="border_number">X{{datailobj.num}}</view>
			</view>
		</view>
		<!-- 状态 -->
		<view class="time_big_box">
			<view class="time_big_box_l flexs1">
				<view>订单:</view>
				<view :class="{addcolor:datailobj.status == 6}">
					{{datailobj.status_text}}
				</view>
			</view>
			<view class="time_big_box_l flexs1">
				<view>价格:</view>
				<view>
					<text class="price">￥{{datailobj.order_price}}</text><text>/{{datailobj.num}}{{datailobj.product_norms}}</text>
				</view>
			</view>
			<view class="time_big_box_l flexs1">
				<view>付款截止时间：</view>
				<view>{{datailobj.over_time}}</view>
			</view>
			<view class="time_big_box_l flexs1">
				<view>距结束：</view>
				<view class="time_new">
					<block v-if='testMinute | testSecond'>
						<uni-countdown @timeup="timeup"  splitorColor="#D61B30" :show-day="false" :hour="testHour"
						 :minute="testMinute" :second="testSecond" />
					</block>
					<block v-else>
						<view class="uni-countdown">
							<text style="{ borderColor: '#000000', color: '#ffffff', backgroundColor: '#000000' }" class="uni-countdown__number">0</text>
							<text style="{ color: splitorColor }" class="uni-countdown__splitor">{{ true ? ':' : '时' }}</text>
							<text style="{ borderColor: '#000000', color: '#ffffff', backgroundColor: '#000000' }" class="uni-countdown__number">0</text>
							<text style="{ color: splitorColor }" class="uni-countdown__splitor">{{ true ? ':' : '分' }}</text>
							<text style="{ borderColor: '#000000', color: '#ffffff', backgroundColor: '#000000' }" class="uni-countdown__number">0</text>
						</view>
					</block>
				</view>
			</view>
		</view>
		<!-- 订单信息 -->
		<view class="big_box">
			<view class="big_box_l flexs1">
				<view class="dingdan_number">订单编号:{{datailobj.order_num}}</view>
				<view class="fuzhi" @click='copyordernum'>复制</view>
			</view>
			<view class="big_box_l flexs1">
				<view>服务商:</view>
				<view>
					<text class="price">{{datailobj.service}}</text>
				</view>
			</view>
			<view class="big_box_l flexs1">
				<view>提交时间：</view>
				<view>{{datailobj.createtime}}</view>
			</view>
		</view>
		<view class="button flexs1 " v-if="datailobj.status == 1">
			<view class="button_left" @click="goAccount(id)">线下转账</view>
			<view class="button_right" @click="goOrder" data-target="DialogModal">继续支付</view>
		</view>
		<view v-show="datailobj.status == 3" class="buttonshou" @click="shouqueren" v-else data-target="ChooseModal">确认收货</view>
		<view class="cu-modal " :class="modalName=='ChooseModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog">
				<view class="button_color">
					<view class="button_top flexs">确认收货</view>
					<view class="button_middle">你确定收到该商品了吗？</view>
				</view>
				<view class="cu-bar bg-white">
					<view class="button_bottom_left flexs" @tap="hideModal ">取消</view>
					<view class="button_bottom_right flexs" @tap="mysure">确定</view>
				</view>
			</view>
		</view>
		<!-- 模态框1 -->
		<view class="cu-modal" :class="modalName=='DialogModal'?'show':''">
			<view class="cu-dialog">
				<image class="deleat" src="../../static/image/icon_mm_gb@2x.png" mode="" @tap="hideModal"></image>
				<view class="pasword">选择支付方式</view>
				<view class="list flexs2">
					<view class="flexs1">
						<image class="list_image" src="../../static/image/icon_qianbao@2x.png" mode=""></image>
						<view class="pa_l">钱包余额</view>
						<view class='blanceclass'>{{blance}}</view>
					</view>
					<image class="list_yuan" src="../../static/image/0005.png" mode="" v-if='currentIndex==0' @click="hidden(0)"></image>
					<image class="list_yuan" src="../../static/image/0004.png" mode="" v-else @click="hidden(0)"></image>
				</view>
				<view class="list flexs2">
					<view class="flexs1">
						<image class="list_image" src="../../static/image/icon_wxzf@2x.png" mode=""></image>
						<view class="pa_l">微信支付</view>
					</view>
					<image class="list_yuan" src="../../static/image/0005.png" mode="" v-if='currentIndex==1' @click="hidden(1)"></image>
					<image class="list_yuan" src="../../static/image/0004.png" mode="" v-else @click="hidden(1)"></image>
				</view>
			<!-- 	<view class="list flexs2">
					<view class="flexs1">
						<image class="list_image" src="../../static/image/icon_zfb@2x.png" mode=""></image>
						<view class="pa_l">支付宝支付</view>
					</view>
					<image class="list_yuan" src="../../static/image/0005.png" mode="" v-if='currentIndex==2' @click="hidden(2)"></image>
					<image class="list_yuan" src="../../static/image/0004.png" mode="" v-else @click="hidden(2)"></image>
				</view> -->
				<view class=" content flexs1">
					<view class="buttons" @tap="gopay" data-target="DialogModal1">立即付款</view>
				</view>
			</view>
		</view>
		<!-- 支付密码 -->
		<passkeyborad  ref='passkeyborad' :show="show" @close="close" :money='realymoney' @makesure='makesure'  @resetpassword='resetpassword'></passkeyborad>
	</view>

</template>

<script>
	import passkeyborad from '@/components/yzc-paykeyboard/yzc-paykeyboard.vue';
	import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
	export default {
		components: {
			passkeyborad,
			uniCountdown
		},
		data() {
			return {
				// 默认不显示支付密码弹框
				show: false,
				// status: true,
				id: '',
				datailobj: {},
				imgUrl: this.$common.baseUrl,
				modalName: '',
				currentIndex: 0,
				realymoney: '',
				order_id: '',
				password: '',
				
				// 倒计时对应的时间
				testHour: 0,
				testMinute: 0,
				testSecond: 0,
				// 钱包余额
				blance:'',
			}
		},
		onShow() {
			this._getblance()
			this._getdetail()
		},
		onLoad(option) {
			this.id = option.id
			this.order_id = option.id
			this.status = option.status
		},
		methods: {
			// 获取余额
			_getblance(){
				this.$common.requests('/api/user/get_settlement').then(res=>{
					console.log(res.data.data,888)
					this.blance = res.data.data
				})
				
			},
			mysure() {
				var that = this
				this.modalName = null
				let obj = {
					order_id: this.order_id
				}
				this.$common.requests('/api/Giftorder/confirm_order', obj).then(res => {
					if (res.data.code == 1) {
						that.$api.msg(res.data.msg);
					} else {
						that.$api.msg(res.data.msg);
						console.log(res.data.msg)
					}
				})
			},
			// 计时器结束触发事件
			timeup() {
				uni.showToast({
					// title: '时间到'
				})
			},
			// 倒计时时间转换
			backTime(val) {
				// const endSecond = this.recommmedValue(0).stoptime
				// console.log(endSecond)
			
				// 时间戳秒数
			// 	const date = new Date(parseInt(val) * 1000)
				
			// 	const h = date.getHours()
			// 	const m = date.getMinutes()
			// 	const s = date.getSeconds()
			
			// 	this.testHour = h
			// 	this.testMinute = m
			// 	this.testSecond = s
				// console.log(`${h}:${m}:${s}`)
				
				// 单纯结束实际秒数
				// console.log(val)
				let ss = val % 60 
				let hh = parseInt(val / 3600)
				let mm = parseInt(val/60)

				this.testHour = hh
				this.testMinute = mm
				this.testSecond = ss
			},
			shouqueren(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			_getdetail() {
				var that = this
				if(this.id){
					let obj = {
						order_id: this.id
					}
					this.$common.requests('/api/Giftorder/get_order_detail', obj).then(res => {
						
						if (res.data.data.name == null) {
							this.$api.msg('请先选择默认地址');
						}
						console.log(res.data.data)
						if (res.data.code == 1) {
							this.datailobj = res.data.data
							this.realymoney = Number(this.datailobj.price) + Number(this.datailobj.yunfei) + ''
							if(res.data.data.waterDecTime == 0){
								this.testHour = 0
								this.testMinute = 0
								this.testSecond = 0
							}else{
								console.log(res.data.data.waterDecTime,'时间戳')
								that.backTime(res.data.data.waterDecTime)
							}
						} else {
							console.log(res.data.msg)
							this.$api.msg(res.data.msg);
						}
					})
				}
			},
			goAccount(id) {
				if (this.datailobj.name == null) {
					return
				}
				uni.navigateTo({
					url: "account?id="+id
				})
			},
			goOrder(e) {
				if (this.datailobj.name == null) {
					return
				}
				this.modalName = e.currentTarget.dataset.target
				// uni.navigateTo({
				// 	url:"order"
				// })
			},

			todizhi() {
				uni.navigateTo({
					url: "../myIntegral/site"
				})
			},
			hidden(index) {
				console.log(index)
				if (index == this.currentIndex) {
					this.currentIndex = 200
					return
				}
				this.currentIndex = index
			},
			hideModal() {
				this.modalName = null
			},
			gopay() {
				this.modalName = null
				// 如果选择微信和支付宝就不需要判断是否设置支付密码
				if(this.currentIndex == 1){
					let myobj = {
						order_id:this.id,
						// 1=礼包活动订单,2=机构中心采购订单
						order_type:1
					}
					this.$common.requests('/addons/epay/index/experience',myobj).then(res=>{
						console.log(res.data,'后台返回数据')
						// 微信支付
						uni.requestPayment({
							provider: 'wxpay',
							orderInfo: JSON.stringify(res.data), //微信、支付宝订单数据
							success: function (res) {
								console.log('success:' + JSON.stringify(res));
							},
							fail: function (err) {
								console.log('fail:' + JSON.stringify(err));
							}
						});
						
					})
					console.log('微信支付')
					return
				}
				//console.log(11)
				//判断是否设置支付密码
				this.$common.requests('/api/user/judge_pay_password').then(res => {
					console.log(res)
					if (res.data.code == 0 && this.currentIndex == 0) {
						this.$api.msg('请先设置支付密码')
						setTimeout(() => {
							uni.navigateTo({
								url: '../setUp/setPay'
							})
						}, 1000)
					} else {
						this.show = true
					}
				})

			},
			// 关闭支付密码弹框
			close() {
				this.show = false
			},
			// 跳转重置密码
			resetpassword(){
				uni.navigateTo({
					url:'../setUp/resetPay'
				})
			},
			//点击确定支付
			makesure(e) {
				//console.log(e);
				this.password = e;
				var obj = {
					order_id: this.id,
					pay_pwd: this.password
				};

				this.$common.requests('/api/Giftorder/money_pay', obj).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						this.show = false
						this.$api.msg(res.data.msg);
						let choosezhifu = uni.getStorageSync('choosezhifu')
						// 成功跳转礼包收货
						setTimeout(() => {
							if (choosezhifu == 1) {
								uni.navigateTo({
									url: 'myGift?Inv=1'
								})
								// uni.removeStorageSync('choosezhifu')
							}
						}, 1000)
						setTimeout(() => {
							if (choosezhifu == 2) {
								uni.navigateTo({
									url: '../upgrade/upgrade'
								})
								// uni.removeStorageSync('choosezhifu')
							}
						}, 1000)

					} else {
						console.log(res.data.msg)
						this.$api.msg(res.data.msg);
						this.$refs.passkeyborad.resetinit()
					}
				});
			},
			copyordernum() {
				uni.setClipboardData({
					data: this.datailobj.order_num,
					success: () => {
						uni.showToast({
							title: '复制成功'
						})
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import '~@/uni.scss';
	$countdown-height: 48rpx;
	$countdown-width: 52rpx;
	
	/* model */
	.cu-dialog {
		border-radius: 20rpx;
	}

	.button_color {
		width: 680rpx;
		height: 260rpx;
		background-color: #FFFFFF;
	}

	.button_top {
		width: 680rpx;
		line-height: 130rpx;
		color: #3F57AD;
		font-size: 38rpx;
		;
	}

	.button_middle {
		width: 680rpx;
		height: 120rpx;
		display: flex;
		font-size: 30rpx;
		justify-content: center;
		color: #000000;
	}

	.button_bottom_left {
		width: 50%;
		line-height: 88rpx;
		border-top: 1px solid #E1E1E1;
		background-color: #FFFFFF;
	}

	.button_bottom_right {
		width: 50%;
		line-height: 88rpx;
		border-left: 1px solid #E1E1E1;
		border-top: 1px solid #E1E1E1;
		color: #3F57AD;
		background-color: #FFFFFF;
	}

	.box {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.barder {
		width: 100%;
		height: 180rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		padding: 0 30rpx;
	}
	
	.time_big_box{
		width: 100%;
		height: 25%;
		margin-top: 30rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
	}
	.big_box {
		width: 100%;
		height: 19%;
		margin-top: 30rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
	}

	.time_big_box_l{
		width: 96%;
		height: 25%;
		margin: 0 auto;
		letter-spacing: 6rpx;
	}
	.big_box_l {
		width: 96%;
		height: 34%;
		margin: 0 auto;
		letter-spacing: 6rpx;
	}

	.price {
		font-size: 36rpx;
		color: #FE1817;
		font-weight: 500;
	}

	.dingdan_number {
		width: 91%;
	}

	.fuzhi {
		width: 80rpx;
		color: #5B7DEF;
		background-color: #F2F3F0;
		text-align: center;
	}

	/* 弹框 */
	.deleat {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		right: 20rpx;
		top: 20rpx;
	}

	.pasword {
		font-size: 32rpx;
		margin: 30rpx 0 20rpx 0;
	}

	.pa_l {
		padding-left: 40rpx;
		font-size: 32rpx;
	}

	.list {
		width: 100%;
		height: 100rpx;
		padding: 0 20rpx;
	}

	.list_image {
		width: 40rpx;
		height: 40rpx;
	}

	.list_yuan {
		width: 40rpx;
		height: 40rpx;
	}

	.box_list {
		width: 80rpx;
		height: 80rpx;
		border: solid 1rpx #E5E5E5;
	}

	.text_s {
		font-size: 32rpx;
		color: #656565;
	}

	.box_list input {
		margin-top: 16rpx;
		font-size: 34rpx;
	}

	.buttons {
		width: 94%;
		line-height: 80rpx;
		text-align: center;
		background-color: #5A7EF8;
		color: #FFFFFF;
		margin: 100rpx 3% 0 3%;
		font-size: 34rpx;
		margin: 20rpx 30rpx 50rpx 30rpx;
	}
	.blanceclass{
		width:200rpx;
		height:42rpx;
		line-height: 42rpx;
	}
	/* end */
	.ditu {
		width: 40rpx;
		height:50rpx;
		
	}
	.ditu_image{
		width: 50rpx;
		height: 55rpx;
		margin-right: 30rpx;
	}
	.next {
		width: 26rpx;
		height: 46rpx;
	}

	.border_next {
		font-size: 46rpx;
		color: #FE1817;
		font-weight: 500;
	}

	.border_num {
		letter-spacing: 4rpx;
	}

	.barner {
		width: 100%;
		height: 260rpx;
		background-color: #FFFFFF;
		margin-top: 30rpx;
		padding: 0 30rpx;
		position: relative;
	}

	.barner_border {
		width: 90%;
		margin: 0;
		height: 260rpx
	}

	.libao {
		width: 180rpx;
		height: 170rpx;
	}

	.text {
		width: 100%;
		line-height: 130rpx;
		background-color: #FFFFFF;
		padding: 0 30rpx;
	}

	.text_border {
		width: 90%;
		margin: 0 5%;
		height: 130rpx;
		letter-spacing: 4rpx;
	}

	.barner_first {
		width: 380rpx;
		height: 130rpx;
		font-size: 40rpx;

	}

	.barder_left {
		font-size: 32rpx;
		font-weight: 600;
		margin-right: 40rpx;
		color: #363636;
		letter-spacing: 6rpx;
	}

	.barder_right {
		font-size: 32rpx;
		font-weight: 600;
		color: #363636;
		letter-spacing: 6rpx;
		margin-top: 8rpx;
	}

	.barder_last {
		
		max-height: 120rpx;
		overflow: hidden;
		word-break: break-all;
		/* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;
		/* 超出部分省略号 */
		display: -webkit-box;
		/** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		/** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 3;
		font-size: 30rpx;
		margin-top: 10rpx;
		color: #5E5E5E;
	}

	.border_left {
		margin-left: 30rpx;
	}

	.border_number {
		width: 128rpx;
		line-height: 120rpx;
		position: absolute;
		bottom: 10rpx;
		right: 30rpx;
	}

	.mt {
		margin-top: 30rpx;
		border: none;
	}

	.none {
		border: none;
	}

	.button {
		width: 100%;
		line-height: 120rpx;
		color: #FFFFFF;
		text-align: center;
		position: absolute;
		bottom: 0;
		font-size: 32rpx;
	}

	.button_left {
		width: 50%;
		height: 120rpx;
		background-color: #FFFFFF;
		color: #333333;
	}

	.button_right {
		width: 50%;
		height: 120rpx;
		background-color: #5880FA;
	}

	.buttonshou {
		width: 100%;
		line-height: 120rpx;
		color: #FFFFFF;
		text-align: center;
		position: absolute;
		bottom: 0;
		font-size: 32rpx;
		background-color: #5880FA;
		color: #FFFFFF;
	}
	
	/* 倒计时样式 */
	.time_new{
		width: 210rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
	}
	.time_new .r_hour,
	.r_minute,
	.r_second {
		height: 40rpx;
		width: 40rpx;
		margin: 0 5rpx;
		background-color: red;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	
	}
	
	.time_new .r_t {
		color: red;
		font-size: 30rpx;
		font-weight: 700;
	}
	
	
	
	
	.uni-countdown {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: flex-start;
		padding: 2rpx 0;
	}
	
	.uni-countdown__splitor {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		line-height: $countdown-height;
		padding: 5rpx;
		font-size: $uni-font-size-sm;
	}
	
	.uni-countdown__number {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		width: $countdown-width;
		height: $countdown-height;
		line-height: $countdown-height;
		margin: 5rpx;
		color:#FFFFFF;
		background-color: #000000;
		text-align: center;
		font-size: 24rpx;
	}
	
	// 红色样式
	.addcolor{
		// font-weight: 500;
		font-weight: bold;
		color: red;
	}
</style>
