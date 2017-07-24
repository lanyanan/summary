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
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="format-detection" content="telephone=no">
<title>智能设备自助接入系统</title>
<link rel="stylesheet" href="https://cms.clife.cn/mobile/app-h5/static/css/reset.css">
<link rel="stylesheet" href="https://cdn.bootcss.com/Swiper/3.3.1/css/swiper.min.css">
<style>${cssString}</style>
<script>
window.onerror = function(msg,url,line){
	alert(msg);
	alert(url);
	alert(line);
}
</script>
<style>
	html,body{
	  font-size:75%;
	}
	*{
		-webkit-touch-callout:none;
		-webkit-user-select:none;
		-khtml-user-select:none;
		-moz-user-select:none;
		-ms-user-select:none;
		user-select:none;
	}
	#pagebody::-webkit-scrollbar-track
	{
		display:none;
		-webkit-box-shadow: inset 0 0 1px rgba(0,0,0,0.3);
		background-color: #F5F5F5;
	}

	#pagebody::-webkit-scrollbar
	{
		width: 1px;
		background-color: #F5F5F5;
	}

	#pagebody::-webkit-scrollbar-thumb
	{
		background-color: #FFFFFF;
	}
	#pagebody::-webkit-scrollbar-track-piece  
	{
		display:none;
	}
	@media screen and (max-width: 320px) {
	    html,body{font-size:62.5%}
	}
	@media screen and (min-width: 321px) and (max-width:350px) {
	    @media screen and (-webkit-min-device-pixel-ratio: 2){
	        html,body{font-size:71.62%}
	    }
	    @media screen and (-webkit-min-device-pixel-ratio: 3){
	        html,body{font-size:68.75%}
	    }
	}
	@media screen and (min-width: 351px) and (max-width:380px) {
		@media screen and (-webkit-min-device-pixel-ratio: 2){
	        html,body{font-size:75%}
	    }
	    @media screen and (-webkit-min-device-pixel-ratio: 3){
	        html,body{font-size:71.98%}
	    }
	}
	@media screen and (min-width: 381px) and (max-width:410px) {
	    @media screen and (-webkit-min-device-pixel-ratio: 2){
	        html,body{font-size:79.02%}
	    }
	    @media screen and (-webkit-min-device-pixel-ratio: 3){
	        html,body{font-size:75.84%}
	    }
	}
	@media screen and (min-width: 411px) and (max-width:440px) {
	    @media screen and (-webkit-min-device-pixel-ratio: 2){
	        html,body{font-size:86.28%}
	    }
	    @media screen and (-webkit-min-device-pixel-ratio: 3){
	        html,body{font-size:82.8%}
	    }
	}
	@media screen and (min-width: 441px) and (max-width:470px) {
	    @media screen and (-webkit-min-device-pixel-ratio: 2){
	        html,body{font-size:97.66%}
	    }
	    @media screen and (-webkit-min-device-pixel-ratio: 3){
	        html,body{font-size:93.75%}
	    }
	}
	@media screen and (min-width: 471px) and (max-width:500px) {
	    @media screen and (-webkit-min-device-pixel-ratio: 2){
	        html,body{font-size:104.17%}
	    }
	    @media screen and (-webkit-min-device-pixel-ratio: 3){
	        html,body{font-size:100%}
	    }
	}
	@media screen and (min-width: 501px) and (max-width:539px) {
	    @media screen and (-webkit-min-device-pixel-ratio: 2){
	        html,body{font-size:110.68%}
	    }
	    @media screen and (-webkit-min-device-pixel-ratio: 3){
	        html,body{font-size:106.25%}
	    }
	}
	@media screen and (min-width: 540px) {
	    html,body{font-size: 150%}
	}
</style>
<script src="https://cms.clife.cn/mobile/app-h5/static/js/reactFrame.js"></script>
<script src="https://cms.clife.cn/mobile/app-h5/static/js/core/hetsdk.js?v=2.0.1"></script>
<script src="https://cdn.bootcss.com/Swiper/3.4.0/js/swiper.min.js"></script>
</head>
<body style="overflow-x:hidden;width:100%;" id="Iframe">
</body>
<script>${jsString}</script>
</html>`;
/*<script src='https://127.0.0.1:8888/target/target-script-min.js#anonymous'></script>*/
