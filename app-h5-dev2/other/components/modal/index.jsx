import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './index.css';

export default class Modal extends Component {
    renderFooterButton(el, index) {
        return (
            <a className='het-modal-button' href='#' key={index} onClick={(e) => {
                e.preventDefault();
                this.props.footer[index]['onPress']();
            }}>{el['text']}</a>
        );
    }
    renderModalDom() {
        const {title, visible, children} = this.props;
        return visible ?
            <div>
                <div className='het-modal-mask'></div>
                <div className='het-modal-wrap'>
                    <div className='het-modal'>
                        <div className='het-modal-content'>
                            <div className='het-modal-header'>
                                <div className='het-modal-title'>{title}</div>
                            </div>
                            <div className='het-modal-body'>{children}</div>
                            {this.renderFooterDom()}
                        </div>
                    </div>
                </div>
            </div>: null
    }
    renderFooterDom() {
        return this.props.footer.length
            ? <div className='het-modal-footer'>
                    <div className='het-modal-button-group'>
                        {this.props.footer.map((el, index) => this.renderFooterButton(el, index))}
                    </div>
                </div>
            : null;
    }
    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName="het-fade"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                {this.renderModalDom()}
            </ReactCSSTransitionGroup>
        )
    }
}

Modal.defaultProps = {
    title: '',
    visible: false,
    footer: []
}
