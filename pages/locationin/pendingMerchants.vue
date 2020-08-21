<template>
	<view class="box">
		<!-- border -->
		<view class="border">
			<view class="flexs2">
				<image class="border_image" src="../../static/image/btn_h_fanhui@2x.png" mode="" @click="back"></image>
				<view class="border_text">待入网商户</view>
				<view class="border_right" @click="toshouye">返回首页</view>
			</view>
		</view>
		<!-- barner -->
		<view class="barner flexs">
			<view class="barner_left">
				<view class="barner_borders">1</view>
				<view class="barner_colors">基本信息</view>
			</view>
			<view class="barner_dashed"></view>
			<view class="barner_right">
				<view class="barner_borders">2</view>
				<view class="barner_colors">企业信息</view>
			</view>
		</view>
		<!-- tabar -->
		<view class="tabar">
			<view class="text-bold plase">请选择企业类型</view>
			<view class="flexs1">
				<view @click='clickbtn(0)' class='tabar_lists flexs ' :class="{'tabar_list flexs':currentIndex==0}">个体工商户</view>
				<view @click='clickbtn(1)' class='tabar_lists flexs margin_ma' :class="{'tabar_list margin_ma flexs':currentIndex==1}">有限公司</view>
				<view @click='clickbtn(2)' class='tabar_lists flexs ' :class="{'tabar_list flex':currentIndex==2}">小微商户</view>
			</view>
		</view>
		<!-- v-show=0 -->
		<view class="" v-show="currentIndex==0">
			<!-- title -->
			<view class="title_big">
				<view class="title text-bold plase">营业执照信息</view>
			</view>
			<view class="title_box">
				<view class="title_photo flexs1">
					<view v-if='upimgload'>
						<image class="zhizhao" :src="imgUrl+upimgload" mode=""></image>
					</view>
					<view v-else>
						<image class="zhizhao" src="../../static/image/icon_yyzz@2x.png" mode=""></image>
					</view>
					<view @tap='choosetype($event,0)' data-target='DialogModal'>点击上传营业执照</view>
				</view>
				<view class="zhicehng flexs1">
					<view class="zhi_color">营业执照名称</view>
					<input class="zhi_input" type="text" v-model="license_name" maxlength="15" placeholder="请输入营业执照名称或商户名称" />
				</view>
				<view class="zhicehng flexs1">
					<view class="zhi_color">营业执照号</view>
					<input class="zhi_input" type="text" v-model="license_id" maxlength="20" placeholder="即统一社会机构代码" />
				</view>
				<view class="zhicehng flexs1">
					<view class="zhi_color">营业执照有效期</view>
					<image class="image_next" src="../../static/image/btn_psdz_xyb@2x.png"></image>
					<gpp-date-picker class="time_time" @onCancel="onCancel" @onConfirm="onConfirm" :startDate="startDate" :endDate="endDate"
					 @alltime='onConfirm'>
						<!-- :defaultValue="pickerDate" -->
						{{pickerDate}}
					</gpp-date-picker>
				</view>

				<view class="zhicehng flexs1" >
					<view class="zhi_color" >MCC行业编码</view>
					
					<!-- :defaultRegions="defaultRegions" -->
					<block v-if='list.length != 0'>
						<pick-copyregions  @getRegions="handleGetRegions" class='haha_mytime' :china_regions='list'>
							<input type="text" class="zhi_input" disabled="disabled" v-model="MCCvalue" placeholder="请选择MCC行业编码" />
							<image class="position_img  MCCimage_next" src="../../static/image/btn_psdz_xyb@2x.png"></image>
						</pick-copyregions>		
					</block>
				
					
					<!-- <picker mode='multiSelector' :range='MCCarr' :range-key="'[1,2]'" @columnchange='MccChanging' @change='MCCchange'
					 class='haha_mytime'>
						<input type="text" class="zhi_input" disabled="disabled" v-model="MCCvalue" placeholder="请选择MCC行业编码" />
						<image class="position_img  MCCimage_next" src="../../static/image/btn_psdz_xyb@2x.png"></image>
					</picker> -->
					
					<!-- <input type="text" class="zhi_input" disabled="disabled" v-model="MCCvalue" placeholder="请选择MCC行业编码" />
					<image class="position_img  MCCimage_next" src="../../static/image/btn_psdz_xyb@2x.png"></image> -->
				</view>
				<view class="zhicehng flexs1">
					<view class="zhi_color">经营场所</view>
					<view>
						<pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
							<view class="color_col" v-if="region.length == ''"> 请选择市/县/区</view>
							<view class="color_col" v-else>{{regionName}}</view>
						</pick-regions>
					</view>
					<image class="image_next" src="../../static/image/btn_psdz_xyb@2x.png" mode=""></image>
				</view>
				<view class="zhicehng flexs1">
					<view class="zhi_color">详细地址</view>
					<input class="zhi_input" type="text" v-model="address_detail" maxlength="20" placeholder="请输入详细地址" />
				</view>
			</view>
			<!-- sole -->
			<view class="sole">
				<view class="title_big">
					<view class="title plase">法人信息</view>
				</view>
				<view class="sole_name flexs1">
					<view class="">
						<image class="sole_sen" :src="imgUrl+face_positive_image" @tap='choosetype($event,1)' data-target='DialogModal'
						 v-if='face_positive_image'></image>
						<image class="sole_sen" src="../../static/image/img_h_sfz_zheng@2x.png" v-else @tap='choosetype($event,1)'
						 data-target='DialogModal'></image>
						<view class=" sen_text flexs2">
							<view class="">正面照</view>
							<view class="">(人像面)</view>
						</view>
					</view>
					<view class="">
						<image class="sole_sen" :src="imgUrl+face_back_image" v-if='face_back_image' @tap='choosetype($event,2)'
						 data-target='DialogModal'></image>
						<image class="sole_sen" src="../../static/image/img_h_sfz_fan@2x.png" v-else @tap='choosetype($event,2)'
						 data-target='DialogModal'></image>
						<view class=" sen_text flexs2">
							<view class="">反面照</view>
							<view class="">(国徽面)</view>
						</view>
					</view>
				</view>
				<view class="zhicehng flexs1">
					<view class="zhi_color">法人姓名</view>
					<input class="zhi_input" type="text" v-model="legal_name" maxlength="20" placeholder="请输入法人真实姓名" />
				</view>
				<view class="zhicehng flexs1">
					<view class="zhi_color">法人手机</view>
					<input class="zhi_input" type="number" v-model="legal_phone" placeholder="请输入法人真实有效的手机号" />
				</view>
				<view class="zhicehng flexs1">
					<view class="zhi_color">法人身份证</view>
					<input class="zhi_input" type="number" v-model="legal_id" placeholder="请输入法人身份证号" />
				</view>
				<view class="zhicehng flexs1">
					<view class="zhi_color">身份证有效期</view>
					<image class="image_next" src="../../static/image/btn_psdz_xyb@2x.png" mode=""></image>
					<gpp-date-picker class="time_time" @onCancel="onCancel" @onConfirm="myid_endtime" :startDate="startDate" :endDate="endDate">
						<!-- :defaultValue="pickerDate" -->
						{{id_endtime}}
					</gpp-date-picker>
				</view>
			</view>
			<!-- permit -->
			<view class="permit">
				<view class="title_big">
					<view class="title">店铺信息</view>
				</view>
				<view class="sole_name flexs1">
					<view class="" @tap='choosetype($event,3)' data-target='DialogModal'>
						<image class="sole_sen" :src="imgUrl+shop_internal_image" v-if='shop_internal_image'></image>
						<image class="sole_sen" src="../../static/image/icon_scdntp@2x.png" v-else></image>
						<view class=" sen_text flexs2">
							<view class="">点击上传店内照</view>
						</view>
					</view>
					<view class="" @tap='choosetype($event,4)' data-target='DialogModal'>
						<image class="sole_sen" :src="imgUrl+shop_cashier_image" v-if='shop_cashier_image'></image>
						<image class="sole_sen" src="../../static/image/icon_scdntp@2x.png" v-else></image>
						<view class=" sen_text flexs2">
							<view class="">点击上传收银台</view>
						</view>
					</view>
				</view>
				<view class="sole_name flexs1">
					<view class="" @tap='choosetype($event,5)' data-target='DialogModal'>
						<image class="sole_sen" :src="imgUrl+shop_door_image" v-if='shop_door_image'></image>
						<image class="sole_sen" src="../../static/image/icon_scdntp@2x.png" v-else></image>
						<view class=" sen_text flexs2">
							<view class="">点击上传门头照</view>
						</view>
					</view>
					<view class="" @tap='choosetype($event,6)' data-target='DialogModal'>
						<image class="sole_sen" :src="imgUrl+group_photo_image" v-if='group_photo_image'></image>
						<image class="sole_sen" src="../../static/image/icon_scdntp@2x.png" v-else></image>
						<view class=" sen_texts flexs1">
							<view class="shouchi ">手持营业执照门头照(选填)</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- v-show=1 -->
		<view class="" v-show="currentIndex==1">
			<view class="title_big">
				<view class="title">营业执照信息</view>
			</view>
			<view class="title_box">
				<view class="title_photo flexs1">
					<view v-if='upimgload'>
						<image class="zhizhao" :src="imgUrl+upimgload" mode=""></image>
					</view>
					<view v-else>
						<image class="zhizhao" src="../../static/image/icon_yyzz@2x.png" mode=""></image>
					</view>
					<view @tap='choosetype($event,0)' data-target='DialogModal'>点击上传营业执照</view>
				</view>
				<view class="zhicehng flexs1">
					<view class="zhi_color">营业执照名称</view>
					<input class="zhi_input" type="text" v-model="license_name" placeholder="请输入营业执照名称或商户名称" />
				</view>
				<view class="zhicehng flexs1">
					<view class="zhi_color">营业执照号</view>
					<input class="zhi_input" type="text" v-model="license_id" placeholder="即统一社会机构代码" />
				</view>
				<view class="zhicehng flexs1">
					<view class="zhi_color">营业执照有效期</view>
					<image class="image_next" src="../../static/image/btn_psdz_xyb@2x.png"></image>
					<gpp-date-picker class="time_time" @onCancel="onCancel" @onConfirm="onConfirm" :startDate="startDate" :endDate="endDate"
					 @alltime='onConfirm'>
						<!-- :defaultValue="pickerDate" -->
						{{pickerDate}}
					</gpp-date-picker>
				</view>
				<view class="zhicehng flexs1" >
					<view class="zhi_color">MCC行业编码</view>
					<!-- <picker mode='multiSelector' :range='MCCarr' :range-key="'[1,2]'" @columnchange='MccChanging' @change='MCCchange'
					 class='haha_mytime'>
						<input type="text" class="zhi_input" v-model="MCCvalue" disabled="disabled" placeholder="请选择MCC行业编码" />
						<image class="position_img  MCCimage_next" src="../../static/image/btn_psdz_xyb@2x.png"></image>
					</picker> -->
					<block v-if='list.length != 0'>
						<pick-copyregions  @getRegions="handleGetRegions" class='haha_mytime' :china_regions='list'>
							<input type="text" class="zhi_input" disabled="disabled" v-model="MCCvalue" placeholder="请选择MCC行业编码" />
							<image class="position_img  MCCimage_next" src="../../static/image/btn_psdz_xyb@2x.png"></image>
						</pick-copyregions>
					</block>
					<!-- <input type="text" class="zhi_input" v-model="MCCvalue" disabled="disabled" placeholder="请选择MCC行业编码" />
					<image class="position_img  MCCimage_next" src="../../static/image/btn_psdz_xyb@2x.png"></image> -->
				</view>

				<view class="zhicehng flexs1">
					<view class="zhi_color">经营场所</view>
					<view>
						<pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegionA">
							<view class="color_col" v-if="region.length == ''"> 请选择市/县/区</view>
							<view class="color_col" v-else>{{regionNameA}}</view>
						</pick-regions>
					</view>
					<image class="image_next" src="../../static/image/btn_psdz_xyb@2x.png" mode=""></image>
				</view>
				<view class="zhicehng flexs1">
					<view class="zhi_color">详细地址</view>
					<input class="zhi_input" type="text" v-model="address_detail" placeholder="请输入详细地址" />
				</view>
			</view>
			<!-- sole -->
			<view class="sole">
				<view class="title_big">
					<view class="title">法人信息</view>
				</view>
				<view class="sole_name flexs1">
					<view class="">
						<image class="sole_sen" :src="imgUrl+face_positive_image" @tap='choosetype($event,1)' data-target='DialogModal'
						 v-if='face_positive_image'></image>
						<image class="sole_sen" src="../../static/image/img_h_sfz_zheng@2x.png" v-else @tap='choosetype($event,1)'
						 data-target='DialogModal'></image>
						<view class=" sen_text flexs2">
							<view class="">正面照</view>
							<view class="">(人像面)</view>
						</view>
					</view>
					<view class="">
						<image class="sole_sen" :src="imgUrl+face_back_image" v-if='face_back_image' @tap='choosetype($event,2)'
						 data-target='DialogModal'></image>
						<image class="sole_sen" src="../../static/image/img_h_sfz_fan@2x.png" v-else @tap='choosetype($event,2)'
						 data-target='DialogModal'></image>
						<view class=" sen_text flexs2">
							<view class="">正面照</view>
							<view class="">(国徽面)</view>
						</view>
					</view>
				</view>
				<view class="zhicehng flexs1">
					<view class="zhi_color">法人姓名</view>
					<input class="zhi_input" type="text" v-model="legal_name" placeholder="请输入法人真实姓名" />
				</view>
				<view class="zhicehng flexs1">
					<view class="zhi_color">法人手机</view>
					<input class="zhi_input" type="number" v-model="legal_phone" placeholder="请输入法人真实有效的手机号" />
				</view>
				<view class="zhicehng flexs1">
					<view class="zhi_color">法人身份证</view>
					<input class="zhi_input" type="number" v-model="legal_id" placeholder="请输入法人身份证号" />
				</view>
				<view class="zhicehng flexs1">
					<view class="zhi_color">身份证有效期</view>
					<image class="image_next" src="../../static/image/btn_psdz_xyb@2x.png" mode=""></image>
					<gpp-date-picker class="time_time" @onCancel="onCancel" @onConfirm="onConfirm" :startDate="startDate" :endDate="endDate"
					 @alltime='onConfirm'>
						{{pickerDate}}
					</gpp-date-picker>
				</view>
			</view>
			<!-- permit -->
			<view class="permit">
				<view class="title_big">
					<view class="title">店铺信息</view>
				</view>
				<view class="sole_name flexs1">
					<view class="" @tap='choosetype($event,3)' data-target='DialogModal'>
						<image class="sole_sen" :src="imgUrl+shop_internal_image" v-if='shop_internal_image'></image>
						<image class="sole_sen" src="../../static/image/icon_scdntp@2x.png" v-else></image>
						<view class=" sen_text flexs2">
							<view class="">点击上传店内照</view>
						</view>
					</view>
					<view class="" @tap='choosetype($event,4)' data-target='DialogModal'>
						<image class="sole_sen" :src="imgUrl+shop_cashier_image" v-if='shop_cashier_image'></image>
						<image class="sole_sen" src="../../static/image/icon_scdntp@2x.png" v-else></image>
						<view class=" sen_text flexs2">
							<view class="">点击上传收银台</view>
						</view>
					</view>
				</view>
				<view class="sole_name flexs1">
					<view class="" @tap='choosetype($event,5)' data-target='DialogModal'>
						<image class="sole_sen" :src="imgUrl+shop_door_image" v-if='shop_door_image'></image>
						<image class="sole_sen" src="../../static/image/icon_scdntp@2x.png" v-else></image>
						<view class=" sen_text flexs2">
							<view class="">点击上传门头照</view>
						</view>
					</view>
					<view class="" @tap='choosetype($event,6)' data-target='DialogModal'>
						<image class="sole_sen" :src="imgUrl+group_photo_image" v-if='group_photo_image'></image>
						<image class="sole_sen" src="../../static/image/icon_scdntp@2x.png" v-else></image>
						<view class=" sen_texts flexs">
							<view class="shouchi">手持营业执照门头照(选填)</view>
						</view>
					</view>
				</view>
			</view>
			<!-- top -->
			<view class="title_big">
				<view class="title">特约商户受理支付业务协议书照片</view>
			</view>
			<view class="top ">
				<view class="" @tap='choosetype($event,7)' data-target='DialogModal'>
					<image class="sole_sen" :src="imgUrl+agreement_image" v-if='agreement_image'></image>
					<image class="sole_sens" src="../../static/image/icon_scdntp@2x.png" v-else></image>
					<view class="top_left">点击上传特约协议照片</view>
				</view>
			</view>
		</view>
		<!-- v-model=2 -->
		<view class="" v-show="currentIndex==2">
			<!-- title -->
			<view class="title_big">
				<view class="title">基本信息</view>
			</view>
			<view class="last_height">
				<view class="zhicehng flexs1" >
					<view class="zhi_color">MCC行业编码</view>
					<!-- <picker mode='multiSelector' :range='MCCarr' :range-key="'[1,2]'" @columnchange='MccChanging' @change='MCCchange'
					 class='haha_mytime'>
						<input type="text" class="zhi_input" disabled="disabled" v-model="MCCvalue" placeholder="请选择MCC行业编码" />
						<image class="position_img  MCCimage_next" src="../../static/image/btn_psdz_xyb@2x.png"></image>
					</picker> -->
					<block v-if='list.length != 0'>
						<pick-copyregions  @getRegions="handleGetRegions" class='haha_mytime' :china_regions='list'>
							<input type="text" class="zhi_input" disabled="disabled" v-model="MCCvalue" placeholder="请选择MCC行业编码" />
							<image class="position_img  MCCimage_next" src="../../static/image/btn_psdz_xyb@2x.png"></image>
						</pick-copyregions>
					</block>
				<!-- 	<input type="text" class="zhi_input" disabled="disabled" v-model="MCCvalue" placeholder="请选择MCC行业编码" />
					<image class="position_img  MCCimage_next" src="../../static/image/btn_psdz_xyb@2x.png"></image> -->
				</view>
				<!-- model mcc -->
				<view class="zhicehng flexs1">
					<view class="zhi_color">经营场所</view>
					<view>
						<pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegionB">
							<view class="color_col" v-if="region.length == ''"> 请选择市/县/区</view>
							<view class="color_col" v-else>{{regionNameB}}</view>
						</pick-regions>
					</view>
					<image class="image_next" src="../../static/image/btn_psdz_xyb@2x.png" mode=""></image>
				</view>
				<view class="zhicehng flexs1">
					<view class="zhi_color">详细地址</view>
					<input class="zhi_input" type="text" v-model="address_detail" placeholder="请输入详细地址" />
				</view>
			</view>
			<!-- soles -->
			<view class="soles">
				<view class="title_big">
					<view class="title">法人信息</view>
				</view>
				<view class="sole_name flexs1">
					<view class="">
						<image class="sole_sen" :src="imgUrl+face_positive_image" @tap='choosetype($event,1)' data-target='DialogModal'
						 v-if='face_positive_image'></image>
						<image class="sole_sen" src="../../static/image/img_h_sfz_zheng@2x.png" v-else @tap='choosetype($event,1)'
						 data-target='DialogModal'></image>
						<view class=" sen_text flexs2">
							<view class="">正面照</view>
							<view class="">(人像面)</view>
						</view>
					</view>
					<view class="">
						<image class="sole_sen" :src="imgUrl+face_back_image" v-if='face_back_image' @tap='choosetype($event,2)'
						 data-target='DialogModal'></image>
						<image class="sole_sen" src="../../static/image/img_h_sfz_fan@2x.png" v-else @tap='choosetype($event,2)'
						 data-target='DialogModal'></image>
						<view class=" sen_text flexs2">
							<view class="">正面照</view>
							<view class="">(国徽面)</view>
						</view>
					</view>
				</view>
				<view class="sole_name flexs1">
					<view class="" @tap='choosetype($event,8)' data-target='DialogModal'>
						<image class="sole_sen" :src="imgUrl+legal_avatar" v-if='legal_avatar'></image>
						<image class="sole_sen" src="../../static/image/icon_scdntp@2x.png" v-else></image>
						<view class=" sen_text flexs2">
							<view class="">点击上传法人头像照</view>
						</view>
					</view>
					<view class="" @tap='choosetype($event,9)' data-target='DialogModal'>
						<image class="sole_sen" :src="imgUrl+legal_idcard_door" v-if='legal_idcard_door'></image>
						<image class="sole_sen" src="../../static/image/icon_scdntp@2x.png" v-else></image>
						<view class=" sen_text flexs2">
							<view class="xuantian">手持身份证门店照(选填)</view>
						</view>
					</view>
				</view>
				<view class="zhicehng flexs1">
					<view class="zhi_color">法人姓名</view>
					<input class="zhi_input" type="text" v-model="legal_name" placeholder="请输入法人真实姓名" />
				</view>
				<view class="zhicehng flexs1">
					<view class="zhi_color">法人手机</view>
					<input class="zhi_input" type="nember" v-model="legal_phone" placeholder="请输入法人真实有效的手机号" />
				</view>
				<view class="zhicehng flexs1">
					<view class="zhi_color">法人身份证</view>
					<input class="zhi_input" type="number" v-model="legal_id" placeholder="请输入法人身份证号" />
				</view>
				<view class="zhicehng flexs1">
					<view class="zhi_color">身份证有效期</view>
					<image class="image_next" src="../../static/image/btn_psdz_xyb@2x.png" mode=""></image>
					<gpp-date-picker class="time_time" @onCancel="onCancel" @onConfirm="onConfirm" :startDate="startDate" :endDate="endDate"
					 @alltime='onConfirm'>
						<!-- :defaultValue="pickerDate" -->
						{{pickerDate}}
					</gpp-date-picker>
				</view>
			</view>
			<!-- permit -->
			<view class="permit">
				<view class="title_big">
					<view class="title">店铺信息</view>
				</view>
				<view class="sole_name flexs1">
					<view class="" @tap='choosetype($event,3)' data-target='DialogModal'>
						<image class="sole_sen" :src="imgUrl+shop_internal_image" v-if='shop_internal_image'></image>
						<image class="sole_sen" src="../../static/image/icon_scdntp@2x.png" v-else></image>
						<view class=" sen_text flexs2">
							<view class="">点击上传店内照</view>
						</view>
					</view>
					<view class="" @tap='choosetype($event,4)' data-target='DialogModal'>
						<image class="sole_sen" :src="imgUrl+shop_cashier_image" v-if='shop_cashier_image'></image>
						<image class="sole_sen" src="../../static/image/icon_scdntp@2x.png" v-else></image>
						<view class=" sen_text flexs2">
							<view class="">点击上传收银台</view>
						</view>
					</view>
				</view>
				<view class="sole_name flexs1">
					<view class="" @tap='choosetype($event,5)' data-target='DialogModal'>
						<image class="sole_sen" :src="imgUrl+shop_door_image" v-if='shop_door_image'></image>
						<image class="sole_sen" src="../../static/image/icon_scdntp@2x.png" v-else></image>
						<view class=" sen_text flexs2">
							<view class="">点击上传门头照</view>
						</view>
					</view>
					<view class="" @tap='choosetype($event,6)' data-target='DialogModal'>
						<image class="sole_sen" :src="imgUrl+group_photo_image" v-if='group_photo_image'></image>
						<image class="sole_sen" src="../../static/image/icon_scdntp@2x.png" v-else></image>
						<view class=" sen_texts flexs2">
							<view class="shouchi">手持营业执照门头照(选填)</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="button flexs" @click='submitbtn'>提交</view>
		<!-- model  photo-->
		<view class='myimgtype' v-show="modalName" :class="modalName=='DialogModal'?'show':''">
			<view class='content'>
				<view class='common_type addbottom' @click='choosecamera'>拍照上传</view>
				<view class='common_type' @click='choosephone'>从相册选择</view>
			</view>
			<view class='commoncancle' @tap='canclechoose'>取消</view>
		</view>
	</view>
</template>

<script>
	// import BiaofunDatetimePicker from '@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue';
	import gppDatePicker from "@/components/gpp-datePicker/gpp-datePicker.vue"
	import pickRegions from '@/address/components/pick-regions/pick-regions.vue'
	import pickCopyregions from "@/components/pick-regions/pick-regions.vue"
	export default {
		components: {
			// BiaofunDatetimePicker,
			gppDatePicker,
			pickRegions,
			pickCopyregions
		},
		data() {
			return {
				liandongStatus:false,
				// 二级
				list:[
				// {
				// "code":"11",
				// "name":"娱乐类",
				// "childs":[
				// 		{"code":"1101","name":"酒吧"},
				// 		{"code":"1102","name":"KTV"},
				// 		{"code":"1103","name":"网吧"},
				// 	],
				// },
				// {"code":"12","name":"餐饮类","childs":[{"code":"1201","name":"奶茶店"},{"code":"1202","name":"饭店"},{"code":"1203","name":"酒店"}]},
				// {"code":"13","name":"宾馆类","childs":[{"code":"1301","name":"民宿"},{"code":"1302","name":"个体宾馆"},{"code":"1303","name":"连锁宾馆"}]}
				],
				aid: '',
				ys: '',
				topList: [],
				// 区分是那个点击触发拍照
				phonenumber: '',

				currentIndex: 0,
				modalName: null,
				modalNames: null,
				data_id: '0',
				startDate: "2019-05-21",
				endDate: "2030-05-21",
				// 初始化赋值默认日期  营业执照有效时间
				pickerDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
				// id_endtime:'2020-05-05',
				id_endtime: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
				// 地址赋值
				region: [],
				regionA: [],
				regionB: [],
				defaultRegion: ['广东省', '广州市', '番禺区'],
				defaultRegionCode: '440113',
				merchantid: '',
				imgUrl: this.$common.baseUrl,
				// 营业执照图片
				upimgload: '',
				// 法人正面照片
				face_positive_image: '',
				// 法人背面照片
				face_back_image: '',
				// 店铺内照片
				shop_internal_image: '',
				// 收银台照片
				shop_cashier_image: '',
				// 门头照
				shop_door_image: '',
				// 手持营业执照
				group_photo_image: '',
				// 特约协议照片
				agreement_image: '',
				// 法人头像照片
				legal_avatar: '',
				// 法人手持省份证店面照
				legal_idcard_door: '',
				// 营业执照名称
				license_name: '',
				// 营业执照号
				license_id: '',

				// MCC编码所需参数
				MCCarr: [],
				MCCname: [],
				MCClist: [],
				// 第一列选中数值下标
				firstIndex: 0,
				// 默认第二列选中第一元素
				chooseIndex: 0,
				// 第二列选中数值下标
				secondeIndex: 0,
				MCCvalue: '',

				// 二级联动两列值
				firsrMCC:'',
				secondMCC:'',
				
				// 详细地址
				address_detail: '',
				// 法人手机号
				legal_phone: '',
				// 法人姓名
				legal_name: '',
				// 法人身份证
				legal_id: '',

			}
		},
		watch: {
			// firstIndex(newVal) {
			// 	console.log(newVal, 9699)
			// 	if (newVal != this.chooseIndex) {
			// 		this.chooseIndex = newVal
			// 		this.MCCarr.splice(1, 1, this.MCClist[this.chooseIndex])
			// 	}
			// 	console.log(this.MCCname, 6666)
			// 	console.log(newVal)
			// }
		},
		onReady() {
			
		},
		computed: {
			regionName() {
				if (this.region == []) {
					return
				}
				// 转为字符串
				return this.region.map(item => item.name).join(' ')
			},
			regionNameA() {
				if (this.regionA == []) {
					return
				}
				// 转为字符串
				return this.region.map(item => item.name).join(' ')
			},
			regionNameB() {
				if (this.regionB == []) {
					return
				}
				// 转为字符串
				return this.region.map(item => item.name).join(' ')
			},
		},
		onLoad(option) {
			this.merchantid = option.id
			this._getMCC()
			this._getTime()
		},
		methods: {
			// 获取选择的地区
			handleGetRegions(regions){
				this.MCCvalue = regions[0].name + '-' + regions[1].name
				// console.log(regions[0],666)
				// console.log(regions[1],666)
			},
			
			// 获取MCC行业编码
			// _getMCC() {
			// 	this.$common.requests('/api/shops/get_mcc_list').then(res => {
			// 		if (res.data.code == 1) {
			// 			this.MCCname = res.data.data.name
			// 			// 由于监听不到第一列下标为0的变动,添加一个空的数字
			// 			// this.MCCname.unshift('请选择');
			// 			this.MCClist = res.data.data.list
			// 			this.MCCarr.push(this.MCCname)
			// 			// 默认第二列选择第一个
			// 			this.MCCarr.push(this.MCClist[0])
			// 			// console.log(this.MCCarr)
			// 		} else {
			// 			console.log(res.data.msg)
			// 			this.$api.msg(res.data.msg);
			// 		}
			// 	})
			// },
			_getMCC() {
				this.$common.requests('/api/shops/get_mcc_list').then(res => {
					if (res.data.code == 1) {
						// console.log(res.data.data)
						// this.list = res.data.data.list
						this.list = res.data.data.mcclist
					} else {
						console.log(res.data.msg)
						this.$api.msg(res.data.msg);
					}
				})
			},
			// 获取当前年月日
			_getTime() {
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDay();
				month = Number(month) > 9 ? month : "0" + month
				day = Number(day) > 9 ? day : "0" + day
				return year + "-" + month + "-" + day;
			},
			// 实时监听第一列变化,从而改变第二列数值
			// MccChanging(e) {
			// 	console.log(e.detail, 999)
			// 	if (e.detail.column == 0) {
			// 		this.firstIndex = e.detail.value
			// 	}
			// },
			// MCCchange(e) {
			// 	this.firstIndex = e.detail.value[0]
			// 	this.secondeIndex = e.detail.value[1]
			// 	this.MCCvalue = this.MCCname[this.firstIndex] + '-' + this.MCClist[this.firstIndex][this.secondeIndex]
			// },
			submitbtn() {
				if (/^1[345789]\d{9}$/.test(this.legal_phone) == false) {
					this.$api.msg('请输入正确的手机号格式')
					return
				}
				// var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
				// if (emailReg.test(this.legal_id) == false) {
				// 	this.$api.msg('请输入正确的邮箱格式')
				// 	return
				// }
				let obj = {
					id: this.merchantid,
					type: this.currentIndex + 1,
					license_image: this.upimgload,
					license_name: this.license_name,
					license_id: this.license_id,
					license_endtime: this.pickerDate,
					MCC: this.MCCvalue,
					license_address: this.regionName,
					license_addres: this.regionNameA,
					license_addre: this.regionNameB,
					address_detail: this.address_detail,
					face_positive_image: this.face_positive_image,
					face_back_image: this.face_back_image,
					legal_name: this.legal_name,
					legal_phone: this.legal_phone,
					legal_id: this.legal_id,
					id_endtime: this.id_endtime,
					shop_internal_image: this.shop_internal_image,
					shop_cashier_image: this.shop_cashier_image,
					shop_door_image: this.shop_door_image,
					group_photo_image: this.group_photo_image,
					agreement_image: this.agreement_image,
					legal_avatar: this.legal_avatar,
					legal_idcard_door: this.legal_idcard_door
				}

				this.$common.requests('/api/shops/teep_three', obj).then(res => {
					if (res.data.code == 1) {
						this.$api.msg(res.data.msg);
					} else {
						console.log(res.data.msg)
						this.$api.msg(res.data.msg);
					}
				})
			},
			// 获取选择的地区
			handleGetRegion(region) {
				this.region = region
			},
			handleGetRegionA(region) {
				this.region = region
			},
			handleGetRegionB(region) {
				this.region = region
			},
			showModals(e) {
				this.modalNames = e.currentTarget.dataset.target
			},
			onCancel() {

			},
			hideModal(e) {
				this.modalNames = null
			},
			onConfirm(e) {
				this.pickerDate = e.dateValue;
			},
			myid_endtime(e) {
				this.id_endtime = e.dateValue;
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			toshouye() {
				uni.switchTab({
					url: '../index/index'
				})
			},
			clickbtn(index) {
				this.currentIndex = index
				this.upimgload = ''
				this.license_name = ''
				this.license_id = ''
				this.pickerDate = this._getTime()
				this.id_endtime = this._getTime()
				this.MCCvalue = ''
				this.address_detail = ''
				this.face_positive_image = ''
				this.face_back_image = ''
				this.legal_name = ''
				this.legal_phone = ''
				this.legal_id = ''
				this.shop_internal_image = ''
				this.shop_cashier_image = ''
				this.shop_door_image = ''
				this.group_photo_image = ''
				this.agreement_image = ''
				this.legal_avatar = ''
				this.legal_idcard_door = ''
			},
			upimg() {
				this.$common.upimg().then(res => {
					console.log(res)
				});
			},
			// 选择图片来源途径
			choosetype(e, number) {
				this.phonenumber = number
				this.modalName = e.currentTarget.dataset.target
			},
			// 拍照选择
			choosecamera() {
				var that = this
				this.modalName = null
				this.$common.upimg(1, 1, ['camera']).then(res => {
					switch (this.phonenumber) {
						case 0:
							that.upimgload = res[0]
							break
						case 1:
							that.face_positive_image = res[0]
							break
						case 2:
							that.face_back_image = res[0]
							break
						case 3:
							that.shop_internal_image = res[0]
							break
						case 4:
							that.shop_cashier_image = res[0]
							break
						case 5:
							that.shop_door_image = res[0]
							break
						case 6:
							that.group_photo_image = res[0]
							break
						case 7:
							that.agreement_image = res[0]
							break
						case 8:
							that.legal_avatar = res[0]
							break
						case 9:
							that.legal_idcard_door = res[0]
							break

					}
				})
			},
			// 从相册选择
			choosephone() {
				var that = this
				this.modalName = null
				this.$common.upimg(1, 1, ['album']).then(res => {
					console.log(this.phonenumber)
					switch (this.phonenumber) {
						case 0:
							that.upimgload = res[0]
							break
						case 1:
							that.face_positive_image = res[0]
							break
						case 2:
							that.face_back_image = res[0]
							break
						case 3:
							that.shop_internal_image = res[0]
							break
						case 4:
							that.shop_cashier_image = res[0]
							break
						case 5:
							that.shop_door_image = res[0]
							break
						case 6:
							that.group_photo_image = res[0]
							break
						case 7:
							that.agreement_image = res[0]
							break
						case 8:
							that.legal_avatar = res[0]
							break
						case 9:
							that.legal_idcard_door = res[0]
							break
					}
				})
			},
			// 取消 隐藏
			canclechoose() {
				this.modalName = null
			},
			// 模态框时间
			changeDatetimePicker(date) {
				console.log(date);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		width: 100vw;
		height: 100vh;
		background-color: #F2F2F2;
		overflow-y: scroll;

	}

	/* border */
	.border {
		width: 100%;
		height: 130rpx;
		color: #3D3D3D;
		padding: 60rpx 20rpx 0 20rpx;
		background-color: #FFFFFF;
	}

	.border_image {
		width: 40rpx;
		height: 30rpx;
	}

	.border_text {
		font-size: 40rpx;
		letter-spacing: 8rpx;
		margin-left: 34rpx;
		font-weight: 500;
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
		height: 200rpx;
		background-color: #FFFFFF;
		margin-top: 30rpx;
	}

	.barner_left {
		width: 120rpx;
		height: 120rpx;
		line-height: 64rpx;
		margin-left: -50rpx;
	}

	.barner_right {
		width: 120rpx;
		height: 120rpx;
		line-height: 64rpx;
		margin-left: -50rpx;
	}

	.barner_corlor {
		color: #999999;
		margin-top: 10rpx;
	}

	.barner_borders {
		width: 80rpx;
		line-height: 80rpx;
		color: #FFFFFF;
		font-size: 32rpx;
		text-align: center;
		border-radius: 50% 50%;
		background-color: #5A7EF8;
		margin-left: 18rpx;

	}

	.barner_colors {
		color: #5A7EF8;
	}

	.barner_dashed {
		width: 140rpx;
		height: 10rpx;
		border-top: 1rpx dashed #999999;
		margin: -30rpx 48rpx 0 0rpx;
	}

	/* tabar */
	.tabar {
		width: 100%;
		height: 200rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		padding: 0 3%;
		line-height: 90rpx;
	}

	.plase {
		font-size: 30rpx;
	}

	.tabar_lists {
		width: 31%;
		height: 80rpx;
		background-color: #F2F2F2;
		border-radius: 20rpx;
		color: #000000;
	}

	.tabar_list {
		width: 31%;
		height: 80rpx;
		background-color: #5A7EF8;
		color: #FFFFFF;
		border-radius: 20rpx;
	}

	.margin_ma {
		margin: 0 4%;
	}

	/* title */
	.title_big {
		width: 100%;
		height: 80rpx;
		background-color: #F2F2F2;
	}

	.title {
		width: 460rpx;
		height: 40rpx;
		line-height: 40rpx;
		border-left: solid 6rpx #5A7EF8;
		margin: 30rpx 3%;
		padding-left: 20rpx;
	}

	.title_photo {
		width: 94%;
		height: 160rpx;
		color: #7E7E7E;
		margin: 0 3%;
	}

	.zhizhao {
		width: 120rpx;
		height: 132rpx;
		margin: 30rpx 30rpx 0 0;
	}

	.uni-input-placeholder {
		font-size: 28rpx;
	}

	.title_box {
		width: 100%;
		height: 764rpx;
		background-color: #FFFFFF;
	}

	.zhicehng {
		width: 100%;
		line-height: 100rpx;
		border-bottom: solid 1rpx #E5E5E5;
		padding: 0 3%;
		position: relative;
	}

	.zhi_color {
		width: 230rpx;
		color: #3D3D3D;
		font-size: 30rpx;
	}

	.zhi_input {
		width: 440rpx;
		font-size: 30rpx;
	}

	.image_next {
		width: 18rpx !important;
		height: 30rpx !important;
		position: absolute;
		right: 3% !important;
	}

	.MCCimage_next {
		width: 18rpx !important;
		height: 30rpx !important;
		position: absolute;
		right: 0 !important;
	}

	/* sole */
	.sole {
		width: 100%;
		height: 748rpx;
		background-color: #FFFFFF;
	}

	.sole_sen {
		width: 250rpx;
		height: 160rpx;
		margin-top: 30rpx;
		margin-left: 90rpx;
	}

	.sole_sens {
		width: 250rpx;
		height: 160rpx;
		margin-top: 30rpx;
	}

	.sen_text {
		width: 220rpx;
		margin-left: 108rpx;
		font-size: 28rpx;
		color: #3D3D3D;
		margin-top: 10rpx;
	}

	.sole_name {
		margin-bottom: 20rpx;
	}

	/* permit */
	.permit {
		width: 100%;
		height: 610rpx;
		background-color: #FFFFFF;
	}

	.text_wh {
		width: 320rpx !important;
		font-size: 28rpx;
		color: #3D3D3D;
		margin-left: 56rpx;
		margin-top: 10rpx;
	}

	.button {
		width: 100%;
		height: 80rpx;
		background-color: #5A7EF8;
		color: #FFFFFF;
		font-size: 32rpx;
	}

	/* 图片弹框样式 */
	.myimgtype {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .3);
	}

	.content {
		position: absolute;
		bottom: 120rpx;
		left: 40rpx;
		right: 40rpx;
		height: 160rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		color: #3C84F2;
	}

	.common_type {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
	}

	.addbottom {
		border: 1rpx solid #F2F2F2;
	}

	.commoncancle {
		line-height: 80rpx;
		text-align: center;
		color: #3C84F2;
		border-radius: 20rpx;
		position: absolute;
		bottom: 20rpx;
		left: 40rpx;
		right: 40rpx;
		height: 80rpx;
		background-color: #FFFFFF;
	}

	/* model time */
	.time_time {
		width: 400rpx;
		font-size: 30rpx;
		color: #808080;
		text-align: start;
		padding-left: 8rpx;
	}

	.color_col {
		color: #808080;
		width: 480rpx;
	}

	// top
	.top {
		width: 100%;
		height: 310rpx;
		background-color: #FFFFFF;
		text-align: center;
		padding-top: 20rpx;

	}

	.top_left {
		margin-top: 10rpx;
		color: #808080;
	}

	// last
	.last_height {
		width: 100%;
		height: 300rpx;
		background-color: #FFFFFF;
	}

	.soles {
		width: 100%;
		height: auto;
		background-color: #FFFFFF;
	}

	// MCC行业编码样式
	.haha_mytime {
		position: relative;
		width: 500rpx;
		line-height: 60rpx;
		padding-left: 10rpx;
		text-align: left;
		color: #A4A4A4;
		line-height: 60rpx;
		// border:1rpx solid red;
	}

	.position_img {
		top: 50%;
		transform: translateY(-50%);
		margin-right: 20rpx;
	}

	.shouchi {
		width: 340rpx;
		margin-top: 10rpx;
		margin-left: 42rpx;
	}
</style>
