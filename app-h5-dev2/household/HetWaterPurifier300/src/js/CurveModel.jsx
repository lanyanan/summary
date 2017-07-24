'use strict';
/**
 * 统计曲线
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {TdsChartModel} from './TdsChartModel.jsx';
import {LoadImagModel} from './LoadImagModel.jsx';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {MultView} from './MultView.jsx';

export class CurveModel extends BaseComponent {
    constructor(props) {
        super(props);
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        this.state = {
            headerTop: isAndroid?73:64,
            showLoad:0
        };
        het.setTitle(JSON.stringify({setNavTitle:1,title:'统计',setNavRightBtnHiden:1}));
        this.listenStore(Store); // 监听Store
        Actions.getWaterStat();
    }
    
    tryAgain(){
        let showLoad = this.state.showLoad;
        if(showLoad == 3) return;
        Actions.getWaterStat();
        this.setState({
            showLoad: 0,
        });
    }
    render() {
        let waterlines = this.state.waterlines || [];
        let show = waterlines.length > 0 ? true : false;
        let showTop = true;
        let showLoad = this.state.showLoad;
        let TexterrArr = ['暂无数据哦 ！','数据加载错误,点击重试 ！','当前版本不支持设备统计接口调用！'];
        let Texterr = showLoad == 2?TexterrArr[1]:showLoad == 3?TexterrArr[2]:TexterrArr[0];
        return  (<MultView ErrtryCall = {this.tryAgain.bind(this)}
                           showD = {show}
                           showLoad = {showLoad}
                           showTop = {showTop}
                           textErr = {Texterr}
                           itemView = {<TdsChartModel lines={waterlines}/>}
        />);
    }

}