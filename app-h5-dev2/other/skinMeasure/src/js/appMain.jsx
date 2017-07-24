import {App } from './App.jsx';
import {History } from './History.jsx';
const  {Router, Route, hashHistory } = ReactRouter;

het.domReady(()=>{
    het.config({
        appId: '30590',
        appSecret:'98889238ed6e441aaf9b0691b017695f',
        host: het.getHost()
    });
    ReactDOM.render((
        <Router history={hashHistory} >
            <Route path="/" component={App} />
            <Route path="/history" component={History}/>
        </Router>
    ), document.getElementById('ROOT'));
});