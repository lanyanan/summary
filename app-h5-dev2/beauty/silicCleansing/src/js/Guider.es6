import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';
import {Actions} from './Actions.es6';
import {Store} from './Store.es6';

// 创建React组件
export class Guider extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.listenStore(Store); // 监听Store
        this.items = [
            {text:'',gears:1,runtime:0},
            {text:'',gears:1,runtime:0},
            {text:'',gears:1,runtime:0},
            {text:'',gears:1,runtime:0},
            {text:'',gears:1,runtime:0}
        ];
        Actions.pushGuiderData(); // 请求推送向导数据
    }
    componentDidMount() {
        document.body.scrollTop = 0;
        // console.log(document.body.scrollTop);
    }
    componentWillUpdate() {
        let work = this.state.work;
        this.items = [
            {
                text: work?'眉心':'额头',
                gears: work?
                    (this.state.commonMassageGears1 ? this.state.commonMassageGears1 : this.state.massageGears1)
                    :
                    (this.state.commonGears1 ? this.state.commonGears1 : this.state.gears1),
                runtime: work?this.state.massageRuntime1:this.state.runtime1
            },
            {
                text: work?'左眼角':'鼻子', // 鼻子 2
                gears: work?
                    (this.state.commonMassageGears2 ? this.state.commonMassageGears2 : this.state.massageGears2)
                    :
                    (this.state.commonGears2 ? this.state.commonGears2 : this.state.gears2),
                runtime: work?this.state.massageRuntime2:this.state.runtime2
            },
            {
                text: work?'右眼角':'下巴', // 下巴 3
                gears: work?
                    (this.state.commonMassageGears3 ? this.state.commonMassageGears3 : this.state.massageGears3)
                    :
                    (this.state.commonGears3 ? this.state.commonGears3 : this.state.gears3),
                runtime: work?this.state.massageRuntime3:this.state.runtime3
            },
            {
                text: work?'左法令纹':'左脸', // 左脸 4
                gears: work?
                    (this.state.commonMassageGears4 ? this.state.commonMassageGears4 : this.state.massageGears4)
                    :
                    (this.state.commonGears4 ? this.state.commonGears4 : this.state.gears4),
                runtime: work?this.state.massageRuntime4:this.state.runtime4
            },
            {
                text: work?'右法令纹':'右脸', // 右脸 5
                gears: work?
                    (this.state.commonMassageGears5 ? this.state.commonMassageGears5 : this.state.massageGears5)
                    :
                    (this.state.commonGears5 ? this.state.commonGears5 : this.state.gears5),
                runtime: work?this.state.massageRuntime5:this.state.runtime5
            }
        ];
    }
    render() {
        het.setTitle(this.state.work!=1 ? '洁面步骤' : '按摩步骤');
        return (<div>
            <div className="c-steps-title">请按以下步骤进行{this.state.work?'按摩':'洁面'}</div>
            <div className="c-step-wrap">
                <dl className="fclear">
                    <dd className="fr c-step-head">{this.items[0].text}</dd>
                    <dd className="c-step-circle">1</dd>
                </dl>
                <dl className="fclear">
                    <dd className="fr c-step-text">
                        <p>档位:{this.items[0].gears}档</p>
                        <p>洁面时间:{this.items[0].runtime}s</p>
                    </dd>
                    <dd className="c-step-hr"></dd>
                </dl>
            </div>
            <div className="c-step-wrap">
                <dl className="fclear">
                    <dd className="fl tar c-step-head">{this.items[1].text}</dd>
                    <dd className="c-step-circle">2</dd>
                </dl>
                <dl className="fclear">
                    <dd className="fl tar c-step-text">
                        <p>档位:{this.items[1].gears}档</p>
                        <p>洁面时间:{this.items[1].runtime}s</p>
                    </dd>
                    <dd className="c-step-hr"></dd>
                </dl>
            </div>
            <div className="c-step-wrap">
                <dl className="fclear">
                    <dd className="fr c-step-head">{this.items[2].text}</dd>
                    <dd className="c-step-circle">3</dd>
                </dl>
                <dl className="fclear">
                    <dd className="fr c-step-text">
                        <p>档位:{this.items[2].gears}档</p>
                        <p>洁面时间:{this.items[2].runtime}s</p>
                    </dd>
                    <dd className="c-step-hr"></dd>
                </dl>
            </div>
            <div className="c-step-wrap">
                <dl className="fclear">
                    <dd className="fl tar c-step-head">{this.items[3].text}</dd>
                    <dd className="c-step-circle">4</dd>
                </dl>
                <dl className="fclear">
                    <dd className="fl tar c-step-text">
                        <p>档位:{this.items[3].gears}档</p>
                        <p>洁面时间:{this.items[3].runtime}s</p>
                    </dd>
                    <dd className="c-step-hr"></dd>
                </dl>
            </div>
            <div className="c-step-wrap">
                <dl className="fclear">
                    <dd className="fr c-step-head">{this.items[4].text}</dd>
                    <dd className="c-step-circle">5</dd>
                </dl>
                <dl className="fclear">
                    <dd className="fr c-step-text">
                        <p>档位:{this.items[4].gears}档</p>
                        <p>洁面时间:{this.items[4].runtime}s</p>
                    </dd>
                </dl>
            </div>
        </div>);
    }
}
