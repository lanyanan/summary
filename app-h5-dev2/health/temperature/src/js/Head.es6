'use strict';
/**
 * 头部连接
 */
import {Actions} from './Actions.es6';


var {Router, Route, hashHistory,Link} = ReactRouter;

export const Head = React.createClass({
    getInitialState: function(){
        return {};
    },
    render: function() {
        // console.log('props',this.props);
        return (
            <div>
        	   <a href="health://switch_user" className="temp-head"><img className='hdphoto' src={this.props.img && this.props.memberId == 0?this.props.img : '../static/img/ic-toadd.png'} alt='头像'/>
                    <span className='fs16 nikename fl'>{this.props.nickname==''?'添加家庭成员':this.props.nickname}</span>
                         <i></i>
                </a>
                <Link to="/measure" className="fr tempkown"><img className='photo' src='../static/img/icon_knowledge@2x.png' alt='信息'/><span className='fs16 nikename fr'>宝宝知道？</span></Link>
            </div>
        );
    } 
});