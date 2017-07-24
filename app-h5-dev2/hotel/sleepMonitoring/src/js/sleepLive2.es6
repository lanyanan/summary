import Highcharts from 'highcharts';
import SleepCharts from './sleepLiveCharts2.es6';
import {Store} from './Store.es6';
import {Actions} from './Actions.es6';
import Path from './ApiPath.es6';
//var heartRateData=[40,40,40,37,41,39,43,40,60,30,40,38,45,40,40,40,38,41,40,42,41,60,30,40,38,45,40,40,40,38,41,40,42,41,60,30,40,38,45,40,40,40];
var SleepLive = React.createClass({
    mixins: [Reflux.connect(Store, 'data')],
    getInitialState : function(){
        return {data:''};
    },
    format: function(d) {
        return d >= 10 ? d : ("0"+d);
    },
    componentDidMount: function(){
        //隐藏浮层
        if($('#appdownload')){
           $('#appdownload').css({display: 'none'});
           $('#m-tabselect').css({bottom: 0});
        }
        Actions.getParam();
    },
    render : function(){
        var items=[];
        var end=new Date(),
            endYear=end.getFullYear(),
            endMonth=end.getMonth()+1,
            endDay=end.getDate(),
            date=endYear+"-"+this.format(endMonth)+"-"+this.format(endDay);
        var data = this.state.data;
        var names = data.deviceNames;
        var deviceIds = data.deviceId;
        var appId = data.appId;
        var accessToken = data.accessToken;
        
        items.push({
            url : Path.aPath+'/v1/device/data/getRaw?accessToken='+accessToken+'&appId='+appId
                +'&deviceId='+deviceIds+'&queryFlag=0&dataTime='+date,
            deviceId : deviceIds,
            deviceName : names
        });
        return <div>{items.map(function(c, i){
            return <div key={i}>
                <SleepCharts idsuffix={i} url={c.url} deviceName={c.deviceName} deviceId={c.deviceId}/>
            </div>;
        })}</div>;
    }
});

export default SleepLive;