import {PickerView1} from './PickerView1.es6';

export const MistState = {
    MistStateClose:  0,
    MistStateHigh:   1,
    MistStateHalf:   2,
    MistStateSleep:  3
}
export class AromaMistAndTimeView extends React.Component{
    constructor(props){
        super(props);
        this.state ={showSetwMistView:false,
                    showSetTimeView:false};
    }
    componentWillUnmount(){
        console.log("xxx");
    }
    //处理选择雾化
    tapHandle(e){
        let index = parseInt(e.currentTarget.getAttribute('data-val'));
        if(index != this.props.mist){
            if(typeof this.props.changeMist === "function"){
                this.props.changeMist(index);
            }
        }
        this.disMiss(e);
    }
    //处理选择关闭时间
    closeTimeHandle(mins){
        if(typeof this.props.changCloseTime === "function"){
            this.props.changCloseTime(mins);
        }
        this.disMissTime();
    }
    disMiss(e){
        if(e){
            e.preventDefault();
            e.stopPropagation();
        }
        this.setState({showSetwMistView:false});
    }
    disMissTime(e){
        if(e){
            e.preventDefault();
            e.stopPropagation();
        }
        this.setState({showSetTimeView:false});
    }
    render(){
        let mistStrArr = ["关闭","二挡","一档","睡眠"];
        let setTimeViewDom;
        let tableName,containerName;
        //这里类名叫错，setTimeView 应该是设置弹出的雾化的
        if(this.state.showSetwMistView){
            tableName = "table show";
            containerName = "setTimeView setTimeView_show";
        }else{
            tableName = "table hidden"
            containerName = "setTimeView setTimeView_hidden"
        }
            setTimeViewDom = <div className={containerName} onTouchEnd={this.disMiss.bind(this)}>
                <section className={tableName}>
                    {mistStrArr.map((ele,index)=>{
                        return <span key={index} data-val={index} className="item" onTouchStart={this.tapHandle.bind(this)}>{ele}</span>
                    })}
                    {mistStrArr.map((ele,index)=>{
                        if(this.props.mist === index){
                            let top = +(index*44 + 16.5) + 'px';
                            let styleObj = {height:'11px',width:'16px',position:'absolute',right:'16px',top:`${top}`}
                            return <img src="../static/img/pic-11@2x.png" alt="" style={styleObj} key={index}/>
                        }
                    })}
                </section>
            </div>

        let pickerViewDom;
        let pickViewName,pickContainerName;
        if(this.state.showSetTimeView){
            pickViewName = "pickerView show";
            pickContainerName = "setMistView setMistView_show";
        }else{
            pickViewName = "pickerView hidden";
            pickContainerName = "setMistView setMistView_hidden";
        }
        pickerViewDom = (
            <div className={pickContainerName} onTouchEnd={this.disMissTime.bind(this)}>
                <section className={pickViewName}>
                        <PickerView1 data={["关闭","5","10","30","60","120"]} disMiss={this.disMissTime.bind(this)} closeTimeHandle={this.closeTimeHandle.bind(this)}></PickerView1>

                </section>
            </div>
        );
        return(
            <section className="mistAndTime">
                <div className="left">
                    <div className="item">
                        <p>{mistStrArr[this.props.mist]}</p>
                    </div>
                    <div className="item" onTouchEnd={(e)=>{               e.preventDefault();
                        e.stopPropagation(); this.setState({showSetwMistView:true});}}>
                        <span>雾化  </span>
                        <img src="../static/img/ico2.png" alt=""/>
                    </div>
                </div>

                <div className="right">
                    <div className="item">
                        <span>{this.props.time}</span>
                        <span style={{fontSize:'10px', marginLeft:'5px'}}>min</span>
                    </div>
                    <div className="item" onTouchEnd={(e)=>{
                        e.preventDefault();
                        e.stopPropagation();
                        this.setState({showSetTimeView:true});}}>
                        <span>定时关闭  </span>
                        <img src="../static/img/ico2.png" alt=""/>
                    </div>
                </div>
                {setTimeViewDom}
                {pickerViewDom}
            </section>
        );
    }
}
