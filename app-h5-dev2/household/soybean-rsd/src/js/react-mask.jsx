let Mask = React.createClass({   // 栏目管理弹窗遮罩
    propTypes: {
        opacity: React.PropTypes.number,  // 透明度
        zIndex: React.PropTypes.number,  // 显示层次
    },
    getDefaultProps () {
        return {
            opacity: 50,
            zIndex: 100
        };
    },
    render: function(){
        let opacity = this.props.opacity;
        let zIndex = this.props.zIndex;
        let style = {
            width: '100%',
            height: '100%',
            position: 'fixed',
            left: 0,
            top: 0,
            opacity: opacity/100,
            filter:`alpha(opacity=${opacity})`,
            backgroundColor: 'black',
            zIndex: zIndex
        };
        return (
            <div style={style}></div>
        );
    }
});

export default Mask;

 