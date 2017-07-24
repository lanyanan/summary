'use strict';

import {deviceAction} from '../Actions/deviceAction.es6';
import Path from '../ApiPath.es6';

export const deviceStore = Reflux.createStore({
    listenables: [deviceAction],

    // 获取deviceName
    onGetDeviceInfo(){
        var self = this,
            url = Path.aPath + '/v1/device/getDeviceInfo';

        het.get(url, {appType:1}, (data)=>{

            var {deviceId, deviceName} = data;
            self.trigger({deviceName:deviceName});
        })
    },

    // 获取睡眠数据
    onGetRaw(){
        var self = this,
    	    url = Path.aPath + '/v1/device/data/getRaw';

        het.get(url, (data)=>{

            self.trigger({rawData: data})
        })
    }
});