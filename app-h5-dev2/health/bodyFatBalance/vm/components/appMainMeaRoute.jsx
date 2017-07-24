/**
 * Created by Administrator on 2016-08-11.
 */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory} from 'react-router';

//comp
import MeasurementReport from './MeasurementReport.jsx';
import ContentBmi from './ContentBmi.jsx';
import ContentDateMetal from './ContentDateMetal.jsx';
import ContentFatRate from './ContentFatRate.jsx';
import ContentMusclePrc from './ContentMusclePrc.jsx';
import ContentWaterPrc from './ContentWaterPrc.jsx';

// 定义页面上的路由
var routes = (
    <Router history={hashHistory}>
        <Route path='/' component={MeasurementReport}>
            <IndexRoute component={Home}/>
            <Route path='bmi' component={ContentBmi}/>
            <Route path='fatRate' component={ContentFatRate}/>
            <Route path='waterPrc' component={ContentWaterPrc}/>
            <Route path='musclePrc' component={ContentMusclePrc}/>
            <Route path='dateMetal' component={ContentDateMetal}/>

        </Route>
    </Router>
);
render(routes, document.getElementById('content'));