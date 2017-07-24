/**
 * Created by yuanyunlong on 2017/2/22.
 */

let requestInfo = {
    userToken:'',
    deviceId:''
}

let hasSet = false;

function setDeviceInfo(uerToken1, deviceid1){
    if(uerToken1 && deviceid1){
        requestInfo.userToken = uerToken1;
        requestInfo.deviceId  = deviceid1;

        if( uerToken1.length > 3  ){
            hasSet = true;
        }
    }

}

function getDeviceInfo() {
    return requestInfo;
}

function hasSetRequest(){
    return hasSet;
}

module.exports = {setDeviceInfo, getDeviceInfo, hasSetRequest}