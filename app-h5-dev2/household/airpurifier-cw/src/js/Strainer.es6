'use strict';
/**
 * 进度条组件
 * @prop {boolean} rangedisable  滑动条是否可用
 * @prop {integer} windStall  	运行速率，取值0-92
 * @prop {integer} rate  		每档间隔值 用来确定档位范围
 * @act  Actions.selectRate([integer])  切换档位时触发
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
var {Link} = ReactRouter;

export class Strainer extends BaseComponent{
    constructor(props) {
        het.setTitle('滤网寿命');
        super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store
        //Actions.pushGuiderData(); // 请求推送向导数据
        Actions.getData();
        this.getArc = this.getArc.bind(this);
    }
	skip(e){
        e.stopPropagation();
        e.preventDefault();
        het.toast('het://skip_buy_strainer');
  }
  componentDidMount() {
    let rect = this.refs.remainCon.getBoundingClientRect();
    this.canvasWidth = rect.width;
    this.canvasHeight = rect.height;
    this.setState({canvasWidth: this.canvasWidth, canvasHeight: this.canvasHeight},()=>{
      let life = parseInt(this.state.S5, 16) * 256 + parseInt(this.state.S6, 16) || 600;
       this.getArc(life);
    })
  }
  componentDidUpdate(nextProps, nextState) {
    let life = parseInt(this.state.S5, 16) * 256 + parseInt(this.state.S6, 16) || 600;

    this.getArc(life);
  }
  getArc(life){
    let c = this.refs.circle;
    let ctx = c.getContext("2d");
    
    ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight);
    ctx.beginPath();
    ctx.strokeStyle="#fff";
    ctx.lineWidth= 12;
    ctx.arc(this.canvasWidth/2,this.canvasHeight/2,this.canvasHeight/2-6,0*Math.PI,life/600*2*Math.PI);
    ctx.stroke();
  }
	render() {
      let life = parseInt(this.state.S5, 16) * 256 + parseInt(this.state.S6, 16) || 600;
      let remain = 600-life;
      // let remainCon2,remainCon3,remainCon3Class;
      // if(remain <= 300){remainCon2 = 0; remainCon3Class = 'noChange';remainCon3 = 180+360 * remain/600;}
      // if(remain > 300){remainCon3Class = 'change';remainCon3 = 180; remainCon2 = 360 * (remain-300)/600;}
	    return (
	        <section className="strBody">
               <div className='remain'>
                    <div className='remainCon' ref='remainCon' style={{border: '0.9rem solid rgb(110,186,226)'}}>
                        <p>剩余滤网寿命</p>
                        <p><span className='remainConSpan'>{life}</span>小时</p>
                    </div>
                    <canvas ref='circle' className='arc' width={this.state.canvasWidth} height={this.state.canvasHeight}></canvas>
                    {/*<div className='remainCon2' style = {{transform:'rotate('+remainCon2+'deg)'}}></div>
                    <div className='remainCon3' style = {{backgroundColor:remainCon3Class == 'change'? 'rgb(110,186,226)':'white',transform:'rotate('+remainCon3+'deg)'}}></div>*/}
               </div>
            
	        </section>
	    );
	}
};