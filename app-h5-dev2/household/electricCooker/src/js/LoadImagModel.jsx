/**
 * 加载圈
 */

import {LoadImagSmall} from './LoadImagSmall.jsx';

export const LoadImagModel = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        let show = this.props.showLoad || 1;
        return (
            <section className="fade_c_section" style={{display: show == 1 ? "" : "none"}}>
                <div className="fade_c"></div>
                <LoadImagSmall showLoad={show}/>
            </section>
        );
    }
});
