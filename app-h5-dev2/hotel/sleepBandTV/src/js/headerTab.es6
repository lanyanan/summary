import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

// 创建React组件
export class HeaderTab extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store
    }
    componentDidMount() {
        Actions.getWeather();
        Actions.getUserInfo();
    }
    changeHash(e){
    	let hash = e.target.getAttribute("data-hash");
    	if(hash === this.props.hash) return;
    	location.hash = hash;
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevState.userName !== this.state.userName){
            let dom = ReactDOM.findDOMNode(this.refs.userName);
            if(dom.offsetWidth >= 134){
                dom.classList.add('running');
            }else{
                dom.classList.remove('running');
            }
        }
    }
    render() {
    	let hash = this.props.hash;
    	let temp1 = this.state.temp1===undefined?"-":this.state.temp1;
    	let temp2 = this.state.temp2===undefined?"-":this.state.temp2;
    	let tempRange = temp1+"-"+temp2+"℃";
        let wtext = this.state.wtext || "-";
        let imgUrl = this.state.wtext ? "../static/img/"+wtext+".png" : "";
        if(this.state.wtext == '雨') imgUrl = "../static/img/大雨.png";
        return (
            <div className="headerTab">
                {this.state.avatar?
                    <img className="userIcon" src={this.state.avatar} /> :
                    <img className="userIcon" />}
                <section className="userName">
                    <section className="name" ref="userName">{this.state.userName}</section>
                    <section className={"loginOut "+(hash==="out"?"active":"")}>退出登录</section>
                </section>
                <label className={"tab "+(hash==="report"?"active":"")} 
                	   data-hash="" 
                	   onClick={this.changeHash.bind(this)}>
                	睡眠报告
                </label>
                <label className={"tab "+(hash==="time"?"active":"")} 
                	   data-hash="time" 
                	   onClick={this.changeHash.bind(this)}>
                	实时数据
                </label>
                <ul className="weather">
                	<li className="cityName">{this.state.cityName || "深圳"}</li>
                    <li className="weatherIcon"><img src={imgUrl} /></li>
                	<li className="twoFloor">
                        <span className = "upText">{wtext}</span>
                        <span className = "downText">{tempRange || "-/-℃"}</span>
                    </li>
                	<li className="twoFloor">
                        <span className = "upText">{this.state.pm25 || "--"}</span>
                        <span className = "downText">PM2.5</span>
                    </li>
                </ul>
            </div>
        );
    }
}