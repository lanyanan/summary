/**
 * Created by ben on 2016/12/5.
 */
// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
const {Router, Route, hashHistory, Link} = ReactRouter;
const appData = {};
import {Funs} from '../../../common/src/fun.es6';

het.domReady(()=>{
    // 配置sdk
    het.config({
        //debugMode: 'print', // 打印调试数据
        renderConfigData: true,// 开启控制数据渲染，以便filter能取到控制数据
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
            mode:0,
        };
        //Actions.local();
        Store.listen((data)=>this.setState(data)); // 监听Store
        this.mySwiper;
    };
    componentDidMount(){
        this.mySwiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
        });
        this.getDate();
    }
    getDate(){
        var date2 = new Date("2017-03-02 05:40");
        var sssss  = date2.toLocaleString;

        let createdddTime = Funs.dateFormat(" 2017-03-02 16:40 ",'yyyy-MM-dd hh:mm',true);
        console.log('createdddTime',createdddTime);

        //console.log("失sdfsdfsdfsdf败");
        //het.get('/v1/app/customization/fridge/hetFridge/getPowerList', {'date':'2017年3月1日'}, function(e){
        //    console.log("成功",e);
        //    let dataArr = JSON.parse(e).data;
        //
        //}, function(e){
        //    console.log("失败",e);
        //});
    }

    render() {
        return <section  className="swiperSection">
                    sdfasdfasdf
            </section>
    }
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('C-Life 快捷方式');
    // 无路由方式
    ReactDOM.render(<App />, document.getElementById('ROOT'));
});

