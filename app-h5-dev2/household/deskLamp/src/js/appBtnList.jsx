/**
 * Created by yuanyunlong on 16/11/24.
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.jsx';
import {Store} from './Store.es6';
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

    touchAction(e){
        var index = e.currentTarget.getAttribute("data-index");
        lastTouchModeIndex = index;
        Actions.modeAction(index);
    }

    closeAction(){

        Actions.closeLightAction();
    }

    render(){

        let switchStatus = this.state.switchStatue;
        let switchImaPath = "../static/img/main/pic_switch_on.png";
        let switchTitle = switchStatus? "关机":"开机";
        let modeIndex   = parseInt(this.state.lightIndex);
        console.log("render mode: " + modeIndex);
        if(switchStatus == false){
            modeIndex = 4;
        }
        if(this.state.online == '2'){
            modeIndex = 4;
            switchImaPath = "../static/img/main/pic_switch_off.png";
        }
        // 保留当前点击的模式
        lastTouchModeIndex = modeIndex;

        let whiteImgUrl = (modeIndex == 1 || modeIndex == 4) ? "../static/img/main/pic_modebutton_1_off.png": "../static/img/main/pic_modebutton_1_on.png";
        let warmImgUrl  = (modeIndex == 2 || modeIndex == 4) ? "../static/img/main/pic_modebutton_2_off.png" : "../static/img/main/pic_modebutton_2_on.png";
        let inteImgUrl  = (modeIndex == 3 || modeIndex == 4) ? "../static/img/main/pic_modebutton_3_off.png": "../static/img/main/pic_modebutton_3_on.png";

        let selectedColor = "selected";
        let unSelectedColor = "unselected";
        let whitefontColor = (modeIndex == 1 || modeIndex == 4) ? selectedColor :  unSelectedColor;
        let warmfontColor = (modeIndex == 2 || modeIndex == 4) ? selectedColor :  unSelectedColor;
        let intefontColor = (modeIndex == 3 || modeIndex == 4) ? selectedColor :  unSelectedColor;
        let switchColor = unSelectedColor;

        let modeName = "--";
        let switchMode = "开机";
        switch(modeIndex){
            case 1: {modeName = "冷光"; switchMode = "开机";break;}
            case 2: {modeName = "暖光"; switchMode = "开机";break;}
            case 3: {modeName = "智能"; switchMode = "开机";break;}
            case 0: {modeName = "--";switchMode = "开机"; break;}
            default: {switchMode = "关机"; modeName = "--"; }
        }

        let statusBar = switchMode + ' 模式:'+modeName;
        if(this.state.online == '2')  {
            statusBar='设备已离线';
            switchColor = selectedColor;
        }
        if(this.state.networkavailable == '2')  statusBar='当前网络不可用';
        console.log("render mode1: " + modeIndex + " " + statusBar + ' ' + appData.online);


        return (<div>
            <h1 className="btn-title">{statusBar}</h1>
            <section className="flex btn-list">
                <dl className="flex-cell" key="0" data-index="0" onTouchStart={this.closeAction.bind(this)}>
                    <dd><img src={switchImaPath}/></dd>
                    <dt className={switchColor}><p >{switchTitle}</p></dt>
                </dl>
                <dl className="flex-cell" key="1" data-index="1" onTouchStart={this.touchAction.bind(this)}>
                    <dd><img src={whiteImgUrl}/></dd>
                    <dt className={whitefontColor}><p >冷光</p></dt>
                </dl>
                <dl className="flex-cell" key="2" data-index="2" onTouchStart={this.touchAction.bind(this)}>
                    <dd><img src={warmImgUrl}/></dd>
                    <dt className={warmfontColor}><p >暖光</p></dt>
                </dl>
                <dl className="flex-cell" key="3" data-index="3" onTouchStart={this.touchAction.bind(this)}>
                    <dd><img src={inteImgUrl}/></dd>
                    <dt className={intefontColor}><p >智能</p></dt>
                </dl>
            </section>
        </div>);
    }
}

het.domReady(()=>{
    het.setTitle('C-Life 快捷方式');
    ReactDOM.render(<App />, document.getElementById('ROOT'));
});