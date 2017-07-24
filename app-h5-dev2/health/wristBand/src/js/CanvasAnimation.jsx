import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {isIOS } from'./LocalFuns.jsx';
let timer = null,
    time = 0,
    canvas = null,
    canvasBg = null,
    context= null,
    contextBg = null,
    rotating = (context,text,color)=>{
        context.save();
        context.clearRect(0,0,480,480);
        context.height=480;
        context.width=480;
        //drawNotChange(context,text,color);
        context.translate(240,240);
        context.beginPath();
        context.lineCap = 'round';
        context.lineWidth=20;
        context.strokeStyle='#637efa';
        context.rotate(time*Math.PI/180);
        context.translate(0,0);
        context.arc(0,0,230,Math.PI,Math.PI*1.5,false);

        context.stroke();
        context.restore();

        time+=1;
    },
    drawNotChange = (context,text,color)=>{
        context.clearRect(0,0,480,480);
        //context.translate(240,240);
        context.beginPath();
        context.font="60px sans-serif";
        context.fillStyle= color;
        context.textBaseline = "middle";
        context.textAlign ='center';
        //context.fillText(text,-context.measureText(text).width/2,0);
        context.fillText(text,240,240);
        context.beginPath();
        context.lineWidth=20;
        context.strokeStyle= 'rgba(0,0,0,0.4)';
        context.arc(240,240,230,0*Math.PI,2*Math.PI);
        context.stroke();
    };
export const Canvas = React.createClass({
    componentDidMount(){
        //旋转圆弧动画dom
        canvas=document.getElementById('canvas');
        context=canvas.getContext('2d');

        //脏区重绘面积太大，整体擦除重绘，背景圆弧dom不参与重绘，另起炉灶
        canvasBg=document.getElementById('canvas-bg');
        contextBg=canvasBg.getContext('2d');

        //默认进入就进入连接中状态
        drawNotChange(contextBg,"正在连接中...",'#637efa');
        clearInterval(timer);
        timer = setInterval(function(){
            rotating(context,"正在连接中...",'#637efa')
        }, 16);
    },
    componentWillReceiveProps(next){
        console.log('----------------first-----------------');
        //canvas旋转动画流程控制
        console.log(next.data.connect,'next.data.connect-this.props.data.connect)',this.props.data.connect);
        time = 0;
        clearInterval(timer);
        switch (this.props.data.connect){
            case 'fail':
                context.clearRect(0,0,480,480);选
                clearInterval(timer);
                drawNotChange(contextBg,"手环连接失败",'#e95316');break;
            case 'scan':
                contextBg.clearRect(0,0,480,480);
                drawNotChange(contextBg,"正在连接中...",'#637efa');
                timer = setInterval(function(){
                    rotating(context,"正在连接中...",'#637efa')
                }, 16);
                break;
            case 'sync':
                drawNotChange(contextBg,"数据同步中...",'#fff');
                timer = setInterval(function(){
                    rotating(context,"数据同步中...",'#fff');
                }, 16);break;
            case 'syncOk':
                clearInterval(timer);break;
        }
    },
    render() {
        return (
            <div className={isIOS}>
                <section className={ (this.props.data.showClndr?'dashboard transparent':'dashboard')}>
                    <canvas id="canvas-bg" className='canvas'
                            width="480" height="480" style={{width: '21.55555556rem', height: '21.55555556rem'}}>
                    </canvas>
                    <canvas id="canvas" className='canvas'
                            width="480" height="480" style={{width: '21.55555556rem', height: '21.55555556rem'}}>
                    </canvas>
                </section>
            </div>
        )
    }
});