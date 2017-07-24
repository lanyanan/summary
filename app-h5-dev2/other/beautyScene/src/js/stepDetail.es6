import {Funs} from '../../../common/src/fun.es6';
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

var {Router, Route, hashHistory} = ReactRouter;

// 创建React组件
export class StepDetail extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            stepId: this.props.params.stepId,
        };
        this.listenStore(Store); // 监听Store
        Actions.getStep(this.state.stepId);
    }
    componentDidUpdate(){
        if(this.state.content){
            document.querySelector('#details').innerHTML = this.state.content;
        }
    }
    render() {
        //console.log('最终数据step:',this.state);
        return (
            <div className='app-detail'>
                <header>
                    {this.state.descs || ""}
                </header>
                <div className='backgroundGap'></div>
                <section className='details' id="details"></section>
            </div>
        );
    }
}
