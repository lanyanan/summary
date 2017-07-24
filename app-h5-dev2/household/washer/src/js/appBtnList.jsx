/**
 * Created by yuanyunlong on 16/11/24.
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.jsx';
const  {Router, Route, hashHistory, Link} = ReactRouter;
const  appData = {};
import {orderDataArray, waterLevelDataArray, processDataArray, specialDataArray, washerModeS} from  './washerConstData.js';

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


    childLockAction(){
        let childLockData = !this.state.washerChildLock;
        Actions.childLockAction(childLockData);
    }
    washMode1Action(){
        console.log("biaozhun biaozhun ");
        Actions.biaozhunModeAction();
    }
    washMode2Action(){
        Actions.kuaisuModeAction();
    }

    closeAction(){

        let switchData = !this.state.washerSwitchLock;
        Actions.switchAction(switchData);


    }

    render(){

        let modeIndex = this.state.get_selectModeValue || 0;
        let childLockValue = this.state.washerChildLock || false;    // true 童锁打开
        let switchLockValue  = this.state.washerSwitchLock || false; // true 开机
        let washerIsStop = this.state.washerIsStop != undefined ? this.state.washerIsStop : true ;
        let selectedColor = "selected";
        let unSelectedColor = "unselected";
        let switchColor =  unSelectedColor;
        let whitefontColor = (childLockValue) ? selectedColor :  unSelectedColor;
        let biaozhunColor = (modeIndex == 0 && !washerIsStop) ? selectedColor :  unSelectedColor;
        let kuaisuColor = (modeIndex == 1 && !washerIsStop) ? selectedColor :  unSelectedColor;

        let modeName = washerModeS[modeIndex].name;

        if(childLockValue){
            modeName = "童锁";
            switchColor = selectedColor;
            whitefontColor =  unSelectedColor;
            biaozhunColor =  selectedColor;
            kuaisuColor =  selectedColor;
        }

        let switchMode = "关机";
        let switchTitle = "开机";
        if(switchLockValue){
            switchMode = "开机";
            switchTitle = "关机";
            if(washerIsStop){
                modeName = "待机中";
            }

            if(childLockValue){
                modeName = "童锁";
            }
        }else{
            // 关机
            modeName = "--";
        }



        if(!switchLockValue){
            switchColor = unSelectedColor;
            whitefontColor =  selectedColor;
            biaozhunColor =  selectedColor;
            kuaisuColor =  selectedColor;
        }

        let workModeIndex =  this.state.WorkStep || 0; // 工作状态  预约步骤
        if(workModeIndex == 1){
            biaozhunColor =  selectedColor;
            kuaisuColor =  selectedColor;
        }

        let statusBar = switchMode + ' 模式:'+modeName;
        if(this.state.online == '2')  {
            statusBar='设备已离线';
            whitefontColor =  selectedColor;
            switchColor = selectedColor;
            biaozhunColor =  selectedColor;
            kuaisuColor =  selectedColor;
        }
        if(this.state.networkavailable == '2')  statusBar='当前网络不可用';
        console.log("render mode1: " + modeIndex + " " + statusBar + ' ' + appData.online);


        return (<div>
            <h1 className="btn-title">{statusBar}</h1>
            <section className="flex btn-list">
                <dl className={"flex-cell" }  key="0" data-index="0" onTouchStart={this.closeAction.bind(this)}>
                    <dd className={switchColor}><img src="../static/image/main/pic_main_0.png"/></dd>
                    <dt className={switchColor}><p >{switchTitle}</p></dt>
                </dl>
                <dl className={"flex-cell"} key="1" data-index="1" onTouchStart={this.childLockAction.bind(this)}>
                    <dd className={whitefontColor} ><img src="../static/image/main/pic_main_1.png"/></dd>
                    <dt className={whitefontColor}><p >童锁</p></dt>
                </dl>
                <dl className={"flex-cell"} key="2" data-index="2" onTouchStart={this.washMode1Action.bind(this)}>
                    <dd className={biaozhunColor}> <img src="../static/image/main/pic_main_2.png"/></dd>
                    <dt className={biaozhunColor}><p >标准</p></dt>
                </dl>
                <dl className="flex-cell" key="3" data-index="3" onTouchStart={this.washMode2Action.bind(this)}>
                    <dd className={kuaisuColor}><img src="../static/image/main/pic_main_4.png"/></dd>
                    <dt className={kuaisuColor}><p >快速</p></dt>
                </dl>
            </section>
        </div>);
    }
}

het.domReady(()=>{
    het.setTitle('C-Life 快捷方式');
    ReactDOM.render(<App />, document.getElementById('ROOT'));
});