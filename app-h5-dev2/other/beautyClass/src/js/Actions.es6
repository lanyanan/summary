'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */

export const Actions = Reflux.createActions([
    'getSingleClass', //单次课程详情
    'getWeekClass', //周期课程详情
    'joinClass', // 添加课程
    'startClass', // 开始课程
    'getCourseData',//获取课程数据
    'getCourseCount',//获取统计数据
    'getCourseList1',//获取单次课程数据
    'getCourseList2',//获取周期课程数据
    'delCourse',//删除课程
    'finishCourse',//完成课程
]);