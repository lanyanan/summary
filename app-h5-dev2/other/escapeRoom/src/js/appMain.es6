import ReactMixin from 'react-mixin';

import {globStore} from './stores/globStore';

import Loader from './components/loader';
import Cartoon from './components/cartoon';
import Game from './components/game';
import RankList from './components/rankList';
import gMain from './config';


class App extends React.Component{
    constructor(){
        super();
    }

    componentWillMount(){ 
        if(window.orientation == 90 || window.orientation == -90){
            window.ver = false;
        }else{
            window.ver = true;
        }
        window.addEventListener('orientationchange', function(event){
            if(window.orientation == 90 || window.orientation == -90){
                window.ver = false;
            }else{
                window.ver = true;
            }
            // 横竖屏切换
            autoSize();
        });
    }

    render(){
        let { step, loaded, cindex, showRank } = this.state.app;

        return (
            <div className='page'>
                {step === 1 && <Loader />}

                {loaded && <Cartoon hide={step !== 2} cindex={cindex} />}

                {loaded && <Game hide={step !== 3} />}

                {loaded && <RankList hide={!showRank} />}
            </div>
        )
    }
}

ReactMixin.onClass(App, Reflux.connect(globStore,'app'));





window.onload = function(){

    ReactDOM.render(<App/>, document.getElementById('ROOT'));
    
    // 禁止滑动事件
    document.addEventListener('touchmove', function (event) {
        event.preventDefault();
    });

    // 初始化可视区域
    autoSize();

    // 获取微信签名
    Ajax.get(gMain.env.apiPath + 'wechat/jssdk/sign',function(text){
        var data = JSON.parse(text);
        data = data && data.data;
        window.appId = data.appId;

        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature,// 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone']
        });

        var title = '全球仅3人能在60秒内通关!',
            link = gMain.env.frontPath + 'escapeRoom/page/index.html',
            desc = '通关有好礼，70秒内通关还能申领神秘大礼',
            imgUrl =gMain.env.frontPath + 'escapeRoom/static/images/share2.png';

        wx.ready(function(){
            wx.onMenuShareTimeline({
                title: title,
                link: link, // 分享链接
                imgUrl: imgUrl // 分享图标
            });

            wx.onMenuShareAppMessage({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl // 分享图标
            });

            wx.onMenuShareQQ({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl // 分享图标
            });

            wx.onMenuShareWeibo({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl // 分享图标
            });

            wx.onMenuShareQZone({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl // 分享图标
            })
        })
    })

    // 获取用户信息
    Ajax.get(gMain.env.apiPath + 'wechat/user/get?wechatId=' + gMain.wechatId, function(res){
        res = JSON.parse(res);
        gMain.userInfo = res.data;
    })
}

// 根据屏幕大小（屏幕转动）调整可视区域大小及样式
function autoSize(){
    var root = document.getElementById('ROOT');
    var dom = document.querySelector('.tip_icon');
    var scale = 750/1334, height, width, marginTop=0, marginLeft=0,
        chei = document.documentElement.clientHeight,
        cwid = document.documentElement.clientWidth;

    if(cwid > chei){
        window.isRotate = false;
        if(dom){
            dom.style.left = 'initial'
            dom.style.right = 0;
            dom.src = '../static/images/cover/12.png';
        }

        root.style.transform = 'rotate(0deg)';
       
        if(chei/cwid > scale){
            width = cwid;
            height = cwid * scale;
            marginTop = (chei - height)/2;
        }else{
            height = chei;
            width = chei / scale;
            marginLeft = (cwid - width)/2;
        }

         mediaQue(height);

        root.style.height = height + 'px';
        root.style.width = width + 'px';

        root.style.paddingTop = marginTop + 'px';
        root.style.paddingBottom = marginTop + 'px';
        root.style.paddingLeft = marginLeft + 'px';
        root.style.paddingRight = marginLeft + 'px';
        root.style.top = 0;
        root.style.left = 0;
    }else{

        window.isRotate = true;
        if(dom){
            dom.style.left = 0;
            dom.style.right = 'initial';
            dom.src = '../static/images/cover/11.png';
        }

        root.style.transform = 'rotate(90deg)';
        
        if(chei/cwid > scale){
            width = chei;
            height = chei * scale;
            marginTop = (cwid - height)/2;
        }else{
            height = chei;
            width = chei / scale;
            marginLeft = (cwid - width)/2;
        }

        mediaQue(height);

        root.style.height = height + 'px';
        root.style.width = width + 'px';

        root.style.paddingTop = marginTop + 'px';
        root.style.paddingBottom = marginTop + 'px';
        root.style.paddingLeft = marginLeft + 'px';
        root.style.paddingRight = marginLeft + 'px';
        root.style.top = 1/2*(chei-cwid) + 'px';
        root.style.left = -1/2*(chei-cwid) + 'px';
    }
}

// js媒体查询（根据屏幕大小设置html字体大小）
function mediaQue(s){
    var body = document.getElementsByTagName('html')[0], size = '100%';

    switch(true){
        case s <= 320: size = '60%'; break;
        case s <= 350: size = '68%'; break;
        case s <= 380: size = '75%'; break;
        case s <= 410: size = '83%'; break;
        case s <= 440: size = '89%'; break;
        case s <= 470: size = '95%'; break;
        case s <= 500: size = '102%'; break;
        case s <= 539: size = '108%'; break;
        case s > 539: size = '115%'; break;
    }

    body.style.fontSize = size;
}

