// import {Funs} from '../../../common/src/fun.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory,Link} = ReactRouter;

het.domReady(()=>{
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {
        }
    });
});

// 接收app推送数据
het.repaint((data)=>{
    // appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});

// 创建React组件
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        Store.listen((data)=>this.setState(data)); // 监听Store
    };

    render() {
        let model = parseInt(this.state.MachineOperationState || 0);
        let online = parseInt(this.state.online|| 1);
        let TextDeviceState = ["设备待机中","设备冲洗中","设备制水中",""];

        let SourceWater = {
            SourceWaterTds: parseInt(this.state.SourceWaterTds)  || 0,
            SourceSpectrumTOC: (parseInt(this.state.SourceSpectrumTOC)/100)  || 0,
            SourceSpectrumCOD: (parseInt(this.state.SourceSpectrumCOD)/100)  || 0,
            SourceSpectrumColor: (parseInt(this.state.SourceSpectrumColor)/100)  || 0,
            SourceSpectrumTurbidity: (parseInt(this.state.SourceSpectrumTurbidity)/100)  || 0,
            SourceWaterTemprature: parseInt(this.state.SourceWaterTemprature || 0),
        };
        let SourcenWaternmb = 0;
        if(SourceWater.SourceWaterTds > 1000)SourcenWaternmb++;
        if(SourceWater.SourceSpectrumTOC > 5)SourcenWaternmb++;
        if(SourceWater.SourceSpectrumCOD > 5)SourcenWaternmb++;
        if(SourceWater.SourceSpectrumColor > 15)SourcenWaternmb++;
        if(SourceWater.SourceSpectrumTurbidity > 3)SourcenWaternmb++;
        if(SourceWater.SourceWaterTemprature > 38 || (SourceWater.SourceWaterTemprature < 5 && SourceWater.SourceWaterTemprature != 0))SourcenWaternmb++;

        let PureWater = {
            PureWaterTds: parseInt(this.state.PureWaterTds)  || 0,
            PureSpectrumTOC: (parseInt(this.state.PureSpectrumTOC)/100)  || 0,
            PureSpectrumCOD: (parseInt(this.state.PureSpectrumCOD)/100)  || 0,
            PureSpectrumColor: (parseInt(this.state.PureSpectrumColor)/100)  || 0,
            PureSpectrumTurbidity: (parseInt(this.state.PureSpectrumTurbidity)/100)  || 0,
        };
        let PureWaternmb = 0;
        if(PureWater.PureWaterTds > 1000)PureWaternmb++;
        if(PureWater.PureSpectrumTOC > 5)PureWaternmb++;
        if(PureWater.PureSpectrumCOD > 5)PureWaternmb++;
        if(PureWater.PureSpectrumColor > 15)PureWaternmb++;
        if(PureWater.PureSpectrumTurbidity > 3)PureWaternmb++;

        let workText = <i>{TextDeviceState[model]}</i> ;
        workText = SourcenWaternmb != 0?<i>{TextDeviceState[model] + " 源水: "}<span style={{color:'#ff4723'}}>{SourcenWaternmb}</span>{"项异常" + ""}</i> : workText;
        workText = PureWaternmb != 0?<i>{workText} {" 纯水: "}<span style={{color:'#ff4723'}}>{PureWaternmb}</span>{"项异常" + ""}</i>: workText;
        let tocText = PureWater.PureSpectrumTOC;
        let codText = PureWater.PureSpectrumCOD;
        let colorText = PureWater.PureSpectrumColor;
        let turbidityText = PureWater.PureSpectrumTurbidity;

        return (
            <div>
                {online==2?<h1 className="btn-title">设备已离线</h1>:
                    <h1 className="btn-title">{workText}</h1>
                }
                <section className="flex btnlist">
                    <article className="flex-cell art-1">
                        <img src="../static/img/TOS.png" alt=""/>
                        <p>{tocText + "mg/L"}</p>
                    </article>

                    <article className="flex-cell art-2">
                        <img src="../static/img/COD.png" alt=""/>
                        <p>{codText + "mg/L"}</p>
                    </article>

                    <article className="flex-cell art-3">
                        <img src={"../static/img/colorD.png"} alt=""/>
                        <p>{colorText + "铂钴色度"}</p>
                    </article>
                    <article className="flex-cell art-3">
                        <img src={"../static/img/dityD.png"} alt=""/>
                        <p>{turbidityText + "NTU"}</p>
                    </article>
                </section>
            </div>
        );
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('和而泰净水器');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('ROOT'));
});

