// import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {MeasureSkin} from './measureSkin.es6';
import {ProMeasureSkin} from './proMeasureSkin.es6';
import {AfterProMeasureSkin} from './afterProMeasureSkin.es6';
import {Analysis} from './analysis.es6';
import {ProResult} from './proResult.es6';
import {App} from './App.es6';
import {skinCareTest} from './skinCareTest.es6';
import {brandShow} from './brandShow.es6';
import {deviceList} from './deviceList.es6';
import {userView} from './userView.es6';

var {Router, Route, hashHistory} = ReactRouter;
function getQueryString(name){
     let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     let hash = window.location.hash;
     let r = hash.substr(hash.indexOf('?')+1).match(reg);
     if(r!=null) return decodeURI(r[2]);
     return '';
}
// 开始渲染
het.domReady(()=>{
    het.setTitle('测肤仪');
    let oid = getQueryString('openid');
    Actions.configWx(oid);
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 我也不想传这么多值，是后台逼我的，要找就找后台！
    // AfterProMeasureSkin /部位/产品ID/上一次测肤的ID/护肤前水/护肤前油/护肤前弹性
    // Analysis /部位/护肤前水/护肤前油/护肤前弹性/护肤后水/护肤后油/护肤后弹性/肤质描述
    // 路由方式
    ReactDOM.render((
            <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path='/skinCareTest' component={skinCareTest} />
            <Route path='/brandShow' component={brandShow} />
            <Route path='/deviceList' component={deviceList} />
            <Route path='/userView' component={userView} />
            <Route path="/measureSkin" component={MeasureSkin} />
            <Route path="/protest/:part/:productId" component={ProMeasureSkin} />
            <Route path="/afterprotest/:part/:productId/:lastPartMeasureId/:beforeWater/:beforeOil/:beforeElasticity" component={AfterProMeasureSkin} />
            <Route path="/analysis/:part/:beforeWater/:beforeOil/:beforeElasticity/:afterWater/:afterOil/:afterElasticity/:skinTypeName" component={Analysis} />
            <Route path="/proResult" component={ProResult} />
        </Router>
    ), document.getElementById('ROOT'));
});