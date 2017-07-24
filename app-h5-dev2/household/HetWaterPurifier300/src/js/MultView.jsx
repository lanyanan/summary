'use strict';
/**
 * @fileName: MultView.jsx
 * Created by liuzh on 2017-01-18
 * 空白错误
 * @prop {function} ErrtryCall  错误点击的回调函数
 * @prop {number} showLoad    是否显示提示信息的 1 2 3 ['暂无数据哦 ！','数据加载错误,点击重试 ！','当前版本不支持设备统计接口调用！'];
 * @prop {string} textErr     显示数据的提示语
 * @prop {boolean} showD       是否显示数据部分
 * @prop {boolean} showTop     是否显示Title条
 * @prop {View} itemView    数据显示部分的View
 *
 */

import {LoadImagModel} from './LoadImagModel.jsx';

export const MultView = React.createClass({
    getInitialState: function(){
        let isAndroid = !!(navigator.userAgent.indexOf('Android')+1);
        return {
            headerTop: isAndroid?73:64,
        };
    },
    touchcanle(e) {
        e.stopPropagation();//取消时间冒泡
        if (typeof this.props.ErrtryCall==='function') {
            this.props.ErrtryCall();
        }
    },
    render() {
        let itemView = this.props.itemView;
        let show = this.props.showD;
        let showLoad = this.props.showLoad || 0;
        let Texterr = this.props.textErr;
        let showTop = this.props.showTop;
        return  (
            <section className="app-body">
                <div style={{height:this.state.headerTop + 'px',width:'100%',backgroundColor:'rgb(42,204,250)',
                visibility: showTop?"visible":'hidden'}}></div>
                <section className="StastiBody">
                    <section className="stastiTu" style={{visibility: show?showLoad == 0?"hidden":'visible':'hidden'}}>
                        {itemView}
                    </section>
                    <section className="emptyS" style={{visibility: show?'hidden':showLoad == 0?'hidden':'visible'}}>
                        <img onTouchEnd={this.touchcanle} src="../static/img/emptys.png"/>
                        <p>{Texterr}</p>
                    </section>
                    <LoadImagModel showLoad={showLoad}/>
                </section>

            </section>);
    }
});