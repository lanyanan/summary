/**
 * 加载圈
 */
export const LoadImagModel = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {
        let show = this.props.showLoad || 1;//1: 显示, 其他: 隐藏
        return (
            <section className="fade_c_section" style={{display: show == 1 ? "" : "none"}}>
                <div className="fade_c"></div>
                <div className="spinner">
                    <div className="spinner-container container1">
                        <div className="circle1"></div>
                        <div className="circle2"></div>
                        <div className="circle3"></div>
                        <div className="circle4"></div>
                    </div>
                    <div className="spinner-container container2">
                        <div className="circle1"></div>
                        <div className="circle2"></div>
                        <div className="circle3"></div>
                        <div className="circle4"></div>
                    </div>
                    <div className="spinner-container container3">
                        <div className="circle1"></div>
                        <div className="circle2"></div>
                        <div className="circle3"></div>
                        <div className="circle4"></div>
                    </div>
                </div>
            </section>
        );
    }
});
