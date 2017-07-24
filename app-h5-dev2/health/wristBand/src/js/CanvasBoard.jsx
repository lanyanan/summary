const  {Link} = ReactRouter;
import {isIOS,fillZero } from'./LocalFuns.jsx';
let StrokeArc = function (obj, opts) {
    if (obj.nodeType !== 1 && obj.nodeName == 'canvas') {
        console.log('请传入一个有效的Canvas对象或dom对象');
        return false;
    };
    this.ctx = obj.getContext('2d');
    this.gradient = this.ctx.createLinearGradient(81, 190, 229, 188);
    this.gradient.addColorStop("0", "#9555eb");
    this.gradient.addColorStop("0.5", "#9a51e9");
    this.gradient.addColorStop("0.7", "#6b76f9");
    this.gradient.addColorStop("1", "#27c8ed");
    this.init(opts);
};
    StrokeArc.prototype = {
        constructor: StrokeArc,
        init: function (opts) {
            if (Object.prototype.toString.call(opts) === "[object Object]") {
                this.ctx.save();
                this.ctx.clearRect(0,0,480,480);
                this.ctx.beginPath();
                !opts.hideLineCap && (this.ctx.lineCap = 'round');
                this.ctx.strokeStyle = opts.lineColor || this.gradient;
                this.ctx.lineWidth = opts.lineWidth || 20;
                this.ctx.arc((opts.x || 240), (opts.y || 240), (opts.r || 220), Math.PI * 0.75, Math.PI * (opts.eAngle || 2.25));
                this.ctx.stroke();
                this.ctx.restore();
            }
        },
    };
export const CanvasBoard = React.createClass({
    componentDidMount(){
        let background = new StrokeArc(document.querySelector('#canvas1'), {
            x: 240,
            y: 240,
            r: 220,
            eAngle: 2.25,
            lineWidth: 20,
            lineColor: 'rgba(0,0,0,0.4)',
        });
    },
    componentWillReceiveProps(next){
        let per = next.data.walkTarget==0? 0.75:(0.75 + next.data.stepCount/next.data.walkTarget*100*0.015);

        if(this.props.data.stepCount !=next.data.stepCount || this.props.data.walkTarget !=next.data.walkTarget){
            let progress = new StrokeArc(document.querySelector('#canvas'), {
                x: 240,
                y: 240,
                r: 220,
                eAngle: per>2.25 ? 2.25: (( per>0.75 && per<0.7615  ) ? 0.7615:per),
                lineWidth: 20,
                hideLineCap: per==0.75?true:false
            });
        }
    },
    render() {
        let percent = this.props.data.walkTarget ==0 ? 0 : this.props.data.stepCount/this.props.data.walkTarget*100,
            today = new Date().getFullYear()+'-'+fillZero(new Date().getMonth()+1)+'-'+fillZero(new Date().getDate()),
            isToday = this.props.data.viewDate == today ? 1 : 0;
            percent>0 && percent<1 && (percent=1);
            percent = parseInt(percent);
        return (
            <section className={this.props.data.showClndr?'dashboard transparent':'dashboard'}>
                <a href="#/PageSport" style={{display:'block',width:'100%'}}>
                    <canvas id="canvas1" className='canvas' width="480" height="480" style={{width: '21.55555556rem', height: '21.55555556rem'}}> </canvas>
                    <canvas id="canvas" className='canvas' width="480" height="480" style={{width: '21.55555556rem', height: '21.55555556rem'}}> </canvas>

                    <div className="slogan">{ isToday ? (percent<100 ?'目标进行中':'恭喜，目标已完成'):(percent<100?'目标未完成':'目标已完成')}</div>
                    <div className="percent">{isNaN(percent)?0:percent}<span>%</span></div>
                    <div className="status"><img src="../static/img/layout/i-chain.png" />
                        {this.props.data.connectTxt==0?'连接已断开':'手环已连接'}
                    </div>
                    <div className="steps">目标:{this.props.data.walkTarget}步</div>
                </a>
            </section>
        )
    }
});