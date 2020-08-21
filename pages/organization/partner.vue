<template>
	<view class='xiafa'>
		<view class="mytabbar">
			<view class="mytabbar_top flexs2">
				<image class="mytabbar_image" @click="back" src="../../static/image/btn_h_fanhui@2x.png" mode=""></image>
				<view class="mytabbar_text">选择代理</view>
				<view class=" mytabbar_right"></view>
			</view>
		</view>
		<view class="content">
			<view class='searchbox'>
				<input type="text" class='myinput' v-model="search" placeholder="代理姓名或手机号"  confirm-type='search'
				@confirm='searchbtn' placeholder-style='color:#595959;letter-spacing:2rpx;' />
			</view>
			<block v-for='(item,index) in partnere' :key='index'>
				<view class='head' @click='choosepartner(item.id,item.son)'>
					<view>{{item.son}}</view>
					<image class="next_img" src="../../static/pic/btn_psdz_xyb@2x.png"></image>
				</view>

			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 获取代理人列表
				partnere: [],

				search: '',
				page: 1,
				limit: 10,
				liseze:0
			}
		},
		onLoad() {
			this._gethehuo('')
		},
		onReachBottom() {
			// console.log(222)
			if(this.liseze != 0){
				this.page++
				this._gethehuo('')
			}
		},
		methods: {
			_gethehuo(mobile) {
				let obj = {
					page: this.page,
					limit: this.limit,
					mobile:mobile
				}
				this.$common.requests('/api/shops/get_son_list', obj).then(res => {
					if (res.data.code == 1) {
						this.liseze = res.data.data.length
						console.log(res.data.data)
						if(this.page == 1){
							this.partnere = res.data.data
						}else{
							this.partnere = this.partnere.concat(res.data.data)
							console.log(this.partnere,666666)
						}
					} else {
						this.$api.msg(res.data.msg);
					}
				});

			},
			searchbtn(e){
				console.log(e.detail.value)
				console.log(this.search)
				this._gethehuo(e.detail.value)
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 选择代理人
			choosepartner(id, partnerson) {
				let pages = getCurrentPages();
				let noePages = pages[pages.length - 1]
				let prevPage = pages[pages.length - 2]
				console.log(prevPage)
				prevPage.$vm.choosepartner = id
				prevPage.$vm.choosepartnervalue = partnerson
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style scoped>
	.xiafa {
		width: 100vw;
		/* height: 100vh; */
		background-color: #F2F2F2;
	}

	/* mytabbar */
	.mytabbar {
		width: 100%;
		height: 120rpx;
		/* background-color:#5A7EF8; */
		background-color: #FFFFFF;
		padding: 30rpx 20rpx;
	}

	.mytabbar_image {
		width: 40rpx;
		height: 34rpx;
	}

	.mytabbar_text {
		font-size: 38rpx;
	}

	.mytabbar_right {
		font-size: 28rpx;
	}

	.mytabbar_top {
		width: 100%;
		height: 100rpx;
	}

	.content {
		/* height: calc(100vh - 120rpx); */
		background-color: #F2F2F2;
		width: 100%;
	}

	.searchbox {
		height: 130rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
	}

	.myinput {
		width: 700rpx;
		height: 60rpx;
		padding: 0 30rpx;
		background-color: #E5E5E5;
		border-radius: 30rpx;
	}

	.head {
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 0 30rpx;
		background-color: #FFFFFF;
		margin-top: 30rpx;
	}

	.head>view {
		width: 420rpx;
	}

	.next_img {
		width: 14rpx;
		height: 22rpx
	}

	.uni-input-placeholder {
		font-size: 28rpx;
	}
</style>
