'use strict';
/**
 * 列表点击项  水质地图/统计/基线校准
 */
export class ActionItem extends React.Component {
    constructor(props) {
        super(props);
    }

    handleTouchEnd(e) {
        e.stopPropagation();
        if (typeof this.props.touchEnd==='function') {
            this.props.touchEnd();
        }
    }

    render() {
        let text = this.props.textVal || '';
        return (
            <div className='actionItem' onClick={this.handleTouchEnd.bind(this)}>
                <span>{text}<i></i></span>
            </div>
        );
    }
}
