import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {SingleClass} from './singleClass.es6';
import {WeekClass} from './weekClass.es6';
import {VideoClass} from './videoClass.es6';
import {App} from './App.es6';
import {AddCourse} from './addCourse.es6';
import {SingleCourse} from './singleCourse.es6';
import {PeriodCourse} from './periodCourse.es6';

var {Router, Route, hashHistory, IndexRoute} = ReactRouter;

// het.domReady(()=>{
//     // 配置sdk
//     het.config({
//         debugMode: 'print', // 打印调试数据
//         updateFlagMap: {
//         }
//     });
// });

// // 接收app推送数据
// het.repaint((data, type)=>{
//     Actions.repaint(data, type);
// });

// 开始渲染
het.domReady(()=>{
    het.setTitle('护肤课程');
    // 无路由方式
    // ReactDOM.render(<App />, document.getElementById('ROOT'));

    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="/addCourse" component={AddCourse}>
                <Route path="singleCourse" component={SingleCourse} />
                <Route path="periodCourse" component={PeriodCourse} />
            </Route>
            <Route path="/singleClass/:planId" component={SingleClass} />
            <Route path="/weekClass/:planId" component={WeekClass} />
            <Route path="/videoClass/:planId/:period(/:date)" component={VideoClass} />
        </Router>
    ), document.getElementById('ROOT'));
});