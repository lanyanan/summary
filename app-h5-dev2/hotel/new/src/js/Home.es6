import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory,Link} = ReactRouter;

export class Home extends BaseComponent {
	constructor(props) {
		super(props);
		this.state = {

		}
		this.listenStore(Store)// 监听Store
	}
	render() {
		return  <div className="home">
					<div className = "home-btn">
						<div className = "home-btn-timing">
							<Link to='/Timing'>
								<img src = "../static/img/pic-04xxhdpi.png"/>
								<h3>闹铃</h3>
							</Link>	
						</div>
						<div className = "home-btn-title">周杰伦。。。。。</div>
						<div className = "home-btn-music">
							<img src = "../static/img/pic-05xxhdpi.png"/>
							<h3>音乐</h3>
						</div>
					</div>
					<div className = "home-on">
						<Link to='/Lamp'>
							<img src = "../static/img/pic-15xxhdpi.png"/>
							<h3>开启智能灯</h3>		
						</Link>	
							
					</div>
				</div>
	}
}
