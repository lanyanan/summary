/**
 * 排序面板
 * @prop {boolean}  show     是否显示面板
 * @prop {integer}  work     工作模式
 * @prop {function} cbOk     点击确定时的回调函数 
 * @prop {function} cbNo     点击取消时的回调函数
 */
import {BaseComponent} from '../../../common/src/BaseComponent.class.es6';

// 创建React组件
export class SortPanel extends BaseComponent {
    constructor(props) {
        super(props);
        this.dragging = false;
        this.startY = 0;
        this.state = {
            show : null
        };
        this.items = [
            [
                {id: 1, text: '额头', order: 1},
                {id: 2, text: '下巴', order: 2},
                {id: 3, text: '鼻子', order: 3},
                {id: 4, text: '左脸', order: 4},
                {id: 5, text: '右脸', order: 5}
            ],
            [
                {id: 1, text: '眉心', order: 1},
                {id: 2, text: '左法令纹', order: 2},
                {id: 3, text: '右法令纹', order: 3},
                {id: 4, text: '左眼角', order: 4},
                {id: 5, text: '右眼角', order: 5}
            ]
        ];
        this.sort();
    }
    // 排序
    sort() {
        this.items[0] = this.items[0].sort((a, b)=>a.order>b.order);
        this.items[1] = this.items[1].sort((a, b)=>a.order>b.order);
    }
    // 重排
    reSort(work, orderSequence) {
        let items = this.items[work];
        for (let i=0; i<orderSequence.length; i++) {
            for (let j in items) {
                if (items[j].id == orderSequence[i]) {
                    items[j].order = i + 1;
                    break;
                }
            }
        }
    }
    // 点击确定
    okCall() {
        let work = typeof this.props.work === 'undefined' ? 0 : this.props.work;
        let list = this.getCurrentIdSequence();
        this.reSort(work, list);
        if (typeof this.props.cbOk === 'function') {
            this.props.cbOk(work, list);
        }
        this.hideSortPanel();
    }
    // 点击取消
    noCall() {
        if (typeof this.props.cbNo === 'function') {
            this.props.cbNo();
        }
        this.sort();
        this.hideSortPanel();
    }
    // 获取当前ID序列
    getCurrentIdSequence() {
        let doms = ReactDOM.findDOMNode(this.refs.list).children;
        let list = [];
        for (let i=0; i<doms.length; i++) {
            list.push(doms[i].getAttribute('data-id'));
        }
        return list;
    }
    // 关闭面板
    hideSortPanel() {
        this.setState({
            show : false
        });
    }
    // 开始拖放
    startSort(e) {
        e.preventDefault();
        e.stopPropagation();
        let touchs = e.originalEvent ? e.originalEvent.touches : e.targetTouches;
        this.startY = touchs[0].pageY;
        this.dragItem = ReactDOM.findDOMNode(e.currentTarget);
        this.dragItem.style.zIndex = 99;
        this.dragItem.style.backgroundColor = '#eee';
        this.top = this.dragItem.offsetTop;
    }
    // 拖放中
    moveSort(e) {
        if (this.dragging) return;
        let touchs = e.originalEvent ? e.originalEvent.touches : e.targetTouches;
        let y = touchs[0].pageY - this.startY;
        try {
            if (this.dragItem.nextSibling && y > this.dragItem.nextSibling.offsetTop - this.top - this.dragItem.scrollHeight / 2) {
                this.insertAfter(this.dragItem, this.dragItem.nextSibling);
            } else if (this.dragItem.previousSibling && y < this.dragItem.previousSibling.offsetTop - this.top + this.dragItem.scrollHeight / 2) {
                this.insertBefore(this.dragItem, this.dragItem.previousSibling);
            }
        } catch (err) {}
    }
    // 拖放结束
    endSort(e) {
        this.dragging = false;
        this.dragItem.style.zIndex = 0;
        this.dragItem.style.backgroundColor = '#fff';
    }
    insertBefore(newEl, targetEl) {
        var parentEl = targetEl.parentNode;
        parentEl.insertBefore(newEl, targetEl);
    }
    insertAfter(newEl, targetEl) {
        var parentEl = targetEl.parentNode;
        if(parentEl.lastChild == targetEl) {
            parentEl.appendChild(newEl);
        } else {
            parentEl.insertBefore(newEl,targetEl.nextSibling);
        }
    } 
    render() {
        var work = typeof this.props.work === 'undefined' ? 0 : this.props.work;
        var show = this.state.show===null ? this.props.show : this.state.show;
        this.state.show=null;
        return (<div className="sort-panel" onTouchStart={this.noCall.bind(this)}
                style={{display:show?'block':'none'}}>
            <div className="wrap" onTouchStart={(e)=>{e.preventDefault();e.stopPropagation();}}>
                <h2>更改{this.props.work===1?'按摩':'洁面'}顺序</h2>
                <ul ref="list">
                    {this.items[work].map(it=>(
                        <li key={it.id} data-id={it.id} onTouchStart={this.startSort.bind(this)}
                            onTouchMove={this.moveSort.bind(this)} onTouchEnd={this.endSort.bind(this)}>
                            <b>{it.order}</b>{it.text}<i></i>
                        </li>
                    ))}
                </ul>
                <div className="sub-wrap">
                    <input className="no" type="button" value="取消" onTouchStart={this.noCall.bind(this)} />
                    <i className="hl"></i>
                    <input className="ok" type="button" value="确定" onTouchStart={this.okCall.bind(this)} />
                </div>
            </div>
        </div>);
    }
}
