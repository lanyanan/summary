'use strict';

import  React           from 'react';
import  * as Comm       from '../../modules/common';    // 公共函数模块
import HeaderPanel      from '../../modules/HeaderPanel/HeaderPanel'; // 头部面板
import {Actions}        from '../playground/Actions';


require('../../libs/jquery');
require('../../libs/qrcode');

// 生成各模块实例
let Header      = new HeaderPanel();


// 获取各模块React组件
let HeaderDom = Header.getComponent();

let QRCode = React.createClass({
    getInitialState: function() {
        return {
            title: 'C-Life'
        };
    },
    componentDidMount:function(){
      if(this.props.url){
        this.generate2DCode(this.props.url);
      }
    },
    generate2DCode:function(content){
      $('#codeWrap').qrcode({
        render  : "canvas",     //也可以替换为table(table生成的二维码结构比较复杂)
        width   : 180,          //设置二维码的宽高
        height  : 180,
        text    : encodeURI(content)
      });
    },
    powerHandler:function(){
      Actions.showPanel("preview");
      // history.back();
      // location.reload();
    },
    render: function() {

        
        return (
            <div className="app-body">

              {/*<HeaderDom title={this.state.title} />*/}

              <section className='text'>

                {/*<div className='left'>'扫一扫,手机预览' || this.props.title</div>*/}

                <div className='right' onClick={this.powerHandler}>
                  {/*<img className='power' src='../static/img/power.png' onClick={this.powerHandler} />*/}
                  X
                 </div>

               </section>

               <section className='picture'>
                
                <div id="qrcode">
                  <div className='img'>
                    <img className='power' src='../static/img/preview.png' />
                  </div>
                  <div id="codeWrap"></div>
                </div>

                <div className='right'>
                  <div style={{width:"100%",height:'100%',backgroundColor:'#ffffff'}}>
                  <iframe src={this.props.url} width="100%" height='100%'></iframe>
                  </div>
                 </div>

               </section>

            </div>
        );
    }
});

 // <div className="resize-canvas" data-dragtype="canvas"></div>
// Comm.domReady(() => React.render(<QRCode /> , document.body));

module.exports =QRCode;



