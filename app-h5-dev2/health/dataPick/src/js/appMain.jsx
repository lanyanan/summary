/**
 * Created by Administrator on 2016-08-06.
 */
import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory} = ReactRouter;

het.domReady(()=> {
    // 配置sdk
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {}
    });
});
//设备参数获取
het.ready((data)=> {
    Actions.getTime(data);
});


// 接收app推送数据
het.repaint((data)=> {
    // var appData = Funs._extends({}, appData, data);
    Actions.repaint(data);
});

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store
    }

    componentDidMount() {
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
        window.addEventListener('resize', function () {
            document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
        }, false);
    }

    render() {
        return (
            <div>
                <div className='date-pick-header'>
                </div>
                <div className='date-pick'>
                <div className="ta_date" id="div_date_demo3">
                    <span className="date_title" id="date_demo3"></span>
                    <a className="opt_sel" id="input_trigger_demo3" href="#">
                        <i className="i_orderd"></i>
                    </a>
                </div>
            </div>
                <div className='data-confirm'><a className='data-confirm-a'>确定</a></div>
            </div>
        )
    }

    componentWillUpdate() {
        let today_Date = new Date(), pick_data = '';
        let dateRange = new pickerDateRange('date_demo3', {
            aRecent7Days: 'aRecent7DaysDemo3', //最近7天
//        aRecent30Days : 'aRecent30Days', //最近30天
            isTodayValid: true,
            //startDate : today_Date.toLocaleDateString().replace(/\//g,'-'),
            endDate: (today_Date.toLocaleDateString().replace(/\//g, '-')),
            //needCompare : true,
            //isSingleDay : true,
            //shortOpr : true,
            defaultText: '至',
            inputTrigger: 'input_trigger_demo3',
            theme: 'ta',
            success: function (obj) {
                $('#dCon_demo3').html('开始时间 : ' + obj.startDate + '<br/>结束时间 : ' + obj.endDate);
                pick_data = $('#date_demo3').text();
                //console.log(pick_data, typeof  pick_data, pick_data.length);
                if (pick_data.length > 12) {
                    $('.data-confirm').css('display', 'block');
                } else {
                    $('.data-confirm').css('display', 'none');
                };
                let beginDate = pick_data.split('至')[0];
                let endDate = pick_data.split('至')[1];
                console.log(beginDate, endDate);
            }
        });
        $('.data-confirm-a').click(function(){
            pick_data = $('#date_demo3').text();
            let beginDate = pick_data.split('至')[0];
            let endDate = pick_data.split('至')[1];
            console.log(beginDate, endDate);
            Actions.getHisData(beginDate, endDate);
        })
    }
}
// 开始渲染
het.domReady(()=> {
    het.setTitle('C-Life 设备控制');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));
    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path='/' component={App}/>
        </Router>
    ), document.getElementById('ROOT'));
});


