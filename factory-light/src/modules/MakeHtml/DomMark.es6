'use strict';
/**
 * 解析控件配置信息
 * @author   lan
 * @datetime 2017-03-21
 */

import {BaseClass} from '../../core/Base.class.es6';
import {transform} from 'react-tools'; // 导入transform方法用于转换js




var btn = {
     dom: `React.createClass({
        componentDidMount: function() {
            var _state_ = typeof __props !== 'undefined' ? __props : '';
            var mark = document.getElementById("mark");
            if(_state_){
                if(_state_['someoneNot']==2){
                    mark.style.display = 'none';
                }
            }
        },
        render:function() {
            var _state_ = typeof __props !== 'undefined' ? __props : '';
            var path = 'http://fileserver1.clife.net:8080/group1/M00/15/06/CvtlhlkQEFaAYQ9HAAAFl2CadlY898.png';
            if(_state_){
                if(_state_['someoneNot']==0){
                    
                }else if(_state_['someoneNot']==1){
                    path = 'http://fileserver1.clife.net:8080/group1/M00/15/06/CvtlhlkQEEmAZ3Q8AAAFmdMFNmU844.png';
                }
            }
            return (
               <img id="mark" style={{width:25,height:25}} src={path} />
            );
        }
    })`
}

export class DomMark extends BaseClass{
    constructor(widget){
        super();
    }

    // 获取控件ReactDom
    getReactDom(){
        return 'React.createElement(' + transform(btn.dom) + ',{})'
    }
};