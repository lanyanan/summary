'use strict';
/**
 * 血氧状态条组件
 * @prop {number} oxygen  血氧值
 * @非常危险:<90%  
 * @危险    :90%~94%
 * @正常    :95%~98%
 * max min : 99 35
 */

export const OxygenRange = React.createClass({
    getInitialState: function(){
        return {};
    },

    render: function() {
        console.log(this.props.oxygen);
        return (
            <div className='d-range'>
                <input type="range"  disabled max='99' min='79' value={this.props.oxygen}/>
                <p className='range-line'>
                    <span style={{background:'#FF4045',width:'50%'}}></span>
                    <span style={{background:'#F2CE3C',width:'25%'}}></span>
                    <span style={{background:'#40DA91',width:'25%'}}></span>
                </p>
                <p className='range-text'>
                    <span style={{left:'1%'}}>0</span>
                    <span style={{left:'48%'}}>90%</span>
                    <span style={{left:'72%'}}>95%</span>
                </p>
                <p className='range-text'>
                    <span style={{left:'18%',top:'38px',color:'#FF4045'}}>非常危险</span>
                    <span style={{left:'53%',top:'38px',color:'#F2CE3C'}}>危险</span>
                    <span style={{left:'80%',top:'38px',color:'#40DA91'}}>正常</span>
                </p>
            </div>
           
        );
    }
});