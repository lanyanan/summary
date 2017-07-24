/**
 * 选择组件
 * @prop {array}    options 选择列表，例：[{label:'选项1', value:1}, {label:'选项2', value:2}, ...]
 * @prop {other}    value   当前已选中值
 * @prop {function} cb      回调函数
 */
export class SimpleSelect extends React.Component{
    constructor() {
        super();
    }
    select(e){
        let value = e.currentTarget.getAttribute('data-val');
        if (typeof this.props.cb==='function') {
            this.props.cb(value);
        }
    }
    render() {
        return (
            <section className="simple-select" style={{display:this.props.show?'block':'none'}}>
                <ul className='simple-select-wrap'>
                    {this.props.options.map(function(it, idx){
                        return <li key={idx} data-val={it.value} className={this.props.value==it.value ? 'selected':''} onTouchStart={this.select.bind(this)}>{it.label}</li>;
                    }.bind(this))}
                </ul>
                <div className="simple-select-mask"></div>
            </section>
        );
    }
};
