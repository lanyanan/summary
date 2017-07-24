import {BaseComponent} from '../../libs/BaseComponent.class.es6';
import {Company,CompanyInfo,EditCompany} from './Company.es6';
import {Area,AreaInfo,EditArea} from './Area.es6';
import {Layout} from './Layout.es6';
import {Controller} from './Controller.es6';
import {Power,PowerInfo,EditPower} from './Power.es6';
import {User,UserInfo,EditUser} from './User.es6';
import {Login} from './Login.es6';


var {Router, Route, hashHistory,IndexRoute} = ReactRouter;


// 创建React组件
class App extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount(){
        
    }
    render() {
        return  <div className="app">{this.props.children}</div>     
    }
}


// 路由方式
ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Login} />
            <Route path="company" component={Company}>
                <Route path="companyinfo/:id" component={CompanyInfo} />
                <Route path="edit/:id" component={EditCompany} />
            </Route>
            <Route path="area" component={Area} >
                <Route path="areainfo/:id" component={AreaInfo} />
                <Route path="edit/:id" component={EditArea} />
                <Route path="layout/:id" component={Layout} />
            </Route>
            <Route path="controller/:id" component={Controller} />
            <Route path="power" component={Power}>
                <Route path="powerinfo/:id" component={PowerInfo} />
                <Route path="edit/:id" component={EditPower} /> 
            </Route>
            <Route path="user" component={User} >
                <Route path="userinfo/:id" component={UserInfo} />
                <Route path="edit/:id" component={EditUser} /> 
            </Route>
        </Route>
    </Router>
), document.getElementById('ROOT'));
