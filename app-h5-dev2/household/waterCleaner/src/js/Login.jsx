/**
 * 绑定设备组件
 * @prop {} 
 * @prop {}
 */
import {Wave} from './Wave.jsx';
export class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    touchStart(e) {
        e.preventDefault();
        location.href="xt://xt_login"
    }
    render() {
        return <div className="main">
            <div className="nameArea">
                <p>向拓净水云平台</p>
            </div>
            <Wave />
            <div className="nameBackg"></div>
            <button className="bindBtn" onTouchStart={this.touchStart.bind(this)}>登录</button>
            <div className="loadingBigImg"></div>
        </div>;
    }
};
