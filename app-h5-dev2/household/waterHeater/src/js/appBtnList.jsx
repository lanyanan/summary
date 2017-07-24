/**
 * Created by yuanyunlong on 16/11/24.
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
const  {Router, Route, hashHistory, Link} = ReactRouter;
const  appData = {};

het.domReady(()=>{
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData : true, // 开启控制数据渲染，以便filter能取到控制数据
        filter : {}
    });
});
het.repaint((data)=>{
    Actions.repaint(data);
});

var lastTouchModeIndex = 0;

class App extends BaseComponent {
    constructor(props){
        super(props);
        Store.listen((data)=>{
            if(!this.isMounted(this)) return;
            this.setState(data);
        }); // 监听Store
    }

    isMounted(component){
        try {
            ReactDOM.findDOMNode(component);
            return true;
        }catch (e){
            return false;
        }
    }

    touchNormalAction(e){
        // var index = e.currentTarget.getAttribute("data-index");
        // if(lastTouchModeIndex == index || lastTouchModeIndex == '4'){
        //     return;
        // }
        // lastTouchModeIndex = index;
        // Actions.modeAction(index);

        let data = {
            set_waterTempIndex:35,
            set_waterMode:0,
        };
        Actions.startWataerAction(data);
    }

    touchJNAction(e){
        // var index = e.currentTarget.getAttribute("data-index");
        // if(lastTouchModeIndex == index || lastTouchModeIndex == '4'){
        //     return;
        // }
        // lastTouchModeIndex = index;
        // Actions.modeAction(index);

        let data = {
            set_waterTempIndex:35,
            set_waterMode:1,
        };
        Actions.startWataerAction(data);
    }

    closeAction(){
        Actions.setWaterHeaterPowerOn();
    }

    childLockAction(){
        Actions.setWaterHeaterChildOn();
    }

    render(){
        let modeIndex = this.state.waterHeaterWorkMode || 0;
        let switchLock = this.state.set_switchLockOn || false;
        let childLock = this.state.set_childerLockOn || false;
        let online = (this.state.online != '2'&&this.state.onlineStatus) || false;
        console.log("************this.state.onlineStatus :"+this.state.onlineStatus );

        // if (switchLock!==true){
        //     childLock = true;
        //     modeIndex = 2;
        // }
        let selectedColor = "selected";
        let unSelectedColor = "unselected";

        let swichLockStatue =   (online&&!childLock) ? selectedColor :  unSelectedColor;
        let childLockStatue = (online&&switchLock) ? selectedColor:unSelectedColor;
        let warmfontColor = (modeIndex!=0&&online&&!childLock) ? selectedColor :  unSelectedColor;
        let intefontColor = (modeIndex!=1&&online&&!childLock) ? selectedColor :  unSelectedColor;
        let switchTitle = (online&&switchLock)?'待机':'运行';

        let modeName = "--";
        let switchMode = "运行";
        switch(modeIndex){
            case 0: {modeName = "常规"; switchMode = "运行";break;}
            case 1: {modeName = "节能"; switchMode = "运行";break;}
            case 2: {modeName = "智能"; switchMode = "运行";break;}
            case 3: {modeName = "快速"; switchMode = "运行";break;}
            case 4: {modeName = "厨房"; switchMode = "运行";break;}
            case 5: {modeName = "浴缸"; switchMode = "运行";break;}
            case 6: {modeName = "夜间"; switchMode = "运行";break;}
            case 7: {modeName = "季节";switchMode = "运行"; break;}
            default: {switchMode = "待机"; modeName = "--"; }
        }
        if(!switchLock){
            switchMode = "待机"; modeName = "--";
        }
        let statusBar = switchMode + ' 模式:'+modeName;
        if(this.state.online == '2')  statusBar='设备已离线';
        if(this.state.networkavailable == '2')  statusBar='当前网络不可用';
        console.log("render mode111: " + modeIndex + " " + statusBar + ' ' + appData.online);


        return (<div>
            <h1 className="btn-title">{statusBar}</h1>
            <section className="flex btn-list">
                <dl className={"flex-cell " + swichLockStatue} key="0" data-index="0" onTouchStart={this.closeAction.bind(this)}>
                    <dd><img src="../static/image/main/pic_main_0.png"/></dd>
                    <dt className={swichLockStatue}><p >{switchTitle}</p></dt>
                </dl>
                <dl className={"flex-cell " + childLockStatue} key="1" data-index="1" onTouchStart={this.childLockAction.bind(this)}>
                    <dd><img src="../static/image/main/pic_main_1.png"/></dd>
                    <dt className={childLockStatue}><p >童锁</p></dt>
                </dl>
                <dl className={"flex-cell " + warmfontColor} key="2" data-index="2" onTouchStart={this.touchNormalAction.bind(this)}>
                    <dd><img src="../static/image/main/pic_main_2.png"/></dd>
                    <dt className={warmfontColor}><p >常规</p></dt>
                </dl>
                <dl className={"flex-cell " + intefontColor} key="3" data-index="3" onTouchStart={this.touchJNAction.bind(this)}>
                    <dd><img src="../static/image/main/pic_main_3.png"/></dd>
                    <dt className={intefontColor}><p >节能</p></dt>
                </dl>
            </section>
        </div>);
    }
}

het.domReady(()=>{
    het.setTitle('C-Life 快捷方式');
    ReactDOM.render(<App />, document.getElementById('ROOT'));
});