import { BaseComponent } from '../../../common/src/BaseComponent.class.es6';
import { DataAction } from './Actions.es6';
import { DataStore } from './Store.es6';

var {Router, Route, hashHistory} = ReactRouter;

// 创建React组件
export class StepDetail extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            stepId: this.props.params.setpId,
        };
        this.listenStore(DataStore); // 监听Store
        DataAction.getStep(this.state.stepId);
    }
    componentDidUpdate() {
        if (this.state.title) {
            het.setTitle(this.state.title);
        }
        if (this.state.content) {
            this.refs.articleContent.innerHTML = this.state.content;
        }
    }
    render() {
        let tags = this.state.tags || [];
        return (
            <div className='app-body'>
                <header>
                    {this.state.title || ""}
                </header>
                <section className='labelNav'>
                    {tags.map((item, index) => {
                        return (
                            <label className='labelName' key={index}>{item.tagName}</label>
                        )
                    })}
                </section>
                <section className='articleDate'>
                    {this.state.addTime || ""}
                </section>
                <section className='articleContent' ref='articleContent'>
                </section>
            </div>
        );
    }
}
