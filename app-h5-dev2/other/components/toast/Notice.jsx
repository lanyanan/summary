import React, {Component} from 'react'
import './notice.css'


export default class Notice extends Component {
    componentDidMount() {
        if (this.props.duration) {
            this.closeTimer = setTimeout(() => {
                this.close();
            }, this.props.duration * 1000);
        }
    }
    close() {
        this.clearCloseTimer();
        this.props.onClose();
    }
    clearCloseTimer() {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    }
    render() {
        const {content, iconType} = this.props;
        return (
            <div className='het-toast'>
                <div className='het-toast-text'>
                    { iconType != 'info' ? <i className={`het-icon het-icon-${iconType}`}></i> : null}
                    <div>{content}</div>
                </div>
            </div>
        )
    }
}

Notice.defaultProps = {
    duration: 1.5,
    content: '',
    iconType: 'info',
    onClose() {
    }
}
