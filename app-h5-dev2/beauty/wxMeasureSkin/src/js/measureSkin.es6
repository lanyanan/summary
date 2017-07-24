import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory} = ReactRouter;

/**
 * Toast提示
 * @param    {String}      msg提示信息
 */
function showToast(msg){
    clearTimeout(st);
    let toast = document.getElementById('toast');
    toast.style.display = 'block';
    toast.innerHTML = msg;
    var st = setTimeout(function(){
        toast.style.display = 'none';
    },3000);
}

function setDocumentTitle (title) {
     document.title = title;
     if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
         var i = document.createElement('iframe');
         i.src = '/favicon.ico';
         i.style.display = 'none';
         i.onload = function() {
             setTimeout(function(){
                  i.remove();
             }, 9)
         }
         document.body.appendChild(i);
     }
 }
// 创建React组件
export class MeasureSkin extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            part:0,
            status:1
        };
        het.setTitle('水油弹性测试');
        setDocumentTitle('水油弹性测试');
        this.myScroll = null;
        this.partArr = ['额头','左脸','右脸','鼻子','眼周','手部'];
        this.listenStore(Store); // 监听Store
        Actions.clearProTest();
        Actions.deviceInfo();
    }
    componentDidMount() {
        this.myScroll = new IScroll('#wrapper', {
            eventPassthrough: true,
            scrollX: true, 
            scrollY: false,
            preventDefault: false 
        });
    }
    componentWillUnmount() {
        Actions.initTest();
        clearInterval(window.deviceTimer);
        clearInterval(window.dataTimer);
    }
    choosePart(e) {
        if(this.state.onlineStatus == 2){
            showToast('设备不在线');
            return;
        }
        let part = parseInt(e.currentTarget.getAttribute('data-part'));
        this.setState({
            part:part,
            status:2,
            water:0,
            oil:0,
            elasticity:0,
            qrUrl:'',
            skinTypeName:''
        });
        Actions.setPart(part,'','qrcode');
    }
    reTest(e) {
        e.preventDefault();
        this.setState({
            status:2,
            water:0,
            oil:0,
            elasticity:0,
            qrUrl:'',
            skinTypeName:''
        });
        Actions.setPart(this.state.part,'','qrcode');
    }
    render() {
        console.log('最终数据:',JSON.stringify(this.state));
        //data-status 1:请选择部位 2:设备初始化 3:请将设备贴近部位 4:正在测试 5:展示测试结果
        let part = this.state.part || 0;
        let status = this.state.status;
        let lowBattry = '';
        let outline = '';
        let desc = '';
        if(this.state.onlineStatus == 2){
            outline = (<div className="outline">
                        <img src="../static/img/outline.png" />
                        <p>设备不在线</p>
                        <p>请开启设备并确保网络连接正常</p>
                       </div>);
        }
        if(this.state.onlineStatus != 2){
            desc = <span>请选择一个部位</span>;
        }
        if(this.state.electricity && this.state.electricity<=3 && !outline){
            lowBattry = <p className="low-battery"><img src="../static/img/power.png" />设备电量低，请及时充电</p>;
        }
        return (
            <div>
                <section id="wrapper" className={'partSection'}>
                    <section id="scroller">
                        <dl className={part == 1?'dl active':'dl'} data-part={1} onTouchTap={this.choosePart.bind(this)}>
                            <dt><img src={part == 1?'../static/img/forehead-r.png':'../static/img/forehead.png'}/></dt>
                            <dd>额头</dd>
                        </dl>
                        <dl className={part == 2?'dl active':'dl'} data-part={2} onTouchTap={this.choosePart.bind(this)}>
                            <dt><img src={part == 2?'../static/img/left-r.png':'../static/img/left.png'}/></dt>
                            <dd>左脸</dd>
                        </dl>
                        <dl className={part == 3?'dl active':'dl'} data-part={3} onTouchTap={this.choosePart.bind(this)}>
                            <dt><img src={part == 3?'../static/img/right-r.png':'../static/img/right.png'}/></dt>
                            <dd>右脸</dd>
                        </dl>
                        <dl className={part == 4?'dl active':'dl'} data-part={4} onTouchTap={this.choosePart.bind(this)}>
                            <dt><img src={part == 4?'../static/img/nose-r.png':'../static/img/nose.png'}/></dt>
                            <dd>鼻子</dd>
                        </dl>
                        <dl className={part == 5?'dl active':'dl'} data-part={5} onTouchTap={this.choosePart.bind(this)}>
                            <dt><img src={part == 5?'../static/img/eye-r.png':'../static/img/eye.png'}/></dt>
                            <dd>眼周</dd>
                        </dl>
                        <dl className={part == 6?'dl active':'dl'} data-part={6} onTouchTap={this.choosePart.bind(this)}>
                            <dt><img src={part == 6?'../static/img/hand-r.png':'../static/img/hand.png'}/></dt>
                            <dd>手部</dd>
                        </dl>
                    </section>
                </section>
                {/*请选择部位*/}
                <section className="measure-status" data-status={1} style={{display:status == 1?'':'none'}}>
                    {desc}
                    {lowBattry}
                    {outline}
                </section>
                {/*设备初始化*/}
                <section className="measure-status" data-status={2} style={{display:status == 2?'':'none'}}>
                    <img className="init" src="../static/img/init.png" />
                    <span>设备初始化中...</span>
                    {lowBattry}
                </section>
                {/*请将设备贴近部位*/}
                <section className="measure-status" data-status={3} style={{display:status == 3?'':'none'}}>
                    <span>{'请将设备贴近'+(this.partArr[part-1] || '')}</span>
                    {lowBattry}
                </section>
                {/*正在测试*/}
                <section className="measure-status" data-status={4} style={{display:status == 4?'':'none'}}>
                    <div className="measuring"></div>
                    <span>{'正在测试'+(this.partArr[part-1] || '')}</span>
                    {lowBattry}
                </section>
                {/*测试结果*/}
                <div className="border1" style={{display:status == 5?'':'none'}}></div>
                <section className="measure-result" data-status={5} style={{display:status == 5?'':'none'}}>
                    <section className="r-top">
                        <h3>{(this.partArr[part-1] || '')+'的肤质为'}</h3>
                        <h2>{this.state.skinTypeName}</h2>
                        <a href="##" className="re-test" onTouchTap={this.reTest.bind(this)}>重新测试</a>
                    </section>
                    <section className="r-middle">
                        <figure className="woe-data">
                            <h5 className="item water-item">水份<b>{this.state.water}</b><span>%</span></h5>
                            <p className="flex desc">
                                <span className="w40 tac">缺水</span>
                                <span className="w20 tac">正常</span>
                                <span className="w40 tac">湿润</span>
                            </p>
                            <p className="flex colorful water-color">
                                <i className="w40"></i><i className="w20"></i><i className="w40"></i>
                                <b style={{left:(this.state.water+'%')}}></b>
                            </p>
                            <p className="flex desc">
                                <span className="flex-cell tal">00</span>
                                <span className="flex-cell tac" style={{textIndent:'1.4rem'}}>40%</span>
                                <span className="flex-cell tac" style={{textIndent:'-0.8rem'}}>60%</span>
                                <span className="flex-cell tar">99.9%</span>
                            </p>
                        </figure>
                        <figure className="woe-data">
                            <h5 className="item oil-item">油份<b>{this.state.oil}</b><span>%</span></h5>
                            <p className="flex desc">
                                <span className="w15 tac">缺油</span>
                                <span className="w10 tac">正常</span>
                                <span className="w75 tac">偏油</span>
                            </p>
                            <p className="flex colorful oil-color">
                                <i className="w15"></i><i className="w10"></i><i className="w75"></i>
                                <b style={{left:(this.state.oil+'%')}}></b>
                            </p>
                            <p className="flex desc">
                                <span className="flex-cell tal">00</span>
                                <span className="flex-cell tal" style={{textIndent:'-0.8rem'}}>15%</span>
                                <span className="flex-cell tac" style={{textIndent:'-4.9rem'}}>25%</span>
                                <span className="flex-cell tal"></span>
                                <span className="flex-cell tal"></span>
                                <span className="flex-cell tal"></span>
                                <span className="flex-cell tar">99.9%</span>
                            </p>
                        </figure>
                        <figure className="woe-data">
                            <h5 className="item tx-item">弹性<b>{this.state.elasticity}</b></h5>
                            <p className="flex desc">
                                <span className="w37 tac">易皱纹</span>
                                <span className="w00 tac"></span>
                                <span className="w63 tac" style={{textIndent:'-1rem'}}>紧致</span>
                            </p>
                            <p className="flex colorful tx-color">
                                <i className="w37"></i><i className="w00"></i><i className="w63"></i>
                                <b style={{left:(this.state.elasticity*10+'%')}}></b>
                            </p>
                            <p className="flex desc">
                                <span className="flex-cell tal">00</span>
                                <span className="flex-cell tac" style={{textIndent:'-0.1rem'}}>3.7</span>
                                <span className="flex-cell tac"></span>
                                <span className="flex-cell tar">9.9</span>
                            </p>
                        </figure>
                    </section>
                    <div className="border"></div>
                    <section className="r-bottom">
                        <img src={this.state.qrUrl} />
                        <p>扫描二维码，在其他手机上查看测试结果，还可以获取更详细的肤质分析哦！</p>
                    </section>
                </section>
                <div className='m-toast' id='toast' style={{display: 'none'}}></div>
            </div>
        )
    }
}
