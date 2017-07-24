'use strict';
/**
 * 移动设备HTML模板
 * @author   vilien
 * @datetime 2016-01-11
 */

export const getTemplate = (cssString, jsString)=>
`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=375, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="format-detection" content="telephone=no">
<title>智能设备自助接入系统</title>
<link rel="stylesheet " href="http://cms.clife.cn/mobile/app-h5/static/css/reset.css">
<style>
		
	#Iframe::-webkit-scrollbar-track
	{
		display:none;
		-webkit-box-shadow: inset 0 0 1px rgba(0,0,0,0.3);
		background-color: #F5F5F5;
	}

	#Iframe::-webkit-scrollbar
	{
		width: 1px;
		background-color: #F5F5F5;
	}

	#Iframe::-webkit-scrollbar-thumb
	{
		background-color: #FFFFFF;
	}
	#Iframe::-webkit-scrollbar-track-piece  
	{
		display:none;
	}
	.widgetName{
		width:35px!important;
		height:35px!important;
	}
</style>
<style>${cssString}</style>
<script src="http://cms.clife.cn/mobile/app-h5/static/js/reactFrame.js"></script>
<script src="http://weixin.clife.cn/web-wechat/hotel/v1/common/static/hetsdk.js"></script>
</head>
<body style="overflow-x:hidden" id="Iframe">
</body>
<script>${jsString}</script>
</html>`;