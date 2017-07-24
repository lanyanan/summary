/**
 * 加载圈
 */
export const LoadImagSmall = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        let show = this.props.showLoad || 1;
        let small = this.props.showSmall || false;
        return (
            <section className={"spinner " + (small ? "small" :"big")} style={{display: show == 1 ? "" : "none"}}>
                <div className="spinner-container container1">
                    <div className={"circle1 " + (small ? "small-circle" :"")}></div>
                    <div className={"circle2 " + (small ? "small-circle" :"")}></div>
                    <div className={"circle3 " + (small ? "small-circle" :"")}></div>
                    <div className={"circle4 " + (small ? "small-circle" :"")}></div>
                </div>
                <div className="spinner-container container2">
                    <div className={"circle1 " + (small ? "small-circle" :"")}></div>
                    <div className={"circle2 " + (small ? "small-circle" :"")}></div>
                    <div className={"circle3 " + (small ? "small-circle" :"")}></div>
                    <div className={"circle4 " + (small ? "small-circle" :"")}></div>
                </div>
                <div className="spinner-container container3">
                    <div className={"circle1 " + (small ? "small-circle" :"")}></div>
                    <div className={"circle2 " + (small ? "small-circle" :"")}></div>
                    <div className={"circle3 " + (small ? "small-circle" :"")}></div>
                    <div className={"circle4 " + (small ? "small-circle" :"")}></div>
                </div>
            </section>
        );
    }
});
