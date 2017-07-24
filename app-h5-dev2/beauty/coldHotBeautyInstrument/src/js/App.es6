import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import SettingButton from './SettingButton.jsx';
import {TimeSelect} from './TimeSelect.es6';
import {Range} from './Range.es6';

function getHotGear(deg){
    let index=0;
    switch(deg){
        case 38:
            index=1;
            break;
        case 40:
            index=2;
            break;
        case 42:
            index=3;
            break;
        case 44:
            index=4;
            break;
        case 46:
            index=5;
            break;
        default:
            index=1;
    }
    return index;
}
function getColdGear(deg){
    let index=0;
    switch(deg){
        case 14:
            index=1;
            break;
        case 12:
            index=2;
            break;
        case 10:
            index=3;
            break;
        case 8:
            index=4;
            break;
        case 6:
            index=5;
            break;
        default:
            index=1;
    }
    return index;
}

// 创建React组件
export class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            showHotRange: false,
            showColdRange: false,
            needSave: false,
            skinTypeName:'',
            timeshow: false,
            hotshow: false,
            coldshow: false,
            modeshow: false,
            shockshow: false,
            smartModeSwitch: 0,
            massageSwitch: 0,
            arrayInit:false,
            modeName: 2, 
            modeWord: '弹性护理',
            modeImg: 'flex',
            hotTemp: 42,
            coldTemp: 8,
            workMinutes: 8,
            steps : [{'name':'热护理','timeLength':6,'mark':'hot'},{'name':'冷护理','timeLength':2,'mark':'cold'}],
            defaultminute: 42,
            currentActiveIndex: -1,
        };
        //[{'modeName':2,'modeWord':'弹性护理','modeImg':'Flex','modeChanged':false,'hotTemp':42,'coldTemp':8,'workMinutes':8,'steps': [{'name':'热护理','timeLength':6},{'name':'冷护理','timeLength':6}]}]
        this.maxminute = 46;
        this.minminute = 38;
        this.startY = 0;
        this.newY = 0;
        this.listenStore(Store); // 监听Store
    }
    cancelClock(){
        this.setState({
            timeshow: false,
            arrayInit:true
        });
    }
    submitClock(h,m,s){
        let index = this.state.currentActiveIndex;
        let modeName = this.state.modeName;
        let workMinutes = 0;
        if(modeName == 10||modeName == 16||modeName==17){
            let steps = this.state.steps;
            let tl = steps[index].timeLength;
            steps[index].timeLength = m;
            for(let i=0,len=steps.length;i<len;i++){
                workMinutes += steps[i].timeLength;
            }
            if(workMinutes==0){
                het.toast('护理时长最少1分钟');
                steps[index].timeLength = tl;
                return false;
            }else if(workMinutes > 10){
                het.toast('护理时长不超过10分钟');
                steps[index].timeLength = tl;
                return false;
            }
            this.setState({
                timeshow: false,
                arrayInit: true
            });
            Actions.submitClock(m,index,modeName,workMinutes);
        } 
    }
    submitHot(value){
        let modeName = this.state.modeName;
        Actions.selectHotRate(value,modeName);
    }
    submitCold(value){
        let modeName = this.state.modeName;
        Actions.selectColdRate(value,modeName);
    }
    cancelHot(){
        Actions.cancelHotRange();
    }
    cancelCold(){
        Actions.cancelColdRange();
    }
    cancelMode(e){
        e.stopPropagation();
        e.preventDefault();
        this.setState({
            modeshow: false
        });
    }
    cancelShock(e){
        e.stopPropagation();
        e.preventDefault();
        this.setState({
            shockshow: false
        })
    }
    changeMode(){
        let model = this.state.smartModeSwitch;
        if(this.state.skinTypeName == null && model == 0){
            het.toast('您还未测试肤质，请先测试肤质！');
            return;
        }else{
            Actions.changeMode(model);
        }
    }
    confirmMode(e){
        let index = e.currentTarget.getAttribute('data-mode');
        this.setState({mIndex: index,modeshow: false});
        Actions.confirmMode(index);
    }
    confirmShock(e){
        this.setState({shockshow: false});
        let index = e.currentTarget.getAttribute('data-shock');   
        let modeName = this.state.modeName;
        Actions.confirmShock(index,modeName);
    }
    submit(){
        let data = {};
        data.smartModeSwitch = this.state.smartModeSwitch,
        data.massageSwitch = this.state.massageSwitch,
        data.modeName = this.state.modeName;
        data.workMinutes = this.state.workMinutes;
        data.hotTemp = this.state.hotTemp,
        data.coldTemp = this.state.coldTemp,
        data.steps = this.state.steps;
        Actions.submit(data);
    }
    startTouch(e){
        if(this.state.smartModeSwitch == 1){
            return false;
        }
        this.newY = 0;
        this.startY = parseInt(e.touches[0].clientY);
    }
    moveTouch(e){
        if(this.state.smartModeSwitch == 1){
            return false;
        }
        this.newY = parseInt(e.touches[0].clientY);
    }
    endTouch(e){
        if(this.state.smartModeSwitch == 1){
            return false;
        }
        let disY = this.newY || this.startY - this.startY;
        if(Math.abs(disY)<=20){
            let type = e.currentTarget.getAttribute('data-type');
            switch(type){
                case 'mode':
                    clearTimeout(this.timer1);
                    let mode = ReactDOM.findDOMNode(this.refs.mode);
                    mode.style.background = '#fde7ee';
                    this.timer1 = setTimeout(function(){
                        mode.style.background = '';
                        this.setState({
                            modeshow: true,
                        })
                    }.bind(this),80);
                    break;
                case 'shock':
                    clearTimeout(this.timer2);
                    let shock = ReactDOM.findDOMNode(this.refs.shock);
                    shock.style.background = '#fde7ee';
                    this.timer2 = setTimeout(function(){
                        shock.style.background = '';
                        this.setState({
                            shockshow: true
                        })
                    }.bind(this),80)
                    break;
                case 'hot':
                    clearTimeout(this.timer3);
                    let hot = ReactDOM.findDOMNode(this.refs.hot);
                    hot.style.background = '#fde7ee';
                    this.timer3 = setTimeout(function(){
                        hot.style.background = '';
                        this.maxminute = 46;
                        this.minminute = 38;
                        //this.setState({defaultminute: this.state.hotTemp,hotshow:true,arrayInit: false})
                        this.setState({showHotRange: true});
                    }.bind(this),80)
                    
                    break;
                case 'cold':
                    clearTimeout(this.timer4);
                    let cold = ReactDOM.findDOMNode(this.refs.cold);
                    cold.style.background = '#fde7ee';
                    this.timer4 = setTimeout(function(){
                        cold.style.background = '';
                        this.maxminute = 6;
                        this.minminute = 14;
                        //this.setState({defaultminute: this.state.coldTemp,coldshow: true,arrayInit: false});
                        this.setState({showColdRange: true});
                    }.bind(this),80)
                    
                    break;
            }
        }else{
            return false;
        }
    }
    proStart(e){
        if(this.state.smartModeSwitch == 1){
            return false;
        }
        let md = this.state.modeName;
        if(md==10||md==16||md==17){
            this.newY = 0;
            this.startY = parseInt(e.touches[0].clientY);
        }else{
            return false
        }
        
    }
    proMove(e){
        if(this.state.smartModeSwitch == 1){
            return false;
        }
        let md = this.state.modeName;
        if(md==10||md==16||md==17){
            this.newY = parseInt(e.touches[0].clientY);
        }else{
            return false
        }
        
    }
    proEnd(e){
        if(this.state.smartModeSwitch == 1){
            return false;
        }
        let md = this.state.modeName;
        if(md==10||md==16||md==17){
            let disY = this.newY || this.startY - this.startY;
            if(Math.abs(disY)<=20){
                let activeIndex = e.currentTarget.getAttribute('data-step');
                this.setState({currentActiveIndex:parseInt(activeIndex)});
                let steps = this.state.steps;
                this.setState({
                    defaultminute: steps[activeIndex].timeLength,
                    timeshow: true,
                    arrayInit:false
                });            
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
    endDefault(e){
        e.preventDefault();
        e.stopPropagation();
    }
    render() {
        //console.log(getColdGear(this.state.coldTemp))
        //智能模式下提示
        let infoStyle1 = {padding:'0.666667rem 1.333333rem',color: '#353535',fontSize: '16px',borderBottom:'1px solid #E3E3E3',lineHeight:'2.416667rem',background:'#FFF'}
        let infoStyle2 = {color: '#353535',fontSize: '14px', height:'3.958333rem',width:'100%',borderBottom:'1px solid #E3E3E3',lineHeight:'3.958333rem',textAlign:'center',background:'#FFF'};
        let modeInfo1 = (<div style={infoStyle1}>为使智能冷热美颜仪的效果更好,推荐您先使用测肤仪进行肤质测试,<a style={{color:'#007eff'}} href="cbeauty://cbeauty_single_skintest">去测试肤质>></a></div>);
        let modeInfo2 = (<div style={infoStyle2}>根据您测肤数据，智能推荐护理模式</div>);
        let desInfo = null;
        //console.log('肤质名',this.state.smartModeSwitch,this.state.skinTypeName)
        if(this.state.smartModeSwitch===0&&this.state.skinTypeName === null){
            desInfo = modeInfo1;
        }
        if(this.state.smartModeSwitch===1&&this.state.skinTypeName){
            desInfo = modeInfo2;
        }
        //设备模式提示
        let modeTip = ['offline','lowbat'];
        let mt = '';
        if(this.state.electricity <= 3 && this.state.electricity > 0){
            mt = modeTip[1];
        }
        if(this.state.onlineStatus == 2){
            mt = modeTip[0];
        }
        //不同模式的护理流程的侧边栏
        let proc = null;
        let fiveProc = (
                    <aside className="side-logo">
                        <div className="side-container flex">
                            <div className="hot"></div>
                            <div className="line"></div>
                            <div className="cold"></div>
                            <div className="line"></div>
                            <div className="hot"></div>
                            <div className="line"></div>
                            <div className="cold"></div>
                            <div className="line"></div>
                            <div className="hot"></div>
                        </div>
                    </aside>
                    );
        let fourProc = (
                    <aside className="side-logo">
                        <div className="side-container flex">
                            <div className="hot"></div>
                            <div className="line"></div>
                            <div className="cold"></div>
                            <div className="line"></div>
                            <div className="hot"></div>
                            <div className="line"></div>
                            <div className="cold"></div>
                        </div>
                    </aside>
                    ); 
        //console.log('模式名',this.state.modeName);
        switch(this.state.modeName){
            case 1: 
                proc = fourProc;
                break;
            case 2: 
                proc = (
                    <aside className="side-logo">
                        <div className="side-container flex">
                            <div className="hot"></div>
                            <div className="line"></div>
                            <div className="cold"></div>
                        </div>
                    </aside>
                    );
                break;
            case 3: 
                proc = fiveProc;
                break;
            case 4:     
                proc = fourProc;
                break;
            case 10: 
                proc = fiveProc;
                break;
            case 16: 
                proc = fiveProc;
                break;
            case 17: 
                proc = fiveProc;
                break;
        }; 

        //护理流程
        let steps = this.state.steps;
        let len = steps.length;
        let items = steps.map((item,index)=>{
            let last = '';
            let borderShow = '';
            if(index == len-1) { last = 'last';}
            if(this.state.smartModeSwitch==0&&(this.state.modeName==10||this.state.modeName==16||this.state.modeName==17)){
                borderShow = 'active';
            }
            // console.log(borderShow)
            return (
                <li className={"flex "+borderShow+" "+last} onTouchStart={this.proStart.bind(this)} onTouchMove={this.proMove.bind(this)} onTouchEnd={this.proEnd.bind(this)} key={index} data-type={item.mark} data-step={index}>
                    <p>{item.name}</p>
                    <span>{item.timeLength+'分钟'}</span>
                    <img src="../static/img/rightArrow.png" alt="右箭头" style={this.state.smartModeSwitch==0&&(this.state.modeName==10||this.state.modeName==16||this.state.modeName==17)?{}:{display:'none'}}/>
                </li>
                )
        });

        //模式及震动选择弹窗
        let mitems = ['水润护理','弹性护理','清爽护理','控油护理','自定义'];
        let sitems = ['震动开','震动关'];

        let imgCold = ['../static/img/cold-small.png','../static/img/cold-big.png'];
        let imgHot = ['../static/img/hot-small.png','../static/img/hot-big.png'];
        return (

            <div className="m-main">
                <header className="m-header flex">
                    <div className="photo">
                        <div className="mode-con">
                            <div className={"deviceTip "+mt}></div>
                        </div>
                    </div>
                    <div className={"modeSwitch "+(this.state.smartModeSwitch?"auto":"hand")} onTouchTap={this.changeMode.bind(this)}></div>
                </header>

                {desInfo}

                <menu className="btnList flex">
                    <div className="btnSwitch btn1 flex" data-type="mode" ref="mode" onTouchEnd={this.endTouch.bind(this)} onTouchMove={this.moveTouch.bind(this)} onTouchStart={this.startTouch.bind(this)}>
                        
                            <img src={"../static/img/"+this.state.modeImg+".png"} alt="modeSlect" className={this.state.modeImg}/>
                            <p><span>{this.state.modeWord}<em style={this.state.smartModeSwitch==1?{display:'none'}:{}}></em></span></p>
                        
                    </div>
                    
                    <div className="btnSwitch flex" data-type="shock" ref="shock" onTouchStart={this.startTouch.bind(this)} onTouchMove={this.moveTouch.bind(this)} onTouchEnd={this.endTouch.bind(this)}>
                        
                            <img src={"../static/img/"+(this.state.massageSwitch?"shockOn":"shockOff")+".png"} alt="shockSwitch" className="shock"/>
                            <p><span>{this.state.massageSwitch?"震动开":"震动关"}<em style={this.state.smartModeSwitch==1?{display:'none'}:{}}></em></span></p>
                        
                    </div>
                </menu>

                <menu className="btnList flex">
                    <div className="btnSwitch btn2 flex" data-type="hot" ref="hot" onTouchStart={this.startTouch.bind(this)} onTouchMove={this.moveTouch.bind(this)} onTouchEnd={this.endTouch.bind(this)}>
                        
                            <h1><span className="value">{getHotGear(this.state.hotTemp)}</span><span className="unit">档</span></h1>
                            <p><span>热护理<em style={this.state.smartModeSwitch==1?{display:'none'}:{}}></em></span></p>
                        
                    </div>
                    
                    <div className="btnSwitch flex" data-type="cold" ref="cold" onTouchStart={this.startTouch.bind(this)} onTouchMove={this.moveTouch.bind(this)} onTouchEnd={this.endTouch.bind(this)}>
                        
                            <h1><span className="value">{getColdGear(this.state.coldTemp)}</span><span className="unit">档</span></h1>
                            <p><span>冷护理<em style={this.state.smartModeSwitch==1?{display:'none'}:{}}></em></span></p>
                        
                    </div>
                </menu>

                <section className="m-process">
                    <header className="title flex">
                        <h2>护理流程</h2>
                        <p>共{this.state.workMinutes}分钟</p>
                    </header>

                    <div className="step-con flex">
                        {proc}
                        <ul className="step-list">
                            {items}
                        </ul>
                    </div>
                    
                </section>


                <footer id="footer" className="setBut">
                    <SettingButton settingStatus={this.state.needSave ? 'on' : 'off'} callback={this.submit.bind(this)}/>
                </footer>
                
                <Range showRange={this.state.showColdRange} rate={25} windStall={getColdGear(this.state.coldTemp)} callback={this.submitCold.bind(this)} cancelback={this.cancelCold.bind(this)} imgSrc={imgCold}/>
                <Range showRange={this.state.showHotRange} rate={25} windStall={getHotGear(this.state.hotTemp)} callback={this.submitHot.bind(this)} cancelback={this.cancelHot.bind(this)} imgSrc={imgHot}/>
                <TimeSelect minutestep={1} hourshow={false} minuteshow={true} statusname=" " unit='分钟' 
                            cancelClock={this.cancelClock.bind(this)} submitClock={this.submitClock.bind(this)}
                            defaultminute={this.state.defaultminute} ArrayInit={this.state.arrayInit}
                            show={this.state.timeshow} maxminute={10} minminute={0}/>
                <section className="modeselect-bd" style={this.state.modeshow?{}:{display:'none'}} onTouchMove={this.endDefault.bind(this)}>
                    <div className="modeselect-shade" onTouchEnd={this.cancelMode.bind(this)} onTouchMove={this.endDefault.bind(this)}></div>
                    <ul className="modeselect-content" style={{bottom:this.state.modeshow? 0 :"-23rem"}}>
                        {mitems.map((its,index)=>{
                            return (
                                <li className="flex" key={index} data-mode={index} onTouchStart={this.endDefault.bind(this)} onTouchMove={this.endDefault.bind(this)} onTouchEnd={this.confirmMode.bind(this)}><span>{its}</span><em style={this.state.mIndex==index?{}:{display:'none'}}></em></li>
                                )
                        })}
                    </ul>
                </section>

                <section className="shockselect-bd" style={this.state.shockshow?{}:{display:'none'}} onTouchMove={this.endDefault.bind(this)}>
                    <div className="shockselect-shade" onTouchEnd={this.cancelShock.bind(this)} onTouchMove={this.endDefault.bind(this)}></div>
                    <ul className="shockselect-content" style={{bottom:this.state.shockshow? 0 :"-10rem"}}>
                        {sitems.map((its,idx)=>{
                            return (
                                <li className="flex" key={idx} data-shock={idx} onTouchStart={this.endDefault.bind(this)} onTouchMove={this.endDefault.bind(this)} onTouchEnd={this.confirmShock.bind(this)}><span>{its}</span><em style={this.state.massageSwitch!=idx?{}:{display:'none'}}></em></li>
                                )
                        })}
                    </ul>
                </section>
            </div>

            )
    }
}
