// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory, Link} = ReactRouter;

het.domReady(() => {
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        renderConfigData: true,// 控制数据是否用于页面渲染  这个参数决定了onrepaint是否可以接收到config数据
        updateFlagMap: {}
    });
});

// 接收app推送数据
het.repaint((data, type) => {
    Actions.repaint(data, type);
});

// 创建React组件
class App extends BaseComponent {

    constructor(props) {
        super(props);
        this.listenStore(Store); // 监听Store
    }

    getGrade(wqiVal) {
        let gradeVal;
        if (wqiVal <= 60) {
            gradeVal = "差";
        } else if (wqiVal > 60 && wqiVal < 80) {
            gradeVal = "中";
        } else if (wqiVal >= 80 && wqiVal < 90) {
            gradeVal = "良";
        } else {
            gradeVal = "优";
        }
        return gradeVal;
    };

    render() {
        let myData = this.state.data || {};
        console.log("-------------" + JSON.stringify(myData));

        let tocVal = myData.toc ? myData.toc : '0',      //toc
            codVal = myData.cod ? myData.cod : '0',      //cod
            chromaVal = myData.chroma ? myData.chroma : '0',     //色度
            tdsVal = myData.tds ? myData.tds : '0',    //tds
            wqiVal = myData.wqi ? myData.wqi : '0';     //wqi

        let gradeVal = myData.wqi ? this.getGrade(wqiVal) : "--";
        return (
            <div>
                <h1 className="btn-title">{'水质状况：' + gradeVal + ' '}{'综合评分：' + wqiVal + '分'}</h1>
                <section className="flex btnlist">
                    <article className="flex-cell">
                        <img src="../static/img/TDS.png" alt=""/>
                        <p>{tdsVal + "mg/L"}</p>
                    </article>
                    <article className="flex-cell">
                        <img src="../static/img/TOC.png" alt=""/>
                        <p>{tocVal + "mg/L"}</p>
                    </article>
                    <article className="flex-cell">
                        <img src={"../static/img/COD.png"} alt=""/>
                        <p>{codVal + "mg/L"}</p>
                    </article>
                    <article className="flex-cell">
                        <img src={"../static/img/color.png"} alt=""/>
                        <p>{chromaVal}</p>
                    </article>
                </section>
            </div>
        );
    }
}

// 开始渲染
het.domReady(() => {
    het.setTitle('手持式水质检测仪');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App}/>
        </Router>
    ), document.getElementById('ROOT'));
});

