'use strict';

export const Actions = Reflux.createActions([
    'repaint',
    'sendData', // 发送过滤数据
    'getParam', // 设置配置信息
    'cacheData' // 设置过滤数据，不发送
]);