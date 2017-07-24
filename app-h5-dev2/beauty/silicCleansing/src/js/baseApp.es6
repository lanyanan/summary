// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Guider} from './Guider.es6';
import {SortPanel} from './SortPanel.es6';
import QSlidor from '../../../common/src/lib/qslidor.jsx';
import Range from './../../../common/src/lib/range.jsx';
import SettingButton  from './../../../common/src/lib/SettingButton.jsx';

var {Router, Route, hashHistory, Link} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {
        },
        renderConfigData : true,
        filter : {
            'busiSwitch':1,'gears1':1,'runtime1':1,'gears2':1,'runtime2':1,'gears3':1,'runtime3':1,'gears4':1,'runtime4':1,'gears5':1,'runtime5':1,'massageGears1':1,'massageGears2':1,'massageGears3':1,'massageGears4':1,'massageGears5':1,
            'massageRuntime1':1, 'massageRuntime2':1, 'massageRuntime3':1, 'massageRuntime4':1, 'massageRuntime15':1,
            'commonGears1':1,'commonGears2':1,'commonGears3':1,'commonGears4':1,'commonGears5':1,
            'commonMassageGears1':1,'commonMassageGears2':1,'commonMassageGears3':1,'commonMassageGears4':1,'commonMassageGears5':1,
            'cleanSwitch': (type, data)=>{
                if (type===1&&data.busiSwitch==1) { // 自动模式下不接受运行值
                    return false;
                }
                return true;
            }, 'massageSwitch': (type, data)=>{
                if (type===1&&data.busiSwitch==1) { // 自动模式下不接受运行值
                    return false;
                }
                return true;
            }
        }
    });
});

// 接收app推送数据
het.repaint((data)=>{
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});

// 创建React组件
export class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            work:0,
            part:0
        };
        this.listenStore(Store); // 监听Store
        this.gearsList = [
            {id:'1', text:'一档'},
            {id:'2', text:'二档'},
            {id:'3', text:'三档'},
            {id:'4', text:'四档'},
            {id:'5', text:'五档'}
        ];
        Actions.refreshData();
    }
    // 切换部位
    switchPart(e) {
        let part = parseInt(e.currentTarget.getAttribute('data-part'));
        Actions.switchPart(part);
    }
    // 切换手动自动
    switchAuto() {
        if (this.state.skinDataCode==0&&!this.state.auto) {
            // alert('您还未测试肤质，请先测试肤质！');
            het.toast('您还未测试肤质，请先测试肤质！');
        } else {
            Actions.switchAuto();
        }
    }
    // 切换工作模式（洁面/按摩）
    switchWork() {
        Actions.switchWork();
        if (this.state.work===1) {
            het.toast('已切换到洁面功能');
        } else {
            het.toast('已切换到按摩功能');
        }
    }
    // 档位调整
    changeGears(value) {
        Actions.changeGears(value);
    }
    // 洁面时间调整
    changeRuntime(value) {
        Actions.changeRuntime(value);
    }
    // 显示排序面板
    showSortPanel() {
        Actions.showSortPanel(true);
    }
    // 关闭排序面板
    closeSortPanel() {
        Actions.showSortPanel(false);
    }
    render() {
        return (<div>
            <header>
                <div className="panelswitch">
                    <b className={this.state.work===0?'active':''} onTouchStart={this.switchWork.bind(this)}>洁面</b>
                    <b className={this.state.work===1?'active':''} onTouchStart={this.switchWork.bind(this)}>按摩</b>
                </div>
                <div className="face">
                    <b data-part='0' className={'part1' + (this.state.part===0?' active':'')} onTouchStart={this.switchPart.bind(this)}>{this.state.work!==1?'额头':'眉心'}</b>
                    <b data-part='4' className={'part2' + (this.state.part===4?' active':'')} onTouchStart={this.switchPart.bind(this)}>{this.state.work!==1?'右脸':'右眼角'}</b>
                    <b data-part='2' className={'part3' + (this.state.part===2?' active':'')} onTouchStart={this.switchPart.bind(this)}>{this.state.work!==1?'下巴':'右法令纹'}</b>
                    <b data-part='1' className={'part4' + (this.state.part===1?' active':'')} onTouchStart={this.switchPart.bind(this)}>{this.state.work!==1?'鼻子':'左法令纹'}</b>
                    <b data-part='3' className={'part5' + (this.state.part===3?' active':'')} onTouchStart={this.switchPart.bind(this)}>{this.state.work!==1?'左脸':'左眼角'}</b>
                    {this.state.onlineStatus==2 ? (<span className="offline">您的设备已离线</span>) : ''}
                </div>
                <div className="gadget">
                    {/*<img className="logo" src="../static/img/logo@2x.png" />*/}
                    {/*<i className="edit" onTouchStart={this.showSortPanel.bind(this)}></i>*/}
                    <Link className="guide" to="guider"></Link>
                </div>
            </header>
            <div className="gear pk-flex">
                <div className="gear-left color-00000">档位选择</div>
                <div className="gear-right pk-flex-right">
                    {this.state.auto?(
                        <div className="gear-choose" onTouchEnd={this.switchAuto.bind(this)}>
                            <div className="gear-txt">自动</div>
                            <div className="gear-circle"></div>
                        </div>):(
                        <div className="gear-choose" onTouchEnd={this.switchAuto.bind(this)}>
                            <div className="gear-txts">手动</div>
                            <div className="gear-circle gear-circles"></div>
                        </div>
                    )}
                </div>
            </div>
            <QSlidor value={this.state.gears}  disabled={this.state.auto} items={this.gearsList} fnFeedback={this.changeGears.bind(this)} />
            <div className="cleansing-time color-00000">
                洁面时间
            </div>
            <div className="pk-range">
                <Range disabled={this.state.auto} value={this.state.runTime} max={this.state.work===1?30:40} min="5" fnFeedback={this.changeRuntime.bind(this)} />
            </div>
            <div className="pk-range-value pk-flex">    
                <div className="pk-range-lvalue">5s</div>
                <div className="pk-range-rvalue tr">{this.state.work===1?30:40}s</div>
            </div>
            {this.state.skinDataCode ? 
            <div className="cleansing-time color-00000">
                您的{([
                    ['额头','鼻子','下巴','左脸','右脸'],
                    ['眉心','左法令纹','右法令纹','左眼角','右眼角']
                ])[this.state.work][this.state.part]}皮肤属于
                <span className="fb84a6"> {this.state.skinDescribe}</span>
            </div> : ''}
            {this.state.skinDataCode ? 
                <div className="info-wrap">
                    <p>档位：{this.state.recGears}档</p>
                    <p>清洁时间：{this.state.recRunTime}S</p>
                </div>
            :
                <div className="info-wrap">
                    <p>为使硅胶洁面仪的使用效果更好，推荐您先使用测肤仪进行肤质测试...<a href="cbeauty://cbeauty_single_skintest" className="fb84a6">去测试肤质&gt;&gt;</a></p>
                </div>
            }
            {this.state.electricity < 5 && this.state.chargeStatus<2 && this.state.onlineStatus==1 ? (<div className="battery">电量不足，请充电</div>) : ''}
            <div id="footer" onTouchEnd={this.handlerSubmit}>
                <SettingButton settingStatus={this.state.needSave ? 'on' : 'off'} callback={Actions.submit} />
            </div>
            {/*<SortPanel work={this.state.work} show={this.state.sortPanelShow} cbNo={this.closeSortPanel.bind(this)} /> */}
        </div>);
    }
}