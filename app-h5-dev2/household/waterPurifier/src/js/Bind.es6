/**
 * 绑定设备组件
 * @prop {} 
 * @prop {}
 */
import {Wave} from './Wave.es6';
export class Bind extends React.Component {
    constructor(props) {
        super(props);
    }
    touchStart(e) {
        e.preventDefault();
        location.href="xt://xt_bind"
    }
    render() {
        return <div className="main">
            <div className="nameArea">
                <p>向拓净水云平台</p>
            </div>
            <Wave />
            <div className="nameBackg"></div>
            <button className="bindBtn" onTouchStart={this.touchStart.bind(this)}>绑定设备</button>
            <div className="loadingBigImg"></div>
        </div>;
    }
};
