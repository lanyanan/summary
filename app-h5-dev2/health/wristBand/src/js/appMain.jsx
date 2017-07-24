import {Actions} from './Actions.es6';
import {App }  from './App.jsx';
import {PageHeart }  from './PageHeart.jsx';
import {PageSleep }  from './PageSleep.jsx';
import {PageSport }  from './PageSport.jsx';
import {PageConnect }  from './PageConnect.jsx';
const {Router, Route, hashHistory} = ReactRouter;


het.domReady(()=>{
    het.config({
        debugMode: 'print', // 打印调试数据
        updateFlagMap: {
        }
    });
    het.setTitle('智能手环');
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App} />
            <Route path="/PageHeart" component={PageHeart} />
            <Route path="/PageSleep" component={PageSleep} />
            <Route path="/PageSport" component={PageSport} />
            <Route path="/PageConnect" component={PageConnect} />
        </Router>
    ), document.getElementById('ROOT'));
});