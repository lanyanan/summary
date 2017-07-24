'use strict';
/**
 * 标题属性类
 * @author   xinglin
 * @datetime 2016-01-20
 */
import {Actions} from '../../app/Actions.es6';
import {BaseComponent} from '../../../libs/BaseComponent.class.es6';

class Caption extends BaseComponent{
    constructor(props) {
        super(props);
        this.state = {
            hidden:true
        };
        this.listenStore(Store); // 监听Store
    }
    changeStatusName(e){//修改控件当前状态显示名
        let snvalue = e.target.value;
        Actions.changeWidgetCaption(snvalue);
    }
    delStatusName(e){//删除控件当前状态显示名
       Actions.changeWidgetCaption('');
    }
    showFocus(e){
        let defaultvalue = e.target.value;
        this.setState({hidden:false},()=>{
            React.findDOMNode(this.refs.captiontext).value=defaultvalue;
            React.findDOMNode(this.refs.captiontext).focus();
        });
    }
    hiddenBlur(e){
        this.setState({hidden:true});
    }
    keydown(e){//回车快捷键 提交命名结束
        e.stopPropagation();
        if(e.keyCode == 13){
            this.setState({hidden:true});
        }
        else{
            return;
        }
    }
    render(){
        let widgetCaption = this.props.item;
        return (
            <section className='captionproperty'>
                <span>名称</span>
                <input className="captiontext" value={widgetCaption} onChange={this.showFocus.bind(this)}
                       onFocus={this.showFocus.bind(this)} />
                <input className="captiontexthidden" type="text" onChange={this.changeStatusName.bind(this)}
                       onBlur={this.hiddenBlur.bind(this)} style={{display:(this.state.hidden?"none":"")}}
                       onKeyDown={this.keydown.bind(this)} defaultValue={widgetCaption} ref='captiontext' />
                <span className="deletecaption" onClick={this.delStatusName.bind(this)}>
                </span>
            </section>
        );
    }
}
export let CaptionProperty = {
	getComponent : Caption
};