export class CloseView extends React.Component{
    constructor(props){
        super(props);
        // this.state = {showPlanSetting:props.showPlanSetting||false};
        this.showPlanSetting = props.showPlanSetting || false;
        this.planInfo = props.planInfo || {time:'09:30',color:"#ff0000",brightness:'50%',mist:'小雾'};
    }
    componentWillReceiveProps(props){
        this.planInfo = props.planInfo || {time:'09:30',color:"#ff0000",brightness:'50%',mist:'小雾'};
        this.showPlanSetting = props.showPlanSetting || false;
    }
    tapHandle(e){
        e.preventDefault();
        e.stopPropagation();
    }
    render(){
        let dom;
        if(this.showPlanSetting){
            dom = (
            <div className="timeContainer1">
            <div className="row">
                <span>时间</span>
                <span>{this.planInfo.time}</span>
            </div>
            <div className="row">
                <span>颜色</span>
                <div  style={{width:'24px',height:'24px',backgroundColor:`${this.planInfo.color}`,display:'inline-block'}}></div>
            </div>
            <div className="row">
                <span>亮度</span>
                <span>{this.planInfo.brightness}</span>
            </div>
            <div className="row">
                <span>雾化</span>
                <span>{this.planInfo.mist}</span>
            </div>
            </div>
                );
        }else{
            dom = (<div className="tip">
                设置定时开启
            </div>)
        }
        return(
            <div className="closeViewBack">
                {dom}
            </div>
        );
    }
}
