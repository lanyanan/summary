/**
 * 选择列表组件
 * 当路由/select/:component/:initValue时，将会调用该组件。
 * 子组件由:component指定，初始值由:initValue指定
 * @variable {object} ReactRouter  需要一个名为ReactRouter的react路由对象以提供State访问服务
 * @act AppActions.selectAny([json]) 点击确定时触发
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {modes} from './Select-modes-kym.es6';
import {uts} from './Select-uts.es6';
import {lights} from './Select-lights-kym.es6';
import {ies} from './Select-ie.es6';
import {kneads} from './Select-knead-kym.es6';
import {timers} from './Select-timer.es6';

 // 可供调用的组件列表
 // var components = {
 //     "mode" : require('./Select-modes-kym.es6'),
 //     "ut" : require('./Select-uts.es6'),
 //     "light" : require('./Select-lights-kym.es6'),
 //     "ie" : require('./Select-ie.es6'),
 //     "knead" : require('./Select-knead-kym.es6'),
 //     "time" : require('./Select-timer.es6')
 // };
 let components = {
     "mode" : modes,
     "ut" : uts,
     "light" : lights,
     "ie" : ies,
     "knead" : kneads,
     "time" : timers
 };
window.SelectActions = Reflux.createActions([
    'selected' // 选定
]);
let strikeTimer; // 处理低版本浏览器tap点透BUG的计时器
let SelectStore = Reflux.createStore({
    listenables: [SelectActions],
    onSelected: function(data) {
        this.trigger(data);
    }
});
export class Selects extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {};
        this.listenStore(SelectStore);
    }
    handlerOkClick(e) {
        var selBody = ReactDOM.findDOMNode(this.refs["body"]);
        // 处理低版本浏览器tap点透BUG
        if (new Date() - strikeTimer < 600){
            return false;
        }
        e.preventDefault();
        AppActions.selectAny(this.state);
        selBody.className = selBody.className.replace(/ on/g, "");
        setTimeout(function(){
            history.go(-1);
        }, 300);
    }
    handlerNoClick(e) {
        var selBody = ReactDOM.findDOMNode(this.refs["body"]);
        // 处理低版本浏览器tap点透BUG
        if (new Date() - strikeTimer < 600){
            return false;
        }
        e.preventDefault();
        selBody.className = selBody.className.replace(/ on/g, "");
        setTimeout(function(){
            history.go(-1);
        }, 300);
    }
    handlerBodyClick(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    componentDidMount() {
        var selBody = ReactDOM.findDOMNode(this.refs["body"]);
        strikeTimer = new Date();
        setTimeout(function(){
            selBody.className += " on";
        }, 10);
    }
    render() {
        let _params = this.props.params;
        // console.log(_params)
        let Component = components[_params['component']]; // 取得组件
        let initValue = _params['initValue']; // 取得组件初始值
        let other = _params['other']==undefined?'':_params['other'] ; // 取得组件初始值
        
        return (
            <section className="popselect-wrap" onClick={this.handlerNoClick.bind(this)}>
                <div ref="body" className="popselect-body" onClick={this.handlerBodyClick.bind(this)}>
                    <div className="popselect-btns flex">
                        <a href="#" onClick={this.handlerNoClick.bind(this)} className="flex-cell popselect-btns-no">取消</a>
                        <span className="flex-cell"></span>
                        <a href="#" onClick={this.handlerOkClick.bind(this)} className="flex-cell popselect-btns-ok">确认</a>
                    </div>
                    { Component ? <Component value={initValue} other={other} /> : "" }
                </div>
            </section>
        );
    }
};


