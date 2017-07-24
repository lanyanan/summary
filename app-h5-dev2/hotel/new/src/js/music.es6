import {Path} from './ApiPath.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory,Link} = ReactRouter;

export class Music extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
           
        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount() {
        
    }
    showHide() {
    	
    }
    onSwitchUserScene() {
      
    
    }
    render() {
        let path = "/timing?musicName="
        return <div className='music'>
                    <Link className="music-list" to={path}>
                        <div className="music-list-right music-selected">

                        </div>
                        <div className="music-list-right">兰亚楠</div>
                    </Link>
                    <Link className="music-list" to={path}>
                        <div className="music-list-left"></div>
                        <div className="music-list-right">兰亚楠</div>
                    </Link>
                    <Link className="music-list" to={path}>
                        <div className="music-list-left"></div>
                        <div className="music-list-right">兰亚楠</div>
                    </Link>
               </div>;
    }
}