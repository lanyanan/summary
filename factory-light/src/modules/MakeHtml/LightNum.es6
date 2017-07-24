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
            var _state = typeof __props !== 'undefined' ? __props : '';
            var wid = this.props.userWidgetID;
            if(!_state.hiddenArray&&this.props.statusVisibility==2){
                AppActions.init(wid);
            }
        },
        render: function(){
            var _state = typeof __props !== 'undefined' ? __props : '';
            var lightOnNum = 0;
            var lightOffNum = 0;
            var lightOutNum = 0;
            if(_state&&_state.dictData){
                var _data_ = _state.dictData[0];
                if(_data_){
                    lightOnNum = _data_['lightOnNum']?_data_['lightOnNum']:0;
                    lightOffNum = _data_['lightOffNum']?_data_['lightOffNum']:0;
                    lightOutNum = _data_['lightOutNum']?_data_['lightOutNum']:0;
                }
            }
            return (
                <div style={{width:300,height:30,padding:'0 35px'}}>
                    <div className='light-open' style={{width:100,height:30,float:'left'}}>
                        <img style={{width:25,height:25,display:'block',float:'left'}} src='http://fileserver1.clife.net:8080/group1/M00/0C/EF/Cvtlp1kQEB6AYyIcAAAFuxsHkvU109.png'/>
                        <span style={{width:30,height:30,float:'left',fontSize:'20px',color:'#ccc', lineHeight:'30px',textAlign:'center'}}>{lightOnNum}</span>
                        <span style={{width:30,height:30,float:'left',fontSize:'14px',color:'#ccc',lineHeight:'30px',textAlign:'center'}}>开启</span>
                    </div>
                    <div className='light-close' style={{width:100,height:30,float:'left'}}>
                        <img style={{width:25,height:25,display:'block',float:'left'}} src='http://fileserver1.clife.net:8080/group1/M00/0C/EF/Cvtlp1kQEDKASrSGAAAFum7flck716.png'/>
                        <span style={{width:30,height:30,float:'left',fontSize:'20px',color:'#ccc', lineHeight:'30px',textAlign:'center'}}>{lightOffNum}</span>
                        <span style={{width:30,height:30,float:'left',fontSize:'14px',color:'#ccc',lineHeight:'30px',textAlign:'center'}}>关闭</span>
                    </div>
                    <div className='light-error' style={{width:100,height:30,float:'left'}}>
                        <img style={{width:25,height:25,display:'block',float:'left'}} src='http://fileserver1.clife.net:8080/group1/M00/15/06/CvtlhlkQECeAaUoLAAAFu1WDi1w558.png'/>
                        <span style={{width:30,height:30,float:'left',fontSize:'20px',color:'#ccc', lineHeight:'30px',textAlign:'center'}}>{lightOutNum}</span>
                        <span style={{width:30,height:30,float:'left',fontSize:'14px',color:'#ccc',lineHeight:'30px',textAlign:'center'}}>故障</span>
                    </div>
                </div>
            );
        }
    })`
}

export class LightNum extends BaseClass{
    constructor(widget){
        super();
    }

    // 获取控件ReactDom
    getReactDom(){
        return 'React.createElement(' + transform(btn.dom) + ',{})'
    }
};