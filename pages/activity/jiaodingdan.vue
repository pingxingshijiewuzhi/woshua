<template>
	<view class="box">
		<view class="barder flexs2" @click="todizhi">
			<image class="ditu" src="../../static/image/0008.png" mode=""></image>
			<view v-if="address.length == 0"  >
				暂无地址
			</view>
			<view v-else>
				<view class=" border_left flexs1">
					<view class="barder_left">{{address.name}}</view>
					<view class="barder_right">{{address.mobile}}</view>
				</view>
				<view class="barder_last">{{address.address}}</view>
			</view>
			<image class="next" src="../../static/image/btn_psdz_xyb@2x.png" mode=""></image>
		</view>
		<view class="barner ">
			<view class="barner_border flexs1">
				<image class="libao" :src="$common.baseUrl + product.image" mode=""></image>
				<view class="border_left">
					<view class="barner_first">{{product.name}}</view>
					<view class='adjust'>
						<view class="adjust_left flexs1">
						<!-- 	<view class="border_next">￥{{product.integral}}</view>
							<view class="border_num">/{{product.unit}}</view> -->
							<view class="border_next">￥{{product.price}}</view>
							<view class="border_num">/{{product.norms}}</view>
						</view>
						<view class="border_number">X{{num}}</view>
					</view>
					
					<!-- <view class=" flexs1">
						<view class="border_next">￥{{product.price}}</view>
						<view class="border_num">/{{product.norms}}</view>
					</view> -->
				</view>
				<!-- <view class="border_number">X{{num}}</view> -->
				
			</view>
		</view>
		<view class="text">
			<view class="text_border flexs2">
				<view class="text_s">数量</view>
				<view class="text_s"><uni-number-box :min="minnum" :value="num" @change="bindChange"></uni-number-box></view>
			</view>
		</view>
		<view class="text">
			<view class="text_border flexs2">
				<view class="text_s">兑换对象</view>
				<view class="text_s">总部</view>
			</view>
		</view>
		<view class="text">
			<view class="text_border none flexs2">
				<view class="text_s">运费</view>
				<view class="text_s" v-show="kuaidi != 0">{{kuaidi}}</view>
				<view class="text_s" v-show="kuaidi == 0">包邮</view>
			</view>
		</view>
		<view class="button flexs1">
			<view class="button_left">合计:￥{{pricetruely}}</view>
			<view class="button_right" @tap="tijiao" data-target="DialogModal">提交</view>
		</view>
		<!-- 模态框2 -->
		<!-- 	<view class="cu-modal" :class="modalName1=='DialogModal1'?'show':''">
			<view class="cu-dialog">
					<image class="deleat"  src="../../static/image/icon_mm_gb@2x.png" mode="" @tap="fukuan"></image>
					<view class="pasword">输入支付密码</view>
					<view class=" list flexs3">
						<view class="box_list"><input type="pasword" placeholder="" /></view>
						<view class="box_list"><input type="pasword" placeholder="" /></view>
						<view class="box_list"><input type="pasword" placeholder="" /></view>
						<view class="box_list"><input type="pasword" placeholder="" /></view>
						<view class="box_list"><input type="pasword" placeholder="" /></view>
						<view class="box_list"><input type="pasword" placeholder="" /></view>
					</view>
					<view class="  flexs1">
					 <view class="buttons" @tap="fukuan">确认支付 </view>
					</view>
			</view>
		</view> -->

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
				<!-- <view class="list flexs2">
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
		<view class="contents" v-show="topasword">
			<view class="login">
				<view class="l_top" style="margin-bottom:100upx;">
					<view class="l_text">请输入6位支付密码，注意不要重复或连续数字</view>
				</view>
				<view class="l_top">
					<view class="mima">
						<view class="item">
							<view v-if="len<=0" :class="{line:show}"></view>
							<view v-if="len>=1" class="dot"></view>
						</view>
						<view class="item">
							<view v-if="len==1" :class="{line:show}"></view>
							<view v-if="len>=2" class="dot"></view>
						</view>
						<view class="item">
							<view v-if="len==2" :class="{line:show}"></view>
							<view v-if="len>=3" class="dot"></view>
						</view>
						<view class="item">
							<view v-if="len==3" :class="{line:show}"></view>
							<view v-if="len>=4" class="dot"></view>
						</view>
						<view class="item">
							<view v-if="len==4" :class="{line:show}"></view>
							<view v-if="len>=5" class="dot"></view>
						</view>
						<view class="item">
							<view v-if="len==5" :class="{line:show}"></view>
							<view v-if="len>=6" class="dot"></view>
						</view>
						<view v-if="len>5" class="dot">{{numlength}}</view>
						<input class="trade_pwd" disabled="disabled" maxlength="6" id="targetInput" @focus="focus1" @blur="blur1" type="number"
						 v-model="trade_pwd" />
					</view>
				</view>
			</view>
			<view class="keypan">
				<view class="titles">
					<span @click="back()">取消</span>
					<span @click='setpwd'>确认</span>
				</view>
				<view class="pan_num_key" :class="[items.checked?'pan_num_checked':'pan_num_key']" v-for="(items,index) in boardlists"
				 :key="index" @click="writepwd(items.id)">{{items.con}}</view>
			</view>
		</view>
		<!-- 支付密码 -->
		<passkeyborad ref='passkeyborad' :show="show" @close="close" :money='realymoney' @makesure='makesure' @resetpassword='resetpassword'></passkeyborad>
	</view>
</template>

<script>
	import passkeyborad from '@/components/yzc-paykeyboard/yzc-paykeyboard.vue';
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue";
	import {
		mapGetters,
		mapActions
	} from 'vuex';

	export default {
		computed: {
			...mapGetters(['statusBarHeight'])
			
		},
		components: {
			passkeyborad,
			uniNumberBox
		},
		data() {
			return {
				// 钱包余额
				blance:'',
				num:1,//购买数量
				minnum:1,//最小购买数量
				topasword: false,
				trade_pwd: '',
				focus: true,
				show: false,
				numarr: [],
				d_time: 10,
				realymoney: '',
				nextsteep: false,
				tel: 0,
				numlength: "",
				gopen: false,
				isactive: true,
				resgetcode: false,
				boardlists: [{
						id: 1,
						con: 1,
						checked: false
					}, {
						id: 2,
						con: 2,
						checked: false
					}, {
						id: 3,
						con: 3,
						checked: false
					}, {
						id: 4,
						con: 4,
						checked: false
					}, {
						id: 5,
						con: 5,
						checked: false
					}, {
						id: 6,
						con: 6,
						checked: false
					}, {
						id: 7,
						con: 7,
						checked: false
					}, {
						id: 8,
						con: 8,
						checked: false
					}, {
						id: 9,
						con: 9,
						checked: false
					}, {
						id: 10,
						con: "",
						checked: false
					}, {
						id: 11,
						con: 0,
						checked: false
					},
					{
						id: 12,
						con: "x",
						checked: false
					},

				],
				modalName: null,
				modalName1: null,
				currentIndex: 0,

				address: {},
				product: {},
				// 快递金额
				kuaidi: '',
				// 真实付费
				pricetruely: 0,
				area_id: '',
				id: '',
				
				myorderid:''
			}
		},
		onLoad(option) {
			// this.id = option.id
			this.id = option.id ? option.id : '';
			this.num = option.number ? Number(option.number) :1;
			this.minnum = option.number ? Number(option.number) :1;
			this._getorderdetail()
		},
		onShow() {
			this._getblance()
			// 每日默认真实价格为空
			this.pricetruely = 0

			if (uni.getStorageSync('area_id')) {
				this.area_id = uni.getStorageSync('area_id');
				this.address.id = uni.getStorageSync('area_id');
				this._getorderdetail()
				uni.removeStorage({
					key: 'area_id'
				});
			}else{
				this._getorderdetail()
			}
		},
		// onBackPress(e) {
		// 	if (e.from == 'backbutton') {
		// 		uni.switchTab({
		// 			url: '../index/index'
		// 		})
		// 		return true
		// 	}
		// 	if (e.from == 'navigateBack') {
		// 		uni.switchTab()({
		// 			url: '../index/index'
		// 		})
		// 		return true
		// 	}
		// },
		computed: {
			len: function() {
				if (this.trade_pwd.length == 6) {
					// 第一次进来可以点击的
				}
				return this.trade_pwd.length
			}
		},
		methods: {
			// 获取余额
			_getblance(){
				this.$common.requests('/api/user/get_settlement').then(res=>{
					console.log(res.data.data,888)
					this.blance = res.data.data
				})
				
			},
			bindChange(num){
				//数量变化事件
				this.num = num;
				if(this.address.id !== undefined){
				var obj = {
					address_id:this.address.id,//收货地址id
					product_id:this.product.id,//商品id
					num:num,//数量
				}
				this.$common.requests('/api/Giftorder/get_yunfei',obj).then(res=>{
					if(res.data.code == 1){
						this.kuaidi = res.data.data;
					}else{
						//获取运费失败
						this.kuaidi = 0;
					}
					this.pricetruely = num * this.product.price + this.kuaidi;
				});	
				}
			},
			_getorderdetail() {
				var that = this
				let obj = {
					product_id: this.id,
					address_id: this.area_id,
					num:this.num,
				}
				this.$common.requests('/api/Giftorder/set_order', obj).then(res => {
					if (res.data.data.address.name == '') {
						this.$api.msg('请先选择默认地址');
					}
					if (res.data.code == 1) {
						console.log(res.data.data,66666)
						this.address = res.data.data.address
						this.product = res.data.data.product
						this.kuaidi = res.data.data.yunfei
						this.pricetruely  = res.data.data.product_count
						// 字符串截取  slice不改变原来字符串，返回截取内容
						// let aaa = this.product.price.slice(-3)
						// console.log(this.product.price)
						// console.log(aaa)

						// subdtring和substr才是字符串方法
						// let aaa = this.product.price.substring(0,this.product.price.length-3)
					} else {
						this.$api.msg(res.data.msg);
					}
				})
			},
			todizhi() {
				uni.navigateTo({
					url: "../myIntegral/site?is_check=" + true
				})
			},
			// 这里提交订单不做支付类型选择
			// this.modalName = e.currentTarget.dataset.target
			// 跳转订单页面
			tijiao(e) {
				var that = this
				if (this.address.name == '') {
					this.$api.msg('请先选择默认地址');
					return
				}
				let choosezhifu = uni.getStorageSync('choosezhifu')
				if (choosezhifu == 2) {
					this.modalName = e.currentTarget.dataset.target
					let myobj = {
						address_id: this.address.id,
						product_id: this.product.id,
						num:this.num,
					}
					this.$common.requests('/api/Giftorder/add_order', myobj).then(res => {
						if (res.data.code == 1) {
							that.myorderid = res.data.data
							// console.log(res.data.data)
						} else {
							this.$api.msg(res.data.msg);
						}
					})
					return
				}
				let myobj = {
					address_id: this.address.id,
					product_id: this.product.id,
					num:this.num,
				}
				this.$common.requests('/api/Giftorder/add_order', myobj).then(res => {
					if (res.data.code == 1) {
						uni.navigateTo({
							url: '../myGift/myGift?Inv=0'
						})
					} else {
						this.$api.msg(res.data.msg);
					}
				})
			},
			close() {
				this.show = false
			},
			//点击确定支付
			makesure(e) {
				var obj = {
					order_id: this.myorderid,
					pay_pwd: e
				};

				this.$common.requests('/api/Giftorder/money_pay', obj).then(res => {
					console.log(res);
					if (res.data.code == 1) {
						this.show = false
						this.$refs.passkeyborad.resetinit()
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
						// 支付密码错误,重置输入支付密码
						console.log(res.data.msg)
						this.$api.msg(res.data.msg);
						
						this.$refs.passkeyborad.resetinit()
						
					}
				});
			},
			// 模态框1确认
			hideModal(e) {
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
				
				//判断是否设置支付密码
				var obj = {}
				this.$common.requests('/api/user/judge_pay_password', obj).then(res => {
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
					// 微信支付，这里改调用支付，不需要判断设置支付密码没
					// if (res.data.code == 0 && this.currentIndex == 1) {
					// 	this.$api.msg('请先设置支付密码')
					// 	setTimeout(() => {
					// 		uni.navigateTo({
					// 			url: '../setUp/setPay'
					// 		})
					// 	}, 1000)
					// } else {
					// 	this.show = true
					// }
					// 支付宝支付，这里改调用支付，不需要判断设置支付密码没
					// if (res.data.code == 0 && this.currentIndex == 2) {
					// 	this.$api.msg('请先设置支付密码')
					// 	setTimeout(() => {
					// 		uni.navigateTo({
					// 			url: '../setUp/setPay'
					// 		})
					// 	}, 1000)
					// } else {
					// 	this.show = true
					// }
				})

			},
			hidden(index) {
				if (index == this.currentIndex) {
					this.currentIndex = 200
					return
				}
				this.currentIndex = index
			},
			writepwd(num) {
				if (num == 12) {
					this.close();
					return;
				}
				if (num == 10) {
					return;
				}
				if (num == 11) {
					num = 0;
					this.boardlists[10].checked = true;
				} else {
					this.boardlists[num - 1].checked = true;
				}
				this.numarr.push(num);
				if (this.numarr.length > 6) {
					return
				}
				var that = this;
				setTimeout(function() {
					for (var i = 0; i < that.boardlists.length; i++) {
						that.boardlists[i].checked = false;
					}
				}, 200)
				this.trade_pwd = this.numarr.join("");


			},
			//密码框
			back() {
				uni.navigateBack();
			},
			blur1() {
				this.show = false
			},
			focus1() {
				this.show = true
			},

			// 确认执行的方法
			setpwd() {
				if (this.trade_pwd.length < 6) {
					console.log('密码长度不能少于6位');
					return;
				}
				// 密码长度为6位以后执行方法
				console.log(this.trade_pwd);

			},
			// 跳转重置密码
			resetpassword(){
				uni.navigateTo({
					url:'../setUp/resetPay'
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
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

	.ditu {
		width: 42rpx;
		height: 56rpx;
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
	.next {
		width: 26rpx;
		height: 46rpx;
	}

	.border_next {
		font-size: 38rpx;
		color: #DE0E0B;
		font-weight: 500;
	}

	.border_num {
		letter-spacing: 4rpx;
	}

	.barner {
		width: 100%;
		height: 260rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		padding: 0 20rpx;
		position: relative;
	}

	.barner_border {
		width: 92%;
		margin: 0 4%;
		height: 260rpx;
		border-bottom: solid 1rpx #E5E5E5;
		position: relative;
	}

	.libao {
		width: 180rpx;
		height: 180rpx;
	}

	.text {
		width: 100%;
		line-height: 130rpx;
		background-color: #FFFFFF;
		padding: 0 30rpx;
	}

	.text_border {
		width: 92%;
		margin: 0 4%;
		height: 130rpx;
		border-bottom: solid 1rpx #E5E5E5;
		letter-spacing: 4rpx;
	}

	.barner_first {
		width: 380rpx;
		height: 130rpx;
		font-size: 34rpx;

	}

	.barder_left {
		font-size: 32rpx;
		font-weight: 600;
		letter-spacing: 6rpx;
		color: #363636;
		position: absolute;
		left: 130rpx;
		top: 60rpx;
	}

	.barder_right {
		font-size: 34rpx;
		font-weight: 600;
		color: #363636;
		letter-spacing: 6rpx;
		position: absolute;
		left: 310rpx;
		top: 64rpx;
	}

	.barder_last {
		width: 71%;
		height: 80rpx;
		line-height: 40rpx;
		overflow: hidden;
		word-break: break-all;
		/* break-all(允许在单词内换行。) */
		text-overflow: ellipsis;
		/* 超出部分省略号 */
		display: -webkit-box;
		/** 对象作为伸缩盒子模型显示 **/
		-webkit-box-orient: vertical;
		/** 设置或检索伸缩盒对象的子元素的排列方式 **/
		-webkit-line-clamp: 2;
		/** 显示的行数 **/
		
		font-size: 30rpx;
		color: #5E5E5E;
		position: absolute;
		left: 130rpx;
		margin-top: 10rpx;
	}

	.border_left {
		margin-left: 30rpx;
		width: 440rpx;
	}
	.adjust{
		// border:1rpx solid red;
		width: 100%;
		height:auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.adjust_left{
		width:400rpx;
		height:52rpx;
		// border:1rpx solid blue;
	}
	// .border_number {
	// 	width: 60rpx;
	// 	line-height: 120rpx;
	// 	position: absolute;
	// 	bottom: 10rpx;
	// 	right: 30rpx;
	// }

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
		width: 70%;
		height: 120rpx;
		background-color: #FFFFFF;
		color: #D12D3E;
		letter-spacing: 4rpx;
		font-size: 34rpx;
		font-weight: 500;
	}

	.button_right {
		width: 30%;
		height: 120rpx;
		background-color: #5880FA;
		letter-spacing: 4rpx;
	}

	/* 支付 */
	.contents {
		width: 100%;
		font-size: 28upx;
		background: #fff;
		color: #555;
		height: 100vh;
		font-weight: 400;
		position: absolute;
		top: 0;
		z-index: 111;

		.keypan {
			width: 100%;
			height: 500upx;
			position: fixed;
			left: 0;
			bottom: 0;
			background: #E6E6E6;

			.titles {
				width: 90%;
				height: 80upx;
				background: #E6E6E6;
				display: flex;
				justify-content: space-between;
				line-height: 80upx;
				padding: 0 5%;
				font-size: 32upx;
				color: #292824;

				span {
					width: 100upx;
					height: 70upx;
					display: inline-block;
					padding-left: 30upx;
				}

			}

			.pan_num_key {
				width: 30%;
				height: 80upx;
				float: Left;
				margin-left: 2.1%;
				margin-top: 2.1%;
				text-align: center;
				background: #fff;
				font-size: 30upx;
				border-radius: 10upx;
				font-size: 35upx;
				line-height: 60upx;
				box-shadow: 0 2upx 5upx rgba(0, 0, 0, 0.5);

			}

			.pan_num_checked {
				width: 30%;
				height: 80upx;
				float: Left;
				margin-left: 2.1%;
				margin-top: 2.1%;
				text-align: center;
				font-size: 30upx;
				border-radius: 10upx;
				font-size: 35upx;
				line-height: 60upx;
				box-shadow: 0 2upx 5upx rgba(0, 0, 0, 0.5);
				animation: checked_bg 0.08s ease;
			}
		}

		.navigation_bar {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding-top: 60upx;

			.back-icon {
				width: 18upx;
				height: 34upx;
			}
		}

		.login {
			width: 100%;
			height: 300upx;

			.l_top {
				width: 700upx;
				height: 200upx;
				margin: 0 auto;
				position: relative;

				.l_text {
					width: 445upx;
					height: 69upx;
					font-size: 28upx;
					text-align: center;
					margin: auto;
					top: 100upx;
					position: relative;

				}

				.lt {
					margin-top: -20upx;
					font-size: 25upx;
					color: #555
				}
			}
		}

		.title {
			color: #616161;
			text-align: center;
			font-size: 30upx;
			margin-bottom: 34upx;
		}

		.mima {

			flex-direction: row;
			width: 680upx;
			height: 78upx;
			margin: 0 auto;
			position: relative;

			.item {
				width: 92upx;
				height: 100%;
				box-sizing: border-box;
				display: flex;
				float: left;
				align-items: center;
				justify-content: center;
				border-bottom: 1upx solid #E5E5E5;
				margin-left: 20upx;

				.line {
					width: 2upx;
					height: 40upx;
					background: #979797;
					animation: shan 1s ease infinite;
				}

				.dot {
					width: 20upx;
					height: 20upx;
					border-radius: 20upx;
					background: black;
				}
			}

			.trade_pwd {
				position: absolute;
				height: 78upx !important;
				width: 480upx;
				opacity: 0;
			}
		}
	}

	@keyframes shan {
		from {
			opacity: 1;
		}

		to {
			opacity: 0;
		}
	}

	@keyframes checked_bg {
		0% {
			background: #fff
		}

		50% {
			background: #D3D1E2
		}

		100% {
			background: #fff
		}
	}
</style>
