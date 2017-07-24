import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';
import {TimeSelect} from './TimeSelect.es6';

var {Router, Route, hashHistory, Link} = ReactRouter;
export class Toast extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.listenStore(Store); // 监听Store
    }
    componentDidMount(){
      
    }
    render() {
        return <div id="toast" className={this.props.tipsClassName}>
                    <span>
                      {this.props.tips}
                    </span> 
               </div>;
    }
}