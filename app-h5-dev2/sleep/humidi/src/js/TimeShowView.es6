export class TimeShowView extends React.Component{
    constructor(props){
        super(props);
        this.showPlanSetting = props.showPlanSetting || false;
        this.planInfo = props.planInfo || {time:'09:30',color:"#ff0000",brightness:'50%',mist:'小雾'};
    }
    componentWillReceiveProps(props){
        this.planInfo = props.planInfo || {time:'09:30',color:"#ff0000",brightness:'50%',mist:'小雾'};
        this.showPlanSetting = props.showPlanSetting || false;
    }
    tapHandle(e){
        // e.preventDefault();
        // e.stopPropagation();
    }
    render(){
        let timeDom;
        if(this.showPlanSetting){
            timeDom = (
            <div className="timeContainer1" onTouchEnd={this.tapHandle.bind(this)}>
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
            timeDom = <span style={{height:'44px',color:'#64627f',fontSize:'16px',lineHeight:'44px',marginRight:'16px',float:'right',marginLeft:'auto'}} onTouchEnd={this.tapHandle.bind(this)}>未设置</span>
        }
        return(
            <section className="timeShowView">
                <p className="tip1" style={{fontSize:'16px',color:'#fff'}}>定时开启</p>

                <div className="containerTime">
                    {timeDom}
                </div>
            </section>
        );
    }
}
