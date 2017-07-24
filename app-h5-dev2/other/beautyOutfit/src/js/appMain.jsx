// import {Funs} from '../../../common/src/fun.es6';
import { BaseComponent } from '../../../common/src/BaseComponent.class.es6';
import { DataAction } from './Actions.es6';
import { DataStore } from './Store.es6';
import { WaterFull } from './waterFull.jsx';
import { StepDetail } from './stepDetail.jsx';

var {Router, Route, hashHistory} = ReactRouter;

het.domReady(() => {
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {
        }
    });
});

const types = { beauty: 2, dress: 3 };
const pageSize = 7;
// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            beautyList: null,
            beautyIndex: 1,
            dressList: null,
            dressIndex: 1,
            currentType: types.beauty,
            message: null,
        };
        this.unBindDataStore = DataStore.listen(this.onGetResult.bind(this));// 监听DataStore
    }
    componentDidMount() {
        this.getBeautyCatgory('refresh');
    }
    componentWillUnmount() {
        this.unBindDataStore();
    }
    changeTab(type, e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.state.currentType == type) return;
        this.setState({ currentType: type });
        if ((this.state.beautyList == null || this.state.beautyList.length <= 0) && type == types.beauty) {
            this.getBeautyCatgory('refresh');
        } else if ((this.state.dressList == null || this.state.dressList.length <= 0) && type == types.dress) {
            this.getDressCategory('refresh');
        }
    }
    onGetResult(data) {
        if (this.state.currentType == types.beauty) {
            if (data.index == 1) {
                this.setState({ beautyList: data.list });
            } else if (this.state.beautyList) {
                if (data.list.length <= 0) { this.showToast('没有数据了'); }
                this.setState({ beautyList: this.state.beautyList.concat(data.list) });
            }
        } else {
            if (data.index == 1) {
                this.setState({ dressList: data.list });
            } else if (this.state.beautyList) {
                if (data.list.length <= 0) { this.showToast('没有数据了'); }
                this.setState({ dressList: this.state.dressList.concat(data.list) });
            }
        }
    }
    getBeautyCatgory(state) {
        if (state == 'refresh') {
            this.state.beautyIndex = 1;
            this.setState({ beautyList: null });
        } else {
            this.state.beautyIndex++;
        }
        DataAction.getCatgory(types.beauty, this.state.beautyIndex, pageSize);
    }
    getDressCategory(state) {
        if (state == 'refresh') {
            this.state.dressIndex = 1;
            this.setState({ dressList: null });
        } else {
            this.state.dressIndex++;
        }
        DataAction.getCatgory(types.dress, this.state.dressIndex, pageSize);
    }
    showToast(text) {
        let self = this;
        this.setState({ message: text });
        setTimeout(function () {
            self.setState({ message: null });
        }, 2000);
    }
    render() {
        return <div className="full">
            <div className="tab-host">
                <div onTouchTap={this.changeTab.bind(this, types.beauty)} className={this.state.currentType == types.beauty ? 'tab-btn active' : 'tab-btn'}>彩妆</div>
                <div onTouchTap={this.changeTab.bind(this, types.dress)} className={this.state.currentType == types.dress ? 'tab-btn active' : 'tab-btn'}>穿搭</div>
            </div>
            <div className="tab" style={{ display: this.state.currentType == types.beauty ? 'block' : 'none' }}>
                <WaterFull column={2} datas={this.state.beautyList} dataMethod={this.getBeautyCatgory.bind(this)}></WaterFull>
            </div>
            <div className="tab" style={{ display: this.state.currentType == types.dress ? 'block' : 'none' }}>
                <WaterFull column={2} datas={this.state.dressList} dataMethod={this.getDressCategory.bind(this)}></WaterFull>
            </div>
            <div style={{ display: this.state.message == null ? 'none' : 'block' }}>
                <div className="cover-layout"></div>
                <div className="message">{this.state.message}</div>
            </div>
        </div>;
    }
}

// 开始渲染
het.domReady(() => {
    het.setTitle('美容穿搭');
    // 无路由方式
    //ReactDOM.render(<App></App>, document.getElementById('ROOT'));
    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="/detail/:setpId" component={StepDetail} />
        </Router>
    ), document.getElementById('ROOT'));
});