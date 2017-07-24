/**
 * Created by ben on 2017/1/11.
 */
'use strict';
import Range from './../../../common/src/lib/range.jsx';

export const TempSelect = React.createClass({
    getInitialState: function(){
        //let min = this.props.min ;
        //let max = this.props.max;
        //let value = this.props.value;
        //if (value < min) {
        //    value = min;
        //} else if (value > max) {
        //    value = max;
        //}
        return {
            showOpacity:1,
            timeDisplay:false,
            temp : null,
            last : this.props.min,
        };
    },
    componentWillReceiveProps: function(next) {
        var showOpacity = this.state.showOpacity;
        let min = this.props.min ;
        let max = this.props.max;
        let value = this.props.value;
        if (value < min) {
            value = min;
        } else if (value > max) {
            value = max;
        }
        this.setState({initialTemp:value});


        if(next.show == true){
            this.setState({timeDisplay:true});
            //clearInterval(this.timr);
            //this.timr = setInterval(function(){
            //    showOpacity += 1;
            //    if(showOpacity>=1){
            //        clearInterval(this.timr);
            //        this.setState({showOpacity:showOpacity});
            //    }
            //    console.log('showOpacity',showOpacity);
            //}.bind(this),10)
            this.setState({showOpacity:1});
            //console.log('初始温度:',this.state.initialTemp,'props.value',this.props.value);
        }else if(next.show == false){
            clearInterval(this.timr);
            //时间选择的确定button 和 覆盖的 功能按钮(速冻)位置相同. 时间选择界面消失过快 会导致速冻也被点击.
            this.timr = setInterval(function(){
                showOpacity -= 1;
                // console.log('1',showOpacity,parseInt(showOpacity));
                if(showOpacity<=0){
                    clearInterval(this.timr);
                    this.setState({timeDisplay:false});
                    this.setState({showOpacity:showOpacity});
                }
            }.bind(this),10);
        }
    },
    endDefault:function(e){
        //阻止IOS上冒泡触发iscroll事件
        e.stopPropagation();
        e.preventDefault();
    },
    isNum:function(s) {
        if (s!==null && s!=='') return !isNaN(s);
        return false;
    },
    touchEnd:function(e){
        let val = this.isNum(this.state.temp) ? this.state.temp : this.state.last; // 防止无效操作
        let er1=typeof this.props.cb==='function';
        let er2=this.state.temp != this.state.last;
        if (typeof this.props.cb==='function' && this.state.temp != this.state.last) {
            this.props.cb(val);
        }
    },
    feedback:function(value){
        let val = Math.round(value);
        //console.log('range:='+val+'this.props.minus='+this.props.minus);
        this.setState({temp: this.props.minus ? -val : val});
    },
    submitclock:function(e){
        if(typeof this.props.submitClock === 'function'){
            console.log('初始温度:',this.state.initialTemp,'this.state.temp',this.state.temp);
            if(this.state.temp != null){
                this.props.submitClock(this.state.temp,this.props.boot);
                console.log('温度选择,如果不滑动拉杆,看是什么值',this.state.temp);
                this.state.temp=null;
            }else{
                this.props.submitClock(this.state.initialTemp,this.props.boot);
            }

        }else{
            console.log('error:the submit callback is not a function');
        }
        e.stopPropagation();
        e.preventDefault();
    },
    cancelclock:function(e){
        //取消选择
        if(typeof this.props.cancelClock === 'function'){

            this.props.cancelClock();
            console.log('取消选择');
            //this.setState({temp:0,initialTemp:0});
            //this.state.temp=0;
            //this.state.initialTemp = 0;
        }else{
            console.log('error:the cancel callback is not a function');
        }
        e.stopPropagation();
        e.preventDefault();

    },
    render: function() {
        let min = this.props.minus ? -this.props.min : this.props.min ;
        let max = this.props.minus ? -this.props.max : this.props.max;
        //let value = this.state.initialTemp||min;
        let value =this.props.value;
        /*设定range的头文字标题*/
        let titleValue = this.state.temp===null ? value : this.state.temp;//显示选择的温度or时长
        if(titleValue == this.props.max+1 || titleValue == 255){
            titleValue ='关闭';
        }else{
            titleValue +='℃';
        }
        let currentTitle = this.props.boot ==0?'冷冻室温度':'冷藏室温度';
        return (
            <section className='timeSelect' style={{display:this.state.timeDisplay?'block':'none',opacity:this.state.showOpacity}}>
                <section onTouchEnd={this.cancelclock}></section>
                <section className="timeselect">
                    <section className='selectbtn flex'>
                        <span className='flex-cell' onTouchEnd={this.cancelclock}>取消</span>
                        <span className='flex-cell' onTouchEnd={this.submitclock}>确定</span>
                    </section>
                    <section className='selecttitle'>
                        <h5>{titleValue}</h5>
                        <h4>{currentTitle}</h4>
                    </section>
                    <section className="range">
                        <span className="label1">{this.props.min}</span>
                        <section className="rangeblock">
                            <div className="t-range" onTouchEnd={this.touchEnd}><Range min={min} max={max+1} value={value==255?max+1:value} fnFeedback={this.feedback} /></div>
                        </section>
                        <span className="label2">{this.props.max}</span>
                    </section>
                </section>
            </section>

        );
    }
});