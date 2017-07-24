'use strict';

/**
 * 主场景类
 * 整个app开发控制场景
 * @author   
 * @datetime 
 */

import {BaseClass} from '../core/Base.class.es6';
import MagicViewClass from '../modules/MagicView/MagicView.es6';
import * as Comm from '../modules/common.es6'; // 公共函数库
import {Store} from './Store.es6';
import {BaseComponent} from '../../libs/BaseComponent.class.es6';

let MagicView = new MagicViewClass();

let MagicViewDom = MagicView.getComponent();

export default class Scene extends BaseClass {
    constructor(){
        super();
    }

    /**
     * 获取react组件
     * @return {Component} 返回标准react组件
     */
    getComponent(){
        class Sc extends BaseComponent{
            constructor(props) {
                super(props);
                this.state = {
                     selectCover:{
                        display:'none',
                        top:0,
                        left:0,
                        width:'0',
                        height:'0'
                    }
                };
                this.sceneRect = {
                    top:0,
                    left:0
                };
                this.listenStore(Store); // 监听Store
            }
            handleWheel(e){
                let scene = ReactDOM.findDOMNode(this.refs.scene);
                scene.scrollTop += e.deltaY;
            }
            componentDidMount(){
                this.sceneRect = Comm.getElementRect(ReactDOM.findDOMNode(this.refs.scene));
            }
            render(){
                let coverStyle = {
                    display: this.state.selectCover.display ? 'block' : 'none',
                    top: this.state.selectCover.top - parseInt(this.sceneRect.top),
                    left: this.state.selectCover.left - parseInt(this.sceneRect.left),
                    width: this.state.selectCover.width,
                    height: this.state.selectCover.height
                };
                return <div ref='scene' className="scene-screen" onWheel={this.handleWheel.bind(this)} data-dragtype="select">
                        <MagicViewDom width="375" height="667" />
                        <div className="select-cover" style={coverStyle}></div>
                    </div>
            }
        }
        return Sc
    }
}