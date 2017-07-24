'use strict';

/**
 * 组件位置尺寸面板类
 * 提供控件各种位置尺寸设定
 * @author   xinglin
 * @datetime 2015-12-11
 */
import {Actions} from '../../app/Actions.es6';
import {Store} from '../../app/Store.es6';
import {PanelBase} from '../../core/PanelBase.class.es6';
import {BaseComponent} from '../../../libs/BaseComponent.class.es6';
import {uploadVerification} from './uploadVerification.es6'; // 图片验证类



export default class ImportLayout extends PanelBase {
    constructor(){
        super();
    }

    /**
     * 获取react组件
     * @return {Component} 返回标准react组件
     */
    getComponent(){
        return class Lay extends BaseComponent{
            constructor(props) {
                super(props);
                this.state = {
                    
                };
                this.listenStore(Store); // 监听Store
            }
            getChangeFile(e) {
                e.stopPropagation();
                let imagefile = e.target.files[0];
                document.querySelector('#layoutId').value = imagefile.name;
                if(!uploadVerification(imagefile)) return;//验证图片是否符合格式
                let formdata = new FormData();
                formdata.append('file',imagefile);
                let reader = new FileReader();
                reader.readAsDataURL(imagefile);
                reader.onload = function(e){
                    var img = new Image();//构造JS的Image对象
                    //将本地图片赋给image对象
                    img.src = this.result;
                    img.onload=function(){
                        Actions.uploadPageBgImage(formdata,img.src,img.width,img.height)
                        //Actions.uploadBgImage(pid,formdata,img.width,img.height);
                    }
                }
            }
            render(){
                return <div className="main-layout-area">
                        <span className="main-layout-title">区域layout:</span>
                        <div className="main-layout-name">
                            <input className="main-layout-input" type="text" name="" id="layoutId"/>
                        </div>
                        <div className="main-layout-btn">
                            <span>导入</span>
                            <input className="main-layout-input" onChange={this.getChangeFile.bind(this)} type="file" accept="image/png,image/jpeg,image/gif" name="" id=""/>
                        </div>
                    </div>
            }
        };
    }

}