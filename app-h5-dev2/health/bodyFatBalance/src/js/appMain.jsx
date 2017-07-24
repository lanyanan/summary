// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';

import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

import  LoadMainData from  './components/LoadMainData.jsx';
import  PromptMeasure from  './components/PromptMeasure.jsx';
import MeasureMesList from './components/MeasureMesList.jsx';

var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=> {
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {}
    });
});

het.ready((data)=> {
    Actions.ready(data);

});

// 接收app推送数据
het.repaint((data)=> {
    Actions.repaint(data);
});

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store
    }

    handleSwitch() {
        console.log(JSON.stringify(this.state))
    }

    componentDidMount() {
        //Actions.getData();
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
        window.addEventListener('resize', function () {
            document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
        }, false);
        //let dataJson = {
        //    "data": {
        //        "pager": {
        //            "totalRows": 0,
        //            "pageRows": 20,
        //            "pageIndex": 1,
        //            "paged": false,
        //            "pageEndRow": 19,
        //            "totalPages": 0,
        //            "hasNextPage": false,
        //            "hasPrevPage": false,
        //            "pageStartRow": 0,
        //            "currPageRows": 0,
        //            "defaultPageRows": 20
        //        },
        //        "list": [
        //            {
        //                "dataId": "1",//数据唯一标识
        //                "dataTime": "2016-06-15 10:20:14", //测量时间
        //                "weight": "46.4",  // 体重（公斤）
        //                "fatRate": "10.4",  // 脂肪率
        //                "boneWeight": "16.3",  // 骨量
        //                "meatRate": "6.4",  // 肌肉比例
        //                "metabolismRate": "3.4",  // 基础代谢率
        //                "moistureRate": "5.6"//水分比例
        //            },
        //            {
        //                "dataTime": "2016-06-06 12:22:09", //测量时间
        //                "weight": "46.4",  // 体重（公斤）
        //                "fatRate": "10.4",  // 脂肪率
        //                "boneWeight": "16.3",  // 骨量
        //                "meatRate": "6.4",  // 肌肉比例
        //                "metabolismRate": "3.4",  // 基础代谢率
        //                "moistureRate": "5.6"  //水分比例
        //            },
        //            {
        //                "dataTime": "2016-06-11 15:10:23", //测量时间
        //                "weight": "46.4",  // 体重（公斤）
        //                "fatRate": "10.4",  // 脂肪率
        //                "boneWeight": "16.3",  // 骨量
        //                "meatRate": "6.4",  // 肌肉比例
        //                "metabolismRate": "3.4",  // 基础代谢率
        //                "moistureRate": "5.6"//水分比例
        //            },
        //            {
        //                "dataTime": "2016-06-15 15:22:44", //测量时间
        //                "weight": "46.4",  // 体重（公斤）
        //                "fatRate": "10.4",  // 脂肪率
        //                "boneWeight": "16.3",  // 骨量
        //                "meatRate": "6.4",  // 肌肉比例
        //                "metabolismRate": "3.4",  // 基础代谢率
        //                "moistureRate": "5.6"//水分比例
        //            }
        //        ]
        //    },
        //    "code": 0
        //}
        //function groupData(data) {
        //    var newData = {};
        //    var arrData = [];
        //    // 分组
        //    data = data.data.list;
        //    for (var i in data) {
        //        var key = data[i].dataTime.replace(/\s.+$/, '');
        //        if (!newData[key]) {
        //            newData[key] = [];
        //        }
        //        newData[key].push(data[i]);
        //    }
        //    // 排序
        //    for (var j in newData) {
        //        newData[j].sort(function (a, b) {
        //            return a.dataTime > b.dataTime;
        //        });
        //        arrData.push(newData[j]);
        //    }
        //    arrData.sort(function (a, b) {
        //        return a[0].dataTime < b[0].dataTime;
        //    });
        //    return arrData;
        //}
        ////console.log(groupData(dataJson));
        //function sucCallback(data) {
        //    let user_str = '',
        //        len = data.length,
        //        str_ul = '',
        //        str = '',
        //        weight = data[0][0].weight,
        //        fatRate = data[0][0].fatRate,
        //        boneWeight = data[0][0].boneWeight;
        //    user_str += '<li><img class="user-port" src="./../static/img/user-mes.png"/></li>' +
        //        ' <li><span>体重</span><span class="bigger-date">' + weight + 'kg</span></li>' +
        //        '<li><span>脂肪率</span><span class="bigger-date">' + fatRate + '%</span></li>' +
        //        '<li><span>BMI</span><span class="bigger-date">' + boneWeight + '</span></li>';
        //
        //    for (var i = 0; i < len; i++) {
        //        let len_j = data[i].length,
        //            dataTime_d = data[i][0].dataTime.split(' ')[0].substring(5).replace('-', '月');
        //        str_ul = '';
        //        for (var j = 0; j < len_j; j++) {
        //            let dataTime_h = data[i][j].dataTime.split(' ')[1].substring(3),
        //                weight = data[i][j].weight,
        //                fatRate = data[i][j].fatRate,
        //                data_Id = data[i][j].dataId;
        //
        //            str_ul +=
        //                '<li class="c-info-li" data_id="' + data_Id + '" weight=' + data[i][j].weight + '   fatRate= ' + data[i][j].fatRate + ' waterPrc =' + data[i][j].metabolismRate + ' musclePrc=' + data[i][j].meatRate + '  dateMetal=' + data[i][j].metabolismRate + ' >' +
        //                '<div class="c-date-l">' +
        //                '<span class="c-date-l-span-l">' +
        //                '<img class="c-date-l-span-l-pic" src="./../static/img/cricle-left.png"/>' + dataTime_h + '</span><span>weight:' + weight + '</span><span>fat%:' + fatRate + '</span>' +
        //                '<a title="del" class="c-date-r"><img class="c-date-r-pic" src="./../static/img/delete-pic.png"/></a>' +
        //                '</div>' +
        //                '</li>';
        //        }
        //        str += '<span class="c-client-date">' + dataTime_d + '日</span>'
        //            + '<ul class="c-info-ul">'
        //            + str_ul +
        //            '</ul>';
        //    }
        //    document.getElementById('client-information').innerHTML = '';
        //    document.getElementsByClassName('user-message-ul')[0].innerHTML = '';
        //
        //    document.getElementById('client-information').innerHTML = str;
        //    document.getElementsByClassName('user-message-ul')[0].innerHTML = user_str;
        //}
        //sucCallback(groupData(dataJson));
        //function GetSlideAngle(dx, dy) {
        //    return Math.atan2(dy, dx) * 180 / Math.PI;
        //}
        ////根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
        //function GetSlideDirection(startX, startY, endX, endY) {
        //    var dy = startY - endY;
        //    var dx = endX - startX;
        //    var result = 0;
        //
        //    //如果滑动距离太短
        //    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        //        return result;
        //    }
        //
        //    var angle = GetSlideAngle(dx, dy);
        //    if (angle >= -45 && angle < 45) {
        //        result = 4;
        //    } else if (angle >= 45 && angle < 135) {
        //        result = 1;
        //    } else if (angle >= -135 && angle < -45) {
        //        result = 2;
        //    }
        //    else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        //        result = 3;
        //    }
        //
        //    return result;
        //}
        ////滑动处理
        //let startX, startY;
        //$('.c-info-li').on('touchstart', function (ev) {
        //    startX = ev.touches[0].pageX;
        //    startY = ev.touches[0].pageY;
        //}, false);
        //$('.c-info-li').on('touchend', function (ev) {
        //    let endX, endY, data = {};
        //    data.weight = ev.currentTarget.getAttribute('weight'),
        //    data.fatRate = ev.currentTarget.getAttribute('fatRate'),
        //    data.waterPrc = ev.currentTarget.getAttribute('waterPrc'),
        //    data.musclePrc = ev.currentTarget.getAttribute('musclePrc'),
        //    data.dateMetal = ev.currentTarget.getAttribute('dateMetal');
        //    endX = ev.changedTouches[0].pageX;
        //    endY = ev.changedTouches[0].pageY;
        //    var direction = GetSlideDirection(startX, startY, endX, endY);
        //    switch (direction) {
        //        case 0:
        //            //console.log("没滑动", data);
        //            het.send(data, function () {
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
        //    if(ev.currentTarget.getAttribute('title')=='del'){
        //        if ($(this).parent().parent().parent().find('ul li').length == 1) {
        //            //信息框
        //            layer.open({
        //                title: 'ps:温馨提示',
        //                content: '您至少要保留一条记录，以便我们可以记录到您的身体变化。',
        //                btn: ['我知道了']
        //            });
        //            $('.c-info-li').removeClass('selected');
        //        } else {
        //            //回传删除数据
        //            let dataId_ = $(this).parent().parent().attr('data_id');
        //            Actions.postData(dataId_);
        //            $(this).parent().parent().remove();
        //        }
        //    }
        //}, false);
        //$('.c-date-r').on('touchend', function(e){
        //        e.preventDefault();
        //        e.stopPropagation();
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
        //        let dataId_ = $(this).parent().parent().attr('data_id');
        //        Actions.postData(dataId_);
        //        $(this).parent().parent().remove();
        //    }
        //});
    }

    render() {
        console.log(this.state,this.state.img,this.state.nickname);
        return (
            <div id='confirmData'>
                {this.state.data ? <LoadMainData mydata={this.state.data} myuserMes={this.state.img} myname={this.state.nickname}/> :
                <PromptMeasure userdata={this.state.img} myname={this.state.nickname}/>}
            </div>
        )
    }
}

// 开始渲染
het.domReady(()=> {
    het.setTitle('体脂秤');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('R  OOT'));

    // 路由方式0
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path='/' component={App}/>
        </Router>
    ), document.getElementById('ROOT'));
});




