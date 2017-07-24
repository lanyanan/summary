'use strict';
/**
 * 解析控件配置信息
 * @author   vilien
 * @datetime 2016-01-18
 */

import {BaseClass} from '../../core/Base.class.es6';
import {transform} from 'react-tools'; // 导入transform方法用于转换jsx
import {getWidgetStyle} from '../MagicView/StyleParse.es6'; // 导入控件CSS解析类

export class WidgetPropsParser extends BaseClass{
    constructor(widget){
        super();
        this.widget = widget;
    }

    // 获取控件ReactDom
    getReactDom(){
        console.log(this.widget)
        let styleList = JSON.parse(sessionStorage.getItem('styleList'));
        let style = {style:getWidgetStyle(this.widget)};
        let domsString = this.widget.propertySet.map(prop=>{
                let props = Object.assign({
                    caption:this.widget.caption,
                    visibility:this.widget.statusVisibility,
                    text:this.widget.editText,
                    ref:this.widget.userWidgetID,
                    id:this.widget.code,
                    userWidgetID:this.widget.userWidgetID,
                    className:this.widget.className,
                    styleList:styleList,
                    deviceId:this.widget.bindDeviceId,
                    lightDeviceId:this.widget.lightDeviceId
                }, prop, style);
                if(this.widget.id==1004){
                    props.imagePath = props.statusSet[props.activeStatus].bgImagePath;
                }
                return 'React.createElement(' + transform(this.widget.dom) + ',' + JSON.stringify(props) + ')';
            }).join(',');
        return domsString;
    }

    // 获取控件行内样式
    getStyleString(){
        return JSON.stringify(getWidgetStyle(this.widget));
    }

    // 获取控件props
    getPropString(index=0){
        let props={style:getWidgetStyle(this.widget)};
        Object.assign(props, this.widget.propertySet[index]);
        return JSON.stringify(props);
    }
};