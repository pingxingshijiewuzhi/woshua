<template>
	<view class="box">
		<image class="image" src="../../static/image/0009.png" mode=""></image>
	</view>
</template>

<script>
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

	.center {
		width: 100vw;
		height: 100vh;
	}

	/*#ifdef APP-PLUS*/
	.image {
		width: 100%;
		height: 100%;
	}

	/*  #endif  */
	/*#ifdef H5 */
	.image {
		width: 100%;
		height: 94%;
	}

	/*  #endif  */
</style>
