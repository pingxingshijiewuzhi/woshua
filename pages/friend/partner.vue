<template>
	<view class="box">
		<view class="border flexs2">
			<image class="border_image" src="../../static/image/btn_h_fanhui@2x.png" mode="" @click="back"></image>
			<view class="border_text">我推荐的代理</view>
			<view class="border_right" @click="todengdai">排行榜</view>
		</view>
		<view class="barner">
			<view class="barner_input">
				<input type="text" placeholder="请输入商户姓名" v-model="searchvalue" @confirm='seachbtn' />
			</view>
			<view class="flexs2 barner_big">
				<view class="flexs1">
					<view class="barner_size">{{data_month}}</view>
					<image class="barner_next" src="../../static/image/icon_h_sanjiao_hui@2x.png" mode="" @click="hidden"></image>
				</view>
				<view class="flexs1 barner_right">
					<view class="barner_size">{{data_months}}</view>
					<image class="barner_next" src="../../static/image/icon_h_sanjiao_hui@2x.png" mode="" @click="hiddens"></image>
				</view>
				<view class='flexs1'>
					<view class="barner_size">{{data_paoxy}}</view>
					<image class="barner_next" src="../../static/image/icon_h_sanjiao_hui@2x.png" mode="" @click="proxyclick"></image>
				</view>
				<view class="" @click="chosepaix">
					<view class=" " v-if="paixu">
						<image class="barner_to" src="../../static/image/icon_sx_shang@2x.png" mode=""></image>
						<image class="barner_to" src="../../static/image/icon_sx_xia@2x.png" mode=""></image>
					</view>
					<view class="" v-else>
						<image class="barner_to" src="../../static/pic/004.png" mode=""></image>
						<image class="barner_to" src="../../static/pic/005.png" mode=""></image>
					</view>
				</view>
			</view>

			<view class="barner_month"  v-show="tohidden">
				<view class="barner_list" :class="{'barnner_active':data_month=='本月' }" @click="choose_btn('本月')">本月</view>
				<view class="barner_list" :class="{'barnner_active':data_month=='上月'}" @click="choose_btn('上月')">上月</view>
				<view class="barner_list" :class="{'barnner_active':data_month=='累计'}" @click="choose_btn('累计')">累计</view>
			</view>
			<view class="barner_month"  v-show="tohiddens">
				<view class="barner_list" :class="{'barnner_active':data_months=='交易额' }" @click="choose_btns('交易额')">交易额</view>
				<view class="barner_list" :class="{'barnner_active':data_months=='商户数'}" @click="choose_btns('商户数')">商户数</view>
			</view>
			<view class="barner_month"  v-show="toproxystatus">
				<view class="barner_list" :class="{'barnner_active':data_paoxy=='代理' }" @click="choose_proxybtn('代理')">代理</view>
				<view class="barner_list" :class="{'barnner_active':data_paoxy=='粉丝'}" @click="choose_proxybtn('粉丝')">粉丝</view>
			</view>
		</view>
		<view class="list_title">看不到</view>
		<view class="big_list ">
			<view class="list flexs2" v-for="(item,index) in mydata" :key="index" @click="tophotos(item.id)">
				<view class="flexs1">
					
					<image class="list_image" :src="imgUrl+item.avatar" mode=""></image>
					<view class="">
						<view class="list_name">{{item.nickname}}</view>
						<view class="list_add">本月新增商户：{{item.shop_num}}</view>
					</view>
				</view>
				<view class="moneybox">
					<view class="list_money"><text class="new_money">{{item.money_count}}</text>元</view>
					<view class="list_month">本月商户交易额</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				paixu: true,
				mydata: '',
				tohidden: false,
				tohiddens: false,
				toproxystatus:false,
				data_month: '本月',
				data_months: "交易额",
				data_paoxy:'代理',
				timetype: '1',
				type: '1',
				// 默认代理请求
				user_type:'2',
				order: '',
				searchvalue: '',
				page: '1',
				limit: '10',
				imgUrl: this.$common.baseUrl,
			}
		},
		onLoad() {
			this.getdata();
		},
		methods: {
			seachbtn(e) {
				console.log(e.detail.value)
				this.searchvalue = e.detail.value
				this.getdata()
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			hidden() {
				this.tohidden = !this.tohidden;
			},
			hiddens() {
				this.tohiddens = !this.tohiddens;
			},
			proxyclick(){
				this.toproxystatus = !this.toproxystatus
			},
			chosepaix() {
				if (this.paixu == true) {
					this.mydata = [];
					this.order = 1
					this.getdata();
				}
				if (this.paixu == false) {
					this.mydata = [];
					this.order = 2
					this.getdata();
				}
				this.paixu = !this.paixu
				console.log(this.order)
			},
			getdata() {
				var obj = {
					timetype: this.timetype,
					type: this.type,
					order: this.order,
					user_type:this.user_type,
					page: this.page,
					limit: this.limit,
					friend_name: this.searchvalue
				}
				this.$common.requests('/api/user/get_my_friends', obj).then(res => {
					if (res.data.code == 1) {
						this.mydata = res.data.data;
						console.log(this.imgUrl+this.mydata[0].avatar)
					} else {
						this.$api.msg(res.data.msg);
					}
					console.log(this.mydata)
				})
			},
			choose_btn(text) {
				this.data_month = text
				if (text == "本月") {
					this.mydata = [];
					this.timetype = 1
					this.getdata();
				}
				if (text == "上月") {
					this.mydata = [];
					this.timetype = 2;
					this.getdata();
				}
				if (text == "累计") {
					this.mydata = [];
					this.timetype = 3
					this.getdata();
				}
				console.log(this.timetype)
				setTimeout(() => {
					this.tohidden = false
				}, 300)
			},
			choose_btns(text) {
				if (text == "交易额") {
					this.type = 1
					this.getdata();
				}
				if (text == "商户数") {
					this.type = 2
					this.getdata();
				}
				this.data_months = text
				setTimeout(() => {
					this.tohiddens = false
				}, 300)
			},
			choose_proxybtn(text){
				if (text == "代理") {
					this.user_type = 2
					this.getdata();
				}
				if (text == "粉丝") {
					this.user_type = 1
					this.getdata();
				}
				this.data_paoxy = text
				setTimeout(() => {
					this.toproxystatus = false
				}, 300)
			},
			todengdai() {
				uni.navigateTo({
					url: "../ranking/ranking"
				})
			},
			tophotos(id) {
				uni.navigateTo({
					url: "../friend/mypatener?id=" + id
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

	/* border */
	.border {
		width: 100%;
		height: 140rpx;
		color: #3D3D3D;
		background-color: #FFFFFF;
		padding: 40rpx 30rpx 0 30rpx;
	}

	.border_image {
		width: 40rpx;
		height: 30rpx;
	}

	.border_text {
		font-size: 32rpx;
		letter-spacing: 8rpx;
		margin-left: 34rpx;
		font-weight: 600;
	}

	.border_right {
		font-size: 30rpx;
	}

	.border_top {
		width: 94%;
		height: 100rpx;
	}

	/* barner */
	.barner {
		width: 100%;
		height: 260rpx;
		background-color: #FFFFFF;
		padding-top: 30rpx;

	}

	.barner_big {
		padding: 60rpx 30rpx;
	}

	.barner_input {
		width: 92%;
		height: 60rpx;
		margin: 0 4%;
		background-color: #E5E5E5;
		border-radius: 50rpx 50rpx;
	}

	.barner_input input {
		height:60rpx;
		padding-left: 46rpx;
		padding-top: 6rpx;
	}

	.barner_size {
		font-size: 30rpx;
		color: #000000;
		margin-right: 16rpx;
	}

	.barner_month {
		width: 100%;
		height: 250rpx;
		background-color: #FFFFFF;
		position: absolute;
		z-index: 100;
	}

	.barner_list {
		width: 100%;
		line-height: 80rpx;
		background-color: #FFFFFF;
		color: #737373;
		text-align: center;
	}

	.barnner_active {
		width: 100%;
		line-height: 80rpx;
		background-color: #5A7EF8;
		color: #FFFFFF;
		text-align: center;
	}

	/* .barner_right {
		margin-left: -130rpx;
	} */

	.list_title {
		width: 100%;
		height: 30rpx;
		line-height: 30rpx;
		color: #F2F2F2;
		background-color: #F2F2F2;
	}

	.list {
		width: 100%;
		height: 170rpx;
		background-color: #FFFFFF;
		padding: 0 10rpx 0 30rpx;
		border-bottom: 1px solid #F3F3F3;
	}

	.list_image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50% 50%;
	}

	.list_name {
		font-size: 32rpx;
		margin-left: 30rpx;
		font-weight: 600;
	}
	.moneybox{
		width:300rpx;
		text-align: right;
	}
	.list_money {
		width: 300rpx;
		height: 60rpx;
		color: #F00706;
	}

	.new_money {
		font-size: 36rpx
	}

	.list_month {
		color: #989898;
	}

	.big_list {
		width: 100%;
		/* border:1rpx solid red; */
		/* min-height:calc(100vh - 400rpx); */
		height: calc(100vh - 400rpx);
		overflow-y: scroll;
	}

	.list_add {
		color: #6A6A6A;
		width: 260rpx;
		margin-left: 30rpx;
		margin-top: 10rpx;
	}

	.barner_next {
		width: 24rpx;
		height: 16rpx;
	}

	.barner_to {
		width: 8rpx;
		height: 30rpx;
		display: inline-block;
		margin-left: 10rpx;
	}

	.barner_tos {
		width: 10rpx;
		height: 30rpx;

		display: inline-block;
	}
	.addfontsize{
		font-size: 28rpx;
	}
</style>
