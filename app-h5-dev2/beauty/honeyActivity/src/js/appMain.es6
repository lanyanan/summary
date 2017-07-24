import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Vote} from './Vote.es6';
import {VoteDetail} from './VoteDetail.es6';
import {Guide} from './Guide.es6';
import {GuideVote} from './GuideVote.es6';
import {GuideActivity} from './GuideActivity.es6';
import {details} from './details.es6';
import {identify} from './identify.es6';
import {bestieConfirm} from './bestieConfirm.es6';
import {DetailsApp} from './detailsApp.es6';
import {showInfo} from './showInfo.es6';

var {Router, Route, hashHistory, Link} = ReactRouter;

// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store
    }
    handleTouchTap(e) {
        console.log('touchTap事件测试');
    }
    render() {
        return <div onTouchTap={this.handleTouchTap.bind(this)}>Happy</div>;
    }
}

function getOidMain(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null) return decodeURI(r[2]);
    return null;
}

// 开始渲染
het.domReady(()=>{
    het.setTitle('闺蜜行动');
    let oid = getOidMain('oid');
    Actions.configWx(oid);
    // 路由方式
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={details}/>
            <Route path='/identify' component={identify}/>
            <Route path='/bestie' component={bestieConfirm}/>
            <Route path="/Vote(/:oid)(/:cid)" component={Vote} />
            <Route path="/VoteDetail/:cid(/:oid)" component={VoteDetail} />
            <Route path="/Guide" component={Guide} />
            <Route path="/GuideVote" component={GuideVote} />
            <Route path="/GuideActivity" component={GuideActivity} />
            <Route path="/DetailsApp" component={DetailsApp} />
            <Route path="/showInfo" component={showInfo} />
        </Router>
    ), document.getElementById('ROOT'));
});