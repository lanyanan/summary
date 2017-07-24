/**
 * Created by Administrator on 2016-08-18.
 */
import {BaseComponent} from '../../../../common/src/BaseComponent.class.es6';
import {Actions} from '../Actions.es6';
import {Store} from '../Store.es6';
import {Funs} from '../../../../common/src/fun.es6';
let startX, startY;

// 创建React组件
export class MeasureMesList extends BaseComponent {
    constructor(props) {
        super(props);

    }

    touchSendStart(e) {
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
        let userAgent = navigator.userAgent;
        let index = userAgent.indexOf("Android");
        if (index >= 0) {
            let androidVersion = parseFloat(userAgent.slice(index + 8));
            if (androidVersion < 5) {
                e.preventDefault();
                e.stopPropagation();
            }
        } else {
            //e.preventDefault();
            e.stopPropagation();
        }

    }

    touchSendEnd(ev) {
        //ev.preventDefault();
        //ev.stopPropagation();
        function GetSlideAngle(dx, dy) {
            return Math.atan2(dy, dx) * 180 / Math.PI;
        }

        function GetSlideDirection(startX, startY, endX, endY) {
            var dy = startY - endY;
            var dx = endX - startX;
            var result = 0;
            //如果滑动距离太短
            if (Math.abs(dx) < 3 && Math.abs(dy) < 3) {
                return result;
            }
            var angle = GetSlideAngle(dx, dy);
            if (angle >= -45 && angle < 45) {
                result = 4;
            } else if (angle >= 45 && angle < 135) {
                result = 1;
            } else if (angle >= -135 && angle < -45) {
                result = 2;
            }
            else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                result = 3;
            }
            return result;
        }

        function Siblings(elem) {
            var a = [];
            var b = elem.parentNode.children;
            for (var i = 0; i < b.length; i++) {
                if (b[i] !== elem) a.push(b[i]);
            }
            return a;
        };
        var browser = {
            versions: function () {
                var u = navigator.userAgent, app = navigator.appVersion;
                return {         //移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                };
            }(),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        };
        let endX, endY, e = ev.currentTarget.getAttribute('title');
        endX = ev.changedTouches[0].pageX;
        endY = ev.changedTouches[0].pageY;
        let direction = GetSlideDirection(startX, startY, endX, endY);
        let userAgent = navigator.userAgent;
        let index = userAgent.indexOf("Android");
        switch (direction) {
            case 0:
                //console.log("没滑动");
                let event = ev.currentTarget.getAttribute('name');
                console.log('health://skip_url/userMes/' + event);
                window.location.href = 'health://skip_url/userMes/' + event;
                break;
            case 1:
                console.log('up');

                if (index >= 0) {
                    let androidVersion = parseFloat(userAgent.slice(index + 8));
                    if (androidVersion < 5) {
                        document.body.scrollTop += 190;
                    }
                }
                break;
            case 2:
                console.log("down");

                if (index >= 0) {
                    let androidVersion = parseFloat(userAgent.slice(index + 8));
                    if (androidVersion < 5) {
                        document.body.scrollTop -= 220;
                    }
                }
                break;
            case 3:
                ev.currentTarget.classList.toggle('selected');
                for (var i = 0; i < Siblings(ev.currentTarget).length; i++) {
                    Siblings(ev.currentTarget)[i].classList.remove('selected');
                }
                //for (var k = 0; k < Siblings(ev.currentTarget.parentNode).length; k++) {
                //    console.log(Siblings(ev.currentTarget).length);
                //    //console.log(Siblings(ev.currentTarget.parentNode.children).length);
                //    for (var j=0;j<Siblings(ev.currentTarget.parentNode)[k].children.length;j++){
                //        //console.log(Siblings(ev.currentTarget.parentNode)[k].children.length,Siblings(ev.currentTarget.parentNode)[k].children)
                //        Siblings(ev.currentTarget.parentNode)[k].children[j].classList.remove('selected');
                //    }
                //}
                break;
            case 4:
                ev.currentTarget.classList.remove('selected');
                break;
            default:
        }
    }

    touchDel(eve) {
        //eve.preventDefault();
        eve.stopPropagation();
        let event = eve.currentTarget.getAttribute('title');
        let eLen = eve.currentTarget.getAttribute('name');
        //Actions.onDelete(event);
        if (eLen == 1) {
            layer.open({
                title: '温馨提示',
                content: '您至少要保留一条记录，以便我们可以记录到您的身体变化。',
                btn: ['我知道了']
            });
        } else {
            Actions.postDate(event);
            console.log(event, 'del');
        }
    }


    render() {
        let items = this.props.mesData;

        return (
            <div>
                <span className='c-client-date'>{(items[0].dataTime || '').split(' ')[0].substring(5).replace('-', '月')}日</span>
                <ul className='c-info-ul'>
                    {items.map(function (it, idx) {
                        let lens = items.length;
                        let its = '&' + it.bmiRate + '&' + it.weight + '&' + it.fatRate + '&' + it.meatRate + '&' + it.metabolismRate + '&' + it.moistureRate+'&'+it.boneWeight;
                        var dataTime=Funs.dateFormat( it.dataTime, 'yyyy-MM-dd hh:mm:ss', true);
                        return <li onTouchStart={this.touchSendStart.bind(this)}
                                   onTouchEnd={this.touchSendEnd.bind(this)}
                                   className='c-info-li' key={idx} title={it.dataId} name={its}>
                            <div className='c-date-l'>
                                    <span className='c-date-l-span-l'>
                                        <img className='c-date-l-span-l-pic' src='./../static/img/cricle-left.png'/>
                                        {dataTime.substring(11, 16)}</span><span>weight:{it.weight}kg</span><span>fat:{it.fatRate}%
                                    </span>
                                <a className='c-date-r' onTouchStart={this.touchDel.bind(this)} name={lens}
                                   title={it.dataId}>
                                    <img className='c-date-r-pic' src='./../static/img/delete-pic.png'/> </a>
                            </div>
                        </li>
                    }.bind(this))}
                </ul>
            </div>
        )
    }

}
;
export default MeasureMesList;
//componentWillUpdate() {
//    function GetSlideAngle(dx, dy) {
//        return Math.atan2(dy, dx) * 180 / Math.PI;
//    };
//    //根据起点和终点返回方向s 1：向上，2：向下，3：向左，4：向右,0：未滑动
//    function GetSlideDirection(startX, startY, endX, endY) {
//        var dy = startY - endY;
//        var dx = endX - startX;
//        var result = 0;
//
//        //如果滑动距离太短
//        if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
//            return result;
//        }
//
//        var angle = GetSlideAngle(dx, dy);
//        if (angle >= -45 && angle < 45) {
//            result = 4;
//        } else if (angle >= 45 && angle < 135) {
//            result = 1;
//        } else if (angle >= -135 && angle < -45) {
//            result = 2;
//        }
//        else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
//            result = 3;
//        }
//
//        return result;
//    };
//    //滑动处理
//    let startX, startY;
//}
//$('.c-info-li').on('touchstart', function (ev) {
//    startX = ev.touches[0].pageX;
//    startY = ev.touches[0].pageY;
//}, false);
//$('.c-info-li').on('touchend', function (ev) {
//    let endX, endY, data = {};
//    endX = ev.changedTouches[0].pageX;
//    endY = ev.changedTouches[0].pageY;
//    var direction = GetSlideDirection(startX, startY, endX, endY);
//    switch (direction) {
//        case 0:
//            //console.log("没滑动", data);
//            let dataId_ = $(this).parent().parent().attr('title');
//            het.send(dataId_, function () {
//                console.log('send suc');
//            }, function () {
//                console.log('send fail');
//            });
//            break;
//        case 1:
//            //console.log("向上");
//
//            break;
//        case 2:
//            //console.log("向下")
//
//            break;
//        case 3:
//            //console.log("向左");
//            $(this).addClass('selected').parent().siblings().find(".c-info-li").removeClass('selected');
//            break;
//        case 4:
//            //console.log("向右");
//            $(this).removeClass('selected').siblings().find(".c-info-li").removeClass('selected');
//            break;
//        default:
//    }
//
//}, false);
//$('.c-date-r').on('touchend', function (e) {
//    e.preventDefault();
//    e.stopPropagation();
//});
//$('.c-date-r').on('touchstart', function (e) {
//    e.preventDefault();
//    e.stopPropagation();
//    if ($(this).parent().parent().parent().find('ul li').length == 1) {
//        //信息框
//        layer.open({
//            title: 'ps:温馨提示',
//            content: '您至少要保留一条记录，以便我们可以记录到您的身体变化。',
//            btn: ['我知道了']
//        });
//        $('.c-info-li').removeClass('selected');
//    } else {
//        //回传删除数据
//        //let dataId_ = $(this).parent().parent().attr('data_id');
//        $(this).parent().parent().remove();
//    }
//});