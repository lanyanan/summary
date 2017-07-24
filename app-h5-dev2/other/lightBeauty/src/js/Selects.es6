/**
 * 选择列表组件
 * 当路由/select/:component/:initValue时，将会调用该组件。
 * 子组件由:component指定，初始值由:initValue指定
 * @variable {object} ReactRouter  需要一个名为ReactRouter的react路由对象以提供State访问服务
 * @act AppActions.selectAny([json]) 点击确定时触发
 */
import {Actions} from './Actions.es6';
window.SelectActions = Reflux.createActions([
    'selected' // 选定
]);
var strikeTimer; // 处理低版本浏览器tap点透BUG的计时器
var SelectStore = Reflux.createStore({
    listenables: [SelectActions],
    onSelected: function(data) {
        this.trigger(data);
    }
});
export const Selects = React.createClass({
    mixins: [ReactRouter.State, Reflux.connect(SelectStore)],
    handlerOkClick : function(e) {
        var selBody = React.findDOMNode(this.refs["body"]);
        // 处理低版本浏览器tap点透BUG
        if (new Date() - strikeTimer < 600){
            return false;
        }
        e.preventDefault();
        Actions.selectAny(this.state);
        selBody.className = selBody.className.replace(/ on/g, "");
        setTimeout(function(){
            history.go(-1);
        }, 300);
    },
    handlerNoClick : function(e) {
        var selBody = React.findDOMNode(this.refs["body"]);
        // 处理低版本浏览器tap点透BUG
        if (new Date() - strikeTimer < 600){
            return false;
        }
        e.preventDefault();
        e.stopPropagation();
        selBody.className = selBody.className.replace(/ on/g, "");
        setTimeout(function(){
            history.go(-1);
        }, 300);
    },
    handlerBodyClick : function(e) {
        e.preventDefault();
        e.stopPropagation();
    },
    componentDidMount : function() {
        var selBody = React.findDOMNode(this.refs["body"]);
        strikeTimer = new Date();
        setTimeout(function(){
            selBody.className += " on";
        }, 10);
    },
    render : function() {
        var Component = components[this.getParams().component]; // 取得组件
        var initValue = this.getParams().initValue; // 取得组件初始值
        var other = this.getParams().other; // 取得组件初始值
        return (
            <section className="popselect-wrap" onClick={this.handlerNoClick}>
                <div ref="body" className="popselect-body" onClick={this.handlerBodyClick}>
                    <div className="popselect-btns flex">
                        <a href="#" onClick={this.handlerNoClick} className="flex-cell popselect-btns-no">取消</a>
                        <span className="flex-cell"></span>
                        <a href="#" onClick={this.handlerOkClick} className="flex-cell popselect-btns-ok">确认</a>
                    </div>
                    { Component ? <Component value={initValue} other={other} /> : "" }
                </div>
            </section>
        );
    }
});
// 可供调用的组件列表
var components = {
    "mode" : require('./Select-modes.es6'),
    "ut" : require('./Select-uts.es6'),
    "light" : require('./Select-lights.es6'),
    "ie" : require('./Select-ie.es6'),
    "knead" : require('./Select-knead.es6'),
    "time" : require('./Select-timer.es6')
};
