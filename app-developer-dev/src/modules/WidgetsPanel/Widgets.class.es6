'use strict';

/**
 * 组件库
 */

import {BaseClass} from '../../core/Base.class';
import * as widgetList from '../../widgets/list'; // 组件列表

class WidgetsClass extends BaseClass {
    constructor(){
        super();
    }

    valueOf(){
        return widgetList;
    }

    /**
     * 生成用户插件ID
     * @param    {object}   widget 插件对象
     * @return   {integer}         生成插件ID
     */
    newUserWidgetID(widget,i = 0){
        let d = +new Date();
        let id = (widget && widget.id) ? widget.id * 1e4 : 1e7;
        return id + +d.toString().slice(4, 11) + i;
    }

    /**
     * 产生数组形式的组件列表，以供React渲染
     * @return   {array}   产生数组形式的组件列表
     */
    getArrayWidgets(){
        let arr = [];
        for (let k in widgetList) {
            let URL = widgetList[k].cssFile;
            fetch(URL).then((res)=>{
              if (res.ok) {
                res.text().then((data)=>{
                    widgetList[k].cssCode = data;
                });
              } else {
                console.log("Looks like the response wasn't perfect, got status", res.status);
              }
            }, (e)=>{
              console.log("Fetch failed!", e);
            });
            arr.push(widgetList[k]);
        }
        return arr;
    }

    /**
     * 通过ID获取widget
     * @param    {integer}   id 组件ID号
     * @return   {object}       返回组件对象
     */
    getWidgetById(id){
        for (var k in widgetList) {
            if (widgetList[k].id == id) {
                return widgetList[k];
            }
        }
        return {};
    }

    /**
     * 序列化用户控件，以便向服务器提交
     * 注：只处理需要序列化成字符串存储的节点，可直接保存的节点将过滤
     *     目的在于：节省资源的同时，增加控件的健壮性
     * @param    {object}   widget 用户控件对象
     * @return   {string}          可用于表单提交的字符串
     */
    stringifyUserWidget(widget){
        let props = Object.assign({htmlCode:'',jsCode:'',cssCode:''}, widget);
        delete props.widgetId;
        delete props.caption;
        delete props.htmlCode;
        delete props.cssCode;
        delete props.jsCode;
        delete props.unsaved;
        return JSON.stringify(props);
    }

    /**
     * 解析从服务器拉取的用户控件
     * @param    {object}   widget 用户控件对象
     * @return   {object}          可用于场景的用户控件对象
     */
    parseUserWidget(widget){
        return Object.assign({
            widgetId: widget.widgetId,
            caption: widget.widgetName,
            jsCode: widget.js,
            cssCode: widget.css,
            htmlCode: widget.html
        }, JSON.parse(widget.widgetProperties));
    }

    /**
     * 通过name获取widget
     * @param    {integer}   id 组件ID号
     * @return   {object}       返回组件对象
     */
    getWidgetByName(name){
        return widgetList[name];
    }

}

export const Widgets = new WidgetsClass;