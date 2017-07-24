'use strict';
/**
 * 血氧脉率状态条组件
 * @prop {number} oxygen  血氧值
 * @prop {number} pulse  脉率值
 * @prop {number} dataTime  时间
 * @prop {number} lastTime  历史时间
 * @非常危险:<90%  
 * @危险    :90%~94%
 * @正常    :95%~98%
 * max min : 99 35
 *
 * 血氧值脉率值都为0时  即手指脱落
 */

export const Range = React.createClass({
    getInitialState: function(){
        return {};
    },

    render: function() {
        //console.log(this.props);
        let oxygen = this.props.oxygen,
        pulse = this.props.pulse,
        dataTime = this.props.dataTime,
        lastTime = this.props.lastTime,
        oxygenLevel,pulseLevel;

        if(oxygen < 90){
            oxygenLevel = 'flex-cell cor-orange';
        }else if(oxygen >=90 && oxygen < 95 ){
            oxygenLevel = 'flex-cell cor-yellow';
        }else{
            oxygenLevel = 'flex-cell cor-green';
        }

        if(pulse < 40 || pulse > 140){
            pulseLevel = 'flex-cell cor-orange';
        }else if((pulse >=40 && pulse < 60 )||(pulse >=101 && pulse <= 140)){
            pulseLevel = 'flex-cell cor-yellow';
        }else{
            pulseLevel = 'flex-cell cor-green';
        }



        return (
            <section style={{paddingBottom:'60px',overflow: "auto"}}>
                <p className='measure-time'>
                {
                    oxygen == 0 && pulse == 0 ?'手指脱落':
                    !this.props.showLastTime?"正在测量："+dataTime
                    :"上次测量时间："+lastTime
                }
                </p>
                <p className='measure-data flex'>
                    <span className='flex-cell'>血氧</span>
                    <span className={oxygenLevel}>{oxygen>0?oxygen:'--'}</span>
                    <span className={oxygenLevel}>%</span>
                </p>
                <div className='d-range'>
                    <input type="range"  disabled max='99' min='79' value={oxygen}/>
                    <p className='range-line'>
                        <span style={{background:'#EB6E4A',width:'50%'}}></span>
                        <span style={{background:'#F7A905',width:'25%'}}></span>
                        <span style={{background:'#3FB57D',width:'25%'}}></span>
                    </p>
                    <p className='range-text'>
                        <span style={{left:'1%',color:'#EB6E4A'}}>0%</span>
                        <span style={{left:'48%',color:'#EB6E4A'}}>90%</span>
                        <span style={{left:'72%',color:'#3FB57D'}}>95%</span>
                        <span style={{left:'91%',color:'#3FB57D'}}>100%</span>
                    </p>
                    <p className='range-text'>
                        <span style={{left:'18%',top:'38px',color:'#EB6E4A'}}>非常危险</span>
                        <span style={{left:'53%',top:'38px',color:'#F7A905'}}>危险</span>
                        <span style={{left:'80%',top:'38px',color:'#3FB57D'}}>正常</span>
                    </p>
                </div>
                <p className='line'></p>
                <p className='measure-data flex'>
                    <span className='flex-cell'>脉率</span>
                    <span className={pulseLevel}>{pulse>0?pulse:'--'}</span>
                    <span className={pulseLevel}>次/分</span>
                </p>
                <div className='d-range'>
                    <input type="range"  disabled max='180' min='0' value={pulse}/>
                    <p className='range-line'>
                        <span style={{background:'#EB6E4A',width:'22.2%'}}></span>
                        <span style={{background:'#F7A905',width:'11.1%'}}></span>
                        <span style={{background:'#3FB57D',width:'22.2%'}}></span>
                        <span style={{background:'#F7A905',width:'22.2%'}}></span>
                        <span style={{background:'#EB6E4A',width:'22.2%'}}></span>
                    </p>
                    <p className='range-text'>
                        <span style={{left:'1%',color:'#EB6E4A'}}>0</span>
                        <span style={{left:'20%',color:'#EB6E4A'}}>40</span>
                        <span style={{left:'32%',color:'#3FB57D'}}>60</span>
                        <span style={{left:'52%',color:'#3FB57D'}}>100</span>
                        <span style={{left:'75%',color:'#F7A905'}}>140</span>
                    </p>
                    <p className='range-text'>
                        <span style={{left:'2%',top:'38px',color:'#EB6E4A'}}>非常危险</span>
                        <span style={{left:'24%',top:'38px',color:'#F7A905'}}>危险</span>
                        <span style={{left:'40%',top:'38px',color:'#3FB57D'}}>正常</span> 
                        <span style={{left:'62%',top:'38px',color:'#F7A905'}}>危险</span>
                        <span style={{left:'80%',top:'38px',color:'#EB6E4A'}}>非常危险</span>
                    </p>
                </div>
            </section>  





           
        );
    }
});