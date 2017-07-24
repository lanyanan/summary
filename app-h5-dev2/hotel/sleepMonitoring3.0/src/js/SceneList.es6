import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {Toast} from './Toast.es6';
import Path from './ApiPath.es6';

var {Router, Route, hashHistory, Link} = ReactRouter;
export class SceneList extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            tips:" ",
            tipsClassName:"toast-hide",
            sceneList:[],
        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount(){
        Actions.login();
        //存储当前url
        let locationUrl = window.location.href;
        localStorage.setItem("locationUrl",locationUrl)
        //请求数据
        Actions.getSceneList();
    }
    render() {
    	let link = "/scene?sceneName="
    	let listArr = this.state.sceneList;
        return <div className="scene-page">
                    {listArr.map((item,index)=>{
                        return <div key={index}  className="scene-list">
                                    <Link to={link+item.sceneName} >
                                        <img src={item.pictureUrl}/>
                                        <h3>{item.sceneName}</h3>
                                    </Link>
                                </div>	
                    })}
                    <Toast tips={this.state.tips} tipsClassName={this.state.tipsClassName}/>
               </div>;
    }
}