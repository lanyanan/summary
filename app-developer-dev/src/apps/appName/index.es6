'use strict';

import  React           from 'react';
import  * as Comm       from '../../modules/common';    // 公共函数模块
import  HeaderPanel     from '../../modules/HeaderPanel/HeaderPanel'; // 头部面板
import  {Actions}       from '../playground/Actions';

// 生成各模块实例
let Header      = new HeaderPanel();

// 获取各模块React组件
let HeaderDom = Header.getComponent();

module.exports = React.createClass({

  getInitialState: function() {
      return {
          title: 'C-Life'
      };
  },
  componentDidMount:function(){

  },
  publish:function(){ 
    var $title=$('#title').text();
    var title = $title.length == 0 ? this.props.title : $title;
    //console.log(title,$('#remark').val().length);
    if($('#remark').val().length<20 || $('#remark').val().length>200){
      alert('请输入20-200字以内的发布说明!');
    }else{
      Actions.publishProject($('#title').text(), $('#remark').val());
    }
  },
  goToPrev:function(){
    // history.back();
    location.reload();
  },
  render: function() {

    return (

      <div className="publish-body">

        {/*<HeaderDom title={this.state.title} />*/}

        <section className='title'>

          <label className='left'>{/*this.props.title*/}</label>
          {/*<label className='right-col1'>我的APP</label>
          <label className='right-col2'>我的设备</label>*/}

        </section>

        <section className='remark-area'>

         <div className='remark'>
          <p className='item'>
            <label>项目名称:</label>
            <span id='title' contentEditable='true' >{this.props.title}</span>
          </p>
          <p className='item'>
            <label>说明:</label>
            <textarea placeholder="请输入20-200字以内的发布说明" defaultValue={this.props.remark} className='item' id='remark'></textarea>
          </p>
         </div>


          <div className="btn-grp">
            <button  onClick={this.publish}>发布</button>
            <button  onClick={this.goToPrev}>返回</button>
          </div>

        </section>

      </div>
    );
  }
});



