import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';

export class LeftSide extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            duration : 0
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.items = ['--',"在床","在床","在床","在床","在床","在床","离床","在床",
                        "离床","离床","离床","在床","在床","在床","--"];
    }
    componentDidMount(){
        this.timeClock = setInterval(()=>{
            this.setState({
                duration: Number(this.state.duration)+1
            });
        },1000);
    }
    componentWillUnmount() {
        clearInterval(this.timeClock);
    }
    render() {
        let duration = this.state.duration || "00:00:00";
        if(this.state.duration){
            let hour = Math.floor(duration/3600);
            let minute = Math.floor((duration-hour*3600)/60);
            let secend = Math.floor(duration-hour*3600-minute*60);
            hour = hour<10 ? "0"+hour : hour;
            minute = minute<10 ? "0"+minute : minute;
            secend = secend<10 ? "0"+secend : secend;
            duration = hour + ":" + minute + ":" +secend;
        }
        let sleepStatus = this.props.sleepStatus || 0;
        return (
            <section className="leftSide">
                <section className="sleepStatus">
                    <span>睡眠状态</span>
                    <label>{this.items[sleepStatus]}</label>
                </section>
                <section className="monitoringTime">
                    <span>监测时长</span>
                    <label>{duration}</label>
                </section>
            </section>
        );
    }
}