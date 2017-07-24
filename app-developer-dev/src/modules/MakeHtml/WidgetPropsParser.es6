'use strict';
/**
 * 解析控件配置信息
 * @author   vilien
 * @datetime 2016-01-18
 */

import {BaseClass} from '../../core/Base.class';
import {transform} from 'react-tools'; // 导入transform方法用于转换jsx
import {getWidgetStyle} from '../MagicView/StyleParse'; // 导入控件CSS解析类

export class WidgetPropsParser extends BaseClass{
    constructor(widget,childWidget){
        super();
        this.widget = widget;
        this.childWidget = childWidget;
    }

    // 获取控件ReactDom
    getReactDom(){
        let styleList = JSON.parse(sessionStorage.getItem('styleList'));
        let style = {style:getWidgetStyle(this.widget)};
        let domsString = this.widget.propertySet.map(prop=>{
                let props = Object.assign({
                    caption:this.widget.caption,
                    visibility:this.widget.statusVisibility,
                    text:this.widget.editText,
                    ref:this.widget.userWidgetID,
                    userWidgetID:this.widget.userWidgetID,
                    className:this.widget.className,
                    styleList:styleList,
                    widgetInfo: this.widget.widgetInfo
                }, prop, style);
                if(this.widget.id == 1004){
                    props.imagePath = props.statusSet[props.activeStatus].bgImagePath;
                }
                if(this.widget.id == 1011 && this.widget.parent > -1){
                    props.inTab = true;
                }
                if(this.widget.id == 1014){
                    props.activeType = this.widget.activeType;
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