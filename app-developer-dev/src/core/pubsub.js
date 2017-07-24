'use strict';
/**
 * 发布/订阅公共函数库
 * @author   vilien
 * @datetime 2015-12-02
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _SUBSCRIBER_STORE_ = { lastID: 0 }; // 消息订阅仓储

/**
 * 订阅消息
 * @param    {string}   topic 所订阅消息名称
 * @param    {function} func  当所订阅消息发布时callback
 * @return   {integer}        返回唯一的订阅号，可用于取消订阅
 */
var subscribe = exports.subscribe = function subscribe(topic, func) {
    var id = ++_SUBSCRIBER_STORE_.lastID;
    if (topic === 'lastID') {
        throw new Error('"lastID" is a reserved word!');
    }
    if (typeof func !== 'function') {
        --_SUBSCRIBER_STORE_.lastID;
        return 0;
    }
    if (!Array.isArray(_SUBSCRIBER_STORE_[topic])) {
        _SUBSCRIBER_STORE_[topic] = [];
    }
    _SUBSCRIBER_STORE_[topic].push({ id: id, func: func });
    return id;
};

/**
 * 取消订阅
 * @param    {integer} id   订阅id，在订阅时获得
 * @return   {boolean}      成功返回true，失败返回false
 */
var unsubscribe = exports.unsubscribe = function unsubscribe(id) {
    for (var t in _SUBSCRIBER_STORE_) {
        if (t === 'lastID' || !Array.isArray(_SUBSCRIBER_STORE_[t])) {
            continue;
        }
        for (var i in _SUBSCRIBER_STORE_[t]) {
            if (_SUBSCRIBER_STORE_[t][i].id === id) {
                _SUBSCRIBER_STORE_[t].splice(i, 1);
                return true;
            }
        }
    }
    return false;
};

/**
 * 发布消息
 * @param    {string}   topic   消息名称
 * @param    {rest}     ...args 参数列表，可根据需要传入无限个参数
 * @return   {integer}          返回该消息的订阅数量（送达数量）
 */
var publish = exports.publish = function publish(topic) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    if (Array.isArray(_SUBSCRIBER_STORE_[topic])) {
        _SUBSCRIBER_STORE_[topic].forEach(function (sub) {
            sub.func.apply(sub, args);
        });
        return _SUBSCRIBER_STORE_[topic].length;
    } else {
        return 0;
    }
};