'use strict';

import {Actions} from './Actions.es6';
import {Diffusion} from './diffusion.es6';

export const ClosePage = React.createClass({
    getInitialState: function(){
        return {
            timeshow:false,
            deviceStatus:0,
            onOff:1,
            smartModeSwitch:1,
            deviceMode:3,
            modeName:2,
        };
    },
    
    //改变开关机状态
   
    render() {
        return (<div className="index_div"> 
                    <div className="div_img">
                        <img src="../static/img/open.png" alt=""/>                        
                        <Diffusion stateItems={this.props.stateItems} modArr={this.props.modArr}/>
                    </div>
                    
        </div>);
    }
});

