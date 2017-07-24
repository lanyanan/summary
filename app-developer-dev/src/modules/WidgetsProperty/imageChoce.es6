'use strict';
/**
 * 宫格图标组件
 * @author   hey
 * @datetime 2017-06-23
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';
import {Pager} from '../common';

export let ImageChoce = {
	getComponent : React.createClass({
        getInitialState: function(){
            return {
                picList:{
                    pager:{},
                    picList:[]
                },
                picListShow: false,
                iconPath: '',
                activeIcon: null,
            };
        },
        componentDidMount: function() {
            Actions.getPicList(1,2,100);
        },
        componentWillUpdate: function(nextProps, nextState) {
            if(nextProps.widget.userWidgetID != this.props.widget.userWidgetID){
                Actions.getPicList(1,2,100);
            }
        },
        showImageBox: function(){
            this.setState({
                picListShow: true,
            });
        },
        changeImage: function(e){
            let path = e.target.getAttribute('data-path'),
                index = e.target.getAttribute('data-index');
            console.log(path,index);
            if(!path) return;
            this.setState({
                iconPath: path,
                activeIcon: index
            });
            
        },
        closeImageBox: function(){
            this.setState({
                picListShow: false,
            });
        },
        sureImage: function(){
            this.closeImageBox();
            Actions.changeWidgetInfo('gridIcon', this.state.iconPath);
        },
        getPager: function(pageIndex){
           console.log(pageIndex);
        },
        render: function(){
            let widget = this.props.widget,
                picList = widget.picList;

        	return (
                <section className="img-choce" >
                    <span>图片</span>
                    <em onClick={this.showImageBox}>选择图标</em>
                    {
                        this.state.picListShow ? (
                            <div className='picList' style={{display: "block"}}>
                                <main>
                                    <header>选择图片<span className='closeList' onClick={this.closeImageBox}>X</span></header>
                                    <ul className='img-choce-list' onClick={this.changeImage}>
                                        {
                                            picList.picList.map((item, index) =>{
                                                let url = '';
                                                if( item.url.indexOf('https') < 0){
                                                    url = item.url.replace(/http/,'https').replace(/:\d{4}/,'');
                                                }
                                                return <li key={index}  className={this.state.activeIcon == index ? "active" : ""} ><img data-index={index} src={url}  data-path={url} alt="" /></li>
                                            })
                                        }
                                    </ul>
                                    {
                                        picList.pager&&<Pager pager={picList.pager} getPager={this.getPager}/>
                                    }
                                    <footer>
                                        <i className='btn' onClick = {this.sureImage}>确定</i>
                                        <i className='btn' onClick = {this.closeImageBox}>取消</i>
                                    </footer>
                                </main>
                            </div>
                        ) : null
                    }
                    
                </section>
            )
        }
    })
};