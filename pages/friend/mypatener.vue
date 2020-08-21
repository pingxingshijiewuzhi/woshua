<template>
	<view class="box">
		<!-- border -->
		<view class="border flexs2">
			<view class="flexs1">
				<!-- <image class="border_toux" src="../../static/image/img_wdsh_toxiang@2x.png" mode=""></image> -->
				<image class="border_toux" :src="imgUrl+infodata.avatar" mode=""></image>
				<view class="border_name">{{infodata.nickname}}</view>
			</view>
			<view class="">
				<image class="border_phone mr" src="../../static/image/icon_shxq_h_dh@2x.png" @click='opencall' mode=""></image>
				<image class="border_phone" src="../../static/image/icon_shxq_h_dx@2x.png" mode=""></image>
			</view>
		</view>
		<view class="bgc"></view>
		<!-- next -->
		<view class="tabar_lefts tabar_bgc flexs1">
			<view class="tabar_start ">
				<view class="start_l">{{infodata.month_shopnum}}</view>
				<view class="">新增商户(户)</view>
			</view>
			<view class="tabar_border"></view>
			<view class="tabar_start ">
				<view class="start_l">{{infodata.shop_num}}</view>
				<view class="start_r">累计商户(户)</view>
			</view>
		</view>
		<!-- pattern -->
		<view class="pattern ">
			<view class="pattern_top flexs2">
				<view class="pattern_xinz">新增商户(户)</view>
				<view class=" flexs1">
					<view @click='clickbtn(1)' class='partten_duan flexs' :class="{'partten_long':currentIndex==1}">7日</view>
					<view @click='clickbtn(2)' class='partten_duan flexs' :class="{'partten_long':currentIndex==2}">半年</view>
				</view>
			</view>
			<!-- 折线图 -->
			<view class="linechartcontent">
				<!-- #ifdef APP-PLUS || H5 -->
				<view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" id="echarts" class="echarts"></view>
				<!-- #endif -->
				<!-- #ifndef APP-PLUS || H5 -->
				<view>非 APP、H5 环境不支持</view>
				<!-- #endif -->
			</view>
		</view>
		<view class='ecahrtnext'>
			<view class='especilly'>
				<view class='especillytitle'>本月累计商户交易额</view>
				<view class='especillynum'>{{infodata.month_money}}</view>
			</view>
			<view class="tabar_lefts tabar_bgc flexs1">
				<view class="tabar_start ">
					<view class="start_l">{{infodata.slzf_month}}</view>
					<view class="">本月{{infodata.type_type}}商户交易额(元)</view>
				</view>
				<view class="tabar_border"></view>
				<view class="tabar_start ">
					<view class="start_l">{{infodata.slzf_count}}</view>
					<view class="start_r">累计{{infodata.type_type}}商户交易额(元)</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 1,
				option: {
					title: '',
					grid: [{
						top: 50,
						show: true,
						backgroundColor: 'transparent'
					}],
					legend: [{
						// orient:方向
						//gaps 间隔
						// orient:'vertical',
						// orient:'horizontal',
						// itemGap:100,
						// data: ['L曲线','R曲线']
					}],
					dataZoom: [{
						type: 'inside', //这个 dataZoom 组件是 inside 型 dataZoom 组件（能在坐标系内进行拖动，以及用滚轮（或移动触屏上的两指滑动）进行缩放）
						xAxisIndex: 0, //控制x轴
						// 自己为啥设置数据起始范围
						start: 0,
						end: 100
					}, ],
					xAxis: [{
							type: 'category',
							// 不能让整个X轴消失
							// show:false,

							axisLabel: {
								interval: 0
							},
							boundaryGap: false,
							gridIndex: 0,
							axisLine: {
								show: false,
								// onZero:true
							},
							axisTick: {
								inside: false,
								length: 0,
								lineStyle: {

								}
							// show:false
							},
						},
						// 可以设置一个gird有二个X轴显示
						// {type:'category',position:'top',name:'LA',boundaryGap:false,offset:30}
					],
					yAxis: [{
						type: 'value',
						gridIndex: 0,
						show: true,
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						}
					}, ],
					dataset: {
						source: [
							// ["衬衫",5,15],
							// ["羊毛衫",20,20],
							// ["雪纺衫",36,32],
							// ["裤子",10,20],
							// ["高跟鞋",10,23],
							// ["袜子",20,32]
						]
					},
					series: [{
							type: 'line',
							color: ['#3F7BE9'],
							// name: 'L曲线',
							xAxisIndex: 0,
							yAxisIndex: 0,
							encode: {
								x: 0,
								y: 1
							}
						},
						// {
						// 	type:'line',
						// 	color:['#E41620'],
						// 	name: 'R曲线',
						// 	xAxisIndex:0,
						// 	yAxisIndex:0,
						// 	encode:{x:0,y:2}
						// },
					]
				},
				// 接收代理id
				id: '',
				imgUrl: this.$common.baseUrl,
				infodata: {},
			}
		},
		onLoad(option) {
			this.id = option.id
			this._getdetailinfo()
		},
		methods: {
			_getdetailinfo() {
				var obj = {
					friend_id: this.id
				}
				this.$common.requests('/api/user/get_friend_info', obj).then(res => {
					console.log(res.data.data)
					if (res.data.code == 1) {
						this.infodata = res.data.data
						// 不通状态,数据更换了
						if (this.currentIndex == 1) {
							this.option.dataset.source = []
							this.option.dataset.source = res.data.data.seven_days
							// this.option.dataset.source = [
							// 	["06-09", 0],["10", 0],["12", 0],
							// 	["12", 0],["13", 0],["14", 0],
							// 	["15", 0],["16", 0],["17", 0]]
						}
						if (this.currentIndex == 2) {
							this.option.dataset.source = []
							this.option.dataset.source = res.data.data.half_years
						}
					} else {
						this.$api.msg(res.data.msg);
					}
				})
			},
			// 拨打电话
			opencall() {
				uni.makePhoneCall({
					phoneNumber: this.infodata.mobile,
					success: (res) => {

					},
					// 失败回调
					fail: (res) => {
						console.log('拨打电话失败!')
					}
				})
			},
			clickbtn(index) {
				this.currentIndex = index
				// 每次切换都重新请求数据
				this._getdetailinfo()
			},
		}
	}
</script>
<script module="echarts" lang="renderjs">
	let myChart
	export default {
		mounted() {
			if (typeof window.echarts === 'function') {
				this.initEcharts()
			} else {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script.src = 'static/echarts.js'
				script.onload = this.initEcharts.bind(this)
				document.head.appendChild(script)
			}
		},
		methods: {
			initEcharts() {
				myChart = echarts.init(document.getElementById('echarts'))
				// 观测更新的数据在 view 层可以直接访问到
				myChart.setOption(this.option)
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				// 监听 service 层数据变更
				myChart.setOption(newValue)
			},
			onClick(event, ownerInstance) {
				// 调用 service 层的方法
				ownerInstance.callMethod('onViewClick', {
					test: 'test'
				})
			}
		}
	}
</script>
<style>
	.box {
		width: 100vw;
		/* height: 100vh; */
		/* overflow: hidden; */
	}

	/* border */
	.border {
		width: 100%;
		height: 200rpx;
		background-color: #FFFFFF;
		padding: 0 20rpx;
	}

	.border_toux {
		width: 110rpx;
		height: 110rpx;
		border-radius: 50%;
	}

	.border_phone {
		width: 36rpx;
		height: 36rpx;
		margin-top: -20rpx;
	}

	.border_name {
		margin: -40rpx 0 0 20rpx;
	}

	.mr {
		margin-right: 40rpx;
		margin-top: -6rpx;
	}

	.bgc {
		width: 100%;
		height: 30rpx;
		background-color: #F2F2F2;
	}

	/* next */
	.tabar_lefts {
		width: 100%;
		line-height: 100rpx;
		color: #A2A2A2;
		border-bottom: solid 1rpx #E5E5E5;
	}

	.tabar_bottom {
		width: 94%;
		height: 242rpx;
		margin: 0 3%;
		background-color: #FFFFFF;
		color: #A2A2A2;
		padding: 0 30rpx;
		line-height: 66rpx;
		font-size: 30rpx;
		padding-top: 30rpx;
	}

	.tabar_border {
		border-right: solid 1rpx #F3F3F3;
		height: 110rpx;
	}

	.tabar_start {
		width: 50%;
		line-height: 60rpx;
		text-align: center;
		margin: 30rpx 0;
	}

	.tabar_bgc {
		background-color: #FFFFFF;
	}

	.start_l {
		font-size: 38rpx;
		color: #000000;
	}

	.pa_l {
		padding-left: 30rpx;
	}

	/* pattern */
	.pattern {
		width: 100%;
		/* height: 400rpx; */
		background-color: #FFFFFF;
		padding: 0 20rpx;
	}

	.partten_duan {
		width: 80rpx;
		height: 40rpx;
		background-color: #FFFFFF;
		color: #ADADAD;
	}

	.partten_long {
		width: 80rpx;
		height: 40rpx;
		background-color: #5A7EF8;
		color: #FFFFFF;
	}

	.pattern_xinz {
		letter-spacing: 4rpx;
		color: #A2A2A2;
	}

	.pattern_top {
		width: 100%;
		line-height: 100rpx;
	}


	/* 折线图样式 */
	.linechartcontent {
		height: 720rpx;
		width: 100%;
		/* border:1rpx solid red; */
	}

	.echarts {
		width: 100%;
		height: 100%;
	}

	.ecahrtnext {
		/* border:1rpx solid red; */
		height: 500rpx;
		width: 100%;
	}

	.especilly {
		background-color: #5A7EF8;
		color: #FFFFFF;
		height: 200rpx;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 90%;
		margin: 0 auto;
	}

	.especillytitle {
		width: 100%;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
	}

	.especillynum {
		width: 100%;
		text-align: center;
		height: 120rpx;
		line-height: 120rpx;
		font-size: 42rpx;
	}
</style>
