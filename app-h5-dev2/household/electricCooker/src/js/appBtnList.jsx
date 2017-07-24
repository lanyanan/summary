// import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory, Link} = ReactRouter;

het.domReady(() => {
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData: true,// 控制数据是否用于页面渲染
        updateFlagMap: {}
    });
});

// 接收app推送数据
het.repaint((data, type) => {
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data, type);
});

// 创建React组件
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectModel: 0
        };

        Store.listen((data) => this.setState(data)); // 监听Store
        this.startTime = this.startTime.bind(this);
        this.liveError = this.liveError.bind(this);
        this.isPoll = this.isPoll.bind(this);
        this.isCanCancel = this.isCanCancel.bind(this);
    };

    componentWillUnmount() {
        if (this.timer != undefined) {
            //console.log("componentWillUnmount清楚计数器");
            clearTimeout(this.timer);
        }
    }

    startTime(selectModel) {
        this.timer = setTimeout(() => {
            console.log("handleMode selectModel=" + selectModel);
            if (selectModel != 0) {
                Actions.swicthModel(selectModel);
                this.state = {
                    selectModel: 0
                };
            }
        }, 3000);
    };

    liveError() {
        if (this.state.online == 2) {
            return '设备已离线'
        }
        if (this.state.networkavailable == 2) {
            return '网络连接失败，请检查网络'
        }

        let isHaveError = false;
        let ErrItems = [];
        if(this.state.BottomNTCFault != 0){
            isHaveError = true;
        }
        if(this.state.TopNTCFault != 0){
            isHaveError = true;
        }
        if(this.state.PCBANTCFault != 0){
            isHaveError = true;
        }
        if(this.state.CircuitFault != 0){
            isHaveError = true;
        }
        if(this.state.EEPROMFault != 0){
            isHaveError = true;
        }
        if(this.state.LeakageFault != 0){
            isHaveError = true;
        }
        if(isHaveError) {
            if (this.state.BottomNTCFault == 1 || this.state.TopNTCFault == 1 || this.state.PCBANTCFault == 1) {
                ErrItems.push('传感器开路');
            }
            if (this.state.BottomNTCFault == 2 || this.state.TopNTCFault == 2 || this.state.PCBANTCFault == 2) {
                ErrItems.push('传感器短路');
            }
            if (this.state.BottomNTCFault == 3) {
                ErrItems.push('底盘超温');
            }
            if (this.state.TopNTCFault == 3) {
                ErrItems.push('上盖超温');
            }
            if (this.state.PCBANTCFault == 3) {
                ErrItems.push('传感器异常');
            }
            if (this.state.CircuitFault == 1) {
                ErrItems.push('主加热电路故障');
            }
            if (this.state.EEPROMFault == 1) {
                ErrItems.push('存储器件故障');
            }
            if (this.state.LeakageFault == 1) {
                ErrItems.push('机器漏电异常');
            }
            if (ErrItems.length > 0) {
                return ErrItems.toString();
            }
        }
        return false;
    }

    handleKeep() {//处理保温事件 (7-保温)
        if (this.liveError()) {
            het.toast(this.liveError());
            return false;
        }
        if (parseInt(this.state.model) != 0) return false;
        Actions.keep();
        if (this.timer != undefined) {
            clearTimeout(this.timer);
            //console.log("清楚计数器");
        }
    };

    handleModel() {//出来模式选择
        if (this.liveError()) {
            het.toast(this.liveError());
            return false;
        }
        if (parseInt(this.state.model) != 0) return false;
        let selectModel = this.state.selectModel || 0;
        if (++selectModel > 6) selectModel = 1;

        this.setState({'selectModel': selectModel});
        if (this.timer != undefined) {
            clearTimeout(this.timer);
            //console.log("清楚计数器");
        }
        this.startTime(selectModel);
    };

    handleCancel() {
        if (this.liveError()) {
            het.toast(this.liveError());
            return false;
        }
        if (!this.isCanCancel()) return false;
        Actions.modelCancel();
    }

    isPoll() {//是否是预约状态
        let model = this.state.model || 0;
        let prehour = this.state.prehour || 0;//预约的时间(小时)
        let premin = this.state.premin || 0;//预约时间(分钟)
        let isPoll = 0;
        if (prehour == 0 && premin == 0) {
            isPoll = 0;//没有预约时间
        } else {
            isPoll = 1;//有预约时间
        }
        if (this.state.online == 1 && model != 0 && model != 7 && isPoll == 1) {
            return true;
        }
        return false;
    };

    isCanCancel() {
        let model = parseInt(this.state.model) || 0;
        let online = parseInt(this.state.online) || 1;
        if (online == 1 && model != 0) {
            return true;
        }
        return false;
    };

    render() {
        let model = parseInt(this.state.model) || 0,
            modelImgPath = '../static/img/btnlist/',
            modelName = '无模式',
            online = this.state.online || 1;//设备是否在线
        let workarry = ['', '标准', '快煮', '稀饭',
            '粥/汤', '蒸煮', '热饭'];
        let workTextArry = ['待机中', '预约中', '保温中', '烹饪中'];
        let selectModel = this.state.selectModel || 0;
        let workText = model != 0 ? (model == 7 ? workTextArry[2] : (this.isPoll() ? workTextArry[1] : workTextArry[3])) : workTextArry[0];
        console.log("model=" + model);
        let imgModel = selectModel == 0 ? 1 : selectModel;
        if (online == 2) {
            modelImgPath = modelImgPath + '1_1.png';
            modelName = workarry[1];
        } else if (model != 0 && model != 7) {
            modelImgPath = modelImgPath + model + '_1.png';
            modelName = workarry[model];
        } else {
            modelImgPath = modelImgPath + imgModel + '_1.png';
            modelName = workarry[imgModel];
        }
        //console.log("modelImgPath="+modelImgPath);
        return (
            <div>
                {online == 2 ? <h1 className="btn-title">设备已离线</h1> :
                    <h1 className="btn-title">
                        {workText + ' '}{(model != 0 && model != 7) ? '模式：' + workarry[model] : ''}
                    </h1>
                }

                <section className="flex btnlist">
                    <article className="flex-cell" onTouchEnd={this.handleKeep.bind(this)}>
                        <img style={(model == 0 || model == 7) && online == 1 ? {opacity: 1} : {opacity: 0.3}}
                             src={"../static/img/btnlist/keep.png"} alt=""/>
                        <p>保温</p>
                    </article>

                    <article className="flex-cell" onTouchEnd={this.handleModel.bind(this)}>
                        <img
                            style={(model != 7 && online == 1) ? {opacity: 1} : {opacity: 0.3}}
                            src={modelImgPath} alt=""/>
                        <p>{modelName}</p>
                    </article>

                    <article className="flex-cell" onTouchEnd={this.handleCancel.bind(this)}>
                        <img style={this.isCanCancel() || (online == 1 && model == 0) ? {opacity: 1} : {opacity: 0.3}}
                             src={"../static/img/btnlist/cancel.png"} alt=""/>
                        <p>取消</p>
                    </article>
                </section>
            </div>
        );
    }
}

// 开始渲染
het.domReady(() => {
    het.setTitle('电饭煲');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App}/>
        </Router>
    ), document.getElementById('ROOT'));
});