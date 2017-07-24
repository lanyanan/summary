'use strict';

import {Actions} from './Actions.es6';

export const Diffusion = React.createClass({
    getInitialState: function(){
        return {
            border:12.6,
            opacity:0.8,
            onOff:1,
            timeId:null,
        };
    },
    //页面加载渲染
    componentDidMount(){
        //扩散样式
        let _this = this;
       this.state.timeId = setInterval(/*()=>{
             let border=_this.state.border || 12.6;
             let opacity= _this.state.opacity || 0.8;
               border+=0.5;
               opacity-=0.04; 
               //if(opacity<=0.06){opacity=0.8;}
                if(border>=12.6){border=4.6;opacity=0.8}
                _this.state.border=border;
                _this.state.opacity=opacity;
                _this.setState({
                    border:border,
                    opacity:opacity
                });
        },*/100)
        
    },
    //页面卸载执行
    componentWillUnmount(){
            clearInterval(this.state.timeId);

    },
     opeenOrClose(e){
        Actions.opeenOrClose(this.props.stateItems,this.props.modArr);
    },
    render() {
        return (
                <div className="div_open" >
                            <div className="div_open_one" > 
                                <span onTouchEnd={this.opeenOrClose}>
                                </span>                           
                            </div>
                            <div className="div_open_two"></div>
                            <div className="div_open_two1"></div>
                        </div>
            );
    }
});

