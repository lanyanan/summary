var wPath,aPath;
switch(location.host) {
    case 'weixin.clife.cn' : 
        wPath = '/clife-wechat-test';
        aPath = 'http://200.200.200.50';
        break;
    case 'weixin.hetyj.com': 
        wPath = '/clife-wechat-preRelease';
        aPath = 'http://weixin.hetyj.com/';
        break;
    case 'wechat.hetyj.com':
        wPath = '/clife-wechat';
        aPath = 'http://api.clife.cn';
        break;
    default: 
        wPath = '/clife-wechat-test';
        aPath = 'http://200.200.200.50';
}
var Path = {
    wPath: wPath,
    aPath: aPath
}
export default Path;