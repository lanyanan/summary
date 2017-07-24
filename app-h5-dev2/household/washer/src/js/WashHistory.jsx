/**
 * Created by yuanyunlong on 2017/2/17.
 */

import React , {Component} from 'react';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Loading} from './Loading.jsx';
import {orderDataArray, waterLevelDataArray, processDataArray, specialDataArray, washerModeS} from  './washerConstData.js';
import {Funs} from '../../../common/src/fun.es6';
import {setDeviceInfo, getDeviceInfo,hasSetRequest} from './DeviceTokenCache.js';

const  {Router, Route, hashHistory, Link} = ReactRouter;

var myScroll,
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset,
    generatedCount = 0;


let hasNextPage = false;
let isRequest = false;

let pageIndex = 0;
let powerTotal = 0;  // 总耗电量
let waterConsumeTotal = 0 ; //总好水量


// {
//     "waterTemp" : 0,
//     "washId" : 64,
//     "power" : 0,
//     "startTime" : "2017-02-09 12:43:04",
//     "mode" : 5,
//     "waterConsume" : 0,
//     "useTime" : 34
// }

let hasRequest = false;
let isIOS = true;
export class  WashHistory extends  BaseComponent {

        constructor(props){
            super(props);
            //this.listenStore(Store); // 监听Store
            this.state = {
                dataArray: [],
            }
            console.log(" his constructor");
        }

        componentWillMount(){
            het.setTitle(JSON.stringify({
                setNavTitle:1,
                title:'洗涤记录',
                setNavRightBtnHiden:1
            }));

            //导航栏:{ios:73,android:64}
            isIOS = !!(navigator.userAgent.match(/iPad|iPhone|iPod/));

            console.log('componentWillMount');
            pageIndex =0;
            hasRequest = false;  // 这个用来判断 render 的第一次请求
            isRequest = false;   // 这个用来记录是否正在请求
            this.setState({
                dataArray: [],
            });
            powerTotal = 0;  // 总耗电量
            waterConsumeTotal = 0 ; //总好水量

        }

        getWashHistoryData(doneAction){
            //let getUrl = 'http://200.200.200.50/v1/app/customization/fridge/hetFridge/power?appId='+this.state.appId+'&accessToken='+this.state.accessToken+'&deviceId='+this.state.deviceId+'&timestamp='+new Date().getTime();
            if(isRequest){

                if(typeof doneAction === "function"){
                    doneAction(null, null);
                }
                return;
            }

            console.log("getWashHistoryData");
            pageIndex++;
            this.setState({
                pageIndex:pageIndex
            });

            let requestInfo = getDeviceInfo();
            let url = '/v1/app/customization/mavell/getWashingList';
            let data = {
                "deviceId" :  requestInfo.deviceId,
                "pageIndex": pageIndex,
                "pageRows":'20'
            };

            let successcallback = function(data){
                let dataString =  data.toString();

                let jsondata = JSON.parse(dataString);
                jsondata = jsondata['data'];

                let marvellWashNaviPage = jsondata['marvellWashNaviPage'];
                let list = marvellWashNaviPage['list'] || [];

                powerTotal = jsondata['powerTotal'] || 0;
                waterConsumeTotal = jsondata['waterConsumeTotal'] || 0;
                let pageInfo = marvellWashNaviPage['pager'] || { "hasNextPage" : true,};
                hasNextPage = pageInfo['hasNextPage'] || false ;
                isRequest = false;
                if(typeof doneAction === "function"){
                    doneAction(list, null);

                }

            };
            let failedcallback = function(error){
                console.log("请求失败" +error.toString());
                isRequest = false;

                if(typeof doneAction === "function"){
                    doneAction(null, error);
                }
            }

            isRequest = true;
            het.get(url,data,successcallback,failedcallback,false)
        }
        componentDidMount() {
            this.loaded();

        }

        pullDownAction() {
            let that = this;
            pageIndex = 0;

            console.log('get request hahahaah');
            this.getWashHistoryData(function(data, error){
                if(error){
                    het.toast('请求失败！');
                }else if(data){
                    console.log('i receive data' + data.toString());
                    that.setState({
                        dataArray:data,
                    });
                }
                myScroll.refresh();

            });

            // setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
            //     let dataArray = that.state.dataArray;
            //     console.log("pullDownAction");
            //     let length = dataArray.length;
            //     dataArray.push(length);
            //     that.setState({
            //         dataArray : dataArray
            //     });
            //     myScroll.refresh();		//数据加载完成后，调用界面更新方法   Remember to refresh when contents are loaded (ie: on ajax completion)
            // }, 2000);	// <-- Simulate network congestion, remove setTimeout from production!
        }

        pullUpAction() {
            let that = this;

            console.log('get up request hahahaah');
            this.getWashHistoryData(function(data, error){
                if(error){
                    het.toast('请求失败！');
                    console.log('receive error');
                }else if(data){

                    let dataArray = that.state.dataArray;
                    let newDataArray = dataArray.concat(data);

                    that.setState({
                        dataArray:newDataArray,
                    })
                }
                myScroll.refresh();

            });

            // setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
            //     let dataArray = that.state.dataArray;
            //     console.log("pullUpAction");
            //     let length = dataArray.length;
            //     dataArray.push(length);
            //     that.setState({
            //         dataArray : dataArray
            //     });
            //     myScroll.refresh();		// 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
            // }, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
        }

        loaded() {

            pullDownEl = document.getElementById('pullDown');
            pullDownOffset = pullDownEl.offsetHeight;
            pullUpEl = document.getElementById('pullUp');
            pullUpOffset = pullUpEl.offsetHeight;

            this.pullDownAction = this.pullDownAction.bind(this);
            let self = this;
            myScroll = new iScroll('wrapper', {

                useTransition: false, /* 此属性不知用意，本人从true改为false */
                topOffset: pullDownOffset,
                onRefresh: function () {
                    if (pullDownEl.className.match('loadingProcess')) {
                        pullDownEl.className = '';
                       // pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                    } else if (pullUpEl.className.match('loadingProcess')) {
                        console.log("hello ");
                        pullUpEl.className = '';
                        if(hasNextPage){
                            console.log("hello 0");
                            pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                        }else{
                            console.log("hello 1");
                            pullUpEl.querySelector('.pullUpLabel').innerHTML = '没有更多数据了...';
                        }

                    }
                },
                onScrollMove: function () {
                    if (this.y > 5 && !pullDownEl.className.match('flip')) {
                        pullDownEl.className = 'flip';
                        // pullDownEl.querySelector('.pullDownLabel').innerHTML = '松手开始更新...';
                        this.minScrollY = 0;
                    } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                        pullDownEl.className = '';
                        // pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                        this.minScrollY = -pullDownOffset;
                    } else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                        pullUpEl.className = 'flip';
                        // pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
                        this.maxScrollY = this.maxScrollY;
                    } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                         pullUpEl.className = '';
                        // pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                        this.maxScrollY = pullUpOffset;
                    }
                },
                onScrollEnd: function () {
                    if (pullDownEl.className.match('flip')) {
                        pullDownEl.className = 'loadingProcess';
                        self.pullDownAction();	// Execute custom function (ajax call?)
                    } else if (pullUpEl.className.match('flip')) {
                        pullUpEl.className = 'loadingProcess';
                        if (hasNextPage) {
                            self.pullUpAction();	// Execute custom function (ajax call?)
                        }
                    }
                }

            });

            setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
        }

    render() {

        if(!hasRequest){
            this.pullDownAction();
            hasRequest = true;

            console.log("i request");
        }

        console.log("render");
        let navigation = isIOS ?' ios':' android';
        let marginTop = navigation ? 64 : 73;

        let screenheight = window.screen.height;
        let scrollHeight =  screenheight - marginTop;

        let dataArray = this.state.dataArray;
        let needToShowFooter =  ( dataArray.length > 19) ;

        // console.log('i am render a a a a aa a ');

        let pullUpStyle = needToShowFooter ? {visibility: 'visible'} : {visibility: 'hidden'};
        let pullUpContent = hasNextPage ? '上拉加载更多... ' : '没有更多数据了...';


            return (
                <div className="washhistory">
                    <div className={navigation}></div>
                    <div className="contanner_history" style={{marginTop:marginTop, height:scrollHeight}}>
                        <div className="header flex">
                            <div className="waterConsumer flex-cell">
                                <div className="title">累计用水量</div>
                                <div className="value">{waterConsumeTotal}L</div>
                            </div>
                            <div className="powerConsumer flex-cell">
                                <div className="title">累计用电量</div>
                                <div className="value">{powerTotal}度</div>
                            </div>
                        </div>
                        <div id="wrapper">
                            <div id="scroller">
                                <div id="pullDown"   >
                                    <span className="pullDownIcon"></span>
                                </div>
                                <div id="thelist">
                                    {
                                        dataArray.map(function (value, mapIndex) {
                                            let index = (value.mode - 1) || 0 ;
                                            let mode = washerModeS[index].name || '标准';
                                            let power = Number(value.power) || 0;
                                            let waterCom = value.waterConsume || 0;
                                            let useTime = value.useTime || 0;
                                            let data = value.startTime || (new Date());
                                            let localTime =  Funs.dateFormat(data, 'yyyy-MM-dd hh:mm:ss', true);

                                            return (
                                                <div className="tableCell"  key={mapIndex}>
                                                    <div className="cellContent">
                                                    <div className="flex workMode">
                                                        <div className="flex-cell flex">
                                                            <span className="flex-cell">程  序：</span>
                                                            <span className="flex-cell">{mode}</span>
                                                        </div>
                                                        <div className="flex-cell "></div>
                                                        {/*<div className="flex-cell flex">*/}
                                                            {/*<span className="flex-cell">平均水温：</span>*/}
                                                            {/*<span className="flex-cell">20.1度</span>*/}
                                                        {/*</div>*/}
                                                    </div>
                                                    <div className="flex consumer">
                                                        <div className="flex-cell flex">
                                                            <span className="flex-cell">单次耗电：</span>
                                                            <span className="flex-cell">{power}度</span>
                                                        </div>
                                                        <div className="flex-cell flex">
                                                            <span className="flex-cell">单次用水：</span>
                                                            <span className="flex-cell">{waterCom}升</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex worktime">
                                                        <div className="flex-cell ">
                                                            <span >启动时间：</span>
                                                            <span >{localTime} 用时{useTime}分钟</span>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                            );
                                        })

                                    }
                                </div>
                                <div id="pullUp" style={pullUpStyle}>
                                    <span className="pullUpLabel">{pullUpContent}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Loading
                    show = {isRequest}
                    info = {" "}
                    />
                </div>
            );
        }
};