import React from 'react';
import ReactDOM from 'react-dom';
import Notice from './Notice';

let onClose;
const notice = (content, type, duration = 3) => {
    const div = document.createElement('div');
    div.className = 'het-animate-fadein';
    document.body.appendChild(div);
    onClose = () => {
        ReactDOM.unmountComponentAtNode(div);
        document.body.removeChild(div);
    }
    ReactDOM.render(<Notice content={content} duration={duration} onClose={onClose} iconType={type} />, div);
}

const info = (content, duration) => {
    return notice(content, 'info', duration);
}
const success = (content, duration) => {
    return notice(content, 'success', duration);
}
const fail = (content, duration) => {
    return notice(content, 'fail', duration);
}
const offline = (content, duration) => {
    return notice(content, 'offline', duration);
}
const loading = (content, duration) => {
    return notice(content, 'loading', duration);
}
const hide = () => {
    onClose();
}

export default {
    info,
    success,
    fail,
    offline,
    loading,
    hide
};
