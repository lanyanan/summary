'use strict';
/**
 * 图片上传验证类
 * @author   xinglin
 * @datetime 2016-01-13
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
var uploadVerification = exports.uploadVerification = function uploadVerification(imagefile) {
    if (!imagefile) return false;
    if (imagefile.type != 'image/jpeg' && imagefile.type != 'image/png' && imagefile.type != 'image/gif') {
        alert('请上传正确的图片格式(jpg/png/gif)!');
        return false; //验证是否为指定格式
    }
    if (parseInt(parseInt(imagefile.size) / 1024) > 500) {
        alert('请上传大小不超过500KB的图片!');
        return false; //验证大小是否超过500KB
    }
    return true;
};