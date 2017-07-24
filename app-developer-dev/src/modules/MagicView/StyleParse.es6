'use strict';
/**
 * 控件样式解析类
 * @author   vilien
 * @datetime 2016-01-06
 */

// 解析用户控件样式
export const getWidgetStyle = (widget)=>{
    return {
        position:       'absolute',
        top:            (Number(widget.top)/12).toFixed(3)+"rem",
        left:           (Number(widget.left)/12).toFixed(3)+"rem",
        width:          (Number(widget.width)/12).toFixed(3)+"rem",
        height:         (Number(widget.height)/12).toFixed(3)+"rem",
        zIndex:         widget.zIndex || 0,
        backgroundColor:widget.bgColor,
        backgroundImage:widget.id!='1004' && widget.bgImagePath && `url(${widget.bgImagePath})`,
        backgroundRepeat:'no-repeat',
        color:          widget.fgColor || '#333333',
        borderColor:    widget.borderColor,
        opacity:        typeof widget.widgetOpacity === 'undefined' ? 1 : widget.widgetOpacity/100,
        borderWidth:    widget.borderWidth,
        borderRadius:   typeof widget.borderRadius === 'undefined' ? '' : widget.borderRadius+'px',
        borderStyle:    widget.borderWidth && 'solid',
        fontSize:       widget.propertySet[0].fontSize,
        color:          widget.propertySet[0].textColor,
        fontWeight:     widget.propertySet[0].fontWeight==1 && 'bold',
        fontStyle:      widget.propertySet[0].fontItalics==1 && 'italic',
        textAlign:      widget.textAlign || '',
        // transform:      'rotate('+widget.rotate+'deg)' || 'rotate(0deg)'
    };
};