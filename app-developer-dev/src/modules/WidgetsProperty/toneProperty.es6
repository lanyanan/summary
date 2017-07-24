'use strict';
/**
 * 按钮颜色选择器
 * @author   hey
 * @datetime 2017-06-05
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';

export let ToneProperty = {
	getComponent : React.createClass({
        colorPick: function(e) {
            let type = e.target.getAttribute('data-type');
            let newcolor = e.target.getAttribute('data-color');
            let pid = Number(e.target.getAttribute('data-pid'));
            switch(type){
                case 'foreground':
                    Actions.changeFgColor(newcolor);
                    break;
                case 'bordercolor':
                    Actions.changeBorderColor(newcolor);
                    break;
                case 'solid': //实心
                    Actions.changeBorderColor(newcolor);
                    Actions.changeBgColor(newcolor);
                    break;
                case 'hollow': //空心
                    Actions.changeBorderColor(newcolor);
                    Actions.changeStringProperty(pid,'textColor',newcolor);
                    break;
                case 'fontcolor':
                    Actions.changeStringProperty(pid,'textColor',newcolor);
                    break;
                case 'timeTone':
                    Actions.changeStringProperty(pid,'textColor',newcolor);
                    break;
                case 'rangeTone':
                    Actions.changeBgColor(newcolor);
                    break;
                case 'switchTone':
                    Actions.changeBgColor(newcolor);
                    break;
                case 'popupButtonTone':
                    Actions.changeWidgetInfo('popupButtonBgColor',newcolor);
                    break;
                case 'processTone':
                    Actions.changeWidgetInfo('processColor',newcolor);;
                    break;
                case 'addsubTone':
                    Actions.changeWidgetInfo('color',newcolor);
                    break;
                case 'speeddialTone':
                    Actions.changeWidgetInfo('speeddialColor',newcolor);
                    break;
                default:;
            }
        },
        render: function(){
            let widget = this.props.widget,
                propertySet = this.props.propertySet,
        	    tone = [],
                toneArr = ["#fe5c45","#fc8109","#fcb409","#8dcb37","#1be2d2","#2accfa","#3b96ff","#715af5","#000000","#333333","#666666","#999999","#b2b2b2","#c6c6c6","#e5e5e5","#ffffff"],
                toneType,
                toneName = "色调";

            switch(widget.id){
                case 1005:
                    toneType = widget.bgColor == "transparent" ? 'hollow' : 'solid';
                    break;
                case 1013:
                    toneType = "addsubTone";
                    break;
                case 1001:
                    toneType = "fontcolor";
                    break;
                case 1002:
                    toneType = "fontcolor";
                    break;
                case 1007:
                    toneType = "rangeTone";
                    break;
                case 10018:
                    toneType = "switchTone";
                    break;
                case 1018:
                    toneType = "processTone";
                    break;
                case 1011:
                    toneType = "timeTone";
                    break;
                case 1020:
                    toneType = "speeddialTone";
                    break;     
            }

            tone = toneArr.map((item,index)=>{
                return <li key={index} data-pid={propertySet.propertyId} data-type={toneType} title={item} data-color={item} style={{backgroundColor: item}}></li>
            });

            switch(toneType){
                case "popupButtonTone":
                    toneName = "按钮颜色";
                    break; 
            }
            
            return (
                    <section className='property-tone'>
                        <span>{toneName}</span>
                        <ul onClick={this.colorPick} >
                            {tone}
                        </ul>
                    </section>
            );
        }
    })
};