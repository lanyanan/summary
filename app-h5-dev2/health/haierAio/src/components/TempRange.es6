'use strict';
/**
 * 体温状态条组件
 * @prop {string} temp  体温值
 * @高温:<37
 * @正常    :36-37
 * @低温    :35
 * max min : 40 35
 */

export const TempRange = React.createClass({
    getInitialState: function(){
        return {
            temp:this.props.temp
        };
    },
    changeValue:function(event){
        console.log(event.target.value);
        //this.setState({temp: event.target.value});
    },
    render: function() {
        console.log(this.props.temp);
        return (
            <div className='d-range' style={{marginTop: '60px'}}>
                <input type="range"  disabled max='40' min='35' value={this.props.temp} onChange={this.changeValue}/>
                <p className='range-line'>
                    <span style={{background:'#FF4045',width:'20%'}}></span>
                    <span style={{background:'#40DA91',width:'20%'}}></span>
                    <span style={{background:'#F2CE3C',width:'60%'}}></span>
                </p>
                <p className='range-text'>
                    <span style={{left:'15%'}}>36.0</span>
                    <span style={{left:'35%'}}>37.0</span>
                </p>
                <p className='range-text'>
                    <span style={{left:'5%',top:'38px',color:'#FF4045'}}>低温</span>
                    <span style={{left:'26%',top:'38px',color:'#40DA91'}}>正常</span>
                    <span style={{left:'65%',top:'38px',color:'#F2CE3C'}}>高温</span>
                </p>
            </div>
           
        );
    }
});