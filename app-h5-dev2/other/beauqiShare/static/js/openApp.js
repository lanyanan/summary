/**
   * app开启/下载引导程序
   * @param  {templete} tpl 顶部引导模板
   */
window.appLeader = function(){
      var testTime = 500; // 检测时间
      var isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));
      var isAndroid = !!(navigator.userAgent.match('Android'));
      var isOther = !isIOS&&!isAndroid;
      var ifr = $("#ifrAppLeader").length ? $("#ifrAppLeader") : $('<iframe id="ifrAppLeader" style="display:none;"></iframe>').appendTo("body");
      var scheme; // 启动app的协议
      var url; // 下载地址
      var el=$('.jump'); // 引导模块dom
      if (isIOS) {
          scheme = "HETCBeauty://"; // ios启动协议
          url = "http://ab.hetyj.com/app/CBeauty/index.html"; // ios下载链接
      }else if (isAndroid) {
          // scheme = "sms://13666123456"; // scheme测试
          scheme = "cbeauty://cbeauty_start_splash"; // android启动协议
          url = "http://ab.hetyj.com/app/CBeauty/index.html"; // android下载链接
      } else {
          url = ""; // 桌面网页下载链接
      }

      el.on("touchstart", function(e){
          tryOpenApp(scheme, url);
      });

      return el;

      /**
       * 尝试打开app
       * @param  {string} scheme 启动app的协议
       * @param  {string} url    app下载地址，当启动失败时，跳转到该地址
       */
      function tryOpenApp(scheme, url) {
          var t1 = +new Date(), t2;
          var hasApp;
          ifr.attr("src", scheme);
          setTimeout(function(){
              var t2 = +new Date();
              if (!t1 || t2 - t1 < testTime + 100) {
                  hasApp = false;
                  window.location.href = url; // 没有app，跳转到下载页
              } else {
                  hasApp = true;
              }
          }, testTime);
      }

  }