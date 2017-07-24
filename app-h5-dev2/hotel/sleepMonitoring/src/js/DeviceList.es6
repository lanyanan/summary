import {Link} from 'react-router';
import _ from 'lodash';
import {Store} from './Store.es6';
import {Actions} from './Actions.es6';
const DeviceList = React.createClass({
    mixins: [Reflux.listenTo(Store,"onGetDeviceList")],
    getInitialState: function(){
        let dataList = sessionStorage.getItem('dataList');
        //console.log(dataList)
        return {
            dataList: dataList?JSON.parse(dataList):[]
        }
    },
    onGetDeviceList:function(data){
        this.setState(data);
    },
    GetQueryString: function(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.search.substr(1).match(reg);
         if(r!=null) return decodeURI(r[2]);
         return null;
    },
    componentDidMount: function(){
        if($('#appdownload')){
           $('#appdownload').css({display: 'block'});
           $('#m-tabselect').css({bottom: '4.833333rem'});
        }
        //获取roomId和wechatUserId,并设置cookie
        //请求设备信息
        var roomId = this.GetQueryString('roomId');
        Actions.getDeviceList(roomId); 
        // this.getList = setInterval(function(){
        //     Actions.getDeviceList(roomId); 
        // },1000)
        
    },
    componentWillUnmount: function(){
        clearInterval(this.getList);
    },
    shouldComponentUpdate: function(nextProps, nextState){
         return !_.isEqual(this.state, nextState) || !_.isEqual(this.props, nextProps);
    },
    render: function(){
        var dataList = this.state.dataList;
        // console.log('aaaaaa',dataList)
        var isHidden = null;
        var listItems = [];
        //console.log(dataList)
        if(dataList&&dataList.length>0){
                listItems = dataList.map(function(item,index){
                var subId = item.deviceSubTypeId;
                var devId = item.deviceId;
                var devN = item.deviceName;
                var url = '';
                let arr = [6001,6002,28001,14003,43001,11001,5003];
                let show = arr.indexOf(subId)>-1?{}:{display:'none'};
                switch(subId){
                    case 6001: 
                        url = '../../sleepBand/page/index.html?deviceId='+devId+'&deviceName='+devN; 
                        break;
                    case 6002: 
                        url = '../../sleepBand/page/index.html?deviceId='+devId+'&deviceName='+devN; 
                        break;
                    case 28001: 
                        url = '../../wisdomBox/page/index.html?deviceId='+devId+'&deviceName='+devN;
                        break;
                    case 14003:
                        url = '../../sleepLamp/page/index.html?deviceId='+devId+'&deviceName='+devN;
                        break;
                    case 43001:
                        url = '../../aircondition/page/index.html?deviceId='+devId+'&deviceName='+devN;
                        break;
                    case 11001:
                        url = '../../colorfulAromaDiffuser/page/index.html?deviceId='+devId+'&deviceName='+devN;
                        break;
                    case 5003:
                        url = '../../squareHumidifier/page/index.html?deviceId='+devId+'&deviceName='+devN;
                        break;
                    // case 14006:
                    //     url = '';
                    //     break;
                    // case 6006:
                    //     url = '../../plumbingPad/page/index.html?deviceId='+devId+'&deviceName='+devN;
                    //     break;
                    // case 21001:
                    //     url = '../../technologyCurtain/page/index.html?deviceId='+devId+'&deviceName='+devN;
                    //     break;
                }
                return (
                        <a href={url} className="device-list flex" key={index} style={show}>
                            <div className="device-logo">
                                <img src={dataList[index].productIcon} />
                            </div>
                            <div className="device-info flex-column">
                                <h2>{dataList[index].deviceName}</h2>
                                <p style={dataList[index].status?{color: '#919191'}:{color: '#8458DD'}}>{dataList[index].status?'离线':'在线'}</p>
                            </div>
                            <img src="../static/img/rightarrow.png" className="next-arrow"/>
                        </a>
                    )
            });
            var len = this.props.routes.length;
            if(len>2){
                listItems =this.props.children;
                isHidden = {display:'none'};
            }
        }

        return (
               
                <div className="m-devicelist">
                    <h3 className="mydevice" style={isHidden}><span>我的设备</span></h3>
                    {listItems}

                </div>
                    
                    
               
                
                

            )
    }
});

export default DeviceList;