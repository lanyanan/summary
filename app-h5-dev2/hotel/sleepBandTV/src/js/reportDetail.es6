import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

// 创建React组件
export class ReportDetail extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount() {
        let theCanvas = ReactDOM.findDOMNode(this.refs.radialGradient);
        this.ctx = theCanvas.getContext("2d");
        let bgCanvas = ReactDOM.findDOMNode(this.refs.radialBg);
        this.bgctx = bgCanvas.getContext("2d");
        //初始化背景圆弧
        this.drawCicrle(this.bgctx,135,405,"#281e49",35);
        //初始化圆弧
        this.initCicrle(this.props.fallTime,this.props.shallowTime,this.props.deepTime);
    }
    clacLoction(angle){
        //圆弧半径及圆心坐标
        let radius = 166;
        let originX = 300;
        let originY = 220;
        const PI = Math.PI;
        let obj = {
            x : originX - radius*Math.sin(angle*PI/180),
            y : originY + radius*Math.cos(angle*PI/180)
        };
        return obj;
    }
    initCicrle(fall = 10,shallow = 20,deep = 20){
        //清除以前绘制的
        this.ctx.clearRect(0,0,1000,1000);
        let sum = Math.ceil(fall)+Math.ceil(shallow)+Math.ceil(deep);
        //计算分段端点角度及端点坐标
        let fallAngle = 45+Math.floor(fall*270/sum);
        let fallLocation = this.clacLoction(fallAngle);
        let fallX = fallLocation.x;
        let fallY = fallLocation.y;
        let shallowAngle = fallAngle+Math.floor(shallow*270/sum);
        let shallowLocation = this.clacLoction(shallowAngle);
        let shallowX = shallowLocation.x;
        let shallowY = shallowLocation.y;
        //添加分段颜色渐变
        let grd=this.ctx.createLinearGradient(84.5,284.5,fallX,fallY);
        grd.addColorStop(0,"#30d2b9");
        grd.addColorStop(1,"#3e55ff");
        let grd2=this.ctx.createLinearGradient(fallX,fallY,shallowX,shallowY);
        grd2.addColorStop(0,"#3e55ff");
        grd2.addColorStop(1,"#3e55ff");
        let grd3=this.ctx.createLinearGradient(shallowX,shallowY,303.5,284.5);
        grd3.addColorStop(0,"#3e55ff");
        grd3.addColorStop(1,"#c52ff0");
        //设置背景透明
        this.ctx.beginPath();
        this.ctx.strokeStyle = "transparent";
        this.ctx.fillStyle = "transparent";
        this.ctx.lineWidth = 0.1;
        this.ctx.lineCap = 'round';
        this.ctx.arc(300,220,165,(Math.PI/180)*0,(Math.PI/180)*360,false);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        //分段画圆弧
        this.drawCicrle(this.ctx,135,fallAngle+90,grd);
        this.drawCicrle(this.ctx,fallAngle+90,shallowAngle+90,grd2);
        this.drawCicrle(this.ctx,shallowAngle+90,405,grd3);
        //画标线
        let line1Loction = this.clacLoction(45+Math.floor(fall*270/sum)/2);
        let line2Loction = this.clacLoction(fallAngle+Math.floor(shallow*270/sum)/2);
        let line3Loction = this.clacLoction(shallowAngle+Math.floor(deep*270/sum)/2);
        this.drawLine(this.ctx,line1Loction.x,line1Loction.y,45+Math.floor(fall*270/sum)/2,"#30d2b9",fall);
        this.drawLine(this.ctx,line2Loction.x,line2Loction.y,fallAngle+Math.floor(shallow*270/sum)/2,"#6275ff",shallow);
        this.drawLine(this.ctx,line3Loction.x,line3Loction.y,shallowAngle+Math.floor(deep*270/sum)/2,"#d03bfb",deep);
    }
    drawCicrle(ctx,startAngle,endAngle,linerStyle,lineWidth=20){
        ctx.beginPath();
        ctx.arc(300, 220, 155, (Math.PI/180)*startAngle, (Math.PI/180)*endAngle , false); //这里的圆心坐标要和cirle的保持一致
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = linerStyle;
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.closePath();
    }
    drawLine(ctx,x,y,angle,color,value){
        if(value==0) return;
        //根据角度设置方向便宜
        let offsetX, //X轴偏转
            offsetY, //Y轴偏转
            textX,   //文字X位置
            textY;   //文字Y位置
        ctx.font = "normal 20px sans-serif";
        if(angle<135){
            offsetX = -20;
            offsetY = 20;
            textX = x+6*offsetX;
            textY = y+offsetY-offsetY/4;
        }else if(angle<180){
            offsetX = -20;
            offsetY = -20;
            textX = x+6*offsetX;
            textY = y+offsetY+offsetY/4;
        }else if(angle<225){
            offsetX = 20;
            offsetY = -20;
            textX = x+offsetX;
            textY = y+offsetY+offsetY/4;
        }else{
            offsetX = 20;
            offsetY = 20;
            textX = x+offsetX;
            textY = y+offsetY-offsetY/4;
        }
        //开始一个新的绘制路径
        ctx.beginPath();
        ctx.lineWidth = 1;
        //设置线条颜色为蓝色
        ctx.strokeStyle = color;
        //设置路径起点坐标
        ctx.moveTo(x, y);
        //定义中间点坐标1
        ctx.lineTo(x+offsetX, y+offsetY);
        //定义中间点坐标2
        ctx.lineTo(x+6*offsetX, y+offsetY);
        //按照绘制路径顺序连接各个坐标点
        ctx.stroke();
        //关闭绘制路径
        ctx.closePath();
        //添加文字
        ctx.fillStyle = color;
        ctx.strokeText(this.transTime(value), textX, textY);
        ctx.fillText(this.transTime(value), textX, textY);
    }
    componentWillReceiveProps(nextProps) {
        //在时间有变化时更新圆环
        if( nextProps.fallTime !== this.props.fallTime ||
            nextProps.shallowTime !== this.props.shallowTime ||
            nextProps.deepTime !== this.props.deepTime){
            this.initCicrle(nextProps.fallTime,nextProps.shallowTime,nextProps.deepTime);
        }
    }
    transTime(time){
        //格式化时间
        let hour = Math.floor(time/60);
        let minute = time-hour*60;
        hour = hour>=24 ? hour-24 : hour;
        hour = hour<10 ? "0"+hour : hour;
        minute = minute<10 ? "0"+minute : minute;
        return hour+"h"+minute+"min";
    }
    render() {
        return (
            <section className="reportDetail">
                <section className="radialGradient">
                    <canvas ref="radialGradient" className="radial" width="600" height="420"></canvas>
                    <canvas ref="radialBg" className="radialBg" width="600" height="420"></canvas>
                    <section className="message">
                        <label className="sleepQuality">{this.props.sleepQuality || '良好'}</label>
                        <label className="sleepType">{this.props.sleepType || '健康型睡眠'}</label>
                        <label className="sleepRank">{'超过'+(this.props.sleepRank || 65)+'%用户'}</label>
                    </section>
                </section>
                <ul className="sleepIcon flex">
                    <li className='fallAsleep flex-cell'>
                        <span></span>
                        <label>清醒</label>
                    </li>
                    <li className='shallowSleep flex-cell'>
                        <span></span>
                        <label>浅睡</label>
                    </li>
                    <li className='deepSleep flex-cell'>
                        <span></span>
                        <label>深睡</label>
                    </li>
                </ul>
                <ul className="sleepData flex">
                    <li className='dataDetail flex-cell'>
                        <section>{this.props.heartRate || 0}</section>
                        <div>
                            <label className="bigText">心率</label>
                            <label className="smallText">(次/分钟)</label>
                        </div>
                    </li>
                    <li className="gap"></li>
                    <li className='dataDetail flex-cell'>
                        <section>{this.props.respirationRate || 0}</section>
                        <div>
                            <label className="bigText">呼吸率</label>
                            <label className="smallText">(次/分钟)</label>
                        </div>
                    </li>
                    <li className="gap"></li>
                    <li className='dataDetail flex-cell'>
                        <section>{this.props.bodyMovement || 0}</section>
                        <div>
                            <label className="bigText">体动</label>
                            <label className="smallText">(次)</label>
                        </div>
                    </li>
                </ul>
                <section className="sleepAnalysis">
                    <section className="analysisHeader">
                        <span className="starIcon"></span>
                        <span className="analysisTitle">睡眠分析</span>
                    </section>
                    <section className="analysisDetail">
                        {this.props.analysisDetail || 
                        "睡眠质量良好，偶有心率不齐症状，可定期观察。请继续保持良好的睡眠作息。"}
                    </section>
                </section>
            </section>
        );
    }
}