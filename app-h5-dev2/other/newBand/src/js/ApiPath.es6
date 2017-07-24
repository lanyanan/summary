var wPath,aPath;
switch(location.host) {
    case 'weixin.clife.cn' : 
        wPath = '/clife-wechat-test';
        aPath = 'https://200.200.200.50';
        break;
    case 'weixin.hetyj.com': 
        wPath = '/clife-wechat-preRelease';
        aPath = 'https://weixin.hetyj.com/';
        break;
    case 'wechat.hetyj.com':
        wPath = '/clife-wechat';
        aPath = 'https://api.clife.cn';
        break;
    default: 
        wPath = '/clife-wechat-test';
        aPath = 'https://200.200.200.50';
}
var Path = {
    wPath: wPath,
    aPath: aPath
}
//Path.aPath = 'https://dp.clife.net';
Path.aPath = 'https://test.api.clife.cn';
export default Path;
