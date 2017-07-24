'use strict';
/**
 * 血糖状态条组件
 * @prop {string} status 个人状态（1:空腹，2:餐后一小时，3:餐后二小时）
 * @prop {string} glucose 血糖值
 *                          偏低     正常               偏高
 *  空腹全血血糖  mmol/L   x<3.9  3.9<=x<=6.1    6.1<x<=6.7  >6.7   
 *  餐后一小时血糖 mmol/L  x<6.7  6.7<=x<=9.4    9.4<x<=10.0 >10             
 *  餐后二小时血糖 mmol/L  x<3.9  3.9<=x<=7.8    7.8<x<=10   >10            
 */

export const BloodGlucoseRange = React.createClass({
    getInitialState: function(){
        return {};
    },

    render: function() {
        //console.log(this.props);
        let status = this.props.status,
            standard1 = this.props.standard1,
            standard2 = this.props.standard2,
            max = this.props.max,
            min = this.props.min,
            glucose = this.props.glucose*10;
    
        return (
            <div className='d-range'>
                <input type="range"  disabled max={max} min={min} value={glucose}/>
                <p className='range-line'>
                    <span style={{background:'#FF4045',width:'33%'}}></span>
                    <span style={{background:'#40DA91',width:'33%'}}></span>
                    <span style={{background:'#F2CE3C',width:'33%'}}></span>
                </p>
                <p className='range-text'>
                    <span style={{left:'30%'}}>{standard1}</span>
                    <span style={{left:'64%'}}>{standard2}</span>
                </p>
                <p className='range-text'>
                    <span style={{left:'14%',top:'38px',color:'#FF4045'}}>不足</span>
                    <span style={{left:'47%',top:'38px',color:'#40DA91'}}>正常</span>
                    <span style={{left:'80%',top:'38px',color:'#F2CE3C'}}>超标</span>
                </p>
            </div>
           
        );
    }
});