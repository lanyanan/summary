'use strict';
/**
 * 图像属性面板类
 * @author   xinglin
 * @datetime 2016-01-15
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';
import {uploadVerification} from './uploadVerification'; // 图片验证类

export let ImageProperty = {
	getComponent : React.createClass({
        getInitialState: function(){
                return {
                    hidden:true
                };
        },
		piconload:function(e){//上传背景图片
            e.stopPropagation();
            let imagefile = e.target.files[0];
            let pid = Number(e.target.getAttribute('data-pid'));
            if(!uploadVerification(imagefile)) return;//验证图片是否符合格式
            let formdata = new FormData();
            formdata.append('file',imagefile);
            let reader = new FileReader();
            reader.readAsDataURL(imagefile);
            reader.onload = function(e){
                var img = new Image();//构造JS的Image对象
                document.querySelector('#imagepreview'+pid).src = img.src = this.result;//将本地图片赋给image对象
                img.onload=function(){
                    Actions.uploadBgImage(pid,formdata,img.width,img.height);
                }
            }
        },
        changeStatusName : function(e){//修改控件当前状态显示名
            let pid = Number(e.target.getAttribute('data-pid'));
            let snvalue = e.target.value;
            Actions.changeStatusName(pid,snvalue,'statusName');
        },
        delStatusName : function(e){//删除控件当前状态显示名
           let pid = Number(e.target.getAttribute('data-pid'));
           Actions.changeStatusName(pid,'','statusName');
        },
        showFocus:function(e){
            let defaultvalue = e.target.value;
            this.setState({hidden:false},()=>{
                React.findDOMNode(this.refs.picname).value=defaultvalue;
                React.findDOMNode(this.refs.picname).focus();
            });
        },
        hiddenBlur:function(e){
            this.setState({hidden:true});
        },
        keydown : function(e){//回车快捷键 提交命名结束
            if(e.keyCode == 13){
                this.setState({hidden:true});
            }
            else{
                return;
            }
        },
        render: function(){
        	let I = this.props.item,
        		i = this.props.index;
            let uploadHidden = this.props.uploadHidden || false;
            return (
                <div className='imageproperty'>
                    <section className='imageinfo'>
                        <span>{this.props.showStall?'档位名称':'状态名称'}</span>
                        <input className="picname" value={I.statusName} onChange={this.showFocus}
                               onFocus={this.showFocus} placeholder='请填写状态名' />
                        <input className="picnamehidden" onChange={this.changeStatusName} ref='picname'
                               onBlur={this.hiddenBlur} style={{display:(this.state.hidden?"none":"")}}
                               data-pid={i} defaultValue={I.statusName} onKeyDown={this.keydown} />
                        <span className="deleteinfo" data-pid={i} onClick={this.delStatusName}>
                        </span>
                    </section>
                    <div className='imageupload' style={{display:uploadHidden?'none':'block'}}>
                        <input className='uploadfile' onChange={this.piconload}
                               type="file" data-pid={i}
                               accept="image/png,image/jpeg,image/gif" />
                        <img id={'imagepreview'+i} src={I.bgImagePath || "../static/img/noimage.png"} />
                    </div>
                    <div className='imagebutton' style={{display:uploadHidden?'none':'block'}}>
                        <label>点击上传图片</label>
                    </div>
                </div>
            );
        }
    })
};