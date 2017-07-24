'use strict';
/**
 */
const AppData = {
    arrIds: [],
    arrPers: []
}
export class CircleProgress extends React.Component {

    constructor(props) {
        super(props)
        this.drawCircleProgress = this.drawCircleProgress.bind(this)
        this.drawBg = this.drawBg.bind(this)
        this.drawProgress = this.drawProgress.bind(this)
        this.drawInnerCircle = this.drawInnerCircle.bind(this)
    }

    drawCircleProgress() {
        // console.log("View--> 绘制CircleProgress-->drawCircleProgress");
        // let c = ReactDOM.findDOMNode(this.refs.process);
        let id = this.props.circleProgressId;
        let c = document.getElementById(id);
        let process = this.props.percent;
        let position = AppData.arrIds.indexOf(id);
        if (position != -1) {
            AppData.arrIds.splice(position, 1);
            AppData.arrPers.splice(position, 1);
        }
        AppData.arrIds.push(id);
        AppData.arrPers.push(process);
        // console.log("View--> 绘制CircleProgress-->drawCircleProgress, process : "+process+",, id : "+id);
        let width = c.getAttribute('width');
        let height = c.getAttribute('height');
        let lineColor = c.getAttribute('data-linecolor');
        let lineColorBg = c.getAttribute('data-linecolorbg');
        let lineWidth = c.getAttribute('data-linewidth');
        let ctx = c.getContext('2d');

        this.drawBg(ctx, width, lineColorBg);
        this.drawProgress(ctx, width, process, lineColor);
        this.drawInnerCircle(ctx, width, lineWidth);

    }

    drawBg(ctx, width, lineColorBg) {
        ctx.beginPath();
        ctx.arc(width / 2, width / 2, width * 0.5, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = lineColorBg;
        ctx.fill();
    }

    drawProgress(ctx, width, process, lineColor) {
        // 画进度环
        ctx.beginPath();
        ctx.moveTo(width * 0.5, width * 0.5);
        ctx.arc(width * 0.5, width * 0.5, width * 0.5, Math.PI * 1.5, Math.PI * (1.5 + 2 * process / 100));
        ctx.closePath();
        ctx.fillStyle = lineColor;
        ctx.fill();
    }

    drawInnerCircle(ctx, width, lineWidth) {
        // 画内填充圆
        ctx.beginPath();
        ctx.arc(width * 0.5, width * 0.5, width * 0.5 * (1 - lineWidth), 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = '#fff';
        ctx.fill();
    }

    componentDidMount() {
        // console.log("View--> 绘制CircleProgress-->componentDidMount");
        this.drawCircleProgress();
    }

    // shouldComponentUpdate(){
    //     // console.log("View--> 绘制CircleProgress-->shouldComponentUpdate");
    //     let percent = this.props.percent;
    //     let id = this.props.circleProgressId;
    //     let position = AppData.arrIds.indexOf(id);
    //     if (position != -1 && AppData.arrPers[position] == percent) {
    //         console.log("View--> 绘制CircleProgress, shouldComponentUpdate,   don't need to refresh : " + position + ", savePer : " + AppData.arrPers[position] + ", percent : " + percent + ", id : " + id);
    //         return false;
    //     }
    //     // this.drawCircleProgress();
    //     // console.log("View--> 绘制CircleProgress-->shouldComponentUpdate, start to refresh : id->"+id+", percent->"+percent);
    //     return true;
    // }

    componentDidUpdate() {
        let percent = this.props.percent;
        let id = this.props.circleProgressId;
        let position = AppData.arrIds.indexOf(id);
        if (position != -1 && AppData.arrPers[position] == percent) {
            // console.log("View--> 绘制CircleProgress-->componentDidUpdate, don't need to refresh : " + position + ", savePer : " + AppData.arrPers[position] + ", percent : " + percent + ", id : " + id);
            return;
        }
        // console.log("View--> 绘制CircleProgress-->componentDidUpdate");
        this.drawCircleProgress();
    }

    render() {
        let percent = this.props.percent;
        let lineColor = this.props.lineColor;
        let lineColorBg = this.props.lineColorBg;
        let diameter = this.props.diameter;
        let lineWidth = this.props.lineWidth;
        let id = this.props.circleProgressId;

        return <canvas id={id} ref="process" width="600" height="600" data-process={percent}
                       data-linecolor={lineColor} data-linecolorbg={lineColorBg}
                       data-linewidth={lineWidth}
                       style={{width: diameter, height: diameter}}></canvas>
    }
}