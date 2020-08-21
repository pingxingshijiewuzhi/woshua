<template>
	<view class='declaration'>
		<!-- <image src="../../static/communityimage/longimg.jpg" mode="aspectFill"></image> -->
		<!-- <image src="../../static/communityimage/longimg.jpg" mode="heightFix"></image> -->
		<rich-text :nodes="content"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
			}
		},
		onLoad() {
			this.get_contribute_explain();
		},
		methods: {
			get_contribute_explain() {
				this.$common.requests('/api/voice/voice_explain').then(res => {
					if (res.data.code == 1) {
						this.content = res.data.data;
					} else {
						this.$api.msg(res.data.msg);
					}
				});
			}
		}
	}
</script>

<style scoped>
	.declaration {
		height: 120vh;
		width: 100vw;
	}

	.declaration image {
		width: 100%;
		height: 100%;
	}
</style>
