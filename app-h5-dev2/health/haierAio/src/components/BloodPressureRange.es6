'use strict';
/**
 * 血压状态条组件
 * @prop {string} systolic  收缩压值
 * @prop {string} diastolic  舒张压值
 * @低血压:舒张压<60 收缩压<90
 * @正常血压    :舒张压60~89 收缩压90~139
 * @高血压    :舒张压 >90  收缩压 >140
 */

export const BloodPressureRange = React.createClass({
    getInitialState: function(){
        return {};
    },

    render: function() {
        //console.log(this.props.systolic);
        let systolic = parseFloat(this.props.systolic),
            diastolic = parseFloat(this.props.diastolic),
            rangeValue = '5';
        if(systolic<90 || diastolic<60){
            rangeValue = '5';
        }else if (140>systolic && systolic>=90 && 89>= diastolic&&diastolic >=60) {
            rangeValue = '15';
        }else if(systolic>=140||diastolic>=90){
            rangeValue = '25';
        } 
       //console.log(systolic,diastolic,rangeValue);
        return (
            <div className='d-range'>
                <input type="range"  disabled max='30' min='0' value={rangeValue}/>
                <p className='range-line'>
                    <span style={{background:'#FDB27B',width:'33%'}}></span>
                    <span style={{background:'#40DA91',width:'33%'}}></span>
                    <span style={{background:'#FF503D',width:'33%'}}></span>
                </p>
                <p className='range-text'>
                    <span style={{left:'12%',top:'38px',color:'#FDB27B'}}>偏低</span>
                    <span style={{left:'45%',top:'38px',color:'#40DA91'}}>正常</span>
                    <span style={{left:'78%',top:'38px',color:'#FF503D'}}>偏高</span>
                </p>
            </div>
        );
    }
});