/**
 * Hetsdk iOS-patch v1.0.1
 * Copyright: Shenzhen H&T Intelligent Control Co., Ltd.
 * Date: 2016-11-31
 */

;(function(){
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.bindJavaScript && window.webkit.messageHandlers.bindJavaScript.postMessage) {
        window.bindJavaScript = {
            config : function(data) {
                var data = [
                    {key : 'data', value : data}
                ];
                callOC('config', data);
            },
            send : function(dataString, sucCallbackId, errCallbackId) {
                var data = [
                    {key : 'data', value : dataString },
                    {key : 'sucCallbackId', value : sucCallbackId },
                    {key : 'errCallbackId', value : errCallbackId }
                ];
                callOC('send', data);
            },
            setTitle : function(title) {
                var data = [
                    {key : 'data', value : title }
                ];
                callOC('setTitle', data);
            },
            tips : function(msg) {
                var data = [
                    {key : 'data', value : msg }
                ];
                callOC('tips', data);
            },
            relProxyHttp : function(path, dataString, type, sucCallbackId, errCallbackId, needSign) {
                var data = [
                    {key : 'url', value : path },
                    {key : 'data', value : dataString },
                    {key : 'type', value : type },
                    {key : 'sucCallbackId', value : sucCallbackId },
                    {key : 'errCallbackId', value : errCallbackId },
                    {key : 'needSign', value : needSign }
                ];
                callOC('relProxyHttp', data);
            },
            absProxyHttp : function(path, dataString, type, sucCallbackId, errCallbackId) {
                var data = [
                    {key : 'url', value : path },
                    {key : 'data', value : dataString },
                    {key : 'type', value : type },
                    {key : 'sucCallbackId', value : sucCallbackId },
                    {key : 'errCallbackId', value : errCallbackId }
                ];
                callOC('absProxyHttp', data);
            }
        };

        function callOC(func, params){
            var url = 'func=' + func + ':';
            for (var i=0; i<params.length; i++) {
                url = url + '&' + params[i].key + '=' + encodeURIComponent(params[i].value);
            }
            window.webkit.messageHandlers.bindJavaScript.postMessage(url);
        }
    }
})();
