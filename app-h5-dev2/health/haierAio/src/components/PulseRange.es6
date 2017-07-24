'use strict';
/**
 * 脉率状态条组件
 * @prop {number} pulse  脉率值
 * @非常危险:<40 或 >140 
 * @危险    :40~59 或 101~140
 * @正常    :60~100
 * max min :200 30
 */

export const PulseRange = React.createClass({
    getInitialState: function(){
        return {};
    },

    render: function() {
    	
        return (
            <div className='d-range'>
                <input type="range"  disabled max='180' min='0' value={this.props.pulse}/>
                <p className='range-line'>
                    <span style={{background:'#FF4045',width:'22.2%'}}></span>
                    <span style={{background:'#F2CE3C',width:'11.1%'}}></span>
                    <span style={{background:'#40DA91',width:'22.2%'}}></span>
                    <span style={{background:'#F2CE3C',width:'22.2%'}}></span>
                    <span style={{background:'#FF4045',width:'22.2%'}}></span>
                </p>
                <p className='range-text'>
                    <span style={{left:'1%'}}>0</span>
                    <span style={{left:'20%'}}>40</span>
                    <span style={{left:'32%'}}>60</span>
                    <span style={{left:'52%'}}>100</span>
                    <span style={{left:'75%'}}>140</span>
                </p>
                <p className='range-text'>
                    <span style={{left:'2%',top:'38px',color:'#FF4045'}}>非常危险</span>
                    <span style={{left:'24%',top:'38px',color:'#F2CE3C'}}>危险</span>
                    <span style={{left:'40%',top:'38px',color:'#40DA91'}}>正常</span> 
                    <span style={{left:'62%',top:'38px',color:'#F2CE3C'}}>危险</span>
                    <span style={{left:'80%',top:'38px',color:'#FF4045'}}>非常危险</span>
                </p>
            </div>
           
        );
    }
});