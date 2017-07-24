//import {Store} from './Store.es6';
//import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Link} from 'react-router';
import Path from './ApiPath.es6';
// import Actions from './Actions.es6';
// import Store from './Store.es6';
// delCookie: function(name) {
//     var date = new Date();
//     date.setTime(date.getTime() - 10000);   
//     document.cookie = name + "=a; expires=" + date.toGMTString() + ";path=*";
// }
const App = React.createClass({
    // mixins: [Reflux.connect(Store,'status')],
    getInitialState: function(){
        return {
        }
    },
    GetQueryString: function(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null) return decodeURI(r[2]);
         return null;
    },
    getCookie: function(c_name) {
        if (document.cookie.length>0) {
            var c_start=document.cookie.indexOf(c_name + "=");
            if (c_start!=-1) { 
                c_start=c_start + c_name.length+1 ;
                var c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
                return unescape(document.cookie.substring(c_start,c_end));
            }
        }
        return "";
    },
    setCookie: function(c_name,value,expiredays,path) {
        var exdate=new Date();
        exdate.setTime(exdate.getTime()+expiredays * 24 * 60 * 60 * 1000);
        document.cookie=c_name+ "=" +escape(value)+ ((expiredays==null) ? "" : ";expires="+exdate.toGMTString()) + ";" + ((path==null) ? "" : "path=" + escape(path));
    },
    setWechatId: function(){
        function setCookie(c_name,value,expiredays,path) {
            var exdate=new Date();
            exdate.setTime(exdate.getTime()+expiredays * 24 * 60 * 60 * 1000);
            document.cookie=c_name+ "=" +escape(value)+ ((expiredays==null) ? "" : ";expires="+exdate.toGMTString()) + ";" + ((path==null) ? "" : "path=" + escape(path));
        };
        function getQueryString(name){
             var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
             var r = window.location.search.substr(1).match(reg);
             if(r!=null) return decodeURI(r[2]);
             return null;
        };
        //setCookie('wechatUserId',10280,0.5,'/');
        //var routerFirst = location.host == 'weixin.clife.cn'? "/clife-wechat": "/clife-wechat-test";
        var routerFirst =  Path.wPath;
        var _this=this;
         // weixin.clife.cn/clife-wechat-test/wechat/user/login?format=json&type=1&redirect=http://weixin.clife.cn/web-wechat/hotel/v1/wisdomBox/page/index.html#/
         //获取授权wechatId
               var getCookie = function(name) {
                   var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                   if (arr = document.cookie.match(reg)) {
                       return unescape(arr[2]);
                   } else {
                       return null;
                   }
               };
         //微信授权
         var hasCookie = function(name) {
                var wechatId = getCookie(name);
                if (wechatId == "" || wechatId == null || wechatId == undefined) {
                    //console.log('-------------请求id--')
                    //"http://weixin.clife.cn/clife-wechat-test" + "/wechat/user/login?format=json&type=1&redirect=" + location.href;
                    var url =  routerFirst + "/wechat/hotel/user/login?format=json&type=1&redirect=" + location.href;
                    //console.log(url)
                    window.location.href = url;
                }else{
                    //console.log('设置WeChatUserId成功');
                    $.ajax({
                            url: Path.wPath+'/wechat/hotel/getToken',
                            dataType: 'json',
                            cache:true,
                            async:false,
                            success: function(r){
                                if(r.code==0){
                                        var access = r.data;
                                        setCookie('accessToken',access,0.5,'/');
                                        //console.log('设置accessToken成功');
                                        // Actions.getScene();
                                    } 
                                }
                        });
                }

                
            };
            
            hasCookie('wechatUserId');
    },
    componentDidMount: function(){
        this.setWechatId();
    },
    closeApp: function(e){
        e.preventDefault();
        e.stopPropagation();
        $('#appdownload').css({display: 'none'});
        $('#m-tabselect').css({bottom: 0});
        this.setState({
            close: true
        })
    },
    render: function(){
        var children = this.props.children;
        var actSty = {color: '#297A34',borderBottom: '2px solid #297A34'};
        var len = this.props.routes.length;
        //console.log(len);
        var tablist = (
               <ul className="tablist flex">
                   <li className="flex"><Link to={{pathname:"list"}} activeStyle={actSty}>设备列表</Link></li>
                   <li className="flex"><Link to={{pathname:"data"}} activeStyle={actSty}>实时数据</Link></li>
                   <li className="flex"><Link to={{pathname:"sleep"}} activeStyle={actSty}>睡眠报告</Link></li>
                   <li className="flex"><Link to={{pathname:"scene"}} activeStyle={actSty}>场景开关</Link></li>
               </ul> 
            )
        var isTablist = len>2?null:tablist;
        let idName = this.state.close?'':'appdownload';
        return (
                <div>
                    <div className="m-tabselect" id="m-tabselect">
                        {isTablist}
                        <div className="tabcontent">
                            {children}
                        </div>
                    </div>   
                    <div className="appdownload" id={idName}>
                        <div className="app-contain flex">
                            <em className="close" id="close" onTouchEnd={this.closeApp}></em>

                            <img src="../static/img/clife.png" alt="clife" className="clife"/>
                            
                            <p>呵护您的点滴睡眠，下载APP可以享受更多服务</p>
                            
                            <a href="http://ab.hetyj.com/app/Clife-CSleep/index.html">立即下载</a>
                        </div>
                        
                    </div>
                    
                </div>
                 
        );
    }
});

export default App;