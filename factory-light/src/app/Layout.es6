import {BaseComponent} from '../../libs/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import WidgetsPanel     from '../modules/WidgetsPanel/WidgetsPanel.es6'; // 组件面板
import WidgetsSizePanel from '../modules/WidgetsSizePanel/WidgetsSizePanel.es6'; // 组件尺寸面板
import WidgetsProperty  from '../modules/WidgetsProperty/WidgetsProperty.es6'; // 组件属性面板
import ImportLayout  from '../modules/ImportLayout/ImportLayout.es6'; // 组件属性面板
import {DragClass}      from '../modules/Drag/Drag.es6'; // 拖放处理模块
import SceneClass       from './Scene.es6'; // 场景

var {Router, Route, hashHistory,Link} = ReactRouter;

// 生成各模块实例
let Widgets     = new WidgetsPanel(),
    SizePanel   = new WidgetsSizePanel(),
    Property    = new WidgetsProperty(),
    Import    = new ImportLayout(),
    Scene       = new SceneClass();

// 获取各模块React组件
let WidgetsDom = Widgets.getComponent(),
    SizePanelDom = SizePanel.getComponent(),
    PropertyDom = Property.getComponent(),
    ImportDom = Import.getComponent(),
    SceneDom = Scene.getComponent();

export class Layout extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: 'C-Life',
            regionName:decodeURIComponent(this.props.location.query.areaName ? this.props.location.query.areaName : "")
        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount(){
        let regionId  = this.props.params.id ? this.props.params.id : '0';
        Actions.loadStoreData(regionId);
    }
    saveProject(){
        Actions.saveWidgets();
    }
    handleBodyClick(e){
        if (e.target.className.indexOf('main-view')<0 
            && !e.target.closest('.size-view, .exterior-view, .property-view, .operate-wrap .select-list, .codepanel-wrap')) {
            Actions.selectUserWidget(-1); // 取消控件选中状态
        }
    }
    handlerPublishClick(){
        this.setState({
            publish:true
        });
    }
    render(){
        return <div className="app-body" onClick={this.handleBodyClick} {...new DragClass().events()}>
                <section className="main-views" >
                    <div className="main-header">
                        <span>布局设置</span>
                        <span className = "main-header-area">{this.state.regionName}</span>
                        <span className = "main-header-btn" onClick={this.saveProject.bind(this)}>保存</span>
                    </div>
                    <ImportDom/>
                    <div className="main-view">
                        <section className='main-view-header'>
                            设备列表
                        </section>
                        <section className='left-view'>
                            <div className="widgets-view" style={{height:document.body.clientHeight-332+'px'}}>
                                <WidgetsDom />
                            </div>
                        </section>
                        <SceneDom />
                        <section className='bottom-view'>
                            <div className="size-view" id='size-view'>
                                <SizePanelDom />
                            </div>
                        </section>
                    </div>
                </section>
            </div>
    }
}