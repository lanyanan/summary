'use strict';

/**
 * 页面属性管理类
 * @author   xinglin
 * @datetime 2016-09-14
 */
import React from 'react';
import Reflux from 'reflux';
import {Actions} from '../../apps/playground/Actions';
import {Store} from '../../apps/playground/Store';
import {PanelBase} from '../../core/PanelBase.class';

const  _pagesArea_ = Symbol('_pagesArea_'); // 页面面板

export default class PageProperty extends PanelBase {
    constructor(){
        super();
    }

    /**
     * 获取react组件
     * @return {Component} 返回标准react组件
     */
    getComponent(){
        return React.createClass({
            mixins: [Reflux.connect(Store)],
            getInitialState: function(){
                    return {
                        mousePage:-1,
                        hidden:true,
                        activerename:-1,
                        showWidgetList:true,
                        activePictureUrl:null,
                        phone: {height:667,minHeight:667},
                        pages: {
                            activePage:0,
                            activerename:-1,
                            activeWidget:-1,
                            pageList:[
                                {pageName:"主页",pageId:0,widgetList:[{}],pageBgUrl:null},
                            ]
                        },
                        picList:{
                            pager:{},
                            picList:[]
                        }
                    };
            },
            deletepage: function(e){//删除页面
                e.stopPropagation();
                let pageName = e.target.getAttribute('data-name');
                let pindex = Number(e.target.getAttribute('data-index'));
                if(pindex===0) {
                    alert('不能删除主页');
                    return;
                }
                if(confirm('确定要删除 '+pageName+' ?')){
                    Actions.deletePage(pindex);
                }else{
                    return;
                }
            },
            showFocus:function(e){
                let defaultvalue = e.target.value;
                this.setState({hidden:false},()=>{
                    React.findDOMNode(this.refs.pageName).value=defaultvalue;
                    React.findDOMNode(this.refs.pageName).focus();
                });
            },
            renameing: function(e){//命名修改中 实时更改状态显示最新命名
                e.stopPropagation();
                let pindex = Number(e.target.getAttribute('data-index'));
                let newname = e.target.value.substr(0, 15);
                Actions.renamePage(pindex,newname);
            },
            renameend: function(e){//命名结束,页面名不再可操作及失去焦点
                e.stopPropagation();
                if(e.target.value == ''){
                    let pindex = Number(e.target.getAttribute('data-index'));
                    let newname = 'Untitled';
                    Actions.renamePage(pindex,newname);
                }
                this.setState({hidden:true});
            },
            keydown : function(e){//回车快捷键 提交命名结束
                e.stopPropagation();
                if(e.keyCode == 13){
                    this.renameend(e);
                }
                else{
                    return;
                }
            },
            changeHeight:function(e){
                let newValue = e.target.value;
                if(newValue<this.state.phone.minHeight) return;
                let value = newValue - this.state.phone.height;
                Actions.resizeCanvas(value);
            },
            changeBgHeight:function(e){
                let newValue = parseInt(e.target.value);
                    newValue = newValue > this.state.phone.height ? this.state.phone.height : newValue;
                    newValue = newValue ? newValue+"px" : 0;
                let activePage = this.state.pages.activePage>0?this.state.pages.activePage:0;
                Actions.changePageBg(activePage,'bgHeight',newValue);
            },
            changeBgImage:function(e){
                let newValue = e.target.getAttribute('data-path');
                if(!newValue) return;
                this.setState({
                    activePictureUrl: newValue
                });
            },
            clearImage(e){
                this.setState({
                    activePictureUrl: ''
                });
            },
            uploadBgImage(e){
                let imagefile = e.target.files[0];
                if(!imagefile) return;
                if(imagefile.type!='image/jpeg'&&imagefile.type!='image/png'&&imagefile.type!='image/gif'){
                    alert('请上传正确的图片格式(jpg/png/gif)!');
                    return;//验证是否为指定格式
                }
                if(parseInt(parseInt(imagefile.size)/1024)>500){
                    alert('请上传大小不超过500KB的图片!');
                    return;//验证大小是否超过500KB
                }
                let formdata = new FormData();
                formdata.append('file',imagefile);
                Actions.uploadPageImage(formdata);
            },
            chooseBgImage:function(e){
                let newValue = this.state.activePictureUrl;
                let activePage = this.state.pages.activePage>0?this.state.pages.activePage:0;
                Actions.changePageBg(activePage,'pageBgUrl',newValue);
                this.setState({
                    picListShow: false
                });
            },
            changeHeightType:function(e){
                let newValue = e.target.value;
                let activePage = this.state.pages.activePage>0?this.state.pages.activePage:0;
                Actions.changePageBg(activePage,'bgHeightType',newValue);
                if(newValue === '1') Actions.changePageBg(activePage,'bgHeight','100%');
                if(newValue === '2') Actions.changePageBg(activePage,'bgHeight',this.state.phone.height+'px');
            },
            calibration:function(e){
                let newValue = e.target.value;
                if(newValue<this.state.phone.minHeight){
                    let value = this.state.phone.minHeight - this.state.phone.height;
                    Actions.resizeCanvas(value);
                    React.findDOMNode(this.refs.pageHeight).value=this.state.phone.minHeight;
                }
            },
            colorPick: function(e) {
                let newcolor = e.target.value;
                let activePage = this.state.pages.activePage>0?this.state.pages.activePage:0;
                Actions.changePageBg(activePage,'pageColor',newcolor);
            },
            toggleView(e){
                if(e.target.className == "close"){
                    e.target.parentNode.nextElementSibling.style.display = "none";
                    e.target.className = "open";
                }else if(e.target.className == "open"){
                    e.target.parentNode.nextElementSibling.style.display = "block";
                    e.target.className = "close";
                }
            },
            togglePicList(e){
                let value = !this.state.picListShow;
                this.setState({
                    picListShow: value
                });
            },
            previousPage(e){
                if(this.state.picList.pager.hasPrevPage){
                    Actions.getPicList(this.state.picList.pager.pageIndex-1);
                }
            },
            nextPage(e){
                if(this.state.picList.pager.hasNextPage){
                    Actions.getPicList(Number(this.state.picList.pager.pageIndex)+1);
                }
            },
            render: function(){
                let pageProShow = this.state.pages.activePage!=-1&&this.state.pages.activeWidget==-1 ? true : false;
                let activePage = this.state.pages.activePage>0?this.state.pages.activePage:0;
                let pages = this.state.pages.pageList || [];
                let page = pages[activePage];
                let pictureUrl = this.state.activePictureUrl === null ? page.pageBgUrl : this.state.activePictureUrl;
                let hasPrevPage = this.state.picList.pager.hasPrevPage;
                let hasNextPage = this.state.picList.pager.hasNextPage;
                return (
                    <div className='pageProperty' style={{display:pageProShow?'block':'none'}}>
                        <header>页面</header>
                        <div className='propertybody'>
                            <div className="page-property-content">
                                <section>
                                    <span>名称</span>
                                    <input className="pageName" value={page.pageName} onChange={this.showFocus}
                                    onFocus={this.showFocus} />
                                    <input className="pageNamehidden" data-index={activePage} type="text" onChange={this.renameing}
                                    onBlur={this.renameend} style={{display:(this.state.hidden?"none":"")}}
                                    onKeyDown={this.keydown} defaultValue={page.pageName} ref='pageName' />
                                </section>
                                <section>
                                    <span>宽度</span>
                                    <input className="pageName" type='number' readOnly='true' value={375}  />
                                </section>
                                <section>
                                    <span>高度</span>
                                    <input id='pageHeight' className="pageName" ref='pageHeight' min={this.state.phone.minHeight} type='number' defaultValue={this.state.phone.height} onChange={this.changeHeight} onBlur={this.calibration} />
                                </section>
                            </div>
                            <div className="page-bgimg-list" onClick={this.toggleView}>
                                <header>背景<span className="close"></span></header>
                                <div className="page-bgimg-content">
                                    <section className='pageColor'>
                                        <span>颜色</span>
                                        <input value={page.pageColor} onChange={this.colorPick} />
                                        <input type="color" value="#efefef" style={{backgroundColor: page.pageColor}} className="extendblock" onChange={this.colorPick} />
                                    </section>
                                    <section className="img-choce" >
                                        <span>图片</span>
                                        <input type="text" readOnly = 'true' style={{backgroundColor:"#3b96ff"}} value='上传图片' onClick={this.togglePicList}/>
                                        {this.state.picListShow ?
                                            <div className='picList'>
                                                <main>
                                                    <header>选择图片<span className='closeList' onClick={this.clearImage}>X</span></header>
                                                    <ul className='chooseImage' onClick={this.changeBgImage}>
                                                        <li className='uploadImage'>
                                                            <img src='../static/img/upload.png' />
                                                            <input className='hidden' onChange={this.uploadBgImage} type='file' accept="image/png,image/jpeg,image/gif" />
                                                        </li>
                                                    {this.state.picList.picList.map((item,index)=>{
                                                        return <li key={index} >
                                                                <img data-path={item.url} data-name={item.name} data-spec={item.spec} src={item.url} />
                                                                </li>
                                                    })}
                                                        {/*<li>
                                                            {hasPrevPage?<i onClick={this.previousPage}>上一页</i>:null}
                                                            {hasNextPage?<i onClick={this.nextPage}>下一页</i>:null}
                                                        </li>*/}
                                                    </ul>
                                                    {pictureUrl ?
                                                        <div className='previewImage'>
                                                            <img className='previewImage' src={pictureUrl}  />
                                                        </div> :
                                                        <div className='previewImage'></div>}
                                                    <footer>
                                                        <i className='btn' onClick = {this.chooseBgImage}>确定</i>
                                                        <i className='btn' onClick = {this.togglePicList}>取消</i>
                                                    </footer>
                                                </main>
                                            </div> : null}
                                    </section>
                                    <section className="img-height">
                                        <span>高度</span>
                                        <select className='pageHeight' value={page.bgHeightType} onChange={this.changeHeightType}>
                                            <option value='1'>满屏</option>
                                            <option value='2'>自定义</option>
                                        </select>
                                        <input className="heightValue" type={page.bgHeightType == 2 ? "number" : 'hidden'} onChange={this.changeBgHeight} value={parseInt(page.bgHeight) || 0} />
                                    </section>
                                </div>
                                <header style={{marginTop:'20px'}}></header>
                            </div>
                            {/*<section>
                                <span>背景</span>
                                <input type='text' />
                            </section>*/}
                            <section className="deleteButton" data-name={page.pageName} data-index={activePage} onClick={this.deletepage}>删除页面</section>
                        </div>
                    </div>
                );
            }
        });
    }

}
